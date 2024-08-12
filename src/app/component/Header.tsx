 'use client';
import { useState, SetStateAction, Suspense, useEffect, useRef } from 'react';
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


// function Search() {
//   const searchParams = useSearchParams();
//   const [searchInput, setSearchInput] = useState('');

//   const handleSearchChange = (e: { target: { value: SetStateAction<string> } }) => {
//     setSearchInput(e.target.value);
//   };

//   const router = useRouter();
//   const pathname = usePathname();

//   const handleSearchSubmit = (e: { preventDefault: () => void }) => {
//     e.preventDefault();

//     const params = new URLSearchParams(searchParams);
//     if (searchInput) {
//       params.set('search', searchInput);
//     } else {
//       params.delete('search');
//     }
//     router.replace(`${pathname}?${params.toString()}`);
//   };

//   return (
//     <form className='relative mx-4 flex lg:mx-0' onSubmit={handleSearchSubmit}>
//       <input
//         type="text"
//         className=' bg-[#F5F5F5] p-2 '
//         value={searchInput}
//         onChange={handleSearchChange}
//         placeholder="Search products..."
//       />
//       <button type="submit">
//         <CiSearch className='absolute  right-3 top-2 cursor-pointer bg-[#F5F5F5] text-xl outline-[#F25E26]' />
//       </button>
//     </form>
//   );
// }

type MenuState = number | null

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
  const [searchResults, setSearchResults] = useState<string[]>([]);
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
      const results: string[] = [];

      catInfo?.data?.forEach((category) => {
        const categoryMatch = category.category.toLowerCase().includes(lowerCaseInput);
        if (categoryMatch) {
          results.push(category.category);
        }

       /*  category.subcategories.forEach((subcategory) => {
          if (typeof subcategory === 'string' && subcategory?.toLowerCase().includes(lowerCaseInput)) {
            results.push(subcategory);
          } else {
            console.warn('Unexpected subcategory data type:', subcategory);
          }
        }); */

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
          placeholder="Search products..."
          onClick={toggleDropdown}
        />
        <button type="button" onClick={toggleDropdown}>
          <CiSearch className='absolute right-3 top-2 cursor-pointer bg-[#F5F5F5] text-xl outline-[#F25E26]' />
        </button>
      </form>

      {isDropdownOpen && (
        <div className='absolute left-0 right-0 z-10 mt-2 bg-white shadow-lg rounded-md max-h-60 overflow-y-auto'>
          <form onSubmit={handleSearchSubmit} className="p-3">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={searchInput}
              onChange={handleSearchChange}
              placeholder="Search products..."
            />
          </form>

          {searchResults.length > 0 ? (
            <div>
              {searchResults.map((result, index) => (
                <Link key={index} href={`/${result}`}>
                  <div className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                    {result}
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



export const Header = () => {
  const pathname = usePathname();
  const isRootPath = pathname === '/';
  const [isOpen, setIsOpen] = useState<boolean | null>(null);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
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
    router.push('/signin');
  };

  const handleError = () => {
    console.log('Something went wrong...');
    clearAuthCookies();
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

  // Handle clicks outside the menu
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
  }, [menuRef]);

  return (
    <>
      <header className='mb-9'>
        <div className='bg-[#2A2A2A] p-3 text-sm text-white'>
          <div className='flex items-center justify-between gap-3 px-7'>
            <div className='w-full'>
              {/* Your marquee component */}
            </div>
            <div className='header-socials mr-3 hidden gap-3 lg:flex'>
              {/* Your social icons */}
            </div>
          </div>
        </div>
        <div className='relative bg-white p-2 shadow-md'>
          <div
            className={`${isOpen ? 'bg-opacity-4 fixed left-0 top-0 z-50 h-screen w-screen bg-[#000000d1] bg-opacity-[0.9] bg-clip-padding backdrop-blur-sm backdrop-filter' : 'h-auto w-auto bg-transparent '}`}
          >
            <div className='flex w-full items-center justify-between gap-0 md:justify-between lg:justify-around lg:gap-[1em]'>
              <div className='flex cursor-pointer items-center gap-2'>
                <Link href={'/'} className={`${isOpen ? 'hidden' : null}`}>
                  <Image src={Brand} alt='brand-logo' />
                </Link>

                <div
                  ref={menuRef} // Attach the ref to the menu container
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
                    {headerMenu.map((val, index) => (
                      <li
                        key={index}
                        className={` font-Poppins cursor-pointer px-4  ${val.name === headerNav ? 'text-[#F25E26]' : 'text-[#A09F9F]'} hover:text-[#504D4D]  ${!isOpen ? 'py-2 lg:py-1' : ''}`}
                        onClick={() => {
                          setActiveMenu(activeMenu === index ? null : index);
                          setHeaderNav(val.name);
                        }}
                      >
                        {val.submenu ? (
                          <div className='relative'>
                            <span className='flex items-center gap-2 '>
                              {val.name}
                              {activeMenu === index ? (
                                <IoIosArrowUp />
                              ) : (
                                <IoIosArrowDown />
                              )}
                            </span>
                            {activeMenu === index && (
                              <ul className='absolute left-0 z-10 mt-2 h-fit w-max rounded-md bg-white pb-2 shadow-md'>
                                {val.submenu.map((subItem, subIndex) => (
                                  <li
                                    key={subIndex}
                                    className={`  ${(subItem.name === 'Profile' && !isLoggedIn) || (subItem.name === 'Wallet' && !isLoggedIn) || (subItem.name === 'Community' && !isLoggedIn) || (subItem.name === 'Referral Code' && !isLoggedIn) || (subItem.name === 'Sign Out' && !isLoggedIn) ? 'hidden' : 'block'} ${(subItem.name === 'Sign Up' && isLoggedIn) || (subItem.name === 'Sign In' && isLoggedIn) ? 'hidden' : ''} p-2 px-4 text-sm font-medium font-Poppins  text-[#A09F9F] hover:bg-[#FCDFD4] hover:text-[#504D4D]`}
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
                              isRootPath ? val.path : `/${val.path}`
                            }
                            className='flex items-center gap-2'
                          >
                            {val.name}
                          </Link>
                        )}
                      </li>
                    ))}
                    <div className='relative mx-4 flex lg:mx-0'>
                      <Search />
                    </div>
                  </ul>
                </div>
              </div>

              <div className='flex gap-4'>
                <BiBell className='cursor-pointer text-xl text-[#A09F9F]' />
                <IoCartOutline
                  onClick={() => router.push('/cart')}
                  className='cursor-pointer text-xl text-[#A09F9F]'
                />
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
      </header>
    </>
  );
};
