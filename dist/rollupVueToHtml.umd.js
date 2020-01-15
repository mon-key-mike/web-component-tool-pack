/*!
 * rollupVueToHtml v1.0.21
 * (c) 2018-2019 yuda-lyu(semisphere)
 * Released under the MIT License.
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("fs"),require("lodash"),require("path"),require("rollup"),require("rollup-plugin-vue"),require("@rollup/plugin-commonjs"),require("@rollup/plugin-node-resolve"),require("rollup-plugin-postcss"),require("rollup-plugin-babel"),require("@rollup/plugin-replace"),require("rollup-plugin-terser")):"function"==typeof define&&define.amd?define(["fs","lodash","path","rollup","rollup-plugin-vue","@rollup/plugin-commonjs","@rollup/plugin-node-resolve","rollup-plugin-postcss","rollup-plugin-babel","@rollup/plugin-replace","rollup-plugin-terser"],e):(t=t||self).rollupVueToHtml=e(t.fs,t.lodash,t.path,t.rollup,t["rollup-plugin-vue"],t["@rollup/plugin-commonjs"],t["@rollup/plugin-node-resolve"],t["rollup-plugin-postcss"],t["rollup-plugin-babel"],t["@rollup/plugin-replace"],t["rollup-plugin-terser"])}(this,(function(t,e,r,n,o,i,a,u,c,l,s){"use strict";function p(t){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}t=t&&t.hasOwnProperty("default")?t.default:t,e=e&&e.hasOwnProperty("default")?e.default:e,r=r&&r.hasOwnProperty("default")?r.default:r,n=n&&n.hasOwnProperty("default")?n.default:n,o=o&&o.hasOwnProperty("default")?o.default:o,i=i&&i.hasOwnProperty("default")?i.default:i,a=a&&a.hasOwnProperty("default")?a.default:a,u=u&&u.hasOwnProperty("default")?u.default:u,c=c&&c.hasOwnProperty("default")?c.default:c,l=l&&l.hasOwnProperty("default")?l.default:l,s=s&&s.hasOwnProperty("default")?s.default:s;var f=function(t,e){return t(e={exports:{}},e.exports),e.exports}((function(t){var e=function(t){var e,r=Object.prototype,n=r.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",u=o.toStringTag||"@@toStringTag";function c(t,e,r,n){var o=e&&e.prototype instanceof v?e:v,i=Object.create(o.prototype),a=new k(n||[]);return i._invoke=function(t,e,r){var n=s;return function(o,i){if(n===h)throw new Error("Generator is already running");if(n===d){if("throw"===o)throw i;return T()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var u=P(a,r);if(u){if(u===y)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===s)throw n=d,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=h;var c=l(t,e,r);if("normal"===c.type){if(n=r.done?d:f,c.arg===y)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=d,r.method="throw",r.arg=c.arg)}}}(t,r,a),i}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=c;var s="suspendedStart",f="suspendedYield",h="executing",d="completed",y={};function v(){}function g(){}function m(){}var w={};w[i]=function(){return this};var b=Object.getPrototypeOf,x=b&&b(b(_([])));x&&x!==r&&n.call(x,i)&&(w=x);var O=m.prototype=v.prototype=Object.create(w);function j(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function S(t){var e;this._invoke=function(r,o){function i(){return new Promise((function(e,i){!function e(r,o,i,a){var u=l(t[r],t,o);if("throw"!==u.type){var c=u.arg,s=c.value;return s&&"object"===p(s)&&n.call(s,"__await")?Promise.resolve(s.__await).then((function(t){e("next",t,i,a)}),(function(t){e("throw",t,i,a)})):Promise.resolve(s).then((function(t){c.value=t,i(c)}),(function(t){return e("throw",t,i,a)}))}a(u.arg)}(r,o,e,i)}))}return e=e?e.then(i,i):i()}}function P(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=e,P(t,r),"throw"===r.method))return y;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return y}var o=l(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,y;var i=o.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,y):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,y)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function E(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function k(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function _(t){if(t){var r=t[i];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function r(){for(;++o<t.length;)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}return{next:T}}function T(){return{value:e,done:!0}}return g.prototype=O.constructor=m,m.constructor=g,m[u]=g.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===g||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,u in t||(t[u]="GeneratorFunction")),t.prototype=Object.create(O),t},t.awrap=function(t){return{__await:t}},j(S.prototype),S.prototype[a]=function(){return this},t.AsyncIterator=S,t.async=function(e,r,n,o){var i=new S(c(e,r,n,o));return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},j(O),O[u]="Generator",O[i]=function(){return this},O.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=_,k.prototype={constructor:k,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(E),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return u.type="throw",u.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],u=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var c=n.call(a,"catchLoc"),l=n.call(a,"finallyLoc");if(c&&l){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,y):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),y},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),E(r),y}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;E(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:_(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),y}},t}(t.exports);try{regeneratorRuntime=e}catch(t){Function("r","regeneratorRuntime = r")(e)}}));function h(t,e,r,n,o,i,a){try{var u=t[i](a),c=u.value}catch(t){return void r(t)}u.done?e(c):Promise.resolve(c).then(n,o)}var d=function(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){h(i,n,o,a,u,"next",t)}function u(t){h(i,n,o,a,u,"throw",t)}a(void 0)}))}};function y(t){return t=function(t){return t=(t=t.replace(/\\/g,r.sep)).replace(/\//g,r.sep)}(t),e.split(t,r.sep)}function v(n){var o=y(n),i=[];e.each(o,(function(n){i.push(n+r.sep);var o=e.join(i,"");n.indexOf(":")<0&&(t.existsSync(o)||t.mkdirSync(o))}))}var g=function(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t};function m(t,e){return new Promise((function(r,n){t.reduce((function(t,r){return t.then((function(t){return e(r)}))}),Promise.resolve()).then((function(){r()})).catch((function(t){n(t)}))}))}function w(e){t.existsSync(e)?t.readdirSync(e).forEach((function(r,n){var o=e+"/"+r;t.lstatSync(o).isDirectory()?function e(r){t.readdirSync(r).forEach((function(n,o){var i=r+"/"+n;t.lstatSync(i).isDirectory()?e(i):t.unlinkSync(i)})),t.rmdirSync(r)}(o):t.unlinkSync(o)})):t.mkdirSync(e)}function b(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"./package.json",r=t.readFileSync(e,"utf8");return JSON.parse(r)}function x(){return O.apply(this,arguments)}function O(){return(O=d(f.mark((function t(){var p,h,d,y,v,g,m,w,x,O,j,S,P,L,E,k,_,T,q,D,N,F,G,R,I,A,C,H,V=arguments;return f.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return p=V.length>0&&void 0!==V[0]?V[0]:{},console.log("compiling: "+p.fn),h=b(),d=void 0,y=p.fn,(v=p.fdSrc).substr(v.length-1,1)!==r.sep&&(v=v+=r.sep),(g=p.fdTar).substr(g.length-1,1)!==r.sep&&(g=g+=r.sep),m=e.split(y,"."),w=y,m.length>=2&&(w=e.join(e.dropRight(m),".")),x=e.last(m),O=p.nameDistType,j=w,"kebabCase"===O&&(j=e.kebabCase(w)),S=p.hookNameDist,e.isFunction(S)&&(j=S(j,w,y)),(P=p.format)||(P="umd"),(L=p.license)||(L="MIT"),E=!1!==(E=p.bSourcemap),k=p.bBanner,_=null,!1!==k&&(_="/*!\n * ".concat(j," v").concat(h.version,"\n * (c) 2018-2019 ").concat(h.author,"\n * Released under the ").concat(L," License.\n */")),T=_,q=!1!==(q=p.bMinify),D=p.globals,N=p.external,F=[],"vue"===x&&F.push(o()),F.push(l({undefined:JSON.stringify(d)})),F.push(i()),F.push(a({preferBuiltins:!1,browser:!0})),F.push(c({runtimeHelpers:!0,presets:[["@babel/preset-env",{useBuiltIns:"entry",corejs:3}]]})),F.push(u({extensions:[".css"]})),q&&F.push(s.terser()),G="".concat(v).concat(y),R="".concat(g).concat(j,".").concat(P,".js"),I={external:N,input:G,plugins:F},A={banner:T,globals:D,format:P,name:j,file:R,sourcemap:E,sourcemapExcludeSources:!0},t.next=46,n.rollup(I);case 46:return C=t.sent,t.next=49,C.write(A);case 49:return H=t.sent,console.log("[32m%s[0m","output: "+"".concat(j,".").concat(P,".js")),t.abrupt("return",H);case 52:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function j(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function S(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?j(Object(r),!0).forEach((function(e){g(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):j(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function P(){return L.apply(this,arguments)}function L(){return(L=d(f.mark((function t(){var r,n,o=arguments;return f.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return w((r=o.length>0&&void 0!==o[0]?o[0]:{}).fdTar),n=r.fns,e.isString(n)&&(n=[n]),t.abrupt("return",m(n,(function(t){var e=S({},r);return e.fn=t,x(e)})).then().catch((function(t){console.log(t)})));case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function E(){return(E=d(f.mark((function r(){var n,o,i,a,u,c,l,s,p,h,d,y,g,m,w,b,x=arguments;return f.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n=x.length>0&&void 0!==x[0]?x[0]:"./src/App.vue",o=x.length>1&&void 0!==x[1]?x[1]:"./docs/examples/app.html",i=x.length>2&&void 0!==x[2]?x[2]:{},a=e.split(n,"/"),u=e.split(o,"/"),c=e.join(e.dropRight(a),"/")+"/",l=e.join(e.dropRight(u),"/")+"/",s=e.last(a),p=e.head(e.split(e.last(u),".")),h=e.get(i,"title",""),d=e.get(i,"htmlLang","zh-tw"),y=e.get(i,"head",""),g=e.get(i,"newVue",""),m=e.get(i,"globals",{}),w=e.get(i,"external",[]),b='\n<!DOCTYPE html>\n<html xmlns="http://www.w3.org/1999/xhtml" lang="'.concat(d,'">\n<head>\n    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">\n    <title>').concat(h,'</title>\n\n    \x3c!-- @babel/polyfill --\x3e\n    <script nomodule src="https://cdn.jsdelivr.net/npm/@babel/polyfill/dist/polyfill.min.js"><\/script>\n\n    \x3c!-- vue --\x3e\n    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js"><\/script>\n\n    ').concat(y,"\n\n    \x3c!-- ").concat(p,' --\x3e\n    <script src="').concat(p,".umd.js?").concat(Date.now(),"\"><\/script>\n\n</head>\n<body style=\"font-family:'Microsoft JhengHei','Avenir','Helvetica'; padding:0px; margin:0px;\">\n\n    <div id=\"app\">\n        <w-app></w-app>\n    </div>\n\n    <script>\n\n        //install app\n        Vue.component('w-app',").concat(p,")\n\n        //initialize\n        new Vue({\n            el: '#app',\n            ").concat(g,"\n        })\n\n    <\/script>\n\n</body>\n</html>\n"),v(l),r.next=19,P({fns:"".concat(s),fdSrc:c,fdTar:l,nameDistType:"kebabCase",hookNameDist:function(){return p},globals:m,external:w});case 19:t.writeFileSync("".concat(l).concat(p,".html"),b,"utf8");case 20:case"end":return r.stop()}}),r)})))).apply(this,arguments)}return function(){return E.apply(this,arguments)}}));
//# sourceMappingURL=rollupVueToHtml.umd.js.map
