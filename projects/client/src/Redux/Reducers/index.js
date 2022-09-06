import { combineReducers } from "redux";
import { userReducers } from "./userReducers";
import { addressReducers } from "./addressReducers";
import { getProvinceReducers } from "./getProvinceReducers";
import { getCityReducers } from "./getCityReducers";
import { productReducers } from "./productReducers";

export const globalStore = combineReducers({
  userReducers, addressReducers, getProvinceReducers, getCityReducers, productReducers
})