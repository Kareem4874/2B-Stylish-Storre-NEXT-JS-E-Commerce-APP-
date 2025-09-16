"use server"

import { getUserToken } from "@/lib/tokenutils";
import axios from "axios";



interface ShippingAddressTypes {
  details: string;
  phone: string;
  city: string;
}


export async function getCashPayment(CartID: string , shippingAddress: ShippingAddressTypes) {
  try {
    const token = await getUserToken();
    const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${CartID}` ,{shippingAddress},
    {
      headers: {
        token :  token as string,
      },
    });


    return {
      data: response?.data.data || [],
      status: response.status,
      message: response?.data.message || 'Success',
    };
  } catch (error: unknown) {
    if(axios.isAxiosError(error)){
      return {
        data: [],
        status: error.response?.status || "Error 404",
        message: error.response?.data.message || 'An error occurred',
      };
    }
  }
}

export async function getOnlinePayment(CartID: string, shippingAddress: ShippingAddressTypes, origin: string) {
  try {
    const token = await getUserToken();
    // API expects a base domain; it will handle the final redirect path
    const callbackUrl = origin;
    const response = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartID}?url=${encodeURIComponent(callbackUrl)}`,
      { shippingAddress },
      {
        headers: {
          token: token as string,
        },
      }
    );

    return {
      data: response?.data || [],
      status: response.status,
      message: response?.data.message || 'Success',
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        data: [],
        status: error.response?.status || 500,
        message: error.response?.data?.message || 'Failed to initiate online payment',
      };
    }
    return {
      data: [],
      status: 500,
      message: 'Failed to initiate online payment',
    };
  }
}



// duplicate removed

