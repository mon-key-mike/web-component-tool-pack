!function(n,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r():"function"==typeof define&&define.amd?define(r):(n="undefined"!=typeof globalThis?globalThis:n||self).gAsync2=r()}(this,(function(){"use strict";var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},r="object"==typeof n&&n&&n.Object===Object&&n,t="object"==typeof self&&self&&self.Object===Object&&self,e=(r||t||Function("return this")()).Symbol;var f=function(n,r){for(var t=-1,e=null==n?0:n.length,f=Array(e);++t<e;)f[t]=r(n[t],t,n);return f},u=Array.isArray,o=Object.prototype,i=o.hasOwnProperty,a=o.toString,c=e?e.toStringTag:void 0;var l=function(n){var r=i.call(n,c),t=n[c];try{n[c]=void 0;var e=!0}catch(n){}var f=a.call(n);return e&&(r?n[c]=t:delete n[c]),f},d=Object.prototype.toString;var v=function(n){return d.call(n)},s=e?e.toStringTag:void 0;var g=function(n){return null==n?void 0===n?"[object Undefined]":"[object Null]":s&&s in Object(n)?l(n):v(n)};var y=function(n){return null!=n&&"object"==typeof n};var b=function(n){return"symbol"==typeof n||y(n)&&"[object Symbol]"==g(n)},p=e?e.prototype:void 0,h=p?p.toString:void 0;var j=function n(r){if("string"==typeof r)return r;if(u(r))return f(r,n)+"";if(b(r))return h?h.call(r):"";var t=r+"";return"0"==t&&1/r==-Infinity?"-0":t},m=/\s/;var A=function(n){for(var r=n.length;r--&&m.test(n.charAt(r)););return r},O=/^\s+/;var S=function(n){return n?n.slice(0,A(n)+1).replace(O,""):n};var T=function(n,r,t){var e=-1,f=n.length;r<0&&(r=-r>f?0:f+r),(t=t>f?f:t)<0&&(t+=f),f=r>t?0:t-r>>>0,r>>>=0;for(var u=Array(f);++e<f;)u[e]=n[e+r];return u};var w=function(n,r,t){var e=n.length;return t=void 0===t?e:t,!r&&t>=e?n:T(n,r,t)};var x=function(n,r,t,e){for(var f=n.length,u=t+(e?1:-1);e?u--:++u<f;)if(r(n[u],u,n))return u;return-1};var E=function(n){return n!=n};var P=function(n,r,t){for(var e=t-1,f=n.length;++e<f;)if(n[e]===r)return e;return-1};var R=function(n,r,t){return r==r?P(n,r,t):x(n,E,t)};var F=function(n,r){for(var t=n.length;t--&&R(r,n[t],0)>-1;);return t};var I=function(n,r){for(var t=-1,e=n.length;++t<e&&R(r,n[t],0)>-1;);return t};var N=function(n){return n.split("")},U=RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]");var k=function(n){return U.test(n)},q="[\\ud800-\\udfff]",z="[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]",B="\\ud83c[\\udffb-\\udfff]",C="[^\\ud800-\\udfff]",D="(?:\\ud83c[\\udde6-\\uddff]){2}",G="[\\ud800-\\udbff][\\udc00-\\udfff]",H="(?:"+z+"|"+B+")"+"?",J="[\\ufe0e\\ufe0f]?",K=J+H+("(?:\\u200d(?:"+[C,D,G].join("|")+")"+J+H+")*"),L="(?:"+[C+z+"?",z,D,G,q].join("|")+")",M=RegExp(B+"(?="+B+")|"+L+K,"g");var Q=function(n){return n.match(M)||[]};var V=function(n){return k(n)?Q(n):N(n)};var W=function(n){return null==n?"":j(n)};var X=function(n,r,t){if((n=W(n))&&(t||void 0===r))return S(n);if(!n||!(r=j(r)))return n;var e=V(n),f=V(r),u=I(e,f),o=F(e,f)+1;return w(e,u,o).join("")};return async function(){let n={a:1,b:2.2,c:"*",d:X(" trim me ")},r=()=>({m:n.a,n:n.b});return new Promise(((t,e)=>{setTimeout((()=>{console.log("gAsync1 data=",n),console.log("gAsync1 f()=",r()),t({name:"gAsync1",data:n,fr:r()})}),300)}))}}));
