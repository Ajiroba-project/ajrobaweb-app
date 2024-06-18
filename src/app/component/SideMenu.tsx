'use client'
import { useState, Fragment } from 'react'
import { categories } from '../static-data'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { FiMenu } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'
import Link from 'next/link'
import { Poppins, Inter } from 'next/font/google'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useQueryData } from '@/hooks/useQueryData'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '900']
})
const inter = Inter({ subsets: ['latin'], weight: ['500', '700', '900'] })

type MenuState = number | null

interface Subcategory {
  subcategory: string;
  name?: string;
  category?: string;
}

interface Category {
  category: string;
  subcategories: Subcategory[];
}

interface CategoryResponse {
  data: Category[];
}

export const SideMenu = () => {
  const [active, setActive] = useState<MenuState>(null)
  const [subcategory, SetSubcategory] = useState<string | null>(null)

  const router = useRouter()

  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const handlesubcat = (subCategory?: string, val?: { name?: string, category?: string }) => {

    // console.log(subCategory, 'subCategory', val, 'val')

    // console.log(val && val.category)

    setActive(null)

    const params = new URLSearchParams(searchParams)
    if (subCategory) {
      params.set('sub', subCategory)
    } else {
      params.delete('sub')
    }

    replace(`/categories/${val && val.category}?${params.toString()}`)
  }


  const { data: catInfo, isLoading: catnLoading } = useQueryData<CategoryResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/commerce/categories_and_subcategories/`, "get categories_and_subcategories", true);

  // GET https://ajiroba.onrender.com/v1/commerce/categories_and_subcategories/

  // console.log(catInfo?.data, 'cat_datatat')

  return (
    <>
      <section className='pl-[4rem] '>
        <ul className='relative py-6'>
          {catInfo?.data?.map((val, index) => (
            <Fragment key={index}>
              <div className='relative'>
                {/* main menu */}
                <li
                  className={`${poppins.className} ${active === index ? 'text-[#F25E26]' : ''}  flex  cursor-pointer items-center gap-2 py-2 hover:text-[#F25E26] ${val.category === 'fashion' ? 'hidden' : 'block'} relative`}
                  onClick={() => {
                    setActive(active === index ? null : index)
                  }}
                  //   onMouseOver={() => setActive(active === index ? null : index)}
                  onMouseEnter={() => setActive(index)}
                // onMouseLeave={()=>setActive(null)}
                >
                  <span className='flex items-center gap-2'>
                    {/* menuName + cadet */}
                    <p className='text-xl font-normal capitalize' onClick={() => router.push(`/categories/${val.category}`)}  >{val.category}</p>{' '}
                    {active === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </span>
                </li>
              </div>

              {active === index && (
                <div
                  className={`${inter.className} z-20 bg-white ${active === 1 ? 'left-[10rem] -mt-[30px]  w-48 gap-2 px-3' : 'left-[8rem] -mt-[30px] w-48 rounded-md'} absolute rounded text-sm shadow-md transition delay-300 duration-300 ease-in-out`}
                >
                  {val.subcategories?.map(subcategory => (
                    <div
                      onClick={() => handlesubcat(subcategory.subcategory, val)}
                      key={subcategory.subcategory}
                      className={` ${active === 1 ? 'py-2 hover:bg-[#FCDFD4] ' : 'hover:bg-[#FCDFD4]'} relative z-20   cursor-pointer px-2`}
                    >
                      <p
                        className={` ${active === 1 ? 'w-max text-base font-bold ' : ' p-2 text-base font-medium '}`}
                      >
                        {subcategory.subcategory}
                      </p>

                      <span
                        className={`${active === 1 ? 'absolute -right-2.5 -top-0.5 h-full w-0.5 rounded border-2 border-gray-200' : 'hidden'}${subcategory && subcategory.name === 'Accessories' ? ' border-hidden' : ''}`}
                      ></span>

                      {/*   {'subcategory' in subcategory && (
                        <ul className='z-50 '>
                          {subcategory.subcategories?.map(subSubcategory => (
                            <div
                              onClick={() =>
                                handlesubcat(subSubcategory.subcategory, val)
                              }
                              key={subSubcategory.subcategory}
                              className='p-2 hover:bg-[#FCDFD4]'
                            >
                              <p className='text-base font-medium'>
                                {subSubcategory.subcategory}{' '}
                              </p>
                            </div>
                          ))}
                        </ul>
                      )} */}
                    </div>
                  ))}
                </div>
              )}
            </Fragment>
          ))}
        </ul>
      </section>
    </>
  )
}

export const MobileSideMenu = () => {
  const [active, setActive] = useState<MenuState>(null)

  const { data: catInfo, isLoading: catnLoading } = useQueryData<CategoryResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/commerce/categories_and_subcategories/`, "get categories_and_subcategories", true);

  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const handlesubcat = (subCategory: string, val?: { name?: string, category?: string }) => {
    setActive(null)

    const params = new URLSearchParams(searchParams)
    if (subCategory) {
      params.set('sub', subCategory)
    } else {
      params.delete('sub')
    }

    replace(`/categories/${val && val.category}?${params.toString()}`)
  }


  const router = useRouter()


  return (
    <>
      <section className='bg-[#F6F6F6] p-6'>
        <ul className='relative '>
          {catInfo?.data?.map((val, index) => (
            <Fragment key={index}>
              <div className='relative bg-[#F6F6F6] p-2'>
                <li
                  className={`${poppins.className} ${active === index ? '' : ''}  flex  cursor-pointer items-center gap-1.5 py-2 hover:text-[#F25E26] `}
                  onClick={() => {
                    setActive(active === index ? null : index)
                  }}
                >
                  <span className='flex items-center gap-2 '>
                    <p onClick={() => router.push(`/categories/${val.category}`)} className={``}>{val.category}</p>
                    {active === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </span>
                </li>

                {active === index && (
                  <div
                    className={`${inter.className} z-20 px-4  ${active === 1 ? ' -top-0 gap-2 ' : ''} rounded text-sm `}
                  >
                    {val.subcategories?.map((subcategory) => (
                      <div key={subcategory.subcategory} className={` ${active === 1 ? "" : "hover:bg-[#FCDFD4]"} my-4 cursor-pointer p-2 z-20`}>
                        <Link href={"#"} className={`${active === 1 ? "font-bold" : ""} `}>{subcategory.subcategory}</Link>

                        {/*  {('subcategory' in subcategory) && (
                                                        <ul className="z-50 ">
                                                            {subcategory.subcategory?.map((subSubcategory) => (
                                                                <div key={subSubcategory.name} className="hover:bg-[#FCDFD4] py-2">
                                                                    <Link href={subSubcategory.path || ''} className="py-2">{subSubcategory.name}</Link>
                                                                </div>
                                                            ))}
                                                        </ul>
                                                    )} */}
                      </div>
                    ))}

                    {/*  {val.subcategories?.map(subcategory => (
                      <div
                        onClick={() => handlesubcat(subcategory.subcategory, val)}
                        key={subcategory.subcategory}
                        className={` ${active === 1 ? '' : 'hover:bg-[#FCDFD4]'} z-20 my-4 cursor-pointer p-2`}
                      >
                        {subcategory.subcategory}

                          {'subcategory' in subcategory && (
                          <ul className='z-50 '>
                            {subcategory.subcategory?.map(subSubcategory => (
                              <div
                                onClick={() =>
                                  handlesubcat(subSubcategory.name, val)
                                }
                                key={subSubcategory.name}
                                className='py-2 hover:bg-[#FCDFD4]'
                              >
                                {subSubcategory.name}
                              </div>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))} */}
                  </div>
                )}
              </div>
            </Fragment>
          ))}
        </ul>
      </section>
    </>
  )
}

export const CatMobileSideMenu = () => {
  const [active, setActive] = useState<MenuState>(null)

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const sub = searchParams.get('sub')

  const router = useRouter()

  const { data: catInfo, isLoading: catnLoading } = useQueryData<CategoryResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/commerce/categories_and_subcategories/`, "get categories_and_subcategories", true);

  // const handleSubClick = (subCategoryName: string) => {
  //     setActive(null);
  // };

  const handlesubcat = (subCategory: string, val?: { name?: string, category?: string }) => {
    setActive(null)

    const params = new URLSearchParams(searchParams)
    if (subCategory) {
      params.set('sub', subCategory)
    } else {
      params.delete('sub')
    }
    replace(`/categories/${val && val.category}?${params.toString()}`)
  }

  return (
    <>
      <section className='bg-[#F6F6F6] px-6 py-2'>
        <ul className='relative '>
          {catInfo?.data.map((val, index) => (
            <Fragment key={index}>
              <div className='relative bg-[#F6F6F6] '>
                <li
                  className={`${poppins.className} ${active === index ? '' : ''}  flex  cursor-pointer items-center gap-1.5 py-2 hover:text-[#F25E26] `}
                  onClick={() => {
                    setActive(active === index ? null : index)
                  }}
                >
                  <span className='flex items-center gap-2 '>
                    <p onClick={() => router.push(`/categories/${val.category}`)} className={``}>{val.category}</p>
                    {active === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </span>
                </li>

                {active === index && (
                  <div
                    className={`${inter.className} z-20 px-4  ${active === 1 ? ' -top-0 gap-2 ' : ''} rounded text-sm `}
                  >
                    {val.subcategories?.map(subcategory => (
                      <div
                        key={subcategory.subcategory}
                        className={` ${active === 1 ? '' : 'hover:bg-[#FCDFD4]'} z-20 my-4 cursor-pointer p-2`}
                      >
                        <p
                          className={`${active === 1 ? 'font-bold' : ''} `}
                          onClick={() => handlesubcat(subcategory.subcategory, val)}
                        >
                          {subcategory.subcategory}
                        </p>

                        {/*    {'subcategory' in subcategory && (
                          <ul className='z-50 '>
                            {subcategory.subcategory?.map(subSubcategory => (
                              <div
                                onClick={() =>
                                  handlesubcat(subSubcategory.name, val)
                                }
                                key={subSubcategory.name}
                                className='py-2 hover:bg-[#FCDFD4]'
                              >
                                {subSubcategory.name}
                              </div>
                            ))}
                          </ul>
                        )} */}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Fragment>
          ))}
        </ul>
      </section>
    </>
  )
}
