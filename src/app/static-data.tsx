import { MdOutlineFacebook } from "react-icons/md";
import { FaXTwitter, FaInstagram, FaYoutube, FaLinkedin   } from "react-icons/fa6";

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
