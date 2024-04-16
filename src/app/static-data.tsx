import { MdOutlineFacebook } from "react-icons/md";
import { FaXTwitter, FaInstagram, FaYoutube, FaLinkedin   } from "react-icons/fa6";
import imgCarousel1 from "@/app/asset/image/carousel.png"

export const headerMenu = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Aution Deals',
    path: '/'
  },

  {
    name: 'Categories',
    path: '/'
  },
  {
    name: 'Recharge',
    path: '/'
  },
  {
    name: 'Account',
    path: '/',
    submenu:[]
  },
  {
    name: 'Help',
    path: '/',
    submenu:[]
  }
]

export const categoriesMenu = [
  {
    name: 'FoodStuff',
    path: '/',
    categories: {
      name: 'Home',
      path: '/'
    }
  },
  {
    name: 'Fashion and Beauty',
    path: '/',
    categories: {
      name: 'Home',
      path: '/'
    }
  },
  {
    name: 'Electronics',
    path: '/',
    categories: {
      name: 'Home',
      path: '/'
    }
  },
  {
    name: 'Phones',
    path: '/',
    categories: {
      name: 'Home',
      path: '/'
    }
  },
  {
    name: 'Computing',
    path: '/',
    categories: {
      name: 'Home',
      path: '/'
    }
  },
  {
    name: 'Mother and Child ',
    path: '/',
    categories: {
      name: 'Home',
      path: '/'
    }
  },
  {
    name: 'Royalty',
    path: '/',
    categories: {
      name: 'Home',
      path: '/'
    }
  }

]

export const socialIcon =[
 {
  name:"Facebook",
  icon:<MdOutlineFacebook/>,
  link:"#"
},
  {
  name:"x",
  icon:<FaXTwitter/>, 
  link:"#"},
  {
  name:"Instagram",
  icon:<FaInstagram/>,
  link:"#"
},
  { 
  name:"Youtube",
  icon:<FaYoutube/>,  
  link:"#"},
  { name:"LinkedIn",
  icon:<FaLinkedin/>,
  link:"#"},
]

export const quickLinks=[{
  name:"Home",
  links:"",
},
{
  name:"Auction Deals",
  links:"",
},
{
  name:"Category",
  links:"",
},
{
  name:"Ralfle Draw Process",
  links:"",
},
]
export const ourCompany=[{
  name:"Contact us",
  links:"",
},
{
  name:"About Us",
  links:"",
},
{
  name:"FAQ",
  links:"",
},

]
export const getInTouch=[{
  name:"1, Praisehill estate, Arepo, ogun State",
  links:"",
  icon:""
},
{
  name:"(+234) 9169 881 005",
  links:"",
  icon:""
},
{
  name:"Support@goprus.com",
  links:"",
  icon:""
},

]

export const carouselImg =[
  {
    name:"",
    image:"",
  }
]


export const marqueeInfo = [
    'Follow us on all our social media platforms : www.ajiroba.com.',
    'Buy a ticket now and stand a chance to win ',
    'your preferred goods in our raffle draw.'
  ]



  export const cardInfo =[{
        name:"human hair",
        image:"",
        text:"",
        price:"",
        rating:"",
        time:"",
        percentge:""
  },
  {
        name:"Rice",
        image:"",
        text:"",
        price:"",
        rating:"",
        time:"",
        percentge:""
  },
  {
        name:"Smart Watch",
        image:"",
        text:"",
        price:"",
        rating:"",
        time:"",
        percentge:""
  },
    {
        name:"Head Phone",
        image:"",
        text:"",
        price:"",
        rating:"",
        time:"",
        percentge:""
  },
 ]
  