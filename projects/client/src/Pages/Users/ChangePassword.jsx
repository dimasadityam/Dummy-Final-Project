import Axios from "axios";
import React from "react";
import { API_URL } from "../../helper";
import { Button, Text, Box, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { IoIosWarning } from "react-icons/io";
import { useDisclosure, useToast } from '@chakra-ui/react';
import { loginAction, logoutAction } from "../../Redux/Actions/userActions";
import NavbarComponent from "../../Components/Users/Navbar";
import { useToastHook } from "../../Components/CustomToast";


const ChangePassword=(props)=>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const [oldPassword, setOldPassword]=React.useState("")
  const [newPassword, setNewPassword]=React.useState("")
  const [passwordLength, setPasswordLength]=React.useState(false)
  const [containsNumbers, setContainsNumbers]=React.useState(false)
  const [isUpperCase, setIsUpperCase]=React.useState(false)
  const [confirmPassword, setConfirmPassword]=React.useState("")
  const toast = useToast()
  const [loadingStat, setLoadingStat]=React.useState(false);
  const [currentToast, newToast]=useToastHook();
  const { token }=useSelector((state) => {
    return {
        token:state.userReducers.token
      }
    })

  console.log("password", oldPassword)
  console.log("password", newPassword)
  console.log("konfirmasi password", confirmPassword)
  console.log("token reset", token)
  console.log("params",params.token);
  console.log("BOOLEAN TOKEN params",token == params.token);


  const [inForm, setInForm] = React.useState({
    oldPassword: '',
    newPassword: '',
    confPassword: ''
  })

  const handleSubmit =async()=>{
    try {
      setLoadingStat(true);
      checkStrongPassword();
      if (oldPassword=="" || newPassword=="" || confirmPassword==""){
        newToast({
          title: 'Change Password Tidak Berhasil.',
          description: 'Mohon isi password lama, password baru dan konfirmasi password',
          status: 'error',
        })
        setLoadingStat(false);
      } else{
        if (newPassword!=confirmPassword){
          newToast({
            title: 'Change Password Tidak Berhasil.',
            description: 'Konfirmasi password tidak sesuai dengan password baru anda',
            status: 'error',
          })
          setLoadingStat(false);
          // alert("Password not match")
        } else {
          let token = localStorage.getItem("tokenIdUser");
          let res = await Axios.patch(`${API_URL}/users/change`, {
            oldPassword: oldPassword,
            newPassword: newPassword
          }, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          // console.log("res.data registerUser", res.data)
          if (res.data) {
            dispatch(loginAction(res.data))
            newToast({
              title: 'Change Password Berhasil.',
              description: 'Silahkan login dengan password baru anda',
              status: 'success',
            })
            setLoadingStat(false);
            navigate("/")
          }
        } 
      }    
    } catch (err) {
      newToast({
        title: 'Change Password Tidak Berhasil.',
        description: err.response.data.message,
        status: 'error',
      })
      setLoadingStat(false);
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
  }
}

const checkUpperCase=()=>{
  if (inForm.password.match(/^(?=.*[A-Z])/)){
    setIsUpperCase(true)
  } else {
    setIsUpperCase(false)
  }
}

const checkNumbers=()=>{
  if (inForm.password.match(/\d+/g)){
    setContainsNumbers(true)
  } else {
    setContainsNumbers(false)
  }
}

  return( <>
  {/* {
    token == params.token ? */}
    <Box
      w='100%'
      h='100%'
      bgGradient='linear(#f6f8fc, #FFFFFF)'
    >
    <Box boxShadow='md'>
      <NavbarComponent/>
    </Box>
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
                <Text class="h6b">Old Password</Text>
                  <InputGroup size='md'>
                    <Input bgColor={"#FFFFFF"} boxShadow='md'
                      pr='4.5rem'
                      type={show ? 'text' : 'password'}
                      placeholder='Old Password' onChange={(e) =>  { handleInput(e.target.value, "password"); setOldPassword(e.target.value)}}
                    />
                    <InputRightElement width='4.5rem'>
                      <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
              </Box>
          <Box marginTop={"20px"}>
                <Text class="h6b">Password</Text>
                  <InputGroup size='md'>
                    <Input bgColor={"#FFFFFF"} boxShadow='md'
                      pr='4.5rem'
                      type={show ? 'text' : 'password'}
                      placeholder='New Password' onChange={(e) =>  { handleInput(e.target.value, "password"); setNewPassword(e.target.value)}}
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
                      placeholder='Confirm Password' onChange={(e)=>setConfirmPassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                      <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
              </Box>
                <Button isLoading={loadingStat} loadingText='Loading' style={{marginTop:"25px"}}
                  class="btn-def_second" onClick={handleSubmit}>Submit</Button>
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
  {/* } */}
  </Box>
  </>
  )
}

export default ChangePassword;