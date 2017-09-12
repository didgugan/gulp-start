/* 
 * Gulp Start
 */

const gulp         = require('gulp'),                       // Сам сборщик Gulp
      less         = require('gulp-less'),                  // Пакет компиляции less
      mmq          = require('gulp-merge-media-queries'),   // Плагин, соединющий медиа-запросы
      browserSync  = require('browser-sync'),               // Запуск локального сервера 
      concat       = require('gulp-concat'),                // Пакет конкатенации файлов
      uglifyjs     = require('gulp-uglifyjs'),              // Пакет минификации файлов JavaScript
      cssnano      = require('gulp-cssnano'),               // Пакет минификации файлов CSS
      rename       = require('gulp-rename'),                // Переименовывание файлов
      del          = require('del'),                        // Удаление файлов директории
      imagemin     = require('gulp-imagemin'),              // Пакет минификации изображений (в зависимостях также идут дополнительные пакеты)
      cache        = require('gulp-cache'),                 // Работа с кэшом
      autoprefixer = require('gulp-autoprefixer'),          // Пакет расстановки вендорных перфиксов
      importFile   = require('gulp-file-include'),          // Импорт файлов 
      prettify     = require('gulp-html-prettify'),         // Красиво форматируем html файлы
      uncss        = require('gulp-uncss'),                 // Находит и удаляет неиспользуемые стили CSS
      importCss    = require('gulp-import-css');            // Подключает файлы из библиотек в общий файл CSS

// Компилируем less в CSS и добавляем вендорные префиксы
gulp.task('less',  () => {
    return gulp.src('app/less/*.less')  // В этом файле хранятся основные стили, остальные следует импортировать в него
    .pipe(less())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8'], {cascade: false}))
    .pipe(gulp.dest('app/css'));
});

// Минифицируем CSS (предвариетльно собрав less)
gulp.task('css', ['less'], () => {
    return gulp.src('app/css/style.css')
    .pipe(mmq())
    .pipe(importCss())
    .pipe(cssnano())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
        stream: true
    }));
});


// Подключаем JS файлы бибилотек из директории 'app/libs/', установленные bower'ом, конкатенируем их и минифицируем
gulp.task('scripts', () => {
    return gulp.src('app/js/libs.js')   // файл, в который импортируются наши библиотеки
    .pipe(importFile({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(uglifyjs())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('app/js'));
});



// Минификация кастомных скриптов JS
gulp.task('js-min', () => {
    return gulp.src(['app/js/*.js', '!app/js/*.min.js', '!app/js/libs.js'])
    .pipe(uglifyjs())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({
        stream: true
    }));
});

// Минифицируем изображения и кидаем их в кэш
gulp.task('img', () => {
    return gulp.src('app/img/**/*')
    .pipe(cache(imagemin([imagemin.gifsicle(), imagemin.jpegtran(), imagemin.optipng()])))
    .pipe(gulp.dest('dist/img'));
});

// Запускаем наш локальный сервер из директории 'app/'
gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

// Следим за изменениями файлов, компилируем их и обновляем страницу/инжектим стили
gulp.task('default', ['css', 'scripts', 'js-min', 'browser-sync'], () => {
    gulp.watch('app/less/*.less', ['css']);
    gulp.watch(['app/js/*.js', '!app/js/*.min.js'], ['js-min']);
    gulp.watch('app/*.html', browserSync.reload);
});

// Очищаем директорию билда 'dist/'
gulp.task('clean', () => {
    return del.sync('dist/**/*');
});

// Чистим кэш изображений (вообще весь кэш)
gulp.task('clear', () => {
    return cache.clearAll();
});


// Собираем наш билд в директорию 'dist/'
gulp.task('build', ['clean', 'img', 'css', 'scripts', 'js-min'], () => {

    // Собираем и форматируем HTML
    var buildHtml = gulp.src('app/*.html')
    .pipe(prettify({indent_char: ' ', indent_size: 2}))
    .pipe(gulp.dest('dist'));

    // Собираем CSS
    //var buildCss = gulp.src('app/css/style.min.css')
    //.pipe(gulp.dest('dist/css'));

    // Собираем CSS
    var buildCss = gulp.src('app/css/style.css')
    .pipe(mmq())
    .pipe(importCss())
    //.pipe(uncss({
    //        html: ['app/*.html']
    //    }))
    .pipe(cssnano())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('dist/css'));

    // Собираем шрифты
    var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));

    // Собираем JS
    var buildJs = gulp.src('app/js/*.min.js')
    .pipe(gulp.dest('dist/js'));

    
});