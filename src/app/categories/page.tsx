import { Title } from "../component/Title";
import {
  CategoryCard,
  CategoryCardMain,
  ProductCardMain,
} from "../component/Card";
import { categories } from "../static-data";
import { Header } from "../component/Header";
import { Footer } from "../component/Footer";
import { useQueryData } from "@/hooks/useQueryData";
// import { useQueryData } from '@/hooks/useQueryData'
// import { useQueryData } from '@/hooks/useQueryData'

interface cardDetails {
  cardInfo: Array<{
    name: string;
    image: Array<{ image?: string }>;
    ticket_price: any;
    reviews: number;
    starts_in: string | undefined;
    images: any;
    id: string;
  }>;
  currentPage: number;
  cardsNum: number;
}

interface CardInfoItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  name?: string;
  image?: any;
  price?: string;
  images?: { id: string; product: string; image: string }[];
  discount?: string;
  reviews?: string;
  message?: string;
}

interface AuctionResponse {
  message?: any;
  data: CardInfoItem[];
  // add other fields as necessary
}

const CatPage = () => {
  // const { data: categoriesInfo, isLoading: categoriesLoading, error } = useQueryData<AuctionResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/commerce/categories/`, ["get categoriesdetails"], true);

  //   const categorydata = categoriesInfo?.data

  //   console.log(categorydata, 'catttinfooo')

  return (
    <>
      <header className="fixed w-full">
        <Header />
      </header>
      <main className="pt-[20vh]" >
        <Title title="Categories" />
        {/*   <div className='container justify-center items-center flex flex-col mb-5'> */}
        {/* <CategoryCard /> */}
        <div className="px-12 mb-12 sticky top-[60px] " style={{zIndex: -3}}>
          <div className="  ">
            <CategoryCardMain cardInfo={{}} />
          </div>
        </div>

        {/*     </div> */}
      </main>
      <Footer />
    </>
  );
};

export default CatPage;
