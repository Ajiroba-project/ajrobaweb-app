

// import { useQuery, UseQueryResult } from '@tanstack/react-query';

// const fetchDatanew = async (url, userToken) => {
//     const response = await Axios.get(url, {
//         headers: {
//             Authorization: `Token ${userToken}`
//         }
//     })
//     return response
// }

// export const useGetDatanew = (url, title, userToken) => {

//     return useQuery(title, () => fetchDatanew(url, userToken), {
//         refetchOnWindowFocus: false,
//     })
// }

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import Axios from 'axios';


interface UserData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: boolean;
  address: string;
  state: string;
  lga: string;
  residential: string;
  my_wallet: { balance: string; point: string }[];
  profile_image_url?: any
}


// Define the interface for the expected response data structure
interface ResponseData {
    data?: UserData
    id: number;
    title: string;
    description: string;
    profile_image_url?: any
}

// interface ApiResponse {
//   data: ResponseData[]; // Assuming the API returns an object with a data field containing an array of ResponseData
//   // Add other fields based on your API response
// }


interface ApiResponse {
  status: string;
  message: string;
  data: UserData;
  profile_image_url: string;
}


// Define the fetch function with type annotations
const fetchDatanew = async (url: string, userToken: string, title?: string): Promise<ResponseData> => {
    const response = await Axios.get<ResponseData>(url, {
        headers: {
            Authorization: `Token ${userToken}`
        }
    });
    return response.data;
}



// Define the hook with type annotations
export const useGetDatanew = (url: string, title: string, userToken: string): UseQueryResult<ApiResponse> => {
  return useQuery({
    queryKey: [title, url],
    queryFn: () => fetchDatanew(url, userToken),
    refetchOnWindowFocus: false,
  });
}
