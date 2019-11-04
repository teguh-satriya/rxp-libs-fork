export default {
  normal: {
    borderWidth: 1,
    borderColor: "#dfdfdf",
    backgroundColor: "#fafafa"
  },
  shadow: {
    native: {
      margin: 3,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 4
    },
    web: {
      boxShadow: "0px 0px 9px 0px #bdbdbd"
    }
  },
  clean: {},
  container: {
    borderRadius: 2,
    marginTop: 10,
    marginBottom: 10
  },
  header: {
    // borderWidth: 0,
    // borderBottomWidth: 1,
    // borderColor: '#dfdfdf',
    padding: 15
    // backgroundColor: '#f7f7f7'
  },
  body: {
    flexShrink: 0,
    flexGrow: 0,
    padding: 15
  },
  footer: {
    // borderWidth: 0,
    // borderTopWidth: 1,
    // borderColor: '#dfdfdf',
    padding: 15
    // backgroundColor: '#f7f7f7'
  }
};
