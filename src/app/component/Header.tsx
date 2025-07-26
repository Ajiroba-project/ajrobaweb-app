// 'use client';
// import { useState, useEffect, useRef } from 'react';
// import { socialIcon, headerMenu, marqueeInfo } from '../static-data';
// import { IoCartOutline } from 'react-icons/io5';
// import { BiBell } from 'react-icons/bi';
// import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
// import { FiMenu } from 'react-icons/fi';
// import { IoClose } from 'react-icons/io5';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useAuthStore, userNavStore } from '@/store/store';
// import { useMutateData } from '@/hooks/useMutateData';
// import Brand from '../asset/logo.svg';
// import { CiSearch } from 'react-icons/ci';
// import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// import { useQueryData } from '@/hooks/useQueryData';
// import { AuctionMarquee } from './Auction-Marquee';
// import React from 'react';
// import Cookies from "js-cookie";
// import axios from "axios";

// interface HeaderProps {
//   onSearch?: React.Dispatch<React.SetStateAction<string>>;
// }

// interface Subcategory {
//   toLowerCase: any;
//   id: string
//   subcategory: any;
//   name?: string;
//   category?: string;
//   data?: any
// }

// interface CategoryResponse {
//   data: Category[];
// }

// interface Category {
//   [x: string]: any
//   category: string;
//   subcategories: Subcategory[];
//   data?: any
// }

// interface CategoryResponse {
//   data: Category[];
// }

// function Search({ isMobile = false, onClose }: { isMobile?: boolean; onClose?: () => void }) {
//   const [searchInput, setSearchInput] = useState('');
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [searchResults, setSearchResults] = useState<{ id: string; name: string }[]>([]);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const router = useRouter();
//   const pathname = usePathname();

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [dropdownRef]);

//   const { data: catInfo, isLoading: catnLoading } = useQueryData<CategoryResponse>(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/categories_and_subcategories/`,
//     ["get categories_and_subcategories"],
//     true
//   );

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const input = e.target.value;
//     setSearchInput(input);
//     setIsDropdownOpen(true);

//     if (input) {
//       const lowerCaseInput = input.toLowerCase();
//       const results: { id: string; name: string }[] = [];

//       catInfo?.data?.forEach((category) => {
//         const categoryMatch = category.category.toLowerCase().includes(lowerCaseInput);
//         if (categoryMatch) {
//           results.push({ id: category.id, name: category.category });
//         }

//         category.subcategories.forEach((subcategory) => {
//           if (typeof subcategory === 'string') {
//             const lowerCaseSubcategory = (subcategory as string).toLowerCase();
//             if (lowerCaseSubcategory.includes(lowerCaseInput)) {
//               results.push(subcategory);
//             }
//           } else {
//             console.warn('Unexpected subcategory data type:', subcategory);
//           }
//         });
//       });

//       setSearchResults(results);
//     } else {
//       setSearchResults([]);
//     }
//   };

//   const handleSearchSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (searchInput) {
//       router.push(`${pathname}?search=${searchInput}`);
//     }
//     setIsDropdownOpen(false);
//     onClose?.();
//   };

//   const handleResultClick = () => {
//     setIsDropdownOpen(false);
//     onClose?.();
//   };

//   return (
//     <div ref={dropdownRef} className='relative w-full'>
//       <form className='relative flex w-full' onSubmit={handleSearchSubmit}>
//         <input
//           type="text"
//           className='bg-[#F5F5F5] p-2 w-full text-sm rounded-l-md border border-gray-200 focus:outline-none focus:ring-2  focus:border-transparent'
//           value={searchInput}
//           onChange={handleSearchChange}
//           onClick={() => setIsDropdownOpen(true)}
//           placeholder="Search products..."
//         />
//         <button 
//           type="submit" 
//           className='bg-[#F5F5F5] px-3 rounded-r-md hover:bg-[#F5F5F5] transition-colors '
//         >
//           <CiSearch className='text-black text-lg' />
//         </button>
//       </form>

//       {isDropdownOpen && (
//         <div className={`absolute left-0 right-0 z-50 mt-1 bg-white shadow-lg rounded-md max-h-60 overflow-y-auto border border-gray-200 ${isMobile ? 'max-h-80' : ''}`}>
//           {searchResults.length > 0 ? (
//             <div>
//               {searchResults.map((result, index) => (
//                 <Link 
//                   key={index} 
//                   href={`/categories/${result.name}?cat_id=${result.id}`}
//                   onClick={handleResultClick}
//                 >
//                   <div className='block px-4 py-3 text-sm text-[#504D4D] font-Poppins hover:bg-gray-50 border-b border-gray-100 last:border-b-0'>
//                     {result.name}
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           ) : searchInput ? (
//             <div className="p-4 text-sm text-gray-500">No results found</div>
//           ) : (
//             <div className="p-4 text-sm text-gray-500">Start typing to search...</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
//   const pathname = usePathname();
//   const isRootPath = pathname === '/';
//   const [isOpen, setIsOpen] = useState<boolean | null>(null);
//   const [showMobileSearch, setShowMobileSearch] = useState(false);
//   const [cartCount, setcartCount] = useState<string | number | any>(0);
//   const [activeMenu, setActiveMenu] = useState<number | null>(null);
//   const [hoveredMenu, setHoveredMenu] = useState<number | null>(null);
  
//   const { isLoggedIn, clearAuthCookies } = useAuthStore(state => ({
//     isLoggedIn: state.isLoggedIn,
//     clearAuthCookies: state.clearAuthCookies,
//   }));
  
//   const { setHeaderNav, headerNav } = userNavStore(state => ({
//     setHeaderNav: state.setHeaderNav,
//     headerNav: state.headerNav,
//   }));

//   const router = useRouter();
//   const menuRef = useRef<HTMLDivElement>(null);

//   const hamburgerfunc = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleSuccess = () => {
//     clearAuthCookies();
//     localStorage.clear();
//     router.push('/signin');
//   };

//   const handleError = () => {
//     console.log('Something went wrong...');
//     clearAuthCookies();
//     localStorage.clear();
//     router.push('/signin');
//   };

//   const { mutate } = useMutateData(
//     'signout',
//     handleSuccess,
//     handleError
//   );

//   const SignoutFunc = () => {
//     mutate({
//       url: '/api/signout',
//       payload: {},
//     });
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         setActiveMenu(null);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [headerNav, menuRef]);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [cartItemsn, setCartItemsn] = useState<any[]>([]);

//   const tkn_: string = Cookies.get("token") as string;

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       setLoading(true);

//       let sessionKey = Cookies.get("session_key");

//       if (!sessionKey) {
//         sessionKey = `session_${Math.random().toString(36).substr(2, 9)}`;
//         Cookies.set('session_key', sessionKey, { expires: 7 });
//       }

//       let headers: { [key: string]: string } = {
//         "Content-Type": "application/json",
//       };

//       if (tkn_) {
//         headers["Authorization"] = `token ${tkn_}`;
//       }

//       let config = {
//         method: "GET",
//         maxBodyLength: Infinity,
//         url: `https://staging.ajiroba.ng/v1/commerce/cart/?session_key=${sessionKey}`,
//         headers: headers,
//       };

//       axios
//         .request(config)
//         .then((response) => {
//           setcartCount(Number(response.data?.data?.[0]?.cart_items_count));
//           setCartItemsn(response.data?.data[0]?.items);
//         })
//         .catch((error) => {
//           setError("Error loading cart items");
//         })
//         .finally(() => setLoading(false));
//     };

//     fetchCartItems();
//   }, [isRootPath, tkn_]);

//   return (
//     <>
//       <section className='relative'>
//         <div className='bg-[#2A2A2A] p-3 text-sm text-white'>
//           <div className='flex items-center justify-between gap-3 px-7'>
//             <div className='w-full'>
//               <AuctionMarquee info={marqueeInfo} />
//             </div>
//             <div className='header-socials mr-3 hidden gap-3 lg:flex overflow-scroll '>
//               {socialIcon.map((val, index) => (
//                 <div key={index} className='w-3.5 lg:w-4'>
//                   <Image src={val.icon} alt={'socials'} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className='relative bg-white p-2 shadow-md'>
//           <div style={{
//             margin: '0 auto',
//             width: '100%',
//             maxWidth: '100%',
//             zIndex: 51
//           }}
//             className={`${isOpen ? 'bg-opacity-4 fixed left-0 top-0 z-50 h-screen w-screen bg-[#000000d1] bg-opacity-[0.9] bg-clip-padding backdrop-blur-sm backdrop-filter' : 'h-auto w-auto bg-transparent '}`}
//           >
//             <div className='flex w-full items-center justify-between gap-2 relative'>
//               {/* Brand Logo and Navigation */}
//               <div className='flex cursor-pointer items-center gap-2 flex-shrink-0'>
//                 <Link href={'/'} className={`${isOpen ? 'hidden' : null}`}>
//                   <Image src={Brand} alt='brand-logo' />
//                 </Link>

//                 <div
//                   ref={menuRef}
//                   className={
//                     !isOpen
//                       ? `hidden items-center lg:flex`
//                       : 'fixed right-0 top-0 z-50 h-screen items-center bg-white py-5 lg:relative lg:h-fit'
//                   }
//                 >
//                   <div className='Brand-logo my-8 flex w-max cursor-pointer items-center gap-2 lg:hidden'>
//                     <Link href={'/'}>
//                       <Image src={Brand} alt='brand-logo' />
//                     </Link>
//                     {isOpen ? (
//                       <IoClose
//                         onClick={hamburgerfunc}
//                         className='text-xl lg:hidden'
//                       />
//                     ) : (
//                       <FiMenu
//                         onClick={hamburgerfunc}
//                         className='text-xl lg:hidden'
//                       />
//                     )}
//                   </div>

//                   <ul
//                     className={
//                       !isOpen
//                         ? `flex w-max flex-col items-baseline gap-3 lg:flex-row`
//                         : 'w-full items-center gap-2 py-2 lg:flex'
//                     }
//                   >
//                     {headerMenu?.map((val, index) => {
//                       return (
//                         <li
//                           key={index}
//                           className={` font-Poppins cursor-pointer px-4 hover:text-[#F25E26]  ${pathname === val.path ? 'text-[#F25E26]' : 'text-[#A09F9F]'} hover:text-[#504D4D]  ${!isOpen ? 'py-2 lg:py-1' : ''}`}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setActiveMenu(activeMenu === index ? null : index);
//                           }}
//                           onMouseEnter={() => {
//                             setHoveredMenu(index);
//                             setActiveMenu(null);
//                           }}
//                           onMouseLeave={() => {
//                             setHoveredMenu(null);
//                           }}
//                         >
//                           {val.submenu ? (
//                             <div className='relative'>
//                               <span className='flex items-center gap-2 '>
//                                 {val.name}
//                                 {hoveredMenu === index ? (
//                                   <IoIosArrowUp />
//                                 ) : (
//                                   <IoIosArrowDown />
//                                 )}
//                               </span>
//                               {hoveredMenu === index && (
//                                 <ul
//                                   className='absolute left-0 z-10 mt-0 h-fit w-max rounded-md bg-white pb-2 shadow-md'
//                                   onMouseEnter={() => setHoveredMenu(index)}
//                                   onMouseLeave={() => setHoveredMenu(null)}
//                                 >
//                                   {val.submenu.map((subItem, subIndex) => (
//                                     <li
//                                       key={subIndex}
//                                       className={`${(subItem.name === 'Profile' && !isLoggedIn) || (subItem.name === 'Wallet' && !isLoggedIn) || (subItem.name === 'Community' && !isLoggedIn) || (subItem.name === 'Referral Code' && !isLoggedIn) || (subItem.name === 'Sign Out' && !isLoggedIn) ? 'hidden' : 'block'} ${(subItem.name === 'Sign Up' && isLoggedIn) || (subItem.name === 'Sign In' && isLoggedIn) ? 'hidden' : ''} p-2 px-4 text-sm font-medium font-Poppins  text-[#2A2A2A] hover:bg-[#FCDFD4] hover:text-[#504D4D]`}
//                                     >
//                                       <div
//                                         onClick={() =>
//                                           subItem.name === 'Sign Out'
//                                             ? SignoutFunc()
//                                             : router.push(`${subItem.path}`)
//                                         }
//                                       >
//                                         <span className=''> {subItem.name} </span>
//                                       </div>
//                                     </li>
//                                   ))}
//                                 </ul>
//                               )}
//                             </div>
//                           ) : (
//                             <Link
//                               href={
//                                 isRootPath ? val.path : `${val.path}`
//                               }
//                               className='flex items-center gap-2'
//                             >
//                               {val.name}
//                             </Link>
//                           )}
//                         </li>
//                       )
//                     })}
//                   </ul>
//                 </div>
//               </div>

//               {/* Right Side Actions */}
//               <div className='flex gap-2 md:gap-4 items-center justify-end flex-1 min-w-0'>
//                 {/* Search - Hidden on mobile, shown on larger screens */}
//                 <div className='hidden sm:block relative flex-1 max-w-xs'>
//                   <Search />
//                 </div>

//                 {/* Mobile Search Toggle Button */}
//                 <div className='sm:hidden'>
//                   <CiSearch 
//                     className='cursor-pointer text-xl text-[#000000] flex-shrink-0' 
//                     onClick={() => setShowMobileSearch(!showMobileSearch)}
//                   />
//                 </div>

//                 {/* Notification Bell */}
//                 <BiBell className='cursor-pointer text-xl text-[#000000] flex-shrink-0' />

//                 {/* Cart with Badge */}
//                 <div className='relative cursor-pointer flex-shrink-0' onClick={() => router.push('/cart')}>
//                   <IoCartOutline className='text-xl text-[#000000]' />
//                   {cartCount > 0 && (
//                     <span className='absolute -top-1 -right-2 bg-red-600 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center md:w-5 md:h-5 md:text-sm'>
//                       {cartCount}
//                     </span>
//                   )}
//                 </div>

//                 {/* Hamburger Menu */}
//                 <div className='flex-shrink-0 lg:hidden'>
//                   {isOpen ? (
//                     <IoClose
//                       onClick={hamburgerfunc}
//                       className='text-xl text-[#A09F9F]'
//                     />
//                   ) : (
//                     <FiMenu
//                       onClick={hamburgerfunc}
//                       className='text-xl text-[#A09F9F]'
//                     />
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Search Overlay */}
//         {showMobileSearch && (
//           <div className='sm:hidden absolute top-full left-0 right-0 bg-white shadow-lg p-4 z-50 border-t border-gray-200'>
//             <div className='flex items-center gap-2'>
//               <div className='flex-1'>
//                 <Search isMobile={true} onClose={() => setShowMobileSearch(false)} />
//               </div>
//               <button 
//                 onClick={() => setShowMobileSearch(false)}
//                 className='text-gray-500 hover:text-gray-700 flex-shrink-0'
//               >
//                 <IoClose className='text-xl' />
//               </button>
//             </div>
//           </div>
//         )}
//       </section>
//     </>
//   );
// };

// export default Search;





'use client';
import { useState, useEffect, useRef } from 'react';
import { socialIcon, headerMenu, marqueeInfo } from '../static-data';
import { IoCartOutline } from 'react-icons/io5';
import { BiBell } from 'react-icons/bi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { FiMenu } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import Image from 'next/image';
import Link from 'next/link';
import { useAuthStore, userNavStore } from '@/store/store';
import { useMutateData } from '@/hooks/useMutateData';
import Brand from '../asset/logo.svg';
import { CiSearch } from 'react-icons/ci';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useQueryData } from '@/hooks/useQueryData';
import { AuctionMarquee } from './Auction-Marquee';
import React from 'react';
import Cookies from "js-cookie";
import axios from "axios";

interface HeaderProps {
  onSearch?: React.Dispatch<React.SetStateAction<string>>;
}

interface SearchResult {
  id: string;
  name: string;
  type: 'category' | 'subcategory' | 'product' | 'auction' | 'post';
  url: string;
  description: string;
  image?: string | null;
  price?: number | null;
  category?: string;
  author?: string;
}

interface SearchResponse {
  data: {
    results: SearchResult[];
    total: number;
    query: string;
    type: string;
  };
}

function Search({ isMobile = false, onClose }: { isMobile?: boolean; onClose?: () => void }) {
  const [searchInput, setSearchInput] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn } = useAuthStore(state => ({
    isLoggedIn: state.isLoggedIn,
  }));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  // Debounced search function
  const performSearch = async (query: string) => {
    if (!query || query.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const token = Cookies.get("token") as string;
      const headers: { [key: string]: string } = {
        "Content-Type": "application/json",
      };

      if (token && isLoggedIn) {
        headers["Authorization"] = `token ${token}`;
      }

      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&type=all`, {
        method: "GET",
        headers: headers,
      });

      if (response.ok) {
        const data: SearchResponse = await response.json();
        setSearchResults(data.data.results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearchInput(input);
    setIsDropdownOpen(true);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Debounce search
    searchTimeoutRef.current = setTimeout(() => {
      performSearch(input);
    }, 300);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchInput) {
      // Navigate to search results page or perform search
      router.push(`/search?q=${encodeURIComponent(searchInput)}`);
    }
    setIsDropdownOpen(false);
    onClose?.();
  };

  const handleResultClick = (result: SearchResult) => {
    router.push(result.url);
    setIsDropdownOpen(false);
    onClose?.();
  };

  return (
    <div ref={dropdownRef} className='relative w-full'>
      <form className='relative flex w-full' onSubmit={handleSearchSubmit}>
        <input
          type="text"
          className={`bg-[#F5F5F5] p-2 w-full text-sm rounded-l-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F25E26] focus:border-transparent ${
            isMobile ? 'py-3 text-base' : ''
          }`}
          value={searchInput}
          onChange={handleSearchChange}
          onClick={() => setIsDropdownOpen(true)}
          placeholder="Search products..."
        />
        <button 
          type="submit" 
          className={`bg-[#F5F5F5] px-3 rounded-r-md hover:bg-[#E5E5E5] transition-colors border border-l-0 border-gray-200 ${
            isMobile ? 'px-4' : ''
          }`}
        >
          <CiSearch className={`text-black ${isMobile ? 'text-xl' : 'text-lg'}`} />
        </button>
      </form>

      {isDropdownOpen && (
        <div className={`absolute left-0 right-0 z-50 mt-1 bg-white shadow-lg rounded-md max-h-80 overflow-y-auto border border-gray-200 ${
          isMobile ? 'max-h-96' : ''
        }`}>
          {isSearching ? (
            <div className="flex items-center justify-center py-6">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#F25E26]"></div>
              <span className="ml-2 text-sm text-gray-500">Searching...</span>
            </div>
          ) : searchResults.length > 0 ? (
            <div>
              {searchResults.map((result, index) => (
                <div 
                  key={`${result.type}-${result.id}`}
                  onClick={() => handleResultClick(result)}
                  className="block px-4 py-3 text-sm text-[#504D4D] font-Poppins hover:bg-gray-50 border-b border-gray-100 last:border-b-0 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                   {/*  {result.image && (
                      <image
                        src={result.image} 
                        alt={result.name}
                        className="w-8 h-8 object-cover rounded"
                      />
                    )} */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[#2A2A2A] truncate">
                          {result.name}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          result.type === 'category' ? 'bg-blue-100 text-blue-700' :
                          result.type === 'subcategory' ? 'bg-green-100 text-green-700' :
                          result.type === 'product' ? 'bg-purple-100 text-purple-700' :
                          result.type === 'auction' ? 'bg-orange-100 text-orange-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {result.type}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 truncate">
                        {result.description}
                      </div>
                      {result.price && (
                        <div className="text-xs font-medium text-[#F25E26] mt-1">
                          ₦{result.price.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {searchResults.length >= 20 && (
                <div className="px-4 py-2 text-xs text-gray-500 text-center border-t border-gray-100">
                  Showing top 20 results. <button 
                    onClick={handleSearchSubmit}
                    className="text-[#F25E26] hover:underline"
                  >
                    View all results
                  </button>
                </div>
              )}
            </div>
          ) : searchInput && searchInput.length >= 2 ? (
            <div className={`p-4 text-sm text-gray-500 ${isMobile ? 'text-base' : ''}`}>
              No results found for &quot;{searchInput}&quot;
            </div>
          ) : (
            <div className={`p-4 text-sm text-gray-500 ${isMobile ? 'text-base' : ''}`}>
              Start typing to search...
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const pathname = usePathname();
  const isRootPath = pathname === '/';
  const [isOpen, setIsOpen] = useState<boolean | null>(null);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [cartCount, setcartCount] = useState<string | number | any>(0);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [hoveredMenu, setHoveredMenu] = useState<number | null>(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [expandedNotifications, setExpandedNotifications] = useState<number[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [notificationError, setNotificationError] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  const { isLoggedIn, clearAuthCookies } = useAuthStore(state => ({
    isLoggedIn: state.isLoggedIn,
    clearAuthCookies: state.clearAuthCookies,
  }));
  
  const { setHeaderNav, headerNav } = userNavStore(state => ({
    setHeaderNav: state.setHeaderNav,
    headerNav: state.headerNav,
  }));

  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  const hamburgerfunc = () => {
    setIsOpen(!isOpen);
    // Prevent body scroll when menu is open
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const handleSuccess = () => {
    clearAuthCookies();
    localStorage.clear();
    router.push('/signin');
  };

  const handleError = () => {
    console.log('Something went wrong...');
    clearAuthCookies();
    localStorage.clear();
    router.push('/signin');
  };

  const { mutate } = useMutateData(
    'signout',
    handleSuccess,
    handleError
  );

  const SignoutFunc = () => {
    mutate({
      url: '/api/signout',
      payload: {},
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [headerNav, menuRef]);

  // Cleanup body scroll on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartItemsn, setCartItemsn] = useState<any[]>([]);

  const tkn_: string = Cookies.get("token") as string;

  // Fetch notifications data
  const { data: notificationsData, isLoading: notificationsLoading } = useQueryData<any>(
    isLoggedIn ? `/api/demo-notifications` : "",
    ["notifications"],
    isLoggedIn
  );

  // Handle notifications data and count
  useEffect(() => {
    if (notificationsData?.data?.data && Array.isArray(notificationsData.data.data)) {
      setNotifications(notificationsData.data.data);
      const unreadCount = notificationsData.data.data.filter((n: any) => !n.read).length;
      setNotificationCount(unreadCount);
      setNotificationError(null);
    } else if (notificationsData?.data?.count) {
      setNotificationCount(notificationsData.data.count);
    }
  }, [notificationsData]);

  // Handle notification errors
  useEffect(() => {
    if (notificationsData?.error) {
      setNotificationError('Unable to load notifications');
    }
  }, [notificationsData]);

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);

      let sessionKey = Cookies.get("session_key");

      if (!sessionKey) {
        sessionKey = `session_${Math.random().toString(36).substr(2, 9)}`;
        Cookies.set('session_key', sessionKey, { expires: 7 });
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
        url: `https://staging.ajiroba.ng/v1/commerce/cart/?session_key=${sessionKey}`,
        headers: headers,
      };

      axios
        .request(config)
        .then((response) => {
          setcartCount(Number(response.data?.data?.[0]?.cart_items_count));
          setCartItemsn(response.data?.data[0]?.items);
        })
        .catch((error) => {
          setError("Error loading cart items");
        })
        .finally(() => setLoading(false));
    };

    fetchCartItems();
  }, [isRootPath, tkn_]);

  // Handle notification accordion toggle
  const toggleNotification = (index: number) => {
    setExpandedNotifications(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // Handle notification modal close
  const closeNotificationModal = () => {
    setShowNotificationModal(false);
    setExpandedNotifications([]);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeNotificationModal();
    }
  };

  // Focus management
  useEffect(() => {
    if (showNotificationModal) {
      // Focus the first focusable element in the modal
      const firstButton = document.querySelector('[role="dialog"] button') as HTMLElement;
      if (firstButton) {
        firstButton.focus();
      }
    }
  }, [showNotificationModal]);

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setNotificationCount(0);
  };

  // Mark single notification as read
  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    setNotificationCount(prev => Math.max(0, prev - 1));
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
    setNotificationCount(0);
    setExpandedNotifications([]);
  };

  // Handle notification click
  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id);
    if (notification.url) {
      router.push(notification.url);
      closeNotificationModal();
    }
  };

  // Load more notifications (pagination)
  const loadMoreNotifications = () => {
    if (!isLoadingMore && hasMore) {
      setIsLoadingMore(true);
      // Simulate loading more notifications
      setTimeout(() => {
        setIsLoadingMore(false);
        setHasMore(false); // For demo, we'll stop after first page
      }, 1000);
    }
  };

  return (
    <>
      <section className='relative w-full'>
        {/* Top Bar - Responsive */}
        <div className='bg-[#2A2A2A] p-2 sm:p-3 text-xs sm:text-sm text-white'>
          <div className='flex items-center justify-between gap-2 sm:gap-3 px-2 sm:px-4 lg:px-7 max-w-full'>
            {/* Marquee - Takes available space */}
            <div className='flex-1 min-w-0 overflow-hidden'>
              <AuctionMarquee info={marqueeInfo} />
            </div>
            
            {/* Social Icons - Hidden on mobile, shown on larger screens */}
            <div className='hidden md:flex gap-2 lg:gap-3 flex-shrink-0'>
              {socialIcon.map((val, index) => (
                <div key={index} className='w-3 lg:w-4 flex-shrink-0'>
                  <Image src={val.icon} alt={'socials'} className='w-full h-auto' />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Header - Responsive */}
        <div className='relative bg-white shadow-md'>
          {/* Mobile Menu Overlay */}
          {isOpen && (
            <div className='fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden' onClick={hamburgerfunc} />
          )}

          <div className='relative z-50'>
            <div className='flex w-full items-center justify-between gap-2 sm:gap-4 p-2 sm:p-3 lg:p-4 px-2 sm:px-4 lg:px-7 max-w-full'>
              
              {/* Left Section - Logo */}
              <div className='flex items-center gap-2 flex-shrink-0'>
                <Link href={'/'} className={`${isOpen ? 'opacity-50' : ''} transition-opacity duration-200`}>
                  <Image src={Brand} alt='brand-logo' className='h-8 sm:h-10 w-auto' />
                </Link>
              </div>

              {/* Center Section - Navigation (Desktop) */}
              <div className='hidden lg:flex items-center flex-1 justify-center'>
                <nav className='flex items-center gap-6 xl:gap-8'>
                  {headerMenu?.map((val, index) => (
                    <div
                      key={index}
                      className='relative'
                      onMouseEnter={() => setHoveredMenu(index)}
                      onMouseLeave={() => setHoveredMenu(null)}
                    >
                      {val.submenu ? (
                        <div className='relative'>
                          <span className='flex items-center gap-1 cursor-pointer font-Poppins text-sm xl:text-base font-medium text-[#A09F9F] hover:text-[#F25E26] transition-colors duration-200'>
                            {val.name}
                            <IoIosArrowDown className={`text-xs transition-transform duration-200 ${
                              hoveredMenu === index ? 'rotate-180' : ''
                            }`} />
                          </span>
                          
                          {/* Dropdown Menu */}
                          {hoveredMenu === index && (
                            <div 
                              className='absolute top-full left-0  w-48 bg-white shadow-lg rounded-md border border-gray-200 py-2 z-50'
                              onMouseEnter={() => setHoveredMenu(index)}
                              onMouseLeave={() => setHoveredMenu(null)}
                            >
                              {val.submenu.map((subItem, subIndex) => (
                                <div
                                  key={subIndex}
                                  className={`${
                                    (subItem.name === 'Profile' && !isLoggedIn) || 
                                    (subItem.name === 'Wallet' && !isLoggedIn) || 
                                    (subItem.name === 'Community' && !isLoggedIn) || 
                                    (subItem.name === 'Referral Code' && !isLoggedIn) || 
                                    (subItem.name === 'Sign Out' && !isLoggedIn) ? 'hidden' : 'block'
                                  } ${
                                    (subItem.name === 'Sign Up' && isLoggedIn) || 
                                    (subItem.name === 'Sign In' && isLoggedIn) ? 'hidden' : ''
                                  }`}
                                >
                                  <button
                                    onClick={() =>
                                      subItem.name === 'Sign Out'
                                        ? SignoutFunc()
                                        : router.push(`${subItem.path}`)
                                    }
                                    className='w-full text-left px-4 py-2 text-sm font-Poppins text-[#2A2A2A] hover:bg-[#FCDFD4] hover:text-[#F25E26] transition-colors duration-200'
                                  >
                                    {subItem.name}
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={isRootPath ? val.path : `${val.path}`}
                          className={`font-Poppins text-sm xl:text-base font-medium hover:text-[#F25E26] transition-colors duration-200 ${
                            pathname === val.path ? 'text-[#F25E26]' : 'text-[#A09F9F]'
                          }`}
                        >
                          {val.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
              </div>

              {/* Right Section - Actions */}
              <div className='flex items-center gap-2 sm:gap-3 flex-shrink-0'>
                
                {/* Desktop Search */}
                <div className='hidden md:block w-64 lg:w-72 xl:w-80'>
                  <Search />
                </div>

                {/* Mobile Search Button */}
                <button 
                  className='md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors duration-200'
                  onClick={() => setShowMobileSearch(!showMobileSearch)}
                >
                  <CiSearch className='text-xl text-[#A09F9F]' />
                </button>

                {/* Notifications */}
                <button 
                  className='relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-200'
                  onClick={() => isLoggedIn && setShowNotificationModal(true)}
                  title="Notifications"
                  aria-label={`Notifications (${notificationCount} unread)`}
                  aria-expanded={showNotificationModal}
                  aria-haspopup="dialog"
                >
                  <BiBell className='text-xl text-[#A09F9F] hover:text-[#F25E26] transition-colors duration-200' />
                  {isLoggedIn && notificationCount > 0 && (
                    <span 
                      className='absolute -top-1 -right-1 bg-[#F25E26] text-white text-xs  rounded-full w-5 h-5 flex items-center justify-center min-w-[20px] text-center'
                      aria-label={`${notificationCount} unread notifications`}
                    >
                      {notificationCount > 99 ? '99+' : notificationCount}
                    </span>
                  )}
                </button>

                {/* Cart */}
                <button 
                  className='relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-200'
                  onClick={() => router.push('/cart')}
                >
                  <IoCartOutline className='text-xl text-[#A09F9F] hover:text-[#F25E26] transition-colors duration-200' />
                  {cartCount > 0 && (
                    <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center min-w-[20px] text-center'>
                      {cartCount > 99 ? '99+' : cartCount}
                    </span>
                  )}
                </button>

                {/* Mobile Menu Toggle */}
                <button 
                  className='lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors duration-200'
                  onClick={hamburgerfunc}
                >
                  {isOpen ? (
                    <IoClose className='text-xl text-[#A09F9F]' />
                  ) : (
                    <FiMenu className='text-xl text-[#A09F9F]' />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div
            className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className='flex flex-col h-full'>
              {/* Mobile Menu Header */}
              <div className='flex items-center justify-between p-4 border-b border-gray-200'>
                <Link href={'/'} onClick={() => setIsOpen(false)}>
                  <Image src={Brand} alt='brand-logo' className='h-8 w-auto' />
                </Link>
                <button 
                  onClick={hamburgerfunc}
                  className='p-2 hover:bg-gray-100 rounded-full transition-colors duration-200'
                >
                  <IoClose className='text-xl text-[#A09F9F]' />
                </button>
              </div>

              {/* Mobile Menu Items */}
              <div className='flex-1 overflow-y-auto py-4'>
                <nav className='px-4 space-y-2'>
                  {headerMenu?.map((val, index) => (
                    <div key={index} className='border-b border-gray-100 pb-2'>
                      {val.submenu ? (
                        <div>
                          <button
                            onClick={() => setActiveMenu(activeMenu === index ? null : index)}
                            className='w-full flex items-center justify-between py-3 px-2 text-left font-Poppins text-base font-medium text-[#A09F9F] hover:text-[#F25E26] transition-colors duration-200'
                          >
                            {val.name}
                            <IoIosArrowDown className={`text-sm transition-transform duration-200 ${
                              activeMenu === index ? 'rotate-180' : ''
                            }`} />
                          </button>
                          
                          {/* Mobile Submenu */}
                          {activeMenu === index && (
                            <div className='pl-4 space-y-1'>
                              {val.submenu.map((subItem, subIndex) => (
                                <div
                                  key={subIndex}
                                  className={`${
                                    (subItem.name === 'Profile' && !isLoggedIn) || 
                                    (subItem.name === 'Wallet' && !isLoggedIn) || 
                                    (subItem.name === 'Community' && !isLoggedIn) || 
                                    (subItem.name === 'Referral Code' && !isLoggedIn) || 
                                    (subItem.name === 'Sign Out' && !isLoggedIn) ? 'hidden' : 'block'
                                  } ${
                                    (subItem.name === 'Sign Up' && isLoggedIn) || 
                                    (subItem.name === 'Sign In' && isLoggedIn) ? 'hidden' : ''
                                  }`}
                                >
                                  <button
                                    onClick={() => {
                                      if (subItem.name === 'Sign Out') {
                                        SignoutFunc();
                                      } else {
                                        router.push(`${subItem.path}`);
                                      }
                                      setIsOpen(false);
                                    }}
                                    className='w-full text-left py-2 px-3 text-sm font-Poppins text-[#2A2A2A] hover:bg-[#FCDFD4] hover:text-[#F25E26] rounded-md transition-colors duration-200'
                                  >
                                    {subItem.name}
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={isRootPath ? val.path : `${val.path}`}
                          onClick={() => setIsOpen(false)}
                          className={`block py-3 px-2 font-Poppins text-base font-medium hover:text-[#F25E26] transition-colors duration-200 ${
                            pathname === val.path ? 'text-[#F25E26]' : 'text-[#A09F9F]'
                          }`}
                        >
                          {val.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Mobile Search Overlay */}
          {showMobileSearch && (
            <div className='md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-40'>
              <div className='p-4'>
                <div className='flex items-center gap-3'>
                  <div className='flex-1'>
                    <Search isMobile={true} onClose={() => setShowMobileSearch(false)} />
                  </div>
                  <button 
                    onClick={() => setShowMobileSearch(false)}
                    className='p-2 text-gray-500 hover:text-gray-700 flex-shrink-0'
                  >
                    <IoClose className='text-xl' />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Notification Modal - Full Page Overlay */}
        {showNotificationModal && (
          <div className='fixed inset-0 z-50 flex'>
            {/* Main Content Area with Opacity */}
            <div className='flex-1 bg-black bg-opacity-30' onClick={closeNotificationModal}></div>
            
            {/* Notification Side Panel */}
            <div 
              className='w-full max-w-2xl bg-white shadow-2xl h-full overflow-hidden'
              role="dialog"
              aria-labelledby="notification-title"
              aria-modal="true"
              onKeyDown={handleKeyDown}
              tabIndex={-1}
            >
              {/* Modal Header */}
              <div className='flex items-center justify-between p-6 border-b border-gray-200 bg-white'>
                <h3 
                  id="notification-title" 
                  className="text-xl font-semibold text-[#2A2A2A] font-Poppins text-center w-full"
                  style={{ textAlign: 'center', flex: 1 }}
                >
                  Notification
                </h3>
                <div className='flex items-center gap-2'>
                 {/*  {notifications.length > 0 && (
                    <>
                      <button 
                        onClick={markAllAsRead}
                        className='px-3 py-1 text-sm text-[#F25E26] hover:bg-[#FCDFD4] rounded-md transition-colors duration-200'
                        title="Mark all as read"
                      >
                        Mark all read
                      </button>
                      <button 
                        onClick={clearAllNotifications}
                        className='px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-md transition-colors duration-200'
                        title="Clear all notifications"
                      >
                        Clear all
                      </button>
                    </>
                  )} */}
                  <button 
                    onClick={closeNotificationModal}
                    className='p-2 hover:bg-gray-100 rounded-full transition-colors duration-200'
                    aria-label="Close notifications"
                  >
                    <IoClose className='text-xl text-[#A09F9F]' />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className='h-full overflow-y-auto'>
                {notificationsLoading ? (
                  <div className='flex items-center justify-center py-12'>
                    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[#F25E26]'></div>
                  </div>
                ) : notificationError ? (
                  <div className='text-center py-12 px-6'>
                    <div className='text-red-500 text-4xl mb-3'>⚠️</div>
                    <p className='text-gray-600 font-Poppins mb-2'>{notificationError}</p>
                    <button 
                      onClick={() => window.location.reload()}
                      className='px-4 py-2 bg-[#F25E26] text-white rounded-md hover:bg-[#E54D26] transition-colors duration-200'
                    >
                      Try Again
                    </button>
                  </div>
                ) : notifications.length > 0 ? (
                  <div className='p-6 space-y-4'>
                    {notifications.map((notification: any, index: number) => (
                      <div 
                        key={notification.id}
                        className={`border border-gray-200 rounded-lg bg-[#F6F6F6CC] shadow-sm hover:shadow-md transition-shadow duration-200 ${
                          !notification.read ? 'border-l-4  bg-blue-50' : ''
                        }`}
                      >
                        {/* Notification Header */}
                        <button
                          onClick={() => toggleNotification(index)}
                          className='w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 rounded-t-lg'
                        >
                          <div className='flex-1'>
                            <h4 className={`font-Poppins text-base ${
                              !notification.read ? 'font-semibold text-[#2A2A2A]' : 'font-medium text-[#504D4D]'
                            }`}>
                              {notification.title}
                            </h4>
                            <p className='text-sm text-gray-500 mt-1'>
                              {new Date(notification.date_created).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          <div className='flex items-center gap-2'>
                           {/*  {!notification.read && (
                              <div className='w-2 h-2 bg-[#F25E26] rounded-full'></div>
                            )} */}
                            <IoIosArrowDown 
                              className={`text-lg text-[#A09F9F] transition-transform duration-200 ${
                                expandedNotifications.includes(index) ? 'rotate-180' : ''
                              }`} 
                            />
                          </div>
                        </button>

                        {/* Notification Content (Accordion) */}
                        {expandedNotifications.includes(index) && (
                          <div className='px-4 pb-4 border-t border-gray-100'>
                            <p className='text-sm text-[#504D4D] font-Poppins leading-relaxed mt-3'>
                              {notification.message}
                            </p>
                            {/* {notification.ticket_number && (
                              <div className='mt-3 p-3 bg-[#FCDFD4] rounded-md'>
                                <p className='text-sm font-medium text-[#F25E26]'>
                                  Ticket Number: <span className='font-bold'>{notification.ticket_number}</span>
                                </p>
                                <p className='text-xs text-[#504D4D] mt-1'>
                                  Kindly go to &apos;auction wins&apos; on your profile to redeem your prize.
                                </p>
                              </div>
                            )} */}
                           {/*  {notification.url && (
                              <button
                                onClick={() => handleNotificationClick(notification)}
                                className='mt-3 w-full px-4 py-2 bg-[#F25E26] text-white rounded-md hover:bg-[#E54D26] transition-colors duration-200 text-sm font-medium'
                              >
                                View Details
                              </button>
                            )} */}
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {/* Load More Button */}
                    {hasMore && (
                      <div className='text-center pt-4'>
                        <button
                          onClick={loadMoreNotifications}
                          disabled={isLoadingMore}
                          className='px-6 py-2 text-[#F25E26] border border-[#F25E26] rounded-md hover:bg-[#F25E26] hover:text-white transition-colors duration-200 disabled:opacity-50'
                        >
                          {isLoadingMore ? 'Loading...' : 'Load More'}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className='text-center py-12'>
                    <BiBell className='text-4xl text-gray-300 mx-auto mb-3' />
                    <p className='text-gray-500 font-Poppins'>No notifications yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Search;