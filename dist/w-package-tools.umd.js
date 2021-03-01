/*!
 * w-package-tools v1.0.35
 * (c) 2018-2020 yuda-lyu(semisphere)
 * Released under the MIT License.
 */
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports,require("lodash"),require("fs")):"function"==typeof define&&define.amd?define(["exports","lodash","fs"],n):n((e="undefined"!=typeof globalThis?globalThis:e||self)["w-package-tools"]={},e.lodash,e.fs)}(this,(function(e,n,t){"use strict";function r(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var i=r(n),o=r(t);function u(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"./package.json",n=o.default.readFileSync(e,"utf8");return JSON.parse(n)}function a(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"./package.json",t=JSON.stringify(e,null,2);o.default.writeFileSync(n,t,"utf8")}function c(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"./README.md",n=o.default.readFileSync(e,"utf8");return{content:n,lines:i.default.split(n,"\r\n")}}function f(e){o.default.readdirSync(e).forEach((function(n,t){var r=e+"/"+n;o.default.lstatSync(r).isDirectory()?f(r):o.default.unlinkSync(r)})),o.default.rmdirSync(e)}function d(e,n){return function(e,n){return e.substr(0,n)}(e,e.length-n)}function l(e,n,t){for(var r=[],i=0;i<e.length;i++){var o=e[i];if(o.indexOf(n)>=0){var u=o.substring(o.indexOf(n)+n.length,o.length);r.push(u)}else if(r.length>0&&(r.push(o),o===t))break}return r.join("\r\n")}e.addVersion=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"./package.json",n=u(e),t=n.version,r=i.default.split(t,".");r[2]=i.default.toString(i.default.toNumber(r[2])+1),n.version=i.default.join(r,"."),a(n,e),console.log("now version: "+n.version)},e.cleanFolder=function(e){o.default.existsSync(e)?o.default.readdirSync(e).forEach((function(n,t){var r=e+"/"+n;o.default.lstatSync(r).isDirectory()?f(r):o.default.unlinkSync(r)})):o.default.mkdirSync(e)},e.createFolder=function(e){try{o.default.mkdirSync(e,{recursive:!0})}catch(e){console.log("createFolder catch",e)}},e.deleteFolder=function e(n){o.default.existsSync(n)&&(o.default.readdirSync(n).forEach((function(t,r){var i=n+"/"+t;o.default.lstatSync(i).isDirectory()?e(i):o.default.unlinkSync(i)})),o.default.rmdirSync(n))},e.getFiles=function(e){if(!o.default.existsSync(e))return[];var n=o.default.readdirSync(e,{withFileTypes:!0});return n=(n=n.filter((function(e){return!e.isDirectory()}))).map((function(e){return e.name}))},e.getPks=u,e.getReadme=c,e.modifyReadme=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"./README.md",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"./package.json",t=u(n),r=c(e),i="(".concat(t.name,"@)+(\\d+.\\d+.\\d+)"),a="".concat(t.name,"@").concat(t.version),f=new RegExp(i,"g"),d=r.content.replace(f,a);o.default.writeFileSync(e,d,"utf8")},e.parseVueCode=function(e){var n,t=e.split("\r\n");n=new RegExp("<template>[\\s\\S]+</template>","g");var r=e.match(n)[0],o=r.split("\r\n");o=i.default.drop(o,2),r=(o=i.default.dropRight(o,2)).join("\r\n");var u=l(t,"data: function() {","    },");u=u?d(u="function() {"+u,1):"function() { return {} }";var a=l(t,"mounted: function() {","    },");a=a?d(a="function() {"+a,1):"function() { return {} }";var c=l(t,"computed:","    },");c=c?d(c,1):"{}";var f=l(t,"methods:","    },");f=f?d(f,1):"{}";var s=l(t,"'actions':","            ],");return{tmp:r,data:u,mounted:a,computed:c,methods:f,action:s=s?d(s,1):"[]"}},e.pmSeries=function(e,n){return new Promise((function(t,r){e.reduce((function(e,t){return e.then((function(e){return n(t)}))}),Promise.resolve()).then((function(){t()})).catch((function(e){r(e)}))}))},e.setPks=a,Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=w-package-tools.umd.js.map
