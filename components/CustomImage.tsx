import React from "react";
import Image from "next/image";
import { useState } from "react";

function CustomImage({ className, objectFit }: any) {

  return  (
    <Image
      src={'musive_intro.png'}
      alt="img"
      layout="fill"
      className={className + " select-none noDrag"}
      objectFit={objectFit ??  "cover"}
      unoptimized={true}
    />
  ) 
}

export default CustomImage;
