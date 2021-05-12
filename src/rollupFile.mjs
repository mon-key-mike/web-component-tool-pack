import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import w from './wsemip.umd.js'
import { rollup } from 'rollup'
import vue from 'rollup-plugin-vue'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import postcss from 'rollup-plugin-postcss'
import { babel } from '@rollup/plugin-babel'
import babelForVue2 from 'rollup-plugin-babel' //才能編譯vue2含async語法的組件
import { terser } from 'rollup-plugin-terser'
import nodePolyfills from 'rollup-plugin-node-polyfills'
import getPks from './getPks.mjs'


let babelForJs = babel


/**
 * 使用rollup編譯檔案
 *
 * @param {Object} opt 輸入設定物件
 * @param {String} opt.fn 輸入原始碼檔案名稱字串，檔案需含副檔名，不含所在資料夾
 * @param {String} [opt.fdSrc='./'] 輸入原始碼檔案所在資料夾字串，預設'./'
 * @param {String} [opt.fdTar=''] 輸入編譯檔案至儲存資料夾字串，預設''
 * @param {String} [opt.nameDistType=''] 輸入編譯檔案名稱格式字串，可選'kebabCase'，預設''
 * @param {Function} [opt.hookNameDist=null]  輸入強制指定編譯檔案名稱函數，預設null，會複寫nameDistType之處理結果
 * @param {String} [opt.format='umd'] 輸入編譯格式字串，可選'umd'、'iife'、'es'，預設'umd'
 * @param {String} [opt.targets='old'] 輸入編譯等級字串，可選'new'、'old'，預設'old'
 * @param {String} [opt.ext='js'] 輸入編譯檔案副檔名字串，可選'js'、'mjs'，預設'js'
 * @param {Boolean} [opt.bSourcemap=true] 輸入編譯檔案是否提供sourcemap布林值，預設true
 * @param {Boolean} [opt.bBanner=true] 輸入編譯檔案是否帶有開頭banner布林值，預設true
 * @param {Boolean} [opt.bNodePolyfill=false] 輸入編譯檔案是否自動加入node polyfill布林值，主要把node專用語法(例如fs)轉為瀏覽器端語法，預設true
 * @param {Boolean} [opt.bMinify=true] 輸入編譯檔案是否進行壓縮布林值，預設true
 * @param {Boolean} [opt.keepFnames=false] 輸入當編譯檔案需壓縮時，是否保留函數名稱布林值，預設false
 * @param {Array} [opt.mangleReserved=[]] 輸入當編譯檔案需壓縮時，需保留函數名稱或變數名稱布林值，預設[]
 * @param {Object} [opt.globals={}] 輸入指定內外模組的關聯性物件，預設{}
 * @param {Array} [opt.external=[]] 輸入指定內部模組需引用外部模組陣列，預設[]
 * @param {Boolean} [opt.bLog=true] 輸入是否顯示預設log布林值，預設true
 */
async function rollupFile(opt = {}) {

    //bLog
    let bLog = opt.bLog
    bLog = bLog !== false

    //pkg
    let pkg = getPks()

    //env
    let env = process.env.NODE_ENV

    //fdSrc
    let fdSrc = opt.fdSrc
    if (!w.fsIsFolder(fdSrc)) {
        fdSrc = './'
    }

    //fdTar
    let fdTar = opt.fdTar
    if (!w.fsIsFolder(fdTar)) {
        fdTar = ''
    }

    //fn
    let fn = opt.fn

    //fpIn, 欲編譯的檔案
    let fpIn = path.resolve(fdSrc, fn)
    // console.log('fpIn', fpIn)

    //check
    if (!w.fsIsFile(fpIn)) {
        return Promise.reject(`invalid fpIn: ${fpIn}`)
    }

    //console
    if (bLog) {
        console.log('transpiling: ' + w.getFileName(fpIn))
    }

    //extIn
    let extIn = _.toLower(w.strdelleft(path.extname(fpIn), 1))

    //nameTrue
    let nameTrue = w.getFileTrueName(fpIn)

    //nameDistType
    let nameDistType = opt.nameDistType

    //nameDist
    let nameDist = nameTrue
    if (nameDistType === 'kebabCase') {
        nameDist = _.kebabCase(nameTrue)
    }

    //hookNameDist
    let hookNameDist = opt.hookNameDist
    if (_.isFunction(hookNameDist)) {
        nameDist = hookNameDist(nameDist, nameTrue, fn)
    }

    //formatOut
    let formatOut = opt.format
    if (!formatOut) {
        formatOut = 'umd'
    }

    //targets
    let targets = opt.targets
    if (targets === 'new') {
        targets = 'last 2 Chrome versions'
    }
    else {
        targets = 'defaults' //> 0.5%, last 2 versions, Firefox ESR, not dead
    }

    //extOut
    let extOut = opt.ext
    if (extOut !== 'js' && extOut !== 'mjs') {
        extOut = 'js'
    }

    //license
    let license = opt.license
    if (!license) {
        license = 'MIT'
    }

    //bSourcemap
    let bSourcemap = opt.bSourcemap
    bSourcemap = bSourcemap !== false

    //banner
    let bBanner = opt.bBanner
    let cbanner = null
    if (bBanner !== false) {
        cbanner = `/*!\n * ${nameDist} v${pkg.version}\n * (c) 2018-2021 ${pkg.author}\n * Released under the ${license} License.\n */`
    }
    let banner = cbanner

    //bNodePolyfill, 提供使用node用api的編譯
    let bNodePolyfill = opt.bNodePolyfill
    bNodePolyfill = bNodePolyfill === true

    //minify
    let bMinify = opt.bMinify
    bMinify = bMinify !== false

    //keepFnames
    let keepFnames = opt.keepFnames
    if (!w.isbol(keepFnames)) {
        keepFnames = false
    }

    //mangleReserved
    let mangleReserved = opt.mangleReserved
    if (!w.isarr(mangleReserved)) {
        mangleReserved = []
    }

    //globals, 提供字串需解析成物件, 指定內外模組的關聯性，左邊key為內部使用之模組名稱，右邊value為外部提供之模組名稱
    let globals = _.get(opt, 'globals', null)
    if (!w.isobj(globals)) {
        globals = {}
    }

    //external, 提供字串需解析成陣列, 指定哪些內部模組需引用外部模組
    let external = _.get(opt, 'external', null)
    if (!w.isarr(external)) {
        external = []
    }

    //plugins
    let plugins = []

    plugins.push(json())

    plugins.push(replace({
        'preventAssignment': true,
        'process.env.NODE_ENV': JSON.stringify(env)
    }))

    if (extIn === 'vue') {
        plugins.push(vue())
    }

    plugins.push(commonjs())

    if (bNodePolyfill) {
        //要放在commonjs之後否則無法處理require語法
        plugins.push(nodePolyfills())
    }

    plugins.push(resolve({
        preferBuiltins: false,
        browser: true,
    }))

    let babelOpt = {
        // babelrc: false,
        presets: [
            [
                '@babel/preset-env',
                {
                    useBuiltIns: 'entry', //entry usage, usage is not stable
                    corejs: 3,
                    // modules: false,
                    targets,
                }
            ]
        ],
        plugins: [
            '@babel/plugin-transform-runtime',
            '@babel/plugin-proposal-nullish-coalescing-operator',
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-proposal-export-default-from',
            '@babel/plugin-proposal-optional-chaining',
        ]
    }
    let babelPlugin
    if (extIn === 'vue') {
        babelOpt.runtimeHelpers = true //給rollup-plugin-babel用, 為舊版babel設定
        babelPlugin = babelForVue2(babelOpt)
    }
    else {
        babelOpt.babelHelpers = 'runtime' //新版babel設定
        babelPlugin = babelForJs(babelOpt)
    }
    plugins.push(babelPlugin)

    plugins.push(postcss({
        extensions: ['.css']
    }))

    if (bMinify) {
        // plugins.push(terser.terser({
        //     output: {
        //         comments: false, //default
        //     },
        // }))
        plugins.push(terser({
            keep_fnames: keepFnames,
            mangle: {
                reserved: mangleReserved
            }
        }))
    }

    //fpOut, 編譯後檔案
    let returnCode = false
    let fpOut = ''
    if (w.fsIsFolder(fdTar)) {
        fpOut = path.resolve(fdTar, `${nameDist}.${formatOut}.${extOut}`)
    }
    else {
        returnCode = true
        fpOut = `./temp-${w.genID()}`
    }
    // console.log('fpOut', fpOut)

    //inputOptions
    let inputOptions = {
        external,
        input: fpIn,
        // treeshake: false,
        plugins,
    }

    //outputOptions
    let outputOptions = {
        banner,
        globals,
        format: formatOut,
        name: nameDist,
        file: fpOut,
        sourcemap: bSourcemap,
        sourcemapExcludeSources: true,
    }

    //bundle
    let bundle = await rollup(inputOptions)

    //output
    // const { output } = await bundle.generate(outputOptions)
    // console.log('output', output)

    //write
    await bundle.write(outputOptions)

    //returnCode
    let code = ''
    if (returnCode) {

        //若編譯成功則讀取轉換後之程式碼
        code = fs.readFileSync(fpOut, 'utf8')

        //unlinkSync
        try {
            fs.unlinkSync(fpOut)
        }
        catch (err) {
            console.log(err)
        }

    }

    //console
    if (bLog && !returnCode) {
        console.log('\x1b[32m%s\x1b[0m', 'output: ' + w.getFileName(fpOut))
    }

    if (returnCode) {
        return code
    }
    return 'finish'
}


export default rollupFile
