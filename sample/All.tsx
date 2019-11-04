import { Route, Router, Switch } from "@app/libs/router/Routing";
import { isSize } from "@app/libs/ui/MediaQuery";
import UIGradient from "@app/libs/ui/UIGradient";
import UISidebar from "@app/libs/ui/UISidebar";
import React, { useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Image, Platform, View } from "reactxp";
import UIButton from "../ui/UIButton";
import UISeparator from "../ui/UISeparator";
import UISimpleList from "../ui/UISimpleList";
import Json from "./Json";
import JsonField from "./JsonField";
import List from "./List";
import Login from "./Login";
import Main from "./Main";
import Tabs from "./Tabs";

interface MenuProps extends RouteComponentProps<any> {
  setSide: any;
}

const Menu = withRouter(({ history, setSide }: MenuProps) => {
  return (
    <UISimpleList
      data={[
        { label: "Main", path: "/" },
        { label: "Tabs", path: "/tabs" },
        { label: "Data", path: "/json" },
        { label: "List", path: "/list" },
        { label: "Json Field", path: "/json-field" },
        { label: "Login", path: "/login" }
      ]}
      renderItems={(item, opt) => {
        return (
          <View key={opt.index}>
            <UIButton
              onPress={() => {
                history.replace(item.path);
                if (Platform.getType() !== "web") {
                  setSide(false);
                }
              }}
              animation={false}
              fill="clear"
              color="#333"
              style={{ width: "100%" }}
            >
              {item.label}
            </UIButton>

            <UISeparator
              style={{
                opacity: 0.2,
                marginTop: 0,
                marginBottom: 0
              }}
            />
          </View>
        );
      }}
    />
  );
});

export default (_props: any) => {
  const [side, setSide] = useState(isSize(["md", "lg"]));
  return (
    <Router>
      <UISidebar
        style={{ width: 300 }}
        visible={side}
        setVisible={setSide}
        sidebar={
          <UIGradient
            style={{ flex: 1 }}
            angle={30}
            colors={["#c2d4e3", "#fff"]}
          >
            <Image
              source={require("@app/libs/sample/imgs/logo.png")}
              resizeMode="contain"
              style={{
                margin: 30,
                width: 115,
                height: 115,
                alignSelf: "center"
              }}
            />
            <UISeparator
              style={{
                opacity: 0.2,
                marginTop: 0,
                marginBottom: 0
              }}
            />
            <Menu setSide={setSide} />
          </UIGradient>
        }
      >
        <Switch>
          <Route
            hideNavBar={true}
            exact
            path="/login"
            component={() => <Login />}
          />
          <Route
            hideNavBar={true}
            exact
            path="/"
            component={() => {
              return <Main showSidebar={setSide} sidebar={side} />;
            }}
          />
          <Route
            hideNavBar={true}
            exact
            path="/tabs"
            component={() => {
              return <Tabs showSidebar={setSide} sidebar={side} />;
            }}
          />
          <Route
            hideNavBar={true}
            exact
            path="/list"
            component={() => {
              return <List showSidebar={setSide} sidebar={side} />;
            }}
          />
          <Route
            hideNavBar={true}
            exact
            path="/json"
            component={() => {
              return <Json showSidebar={setSide} sidebar={side} />;
            }}
          />
          <Route
            hideNavBar={true}
            exact
            path="/json-field"
            component={() => {
              return <JsonField />;
            }}
          />
        </Switch>
      </UISidebar>
    </Router>
  );
};
