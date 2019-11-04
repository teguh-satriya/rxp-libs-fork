import { windowWidth } from "./Style";

export default {
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    minHeight: 65,
    // border: 0,
    // borderBottomWidth: 1,
    padding: 10,
    paddingRight: 5,
    paddingLeft: 5
    // borderColor: "#d6d6d6",
    // backgroundColor: "#fff"
  },
  left: {
    flexDirection: "row",
    flexShrink: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    overflow: "visible",
    marginLeft: 5,
    marginRight: 5
  },
  center: {
    flex: 1,
    flexDirection: "row",
    flexShrink: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: windowWidth,
    marginLeft: 5,
    marginRight: 5
  },
  right: {
    flexDirection: "row",
    flexShrink: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    overflow: "visible",
    marginLeft: 5,
    marginRight: 5
  }
};
