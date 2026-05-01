

// import { useQuery, UseQueryResult } from '@tanstack/react-query'
// import Axios from 'axios'

// interface UserData {
//   data: any
//   id: string
//   first_name: string
//   last_name: string
//   email: string
//   phone: string
//   gender: boolean
//   address: string
//   state: string
//   lga: string
//   residential: string
//   my_wallet: { balance: string; point: string }[]
//   profile_image_url?: any
//   amount?: any
//   map?: any
//   length?: any
//   biller?: any
//   customer_id?: any
//   date_created?: any
//   date_updated?: any
//   name?: any
//   number?: any
//   package?: any
//   payment_method?: any
//   phoneNumber?: any
//   reference?: any
//   token?: any
//   wallet_balance?: any
// }

// // Define the interface for the expected response data structure
// interface ResponseData {
//   data?: UserData
//   id: number
//   title: string
//   description: string
//   profile_image_url?: any

// }

// // interface ApiResponse {
// //   data: ResponseData[]; // Assuming the API returns an object with a data field containing an array of ResponseData
// //   // Add other fields based on your API response
// // }

// interface ApiResponse {
//   status: string
//   message: string
//   data?: UserData | ResponseData | any
//   profile_image_url: string
//   filter?: any
//   slice?: any
//   length?: any
//   results?: any

// }

// // Define the fetch function with type annotations
// const fetchDatanew = async (
//   url: string,
//   userToken: string,
//   title?: string
// ): Promise<ApiResponse> => {
//   const response = await Axios.get<ApiResponse>(url, {
//     headers: {
//       Authorization: `Token ${userToken}`
//     }
//   })
//   return response.data
// }

// // Define the hook with type annotations
// export const useGetDatanew = (
//   url: string,
//   title: string,
//   userToken: string,
//   p0?: { cacheTime?: number; staleTime?: number }
// ): UseQueryResult<ApiResponse> => {
//   return useQuery({
//     queryKey: [title, url],
//     queryFn: () => fetchDatanew(url, userToken),
//     refetchOnWindowFocus: false
//   })
// }

// // Define the fetch function with type annotations
// const fetchOrderData = async (
//   url: string,
//   userToken: string,
//   title?: string
// ): Promise<ResponseData> => {
//   /*  console.log(title, url, userToken) */
//   const response = await Axios.get<ResponseData>(url, {
//     headers: {
//       Authorization: `Token ${userToken}`
//     }
//   })
//   return response.data
// }

// // Define the hook with type annotations
// export const useGetOrderData = (
//   url: string,
//   title: string,
//   userToken: string
// ): UseQueryResult<ApiResponse> => {
//   return useQuery({
//     queryKey: [title, url],
//     queryFn: () => fetchOrderData(url, userToken, title),
//     refetchOnWindowFocus: false
//   })
// }

// // Define the fetch function with type annotations
// const fetchPointData = async (
//   url: string,
//   userToken: string,
//   title?: string
// ): Promise<ResponseData> => {
//   /*  console.log(title, url, userToken) */
//   const response = await Axios.get<ResponseData>(url, {
//     headers: {
//       Authorization: `Token ${userToken}`
//     }
//   })
//   return response.data
// }

// // Define the hook with type annotations
// export const useGetPointData = (
//   url: string,
//   title: string,
//   userToken: string
// ): UseQueryResult<ApiResponse> => {
//   return useQuery({
//     queryKey: [title, url],
//     queryFn: () => fetchPointData(url, userToken, title),
//     refetchOnWindowFocus: false
//   })
// }

// // Define the fetch function with type annotations
// const fetchProductData = async (
//   url: string,
//   userToken: string,
//   order_id: string,
//   title?: string
// ): Promise<ResponseData> => {
//   //  console.log(url, userToken, order_id, title);
//   const response = await Axios.get<ResponseData>(url, {
//     headers: {
//       Authorization: `Token ${userToken}`,
//       order_id: order_id
//     }
//   })
//   return response.data
// }

// // Define the hook with type annotations
// export const useGetProductData = (
//   url: string,
//   userToken: string,
//   order_id: string,
//   title: string
// ): UseQueryResult<ApiResponse> => {
//   /*  console.log(url, userToken, order_id, title); */
//   return useQuery({
//     queryKey: [title, url],
//     queryFn: () => fetchProductData(url, userToken, order_id, title), // Correct parameter order
//     refetchOnWindowFocus: false
//   })
// }

// // Define the fetch function with type annotations
// const fetchBidData = async (
//   url: string,
//   userToken: string,
//   auction_id: string,
//   title?: string
// ): Promise<ResponseData> => {
//   //  console.log(url, userToken, order_id, title);
//   const response = await Axios.get<ResponseData>(url, {
//     headers: {
//       Authorization: `Token ${userToken}`,
//       auction_id: auction_id
//     }
//   })
//   return response.data
// }

// // Define the hook with type annotations
// export const useGetBidData = (
//   url: string,
//   userToken: string,
//   order_id: string,
//   title: string
// ): UseQueryResult<ApiResponse> => {
//   /*  console.log(url, userToken, order_id, title); */
//   return useQuery({
//     queryKey: [title, url],
//     queryFn: () => fetchBidData(url, userToken, order_id, title), // Correct parameter order
//     refetchOnWindowFocus: false
//   })
// }

// // Define the fetch function with type annotations
// const fetchOrderwinsData = async (
//   url: string,
//   userToken: string,
//   title?: string
// ): Promise<ResponseData> => {
//   /*  console.log(title, url, userToken) */
//   const response = await Axios.get<ResponseData>(url, {
//     headers: {
//       Authorization: `Token ${userToken}`
//     }
//   })
//   return response.data
// }

// // Define the hook with type annotations
// export const useGetOrderWinsData = (
//   url: string,
//   title: string,
//   userToken: string
// ): UseQueryResult<ApiResponse> => {
//   return useQuery({
//     queryKey: [title, url],
//     queryFn: () => fetchOrderwinsData(url, userToken, title),
//     refetchOnWindowFocus: false
//   })
// }

// type Bank = {
//   name: string;
//   code: string;
// };

// type BanksResponse = {
//   status: string;
//   message: string;
//   data: Bank[];
// };

// const fetchBanksData = async (url: string, token: string): Promise<BanksResponse> => {
//   const response = await Axios.get<BanksResponse>(url, {
//     headers: {
//       Authorization: `Token ${token}`
//     }
//   });
//   return response.data;
// };

// export const useGetBanksData = (url: string, queryKey: string, token: string): UseQueryResult<BanksResponse, Error> => {
//   return useQuery<BanksResponse, Error>({
//     queryKey: [queryKey, url],
//     queryFn: () => fetchBanksData(url, token),
//     refetchOnWindowFocus: false
//   });
// };




import { useQuery, UseQueryResult } from '@tanstack/react-query'
import Axios, { AxiosError } from 'axios'
import { handleNetworkError } from '@/lib/networkErrorHandler'

interface UserData {
  data: any
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  gender: boolean
  address: string
  state: string
  lga: string
  residential: string
  my_wallet: { balance: string; point: string }[]
  profile_image_url?: any
  amount?: any
  map?: any
  length?: any
  biller?: any
  customer_id?: any
  date_created?: any
  date_updated?: any
  name?: any
  number?: any
  package?: any
  payment_method?: any
  phoneNumber?: any
  reference?: any
  token?: any
  wallet_balance?: any
}

// Define the interface for the expected response data structure
interface ResponseData {
  data?: UserData
  id: number
  title: string
  description: string
  profile_image_url?: any
}

// Updated ApiResponse to be more consistent
interface ApiResponse {
  status: string
  message: string
  data?: UserData | ResponseData | any // Made more flexible to handle different data types
  profile_image_url?: string
  filter?: any
  slice?: any
  length?: any
  results?: any
}

// Define the fetch function with type annotations
const fetchDatanew = async (
  url: string,
  userToken: string,
  title?: string
): Promise<ApiResponse> => {
  try {
    const response = await Axios.get<ApiResponse>(url, {
      headers: {
        Authorization: `Token ${userToken}`
      },
      timeout: 30000, // 30 second timeout
    })
    return response.data
  } catch (error) {
    // Handle network errors silently for data fetching - don't spam user with toasts
    if (Axios.isAxiosError(error)) {
      const isNetworkError = !error.response;
      if (isNetworkError) {
        console.warn(`[Network] Failed to fetch ${title || 'data'}:`, error.message);
        // Return empty/placeholder data instead of throwing
        return {
          status: 'error',
          message: 'Network error - using cached/empty data',
          data: null
        } as ApiResponse;
      }
    }
    throw error;
  }
}

// Define the hook with type annotations
export const useGetDatanew = (
  url: string,
  title: string,
  userToken: string,
  p0?: { cacheTime?: number; staleTime?: number }
): UseQueryResult<ApiResponse, Error> => {
  return useQuery({
    queryKey: [title, url],
    queryFn: () => fetchDatanew(url, userToken),
    refetchOnWindowFocus: false
  })
}

// Updated fetch function to return ApiResponse
const fetchOrderData = async (
  url: string,
  userToken: string,
  title?: string
): Promise<ApiResponse> => {
  const response = await Axios.get<ApiResponse>(url, {
    headers: {
      Authorization: `Token ${userToken}`
    }
  })
  return response.data
}

// Define the hook with type annotations
export const useGetOrderData = (
  url: string,
  title: string,
  userToken: string
): UseQueryResult<ApiResponse, Error> => {
  return useQuery({
    queryKey: [title, url],
    queryFn: () => fetchOrderData(url, userToken, title),
    refetchOnWindowFocus: false
  })
}

// Updated fetch function to return ApiResponse
const fetchPointData = async (
  url: string,
  userToken: string,
  title?: string
): Promise<ApiResponse> => {
  const response = await Axios.get<ApiResponse>(url, {
    headers: {
      Authorization: `Token ${userToken}`
    }
  })
  return response.data
}

// Define the hook with type annotations
export const useGetPointData = (
  url: string,
  title: string,
  userToken: string
): UseQueryResult<ApiResponse, Error> => {
  return useQuery({
    queryKey: [title, url],
    queryFn: () => fetchPointData(url, userToken, title),
    refetchOnWindowFocus: false
  })
}

// Updated fetch function to return ApiResponse
const fetchProductData = async (
  url: string,
  userToken: string,
  order_id: string,
  title?: string
): Promise<ApiResponse> => {
  const response = await Axios.get<ApiResponse>(url, {
    headers: {
      Authorization: `Token ${userToken}`,
      order_id: order_id
    }
  })
  return response.data
}

// Define the hook with type annotations
export const useGetProductData = (
  url: string,
  userToken: string,
  order_id: string,
  title: string
): UseQueryResult<ApiResponse, Error> => {
  return useQuery({
    queryKey: [title, url],
    queryFn: () => fetchProductData(url, userToken, order_id, title),
    refetchOnWindowFocus: false
  })
}

// Updated fetch function to return ApiResponse
const fetchBidData = async (
  url: string,
  userToken: string,
  auction_id: string,
  title?: string
): Promise<ApiResponse> => {
  const response = await Axios.get<ApiResponse>(url, {
    headers: {
      Authorization: `Token ${userToken}`,
      auction_id: auction_id
    }
  })
  return response.data
}

// Define the hook with type annotations
export const useGetBidData = (
  url: string,
  userToken: string,
  order_id: string,
  title: string
): UseQueryResult<ApiResponse, Error> => {
  return useQuery({
    queryKey: [title, url],
    queryFn: () => fetchBidData(url, userToken, order_id, title),
    refetchOnWindowFocus: false
  })
}

// Updated fetch function to return ApiResponse
const fetchOrderwinsData = async (
  url: string,
  userToken: string,
  title?: string
): Promise<ApiResponse> => {
  const response = await Axios.get<ApiResponse>(url, {
    headers: {
      Authorization: `Token ${userToken}`
    }
  })
  return response.data
}

// Define the hook with type annotations
export const useGetOrderWinsData = (
  url: string,
  title: string,
  userToken: string
): UseQueryResult<ApiResponse, Error> => {
  return useQuery({
    queryKey: [title, url],
    queryFn: () => fetchOrderwinsData(url, userToken, title),
    refetchOnWindowFocus: false
  })
}

type Bank = {
  name: string;
  code: string;
};

type BanksResponse = {
  status: string;
  message: string;
  data: Bank[];
};

const fetchBanksData = async (url: string, token: string): Promise<BanksResponse> => {
  const response = await Axios.get<BanksResponse>(url, {
    headers: {
      Authorization: `Token ${token}`
    }
  });
  return response.data;
};

export const useGetBanksData = (url: string, queryKey: string, token: string): UseQueryResult<BanksResponse, Error> => {
  return useQuery<BanksResponse, Error>({
    queryKey: [queryKey, url],
    queryFn: () => fetchBanksData(url, token),
    refetchOnWindowFocus: false
  });
};

// New function for statement of account
const fetchStatementData = async (
  url: string,
  userToken: string,
  startDate: string,
  endDate: string
): Promise<ApiResponse> => {
  const response = await Axios.get<ApiResponse>(url, {
    headers: {
      Authorization: `Token ${userToken}`
    },
    params: {
      start_date: startDate,
      end_date: endDate
    }
  })
  return response.data
}

export const useGetStatementData = (
  url: string,
  queryKey: string,
  userToken: string,
  startDate: string,
  endDate: string,
  isEnabled: boolean
): UseQueryResult<ApiResponse, Error> => {
  return useQuery({
    queryKey: [queryKey, url, startDate, endDate],
    queryFn: () => fetchStatementData(url, userToken, startDate, endDate),
    enabled: isEnabled && !!startDate && !!endDate,
    refetchOnWindowFocus: false
  })
}