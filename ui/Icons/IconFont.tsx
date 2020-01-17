import React from "react";
import { default as ImageSvg} from "reactxp-imagesvg";
import UIText from '../UIText';
export default ({
  color = "black",
  width = 24,
  height = 24,
  style = {},
  text = ""
}: any) => {
  return (
    <ImageSvg width={width} height={height} style={style} viewBox="0 0 450 512">
<UIText style={{color:color,fontSize:15}}>{text}</UIText> 
    </ImageSvg>
  );
};
