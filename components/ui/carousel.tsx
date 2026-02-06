// components/ui/carousel.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export type CarouselSlide<T> = {
  data: T;
  duration: number; // seconds
};

type Props<T> = {
  slides: CarouselSlide<T>[];
  renderSlide: (data: T) => React.ReactNode;
  speed?: number;
  loop?: boolean;
};

export default function Carousel<T>({
  slides,
  renderSlide,
  speed = 700,
  loop = true,
}: Props<T>) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      loop={loop}
      speed={speed}
      autoplay={{
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
    >
      {slides.map((slide, i) => (
        <SwiperSlide
          key={i}
          data-swiper-autoplay={slide.duration * 1000}
        >
          {renderSlide(slide.data)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
