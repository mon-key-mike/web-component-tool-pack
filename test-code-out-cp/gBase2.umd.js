!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).gBase2=t()}(this,(function(){"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(t){var o=function(t,o){if("object"!==e(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,o||"default");if("object"!==e(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===o?String:Number)(t)}(t,"string");return"symbol"===e(o)?o:String(o)}function o(e,o,r){return(o=t(o))in e?Object.defineProperty(e,o,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[o]=r,e}function r(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}function n(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}return function(){let e={a:1,b:2.2};e=n(n({},e),{},{c:"abc&xyz:12.34"}),new Promise(((e,t)=>{setTimeout((()=>{e("gBase2 foo")}),300)})).then((e=>{console.log(e)})),async function(){await async function(){return Promise.reject("reject")}()}().then((e=>{console.log("aaa testAsync resolve",e)})).catch((e=>{console.log("aaa testAsync reject",e)})),console.log("gBase2 objData=",e),console.log("gBase2 testLongName()=","ttt:5678")}}));
