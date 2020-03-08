(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
var baseSum=require("./_baseSum"),NAN=NaN;function baseMean(e,a){var u=null==e?0:e.length;return u?baseSum(e,a)/u:NAN}module.exports=baseMean;

},{"./_baseSum":4}],4:[function(require,module,exports){
function baseSum(e,o){for(var r,u=-1,a=e.length;++u<a;){var n=o(e[u]);void 0!==n&&(r=void 0===r?n:r+n)}return r}module.exports=baseSum;

},{}],5:[function(require,module,exports){
function identity(t){return t}module.exports=identity;

},{}],6:[function(require,module,exports){
var baseMean=require("./_baseMean"),identity=require("./identity");function mean(e){return baseMean(e,identity)}module.exports=mean;

},{"./_baseMean":3,"./identity":5}],7:[function(require,module,exports){
"use strict";var pug_has_own_property=Object.prototype.hasOwnProperty;function pug_merge(r,e){if(1===arguments.length){for(var t=r[0],s=1;s<r.length;s++)t=pug_merge(t,r[s]);return t}for(var a in e)if("class"===a){var n=r[a]||[];r[a]=(Array.isArray(n)?n:[n]).concat(e[a]||[])}else if("style"===a){n=(n=pug_style(r[a]))&&";"!==n[n.length-1]?n+";":n;var u=pug_style(e[a]);u=u&&";"!==u[u.length-1]?u+";":u,r[a]=n+u}else r[a]=e[a];return r}function pug_classes_array(r,e){for(var t,s="",a="",n=Array.isArray(e),u=0;u<r.length;u++)(t=pug_classes(r[u]))&&(n&&e[u]&&(t=pug_escape(t)),s=s+a+t,a=" ");return s}function pug_classes_object(r){var e="",t="";for(var s in r)s&&r[s]&&pug_has_own_property.call(r,s)&&(e=e+t+s,t=" ");return e}function pug_classes(r,e){return Array.isArray(r)?pug_classes_array(r,e):r&&"object"==typeof r?pug_classes_object(r):r||""}function pug_style(r){if(!r)return"";if("object"==typeof r){var e="";for(var t in r)pug_has_own_property.call(r,t)&&(e=e+t+":"+r[t]+";");return e}return r+""}function pug_attr(r,e,t,s){if(!1===e||null==e||!e&&("class"===r||"style"===r))return"";if(!0===e)return" "+(s?r:r+'="'+r+'"');var a=typeof e;return"object"!==a&&"function"!==a||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),t||-1===e.indexOf('"'))?(t&&(e=pug_escape(e))," "+r+'="'+e+'"'):" "+r+"='"+e.replace(/'/g,"&#39;")+"'"}function pug_attrs(r,e){var t="";for(var s in r)if(pug_has_own_property.call(r,s)){var a=r[s];if("class"===s){t=pug_attr(s,a=pug_classes(a),!1,e)+t;continue}"style"===s&&(a=pug_style(a)),t+=pug_attr(s,a,!1,e)}return t}exports.merge=pug_merge,exports.classes=pug_classes,exports.style=pug_style,exports.attr=pug_attr,exports.attrs=pug_attrs;var pug_match_html=/["&<>]/;function pug_escape(r){var e=""+r,t=pug_match_html.exec(e);if(!t)return r;var s,a,n,u="";for(s=t.index,a=0;s<e.length;s++){switch(e.charCodeAt(s)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}a!==s&&(u+=e.substring(a,s)),a=s+1,u+=n}return a!==s?u+e.substring(a,s):u}function pug_rethrow(r,e,t,s){if(!(r instanceof Error))throw r;if(!("undefined"==typeof window&&e||s))throw r.message+=" on line "+t,r;try{s=s||require("fs").readFileSync(e,"utf8")}catch(o){pug_rethrow(r,null,t)}var a=3,n=s.split("\n"),u=Math.max(t-a,0),p=Math.min(n.length,t+a);a=n.slice(u,p).map(function(r,e){var s=e+u+1;return(s==t?"  > ":"    ")+s+"| "+r}).join("\n");throw r.path=e,r.message=(e||"Pug")+":"+t+"\n"+a+"\n\n"+r.message,r}exports.escape=pug_escape,exports.rethrow=pug_rethrow;

},{"fs":1}],8:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Bars=void 0;var _bars=_interopRequireDefault(require("./bars.pug")),_mean=_interopRequireDefault(require("lodash/mean"));function _interopRequireDefault(t){return t&&t.__esModule?t:{default:t}}function asyncGeneratorStep(t,a,e,s,r,i,n){try{var o=t[i](n),d=o.value}catch(l){return void e(l)}o.done?a(d):Promise.resolve(d).then(s,r)}function _asyncToGenerator(t){return function(){var a=this,e=arguments;return new Promise(function(s,r){var i=t.apply(a,e);function n(t){asyncGeneratorStep(i,s,r,n,o,"next",t)}function o(t){asyncGeneratorStep(i,s,r,n,o,"throw",t)}n(void 0)})}}var styles=":host {   position: fixed;   width: 100%;   height: 100%;   display: -ms-grid;   display: grid;   grid-auto-rows: min-content;   -ms-grid-rows: min-content auto;       grid-template-rows: min-content auto;   grid-gap: 1em;   -ms-grid-row-align: center;       align-items: center;   position: relative;   background: #210741;   box-sizing: border-box;   padding: 1em 1em 0 1em;   background-image: url(\"bg_grid_static.png\");   background-repeat: no-repeat;   background-size: cover;   --bar-block-0: #8f1861;   --bar-block-1: #a12973;   --bar-block-2: #ad326d;   --bar-block-3: #b9456a;   --bar-block-4: #c65e67;   --bar-block-5: #c97962;   --bar-block-6: #c49365;   --bar-block-7: #bdad67; } .sun {   width: 100%;   height: 100%;   position: absolute;   background: url(\"bg_sun_static.png\");   background-repeat: no-repeat;   background-position: center top;   z-index: 1; } .ssky {   width: 100%;   height: 100%;   position: absolute;   z-index: 1;   display: -ms-flexbox;   display: flex;   -ms-flex-align: center;       align-items: center;   -ms-flex-pack: center;       justify-content: center;   z-index: 3; } .ssky .image {   position: absolute;   transition: filter 0.15s ease-in-out;   background-repeat: no-repeat;   width: 100%;   height: 100%;   background-position: center center; } .ssky .image.static {   background-image: url(\"ssky_static.png\"); } .ssky .image.animated {   background-image: url(\"ssky_animated.gif\"); } .buttons {   display: -ms-grid;   display: grid;   grid-auto-flow: column;   grid-gap: 1em;   z-index: 4; } .buttons i {   font-family: 'Material Icons';   font-style: normal; } button.play {   display: -ms-flexbox;   display: flex;   -ms-flex-align: center;       align-items: center;   -ms-flex-pack: center;       justify-content: center;   padding: 0.25em;   min-width: 50px;   max-width: 50px;   font-size: 1.5em;   border: none;   border-radius: 2px;   cursor: pointer;   box-shadow: 0px 1px 4px rgba(0,0,0,0.5); } button.play.clicked {   animation: pulse 1s;   box-shadow: 0 0 0 1em rgba(255,255,255,0); } button.play:focus {   outline: none; } :host:not([data-state='paused']) i.play {   display: none; } :host([data-state='playing']) button.play {   background: var(--playing-bg);   color: var(--playing-color);   --pulse-color: var(--playing-bg); } :host([data-state='playing']) button.play > i.play {   display: none; } :host([data-state='playing']) .ssky .image.static {   opacity: 0; } :host([data-state='playing']) .ssky .image.animated {   filter: drop-shadow(0px 0px 30px rgba(213,56,156,0.5)); } :host([data-state=\"unstarted\"]) button.play {   background: var(--unstarted-bg);   color: var(--unstarted-color);   --pulse-color: var(--unstarted-bg); } :host([data-state=\"unstarted\"]) i.pause {   display: none; } :host([data-state='paused']) button.play {   background: var(--paused-bg);   color: var(--paused-color);   --pulse-color: var(--paused-bg); } :host([data-state='paused']) i.pause {   display: none; } :host([data-state=\"unstarted\"]) .ssky img.animated, :host([data-state=\"paused\"]) .ssky img.animated {   display: none; } :host([data-state=\"unstarted\"]) .ssky img.static, :host([data-state=\"paused\"]) .ssky img.static {   display: block; } :host([data-state=\"unstarted\"]) .bars .bar span, :host([data-state=\"paused\"]) .bars .bar span {   opacity: 0 !important; } .bars {   display: -ms-grid;   display: grid;   grid-auto-flow: column;   grid-gap: 1em;   -ms-grid-row-align: end;       align-items: end;   height: 100%;   padding: 1em 0 0;   box-sizing: border-box;   z-index: 2; } .bars .bar {   display: -ms-flexbox;   display: flex;   -ms-flex-direction: column-reverse;       flex-direction: column-reverse;   -ms-flex-align: center;       align-items: center; } .bars .bar span {   width: 64px;   height: 40px;   opacity: 0;   transition: opacity 0.1s ease; } .bars .bar span:not(:first-child) {   margin-bottom: 1em; } .bars .bar span[index='0'] {   background: var(--bar-block-0); } .bars .bar span[index='1'] {   background: var(--bar-block-1); } .bars .bar span[index='2'] {   background: var(--bar-block-2); } .bars .bar span[index='3'] {   background: var(--bar-block-3); } .bars .bar span[index='4'] {   background: var(--bar-block-4); } .bars .bar span[index='5'] {   background: var(--bar-block-5); } .bars .bar span[index='6'] {   background: var(--bar-block-6); } .bars .bar span[index='7'] {   background: var(--bar-block-7); } .creds {   position: absolute;   bottom: 0;   right: 0;   box-sizing: border-box;   padding: 0.5em 27px 19px;   cursor: pointer;   z-index: 5; } .creds a {   display: -ms-grid;   display: grid;   grid-auto-flow: column;   grid-gap: 0.25em; } .creds a, .creds a:visited {   font-family: 'Oxanium';   font-size: 0.7em;   text-decoration: none; } .creds a span, .creds a:visited span {   transition: all 0.5s ease;   color: rgba(182,197,222,0.75); } .creds:hover span:first-of-type {   opacity: 0.75; } .creds:hover span:last-of-type {   color: #07bbf2; } @media (max-width: 640px) {   .bars .bar span {     width: 28px;     height: 17px;   }   .creds {     padding: 0.25em;   }   .creds a {     font-size: 0.7em;   }   .ssky .image {     background-size: 65%;   }   .sun {     background-size: auto 45%;   } } @keyframes pulse {   0% {     box-shadow: 0 0 0 0 var(--pulse-color);   } } ";const URL="wraith_of_red_hill.mp3",FPS=40;class Bars extends HTMLElement{constructor(){super(),this.PLAY_STATE="unstarted",this.styles=styles,this.template=(0,_bars.default)(),this.thresholds={0:250,1:230,2:225,3:210,4:180,5:160,6:75,7:1},this.fpsInterval=1e3/FPS,this.then=Date.now(),this.startTime=this.then,this.now=null,this.elapsed=null}getFreqPerc(t,a,e=0){return(t-e)/(a-e)*100}getMaxFrequency(t){for(var a=[];t.length;)a.push((0,_mean.default)(t.splice(0,4)));return a}attributeChangedCallback(t,a){this[t]=a}connectedCallback(){this.setAttribute("data-state",this.PLAY_STATE),window.AudioContext=window.AudioContext||window.webkitAudioContext,this.AUDIO_CTX=new AudioContext,this.bars=this.shadowRoot.querySelectorAll(".bars .bar"),this.AUDIO=new Audio(URL),this.ANALYZER=this.AUDIO_CTX.createAnalyser(),this.ANALYZER.fftSize=64,this.FREQUENCY_DATA=new Uint8Array(this.ANALYZER.frequencyBinCount),this.PLAY_BUTTON=this.shadowRoot.querySelector("button.play"),this.PLAY_BUTTON.addEventListener("click",()=>this.startOrPause()),this.AUDIO.addEventListener("canplay",()=>{this.SOURCE=this.AUDIO_CTX.createMediaElementSource(this.AUDIO),this.SOURCE.connect(this.ANALYZER),this.ANALYZER.connect(this.AUDIO_CTX.destination)}),this.AUDIO.addEventListener("play",t=>{this.PLAY_STATE="playing",this.setAttribute("data-state","playing"),this.drawBars()}),this.AUDIO.addEventListener("pause",()=>{this.PLAY_STATE="paused",this.setAttribute("data-state","paused")}),this.AUDIO.addEventListener("ended",()=>{this.PLAY_STATE="unstarted",this.setAttribute("data-state","unstarted")})}startOrPause(){var t=this;return _asyncToGenerator(function*(){t.AUDIO_CTX.resume(),"playing"!==t.PLAY_STATE?t.AUDIO.play():t.AUDIO.pause(),t.PLAY_BUTTON.classList.add("clicked"),setTimeout(()=>t.PLAY_BUTTON.classList.remove("clicked"),1e3)})()}drawBars(){if("playing"===this.PLAY_STATE){if(requestAnimationFrame(()=>this.drawBars()),this.now=Date.now(),this.elapsed=this.now-this.then,this.elapsed<this.fpsInterval)return;this.then=this.now-this.elapsed%this.fpsInterval,this.ANALYZER.getByteFrequencyData(this.FREQUENCY_DATA),this.getMaxFrequency(Array.from(this.FREQUENCY_DATA),4).forEach((t,a)=>{var e=this.getFreqPerc(t,this.thresholds[a]);const s=this.bars[a].querySelectorAll("span");s.forEach((t,a)=>{const r=(a+1)*(100/s.length);t.style.opacity=r<=e?1:0})})}}}exports.Bars=Bars;

},{"./bars.pug":9,"lodash/mean":6}],9:[function(require,module,exports){
"use strict";var pug=require("pug-runtime");function pug_attr(t,n,a,e){if(!1===n||null==n||!n&&("class"===t||"style"===t))return"";if(!0===n)return" "+(e?t:t+'="'+t+'"');var r=typeof n;return"object"!==r&&"function"!==r||"function"!=typeof n.toJSON||(n=n.toJSON()),"string"==typeof n||(n=JSON.stringify(n),a||-1===n.indexOf('"'))?(a&&(n=pug_escape(n))," "+t+'="'+n+'"'):" "+t+"='"+n.replace(/'/g,"&#39;")+"'"}function pug_escape(t){var n=""+t,a=pug_match_html.exec(n);if(!a)return t;var e,r,i,s="";for(e=a.index,r=0;e<n.length;e++){switch(n.charCodeAt(e)){case 34:i="&quot;";break;case 38:i="&amp;";break;case 60:i="&lt;";break;case 62:i="&gt;";break;default:continue}r!==e&&(s+=n.substring(r,e)),r=e+1,s+=i}return r!==e?s+n.substring(r,e):s}module.exports=template;var pug_match_html=/["&<>]/;function pug_rethrow(t,n,a,e){if(!(t instanceof Error))throw t;if(!("undefined"==typeof window&&n||e))throw t.message+=" on line "+a,t;try{e=e||require("fs").readFileSync(n,"utf8")}catch(n){pug_rethrow(t,null,a)}var r=3,i=e.split("\n"),s=Math.max(a-r,0),o=Math.min(i.length,a+r);r=i.slice(s,o).map(function(t,n){var e=n+s+1;return(e==a?"  > ":"    ")+e+"| "+t}).join("\n");throw t.path=n,t.message=(n||"Pug")+":"+a+"\n"+r+"\n\n"+t.message,t}function template(t){var n="";return n+='\n<div class="ssky">',n+='\n  <div class="image animated"></div>',n+='\n  <div class="image static"></div>\n</div>',n+='\n<div class="sun"></div>',n+='\n<div class="buttons">',n+='\n  <button class="play">',n+='<i class="material-icons play">',n+="play_arrow</i>",n+='<i class="material-icons pause">',n+="pause</i></button>\n</div>",n+='\n<div class="bars">',function(){var t=[0,1,2,3,4,5,6,7];if("number"==typeof t.length)for(var a=0,e=t.length;a<e;a++){n=n+'\n  <div class="bar"'+pug_attr("index",a,!0,!1)+">",function(){var t=[0,1,2,3,4,5,6,7];if("number"==typeof t.length)for(var a=0,e=t.length;a<e;a++){n=n+"<span"+pug_attr("index",t[a],!0,!1)+"></span>"}else{e=0;for(var a in t){e++,n=n+"<span"+pug_attr("index",t[a],!0,!1)+"></span>"}}}.call(this),n+="\n  </div>"}else{e=0;for(var a in t){e++;n=n+'\n  <div class="bar"'+pug_attr("index",a,!0,!1)+">",function(){var t=[0,1,2,3,4,5,6,7];if("number"==typeof t.length)for(var a=0,e=t.length;a<e;a++){n=n+"<span"+pug_attr("index",t[a],!0,!1)+"></span>"}else{e=0;for(var a in t){e++,n=n+"<span"+pug_attr("index",t[a],!0,!1)+"></span>"}}}.call(this),n+="\n  </div>"}}}.call(this),n+="\n</div>",n+='\n<div class="creds">',n+='<a href="http://www.instagram.com/dotdotdotpix" target="_blank">',n+="<span>",n+="Animation by</span>",n+="<span>",n+="dotdotdotpix</span></a></div>"}

},{"fs":2,"pug-runtime":7}],10:[function(require,module,exports){
"use strict";var _lib=require("./lib"),_bars=require("./components/bars/bars");document.body.querySelector("main").appendChild((0,_lib.define)(_bars.Bars));

},{"./components/bars/bars":8,"./lib":11}],11:[function(require,module,exports){
(function (global){
"use strict";function attachTemplate(e){e.attachShadow({mode:"open"});const t=document.createElement("style");t.innerHTML=e.styles,e.shadowRoot.appendChild(t);const n=document.createElement("template");return n.innerHTML=e.template,e.shadowRoot.appendChild(n.content),e}function define(e){const t=`ss-${e.name.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`;return customElements.define(t,e),attachTemplate(document.createElement(t))}Object.defineProperty(exports,"__esModule",{value:!0}),exports.attachTemplate=attachTemplate,exports.define=define,global.CACHE={};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[10]);
