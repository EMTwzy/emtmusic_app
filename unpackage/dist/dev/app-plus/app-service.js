if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const ON_LOAD = "onLoad";
  const ON_REACH_BOTTOM = "onReachBottom";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
  const onReachBottom = /* @__PURE__ */ createHook(ON_REACH_BOTTOM);
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const ComponentClass$1 = "uni-col";
  const _sfc_main$e = {
    name: "uniCol",
    props: {
      span: {
        type: Number,
        default: 24
      },
      offset: {
        type: Number,
        default: -1
      },
      pull: {
        type: Number,
        default: -1
      },
      push: {
        type: Number,
        default: -1
      },
      xs: [Number, Object],
      sm: [Number, Object],
      md: [Number, Object],
      lg: [Number, Object],
      xl: [Number, Object]
    },
    data() {
      return {
        gutter: 0,
        sizeClass: "",
        parentWidth: 0,
        nvueWidth: 0,
        marginLeft: 0,
        right: 0,
        left: 0
      };
    },
    created() {
      let parent = this.$parent;
      while (parent && parent.$options.componentName !== "uniRow") {
        parent = parent.$parent;
      }
      this.updateGutter(parent.gutter);
      parent.$watch("gutter", (gutter) => {
        this.updateGutter(gutter);
      });
    },
    computed: {
      sizeList() {
        let {
          span,
          offset,
          pull,
          push
        } = this;
        return {
          span,
          offset,
          pull,
          push
        };
      },
      pointClassList() {
        let classList = [];
        ["xs", "sm", "md", "lg", "xl"].forEach((point) => {
          const props = this[point];
          if (typeof props === "number") {
            classList.push(`${ComponentClass$1}-${point}-${props}`);
          } else if (typeof props === "object" && props) {
            Object.keys(props).forEach((pointProp) => {
              classList.push(
                pointProp === "span" ? `${ComponentClass$1}-${point}-${props[pointProp]}` : `${ComponentClass$1}-${point}-${pointProp}-${props[pointProp]}`
              );
            });
          }
        });
        return classList.join(" ");
      }
    },
    methods: {
      updateGutter(parentGutter) {
        parentGutter = Number(parentGutter);
        if (!isNaN(parentGutter)) {
          this.gutter = parentGutter / 2;
        }
      }
    },
    watch: {
      sizeList: {
        immediate: true,
        handler(newVal) {
          let classList = [];
          for (let size in newVal) {
            const curSize = newVal[size];
            if ((curSize || curSize === 0) && curSize !== -1) {
              classList.push(
                size === "span" ? `${ComponentClass$1}-${curSize}` : `${ComponentClass$1}-${size}-${curSize}`
              );
            }
          }
          this.sizeClass = classList.join(" ");
        }
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-col", $data.sizeClass, $options.pointClassList]),
        style: vue.normalizeStyle({
          paddingLeft: `${Number($data.gutter)}rpx`,
          paddingRight: `${Number($data.gutter)}rpx`
        })
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$6], ["__scopeId", "data-v-6ad5e460"], ["__file", "E:/程序夹/emtmusic_app/node_modules/@dcloudio/uni-ui/lib/uni-col/uni-col.vue"]]);
  const ComponentClass = "uni-row";
  const modifierSeparator = "--";
  const _sfc_main$d = {
    name: "uniRow",
    componentName: "uniRow",
    props: {
      type: String,
      gutter: Number,
      justify: {
        type: String,
        default: "start"
      },
      align: {
        type: String,
        default: "top"
      },
      // nvue如果使用span等属性，需要配置宽度
      width: {
        type: [String, Number],
        default: 750
      }
    },
    created() {
    },
    computed: {
      marginValue() {
        if (this.gutter) {
          return -(this.gutter / 2);
        }
        return 0;
      },
      typeClass() {
        return this.type === "flex" ? `${ComponentClass + modifierSeparator}flex` : "";
      },
      justifyClass() {
        return this.justify !== "start" ? `${ComponentClass + modifierSeparator}flex-justify-${this.justify}` : "";
      },
      alignClass() {
        return this.align !== "top" ? `${ComponentClass + modifierSeparator}flex-align-${this.align}` : "";
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-row", $options.typeClass, $options.justifyClass, $options.alignClass]),
        style: vue.normalizeStyle({
          marginLeft: `${Number($options.marginValue)}rpx`,
          marginRight: `${Number($options.marginValue)}rpx`
        })
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$5], ["__scopeId", "data-v-86edfd37"], ["__file", "E:/程序夹/emtmusic_app/node_modules/@dcloudio/uni-ui/lib/uni-row/uni-row.vue"]]);
  var isVue2 = false;
  function set(target, key, val) {
    if (Array.isArray(target)) {
      target.length = Math.max(target.length, key);
      target.splice(key, 1, val);
      return val;
    }
    target[key] = val;
    return val;
  }
  function del(target, key) {
    if (Array.isArray(target)) {
      target.splice(key, 1);
      return;
    }
    delete target[key];
  }
  function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
  }
  const isProxyAvailable = typeof Proxy === "function";
  const HOOK_SETUP = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
  let supported;
  let perf;
  function isPerformanceSupported() {
    var _a;
    if (supported !== void 0) {
      return supported;
    }
    if (typeof window !== "undefined" && window.performance) {
      supported = true;
      perf = window.performance;
    } else if (typeof global !== "undefined" && ((_a = global.perf_hooks) === null || _a === void 0 ? void 0 : _a.performance)) {
      supported = true;
      perf = global.perf_hooks.performance;
    } else {
      supported = false;
    }
    return supported;
  }
  function now() {
    return isPerformanceSupported() ? perf.now() : Date.now();
  }
  class ApiProxy {
    constructor(plugin, hook) {
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      const defaultSettings = {};
      if (plugin.settings) {
        for (const id in plugin.settings) {
          const item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
      let currentSettings = Object.assign({}, defaultSettings);
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data = JSON.parse(raw);
        Object.assign(currentSettings, data);
      } catch (e) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
          } catch (e) {
          }
          currentSettings = value;
        },
        now() {
          return now();
        }
      };
      if (hook) {
        hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
          if (pluginId === this.plugin.id) {
            this.fallbacks.setSettings(value);
          }
        });
      }
      this.proxiedOn = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop];
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop];
          } else if (prop === "on") {
            return this.proxiedOn;
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {
                }
              });
              return this.fallbacks[prop](...args);
            };
          } else {
            return (...args) => {
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve
                });
              });
            };
          }
        }
      });
    }
    async setRealTarget(target) {
      this.target = target;
      for (const item of this.onQueue) {
        this.target.on[item.method](...item.args);
      }
      for (const item of this.targetQueue) {
        item.resolve(await this.target[item.method](...item.args));
      }
    }
  }
  function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const descriptor = pluginDescriptor;
    const target = getTarget();
    const hook = getDevtoolsGlobalHook();
    const enableProxy = isProxyAvailable && descriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy(descriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor: descriptor,
        setupFn,
        proxy
      });
      if (proxy)
        setupFn(proxy.proxiedTarget);
    }
  }
  /*!
    * pinia v2.0.33
    * (c) 2023 Eduardo San Martin Morote
    * @license MIT
    */
  let activePinia;
  const setActivePinia = (pinia) => activePinia = pinia;
  const piniaSymbol = Symbol("pinia");
  function isPlainObject(o) {
    return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
  }
  var MutationType;
  (function(MutationType2) {
    MutationType2["direct"] = "direct";
    MutationType2["patchObject"] = "patch object";
    MutationType2["patchFunction"] = "patch function";
  })(MutationType || (MutationType = {}));
  const IS_CLIENT = typeof window !== "undefined";
  const USE_DEVTOOLS = IS_CLIENT;
  const _global = /* @__PURE__ */ (() => typeof window === "object" && window.window === window ? window : typeof self === "object" && self.self === self ? self : typeof global === "object" && global.global === global ? global : typeof globalThis === "object" ? globalThis : { HTMLElement: null })();
  function bom(blob, { autoBom = false } = {}) {
    if (autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
      return new Blob([String.fromCharCode(65279), blob], { type: blob.type });
    }
    return blob;
  }
  function download(url, name, opts) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.onload = function() {
      saveAs(xhr.response, name, opts);
    };
    xhr.onerror = function() {
      console.error("could not download file");
    };
    xhr.send();
  }
  function corsEnabled(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", url, false);
    try {
      xhr.send();
    } catch (e) {
    }
    return xhr.status >= 200 && xhr.status <= 299;
  }
  function click(node) {
    try {
      node.dispatchEvent(new MouseEvent("click"));
    } catch (e) {
      const evt = document.createEvent("MouseEvents");
      evt.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
      node.dispatchEvent(evt);
    }
  }
  const _navigator = typeof navigator === "object" ? navigator : { userAgent: "" };
  const isMacOSWebView = /* @__PURE__ */ (() => /Macintosh/.test(_navigator.userAgent) && /AppleWebKit/.test(_navigator.userAgent) && !/Safari/.test(_navigator.userAgent))();
  const saveAs = !IS_CLIENT ? () => {
  } : (
    // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
    typeof HTMLAnchorElement !== "undefined" && "download" in HTMLAnchorElement.prototype && !isMacOSWebView ? downloadSaveAs : (
      // Use msSaveOrOpenBlob as a second approach
      "msSaveOrOpenBlob" in _navigator ? msSaveAs : (
        // Fallback to using FileReader and a popup
        fileSaverSaveAs
      )
    )
  );
  function downloadSaveAs(blob, name = "download", opts) {
    const a = document.createElement("a");
    a.download = name;
    a.rel = "noopener";
    if (typeof blob === "string") {
      a.href = blob;
      if (a.origin !== location.origin) {
        if (corsEnabled(a.href)) {
          download(blob, name, opts);
        } else {
          a.target = "_blank";
          click(a);
        }
      } else {
        click(a);
      }
    } else {
      a.href = URL.createObjectURL(blob);
      setTimeout(function() {
        URL.revokeObjectURL(a.href);
      }, 4e4);
      setTimeout(function() {
        click(a);
      }, 0);
    }
  }
  function msSaveAs(blob, name = "download", opts) {
    if (typeof blob === "string") {
      if (corsEnabled(blob)) {
        download(blob, name, opts);
      } else {
        const a = document.createElement("a");
        a.href = blob;
        a.target = "_blank";
        setTimeout(function() {
          click(a);
        });
      }
    } else {
      navigator.msSaveOrOpenBlob(bom(blob, opts), name);
    }
  }
  function fileSaverSaveAs(blob, name, opts, popup) {
    popup = popup || open("", "_blank");
    if (popup) {
      popup.document.title = popup.document.body.innerText = "downloading...";
    }
    if (typeof blob === "string")
      return download(blob, name, opts);
    const force = blob.type === "application/octet-stream";
    const isSafari = /constructor/i.test(String(_global.HTMLElement)) || "safari" in _global;
    const isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);
    if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== "undefined") {
      const reader = new FileReader();
      reader.onloadend = function() {
        let url = reader.result;
        if (typeof url !== "string") {
          popup = null;
          throw new Error("Wrong reader.result type");
        }
        url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, "data:attachment/file;");
        if (popup) {
          popup.location.href = url;
        } else {
          location.assign(url);
        }
        popup = null;
      };
      reader.readAsDataURL(blob);
    } else {
      const url = URL.createObjectURL(blob);
      if (popup)
        popup.location.assign(url);
      else
        location.href = url;
      popup = null;
      setTimeout(function() {
        URL.revokeObjectURL(url);
      }, 4e4);
    }
  }
  function toastMessage(message, type) {
    const piniaMessage = "🍍 " + message;
    if (typeof __VUE_DEVTOOLS_TOAST__ === "function") {
      __VUE_DEVTOOLS_TOAST__(piniaMessage, type);
    } else if (type === "error") {
      console.error(piniaMessage);
    } else if (type === "warn") {
      console.warn(piniaMessage);
    } else {
      console.log(piniaMessage);
    }
  }
  function isPinia(o) {
    return "_a" in o && "install" in o;
  }
  function checkClipboardAccess() {
    if (!("clipboard" in navigator)) {
      toastMessage(`Your browser doesn't support the Clipboard API`, "error");
      return true;
    }
  }
  function checkNotFocusedError(error) {
    if (error instanceof Error && error.message.toLowerCase().includes("document is not focused")) {
      toastMessage('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn");
      return true;
    }
    return false;
  }
  async function actionGlobalCopyState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(pinia.state.value));
      toastMessage("Global state copied to clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to serialize the state. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalPasteState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      pinia.state.value = JSON.parse(await navigator.clipboard.readText());
      toastMessage("Global state pasted from clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to deserialize the state from clipboard. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalSaveState(pinia) {
    try {
      saveAs(new Blob([JSON.stringify(pinia.state.value)], {
        type: "text/plain;charset=utf-8"
      }), "pinia-state.json");
    } catch (error) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  let fileInput;
  function getFileOpener() {
    if (!fileInput) {
      fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".json";
    }
    function openFile() {
      return new Promise((resolve, reject) => {
        fileInput.onchange = async () => {
          const files = fileInput.files;
          if (!files)
            return resolve(null);
          const file = files.item(0);
          if (!file)
            return resolve(null);
          return resolve({ text: await file.text(), file });
        };
        fileInput.oncancel = () => resolve(null);
        fileInput.onerror = reject;
        fileInput.click();
      });
    }
    return openFile;
  }
  async function actionGlobalOpenStateFile(pinia) {
    try {
      const open2 = await getFileOpener();
      const result = await open2();
      if (!result)
        return;
      const { text, file } = result;
      pinia.state.value = JSON.parse(text);
      toastMessage(`Global state imported from "${file.name}".`);
    } catch (error) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  function formatDisplay(display) {
    return {
      _custom: {
        display
      }
    };
  }
  const PINIA_ROOT_LABEL = "🍍 Pinia (root)";
  const PINIA_ROOT_ID = "_root";
  function formatStoreForInspectorTree(store) {
    return isPinia(store) ? {
      id: PINIA_ROOT_ID,
      label: PINIA_ROOT_LABEL
    } : {
      id: store.$id,
      label: store.$id
    };
  }
  function formatStoreForInspectorState(store) {
    if (isPinia(store)) {
      const storeNames = Array.from(store._s.keys());
      const storeMap = store._s;
      const state2 = {
        state: storeNames.map((storeId) => ({
          editable: true,
          key: storeId,
          value: store.state.value[storeId]
        })),
        getters: storeNames.filter((id) => storeMap.get(id)._getters).map((id) => {
          const store2 = storeMap.get(id);
          return {
            editable: false,
            key: id,
            value: store2._getters.reduce((getters, key) => {
              getters[key] = store2[key];
              return getters;
            }, {})
          };
        })
      };
      return state2;
    }
    const state = {
      state: Object.keys(store.$state).map((key) => ({
        editable: true,
        key,
        value: store.$state[key]
      }))
    };
    if (store._getters && store._getters.length) {
      state.getters = store._getters.map((getterName) => ({
        editable: false,
        key: getterName,
        value: store[getterName]
      }));
    }
    if (store._customProperties.size) {
      state.customProperties = Array.from(store._customProperties).map((key) => ({
        editable: true,
        key,
        value: store[key]
      }));
    }
    return state;
  }
  function formatEventData(events) {
    if (!events)
      return {};
    if (Array.isArray(events)) {
      return events.reduce((data, event) => {
        data.keys.push(event.key);
        data.operations.push(event.type);
        data.oldValue[event.key] = event.oldValue;
        data.newValue[event.key] = event.newValue;
        return data;
      }, {
        oldValue: {},
        keys: [],
        operations: [],
        newValue: {}
      });
    } else {
      return {
        operation: formatDisplay(events.type),
        key: formatDisplay(events.key),
        oldValue: events.oldValue,
        newValue: events.newValue
      };
    }
  }
  function formatMutationType(type) {
    switch (type) {
      case MutationType.direct:
        return "mutation";
      case MutationType.patchFunction:
        return "$patch";
      case MutationType.patchObject:
        return "$patch";
      default:
        return "unknown";
    }
  }
  let isTimelineActive = true;
  const componentStateTypes = [];
  const MUTATIONS_LAYER_ID = "pinia:mutations";
  const INSPECTOR_ID = "pinia";
  const { assign: assign$1 } = Object;
  const getStoreType = (id) => "🍍 " + id;
  function registerPiniaDevtools(app, pinia) {
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app
    }, (api) => {
      if (typeof api.now !== "function") {
        toastMessage("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
      }
      api.addTimelineLayer({
        id: MUTATIONS_LAYER_ID,
        label: `Pinia 🍍`,
        color: 15064968
      });
      api.addInspector({
        id: INSPECTOR_ID,
        label: "Pinia 🍍",
        icon: "storage",
        treeFilterPlaceholder: "Search stores",
        actions: [
          {
            icon: "content_copy",
            action: () => {
              actionGlobalCopyState(pinia);
            },
            tooltip: "Serialize and copy the state"
          },
          {
            icon: "content_paste",
            action: async () => {
              await actionGlobalPasteState(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Replace the state with the content of your clipboard"
          },
          {
            icon: "save",
            action: () => {
              actionGlobalSaveState(pinia);
            },
            tooltip: "Save the state as a JSON file"
          },
          {
            icon: "folder_open",
            action: async () => {
              await actionGlobalOpenStateFile(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Import the state from a JSON file"
          }
        ],
        nodeActions: [
          {
            icon: "restore",
            tooltip: "Reset the state (option store only)",
            action: (nodeId) => {
              const store = pinia._s.get(nodeId);
              if (!store) {
                toastMessage(`Cannot reset "${nodeId}" store because it wasn't found.`, "warn");
              } else if (!store._isOptionsAPI) {
                toastMessage(`Cannot reset "${nodeId}" store because it's a setup store.`, "warn");
              } else {
                store.$reset();
                toastMessage(`Store "${nodeId}" reset.`);
              }
            }
          }
        ]
      });
      api.on.inspectComponent((payload, ctx) => {
        const proxy = payload.componentInstance && payload.componentInstance.proxy;
        if (proxy && proxy._pStores) {
          const piniaStores = payload.componentInstance.proxy._pStores;
          Object.values(piniaStores).forEach((store) => {
            payload.instanceData.state.push({
              type: getStoreType(store.$id),
              key: "state",
              editable: true,
              value: store._isOptionsAPI ? {
                _custom: {
                  value: vue.toRaw(store.$state),
                  actions: [
                    {
                      icon: "restore",
                      tooltip: "Reset the state of this store",
                      action: () => store.$reset()
                    }
                  ]
                }
              } : (
                // NOTE: workaround to unwrap transferred refs
                Object.keys(store.$state).reduce((state, key) => {
                  state[key] = store.$state[key];
                  return state;
                }, {})
              )
            });
            if (store._getters && store._getters.length) {
              payload.instanceData.state.push({
                type: getStoreType(store.$id),
                key: "getters",
                editable: false,
                value: store._getters.reduce((getters, key) => {
                  try {
                    getters[key] = store[key];
                  } catch (error) {
                    getters[key] = error;
                  }
                  return getters;
                }, {})
              });
            }
          });
        }
      });
      api.on.getInspectorTree((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          let stores = [pinia];
          stores = stores.concat(Array.from(pinia._s.values()));
          payload.rootNodes = (payload.filter ? stores.filter((store) => "$id" in store ? store.$id.toLowerCase().includes(payload.filter.toLowerCase()) : PINIA_ROOT_LABEL.toLowerCase().includes(payload.filter.toLowerCase())) : stores).map(formatStoreForInspectorTree);
        }
      });
      api.on.getInspectorState((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return;
          }
          if (inspectedStore) {
            payload.state = formatStoreForInspectorState(inspectedStore);
          }
        }
      });
      api.on.editInspectorState((payload, ctx) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return toastMessage(`store "${payload.nodeId}" not found`, "error");
          }
          const { path } = payload;
          if (!isPinia(inspectedStore)) {
            if (path.length !== 1 || !inspectedStore._customProperties.has(path[0]) || path[0] in inspectedStore.$state) {
              path.unshift("$state");
            }
          } else {
            path.unshift("state");
          }
          isTimelineActive = false;
          payload.set(inspectedStore, path, payload.state.value);
          isTimelineActive = true;
        }
      });
      api.on.editComponentState((payload) => {
        if (payload.type.startsWith("🍍")) {
          const storeId = payload.type.replace(/^🍍\s*/, "");
          const store = pinia._s.get(storeId);
          if (!store) {
            return toastMessage(`store "${storeId}" not found`, "error");
          }
          const { path } = payload;
          if (path[0] !== "state") {
            return toastMessage(`Invalid path for store "${storeId}":
${path}
Only state can be modified.`);
          }
          path[0] = "$state";
          isTimelineActive = false;
          payload.set(store, path, payload.state.value);
          isTimelineActive = true;
        }
      });
    });
  }
  function addStoreToDevtools(app, store) {
    if (!componentStateTypes.includes(getStoreType(store.$id))) {
      componentStateTypes.push(getStoreType(store.$id));
    }
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app,
      settings: {
        logStoreChanges: {
          label: "Notify about new/deleted stores",
          type: "boolean",
          defaultValue: true
        }
        // useEmojis: {
        //   label: 'Use emojis in messages ⚡️',
        //   type: 'boolean',
        //   defaultValue: true,
        // },
      }
    }, (api) => {
      const now2 = typeof api.now === "function" ? api.now.bind(api) : Date.now;
      store.$onAction(({ after, onError, name, args }) => {
        const groupId = runningActionId++;
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🛫 " + name,
            subtitle: "start",
            data: {
              store: formatDisplay(store.$id),
              action: formatDisplay(name),
              args
            },
            groupId
          }
        });
        after((result) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              title: "🛬 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                result
              },
              groupId
            }
          });
        });
        onError((error) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              logType: "error",
              title: "💥 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                error
              },
              groupId
            }
          });
        });
      }, true);
      store._customProperties.forEach((name) => {
        vue.watch(() => vue.unref(store[name]), (newValue, oldValue) => {
          api.notifyComponentUpdate();
          api.sendInspectorState(INSPECTOR_ID);
          if (isTimelineActive) {
            api.addTimelineEvent({
              layerId: MUTATIONS_LAYER_ID,
              event: {
                time: now2(),
                title: "Change",
                subtitle: name,
                data: {
                  newValue,
                  oldValue
                },
                groupId: activeAction
              }
            });
          }
        }, { deep: true });
      });
      store.$subscribe(({ events, type }, state) => {
        api.notifyComponentUpdate();
        api.sendInspectorState(INSPECTOR_ID);
        if (!isTimelineActive)
          return;
        const eventData = {
          time: now2(),
          title: formatMutationType(type),
          data: assign$1({ store: formatDisplay(store.$id) }, formatEventData(events)),
          groupId: activeAction
        };
        activeAction = void 0;
        if (type === MutationType.patchFunction) {
          eventData.subtitle = "⤵️";
        } else if (type === MutationType.patchObject) {
          eventData.subtitle = "🧩";
        } else if (events && !Array.isArray(events)) {
          eventData.subtitle = events.type;
        }
        if (events) {
          eventData.data["rawEvent(s)"] = {
            _custom: {
              display: "DebuggerEvent",
              type: "object",
              tooltip: "raw DebuggerEvent[]",
              value: events
            }
          };
        }
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: eventData
        });
      }, { detached: true, flush: "sync" });
      const hotUpdate = store._hotUpdate;
      store._hotUpdate = vue.markRaw((newStore) => {
        hotUpdate(newStore);
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🔥 " + store.$id,
            subtitle: "HMR update",
            data: {
              store: formatDisplay(store.$id),
              info: formatDisplay(`HMR update`)
            }
          }
        });
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
      });
      const { $dispose } = store;
      store.$dispose = () => {
        $dispose();
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
        api.getSettings().logStoreChanges && toastMessage(`Disposed "${store.$id}" store 🗑`);
      };
      api.notifyComponentUpdate();
      api.sendInspectorTree(INSPECTOR_ID);
      api.sendInspectorState(INSPECTOR_ID);
      api.getSettings().logStoreChanges && toastMessage(`"${store.$id}" store installed 🆕`);
    });
  }
  let runningActionId = 0;
  let activeAction;
  function patchActionForGrouping(store, actionNames) {
    const actions = actionNames.reduce((storeActions, actionName) => {
      storeActions[actionName] = vue.toRaw(store)[actionName];
      return storeActions;
    }, {});
    for (const actionName in actions) {
      store[actionName] = function() {
        const _actionId = runningActionId;
        const trackedStore = new Proxy(store, {
          get(...args) {
            activeAction = _actionId;
            return Reflect.get(...args);
          },
          set(...args) {
            activeAction = _actionId;
            return Reflect.set(...args);
          }
        });
        return actions[actionName].apply(trackedStore, arguments);
      };
    }
  }
  function devtoolsPlugin({ app, store, options }) {
    if (store.$id.startsWith("__hot:")) {
      return;
    }
    if (options.state) {
      store._isOptionsAPI = true;
    }
    if (typeof options.state === "function") {
      patchActionForGrouping(
        // @ts-expect-error: can cast the store...
        store,
        Object.keys(options.actions)
      );
      const originalHotUpdate = store._hotUpdate;
      vue.toRaw(store)._hotUpdate = function(newStore) {
        originalHotUpdate.apply(this, arguments);
        patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions));
      };
    }
    addStoreToDevtools(
      app,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      store
    );
  }
  function createPinia() {
    const scope = vue.effectScope(true);
    const state = scope.run(() => vue.ref({}));
    let _p = [];
    let toBeInstalled = [];
    const pinia = vue.markRaw({
      install(app) {
        setActivePinia(pinia);
        {
          pinia._a = app;
          app.provide(piniaSymbol, pinia);
          app.config.globalProperties.$pinia = pinia;
          if (USE_DEVTOOLS) {
            registerPiniaDevtools(app, pinia);
          }
          toBeInstalled.forEach((plugin) => _p.push(plugin));
          toBeInstalled = [];
        }
      },
      use(plugin) {
        if (!this._a && !isVue2) {
          toBeInstalled.push(plugin);
        } else {
          _p.push(plugin);
        }
        return this;
      },
      _p,
      // it's actually undefined here
      // @ts-expect-error
      _a: null,
      _e: scope,
      _s: /* @__PURE__ */ new Map(),
      state
    });
    if (USE_DEVTOOLS && typeof Proxy !== "undefined") {
      pinia.use(devtoolsPlugin);
    }
    return pinia;
  }
  function patchObject(newState, oldState) {
    for (const key in oldState) {
      const subPatch = oldState[key];
      if (!(key in newState)) {
        continue;
      }
      const targetValue = newState[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        newState[key] = patchObject(targetValue, subPatch);
      } else {
        {
          newState[key] = subPatch;
        }
      }
    }
    return newState;
  }
  const noop = () => {
  };
  function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
    subscriptions.push(callback);
    const removeSubscription = () => {
      const idx = subscriptions.indexOf(callback);
      if (idx > -1) {
        subscriptions.splice(idx, 1);
        onCleanup();
      }
    };
    if (!detached && vue.getCurrentScope()) {
      vue.onScopeDispose(removeSubscription);
    }
    return removeSubscription;
  }
  function triggerSubscriptions(subscriptions, ...args) {
    subscriptions.slice().forEach((callback) => {
      callback(...args);
    });
  }
  function mergeReactiveObjects(target, patchToApply) {
    if (target instanceof Map && patchToApply instanceof Map) {
      patchToApply.forEach((value, key) => target.set(key, value));
    }
    if (target instanceof Set && patchToApply instanceof Set) {
      patchToApply.forEach(target.add, target);
    }
    for (const key in patchToApply) {
      if (!patchToApply.hasOwnProperty(key))
        continue;
      const subPatch = patchToApply[key];
      const targetValue = target[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        target[key] = mergeReactiveObjects(targetValue, subPatch);
      } else {
        target[key] = subPatch;
      }
    }
    return target;
  }
  const skipHydrateSymbol = Symbol("pinia:skipHydration");
  function shouldHydrate(obj) {
    return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
  }
  const { assign } = Object;
  function isComputed(o) {
    return !!(vue.isRef(o) && o.effect);
  }
  function createOptionsStore(id, options, pinia, hot) {
    const { state, actions, getters } = options;
    const initialState = pinia.state.value[id];
    let store;
    function setup() {
      if (!initialState && !hot) {
        {
          pinia.state.value[id] = state ? state() : {};
        }
      }
      const localState = hot ? (
        // use ref() to unwrap refs inside state TODO: check if this is still necessary
        vue.toRefs(vue.ref(state ? state() : {}).value)
      ) : vue.toRefs(pinia.state.value[id]);
      return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
        if (name in localState) {
          console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
        }
        computedGetters[name] = vue.markRaw(vue.computed(() => {
          setActivePinia(pinia);
          const store2 = pinia._s.get(id);
          return getters[name].call(store2, store2);
        }));
        return computedGetters;
      }, {}));
    }
    store = createSetupStore(id, setup, options, pinia, hot, true);
    return store;
  }
  function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
    let scope;
    const optionsForPlugin = assign({ actions: {} }, options);
    if (!pinia._e.active) {
      throw new Error("Pinia destroyed");
    }
    const $subscribeOptions = {
      deep: true
      // flush: 'post',
    };
    {
      $subscribeOptions.onTrigger = (event) => {
        if (isListening) {
          debuggerEvents = event;
        } else if (isListening == false && !store._hotUpdating) {
          if (Array.isArray(debuggerEvents)) {
            debuggerEvents.push(event);
          } else {
            console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.");
          }
        }
      };
    }
    let isListening;
    let isSyncListening;
    let subscriptions = vue.markRaw([]);
    let actionSubscriptions = vue.markRaw([]);
    let debuggerEvents;
    const initialState = pinia.state.value[$id];
    if (!isOptionsStore && !initialState && !hot) {
      {
        pinia.state.value[$id] = {};
      }
    }
    const hotState = vue.ref({});
    let activeListener;
    function $patch(partialStateOrMutator) {
      let subscriptionMutation;
      isListening = isSyncListening = false;
      {
        debuggerEvents = [];
      }
      if (typeof partialStateOrMutator === "function") {
        partialStateOrMutator(pinia.state.value[$id]);
        subscriptionMutation = {
          type: MutationType.patchFunction,
          storeId: $id,
          events: debuggerEvents
        };
      } else {
        mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
        subscriptionMutation = {
          type: MutationType.patchObject,
          payload: partialStateOrMutator,
          storeId: $id,
          events: debuggerEvents
        };
      }
      const myListenerId = activeListener = Symbol();
      vue.nextTick().then(() => {
        if (activeListener === myListenerId) {
          isListening = true;
        }
      });
      isSyncListening = true;
      triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
    }
    const $reset = isOptionsStore ? function $reset2() {
      const { state } = options;
      const newState = state ? state() : {};
      this.$patch(($state) => {
        assign($state, newState);
      });
    } : (
      /* istanbul ignore next */
      () => {
        throw new Error(`🍍: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
      }
    );
    function $dispose() {
      scope.stop();
      subscriptions = [];
      actionSubscriptions = [];
      pinia._s.delete($id);
    }
    function wrapAction(name, action) {
      return function() {
        setActivePinia(pinia);
        const args = Array.from(arguments);
        const afterCallbackList = [];
        const onErrorCallbackList = [];
        function after(callback) {
          afterCallbackList.push(callback);
        }
        function onError(callback) {
          onErrorCallbackList.push(callback);
        }
        triggerSubscriptions(actionSubscriptions, {
          args,
          name,
          store,
          after,
          onError
        });
        let ret;
        try {
          ret = action.apply(this && this.$id === $id ? this : store, args);
        } catch (error) {
          triggerSubscriptions(onErrorCallbackList, error);
          throw error;
        }
        if (ret instanceof Promise) {
          return ret.then((value) => {
            triggerSubscriptions(afterCallbackList, value);
            return value;
          }).catch((error) => {
            triggerSubscriptions(onErrorCallbackList, error);
            return Promise.reject(error);
          });
        }
        triggerSubscriptions(afterCallbackList, ret);
        return ret;
      };
    }
    const _hmrPayload = /* @__PURE__ */ vue.markRaw({
      actions: {},
      getters: {},
      state: [],
      hotState
    });
    const partialStore = {
      _p: pinia,
      // _s: scope,
      $id,
      $onAction: addSubscription.bind(null, actionSubscriptions),
      $patch,
      $reset,
      $subscribe(callback, options2 = {}) {
        const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
        const stopWatcher = scope.run(() => vue.watch(() => pinia.state.value[$id], (state) => {
          if (options2.flush === "sync" ? isSyncListening : isListening) {
            callback({
              storeId: $id,
              type: MutationType.direct,
              events: debuggerEvents
            }, state);
          }
        }, assign({}, $subscribeOptions, options2)));
        return removeSubscription;
      },
      $dispose
    };
    const store = vue.reactive(
      assign(
        {
          _hmrPayload,
          _customProperties: vue.markRaw(/* @__PURE__ */ new Set())
          // devtools custom properties
        },
        partialStore
        // must be added later
        // setupStore
      )
    );
    pinia._s.set($id, store);
    const setupStore = pinia._e.run(() => {
      scope = vue.effectScope();
      return scope.run(() => setup());
    });
    for (const key in setupStore) {
      const prop = setupStore[key];
      if (vue.isRef(prop) && !isComputed(prop) || vue.isReactive(prop)) {
        if (hot) {
          set(hotState.value, key, vue.toRef(setupStore, key));
        } else if (!isOptionsStore) {
          if (initialState && shouldHydrate(prop)) {
            if (vue.isRef(prop)) {
              prop.value = initialState[key];
            } else {
              mergeReactiveObjects(prop, initialState[key]);
            }
          }
          {
            pinia.state.value[$id][key] = prop;
          }
        }
        {
          _hmrPayload.state.push(key);
        }
      } else if (typeof prop === "function") {
        const actionValue = hot ? prop : wrapAction(key, prop);
        {
          setupStore[key] = actionValue;
        }
        {
          _hmrPayload.actions[key] = prop;
        }
        optionsForPlugin.actions[key] = prop;
      } else {
        if (isComputed(prop)) {
          _hmrPayload.getters[key] = isOptionsStore ? (
            // @ts-expect-error
            options.getters[key]
          ) : prop;
          if (IS_CLIENT) {
            const getters = setupStore._getters || // @ts-expect-error: same
            (setupStore._getters = vue.markRaw([]));
            getters.push(key);
          }
        }
      }
    }
    {
      assign(store, setupStore);
      assign(vue.toRaw(store), setupStore);
    }
    Object.defineProperty(store, "$state", {
      get: () => hot ? hotState.value : pinia.state.value[$id],
      set: (state) => {
        if (hot) {
          throw new Error("cannot set hotState");
        }
        $patch(($state) => {
          assign($state, state);
        });
      }
    });
    {
      store._hotUpdate = vue.markRaw((newStore) => {
        store._hotUpdating = true;
        newStore._hmrPayload.state.forEach((stateKey) => {
          if (stateKey in store.$state) {
            const newStateTarget = newStore.$state[stateKey];
            const oldStateSource = store.$state[stateKey];
            if (typeof newStateTarget === "object" && isPlainObject(newStateTarget) && isPlainObject(oldStateSource)) {
              patchObject(newStateTarget, oldStateSource);
            } else {
              newStore.$state[stateKey] = oldStateSource;
            }
          }
          set(store, stateKey, vue.toRef(newStore.$state, stateKey));
        });
        Object.keys(store.$state).forEach((stateKey) => {
          if (!(stateKey in newStore.$state)) {
            del(store, stateKey);
          }
        });
        isListening = false;
        isSyncListening = false;
        pinia.state.value[$id] = vue.toRef(newStore._hmrPayload, "hotState");
        isSyncListening = true;
        vue.nextTick().then(() => {
          isListening = true;
        });
        for (const actionName in newStore._hmrPayload.actions) {
          const action = newStore[actionName];
          set(store, actionName, wrapAction(actionName, action));
        }
        for (const getterName in newStore._hmrPayload.getters) {
          const getter = newStore._hmrPayload.getters[getterName];
          const getterValue = isOptionsStore ? (
            // special handling of options api
            vue.computed(() => {
              setActivePinia(pinia);
              return getter.call(store, store);
            })
          ) : getter;
          set(store, getterName, getterValue);
        }
        Object.keys(store._hmrPayload.getters).forEach((key) => {
          if (!(key in newStore._hmrPayload.getters)) {
            del(store, key);
          }
        });
        Object.keys(store._hmrPayload.actions).forEach((key) => {
          if (!(key in newStore._hmrPayload.actions)) {
            del(store, key);
          }
        });
        store._hmrPayload = newStore._hmrPayload;
        store._getters = newStore._getters;
        store._hotUpdating = false;
      });
    }
    if (USE_DEVTOOLS) {
      const nonEnumerable = {
        writable: true,
        configurable: true,
        // avoid warning on devtools trying to display this property
        enumerable: false
      };
      ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p) => {
        Object.defineProperty(store, p, assign({ value: store[p] }, nonEnumerable));
      });
    }
    pinia._p.forEach((extender) => {
      if (USE_DEVTOOLS) {
        const extensions = scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        }));
        Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
        assign(store, extensions);
      } else {
        assign(store, scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        })));
      }
    });
    if (store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
      console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
    }
    if (initialState && isOptionsStore && options.hydrate) {
      options.hydrate(store.$state, initialState);
    }
    isListening = true;
    isSyncListening = true;
    return store;
  }
  function defineStore(idOrOptions, setup, setupOptions) {
    let id;
    let options;
    const isSetupStore = typeof setup === "function";
    if (typeof idOrOptions === "string") {
      id = idOrOptions;
      options = isSetupStore ? setupOptions : setup;
    } else {
      options = idOrOptions;
      id = idOrOptions.id;
    }
    function useStore(pinia, hot) {
      const currentInstance = vue.getCurrentInstance();
      pinia = // in test mode, ignore the argument provided as we can always retrieve a
      // pinia instance with getActivePinia()
      pinia || currentInstance && vue.inject(piniaSymbol, null);
      if (pinia)
        setActivePinia(pinia);
      if (!activePinia) {
        throw new Error(`[🍍]: getActivePinia was called with no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
This will fail in production.`);
      }
      pinia = activePinia;
      if (!pinia._s.has(id)) {
        if (isSetupStore) {
          createSetupStore(id, setup, options, pinia);
        } else {
          createOptionsStore(id, options, pinia);
        }
        {
          useStore._pinia = pinia;
        }
      }
      const store = pinia._s.get(id);
      if (hot) {
        const hotId = "__hot:" + id;
        const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign({}, options), pinia, true);
        hot._hotUpdate(newStore);
        delete pinia.state.value[hotId];
        pinia._s.delete(hotId);
      }
      if (IS_CLIENT && currentInstance && currentInstance.proxy && // avoid adding stores that are just built for hot module replacement
      !hot) {
        const vm = currentInstance.proxy;
        const cache = "_pStores" in vm ? vm._pStores : vm._pStores = {};
        cache[id] = store;
      }
      return store;
    }
    useStore.$id = id;
    return useStore;
  }
  const baseUrl = "https://api.vkeys.cn/V1/Music";
  const https = (url, method, data) => {
    return new Promise((resolve, reject) => {
      uni.showLoading({
        title: "加载中，有点慢，请耐心等待"
      });
      uni.request({
        url: baseUrl + url,
        method,
        data,
        header: {
          "content-type": "application/json"
          //默认请求头
        },
        success: (res) => {
          if (res.statusCode == 200)
            resolve(res.data);
          else {
            reject(baseUrl + url + "请求失败");
          }
          uni.hideLoading();
        },
        fail: (error) => {
          reject(error);
          uni.hideLoading();
          uni.showToast({
            title: "获取失败！请等服务器冷却后再重试",
            icon: "none",
            duration: 1500
          });
        }
      });
    });
  };
  const downMusic = async (url, song, singer) => {
    try {
      const last = getLast(url);
      const fileName = singer.replace(/\//g, "&") + "-" + song + "." + last;
      const filePath = useIndexStore().downPath + "/" + fileName;
      formatAppLog("log", "at utils/downMusic.ts:9", filePath);
      await createDir("/storage/emulated/0/EMT音乐");
      let dtask = plus.downloader.createDownload(
        url,
        {
          //1.本地路径开头使用file://;
          //2.Android平台本地绝对路径为"storage/emulated/0",就是用户文件管理器能看到的了;
          //3.创建"xxx"作为文件夹名称，后缀是用于文件命名和格式修改，大家可以使用变量。
          filename: "file:///storage/emulated/0/EMT音乐/" + fileName
          //利用保存路径，实现下载文件的重命名
        },
        (d, status) => {
          formatAppLog("log", "at utils/downMusic.ts:18", d);
          if (status == 200) {
            formatAppLog("log", "at utils/downMusic.ts:20", "下载成功");
            let fileSaveUrl = plus.io.convertLocalFileSystemURL(d.filename);
            uni.showToast({
              title: song,
              icon: "success",
              duration: 2e3
            });
          } else {
            formatAppLog("log", "at utils/downMusic.ts:30", "下载失败");
            plus.downloader.clear();
          }
        }
      );
      dtask.start();
    } catch (error) {
      formatAppLog("log", "at utils/downMusic.ts:39", "downMusic出现错误");
    }
  };
  function getLast(url) {
    const questionMarkIndex = url.lastIndexOf("?");
    if (questionMarkIndex !== -1) {
      const dotIndex = url.lastIndexOf(".", questionMarkIndex - 1);
      if (dotIndex !== -1 && dotIndex < questionMarkIndex) {
        const extractedContent = url.substring(dotIndex + 1, questionMarkIndex);
        formatAppLog("log", "at utils/downMusic.ts:55", extractedContent);
        return extractedContent;
      } else {
        formatAppLog("log", "at utils/downMusic.ts:58", "utils/getLast，获取后缀的过程中出现问题");
      }
    } else {
      formatAppLog("log", "at utils/downMusic.ts:61", "utils/getLast，获取后缀的过程中出错");
    }
  }
  const createDir = async (path) => {
    plus.android.requestPermissions([
      "android.permission.WRITE_EXTERNAL_STORAGE",
      "android.permission.READ_EXTERNAL_STORAGE",
      "android.permission.INTERNET",
      "android.permission.ACCESS_WIFI_STATE"
    ], (e) => {
      const File = plus.android.importClass("java.io.File");
      let file = new File(path);
      if (!file.exists()) {
        return file.mkdirs();
      }
      return false;
    }, (v) => {
      uni.showToast({
        title: "无法获取权限，文件下载出错！",
        icon: "none"
      });
    });
  };
  const searchList = async (name, page) => {
    try {
      formatAppLog("log", "at api/api.ts:11", "看看请求参数", name, page);
      let res = await https("/Tencent", "GET", { word: name, page });
      formatAppLog("log", "at api/api.ts:13", "@searchList", res.data);
      return res.data;
    } catch (error) {
      uni.showToast({
        title: name + "查询失败",
        icon: "error"
      });
    }
  };
  const searchMusic = async (id) => {
    try {
      let res = await https("/Tencent", "GET", { id });
      formatAppLog("log", "at api/api.ts:27", "@searchMusic", res.data);
      if (res.data == null)
        res = await https("/Tencent", "GET", { id });
      return res.data;
    } catch (error) {
      uni.showToast({
        title: "资源获取失败",
        icon: "none"
      });
    }
  };
  const downloadMusic = async (id, options) => {
    try {
      let res = await https("/Tencent", "GET", { id, q: options });
      formatAppLog("log", "at api/api.ts:43", "@downloadMusic", res.data.url);
      if (res.data == null)
        res = await https("/Tencent", "GET", { id, q: options });
      else
        downMusic(res.data.url, res.data.song, res.data.singer);
      return res.data.url;
    } catch (error) {
      uni.showToast({
        title: "下载失败，可以考虑换一个音质",
        icon: "none"
      });
    }
  };
  const useIndexStore = defineStore("index", {
    state: () => ({
      searchValue: "",
      //查询内容
      musicItems: [
        //当前查询对象的列表项
        {
          "id": 0,
          "mid": "",
          "vid": "",
          "song": "",
          "subtitle": "",
          "singer": "",
          "album": "",
          "pay": "",
          "time": "",
          "bpm": null,
          "quality": "",
          "interval": "",
          "size": "",
          "kbps": "",
          "cover": ""
        }
      ],
      musicSelected: {
        //选择项
        id: 0,
        mid: "",
        vid: "",
        song: "",
        subtitle: "",
        singer: "",
        album: "",
        pay: "",
        time: "",
        bpm: null,
        quality: "",
        interval: "",
        size: "",
        kbps: "",
        cover: "",
        link: "",
        url: ""
      },
      page: 1,
      //页数 默认为1
      selectId: 0,
      //被选中项的id
      showOptions: false,
      //是否显示选择操作
      downPath: ""
    }),
    getters: {},
    actions: {
      // 改变searchValue的数据值
      changeSearchValue(newValue) {
        this.searchValue = newValue;
      },
      //查询列表
      async search() {
        try {
          if (this.searchValue != "") {
            let res = await searchList(this.searchValue, this.page);
            this.musicItems = [...this.musicItems, ...res];
            formatAppLog("log", "at pinia/useIndex.ts:68", "@pinia/search", this.musicItems);
          }
        } catch (error) {
          formatAppLog("error", "at pinia/useIndex.ts:71", "@pinia/search出错了！");
        }
      },
      //根据id获取播放数据
      async playMusic() {
        try {
          if (this.selectId != 0) {
            let res = await searchMusic(this.selectId);
            this.musicSelected = res;
            formatAppLog("log", "at pinia/useIndex.ts:81", "@pinia/playMusic", this.musicSelected);
          }
        } catch (error) {
          formatAppLog("error", "at pinia/useIndex.ts:84", "@pinia/playMusic出错了!");
        }
      }
    }
  });
  const _sfc_main$c = /* @__PURE__ */ vue.defineComponent({
    __name: "musicItem",
    props: {
      obj: { type: null, required: true }
    },
    setup(__props) {
      const data = __props;
      const useIndex = useIndexStore();
      function showOptions() {
        useIndex.showOptions = true;
        useIndex.selectId = data.obj.id;
      }
      return (_ctx, _cache) => {
        const _component_uni_col = resolveEasycom(vue.resolveDynamicComponent("uni-col"), __easycom_0$1);
        const _component_uni_row = resolveEasycom(vue.resolveDynamicComponent("uni-row"), __easycom_0);
        return vue.openBlock(), vue.createElementBlock("view", {
          class: "item",
          onClick: showOptions
        }, [
          vue.createVNode(_component_uni_row, null, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_col, { span: 4 }, {
                default: vue.withCtx(() => [
                  vue.createCommentVNode(" 图片封面 "),
                  vue.createElementVNode("image", {
                    src: data.obj.cover == "" ? "../../static/load.jpg" : data.obj.cover,
                    mode: "aspectFit"
                  }, null, 8, ["src"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uni_col, { span: 2 }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode("   ")
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uni_col, { span: 18 }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("div", { class: "infor" }, [
                    vue.createTextVNode(
                      vue.toDisplayString(data.obj.song) + " ",
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "p",
                      null,
                      vue.toDisplayString(data.obj.singer),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          })
        ]);
      };
    }
  });
  const CompontentsMusicItemMusicItem = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-d643d55c"], ["__file", "E:/程序夹/emtmusic_app/compontents/musicItem/musicItem.vue"]]);
  const _sfc_main$b = /* @__PURE__ */ vue.defineComponent({
    __name: "musicSearch",
    setup(__props) {
      const searchValue = vue.ref("");
      function search() {
        useIndexStore().musicItems.length = 0;
        useIndexStore().changeSearchValue(searchValue.value);
        useIndexStore().search();
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "search" }, [
          vue.createCommentVNode(" 输入框背景图 "),
          vue.createElementVNode("image", {
            src: "/static/emt_inpute.png",
            mode: "aspectFit",
            class: "search_bk"
          }),
          vue.createCommentVNode(" 输入框 "),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchValue.value = $event),
              placeholder: "来找首好歌吧~",
              class: "input",
              onConfirm: search
            },
            null,
            544
            /* NEED_HYDRATION, NEED_PATCH */
          ), [
            [vue.vModelText, searchValue.value]
          ])
        ]);
      };
    }
  });
  const CompontentsMusicSearchMusicSearch = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-544ac6aa"], ["__file", "E:/程序夹/emtmusic_app/compontents/musicSearch/musicSearch.vue"]]);
  const _sfc_main$a = /* @__PURE__ */ vue.defineComponent({
    __name: "topBar",
    setup(__props) {
      const statusBarHeight = vue.ref(0);
      onLoad(() => {
        if (plus && plus.navigator) {
          const height = plus.navigator.getStatusbarHeight();
          statusBarHeight.value = height;
          formatAppLog("log", "at compontents/topBar/topBar.vue:21", "看看高度", statusBarHeight.value);
        } else {
          statusBarHeight.value = 20;
        }
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(" 自定义导航栏 "),
            vue.createElementVNode(
              "view",
              {
                class: "topBar",
                style: vue.normalizeStyle({ height: statusBarHeight.value + "px" })
              },
              [
                vue.createCommentVNode(" test ")
              ],
              4
              /* STYLE */
            )
          ],
          2112
          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
        );
      };
    }
  });
  const CompontentsTopBarTopBar = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-ee97fe23"], ["__file", "E:/程序夹/emtmusic_app/compontents/topBar/topBar.vue"]]);
  const _sfc_main$9 = /* @__PURE__ */ vue.defineComponent({
    __name: "musicPlay",
    setup(__props) {
      const useIndex = useIndexStore();
      const itemSelected = vue.computed(() => useIndex.musicSelected);
      const url = vue.computed(() => useIndex.musicSelected.url);
      const isPlay = vue.ref(false);
      const innerAudioContext = uni.createInnerAudioContext();
      innerAudioContext.src = url.value;
      const viewWidth = vue.ref(0);
      uni.getSystemInfo({
        success: (res) => {
          formatAppLog("log", "at compontents/musicPlay/musicPlay.vue:63", res.windowWidth);
          viewWidth.value = res.windowWidth;
        }
      });
      const scale = vue.ref(0);
      const pros = vue.ref(0);
      const currentTime = vue.ref(0);
      const duration = vue.ref(0);
      vue.watch(currentTime, () => {
        pros.value = currentTime.value / duration.value * 100;
        formatAppLog("log", "at compontents/musicPlay/musicPlay.vue:78", "看看currentTime", currentTime.value);
        formatAppLog("log", "at compontents/musicPlay/musicPlay.vue:79", "现在的位标", pros.value);
      });
      function init() {
        if (useIndex.musicSelected.url != "" && useIndex.musicSelected.url != void 0) {
          isPlay.value = true;
          if (useIndex.musicSelected.url !== innerAudioContext.src) {
            innerAudioContext.src = useIndex.musicSelected.url;
            currentTime.value = 0;
          }
          innerAudioContext.play();
          timeUpdate();
        } else {
          isPlay.value = false;
          innerAudioContext.pause();
        }
      }
      innerAudioContext.onCanplay(() => {
        duration.value = innerAudioContext.duration;
        formatAppLog("log", "at compontents/musicPlay/musicPlay.vue:103", "总位", duration.value, "现位", currentTime.value, "innerAudioContext", innerAudioContext);
      });
      innerAudioContext.onEnded(() => {
        isPlay.value = false;
        timeUpdate();
      });
      function timeUpdate() {
        const time = setInterval(() => {
          if (isPlay.value == true) {
            currentTime.value++;
          } else {
            clearInterval(time);
          }
        }, 1e3);
      }
      function changePlay(options) {
        switch (options) {
          case "play":
            isPlay.value = true;
            init();
            break;
          case "pause":
            isPlay.value = false;
            innerAudioContext.pause();
            timeUpdate();
            break;
        }
      }
      function tapPro(e) {
        if (duration.value != 0) {
          scale.value = e.detail.x / viewWidth.value;
          scale.value = parseFloat(scale.value.toFixed(2));
          pros.value = scale.value * 100;
          currentTime.value = scale.value * duration.value;
          innerAudioContext.seek(scale.value * duration.value);
          formatAppLog("log", "at compontents/musicPlay/musicPlay.vue:147", "@tapPro看看位标/比例/音频位", pros.value, scale.value, currentTime.value, scale.value * duration.value);
        }
      }
      onLoad(() => {
      });
      return (_ctx, _cache) => {
        const _component_uni_col = resolveEasycom(vue.resolveDynamicComponent("uni-col"), __easycom_0$1);
        const _component_uni_row = resolveEasycom(vue.resolveDynamicComponent("uni-row"), __easycom_0);
        return vue.openBlock(), vue.createElementBlock("view", { class: "audio" }, [
          vue.createCommentVNode(" 进度条 "),
          vue.createElementVNode("progress", {
            percent: pros.value,
            "stroke-width": "4",
            class: "progress",
            onClick: tapPro
          }, null, 8, ["percent"]),
          vue.createVNode(_component_uni_row, null, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_col, { span: "5" }, {
                default: vue.withCtx(() => [
                  vue.createCommentVNode(" 封面 "),
                  vue.createElementVNode("image", {
                    src: itemSelected.value.cover == "" || itemSelected.value.cover == void 0 ? "../../static/logo.png" : itemSelected.value.cover,
                    mode: "aspectFit"
                  }, null, 8, ["src"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uni_col, { span: "14" }, {
                default: vue.withCtx(() => [
                  vue.createCommentVNode(" 音乐名称及歌手 "),
                  vue.createElementVNode("view", { class: "audioName" }, [
                    vue.createElementVNode(
                      "span",
                      null,
                      vue.toDisplayString(itemSelected.value.song == "" || itemSelected.value.song == void 0 ? "先选一首歌吧" : itemSelected.value.song),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "p",
                      null,
                      vue.toDisplayString(itemSelected.value.singer == "" || itemSelected.value.song == void 0 ? "先选一首歌吧" : itemSelected.value.singer),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uni_col, { span: "5" }, {
                default: vue.withCtx(() => [
                  vue.createCommentVNode(" 暂停/播放 下载"),
                  vue.createElementVNode("view", { class: "audioController" }, [
                    vue.createCommentVNode(" 播放 "),
                    vue.withDirectives(vue.createElementVNode(
                      "span",
                      {
                        onClick: _cache[0] || (_cache[0] = ($event) => changePlay("play"))
                      },
                      [
                        vue.createElementVNode("image", {
                          src: "/static/play-one.svg",
                          mode: "aspectFit"
                        })
                      ],
                      512
                      /* NEED_PATCH */
                    ), [
                      [vue.vShow, !isPlay.value]
                    ]),
                    vue.createCommentVNode(" 暂停 "),
                    vue.withDirectives(vue.createElementVNode(
                      "span",
                      {
                        onClick: _cache[1] || (_cache[1] = ($event) => changePlay("pause"))
                      },
                      [
                        vue.createElementVNode("image", {
                          src: "/static/pause.svg",
                          mode: "aspectFit"
                        })
                      ],
                      512
                      /* NEED_PATCH */
                    ), [
                      [vue.vShow, isPlay.value]
                    ]),
                    vue.createCommentVNode(" 下载 "),
                    vue.createElementVNode("image", {
                      src: "/static/download-four.svg",
                      mode: "aspectFit"
                    })
                  ])
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          })
        ]);
      };
    }
  });
  const CompontentsMusicPlayMusicPlay = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-15b1af78"], ["__file", "E:/程序夹/emtmusic_app/compontents/musicPlay/musicPlay.vue"]]);
  const _sfc_main$8 = /* @__PURE__ */ vue.defineComponent({
    __name: "optionsItem",
    setup(__props) {
      const selectedItem = [
        "播放",
        "下载：低音质",
        "下载：中音质",
        "下载：高音质",
        "取消"
      ];
      const useIndex = useIndexStore();
      function selected(item) {
        let index = selectedItem.indexOf(item);
        formatAppLog("log", "at compontents/optionsItem/optionsItem.vue:22", "选择项", item, index);
        switch (index) {
          case 0:
            useIndex.playMusic();
            break;
          case 1:
            downloadMusic(useIndex.selectId, 3);
            break;
          case 2:
            downloadMusic(useIndex.selectId, 6);
            break;
          case 3:
            downloadMusic(useIndex.selectId, 9);
            break;
        }
        useIndex.showOptions = false;
      }
      return (_ctx, _cache) => {
        const _component_uni_row = resolveEasycom(vue.resolveDynamicComponent("uni-row"), __easycom_0);
        return vue.openBlock(), vue.createElementBlock("view", { class: "options_bk" }, [
          vue.createElementVNode("view", { class: "content" }, [
            (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(selectedItem, (item) => {
                return vue.createVNode(_component_uni_row, {
                  key: item,
                  onClick: vue.withModifiers(($event) => selected(item), ["stop"])
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(
                      vue.toDisplayString(item),
                      1
                      /* TEXT */
                    )
                  ]),
                  _: 2
                  /* DYNAMIC */
                }, 1032, ["onClick"]);
              }),
              64
              /* STABLE_FRAGMENT */
            ))
          ])
        ]);
      };
    }
  });
  const CompontentsOptionsItemOptionsItem = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-cb9fc64e"], ["__file", "E:/程序夹/emtmusic_app/compontents/optionsItem/optionsItem.vue"]]);
  function checkUpdate(version, sysInfo, config) {
    return new Promise((RES, REJ) => {
      let flag = true;
      let loading = false;
      setTimeout(() => {
        if (flag && config.loading) {
          loading = true;
          uni.showLoading({
            title: config.loadingText,
            mask: config.loadingMask
          });
        }
      }, config.loadingDelay);
      uni.request({
        url: config.apiUrl,
        method: "POST",
        sslVerify: false,
        data: {
          appId: config.id,
          uniqueId: config.uniqueId,
          appVersion: sysInfo.appVersion,
          appWgtVersion: version,
          deviceBrand: sysInfo.deviceBrand,
          deviceId: sysInfo.deviceId,
          deviceModel: sysInfo.deviceModel,
          deviceType: sysInfo.deviceType,
          osName: sysInfo.osName,
          osTheme: sysInfo.osTheme,
          osVersion: sysInfo.osVersion,
          platform: sysInfo.uniPlatform,
          romName: sysInfo.romName,
          romVersion: sysInfo.romVersion,
          pluginVersion: "3.2.2"
        },
        success: (res) => {
          flag = false;
          if (loading) {
            uni.hideLoading();
          }
          if (res.statusCode === 200) {
            if (res.data.code === 0) {
              RES(res.data.data);
            } else {
              REJ(res.data.msg);
            }
          } else {
            formatAppLog("error", "at uni_modules/wrap-version-update/js/api.js:61", "res err:", res.data);
            REJ("未知错误");
          }
        },
        fail: (err) => {
          flag = false;
          if (loading) {
            uni.hideLoading();
          }
          uni.getNetworkType({
            complete: (res) => {
              let networkType = res.networkType || "none";
              if (networkType === "none") {
                REJ("当前无网络,请检查您的网络连接");
              } else if (err.errMsg !== "request:fail") {
                formatAppLog("error", "at uni_modules/wrap-version-update/js/api.js:76", "err:", err);
                REJ("未知错误");
              }
            }
          });
        }
      });
    });
  }
  function styleInto(str) {
    let styleObject = "";
    for (let i in str) {
      styleObject += i.replace(/([A-Z])/g, "-$1").toLowerCase() + ":" + str[i] + ";";
    }
    return styleObject;
  }
  let tempFilePath;
  function downloadFile({
    url,
    success,
    fail,
    progress
  }) {
    if (tempFilePath) {
      progress(100);
      success(tempFilePath);
    } else {
      let percent = 0;
      uni.downloadFile({
        url,
        success: (res) => {
          if (res.statusCode === 200) {
            progress(100);
            tempFilePath = res.tempFilePath;
            success(res.tempFilePath);
          } else {
            fail();
            uni.showToast({
              title: "下载失败,请重试",
              duration: 4e3,
              icon: "none"
            });
          }
        },
        fail: () => {
          fail();
          uni.showToast({
            title: "下载失败,请重试",
            duration: 4e3,
            icon: "none"
          });
        }
      }).onProgressUpdate((res) => {
        if (percent !== res.progress) {
          percent = res.progress;
          progress(res.progress);
        }
      });
    }
  }
  const defaultBgImg = "data:image/png;base64,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KDgSayGEEKLgSKyFEEKIgiOxFkIIIQqOxFoIIYQoOBJrIYQQouBIrIUQQoiCI7EWQgghCo7EWgghhCg4EmshhBCi4EishRBCiIIjsRZCCCEKjsRaCCGEKDgSayGEEKLgSKyFEEKIgiOxFkIIIQqOxFoIIYQoOBJrIYQQouBIrIUQQoiCI7EWQgghCo7EWgghhCg4EmshhBCi4EishRBCiIIjsRZCCCEKjsRaCCGEKDgSayGEEKLgSKyFEEKIgiOxFkIIIQqOxFoIIYQoOBJrIYQQouBIrIUQQoiCI7EWQgghCo7EWgghhCg4EmshhBCi4EishRBCiIIjsRZCCCEKjsRaCCGEKDgSayGEEKLgSKyFEEKIgiOxFkIIIQqOxFoIIYQoOBJrIYQQouBIrIUQQoiCI7EWQgghCo7EWgghhCg4EmshhBCi4EishRBCiIIjsRZCCCEKjsRaCCGEKDgSayGEEKLgSKyFEEKIgiOxFkIIIQqOxFoIIYQoOBJrIYQQouBIrIUQQoiCI7EWQgghCo7EWgghhCg4EmshhBCi4EishRBCiIIjsRZCCCEKjsRaCCGEKDgSayGEEKLgSKyFEEKIgiOxFkIIIQqOxFoIIYQoOBJrIYQQouBIrIUQQoiCI7EWQgghCo7EWgghhCg4EmshhBCi4EishRBCiIIjsRZCCCEKjsRaCCGEKDgSayGEEKLgSKyFEEKIgiOxFkIIIQqOxFoIIYQoOBJrIYQQouBIrIUQQoiCI7EWQgghCo7EWgghhCg4EmshhBCi4EishRBCiIIjsRZCCCEKjsRaCCGEKDgSayGEEKLgSKyFEEKIgiOxFkIIIQqOxFoIIYQoOBJrIYQQouBIrIUQQoiCI7EWQgghCo7EWgghhCg4EmshhBCi4EishRBCiIIjsRZCCCEKjsRaCCGEKDgSayGEEKLgSKyFEEKIgiOxFkIIIQqOxFoIIYQoOBJrIYQQouBIrIUQQoiCI7EWQgghCo7EWgghhCg4EmshhBCi4EishRBCiIIjsRZCCCEKjsRaCCGEKDgSayGEEKLgSKyFEEKIgiOxFkIIIQqOxFoIIYQoOBJrIYQQouBIrIUQQoiCI7EWQgghCo7EWgghhCg4EmshhBCi4EishRBCiIIjsRZCCCEKjsRaCCGEKDgSayGEEKLgSKyFEEKIgiOxFkIIIQqOxFoIIYQoOBJrIYQQouBIrIUQQoiCI7EWQgghCo7EWgghhCg4EmshhBCi4EishRBCiIIjsRZCCCEKjsRaCCGEKDgSayGEEKLgSKyFEEKIgiOxFkIIIQqOxFoIIYQoOBJrIYQQouBIrIUQQoiCI7EWQgghCo7EWgghhCg4EmshhBCi4EishRBCiIIjsRZCCCEKjsRaCCGEKDgSayGEEKLgSKyFEEKIgiOxFkIIIQqOxFoIIYQoOBJrIYQQouBIrIUQQoiCI7EWQgghCo7EWgghhCg4EmshhBCi4EishRBCiIIjsRZCCCEKjsRaCCGEKDgSayGEEKLgSKyFEEKIgiOxFkIIIQqOxFoIIYQoOBJrIYQQouBIrIUQQoiCI7EWQgghCo7EWgghhCg4EmshhBCi4EishRBCiIIjsRZCCCEKjsRaCCGEKDgSayGEEKLgSKyFEEKIgiOxFkIIIQqOxFoIIYQoOBJrIYQQouBIrIUQQoiCI7EWQgghCo7EWgghhCg4EmshhBCi4EishRBCiIIjsRZCCCEKjsRaCCGEKDgSayGEEKLgSKyFEEKIgiOxFkIIIQqOxFoIIYQoOBJrIYQQouBIrIUQQoiCI7EWQgghCo7EWgghhCg4EmshhBCi4EishRBCiIIjsRZCCCEKjsRaCCGEKDgSayGEEKLgSKyFEEKIgiOxFkIIIQqOxFoIIYQoOBJrIYQQouBIrIUQQoiCI7EWQgghCo7EWgghhCg4EmshhBCi4EishRBCiIIjsRZCCCEKjsRaCCGEKDgSayGEEKLgSKyFEEKIgiOxFkIIIQqOxFoIIYQoOBJrIYQQouBIrIUQQoiCI7EWQgghCo7EWgghhCg4EmshhBCi4EishRBCiIIjsRZCCCEKjsRaCCGEKDgSayGEEKLgSKyFEEKIgiOxFkIIIQqOxFoIIYQoOBJrIYQQouBIrIUQQoiCI7EWQgghCo7EWgghhCg4EmshhBCi4EishRBCiIIjsRZCCCEKjsRaCCGEKDgSayGEEKLgSKyFEEKIgiOxFkIIIQqOxFoIIYQoOBJrIYQQouBIrIUQQoiCI7EWQgghCo7EWgghhCg4EmshhBCi4EishRBCiIIjsRZCCCEKjsRaCCGEKDgSayGEEKLgSKyFEEKIgiOxFkIIIQqOxFoIIYQoOBJrIYQQouBIrIUQQoiCI7EWQgghCo7EWgghhCg4EmshhBCi4EishRBCiIIjsRZCCCEKjsRaCCGEKDgSayGEEKLY7Ees98b3QgghhCgSSRL2lULYh1ivLZXCUPxaCCGEEEUiCeFRxPoxlDt+JYQQQogCsdtCKtY/LH8QQgghRLE4bOE2xPqnFnbxjRBCCCGKQbmL+g4LqxDrByx83sIeC0IIIYQoAOUu6v+2sHMgSZKd9uYzFrZbEEIIIUQxuMfCF9FpPGu43cJ/WpB3LYQQQnSfDRb+0YT6MT6kYl32rj9s4SeaxiWEEEJ0j7IOf9nCF9MvDPesEey77OXtSRIejN8IIYQQopMg1KbD37a373SvGobFGuwPX7GXN1m4Xx62EEII0TkyQv2WsgM9TFJ+PYZSqfRUe/kD++E19sNjBF0IIYQQLYcxY9+x8Ecm1Lek32SoKNZggn2uvfyuhaeZaM+TaAshhBCtpexNr7O3DPL+m2zTd5aqYg0m2DPs5ToLN1m4yMI0C1MsCCGEEGIElAWaOdRMmf66hY9Z+LEJNYO9K1JTrB0T7SX2cpaFp1s43wKfJ1sYa0EIIYQQ9WHp0L2lEO408WX1UMaJPVBLpJ2GxNope9oEPOw55aDmcSGEEKI2hyzssLDVAvtx7GxEpCMh/H9z1dd1062UaQAAAABJRU5ErkJggg==";
  const _sfc_main$7 = {
    name: "WrapText",
    props: {
      text: {
        type: [String, Number],
        //文本
        default: ""
      },
      size: {
        type: [String, Number],
        //字号(rpx)
        default: 30
      },
      color: {
        type: String,
        //文本颜色（class）
        default: "#333333"
      },
      lines: {
        type: [String, Number],
        //超出省略
        default: ""
      },
      align: {
        type: String,
        //文本位置
        default: "left"
      },
      leading: {
        type: [String, Number],
        //行高
        default: ""
      },
      weight: {
        type: Boolean,
        //文本加粗
        default: false
      },
      decoration: {
        type: String,
        //文本的修饰
        default: "none"
      },
      width: {
        type: [String, Number],
        //文本宽度
        default: ""
      },
      styleCustom: {
        type: Object,
        //组件自定义样式，同 css 样式。注意带’-‘连接符的属性需要使用小驼峰写法如：`backgroundColor:red`
        default: function() {
          return {};
        }
      }
    },
    computed: {
      textStyle() {
        let style = {
          ...this.styleCustom,
          fontSize: `${this.size}rpx`,
          textAlign: this.align,
          fontWeight: this.weight ? "bold" : "normal",
          textDecoration: this.decoration,
          color: this.color
        };
        if (!!this.lines) {
          let lines_temp = {
            textOverflow: "ellipsis",
            lines: this.lines,
            overflow: "hidden",
            display: "-webkit-box",
            "-webkit-box-orient": "vertical",
            "-webkit-line-clamp": this.lines
          };
          style = Object.assign(style, lines_temp);
        }
        if (!!this.leading) {
          style.lineHeight = `${this.leading}rpx`;
        }
        if (this.width !== "") {
          style.width = `${this.width}rpx`;
        }
        return styleInto(style);
      }
    },
    data() {
      return {};
    },
    methods: {
      onClick(e) {
        this.$emit("click", e);
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode(
        "text",
        {
          onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args)),
          style: vue.normalizeStyle($options.textStyle)
        },
        vue.toDisplayString($props.text),
        5
        /* TEXT, STYLE */
      )
    ]);
  }
  const WrapText = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$4], ["__file", "E:/程序夹/emtmusic_app/uni_modules/wrap-version-update/components/wrap-text/wrap-text.nvue"]]);
  const _sfc_main$6 = {
    name: "WrapButton",
    components: {
      WrapText
    },
    props: {
      text: {
        type: [Number, String],
        //文本
        default: "DNVUE"
      },
      size: {
        type: [Number, String],
        //文本大小
        default: 30
      },
      color: {
        type: String,
        //文本颜色
        default: "white"
      },
      width: {
        type: [Number, String],
        //宽度
        default: 520
      },
      height: {
        type: [Number, String],
        //高度
        default: 80
      },
      background: {
        type: String,
        //背景颜色
        default: "#0a84ec"
      },
      disabledBackground: {
        type: String,
        //禁用背景颜色
        default: "#d9d9d9"
      },
      gradient: {
        //渐变背景色
        type: String,
        //right,#69c0ff,#1890ff
        default: ""
      },
      radius: {
        type: [Number, String],
        //圆角
        default: 8
      },
      disabled: {
        type: Boolean,
        //禁用
        default: false
      },
      isIcon: {
        type: Boolean,
        //是否使用图标
        default: false
      }
    },
    data() {
      return {
        status: false
      };
    },
    computed: {
      buttonStyle() {
        let style = {
          background: this.disabled ? this.disabledBackground : this.background,
          width: `${this.width}rpx`,
          height: `${this.height}rpx`,
          borderRadius: `${this.radius}rpx`,
          opacity: this.status ? 0.8 : 1
        };
        if (this.gradient !== "" && !this.disabled) {
          let gradient = this.gradient.split(",");
          let gradientOne = gradient[1];
          let gradientTwo = gradient[2];
          style.backgroundImage = "linear-gradient(to " + gradient[0] + "," + gradientOne + "," + gradientTwo + ")";
        }
        return styleInto(style);
      }
    },
    methods: {
      //触摸开始，多点触控，后面的手指同样会触发
      touchstart() {
        if (!this.disabled) {
          this.status = true;
        }
      },
      //触摸结束，手指离开屏幕时
      touchend() {
        this.status = false;
      },
      //触摸被取消，当系统停止跟踪触摸的时候触发
      touchcancel() {
        this.status = false;
      },
      //点击事件
      click(e) {
        if (!this.disabled) {
          this.$emit("click", e);
        }
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_wrap_text = vue.resolveComponent("wrap-text");
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        onClick: _cache[0] || (_cache[0] = (...args) => $options.click && $options.click(...args)),
        onTouchcancel: _cache[1] || (_cache[1] = (...args) => $options.touchcancel && $options.touchcancel(...args)),
        onTouchstart: _cache[2] || (_cache[2] = (...args) => $options.touchstart && $options.touchstart(...args)),
        onTouchend: _cache[3] || (_cache[3] = (...args) => $options.touchend && $options.touchend(...args)),
        style: vue.normalizeStyle($options.buttonStyle),
        class: "flex-row justify-center items-center"
      },
      [
        vue.createVNode(_component_wrap_text, {
          color: $props.color,
          size: $props.size,
          text: $props.text,
          weight: ""
        }, null, 8, ["color", "size", "text"])
      ],
      36
      /* STYLE, NEED_HYDRATION */
    );
  }
  const WrapButton = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$3], ["__scopeId", "data-v-2f5cc69e"], ["__file", "E:/程序夹/emtmusic_app/uni_modules/wrap-version-update/components/wrap-button/wrap-button.nvue"]]);
  const _sfc_main$5 = {
    name: "WrapTransition",
    props: {
      show: {
        type: Boolean,
        default: false
      },
      modeClass: {
        type: Array,
        default() {
          return [];
        }
      },
      duration: {
        type: Number,
        default: 300
      },
      styleCustom: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        isShow: false,
        transform: "",
        ani: {
          in: "",
          active: ""
        }
      };
    },
    watch: {
      show: {
        handler(newVal) {
          if (newVal) {
            this.open();
          } else {
            this.close();
          }
        },
        immediate: true
      }
    },
    computed: {
      stylesObject() {
        let styles = {
          ...this.styleCustom,
          "transition-duration": this.duration / 1e3 + "s"
        };
        let transfrom = "";
        for (let i in styles) {
          let line = this.toLine(i);
          transfrom += line + ":" + styles[i] + ";";
        }
        return transfrom;
      }
    },
    methods: {
      change(event) {
        event.stopPropagation();
        this.$emit("click", {
          detail: this.isShow
        });
      },
      open() {
        clearTimeout(this.timer);
        this.isShow = true;
        this.transform = "";
        this.ani.in = "";
        for (let i in this.getTranfrom(false)) {
          if (i === "opacity") {
            this.ani.in = "fade-in";
          } else {
            this.transform += `${this.getTranfrom(false)[i]} `;
          }
        }
        this.$nextTick(() => {
          setTimeout(() => {
            this._animation(true);
          }, 50);
        });
      },
      close(type) {
        clearTimeout(this.timer);
        this._animation(false);
      },
      _animation(type) {
        let styles = this.getTranfrom(type);
        this.transform = "";
        for (let i in styles) {
          if (i === "opacity") {
            this.ani.in = `fade-${type ? "out" : "in"}`;
          } else {
            this.transform += `${styles[i]} `;
          }
        }
        this.timer = setTimeout(() => {
          if (!type) {
            this.isShow = false;
          }
          this.$emit("change", {
            detail: this.isShow
          });
        }, this.duration);
      },
      getTranfrom(type) {
        let styles = {
          transform: ""
        };
        this.modeClass.forEach((mode) => {
          switch (mode) {
            case "fade":
              styles.opacity = type ? 1 : 0;
              break;
            case "slide-top":
              styles.transform += `translateY(${type ? "0" : "-100%"}) `;
              break;
            case "slide-right":
              styles.transform += `translateX(${type ? "0" : "100%"}) `;
              break;
            case "slide-bottom":
              styles.transform += `translateY(${type ? "0" : "100%"}) `;
              break;
            case "slide-left":
              styles.transform += `translateX(${type ? "0" : "-100%"}) `;
              break;
            case "zoom-in":
              styles.transform += `scale(${type ? 1 : 0.8}) `;
              break;
            case "zoom-out":
              styles.transform += `scale(${type ? 1 : 1.2}) `;
              break;
          }
        });
        return styles;
      },
      _modeClassArr(type) {
        let mode = this.modeClass;
        if (typeof mode !== "string") {
          let modestr = "";
          mode.forEach((item) => {
            modestr += item + "-" + type + ",";
          });
          return modestr.substr(0, modestr.length - 1);
        } else {
          return mode + "-" + type;
        }
      },
      toLine(name) {
        return name.replace(/([A-Z])/g, "-$1").toLowerCase();
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return $data.isShow ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        style: vue.normalizeStyle([{ "display": "flex", "flex-direction": "column" }, "transform:" + $data.transform + ";" + $options.stylesObject]),
        ref: "ani",
        class: vue.normalizeClass(["view wrap-transition", [$data.ani.in]]),
        onClick: [
          _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.change && $options.change(...args), ["stop"])),
          _cache[1] || (_cache[1] = vue.withModifiers(() => {
          }, ["stop", "prevent"]))
        ],
        onTouchmove: _cache[2] || (_cache[2] = vue.withModifiers(() => {
        }, ["stop", "prevent"]))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      38
      /* CLASS, STYLE, NEED_HYDRATION */
    )) : vue.createCommentVNode("v-if", true);
  }
  const wrapTransition = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$2], ["__scopeId", "data-v-ffb957b9"], ["__file", "E:/程序夹/emtmusic_app/uni_modules/wrap-version-update/components/wrap-popup/wrap-transition.nvue"]]);
  const _sfc_main$4 = {
    name: "WrapPopup",
    components: {
      wrapTransition
    },
    props: {
      show: {
        type: Boolean,
        //控制显示或者隐藏
        default: false
      },
      direction: {
        type: String,
        //弹出层方向
        default: "bottom"
      },
      maskClose: {
        type: Boolean,
        //点击遮罩层是否可关闭
        default: true
      }
    },
    data() {
      return {
        isShow: false,
        //遮罩层
        maskClass: {
          "position": "fixed",
          "bottom": 0,
          "top": 0,
          "left": 0,
          "right": 0,
          "backgroundColor": "rgba(0, 0, 0, 0.4)"
        },
        popupData: {
          top: {
            modeClass: ["slide-top", "fade"],
            popupClass: {
              "position": "fixed",
              "left": 0,
              "right": 0,
              "top": 0,
              "backgroundColor": "#FFFFFF"
            }
          },
          bottom: {
            modeClass: ["slide-bottom", "fade"],
            popupClass: {
              "position": "fixed",
              "left": 0,
              "right": 0,
              "bottom": 0,
              "backgroundColor": "#FFFFFF"
            }
          },
          left: {
            modeClass: ["slide-left", "fade"],
            popupClass: {
              "position": "fixed",
              "bottom": 0,
              "top": 0,
              "left": 0,
              "backgroundColor": "#FFFFFF"
            }
          },
          right: {
            modeClass: ["slide-right", "fade"],
            popupClass: {
              "position": "fixed",
              "bottom": 0,
              "top": 0,
              "right": 0,
              "backgroundColor": "#FFFFFF"
            }
          },
          center: {
            modeClass: ["fade", "zoom-in"],
            popupClass: {
              "position": "fixed",
              "bottom": 0,
              "left": 0,
              "right": 0,
              "top": 0,
              "justifyContent": "center",
              "alignItems": "center"
            }
          }
        }
      };
    },
    watch: {
      show: {
        handler(newVal) {
          if (newVal) {
            this.open();
          } else {
            this.close();
          }
        },
        immediate: true
      }
    },
    methods: {
      //打开弹出层
      open() {
        this.isShow = true;
      },
      //关闭弹出层
      close(e) {
        if (this.isShow) {
          this.isShow = false;
        }
      },
      //点击关闭弹出层
      onMask(e) {
        formatAppLog("log", "at uni_modules/wrap-version-update/components/wrap-popup/wrap-popup.nvue:146", "点击了onMask", e);
        if (this.maskClose) {
          if (this.isShow) {
            this.isShow = false;
          }
        }
      },
      //当打开或者关闭返回信息
      onChange(e) {
        this.$emit("change", {
          detail: e.detail
        });
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_wrap_transition = vue.resolveComponent("wrap-transition");
    return vue.openBlock(), vue.createElementBlock("view", { class: "z-index view" }, [
      vue.createVNode(_component_wrap_transition, {
        onClick: $options.onMask,
        "mode-class": ["fade"],
        "style-custom": $data.maskClass,
        show: $data.isShow
      }, null, 8, ["onClick", "style-custom", "show"]),
      vue.createVNode(_component_wrap_transition, {
        onChange: $options.onChange,
        "mode-class": $data.popupData[$props.direction].modeClass,
        "style-custom": $data.popupData[$props.direction].popupClass,
        show: $data.isShow
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["onChange", "mode-class", "style-custom", "show"])
    ]);
  }
  const WrapPopup = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$1], ["__scopeId", "data-v-37bb4c62"], ["__file", "E:/程序夹/emtmusic_app/uni_modules/wrap-version-update/components/wrap-popup/wrap-popup.nvue"]]);
  const _sfc_main$3 = {
    name: "WrapVersionUpdate",
    components: {
      WrapButton,
      WrapText,
      WrapPopup
    },
    props: {
      // 重要！必改！应用id，从WrapStore后台获取，后台地址：https://apps.seepine.com/
      // 其中应用的id填充下方id即可
      id: {
        type: String,
        //应用id
        default: ""
      },
      // 接口地址
      apiUrl: {
        type: String,
        default: "https://appsapi.seepine.com/v1/check"
      },
      pageUrl: {
        type: String,
        default: "https://apps.seepine.com/app"
      },
      // 加载配置，分别是：是否显示加载、加载文字、是否mask、延迟出现时间
      loading: {
        type: Boolean,
        default: true
      },
      loadingText: {
        type: String,
        default: "检查更新中"
      },
      loadingMask: {
        type: Boolean,
        default: true
      },
      loadingDelay: {
        type: [String, Number],
        default: 1500
      },
      lines: {
        type: Number,
        default: 4
      },
      // 若需要手动传当前app版本号，可传入此值
      version: {
        type: String
      },
      bgImage: {
        type: String
      },
      textColor: {
        type: String,
        default: "#1e1e1e"
      },
      btnBgColor: {
        type: String,
        default: "#0a84ec"
      },
      btnTextColor: {
        type: String,
        default: "#FFFFFF"
      },
      secondaryBtnText: {
        type: String,
        default: "以后再说"
      },
      secondaryBtnTextColor: {
        type: String,
        default: "#afafaf"
      },
      errToast: {
        type: Boolean,
        default: true
      },
      errTimes: {
        type: Number,
        default: 2
      },
      auto: {
        type: Boolean,
        default: true
      },
      uniqueId: {
        type: String
      }
    },
    data() {
      return {
        show: false,
        init: false,
        release: {
          needUpdate: true,
          isHBuilderUpdate: false,
          isForceUpdate: true,
          version: "0.1.0",
          description: "",
          pkgUrl: "",
          wgtUrl: ""
        },
        btnVisible: true,
        btnText: "立即升级",
        percent: 0,
        tempPath: "",
        installFlag: false,
        defaultBgImg,
        nowVersion: "",
        openCount: 0
      };
    },
    computed: {
      config: function() {
        return {
          id: this.id,
          apiUrl: this.apiUrl,
          uniqueId: this.uniqueId,
          loading: this.loading,
          loadingText: this.loadingText,
          loadingMask: this.loadingMask,
          loadingDelay: this.loadingDelay
        };
      },
      downUrl: function() {
        if (!this.release.needUpdate) {
          return void 0;
        }
        if (!this.release.isHBuilderUpdate) {
          return this.release.wgtUrl;
        }
        return this.release.pkgUrl;
      },
      isHot: function() {
        return !this.release.isHBuilderUpdate;
      }
    },
    created() {
      if (!this.id) {
        uni.showToast({
          title: "请传入应用id",
          icon: "none",
          duration: 4e3
        });
        formatAppLog("error", "at uni_modules/wrap-version-update/components/wrap-version-update/wrap-version-update.nvue:211", "重要！必改！应用id必传，从WrapAppStore后台获取，后台地址：https://apps.seepine.com/");
        return;
      }
      if (this.auto) {
        this.init = true;
      }
      uni.getSystemInfo({
        success: (info) => {
          this.sysInfo = info;
          this.nowVersion = this.sysInfo.appWgtVersion || this.sysInfo.appVersion;
          this.check();
        }
      });
    },
    methods: {
      check() {
        checkUpdate(this.version || this.nowVersion, this.sysInfo, this.config).then((res) => {
          this.release = res;
          this.$emit("check", res);
          if (res.needUpdate) {
            if (this.init) {
              this.show = true;
            }
          } else {
            if (res.isTest) {
              formatAppLog("log", "at uni_modules/wrap-version-update/components/wrap-version-update/wrap-version-update.nvue:237", "测试版" + (this.version || this.nowVersion));
            }
            if (this.init) {
              this.$emit("finish", res);
            }
          }
          this.init = true;
        }).catch((err) => {
          this.$emit("error", err);
          if (this.errToast) {
            uni.showToast({
              title: err,
              icon: "none",
              duration: 4e3
            });
          }
        });
      },
      handleUpdate() {
        if (this.sysInfo.uniPlatform === "web" || this.sysInfo.uniPlatform === "h5") {
          uni.showToast({
            icon: "none",
            title: "非app无法安装"
          });
          this.btnVisible = true;
          return;
        }
        if (this.sysInfo.platform === "ios" && !this.isHot) {
          if (this.release.appleId) {
            plus.runtime.launchApplication(
              {
                action: `itms-apps://itunes.apple.com/cn/app/id${this.release.appleId}?mt=8`
              },
              (e) => {
                uni.showModal({
                  title: "跳转到appStore失败",
                  content: "请向app反馈，错误信息：" + e.message,
                  confirmText: "复制错误信息",
                  success: (res) => {
                    if (res.confirm) {
                      uni.setClipboardData({
                        data: e.message,
                        success: () => {
                        }
                      });
                    }
                  }
                });
              }
            );
          } else {
            uni.showToast({
              title: "未配置appleId无法跳转到appStore，请向app反馈",
              icon: "none",
              duration: 4e3
            });
          }
          return;
        }
        if (this.tempPath !== "") {
          this.openFile();
          return;
        }
        if (this.btnVisible) {
          this.btnVisible = false;
          downloadFile({
            url: this.downUrl,
            success: (filePath) => {
              this.percent = 100;
              this.tempPath = filePath;
              this.btnText = "马上安装";
              this.openFile();
            },
            fail: (e) => {
              formatAppLog("error", "at uni_modules/wrap-version-update/components/wrap-version-update/wrap-version-update.nvue:311", "下载文件", e);
              this.installFail();
              this.btnVisible = true;
            },
            progress: (progress) => {
              this.percent = progress;
            }
          });
        }
      },
      openFile: function() {
        this.btnVisible = true;
        if (!this.installFlag) {
          this.installFlag = true;
          uni.showToast({
            icon: "none",
            title: this.isHot ? "正在安装中" : "正在打开安装程序"
          });
          if (this.isHot) {
            plus.runtime.install(
              this.tempPath,
              {
                force: false
              },
              () => {
                uni.hideToast();
                setTimeout(() => {
                  plus.runtime.restart();
                }, 100);
              },
              (e) => {
                formatAppLog("error", "at uni_modules/wrap-version-update/components/wrap-version-update/wrap-version-update.nvue:342", "热更新失败", e);
                uni.hideToast();
                this.installFail();
              }
            );
          } else {
            setTimeout(() => {
              uni.openDocument({
                filePath: this.tempPath,
                fail: (e) => {
                  formatAppLog("error", "at uni_modules/wrap-version-update/components/wrap-version-update/wrap-version-update.nvue:352", "打开apk失败", e);
                  this.installFail();
                },
                complete: () => {
                  uni.hideToast();
                  this.installFlag = false;
                  this.openCount++;
                  if (this.openCount > this.errTimes) {
                    this.installFail();
                  }
                }
              });
            }, 500);
          }
        }
      },
      installFail() {
        uni.showModal({
          title: "温馨提醒",
          content: "请问是否出现安装包损坏或其他原因导致无法正常安装新版本的情况?请前往浏览器下载最新版本手动安装",
          confirmText: "立刻前往",
          success: (res) => {
            if (res.confirm) {
              plus.runtime.openURL(this.pageUrl + `/${this.id}`, () => {
                this.openUrlFail();
              });
            }
          }
        });
      },
      openUrlFail() {
        uni.showModal({
          content: "打开浏览器失败,请复制下载地址,手动打开手机浏览器输入地址下载",
          confirmText: "复制",
          success: (res) => {
            if (res.confirm) {
              uni.setClipboardData({
                data: this.pageUrl + `/${this.id}`,
                success: () => {
                }
              });
            }
          }
        });
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_wrap_text = vue.resolveComponent("wrap-text");
    const _component_wrap_button = vue.resolveComponent("wrap-button");
    const _component_wrap_popup = vue.resolveComponent("wrap-popup");
    return vue.openBlock(), vue.createBlock(_component_wrap_popup, {
      show: $data.show,
      direction: "center",
      "mask-close": $data.release.isForceUpdate
    }, {
      default: vue.withCtx(() => [
        vue.createElementVNode("view", { class: "view box-size" }, [
          vue.createElementVNode("image", {
            src: $props.bgImage ? $props.bgImage : $data.defaultBgImg,
            class: "box-size absolute"
          }, null, 8, ["src"]),
          vue.createElementVNode("view", { class: "view box-size absolute desc line-4" }, [
            vue.createVNode(_component_wrap_text, {
              color: $props.textColor,
              text: $data.release.description,
              lines: $props.lines
            }, null, 8, ["color", "text", "lines"])
          ]),
          vue.createElementVNode(
            "view",
            {
              class: "absolute footer",
              style: vue.normalizeStyle({ marginTop: `${$data.release.isForceUpdate ? 540 : 520}rpx` })
            },
            [
              vue.createVNode(_component_wrap_button, {
                size: "32",
                disabled: !$data.btnVisible,
                onClick: $options.handleUpdate,
                color: $props.btnTextColor,
                background: $props.btnBgColor,
                width: "400",
                radius: "40",
                text: $data.btnText
              }, null, 8, ["disabled", "onClick", "color", "background", "text"]),
              !$data.release.isForceUpdate && $data.btnVisible ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "items-center",
                style: { "margin-top": "2rpx" }
              }, [
                vue.createElementVNode("view", {
                  style: { "padding": "2rpx 20rpx" },
                  onClick: _cache[0] || (_cache[0] = ($event) => $data.show = false)
                }, [
                  vue.createVNode(_component_wrap_text, {
                    color: $props.secondaryBtnTextColor,
                    text: $props.secondaryBtnText
                  }, null, 8, ["color", "text"])
                ])
              ])) : vue.createCommentVNode("v-if", true),
              !$data.btnVisible ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                style: { "margin-top": "10rpx" }
              }, [
                vue.createElementVNode("progress", {
                  percent: $data.percent,
                  color: $props.btnBgColor
                }, null, 8, ["percent", "color"])
              ])) : vue.createCommentVNode("v-if", true)
            ],
            4
            /* STYLE */
          )
        ])
      ]),
      _: 1
      /* STABLE */
    }, 8, ["show", "mask-close"]);
  }
  const WrapVersionUpdate = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render], ["__scopeId", "data-v-3efccf6f"], ["__file", "E:/程序夹/emtmusic_app/uni_modules/wrap-version-update/components/wrap-version-update/wrap-version-update.nvue"]]);
  const _sfc_main$2 = {
    __name: "index",
    setup(__props) {
      const useIndex = useIndexStore();
      const items = vue.computed(() => useIndex.musicItems);
      vue.computed(() => useIndex.musicSelected);
      const showOptions = vue.computed(() => useIndex.showOptions);
      onReachBottom(() => {
        formatAppLog("log", "at pages/index/index.vue:55", "触底了！");
        if (useIndex.searchValue != "") {
          useIndex.page++;
          useIndex.search();
        }
      });
      onLoad(() => {
        useIndex.downPath = "/storage/emulated/0/EMT音乐";
      });
      function handleCheck(e) {
        if (e.needUpdate) {
          uni.hideTabBar();
        }
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createVNode(CompontentsTopBarTopBar),
            vue.createElementVNode("view", { class: "content" }, [
              vue.createCommentVNode(" 背景 "),
              vue.createElementVNode("image", {
                src: "/static/phone_bk.jpg",
                mode: "aspectFill",
                class: "bk"
              }),
              vue.createCommentVNode(" 查询组件 "),
              vue.createVNode(CompontentsMusicSearchMusicSearch),
              vue.createCommentVNode(" 音乐列表项组件 "),
              items.value.length > 1 ? (vue.openBlock(), vue.createElementBlock("div", { key: 0 }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(items.value, (item) => {
                    return vue.openBlock(), vue.createBlock(CompontentsMusicItemMusicItem, {
                      key: item.id,
                      obj: item,
                      class: "item"
                    }, null, 8, ["obj"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : vue.createCommentVNode("v-if", true),
              vue.createCommentVNode(" 音乐播放 "),
              vue.createVNode(CompontentsMusicPlayMusicPlay)
            ]),
            vue.createCommentVNode(" 选择操作 "),
            vue.withDirectives(vue.createElementVNode(
              "div",
              null,
              [
                vue.createVNode(CompontentsOptionsItemOptionsItem)
              ],
              512
              /* NEED_PATCH */
            ), [
              [vue.vShow, showOptions.value]
            ]),
            vue.createVNode(vue.unref(WrapVersionUpdate), {
              id: "540613223891013",
              onCheck: handleCheck
            })
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "E:/程序夹/emtmusic_app/pages/index/index.vue"]]);
  const arr1 = `    本应用资源全部来源于网络，如有冒犯十分抱歉，关于本应用存在的一些奇怪bug...并非本人原因，总而言之，如有问题或建议可以向emt1731041348@outlook.com传达`;
  const arr2 = `本软件的用处并非是作为常用听歌软件，而是作为音乐下载工具存在`;
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "setting",
    setup(__props) {
      const isShow = vue.ref(false);
      const path = vue.computed(() => useIndexStore().downPath);
      function show(options) {
        switch (options) {
          case 1:
            uni.showModal({
              content: arr1,
              showCancel: false
            });
            break;
          case 2:
            uni.showModal({
              content: arr2,
              showCancel: false
            });
        }
      }
      return (_ctx, _cache) => {
        const _component_uni_row = resolveEasycom(vue.resolveDynamicComponent("uni-row"), __easycom_0);
        return vue.openBlock(), vue.createElementBlock("view", { class: "setting" }, [
          vue.createVNode(_component_uni_row, {
            class: "row",
            onClick: _cache[0] || (_cache[0] = ($event) => show(1))
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode(" 关于本应用 ")
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_row, {
            class: vue.normalizeClass(["row", { isShow: isShow.value }]),
            onClick: _cache[1] || (_cache[1] = ($event) => isShow.value = !isShow.value)
          }, {
            default: vue.withCtx(() => [
              !isShow.value ? (vue.openBlock(), vue.createElementBlock("text", { key: 0 }, "文件存储位置")) : vue.createCommentVNode("v-if", true),
              isShow.value ? (vue.openBlock(), vue.createElementBlock(
                "text",
                { key: 1 },
                vue.toDisplayString(path.value),
                1
                /* TEXT */
              )) : vue.createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          }, 8, ["class"]),
          vue.createVNode(_component_uni_row, {
            class: "row",
            onClick: _cache[2] || (_cache[2] = ($event) => show(2))
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode(" 作者有话说 ")
            ]),
            _: 1
            /* STABLE */
          })
        ]);
      };
    }
  });
  const PagesSettingSetting = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-018cdf56"], ["__file", "E:/程序夹/emtmusic_app/pages/setting/setting.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("compontents/musicItem/musicItem", CompontentsMusicItemMusicItem);
  __definePage("compontents/musicSearch/musicSearch", CompontentsMusicSearchMusicSearch);
  __definePage("compontents/topBar/topBar", CompontentsTopBarTopBar);
  __definePage("pages/setting/setting", PagesSettingSetting);
  __definePage("compontents/musicPlay/musicPlay", CompontentsMusicPlayMusicPlay);
  __definePage("compontents/optionsItem/optionsItem", CompontentsOptionsItemOptionsItem);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "E:/程序夹/emtmusic_app/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    const pinia = createPinia();
    app.use(pinia);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
