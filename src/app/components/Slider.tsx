"use client";
import Image from "next/image";

function Slider() {
  return (
    <div className="w-full h-svh overflow-hidden relative">
      <div className="-left-[2px] z-50 absolute h-full w-20 bg-[hsl(222.2_84%_4.9%)] clip-triangle will-change-transform"></div>
      <div className="flex">
        <div className="w-full h-svh flex-shrink-0 relative">
          {/* <Image
            src="/7.jpg"
            alt=""
            className="absolute w-full h-full object-cover"
            fill={true}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Slider;
