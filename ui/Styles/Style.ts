import UIFieldStyle from "./UIFieldStyle";
import UITextFieldStyle from "./UITextFieldStyle";
import UITextStyle from "./UITextStyle";
import UISeparatorStyle from "./UISeparatorStyle";
import UICardStyle from "./UICardStyle";
import UIButtonStyle from "./UIButtonStyle";
import UIHeaderStyle from "./UIHeaderStyle";
import UISelectFieldStyle from "./UISelectFieldStyle";
import { UserInterface } from "reactxp";

const measure = UserInterface.measureWindow();

export interface UIProps {
  children?: any;
  style?: any;
}

export const UIDefaultStyle: any = {
  field: UIFieldStyle,
  textfield: UITextFieldStyle,
  text: UITextStyle,
  selectfield: UISelectFieldStyle,
  separator: UISeparatorStyle,
  card: UICardStyle,
  button: UIButtonStyle,
  header: UIHeaderStyle
};

export const windowHeight = measure.height;
export const windowWidth = measure.width;
