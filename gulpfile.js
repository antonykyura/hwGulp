const gulp=require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const cache = require('gulp-cache');

gulp.task('html',(done)=>{
    gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
    done();
});

gulp.task('scss',(done)=>{
    gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(autoprefixer({
           }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
    done();
});

gulp.task('js',(done)=>{
    gulp.src('./src/**/*.js')
    .pipe(babel({
        presets:['@babel/env']
    }))
    .pipe(concat('index.js'))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(browserSync.stream());
    done();
})


gulp.task('img',(done)=>{
    gulp.src('./src/img/*')
    .pipe(cache(imagemin(imageminPngquant())))
    .pipe(gulp.dest('./dist/img'))
    .pipe(browserSync.stream());
    done();
})

gulp.task('browser-init',(done)=>{
    browserSync.init({
        server:"./dist"
    })
    done();
});

gulp.task('watch',(done)=>{
    gulp.watch('./src/index.html',gulp.series('html'));
    gulp.watch('./src/scss/**/*.scss',gulp.series('scss'));
    gulp.watch('./src/**/*.js',gulp.series('js'));
    gulp.watch('./src/**/*.img',gulp.series('img'));
    done();
});


