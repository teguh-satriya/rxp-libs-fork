import React from "react";
import { default as ImageSvg, SvgPath } from "reactxp-imagesvg";
export default ({ color = "black", width = 24, height = 24 }: any) => {
  return (
    <ImageSvg width={width} height={height} viewBox="0 0 238.007 238.007">
      <SvgPath
        d="M233.387,56.221c-6.198-6.198-16.304-6.198-22.47,0l-91.915,91.883L27.118,56.221
				c-6.198-6.198-16.273-6.198-22.47,0s-6.198,16.273,0,22.47l103.071,103.102c3.115,3.146,7.215,4.64,11.283,4.64
				c4.1,0,8.168-1.526,11.283-4.64L233.355,78.691C239.553,72.494,239.553,62.419,233.387,56.221z"
        fillColor={color}
      />
    </ImageSvg>
  );
};
