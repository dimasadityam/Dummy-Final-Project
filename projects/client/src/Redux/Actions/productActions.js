import axios from "axios"
import { API_URL } from "../../helper"


export const getProductActions = (data) => {
  console.log("data PRODUCT dari component UI", data)
  return {
    type: "GET_PRODUCT",
    payload: data
  }
}

export const getAllProductActions = (data) => {
  console.log("data ALL PRODUCT dari component UI", data)
  return {
    type: "GET_ALLPRODUCT",
    payload: data
  }
}
// export const getProducts = () => {
//   return async (dispatch) => {
//     try {
//       let token = localStorage.getItem("tokenIdUser");
//       console.log("TOKENN PRODUCT", token)
//       // memeriksa adanya token
//       if (token) {
//         let res = await axios.get(`${API_URL}/product/getProduct`, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         })
//         if (res.data) {
//           console.log("RES DATA GETPRODUCTS", res.data)
//           dispatch(getProductActions(res.data))
//         }
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }