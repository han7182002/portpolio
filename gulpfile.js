const gulp = require('gulp');
const scss = require('gulp-sass')(require('sass'));
// const sourcemaps = require('gulp-sourcemaps');
// const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync');
// const concat = require("gulp-concat");
// const uglify = require('gulp-uglify');
// const rename = require('gulp-rename');
// const imagemin = require('gulp-imagemin');
const del = require('del');
const fileinclude = require('gulp-file-include');
const prettyHtml = require('gulp-pretty-html');

// 소스 파일 경로
const PATH = {
  HTML: './src',
  COMMON_HTML: './src/pages',
  ASSETS: {
    COMMON_CSS: './src/assets/scss',
    COMMON_IMG: './src/assets/img',
    COMMON_SCRIPT: './src/assets/js',
    FONT: './src/assets/css/font',
  },
};
//작업물
const DEV_PATH = {
  CLEAN: './dev',
  HTML: './dev/src',
  ASSETS: {
    COMMON_CSS: './dev/src/assets/css',
    COMMON_IMG: './dev/src/assets/img',
    COMMON_SCRIPT: './dev/src/assets/js',
    FONT: './dev/src/assets/css/font',
  },
};
// 산출물 경로
const DEST_PATH = {
  CLEAN: './dist',
  HTML: './dist/src',
  ASSETS: {
    COMMON_CSS: './dist/src/assets/css',
    COMMON_IMG: './dist/src/assets/img',
    COMMON_SCRIPT: './dist/src/assets/js',
    FONT: './dist/src/assets/css/font',
  },
};

gulp.task('clean', () => {
  return new Promise(resolve => {
    del.sync(DEV_PATH.CLEAN);
    resolve();
  });
});
gulp.task('clean-dist', () => {
  return new Promise(resolve => {
    del.sync(DEST_PATH.CLEAN);
    resolve();
  });
});

gulp.task('scss:compile', () => {
  return new Promise(resolve => {
    gulp
      .src(PATH.ASSETS.COMMON_CSS + '/**/*.scss')
      .pipe(scss({ outputStyle: 'compressed' }))
      .pipe(gulp.dest(DEV_PATH.ASSETS.COMMON_CSS));
    resolve();
  });
});

gulp.task('scss-dist:compile', () => {
  return new Promise(resolve => {
    gulp
      .src(PATH.ASSETS.COMMON_CSS + '/**/*.scss')
      .pipe(scss({ outputStyle: 'compressed' }))
      .pipe(gulp.dest(DEST_PATH.ASSETS.COMMON_CSS));
    resolve();
  });
});

gulp.task('html', () => {
  return new Promise(resolve => {
    gulp
      .src(PATH.HTML + '/**/*.html')
      .pipe(
        fileinclude({
          prefix: '@@',
          basepath: '@file',
        }),
      )
      .pipe(gulp.dest(DEV_PATH.HTML));
    resolve();
  });
});

gulp.task('html-dist', () => {
  return new Promise(resolve => {
    gulp
      .src(PATH.HTML + '/**/*.html')
      .pipe(
        fileinclude({
          prefix: '@@',
          basepath: '@file',
        }),
      )
      .pipe(
        prettyHtml({
          indent_size: 2,
          indent_char: ' ',
        }),
      )
      .pipe(gulp.dest(DEST_PATH.HTML));
    resolve();
  });
});

gulp.task('script:concat', () => {
  return new Promise(resolve => {
    gulp
      .src(PATH.ASSETS.COMMON_SCRIPT + '/**/*.js') // src 경로에 있는 모든 js 파일을 common.js 라는 이름의 파일로 합친다.
      .pipe(gulp.dest(DEV_PATH.ASSETS.COMMON_SCRIPT))
      .pipe(browserSync.reload({ stream: true }));

    resolve();
  });
});

gulp.task('script-dist:concat', () => {
  return new Promise(resolve => {
    gulp
      .src(PATH.ASSETS.COMMON_SCRIPT + '/**/*.js') // src 경로에 있는 모든 js 파일을 common.js 라는 이름의 파일로 합친다.
      .pipe(gulp.dest(DEST_PATH.ASSETS.COMMON_SCRIPT))
      .pipe(browserSync.reload({ stream: true }));

    resolve();
  });
});

gulp.task('imagemin', () => {
  return new Promise(resolve => {
    gulp.src(PATH.ASSETS.COMMON_IMG + '/**/*.*').pipe(gulp.dest(DEV_PATH.ASSETS.COMMON_IMG));

    resolve();
  });
});

gulp.task('imagemin-dist', () => {
  return new Promise(resolve => {
    gulp.src(PATH.ASSETS.COMMON_IMG + '/**/*.*').pipe(gulp.dest(DEST_PATH.ASSETS.COMMON_IMG));

    resolve();
  });
});

gulp.task('fonts', () => {
  return new Promise(resolve => {
    gulp.src(PATH.ASSETS.FONT + '/*.*').pipe(gulp.dest(DEV_PATH.ASSETS.FONT));

    resolve();
  });
});

gulp.task('fonts-dist', () => {
  return new Promise(resolve => {
    gulp.src(PATH.ASSETS.FONT + '/*.*').pipe(gulp.dest(DEV_PATH.ASSETS.FONT));

    resolve();
  });
});

gulp.task('watch', () => {
  return new Promise(resolve => {
    gulp.watch([PATH.HTML + '/**/*.html'], gulp.series(['html'], browserSyncReload));

    gulp.watch([PATH.ASSETS.COMMON_CSS + '/**/*.scss'], gulp.series(['scss:compile'], browserSyncReload));

    gulp.watch([PATH.ASSETS.COMMON_SCRIPT + '/**/*.js'], gulp.series(['script:concat'], browserSyncReload));
    resolve();
  });
});

function browserSyncReload(done) {
  browserSync.reload();
  done();
}

gulp.task('browserSync', () => {
  return new Promise(resolve => {
    browserSync.init({
      server: {
        baseDir: 'dev/src/',
        directory: true,
      },
      cors: true,
      files: ['dev/' + '**/*.html'],
      startPath: '/',
      ghostMode: false,
      notify: false,
      reloadDelay: 1000,
      skipUncaughtErrors: true,
    });
    resolve();
  });
});

var taskSeries = gulp.series(['clean', 'scss:compile', 'html', 'script:concat', 'imagemin', 'fonts', 'browserSync', 'watch']);

var distSeries = gulp.series(['clean-dist', 'scss-dist:compile', 'html-dist', 'script-dist:concat', 'imagemin-dist', 'fonts-dist']);

gulp.task('default', taskSeries);
gulp.task('dist', distSeries);
