import React from "react";
import { ScrollView, View } from "reactxp";
import { UIProps } from "./Styles/Style";
import UICol from "./UICol";
import UIRow from "./UIRow";
import UIText from "./UIText";

interface DetailJsonProps extends UIProps {
  data: any;
  labelSize?: number;
}

const UIJsonDetail = ({ data, labelSize = 2, style }: DetailJsonProps) => {
  return (
    <ScrollView>
      <View style={style}>
        {Object.keys(data).map(key => {
          return (
            <View
              key={key}
              style={{
                padding: 10,
                borderWidth: 0,
                borderBottomWidth: 1,
                borderColor: "#e9ecef"
              }}
            >
              <UIRow>
                <UICol size={labelSize}>
                  <UIText style={{ color: "#8898aa" }}>{key}</UIText>
                </UICol>
                <UICol size={12 - labelSize}>
                  {typeof data[key] === "object" ? (
                    React.isValidElement(data[key]) ? (
                      data[key]
                    ) : (
                      <UIJsonDetail data={data[key]} labelSize={labelSize} />
                    )
                  ) : (
                    <UIText style={{ color: "#525f7f" }}>{data[key]}</UIText>
                  )}
                </UICol>
              </UIRow>
              {/* <UISeparator /> */}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default UIJsonDetail;
