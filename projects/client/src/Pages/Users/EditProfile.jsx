import Axios from "axios";
import React from "react";
import { API_URL } from "../../helper";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useDisclosure, useToast, useEditableControls } from '@chakra-ui/react';
import { loginAction } from "../../Redux/Actions/userActions";
import { Text, Button, Input, Box, Image, InputGroup, Flex, IconButton, Editable, EditablePreview, EditableInput,
          ButtonGroup, Select} from '@chakra-ui/react';
import { FaRegEdit } from 'react-icons/fa';
import { HiCheck } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import NavbarComponent from "../../Components/Users/Navbar";
import { useToastHook } from "../../Components/CustomToast";

const EditProfile=(props)=>{
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast()
  const [loadingStat, setLoadingStat]=React.useState(false);
  const [currentToast, newToast]=useToastHook();
  const {isVerified, email, gender, birthDateFE, users, name, profilePicture, token}=useSelector((state) => {
    return {
        isVerified:state.userReducers.isVerified,
        email:state.userReducers.email,
        gender:state.userReducers.gender,
        birthDateFE:state.userReducers.birthDateFE,
        users:state.userReducers.users,
        name:state.userReducers.name,
        profilePicture:state.userReducers.profilePicture,
        token:state.userReducers.token
        }
    })

  const [nameEdit, setNameEdit]=React.useState("")
  const [emailEdit, setEmailEdit]=React.useState("")
  const [genderEdit, setGenderEdit]=React.useState("")
  const [birthDateEdit, setBirthDateEdit]=React.useState("")
  const inputFile = React.useRef(null);
  const [previewPost, setPreviewPost] = React.useState(false)
  const [editProfile, setEditProfile] = React.useState(false)
  const [file, setFile] = React.useState();
  const [imgPosting, setImgPosting] = React.useState([]);
  // const [emailProfile, setEmailProfile]=React.useState(email)

  // console.log("username", usernameProfile, "fullname",fullnameProfile, "bio", bioProfile)
  // console.log("fullname",fullnameProfile != "")
  // console.log("username",usernameProfile != "")
  // console.log("bio",bioProfile != "")
  // console.log("check imgPosting edit foto",imgPosting)
  
  const handleEditFoto = async()=>{
    try {
      // console.log("check users", users[0].iduser)
      // alert('check')
      let iduserLogin = users[0].iduser
      let formData = new FormData()
        let data = {
          iduserLogin
          
        }
      // console.log('data edit foto', data)
      // menambahkan data kedalam formData yang harus pake JSON.stringify
      formData.append('data', JSON.stringify(data));
  
      // menambahkan images
      imgPosting.forEach(val=>formData.append('profile', val));
      let token = localStorage.getItem("tokenIdUser");
      // console.log("resPosting edit foto", resPosting.data)
      // console.log("token edit foto", token)
      // alert('token')
      let res = await Axios.patch(`${API_URL}/users/fotoprof`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      // let a = formData
      // console.log("resPosting edit foto", res.data)
      // alert('edit foto profile ke BE')
      if (res.data.token) {
        // console.log("RES DATA TOKEN LOGIN", res.data.token)
        localStorage.setItem("tokenIdUser", res.data.token)
        dispatch(loginAction(res.data.token))
      }
      // dispatch(getPostings())
  } catch (error) {
    console.log(error)
  }
}
  const handleEditProfile=async()=>{
    try {
      setLoadingStat(true)
        // console.log(usernameProfile, fullnameProfile, bioProfile, "username", username)
        if(previewPost==true){

          if(nameEdit != "" || emailEdit !="" || genderEdit !="" || birthDateEdit !=""){
            let token = localStorage.getItem("tokenIdUser");
            let res = await Axios.patch(`${API_URL}/users/edit`, {
              name: nameEdit,
              email: emailEdit,
              gender: genderEdit,
              birthDate: birthDateEdit
            }, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
            if (res.data.token) {
              // console.log("RES DATA TOKEN LOGIN", res.data.token)
              localStorage.setItem("tokenIdUser", res.data.token)
              dispatch(loginAction(res.data.token))
              setEditProfile(!editProfile)
              newToast({
                title: 'Edit Profile Berhasil.',
                description: 'Data pada profile anda sudah terupdate.',
                status: 'success',
              })
              setLoadingStat(false)
            }
            {handleEditFoto()}
            
          } 
        } else {
          if(nameEdit != "" || emailEdit !="" || genderEdit !="" || birthDateEdit !=""){
            let token = localStorage.getItem("tokenIdUser");
            let res = await Axios.patch(`${API_URL}/users/edit`, {
              name: nameEdit,
              email: emailEdit,
              gender: genderEdit,
              birthDate: birthDateEdit
            }, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
            if (res.data) {
              console.log("RES DATA EDIT PROFILE", res.data)
              localStorage.setItem("tokenIdUser", res.data.token)
              dispatch(loginAction(res.data))
              newToast({
                title: 'Edit Profile Berhasil.',
                description: 'Data pada profile anda sudah terupdate.',
                status: 'success',
              })
              setLoadingStat(false)
              setEditProfile(!editProfile)
            }
          } 
        }
      } catch (err) {
        newToast({
          title: 'Edit Profile Tidak Berhasil.',
          description: err.response.data.message,
          status: 'success',
        })
        setLoadingStat(false)
      }
    } 

  const onButtonClick = () => {
    inputFile.current.click();
    setPreviewPost(!previewPost);
  };

  const handleFileUpload = (e) => {  
    setImgPosting([e.target.files[0]]);
    setFile(URL.createObjectURL(e.target.files[0]))
  };
  
  const handleCancel = () => {
    setEditProfile(!editProfile);
    setEmailEdit("");
  };

  console.log("check users", gender, birthDateFE, editProfile)
  console.log("edit value", nameEdit, emailEdit, genderEdit, birthDateEdit)

  return (
    <>
    <Box
      w='100%'
      h='100%'
      bgGradient='linear(#f6f8fc, #FFFFFF)'
    >
    <Box boxShadow='md'>
      <NavbarComponent/>
    </Box>
      <div class="container">
        <div class="row mt-5">
          <div class="col-2">

          </div>
          <div class="col-3">
            <Image
              borderRadius='full'
              boxSize='100%'
              src={profilePicture}
              alt='Foto Profile'
            />
          </div>
          <div class="col-5">
            {
              editProfile == false ?
              <>
              <div class="rounded-4 mt-5" style={{backgroundColor:"#edf0f4", paddingTop:"20px"}}>
                <Flex ms={"40px"}>
                  <Text class="h5b text-uppercase">{name}</Text>
                </Flex>
                <Flex mt={"10px"} ms={"40px"}>
                    <Text class="h5">{email}</Text>
                </Flex>
                <Flex mt={"10px"} ms={"40px"}>
                    <Text class="h5">{gender}</Text>
                </Flex>
                <Flex mt={"10px"} ms={"40px"}>
                    <Text class="h5">{birthDateFE}</Text>
                </Flex>
              </div>
                <IconButton shadow={"md"} mt={"10px"} size='md' icon={<FaRegEdit color="#DE1B51" size={'25px'} />} onClick={() => setEditProfile(!editProfile)} />
              </>
            :
              <>
              <div class="rounded-4 mt-5" style={{backgroundColor:"#edf0f4", paddingTop:"20px"}}>
                <Flex ms={"40px"} me={"40px"}>
                <Input bgColor={"#FFFFFF"} boxShadow='md' fontSize={"xl"} fontWeight="bold" textTransform={"uppercase"}
                    onChange={(e)=>setNameEdit(e.target.value)} defaultValue={name} />
                </Flex>
                <Flex mt={"10px"} ms={"40px"} me={"40px"} >
                  <Input bgColor={"#FFFFFF"} boxShadow='md' fontSize={"xl"}
                    onChange={(e)=>setEmailEdit(e.target.value)} defaultValue={email} />
                </Flex>
                <Flex mt={"10px"} ms={"40px"} me={"40px"} boxShadow='md'>
                  <Select placeholder='Gender' bgColor={"#FFFFFF"} fontSize={"xl"} 
                    onChange={(e)=>setGenderEdit(e.target.value)}>
                    <option>Pria</option>
                    <option>Wanita</option>
                  </Select>
                  {/* <Input bgColor={"#FFFFFF"} boxShadow='md' fontSize={"xl"} placeholder=""
                    onChange={(e)=>setNameEdit(e.target.value)} defaultValue={gender} /> */}
                </Flex>
                <Flex mt={"10px"} ms={"40px"} me={"40px"}>
                  <Input bgColor={"#FFFFFF"} boxShadow='md' fontSize={"xl"} placeholder="YYYY-MM-DD"
                    onChange={(e)=>setBirthDateEdit(e.target.value)} defaultValue={birthDateFE} />
                </Flex>
                <ButtonGroup mt={"10px"} ms={"40px"} pb={"10px"}>
                  <Button isLoading={loadingStat} loadingText='Loading' class="btn-def" onClick={handleEditProfile}>Submit</Button>
                  <Button class="btn-def_second2" onClick={handleCancel}>Cancel</Button>
                </ButtonGroup>
              </div>
                {/* <IconButton shadow={"md"} mt={"10px"} size='md' icon={<FaRegEdit color="#DE1B51" size={'25px'} />} onClick={() => setEditProfile(!editProfile)} /> */}
              </>
          }
          </div>
          <div class="col-2">

          </div>
        </div>
          <div class="row mt-5" style={{borderBlockWidth:"2px", borderBlockColor:"#333333"}}>
            <br />
            <br />
            <br />
            <Text class="h3 mt-3">Address</Text>
          </div>
      </div>
    </Box>
    </>
  )
}

export default EditProfile;