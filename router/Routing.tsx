// import queryString from "query-string";
// import React from "react";
// import { withRouter } from "react-router";

export {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch
} from "react-router-dom";

export { withRouter, RouteComponentProps } from "react-router";

// export const withQueryParams = (WrappedComponent: any) => {
//   return withRouter((props: any) => {
//     const queryParams = queryString.parse(props.location.search); // props.location provided by React Router
//     const newProps = {
//       ...props,
//       queryParams: queryParams
//     };

//     return <WrappedComponent {...newProps} />;
//   });
// };
