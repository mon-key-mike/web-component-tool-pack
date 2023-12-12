// import path from 'path'
import fs from 'fs'
import _ from 'lodash-es'
import w from './wsemip.umd.js'
import pathResolve from './pathResolve.mjs'
import rollupWorker from './rollupWorker.mjs'
import rollupFile from './rollupFile.mjs'


function genParforCoreCode(fpPmSeries, fpCore) {
    let c = `
    import pmSeries from '{fpPmSeries}'
    import core from '{fpCore}'
    
    async function parforCore(pgs) {
    
        //pmSeries
        let rs = await pmSeries(pgs, async (pg, kpg) => {
            let { v, k } = pg
            let r = await core(v)
            return {
                k,
                r,
            }
        })
        // console.log('parforCore rs', rs)
    
        return rs
    }
    
    export default parforCore
    `
    if (fs.existsSync(fpPmSeries)) {
        fpPmSeries = pathResolve(fpPmSeries)
    }
    else {
        fpPmSeries = fpPmSeries.replace('./', 'w-package-tools/')
    }
    c = c.replace('{fpPmSeries}', fpPmSeries)
    c = c.replace('{fpCore}', pathResolve(fpCore))
    return c
}


function genParforCode(fpWpf, fpParforCore) {
    let c = `
    import get from 'lodash-es/get'
    import each from 'lodash-es/each'
    import size from 'lodash-es/size'
    import w from '{fpWpf}'
    import parforCore from '{fpParforCore}'
    
    async function parfor(pgs, opt = {}) {
    
        //cb
        let cb = get(opt, 'cb')
    
        //returnResult
        let returnResult = get(opt, 'returnResult')
        if (!w.isbol(returnResult)) {
            returnResult = false
        }
    
        //check
        if (!returnResult && !w.isfun(cb)) {
            return Promise.reject('cb is not a function, need to set opt.returnResult to true')
        }
    
        //takeLimit
        let takeLimit = get(opt, 'takeLimit')
        if (!w.ispint(takeLimit)) {
            takeLimit = 4
        }
        takeLimit = w.cint(takeLimit)
    
        //takeNumOfPgs
        let takeNumOfPgs = get(opt, 'takeNumOfPgs')
        if (!w.ispint(takeNumOfPgs)) {
            takeNumOfPgs = 1
        }
        takeNumOfPgs = w.cint(takeNumOfPgs)
    
        //arr
        let isPgsObj = false
        let arr = []
        if (w.iseobj(pgs)) {
            isPgsObj = true
            each(pgs, (v, k) => {
                arr.push({ v, k })
            })
        }
        else if (w.isearr(pgs)) {
            each(pgs, (v, k) => {
                arr.push({ v, k })
            })
        }
        else {
            throw new Error('pgs is not an effective array or object')
        }
        // console.log('arr', size(arr), arr)
    
        //n
        let n = size(arr)
    
        //gpgs, takeNumOfPgs
        // let m = 0
        let gpgs = []
        for (let i = 0; i < n; i += takeNumOfPgs) {
            let pgs = []
            for (let j = 0; j < takeNumOfPgs; j++) {
                let k = i + j
                if (k < n) {
                    // m++
                    pgs.push(arr[k])
                }
            }
            gpgs.push(pgs)
        }
        // console.log('gpgs', size(gpgs), gpgs)
    
        //rs
        let rs = null
        if (returnResult) {
            if (isPgsObj) {
                rs = {}
            }
            else {
                rs = []
            }
        }
    
        //pmMap
        await w.pmMap(gpgs, async (pgs, kpgs) => {
            // console.log('pmMap', pgs, kpgs)
    
            //call fun
            let prs = await parforCore(pgs)
            // console.log('prs', prs)
    
            //save
            if (returnResult) {
                each(prs, (pr, kpr) => {
                    rs[pr.k] = pr.r //obj或arr都適用
                })
            }
    
            //call cb
            if (w.isfun(cb)) {
                each(prs, (pr, kpr) => {
                    cb(pr.r, pr.k)
                })
            }
    
        }, takeLimit)
    
        return rs
    }
    
    export default parfor
    `
    if (fs.existsSync(fpWpf)) {
        fpWpf = pathResolve(fpWpf)
    }
    else {
        fpWpf = fpWpf.replace('./', 'w-package-tools/')
    }
    c = c.replace('{fpWpf}', fpWpf)
    c = c.replace('{fpParforCore}', pathResolve(fpParforCore))
    return c
}


/**
 * 使用rollup編譯外部指定的核心分析程式碼檔案，並封裝至前端web worker與後端worker內
 *
 * @param {Object} opt 輸入設定物件
 * @param {String} opt.name 輸入模組名稱字串，將來會掛於winodw下或於node引入使用
 * @param {String} [opt.type='object'] 輸入模組類型字串，可選'function'、'object'。若使用'function'，於初始化後可呼叫terminate銷毀；若使用'object'，預設execObjectFunsByInstance為true，執行完指定函數後亦自動銷毀，若改execObjectFunsByInstance為false，就一樣得於初始化後呼叫terminate銷毀。回傳函數或物件。編譯後會掛載模組名稱至window下，若type使用'function'時則window['模組名稱']為函數，得自己初始化才能呼叫其內函數或監聽事件；若type使用'object'時則window['模組名稱']為物件，可直接呼叫其內函數預設'object'
 * @param {Array} opt.funNames 輸入模組可被呼叫的函數名稱陣列
 * @param {Array} [opt.evNames=[]] 輸入模組可監聽的函數名稱陣列，預設[]
 * @param {String} opt.fpSrc 輸入原始碼檔案位置字串
 * @param {String} opt.fpTar 輸入編譯完程式碼檔案儲存位置字串
 * @param {String} [opt.nameDistType=''] 輸入編譯檔案名稱格式字串，可選'kebabCase'，預設''
 * @param {Function} [opt.hookNameDist=null]  輸入強制指定編譯檔案名稱函數，預設null，會複寫nameDistType之處理結果
 * @param {String} [opt.formatOut='es'] 輸入欲編譯成js格式字串，可選'umd'、'iife'、'es'，預設'es'
 * @param {String} [opt.targets='new'] 輸入編譯等級字串，可選'new'、'old'，預設'new'
 * @param {Boolean} [opt.execFunctionByInstance=true] 輸入若模組類型為物件type='function'時，是否將function視為使用獨立實體執行並自動銷毀實體布林值，例如原模組就是一個運算函數，不需要回傳eventemmitter監聽事件，預設true
 * @param {Boolean} [opt.execObjectFunsByInstance=true] 輸入若模組類型為物件type='object'時，各函式是否使用獨立實體執行布林值，例如使用到stream的各函式會因共用同一個實體導致降速，故各函數需自動有各自實體，預設true
 * @param {Boolean} [opt.bNodePolyfill=false] 輸入當bNode為true時，編譯是否自動加入node polyfill布林值，主要把node專用語法(例如fs)轉為瀏覽器端語法，預設true
 * @param {Boolean} [opt.bMinify=true] 輸入編譯檔案是否進行壓縮布林值，預設true
 * @param {Boolean} [opt.keepFnames=false] 輸入當編譯檔案需壓縮時，是否保留函數名稱布林值，預設false
 * @param {Array} [opt.mangleReserved=[]] 輸入當編譯檔案需壓縮時，需保留函數名稱或變數名稱布林值，預設[]
 * @param {Boolean} [opt.bLog=true] 輸入是否顯示預設log布林值，預設true
 */
async function rollupParfor(opt = {}) {
    //欲編譯檔案需使用es6模組語法, 輸出格式為export default, 輸出需為物件, 該物件給予任意可執行之async函數, 打包後會於web worker內執行, 並再把全部async函數映射出來至指定物件當中, 故可採一樣(未封裝前)方式執行

    //name
    let name = _.get(opt, 'name', null)
    if (!w.isestr(name)) {
        return Promise.reject('invalid opt.name')
    }

    //fpSrc
    let fpSrc = _.get(opt, 'fpSrc', null)
    if (!w.fsIsFile(fpSrc)) {
        return Promise.reject('opt.fpSrc is not file')
    }

    //fpTar
    let fpTar = _.get(opt, 'fpTar', null)
    if (!w.isestr(fpTar)) {
        return Promise.reject('invalid opt.fpTar')
    }

    //type
    let type = _.get(opt, 'type', null)
    if (w.isestr(type) && type !== 'function') {
        return Promise.reject(`opt.type need to set 'function'`)
    }

    //bLog
    let bLog = _.get(opt, 'bLog', null)
    if (!w.isbol(bLog)) {
        bLog = true
    }

    //console
    if (bLog) {
        console.log('transpiling: ' + w.getFileName(fpSrc))
    }

    //輔助函數
    let fpWpfPmSeries = `./src/wpf_pmSeries.umd.js`
    let fpWpf = `./src/wpf.umd.js`

    //id
    let id = w.genID()
    let fpTempParforCoreSrc = `./temp-${id}-parforCore-src.mjs`
    let fpTempParforCoreTar = `./temp-${id}-parforCore-tar.wk.umd.js`
    let fpTempParforSrc = `./temp-${id}-parfor-src.mjs`

    async function core() {

        //codeParforCore, 產生並儲存parforCore程式碼
        let codeParforCore = genParforCoreCode(fpWpfPmSeries, fpSrc)
        fs.writeFileSync(fpTempParforCoreSrc, codeParforCore, 'utf8')

        //編譯parforCore
        await rollupWorker({
            ...opt,
            name: 'parforCore', //一定要為parforCore, worker內會使用同名函數做繫節, 故不能更換, 除非改genParforCoreCode內的函數parforCore名稱
            type: 'function', //原模組輸出為函數, 可傳入參數初始化
            execFunctionByInstance: true, //原模組為計算函數回傳結果
            fpSrc: fpTempParforCoreSrc,
            fpTar: fpTempParforCoreTar,
            // formatOut: 'es', //由外部決定
            // bMinify: false, //由外部決定
            bLog: false,
        })

        //codeParfor, 產生並儲存parfor程式碼
        let codeParfor = genParforCode(fpWpf, fpTempParforCoreTar)
        fs.writeFileSync(fpTempParforSrc, codeParfor, 'utf8')

        ///編譯parfor
        let codeRes = await rollupFile({
            ...opt,
            fpSrc: fpTempParforSrc,
            fdSrc: './',
            // fdTar, //不給就是直接回傳code
            hookNameDist: () => {
                return name //指定編譯名稱
            },
            bBanner: false,
            bSourcemap: false, //rollupParfor不提供sourcemap
            globals: { //因有已包含Nodejs與瀏覽器的worker封裝, 故需指定剔除Nodejs的worker的引用
                'worker_threads': 'worker_threads',
            },
            external: [
                'worker_threads',
            ],
            // formatOut: 'es', //由外部決定
            // bMinify: false, //由外部決定
            bLog: false,
        })

        //writeFileSync
        fs.writeFileSync(fpTar, codeRes, 'utf8')

        //console
        if (bLog) {
            console.log('\x1b[32m%s\x1b[0m', 'output: ' + w.getFileName(fpTar))
        }

    }

    //core
    await core()
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {

            //unlinkSync, 不論編譯成功失敗都刪除檔案
            try {
                fs.unlinkSync(fpTempParforCoreSrc)
            }
            catch (err) {
                console.log(err)
            }
            try {
                fs.unlinkSync(fpTempParforCoreTar)
            }
            catch (err) {
                console.log(err)
            }
            try {
                fs.unlinkSync(fpTempParforSrc)
            }
            catch (err) {
                console.log(err)
            }

        })

}


export default rollupParfor
