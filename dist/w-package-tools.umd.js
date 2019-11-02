/*!
 * w-package-tools v1.0.11
 * (c) 2018-2019 yuda-lyu(semisphere)
 * Released under the MIT License.
 */
!function(n,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("lodash"),require("fs")):"function"==typeof define&&define.amd?define(["exports","lodash","fs"],e):e((n=n||self)["w-package-tools"]={},n.lodash,n.fs)}(this,(function(n,e,t){"use strict";function r(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"./package.json",e=t.readFileSync(n,"utf8");return JSON.parse(e)}function i(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"./package.json",r=JSON.stringify(n,null,2);t.writeFileSync(e,r,"utf8")}function o(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"./README.md",r=t.readFileSync(n,"utf8");return{content:r,lines:e.split(r,"\r\n")}}e=e&&e.hasOwnProperty("default")?e.default:e,t=t&&t.hasOwnProperty("default")?t.default:t,n.addVersion=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"./package.json",t=r(n),o=t.version,c=e.split(o,".");c[2]=e.toString(e.toNumber(c[2])+1),t.version=e.join(c,"."),i(t,n),console.log("now version: "+t.version)},n.cleanFolder=function(n){t.existsSync(n)?t.readdirSync(n).forEach((function(e,r){var i=n+"/"+e;t.lstatSync(i).isDirectory()?function n(e){t.readdirSync(e).forEach((function(r,i){var o=e+"/"+r;t.lstatSync(o).isDirectory()?n(o):t.unlinkSync(o)})),t.rmdirSync(e)}(i):t.unlinkSync(i)})):t.mkdirSync(n)},n.deleteFolder=function n(e){t.existsSync(e)&&(t.readdirSync(e).forEach((function(r,i){var o=e+"/"+r;t.lstatSync(o).isDirectory()?n(o):t.unlinkSync(o)})),t.rmdirSync(e))},n.getFiles=function(n){if(!t.existsSync(n))return[];var e=t.readdirSync(n,{withFileTypes:!0});return e=(e=e.filter((function(n){return!n.isDirectory()}))).map((function(n){return n.name}))},n.getPks=r,n.getReadme=o,n.modifyReadme=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"./README.md",e=r(arguments.length>1&&void 0!==arguments[1]?arguments[1]:"./package.json"),i=o(n),c="(".concat(e.name,"@)+(\\d+.\\d+.\\d+)"),a="".concat(e.name,"@").concat(e.version),s=new RegExp(c,"g"),u=i.content.replace(s,a);t.writeFileSync(n,u,"utf8")},n.pmSeries=function(n,e){return new Promise((function(t,r){n.reduce((function(n,t){return n.then((function(n){return e(t)}))}),Promise.resolve()).then((function(){t()})).catch((function(n){r(n)}))}))},n.setPks=i,Object.defineProperty(n,"__esModule",{value:!0})}));
//# sourceMappingURL=w-package-tools.umd.js.map
