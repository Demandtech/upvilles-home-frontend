import { FC } from "react";
import Header from "../../layouts/public/Header";
import Hero from "../../components/public/home/Hero";
import AllInOne from "../../components/public/home/AllInOne";
import Features from "../../components/public/home/Features";
import Experience from "../../components/public/home/Experience";
import GuideStep from "../../components/public/home/GuideStep";
import Ready from "../../components/public/home/Ready";
import Footer from "../../layouts/public/Footer";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Home: FC = () => {
	const { user } = useSelector((state: RootState) => state.user);

	const name = user?.name as string;

	return (
		<div className="max-w-[1440px] mx-auto">
			<Header name={name} />
			<main className="mx-auto">
				<Hero name={name} />
				<AllInOne />
				<Features />
				<Experience name={name} />
				<GuideStep name={name} />
				<Ready name={name} />
				<Footer />
			</main>
		</div>
	);
};

export default Home;
