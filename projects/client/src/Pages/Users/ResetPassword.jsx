import Axios from "axios";
import React from "react";
import { API_URL } from "../../helper";
// import { Button, FormGroup, Input, InputGroup, Label, InputGroupText } from "reactstrap";
import { Button, Text, Box, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
// import { resetPassword } from "../redux/action/usersAction";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosWarning } from "react-icons/io";
import { useDisclosure, useToast } from '@chakra-ui/react';
import { loginAction } from "../../Redux/Actions/userActions";
import { logoutAction } from "../../Redux/Actions/userActions";
import NavbarComponent from "../../Components/Users/Navbar";
import { useToastHook } from "../../Components/CustomToast";

const ResetPassword=(props)=>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [password, setPassword]=React.useState("");
  const [passwordLength, setPasswordLength]=React.useState(false);
  const [containsNumbers, setContainsNumbers]=React.useState(false);
  const [isUpperCase, setIsUpperCase]=React.useState(false);
  const [confirmPassword, setConfirmPassword]=React.useState("");
  const toast = useToast()
  const [loadingStat, setLoadingStat]=React.useState(false);
  const [currentToast, newToast]=useToastHook();
  const { token }=useSelector((state) => {
    return {
        token:state.userReducers.token
      }
    })

  console.log("password", password)
  console.log("konfirmasi password", confirmPassword)
  console.log("token reset", token)
  console.log("params",params.token);
  console.log("BOOLEAN TOKEN params",token == params.token);


  const [inForm, setInForm] = React.useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleReset =async()=>{
    try {
      // setDisable(!disable)
      setLoadingStat(true);
      checkStrongPassword();
      if (password=="" || confirmPassword==""){
        // alert("Fill in all form")
        newToast({
          title: 'Reset Password Tidak Berhasil.',
          description: 'Mohon isi password dan konfirmasi password.',
          status: 'error',
        })
        setLoadingStat(false)
        // setOpenToast(!openToast)
        // setToastMsg(`Form Cannot Be Empty,
        // Fill In All Form!`)
        // console.log(username, email, password, confPassword)
      } else{
        if (password!=confirmPassword){
          // setOpenToast(!openToast)
          // setToastMsg(`Password Not Match`)
          newToast({
            title: 'Reset Password Tidak Berhasil.',
            description: 'Konfirmasi password tidak sesuai dengan password.',
            status: 'error',
          })
          setLoadingStat(false)
          // alert("Password not match")
        } else {
          let res = await Axios.patch(`${API_URL}/users/reset`, { newPassword: password },
          {
            headers: {
              'Authorization': `Bearer ${params.token}`
            }
          })
          // console.log("res.data registerUser", res.data)
          if (res.data) {
            // setOpenToast(!openToast)
            // setToastMsg(`Registration success,
            // Verified your account with link verification in your email`)
            // console.log("res.data FE", res.data)
            // console.log("res.data.token FE", res.data.token)
            // localStorage.setItem("tokenIdUser", res.data.token)
            dispatch(logoutAction())
            newToast({
              title: 'Reset Password Berhasil.',
              description: 'Silahkan login dengan password baru anda.',
              status: 'success',
            })
            // alert(`registration success,
            // verified your account with link verification in email`)
            // console.log("token2 regis", token)
            // setDisable(!disable)
            setLoadingStat(false)
            navigate("/")
          }
        } 
      }    
    } catch (err) {
      // setOpenToast(!openToast)
      // setToastMsg(`${error.response.data.message}`)
      newToast({
        title: 'Reset Password Tidak Berhasil.',
        description: 'Coba lakukan kembali dengan data yang benar',
        status: 'error',
      })
      setLoadingStat(false)
      // alert(err.response.data.message)
      // console.log(disable)
      // setDisable(!disable)
  }
  }

  const handleInput = (value, property) => {
    setInForm({ ...inForm, [property]: value})
    checkUpperCase();
    checkNumbers();
    if(inForm.password.length > 6){
      setPasswordLength(true);
    } else {
      setPasswordLength(false)
    }
    // console.log("cek password.length",inForm.password.length)
    // console.log(inForm.password)
  }

  const checkStrongPassword =()=>{
    console.log(isUpperCase, containsNumbers, passwordLength)
    if(passwordLength== false || isUpperCase==false ||
      containsNumbers==false ){
        newToast({
          title: 'Password Lemah.',
          description: 'Disarankan untuk merubah password yang kuat. setidaknya memiliki 8 huruf yang terdiri dari huruf kapital dan angka',
          status: 'warning',
        })
        // alert("Weak password")
        // setOpenToast(!openToast)
        // setToastMsg(`Weak Password !
        // plaase create strong password.`)
  }
}

const checkUpperCase=()=>{
  // console.log("cek uppercase", isUpperCase)
  if (inForm.password.match(/^(?=.*[A-Z])/)){
    setIsUpperCase(true)
  } else {
    setIsUpperCase(false)
  }
}

const checkNumbers=()=>{
  // console.log("cek number", containsNumbers)
  if (inForm.password.match(/\d+/g)){
    setContainsNumbers(true)
  } else {
    setContainsNumbers(false)
  }
}

  return( <>
  <Box
      w='100%'
      h='100%'
      bgGradient='linear(#f6f8fc, #FFFFFF)'
    >
    <Box boxShadow='md'>
      <NavbarComponent/>
    </Box>
  {
    token == params.token ?
    <>
      <div className="container text-center pt-5 pb-5">
        <h4 className="h4-register">Create New Password</h4>
        <br />
        <hr />
        <br />
        <div className="row">
          <div className="col-4">
          </div>
          <div className="col-4">
          <Box marginTop={"20px"}>
                <Text class="h6b">Password</Text>
                  <InputGroup size='md'>
                    <Input bgColor={"#FFFFFF"} boxShadow='md'
                      pr='4.5rem'
                      type={show ? 'text' : 'password'}
                      placeholder='Masukan Password' onChange={(e) =>  { handleInput(e.target.value, "password"); setPassword(e.target.value)}}
                    />
                    <InputRightElement width='4.5rem'>
                      <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                <div>
                  <div class="h6 mt-3">Password yang kuat setidaknya harus :</div>
                  <span class={passwordLength ? 'h6r' : 'h6'}> 8 huruf</span>
                  <span class="h6"> terdiri dari </span>
                  <span class={isUpperCase ? 'h6r' : 'h6'}>Huruf Kapital</span>
                  <span class="h6"> dan </span>
                  <span class={containsNumbers ? 'h6r' : 'h6'}>Angka</span>
                </div>
              </Box>
              <Box marginTop={"20px"}>
                <Text class="h6b">Konfirmasi Password</Text>
                  <InputGroup size='md'>
                    <Input bgColor={"#FFFFFF"} boxShadow='md'
                      pr='4.5rem'
                      type={show ? 'text' : 'password'}
                      placeholder='Masukan Konfirmasi Password' onChange={(e)=>setConfirmPassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                      <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
              </Box>
                <Button isLoading={loadingStat} loadingText='Loading' style={{marginTop:"25px"}} class="btn-def_second" onClick={handleReset}>Reset Password</Button>
          </div>
          <div className="col-4">
          </div>
        </div>
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
    </>
    : 
    <div class="container text-center">
    <div class="row mt-5">
      <div class="col-4">

      </div>
      <div class="col-4">
        <div class="d-flex justify-content-center">
          <IoIosWarning class="mt-5" size={"150px"} style={{color:"#DE1B51"}} />
        </div>
        <Text class="h5">Invalid Token</Text>
        {/* onClick={() => navigate("/")} */}
        <Button class="btn-def_second mt-3 h5b" onClick={() => navigate("/")}>Close this page</Button>
      </div>
      <div class="col-4">

      </div>
    </div>
  </div>
  }
  </Box>
  </>
  )
}

export default ResetPassword;