import { observer } from 'mobx-react-lite';
import React, { useState } from "react";
import { Image, Picker } from "reactxp";
import { MediaQuery } from '../ui/MediaQuery';
import UIBody from "../ui/UIBody";
import UIButton from '../ui/UIButton';
import UIContainer from "../ui/UIContainer";
import UIHeader from '../ui/UIHeader';
import UIRow from '../ui/UIRow';
import UITabs from "../ui/UITabs";
import UIText from '../ui/UIText';

const pickerItems: any[] = [
  {
    label: "Cool",
    value: "cool"
  },
  {
    label: "Super",
    value: "super"
  },
  {
    label: "Great",
    value: "great"
  }
];

export default observer(({ showSidebar, sidebar }: any) => {
  const [selectedValue, setSelectedValue] = useState("cool");

  return (
    <UIContainer>
      <UIHeader
        center={
          <UIRow style={{ alignItems: "center", marginLeft: 0, marginRight: 0 }}>
            <UIText size="large">Tabs</UIText>
            <MediaQuery minWidth={1224}>
              <UIText size="large">&nbsp; &mdash; Desktop UI</UIText>
            </MediaQuery>
            <MediaQuery maxWidth={1224}>
              <UIText size="large">&nbsp; &mdash; Mobile UI</UIText>
            </MediaQuery>
          </UIRow>
        }
        right={
          <UIButton
            size="compact"
            fill="clear"
            animation={false}
            onPress={() => {
              showSidebar(!sidebar);
            }}
          >
            <Image
              style={{ width: 24, height: 24 }}
              source={require("@app/libs/sample/imgs/menu.png")}
            />
          </UIButton>
        }
      />
      <UIBody>
        <Picker
          items={pickerItems}
          selectedValue={selectedValue}
          onValueChange={v => {
            setSelectedValue(v);
          }}
        />

        <UITabs
          orientation="vertical"
          tabs={[
            {
              label: () => {
                return <UIText>Tab 1</UIText>;
              },
              content: <UIText>Content 1</UIText>
            },
            {
              label: <UIText>Tab 2</UIText>,
              content: <UIText>Content 2</UIText>
            },
            {
              label: "Tab 3",
              content: <UIText>Content 3</UIText>
            }
          ]}
        />
      </UIBody>
    </UIContainer>
  );
});
