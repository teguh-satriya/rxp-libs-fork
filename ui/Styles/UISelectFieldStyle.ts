import { MainStyle } from "@app/config";

export default {
  container: {
    web: {
      cursor: "pointer"
    }
  },
  label: {
    fontSize: 16
  },
  itemText: {
    paddingLeft: 10
  },
  box: {
    borderWidth: 0,
    borderTopWidth: 1,
    marginLeft: -10,
    marginRight: -10,
    paddingLeft: 10,
    maxHeight: 200,
    borderColor: MainStyle.fieldColor,
    flex: 1
  }
};
