"use client";

import Carousel, { CarouselSlide } from "@/components/ui/carousel";
import BannerLayout from "./banner-layout";
import { BannerModel } from "@/types/models";

export default function Banner({ banners }: { banners: BannerModel[] }) {
  if (!banners?.length) return null;

  const slides: CarouselSlide<BannerModel>[] = banners.map((banner) => ({
    data: banner,
    duration: Number(banner.duration),
  }));

  return (
    <div className="w-full aspect-video text-white">
      <Carousel
        slides={slides}
        renderSlide={(banner) => (
          <BannerLayout banner={banner} />
        )}
      />
    </div>
  );
}
