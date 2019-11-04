import React from "react";
import { default as ImageSvg, SvgPath } from "reactxp-imagesvg";
export default ({ color = "black", width = 24, height = 24 }: any) => {
  return (
    <ImageSvg width={width} height={height} viewBox="0 0 237.947 237.947">
      <SvgPath
        d="M89.857,119.002l91.883-91.883c6.198-6.198,6.198-16.273,0-22.47s-16.273-6.198-22.47,0
				L56.199,107.719c-3.115,3.115-4.64,7.183-4.64,11.283s1.526,8.168,4.64,11.283L159.27,233.323c6.198,6.166,16.273,6.166,22.47,0
				c6.198-6.198,6.198-16.304,0-22.47L89.857,119.002z"
        fillColor={color}
      />
    </ImageSvg>
  );
};
