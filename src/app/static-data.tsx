import { MdOutlineFacebook } from 'react-icons/md'
import { FaXTwitter, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa6'
import imgCarousel1 from '@/app/asset/image/carousel.png'
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
import Social from '@/app/asset/socials/Social.svg'
import Social1 from '@/app/asset/socials/Social-1.svg'
import Social2 from '@/app/asset/socials/Social-2.svg'
import Social3 from '@/app/asset/socials/Social-3.svg'
import Social4 from '@/app/asset/socials/Social-4.svg'
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
    path: 'auction-deals'
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
    submenu: []
  },
  {
    name: 'Help',
    path: '/',
    submenu: []
  }
]

export const categories = [
  {
    name: 'FoodStuff',
    path: 'categories/FoodStuff',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed dosed do ',
    image: product2,
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
    path: 'Categories/fashion and Beauty',
    image: fashionBeauty,
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
    path: 'Categories/fashion',
    image: fashion,
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi '
  },
  {
    name: 'Electronics',
    path: 'Categories/Electronics',
    image: product4,
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
    path: 'Categories/Phones',
    image: phones,
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
    path: 'Categories/Computing',
    image: computing,
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
    path: 'Categories/Mother and Child',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ',
    image: mother,
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
    path: 'Categories/Royalty',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ',
    image: royalty,
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
    links: ''
  },
  {
    name: 'Auction Deals',
    links: ''
  },
  {
    name: 'Category',
    links: ''
  },
  {
    name: 'Ralfle Draw Process',
    links: ''
  }
]

export const ourCompany = [
  {
    name: 'Contact us',
    links: ''
  },
  {
    name: 'About Us',
    links: ''
  },
  {
    name: 'FAQ',
    links: ''
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

export const carouselImg = [
  {
    name: '',
    image: ''
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
    price: '',
    previousPrice: '',
    rating: '',
    time: '',
    category: 'Fashion'
  },
  {
    name: 'Rice',
    image: product2,
    description: '',
    price: '',
    previousPrice: '',
    time: '',
    rating: '',
    category: 'FoodStuff'
  },
  {
    name: 'Smart Watch',
    image: product3,
    description: '',
    price: '',
    previousPrice: '',
    rating: '',
    time: '',
    category: 'Phones'
  },
  {
    name: 'Head Phone',
    image: product4,
    description: '',
    price: '',
    previousPrice: '',
    time: '',
    rating: '',
    category: 'Phones'
  },
  {
    name: 'Head Phone',
    image: product5,
    description: '',
    price: '',
    previousPrice: '',
    rating: '',
    time: '',
    category: 'Phones'
  },
  {
    name: 'Head Phone',
    image: product6,
    description: '',
    price: '',
    previousPrice: '',
    time: '',
    rating: '',
    category: 'Phones'
  },
  {
    name: 'Head Phone',
    image: product7,
    description: '',
    price: '',
    previousPrice: '',
    rating: '',
    time: '',
    category: 'Mother and Child'
  },
  {
    name: 'Head Phone',
    image: product8,
    description: '',
    price: '',
    previousPrice: '',
    time: '',
    rating: '',
    category: 'Phones'
  },
  {
    name: 'human hair',
    image: product1,
    description: '',
    price: '',
    previousPrice: '',
    rating: '',
    time: '',
    category: 'Fashion'
  },
  {
    name: 'Oloyin Beans',
    image: product2,
    description: '',
    price: '',
    previousPrice: '',
    time: '',
    rating: '',
    category: 'FoodStuff'
  },
  {
    name: 'Smart Watch',
    image: product3,
    description: '',
    price: '',
    previousPrice: '',
    rating: '',
    time: '',
    category: 'Mother and Child'
  },
  {
    name: 'Head Phone',
    image: product4,
    description: '',
    price: '',
    previousPrice: '',
    time: '',
    rating: '',
    category: 'Royalty'
  }
]
