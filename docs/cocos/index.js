System.register(["./application.js"],(function(e,t){"use strict";var n;function r(e){return new Promise((function(t,n){var r;function a(t){t.filename===e&&(r=t.error)}window.addEventListener("error",a);var o=document.createElement("script");o.charset="utf-8",o.async=!0,o.crossOrigin="anonymous",o.addEventListener("error",(function(){window.removeEventListener("error",a),n(Error("Error loading "+e))})),o.addEventListener("load",(function(){window.removeEventListener("error",a),document.head.removeChild(o),r?n(r):t()})),o.src=e,document.head.appendChild(o)}))}function a(e){return fetch(e).then((function(e){return e.arrayBuffer()}))}function o(){var e=document.getElementById("GameCanvas");e&&"CANVAS"===e.tagName||console.error("Cannot find canvas(#GameCanvas)");var t=e.width,n=e.height,r=document.createElement("div");e&&e.parentNode&&e.parentNode.insertBefore(r,e),r.setAttribute("id","Cocos3dGameContainer"),r.appendChild(e);var a,o,i=r.parentNode===document.body?document.documentElement:r.parentNode;return o="gameCanvas",(" "+(a=e).className+" ").indexOf(" "+o+" ")>-1||(a.className&&(a.className+=" "),a.className+=o),e.setAttribute("width",t||"480"),e.setAttribute("height",n||"320"),e.setAttribute("tabindex","99"),{frame:i,canvas:e,container:r}}return{setters:[function(e){n=e.createApplication}],execute:function(){n({loadJsListFile:r,fetchWasm:a}).then((function(e){return e.start({findCanvas:o})})).catch((function(e){console.error(e)}))}}}));