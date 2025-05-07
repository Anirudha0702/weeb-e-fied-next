import Image from "next/image";
import React from "react";

function Home() {
  return (
    <div className="flex flex-col items-center text-white">
      <header className="relative w-full h-96 md:h-[70svh] flex items-center justify-between px-4  shadow-md">
        <Image
          src="/mha.jpg"
          alt="One Piece"
          fill
          className="object-cover"
          priority
        />
      </header>
    </div>
  );
}

export default Home;
