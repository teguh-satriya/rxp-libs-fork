import React from "react";
import { default as ImageSvg, SvgPath } from "reactxp-imagesvg";

export default ({ style, color = "black", width = 32, height = 32 }: any) => {
  return (
    <ImageSvg style={style} height={height} width={width} viewBox="0 0 448 512">
      <SvgPath
        fillColor={color}
        d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
      />
    </ImageSvg>
  );
};
