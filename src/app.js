const fs = require("fs");
const path = require("path");

const autoprefixer = require("autoprefixer");
const browserify = require("browserify");
const UglifyJS = require("uglify-js");
const htmlMinifier = require("html-minifier");
const postcss = require("postcss");
const cssnano = require("cssnano");

let clientJS = path.join(__dirname, "./client.js");
let indexHTML = fs.readFileSync(path.join(__dirname, "./index.html"), "utf8");
let styleCSS = fs.readFileSync(path.join(__dirname, "./style.css"), "utf8");

if (!fs.existsSync((path.join(__dirname, "../dist")))) {
  fs.mkdirSync((path.join(__dirname, "../dist")));
}

browserify(clientJS).transform(
  "babelify",
  { presets: ["latest"] }
).bundle((e, b) => {
  if (e) return console.log(e);

  fs.writeFileSync(
    path.join(__dirname, "../dist/client.js"),
    UglifyJS.minify(b.toString()).code
  );
});

indexHTML = htmlMinifier.minify(indexHTML, {
  collapseWhitespace: true,
  minifyCSS: true,
  minifyJS: true
});
fs.writeFileSync(path.join(__dirname, "../dist/index.html"), indexHTML);


styleCSS = postcss([
  autoprefixer,
  cssnano({ discardComments: { removeAll: true } })
]).process(styleCSS).then(s => {
  fs.writeFileSync(path.join(__dirname, "../dist/style.css"), s);
});
