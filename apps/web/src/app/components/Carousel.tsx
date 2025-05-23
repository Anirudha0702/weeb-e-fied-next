"use client";
import {
  Carousel as Carousel_,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import CarouselItem_ from "@/app/components/CarouselItem";
import { TCoverImage, TMediaTitle } from "@/app/types";
interface CarouselProps {
  medias: {
    id: number;
    coverImage: TCoverImage;
    bannerImage: string;
    description: string;
    title: TMediaTitle;
    episodes: number;
    format: string;
    genres: string[];
  }[];
}
const autoplay = Autoplay({ delay: 5000 });
export default function Carousel({ medias }: CarouselProps) {
  return (
    <Carousel_
      className="w-full"
      opts={{
        loop: true,
      }}
      plugins={[autoplay]}
    >
      <CarouselContent>
        {medias.map((media, index) => (
          <CarouselItem key={index}>
            <CarouselItem_ media={media} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel_>
  );
}
