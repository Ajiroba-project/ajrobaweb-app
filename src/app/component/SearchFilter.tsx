import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { AllCategories, MobileSideMenu } from "./AllCategories";
import { CatMobileSideMenu } from "./SideMenu";
import { FaStar } from "react-icons/fa6";
import { it } from "node:test";
import { useQueryData } from "@/hooks/useQueryData";
import { IoMdArrowDropright } from "react-icons/io";
import './style.css'


// interface SelectedItem {
//   id: number;
// }

// interface SelectedRating {
//   id: number
//   rating: any
// }


// export const SearchFilter = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("Foodstuff");
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const { replace } = useRouter();
//   const sub = searchParams.get("sub");

//   const decodedPaths = pathname
//     .split("/")
//     .filter((path) => path !== "")
//     .map((path) => decodeURIComponent(path));

//   const { data: catInfo, isLoading: catnLoading } = useQueryData<any>(`${process.env.NEXT_PUBLIC_BASE_URL}/commerce/categories_and_subcategories/`, ["get categories_and_subcategories"], true);

//   const currentCategory = catInfo?.data?.find(
//     (category: any) =>
//       category.category.toLowerCase() ===
//       decodedPaths[decodedPaths.length - 1].toLowerCase(),
//   );


//   const handlesubcat = (subCategory: string, id: string) => {
//     console.log(subCategory, 'subcategory', id, 'idddd')

//     const params = new URLSearchParams(searchParams);
//     if (subCategory) {
//       params.set('sub', subCategory);
//       params.set('subid', id);
//     } else {
//       params.delete('sub');
//       params.delete('subid');
//     }
//     replace(`${pathname}?${params.toString()}`);

//   }


//   return (
//     <div className="mb-8" >

//       <div  className="flex cursor-pointer text-sm font-Poppins items-center gap-3 mb-4 bg-[#D9D9D9] py-2 text-[#2A2A2A] ">
//         <div className="flex gap-2 items-center " style={{
//         margin: '0 auto',
//         width: '60%',
//         maxWidth: '100%',
//         zIndex: 51
//       }}  >
//           <FiMenu size={18} />
//         <p onClick={() => setIsOpen(!isOpen)}>All Category</p>
//         </div>
//       </div>

//       {
//         isOpen &&

//         <div className='hidden bg-[#FFFFFF] lg:block  '>
//           <div className="" >
//              <AllCategories />
//           </div>

//         </div>
//       }

//       {isOpen && (
//         <div className='  z-50 h-full w-full'>
//            <CatMobileSideMenu />

//         </div>
//       )}

//       <div className="pl-3 mt-4 flex " style={{
//         margin: '0 auto',
//         width: '70%',
//         maxWidth: '100%',
//         zIndex: 51
//       }}  >
//         {currentCategory && (
//           <div key={currentCategory.category}>
//             <p
//               onClick={() => setSelectedCategory(currentCategory.category)}
//               className={`flex items-center pb-3  ${selectedCategory === currentCategory.category ? "font-bold" : ""}`}
//             >
//             <IoMdArrowDropright color="" size={20} />  {currentCategory.category}
//             </p>

//             <ul


//             >
//               {currentCategory?.subcategories?.map((subCategory: any) => (
//                 <li
//                   key={subCategory?.subcategory}
//                   className={`pl-5   ${sub === subCategory?.subcategory ? "text-[#F25E26]" : ""}`}

//                   onClick={() => handlesubcat(subCategory?.subcategory, subCategory?.id)}
//                 >
//                   {subCategory?.subcategory}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>

//     </div>
//   );
// };




export const SearchFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Foodstuff");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const sub = searchParams.get("sub");

  const decodedPaths = pathname
    .split("/")
    .filter((path) => path !== "")
    .map((path) => decodeURIComponent(path));

  const { data: catInfo, isLoading: catnLoading } = useQueryData<any>(`${process.env.NEXT_PUBLIC_BASE_URL}/commerce/categories_and_subcategories/`, ["get categories_and_subcategories"], true);

  const currentCategory = catInfo?.data?.find(
    (category: any) =>
      category.category.toLowerCase() ===
      decodedPaths[decodedPaths.length - 1].toLowerCase(),
  );

  const handlesubcat = (subCategory: string, id: string) => {
    const params = new URLSearchParams(searchParams);
    if (subCategory) {
      params.set('sub', subCategory);
      params.set('subid', id);
    } else {
      params.delete('sub');
      params.delete('subid');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  // Function to close modal
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="mb-8">
      {/* Button to open modal */}
      <div
        className="flex cursor-pointer text-sm font-Poppins items-center gap-3 mb-4 bg-[#D9D9D9] py-2 text-[#2A2A2A]"
        onClick={() => setIsOpen(true)}
      >
        <div
          className="flex gap-2 items-center menu-content"
          style={{
           /*  margin: "0 auto",
            width: "60%",
            maxWidth: "100%",
            zIndex: 51, */
              margin: "0 auto",
      width: "60%",
      maxWidth: "100%",
          }}
        >
          <FiMenu size={18} />
          <p>All Category</p>
        </div>
      </div>

      <div
        className="pl-3 mt-4 flex"
        style={{
          margin: "0 auto",
          width: "70%",
          maxWidth: "100%",
          zIndex: 51,
        }}
      >
        {currentCategory && (
          <div key={currentCategory.category}>
            <p
              onClick={() => setSelectedCategory(currentCategory.category)}
              className={`flex items-center pb-3 ${
                selectedCategory === currentCategory.category ? "font-bold" : ""
              }`}
            >
              <IoMdArrowDropright color="" size={20} /> {currentCategory.category}
            </p>

            <ul>
              {currentCategory?.subcategories?.map((subCategory: any) => (
                <li
                  key={subCategory?.subcategory}
                  className={`pl-5 ${
                    sub === subCategory?.subcategory ? "text-[#F25E26]" : ""
                  }`}
                  onClick={() => handlesubcat(subCategory?.subcategory, subCategory?.id)}
                >
                  {subCategory?.subcategory}
                </li>
              ))}
            </ul>
          </div>
        )}

       {/*  {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-start bg-black bg-opacity-50">
            <div className="bg-white w-auto max-h-[80%] overflow-auto p-4 relative mt-4 ml-4 top-48 left-80">
              <button
                className="absolute top-2 right-2 text-xl font-bold"
                onClick={() => setIsOpen(false)}
              >
                &times;
              </button>
              <AllCategories closeModal={closeModal} />
            </div>
          </div>
        )} */}
        {isOpen && (
  <div className="fixed inset-0 z-50 flex items-start justify-start bg-black bg-opacity-50">
    <div
      className={`bg-white w-auto max-h-[80%] overflow-auto p-4 relative mt-4 ml-4 top-48 left-80`}
      style={{
       /*  top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
         width: '50%',
        maxWidth: '500px', */
      }}
    >
      <button
        className="absolute top-2 right-2 text-xl font-bold"
        onClick={() => setIsOpen(false)}
      >
        &times;
      </button>
      <AllCategories closeModal={closeModal} />
    </div>
  </div>
)}

      </div>
    </div>
  );
};
