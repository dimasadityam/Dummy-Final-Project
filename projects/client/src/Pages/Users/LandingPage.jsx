import React from "react";
import Axios from "axios";
import "../../Styles/Users/LandingPage.css";
import VectorHeader from "../../Assets/DevImage/HeaderLandingPage.png";
import logo from "../../Assets/DevImage/LogoMedhika.png";
import kategori1 from "../../Assets/DevImage/Kategori1.png";
import kategori2 from "../../Assets/DevImage/Kategori2.png";
import kategori3 from "../../Assets/DevImage/Kategori3.png";
import jaminan1 from "../../Assets/DevImage/Jaminan1.png";
import jaminan2 from "../../Assets/DevImage/Jaminan2.png";
import jaminan3 from "../../Assets/DevImage/Jaminan3.png";
import bank1 from "../../Assets/DevImage/LogoBCA.png";
import bank2 from "../../Assets/DevImage/LogoMandiri.png";
// import BGHeader from "../../Assets/DevImage/BGHeader2.png";
// import rekomendasi from "../../Assets/DevImage/ProdukPilihanNew.png";
import obat1 from "../../Assets/DevImage/Panadol.jpg";
import obat2 from "../../Assets/DevImage/Decolgen.jpg";
import obat3 from "../../Assets/DevImage/Blackmores.jpg";
import obat4 from "../../Assets/DevImage/Enervon-C.jpg";
import obat5 from "../../Assets/DevImage/Derma.jpg";
import NavbarComponent from "../../Components/Users/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../Components/Users/ModalLogin";
import { useDisclosure, useToast } from '@chakra-ui/react';
import { useToastHook } from "../../Components/CustomToast";
import { Flex, Box, Heading, Input, Image, Text, Divider, Spacer, ButtonGroup, Button, Link, extendTheme } from '@chakra-ui/react';


const LandingPage = (props) =>{
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const toast = useToast()
  const [loadingStat, setLoadingStat]=React.useState(false);
  const [currentToast, newToast]=useToastHook();
  const {isVerified, users, name, profilePicture, token}=useSelector((state) => {
    return {
        isVerified:state.userReducers.isVerified,
        users:state.userReducers.users,
        name:state.userReducers.name,
        profilePicture:state.userReducers.profilePicture,
        token:state.userReducers.token
        }
    })

    console.log("S T A T U S LandingPage", isVerified)

  const btnCart = async()=>{
    try {
      setLoadingStat(true);
      if (isVerified == 'verified'){
        setLoadingStat(false);
        navigate("/cart")
      } else if (isVerified == 'unverified') {
        newToast({
          title: 'Akun Tidak Terverifikasi.',
          description: 'Mohon untuk verifikasi akun di email anda. agar memudahkan saat transaksi di Medhika',
          status: 'warning',
        })
        setLoadingStat(false);
      } else {
        newToast({
          title: 'Anda Belum Login',
          description: 'Anda harus login agar bisa transaksi di Medhika',
          status: 'warning',
        })
        setShow(!show)
        setLoadingStat(false);
      }
    } catch (err) {
      newToast({
        title: 'Error.',
        description: 'Coba refresh browser anda',
        status: 'error',
      })
      setLoadingStat(false)
    }
  }
  return (
    <>
      <div>
          <NavbarComponent/>
      </div>
      <div class="HeaderBG" style={{height:"100%"}}>
        <div class="Vector">
          <div class="container">
            <Box height={"650px"}>
              <div class="row">
                <div div class="col-7">
                  <Box style={{marginTop:"65px"}}>
                    <Flex>
                      <Text class="h4" style={{marginTop:"3px"}}>Selamat Datang Di</Text>
                      <Image src={logo} width='20%' style={{marginLeft:"10px", marginBottom:"5px"}}/>
                    </Flex>
                  </Box>
                    <Text class="h2b">APOTEK ONLINE TERPERCAYA</Text>
                    <Text class="h6" style={{marginTop:"3px"}}>100% Asli, Produk BPOM dan Cepat Sampai</Text>
                  <Box borderRadius={"10px"} boxShadow='md' bg='#FFFFFF' marginTop={"50px"} paddingBottom={"30px"}>
                    <div class="row">
                      <div class="col-8">
                        <Text class="h5b" style={{paddingTop:"30px", paddingLeft:"40px"}}>Punya Resep Doktor?</Text>
                        <Text class="h6" style={{marginTop:"15px", paddingLeft:"40px"}}>Tak perlu antre & obat akan langsung dikirimkan ke lokasi anda! Ukuran foto tidak lebih dari 1MB</Text>
                      </div>
                      <div class="col-4">
                        <Button style={{marginRight:"0px", marginTop:"75px"}} class="btn-def_second">Unggah Resep</Button>
                      </div>
                    </div>
                  </Box>
                </div>
                <div class="col-5">
                  <Image src={VectorHeader} height={"100%"} style={{marginTop:"30px"}}/>
                </div>
                  <Box style={{marginTop:"45px"}}>
                    <Flex>
                      <Text class="h6b">Kategori</Text>
                      <Spacer/>
                      <Link href='#' class="h6br">Semua Produk</Link>
                    </Flex>
                    <div class="row">
                      <div class="col-4">
                        <Box borderRadius={"10px"} width="100%" boxShadow='md' bg='#FFFFFF' marginTop={"10px"} paddingBottom={"10px"}>
                          <div class="row">
                            <div class="col-5">
                              <Image src={kategori1} width='70%' style={{marginLeft:"25px", marginTop:"5px"}}/>
                            </div>
                            <div class="col-7">
                              <Text class="h6-link">Obat-Obatan</Text>
                            </div>
                          </div>
                        </Box>
                      </div>
                      <div class="col-4">
                        <Box borderRadius={"10px"} width="100%" boxShadow='md' bg='#FFFFFF' marginTop={"10px"} paddingBottom={"10px"}>
                          <div class="row">
                            <div class="col-5">
                              <Image src={kategori2} width='70%' style={{marginLeft:"25px", marginTop:"5px"}}/>
                            </div>
                            <div class="col-7">
                              <Text class="h6" style={{marginTop:"50px"}}>Vitamin & Suplemen</Text>
                            </div>
                          </div>
                        </Box>
                      </div>
                      <div class="col-4">
                        <Box borderRadius={"10px"} width="100%" boxShadow='md' bg='#FFFFFF' marginTop={"10px"} paddingBottom={"10px"}>
                          <div class="row">
                            <div class="col-5">
                              <Image src={kategori3} width='70%' style={{marginLeft:"25px", marginTop:"5px"}}/>
                            </div>
                            <div class="col-7">
                              <Text class="h6" style={{marginTop:"50px"}}>Perawatan Tubuh</Text>
                            </div>
                          </div>
                        </Box>
                      </div>
                    </div>
                  </Box>
              </div>
            </Box>
          </div>
        </div>
      </div>
      <div class="container">
        <div>
          <Box marginTop={"40px"}>
            <Text class="h6b">Rekomendasi</Text>
          </Box>
          <div class="VectorRekomendasi" style={{height:"400px"}}>
            <div class="row">
              <div class="col-2"></div>
              <div class="col-2">
                <Box borderRadius={"10px"} width="100%" height="88%" boxShadow='lg' bg='#FFFFFF' marginTop={"50px"} paddingBottom={"10px"}>
                  <div class="row">
                    <div class="row d-flex justify-content-center">
                      <Image src={obat1} width='85%' style={{marginLeft:"25px", marginTop:"5px"}}/>
                      <Text class="h6b" style={{marginLeft:"35px"}}>Panadol</Text>
                    </div>
                    <div class="row">
                      <Text class="h6b" style={{marginTop:"65px", marginLeft:"20px"}}>Rp. 12.000 / Saset</Text>
                    </div>
                  </div>
                  <div class="d-flex justify-content-center mt-2">
                    <Button isLoading={loadingStat} loadingText='Loading' class="btn-rekom" onClick={btnCart}>Add To Cart</Button>
                    <Modal style={{color: "#000000"}} onClose={() => setShow(!show)} show={show} />
                  </div>
                </Box>
              </div>
              <div class="col-2">
                <Box borderRadius={"10px"} width="100%" height="88%" boxShadow='lg' bg='#FFFFFF' marginTop={"50px"} paddingBottom={"10px"}>
                  <div class="row">
                    <div class="row d-flex justify-content-center">
                      <Image src={obat2} width='85%' style={{marginLeft:"25px", marginTop:"5px"}}/>
                      <Text class="h6b" style={{marginLeft:"35px"}}>Decolgen</Text>
                    </div>
                    <div class="row">
                      <Text class="h6b" style={{marginTop:"65px", marginLeft:"20px"}}>Rp. 2.300 / Saset</Text>
                    </div>
                  </div>
                  <div class="d-flex justify-content-center mt-2">
                    <Button isLoading={loadingStat} loadingText='Loading' class="btn-rekom" onClick={btnCart}>Add To Cart</Button>
                  </div>
                </Box>
              </div>
              <div class="col-2">
                <Box borderRadius={"10px"} width="100%" height="88%" boxShadow='lg' bg='#FFFFFF' marginTop={"50px"} paddingBottom={"10px"}>
                  <div class="row">
                    <div class="row d-flex justify-content-center">
                      <Image src={obat3} width='85%' style={{marginLeft:"25px", marginTop:"5px"}}/>
                      <Text class="h6b" style={{marginLeft:"35px"}}>Blackmores Multivitamin</Text>
                    </div>
                    <div class="row">
                      <Text class="h6b" style={{marginTop:"40px", marginLeft:"20px"}}>Rp. 550.000 / Botol</Text>
                    </div>
                  </div>
                  <div class="d-flex justify-content-center mt-2">
                    <Button isLoading={loadingStat} loadingText='Loading' class="btn-rekom" onClick={btnCart}>Add To Cart</Button>
                  </div>
                </Box>
              </div>
              <div class="col-2">
                <Box borderRadius={"10px"} width="100%" height="88%" boxShadow='lg' bg='#FFFFFF' marginTop={"50px"} paddingBottom={"10px"}>
                  <div class="row">
                    <div class="row d-flex justify-content-center">
                      <Image src={obat4} width='85%' style={{marginLeft:"25px", marginTop:"5px"}}/>
                      <Text class="h6b" style={{marginLeft:"35px"}}>Enervon-C</Text>
                    </div>
                    <div class="row">
                      <Text class="h6b" style={{marginTop:"65px", marginLeft:"20px"}}>Rp. 35.000 / Saset</Text>
                    </div>
                  </div>
                  <div class="d-flex justify-content-center mt-2">
                    <Button isLoading={loadingStat} loadingText='Loading' class="btn-rekom" onClick={btnCart}>Add To Cart</Button>
                  </div>
                </Box>
              </div>
              <div class="col-2">
                <Box borderRadius={"10px"} width="100%" height="88%" boxShadow='lg' bg='#FFFFFF' marginTop={"50px"} paddingBottom={"10px"}>
                  <div class="row">
                    <div class="row d-flex justify-content-center">
                      <Image src={obat5} width='85%' style={{marginLeft:"25px", marginTop:"5px"}}/>
                      <Text class="h6b" style={{marginLeft:"35px"}}>Derma AnGel Acne Patch Day</Text>
                    </div>
                    <div class="row">
                      <Text class="h6b" style={{marginTop:"40px", marginLeft:"20px"}}>Rp. 16.500 / Saset</Text>
                    </div>
                  </div>
                  <div class="d-flex justify-content-center mt-2">
                    <Button isLoading={loadingStat} loadingText='Loading' class="btn-rekom" onClick={btnCart}>Add To Cart</Button>
                  </div>
                </Box>
              </div>
            </div>
          </div>
        </div>
          <Divider borderWidth={"1px"} borderColor={"#333333"} style={{marginTop:"40px"}}/>
          <Box marginTop={"40px"}>
            <Text class="h6b">Jaminan Untuk Anda</Text>
          </Box>
        <div class="row mt-5">
          <div class="col-4">
            <Box borderRadius={"10px"} height="100%" width="100%" boxShadow='md' bg='#F6F8FC' marginTop={"10px"} paddingBottom={"10px"}>
              <div class="row">
                <div class="col-5">
                  <Image src={jaminan1} width='80%' style={{marginLeft:"25px", marginTop:"15px"}}/>
                </div>
                <div class="col-7">
                  <Text class="h6b" style={{marginTop:"30px"}}>100% Obat Asli</Text>
                  <Text class="h6" style={{marginTop:"10px"}}>Semua produk yang kami jual dijamin asli & kualitas terbaik untuk Anda.</Text>
                </div>
              </div>
            </Box>
          </div>
          <div class="col-4">
            <Box borderRadius={"10px"} height="100%" width="100%" boxShadow='md' bg='#F6F8FC' marginTop={"10px"} paddingBottom={"10px"}>
              <div class="row">
                <div class="col-5">
                  <Image src={jaminan2} width='80%' style={{marginLeft:"25px", marginTop:"5px"}}/>
                </div>
                <div class="col-7">
                  <Text class="h6b" style={{marginTop:"30px"}}>Dijamin Hemat</Text>
                  <Text class="h6" style={{marginTop:"10px"}}>Harga yang kami tawarkan lebih murah dari apotek online lainnya.</Text>
                </div>
              </div>
            </Box>
          </div>
          <div class="col-4">
            <Box borderRadius={"10px"} height="100%" width="100%" boxShadow='md' bg='#F6F8FC' marginTop={"10px"} paddingBottom={"10px"}>
              <div class="row">
                <div class="col-5">
                  <Image src={jaminan3} width='95%' style={{marginLeft:"20px", marginTop:"15px"}}/>
                </div>
                <div class="col-7">
                  <Text class="h6b" style={{marginTop:"30px"}}>Pengiriman Cepat</Text>
                  <Text class="h6" style={{marginTop:"10px"}}>Tak perlu antre, kami akan kirim ke alamat Anda dengan waktu yang cepat!</Text>
                </div>
              </div>
            </Box>
          </div>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      </div>
      <div style={{backgroundColor:"#F6F8FC"}}>
        <div class="container text-center">
          <Text class="h6b" style={{paddingTop:"30px"}}>Metode Pembayaran</Text>
          <div class="d-flex justify-content-center">
            <Image src={bank1} height="15%" width='12%' style={{marginLeft:"20px", marginTop:"25px"}}/>
            <Image src={bank2} width='15%' style={{marginLeft:"20px", marginTop:"15px"}}/>
          </div>
        </div>
        <br/>
        <br/>
      </div>
      <div style={{backgroundColor:"#586BB1"}}>
        <div class="container text-center">
          <Text class="h6" style={{paddingTop:"20px", paddingBottom:"20px", color:"#FFFFFF"}}>Group 1 Final Project - JCWDAHLS01</Text>
        </div>
      </div>
    </>
  )
}

export default LandingPage;