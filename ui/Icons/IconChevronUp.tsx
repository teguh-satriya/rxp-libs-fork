import React from "react";
import { default as ImageSvg, SvgPath } from "reactxp-imagesvg";
export default ({ color = "black", width = 24, height = 24 }: any) => {
  return (
    <ImageSvg width={width} height={height} viewBox="0 0 238.011 238.011">
      <SvgPath
        d="M233.387,159.302L130.284,56.231c-3.115-3.115-7.183-4.64-11.283-4.64
				c-4.1,0-8.168,1.526-11.283,4.64L4.648,159.302c-6.198,6.198-6.198,16.304,0,22.47c6.198,6.198,16.273,6.198,22.47,0
				l91.883-91.883l91.915,91.883c6.166,6.198,16.273,6.198,22.47,0C239.553,175.574,239.553,165.499,233.387,159.302z"
        fillColor={color}
      />
    </ImageSvg>
  );
};
