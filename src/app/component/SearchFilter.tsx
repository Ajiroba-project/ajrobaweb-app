import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { AllCategories, MobileSideMenu } from "./AllCategories";
import { CatMobileSideMenu } from "./SideMenu";
import { FaStar } from "react-icons/fa6";
import { it } from "node:test";


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
      params.set('selectedRatings', selectedRatingIds);
    } else {
      params.delete('selectedRatings', selectedRatingIds);
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
      params.set('query', price);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }


  const handleminandmax = (min: string, max: string) => {
    setMinvalue('')
    setMaxvalue('')
    console.log(min, max)
    const params = new URLSearchParams(searchParams);
    if (min && max) {
      params.set('min_max', min + '&' + max);
    } else {
      params.delete('min_max');
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
          onChange={() => handlePriceSelection('<2000')}
        />
        <label htmlFor="under2000">under 2000</label>

      </div>

      <div>
        <input
          type="radio"
          name="price1"
          value="2000-5000"
          id="2000-5000"
          className="mr-3"
          onChange={() => handlePriceSelection('2000-5000')}

        />
        <label htmlFor="2000-5000">₦2000 - ₦5000</label>
      </div>

      <div>
        <input
          type="radio"
          name="price1"
          value="₦5000-Above"
          id="₦5000-Above"
          className="mr-3"
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


  const categories = [
    {
      name: "Foodstuff",
      subCategories: ["Fruits", "Vegetable", "Tubers", "Cereal", "Legumes", "Diary", "Meat", "Beans"],
    },
    {
      name: "Fashion And Beauty",
      subCategories: ["Men's Fashion", "Women Fashion", "Accessories"],
    },
    {
      name: "Fashion",
      subCategories: ["Bags", "Belts"],
    },
  ];

  const currentCategory = categories.find(
    (category) =>
      category.name.toLowerCase() ===
      decodedPaths[decodedPaths.length - 1].toLowerCase(),
  );


  const handlesubcat = (subCategory: string) => {

    const params = new URLSearchParams(searchParams);
    if (subCategory) {
      params.set('sub', subCategory);
    } else {
      params.delete('sub');
    }
    replace(`${pathname}?${params.toString()}`);

  }


  return (
    <div className="mb-8">

      <div className="flex cursor-pointer items-center gap-3 p-3">
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
        <div className='  z-30 h-full w-full'>
          <CatMobileSideMenu />
        </div>
      )}

      <div className="pl-3">
        {currentCategory && (
          <div key={currentCategory.name}>
            <p
              onClick={() => setSelectedCategory(currentCategory.name)}
              className={`${selectedCategory === currentCategory.name ? "font-bold" : ""}`}
            >
              {currentCategory.name}
            </p>

            <ul>
              {currentCategory.subCategories.map((subCategory) => (
                <li
                  key={subCategory}
                  className={`${sub === subCategory ? "text-[#F25E26]" : ""}`}

                  onClick={() => handlesubcat(subCategory)}
                >
                  {subCategory}
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



