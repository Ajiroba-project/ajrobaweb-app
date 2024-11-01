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

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [cartItemsn, setCartItemsn] = useState<any[]>([]);

  const tkn_: string = Cookies.get("token") as string;

  const fetchCartItems = async () => {
    setLoading(true);

    let sessionKey = Cookies.get("session_key");

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
      url: `https://ajiroba.onrender.com/v1/commerce/cart/?session_key=${sessionKey}`,
      headers: headers,
    };

    axios
      .request(config)
      .then((response) => {
        setCartItemsn(response.data?.data[0]?.items);
        localStorage.setItem('cnt', response.data?.data[0]?.items)
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
    // const sessionKey = Cookies.get("session_key");

       let sessionKey = Cookies.get("session_key");

    let headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    };

    if (tkn_) {
      headers["Authorization"] = `token ${tkn_}`;
    }
    try {
      const response =   await axios.put("https://ajiroba.onrender.com/v1/commerce/increase_item_quantity/", {
        cart_item_id: id,
        quantity: 1,
        session_key: sessionKey || null,
      }, {
        headers: headers,
      });

         const successMessage = response.data?.message || "Item quantity increased successfully!";
       toast.success(`${successMessage}`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        onClose: () => router.push('/cart')
      })
      fetchCartItems(); // Refresh cart items after updating
    } catch (error: any) {
         const errorMessage = error.response?.data?.message || "Error increasing item quantity.";
    toast.error(`${errorMessage}`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
      setError("Error increasing quantity");
    }
  };

  // Function to handle quantity decrease
  const handleDecrement = async (id: number, quantity: number) => {
    // const sessionKey = Cookies.get("session_key");

       let sessionKey = Cookies.get("session_key");

    let headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    };

    if (tkn_) {
      headers["Authorization"] = `token ${tkn_}`;
    }
    try {
      const response =   await axios.put("https://ajiroba.onrender.com/v1/commerce/decrease_item_quantity/", {
        cart_item_id: id,
        quantity: 1,
        session_key: sessionKey || null,
      }, {
        headers: headers,
      });

         const successMessage = response.data?.message || "Item quantity increased successfully!";
       toast.success(`${successMessage}`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        onClose: () => router.push('/cart')
      })
      fetchCartItems(); // Refresh cart items after updating
    } catch (error: any) {
         const errorMessage = error.response?.data?.message || "Error increasing item quantity.";
    toast.error(`${errorMessage}`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
      setError("Error increasing quantity");
    }
  };

  // Function to delete a cart item
const handleDelete = async (id: number, quantity: number) => {
  let sessionKey = Cookies.get("session_key");

  let headers: { [key: string]: string } = {
    "Content-Type": "application/json",
  };

  if (tkn_) {
    headers["Authorization"] = `token ${tkn_}`;
  }


  try {
    const response = await axios.delete("https://ajiroba.onrender.com/v1/commerce/remove_from_cart/", {
      data: {
        cart_item_id: id,
        session_key: sessionKey || null,  // Ensure the session_key is not empty
        quantity: quantity
      },
      headers: headers,
    });


    const successMessage = response.data?.message || "Item removed successfully!";
    toast.success(`${successMessage}`, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      onClose: () => router.push('/cart'),
    });

    fetchCartItems(); // Refresh cart items after updating
  } catch (error: any) {

    const errorMessage = error.response?.data?.message || error.response?.data?.detail || "Error removing item.";
    toast.error(`${errorMessage}`, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

    setError("Error removing item");
  }
};


  const calculateTotalPrice = (price: number, quantity: number) => {
    return price * quantity;
  };

  const grandTotal = cartItemsn?.reduce((total, item) => {
    return total + calculateTotalPrice(item?.product?.discount, item.quantity);
  }, 0);

  return (
    <Suspense fallback={<>Loading...</>}>
      <main>
        <Header />
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
        className="border rounded border-[#D2D2D2] px-4 py-2 my-4"
      >
        <div className="flex justify-between flex-wrap 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col gap-4">
          <div>
            <Image
              className="w-100 h-100 object-cover"
              src={`https://ajiroba.onrender.com/media/${item?.product?.images[0]?.image}`}
              alt="Product Thumbnail"
              height={100}
              width={100}
            />

            <div className="flex items-center mt-2">
              <button
                onClick={() => handleDecrement(item.id, item.quantity)}
                className="px-2  bg-white text-[#111111] rounded border border-[#DEDEDE]"
              >
                -
              </button>
              <input
                type="text"
                value={item.quantity}
                readOnly
                className="w-12 text-center  border-gray-300"
              />
              <button
                onClick={() => handleIncrement(item.id, item.quantity)}
                className="px-2  bg-[#E36414] text-white rounded border-[#E36414]"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center flex-col 2xl:w-3/12 xl:w-3/12 lg:w-3/12 md:w-3/12 w-auto">
            <p className="text-[#111111]  font-Poppins font-medium text-base mt-4">
              {item?.product?.name}
            </p>

            <h1 className="text-[#b4a3a3] text-sm  mt-4">Food Stuff . In Stock</h1>
          </div>

          <div>
            <h1 className="text-[#111111] font-Poppins text-xl mt-2 font-semibold">
              N{" "}
              {calculateTotalPrice(item?.product?.discount, item.quantity).toLocaleString()}
            </h1>
            <h1 className="text-[#111111] text-lg mt-2 line-through">
              N {item?.product?.price?.toLocaleString()}
            </h1>

            <div
              className="flex items-center gap-2 mt-8 cursor-pointer"
              onClick={() => handleDelete(item.id, item.quantity)}
            >
              <RiDeleteBin6Line color="#E84526" />
              <h1 className="text-[#E84526]">Delete</h1>
            </div>
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
              <div className="border rounded border-[#D2D2D2] px-4 shadow py-4">
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
              </div>
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
                    className={`px-6 py-4 ${
                      currentPage === index + 1
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
