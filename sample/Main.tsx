import { MediaQuery } from "@app/libs/ui/MediaQuery";
import UIBody from "@app/libs/ui/UIBody";
import UIContainer from "@app/libs/ui/UIContainer";
import { observer, useObservable } from "mobx-react-lite";
import React from "react";
import { View } from "reactxp";
import UIButton from "../ui/UIButton";
import UICard, {
  UICardBody,
  UICardFooter,
  UICardHeader,
  UICardImg
} from "../ui/UICard";
import UICol from "../ui/UICol";
import UIHeader from "../ui/UIHeader";
import UILoading from "../ui/UILoading";
import UIRow from "../ui/UIRow";
import UISeparator from "../ui/UISeparator";
import UIText from "../ui/UIText";
import UITextField from "../ui/UITextField";
import { uistyle } from "../utils/ConfigUtil";
import UISelectField from "../ui/UISelectField";

export default observer(({ showSidebar, sidebar }: any) => {
  const data = useObservable({
    value: "halo",
    coba: "test"
  });

  return (
    <UIContainer>
      <UIHeader
        showSidebar={showSidebar}
        sidebar={sidebar}
        center={
          <UIRow
            style={{ alignItems: "center", marginLeft: 0, marginRight: 0 }}
          >
            <UIText size="large">RX Libs</UIText>
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
        <UISeparator />
        <UIText size="large">Text Field</UIText>
        <UIRow style={{ marginTop: 10 }}>
          <UICol size={12}>
            <UITextField
              label="Field Text"
              color="error"
              value={data.coba}
              setValue={value => {
                data.coba = value;
              }}
            />
          </UICol>
        </UIRow>
        <UIRow>
          <UICol size={3} xs={12} sm={12}>
            <UITextField
              label={"Field " + data.value}
              type="text"
              color="success"
              value={data.value}
              setValue={value => {
                data.value = value;
              }}
            />
          </UICol>
          <UICol size={3} xs={12} sm={12}>
            <UITextField
              label="Password Text"
              type="password"
              color="error"
              value={data.value}
              setValue={value => {
                data.value = value;
              }}
            />
          </UICol>
          <UICol size={3} xs={12} sm={12}>
            <UITextField
              label="Number Text"
              type="number"
              value={data.value}
              setValue={value => {
                data.value = value;
              }}
            />
          </UICol>
          <UICol size={3} xs={12} sm={12}>
            <UITextField
              label="Money Text"
              type="money"
              value={data.value}
              setValue={value => {
                data.value = value;
              }}
            />
          </UICol>
        </UIRow>
        <UISeparator />
        <UIText size="large">Select Field</UIText>
        <UIRow style={{ marginTop: 10 }}>
          <UICol size={3} xs={12} sm={12}>
            <UISelectField
              items={[
                { value: "test", label: "Percobaan" },
                { value: "pilih", label: "Pemilihan" },
                { value: "pilih 1", label: "Pemilihan 1" },
                { value: "pilih 2", label: "Pemilihan 2" },
                { value: "pilih 3", label: "Pemilihan 3" },
                { value: "umum", label: "Umum" }
              ]}
              label="Please pick something"
              value={data.coba}
              setValue={value => {
                data.coba = value;
              }}
            />
          </UICol>
        </UIRow>
        <UISeparator />
        <UIText size="large">Loading</UIText>
        <UILoading style={{ padding: 50 }} />
        <UICard>
          <UICardHeader>
            <UIText>Button</UIText>
          </UICardHeader>
          <UIBody>
            <UIText style={{ padding: 15 }}>Button Color</UIText>
            <UISeparator />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginBottom: 30,
                flexWrap: "wrap"
              }}
            >
              <UIButton color="success">Success</UIButton>
              <UIButton color="error">Error</UIButton>
              <UIButton color="warning" labelColor="#000">
                Warning
              </UIButton>
              <UIButton color="primary">Primary</UIButton>
              <UIButton color="secondary">Secondary</UIButton>
              <UIButton color="#46AAF2">Custom (#46AAF2)</UIButton>
            </View>
            <UIText style={{ padding: 15 }}>Button Fill</UIText>
            <UISeparator />
            <View style={{ flex: 1, flexDirection: "row", marginBottom: 30 }}>
              <UIButton color="primary" fill="solid">
                Solid
              </UIButton>
              <UIButton color="primary" fill="outline">
                Outline
              </UIButton>
              <UIButton color="primary" fill="clear">
                Clear
              </UIButton>
            </View>
            <UIText style={{ padding: 15 }}>Button Size</UIText>
            <UISeparator />
            <UIRow style={{ marginBottom: 30 }}>
              <UIButton color="primary" size="compact">
                Compact
              </UIButton>
              <UIButton color="primary" size="small">
                Small
              </UIButton>
              <UIButton color="primary" size="medium">
                Medium
              </UIButton>
              <UIButton color="primary" size="large">
                Large
              </UIButton>
            </UIRow>
            <UIText style={{ padding: 15 }}>Button In UIRow</UIText>
            <UISeparator />
            <UIRow>
              <UIButton color="primary" style={{ flex: 1 }}>
                Full Row
              </UIButton>
            </UIRow>
            <UIRow>
              <UIButton color="secondary" style={{ flex: 1, borderRadius: 99 }}>
                Full Row - Rounded
              </UIButton>
            </UIRow>
          </UIBody>
        </UICard>
        <UICard>
          <UICardHeader>
            <UIText style={uistyle("text.center")}>Header Card </UIText>
          </UICardHeader>
          <UICardBody>
            <UIText style={uistyle("text.justify")}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </UIText>
          </UICardBody>
          <UICardFooter>
            <UIText style={uistyle("text.center")}>Footer Card</UIText>
          </UICardFooter>
        </UICard>
        <UIRow>
          <UICol size={4} xs={12} sm={12}>
            <UICard mode="shadow">
              <UICardHeader>
                <UIText style={uistyle("text.center")}>
                  {" "}
                  Card Mode: Shadow
                </UIText>
              </UICardHeader>
              <UICardImg
                src={require("./imgs/sample.jpg")}
                style={{ height: 180, width: "100%" }}
                attr={{ resizeMode: "cover" }}
              />
              <UICardBody>
                <UIText style={uistyle("text.justify")}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </UIText>
              </UICardBody>
            </UICard>
          </UICol>
          <UICol size={4} xs={12} sm={12}>
            <UICard mode="normal">
              <UICardImg
                src={require("./imgs/sample.jpg")}
                style={{ height: 180, width: "100%" }}
                attr={{ resizeMode: "cover" }}
              />
              <UICardBody>
                <UIText style={uistyle("text.justify")}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </UIText>
              </UICardBody>
              <UICardFooter>
                <UIText style={uistyle("text.center")}>
                  Card Mode: Normal
                </UIText>
              </UICardFooter>
            </UICard>
          </UICol>
          <UICol size={4} xs={12} sm={12}>
            <UICard mode="clean">
              <UICardBody>
                <UIText style={uistyle("text.justify")}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </UIText>
              </UICardBody>
              <UICardImg
                src={require("./imgs/sample.jpg")}
                style={{ height: 180, width: "100%" }}
                attr={{ resizeMode: "cover" }}
              />
              <UICardFooter>
                <UIText style={uistyle("text.center")}>Footer Card</UIText>
              </UICardFooter>
            </UICard>
          </UICol>
        </UIRow>
      </UIBody>
    </UIContainer>
  );
});
