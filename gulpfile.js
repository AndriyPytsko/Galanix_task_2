let gulp = require("gulp");
let rename = require("gulp-rename");
let sass = require("gulp-sass");
let autoprefixer = require("gulp-autoprefixer");
let browserSync = require("browser-sync").create();

function cssStyle(done) {
    gulp.src('./style/style.scss')
        .pipe(sass({
            errorLogToConsole: true,
            outputStyle: 'compressed',
            includePaths: require('node-normalize-scss').includePaths
        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer(['last 15 versions', '> 1%'],{
            cascade: false
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./style/'))
        .pipe(browserSync.stream());
    done();
}

function sync(done){
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 3000
    });
    done();
}

function browserReload(done) {
    browserSync.reload();
    done();
}

function watchFile(){
    gulp.watch('./style/style.scss', cssStyle);
    gulp.watch('./index.html', browserReload);
    gulp.watch('./js/index.js', browserReload);
}

gulp.task("default",gulp.parallel(sync, cssStyle, watchFile));