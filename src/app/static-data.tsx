import product1 from '@/app/asset/image/product1.png'
import product2 from '@/app/asset/image/product2.png'
import product3 from '@/app/asset/image/product3.png'
import product4 from '@/app/asset/image/product4.png'
import product5 from '@/app/asset/image/product5.png'
import product6 from '@/app/asset/image/product6.png'
import product7 from '@/app/asset/image/product7.png'
import product8 from '@/app/asset/image/product8.png'
import fashionBeauty from '@/app/asset/image/fashionBeauty.png'
import fashion from '@/app/asset/image/fashion.png'
import computing from '@/app/asset/image/computing.png'
import phones from '@/app/asset/image/phones.png'
import mother from '@/app/asset/image/mother.png'
import royalty from '@/app/asset/image/royalty.png'
import phone from '@/app/asset/image/phone.png'
import fashions from '@/app/asset/image/fashions.png'
import foodstuff from '@/app/asset/image/foodstuff.png'
import mc from '@/app/asset/image/m&c.png'
import Social from '@/app/asset/socials/Social.svg'
import Social1 from '@/app/asset/socials/Social-1.svg'
import Social2 from '@/app/asset/socials/Social-2.svg'
import Social3 from '@/app/asset/socials/Social-3.svg'
import Social4 from '@/app/asset/socials/Social-4.svg'
import catPhone from '@/app/asset/image/phones.svg'
import catwc from '@/app/asset/image/wc.svg'
import catgroup from '@/app/asset/image/Group.svg'
import catfash from '@/app/asset/image/fash.svg'
import raf from '@/app/asset/image/raf.png'
import { IoLocationOutline } from 'react-icons/io5'
import { FiPhoneCall } from 'react-icons/fi'
import { LuMail } from 'react-icons/lu'

export const headerMenu = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Auction Deals',
    path: 'auction'
  },

  {
    name: 'Categories',
    path: 'categories'
  },
  {
    name: 'Recharge',
    path: 'recharge'
  },
  {
    name: 'Account',
    path: '/',
    submenu: [
      { name: 'Sign Up', path: '/signup' },
      { name: 'Sign In', path: '/signin' },
      { name: 'Profile', path: '/profile' },
      { name: 'Wallet', path: '#' },
      { name: 'Referral Code', path: '#' },
      { name: 'Community', path: '#' }
    ]
  },
  {
    name: 'Help',
    path: '/',
    submenu: [
      { name: 'FAQ', path: '/faq' },
      { name: 'About Us', path: '/aboutUs' },
      { name: 'Contact Us', path: '/contactUs' },
      { name: 'Live Chat', path: '/#' },
      { name: 'Privacy Policy', path: '/privacy-policy' }
    ]
  }
]

export const categories = [
  {
    name: 'Foodstuff',
    path: 'categories/FoodStuff',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed dosed do ',
    image: product2,
    image2: foodstuff,
    svg: catgroup,

    categories: [
      {
        name: 'Fruits',
        path: 'category/Fruits',
        price: ''
      },
      {
        name: 'Vegetable',
        path: 'category/vegetable'
      },
      {
        name: 'Tubers',
        path: 'category/tubers'
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
      }
    ]
  },
  {
    name: 'Fashion and Beauty',
    path: 'categories/fashion and Beauty',
    image: fashionBeauty,
    image2: fashions,
    svg: catfash,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed dosed do ',
    categories: [
      {
        name: `Men's Fashion`,
        subcategory: [
          { name: 'Snickers', path: '' },
          { name: 'Clothing', path: '' },
          { name: 'Underwear', path: '' },
          { name: 'T-shirt', path: '' },
          { name: 'Polo', path: '' },
          { name: 'knicker', path: '' },
          { name: 'Jewelry', path: '' },
          { name: 'Belt', path: '' }
        ]
      },
      {
        name: `Women's Fashion`,
        subcategory: [
          { name: 'Shoe', path: '' },
          { name: 'Clothing', path: '' },
          { name: 'Accessories', path: '' },
          { name: 'Hand Bag', path: '' },
          { name: 'Sleep Wear', path: '' },
          { name: 'Matanity', path: '' },
          { name: 'Dresses', path: '' },
          { name: 'Traditional', path: '' }
        ]
      },
      {
        name: `Accessories`,
        subcategory: [
          { name: 'Men Sunglasses', path: '' },
          { name: 'Men Watches', path: '' },
          { name: 'Women Sunglasses', path: '' },
          { name: 'Women Watches', path: '' }
        ]
      }
    ]
  },
  {
    name: 'fashion',
    path: 'categories/fashion',
    image: fashion,
    image2: fashions,
    svg: catfash,
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi '
  },
  {
    name: 'Electronics',
    path: 'categories/Electronics',
    image: product4,
    image2: phone,
    svg: catPhone,

    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ',
    categories: [
      {
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
      }
    ]
  },
  {
    name: 'Phones',
    path: 'categories/Phones',
    image: phones,
    image2: phone,
    svg: catPhone,
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi',
    categories: [
      {
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
      }
    ]
  },
  {
    name: 'Computing',
    path: 'categories/Computing',
    image: computing,
    image2: phone,
    svg: catPhone,
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ',

    categories: [
      {
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
      }
    ]
  },
  {
    name: 'Mother and Child',
    path: 'categories/Mother and Child',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ',
    image: mother,
    image2: mc,
    svg: catwc,
    categories: [
      {
        name: 'Toys',
        path: '/'
      },
      {
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
      }
    ]
  },
  {
    name: 'Royalty',
    path: 'categories/Royalty',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ',
    image: royalty,
    image2: mc,
    svg: catfash,
    categories: [
      {
        name: 'Bead',
        path: '/'
      },
      {
        name: 'Walking Stick',
        path: '/'
      },
      {
        name: 'Staff',
        path: '/'
      },
      {
        name: 'Capes',
        path: '/'
      },
      {
        name: 'Crown',
        path: '/'
      },
      {
        name: 'Hair Pin',
        path: '/'
      },
      {
        name: 'Fan',
        path: '/'
      },
      {
        name: 'Anklet',
        path: '/'
      },
      {
        name: 'Bracelet',
        path: '/'
      }
    ]
  }
]

export const socialIcon = [
  {
    name: 'Facebook',
    icon: Social,
    link: '#'
  },
  {
    name: 'x',
    icon: Social1,
    link: '#'
  },
  {
    name: 'Instagram',
    icon: Social2,
    link: '#'
  },
  {
    name: 'Youtube',
    icon: Social3,
    link: '#'
  },
  {
    name: 'LinkedIn',
    icon: Social4,
    link: '#'
  }
]

export const quickLinks = [
  {
    name: 'Home',
    links: '/'
  },
  {
    name: 'Auction Deals',
    links: '/auction'
  },
  {
    name: 'Category',
    links: '/categories'
  },
  {
    name: 'Ralfle Draw Process',
    links: '/raffle'
  }
]

export const ourCompany = [
  {
    name: 'Contact us',
    links: '/contactUs'
  },
  {
    name: 'About Us',
    links: '/aboutUs'
  },
  {
    name: 'FAQ',
    links: '/faq'
  }
]
export const getInTouch = [
  {
    name: '1, Praisehill estate, Arepo, ogun State',
    links: '',
    icon: <IoLocationOutline />
  },
  {
    name: '(+234) 9169 881 005',
    links: '',
    icon: <FiPhoneCall />
  },
  {
    name: 'Support@goprus.com',
    links: '',
    icon: <LuMail />
  }
]

export const marqueeInfo = [
  'Follow us on all our social media platforms : www.ajiroba.com.',
  'Buy a ticket now and stand a chance to win ',
  'your preferred goods in our raffle draw.'
]

export const Products = [
  {
    name: 'human hair',
    image: product1,
    description: '',
    price: '100,000',
    previousPrice: '400,000',
    rating: '',
    time: '',
    category: 'Fashion',
    subCategory: 'Women',
    tag: ['open']
  },
  {
    name: 'Rice',
    image: product2,
    description: '',
    price: '1000',
    previousPrice: '20,000',
    time: '',
    rating: '',
    category: 'FoodStuff',
    subCategory: 'Food',
    tag: ['open']
  },
  {
    name: 'Orange',
    image: product2,
    description: '',
    price: '1000',
    previousPrice: '20,000',
    time: '',
    rating: '',
    category: 'FoodStuff',
    subCategory: 'Fruits',
    tag: ['close']
  },
  {
    name: 'Smart Watch',
    image: product3,
    description: '',
    price: '10,000',
    previousPrice: '400,000',
    rating: '',
    time: '',
    category: 'Fashion And Beauty',
    subCategory: 'Smart',
    tag: ['open']
  },
  {
    name: 'Head Phone',
    image: product4,
    description: '',
    price: '20,000',
    previousPrice: '40,000',
    time: '',
    rating: '',
    category: 'Phones',
    subCategory: 'Smart',
    tag: ['close', 'redeem items', 'winning advise']
  },
  {
    name: 'Washing Machine',
    image: product5,
    description: '',
    price: '200,000',
    previousPrice: '500,000',
    rating: '',
    time: '',
    category: 'Electronic',
    subCategory: 'Smart',
    tag: ['close', 'redeem items', 'winning advise']
  },
  {
    name: 'Iphone XR',
    image: product6,
    description: '',
    price: '120,000',
    previousPrice: '700,000',
    time: '',
    rating: '',
    category: 'Phones',
    subCategory: 'Smart',
    tag: ['close', 'redeem items', 'winning advise']
  },
  {
    name: 'beads',
    image: product7,
    description: '',
    price: '2000',
    previousPrice: '5000',
    rating: '',
    time: '',
    category: 'Fashion And Beauty',
    subCategory: 'Accessories',
    tag: ['delivered', 'close']
  },
  {
    name: 'Bead',
    image: product8,
    description: '',
    price: '120,000',
    previousPrice: '400,000',
    time: '',
    rating: '',
    category: 'Phones',
    subCategory: 'Smart',
    tag: ['close', 'redeem items', 'winning advise']
  },
  {
    name: 'human hair',
    image: product1,
    description: '',
    price: '200,000',
    previousPrice: '600,000',
    rating: '',
    time: '',
    category: 'Fashion',
    tag: ['open']
  },
  {
    name: 'Oloyin Beans',
    image: product2,
    description: '',
    price: '5000',
    previousPrice: '7000',
    time: '',
    rating: '',
    category: 'FoodStuff'
  },
  {
    name: 'Smart Watch',
    image: product3,
    description: '',
    price: '2500',
    previousPrice: '5000',
    rating: '',
    time: '',
    category: 'Phones'
  },
  {
    name: 'Head Phone',
    image: product4,
    description: '',
    price: '1500',
    previousPrice: '4000',
    time: '',
    rating: '',
    category: 'Phone'
  }
]

export const RelatedData = [
  {
    name: 'human hair',
    image: product1,
    description: '',
    price: '100,000',
    previousPrice: '400,000',
    rating: '',
    time: '',
    category: 'Fashion',
    subCategory: 'Women'
  },
  {
    name: 'Rice',
    image: product2,
    description: '',
    price: '1000',
    previousPrice: '20,000',
    time: '',
    rating: '',
    category: 'FoodStuff',
    subCategory: 'Food'
  },
  {
    name: 'Orange',
    image: product2,
    description: '',
    price: '1000',
    previousPrice: '20,000',
    time: '',
    rating: '',
    category: 'FoodStuff',
    subCategory: 'Fruits'
  }
]

export const faq = [
  {
    question: 'How does raffle draw work on your platform?',
    answer:
      ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque dolores, ex, labore dignissimos laudantium vero similique vitae architecto numquam magni a blanditiis quod accusantium temporibus modi magnam quo, eum officiis?'
  },
  {
    question: 'Are the raffle draw conducted fairly?',
    answer: ''
  },
  {
    question: 'What kind of price can I expect to win?',
    answer: ''
  },
  {
    question: 'How do I know if I have won?',
    answer: ''
  },
  {
    question: 'Is there a limit to the number of ticket i can buy?',
    answer: ''
  },
  {
    question:
      'What measure do you take to protect user privacy and data security?',
    answer: ''
  },
  {
    question:
      'Can I participate in the raffle draw from anywhere in the world?',
    answer: ''
  },
  {
    question:
      'How can I contact customer support if I have further questions or concerns?',
    answer: ''
  }
]

import { FaSquarePhone } from 'react-icons/fa6'
import { CgData } from 'react-icons/cg'
import { PiTelevisionSimple } from 'react-icons/pi'
import { RiLightbulbFlashFill } from 'react-icons/ri'
import { RxDashboard } from 'react-icons/rx'
export const UserMenu = [
  {
    name: 'Dashboard',
    icon: <RxDashboard />
  },
  {
    name: 'Airtime',
    icon: <FaSquarePhone />
  },
  {
    name: 'Data',
    icon: <CgData />
  },
  {
    name: 'Cable Subscription',
    icon: <PiTelevisionSimple />
  },
  {
    name: 'Electricity',
    icon: <RiLightbulbFlashFill />
  }
]
import { RxFileText } from 'react-icons/rx'
import { IoReceiptOutline } from 'react-icons/io5'
import { BsCreditCard2Back } from 'react-icons/bs'

export const stepperList = [
  {
    name: 'Enter Details',
    icons: <RxFileText />
  },
  {
    name: 'Payment',
    icons: <BsCreditCard2Back />
  },
  {
    name: 'Receipts',
    icons: <IoReceiptOutline />
  }
]

export const transactions = [
  {
    logo: '',
    title: 'You just Bought ₦200 MTN Airtime',
    amount: '200',
    time: '3:15',
    status: ['pending'],
    type: 'purchase',
    brand: 'MTN'
  },
  {
    logo: '',
    brand: 'IKEDC',
    title: 'You just Bought 3000 unit',
    amount: '1000',
    time: '3:15',
    status: ['completed'],
    type: 'purchase'
  },
  {
    logo: '',
    brand: 'MTN',
    title: 'You just Bought ₦200 MTN Airtime',
    amount: '200',
    time: '3:15',
    status: ['delivered'],
    type: 'purchase'
  },
  {
    logo: '',
    brand: 'GTB',
    title: 'You just Received ₦ 20,0000',
    amount: '20,000',
    time: '3:15',
    status: ['completed'],
    type: 'received'
  }
]

export const raffle = [
  {
    name: 'live raffle draw',
    video: raf,
    description:
      'Mama Gold Rice: Premium quality, long-grain rice known for its delicious taste and distinctive aroma. Aged to perfection, it guarantees a fluffy and flavorful result...',
    title: 'rice',
    host: 'ajiroba',
    date: '4 Aug 2024',
    price:"300"
  },
   {
    name: 'live raffle draw',
    video: raf,
    description:
      'Mama Gold Rice: Premium quality, long-grain rice known for its delicious taste and distinctive aroma. Aged to perfection, it guarantees a fluffy and flavorful result...',
    title: 'rice',
    host: 'ajiroba-2',
    date: '4 Aug 2024',
    price:"300"
  },
   {
    name: 'live raffle draw',
    video: raf,
    description:
      'Mama Gold Rice: Premium quality, long-grain rice known for its delicious taste and distinctive aroma. Aged to perfection, it guarantees a fluffy and flavorful result...',
    title: 'rice',
    host: 'ajiroba-3',
    date: '4 Aug 2024',
    price:"300"
  }
]

export const raffleWinner = [
  {
  sn:0,
  product:"50kg Bag of Rice",
  winner:"09023233443",
  ticket:"500",
},
  {
  sn:1,
  product:"50kg Bag of Semo",
  winner:"09023233443",
  ticket:"500",
},
  {
  sn:2,
  product:"50kg Bag of Rice",
  winner:"09023233443",
  ticket:"500",
}
]
