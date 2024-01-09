import React from "react";
import { useState, useEffect } from "react";


function LikeBtn({  size, isList }: any) {
  const [like, setLike] = useState(false);

  return (
    <div
      className={
        isList &&
        (like
          ? "visible"
          : "invisible group-hover:visible mobile:visible tablet:visible")
      }
    >
        <i
          className={`cursor-pointer icon-Like text-gray-400 
          ${size ? size : "text-[14px]"} mx-2 hover:text-white`}
        ></i>
    </div>
  );
}

export default LikeBtn;
