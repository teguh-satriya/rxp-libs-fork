import { MainStyle } from "@app/config";

export default {
  color: {
    error: {
      field: {
        borderColor: MainStyle.errorColor
      },
      label: {
        color: MainStyle.errorColor
      },
      sublabel: {
        color: MainStyle.errorColor
      }
    },
    success: {
      field: {
        borderColor: MainStyle.successColor
      },
      label: {
        color: MainStyle.successColor
      },
      sublabel: {
        color: MainStyle.successColor
      }
    }
  },
  container: {},
  field: {
    marginTop: 0,
    marginBottom: 0,
    borderWidth: 1,
    minHeight: 35,
    borderColor: MainStyle.fieldColor,
    borderRadius: 0,
    justifyContent: "center",
    paddingLeft: 10,
    backgroundColor: "#fdfeff",
    paddingRight: 10
  },
  label: {
    paddingLeft: 0,
    marginBottom: 5,
    marginTop: 10,
    color: MainStyle.fieldTextColor,
    web: {
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
    // fontWeight: 600,
  },
  sublabel: {
    marginTop: 5,
    marginLeft: 0,
    marginBottom: 13,
    // fontWeight: 600,
    color: "#777",
    fontSize: 14
  }
};
