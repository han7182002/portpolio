// compile-scss.js

const path = require('path');
const sass = require('node-sass');
const fs = require('fs');

const scssFile = path.join(__dirname, 'style.scss');
const cssFile = path.join(__dirname, 'styles.css');

sass.render(
  {
    file: scssFile,
    outputStyle: 'compressed', // Choose your preferred output style (nested, expanded, compact, compressed)
  },
  (err, result) => {
    if (err) {
      console.error(err);
    } else {
      fs.writeFileSync(cssFile, result.css.toString());
      console.log(`SCSS file compiled successfully: ${scssFile}`);
    }
  }
);
