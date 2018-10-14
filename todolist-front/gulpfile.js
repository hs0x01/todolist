'use strict'

// ----------------------------------------------------------------------------
//   モジュールロード
// ----------------------------------------------------------------------------
const gulp      = require('gulp');
const gulpTs    = require('gulp-typescript');
const srcMaps    = require('gulp-sourcemaps');
const gulpLess  = require('gulp-less');
const del       = require('del');
const plumber   = require('gulp-plumber');
const color     = require('cli-color');
const fs        = require('fs');

// ----------------------------------------------------------------------------
//   定数
// ----------------------------------------------------------------------------
const JS_OUTPUT_PATH  = 'js/';
const CSS_OUTPUT_PATH = 'css/';
const TODOLIST_JS         = 'todolist.js';
const LESS_FILES      = 'less/**/*.less';

const TS_FILES = 'ts/**/*.ts';
					 
const TS_CONFIG_NAME   = 'tsconfig.json';

// TypeScriptコンパイル設定
const TS_COMPILE_SETTINGS = gulpTs.createProject(
    TS_CONFIG_NAME,
    {
        out: TODOLIST_JS
    });

// ----------------------------------------------------------------------------
//   タスク
// ----------------------------------------------------------------------------

// TypeScriptのコンパイル
gulp.task('ts', compileTs);

// LESSのコンパイル
gulp.task('less', compileLess);

// ----------------------------------------------------------------------------
//   関数
// ----------------------------------------------------------------------------

// TypeScriptをコンパイルする関数
function compileTs() {

	writeInfMsg('TypeScriptのコンパイルを開始しました。');

    let result = gulp.src(TS_FILES)
        .pipe(srcMaps.init())
        .pipe(plumber({
            'errorHandler': function (error) {
                writeErrMsg(error);
            }
        }))
        .pipe(TS_COMPILE_SETTINGS())
        .pipe(srcMaps.write('./'))
        .pipe(gulp.dest(JS_OUTPUT_PATH))
        .on('finish', function () {
            writeInfMsg('TypeScriptのコンパイルが終了しました。');
        });

    return result;
}

// LESSをコンパイルする関数
function compileLess() {
	
	writeInfMsg('LESSのコンパイルを開始しました。');
	
	del.sync(CSS_OUTPUT_PATH + '**/*');
	
	return gulp.src(LESS_FILES)
		.pipe(plumber({
			'errorHandler': function(error) {
				writeErrMsg(error);
			}
		}))
        .pipe(gulpLess())
        .pipe(gulp.dest(CSS_OUTPUT_PATH)).on('finish', function () {
            writeInfMsg('LESSのコンパイルが終了しました。');
        });
}

// INFOメッセージをコンソール出力する関数
function writeInfMsg(msg) {
	console.log(color.cyanBright('[' + getHhmmss(new Date()) + '] ' + msg));
}

// ERRORメッセージをコンソール出力する関数
function writeErrMsg(msg) {
	console.log(color.redBright('[' + getHhmmss(new Date()) + '] ' + msg));
}

// 引数のDateオブジェクトから時分秒を取得し、hh:mm:ss形式で返す関数
function getHhmmss(date) {
	
	let hh = ('0' + date.getHours()).slice(-2);
	let mm = ('0' + date.getMinutes()).slice(-2);
	let ss = ('0' + date.getSeconds()).slice(-2);
	
	return (hh + ':' + mm + ':' + ss);
}
