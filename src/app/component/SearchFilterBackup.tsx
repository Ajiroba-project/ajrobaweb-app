import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { AllCategories, MobileSideMenu } from "./AllCategories";
import { CatMobileSideMenu } from "./SideMenu";
import { FaStar } from "react-icons/fa6";
import { it } from "node:test";
import { useQueryData } from "@/hooks/useQueryData";


interface SelectedItem {
  id: number;
}

interface SelectedRating {
  id: number
  rating: any
}

export const BrandFilter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const items = [
    { id: 1, name: 'LG' },
    { id: 2, name: 'Hisense' },
    { id: 3, name: 'Sony' },
    { id: 4, name: 'Samsung' },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
  };



  const handleCheckboxChange = (item: SelectedItem) => {
    const selectedIndex = selectedItems.indexOf(item.id);
    let newSelectedItems = [...selectedItems];

    if (selectedIndex === -1) {
      newSelectedItems.push(item.id);
    } else {
      newSelectedItems.splice(selectedIndex, 1);
    }

    setSelectedItems(newSelectedItems);

    const selectedBrandIds = newSelectedItems.join(',');
    const params = new URLSearchParams(searchParams);
    if (selectedBrandIds) {
      params.set('selectedBrands', selectedBrandIds);
    } else {
      params.delete('selectedBrands', selectedBrandIds);
    }
    replace(`${pathname}?${params.toString()}`);
  };


  return (
    <div>
      <p className="mb-2 text-[#2A2A2A]" >Brand</p>
      <input
        type="search"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search"
        className=" w-auto p-2 mb-2"
      />
      <ul>
        {items
          .filter(item => {
            return item.name.toLowerCase().includes(searchTerm.toLowerCase());
          })
          .map(item => (
            <li key={item.id}>
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => handleCheckboxChange(item)}
              />
              <span className="ml-2">{item.name}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};


export const RatingFilter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();



  const generateStars = (rating: number): JSX.Element[] => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<FaStar key={i} className='text-[#F25E26]' />);
    }
    return stars;
  };



  const items = [
    { id: 5, name: generateStars(5), rating: 5, tag: 'five_star' },
    { id: 4, name: generateStars(4), rating: 4, tag: 'four_star' },
    { id: 3, name: generateStars(3), rating: 3, tag: 'three_star' },
    { id: 2, name: generateStars(2), rating: 2, tag: 'two_star' },
    { id: 1, name: generateStars(1), rating: 1, tag: 'one_star' },
  ];



  const handleCheckboxChange = (item: SelectedRating) => {
    const selectedIndex = selectedRatings.indexOf(item.rating);
    let newSelectedRatings = [...selectedRatings];

    if (selectedIndex === -1) {
      newSelectedRatings.push(item.rating);
    } else {
      newSelectedRatings.splice(selectedIndex, 1);
    }

    setSelectedRatings(newSelectedRatings);

    const selectedRatingIds = newSelectedRatings.join(',');
    const params = new URLSearchParams(searchParams);
    if (selectedRatingIds) {
      const lastItem = newSelectedRatings[newSelectedRatings.length - 1];
      params.set('selectedRatings', lastItem.toString());
    } else {
      const lastItem = newSelectedRatings[newSelectedRatings.length - 1];
      params.delete('selectedRatings', lastItem.toString());
    }
    replace(`${pathname}?${params.toString()}`);
  };


  return (
    <div>
      <p className="p-2 mb-2 text-[#2A2A2A] mt-4">Rating</p>
      <ul>

        {items.map(item => (
          <li key={item.id} className="flex mb-4">
            <input
              type="radio"
              name="rating"
              id={item.tag}
              value={item.tag}
              checked={selectedRatings.includes(item.id)}
              onChange={() => handleCheckboxChange(item)}
            />
            <span className="ml-2 flex">{item.name}</span>
          </li>
        ))}

      </ul>
    </div>
  );
};


export const PriceFilter = () => {

  const [selectedPrice, setSelectedPrice] = useState('');

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [minvalue, setMinvalue] = useState('');
  const [maxvalue, setMaxvalue] = useState('');




  const handlePriceSelection = (price: string) => {
    setSelectedPrice(price);

    const params = new URLSearchParams(searchParams);
    if (price) {
      params.set('greaterthan', price);
    } else {
      params.delete('greaterthan');
    }
    replace(`${pathname}?${params.toString()}`);
  }


  const handleminandmax = (min: string, max: string) => {
    setMinvalue('')
    setMaxvalue('')
    const params = new URLSearchParams(searchParams);
    if (min && max) {
      params.set('min', min);
      params.set('max', max);
    } else {
      params.delete('min');
      params.delete('max');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="py-6 ">
      <p>Price</p>

      <div>


        <input
          type="radio"
          name="price1"
          value="<2000"
          id="under2000"
          className="mr-3"
          onChange={() => handlePriceSelection('<5000')}
        />
        <label htmlFor="under5000">under 5000</label>

      </div>



      <div>
        <input
          type="radio"
          name="price1"
          value="₦5000-Above"
          id="₦5000-Above"
          className="mr-3"
          onChange={() => handlePriceSelection('>5000')}
        />
        <label htmlFor="₦5000-Above">₦5000 - Above</label>
      </div>


      <div className="gap-2">
        <p className="py-5">Custom Price Range</p>
        <div >
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-3 flex-wrap">
            <input value={minvalue} onChange={(e) => setMinvalue(e.target.value)} type="text" name="minvalue" placeholder="min" className="w-14 p-2" />
            <input value={maxvalue} type="text" name="maxvalue" placeholder="max" className="w-14 p-2" onChange={(e) => setMaxvalue(e.target.value)} />
            <input onClick={() => handleminandmax(minvalue, maxvalue)}
              type="button"
              value="Apply"
              className=" rounded border-2 border-[#F25E26] text-[#F25E26] p-3"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

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
    console.log(subCategory, 'subcategory', id, 'idddd')

    const params = new URLSearchParams(searchParams);
    if (subCategory) {
      params.set('sub', subCategory);
      params.set('subid', id);
    } else {
      params.delete('sub');
      params.delete('subid');
    }
    replace(`${pathname}?${params.toString()}`);

  }


  return (
    <div className="mb-8">

      <div className="flex cursor-pointer items-center gap-3 ">
        <FiMenu />
        <p onClick={() => setIsOpen(!isOpen)}>All Category</p>
      </div>

      {
        isOpen &&

        <div className='hidden bg-[#FFFFFF] lg:block  '>
          <div className="" >
            <AllCategories />
          </div>

        </div>
      }

      {isOpen && (
        <div className='  z-50 h-full w-full'>
          <CatMobileSideMenu />

        </div>
      )}

      <div className="pl-3">
        {currentCategory && (
          <div key={currentCategory.category}>
            <p
              onClick={() => setSelectedCategory(currentCategory.category)}
              className={`${selectedCategory === currentCategory.category ? "font-bold" : ""}`}
            >
              {currentCategory.category}
            </p>

            <ul>
              {currentCategory?.subcategories?.map((subCategory: any) => (
                <li
                  key={subCategory?.subcategory}
                  className={`${sub === subCategory?.subcategory ? "text-[#F25E26]" : ""}`}

                  onClick={() => handlesubcat(subCategory?.subcategory, subCategory?.id)}
                >
                  {subCategory?.subcategory}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <PriceFilter />

      <BrandFilter />

      <RatingFilter />


    </div>
  );
};



