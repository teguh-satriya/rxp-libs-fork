import { Route, Switch } from "@app/libs/router/Routing";
import _ from "lodash";
import { types } from "mobx-state-tree";
import React, { useRef } from "react";
import { View } from "reactxp";
import { UIProps } from "../ui/Styles/Style";
import UIText from "../ui/UIText";

interface SwitchRouteProps extends UIProps {
  routes: { [key: string]: any };
  role?: any;
  ready?: any;
  roles?: { [key: string]: any };
}

const RouteStateModel = types
  .model({
    rootPaths: types.array(types.string)
  })
  .actions((self: any) => ({
    setRootPaths: (rootPaths: string[]) => {
      self.rootPaths = rootPaths;
    }
  }));

export const RouteState = RouteStateModel.create();

export default (p: SwitchRouteProps) => {
  const componentRef = useRef({} as any);
  return (
    <Switch>
      {!p.routes["/"] && (
        <Route
          hideNavBar={true}
          exact={true}
          key={"/"}
          path={"/"}
          component={({ history }: any) => {
            if (p.ready) {
              if (p.role) {
                const role = _.get(p.roles, p.role);
                if (role) {
                  history.replace(_.keys(role)[0]);
                }
              } else {
                history.replace("/login");
              }
            }
            return <UIText>Welcome!</UIText>;
          }}
        />
      )}
      {Object.keys(p.routes).map((route: string) => {
        if (!componentRef.current[route]) {
          if (typeof p.routes[route] === "function") {
            componentRef.current[route] = p.routes[route];
          } else {
            componentRef.current[route] = () => p.routes[route];
          }
        }

        return (
          <Route
            hideNavBar={true}
            exact={true}
            key={route}
            path={route}
            component={componentRef.current[route]}
          />
        );
      })}
      {_.map(p.roles, (routes, role) =>
        _.map(routes, (component, path) => {
          return (
            <Route
              hideNavBar={true}
              exact={true}
              key={path}
              path={path}
              component={({ history, location }: any) => {
                const ready = p.ready === undefined || p.ready;
                if (
                  ready &&
                  role !== p.role &&
                  location.pathname !== "/login"
                ) {
                  history.replace("/login");
                  return <View />;
                }
                return component;
              }}
            />
          );
        })
      )}
    </Switch>
  );
};
