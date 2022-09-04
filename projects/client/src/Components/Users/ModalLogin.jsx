import Axios from "axios";
import React from "react";
import Register from "../../Assets/DevImage/Register.png";
import logo from "../../Assets/DevImage/LogoMedhika.png";
import { API_URL } from "../../helper";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginAction } from "../../Redux/Actions/userActions";
import { useDisclosure, useToast } from '@chakra-ui/react';
import { useToastHook } from "../CustomToast";
import { Flex, Box, Heading, Input, Image, Text, Divider, Spacer, ButtonGroup, Button, Link, extendTheme, InputGroup, InputLeftElement,
  InputRightElement, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel} from '@chakra-ui/react';

function ModalLogin(props) {
  // const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const toast = useToast()
  const [currentToast, newToast]=useToastHook();
  const [loadingStat, setLoadingStat]=React.useState(false);

  const [inForm, setInForm] = React.useState({
    email: '',
    password: ''
  })
  const handleInput = (value, property) => {
    setInForm({ ...inForm, [property]: value})
  }

  const handleLogin =async (event) => {
    try {
      // setDisable(!disable)
      setLoadingStat(true);
      if(inForm.email== "" || inForm.password== ""){
        // alert("Fill in all form")
        newToast({
          title: 'Login Tidak Berhasil.',
          description: "Mohon isi semua data login.",
          status: 'error',
        })
        setLoadingStat(false);
      } else {
        if(inForm.email.includes("@")){
          console.log("inForm emails", inForm.email)
          let res = await Axios.post(`${API_URL}/users/login`, {
            email: inForm.email,
            password: inForm.password
          })
          if (res.data.role == "user") {
            // console.log("RES DATA ROLE LOGIN", res.data.role)
            localStorage.setItem("tokenIdUser", res.data.token)
            dispatch(loginAction(res.data))
            newToast({
              title: 'Login Berhasil.',
              description: "Selamat datang di medhika",
              status: 'success',
            })
            setLoadingStat(false);
            // setDisable(!disable)
            navigate("/")
          } else {
            localStorage.setItem("tokenIdUser", res.data.token)
            dispatch(loginAction(res.data))
            newToast({
              title: 'Login Admin Berhasil.',
              description: "Selamat datang di dashboard admin",
              status: 'success',
            })
            setLoadingStat(false);
            // setDisable(!disable)
            navigate("/admin/dashboard")
          }
        } else {
          // setDisable(!disable)
          newToast({
            title: 'Login Tidak Berhasil.',
            description: "Email tidak terdaftar, pastikan email yang anda isi benar dan sudah terdaftar",
            status: 'error',
          })
          setLoadingStat(false);
          // setOpenToast(!openToast)
          // setToastMsg(`Your username or email is not registered.
          // please check again`)
          // alert("username or email wrong")
        }
      }
    } catch (err) {
      newToast({
        title: 'Login Tidak Berhasiltes.',
        description: err.response.data.message,
        status: 'error',
      })
      setLoadingStat(false);
      // setDisable(!disable)
      // setOpenToast(!openToast)
      // setToastMsg(`${error.response.data.message}`)
      // alert(error.response.data.message)
    }
  }
  // const OverlayOne = () => (
  //   <ModalOverlay
  //     bgColor='#00000098'
  //   />
  // )

  console.log(inForm.email, inForm.password)
  return (
    <>
      <Modal
        isCentered
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={props.show}
        onClose={props.onClose}
        motionPreset='slideInBottom'
        >
        {/* <OverlayOne /> */}
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Masuk ke Medhika</ModalHeader>
          <Text class="h6" style={{marginTop:"5px", marginLeft:"25px"}}>Masukkan email dan password untuk mulai menggunakan layanan kesehatan di Medhika</Text>
          <ModalCloseButton onClick={props.onClose}/>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input value={inForm.email} onChange={(event)=> handleInput(event.target.value, "email")} placeholder='Contoh@mail.com' />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <InputGroup size='md'>
                  <Input bgColor={"#FFFFFF"} boxShadow='md'
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    value={inForm.password} onChange={(event)=> handleInput(event.target.value, "password")}
                    placeholder='Masukan Password'
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Link href='/forgot' class="h6br">Forgot Password?</Link>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button isLoading={loadingStat} loadingText='Loading' class="btn-def me-3"
              onClick={handleLogin}>Login</Button>
            <Button class="btn-def_second2" onClick={props.onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalLogin;