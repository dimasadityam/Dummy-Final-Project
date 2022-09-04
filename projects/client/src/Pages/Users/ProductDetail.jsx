import Axios from "axios";
import React from "react";
import { API_URL } from "../../helper";
import { useDispatch } from 'react-redux'
// import { forgotPassword } from "../redux/action/usersAction";
import { useNavigate, useParams } from "react-router-dom";
import { Text, Box, Image, Button, Flex, Divider, Spacer, MenuButton, MenuList, Menu, MenuDivider, MenuItem, MenuGroup, Input, ButtonGroup } from '@chakra-ui/react';
import NavbarComponent from "../../Components/Users/Navbar";
import { useToastHook } from "../../Components/CustomToast";
import obat1 from "../../Assets/DevImage/Panadol.jpg";


const ProductDetail=(props)=>{
  const navigate = useNavigate();
  const [currentToast, newToast]=useToastHook();
  const [loadingStat, setLoadingStat]=React.useState(false);

  const btnCart = async()=>{
    try {
      setLoadingStat(true);
        setLoadingStat(false);
        navigate("/cart")
    } catch (err) {
      newToast({
        title: 'Error.',
        description: 'Coba refresh browser anda',
        status: 'error',
      })
      setLoadingStat(false)
    }
  }

  const printProduct = () => {
    // return product.map((value, index) =>{
      return (
      <>
      <div class="d-inline-flex">
        <Box borderRadius={"10px"} width="165px" height="300px" boxShadow='lg' bg='#FFFFFF' mt={"25px"} ml={"20px"} >
          <div class="row">
            <div class="row d-flex justify-content-center">
              <Image src={obat1} width='150px' style={{marginLeft:"25px", marginTop:"5px", cursor:"pointer"}} onClick={()=> navigate("/cart")}/>
              <Box noOfLines={1} >
                <Text class="h6b" style={{marginLeft:"20px"}}>Panadol</Text>
              </Box>
            </div>
            <div class="row">
              <Text class="h6" style={{marginTop:"40px", marginLeft:"20px"}}>Rp. 12.000 / Saset</Text>
            </div>
          </div>
          <div class="d-flex justify-content-center mt-3">
            <Button isLoading={loadingStat}
              class="btn-rekom" onClick={btnCart}>Add To Cart</Button>
          </div>
        </Box>
      </div>
      </>
      ) 
    // })
  }

  const printCategory = () => {
    // return category.map((value, index) =>{
      return (
      <>
        <Box mt={"15px"} ms={"30px"}>
          <Text style={{cursor:"pointer"}} class="h6">Nama Kategori</Text>
        </Box>
      </>
      ) 
    // })
  }

  return(
    <>
    <Box
      w='100%'
      h='100%'
      // bgGradient='linear(#f6f8fc, #FFFFFF)'
    >
    <Box boxShadow='md'>
      <NavbarComponent/>
    </Box>
      <div class="container">
        <div class="row">
          <div class="col-md-1"></div>          
          <div class="col-md-4">
            <div class="row d-flex justify-content-center">
              <Image src={obat1} width='90%' style={{marginLeft:"25px", marginTop:"5px", cursor:"pointer"}}/>
            </div>
          </div>
          <div class="col-md-6">
            {/* <Box borderRadius={"10px"} width="100%" height="180%" boxShadow='lg' bg='#FFFFFF' mt={"25px"} ml={"20px"} > */}
              <Box mt={"50px"}>
                <Text class="h3b" style={{marginLeft:"20px"}}>Panadol</Text>
                <Text class="h4" style={{marginTop:"20px", marginLeft:"20px"}}>Rp. 12.000 / Saset</Text>
              </Box>
              <div class="d-grid gap-2" style={{marginLeft:"20px"}}>
                <button class="btn mt-5 mb-5" style={{backgroundColor:"#DE1B51"}} type="button" onClick={btnCart}>
                  <Box >
                    <Text style={{color: "#FFFFFF"}} class="h6b">Add To Cart</Text>
                  </Box>
                </button>
              </div>
              <Box class="mt-5">
                  <Text class="h5" style={{marginTop:"20px", marginLeft:"20px"}}>Deskripsi</Text>
                  <Text class="h6" style={{marginTop:"20px", marginLeft:"20px"}}>PANADOL merupakan obat dengan kandungan Paracetamol yang dapat digunakan untuk meringankan rasa sakit
                    pada sakit kepala, sakit gigi, sakit pada otot dan menurunkan demam. Paracetamol bekerja pada pusat pengatur suhu di hipotalamus untuk menurunkan suhu tubuh
                    (antipiretik) serta menghambat sintesis prostaglandin sehingga dapat mengurangi nyeri ringan sampai sedang (analgesik).
                  </Text>
                <Divider mt={"40px"} mb={"40px"} boxShadow='lg'/>
                  <Text class="h5" style={{marginTop:"20px", marginLeft:"20px"}}>Komposisi</Text>
                  <Text class="h6" style={{marginTop:"20px", marginLeft:"20px"}}>Setiap kaplet mengandung Paracetamol 500 mg</Text>
                <Divider mt={"40px"} mb={"40px"} boxShadow='lg'/>
                  <Text class="h5" style={{marginTop:"20px", marginLeft:"20px"}}>Dosis</Text>
                  <Text class="h6" style={{marginTop:"20px", marginLeft:"20px"}}>Dewasa dan anak usia lebih dari 12 tahun : 1 - 2 kaplet, 3-4 kali sehari (Maksimum 8 kaplet dalam 24 jam).
                    Anak-anak usia 6-11 tahun : 1/2 - 1 kaplet, 3-4 kali sehari (maksimum 4 kaplet dalam 24 jam). Minimum interval penggunaan dosis adalah 4 jam.
                    Jangan melebihi dosis yang dianjurkan, atau menurut aturan dokter.
                  </Text>
                <Divider mt={"40px"} mb={"40px"} boxShadow='lg'/>
                  <Text class="h5" style={{marginTop:"20px", marginLeft:"20px"}}>Perhatian</Text>
                  <Text class="h6" style={{marginTop:"20px", marginLeft:"20px"}}>Hati-hati penggunaan obat ini pada penderita penyakit ginjal. Bila setelah 2 hari demam tidak menurun
                    atau setelah 5 hari nyeri tidak menghilang, segera hubungi Unit Pelayanan Kesehatan. Penggunaan obat ini pada penderita yang mengkonsumsi alkohol, dapat
                    meningkatkan risiko kerusakan fungsi hati. Kategori kehamilan : Kategori B: Mungkin dapat digunakan oleh wanita hamil. Penelitian pada hewan uji tidak
                    memperlihatkan ada nya risiko terhadap janin, namun belum ada bukti penelitian langsung terhadap wanita hamil.
                  </Text>
              </Box>
            {/* </Box> */}
          </div>
          <div class="col-md-1"></div>
        </div>
      </div>
    </Box>
    </>
  )
}

export default ProductDetail;