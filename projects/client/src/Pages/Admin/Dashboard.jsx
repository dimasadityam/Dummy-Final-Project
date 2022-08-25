import Axios from "axios";
import React from "react";
import { API_URL } from "../../helper";
import { useDispatch } from 'react-redux'
// import { forgotPassword } from "../redux/action/usersAction";
import { useNavigate, useParams } from "react-router-dom";
import { Text, Image, IconButton, Flex, Box } from '@chakra-ui/react';
import logo2 from "../../Assets/DevImage/LogoMedhikaPutih.png"
import Sidebar from "../../Components/Admin/Sidebar";



const Dashboard=(props)=>{


  return( <>
      <div class="container-fluid" >
        <div class="row">
          <div class="col-3">
            <Sidebar />
          </div>
          <div class="col-9">
            <div class="row">
              <div class="text-center mt-3">
                <Text class="h1b">Dashboard Admin Medhika</Text>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Box>
        <Flex>
          <Text class="h1b">Dashboard Admin</Text>
        </Flex>
      </Box> */}
      {/* <div class="row">
        <div class="col-2" style={{backgroundColor:"#DE1B51"}}>
          <div class="d-flex justify-content-center mt-5">
            <Image src={logo2} width='130px'/>
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
        </div>
        <div class="col-10" style={{backgroundColor:"#f6f8fc"}}>
        </div>
      </div> */}
  </>
  )
}

export default Dashboard;