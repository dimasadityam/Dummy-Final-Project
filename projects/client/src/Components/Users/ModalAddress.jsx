import Axios from "axios";
import React from "react";
import Register from "../../Assets/DevImage/Register.png";
import logo from "../../Assets/DevImage/LogoMedhika.png";
import { API_URL } from "../../helper";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from "../../Redux/Actions/userActions";
import { getAddressActions } from "../../Redux/Actions/addressActions";
import { useDisclosure, useToast } from '@chakra-ui/react';
import { useToastHook } from "../CustomToast";
import { Flex, Box, Heading, Input, Image, Text, Divider, Spacer, ButtonGroup, Button, Link, extendTheme, InputGroup, InputLeftElement, 
  InputRightElement, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Checkbox,
  Textarea, Select} from '@chakra-ui/react';
import { getProvinceRajaOngkir, getProvinceActions2 } from "../../Redux/Actions/getProvinceActions";
import { getCityRajaOngkir } from "../../Redux/Actions/getCityActions";

function ModalAddress(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const toast = useToast()
  const [currentToast, newToast]=useToastHook();
  const [editKota, setEditKota]=React.useState("")
  const [editProvinsiId, setEditProvinsiId]=React.useState(0)
  const [loadingStat, setLoadingStat]=React.useState(false);
  const [editLabel, setEditLabel]=React.useState("")
  const [editPenerima, setEditPenerima]=React.useState("")
  const [editTelfon, setEditTelfon]=React.useState("")
  const [editAlamat, setEditAlamat]=React.useState("")
  const [editProvinsi, setEditProvinsi]=React.useState("")
  // const [editKota, setEditKota]=React.useState("")
  const [editKodePos, setEditKodePos]=React.useState("")
  const [editUtama, setEditUtama]=React.useState(false)
  const [editAddress, setEditAddress]=React.useState(false)

  const { address, getProvince, getProvince2, getCity }=useSelector((state) => {
    return {
        address:state.addressReducers.address,
        getProvince:state.getProvinceReducers.getProvince,
        getProvince2:state.getProvinceReducers.getProvince2,
        getCity:state.getCityReducers.getCity
        }
    })

  const [inForm, setInForm] = React.useState({
    email: '',
    password: ''
  })
  const handleInput = (value, property) => {
    setInForm({ ...inForm, [property]: value})
  }

  console.log("address reducer", address, props.data)

  const getProvinceRajaOngkir2 = async() => {
    try {
      console.log("PROVINCE_ID ACTIONS 2", editProvinsiId)
      // let token = localStorage.getItem("tokenIdUser");
      // console.log("TOKENN PROVINCE 2 RAJAONGKIR", token)
      // memeriksa adanya token
      if (editProvinsiId > 0) {
        console.log("PROVINCE2 JALANNN")
        let res = await Axios.get(`${API_URL}/rajaOngkir/getProvince2`, {
          headers: {
            provinceid: editProvinsiId
          }
        })
        if (res.data) {
          console.log("RES DATA GET PROVINCE RAJAONGKIR", res.data)
          dispatch(getProvinceActions2(res.data))
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleCity = async(e) => {
    try {
      console.log("====addProvinsiId func", editProvinsiId)
      if (editProvinsiId > 0){
        let a = editProvinsiId
        // let b = !getCityOn
        let city = getCityRajaOngkir(a)
        dispatch(city)
        if (getCity){
          setEditKota(e.target.value)
          {getProvinceRajaOngkir2()}
        }
        // setGetCityOn(!getCityOn)
      } else {
        alert("else")
      }
    } catch (error) {
      alert(error)
    }
  }

  const handleDeleteAddress = async () =>{
    try {
      setLoadingStat(true)
      props.onClose()
      let token = localStorage.getItem("tokenIdUser");
      let res = await Axios.post(`${API_URL}/address/deleteAddress`, {
        idAddress: props.data,
        isDefaultAddress: props.utama
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.data){
        dispatch(getAddressActions(res.data))
        // dispatch(loginAction(res.data))
          newToast({
            title: 'Delete Alamat Berhasil.',
            // description: 'Data pada profile anda sudah terupdate.',
            status: 'success',
          })
        setLoadingStat(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditAddress=async()=>{
    try {
      setLoadingStat(true)
      if(editAddress == true){
        let token = localStorage.getItem("tokenIdUser");
        let res = await Axios.patch(`${API_URL}/address/editAddress`, {
          idAddress: props.data,
          label: editLabel,
          address: editAlamat,
          province: getProvince2.namaProvinsi[0],
          city: editKota,
          postalCode: editKodePos,
          receiverName: editPenerima,
          receiverPhone: editTelfon,
          isDefaultAddress: editUtama
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (res.data) {
          // console.log("RES DATA EDIT PROFILE", res.data)
          // localStorage.setItem("tokenIdUser", res.data.token)
          dispatch(getAddressActions(res.data))
          newToast({
            title: 'Edit Alamat Berhasil.',
            description: 'Data pada alamat anda sudah terupdate.',
            status: 'success',
          })
          handleCancelEdit()
          setLoadingStat(false)
        }
      } 
    } catch (err) {
      newToast({
        title: 'Edit alamat Tidak Berhasil.',
        description: err.response.data.message,
        status: 'error',
      })
      setLoadingStat(false)
    }
  } 

  const printMyAddress=()=>{
    return address.map((value ,index) =>{
      if (value.idAddress == props.data){
        if (value.isDefaultAddress == "true"){
        return <>
          <div type="button" class="rounded-4" style={{backgroundColor:"#DE1B51", color:"#FFFFFF", paddingTop:"20px" }}>
          <Flex ms={"30px"} >
              <Text class="h6b text-uppercase" style={{color:"#FFFFFF"}}>{value.label}</Text>
              <Spacer />
              <Text class="h6b me-4" style={{color:"#FFFFFF"}}>Utama</Text>
            </Flex>
            <Divider />
            <Flex mt={"5px"} ms={"30px"} me={"30px"} >
              <Text class="h6" style={{color:"#FFFFFF"}}>{value.receiverName}</Text>
              <Spacer />
              <Text class="h6" style={{color:"#FFFFFF"}}>{value.receiverPhone}</Text>
            </Flex>
            <Flex mt={"10px"} ms={"30px"} me={"30px"} pb={"10px"}>
              <Text class="h6" style={{color:"#FFFFFF"}}>{value.address}, {value.city}, {value.province} {value.postalCode}</Text>
            </Flex>
          </div>
          <div class="d-flex justify-content-end pb-2">
            <ButtonGroup mt={6}>
              <Button isLoading={loadingStat} loadingText='Loading' class="btn-def me-3"
                onClick={handleDeleteAddress}>Delete</Button>
              <Button class="btn-def_second2" onClick={() => setEditAddress(!editAddress)}>Edit</Button>
            </ButtonGroup>
          </div>
        </>
        } else {
          return <>
            <div type="button" class="rounded-4" style={{backgroundColor:"#edf0f4", paddingTop:"0px"}}>
              <br/>
              <Flex ms={"30px"}>
                <Text as='u' class="h6b text-uppercase">{value.label}</Text>
              </Flex>
              <Flex mt={"5px"} ms={"30px"} me={"30px"} >
                <Text class="h6" style={{color:"#333333"}}>{value.receiverName}</Text>
                <Spacer />
                <Text class="h6" style={{color:"#333333"}}>{value.receiverPhone}</Text>
              </Flex>
              <Flex mt={"10px"} ms={"30px"} me={"30px"} pb={"10px"}>
                <Text class="h6">{value.address}, {value.city}, {value.province} {value.postalCode}</Text>
              </Flex>
            </div>
            <div class="d-flex justify-content-end pb-2">
              <ButtonGroup mt={6}>
                <Button isLoading={loadingStat} loadingText='Loading' class="btn-def me-3"
                  onClick={handleDeleteAddress}>Delete</Button>
                <Button class="btn-def_second2" onClick={() => setEditAddress(!editAddress)}>Edit</Button>
              </ButtonGroup>
            </div>
          </>
        }
      } 
    })
  }

  const handleCancelEdit =()=>{
    setEditAddress(!editAddress)
    setEditUtama(false)
    setEditLabel("")
    setEditPenerima("")
    setEditTelfon("")
    setEditAlamat("")
    setEditProvinsi("")
    setEditKota("")
    setEditKodePos("")
  }

  const printEditAddress=()=>{
    return address.map((value ,index) =>{
      if (value.idAddress == props.data){
        if (value.isDefaultAddress == "true"){
        return <>
        <div class="row">
          <div class="col-md-6">
            <p class="text-muted fw-light pb-2">
              Kolom tanda * tidak boleh kosong
            </p>
            <FormControl isRequired>
              <FormLabel>Label</FormLabel>
                <Input bgColor={"#FFFFFF"} boxShadow='md' placeholder="Rumah / Kantor / Dll..."  defaultValue={value.label} onChange={(e)=>setEditLabel(e.target.value)}/>
              <FormLabel mt={4}>Nama Penerima</FormLabel>
                <Input bgColor={"#FFFFFF"} boxShadow='md' placeholder='Nama Penerima Paket' defaultValue={value.receiverName}  onChange={(e)=>setEditPenerima(e.target.value)}/>
              <FormLabel mt={4}>Nomor Telfon Penerima</FormLabel>
                <Input bgColor={"#FFFFFF"} boxShadow='md' placeholder='08XXXXXXXXX' defaultValue={value.receiverPhone} onChange={(e)=>setEditTelfon(e.target.value)}/>
              <FormLabel mt={4}>Alamat</FormLabel>
                <Textarea bgColor={"#FFFFFF"} boxShadow='md' defaultValue={value.address} onChange={(e)=>setEditAlamat(e.target.value)}/>
            </FormControl>
              <br/>
          </div>
          <div class="col-md-6">
            <FormControl isRequired>
              <FormLabel mt={8}>Provinsi</FormLabel>
                <Select bgColor={"#FFFFFF"} boxShadow='md' placeholder={value.province} onChange={(e)=>setEditProvinsiId(e.target.value)}>
                  {getProvince.data.map((p) => (
                    <option key={p.province} id={p.province} value={p.province_id} >
                      {p.province}
                    </option>
                  ))}
                </Select>
              <FormLabel mt={4}>Kota</FormLabel>
              {
                editProvinsiId > 0 ?
                <Select bgColor={"#FFFFFF"} boxShadow='md' placeholder={value.city}
                  onClick={handleCity}>
                  {
                    getCity.data &&
                    getCity.data.map((k) => (
                      <option key={k.city_id} value={k.city_name}>
                        {k.city_name}
                      </option>
                    ))
                  }
                </Select>
                :
                <Select isDisabled bgColor={"#FFFFFF"} boxShadow='md' placeholder={value.city}>
                </Select>
              }
            </FormControl>
            <FormLabel mt={4}>Kode Pos</FormLabel>
              <Input bgColor={"#FFFFFF"} boxShadow='md' placeholder="..." defaultValue={value.postalCode} onChange={(e)=>setEditKodePos(e.target.value)}/>
            <div class="d-flex justify-content-end">
              <ButtonGroup mt={6}>
                <Button isLoading={loadingStat} loadingText='Loading' class="btn-def_second2 me-1"
                  onClick={handleEditAddress}>Submit</Button>
                <Button class="btn-def" onClick={handleCancelEdit}>Cancel</Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
        </>
        } else {
          return <>
            <div class="row">
              <div class="col-md-6">
                <p class="text-muted fw-light pb-2">
                  Kolom tanda * tidak boleh kosong
                </p>
                <FormControl isRequired>
                  <FormLabel>Label</FormLabel>
                    <Input bgColor={"#FFFFFF"} boxShadow='md' placeholder="Rumah / Kantor / Dll..."  defaultValue={value.label} onChange={(e)=>setEditLabel(e.target.value)}/>
                  <FormLabel mt={4}>Nama Penerima</FormLabel>
                    <Input bgColor={"#FFFFFF"} boxShadow='md' placeholder='Nama Penerima Paket' defaultValue={value.receiverName}  onChange={(e)=>setEditPenerima(e.target.value)}/>
                  <FormLabel mt={4}>Nomor Telfon Penerima</FormLabel>
                    <Input bgColor={"#FFFFFF"} boxShadow='md' placeholder='08XXXXXXXXX' defaultValue={value.receiverPhone} onChange={(e)=>setEditTelfon(e.target.value)}/>
                  <FormLabel mt={4}>Alamat</FormLabel>
                    <Textarea bgColor={"#FFFFFF"} boxShadow='md' defaultValue={value.address} onChange={(e)=>setEditAlamat(e.target.value)}/>
                </FormControl>
                  <br/>
              </div>
              <div class="col-md-6">
                <FormControl isRequired>
                  <FormLabel mt={8}>Provinsi</FormLabel>
                  <Select bgColor={"#FFFFFF"} boxShadow='md' placeholder={value.province} onChange={(e)=>setEditProvinsiId(e.target.value)}>
                    {getProvince.data.map((p) => (
                      <option key={p.province} id={p.province} value={p.province_id} >
                        {p.province}
                      </option>
                    ))}
                  </Select>
                <FormLabel mt={4}>Kota</FormLabel>
                  {
                    editProvinsiId > 0 ?
                    <Select bgColor={"#FFFFFF"} boxShadow='md' placeholder={value.city}
                      onClick={handleCity}>
                      {
                        getCity.data &&
                        getCity.data.map((k) => (
                          <option key={k.city_id} value={k.city_name}>
                            {k.city_name}
                          </option>
                        ))
                      }
                    </Select>
                    :
                    <Select isDisabled bgColor={"#FFFFFF"} boxShadow='md' placeholder={value.city}>
                    </Select>
                  }
                </FormControl>
                <FormLabel mt={4}>Kode Pos</FormLabel>
                  <Input bgColor={"#FFFFFF"} boxShadow='md' placeholder="..." defaultValue={value.postalCode} onChange={(e)=>setEditKodePos(e.target.value)}/>
                  <Checkbox mt={5} checked={editUtama} onChange={(e)=> {setEditUtama(e.target.checked)}}>
                    Alamat Utama
                  </Checkbox>
                <div class="d-flex justify-content-end">
                  <ButtonGroup mt={6}>
                    <Button isLoading={loadingStat} loadingText='Loading' class="btn-def_second2 me-1"
                      onClick={handleEditAddress}>Submit</Button>
                    <Button class="btn-def" onClick={handleCancelEdit}>Cancel</Button>
                  </ButtonGroup>
                </div>
              </div>
            </div>
          </>
        }
      } 
    })
  }


  console.log('editAddress ==>', editLabel, editPenerima, editTelfon, editAlamat, editProvinsi, editKota, editKodePos, editUtama)
  // console.log('address modalAddress', address)
  // console.log('props.data', props.utama)
  return (
    <>
      <Modal
        isCentered
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        size={"xl"}
        isOpen={props.show}
        onClose={props.onClose}
        motionPreset='slideInBottom'
        >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Address</ModalHeader>
          <ModalCloseButton onClick={()=>props.onClose (setEditAddress(false))}/>
          <ModalBody>
            <FormControl>
              {
                editAddress == true?
                <>
                  {printEditAddress()}
                </>
              :
                <>
                  {printMyAddress()}
                </>
              }
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalAddress;