/*!
 * gVue1 v1.0.70
 * (c) 2018-2021 yuda-lyu(semisphere)
 * Released under the MIT License.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.gVue1 = factory());
})(this, (function () { 'use strict';

    //
    //
    //
    //
    //
    //
    //

    // import trim from 'lodash-es/trim'

    var script = {
        components: {
        },
        props: {
            pathItems: {
                type: Array,
                default: () => [ //array function
                    'src:aaa',
                ],
            },
            opt: {
                type: Object,
                default: () => {}, //array function
            },
            height: {
                type: Number,
                default: 300
            },
            filterall: {
                type: String,
                default: ''
            },
        },
        data: function() {
            return {
                name: 'name',
            }
        },
        mounted: () => {
            console.log('mounted');
        },
        computed: {
        },
        methods: {
            testArrFun: () => { //array function
                console.log('testArrFun');
            },
            testAsyncFun1: async () => { //async function
                console.log('testAsyncFun1');
                let name = 'testAsyncFun1 xyz';
                let c = ` testAsyncFun1 a ${name} b `;
                console.log((c));
            },
            testAsyncFun2: () => { //async function
                console.log('testAsyncFun2');
                async function core() {
                    let name = 'testAsyncFun2 xyz';
                    let c = ` testAsyncFun2 a ${name} b `;
                    console.log((c));
                }
                core()
                    .catch(() => {});
            },
            async testAsyncFun3() { //async function
                await (() => {
                    return new Promise(resolve => { //promise
                        setTimeout(() => {
                            window.console.log('testAsyncFun3');
                            resolve();
                        }, 3000);
                    })
                })();
            },
        },
    };

    function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
      }
      // Vue.extend constructor export interop.
      const options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
          options.functional = true;
        }
      }
      // scopedId
      if (scopeId) {
        options._scopeId = scopeId;
      }
      let hook;
      if (moduleIdentifier) {
        // server build
        hook = function (context) {
          // 2.3 injection
          context = context ||
          // cached call
          this.$vnode && this.$vnode.ssrContext ||
          // stateful
          this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
      } else if (style) {
        hook = shadowMode ? function (context) {
          style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function (context) {
          style.call(this, createInjector(context));
        };
      }
      if (hook) {
        if (options.functional) {
          // register for functional component in vue file
          const originalRender = options.render;
          options.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          // inject component registration as beforeCreate hook
          const existing = options.beforeCreate;
          options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
      return script;
    }

    const isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    function createInjector(context) {
      return (id, style) => addStyle(id, style);
    }
    let HEAD;
    const styles = {};
    function addStyle(id, css) {
      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = {
        ids: new Set(),
        styles: []
      });
      if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
          // http://stackoverflow.com/a/26603875
          code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
        }
        if (!style.element) {
          style.element = document.createElement('style');
          style.element.type = 'text/css';
          if (css.media) style.element.setAttribute('media', css.media);
          if (HEAD === undefined) {
            HEAD = document.head || document.getElementsByTagName('head')[0];
          }
          HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
          style.styles.push(code);
          style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
        } else {
          const index = style.ids.size - 1;
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
        }
      }
    }

    /* script */
    const __vue_script__ = script;

    /* template */
    var __vue_render__ = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", [
        _c("div", { on: { click: _vm.testArrFun } }, [_vm._v("aaa")]),
        _vm._v(" "),
        _c("div", { attrs: { a: "abc-" + _vm.name } }, [_vm._v(_vm._s(_vm.name))])
      ])
    };
    var __vue_staticRenderFns__ = [];
    __vue_render__._withStripped = true;

      /* style */
      const __vue_inject_styles__ = function (inject) {
        if (!inject) return
        inject("data-v-16774789_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"gVue1.vue"}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__ = "data-v-16774789";
      /* module identifier */
      const __vue_module_identifier__ = undefined;
      /* functional template */
      const __vue_is_functional_template__ = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__ = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
        __vue_inject_styles__,
        __vue_script__,
        __vue_scope_id__,
        __vue_is_functional_template__,
        __vue_module_identifier__,
        false,
        createInjector,
        undefined,
        undefined
      );

    return __vue_component__;

}));
