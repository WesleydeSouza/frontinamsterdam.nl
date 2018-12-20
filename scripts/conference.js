(function(e){function i(e,t){if(!(this instanceof i))return new i(e,t);if(e instanceof i)return e;var n=i.require("Util");this.elements="string"==typeof e?(this.selector=e,this.qsa(t,e)):e instanceof Array?n.unique(e.filter(n.isElement)):n.isNodeList(e)?Array.prototype.slice.call(e).filter(n.isElement):n.isElement(e)?[e]:[],this._update()}i.version="0.1.0";var n={};i.require=function(e){return n[e]},i.define=function(e,t){n[e]=t.call(i.prototype)},e.Rye=i})(window),Rye.define("Util",function(){function t(e,t,n){if(e){if(e.forEach===a)return e.forEach(t,n);if(e.length===+e.length)for(var i=0;e.length>i;i++)t.call(n||e,e[i],i,e);else{var r=Object.keys(e);for(i=0;r.length>i;i++){var s=r[i];t.call(n||e,e[s],s,e)}}}}function i(n){return t(u.call(arguments,1),function(e){t(e,function(e,t){n[t]=e})}),n}function s(e,t){var n,i=e[0].toUpperCase()+e.substring(1),r=["moz","webkit","ms","o"];if(n=(t=t||window)[e])return n;for(;(s=r.shift())&&!(n=t[s+i]););return n}function r(t,n,i,r,s){return"string"==typeof n&&(n=t[n]),function(){var e=u.call(arguments,0,r||1/0);return i&&(e=s?i.concat(e):e.concat(i)),"number"==typeof t&&(t=e[t]),n.apply(t||this,e)}}function n(e,t,n,i){return r(e,t,n,i,!0)}function o(e){var t=l.call(e).match(/\s(\w+)\]$/);return t&&t[1].toLowerCase()}function c(e,t){return 0<=e.indexOf(o(t))}var u=Array.prototype.slice,a=Array.prototype.forEach,l=Object.prototype.toString,h={current:0,next:function(){return++this.current}};return{each:t,extend:i,inherits:function(e,t){function n(){this.constructor=e}return i(e,t),n.prototype=t.prototype,e.prototype=new n,e.__super__=t.prototype,e},isElement:function(e){return e&&(1===e.nodeType||9===e.nodeType)},isNodeList:function(e){return e&&c(["nodelist","htmlcollection","htmlformcontrolscollection"],e)},unique:function(n){return n.filter(function(e,t){return n.indexOf(e)==t})},pluck:function(e,t){return e.map(function(e){return e[t]})},put:function(n,i,r){return n.forEach(function(e,t){n[t][i]=r})},prefix:s,applyRight:function(e,t,n,i){return r(e,t,n,i)},applyLeft:n,curry:function(e){return n(this,e,u.call(arguments,1))},getUid:function(e){return e.rye_id||(e.rye_id=h.next())},type:o,is:c}}),Rye.define("Data",function(){function i(e,t,n){var i=s.getUid(e);(o[i]||(o[i]={}))[t]=n}function r(e,t){var n=o[s.getUid(e)];return null==t?n:n&&n[t]}var s=Rye.require("Util"),o={};return this.data=function(t,n){return void 0!==n?(this.each(function(e){i(e,t,n)}),this):1===this.elements.length?r(this.elements[0],t):this.elements.map(function(e){return r(e,t)})},{set:i,get:r}}),Rye.define("Query",function(){function r(t,e){var n,i;return!!(t&&c.isElement(t)&&e)&&(e.nodeType?t===e:e instanceof Rye?e.elements.some(function(e){return r(t,e)}):t!==document&&((n=c.prefix("matchesSelector",h))?n.call(t,e):(t.parentNode||h.appendChild(t),i=0<=s(t.parentNode,e).indexOf(t),t.parentNode===h&&h.removeChild(t),i)))}function s(e,t){var n;e=e||document,!t.match(a)||"#"===RegExp.$1&&e!==document?n=l._:(n=l[RegExp.$1],t=RegExp.$2);var i=e[n](t);return c.isNodeList(i)?u.call(i):c.isElement(i)?[i]:[]}function n(e,t,n){for(;(e=e[t])&&(n&&!r(e,n)||!c.isElement(e)););return e}function o(e,t){return null==t?new Rye(e):new Rye(e).filter(t)}var c=Rye.require("Util"),u=Array.prototype.slice,a=/^([.#]?)([\w\-]+)$/,l={".":"getElementsByClassName","#":"getElementById","":"getElementsByTagName",_:"querySelectorAll"},h=document.createElement("div");return this.qsa=s,this.find=function(n){return o(1===this.length?s(this.elements[0],n):this.elements.reduce(function(e,t){return e.concat(s(t,n))},[]))},this.filter=function(t,n){if("function"!=typeof t)return t&&"!"===t[0]&&(t=t.substr(1),n=!0),o(this.elements.filter(function(e){return r(e,t)!=(n||!1)}));var i=t;return o(this.elements.filter(function(e,t){return i.call(e,e,t)!=(n||!1)}))},this.contains=function(n){var i;return o(this.elements.reduce(function(e,t){return i=s(t,n),e.concat(i.length?t:null)},[]))},this.is=function(e){return 0<this.length&&0<this.filter(e).length},this.not=function(e){return this.filter(e,!0)},this.index=function(e){return null==e?this.parent().children().indexOf(this.elements[0]):this.indexOf(new Rye(e).elements[0])},this.add=function(e,t){var n=e;return"string"==typeof e&&(n=new Rye(e,t).elements),this.concat(n)},this.pluckNode=function(t){return this.map(function(e){return n(e,t)})},this.next=function(){return o(this.pluckNode("nextSibling"))},this.prev=function(){return o(this.pluckNode("previousSibling"))},this.first=function(){return o(this.get(0))},this.last=function(){return o(this.get(-1))},this.siblings=function(e){var n=[];return this.each(function(t){u.call(t.parentNode.childNodes).forEach(function(e){c.isElement(e)&&e!==t&&n.push(e)})}),o(n,e)},this.parent=function(e){return o(this.pluck("parentNode"),e)},this.parents=function(e){for(var t=[],n=this.elements,i=function(e){return(e=e.parentNode)&&e!==document&&t.indexOf(e)<0?(t.push(e),e):void 0};0<n.length&&void 0!==n[0];)n=n.map(i);return o(t,e)},this.closest=function(t){return this.map(function(e){return r(e,t)?e:n(e,"parentNode",t)})},this.children=function(e){return o(this.elements.reduce(function(e,t){var n=u.call(t.children);return e.concat(n)},[]),e)},{matches:r,qsa:s,getClosestNode:n}}),Rye.define("Collection",function(){var n=Rye.require("Util"),i=Array.prototype.slice,t=Array.prototype.concat;this.get=function(e){return null==e?this.elements.slice():this.elements[e<0?this.elements.length+e:e]},this.eq=function(e){return null==e?new Rye:new Rye(this.get(e))},["forEach","reduce","reduceRight","indexOf"].forEach(function(r){this[r]=function(e,t,n,i){return this.elements[r](e,t,n,i)}}.bind(this)),["map","sort"].forEach(function(r){this[r]=function(e,t,n,i){return new Rye(this.elements[r](e,t,n,i))}}.bind(this)),this.each=function(e){return this.elements.forEach(e),this},this.iterate=function(s,o){return function(t,n,i,r){return this.each(function(e){s.call(o,e,t,n,i,r)})}},this.push=function(e){return n.isElement(e)?(this.elements.push(e),this._update(),this.length-1):-1},this.slice=function(e,t){return new Rye(i.call(this.elements,e,t))},this.concat=function(){var e=i.call(arguments).map(function(e){return e instanceof Rye?e.elements:e});return new Rye(t.apply(this.elements,e))},this.pluck=function(e){return n.pluck(this.elements,e)},this.put=function(e,t){return n.put(this.elements,e,t),this},this._update=function(){this.length=this.elements.length}}),Rye.define("Manipulation",function(){function n(e){return e.multiple?new Rye(e).find("option").filter(function(e){return e.selected&&!e.disabled}).pluck("value"):e.value}function e(e,t){return"value"===t&&"INPUT"==e.nodeName?n(e):e.getAttribute(t)}function t(e,t){"string"==typeof t?e.insertAdjacentHTML("beforeend",t):e.appendChild(t)}function i(e,t){var n;"string"==typeof t?e.insertAdjacentHTML("afterbegin",t):(n=e.childNodes[0])?e.insertBefore(t,n):e.appendChild(t)}function r(e,t){var n;"string"==typeof t?e.insertAdjacentHTML("afterend",t):(n=c.getClosestNode(e,"nextSibling"))?e.parentNode.insertBefore(t,n):e.parentNode.appendChild(t)}function s(e,t){"string"==typeof t?e.insertAdjacentHTML("beforebegin",t):e.parentNode.insertBefore(t,e)}var o=Rye.require("Util"),c=Rye.require("Query"),u=Array.prototype.slice;return o.each({append:t,prepend:i,after:r,before:s},function(r,e){this[e]=function(i){return"string"!=typeof i&&(i instanceof Rye?i=i.elements:o.isNodeList(i)&&(i=u.call(i)),Array.isArray(i))?(/prepend|before/.test(e)&&(i=u.call(i,0).reverse()),i.forEach(this[e].bind(this))):(1===this.length?r(this.elements[0],i):this.each(function(e,t){var n=0<t?i.cloneNode(!0):i;r(e,n)}),this)}}.bind(this)),this.text=function(t){return null==t?this.elements[0]&&this.elements[0].textContent:this.each(function(e){e.textContent=t})},this.html=function(t){return null==t?this.elements[0]&&this.elements[0].innerHTML:this.each(function(e){e.innerHTML=t})},this.empty=function(){return this.put("innerHTML","")},this.clone=function(){return this.map(function(e){return e.cloneNode(!0)})},this.remove=function(){return this.each(function(e){e.parentNode&&e.parentNode.removeChild(e)})},this.val=function(t){return null==t?this.elements[0]&&n(this.elements[0]):this.each(function(e){e.value=t})},this.attr=function(t,n){return"object"==typeof t?this.each(function(n){o.each(t,function(e,t){n.setAttribute(t,e)})}):void 0===n?this.elements[0]&&e(this.elements[0],t):this.each(function(e){e.setAttribute(t,n)})},this.prop=function(e,t){return"object"==typeof e?this.each(function(n){o.each(e,function(e,t){n[t]=e})}):void 0===t?this.elements[0]&&this.elements[0][e]:this.put(e,t)},Rye.create=function(e){var t,n=document.createElement("div");return n.innerHTML=e,(t=u.call(n.childNodes)).forEach(function(e){n.removeChild(e)}),new Rye(t)},{getValue:n,getAttribute:e,append:t,prepend:i,after:r,before:s}}),Rye.define("Events",function(){function s(){this.events={},this.context=null}function r(e){var t=u.getUid(e);return h[t]||(h[t]=new c(e))}function o(e){var t=e.indexOf(" ");return 0<t?e.substr(0,t):e}function n(e,t){"string"!=typeof e&&(e=e.type);var n=-1!=["click","mousedown","mouseup","mousemove"].indexOf(e),i=document.createEvent(n?"MouseEvent":"Event");return t&&u.extend(i,t),i.initEvent(e,!0,!0),i}function c(e){s.call(this),this.element=e,this.proxied={}}function i(e,t,n,i){r(t)[e](n,i)}var u=Rye.require("Util"),a=Rye.require("Query"),l=Array.prototype.slice;s.prototype.addListener=function(e,t){return(this.events[e]||(this.events[e]=[])).push(t),this},s.prototype.once=function(t,n){var i=this;return this.addListener(t,function e(){n.apply(this,arguments),i.removeListener(t,e)})},s.prototype.removeListener=function(e,n){var i=this,t=this.events[e];return"*"===e?n?u.each(this.events,function(e,t){i.removeListener(t,n)}):this.events={}:n&&t?(t.splice(t.indexOf(n),1),0===t.length&&delete this.events[e]):delete this.events[e],this},s.prototype.emit=function(e){var t=this.events[e],n=l.call(arguments,1),i=this.context||this;return t&&u.each(t,function(e){e.apply(i,n)}),this},s.prototype.proxy=function(e){return u.applyLeft(this,this.emit,[e])};var h={};u.inherits(c,s),c.prototype._proxy=function(s){return function(e){var t,n,i=0<(n=(t=s).indexOf(" "))?t.substr(n):"",r=this.element;if(i){for(r=e.target;r&&!a.matches(r,i);)r=r!==this.element&&r.parentNode;if(!r||r==this.element)return}this.context=r,this.emit(s,e,this.element)}.bind(this)},c.prototype.proxy=function(e){return this.proxied[e]||(this.proxied[e]=this._proxy(e))},c.prototype.addListener=function(e,t){return s.prototype.addListener.call(this,e,t),this.proxied[e]||this.element.addEventListener(o(e),this.proxy(e),!1),this},c.prototype.removeListener=function(e,n){if(0<=e.indexOf("*")){var i=this,r=RegExp("^"+e.replace("*","\\b"));u.each(this.events,function(e,t){r.test(t)&&i.removeListener(t,n)})}else{var t=this.proxied[e];s.prototype.removeListener.call(this,e,n),!this.events[e]&&t&&(this.element.removeEventListener(o(e),t,!1),delete this.proxied[e])}return this},["addListener","once","removeListener"].forEach(function(e){var i=c.prototype[e];c.prototype[e]=function(e,t){var n=this;return"string"!=typeof e?u.each(e,function(e,t){i.call(n,t,e)}):i.call(n,e,t),n}}),c.prototype.destroy=function(){return this.removeListener("*")},c.prototype.trigger=function(e,t){return e instanceof window.Event||(e=n(e)),e.data=t,this.element.dispatchEvent(e),this};var d={};["addListener","removeListener","once","trigger"].forEach(function(e){var t=u.curry(i,e);d[e]=t,this[e]=this.iterate(t)}.bind(this)),[s.prototype,c.prototype,this].forEach(function(e){e.on=e.addListener});var e=new s;return Rye.subscribe=e.addListener.bind(e),Rye.unsubscribe=e.removeListener.bind(e),Rye.publish=e.emit.bind(e),{EventEmitter:s,DOMEventEmitter:c,getEmitter:r,createEvent:n,addListener:d.addListener,once:d.once,removeListener:d.removeListener,trigger:d.trigger}}),Rye.define("Style",function(){function i(e,t){return e.style.getPropertyValue(t)||window.getComputedStyle(e,null).getPropertyValue(t)}function r(e,t,n){"number"==typeof n&&-1===u.indexOf(t)&&(n+="px");var i=null===n||""===n?"remove":"set";return e.style[i+"Property"](t,""+n),e}function s(e,t){return t=t.trim(),e.classList?e.classList.contains(t):-1!==(" "+e.className+" ").indexOf(" "+t+" ")}function o(t,e){if(t.classList)e.replace(/\S+/g,function(e){t.classList.add(e)});else{var n,i=" "+t.className+" ";for(e=e.trim().split(/\s+/);n=e.shift();)-1===i.indexOf(" "+n+" ")&&(i+=n+" ");t.className=i.trim()}return t}function c(t,e){if("*"===e)t.className="";else{if(e instanceof RegExp)e=[e];else{if(t.classList&&-1===e.indexOf("*"))return void e.replace(/\S+/g,function(e){t.classList.remove(e)});e=e.trim().split(/\s+/)}for(var n,i=" "+t.className+" ";n=e.shift();)if(n.indexOf&&-1!==n.indexOf("*")&&(n=RegExp("\\s*\\b"+n.replace("*","\\S*")+"\\b\\s*","g")),n instanceof RegExp)i=i.replace(n," ");else for(;-1!==i.indexOf(" "+n+" ");)i=i.replace(" "+n+" "," ");t.className=i.trim()}return t}var e=Rye.require("Util"),n=Rye.require("Data"),u="fill-opacity font-weight line-height opacity orphans widows z-index zoom".split(" ");return this.show=this.iterate(function(e){r(e,"display",n.get(e,"_display")||"block")}),this.hide=this.iterate(function(e){var t=i(e,"display");"none"!==t&&n.set(e,"_display",t),r(e,"display","none")}),this.css=function(t,n){return null==n?"string"==typeof t?this.elements[0]&&i(this.elements[0],t):this.each(function(n){e.each(t,function(e,t){r(n,t,e)})}):this.each(function(e){r(e,t,n)})},this.hasClass=function(t){var n=!1;return this.each(function(e){n=n||s(e,t)}),!!n},this.addClass=this.iterate(o),this.removeClass=this.iterate(c),this.toggleClass=this.iterate(function(e,t,n){null==n&&(n=!s(e,t)),(n?o:c)(e,t)}),{getCSS:i,setCSS:r,hasClass:s,addClass:o,removeClass:c}}),Rye.define("TouchEvents",function(){function t(e){n.extend(this,e),t.all.push(this)}var n=Rye.require("Util"),i=Rye.require("Events"),r={};if(t.all=[],t.cancelAll=function(){t.all.forEach(function(e){e.cancel()}),r={}},t.prototype.schedule=function(){this.timeout=setTimeout(this._trigger.bind(this),this.delay)},t.prototype._trigger=function(){this.timeout=null,this.trigger()},t.prototype.cancel=function(){this.timeout&&clearTimeout(this.timeout),this.timeout=null},i&&("ontouchstart"in window||window.mocha)){var e=new t({delay:0,trigger:function(){var e=i.createEvent("tap");e.cancelTouch=t.cancelAll,i.trigger(r.element,e),r.isDoubleTap?(i.trigger(r.element,"doubletap"),r={}):s.schedule()}}),s=new t({delay:250,trigger:function(){i.trigger(r.element,"singletap"),r={}}}),o=new t({delay:750,trigger:function(){r.last&&(i.trigger(r.element,"longtap"),r={})}}),c=new t({delay:0,trigger:function(){i.trigger(r.element,"swipe"),i.trigger(r.element,"swipe"+this.direction()),r={}},direction:function(){return Math.abs(r.x1-r.x2)>=Math.abs(r.y1-r.y2)?0<r.x1-r.x2?"left":"right":0<r.y1-r.y2?"up":"down"}});i.addListener(document.body,"touchstart",function(e){var t,n=Date.now();s.cancel(),r.element="tagName"in(t=e.touches[0].target)?t:t.parentNode,r.x1=e.touches[0].pageX,r.y1=e.touches[0].pageY,r.last&&n-r.last<=250&&(r.isDoubleTap=!0),r.last=n,o.schedule()}),i.addListener(document.body,"touchmove",function(e){o.cancel(),r.x2=e.touches[0].pageX,r.y2=e.touches[0].pageY}),i.addListener(document.body,"touchend",function(){o.cancel(),30<Math.abs(r.x1-r.x2)||30<Math.abs(r.y1-r.y2)?c.schedule():"last"in r&&e.schedule()}),i.addListener(document.body,"touchcancel",t.cancelAll),i.addListener(window,"scroll",t.cancelAll)}}),Rye.define("Request",function(){function u(e){var s=[];return function n(i,r){l.each(i,function(e,t){e=i[t],r&&(t=r+"["+(Array.isArray(i)?"":t)+"]"),l.is(["array","object"],e)?n(e,t):s.push(o(t)+"="+o(e))})}(e),s.join("&").replace(/%20/g,"+")}function a(e,t){return(e+"&"+t).replace(/[&?]+/,"?")}function i(e,i){"string"==typeof e&&(e={url:e}),i||(i=e.callback||h);var t,r=l.extend({},f,e),s=new window.XMLHttpRequest,n=r.accepts[r.responseType],o=null,c={};return r.method=r.method.toUpperCase(),(t=r).data&&"string"!=typeof t.data&&(t.data=u(t.data)),t.data&&"GET"===t.method&&(t.url=a(t.url,t.data)),n&&(c.Accept=n,s.overrideMimeType&&s.overrideMimeType(n.split(",")[0])),(r.contentType||0<=["POST","PUT"].indexOf(r.method))&&(c["Content-Type"]=r.contentType||"application/x-www-form-urlencoded"),l.extend(c,r.headers||{}),s.onreadystatechange=function(){var e,t,n;if(4==s.readyState&&s.status){if(s.onreadystatechange=h,clearTimeout(o),200<=s.status&&s.status<300||304==s.status){switch(s.type=r.responseType||s.responseType||(n=s.getResponseHeader("content-type"))&&(n.split("/")[1]||n),s.type){case"json":t=function(e){var t=e.response;if(null===t)return Error("Parser Error");if("object"!=typeof t)try{t=JSON.parse(e.responseText)}catch(e){return e}return t}(s);break;case"xml":t=function(e){var t=e.responseXML;if(t.xml&&window.DOMParser)try{t=(new window.DOMParser).parseFromString(t.xml,"text/xml")}catch(e){return e}return t}(s);break;default:t=s.responseText}t instanceof Error&&(e=t,t=void 0)}else e=Error("Request failed");i.call(s,e,t,s)}},s.ontimeout=function(){i.call(s,Error("Timeout"),null,s)},s.open(r.method,r.url,r.async),!("timeout"in s)&&0<r.timeout&&(o=setTimeout(function(){s.onreadystatechange=h,s.abort(),s.ontimeout()},r.timeout)),l.each(r,function(e,t){if("responseType"!==t||0<=d.types.indexOf(e))try{s[t]=e}catch(e){}}),l.each(c,function(e,t){s.setRequestHeader(t,e)}),s.send(r.data),s}function e(e,t,n){return"string"==typeof t&&(t={url:t}),t.method=e,i(t,n)}var l=Rye.require("Util"),n=Rye.require("Manipulation"),h=function(){},o=encodeURIComponent,d={types:["arraybuffer","blob","document","json","text"],json:"application/json",xml:"application/xml, text/xml",html:"text/html, application/xhtml+xml",text:"text/plain"},f={method:"GET",url:""+window.location,async:!0,accepts:d,callback:h,timeout:0},r="fieldset submit reset button image radio checkbox".split(" ");this.serialize=function(){var e=this.get(0),t={};return new Rye(e&&e.elements).forEach(function(e){!e.disabled&&(e.checked||e.type&&r.indexOf(e.type)<0)&&(t[e.name]=n.getValue(e))}),u(t)},Rye.request=i,Rye.get=l.curry(e,"GET"),Rye.post=l.curry(e,"POST");var t=i.bind({});return l.extend(t,{serialize:u,appendQuery:a,defaults:f,get:l.curry(e,"GET"),post:l.curry(e,"POST")}),t}),function(t){var n={},i={};t.define=function(e,t){if(n[e])throw new Error("Module "+e+" already registered.");n[e]=t},t.require=function(e){if(!n[e])throw new Error("Module "+e+" not registered.");return i[e]||(i[e]=n[e].call(t))}}(this),define("components",function(){var n=Array.prototype.forEach,i=Array.prototype.slice,r=Rye.require("Util").extend;function s(e){var t=e.getAttribute("data-component"),n=new(require("components/"+t))(e);Rye(e).data("component-"+t,n)}return{init:function(e){var t=(e||document).querySelectorAll("[data-component]");n.call(t,s)},get:function(e,t){return Rye(e).data("component-"+t)},create:function(e,t){var n=function(e){this.el=e,this.$el=Rye(e),this.initialize.apply(this,i.call(arguments,1))};n.name=e,r(n.prototype,t),define("components/"+e,function(){return n})}}}),require("components").create("conference",{initialize:function(){Rye(".nav-item-now").on("click",this.tabToggle.bind(this,"now")),Rye(".nav-item-schedule").on("click",this.tabToggle.bind(this,"schedule")),this.scheduleFetch(),setInterval(this.versionFetch.bind(this),12e4)},showTime:function(){Rye(".js-nav-menu, #now").removeClass("-hidden"),this.nowUpdateInterval=setInterval(this.nowUpdate.bind(this),6e4),this.nowUpdate()},tabToggle:function(e){Rye(".nav-item.-active").removeClass("-active"),Rye(".nav-item-"+e).addClass("-active"),Rye("#now,#schedule").addClass("-hidden"),Rye("#"+e).removeClass("-hidden")},schedule:[],schedulePrevious:null,scheduleNow:null,scheduleNext:null,scheduleFetch:function(){Rye.request({url:"schedule.json",callback:this.scheduleInit.bind(this),responseType:"json"})},scheduleInit:function(e,t,n){if(e)this.abort("#error");else{var i="";t.schedule.map(function(e){return e.dt=this.getDateFromString(e.time),i+=this.scheduleItemTemplate(e),e}.bind(this)),this.startTime=this.getDateFromString(t.start).getTime(),this.endTime=this.getDateFromString(t.end).getTime(),this.schedule=t.schedule,Rye("#schedule").html(i),this.scheduleAddEventListeners("#schedule"),this.showTime()}},scheduleAddEventListeners:function(e){Rye(e).find(".js-schedule-item").on("click",this.scheduleItemToggle)},scheduleItemToggle:function(e){Rye(e.currentTarget).toggleClass("-opened")},scheduleItemTemplate:function(e,t){return t=t||{},'<article class="list-item schedule-item '+(e.description?"js-schedule-item":"")+'"><div class="schedule-header">'+(t.noPhoto?"":'<span class="schedule-image speaker-'+e.speakerSprite+'"></span>')+'<div class="schedule-details"><div class="schedule-time">'+e.time+(e.location?" at "+e.location.toUpperCase():"")+'</div><div class="schedule-title">'+e.title+"</div>"+(e.subtitle?'<div class="schedule-subtitle">'+e.subtitle+"</div>":"")+"</div>"+(e.description?'<div class="schedule-action schedule-action-open js-schedule-action-open">+</div>':"")+"</div>"+(e.description?'<div class="schedule-description js-schedule-description">'+e.description.replace(/\n/g,"<br>")+"</div>":"")+"</article>"},nowUpdate:function(){var e,t,n,i=-1,r=Date.now();this.forceTime&&(r=this.getDateFromString(this.forceTime).getTime()),r<this.startTime?this.abort("#soon"):r>=this.endTime?this.abort("#too-late"):(this.schedule.every(function(e,t){return!(e.dt.getTime()>r)||(i=t,!1)}),0<i&&(t=this.schedule[i-1]),1<i&&(e=this.schedule[i-2]),-1!=i?n=this.schedule[i]:(e=this.schedule[this.schedule.length-2],t=this.schedule[this.schedule.length-1]),t!=this.scheduleNow&&(this.schedulePrevious=e,this.scheduleNow=t,this.scheduleNext=n,this.nowRender()))},nowRender:function(){this.schedulePrevious&&this.schedulePrevious.talk?(Rye(".js-previous").html(this.scheduleItemTemplate(this.schedulePrevious,{noPhoto:!0})),this.scheduleAddEventListeners(".js-previous"),Rye(".js-previous-title, .js-previous").removeClass("-hidden"),Rye(".js-previous-feedback").toggleClass("-hidden",!this.schedulePrevious.feedback),this.schedulePrevious.feedback&&Rye(".js-now-action-feedback").attr("href",this.schedulePrevious.feedback)):Rye(".js-previous-title, .js-previous, .js-previous-feedback").addClass("-hidden"),this.scheduleNow?(Rye(".js-now").html(this.scheduleItemTemplate(this.scheduleNow)),this.scheduleAddEventListeners(".js-now"),Rye(".js-now-action-tweet").toggleClass("-hidden",!this.scheduleNow.tweet),Rye(".js-now-action-questions").toggleClass("-hidden",!this.scheduleNow.questions),Rye(".js-now-actions").toggleClass("-hidden",!this.scheduleNow.tweet&&!this.scheduleNow.questions),Rye(".js-now").removeClass("-hidden")):Rye(".js-now, .js-now-actions").addClass("-hidden"),this.scheduleNext?(Rye(".js-up-next").html(this.scheduleItemTemplate(this.scheduleNext)),this.scheduleAddEventListeners(".js-up-next"),Rye(".js-up-next-title, .js-up-next").removeClass("-hidden")):Rye(".js-up-next-title, .js-up-next").addClass("-hidden")},abort:function(e){e?(Rye(".nav-menu, .card").addClass("-hidden"),Rye(e).removeClass("-hidden")):location.href="https://twitter.com/FrontinAMS",clearTimeout(this.nowUpdateInterval)},versionFetch:function(){Rye.request("version.txt?r="+Math.random(),function(e,t){e||(this.versionCurrent||(this.versionCurrent=t),this.versionCurrent!=t&&setTimeout(location.reload.bind(location),5e3*Math.random()))}.bind(this))},getDateFromString:function(e){var t=new Date,n=+e.split(":")[0],i=+e.split(":")[1];return t.setUTCFullYear(2015),t.setUTCMonth(7),t.setUTCDate(28),t.setUTCHours(n-2),t.setUTCMinutes(i),t.setUTCSeconds(0),t}}),require("components").init();