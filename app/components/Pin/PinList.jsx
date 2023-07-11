"use client";
import Image from "next/image";
import React from "react";

const PinList = ({ pinList }) => {
  // console.log(pinList);

  return (
    <div
      className="mt-7 px-2 md:px-5
    columns-2 md:columns-3
    lg:columns-4 mb-4
    xl:columns-5 space-y-6 mx-auto "
    >
      {pinList.map((pin) => {
        return (
          <div key={pin.id} className="flex flex-col cursor-pointer">
            <Image src={pin.image} alt={pin.title} height={500} width={500} />
            <h3>{pin.title}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default PinList;
