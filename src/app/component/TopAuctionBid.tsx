import dynamic from "next/dynamic";

export const TopAuctionBid = dynamic(
    () => import("./TopAuctionMainBid").then(m => m.TopAuctionMainBid),
    { loading: () => <div className="w-full h-48 bg-gray-50" /> }
  );


