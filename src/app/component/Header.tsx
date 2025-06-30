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

interface Subcategory {
  toLowerCase: any;
  id: string
  subcategory: any;
  name?: string;
  category?: string;
  data?: any
}

interface CategoryResponse {
  data: Category[];
}

interface Category {
  [x: string]: any
  category: string;
  subcategories: Subcategory[];
  data?: any
}

interface CategoryResponse {
  data: Category[];
}


function Search() {
  const [searchInput, setSearchInput] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<{ id: string; name: string }[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const pathname = usePathname();

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

  const { data: catInfo, isLoading: catnLoading } = useQueryData<CategoryResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/categories_and_subcategories/`,
    ["get categories_and_subcategories"],
    true
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearchInput(input);
    setIsDropdownOpen(true);

    if (input) {
      const lowerCaseInput = input.toLowerCase();
      const results: { id: string; name: string }[] = [];

      catInfo?.data?.forEach((category) => {
        const categoryMatch = category.category.toLowerCase().includes(lowerCaseInput);
        if (categoryMatch) {
          results.push({ id: category.id, name: category.category });
        }

        category.subcategories.forEach((subcategory) => {
          if (typeof subcategory === 'string') {
            const lowerCaseSubcategory = (subcategory as string).toLowerCase();
            if (lowerCaseSubcategory.includes(lowerCaseInput)) {
              results.push(subcategory);
            }
          } else {
            console.warn('Unexpected subcategory data type:', subcategory);
          }
        });
      });

      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };


  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchInput) {
      router.push(`${pathname}?search=${searchInput}`);
    }
    setIsDropdownOpen(false);
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div ref={dropdownRef} className='relative'>
      <form className='relative mx-4 flex lg:mx-0' onSubmit={handleSearchSubmit}>
        <input
          type="text"
          className='bg-[#F5F5F5] p-2'
          value={searchInput}
          onChange={handleSearchChange}
          onClick={toggleDropdown}
        />
        <button type="button" onClick={toggleDropdown}>
          <CiSearch className='absolute right-3 top-2 cursor-pointer bg-[#F5F5F5] text-xl outline-[#F25E26]' />
        </button>
      </form>

      {isDropdownOpen && (
        <div className=' xl:w-[407px] lg:w-[407px] 2xl:w-[407px] md:w-full w-full absolute left-0 right-0 z-10 mt-2 bg-white shadow-lg rounded-md max-h-60 overflow-y-auto'>
          <form onSubmit={handleSearchSubmit} className="p-1 relative bg-[#F5F5F5]">
            <input
              type="text"
              className="w-full text-sm p-2 border border-gray-300 bg-#F5F5F5 px-4 rounded-lg"
              value={searchInput}
              onChange={handleSearchChange}
              placeholder="Search products..."
            />
            <button type="button" onClick={toggleDropdown}>
              <CiSearch className='absolute right-4 top-4 cursor-pointer bg-[#F5F5F5] text-xl outline-[#F25E26]' />
            </button>
          </form>

          {searchResults.length > 0 ? (
            <div>
              {searchResults.map((result, index) => (
                <Link key={index} href={`/categories/${result.name}?cat_id=${result.id}`}>
                  <div className='block px-4 py-2 text-sm text-[#504D4D] font-Poppins font-normal hover:bg-gray-100'>
                    {result.name}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-sm text-gray-500">No results found</div>
          )}

        </div>
      )}
    </div>
  );
}

export default Search;



export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const pathname = usePathname();
  const isRootPath = pathname === '/';
  const [isOpen, setIsOpen] = useState<boolean | null>(null);
  const [cartCount, setcartCount] = useState<string | number | any>(0);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [hoveredMenu, setHoveredMenu] = useState<number | null>(null);
  const { isLoggedIn, clearAuthCookies } = useAuthStore(state => ({
    isLoggedIn: state.isLoggedIn,
    clearAuthCookies: state.clearAuthCookies,
  }));
  const { setHeaderNav, headerNav } = userNavStore(state => ({
    setHeaderNav: state.setHeaderNav,
    headerNav: state.headerNav,
  }));


  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null); // Reference for the menu

  const hamburgerfunc = () => {
    setIsOpen(!isOpen);
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartItemsn, setCartItemsn] = useState<any[]>([]);

  const tkn_: string = Cookies.get("token") as string;

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

  return (
    <>
      <section className='' >
        <div className='bg-[#2A2A2A] p-3 text-sm text-white'>
          <div className='flex items-center justify-between gap-3 px-7'>
            <div className='w-full'>
              <AuctionMarquee info={marqueeInfo} />
            </div>
            <div className='header-socials mr-3 hidden gap-3 lg:flex overflow-scroll '>
              {socialIcon.map((val, index) => (
                <div key={index} className='w-3.5 lg:w-4'>
                  <Image src={val.icon} alt={'socials'} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='relative bg-white p-2 shadow-md' >
          <div style={{
            margin: '0 auto',
            width: '100%',
            maxWidth: '100%',
            zIndex: 51
          }}
            className={`${isOpen ? 'bg-opacity-4 fixed left-0 top-0 z-50 h-screen w-screen bg-[#000000d1] bg-opacity-[0.9] bg-clip-padding backdrop-blur-sm backdrop-filter' : 'h-auto w-auto bg-transparent '}`}
          >
            <div className='flex w-full items-center justify-between gap-0 md:justify-between lg:justify-around lg:gap-[1em]'>
              <div className='flex cursor-pointer items-center gap-2'>
                <Link href={'/'} className={`${isOpen ? 'hidden' : null}`}>
                  <Image src={Brand} alt='brand-logo' />
                </Link>

                <div
                  ref={menuRef}
                  className={
                    !isOpen
                      ? `hidden items-center lg:flex`
                      : 'fixed right-0 top-0 z-50 h-screen items-center bg-white py-5 lg:relative lg:h-fit'
                  }
                >
                  <div className='Brand-logo my-8 flex w-max cursor-pointer items-center gap-2 lg:hidden'>
                    <Link href={'/'}>
                      <Image src={Brand} alt='brand-logo' />
                    </Link>
                    {isOpen ? (
                      <IoClose
                        onClick={hamburgerfunc}
                        className='text-xl lg:hidden'
                      />
                    ) : (
                      <FiMenu
                        onClick={hamburgerfunc}
                        className='text-xl lg:hidden'
                      />
                    )}
                  </div>

                  <ul
                    className={
                      !isOpen
                        ? `flex w-max flex-col items-baseline gap-3 lg:flex-row`
                        : 'w-full items-center gap-2 py-2 lg:flex'
                    }
                  >
                    {/*  {console.log(pathname, 'pppp')} */}
                    {headerMenu?.map((val, index) => {

                      return (
                        <li
                          key={index}
                          className={` font-Poppins cursor-pointer px-4 hover:text-[#F25E26]  ${pathname === val.path ? 'text-[#F25E26]' : 'text-[#A09F9F]'} hover:text-[#504D4D]  ${!isOpen ? 'py-2 lg:py-1' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenu(activeMenu === index ? null : index);
                            /*     setActiveMenu(null); // close submenu if needed
                                router.push(val.path.startsWith('/') ? val.path : `/${val.path}`); */
                          }}
                          onMouseEnter={() => {
                            setHoveredMenu(index);
                            setActiveMenu(null); // Clear active menu when hovering
                          }}
                          onMouseLeave={() => {
                            setHoveredMenu(null);
                          }}
                        >

                          {val.submenu ? (
                            <div className='relative'>
                              <span className='flex items-center gap-2 '>
                                {val.name}
                                {hoveredMenu === index ? (
                                  <IoIosArrowUp />
                                ) : (
                                  <IoIosArrowDown />
                                )}
                              </span>
                              {hoveredMenu === index && (
                                <ul
                                  className='absolute left-0 z-10 mt-0 h-fit w-max rounded-md bg-white pb-2 shadow-md'
                                  onMouseEnter={() => setHoveredMenu(index)}
                                  onMouseLeave={() => setHoveredMenu(null)}
                                >
                                  {val.submenu.map((subItem, subIndex) => (
                                    <li
                                      key={subIndex}
                                      className={`${(subItem.name === 'Profile' && !isLoggedIn) || (subItem.name === 'Wallet' && !isLoggedIn) || (subItem.name === 'Community' && !isLoggedIn) || (subItem.name === 'Referral Code' && !isLoggedIn) || (subItem.name === 'Sign Out' && !isLoggedIn) ? 'hidden' : 'block'} ${(subItem.name === 'Sign Up' && isLoggedIn) || (subItem.name === 'Sign In' && isLoggedIn) ? 'hidden' : ''} p-2 px-4 text-sm font-medium font-Poppins  text-[#2A2A2A] hover:bg-[#FCDFD4] hover:text-[#504D4D]`}
                                    >
                                      <div
                                        onClick={() =>
                                          subItem.name === 'Sign Out'
                                            ? SignoutFunc()
                                            : router.push(`${subItem.path}`)
                                        }
                                      >
                                        <span className='' > {subItem.name} </span>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ) : (
                            <Link
                              href={
                                isRootPath ? val.path : `${val.path}`
                              }
                              className='flex items-center gap-2'
                            >
                              {val.name}
                            </Link>
                          )}
                        </li>
                      )

                    }

                    )}
                    <div className='relative mx-4 flex lg:mx-0'>
                      <Search />
                    </div>
                  </ul>
                </div>
              </div>

              <div className='flex gap-4'>
                <BiBell className='cursor-pointer text-xl text-[#000000]' color='black' />

                <div className='relative cursor-pointer' onClick={() => router.push('/cart')}>
                  <IoCartOutline className='text-xl text-[#000000]' color='black' />


                  {cartCount > 0 && (
                    <span className='absolute -top-1 -right-2 bg-red-600 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center md:w-5 md:h-5 md:text-sm'>
                      {cartCount}
                    </span>
                  )}

                </div>

                {isOpen ? (
                  <IoClose
                    onClick={hamburgerfunc}
                    className='text-xl text-[#A09F9F] lg:hidden'
                  />
                ) : (
                  <FiMenu
                    onClick={hamburgerfunc}
                    className='text-xl text-[#A09F9F] lg:hidden'
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};


