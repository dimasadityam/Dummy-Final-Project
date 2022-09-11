import Axios from "axios";
import React from "react";
import { API_URL, BE_URL } from "../../helper";
import { useDispatch } from "react-redux";
// import { forgotPassword } from "../redux/action/usersAction";
import { useNavigate, useParams } from "react-router-dom";
import {
  Text,
  Box,
  Image,
  Button,
  Flex,
  Divider,
  Spacer,
  MenuButton,
  MenuList,
  Menu,
  MenuDivider,
  MenuItem,
  MenuGroup,
  Input,
  ButtonGroup,
} from "@chakra-ui/react";
import NavbarComponent from "../../Components/Users/Navbar";
import { useToastHook } from "../../Components/CustomToast";
import obat1 from "../../Assets/DevImage/Panadol.jpg";

const ProductDetail = (props) => {
  const navigate = useNavigate();
  const [currentToast, newToast] = useToastHook();
  const [loadingStat, setLoadingStat] = React.useState(false);
  const [productDetail, setProductDetail] = React.useState([]);
  const params = useParams();
  React.useEffect(() => {
    fetchProductDetail();
  }, []);
  const fetchProductDetail = () => {
    let token = localStorage.getItem("tokenIdUser");
    Axios.get(`${API_URL}/users/getproductdetail/${params.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      setProductDetail(res.data.data[0]);
      console.log(res.data);
    });
  };
  const btnCart = async () => {
    try {
      setLoadingStat(true);
      setLoadingStat(false);
      navigate("/cart");
    } catch (err) {
      newToast({
        title: "Error.",
        description: "Coba refresh browser anda",
        status: "error",
      });
      setLoadingStat(false);
    }
  };

  return (
    <>
      <Box
        w="100%"
        h="100%"
        // bgGradient='linear(#f6f8fc, #FFFFFF)'
      >
        <Box boxShadow="md">
          <NavbarComponent />
        </Box>
        <div class="container">
          <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-4">
              <div class="row d-flex justify-content-center">
                <Image
                  src={BE_URL + productDetail.productPicture}
                  width="90%"
                  style={{
                    marginLeft: "25px",
                    marginTop: "5px",
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
            <div class="col-md-6">
              {/* <Box borderRadius={"10px"} width="100%" height="180%" boxShadow='lg' bg='#FFFFFF' mt={"25px"} ml={"20px"} > */}
              <Box mt={"50px"}>
                <Text class="h3b" style={{ marginLeft: "20px" }}>
                  {productDetail.productName}
                </Text>
                <Text
                  class="h4"
                  style={{ marginTop: "20px", marginLeft: "20px" }}
                >
                  Rp.{productDetail.priceSale} / {productDetail.defaultUnit}
                </Text>
              </Box>
              <div class="d-grid gap-2" style={{ marginLeft: "20px" }}>
                <button
                  class="btn mt-5 mb-5"
                  style={{ backgroundColor: "#DE1B51" }}
                  type="button"
                  onClick={btnCart}
                >
                  <Box>
                    <Text style={{ color: "#FFFFFF" }} class="h6b">
                      Add To Cart
                    </Text>
                  </Box>
                </button>
              </div>
              <Box class="mt-5">
                <Text
                  class="h5"
                  style={{ marginTop: "20px", marginLeft: "20px" }}
                >
                  Deskripsi
                </Text>
                <Text
                  class="h6"
                  style={{ marginTop: "20px", marginLeft: "20px" }}
                >
                  {productDetail.description}
                </Text>
                <Divider mt={"40px"} mb={"40px"} boxShadow="lg" />
                <Text
                  class="h5"
                  style={{ marginTop: "20px", marginLeft: "20px" }}
                >
                  Komposisi
                </Text>
                <Text
                  class="h6"
                  style={{ marginTop: "20px", marginLeft: "20px" }}
                >
                  {productDetail.composition}
                </Text>
                <Divider mt={"40px"} mb={"40px"} boxShadow="lg" />
                <Text
                  class="h5"
                  style={{ marginTop: "20px", marginLeft: "20px" }}
                >
                  Dosis
                </Text>
                <Text
                  class="h6"
                  style={{ marginTop: "20px", marginLeft: "20px" }}
                >
                  {productDetail.dosage}
                </Text>
                <Divider mt={"40px"} mb={"40px"} boxShadow="lg" />
                <Text
                  class="h5"
                  style={{ marginTop: "20px", marginLeft: "20px" }}
                >
                  Perhatian
                </Text>
                <Text
                  class="h6"
                  style={{ marginTop: "20px", marginLeft: "20px" }}
                >
                  {productDetail.warning}
                </Text>
              </Box>
              {/* </Box> */}
            </div>
            <div class="col-md-1"></div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default ProductDetail;
