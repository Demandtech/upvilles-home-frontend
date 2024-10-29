import { Outlet, useNavigate } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useQuery, useMutation, UseQueryOptions } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { AxiosResponse } from "axios";
import { setUser } from "../../../redux/slices/dashboard";
import { Spinner } from "@nextui-org/spinner";

const DashboardLayout: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { dashboardPageTitle } = useSelector((state: RootState) => state.state);
  const { handleRefreshToken, getAuthUser } = useAuth();

  const tokens = Cookies.get("auth_token");

  const isTokenExpired = (token: string): boolean => {
    try {
      const decoded: { exp: number } = jwtDecode(token);
      return decoded.exp * 1000 < Date.now();
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const mutation = useMutation({
    mutationFn: handleRefreshToken,
    onSuccess: (data) => {
      Cookies.set(
        "auth_token",
        JSON.stringify({
          access_token: data.data.access_token,
          refresh_token: data.data.refresh_token,
        })
      );
    },
    onError: (error) => {
      console.log("Error: ", error);
    },
  });

  const {
    data: authUserData,
    isLoading,
    status,
  } = useQuery<AxiosResponse, Error>({
    queryKey: ["authUser"],
    queryFn: () => {
      const { access_token } = JSON.parse(tokens || "{}");
      return getAuthUser(access_token);
    },
    enabled: tokens ? !isTokenExpired(JSON.parse(tokens).access_token) : false,
  } as UseQueryOptions<AxiosResponse, Error>);

  const authenticateUser = async () => {
    if (!tokens) {
      navigate("/auth/login");
      return;
    }

    try {
      const { access_token, refresh_token } = JSON.parse(tokens);

      if (isTokenExpired(access_token)) {
        mutation.mutate(refresh_token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, [tokens]);

  useEffect(() => {
    if (status === "success" && authUserData) {
      dispatch(
        setUser({
          user: authUserData.data.user,
          stats: authUserData.data.stats,
        })
      );
    } else if (status === "error") {
      navigate("/auth/login");
    }
  }, [authUserData, dispatch, status, navigate]);

  return (
    <main
      id="dashboard-layout"
      className="w-full h-screen max-w-[1440px] mx-auto"
    >
      <div className="flex h-full">
        <div
          className={`fixed md:static z-50 bg-black/20  left-0 top-0 overflow-hidden ${
            isSidebarOpen
              ? "w-screen md:max-w-[280px]"
              : "w-0 md:w-full md:max-w-[280px]"
          } h-full`}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-hidden={!isSidebarOpen}
          aria-expanded={isSidebarOpen}
          aria-controls="sidebar"
        >
          <div
            className={`${
              isSidebarOpen
                ? "w-full max-w-[80%] md:max-w-[280px]"
                : "w-0 md:w-full md:max-w-[280px]"
            } h-full bg-primary overflow-auto scrollbar-thin scrollbar-rounded`}
            onClick={(event) => event.stopPropagation()}
          >
            <Sidebar
              image_url={authUserData?.data.user.image_url}
              name={authUserData?.data.user.name}
              isLoading={isLoading}
            />
          </div>
        </div>
        <div className="flex-1 relative h-screen overflow-auto">
          <Header
            title={dashboardPageTitle.title}
            showIcon={dashboardPageTitle.showIcon}
          />
          {isLoading ? (
            <div className="w-full h-[calc(100vh-96px)] flex justify-center items-center">
              <Spinner size="lg" label="Loading..." />
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
