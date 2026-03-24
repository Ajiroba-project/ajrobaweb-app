/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "../component/Header";
import { Title } from "../component/Title";
import Image from "next/image";
import { Footer } from "../component/Footer";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Suspense } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { toast } from "react-toastify";
import AuthMiddleware from '@/hooks/useAuthCart'
import { useAuthStore } from '@/store/store';
import  Loading  from "../component/Loading";
import { formatCurrency } from "@/utils/formatCurrency";

// Small loading spinner component for individual operations
const SmallSpinner = () => (
  <div className="inline-block w-4 h-4 border-2 border-gray-300 border-t-[#E36414] rounded-full animate-spin"></div>
);

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [operationLoading, setOperationLoading] = useState<{ [key: number]: boolean }>({});

  const [cartItemsn, setCartItemsn] = useState<any[]>([]);

  const tkn_: string = Cookies.get("token") as string;
  const { triggerCartRefresh } = useAuthStore(state => ({
    triggerCartRefresh: state.triggerCartRefresh,
  }));

  
  AuthMiddleware(router)

  const fetchCartItems = async () => {
    setLoading(true);

    let sessionKey = Cookies.get("session_key");

    /*   console.log(sessionKey, "session key")  */

    if (!sessionKey) {
      sessionKey = `session_${Math.random().toString(36).substr(2, 9)}`; // Generate a unique session key
      Cookies.set('session_key', sessionKey, { expires: 7 }); // Store session key in cookies for 7 days
    }

    let headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    };

    if (tkn_) {
      headers["Authorization"] = `token ${tkn_}`;
    }

    let config = {
      method: "GET",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/cart/?session_key=${sessionKey}`,
      headers: headers,
    };

    axios
      .request(config)
      .then((response) => {
        setCartItemsn(response.data?.data[0]?.items);
        // console.log(response.data?.data[0]?.items, "cart items");
        //  localStorage.setItem('cnt', JSON.stringify(response.data?.data[0]?.items));

      })
      .catch((error) => {
        setError("Error loading cart items");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = cartItemsn ? Math?.ceil(cartItemsn?.length / itemsPerPage) : 1;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCartInfo = cartItemsn?.slice(startIndex, endIndex);

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  // Function to handle quantity increase
  const handleIncrement = async (id: number, quantity: number) => {
    setOperationLoading(prev => ({ ...prev, [id]: true }));
    
    let sessionKey = Cookies.get("session_key");
    let headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    };

    if (tkn_) {
      headers["Authorization"] = `token ${tkn_}`;
    }

    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/commerce/increase_item_quantity/`, {
        cart_item_id: id,
        quantity: 1,
        session_key: sessionKey || null,
      }, {
        headers: headers,
      });

      // Update local state immediately for better UX
      setCartItemsn(prevItems => 
        prevItems.map(item => 
          item.id === id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );

      const successMessage = response.data?.message || "Quantity increased successfully!";
      toast.success(successMessage, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });

      triggerCartRefresh(); // Trigger header cart refresh
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Error increasing item quantity.";
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
    } finally {
      setOperationLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  // Function to handle quantity decrease
  const handleDecrement = async (id: number, quantity: number) => {
    if (quantity <= 1) {
      toast.warning("Quantity cannot be less than 1. Use delete to remove item.", {
        position: 'top-right',
        autoClose: 3000,
        theme: 'light'
      });
      return;
    }

    setOperationLoading(prev => ({ ...prev, [id]: true }));
    
    let sessionKey = Cookies.get("session_key");
    let headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    };

    if (tkn_) {
      headers["Authorization"] = `token ${tkn_}`;
    }

    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/commerce/decrease_item_quantity/`, {
        cart_item_id: id,
        quantity: 1,
        session_key: sessionKey || null,
      }, {
        headers: headers,
      });

      // Update local state immediately for better UX
      setCartItemsn(prevItems => 
        prevItems.map(item => 
          item.id === id 
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        )
      );

      const successMessage = response.data?.message || "Quantity decreased successfully!";
      toast.success(successMessage, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });

      triggerCartRefresh(); // Trigger header cart refresh
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Error decreasing item quantity.";
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
    } finally {
      setOperationLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  // Function to delete a cart item
  const handleDelete = async (id: number, quantity: number) => {
    // Show confirmation dialog
    const confirmed = window.confirm("Are you sure you want to remove this item from your cart?");
    if (!confirmed) return;

    setOperationLoading(prev => ({ ...prev, [id]: true }));
    
    let sessionKey = Cookies.get("session_key");
    let headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    };

    if (tkn_) {
      headers["Authorization"] = `token ${tkn_}`;
    }

    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/commerce/remove_from_cart/`, {
        data: {
          cart_item_id: id,
          session_key: sessionKey || null,
          quantity: quantity
        },
        headers: headers,
      });

      // Update local state immediately for better UX
      setCartItemsn(prevItems => prevItems.filter(item => item.id !== id));

      const successMessage = response.data?.message || "Item removed successfully!";
      toast.success(successMessage, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });

      triggerCartRefresh(); // Trigger header cart refresh
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.response?.data?.detail || "Error removing item.";
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
    } finally {
      setOperationLoading(prev => ({ ...prev, [id]: false }));
    }
  };


  const calculateTotalPrice = (price: number, quantity: number) => {
    return price * quantity;
  };

  const grandTotal = cartItemsn?.reduce((total, item) => {
    return total + calculateTotalPrice(item?.product?.discount, item.quantity);
  }, 0);


  if (loading) {
   return <Loading />
  }

  return (
    <Suspense fallback={<>Loading...</>}>
      <main>
        <Header />
        <div className='h-24 md:h-28 lg:h-32'></div>
        <div style={{ margin: "0 auto", width: "95%", maxWidth: "100%" }}>
          <div onClick={() => router.back()}>
            <div className="cursor-pointer container flex justify-start mt-4">
              <p className="text-[#E84526] text-base">Back</p>
            </div>
          </div>

          <Title title="Cart" />

          <div className="product-image-gallery container py-8 grid 2xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 xl:grid-col-2 grid-cols-1">
            <div>
              <div className="border rounded border-[#D2D2D2] px-4 py-4">
                <p>Cart ({cartItemsn?.length || 0})</p>


                {
                  loading ? (
                    <p>Loading cart items...</p>
                  ) : error ? (
                    <p className="text-red-500">{error}</p>
                  ) : cartItemsn && cartItemsn.length > 0 ? (
                    paginatedCartInfo?.map((item) => (
                      <div
                        key={item.id}
                        className="border rounded border-[#D2D2D2] px-3 py-3 sm:px-4 sm:py-2 my-4"
                      >
                        <div className="grid grid-cols-[64px_1fr] sm:flex sm:flex-row justify-between gap-3 sm:gap-6 overflow-hidden">
                          <div className="col-span-1">
                            <Image
                              className="w-16 h-16 sm:w-[100px] sm:h-[100px] object-cover rounded"
                              src={`https://staging.ajiroba.ng/media/${item?.product?.images[0]?.image}`}
                              alt="Product Thumbnail"
                              height={100}
                              width={100}
                            />

                            <div className="flex items-center mt-2">
                              <button
                                onClick={() => handleDecrement(item.id, item.quantity)}
                                disabled={operationLoading[item.id] || item.quantity <= 1}
                                className={`px-2 bg-white text-[#111111] rounded border border-[#DEDEDE] ${
                                  operationLoading[item.id] || item.quantity <= 1 
                                    ? 'opacity-50 cursor-not-allowed' 
                                    : 'hover:bg-gray-50'
                                }`}
                              >
                                {operationLoading[item.id] ? <SmallSpinner /> : '-'}
                              </button>
                              <input
                                type="text"
                                value={item.quantity}
                                readOnly
                                className="w-10 sm:w-12 text-center border-gray-300"
                              />
                              <button
                                onClick={() => handleIncrement(item.id, item.quantity)}
                                disabled={operationLoading[item.id]}
                                className={`px-2 bg-[#E36414] text-white rounded border-[#E36414] ${
                                  operationLoading[item.id] 
                                    ? 'opacity-50 cursor-not-allowed' 
                                    : 'hover:bg-[#d55a12]'
                                }`}
                              >
                                {operationLoading[item.id] ? <SmallSpinner /> : '+'}
                              </button>
                            </div>
                          </div>

                          <div className="flex justify-start items-start flex-col sm:w-5/12 w-full pr-1">
                            <p className="text-[#111111] font-Poppins font-medium text-sm sm:text-base mt-0 sm:mt-4 leading-5 sm:leading-6">
                              {item?.product?.name}
                            </p>

                            <h1 className="text-[#6B7280] text-xs sm:text-sm mt-1 sm:mt-2">Food Stuff • In stock</h1>
                          </div>

                          {/* Desktop price + delete */}
                          <div className="hidden sm:block text-right min-w-[180px] md:min-w-[220px]">
                            <h1 className="text-[#111111] font-Poppins text-xl mt-2 font-semibold">
                              {formatCurrency(calculateTotalPrice(item?.product?.discount, item.quantity).toLocaleString())}
                            </h1>
                            <h1 className="text-[#111111] text-lg mt-2 line-through">
                              {formatCurrency(item?.product?.price)}
                            </h1>

                            <div
                              className={`flex items-center justify-end gap-2 mt-6 ${
                                operationLoading[item.id] 
                                  ? 'cursor-not-allowed opacity-50' 
                                  : 'cursor-pointer hover:opacity-80'
                              }`}
                              onClick={() => !operationLoading[item.id] && handleDelete(item.id, item.quantity)}
                            >
                              <RiDeleteBin6Line color="#E84526" />
                              <h1 className="text-[#E84526]">
                                {operationLoading[item.id] ? 'Removing...' : 'Delete'}
                              </h1>
                            </div>
                          </div>
                        
                          {/* Mobile price + delete */}
                          <div className="sm:hidden w-full border-t border-[#E5E7EB] pt-3 mt-2 flex items-center justify-between">
                            <div>
                              <h1 className="text-[#111111] font-Poppins text-base font-semibold">
                                {formatCurrency(calculateTotalPrice(item?.product?.discount, item.quantity).toLocaleString())}
                              </h1>
                              <h1 className="text-[#111111] text-sm line-through">
                                {formatCurrency(item?.product?.price)}
                              </h1>
                            </div>
                            <button
                              className={`flex items-center gap-2 ${
                                operationLoading[item.id] 
                                  ? 'cursor-not-allowed opacity-50' 
                                  : 'cursor-pointer hover:opacity-80'
                              }`}
                              onClick={() => !operationLoading[item.id] && handleDelete(item.id, item.quantity)}
                            >
                              <RiDeleteBin6Line color="#E84526" />
                              <span className="text-[#E84526] text-sm">{operationLoading[item.id] ? 'Removing...' : 'Delete'}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p>Your cart is empty.</p>
                    </div>
                  )

                }
              </div>
            </div>

            <div className="mt-4 container justify-center flex xl:block md:block lg:block 2xl:block">
           {  cartItemsn?.length > 0 &&  <div className="border rounded border-[#D2D2D2] px-4 shadow py-4">
                <h1 className="text-[#2A2A2A] text-base font-Poppins">Cart SUMMARY</h1>

                <div className="flex items-center flex-wrap gap-4">
                  <div>
                    <p className="text-[#b4a3a3] text-base mt-4">Subtotal</p>
                  </div>
                  <div>
                    <h1 className="text-[#111111] text-lg mt-4 font-semibold font-Poppins">
                      N {grandTotal?.toLocaleString()}
                    </h1>
                  </div>
                </div>

                <hr className="mt-4" />
                <button
                  onClick={() => router.push("/paymentpage")}
                  className="mt-4 px-12 py-2 text-sm bg-[#FCDFD4] hover:bg-[#F25E26] hover:text-white hover:transition-all text-[#2A2A2A] font-semibold rounded"
                >
                  Check out (N {grandTotal?.toLocaleString()})
                </button>

                <div className="mt-4">
                  <small className="  text-[#F25E26]">Excluding delivery charges</small>
                </div>
              </div> }
            </div>
          </div>

          <div className="flex justify-center items-center mb-20 mt-12 ">
            <div className="flex justify-center mt-4 gap-3">
              <button
                className="px-4 py-4 bg-[#F6F6F6] rounded border border-[#B7B7B7]  text-[#D2D2D2] font-bold cursor-pointer"
                onClick={handleFirstPage}
                disabled={currentPage === 1}
              >
                <IoIosArrowBack size={20} />
              </button>
              {Array(totalPages)
                .fill(0)
                .map((_, index) => (
                  <button
                    key={index}
                    className={`px-6 py-4 ${currentPage === index + 1
                      ? "bg-[#F6F6F6] rounded border border-[#F25E26] text-[#F25E26] font-Poppins font-normal text-base "
                      : "bg-[#F6F6F6] rounded border border-[#B7B7B7]  text-[#D2D2D2] font-Poppins font-normal text-base "
                      }  font-bold rounded`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              <button
                className="px-4 py-4 bg-[#F6F6F6] rounded border border-[#B7B7B7]  text-[#D2D2D2] font-bold cursor-pointer"
                onClick={handleLastPage}
                disabled={currentPage === totalPages}
              >
                <IoIosArrowForward size={20} />
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </Suspense>
  );
};

export default Page;
