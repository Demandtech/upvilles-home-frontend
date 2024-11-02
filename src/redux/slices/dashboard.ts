import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AccountSliceProps,
  PropertyType,
  UserType,
  PropertyListType,
  StatsType,
} from "../../types/dashboard";

const initialState: AccountSliceProps = {
  user: null,
  properties: [],
  propertyDetails: null,
  stats: null,
};

const dashboardSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUser: (
      state,
      { payload }: PayloadAction<{ user: UserType; stats: StatsType }>
    ) => {
      state.user = payload.user;
      state.stats = payload.stats;
    },
    setPropertyDetails: (state, { payload }: { payload: PropertyType }) => {
      state.propertyDetails = payload;
    },
    setProperties: (state, { payload }: { payload: PropertyListType }) => {
      state.properties = payload;
    },
    setLogout: () => {
      return initialState;
    },
  },
});

export const { setUser, setLogout, setProperties, setPropertyDetails } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;
