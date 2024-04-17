import { MdOutlineFacebook } from "react-icons/md";
import { FaXTwitter, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa6";
import imgCarousel1 from "@/app/asset/image/carousel.png"
import product1 from "@/app/asset/image/product1.png"
import product2 from "@/app/asset/image/product2.png"
import product3 from "@/app/asset/image/product3.png"
import product4 from "@/app/asset/image/product4.png"
import product5 from "@/app/asset/image/product5.png"
import product6 from "@/app/asset/image/product6.png"
import product7 from "@/app/asset/image/product7.png"
import product8 from "@/app/asset/image/product8.png"
import Social from "@/app/asset/socials/Social.svg"
import Social1 from "@/app/asset/socials/Social-1.svg"
import Social2 from "@/app/asset/socials/Social-2.svg"
import Social3 from "@/app/asset/socials/Social-3.svg"
import Social4 from "@/app/asset/socials/Social-4.svg"
import { IoLocationOutline } from 'react-icons/io5'
import { FiPhoneCall } from "react-icons/fi";
import { LuMail } from "react-icons/lu";


export const headerMenu = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Auction Deals',
    path: 'auction-deals'
  },

  {
    name: 'Categories',
    path: 'Categories'
  },
  {
    name: 'Recharge',
    path: 'recharge'
  },
  {
    name: 'Account',
    path: '/',
    submenu: []
  },
  {
    name: 'Help',
    path: '/',
    submenu: []
  }
]

export const categoriesMenu = [
  {
    name: 'FoodStuff',
    path: '/',
    categories: [{
      name: 'Fruits',
      path: 'Category/Fruits'
    },{
      name: 'Vegetable',
      path: 'Category/vegetable'
    },
  {
      name: 'Tubers',
      path: 'Category/tubers'
    },
  {
      name: 'Cereal',
      path: '/'
    },
  {
      name: 'Legumes',
      path: '/'
    },
  {
      name: 'Diary',
      path: '/'
    },
    {
      name: 'Meat',
      path: '/'
    },]
  },
  {
    name: 'Fashion and Beauty',
    path: 'Categories/FB',
    categories: [{
      name: 'Home',
      path: '/'
    }]
  },
  {
    name: 'Electronics',
    path: 'Categories/Electronics',
    categories: [{
      name: 'Television',
      path: '/'
    },
  {
      name: 'Smart Tv`s',
      path: '/'
    },
  {
      name: 'Sound Bars ',
      path: '/'
    },
   {
      name: 'Video ',
      path: '/'
    },
  {
      name: 'Projectors',
      path: '/'
    }, 
  {
      name: 'Digital Camera',
      path: '/'
    },
   {
      name: 'Camcoder',
      path: '/'
    },
   {
      name: 'Generators ',
      path: '/'
    },
   {
      name: 'Inverters ',
      path: '/'
    }, ]
  },
  {
    name: 'Phones',
    path: 'Categories/Phones',
    categories: [{
      name: 'Smart Phones',
      path: '/'
    },
  {
      name: 'Basic Phones',
      path: '/'
    },
  {
      name: 'Refubished',
      path: '/'
    },
      {
      name: 'Ipad',
      path: '/'
    },
      {
      name: 'Andriod Tablets',
      path: '/'
    },
      {
      name: 'Educational Tablets',
      path: '/'
    },
      {
      name: 'Tablets Accessory',
      path: '/'
    },
      {
      name: 'Earphones',
      path: '/'
    },
     {
      name: 'Chargers',
      path: '/'
    },
  ]
  },
  {
    name: 'Computing',
    path: 'Categories/Computing',
    categories: [{
      name: 'Desktop',
      path: '/'
    },
    {
      name: 'Laptop',
      path: '/'
    },
    {
      name: 'USB',
      path: '/'
    },
    {
      name: 'Hard Drives',
      path: '/'
    },
    {
      name: 'Printers',
      path: '/'
    },
    {
      name: 'Mouse',
      path: '/'
    },
    {
      name: 'Batteries',
      path: '/'
    },
    {
      name: 'Scanner',
      path: '/'
    },
    {
      name: 'Chargers',
      path: '/'
    },
  
  ]
  },
  {
    name: 'Mother and Child ',
    path: 'Categories/Mc',
    categories: [{
      name: 'Toys',
      path: '/'
    },{
      name: 'Bibs',
      path: '/'
    },
    {
      name: 'Diapers',
      path: '/'
    },
    {
      name: 'Bathing Tub',
      path: '/'
    },
    {
      name: 'Bathing Safety',
      path: '/'
    },
    {
      name: 'Towels',
      path: '/'
    },
    {
      name: 'Walkers',
      path: '/'
    },
    {
      name: 'Swings',
      path: '/'
    },
    {
      name: 'Jumpers',
      path: '/'
    },
  ]
  },
  {
    name: 'Royalty',
    path: 'Categories/Royalty',
    categories: [{
      name: 'Home',
      path: '/'
    }]
  }

]

export const socialIcon = [
  {
    name: "Facebook",
    icon: Social,
    link: "#"
  },
  {
    name: "x",
    icon: Social1,
    link: "#"
  },
  {
    name: "Instagram",
    icon: Social2,
    link: "#"
  },
  {
    name: "Youtube",
    icon: Social3,
    link: "#"
  },
  {
    name: "LinkedIn",
    icon: Social4,
    link: "#"
  },
]

export const quickLinks = [{
  name: "Home",
  links: "",
},
{
  name: "Auction Deals",
  links: "",
},
{
  name: "Category",
  links: "",
},
{
  name: "Ralfle Draw Process",
  links: "",
},
]

export const ourCompany = [{
  name: "Contact us",
  links: "",
},
{
  name: "About Us",
  links: "",
},
{
  name: "FAQ",
  links: "",
},

]
export const getInTouch = [{
  name: "1, Praisehill estate, Arepo, ogun State",
  links: "",
  icon: <IoLocationOutline />
},
{
  name: "(+234) 9169 881 005",
  links: "",
  icon: <FiPhoneCall />,
},
{
  name: "Support@goprus.com",
  links: "",
  icon: <LuMail/>
},

]

export const carouselImg = [
  {
    name: "",
    image: "",
  }
]


export const marqueeInfo = [
  'Follow us on all our social media platforms : www.ajiroba.com.',
  'Buy a ticket now and stand a chance to win ',
  'your preferred goods in our raffle draw.'
]



export const cardInfo = [{
  name: "human hair",
  image: product1,
  text: "",
  price: "",
  rating: "",
  time: "",
  percentge: ""
},
{
  name: "Rice",
  image: product2,
  text: "",
  price: "",
  rating: "",
  time: "",
  percentge: ""
},
{
  name: "Smart Watch",
  image: product3,
  text: "",
  price: "",
  rating: "",
  time: "",
  percentge: ""
},
{
  name: "Head Phone",
  image: product4,
  text: "",
  price: "",
  rating: "",
  time: "",
  percentge: ""
},
]

export const Product = [{
  name: "human hair",
  image: product1,
  text: "",
  price: "",
  rating: "",
  time: "",
  percentge: ""
},
{
  name: "Rice",
  image: product2,
  text: "",
  price: "",
  rating: "",
  time: "",
  percentge: ""
},
{
  name: "Smart Watch",
  image: product3,
  text: "",
  price: "",
  rating: "",
  time: "",
  percentge: ""
},
{
  name: "Head Phone",
  image: product4,
  text: "",
  price: "",
  rating: "",
  time: "",
  percentge: ""
},
{
  name: "Head Phone",
  image: product5,
  text: "",
  price: "",
  rating: "",
  time: "",
  percentge: ""
},
{
  name: "Head Phone",
  image: product6,
  text: "",
  price: "",
  rating: "",
  time: "",
  percentge: ""
},
{
  name: "Head Phone",
  image: product7,
  text: "",
  price: "",
  rating: "",
  time: "",
  percentge: ""
},
{
  name: "Head Phone",
  image: product8,
  text: "",
  price: "",
  rating: "",
  time: "",
  percentge: ""
},
]
