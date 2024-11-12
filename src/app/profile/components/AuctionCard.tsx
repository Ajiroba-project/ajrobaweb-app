import React, { useState } from 'react'
import Image from 'next/image'
import { CiMenuKebab } from 'react-icons/ci'
import Dropdown from './Dropdown'
import DropDownAuction from './DropDownAuction'
import { ModalProfile } from './ModalProfile'
import { DefaultButton } from '@/app/component/Button'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useAuthStore } from '@/store/store'
import { useRouter } from "next/navigation";
import { useMutateData } from '@/hooks/useMutateNewData'
import { useGetOrderWinsData } from '@/hooks/useGetData'
import Cookies from 'js-cookie'

type AuctionProps = {
  product: any[]
}

type Product = {
  name: string;
};

type Order = {
  order_id: string;
  products: Product[];
  total_price: string;
  order_date: string;
  delivery_status: string;
};

 const AuctionWinCardNew = ({ product }: AuctionProps) => {

  /* console.log(product, 'product') */

    const [selectedTransaction, setSelectedTransaction] = useState<Order | null>(null);
  const [selectedTransactiondelete, setSelectedTransactiondelete] = useState<Order | null>(null);


  const [success, setSuccess] = useState(false);
    const [successdelete, setSuccessdelete] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewerror, Setreviewerror] = useState('')
    const [reviewerrordelete, Setreviewerrordelete] = useState('')
  const [isModalOpen, setModalOpen] = useState(false);
    const [isdeleteModalOpen, setisdeleteModalOpen] = useState(false);
   const [isSussessModal, setisSucceessModal] = useState(false);


  const router = useRouter();


  const handleCloseModaldelete = () => {
    setisdeleteModalOpen(false);
  };

 const handleOptionClick = (option: string, transaction: Order) => {

  //   console.log(`${option} clicked for transaction:`, transaction);
  //  console.log(transaction, 'transactionnnnn')

   if (option === "Review") {
     setSelectedTransaction(transaction);
    setModalOpen(true);
   }

 if (option === "Delete") {
    setSelectedTransactiondelete(transaction);
    // console.log(transaction, "Transaction to delete"); // Check if this logs correctly
    setisdeleteModalOpen(true);
  }

  };

    const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
   /*  resolver: yupResolver(ChangePass), */
  });


  const {
  reset: resetDeleteForm,
  register: registerDeleteForm,
  handleSubmit: handleSubmitDelete,
  formState: { errors: deleteErrors },
} = useForm({
  mode: "all",
  // resolver: yupResolver(/* your delete form schema */),
});


  const { isLoggedIn, user, token } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    token: state.token,
  }));

  const userToken = token;

  const handleSuccess = (data: any) => {
    Setreviewerror('')
    reset()

    if (data.status === 201 || data.status === 200 || data.status === 204) {
      console.log(data, 'data')
      setSuccess(true);
         toast.success(`${data?.data?.message}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => router.push('/profile')
      });
      reset();
    } else if (data.status === 400 || data.status === 409) {
      toast.error(`${data?.data?.message || "Password doesnt match"} `, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      reset();
    } else if (data.status === 404 ) {
      toast.error(`${data?.data?.message || "Order not found"} `, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      reset();
    } else if (data.status === 401) {
      toast.error(`${data?.data?.message || "Authentication error"} `, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      reset();
    } else if (data.status === 500) {
      toast.error(`${data?.data?.message || "old_password"} `, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      reset();
    } else {
       toast.error(`${data?.data?.message } `, {
   /*    toast.error(`${"An Error Occured" || "Error"}`, { */
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      reset();
    }
  };

  const handleError = (error: any) => {
    // console.log(data, "datttataaa", error);
    // console.log(error, "errrr");
    toast.error(`${"An Error Occured"}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    reset();
  };

  const { data, error, isError, isSuccess, mutate, status } = useMutateData(
    "review order",
    handleSuccess,
    handleError,
  );


  const { data: datad, error: errord, isError: isErrord, isSuccess: isSussessd, mutate: mutated, status: statusd } = useMutateData(
    "delete order",
    handleSuccess,
    handleError,
  );



const submitFormdelete = async (data: any, event: any) => {
  event.preventDefault();

  console.log(errors)
  console.log(data, 'datata')

//  console.log(selectedTransactiondelete, "Payload being submitted - BEFORE");

 if (!selectedTransactiondelete) {
    console.error("No transaction selected for deletion");
    return;  // Exit the function if selectedTransactiondelete is null
  }

  const payload = {
    order_Id: selectedTransactiondelete.order_id,
  };

    mutated({
    url: "/api/deleteorder",
    payload: { payload: payload, token: userToken },
    token: userToken
  });
};

const Closefuncdelete = () => {
  setisdeleteModalOpen(false);
  setSuccessdelete(false);
  // setSelectedRating(0);
  reset();
  Setreviewerrordelete('')
};



  const userToken_ = Cookies.get('token') as string;

  const tkn_: string = Cookies.get('token') as string;

  const { data: auctioninfo, isLoading: auctionLoading, error: ordererror } = useGetOrderWinsData('/api/auctionwins', "get_auctionwins_details", userToken_);




const openProducts = auctioninfo?.data?.data?.open.map((item: { id: any })  => {
  return { ...item, tag: ["open"] }; // Add tag as an array with "open" for consistency
});


  return (
  <div>
  <div className=''>
    <div className='flex flex-col '>

      { auctionLoading ? (
            <p className="text-center text-gray-500 py-8">Loading...</p>
          ) : openProducts?.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No data available</p>
      ) : (
        openProducts?.map((val: any, index: number) => (
          <div key={index} className='relative my-2 flex gap-4 border p-3 flex-wrap'>

            <Image
              src={`https://ajiroba.onrender.com${val?.auction[0]?.images[0]}`}
              alt={val?.auction[0]?.name}
              width={50}
              height={50}
              layout='intrinsic'
              className='object-cover w-full rounded-md h-72 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg'
            />

            <div className='flex flex-col gap-3 capitalize'>
              <p className=' font-semibold'>{val?.auction[0]?.name}</p>
              <p>ID: {val?.id} </p>
              <p>Bid Number: {val?.bid_number}</p>
              <p>Ticket Price: ₦{val?.ticket_price}</p>
              <div className='mt-5 flex gap-3 flex-wrap'>
                {val.tag &&
                  val.tag.map((value: string, index: number) => (
                    <p
                      key={index}
                      className={`text-xs ${value === 'open' || value === 'delivered' ? 'bg-green-200 text-emerald-800' : value === 'close' ? 'bg-rose-200 text-red-800' : value === 'redeem items' ? 'bg-blue-700 text-white' : 'bg-[#F25E26] text-white'} rounded-xl px-2.5  py-1 `}
                    >
                      {value}
                    </p>
                  ))}
              </div>
            </div>
            <span className='absolute right-3 top-2 rounded-md border p-2 cursor-pointer'>
              <DropDownAuction
                onOptionClick={(option) => handleOptionClick(option, val)}
                transaction={val}
              />
            </span>
          </div>
        ))
      )}
    </div>
  </div>

  {isdeleteModalOpen && (
    <ModalProfile
      icon={""}
      isOpen={isdeleteModalOpen}
      onClose={handleCloseModaldelete}
      title=""
      handleEvent={handleCloseModaldelete}
    >
      <form onSubmit={handleSubmitDelete(submitFormdelete)} className="flex flex-col">
        <p className="flex justify-center text-left py-8">Are you sure you want to delete this product?</p>
        <div className="mt-5 flex gap-4 justify-center">
          <DefaultButton
            text="No"
            className="rounded-md border-2 border-[#F25E26] p-2 px-4 text-[#F25E26]"
            type="button"
            handleClick={Closefuncdelete}
          />
          <DefaultButton
            text={status === "pending" ? "loading..." : "Yes"}
            className="rounded-md bg-[#F25E26] p-2 px-4 text-white"
            type="submit"
          />
        </div>
      </form>
    </ModalProfile>
  )}
    </div>
  )
}


 const AuctionWinCardClosed = ({ product }: AuctionProps) => {

  /* console.log(product, 'product') */

    const [selectedTransaction, setSelectedTransaction] = useState<Order | null>(null);
  const [selectedTransactiondelete, setSelectedTransactiondelete] = useState<Order | null>(null);


  const [success, setSuccess] = useState(false);
    const [successdelete, setSuccessdelete] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewerror, Setreviewerror] = useState('')
    const [reviewerrordelete, Setreviewerrordelete] = useState('')
  const [isModalOpen, setModalOpen] = useState(false);
    const [isdeleteModalOpen, setisdeleteModalOpen] = useState(false);
   const [isSussessModal, setisSucceessModal] = useState(false);


  const router = useRouter();


  const handleCloseModaldelete = () => {
    setisdeleteModalOpen(false);
  };

 const handleOptionClick = (option: string, transaction: Order) => {

  //   console.log(`${option} clicked for transaction:`, transaction);
  //  console.log(transaction, 'transactionnnnn')

   if (option === "Review") {
     setSelectedTransaction(transaction);
    setModalOpen(true);
   }

 if (option === "Delete") {
    setSelectedTransactiondelete(transaction);
    // console.log(transaction, "Transaction to delete"); // Check if this logs correctly
    setisdeleteModalOpen(true);
  }

  };

    const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
   /*  resolver: yupResolver(ChangePass), */
  });


  const {
  reset: resetDeleteForm,
  register: registerDeleteForm,
  handleSubmit: handleSubmitDelete,
  formState: { errors: deleteErrors },
} = useForm({
  mode: "all",
  // resolver: yupResolver(/* your delete form schema */),
});


  const { isLoggedIn, user, token } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    token: state.token,
  }));

  const userToken = token;

  const handleSuccess = (data: any) => {
    Setreviewerror('')
    reset()

    if (data.status === 201 || data.status === 200 || data.status === 204) {
      console.log(data, 'data')
      setSuccess(true);
         toast.success(`${data?.data?.message}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => router.push('/profile')
      });
      reset();
    } else if (data.status === 400 || data.status === 409) {
      toast.error(`${data?.data?.message || "Password doesnt match"} `, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      reset();
    } else if (data.status === 404 ) {
      toast.error(`${data?.data?.message || "Order not found"} `, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      reset();
    } else if (data.status === 401) {
      toast.error(`${data?.data?.message || "Authentication error"} `, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      reset();
    } else if (data.status === 500) {
      toast.error(`${data?.data?.message || "old_password"} `, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      reset();
    } else {
       toast.error(`${data?.data?.message } `, {
   /*    toast.error(`${"An Error Occured" || "Error"}`, { */
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      reset();
    }
  };

  const handleError = (error: any) => {
    // console.log(data, "datttataaa", error);
    // console.log(error, "errrr");
    toast.error(`${"An Error Occured"}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    reset();
  };

  const { data, error, isError, isSuccess, mutate, status } = useMutateData(
    "review order",
    handleSuccess,
    handleError,
  );


  const { data: datad, error: errord, isError: isErrord, isSuccess: isSussessd, mutate: mutated, status: statusd } = useMutateData(
    "delete order",
    handleSuccess,
    handleError,
  );



const submitFormdelete = async (data: any, event: any) => {
  event.preventDefault();

  console.log(errors)
  console.log(data, 'datata')

//  console.log(selectedTransactiondelete, "Payload being submitted - BEFORE");

 if (!selectedTransactiondelete) {
    console.error("No transaction selected for deletion");
    return;  // Exit the function if selectedTransactiondelete is null
  }

  const payload = {
    order_Id: selectedTransactiondelete.order_id,
  };

    mutated({
    url: "/api/deleteorder",
    payload: { payload: payload, token: userToken },
    token: userToken
  });
};

const Closefuncdelete = () => {
  setisdeleteModalOpen(false);
  setSuccessdelete(false);
  // setSelectedRating(0);
  reset();
  Setreviewerrordelete('')
};

const demodata =  {
    "status": "success",
    "message": "Your biddings",
    "data": {
        "all": [
            {
                "id": "bfebf54b-8797-49d7-b2de-0ba5af7c39fa",
                "auction": [
                    {
                        "name": "Smart Watch",
                        "images": [
                            "/media/auction_images/Smart_Watch.jpg",
                            "/media/auction_images/Smart_Watch_hjJex2j.jpg"
                        ]
                    }
                ],
                "bid_number": "BID4827493",
                "ticket_price": "2000.00"
            },
            {
                "id": "a64eedfd-289d-4ef6-b4b4-f7f27c973ef3",
                "auction": [
                    {
                        "name": "Smart Watch",
                        "images": [
                            "/media/auction_images/Smart_Watch.jpg",
                            "/media/auction_images/Smart_Watch_hjJex2j.jpg"
                        ]
                    }
                ],
                "bid_number": "BID5029154",
                "ticket_price": "2000.00"
            }
        ],
        "open": [
            {
                "id": "bfebf54b-8797-49d7-b2de-0ba5af7c39fa",
                "auction": [
                    {
                        "name": "Smart Watch",
                        "images": [
                            "/media/auction_images/Smart_Watch.jpg",
                            "/media/auction_images/Smart_Watch_hjJex2j.jpg"
                        ]
                    }
                ],
                "bid_number": "BID4827493",
                "ticket_price": "2000.00"
            },
            {
                "id": "a64eedfd-289d-4ef6-b4b4-f7f27c973ef3",
                "auction": [
                    {
                        "name": "Smart Watch",
                        "images": [
                            "/media/auction_images/Smart_Watch.jpg",
                            "/media/auction_images/Smart_Watch_hjJex2j.jpg"
                        ]
                    }
                ],
                "bid_number": "BID5029154",
                "ticket_price": "2000.00"
            }
        ],
        "closed": [
            {
                "id": "e12ab78c-5f2c-4f2a-8b3f-0cba3efc58ef",
                "auction": [
                    {
                        "name": "Wireless Earbuds",
                        "images": [
                            "/media/auction_images/Smart_Watch.jpg",
                            "/media/auction_images/Smart_Watch_hjJex2j.jpg"
                        ]
                    }
                ],
                "bid_number": "BID6938721",
                "ticket_price": "1500.00"
            },
            {
                "id": "d29be934-8464-4a65-ae99-2e3f7f6c7489",
                "auction": [
                    {
                        "name": "Bluetooth Speaker",
                       "images": [
                            "/media/auction_images/Smart_Watch.jpg",
                            "/media/auction_images/Smart_Watch_hjJex2j.jpg"
                        ]
                    }
                ],
                "bid_number": "BID7493056",
                "ticket_price": "2500.00"
            }
        ]
    }
}


  const userToken_ = Cookies.get('token') as string;

  const tkn_: string = Cookies.get('token') as string;

  const { data: auctioninfo, isLoading: auctionLoading, error: ordererror } = useGetOrderWinsData('/api/auctionwins', "get_auctionwins_details", userToken_);




const closedProducts = demodata.data.closed.map((item: { id: any })  => {
  return { ...item, tag: ["close", "redeem items", "winning advise"] }; // Add tag as an array with "open" for consistency
});


  return (
<div>
  <div className=''>
    <div className='flex flex-col '>

      { auctionLoading ? (
            <p className="text-center text-gray-500 py-8">Loading...</p>
          ) : closedProducts?.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No data available</p>
      ) : (
        closedProducts?.map((val: any, index: number) => (
          <div key={index} className='relative my-2 flex gap-4 border p-3 flex-wrap'>

            <Image
              src={`https://ajiroba.onrender.com${val?.auction[0]?.images[0]}`}
              alt={val?.auction[0]?.name}
              width={50}
              height={50}
              layout='intrinsic'
              className='object-cover w-full rounded-md h-72 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg'
            />

            <div className='flex flex-col gap-3 capitalize'>
              <p className=' font-semibold'>{val?.auction[0]?.name}</p>
              <p>ID: {val?.id} </p>
              <p>Bid Number: {val?.bid_number}</p>
              <p>Ticket Price: ₦{val?.ticket_price}</p>
              <div className='mt-5 flex gap-3 flex-wrap'>
                {val.tag &&
                  val.tag.map((value: string, index: number) => (
                    <p
                      key={index}
                      className={`text-xs ${value === 'open' || value === 'delivered' ? 'bg-green-200 text-emerald-800' : value === 'close' ? 'bg-rose-200 text-red-800' : value === 'redeem items' ? 'bg-blue-700 text-white' : value === 'winning advise' ? 'bg-[#F25E26] text-white'  : 'bg-[#F25E26] text-white'} rounded-xl px-2.5  py-1 `}
                    >
                      {value}
                    </p>
                  ))}
              </div>
            </div>
            <span className='absolute right-3 top-2 rounded-md border p-2 cursor-pointer'>
              <DropDownAuction
                onOptionClick={(option) => handleOptionClick(option, val)}
                transaction={val}
              />
            </span>
          </div>
        ))
      )}
    </div>
  </div>

  {isdeleteModalOpen && (
    <ModalProfile
      icon={""}
      isOpen={isdeleteModalOpen}
      onClose={handleCloseModaldelete}
      title=""
      handleEvent={handleCloseModaldelete}
    >
      <form onSubmit={handleSubmitDelete(submitFormdelete)} className="flex flex-col">
        <p className="flex justify-center text-left py-8">Are you sure you want to delete this product?</p>
        <div className="mt-5 flex gap-4 justify-center">
          <DefaultButton
            text="No"
            className="rounded-md border-2 border-[#F25E26] p-2 px-4 text-[#F25E26]"
            type="button"
            handleClick={Closefuncdelete}
          />
          <DefaultButton
            text={status === "pending" ? "loading..." : "Yes"}
            className="rounded-md bg-[#F25E26] p-2 px-4 text-white"
            type="submit"
          />
        </div>
      </form>
    </ModalProfile>
  )}
</div>

  )
}



export { AuctionWinCardNew, AuctionWinCardClosed}