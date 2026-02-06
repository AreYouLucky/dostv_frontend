// app/(marketing)/layout.tsx
import Banner from "./components/banner";
import React from "react";
import { getBanners } from "./components/hooks/banner-hooks";

export default async function MarketingLayout({ children }:{children:React.ReactNode}) {
  const banners = await getBanners();

  return (
    <>
      <Banner banners={banners} />
      {children}
    </>
  );
}
