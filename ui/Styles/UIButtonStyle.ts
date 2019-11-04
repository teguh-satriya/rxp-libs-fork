import { MainStyle } from "@app/config";

export default {
  color: {
    success: {
      backgroundColor: MainStyle.successColor,
      borderColor: MainStyle.successColor
    },
    error: {
      backgroundColor: MainStyle.errorColor,
      borderColor: MainStyle.errorColor
    },
    primary: {
      backgroundColor: MainStyle.primaryColor,
      borderColor: MainStyle.primaryColor
    },
    secondary: {
      backgroundColor: MainStyle.secondaryColor,
      borderColor: MainStyle.secondaryColor
    },
    warning: {
      backgroundColor: MainStyle.warningColor,
      borderColor: MainStyle.warningColor
    }
  },
  size: {
    margin: 5,
    alignSelf: "center",
    flexShrink: 0,
    web: {
      cursor: "pointer"
    },
    native: {
      height: "auto"
    },
    small: {
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 8,
      paddingRight: 8
    },
    compact: {
      paddingTop: 3,
      paddingBottom: 2,
      paddingLeft: 5,
      paddingRight: 5
    },
    medium: {
      paddingTop: 10,
      paddingBottom: 9,
      paddingLeft: 15,
      paddingRight: 15
    },
    large: {
      paddingTop: 14,
      paddingBottom: 13,
      paddingLeft: 20,
      paddingRight: 20
    }
  },
  label: {
    color: "#fff",
    success: {
      color: MainStyle.successColor
    },
    error: {
      color: MainStyle.errorColor
    },
    primary: {
      color: MainStyle.primaryColor
    },
    secondary: {
      color: MainStyle.secondaryColor
    },
    warning: {
      color: MainStyle.warningColor
    }
  },
  fill: {
    alignItems: "center",
    borderRadius: 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",

    solid: {
      borderWidth: 2
    },
    outline: {
      borderWidth: 2,
      backgroundColor: "#fff"
    },
    clear: {
      borderWidth: 2,
      borderColor: "transparent",
      backgroundColor: "transparent"
    }
  },
  expand: {
    full: {
      borderRadius: 999,
      width: "100%",
      marginLeft: 0,
      marginRight: 0
    },
    block: {
      width: "100%",
      marginLeft: 0,
      marginRight: 0
    }
  }
};
