System.register([],(function(e,n){"use strict";return e("createApplication",(function(e){var t=e.loadJsListFile,r=e.fetchWasm,i=Promise.resolve();return(i=i.then((function(){return s("wait-for-ammo-instantiation")})).then((function(e){var n=e.default,t=n.isWasm,i=n.wasmBinaryURL;return t?Promise.resolve(r(i)).then((function(e){return n(e)})):n()}))).then((function(){return t=s,(n="import")in(e={start:o})?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e;var e,n,t}));function o(e){var n,r,i=e.findCanvas;return Promise.resolve().then((function(){return s("cc")})).then((function(e){return r=e,function(e){var n="src/settings.json";return new Promise((function(e,t){if("undefined"==typeof fsUtils||n.startsWith("http")){var r=3,i=2e3;!function o(){var s=new XMLHttpRequest;s.open("GET",n),s.responseType="text",s.onload=function(){window._CCSettings=JSON.parse(s.response),window._CCSettings.server="",e()},s.onerror=function(){r-- >0?setTimeout(o,i):t(new Error("request settings failed!"))},s.send(null)}()}else{var o=fsUtils.readJsonSync(n);o instanceof Error?t(o):(window._CCSettings=o,window._CCSettings.server="",e())}}))}()})).then((function(){return n=window._CCSettings,function(e,n,t){if(n.macros)for(var r in n.macros)e.macro[r]=n.macros[r];var i=function(e,n){var t={bundleVers:e.bundleVers,remoteBundles:e.remoteBundles,server:e.server,subpackages:e.subpackages};return{debugMode:e.debug?1:3,showFPS:e.debug,frameRate:60,groupList:e.groupList,collisionMatrix:e.collisionMatrix,renderPipeline:e.renderPipeline,adapter:n("GameCanvas"),assetOptions:t,customJointTextureLayouts:e.customJointTextureLayouts||[],physics:e.physics}}(n,t);return Promise.resolve(e.game.init(i))}(r,n,i).then((function(){if(n.scriptPackages)return e=n.scriptPackages,Promise.all(e.map((function(e){return s(e)})));var e})).then((function(){return function(e){var n=Promise.resolve();return e.forEach((function(e){n=n.then((function(){return t("src/".concat(e))}))})),n}(n.jsList)})).then((function(){return u(n.hasResourcesBundle,n.hasStartSceneBundle)})).then((function(){return r.game.run((function(){return function(e,n){window._CCSettings=void 0,e.view.enableRetina(!0),e.view.resizeWithBrowserSize(!0),e.sys.isMobile&&("landscape"===n.orientation?e.view.setOrientation(e.macro.ORIENTATION_LANDSCAPE):"portrait"===n.orientation&&e.view.setOrientation(e.macro.ORIENTATION_PORTRAIT),e.view.enableAutoFullScreen(!1));var t=n.launchScene;e.director.loadScene(t,null,(function(){e.view.setDesignResolutionSize(960,640,4),console.log("Success to load scene: ".concat(t))}))}(r,n)}))}))}))}function s(e){return n.import("".concat(e))}function u(e,n){Promise.resolve();var t=cc.AssetManager.BuiltinBundleName,r=t.MAIN,i=t.RESOURCES,o=t.START_SCENE,s=e?[i,r]:[r];return n&&s.push(o),s.reduce((function(e,n){return e.then((function(){return function(e){return new Promise((function(n,t){cc.assetManager.loadBundle(e,(function(e,r){if(e)return t(e);n(r)}))}))}(n)}))}),Promise.resolve())}})),{setters:[],execute:function(){}}}));