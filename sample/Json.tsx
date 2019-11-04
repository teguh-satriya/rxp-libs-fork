import { observer } from "mobx-react-lite";
import React from "react";
import { View } from "reactxp";
import { MediaQuery } from "../ui/MediaQuery";
import UIBody from "../ui/UIBody";
import UICard, { UICardImg } from "../ui/UICard";
import UIContainer from "../ui/UIContainer";
import UIHeader from "../ui/UIHeader";
import UIJsonDetail from '../ui/UIJsonDetail';
import UIRow from "../ui/UIRow";
import UISeparator from "../ui/UISeparator";
import UIText from "../ui/UIText";

export default observer(({ showSidebar, sidebar }: any) => {
  return (
    <UIContainer>
      <UIHeader
        showSidebar={showSidebar}
        sidebar={sidebar}
        center={
          <UIRow
            style={{ alignItems: "center", marginLeft: 0, marginRight: 0 }}
          >
            <UIText size="large">Data JSON</UIText>
            <MediaQuery minWidth={1224}>
              <UIText size="large">&nbsp; &mdash; Desktop UI</UIText>
            </MediaQuery>
            <MediaQuery maxWidth={1224}>
              <UIText size="large">&nbsp; &mdash; Mobile UI</UIText>
            </MediaQuery>
          </UIRow>
        }
      />
      <UIBody>
        <UIText size="large">Detail JSON</UIText>
        <UISeparator />
        <UICard style={{ padding: 10 }}>
          <UIJsonDetail
            labelSize={2}
            data={{
              angka: 1,
              test: (
                <UICardImg
                  src={require("./imgs/sample.jpg")}
                  style={{ height: 180, width: "100%" }}
                  attr={{ resizeMode: "cover" }}
                />
              ),
              coba: "halo"
            }}
          />
          <View style={{ height: 60 }} />
        </UICard>
        <UIText size="large">Table JSON</UIText>
        <UISeparator />
        <UICard style={{ padding: 10 }}>
          
        </UICard>
      </UIBody>
    </UIContainer>
  );
});
