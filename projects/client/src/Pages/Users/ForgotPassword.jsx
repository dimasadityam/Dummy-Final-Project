import Axios from "axios";
import React from "react";
import { API_URL } from "../../helper";
import { useDispatch } from 'react-redux'
// import { forgotPassword } from "../redux/action/usersAction";
import { useNavigate, useParams } from "react-router-dom";
import { useDisclosure, useToast } from '@chakra-ui/react';
import { Flex, Box, Heading, Input, Image, Text, Divider, Spacer, ButtonGroup, Button, Link, extendTheme, InputGroup, InputLeftElement,
  InputRightElement, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Popover,
  PopoverTrigger, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody, PopoverFooter } from '@chakra-ui/react';
import { loginAction } from "../../Redux/Actions/userActions";
import NavbarComponent from "../../Components/Users/Navbar";
import { useToastHook } from "../../Components/CustomToast";


const ForgotPassword=(props)=>{
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailForgot, setEmailForgot]=React.useState("")
  const toast = useToast()
  const [loadingStat, setLoadingStat]=React.useState(false);
  const [currentToast, newToast]=useToastHook();
  

//   React.useEffect(() => {
//     dispatch(forgotPassword());
// }, []);


  const handleSubmit =async()=>{
    try {
      setLoadingStat(true)
      if (emailForgot==""){
        newToast({
          title: 'Lupa Password Tidak Berhasil.',
          description: 'Masukan email anda.',
          status: 'error',
        })
        setLoadingStat(false)
      }else{
        console.log("emailfor", emailForgot)
      let res = await Axios.post(`${API_URL}/users/forgot`, {
        email: emailForgot
      })
      // console.log("res", res)
      if (res.data) {
        console.log("res.data forgotPassword", res.data)
        localStorage.setItem("tokenIdUser", res.data.token)
        // dispatch(loginAction(res.data))
        newToast({
          title: 'Lupa Password Berhasil.',
          description: 'Masukkan password baru melalui link yang dikirim ke email anda',
          status: 'success',
        })
        setLoadingStat(false)
        // alert('Check Link Reset Password in Your Email')
        // dispatch(forgotAction(res.data))
      }
      }

    } catch (err) {
      newToast({
        title: 'Lupa Password Tidak Berhasil.',
        status: 'error',
      })
      setLoadingStat(false)
    }
  }
console.log(emailForgot)

  return( <>
  <Box
      w='100%'
      h='100%'
      bgGradient='linear(#f6f8fc, #FFFFFF)'
    >
    <Box boxShadow='md'>
      <NavbarComponent/>
    </Box>
    <div class="container text-center pt-5 pb-5">
    <Text class="h3">Forgot Password</Text>
    <br />
    <hr />
    <br />
    <div class="row">
      <div class="col-4">
      </div>
      <div class="col-4">
        <Box>
          <Text class="h5">Email</Text>
          <Input shadow={"md"} type="email" placeholder="Input Your Email" onChange={(e)=>setEmailForgot(e.target.value)}/>
        </Box>
        <div class="d-grid gap-2 mx-auto mt-3">
          <Button class="btn btn-danger" isLoading={loadingStat} loadingText='Loading' 
            onClick={handleSubmit}>
              Submit
            </Button>
        </div>
        <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
      <div class="col-4">
      </div>
    </div>
      </div>
  </div>
  </Box>
  </>
  )
}

export default ForgotPassword;