import Axios from "axios";
import React from "react";
import { API_URL } from "../../helper";
import { useDispatch } from 'react-redux'
// import { forgotPassword } from "../redux/action/usersAction";
import { useNavigate, useParams } from "react-router-dom";
import { Text } from '@chakra-ui/react';


const Cart=(props)=>{


  return( <>
    <div class="container text-center pt-5">
      <Text class="h1b">Page Keranjang</Text>
    </div>
  </>
  )
}

export default Cart;