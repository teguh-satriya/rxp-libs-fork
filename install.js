const pjson = require("../../package.json");
const fs = require("fs");
const { spawn } = require("child_process");

const deleteFolderRecursive = function(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file, index) {
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

delete pjson.dependencies;
pjson["rnpm"] = {
  assets: ["./src/libs/Fonts"]
};

console.log(`
  Please make sure 'git', yarn' and 'react-native-cli' is installed

  [sudo] npm i -g yarn react-native-cli
`);

fs.writeFile("../../package.json", JSON.stringify(pjson, null, 2), err => {
  if (err) {
    console.log(err);
    return;
  }

  process.chdir("../..");
  const child = spawn("yarn", [
    "add",
    "react",
    "react-dom",
    "react-native",
    "react-native-windows",
    "reactxp",
    "reactxp-imagesvg",
    "reactxp-virtuallistview",
    "react-router",
    "react-router-dom",
    "react-router-native",
    "react-router-navigation",
    "react-native-side-menu",
    "react-native-linear-gradient",
    "mobx",
    "mobx-state-tree",
    "mobx-react-lite",
    "lodash"
  ]);

  // use child.stdout.setEncoding('utf8'); if you want text chunks
  child.stdout.on("data", chunk => {
    // data from standard output is here as buffers
    console.log(chunk.toString("utf-8"));
  });

  child.on("close", code => {
    console.log("Installing types....");
    spawn("yarn", [
      "add",
      "--dev",
      "@types/react-router",
      "@types/react-router-dom",
      "@types/react-router-native",
      "@types/react-router-navigation",
      "@types/lodash",
      "webpack-bundle-analyzer",
      "babel-plugin-module-resolver",
      "url-loader",
      "style-loader",
      "css-loader",
      "file-loader",
      "sass-loader",
      "node-sass"
    ]);

    spawn("react-native", ["link"]);
  });

  const backend = spawn("git", [
    "clone",
    "https://bitbucket.org/andromedia/rxp-backend",
    "backend"
  ]);
  backend.stdout.on("data", chunk => {
    // data from standard output is here as buffers
    console.log(chunk.toString("utf-8"));
  });

  backend.on("close", code => {
    fs.copyFileSync("./backend/src/config.ts", "./src/backend.ts");
    deleteFolderRecursive("./backend/.git");
  });

  fs.copyFileSync("./src/libs/utils/config/babelconfig", "babel.config.js");
  fs.copyFileSync("./src/libs/utils/config/tsconfig", "tsconfig.json");
  fs.copyFileSync("./src/libs/utils/config/config", "./src/config.ts");
  fs.copyFileSync("./src/libs/utils/config/uistyle", "./src/uistyle.ts");
  fs.copyFileSync(
    "./src/libs/utils/config/templatehtml",
    "./web/template.html"
  );
  fs.copyFileSync(
    "./src/libs/utils/config/webpackcommon",
    "./web/webpack/common.js"
  );
  fs.copyFileSync("./src/libs/utils/config/webpackdev", "./web/webpack/dev.js");
  fs.copyFileSync(
    "./src/libs/utils/config/webpackprod",
    "./web/webpack/prod.js"
  );
  fs.copyFileSync("./src/libs/utils/config/Apptsx", "./src/App.tsx");
  if (!fs.existsSync("./.vscode")) {
    fs.mkdirSync("./.vscode");
  }
  fs.copyFileSync(
    "./src/libs/utils/config/codesnippet",
    "./.vscode/consolelog.code-snippets"
  );
});
