var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.for(`react.view_transition`),m=Symbol.iterator;function h(e){return typeof e!=`object`||!e?null:(e=m&&e[m]||e[`@@iterator`],typeof e==`function`?e:null)}var g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},_=Object.assign,v={};function y(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}y.prototype.isReactComponent={},y.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function b(){}b.prototype=y.prototype;function x(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}var S=x.prototype=new b;S.constructor=x,_(S,y.prototype),S.isPureReactComponent=!0;var ee=Array.isArray;function C(){}var w={H:null,A:null,T:null,S:null},te=Object.prototype.hasOwnProperty;function T(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function ne(e,t){return T(e.type,t,e.props)}function E(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function D(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var re=/\/+/g;function ie(e,t){return typeof e==`object`&&e&&e.key!=null?D(``+e.key):t.toString(36)}function ae(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(C,C):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function oe(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,oe(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+ie(e,0):a,ee(o)?(i=``,c!=null&&(i=c.replace(re,`$&/`)+`/`),oe(o,r,i,``,function(e){return e})):o!=null&&(E(o)&&(o=ne(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(re,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(ee(e))for(var u=0;u<e.length;u++)a=e[u],s=l+ie(a,u),c+=oe(a,r,i,s,o);else if(u=h(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+ie(a,u++),c+=oe(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return oe(ae(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function O(e,t,n){if(e==null)return e;var r=[],i=0;return oe(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function se(e){if(e._status===-1){var t=e._result,n=t();n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t,n.status===void 0&&(n.status=`fulfilled`,n.value=t))},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t,n.status===void 0&&(n.status=`rejected`,n.reason=t))}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var ce=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)};function le(e){var t=w.T,n={};n.types=t===null?null:t.types,w.T=n;try{var r=e(),i=w.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(C,ce)}catch(e){ce(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),w.T=t}}function ue(e){var t=w.T;if(t!==null){var n=t.types;n===null?t.types=[e]:n.indexOf(e)===-1&&n.push(e)}else le(ue.bind(null,e))}var de={map:O,forEach:function(e,t,n){O(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return O(e,function(){t++}),t},toArray:function(e){return O(e,function(e){return e})||[]},only:function(e){if(!E(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=de,e.Component=y,e.Fragment=r,e.Profiler=a,e.PureComponent=x,e.StrictMode=i,e.Suspense=l,e.ViewTransition=p,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=w,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return w.H.useMemoCache(e)}},e.addTransitionType=ue,e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=_({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!te.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return T(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)te.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return T(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=E,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:se}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=le,e.unstable_useCacheRefresh=function(){return w.H.useCacheRefresh()},e.use=function(e){return w.H.use(e)},e.useActionState=function(e,t,n){return w.H.useActionState(e,t,n)},e.useCallback=function(e,t){return w.H.useCallback(e,t)},e.useContext=function(e){return w.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return w.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return w.H.useEffect(e,t)},e.useEffectEvent=function(e){return w.H.useEffectEvent(e)},e.useId=function(){return w.H.useId()},e.useImperativeHandle=function(e,t,n){return w.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return w.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return w.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return w.H.useMemo(e,t)},e.useOptimistic=function(e,t){return w.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return w.H.useReducer(e,t,n)},e.useRef=function(e){return w.H.useRef(e)},e.useState=function(e){return w.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return w.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return w.H.useTransition()},e.version=`19.3.0`})),u=o(((e,t)=>{t.exports=l()})),d=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m){if(n(c)!==null)m=!0,S||(S=!0,ne());else{var t=n(l);t!==null&&re(x,t.startTime-e)}}}var S=!1,ee=-1,C=5,w=-1;function te(){return g?!0:!(e.unstable_now()-w<C)}function T(){if(g=!1,S){var t=e.unstable_now();w=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(ee),ee=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&te());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&re(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?ne():S=!1}}}var ne;if(typeof y==`function`)ne=function(){y(T)};else if(typeof MessageChannel<`u`){var E=new MessageChannel,D=E.port2;E.port1.onmessage=T,ne=function(){D.postMessage(null)}}else ne=function(){_(T,0)};function re(t,n){ee=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):C=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(ee),ee=-1):h=!0,re(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,ne()))),r},e.unstable_shouldYield=te,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),f=o(((e,t)=>{t.exports=d()})),p=o((e=>{var t=u();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`),o=Symbol.for(`react.recoverable`),s=Symbol.for(`react.optimistic_key`);function c(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:r===s?s:``+r,children:e,containerInfo:t,implementation:n}}var l=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.browser=function(e){return{$$typeof:o,_reason:e}},e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return c(e,t,null,r)},e.flushSync=function(e){var t=l.T,n=i.p;try{if(l.T=null,i.p=2,e)return e()}finally{l.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=d(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`){if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=d(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}}else t??i.d.M(e)}},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=d(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`){if(t){var n=d(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}else i.d.m(e)}},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return l.H.useFormState(e,t,n)},e.useFormStatus=function(){return l.H.useHostTransitionStatus()},e.version=`19.3.0`})),m=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=p()})),h=o((e=>{var t=f(),n=u(),r=m();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){for(var t=e,n=t;n&&!n.alternate;)t=n,t.flags&4098&&(e=t.return),n=t.return;for(;t.return;)t=t.return;return t.tag===3?e:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function d(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function p(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=p(e),t!==null)return t;e=e.sibling}return null}function h(e,t,n,r,i,a){for(;e!==null;){if((e.tag===5||e.tag===27||e.tag===6)&&n(e,r,i,a)||(e.tag!==22||e.memoizedState===null)&&(t||e.tag!==5&&e.tag!==27)&&h(e.child,t,n,r,i,a))return!0;e=e.sibling}return!1}function g(e){for(e=e.return;e!==null;){if(e.tag===3||e.tag===5||e.tag===27)return e;e=e.return}return null}function _(e){var t=!1;for(e=e.return;e!==null&&(e.tag===4&&(t=!0),e.tag!==3&&e.tag!==5&&e.tag!==27);)e=e.return;return t}function v(e){var t=[null,null],n=g(e);return n===null||y(t,e,n.child,{foundSelf:!1}),t}function y(e,t,n,r){for(;n!==null;){if(n===t)r.foundSelf=!0;else if(n.tag===5||n.tag===27||n.tag===6){if(r.foundSelf)return e[1]=n,!0;e[0]=n}else if((n.tag!==22||n.memoizedState===null)&&y(e,t,n.child,r))return!0;n=n.sibling}return!1}function b(e){switch(e.tag){case 5:case 27:case 6:return e.stateNode;case 3:return e.stateNode.containerInfo;default:throw Error(i(559))}}var x=null,S=null;function ee(e,t,n){return e===n||e===t&&(x=e,!0)}function C(e,t,n){return e===n?(S=e,!1):e===t&&(S!==null&&(x=e),!0)}function w(e){if(e===null)return null;do e=e===null?null:e.return;while(e&&e.tag!==5&&e.tag!==27&&e.tag!==3);return e||null}function te(e,t,n){for(var r=0,i=e;i;i=n(i))r++;i=0;for(var a=t;a;a=n(a))i++;for(;0<r-i;)e=n(e),r--;for(;0<i-r;)t=n(t),i--;for(;r--;){if(e===t||t!==null&&e===t.alternate)return e;e=n(e),t=n(t)}return null}var T=Object.assign,ne=Symbol.for(`react.element`),E=Symbol.for(`react.transitional.element`),D=Symbol.for(`react.portal`),re=Symbol.for(`react.fragment`),ie=Symbol.for(`react.strict_mode`),ae=Symbol.for(`react.profiler`),oe=Symbol.for(`react.consumer`),O=Symbol.for(`react.context`),se=Symbol.for(`react.forward_ref`),ce=Symbol.for(`react.suspense`),le=Symbol.for(`react.suspense_list`),ue=Symbol.for(`react.memo`),de=Symbol.for(`react.lazy`),fe=Symbol.for(`react.activity`),pe=Symbol.for(`react.legacy_hidden`),me=Symbol.for(`react.memo_cache_sentinel`),he=Symbol.for(`react.view_transition`),ge=Symbol.for(`react.recoverable`),_e=Symbol.iterator;function ve(e){return typeof e!=`object`||!e?null:(e=_e&&e[_e]||e[`@@iterator`],typeof e==`function`?e:null)}var ye=Symbol.for(`react.client.reference`);function be(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===ye?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case re:return`Fragment`;case ae:return`Profiler`;case ie:return`StrictMode`;case ce:return`Suspense`;case le:return`SuspenseList`;case fe:return`Activity`;case he:return`ViewTransition`}if(typeof e==`object`)switch(e.$$typeof){case D:return`Portal`;case O:return e.displayName||`Context`;case oe:return(e._context.displayName||`Context`)+`.Consumer`;case se:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case ue:return t=e.displayName||null,t===null?be(e.type)||`Memo`:t;case de:t=e._payload,e=e._init;try{return be(e(t))}catch{}}return null}var xe=Array.isArray,k=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,A=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Se={pending:!1,data:null,method:null,action:null},Ce=[],we=-1;function Te(e){return{current:e}}function Ee(e){0>we||(e.current=Ce[we],Ce[we]=null,we--)}function j(e,t){we++,Ce[we]=e.current,e.current=t}var De=Te(null),Oe=Te(null),ke=Te(null),Ae=Te(null);function je(e,t){switch(j(ke,t),j(Oe,e),j(De,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?up(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=up(t),e=dp(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}Ee(De),j(De,e)}function Me(){Ee(De),Ee(Oe),Ee(ke)}function Ne(e){var t=e.memoizedState;t!==null&&(sh._currentValue=t.memoizedState,j(Ae,e)),t=De.current;var n=dp(t,e.type);t!==n&&(j(Oe,e),j(De,n))}function Pe(e){Oe.current===e&&(Ee(De),Ee(Oe)),Ae.current===e&&(Ee(Ae),sh._currentValue=Se)}var Fe,Ie;function Le(e){if(Fe===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);Fe=t&&t[1]||``,Ie=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+Fe+e+Ie}var Re=!1;function ze(e,t){if(!e||Re)return``;Re=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}n=!1;try{var i=Object.getOwnPropertyDescriptor(e.prototype,`props`);Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),n=!0,new e}finally{n&&(i===void 0?delete e.prototype.props:Object.defineProperty(e.prototype,"props",i))}}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{Re=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?Le(n):``}function Be(e,t){switch(e.tag){case 26:case 27:case 5:return Le(e.type);case 16:return Le(`Lazy`);case 13:return e.child!==t&&t!==null?Le(`Suspense Fallback`):Le(`Suspense`);case 19:return Le(`SuspenseList`);case 0:case 15:return ze(e.type,!1);case 11:return ze(e.type.render,!1);case 1:return ze(e.type,!0);case 31:return Le(`Activity`);case 30:return Le(`ViewTransition`);default:return``}}function Ve(e){try{var t=``,n=null;do t+=Be(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var He=Object.prototype.hasOwnProperty,Ue=t.unstable_scheduleCallback,We=t.unstable_cancelCallback,Ge=t.unstable_shouldYield,Ke=t.unstable_requestPaint,qe=t.unstable_now,Je=t.unstable_getCurrentPriorityLevel,Ye=t.unstable_ImmediatePriority,Xe=t.unstable_UserBlockingPriority,Ze=t.unstable_NormalPriority,Qe=t.unstable_LowPriority,$e=t.unstable_IdlePriority,et=t.log,tt=t.unstable_setDisableYieldValue,nt=null,rt=null;function it(e){if(typeof et==`function`&&tt(e),rt&&typeof rt.setStrictMode==`function`)try{rt.setStrictMode(nt,e)}catch{}}var at=Math.clz32?Math.clz32:ct,ot=Math.log,st=Math.LN2;function ct(e){return e>>>=0,e===0?32:31-(ot(e)/st|0)|0}var lt=256,ut=262144,dt=4194304;function ft(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function pt(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=ft(n))):i=ft(o):i=ft(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=ft(n))):i=ft(o)):i=ft(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function mt(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function ht(e,t){t&8&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var r=31-at(n),i=1<<r;t|=e[r],n&=~i}return t}function gt(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function _t(){var e=dt;return dt<<=1,!(dt&62914560)&&(dt=4194304),e}function vt(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function yt(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function bt(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-at(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&xt(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function xt(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-at(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function St(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-at(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function Ct(e,t){var n=t&-t;return n=n&42?1:wt(n),(n&(e.suspendedLanes|t))===0?n:0}function wt(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Tt(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function Et(){var e=A.p;return e===0?(e=window.event,e===void 0?32:Ch(e.type)):e}function Dt(e,t){var n=A.p;try{return A.p=e,t()}finally{A.p=n}}var Ot=Math.random().toString(36).slice(2),kt=`__reactFiber$`+Ot,At=`__reactProps$`+Ot,jt=`__reactContainer$`+Ot,Mt=`__reactEvents$`+Ot,Nt=`__reactListeners$`+Ot,Pt=`__reactHandles$`+Ot,Ft=`__reactResources$`+Ot,It=`__reactMarker$`+Ot,Lt=`__reactLoad$`+Ot;function Rt(e){delete e[kt],delete e[At],delete e[Nt],delete e[Pt]}function zt(e){var t;if(t=e[kt])return t;for(var n=e.parentNode;n;){if(t=n[jt]||n[kt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=fm(e);e!==null;){if(n=e[kt])return n;e=fm(e)}return t}e=n,n=e.parentNode}return null}function Bt(e){if(e=e[kt]||e[jt]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Vt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function Ht(e){var t=e[Ft];return t||=e[Ft]={hoistableStyles:new Map,hoistableScripts:new Map},t}function Ut(e){e[It]=!0}function Wt(e){e[Lt]=void 0}var Gt=new Set,Kt={};function qt(e,t){Jt(e,t),Jt(e+`Capture`,t)}function Jt(e,t){for(Kt[e]=t,e=0;e<t.length;e++)Gt.add(t[e])}var Yt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Xt={},Zt={};function Qt(e){return He.call(Zt,e)?!0:He.call(Xt,e)?!1:Yt.test(e)?Zt[e]=!0:(Xt[e]=!0,!1)}var M=!1;function $t(){var e=M;return M=!1,e}function en(e,t,n){if(Qt(t)){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,n)}}}function tn(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,n)}}function nn(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,r)}}function rn(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function an(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function on(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function sn(e){if(!e._valueTracker){var t=an(e)?`checked`:`value`;e._valueTracker=on(e,t,``+e[t])}}function cn(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=an(e)?e.checked?`true`:`false`:e.value),e=r,e!==n&&(t.setValue(e),!0)}var ln=/[\n"\\]/g;function un(e){return e.replace(ln,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function dn(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+rn(t)):e.value!==``+rn(t)&&(e.value=``+rn(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):pn(e,rn(n)):o===`number`&&e.value==t?pn(e,rn(e.value)):pn(e,rn(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+rn(s):e.removeAttribute(`name`)}function fn(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){sn(e);return}n=n==null?``:``+rn(n),t=t==null?n:``+rn(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),sn(e)}function pn(e,t){e.defaultValue!==``+t&&(e.defaultValue=``+t)}function mn(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+rn(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function hn(e,t,n){if(t!=null&&(t=``+rn(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+rn(n)}function gn(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(xe(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=rn(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),sn(e)}function _n(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var vn=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function yn(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||vn.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function bn(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``,M=!0);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&(yn(e,a,r),M=!0)}else for(var o in t)t.hasOwnProperty(o)&&yn(e,o,t[o])}function xn(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var Sn=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`maskType`,`mask-type`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),Cn=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function wn(e){return Cn.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function Tn(){}var En=null;function Dn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var On=null,kn=null;function An(e){var t=Bt(e);if(t&&(e=t.stateNode)){var n=e[At]||null;a:switch(e=t.stateNode,t.type){case`input`:if(dn(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+un(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[At]||null;if(!a)throw Error(i(90));dn(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&cn(r)}break a;case`textarea`:hn(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&mn(e,!!n.multiple,t,!1)}}}var jn=!1;function Mn(e,t,n){if(jn)return e(t,n);jn=!0;try{return e(t)}finally{if(jn=!1,(On!==null||kn!==null)&&(zd(),On&&(t=On,e=kn,kn=On=null,An(t),e)))for(t=0;t<e.length;t++)An(e[t])}}function Nn(e,t){var n=e.stateNode;if(n===null)return null;var r=n[At]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=e!==`button`&&e!==`input`&&e!==`select`&&e!==`textarea`),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var Pn=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,Fn=!1;if(Pn)try{var In={};Object.defineProperty(In,"passive",{get:function(){Fn=!0}}),window.addEventListener(`test`,In,In),window.removeEventListener(`test`,In,In)}catch{Fn=!1}var Ln=null,Rn=null,zn=null;function Bn(){if(zn)return zn;var e,t=Rn,n=t.length,r,i=`value`in Ln?Ln.value:Ln.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return zn=i.slice(e,1<r?1-r:void 0)}function Vn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Hn(){return!0}function N(){return!1}function Un(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?Hn:N,this.isPropagationStopped=N,this}return T(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=Hn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=Hn)},persist:function(){},isPersistent:Hn}),t}var Wn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Gn=Un(Wn),Kn=T({},Wn,{view:0,detail:0}),qn=Un(Kn),Jn,Yn,Xn,Zn=T({},Kn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:cr,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Xn&&(Xn&&e.type===`mousemove`?(Jn=e.screenX-Xn.screenX,Yn=e.screenY-Xn.screenY):Yn=Jn=0,Xn=e),Jn)},movementY:function(e){return`movementY`in e?e.movementY:Yn}}),Qn=Un(Zn),$n=Un(T({},Zn,{dataTransfer:0})),er=Un(T({},Kn,{relatedTarget:0})),tr=Un(T({},Wn,{animationName:0,elapsedTime:0,pseudoElement:0})),nr=Un(T({},Wn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),rr=Un(T({},Wn,{data:0})),ir={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},ar={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},or={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function sr(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=or[e])?!!t[e]:!1}function cr(){return sr}var lr=Un(T({},Kn,{key:function(e){if(e.key){var t=ir[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=Vn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?ar[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:cr,charCode:function(e){return e.type===`keypress`?Vn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?Vn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),P=Un(T({},Zn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),ur=Un(T({},Wn,{submitter:0})),dr=Un(T({},Kn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:cr})),fr=Un(T({},Wn,{propertyName:0,elapsedTime:0,pseudoElement:0})),pr=Un(T({},Zn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),mr=Un(T({},Wn,{newState:0,oldState:0,source:0})),hr=[9,13,27,32],gr=Pn&&`CompositionEvent`in window,_r=null;Pn&&`documentMode`in document&&(_r=document.documentMode);var vr=Pn&&`TextEvent`in window&&!_r,yr=Pn&&(!gr||_r&&8<_r&&11>=_r),br=` `,xr=!1;function Sr(e,t){switch(e){case`keyup`:return hr.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function Cr(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var wr=!1;function Tr(e,t){switch(e){case`compositionend`:return Cr(t);case`keypress`:return t.which===32?(xr=!0,br):null;case`textInput`:return e=t.data,e===br&&xr?null:e;default:return null}}function Er(e,t){if(wr)return e===`compositionend`||!gr&&Sr(e,t)?(e=Bn(),zn=Rn=Ln=null,wr=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return yr&&t.locale!==`ko`?null:t.data;default:return null}}var Dr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Or(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!Dr[e.type]:t===`textarea`}function kr(e,t,n,r){On?kn?kn.push(r):kn=[r]:On=r,t=Jf(t,`onChange`),0<t.length&&(n=new Gn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var Ar=null,jr=null;function Mr(e){Vf(e,0)}function Nr(e){if(cn(Vt(e)))return e}function Pr(e,t){if(e===`change`)return t}var F=!1;if(Pn){var Fr;if(Pn){var Ir=`oninput`in document;if(!Ir){var Lr=document.createElement(`div`);Lr.setAttribute(`oninput`,`return;`),Ir=typeof Lr.oninput==`function`}Fr=Ir}else Fr=!1;F=Fr&&(!document.documentMode||9<document.documentMode)}function I(){Ar&&(Ar.detachEvent(`onpropertychange`,Rr),jr=Ar=null)}function Rr(e){if(e.propertyName===`value`&&Nr(jr)){var t=[];kr(t,jr,e,Dn(e)),Mn(Mr,t)}}function zr(e,t,n){e===`focusin`?(I(),Ar=t,jr=n,Ar.attachEvent(`onpropertychange`,Rr)):e===`focusout`&&I()}function Br(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return Nr(jr)}function Vr(e,t){if(e===`click`)return Nr(t)}function Hr(e,t){if(e===`input`||e===`change`)return Nr(t)}function Ur(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Wr=typeof Object.is==`function`?Object.is:Ur;function Gr(e,t){if(Wr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!He.call(t,i)||!Wr(e[i],t[i]))return!1}return!0}function Kr(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}function qr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Jr(e,t){var n=qr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=qr(n)}}function Yr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Yr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Xr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Kr(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Kr(e.document)}return t}function Zr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Qr=Pn&&`documentMode`in document&&11>=document.documentMode,$r=null,ei=null,ti=null,ni=!1;function ri(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ni||$r==null||$r!==Kr(r)||(r=$r,`selectionStart`in r&&Zr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),ti&&Gr(ti,r)||(ti=r,r=Jf(ei,`onSelect`),0<r.length&&(t=new Gn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=$r)))}function ii(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var ai={animationend:ii(`Animation`,`AnimationEnd`),animationiteration:ii(`Animation`,`AnimationIteration`),animationstart:ii(`Animation`,`AnimationStart`),transitionrun:ii(`Transition`,`TransitionRun`),transitionstart:ii(`Transition`,`TransitionStart`),transitioncancel:ii(`Transition`,`TransitionCancel`),transitionend:ii(`Transition`,`TransitionEnd`)},oi={},si={};Pn&&(si=document.createElement(`div`).style,`AnimationEvent`in window||(delete ai.animationend.animation,delete ai.animationiteration.animation,delete ai.animationstart.animation),`TransitionEvent`in window||delete ai.transitionend.transition);function ci(e){if(oi[e])return oi[e];if(!ai[e])return e;var t=ai[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in si)return oi[e]=t[n];return e}var li=ci(`animationend`),ui=ci(`animationiteration`),di=ci(`animationstart`),fi=ci(`transitionrun`),pi=ci(`transitionstart`),mi=ci(`transitioncancel`),hi=ci(`transitionend`),gi=new Map,_i=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);_i.push(`scrollEnd`);function vi(e,t){gi.set(e,t),qt(t,[e])}var yi=0;function bi(e,t){if(e.name!=null&&e.name!==`auto`)return e.name;if(t.autoName!==null)return t.autoName;e=bd.identifierPrefix;var n=yi++;return e=`_`+e+`t_`+n.toString(32)+`_`,t.autoName=e}function xi(e){if(e==null||typeof e==`string`)return e;var t=null,n=Od;if(n!==null)for(var r=0;r<n.length;r++){var i=e[n[r]];if(i!=null){if(i===`none`)return`none`;t=t==null?i:t+(` `+i)}}return t??e.default}function Si(e,t){return e=xi(e),t=xi(t),t==null?e===`auto`?null:e:t===`auto`?null:t}var Ci=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},wi=[],Ti=0,Ei=0;function Di(){for(var e=Ti,t=Ei=Ti=0;t<e;){var n=wi[t];wi[t++]=null;var r=wi[t];wi[t++]=null;var i=wi[t];wi[t++]=null;var a=wi[t];if(wi[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&ji(n,i,a)}}function Oi(e,t,n,r){wi[Ti++]=e,wi[Ti++]=t,wi[Ti++]=n,wi[Ti++]=r,Ei|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function ki(e,t,n,r){return Oi(e,t,n,r),Mi(e)}function Ai(e,t){return Oi(e,null,null,t),Mi(e)}function ji(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-at(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function Mi(e){if(50<kd)throw kd=0,Ad=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Ni={};function Pi(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Fi(e,t,n,r){return new Pi(e,t,n,r)}function Ii(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Li(e,t){var n=e.alternate;return n===null?(n=Fi(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&1206910976,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Ri(e,t){e.flags&=1206910978;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function zi(e,t,n,r,a,o){var s=0;if(r=e,typeof r==`function`)Ii(r)&&(s=1);else if(typeof r==`string`)s=qm(e,n,De.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(r){case fe:return e=Fi(31,n,t,a),e.elementType=fe,e.lanes=o,e;case re:return Bi(n.children,a,o,t);case ie:s=8,a|=24;break;case ae:return e=Fi(12,n,t,a|2),e.elementType=ae,e.lanes=o,e;case ce:return e=Fi(13,n,t,a),e.elementType=ce,e.lanes=o,e;case le:return e=Fi(19,n,t,a),e.elementType=le,e.lanes=o,e;case pe:case he:return e=a|32,e=Fi(30,n,t,e),e.elementType=he,e.lanes=o,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof r==`object`&&r)switch(r.$$typeof){case O:s=10;break a;case oe:s=9;break a;case se:s=11;break a;case ue:s=14;break a;case de:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=Fi(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function Bi(e,t,n,r){return e=Fi(7,e,r,t),e.lanes=n,e}function Vi(e,t,n){return e=Fi(6,e,null,t),e.lanes=n,e}function Hi(e){var t=Fi(18,null,null,0);return t.stateNode=e,t}function Ui(e,t,n){return t=Fi(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Wi=new WeakMap;function Gi(e,t){if(typeof e==`object`&&e){var n=Wi.get(e);return n===void 0?(t={value:e,source:t,stack:Ve(t)},Wi.set(e,t),t):n}return{value:e,source:t,stack:Ve(t)}}var Ki=[],qi=0,Ji=null,Yi=0,Xi=[],Zi=0,Qi=null,$i=1,ea=``;function ta(e,t){Ki[qi++]=Yi,Ki[qi++]=Ji,Ji=e,Yi=t}function na(e,t,n){Xi[Zi++]=$i,Xi[Zi++]=ea,Xi[Zi++]=Qi,Qi=e;var r=$i;e=ea;var i=32-at(r)-1;r&=~(1<<i),n+=1;var a=32-at(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,$i=1<<32-at(t)+i|n<<i|r,ea=a+e}else $i=1<<a|n<<i|r,ea=e}function ra(e){e.return!==null&&(ta(e,1),na(e,1,0))}function ia(e){for(;e===Ji;)Ji=Ki[--qi],Ki[qi]=null,Yi=Ki[--qi],Ki[qi]=null;for(;e===Qi;)Qi=Xi[--Zi],Xi[Zi]=null,ea=Xi[--Zi],Xi[Zi]=null,$i=Xi[--Zi],Xi[Zi]=null}function aa(e,t){Xi[Zi++]=$i,Xi[Zi++]=ea,Xi[Zi++]=Qi,$i=t.id,ea=t.overflow,Qi=e}var oa=null,L=null,R=!1,sa=null,ca=!1,la=Error(i(519));function ua(e){throw ga(Gi(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),la}function da(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[kt]=e,t[At]=r,n){case`dialog`:Q(`cancel`,t),Q(`close`,t);break;case`iframe`:case`object`:case`embed`:Q(`load`,t);break;case`video`:case`audio`:for(n=0;n<zf.length;n++)Q(zf[n],t);break;case`source`:Q(`error`,t);break;case`img`:case`image`:case`link`:Q(`error`,t),Q(`load`,t);break;case`details`:Q(`toggle`,t);break;case`input`:Q(`invalid`,t),fn(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Q(`invalid`,t);break;case`textarea`:Q(`invalid`,t),gn(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||ep(t.textContent,n)?(r.popover!=null&&(Q(`beforetoggle`,t),Q(`toggle`,t)),r.onScroll!=null&&Q(`scroll`,t),r.onScrollEnd!=null&&Q(`scrollend`,t),r.onClick!=null&&(t.onclick=Tn),t=!0):t=!1,t||ua(e,!0)}function fa(e){for(oa=e.return;oa;)switch(oa.tag){case 5:case 31:case 13:ca=!1;return;case 27:case 3:ca=!0;return;default:oa=oa.return}}function pa(e){if(e!==oa)return!1;if(!R)return fa(e),R=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=n===`form`||n===`button`||pp(e.type,e.memoizedProps)),n=!n),n&&L&&ua(e),fa(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));L=dm(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));L=dm(e)}else t===27?(t=L,Sp(e.type)?(e=um,um=null,L=e):L=t):L=oa?lm(e.stateNode.nextSibling):null;return!0}function ma(){L=oa=null,R=!1}function ha(){var e=sa;return e!==null&&(pd===null?pd=e:pd.push.apply(pd,e),sa=null),e}function ga(e){sa===null?sa=[e]:sa.push(e)}var _a=Te(null),va=null,ya=null;function ba(e,t,n){j(_a,t._currentValue),t._currentValue=n}function xa(e){e._currentValue=_a.current,Ee(_a)}function Sa(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function Ca(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),Sa(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),Sa(s,n,e),s=null}else a.tag===13&&a.memoizedState!==null&&a.memoizedState.dehydrated===null?(a.lanes|=n,s=a.alternate,s!==null&&(s.lanes|=n),Sa(a.return,n,e),s=a.child,s=s===null?null:s.sibling):s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function wa(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;Wr(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===Ae.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[sh]:e.push(sh))}a=a.return}return e!==null&&Ca(t,e,n,r),t.flags|=262144,e!==null}function Ta(e){for(e=e.firstContext;e!==null;){if(!Wr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ea(e){va=e,ya=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Da(e){return ka(va,e)}function Oa(e,t){return va===null&&Ea(e),ka(e,t)}function ka(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},ya===null){if(e===null)throw Error(i(308));ya=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else ya=ya.next=t;return n}var Aa=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},ja=t.unstable_scheduleCallback,Ma=t.unstable_NormalPriority,Na={$$typeof:O,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Pa(){return{controller:new Aa,data:new Map,refCount:0}}function Fa(e){e.refCount--,e.refCount===0&&ja(Ma,function(){e.controller.abort()})}function Ia(e,t){if(e.pendingLanes&4194048){var n=e.transitionTypes;for(n===null&&(n=e.transitionTypes=[]),e=0;e<t.length;e++){var r=t[e];n.indexOf(r)===-1&&n.push(r)}}}var La=null;function Ra(e){var t=e.transitionTypes;return e.transitionTypes=null,t}var za=null,Ba=0,Va=0,Ha=null;function Ua(e,t){if(za===null){var n=za=[];Ba=0,Va=Pf(),Ha={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return Ba++,t.then(Wa,Wa),t}function Wa(){if(--Ba===0&&(La=null,za!==null)){Ha!==null&&(Ha.status=`fulfilled`);var e=za;za=null,Va=0,Ha=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Ga(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var Ka=k.S;k.S=function(e,t){if(gd=qe(),typeof t==`object`&&t&&typeof t.then==`function`&&Ua(e,t),La!==null)for(var n=bf;n!==null;)Ia(n,La),n=n.next;if(n=e.types,n!==null){for(var r=bf;r!==null;)Ia(r,n),r=r.next;if(Va!==0){r=La,r===null&&(r=La=[]);for(var i=0;i<n.length;i++){var a=n[i];r.indexOf(a)===-1&&r.push(a)}}}Ka!==null&&Ka(e,t)};var qa=Te(null);function Ja(){var e=qa.current;return e===null?G.pooledCache:e}function Ya(e,t){t===null?j(qa,qa.current):j(qa,t.pool)}function Xa(){var e=Ja();return e===null?null:{parent:Na._currentValue,pool:e}}var Za=Error(i(460)),Qa=Error(i(474)),$a=Error(i(542)),eo={then:function(){}};function to(e){return e=e.status,e===`fulfilled`||e===`rejected`}function no(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(Tn,Tn),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,oo(e),e===void 0&&!(`reason`in t)?Error(i(600)):e;default:if(typeof t.status==`string`)t.then(Tn,Tn);else{if(e=G,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,oo(e),e}throw io=t,Za}}function ro(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(io=e,Za):e}}var io=null;function ao(){if(io===null)throw Error(i(459));var e=io;return io=null,e}function oo(e){if(e===Za||e===$a)throw Error(i(483))}var so=null,co=0;function lo(e){var t=co;return co+=1,so===null&&(so=[]),no(so,e,t)}function uo(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function fo(e,t){throw t.$$typeof===ne?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function po(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=Li(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=134217730,n):(r=r.index,r<n?(t.flags|=2,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=134217730),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=Vi(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===re?(e=d(e,t,n.props.children,r,n.key),uo(e,n),e):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===de&&ro(i)===t.type)?(t=a(t,n.props),uo(t,n),t.return=e,t):(t=zi(n.type,n.key,n.props,null,e.mode,r),uo(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=Ui(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=Bi(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=Vi(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case E:return n=zi(t.type,t.key,t.props,null,e.mode,n),uo(n,t),n.return=e,n;case D:return t=Ui(t,e.mode,n),t.return=e,t;case de:return t=ro(t),f(e,t,n)}if(xe(t)||ve(t))return t=Bi(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,lo(t),n);if(t.$$typeof===O)return f(e,Oa(e,t),n);fo(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case E:return n.key===i?l(e,t,n,r):null;case D:return n.key===i?u(e,t,n,r):null;case de:return n=ro(n),p(e,t,n,r)}if(xe(n)||ve(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,lo(n),r);if(n.$$typeof===O)return p(e,t,Oa(e,n),r);fo(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case E:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case D:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case de:return r=ro(r),m(e,t,n,r,i)}if(xe(r)||ve(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,lo(r),i);if(r.$$typeof===O)return m(e,t,n,Oa(t,r),i);fo(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),R&&ta(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return R&&ta(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&(_=g.alternate,_!==null&&d.delete(_.key===null?h:_.key)),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),R&&ta(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),R&&ta(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return R&&ta(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&(_=v.alternate,_!==null&&h.delete(_.key===null?g:_.key)),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),R&&ta(a,g),u}function _(e,r,o,c){if(typeof o==`object`&&o&&o.type===re&&o.key===null&&o.props.ref===void 0&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case E:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===re){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),uo(c,o),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===de&&ro(l)===r.type){n(e,r.sibling),c=a(r,o.props),uo(c,o),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}o.type===re?(c=Bi(o.props.children,e.mode,c,o.key),uo(c,o),c.return=e,e=c):(c=zi(o.type,o.key,o.props,null,e.mode,c),uo(c,o),c.return=e,e=c)}return s(e);case D:a:{for(l=o.key;r!==null;){if(r.key===l){if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}c=Ui(o,e.mode,c),c.return=e,e=c}return s(e);case de:return o=ro(o),_(e,r,o,c)}if(xe(o))return h(e,r,o,c);if(ve(o)){if(l=ve(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return _(e,r,lo(o),c);if(o.$$typeof===O)return _(e,r,Oa(e,o),c);fo(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=Vi(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{co=0;var i=_(e,t,n,r);return so=null,i}catch(t){if(t===Za||t===$a)throw t;var a=Fi(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var mo=po(!0),ho=po(!1),go=!1;function _o(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function vo(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function yo(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function bo(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,W&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=Mi(e),ji(e,null,n),t}return Oi(e,r,t,n),Mi(e)}function xo(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,St(e,n)}}function So(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Co=!1;function wo(){if(Co){var e=Ha;if(e!==null)throw e}}function To(e,t,n,r){Co=!1;var i=e.updateQueue;go=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(q&f)===f:(r&f)===f){f!==0&&f===Va&&(Co=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,h=s;f=t;var g=n;switch(h.tag){case 1:if(m=h.payload,typeof m==`function`){d=m.call(g,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=h.payload,f=typeof m==`function`?m.call(g,d,f):m,f==null)break a;d=T({},d,f);break a;case 2:go=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),sd|=o,e.lanes=o,e.memoizedState=d}}function Eo(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function Do(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Eo(n[e],t)}var Oo=Te(null),ko=Te(0);function Ao(e,t){e=od,j(ko,e),j(Oo,t),od=e|t.baseLanes}function jo(){j(ko,od),j(Oo,Oo.current)}function Mo(){od=ko.current,Ee(Oo),Ee(ko)}var No=Te(null),Po=null;function Fo(e){var t=e.alternate;j(Bo,Bo.current&1),j(No,e),Po===null&&(t===null||Oo.current!==null||t.memoizedState!==null)&&(Po=e)}function Io(e){j(Bo,Bo.current),j(No,e),Po===null&&(Po=e)}function Lo(e){e.tag===22?(j(Bo,Bo.current),j(No,e),Po===null&&(Po=e)):Ro()}function Ro(){j(Bo,Bo.current),j(No,No.current)}function zo(e){Ee(No),Po===e&&(Po=null),Ee(Bo)}var Bo=Te(0);function Vo(e,t){j(No,No.current),j(Bo,t)}function Ho(e){Ee(Bo),Ee(No),Po===e&&(Po=null)}function Uo(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||om(n)||sm(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==`independent`){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Wo=0,z=null,B=null,Go=null,Ko=!1,qo=!1,Jo=!1,Yo=0,Xo=0,Zo=null,Qo=0;function $o(){throw Error(i(321))}function es(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Wr(e[n],t[n]))return!1;return!0}function ts(e,t,n,r,i,a){return Wo=a,z=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,k.H=e===null||e.memoizedState===null?vc:yc,Jo=!1,a=n(r,i),Jo=!1,qo&&(a=rs(t,n,r,i)),ns(e),a}function ns(e){k.H=_c;var t=B!==null&&B.next!==null;if(Wo=0,Go=B=z=null,Ko=!1,Xo=0,Zo=null,t)throw Error(i(300));e===null||Ic||(e=e.dependencies,e!==null&&Ta(e)&&(Ic=!0))}function rs(e,t,n,r){z=e;var a=0;do{if(qo&&(Zo=null),Xo=0,qo=!1,25<=a)throw Error(i(301));if(a+=1,Go=B=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}k.H=bc,o=t(n,r)}while(qo);return o}function is(){var e=k.H,t=e.useState()[0];return t=typeof t.then==`function`?ds(t):t,e=e.useState()[0],(B===null?null:B.memoizedState)!==e&&(z.flags|=1024),t}function as(){var e=Yo!==0;return Yo=0,e}function os(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function ss(e){if(Ko){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Ko=!1}Wo=0,Go=B=z=null,qo=!1,Xo=Yo=0,Zo=null}function cs(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Go===null?z.memoizedState=Go=e:Go=Go.next=e,Go}function ls(){if(B===null){var e=z.alternate;e=e===null?null:e.memoizedState}else e=B.next;var t=Go===null?z.memoizedState:Go.next;if(t!==null)Go=t,B=e;else{if(e===null)throw z.alternate===null?Error(i(467)):Error(i(310));B=e,e={memoizedState:B.memoizedState,baseState:B.baseState,baseQueue:B.baseQueue,queue:B.queue,next:null},Go===null?z.memoizedState=Go=e:Go=Go.next=e}return Go}function us(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ds(e){var t=Xo;return Xo+=1,Zo===null&&(Zo=[]),e=no(Zo,e,t),t=z,(Go===null?t.memoizedState:Go.next)===null&&(t=t.alternate,k.H=t===null||t.memoizedState===null?vc:yc),e}function fs(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return ds(e);if(e.$$typeof===ge)return;if(e.$$typeof===O)return Da(e)}throw Error(i(438,String(e)))}function ps(e){var t=null,n=z.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=z.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=us(),z.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=me;return t.index++,n}function ms(e,t){return typeof t==`function`?t(e):t}function hs(e){return gs(ls(),B,e)}function gs(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(Wo&f)===f:(q&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===Va&&(d=!0);else if((Wo&p)===p){u=u.next,p===Va&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,z.lanes|=p,sd|=p;f=u.action,Jo&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,z.lanes|=f,sd|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!Wr(o,e.memoizedState)&&(Ic=!0,d&&(n=Ha,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function _s(e){var t=ls(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);Wr(o,t.memoizedState)||(Ic=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function vs(e,t,n){var r=z,a=ls(),o=R;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!Wr((B||a).memoizedState,n);if(s&&(a.memoizedState=n,Ic=!0),a=a.queue,Us(xs.bind(null,r,a,e),[e]),e=a.getSnapshot!==t||s||Go!==null&&!!(Go.memoizedState.tag&1),Rs(e?9:8,{destroy:void 0},bs.bind(null,r,a,n,t),null),e){if(r.flags|=2048,G===null)throw Error(i(349));o||Wo&127||ys(r,t,n)}return n}function ys(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=z.updateQueue,t===null?(t=us(),z.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function bs(e,t,n,r){t.value=n,t.getSnapshot=r,Ss(t)&&Cs(e)}function xs(e,t,n){return n(function(){Ss(t)&&Cs(e)})}function Ss(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Wr(e,n)}catch{return!0}}function Cs(e){var t=Ai(e,2);t!==null&&Pd(t,e,2)}function ws(e){var t=cs();if(typeof e==`function`){var n=e;if(e=n(),Jo){it(!0);try{n()}finally{it(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ms,lastRenderedState:e},t}function Ts(e,t,n,r){return e.baseState=n,gs(e,B,typeof r==`function`?r:ms)}function Es(e,t,n,r,a){if(mc(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};k.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,Ds(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Ds(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=k.T,o={};o.types=a===null?null:a.types,k.T=o;try{var s=n(i,r),c=k.S;c!==null&&c(o,s),Os(e,t,s)}catch(n){As(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),k.T=a}}else try{a=n(i,r),Os(e,t,a)}catch(n){As(e,t,n)}}function Os(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){ks(e,t,n)},function(n){return As(e,t,n)}):ks(e,t,n)}function ks(e,t,n){t.status=`fulfilled`,t.value=n,js(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Ds(e,n)))}function As(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,js(t),t=t.next;while(t!==r)}e.action=null}function js(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Ms(e,t){return t}function Ns(e,t){if(R){var n=G.formState;if(n!==null){a:{var r=z;if(R){if(L){b:{for(var i=L,a=ca;i.nodeType!==8;){if(!a){i=null;break b}if(i=lm(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){L=lm(i.nextSibling),r=i.data===`F!`;break a}}ua(r)}r=!1}r&&(t=n[0])}}return n=cs(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ms,lastRenderedState:t},n.queue=r,n=dc.bind(null,z,r),r.dispatch=n,r=ws(!1),a=pc.bind(null,z,!1,r.queue),r=cs(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Es.bind(null,z,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function Ps(e){return Fs(ls(),B,e)}function Fs(e,t,n){if(t=gs(e,t,Ms)[0],e=hs(ms)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=ds(t)}catch(e){throw e===Za?$a:e}else r=t;t=ls();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(z.flags|=2048,Rs(9,{destroy:void 0},Is.bind(null,i,n),null)),[r,a,e]}function Is(e,t){e.action=t}function Ls(e){var t=ls(),n=B;if(n!==null)return Fs(t,n,e);ls(),t=t.memoizedState,n=ls();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function Rs(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=z.updateQueue,t===null&&(t=us(),z.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function zs(){return ls().memoizedState}function Bs(e,t,n,r){var i=cs();z.flags|=e,i.memoizedState=Rs(1|t,{destroy:void 0},n,r===void 0?null:r)}function Vs(e,t,n,r){var i=ls();r=r===void 0?null:r;var a=i.memoizedState.inst;B!==null&&r!==null&&es(r,B.memoizedState.deps)?i.memoizedState=Rs(t,a,n,r):(z.flags|=e,i.memoizedState=Rs(1|t,a,n,r))}function Hs(e,t){Bs(8390656,8,e,t)}function Us(e,t){Vs(2048,8,e,t)}function Ws(e){z.flags|=4;var t=z.updateQueue;if(t===null)t=us(),z.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function Gs(e){var t=ls().memoizedState;return Ws({ref:t,nextImpl:e}),function(){if(W&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function Ks(e,t){return Vs(4,2,e,t)}function qs(e,t){return Vs(4,4,e,t)}function Js(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Ys(e,t,n){n=n==null?null:n.concat([e]),Vs(4,4,Js.bind(null,t,e),n)}function Xs(){}function Zs(e,t){var n=ls();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&es(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Qs(e,t){var n=ls();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&es(t,r[1]))return r[0];if(r=e(),Jo){it(!0);try{e()}finally{it(!1)}}return n.memoizedState=[r,t],r}function $s(e,t,n){return n===void 0||Wo&1073741824&&!(q&261930)?e.memoizedState=t:(e.memoizedState=n,e=Md(),z.lanes|=e,sd|=e,n)}function ec(e,t,n,r){return Wr(n,t)?n:Oo.current===null?!(Wo&106)||Wo&1073741824&&!(q&261930)?(Ic=!0,e.memoizedState=n):(e=Md(),z.lanes|=e,sd|=e,t):(e=$s(e,n,r),Wr(e,t)||(Ic=!0),e)}function tc(e,t,n,r,i){var a=A.p;A.p=a!==0&&8>a?a:8;var o=k.T,s={};s.types=o===null?null:o.types,k.T=s,pc(e,!1,t,n);try{var c=i(),l=k.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?fc(e,t,Ga(c,r),jd(e)):fc(e,t,r,jd(e))}catch(n){fc(e,t,{then:function(){},status:`rejected`,reason:n},jd())}finally{A.p=a,o!==null&&s.types!==null&&(o.types=s.types),k.T=o}}function nc(){}function rc(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=ic(e).queue;tc(e,a,t,Se,n===null?nc:function(){return ac(e),n(r)})}function ic(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:Se,baseState:Se,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ms,lastRenderedState:Se},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ms,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function ac(e){var t=ic(e);t.next===null&&(t=e.alternate.memoizedState),fc(e,t.next.queue,{},jd())}function oc(){return Da(sh)}function sc(){return ls().memoizedState}function cc(){return ls().memoizedState}function lc(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=jd();e=yo(n);var r=bo(t,e,n);r!==null&&(Pd(r,t,n),xo(r,t,n)),t={cache:Pa()},e.payload=t;return}t=t.return}}function uc(e,t,n){var r=jd();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},mc(e)?hc(t,n):(n=ki(e,t,n,r),n!==null&&(Pd(n,e,r),gc(n,t,r)))}function dc(e,t,n){fc(e,t,n,jd())}function fc(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(mc(e))hc(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Wr(s,o))return Oi(e,t,i,0),G===null&&Di(),!1}catch{}if(n=ki(e,t,i,r),n!==null)return Pd(n,e,r),gc(n,t,r),!0}return!1}function pc(e,t,n,r){if(r={lane:2,revertLane:Pf(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},mc(e)){if(t)throw Error(i(479))}else t=ki(e,n,r,2),t!==null&&Pd(t,e,2)}function mc(e){var t=e.alternate;return e===z||t!==null&&t===z}function hc(e,t){qo=Ko=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function gc(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,St(e,n)}}var _c={readContext:Da,use:fs,useCallback:$o,useContext:$o,useEffect:$o,useImperativeHandle:$o,useLayoutEffect:$o,useInsertionEffect:$o,useMemo:$o,useReducer:$o,useRef:$o,useState:$o,useDebugValue:$o,useDeferredValue:$o,useTransition:$o,useSyncExternalStore:$o,useId:$o,useHostTransitionStatus:$o,useFormState:$o,useActionState:$o,useOptimistic:$o,useMemoCache:$o,useCacheRefresh:$o,useEffectEvent:$o},vc={readContext:Da,use:fs,useCallback:function(e,t){return cs().memoizedState=[e,t===void 0?null:t],e},useContext:Da,useEffect:Hs,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),Bs(4194308,4,Js.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Bs(4194308,4,e,t)},useInsertionEffect:function(e,t){Bs(4,2,e,t)},useMemo:function(e,t){var n=cs();t=t===void 0?null:t;var r=e();if(Jo){it(!0);try{e()}finally{it(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=cs();if(n!==void 0){var i=n(t);if(Jo){it(!0);try{n(t)}finally{it(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=uc.bind(null,z,e),[r.memoizedState,e]},useRef:function(e){var t=cs();return e={current:e},t.memoizedState=e},useState:function(e){e=ws(e);var t=e.queue,n=dc.bind(null,z,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Xs,useDeferredValue:function(e,t){return $s(cs(),e,t)},useTransition:function(){var e=ws(!1);return e=tc.bind(null,z,e.queue,!0,!1),cs().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=z,a=cs();if(R){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),G===null)throw Error(i(349));q&127||ys(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,Hs(xs.bind(null,r,o,e),[e]),r.flags|=2048,Rs(9,{destroy:void 0},bs.bind(null,r,o,n,t),null),n},useId:function(){var e=cs(),t=G.identifierPrefix;if(R){var n=ea,r=$i;n=(r&~(1<<32-at(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=Yo++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=Qo++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:oc,useFormState:Ns,useActionState:Ns,useOptimistic:function(e){var t=cs();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=pc.bind(null,z,!0,n),n.dispatch=t,[e,t]},useMemoCache:ps,useCacheRefresh:function(){return cs().memoizedState=lc.bind(null,z)},useEffectEvent:function(e){var t=cs(),n={impl:e};return t.memoizedState=n,function(){if(W&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},yc={readContext:Da,use:fs,useCallback:Zs,useContext:Da,useEffect:Us,useImperativeHandle:Ys,useInsertionEffect:Ks,useLayoutEffect:qs,useMemo:Qs,useReducer:hs,useRef:zs,useState:function(){return hs(ms)},useDebugValue:Xs,useDeferredValue:function(e,t){return ec(ls(),B.memoizedState,e,t)},useTransition:function(){var e=hs(ms)[0],t=ls().memoizedState;return[typeof e==`boolean`?e:ds(e),t]},useSyncExternalStore:vs,useId:sc,useHostTransitionStatus:oc,useFormState:Ps,useActionState:Ps,useOptimistic:function(e,t){return Ts(ls(),B,e,t)},useMemoCache:ps,useCacheRefresh:cc,useEffectEvent:Gs},bc={readContext:Da,use:fs,useCallback:Zs,useContext:Da,useEffect:Us,useImperativeHandle:Ys,useInsertionEffect:Ks,useLayoutEffect:qs,useMemo:Qs,useReducer:_s,useRef:zs,useState:function(){return _s(ms)},useDebugValue:Xs,useDeferredValue:function(e,t){var n=ls();return B===null?$s(n,e,t):ec(n,B.memoizedState,e,t)},useTransition:function(){var e=_s(ms)[0],t=ls().memoizedState;return[typeof e==`boolean`?e:ds(e),t]},useSyncExternalStore:vs,useId:sc,useHostTransitionStatus:oc,useFormState:Ls,useActionState:Ls,useOptimistic:function(e,t){var n=ls();return B===null?(n.baseState=e,[e,n.queue.dispatch]):Ts(n,B,e,t)},useMemoCache:ps,useCacheRefresh:cc,useEffectEvent:Gs};function xc(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:T({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Sc={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=jd(),i=yo(r);i.payload=t,n!=null&&(i.callback=n),t=bo(e,i,r),t!==null&&(Pd(t,e,r),xo(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=jd(),i=yo(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=bo(e,i,r),t!==null&&(Pd(t,e,r),xo(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=jd(),r=yo(n);r.tag=2,t!=null&&(r.callback=t),t=bo(e,r,n),t!==null&&(Pd(t,e,n),xo(t,e,n))}};function Cc(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Gr(n,r)||!Gr(i,a):!0}function wc(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Sc.enqueueReplaceState(t,t.state,null)}function Tc(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=T({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Ec(e){Ci(e)}function Dc(e){console.error(e)}function Oc(e){Ci(e)}function kc(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Ac(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function jc(e,t,n){return n=yo(n),n.tag=3,n.payload={element:null},n.callback=function(){kc(e,t)},n}function Mc(e){return e=yo(e),e.tag=3,e}function Nc(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){Ac(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){Ac(t,n,r),typeof i!=`function`&&(yd===null?yd=new Set([this]):yd.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function Pc(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&wa(t,n,a,!0),n=No.current,n!==null){switch(n.tag){case 31:case 13:case 19:return Po===null?Kd():n.alternate===null&&Y===0&&(Y=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===eo?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),mf(e,r,a)),!1;case 22:return n.flags|=65536,r===eo?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),mf(e,r,a)),!1}throw Error(i(435,n.tag))}return mf(e,r,a),Kd(),!1}if(R)return t=No.current,t===null?(r!==la&&(t=Error(i(423),{cause:r}),ga(Gi(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=Gi(r,n),a=jc(e.stateNode,r,a),So(e,a),Y!==4&&(Y=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==la&&(e=Error(i(422),{cause:r}),ga(Gi(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=Gi(o,n),fd===null?fd=[o]:fd.push(o),Y!==4&&(Y=2),t===null)return!0;r=Gi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=jc(n.stateNode,r,e),So(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(yd===null||!yd.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Mc(a),Nc(a,e,n,r),So(n,a),!1;break;case 22:if(n.memoizedState!==null)return n.flags|=65536,!1}n=n.return}while(n!==null);return!1}var Fc=Error(i(461)),Ic=!1;function Lc(e,t,n,r){t.child=e===null?ho(t,null,n,r):mo(t,e.child,n,r)}function Rc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return Ea(t),r=ts(e,t,n,o,a,i),s=as(),e!==null&&!Ic?(os(e,t,i),fl(e,t,i)):(R&&s&&ra(t),t.flags|=1,Lc(e,t,r,i),t.child)}function zc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!Ii(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,Bc(e,t,a,r,i)):(e=zi(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!pl(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Gr:n,n(o,r)&&e.ref===t.ref)return fl(e,t,i)}return t.flags|=1,e=Li(a,r),e.ref=t.ref,e.return=t,t.child=e}function Bc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Gr(a,r)&&e.ref===t.ref){if(Ic=!1,t.pendingProps=r=a,pl(e,i))e.flags&131072&&(Ic=!0);else return t.lanes=e.lanes,fl(e,t,i)}}return Jc(e,t,n,r,i)}function Vc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return Uc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Ya(t,a===null?null:a.cachePool),a===null?jo():Ao(t,a),Lo(t);else return r=t.lanes=536870912,Uc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&Ya(t,null),jo(),Ro()):(Ya(t,a.cachePool),Ao(t,a),Ro(),t.memoizedState=null);return Lc(e,t,i,n),t.child}function Hc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Uc(e,t,n,r,i){var a=Ja();return a=a===null?null:{parent:Na._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&Ya(t,null),jo(),Lo(t),e!==null&&wa(e,t,r,!0),t.childLanes=i,null}function Wc(e,t){return t=rl({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Gc(e,t,n){return mo(t,e.child,null,n),e=Wc(t,t.pendingProps),e.flags|=2,zo(t),t.memoizedState=null,e}function Kc(e,t,n){var r=t.pendingProps,a=!!(t.flags&128);if(t.flags&=-129,e===null){if(R){if(r.mode===`hidden`)return e=Wc(t,r),t.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},Hc(null,e);if(Io(t),(e=L)?(e=am(e,ca),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Qi===null?null:{id:$i,overflow:ea},retryLane:536870912,hydrationErrors:null},n=Hi(e),n.return=t,t.child=n,oa=t,L=null)):e=null,e===null)throw ua(t);return t.lanes=536870912,null}return Wc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(Io(t),a){if(t.flags&256)t.flags&=-257,t=Gc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558))}else if(Ic||wa(e,t,n,!1),a=(n&e.childLanes)!==0,Ic||a){if(Oo.current===null){if(r=G,r!==null&&(s=Ct(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,Ai(e,s),Pd(r,e,s),Fc;Kd()}t=Gc(e,t,n)}else e=o.treeContext,L=lm(s.nextSibling),oa=t,R=!0,sa=null,ca=!1,e!==null&&aa(t,e),t=Wc(t,r),t.flags|=134221824;return t}return e=Li(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function qc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function Jc(e,t,n,r,i){return Ea(t),n=ts(e,t,n,r,void 0,i),r=as(),e!==null&&!Ic?(os(e,t,i),fl(e,t,i)):(R&&r&&ra(t),t.flags|=1,Lc(e,t,n,i),t.child)}function Yc(e,t,n,r,i,a){return Ea(t),t.updateQueue=null,n=rs(t,r,n,i),ns(e),r=as(),e!==null&&!Ic?(os(e,t,a),fl(e,t,a)):(R&&r&&ra(t),t.flags|=1,Lc(e,t,n,a),t.child)}function Xc(e,t,n,r,i){if(Ea(t),t.stateNode===null){var a=Ni,o=n.contextType;typeof o==`object`&&o&&(a=Da(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Sc,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},_o(t),o=n.contextType,a.context=typeof o==`object`&&o?Da(o):Ni,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(xc(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&Sc.enqueueReplaceState(a,a.state,null),To(t,r,a,i),wo(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Tc(n,s);a.props=c;var l=a.context,u=n.contextType;o=Ni,typeof u==`object`&&u&&(o=Da(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&wc(t,a,r,o),go=!1;var f=t.memoizedState;a.state=f,To(t,r,a,i),wo(),l=t.memoizedState,s||f!==l||go?(typeof d==`function`&&(xc(t,n,d,r),l=t.memoizedState),(c=go||Cc(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,vo(e,t),o=t.memoizedProps,u=Tc(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=Ni,typeof l==`object`&&l&&(c=Da(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&wc(t,a,r,c),go=!1,f=t.memoizedState,a.state=f,To(t,r,a,i),wo();var p=t.memoizedState;o!==d||f!==p||go||e!==null&&e.dependencies!==null&&Ta(e.dependencies)?(typeof s==`function`&&(xc(t,n,s,r),p=t.memoizedState),(u=go||Cc(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&Ta(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,qc(e,t),r=!!(t.flags&128),a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=mo(t,e.child,null,i),t.child=mo(t,null,n,i)):Lc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=fl(e,t,i),e}function Zc(e,t,n,r){return ma(),t.flags|=256,Lc(e,t,n,r),t.child}var Qc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function $c(e){return{baseLanes:e,cachePool:Xa()}}function el(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=ud),e}function tl(e,t,n){var r=t.pendingProps,i=!1,a=!!(t.flags&128),o;if((o=a)||(o=e!==null&&e.memoizedState===null?!1:!!(Bo.current&2)),o&&(i=!0,t.flags&=-129),o=!!(t.flags&32),t.flags&=-33,e===null){if(R){if(i?Fo(t):Ro(),(e=L)?(e=am(e,ca),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Qi===null?null:{id:$i,overflow:ea},retryLane:536870912,hydrationErrors:null},n=Hi(e),n.return=t,t.child=n,oa=t,L=null)):e=null,e===null)throw ua(t);return t.lanes=sm(e)?32:536870912,null}return a=r.children,r=r.fallback,i?(Ro(),i=t.mode,a=rl({mode:`hidden`,children:a},i),r=Bi(r,i,n,null),a.return=t,r.return=t,a.sibling=r,t.child=a,r=t.child,r.memoizedState=$c(n),r.childLanes=el(e,o,n),t.memoizedState=Qc,Hc(null,r)):(Fo(t),nl(t,a))}var s=e.memoizedState;if(s!==null){var c=s.dehydrated;if(c!==null)return al(e,t,a,o,r,c,s,n)}return i?(Ro(),i=r.fallback,a=t.mode,s=e.child,c=s.sibling,r=Li(s,{mode:`hidden`,children:r.children}),r.subtreeFlags=s.subtreeFlags&1206910976,c===null?(i=Bi(i,a,n,null),i.flags|=2):i=Li(c,i),i.return=t,r.return=t,r.sibling=i,t.child=r,Hc(null,r),r=t.child,i=e.child.memoizedState,i===null?i=$c(n):(a=i.cachePool,a===null?a=Xa():(s=Na._currentValue,a=a.parent===s?a:{parent:s,pool:s}),i={baseLanes:i.baseLanes|n,cachePool:a}),r.memoizedState=i,r.childLanes=el(e,o,n),t.memoizedState=Qc,Hc(e.child,r)):(Fo(t),n=e.child,e=n.sibling,n=Li(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=n,t.memoizedState=null,n)}function nl(e,t){return t=rl({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function rl(e,t){return e=Fi(22,e,null,t),e.lanes=0,e}function il(e,t,n){return mo(t,e.child,null,n),e=nl(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function al(e,t,n,r,a,o,s,c){if(n)return t.flags&256?(Fo(t),t.flags&=-257,il(e,t,c)):t.memoizedState===null?(Ro(),o=a.fallback,s=t.mode,a=rl({mode:`visible`,children:a.children},s),o=Bi(o,s,c,null),o.flags|=2,a.return=t,o.return=t,a.sibling=o,t.child=a,mo(t,e.child,null,c),a=t.child,a.memoizedState=$c(c),a.childLanes=el(e,r,c),t.memoizedState=Qc,Hc(null,a)):(Ro(),t.child=e.child,t.flags|=128,null);if(Fo(t),sm(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var l=r.dgst;return r=l,r!==``&&(a=Error(i(419)),a.stack=``,a.digest=r,ga({value:a,source:null,stack:null})),il(e,t,c)}if(Ic||wa(e,t,c,!1),r=(c&e.childLanes)!==0,Ic||r){if(Oo.current!==null)return il(e,t,c);if(r=G,r!==null&&(a=Ct(r,c),a!==0&&a!==s.retryLane))throw s.retryLane=a,Ai(e,a),Pd(r,e,a),Fc;return om(o)||Kd(),il(e,t,c)}return om(o)?(t.flags|=192,t.child=e.child,null):(e=s.treeContext,L=lm(o.nextSibling),oa=t,R=!0,sa=null,ca=!1,e!==null&&aa(t,e),t=nl(t,a.children),t.flags|=134221824,t)}function ol(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Sa(e.return,t,n)}function sl(e){for(var t=null;e!==null;){var n=e.alternate;n!==null&&Uo(n)===null&&(t=e),e=e.sibling}return t}function cl(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function ll(e){var t=e.child;for(e.child=null;t!==null;){var n=t.sibling;t.sibling=e.child,e.child=t,t=n}}function ul(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=Bo.current;if(t.flags&128)return Vo(t,o),null;var s=!!(o&2);if(s?(o=o&1|2,t.flags|=128):o&=1,Vo(t,o),i===`backwards`&&e!==null?(ll(e),Lc(e,t,r,n),ll(e)):Lc(e,t,r,n),r=R?Yi:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&ol(e,n,t);else if(e.tag===19)ol(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`backwards`:n=sl(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null,ll(t)),cl(t,!0,i,null,a,r);break;case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Uo(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}cl(t,!0,n,null,a,r);break;case`together`:cl(t,!1,null,null,void 0,r);break;case`independent`:t.memoizedState=null;break;default:n=sl(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),cl(t,!1,i,n,a,r)}return t.child}function dl(e,t,n){var r=t.pendingProps;return ba(t,t.type,r.value),Lc(e,t,r.children,n),t.child}function fl(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),sd|=t.lanes,(n&t.childLanes)===0){if(e!==null){if(wa(e,t,n,!1),(n&t.childLanes)===0)return null}else return null}if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=Li(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Li(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function pl(e,t){return(e.lanes&t)!==0||(e=e.dependencies,!!(e!==null&&Ta(e)))}function ml(e,t,n){switch(t.tag){case 3:je(t,t.stateNode.containerInfo),ba(t,Na,e.memoizedState.cache),ma();break;case 27:case 5:Ne(t);break;case 4:je(t,t.stateNode.containerInfo);break;case 10:ba(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Io(t),null;break;case 13:var r=t.memoizedState;if(r!==null){if(r.dehydrated!==null)return Fo(t),t.flags|=128,null;r=wa(e,t,n,!1);var i=t.child.childLanes;return r||(n&i)!==0?tl(e,t,n):(Fo(t),e=fl(e,t,n),e===null?null:e.sibling)}Fo(t);break;case 19:if(t.flags&128)return ul(e,t,n);if(i=!!(e.flags&128),r=(n&t.childLanes)!==0,r||=(wa(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return ul(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),Vo(t,Bo.current),r)break;return null;case 22:return t.lanes=0,Vc(e,t,n,t.pendingProps);case 24:ba(t,Na,e.memoizedState.cache)}return fl(e,t,n)}function hl(e,t,n){if(e!==null){if(e.memoizedProps!==t.pendingProps)Ic=!0;else{if(!pl(e,n)&&!(t.flags&128))return Ic=!1,ml(e,t,n);Ic=!!(e.flags&131072)}}else Ic=!1,R&&t.flags&1048576&&na(t,Yi,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=ro(t.elementType),t.type=e,typeof e==`function`)Ii(e)?(r=Tc(e,r),t.tag=1,t=Xc(null,t,e,r,n)):(t.tag=0,t=Jc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===se){t.tag=11,t=Rc(null,t,e,r,n);break a}if(a===ue){t.tag=14,t=zc(null,t,e,r,n);break a}if(a===O){t.tag=10,t.type=e,t=dl(null,t,n);break a}}throw t=be(e)||e,Error(i(306,t,``))}}return t;case 0:return Jc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=Tc(r,t.pendingProps),Xc(e,t,r,a,n);case 3:a:{if(je(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,vo(e,t),To(t,r,null,n);var s=t.memoizedState;if(r=s.cache,ba(t,Na,r),r!==o.cache&&Ca(t,[Na],n,!0),wo(),r=s.element,o.isDehydrated){if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=Zc(e,t,r,n);break a}if(r!==a){a=Gi(Error(i(424)),t),ga(a),t=Zc(e,t,r,n);break a}switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(L=lm(e.firstChild),oa=t,R=!0,sa=null,ca=!0,n=ho(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|134221824,n=n.sibling}else{if(ma(),r===a){t=fl(e,t,n);break a}Lc(e,t,r,n)}t=t.child}return t;case 26:return qc(e,t),e===null?(n=Nm(t.type,null,t.pendingProps,null))?t.memoizedState=n:R||(t.stateNode=fp(t.type,t.pendingProps,ke.current,t)):t.memoizedState=Nm(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Ne(t),e===null&&R&&(r=t.stateNode=hm(t.type,t.pendingProps,ke.current),oa=t,ca=!0,a=L,Sp(t.type)?(um=a,L=lm(r.firstChild)):L=a),Lc(e,t,t.pendingProps.children,n),qc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&R&&((a=r=L)&&(r=rm(r,t.type,t.pendingProps,ca),r===null?a=!1:(t.stateNode=r,oa=t,L=lm(r.firstChild),ca=!1,a=!0)),a||ua(t)),Ne(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,pp(a,o)?r=null:s!==null&&pp(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=ts(e,t,is,null,null,n),sh._currentValue=a),qc(e,t),Lc(e,t,r,n),t.child;case 6:return e===null&&R&&((e=n=L)&&(n=im(n,t.pendingProps,ca),n===null?e=!1:(t.stateNode=n,oa=t,L=null,e=!0)),e||ua(t)),null;case 13:return tl(e,t,n);case 4:return je(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=mo(t,null,r,n):Lc(e,t,r,n),t.child;case 11:return Rc(e,t,t.type,t.pendingProps,n);case 7:return r=t.pendingProps,qc(e,t),Lc(e,t,r,n),t.child;case 8:return Lc(e,t,t.pendingProps.children,n),t.child;case 12:return Lc(e,t,t.pendingProps.children,n),t.child;case 10:return dl(e,t,n);case 9:return a=t.type._context,r=t.pendingProps.children,Ea(t),a=Da(a),r=r(a),t.flags|=1,Lc(e,t,r,n),t.child;case 14:return zc(e,t,t.type,t.pendingProps,n);case 15:return Bc(e,t,t.type,t.pendingProps,n);case 19:return ul(e,t,n);case 31:return Kc(e,t,n);case 22:return Vc(e,t,n,t.pendingProps);case 24:return Ea(t),r=Da(Na),e===null?(a=Ja(),a===null&&(a=G,o=Pa(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},_o(t),ba(t,Na,a)):((e.lanes&n)!==0&&(vo(e,t),To(t,null,null,n),wo()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,ba(t,Na,r),r!==a.cache&&Ca(t,[Na],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),ba(t,Na,r))),Lc(e,t,t.pendingProps.children,n),t.child;case 30:return t.stateNode===null&&(t.stateNode={autoName:null,paired:null,clones:null,ref:null}),r=t.pendingProps,r.name!=null&&r.name!==`auto`?t.flags|=e===null?18882560:18874368:R&&ra(t),e!==null&&e.memoizedProps.name!==r.name?t.flags|=4194816:qc(e,t),Lc(e,t,r.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function gl(e){e.flags|=4}function _l(e,t,n,r,i){var a;if((a=!!(e.mode&32))&&(a=n===null?Jm(t,r):Jm(t,r)&&(r.src!==n.src||r.srcSet!==n.srcSet)),a){if(e.flags|=16777216,(i&335544128)===i){if(e.stateNode.complete)e.flags|=8192;else if(Ud())e.flags|=8192;else throw io=eo,Qa}}else e.flags&=-16777217}function vl(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Ym(t)){if(Ud())e.flags|=8192;else throw io=eo,Qa}}function yl(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:_t(),e.lanes|=t,dd|=t)}function bl(e,t){if(!R)switch(e.tailMode){case`visible`:break;case`collapsed`:for(var n=e.tail,r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null;break;default:for(t=e.tail,n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null}}function V(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&1206910976,r|=i.flags&1206910976,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function xl(e,t,n){var r=t.pendingProps;switch(ia(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return V(t),null;case 1:return V(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),xa(Na),Me(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(pa(t)?gl(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,ha())),V(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(gl(t),o===null?(V(t),_l(t,a,null,r,n)):(V(t),vl(t,o))):o?o===e.memoizedState?(V(t),t.flags&=-16777217):(gl(t),V(t),vl(t,o)):(e=e.memoizedProps,e!==r&&gl(t),V(t),_l(t,a,e,r,n)),null;case 27:if(Pe(t),n=ke.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&gl(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return V(t),t.subtreeFlags&=-33554433,null}e=De.current,pa(t)?da(t,e):(e=hm(a,r,n),t.stateNode=e,gl(t))}return V(t),t.subtreeFlags&=-33554433,null;case 5:if(Pe(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&gl(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return V(t),t.subtreeFlags&=-33554433,null}if(o=De.current,pa(t))da(t,o);else{var s=lp(ke.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[kt]=t,o[At]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(np(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&gl(t)}}return V(t),t.subtreeFlags&=-33554433,_l(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&gl(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=ke.current,pa(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=oa,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[kt]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||ep(e.nodeValue,n)),e||ua(t,!0)}else e=lp(e).createTextNode(r),e[kt]=t,t.stateNode=e}return V(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=pa(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[kt]=t}else ma(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;V(t),e=!1}else n=ha(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(zo(t),t):(zo(t),null);if(t.flags&128)throw Error(i(558))}return V(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=pa(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[kt]=t}else ma(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;V(t),a=!1}else a=ha(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(zo(t),t):(zo(t),null)}return zo(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),yl(t,t.updateQueue),V(t),null);case 4:return Me(),e===null&&Wf(t.stateNode.containerInfo),t.flags|=67108864,V(t),null;case 10:return xa(t.type),V(t),null;case 19:if(Ho(t),r=t.memoizedState,r===null)return V(t),null;if(a=!!(t.flags&128),o=r.rendering,o===null){if(a)bl(r,!1);else{if(Y!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=Uo(e),o!==null){for(t.flags|=128,bl(r,!1),e=o.updateQueue,t.updateQueue=e,yl(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)Ri(n,e),n=n.sibling;return Vo(t,Bo.current&1|2),R&&ta(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&qe()>_d&&(t.flags|=128,a=!0,bl(r,!1),t.lanes=4194304)}}else{if(!a){if(e=Uo(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,yl(t,e),bl(r,!0),r.tail===null&&r.tailMode!==`collapsed`&&r.tailMode!==`visible`&&!o.alternate&&!R)return V(t),null}else 2*qe()-r.renderingStartTime>_d&&n!==536870912&&(t.flags|=128,a=!0,bl(r,!1),t.lanes=4194304)}r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}if(r.tail!==null){e=r.tail;a:{for(n=e;n!==null;){if(n.alternate!==null){n=!1;break a}n=n.sibling}n=!0}return r.rendering=e,r.tail=e.sibling,r.renderingStartTime=qe(),e.sibling=null,o=Bo.current,o=a?o&1|2:o&1,r.tailMode===`visible`||r.tailMode===`collapsed`||!n||R?Vo(t,o):(n=o,j(No,t),j(Bo,n),Po===null&&(Po=t)),R&&ta(t,r.treeForkCount),e}return V(t),null;case 22:case 23:return zo(t),Mo(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(V(t),t.subtreeFlags&6&&(t.flags|=8192)):V(t),n=t.updateQueue,n!==null&&yl(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&Ee(qa),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),xa(Na),V(t),null;case 25:return null;case 30:return t.flags|=33554432,V(t),null}throw Error(i(156,t.tag))}function Sl(e,t){switch(ia(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return xa(Na),Me(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Pe(t),null;case 31:if(t.memoizedState!==null){if(zo(t),t.alternate===null)throw Error(i(340));ma()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(zo(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));ma()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Ho(t),e=t.flags,e&65536?(t.flags=e&-65537|128,e=t.memoizedState,e!==null&&(e.rendering=null,e.tail=null),t.flags|=4,t):null;case 4:return Me(),null;case 10:return xa(t.type),null;case 22:case 23:return zo(t),Mo(),e!==null&&Ee(qa),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return xa(Na),null;case 25:return null;default:return null}}function Cl(e,t){switch(ia(t),t.tag){case 3:xa(Na),Me();break;case 26:case 27:case 5:Pe(t);break;case 4:Me();break;case 31:t.memoizedState!==null&&zo(t);break;case 13:zo(t);break;case 19:Ho(t);break;case 10:xa(t.type);break;case 22:case 23:zo(t),Mo(),e!==null&&Ee(qa);break;case 24:xa(Na)}}function wl(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Z(t,t.return,e)}}function Tl(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Z(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Z(t,t.return,e)}}function El(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Do(t,n)}catch(t){Z(e,e.return,t)}}}function Dl(e,t,n){n.props=Tc(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Z(e,t,n)}}function Ol(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:var i=e.stateNode,a=bi(e.memoizedProps,i);(i.ref===null||i.ref.name!==a)&&(i.ref=Pp(a)),r=i.ref;break;case 7:if(e.stateNode===null){var o=new Fp(e);h(e.child,!1,Qp,o,void 0,void 0),e.stateNode=o}r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Z(e,t,n)}}function kl(e,t){var n=e.ref,r=e.refCleanup;if(n!==null){if(typeof r==`function`)try{r()}catch(n){Z(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Z(e,t,n)}else n.current=null}}function Al(e,t){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&t!==null)for(var n=0;n<t.length;n++)em(e.stateNode,t[n])}function jl(e){for(var t=e.return;t!==null&&(Pl(t)&&em(e.stateNode,t.stateNode),!Nl(t));)t=t.return}function Ml(e){for(var t=e.return;t!==null&&(Pl(t)&&tm(e.stateNode,t.stateNode),!Nl(t));)t=t.return}function Nl(e){return e.tag===5||e.tag===3||e.tag===27}function Pl(e){return e&&e.tag===7&&e.stateNode!==null}function Fl(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Z(e,e.return,t)}}function Il(e,t,n){try{var r=e.stateNode;ip(r,e.type,n,t),r[At]=t}catch(t){Z(e,e.return,t)}}function Ll(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Sp(e.type)||e.tag===4}function Rl(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Ll(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Sp(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function zl(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(i,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(i),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Tn)),Al(e,r),M=!0;else if(i!==4&&(i===27&&(Al(e,r),r=null,Sp(e.type)&&(n=e.stateNode,t=null)),e=e.child,e!==null))for(zl(e,t,n,r),e=e.sibling;e!==null;)zl(e,t,n,r),e=e.sibling}function Bl(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?n.insertBefore(i,t):n.appendChild(i),Al(e,r),M=!0;else if(i!==4&&(i===27&&(Al(e,r),r=null,Sp(e.type)&&(n=e.stateNode)),e=e.child,e!==null))for(Bl(e,t,n,r),e=e.sibling;e!==null;)Bl(e,t,n,r),e=e.sibling}function Vl(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);np(t,r,n),t[kt]=e,t[At]=n}catch(t){Z(e,e.return,t)}}var Hl=!1,Ul=null;function Wl(e){(e.tag===30||e.subtreeFlags&33554432)&&(Hl=!0)}var Gl=null;function Kl(){var e=Gl;return Gl=null,e}var ql=0;function Jl(e,t,n,r,i){return ql=0,Yl(e.child,t,n,r,i)}function Yl(e,t,n,r,i){for(var a=!1;e!==null;){if(e.tag===5){var o=e.stateNode;if(r!==null){var s=Op(o);r.push(s),s.view&&(a=!0)}else a||Op(o).view&&(a=!0);Hl=!0,Tp(o,ql===0?t:t+`_`+ql,n),ql++}else(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&i||Yl(e.child,t,n,r,i)&&(a=!0));e=e.sibling}return a}function Xl(e,t){for(;e!==null;)e.tag===5?Ep(e.stateNode,e.memoizedProps):(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&t||Xl(e.child,t)),e=e.sibling}function Zl(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(Zl(e),e.tag===30&&e.flags&18874368&&e.stateNode.paired)){var t=e.memoizedProps;if(t.name==null||t.name===`auto`)throw Error(i(544));var n=t.name;t=Si(t.default,t.share),t!==`none`&&(Jl(e,n,t,null,!1)||Xl(e.child,!1))}e=e.sibling}}function Ql(e,t){if(e.tag===30){var n=e.stateNode,r=e.memoizedProps,i=bi(r,n),a=Si(r.default,n.paired?r.share:r.enter);a===`none`?Zl(e):Jl(e,i,a,null,!1)?(Zl(e),n.paired||t||Nd(e,r.onEnter)):Xl(e.child,!1)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Ql(e,t),e=e.sibling;else Zl(e)}function $l(e){if(Ul!==null&&Ul.size!==0){var t=Ul;if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var n=e.memoizedProps,r=n.name;if(r!=null&&r!==`auto`){var i=t.get(r);if(i!==void 0){var a=Si(n.default,n.share);if(a!==`none`&&(Jl(e,r,a,null,!1)?(a=e.stateNode,i.paired=a,a.paired=i,Nd(e,n.onShare)):Xl(e.child,!1)),t.delete(r),t.size===0)break}}}$l(e)}e=e.sibling}}}function eu(e){if(e.tag===30){var t=e.memoizedProps,n=bi(t,e.stateNode),r=Ul===null?void 0:Ul.get(n),i=Si(t.default,r===void 0?t.exit:t.share);i!==`none`&&(Jl(e,n,i,null,!1)?r===void 0?Nd(e,t.onExit):(i=e.stateNode,r.paired=i,i.paired=r,Ul.delete(n),Nd(e,t.onShare)):Xl(e.child,!1)),Ul!==null&&$l(e)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)eu(e),e=e.sibling;else Ul!==null&&$l(e)}function tu(e){for(e=e.child;e!==null;){if(e.tag===30){var t=e.memoizedProps,n=bi(t,e.stateNode);t=Si(t.default,t.update),e.flags&=-5,t!==`none`&&Jl(e,n,t,e.memoizedState=[],!1)}else e.subtreeFlags&33554432&&tu(e);e=e.sibling}}function nu(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var t=e.stateNode;t.paired!==null&&(t.paired=null,Xl(e.child,!1))}nu(e)}e=e.sibling}}function ru(e){if(e.tag===30)e.stateNode.paired=null,Xl(e.child,!1),nu(e);else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)ru(e),e=e.sibling;else nu(e)}function iu(e){for(e=e.child;e!==null;)e.tag===30?Xl(e.child,!1):e.subtreeFlags&33554432&&iu(e),e=e.sibling}function au(e,t,n,r,i,a,o){for(var s=!1;t!==null;){if(t.tag===5){var c=t.stateNode;if(a!==null&&ql<a.length){var l=a[ql],u=Op(c);(l.view||u.view)&&(s=!0);var d;if(d=!(e.flags&4)){if(u.clip)d=!0;else{d=l.rect;var f=u.rect;d=d.y!==f.y||d.x!==f.x||d.height!==f.height||d.width!==f.width}}d&&(e.flags|=4),u.abs?u=!l.abs:(l=l.rect,u=u.rect,u=l.height!==u.height||l.width!==u.width),u&&(e.flags|=32)}else e.flags|=32;e.flags&4&&Tp(c,ql===0?n:n+`_`+ql,i),s&&e.flags&4||(Gl===null&&(Gl=[]),Gl.push(c,ql===0?r:r+`_`+ql,t.memoizedProps)),ql++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&o?e.flags|=t.flags&32:au(e,t.child,n,r,i,a,o)&&(s=!0));t=t.sibling}return s}function ou(e,t){for(e=e.child;e!==null;){if(e.tag===30){var n=e.memoizedProps,r=e.stateNode,i=bi(n,r),a=Si(n.default,n.update);if(t){r=r.clones;var o=r===null?null:r.map(kp)}else o=e.memoizedState,e.memoizedState=null;r=e;var s=e.child;ql=0,i=au(r,s,i,i,a,o,!1),e.flags&4&&i&&(t||Nd(e,n.onUpdate))}else e.subtreeFlags&33554432&&ou(e,t);e=e.sibling}}var su=!1,H=!1,cu=!1,lu=!1,uu=typeof WeakSet==`function`?WeakSet:Set,du=null,fu=!1,pu=!1,mu=!1,hu=!1;function gu(e,t,n){if(e=e.containerInfo,sp=gh,e=Xr(e),Zr(e)){if(`selectionStart`in e)var r={start:e.selectionStart,end:e.selectionEnd};else a:{r=(r=e.ownerDocument)&&r.defaultView||window;var i=r.getSelection&&r.getSelection();if(i&&i.rangeCount!==0){r=i.anchorNode;var a=i.anchorOffset,o=i.focusNode;i=i.focusOffset;try{r.nodeType,o.nodeType}catch{r=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==r||a!==0&&f.nodeType!==3||(c=s+a),f!==o||i!==0&&f.nodeType!==3||(l=s+i),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===r&&++u===a&&(c=s),p===o&&++d===i&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}r=c===-1||l===-1?null:{start:c,end:l}}else r=null}r||={start:0,end:0}}else r=null;for(cp={focusedElem:e,selectionRange:r},gh=!1,n=(n&335544064)===n,du=t,t=n?9270:1024;du!==null;){if(e=du,n&&(r=e.deletions,r!==null))for(a=0;a<r.length;a++)n&&eu(r[a]);if(e.alternate===null&&e.flags&2)n&&Wl(e),_u(n);else{if(e.tag===22){if(r=e.alternate,e.memoizedState!==null){r!==null&&r.memoizedState===null&&n&&eu(r),_u(n);continue}if(r!==null&&r.memoizedState!==null){n&&Wl(e),_u(n);continue}}r=e.child,(e.subtreeFlags&t)!==0&&r!==null?(r.return=e,du=r):(n&&tu(e),_u(n))}}Ul=null}function _u(e){for(;du!==null;){var t=du,n=e,r=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 15:break;case 1:if(a&1024&&r!==null){n=void 0,a=r.memoizedProps,r=r.memoizedState;var o=t.stateNode;try{var s=Tc(t.type,a);n=o.getSnapshotBeforeUpdate(s,r),o.__reactInternalSnapshotBeforeUpdate=n}catch(e){Z(t,t.return,e)}}break;case 3:if(a&1024){if(r=t.stateNode.containerInfo,n=r.nodeType,n===9)nm(r);else if(n===1)switch(r.nodeName){case`HEAD`:case`HTML`:case`BODY`:nm(r);break;default:r.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:n&&r!==null&&(n=bi(r.memoizedProps,r.stateNode),a=t.memoizedProps,a=Si(a.default,a.update),a!==`none`&&Jl(r,n,a,r.memoizedState=[],!0));break;default:if(a&1024)throw Error(i(163))}if(r=t.sibling,r!==null){r.return=t.return,du=r;break}du=t.return}}function vu(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:Lu(e,n),r&4&&wl(5,n);break;case 1:if(Lu(e,n),r&4){if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Z(n,n.return,e)}else{var i=Tc(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Z(n,n.return,e)}}}r&64&&El(n),r&512&&Ol(n,n.return);break;case 3:if(Lu(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Do(e,t)}catch(e){Z(n,n.return,e)}}break;case 27:t===null&&r&4&&Vl(n);case 26:case 5:Lu(e,n),t===null&&r&4&&Fl(n),r&512&&Ol(n,n.return);break;case 12:Lu(e,n);break;case 31:Lu(e,n),r&4&&Eu(e,n);break;case 13:Lu(e,n),r&4&&Du(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=_f.bind(null,n),cm(e,n))));break;case 22:if(r=n.memoizedState!==null||su,!r){var a=t!==null&&t.memoizedState!==null||H;t=su,i=H,su=r,(H=a)&&!i?(r=2,n.subtreeFlags&8772&&(r|=1),zu(e,n,r)):Lu(e,n),su=t,H=i}break;case 30:Lu(e,n),r&512&&Ol(n,n.return);break;case 7:r&512&&Ol(n,n.return);default:Lu(e,n)}}function yu(e,t){for(e=e.child;e!==null;)bu(e,t),e=e.sibling}function bu(e,t){switch(e.tag){case 5:case 26:try{var n=e.stateNode;if(t){var r=n.style;typeof r.setProperty==`function`?r.setProperty(`display`,`none`,`important`):r.display=`none`}else{var i=e.stateNode,a=e.memoizedProps.style,o=a!=null&&a.hasOwnProperty(`display`)?a.display:null;i.style.display=o==null||typeof o==`boolean`?``:(``+o).trim()}}catch(t){Z(e,e.return,t)}xu(e,t);break;case 6:try{e.stateNode.nodeValue=t?``:e.memoizedProps,M=!0}catch(t){Z(e,e.return,t)}break;case 18:try{var s=e.stateNode;t?wp(s,!0):wp(e.stateNode,!1)}catch(t){Z(e,e.return,t)}break;case 22:case 23:e.memoizedState===null&&yu(e,t);break;default:yu(e,t)}}function xu(e,t){if(e.subtreeFlags&67108864)for(e=e.child;e!==null;){a:{var n=e,r=t;switch(n.tag){case 4:bu(n,r);break a;case 22:n.memoizedState===null&&xu(n,r);break a;default:xu(n,r)}}e=e.sibling}}function Su(e){var t=e.alternate;t!==null&&(e.alternate=null,Su(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Rt(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var U=null,Cu=!1;function wu(e,t,n){for(n=n.child;n!==null;)Tu(e,t,n),n=n.sibling}function Tu(e,t,n){if(rt&&typeof rt.onCommitFiberUnmount==`function`)try{rt.onCommitFiberUnmount(nt,n)}catch{}switch(n.tag){case 26:H||kl(n,t),wu(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&!H&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:H||kl(n,t),Ml(n);var r=U,i=Cu;Sp(n.type)&&(U=n.stateNode,Cu=!1),wu(e,t,n),gm(n.stateNode,n.type,n.memoizedProps),U=r,Cu=i;break;case 5:H||kl(n,t),Ml(n);case 6:if(n.tag===6&&Ml(n),r=U,i=Cu,U=null,wu(e,t,n),U=r,Cu=i,U!==null){if(Cu)try{(U.nodeType===9?U.body:U.nodeName===`HTML`?U.ownerDocument.body:U).removeChild(n.stateNode),M=!0}catch(e){Z(n,t,e)}else try{U.removeChild(n.stateNode),M=!0}catch(e){Z(n,t,e)}}break;case 18:U!==null&&(Cu?(e=U,Cp(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Hh(e)):Cp(U,n.stateNode));break;case 4:r=U,i=Cu,U=n.stateNode.containerInfo,Cu=!0,wu(e,t,n),U=r,Cu=i;break;case 0:case 11:case 14:case 15:Tl(2,n,t),H||Tl(4,n,t),wu(e,t,n);break;case 1:H||(kl(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Dl(n,t,r)),wu(e,t,n);break;case 21:wu(e,t,n);break;case 22:H=(r=H)||n.memoizedState!==null,wu(e,t,n),H=r;break;case 30:kl(n,t),wu(e,t,n);break;case 7:H||kl(n,t),wu(e,t,n);break;default:wu(e,t,n)}}function Eu(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Hh(e)}catch(e){Z(t,t.return,e)}}}function Du(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Hh(e)}catch(e){Z(t,t.return,e)}}function Ou(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new uu),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new uu),t;default:throw Error(i(435,e.tag))}}function ku(e,t){var n=Ou(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=vf.bind(null,e,t);t.then(r,r)}})}function Au(e,t,n){var r=t.deletions;if(r!==null)for(var a=0;a<r.length;a++){var o=r[a],s=e,c=t,l=c;a:for(;l!==null;){switch(l.tag){case 27:if(Sp(l.type)){U=l.stateNode,Cu=!1;break a}break;case 5:U=l.stateNode,Cu=!1;break a;case 3:case 4:U=l.stateNode.containerInfo,Cu=!0;break a}l=l.return}if(U===null)throw Error(i(160));Tu(s,c,o),U=null,Cu=!1,s=o.alternate,s!==null&&(s.return=null),o.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Mu(t,e,n),t=t.sibling}var ju=null;function Mu(e,t,n){var r=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(a&4&&(r=e.updateQueue,r=r===null?null:r.events,r!==null))for(var o=0;o<r.length;o++){var s=r[o];s.ref.impl=s.nextImpl}Au(t,e,n),Nu(e),a&4&&(Tl(3,e,e.return),wl(3,e),Tl(5,e,e.return));break;case 1:Au(t,e,n),Nu(e),a&512&&(H||r===null||kl(r,r.return)),a&64&&su&&(e=e.updateQueue,e!==null&&(t=e.callbacks,t!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?t:n.concat(t))));break;case 26:if(o=ju,Au(t,e,n),Nu(e),a&512&&(H||r===null||kl(r,r.return)),a&4){if(a=r===null?null:r.memoizedState,n=e.memoizedState,r===null){if(n===null){if(e.stateNode===null){if(su)e.stateNode=fp(e.type,e.memoizedProps,t.containerInfo,e);else{a:{t=e.type,n=e.memoizedProps,a=o.ownerDocument||o;b:switch(t){case`title`:r=a.getElementsByTagName(`title`)[0],(!r||r[It]||r[kt]||r.namespaceURI===`http://www.w3.org/2000/svg`||r.hasAttribute(`itemprop`))&&(r=a.createElement(t),a.head.insertBefore(r,a.querySelector(`head > title`))),np(r,t,n),r[kt]=e,Ut(r),t=r;break a;case`link`:if(o=Gm(`link`,`href`,a).get(t+(n.href||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&r.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&r.getAttribute(`title`)===(n.title==null?null:n.title)&&r.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){o.splice(s,1);break b}}r=a.createElement(t),np(r,t,n),a.head.appendChild(r);break;case`meta`:if(o=Gm(`meta`,`content`,a).get(t+(n.content||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`content`)===(n.content==null?null:``+n.content)&&r.getAttribute(`name`)===(n.name==null?null:n.name)&&r.getAttribute(`property`)===(n.property==null?null:n.property)&&r.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&r.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){o.splice(s,1);break b}}r=a.createElement(t),np(r,t,n),a.head.appendChild(r);break;default:throw Error(i(468,t))}r[kt]=e,Ut(r),t=r}e.stateNode=t}}else su||Km(o,e.type,e.stateNode)}else e.stateNode=Bm(o,n,e.memoizedProps)}else a===n?n===null&&e.stateNode!==null&&Il(e,e.memoizedProps,r.memoizedProps):(a===null?(t=r.stateNode,t===null||H||t.parentNode.removeChild(t)):a.count--,n===null?su||Km(o,e.type,e.stateNode):Bm(o,n,e.memoizedProps))}break;case 27:Au(t,e,n),Nu(e),a&512&&(H||r===null||kl(r,r.return)),r!==null&&a&4&&Il(e,e.memoizedProps,r.memoizedProps);break;case 5:if(o=cu,cu=!1,Au(t,e,n),cu=o,Nu(e),a&512&&(H||r===null||kl(r,r.return)),e.flags&32){t=e.stateNode;try{_n(t,``),M=!0}catch(t){Z(e,e.return,t)}}a&4&&e.stateNode!=null&&(t=e.memoizedProps,Il(e,t,r===null?t:r.memoizedProps)),a&1024&&(lu=!0);break;case 6:if(Au(t,e,n),Nu(e),a&4){if(e.stateNode===null)throw Error(i(162));t=e.memoizedProps,n=e.stateNode;try{n.nodeValue=t,M=!0}catch(t){Z(e,e.return,t)}}break;case 3:if(M=!1,Wm=null,o=ju,ju=bm(t.containerInfo),Au(t,e,n),ju=o,Nu(e),a&4&&r!==null&&r.memoizedState.isDehydrated)try{Hh(t.containerInfo)}catch(t){Z(e,e.return,t)}lu&&(lu=!1,Pu(e)),M=!1;break;case 4:a=cu,cu=su,r=$t(),o=ju,ju=bm(e.stateNode.containerInfo),Au(t,e,n),Nu(e),ju=o,M&&pu&&(mu=!0),M=r,cu=a;break;case 12:Au(t,e,n),Nu(e);break;case 31:Au(t,e,n),Nu(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,ku(e,t)));break;case 13:Au(t,e,n),Nu(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(hd=qe()),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,ku(e,t)));break;case 22:o=e.memoizedState!==null,s=r!==null&&r.memoizedState!==null;var c=su,l=H,u=cu;su=c||o,cu=u||o,H=l||s,Au(t,e,n),H=l,cu=u,su=c,Nu(e),a&8192&&(t=e.stateNode,t._visibility=o?t._visibility&-2:t._visibility|1,!o||r===null||s||su||H||(t=s||H,n=su,r=H,su=o||su,H=t,Ru(e,2),su=n,H=r),!o&&cu||yu(e,o)),a&4&&(t=e.updateQueue,t!==null&&(n=t.retryQueue,n!==null&&(t.retryQueue=null,ku(e,n))));break;case 19:Au(t,e,n),Nu(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,ku(e,t)));break;case 30:a&512&&(H||r===null||kl(r,r.return)),a=$t(),o=pu,s=(n&335544064)===n,c=e.memoizedProps,pu=s&&Si(c.default,c.update)!==`none`,Au(t,e,n),Nu(e),s&&r!==null&&M&&(e.flags|=4),pu=o,M=a;break;case 21:break;case 7:a&512&&(H||r===null||kl(r,r.return)),r&&r.stateNode!==null&&(r.stateNode._fragmentFiber=e);default:Au(t,e,n),Nu(e)}}function Nu(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Ll(r)){n=r;break}r=r.return}r=null;for(var a=e.return;a!==null;){if(Pl(a)){var o=a.stateNode;r===null?r=[o]:r.push(o)}if(Nl(a))break;a=a.return}var s=r;if(n==null)throw Error(i(160));switch(n.tag){case 27:var c=n.stateNode;Bl(e,Rl(e),c,s);break;case 5:var l=n.stateNode;n.flags&32&&(_n(l,``),n.flags&=-33),Bl(e,Rl(e),l,s);break;case 3:case 4:var u=n.stateNode.containerInfo;zl(e,Rl(e),u,s);break;default:throw Error(i(161))}}catch(t){Z(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Pu(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Pu(t),t.tag===5&&t.flags&1024&&(t=t.stateNode,gh=!0,t.reset(),gh=!1),e=e.sibling}}function Fu(e,t){if(t.subtreeFlags&9270)for(t=t.child;t!==null;)Iu(t,e),t=t.sibling;else ou(t,!1)}function Iu(e,t){var n=e.alternate;if(n===null)Ql(e,!1);else switch(e.tag){case 3:if(hu=fu=!1,Kl(),Fu(t,e),!fu&&!mu){if(e=Gl,e!==null)for(var r=0;r<e.length;r+=3){n=e[r];var i=e[r+1];Ep(n,e[r+2]),n=n.ownerDocument.documentElement,n!==null&&n.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(`+i+`)`})}e=t.containerInfo,e=e.nodeType===9?e.documentElement:e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===``&&(e.style.viewTransitionName=`none`,e.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(root)`}),e.animate({width:[0,0],height:[0,0]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition`})),hu=!0}Gl=null;break;case 5:Fu(t,e);break;case 4:r=fu,fu=!1,Fu(t,e),fu&&(mu=!0),fu=r;break;case 22:e.memoizedState===null&&(n.memoizedState===null?Fu(t,e):Ql(e,!1));break;case 30:r=fu,i=Kl(),fu=!1,Fu(t,e),fu&&(e.flags|=4);var a=e.memoizedProps,o=e.stateNode;t=bi(a,o),o=bi(n.memoizedProps,o);var s=Si(a.default,a.update);s===`none`?t=!1:(a=n.memoizedState,n.memoizedState=null,n=e.child,ql=0,t=au(e,n,t,o,s,a,!0),ql!==(a===null?0:a.length)&&(e.flags|=32)),e.flags&4&&t?(Nd(e,e.memoizedProps.onUpdate),Gl=i):i!==null&&(i.push.apply(i,Gl),Gl=i),fu=e.flags&32?!0:r;break;default:Fu(t,e)}}function Lu(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)vu(e,t.alternate,t),t=t.sibling}function Ru(e,t){for(e=e.child;e!==null;){var n=e,r=t;switch(n.tag){case 0:case 11:case 14:case 15:Tl(4,n,n.return),Ru(n,r);break;case 1:kl(n,n.return);var i=n.stateNode;typeof i.componentWillUnmount==`function`&&Dl(n,n.return,i),Ru(n,r);break;case 27:r&2&&gm(n.stateNode,n.type,n.memoizedProps);case 5:kl(n,n.return),n.tag!==5&&n.tag!==27||Ml(n),Ru(n,r);break;case 6:Ml(n);break;case 26:kl(n,n.return),i=n.stateNode,n.memoizedState!==null||i===null||H||i.parentNode.removeChild(i),Ru(n,r);break;case 22:n.memoizedState===null&&Ru(n,r);break;case 30:kl(n,n.return),Ru(n,r);break;case 7:kl(n,n.return);default:Ru(n,r)}e=e.sibling}}function zu(e,t,n){for(n=t.subtreeFlags&8772?n:n&-2,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags,s=!!(n&1);switch(a.tag){case 0:case 11:case 15:zu(i,a,n),wl(4,a);break;case 1:if(zu(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Z(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var c=r.stateNode;try{var l=i.shared.hiddenCallbacks;if(l!==null)for(i.shared.hiddenCallbacks=null,i=0;i<l.length;i++)Eo(l[i],c)}catch(e){Z(r,r.return,e)}}s&&o&64&&El(a),Ol(a,a.return);break;case 27:n&2&&Vl(a);case 5:a.tag!==5&&a.tag!==27||jl(a),zu(i,a,n),s&&r===null&&o&4&&Fl(a),Ol(a,a.return);break;case 6:jl(a);break;case 26:c=a.stateNode,a.memoizedState!==null||c===null||su||Km(bm(c.ownerDocument),a.type,c),zu(i,a,n),s&&r===null&&o&4&&Fl(a),Ol(a,a.return);break;case 12:zu(i,a,n);break;case 31:zu(i,a,n),s&&o&4&&Eu(i,a);break;case 13:zu(i,a,n),s&&o&4&&Du(i,a);break;case 22:a.memoizedState===null&&zu(i,a,n),Ol(a,a.return);break;case 30:zu(i,a,n),Ol(a,a.return);break;case 7:Ol(a,a.return);default:zu(i,a,n)}t=t.sibling}}function Bu(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&Fa(n))}function Vu(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Fa(e))}function Hu(e,t,n,r){var i=(n&335544064)===n;if(t.subtreeFlags&(i?10262:10256))for(t=t.child;t!==null;)Uu(e,t,n,r),t=t.sibling;else i&&iu(t)}function Uu(e,t,n,r){var i=(n&335544064)===n;i&&t.alternate===null&&t.return!==null&&t.return.alternate!==null&&ru(t);var a=t.flags;switch(t.tag){case 0:case 11:case 15:Hu(e,t,n,r),a&2048&&wl(9,t);break;case 1:Hu(e,t,n,r);break;case 3:Hu(e,t,n,r),i&&hu&&(e=e.containerInfo,e=e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,e.style.viewTransitionName===`root`&&(e.style.viewTransitionName=``),e=e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===`none`&&(e.style.viewTransitionName=``)),a&2048&&(a=null,t.alternate!==null&&(a=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==a&&(t.refCount++,a!=null&&Fa(a)));break;case 12:if(a&2048){Hu(e,t,n,r),a=t.stateNode;try{var o=t.memoizedProps,s=o.id,c=o.onPostCommit;typeof c==`function`&&c(s,t.alternate===null?`mount`:`update`,a.passiveEffectDuration,-0)}catch(e){Z(t,t.return,e)}}else Hu(e,t,n,r);break;case 31:Hu(e,t,n,r);break;case 13:Hu(e,t,n,r);break;case 23:break;case 22:o=t.stateNode,s=t.alternate,t.memoizedState===null?(i&&s!==null&&s.memoizedState!==null&&ru(t),o._visibility&2?Hu(e,t,n,r):(o._visibility|=2,Wu(e,t,n,r,!!(t.subtreeFlags&10256)||!1))):(i&&s!==null&&s.memoizedState===null&&ru(s),o._visibility&2?Hu(e,t,n,r):Gu(e,t)),a&2048&&Bu(s,t);break;case 24:Hu(e,t,n,r),a&2048&&Vu(t.alternate,t);break;case 30:i&&(a=t.alternate,a!==null&&(Xl(a.child,!0),Xl(t.child,!0))),Hu(e,t,n,r);break;default:Hu(e,t,n,r)}}function Wu(e,t,n,r,i){for(i&&=!!(t.subtreeFlags&10256)||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Wu(a,o,s,c,i),wl(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Wu(a,o,s,c,i)):u._visibility&2?Wu(a,o,s,c,i):Gu(a,o),i&&l&2048&&Bu(o.alternate,o);break;case 24:Wu(a,o,s,c,i),i&&l&2048&&Vu(o.alternate,o);break;default:Wu(a,o,s,c,i)}t=t.sibling}}function Gu(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Gu(n,r),i&2048&&Bu(r.alternate,r);break;case 24:Gu(n,r),i&2048&&Vu(r.alternate,r);break;default:Gu(n,r)}t=t.sibling}}var Ku=8192;function qu(e,t,n){if(e.subtreeFlags&Ku)for(e=e.child;e!==null;)Ju(e,t,n),e=e.sibling}function Ju(e,t,n){switch(e.tag){case 26:qu(e,t,n),e.flags&Ku&&(e.memoizedState===null?(e=e.stateNode,(t&335544128)===t&&Zm(n,e)):Qm(n,ju,e.memoizedState,e.memoizedProps));break;case 5:qu(e,t,n),e.flags&Ku&&(e=e.stateNode,(t&335544128)===t&&Zm(n,e));break;case 3:case 4:var r=ju;ju=bm(e.stateNode.containerInfo),qu(e,t,n),ju=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=Ku,Ku=16777216,qu(e,t,n),Ku=r):qu(e,t,n));break;case 30:if((e.flags&Ku)!==0&&(r=e.memoizedProps.name,r!=null&&r!==`auto`)){var i=e.stateNode;i.paired=null,Ul===null&&(Ul=new Map),Ul.set(r,i)}qu(e,t,n);break;default:qu(e,t,n)}}function Yu(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Xu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];du=r,$u(r,e)}Yu(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Zu(e),e=e.sibling}function Zu(e){switch(e.tag){case 0:case 11:case 15:Xu(e),e.flags&2048&&Tl(9,e,e.return);break;case 3:Xu(e);break;case 12:Xu(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Qu(e)):Xu(e);break;default:Xu(e)}}function Qu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];du=r,$u(r,e)}Yu(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Tl(8,t,t.return),Qu(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Qu(t));break;default:Qu(t)}e=e.sibling}}function $u(e,t){for(;du!==null;){var n=du;switch(n.tag){case 0:case 11:case 15:Tl(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:Fa(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,du=r;else a:for(n=e;du!==null;){r=du;var i=r.sibling,a=r.return;if(Su(r),r===n){du=null;break a}if(i!==null){i.return=a,du=i;break a}du=a}}}var ed={getCacheForType:function(e){var t=Da(Na),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Da(Na).controller.signal}},td=typeof WeakMap==`function`?WeakMap:Map,W=0,G=null,K=null,q=0,J=0,nd=null,rd=!1,id=!1,ad=!1,od=0,Y=0,sd=0,cd=0,ld=0,ud=0,dd=0,fd=null,pd=null,md=!1,hd=0,gd=0,_d=1/0,vd=null,yd=null,X=0,bd=null,xd=null,Sd=0,Cd=0,wd=null,Td=null,Ed=null,Dd=null,Od=null,kd=0,Ad=null;function jd(){return W&2&&q!==0?q&-q:k.T===null?Et():Pf()}function Md(){if(ud===0){if(!(q&536870912)||R){var e=ut;ut<<=1,!(ut&3932160)&&(ut=262144),ud=e}else ud=536870912}return e=No.current,e!==null&&(e.flags|=32),ud}function Nd(e,t){if(t!=null){var n=e.stateNode,r=n.ref;r===null&&(r=n.ref=Pp(bi(e.memoizedProps,n))),Dd===null&&(Dd=[]),Dd.push(t.bind(null,r))}}function Pd(e,t,n){(e===G&&(J===2||J===9)||e.cancelPendingCommit!==null)&&(Vd(e,0),Rd(e,q,ud,!1)),yt(e,n),(!(W&2)||e!==G)&&(e===G&&(!(W&2)&&(cd|=n),Y===4&&Rd(e,q,ud,!1)),Ef(e))}function Fd(e,t,n){if(W&6)throw Error(i(327));var r=!n&&!(t&127)&&(t&e.expiredLanes)===0||mt(e,t),a=r?Yd(e,t):qd(e,t,!0),o=r;do{if(a===0){id&&!r&&Rd(e,t,0,!1);break}if(n=e.current.alternate,o&&!Ld(n)){a=qd(e,t,!1),o=!1;continue}if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=fd;var l=c.current.memoizedState.isDehydrated;if(l&&(Vd(c,s).flags|=256),s=qd(c,s,!1),s!==2&&s!==6){if(ad&&!l){c.errorRecoveryDisabledLanes|=o,cd|=o,a=4;break a}o=pd,pd=a,o!==null&&(pd===null?pd=o:pd.push.apply(pd,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){Vd(e,0),Rd(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t&&(t&62914560)!==t)break;case 6:Rd(r,t,ud,!rd);break a;case 2:pd=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=hd+300-qe(),10<a)){if(Rd(r,t,ud,!rd),pt(r,0,!0)!==0)break a;Sd=t,r.timeoutHandle=gp(Id.bind(null,r,n,pd,vd,md,t,ud,cd,dd,rd,o,`Throttled`,-0,0),a);break a}Id(r,n,pd,vd,md,t,ud,cd,dd,rd,o,null,-0,0)}break}while(1);Ef(e)}function Id(e,t,n,r,i,a,o,s,c,l,u,d,f,p){e.timeoutHandle=-1;var m=t.subtreeFlags,h=(a&335544064)===a;if(d=null,(h||m&8192||(m&16785408)==16785408)&&(d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Tn},Ul=null,Ju(t,a,d),h&&(m=d,h=e.containerInfo,h=(h.nodeType===9?h:h.ownerDocument).__reactViewTransition,h!=null&&(m.count++,m.waitingForViewTransition=!0,m=nh.bind(m),h.finished.then(m,m))),m=(a&62914560)===a?hd-qe():(a&4194048)===a?gd-qe():0,m=eh(d,m),m!==null)){Sd=a,e.cancelPendingCommit=m(nf.bind(null,e,t,a,n,r,i,o,s,c,l,u,d,null,f,p)),Rd(e,a,o,!l);return}nf(e,t,a,n,r,i,o,s,c,l,u,d)}function Ld(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Wr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Rd(e,t,n,r){t=ht(e,t),t&=~ld,t&=~cd,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-at(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&xt(e,n,t)}function zd(){return W&6?!0:(Df(0,!1),!1)}function Bd(){if(K!==null){if(J===0)var e=K.return;else e=K,ya=va=null,ss(e),so=null,co=0,e=K;for(;e!==null;)Cl(e.alternate,e),e=e.return;K=null}}function Vd(e,t){var n=e.timeoutHandle;return n!==-1&&(e.timeoutHandle=-1,_p(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),Sd=0,Bd(),G=e,K=n=Li(e.current,null),q=t,J=0,nd=null,rd=!1,id=mt(e,t),ad=!1,dd=ud=ld=cd=sd=Y=0,pd=fd=null,md=!1,od=ht(e,t),Di(),n}function Hd(e,t){z=null,k.H=_c,t===Za||t===$a?(t=ao(),J=3):t===Qa?(t=ao(),J=4):J=t===Fc?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,nd=t,K===null&&(Y=1,kc(e,Gi(t,e.current)))}function Ud(){var e=No.current;return e===null?!0:(q&4194048)===q?Po===null:(q&62914560)===q||q&536870912?e===Po:!1}function Wd(){var e=k.H;return k.H=_c,e===null?_c:e}function Gd(){var e=k.A;return k.A=ed,e}function Kd(){Y=4,rd||(q&4194048)!==q&&No.current!==null||(id=!0),!(sd&134217727)&&!(cd&134217727)||G===null||Rd(G,q,ud,!1)}function qd(e,t,n){var r=W;W|=2;var i=Wd(),a=Gd();(G!==e||q!==t)&&(vd=null,Vd(e,t)),t=!1;var o=Y;a:do try{if(J!==0&&K!==null){var s=K,c=nd;switch(J){case 8:Bd(),o=6;break a;case 3:case 2:case 9:case 6:No.current===null&&(t=!0);var l=J;if(J=0,nd=null,$d(e,s,c,l),n&&id){o=0;break a}break;default:l=J,J=0,nd=null,$d(e,s,c,l)}}Jd(),o=Y;break}catch(t){Hd(e,t)}while(1);return t&&e.shellSuspendCounter++,ya=va=null,W=r,k.H=i,k.A=a,K===null&&(G=null,q=0,Di()),o}function Jd(){for(;K!==null;)Zd(K)}function Yd(e,t){var n=W;W|=2;var r=Wd(),a=Gd();G!==e||q!==t?(vd=null,_d=qe()+500,Vd(e,t)):id=mt(e,t);a:do try{if(J!==0&&K!==null){t=K;var o=nd;b:switch(J){case 1:J=0,nd=null,$d(e,t,o,1);break;case 2:case 9:if(to(o)){J=0,nd=null,Qd(t);break}t=function(){J!==2&&J!==9||G!==e||(J=7),Ef(e)},o.then(t,t);break a;case 3:J=7;break a;case 4:J=5;break a;case 7:to(o)?(J=0,nd=null,Qd(t)):(J=0,nd=null,$d(e,t,o,7));break;case 5:var s=null;switch(K.tag){case 26:s=K.memoizedState;case 5:case 27:var c=K;if(s?Ym(s):c.stateNode.complete){J=0,nd=null;var l=c.sibling;if(l!==null)K=l;else{var u=c.return;u===null?K=null:(K=u,ef(u))}break b}}J=0,nd=null,$d(e,t,o,5);break;case 6:J=0,nd=null,$d(e,t,o,6);break;case 8:Bd(),Y=6;break a;default:throw Error(i(462))}}Xd();break}catch(t){Hd(e,t)}while(1);return ya=va=null,k.H=r,k.A=a,W=n,K===null?(G=null,q=0,Di(),Y):0}function Xd(){for(;K!==null&&!Ge();)Zd(K)}function Zd(e){var t=hl(e.alternate,e,od);e.memoizedProps=e.pendingProps,t===null?ef(e):K=t}function Qd(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Yc(n,t,t.pendingProps,t.type,void 0,q);break;case 11:t=Yc(n,t,t.pendingProps,t.type.render,t.ref,q);break;case 5:ss(t);var r=t;r===oa&&(R?(fa(r),r.tag===5&&r.stateNode!=null&&(L=r.stateNode)):(fa(r),R=!0));default:Cl(n,t),t=K=Ri(t,od),t=hl(n,t,od)}e.memoizedProps=e.pendingProps,t===null?ef(e):K=t}function $d(e,t,n,r){ya=va=null,ss(t),so=null,co=0;var i=t.return;try{if(Pc(e,i,t,n,q)){Y=1,kc(e,Gi(n,e.current)),K=null;return}}catch(t){if(i!==null)throw K=i,t;Y=1,kc(e,Gi(n,e.current)),K=null;return}t.flags&32768?(R||r===1?e=!0:id||q&536870912?e=!1:(rd=e=!0,(r===2||r===9||r===3||r===6)&&(r=No.current,r!==null&&r.tag===13&&(r.flags|=16384))),tf(t,e)):ef(t)}function ef(e){var t=e;do{if(t.flags&32768){tf(t,rd);return}e=t.return;var n=xl(t.alternate,t,od);if(n!==null){K=n;return}if(t=t.sibling,t!==null){K=t;return}K=t=e}while(t!==null);Y===0&&(Y=5)}function tf(e,t){do{var n=Sl(e.alternate,e);if(n!==null){n.flags&=32767,K=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){K=e;return}K=e=n}while(e!==null);Y=6,K=null}function nf(e,t,n,r,a,o,s,c,l,u,d,f){e.cancelPendingCommit=null;do df();while(X!==0);if(W&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));e===G&&(K=G=null,q=0),xd=t,bd=e,Sd=n,wd=a,Td=r,rf(e,t,n,s,c,l,f)}}function rf(e,t,n,r,i,a,o){var s=t.lanes|t.childLanes;if(Cd=s,s|=Ei,bt(e,n,s,r,i,a),Dd=null,(n&335544064)===n?(Od=Ra(e),r=10262):(Od=null,r=10256),(t.subtreeFlags&r)!==0||(t.flags&r)!==0?(e.callbackNode=null,e.callbackPriority=0,yf(Ze,function(){return ff(),null})):(e.callbackNode=null,e.callbackPriority=0),Hl=!1,r=!!(t.flags&13878),t.subtreeFlags&13878||r){r=k.T,k.T=null,i=A.p,A.p=2,a=W,W|=4;try{gu(e,t,n)}finally{W=a,A.p=i,k.T=r}}X=1,Hl?Ed=Mp(o,e.containerInfo,Od,sf,cf,of,lf,ff,af,null,null):(sf(),cf(),lf())}function af(e){if(X!==0){var t=bd.onRecoverableError;t(e,{componentStack:null})}}function of(){X===3&&(X=0,Iu(xd,bd),X=4)}function sf(){if(X===1){X=0;var e=bd,t=xd,n=Sd,r=!!(t.flags&13878);if(t.subtreeFlags&13878||r){r=k.T,k.T=null;var i=A.p;A.p=2;var a=W;W|=4;try{pu=mu=!1,Mu(t,e,n),n=cp;var o=Xr(e.containerInfo),s=n.focusedElem,c=n.selectionRange;if(o!==s&&s&&s.ownerDocument&&Yr(s.ownerDocument.documentElement,s)){if(c!==null&&Zr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Jr(s,h),v=Jr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}gh=!!sp,cp=sp=null}finally{W=a,A.p=i,k.T=r}}e.current=t,X=2}}function cf(){if(X===2){X=0;var e=bd,t=xd,n=!!(t.flags&8772);if(t.subtreeFlags&8772||n){n=k.T,k.T=null;var r=A.p;A.p=2;var i=W;W|=4;try{vu(e,t.alternate,t)}finally{W=i,A.p=r,k.T=n}}X=3}}function lf(){if(X===4||X===3){X=0;var e=Ed;Ed=null,Ke();var t=bd,n=xd,r=Sd,i=Td,a=(r&335544064)===r?10262:10256;if((n.subtreeFlags&a)!==0||(n.flags&a)!==0?X=5:(X=0,xd=bd=null,uf(t,t.pendingLanes)),a=t.pendingLanes,a===0&&(yd=null),Tt(r),n=n.stateNode,rt&&typeof rt.onCommitFiberRoot==`function`)try{rt.onCommitFiberRoot(nt,n,void 0,(n.current.flags&128)==128)}catch{}if(i!==null){n=k.T,a=A.p,A.p=2,k.T=null;try{for(var o=t.onRecoverableError,s=0;s<i.length;s++){var c=i[s];o(c.value,{componentStack:c.stack})}}finally{k.T=n,A.p=a}}if(i=Dd,o=Od,Od=null,i!==null&&(Dd=null,o===null&&(o=[]),e!==null))for(c=0;c<i.length;c++)n=(0,i[c])(o),n!==void 0&&e.finished.finally(n);Sd&3&&df(),Ef(t),a=t.pendingLanes,r&261930&&a&42?t===Ad?kd++:(kd=0,Ad=t):(kd=0,Ad=null),Df(0,!1)}}function uf(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Fa(t)))}function df(){return Ed!==null&&(Ed.skipTransition(),Ed=null),sf(),cf(),lf(),ff()}function ff(){if(X!==5)return!1;var e=bd,t=Cd;Cd=0;var n=Tt(Sd),r=k.T,a=A.p;try{A.p=32>n?32:n,k.T=null,n=wd,wd=null;var o=bd,s=Sd;if(X=0,xd=bd=null,Sd=0,W&6)throw Error(i(331));var c=W;if(W|=4,Zu(o.current),Uu(o,o.current,s,n),W=c,Df(0,!1),rt&&typeof rt.onPostCommitFiberRoot==`function`)try{rt.onPostCommitFiberRoot(nt,o)}catch{}return!0}finally{A.p=a,k.T=r,uf(e,t)}}function pf(e,t,n){t=Gi(n,t),t=jc(e.stateNode,t,2),e=bo(e,t,2),e!==null&&(yt(e,2),Ef(e))}function Z(e,t,n){if(e.tag===3)pf(e,e,n);else for(;t!==null;){if(t.tag===3){pf(t,e,n);break}if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(yd===null||!yd.has(r))){e=Gi(n,e),n=Mc(2),r=bo(t,n,2),r!==null&&(Nc(n,r,t,e),yt(r,2),Ef(r));break}}t=t.return}}function mf(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new td;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(ad=!0,i.add(n),e=hf.bind(null,e,t,n),t.then(e,e))}function hf(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,G===e&&(q&n)===n&&(Y===4||Y===3&&(q&62914560)===q&&300>qe()-hd?W&2?ld|=n:Vd(e,0):ld|=n,dd===q&&(dd=0)),Ef(e)}function gf(e,t){t===0&&(t=_t()),e=Ai(e,t),e!==null&&(yt(e,t),Ef(e))}function _f(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),gf(e,n)}function vf(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),gf(e,n)}function yf(e,t){return Ue(e,t)}var bf=null,xf=null,Sf=!1,Cf=!1,wf=!1,Tf=0;function Ef(e){e!==xf&&e.next===null&&(xf===null?bf=xf=e:xf=xf.next=e),Cf=!0,Sf||(Sf=!0,Nf())}function Df(e,t){if(!wf&&Cf){wf=!0;do for(var n=!1,r=bf;r!==null;){if(!t){if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-at(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,Mf(r,a))}else a=q,a=pt(r,r===G?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||mt(r,a)||(n=!0,Mf(r,a))}r=r.next}while(n);wf=!1}}function Of(){kf()}function kf(){Cf=Sf=!1;var e=0;Tf!==0&&hp()&&(e=Tf);for(var t=qe(),n=null,r=bf;r!==null;){var i=r.next,a=Af(r,t);a===0?(r.next=null,n===null?bf=i:n.next=i,i===null&&(xf=n)):(n=r,(e!==0||a&3)&&(Cf=!0)),r=i}X!==0&&X!==5||Df(e,!1),Tf!==0&&(Tf=0)}function Af(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-at(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=gt(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=G,n=q,n=pt(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(J===2||J===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&We(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||mt(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&We(r),Tt(n)){case 2:case 8:n=Xe;break;case 32:n=Ze;break;case 268435456:n=$e;break;default:n=Ze}return r=jf.bind(null,e),n=Ue(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&We(r),e.callbackPriority=2,e.callbackNode=null,2}function jf(e,t){if(X!==0&&X!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(df()&&e.callbackNode!==n)return null;var r=q;return r=pt(e,e===G?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(Fd(e,r,t),Af(e,qe()),e.callbackNode!=null&&e.callbackNode===n?jf.bind(null,e):null)}function Mf(e,t){if(df())return null;Fd(e,t,!0)}function Nf(){bp(function(){W&6?Ue(Ye,Of):kf()})}function Pf(){if(Tf===0){var e=Va;e===0&&(e=lt,lt<<=1,!(lt&261888)&&(lt=256)),Tf=e}return Tf}function Ff(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:wn(e)}function If(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=Ff((i[At]||null).action),o=r.submitter;o&&(t=(t=o[At]||null)?Ff(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new Gn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(Tf!==0){var e=new FormData(i,o);rc(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=new FormData(i,o),rc(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var Lf=0;Lf<_i.length;Lf++){var Rf=_i[Lf];vi(Rf.toLowerCase(),`on`+(Rf[0].toUpperCase()+Rf.slice(1)))}vi(li,`onAnimationEnd`),vi(ui,`onAnimationIteration`),vi(di,`onAnimationStart`),vi(`dblclick`,`onDoubleClick`),vi(`focusin`,`onFocus`),vi(`focusout`,`onBlur`),vi(fi,`onTransitionRun`),vi(pi,`onTransitionStart`),vi(mi,`onTransitionCancel`),vi(hi,`onTransitionEnd`),Jt(`onMouseEnter`,[`mouseout`,`mouseover`]),Jt(`onMouseLeave`,[`mouseout`,`mouseover`]),Jt(`onPointerEnter`,[`pointerout`,`pointerover`]),Jt(`onPointerLeave`,[`pointerout`,`pointerover`]),qt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),qt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),qt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),qt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),qt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),qt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var zf=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),Bf=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(zf));function Vf(e,t){t=!!(t&4);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Ci(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Ci(e)}i.currentTarget=null,a=c}}}}function Q(e,t){var n=t[Mt];n===void 0&&(n=t[Mt]=new Set);var r=e+`__bubble`;n.has(r)||(Gf(t,e,2,!1),n.add(r))}function Hf(e,t,n){var r=0;t&&(r|=4),Gf(n,e,r,t)}var Uf=`_reactListening`+Math.random().toString(36).slice(2);function Wf(e){if(!e[Uf]){e[Uf]=!0,Gt.forEach(function(t){t!==`selectionchange`&&(Bf.has(t)||Hf(t,!1,e),Hf(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Uf]||(t[Uf]=!0,Hf(`selectionchange`,!1,t))}}function Gf(e,t,n,r){switch(Ch(t)){case 2:var i=_h;break;case 8:i=vh;break;default:i=yh}n=i.bind(null,t,n,e),i=void 0,!Fn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function Kf(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=zt(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}Mn(function(){var r=a,i=Dn(n),s=[];a:{var c=gi.get(e);if(c!==void 0){var l=Gn,u=e;switch(e){case`keypress`:if(Vn(n)===0)break a;case`keydown`:case`keyup`:l=lr;break;case`focusin`:u=`focus`,l=er;break;case`focusout`:u=`blur`,l=er;break;case`beforeblur`:case`afterblur`:l=er;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=Qn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=$n;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=dr;break;case li:case ui:case di:l=tr;break;case hi:l=fr;break;case`scroll`:case`scrollend`:l=qn;break;case`wheel`:l=pr;break;case`copy`:case`cut`:case`paste`:l=nr;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=P;break;case`submit`:l=ur;break;case`toggle`:case`beforetoggle`:l=mr}var d=!!(t&4),f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=Nn(m,p),g!=null&&d.push(qf(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(l=e===`mouseover`||e===`pointerover`,c=e===`mouseout`||e===`pointerout`,l&&n!==En&&(u=n.relatedTarget||n.fromElement)&&(zt(u)||u[jt]))break a;(c||l)&&(u=i.window===i?i:(l=i.ownerDocument)?l.defaultView||l.parentWindow:window,c?(l=n.relatedTarget||n.toElement,c=r,l=l?zt(l):null,l!==null&&(f=o(l),d=l.tag,l!==f||d!==5&&d!==27&&d!==6)&&(l=null)):(c=null,l=r),c!==l&&(d=Qn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=P,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=c==null?u:Vt(c),h=l==null?u:Vt(l),u=new d(g,m+`leave`,c,n,i),u.target=f,u.relatedTarget=h,g=null,zt(i)===r&&(d=new d(p,m+`enter`,l,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,d=c&&l?te(c,l,Yf):null,c!==null&&Xf(s,u,c,d,!1),l!==null&&f!==null&&Xf(s,f,l,d,!0)))}a:{if(c=r?Vt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var _=Pr;else if(Or(c)){if(F)_=Hr;else{_=Br;var v=zr}}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&xn(r.elementType)&&(_=Pr):_=Vr;if(_&&=_(e,r)){kr(s,_,n,i);break a}v&&v(e,c,r)}switch(v=r?Vt(r):window,e){case`focusin`:(Or(v)||v.contentEditable===`true`)&&($r=v,ei=r,ti=null);break;case`focusout`:ti=ei=$r=null;break;case`mousedown`:ni=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:ni=!1,ri(s,n,i);break;case`selectionchange`:if(Qr)break;case`keydown`:case`keyup`:ri(s,n,i)}var y;if(gr)b:{switch(e){case`compositionstart`:var b=`onCompositionStart`;break b;case`compositionend`:b=`onCompositionEnd`;break b;case`compositionupdate`:b=`onCompositionUpdate`;break b}b=void 0}else wr?Sr(e,n)&&(b=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(b=`onCompositionStart`);b&&(yr&&n.locale!==`ko`&&(wr||b!==`onCompositionStart`?b===`onCompositionEnd`&&wr&&(y=Bn()):(Ln=i,Rn=`value`in Ln?Ln.value:Ln.textContent,wr=!0)),v=Jf(r,b),0<v.length&&(b=new rr(b,e,null,n,i),s.push({event:b,listeners:v}),y?b.data=y:(y=Cr(n),y!==null&&(b.data=y)))),(y=vr?Tr(e,n):Er(e,n))&&(b=Jf(r,`onBeforeInput`),0<b.length&&(v=new rr(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:v,listeners:b}),v.data=y)),If(s,e,r,n,i)}Vf(s,t)})}function qf(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Jf(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=Nn(e,n),i!=null&&r.unshift(qf(e,i,a)),i=Nn(e,t),i!=null&&r.push(qf(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Yf(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Xf(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=Nn(n,a),l!=null&&o.unshift(qf(n,l,c))):i||(l=Nn(n,a),l!=null&&o.push(qf(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Zf=/\r\n?/g,Qf=/\u0000|\uFFFD/g;function $f(e){return(typeof e==`string`?e:``+e).replace(Zf,`
`).replace(Qf,``)}function ep(e,t){return t=$f(t),$f(e)===t}function $(e,t,n,r,a,o){switch(n){case`children`:if(typeof r==`string`)t===`body`||t===`textarea`&&r===``||_n(e,r);else if(typeof r==`number`||typeof r==`bigint`)t!==`body`&&_n(e,``+r);else return;break;case`className`:tn(e,`class`,r);break;case`tabIndex`:tn(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:tn(e,n,r);break;case`style`:bn(e,r,o);return;case`data`:if(t!==`object`){tn(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=wn(r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}if(typeof o==`function`&&(n===`formAction`?(t!==`input`&&$(e,t,`name`,a.name,a,null),$(e,t,`formEncType`,a.formEncType,a,null),$(e,t,`formMethod`,a.formMethod,a,null),$(e,t,`formTarget`,a.formTarget,a,null)):($(e,t,`encType`,a.encType,a,null),$(e,t,`method`,a.method,a,null),$(e,t,`target`,a.target,a,null))),r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=wn(r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=Tn);return;case`onScroll`:r!=null&&Q(`scroll`,e);return;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=wn(r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`credentialless`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Q(`beforetoggle`,e),Q(`toggle`,e),en(e,`popover`,r);break;case`xlinkActuate`:nn(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:nn(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:nn(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:nn(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:nn(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:nn(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:nn(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:nn(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:nn(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:en(e,`is`,r);break;case`innerText`:case`textContent`:return;default:if(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)n=Sn.get(n)||n,en(e,n,r);else return}M=!0}function tp(e,t,n,r,a,o){switch(n){case`style`:bn(e,r,o);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`children`:if(typeof r==`string`)_n(e,r);else if(typeof r==`number`||typeof r==`bigint`)_n(e,``+r);else return;break;case`onScroll`:r!=null&&Q(`scroll`,e);return;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);return;case`onClick`:r!=null&&(e.onclick=Tn);return;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:return;case`innerText`:case`textContent`:return;default:if(!Kt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),o=n.slice(2,a?n.length-7:void 0),t=e[At]||null,t=t==null?null:t[n],typeof t==`function`&&e.removeEventListener(o,t,a),typeof r==`function`)){typeof t!=`function`&&t!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(o,r,a);break a}M=!0,n in e?e[n]=r:!0===r?e.setAttribute(n,``):en(e,n,r)}return}M=!0}function np(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Q(`error`,e),Q(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,o,s,n,null)}}a&&$(e,t,`srcSet`,n.srcSet,n,null),r&&$(e,t,`src`,n.src,n,null);return;case`input`:Q(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:$(e,t,r,d,n,null)}}fn(e,o,c,l,u,s,a,!1);return;case`select`:for(a in Q(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:$(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&mn(e,!!r,n,!0):mn(e,!!r,t,!1);return;case`textarea`:for(s in Q(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:$(e,t,s,c,n,null)}gn(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:$(e,t,l,r,n,null)}return;case`dialog`:Q(`beforetoggle`,e),Q(`toggle`,e),Q(`cancel`,e),Q(`close`,e);break;case`iframe`:case`object`:Q(`load`,e);break;case`video`:case`audio`:for(r=0;r<zf.length;r++)Q(zf[r],e);break;case`image`:Q(`error`,e),Q(`load`,e);break;case`details`:Q(`toggle`,e);break;case`embed`:case`source`:case`link`:Q(`error`,e),Q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,u,r,n,null)}return;default:if(xn(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&tp(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&$(e,t,c,r,n,null))}var rp={};function ip(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||$(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:m!==f&&(M=!0),o=m;break;case`name`:m!==f&&(M=!0),a=m;break;case`checked`:m!==f&&(M=!0),u=m;break;case`defaultChecked`:m!==f&&(M=!0),d=m;break;case`value`:m!==f&&(M=!0),s=m;break;case`defaultValue`:m!==f&&(M=!0),c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&$(e,t,p,m,r,f)}}dn(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||$(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:o!==l&&(M=!0),p=o;break;case`defaultValue`:o!==l&&(M=!0),c=o;break;case`multiple`:o!==l&&(M=!0),s=o;default:o!==l&&$(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?mn(e,!!n,n?[]:``,!1):mn(e,!!n,t,!0)):mn(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:$(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:a!==o&&(M=!0),p=a;break;case`defaultValue`:a!==o&&(M=!0),m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&$(e,t,s,a,r,o)}hn(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:$(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:p!==m&&(M=!0),e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:$(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&$(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:$(e,t,u,p,r,m)}return;default:if(xn(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&tp(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||tp(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&$(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||$(e,t,f,p,r,m)}function ap(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function op(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&ap(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&ap(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var sp=null,cp=null;function lp(e){return e.nodeType===9?e:e.ownerDocument}function up(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function dp(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function fp(e,t,n,r){return n=lp(n).createElement(e),n[kt]=r,n[At]=t,np(n,e,t),Ut(n),n}function pp(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var mp=null;function hp(){var e=window.event;return e&&e.type===`popstate`?e!==mp&&(mp=e,!0):(mp=null,!1)}var gp=typeof setTimeout==`function`?setTimeout:void 0,_p=typeof clearTimeout==`function`?clearTimeout:void 0,vp=typeof Promise==`function`?Promise:void 0,yp=typeof requestAnimationFrame==`function`?requestAnimationFrame:gp,bp=typeof queueMicrotask==`function`?queueMicrotask:vp===void 0?gp:function(e){return vp.resolve(null).then(e).catch(xp)};function xp(e){setTimeout(function(){throw e})}function Sp(e){return e===`head`}function Cp(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8){if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Hh(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)_m(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,_m(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[It]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&_m(e.ownerDocument.body)}n=i}while(n);Hh(t)}function wp(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8){if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++}n=r}while(n)}function Tp(e,t,n){if(t=CSS.escape(t)===t?t:`r-`+btoa(t).replace(/=/g,``),e.style.viewTransitionName=t,n!=null&&(e.style.viewTransitionClass=n),n=getComputedStyle(e),n.display===`inline`){if(t=e.getClientRects(),t.length===1)var r=1;else for(var i=r=0;i<t.length;i++){var a=t[i];0<a.width&&0<a.height&&r++}r===1&&(e=e.style,e.display=t.length===1?`inline-block`:`block`,e.marginTop=`-`+n.paddingTop,e.marginBottom=`-`+n.paddingBottom)}}function Ep(e,t){e=e.style,t=t.style;var n=t==null?null:t.hasOwnProperty(`viewTransitionName`)?t.viewTransitionName:t.hasOwnProperty(`view-transition-name`)?t[`view-transition-name`]:null;e.viewTransitionName=n==null||typeof n==`boolean`?``:(``+n).trim(),n=t==null?null:t.hasOwnProperty(`viewTransitionClass`)?t.viewTransitionClass:t.hasOwnProperty(`view-transition-class`)?t[`view-transition-class`]:null,e.viewTransitionClass=n==null||typeof n==`boolean`?``:(``+n).trim(),e.display===`inline-block`&&(t==null?e.display=e.margin=``:(n=t.display,e.display=n==null||typeof n==`boolean`?``:n,n=t.margin,n==null?(n=t.hasOwnProperty(`marginTop`)?t.marginTop:t[`margin-top`],e.marginTop=n==null||typeof n==`boolean`?``:n,t=t.hasOwnProperty(`marginBottom`)?t.marginBottom:t[`margin-bottom`],e.marginBottom=t==null||typeof t==`boolean`?``:t):e.margin=n))}function Dp(e,t,n){return n=n.ownerDocument.defaultView,{rect:e,abs:t.position===`absolute`||t.position===`fixed`,clip:t.clipPath!==`none`||t.overflow!==`visible`||t.filter!==`none`||t.mask!==`none`||t.mask!==`none`||t.borderRadius!==`0px`,view:0<=e.bottom&&0<=e.right&&e.top<=n.innerHeight&&e.left<=n.innerWidth}}function Op(e){return Dp(e.getBoundingClientRect(),getComputedStyle(e),e)}function kp(e){var t=e.getBoundingClientRect();t=new DOMRect(t.x+2e4,t.y+2e4,t.width,t.height);var n=getComputedStyle(e);return Dp(t,n,e)}function Ap(e){return e.documentElement.clientHeight}function jp(e){this.addEventListener(`load`,e),this.addEventListener(`error`,e)}function Mp(e,t,n,r,i,a,o,s,c){var l=t.nodeType===9?t:t.ownerDocument;try{var u=l.startViewTransition({update:function(){var t=l.defaultView,n=t.navigation&&t.navigation.transition,o=l.fonts.status;r();var s=[];if(o===`loaded`&&(Ap(l),l.fonts.status===`loading`&&s.push(l.fonts.ready)),o=s.length,e!==null)for(var c=e.suspenseyImages,u=0,d=0;d<c.length;d++){var f=c[d];if(!f.complete){var p=f.getBoundingClientRect();if(0<p.bottom&&0<p.right&&p.top<t.innerHeight&&p.left<t.innerWidth){if(u+=Xm(f),u>$m){s.length=o;break}f=new Promise(jp.bind(f)),s.push(f)}}}if(0<s.length)return t=Promise.race([Promise.all(s),new Promise(function(e){return setTimeout(e,500)})]).then(i,i),(n?Promise.allSettled([n.finished,t]):t).then(a,a);if(i(),n)return n.finished.then(a,a);a()},types:n});l.__reactViewTransition=u;var d=[];return u.ready.then(function(){for(var e=l.documentElement.getAnimations({subtree:!0}),t=0;t<e.length;t++){var n=e[t],r=n.effect,i=r.pseudoElement;if(i!=null&&i.startsWith(`::view-transition`)){d.push(n),n=r.getKeyframes();for(var a=i=void 0,s=!0,c=0;c<n.length;c++){var u=n[c],f=u.width;if(i===void 0)i=f;else if(i!==f){s=!1;break}if(f=u.height,a===void 0)a=f;else if(a!==f){s=!1;break}delete u.width,delete u.height,u.transform===`none`&&delete u.transform}s&&i!==void 0&&a!==void 0&&(r.setKeyframes(n),s=getComputedStyle(r.target,r.pseudoElement),s.width!==i||s.height!==a)&&(s=n[0],s.width=i,s.height=a,s=n[n.length-1],s.width=i,s.height=a,r.setKeyframes(n))}}o()},function(e){l.__reactViewTransition===u&&(l.__reactViewTransition=null);try{if(typeof e==`object`&&e)switch(e.name){case`InvalidStateError`:(e.message===`View transition was skipped because document visibility state is hidden.`||e.message===`Skipping view transition because document visibility state has become hidden.`||e.message===`Skipping view transition because viewport size changed.`||e.message===`Transition was aborted because of invalid state`)&&(e=null)}e!==null&&c(e)}finally{r(),i(),o()}}),u.finished.finally(function(){for(var e=0;e<d.length;e++)d[e].cancel();l.__reactViewTransition===u&&(l.__reactViewTransition=null),s()}),u}catch{return r(),i(),o(),null}}function Np(e,t){this._scope=document.documentElement,this._selector=`::view-transition-`+e+`(`+t+`)`}Np.prototype.animate=function(e,t){return t=typeof t==`number`?{duration:t}:T({},t),t.pseudoElement=this._selector,this._scope.animate(e,t)},Np.prototype.getAnimations=function(){for(var e=this._scope,t=this._selector,n=e.getAnimations({subtree:!0}),r=[],i=0;i<n.length;i++){var a=n[i].effect;a!==null&&a.target===e&&a.pseudoElement===t&&r.push(n[i])}return r},Np.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function Pp(e){return{name:e,group:new Np(`group`,e),imagePair:new Np(`image-pair`,e),old:new Np(`old`,e),new:new Np(`new`,e)}}function Fp(e){this._fragmentFiber=e,this._observers=this._eventListeners=null}Fp.prototype.addEventListener=function(e,t,n){var r=null,i=null;if(!(n!=null&&typeof n!=`boolean`&&(r=n.signal||null,r!==null&&r.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var a=this._eventListeners;if(Bp(a,e,t,n)===-1){var o=this,s=t;n!=null&&typeof n!=`boolean`&&!0===n.once&&(s=function(r){o.removeEventListener(e,t,n),typeof t==`function`?t.call(this,r):t.handleEvent(r)}),r!==null&&(i=o.removeEventListener.bind(o,e,t,n),r.addEventListener(`abort`,i,{once:!0}),i=r.removeEventListener.bind(r,`abort`,i)),r=Rp(n),a.push({type:e,listener:t,optionsOrUseCapture:n,attachedListener:s,cleanup:i}),h(this._fragmentFiber.child,!1,Ip,e,s,r)}this._eventListeners=a}};function Ip(e,t,n,r){return b(e).addEventListener(t,n,r),!1}Fp.prototype.removeEventListener=function(e,t,n){var r=this._eventListeners;if(r!==null&&(t=Bp(r,e,t,n),t!==-1)){var i=r[t];n=i.attachedListener;var a=i.cleanup;i=Rp(i.optionsOrUseCapture),h(this._fragmentFiber.child,!1,Lp,e,n,i),r.splice(t,1),a!==null&&a()}};function Lp(e,t,n,r){return b(e).removeEventListener(t,n,r),!1}function Rp(e){return e!=null&&typeof e!=`boolean`&&(!0===e.once||e.signal instanceof AbortSignal)?{capture:e.capture,passive:e.passive}:e}function zp(e){return e==null?`c=0`:typeof e==`boolean`?`c=`+(e?`1`:`0`):`c=`+(e.capture?`1`:`0`)}function Bp(e,t,n,r){if(e.length===0)return-1;r=zp(r);for(var i=0;i<e.length;i++){var a=e[i];if(a.type===t&&a.listener===n&&zp(a.optionsOrUseCapture)===r)return i}return-1}Fp.prototype.dispatchEvent=function(e){var t=g(this._fragmentFiber);if(t===null)return!0;t=b(t);var n=this._eventListeners;if(n!==null&&0<n.length||!e.bubbles){var r=t.nodeType===9?t.createComment(``):document.createTextNode(``);if(n)for(var i=0;i<n.length;i++){var a=n[i];r.addEventListener(a.type,a.attachedListener,Rp(a.optionsOrUseCapture))}if(t.appendChild(r),e=r.dispatchEvent(e),n)for(i=0;i<n.length;i++)a=n[i],r.removeEventListener(a.type,a.attachedListener,Rp(a.optionsOrUseCapture));return t.removeChild(r),e}return t.dispatchEvent(e)},Fp.prototype.focus=function(e){h(this._fragmentFiber.child,!0,Vp,e,void 0,void 0)};function Vp(e,t){return e.tag!==6&&(e=b(e),pm(e,t))}Fp.prototype.focusLast=function(e){var t=[];h(this._fragmentFiber.child,!0,Hp,t,void 0,void 0);for(var n=t.length-1;0<=n&&!Vp(t[n],e);n--);};function Hp(e,t){return t.push(e),!1}Fp.prototype.blur=function(){var e=g(this._fragmentFiber);e!==null&&(e=b(e),e=lp(e).activeElement,e!==null&&h(this._fragmentFiber.child,!1,Up,e,void 0,void 0))};function Up(e,t){return e.tag!==6&&(e=b(e),e===t||e.contains(t)?(t.blur(),!0):!1)}Fp.prototype.observeUsing=function(e){this._observers===null&&(this._observers=new Set),this._observers.add(e),h(this._fragmentFiber.child,!1,Wp,e,void 0,void 0)};function Wp(e,t){return e.tag!==6&&(e=b(e),t.observe(e),!1)}Fp.prototype.unobserveUsing=function(e){var t=this._observers;if(t!==null&&t.has(e)){t.delete(e),h(this._fragmentFiber.child,!1,Gp,e,void 0,void 0);for(var n=t=0;n<Kp.length;n++){var r=Kp[n];r.fragmentInstance===this&&r.observer===e?e.unobserve(r.instance):Kp[t++]=r}Kp.length=t}};function Gp(e,t){return e.tag!==6&&(e=b(e),t.unobserve(e),!1)}var Kp=[],qp=!1;function Jp(e,t,n){Kp.push({fragmentInstance:e,observer:t,instance:n}),qp||(qp=!0,mm(function(){qp=!1;var e=Kp;Kp=[];for(var t=0;t<e.length;t++){var n=e[t];n.observer.unobserve(n.instance)}}))}Fp.prototype.getClientRects=function(){var e=[];return h(this._fragmentFiber.child,!1,Yp,e,void 0,void 0),e};function Yp(e,t){if(e.tag===6){e=e.stateNode;var n=e.ownerDocument.createRange();n.selectNodeContents(e),t.push.apply(t,n.getClientRects())}else e=b(e),t.push.apply(t,e.getClientRects());return!1}Fp.prototype.getRootNode=function(e){var t=g(this._fragmentFiber);return t===null?this:b(t).getRootNode(e)},Fp.prototype.compareDocumentPosition=function(e){var t=g(this._fragmentFiber);if(t===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var n=[];h(this._fragmentFiber.child,!1,Hp,n,void 0,void 0);var r=b(t);if(n.length===0){if(n=r,_(this._fragmentFiber)){a:{for(t=this._fragmentFiber.return;t!==null;){if(t.tag===4){t=t.stateNode.containerInfo;break a}if(t.tag===3||t.tag===5||t.tag===27)break;t=t.return}t=null}t!=null&&(n=t)}t=this._fragmentFiber;var i=r=n.compareDocumentPosition(e);return n===e?i=Node.DOCUMENT_POSITION_CONTAINS:r&Node.DOCUMENT_POSITION_CONTAINED_BY&&(n=v(t)[1],n===null?i=Node.DOCUMENT_POSITION_PRECEDING:(e=b(n).compareDocumentPosition(e),i=e===0||e&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),i|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}t=b(n[0]),i=b(n[n.length-1]);var a=_(this._fragmentFiber)?t.parentElement:r;if(a==null)return Node.DOCUMENT_POSITION_DISCONNECTED;r=a.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY,a=a.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_CONTAINED_BY;var o=t.compareDocumentPosition(e),s=i.compareDocumentPosition(e),c=o&Node.DOCUMENT_POSITION_CONTAINED_BY||s&Node.DOCUMENT_POSITION_CONTAINED_BY;return s=r&&a&&o&Node.DOCUMENT_POSITION_FOLLOWING&&s&Node.DOCUMENT_POSITION_PRECEDING,t=r&&t===e||a&&i===e||c||s?Node.DOCUMENT_POSITION_CONTAINED_BY:!r&&t===e||!a&&i===e?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:o,t&Node.DOCUMENT_POSITION_DISCONNECTED||t&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||Xp(t,this._fragmentFiber,n[0],n[n.length-1],e)?t:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function Xp(e,t,n,r,i){var a=zt(i);if(e&Node.DOCUMENT_POSITION_CONTAINED_BY){if(n=!!a)a:{for(;a!==null;){if(a.tag===7&&(a===t||a.alternate===t)){n=!0;break a}a=a.return}n=!1}return n}if(e&Node.DOCUMENT_POSITION_CONTAINS){if(a===null)return a=i.ownerDocument,i===a||i===a.documentElement||i===a.body;a:{for(a=t,t=g(t);a!==null;){if(!(a.tag!==5&&a.tag!==3&&a.tag!==27||a!==t&&a.alternate!==t)){a=!0;break a}a=a.return}a=!1}return a}return e&Node.DOCUMENT_POSITION_PRECEDING?((t=!!a)&&!(t=a===n)&&(t=te(n,a,w),t===null?t=!1:(h(t,!0,ee,a,n),a=x,x=null,t=a!==null)),t):e&Node.DOCUMENT_POSITION_FOLLOWING?((t=!!a)&&!(t=a===r)&&(t=te(r,a,w),t===null?t=!1:(h(t,!0,C,a,r),a=x,S=x=null,t=a!==null)),t):!1}function Zp(e,t){var n=e.ownerDocument.createRange();n.selectNodeContents(e),e=n.getBoundingClientRect(),window.scrollTo(window.scrollX+e.left,t?window.scrollY+e.top:window.scrollY+e.bottom-window.innerHeight)}Fp.prototype.scrollIntoView=function(e){if(typeof e==`object`)throw Error(i(566));var t=[];h(this._fragmentFiber.child,!1,Hp,t,void 0,void 0);var n=!1!==e;if(t.length===0){var r=v(this._fragmentFiber);if(r=n?r[1]||r[0]||g(this._fragmentFiber):r[0]||r[1],r===null)return;if(r.tag===6){e=b(r),Zp(e,n);return}if(r=b(r),r.nodeType!==9){if(r.nodeType===11){n=`host`in r?r.host:null,n!==null&&n.scrollIntoView(e);return}r.scrollIntoView(e)}}for(r=n?t.length-1:0;r!==(n?-1:t.length);){var a=t[r];a.tag===6?(a=b(a),Zp(a,n)):b(a).scrollIntoView(e),r+=n?-1:1}};function Qp(e,t){return e=b(e),$p(e,t),!1}function $p(e,t){e.reactFragments??=new Set,e.reactFragments.add(t)}function em(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.addEventListener(i.type,i.attachedListener,Rp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){for(var r=0,i=0;i<Kp.length;i++){var a=Kp[i];(a.fragmentInstance!==t||a.observer!==n||a.instance!==e)&&(Kp[r++]=a)}Kp.length=r,n.observe(e)}),$p(e,t))}function tm(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.removeEventListener(i.type,i.attachedListener,Rp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){typeof n.rootMargin==`string`?Jp(t,n,e):n.unobserve(e)}),e.reactFragments!=null&&e.reactFragments.delete(t))}function nm(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:nm(n),Rt(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function rm(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r){if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e}else if(!e[It])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=lm(e.nextSibling),e===null)break}return null}function im(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=lm(e.nextSibling),e===null))return null;return e}function am(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=lm(e.nextSibling),e===null))return null;return e}function om(e){return e.data===`$?`||e.data===`$~`}function sm(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function cm(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function lm(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var um=null;function dm(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return lm(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function fm(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function pm(e,t){function n(){r=!0}if(e.ownerDocument.activeElement===e)return!0;var r=!1;try{e.ownerDocument.addEventListener(`focus`,n,!0),(e.focus||HTMLElement.prototype.focus).call(e,t)}finally{e.ownerDocument.removeEventListener(`focus`,n,!0)}return r}function mm(e){yp(function(){yp(function(t){return e(t)})})}function hm(e,t,n){switch(t=lp(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function gm(e,t,n){for(var r in n){var i=n[r];n.hasOwnProperty(r)&&i!=null&&$(e,t,r,null,rp,i)}n.dangerouslySetInnerHTML!=null&&(e.textContent=``),e.onclick===Tn&&(e.onclick=null),Rt(e)}function _m(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Rt(e)}var vm=new Map,ym=new Set;function bm(e){if(typeof e.getRootNode==`function`){var t=e.getRootNode();if(t.nodeType===9||t.nodeType===11)return t}return e.nodeType===9?e:e.ownerDocument}var xm=A.d;A.d={f:Sm,r:Cm,D:Em,C:Dm,L:Om,m:km,X:jm,S:Am,M:Mm};function Sm(){var e=xm.f(),t=zd();return e||t}function Cm(e){var t=Bt(e);t!==null&&t.tag===5&&t.type===`form`?ac(t):xm.r(e)}var wm=typeof document>`u`?null:document;function Tm(e,t,n){var r=wm;if(r&&typeof t==`string`&&t){var i=un(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),ym.has(i)||(ym.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),np(t,`link`,e),Ut(t),r.head.appendChild(t)))}}function Em(e){xm.D(e),Tm(`dns-prefetch`,e,null)}function Dm(e,t){xm.C(e,t),Tm(`preconnect`,e,t)}function Om(e,t,n){xm.L(e,t,n);var r=wm;if(r&&e&&t){var i=`link[rel="preload"][as="`+un(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+un(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+un(n.imageSizes)+`"]`)):i+=`[href="`+un(e)+`"]`;var a=i;switch(t){case`style`:a=Pm(e);break;case`script`:a=Rm(e)}if(!(vm.has(a)||(e=T({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),vm.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(Fm(a))||t===`script`&&r.querySelector(zm(a))))){var o=r.createElement(`link`);np(o,`link`,e),t===`style`&&(o[Lt]=!0,o.onload=o.onerror=function(){Wt(o)}),Ut(o),r.head.appendChild(o)}}}function km(e,t){xm.m(e,t);var n=wm;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+un(r)+`"][href="`+un(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Rm(e)}if(!vm.has(a)&&(e=T({rel:`modulepreload`,href:e},t),vm.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(zm(a)))return}r=n.createElement(`link`),np(r,`link`,e),Ut(r),n.head.appendChild(r)}}}function Am(e,t,n){xm.S(e,t,n);var r=wm;if(r&&e){var i=Ht(r).hoistableStyles,a=Pm(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(Fm(a)))s.loading=5;else{e=T({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=vm.get(a))&&Hm(e,n);var c=o=r.createElement(`link`);Ut(c),np(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Vm(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function jm(e,t){xm.X(e,t);var n=wm;if(n&&e){var r=Ht(n).hoistableScripts,i=Rm(e),a=r.get(i);a||(a=n.querySelector(zm(i)),a||(e=T({src:e,async:!0},t),(t=vm.get(i))&&Um(e,t),a=n.createElement(`script`),Ut(a),np(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Mm(e,t){xm.M(e,t);var n=wm;if(n&&e){var r=Ht(n).hoistableScripts,i=Rm(e),a=r.get(i);a||(a=n.querySelector(zm(i)),a||(e=T({src:e,async:!0,type:`module`},t),(t=vm.get(i))&&Um(e,t),a=n.createElement(`script`),Ut(a),np(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Nm(e,t,n,r){var a=(a=ke.current)?bm(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(n=Pm(n.href),t=Ht(a).hoistableStyles,r=t.get(n),r||(r={type:`style`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Pm(n.href);var o=Ht(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(Fm(e)))?o._p||(s.instance=o,s.state.loading=5):(o=vm.get(e),o||(o={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},vm.set(e,o)),Lm(a,e,o,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(n=Rm(n),t=Ht(a).hoistableScripts,r=t.get(n),r||(r={type:`script`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Pm(e){return`href="`+un(e)+`"`}function Fm(e){return`link[rel="stylesheet"][`+e+`]`}function Im(e){return T({},e,{"data-precedence":e.precedence,precedence:null})}function Lm(e,t,n,r){if(t=e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)){if(!0!==t[Lt]){r.loading=1;return}}else t=e.createElement(`link`),t[Lt]=!0,t.onload=t.onerror=Wt.bind(null,t),np(t,`link`,n),Ut(t),e.head.appendChild(t);r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2})}function Rm(e){return`[src="`+un(e)+`"]`}function zm(e){return`script[async]`+e}function Bm(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+un(n.href)+`"]`);if(r)return t.instance=r,Ut(r),r;var a=T({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),Ut(r),np(r,`style`,a),Vm(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Pm(n.href);var o=e.querySelector(Fm(a));if(o)return t.state.loading|=4,t.instance=o,Ut(o),o;r=Im(n),(a=vm.get(a))&&Hm(r,a),o=(e.ownerDocument||e).createElement(`link`),Ut(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),np(o,`link`,r),t.state.loading|=4,Vm(o,n.precedence,e),t.instance=o;case`script`:return o=Rm(n.src),(a=e.querySelector(zm(o)))?(t.instance=a,Ut(a),a):(r=n,(a=vm.get(o))&&(r=T({},n),Um(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),Ut(a),np(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Vm(r,n.precedence,e));return t.instance}function Vm(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Hm(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function Um(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Wm=null;function Gm(e,t,n){if(Wm===null){var r=new Map,i=Wm=new Map;i.set(n,r)}else i=Wm,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[It]||a[kt]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Km(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function qm(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Jm(e,t){return e===`img`&&t.src!=null&&t.src!==``&&t.onLoad==null&&t.loading!==`lazy`}function Ym(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Xm(e){return(e.width||100)*(e.height||100)*(typeof devicePixelRatio==`number`?devicePixelRatio:1)*.25}function Zm(e,t){typeof t.decode==`function`&&(e.imgCount++,t.complete||(e.imgBytes+=Xm(t),e.suspenseyImages.push(t)),e=rh.bind(e),t.decode().then(e,e))}function Qm(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Pm(r.href),a=t.querySelector(Fm(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=nh.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,Ut(a);return}a=t.ownerDocument||t,r=Im(r),(i=vm.get(i))&&Hm(r,i),a=a.createElement(`link`),Ut(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),np(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=nh.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var $m=0;function eh(e,t){return e.stylesheets&&e.count===0&&ah(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&ah(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&$m===0&&($m=62500*op());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&ah(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>$m?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function th(e){if(e.count===0&&(e.imgCount===0||!e.waitingForImages)){if(e.stylesheets)ah(e,e.stylesheets);else if(e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}}}function nh(){this.count--,th(this)}function rh(){this.imgCount--,th(this)}var ih=null;function ah(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,ih=new Map,t.forEach(oh,e),ih=null,nh.call(e))}function oh(e,t){if(!(t.state.loading&4)){var n=ih.get(e);if(n)var r=n.get(null);else{n=new Map,ih.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=nh.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var sh={$$typeof:O,Provider:null,Consumer:null,_currentValue:Se,_currentValue2:Se,_threadCount:0};function ch(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=vt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=vt(0),this.hiddenUpdates=vt(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.transitionTypes=null,this.incompleteTransitions=new Map}function lh(e,t,n,r,i,a,o,s,c,l,u,d){return e=new ch(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=Fi(3,null,null,t),e.current=a,a.stateNode=e,t=Pa(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},_o(a),e}function uh(e){return e?(e=Ni,e):Ni}function dh(e,t,n,r,i,a){i=uh(i),r.context===null?r.context=i:r.pendingContext=i,r=yo(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=bo(e,r,t),n!==null&&(Pd(n,e,t),xo(n,e,t))}function fh(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ph(e,t){fh(e,t),(e=e.alternate)&&fh(e,t)}function mh(e){if(e.tag===13||e.tag===31){var t=Ai(e,67108864);t!==null&&Pd(t,e,67108864),ph(e,67108864)}}function hh(e){if(e.tag===13||e.tag===31){var t=jd();t=wt(t);var n=Ai(e,t);n!==null&&Pd(n,e,t),ph(e,t)}}var gh=!0;function _h(e,t,n,r){var i=k.T;k.T=null;var a=A.p;try{A.p=2,yh(e,t,n,r)}finally{A.p=a,k.T=i}}function vh(e,t,n,r){var i=k.T;k.T=null;var a=A.p;try{A.p=8,yh(e,t,n,r)}finally{A.p=a,k.T=i}}function yh(e,t,n,r){if(gh){var i=bh(r);if(i===null)Kf(e,t,r,xh,n),Mh(e,r);else if(Ph(i,e,t,n,r))r.stopPropagation();else if(Mh(e,r),t&4&&-1<jh.indexOf(e)){for(;i!==null;){var a=Bt(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=ft(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-at(o);s.entanglements[1]|=c,o&=~c}Ef(a),!(W&6)&&(_d=qe()+500,Df(0,!1))}}break;case 31:case 13:s=Ai(a,2),s!==null&&Pd(s,a,2),zd(),ph(a,2)}if(a=bh(r),a===null&&Kf(e,t,r,xh,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Kf(e,t,r,null,n)}}function bh(e){return e=Dn(e),Sh(e)}var xh=null;function Sh(e){if(xh=null,e=zt(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return xh=e,null}function Ch(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`fullscreenerror`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`resize`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Je()){case Ye:return 2;case Xe:return 8;case Ze:case Qe:return 32;case $e:return 268435456;default:return 32}default:return 32}}var wh=!1,Th=null,Eh=null,Dh=null,Oh=new Map,kh=new Map,Ah=[],jh=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Mh(e,t){switch(e){case`focusin`:case`focusout`:Th=null;break;case`dragenter`:case`dragleave`:Eh=null;break;case`mouseover`:case`mouseout`:Dh=null;break;case`pointerover`:case`pointerout`:Oh.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:kh.delete(t.pointerId)}}function Nh(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Bt(t),t!==null&&mh(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Ph(e,t,n,r,i){switch(t){case`focusin`:return Th=Nh(Th,e,t,n,r,i),!0;case`dragenter`:return Eh=Nh(Eh,e,t,n,r,i),!0;case`mouseover`:return Dh=Nh(Dh,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return Oh.set(a,Nh(Oh.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,kh.set(a,Nh(kh.get(a)||null,e,t,n,r,i)),!0}return!1}function Fh(e){var t=zt(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,Dt(e.priority,function(){hh(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,Dt(e.priority,function(){hh(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ih(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=bh(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);En=r,n.target.dispatchEvent(r),En=null}else return t=Bt(n),t!==null&&mh(t),e.blockedOn=n,!1;t.shift()}return!0}function Lh(e,t,n){Ih(e)&&n.delete(t)}function Rh(){wh=!1,Th!==null&&Ih(Th)&&(Th=null),Eh!==null&&Ih(Eh)&&(Eh=null),Dh!==null&&Ih(Dh)&&(Dh=null),Oh.forEach(Lh),kh.forEach(Lh)}function zh(e,n){e.blockedOn===n&&(e.blockedOn=null,wh||(wh=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,Rh)))}var Bh=null;function Vh(e){Bh!==e&&(Bh=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){Bh===e&&(Bh=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(Sh(r||n)===null)continue;break}var a=Bt(n);a!==null&&(e.splice(t,3),t-=3,rc(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Hh(e){function t(t){return zh(t,e)}Th!==null&&zh(Th,e),Eh!==null&&zh(Eh,e),Dh!==null&&zh(Dh,e),Oh.forEach(t),kh.forEach(t);for(var n=0;n<Ah.length;n++){var r=Ah[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<Ah.length&&(n=Ah[0],n.blockedOn===null);)Fh(n),n.blockedOn===null&&Ah.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[At]||null;if(typeof a==`function`)o||Vh(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[At]||null)s=o.formAction;else if(Sh(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Vh(n)}}}function Uh(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Wh(e){this._internalRoot=e}Gh.prototype.render=Wh.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;dh(n,jd(),e,t,null,null)},Gh.prototype.unmount=Wh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;dh(e.current,2,null,e,null,null),zd(),t[jt]=null}};function Gh(e){this._internalRoot=e}Gh.prototype.unstable_scheduleHydration=function(e){if(e){var t=Et();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Ah.length&&t!==0&&t<Ah[n].priority;n++);Ah.splice(n,0,e),n===0&&Fh(e)}};var Kh=n.version;if(Kh!==`19.3.0`)throw Error(i(527,Kh,`19.3.0`));A.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=d(t),e=e===null?null:p(e),e=e===null?null:e.stateNode,e};var qh={bundleType:0,version:`19.3.0`,rendererPackageName:`react-dom`,currentDispatcherRef:k,reconcilerVersion:`19.3.0`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var Jh=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Jh.isDisabled&&Jh.supportsFiber)try{nt=Jh.inject(qh),rt=Jh}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=Ec,s=Dc,c=Oc;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=lh(e,1,!1,null,null,n,r,null,o,s,c,Uh),e[jt]=t.current,Wf(e),new Wh(t)}})),g=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=h()})),_=c(u(),1),v=g(),y=`modulepreload`,b=function(e){return`/student-college-platform/`+e},x={},S=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}r=o(t.map(t=>{if(t=b(t,n),t=s(t),t in x)return;x[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:y,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},ee=/^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,C=/^[\\/]{2}/;function w(e,t){return t+e.replace(/\\/g,`/`)}var te=`popstate`;function T(e){return typeof e==`object`&&!!e&&`pathname`in e&&`search`in e&&`hash`in e&&`state`in e&&`key`in e}function ne(e={}){function t(e,t){let n=t.state?.masked,{pathname:r,search:i,hash:a}=n||e.location;return ae(``,{pathname:r,search:i,hash:a},t.state&&t.state.usr||null,t.state&&t.state.key||`default`,n?{pathname:e.location.pathname,search:e.location.search,hash:e.location.hash}:void 0)}function n(e,t){return typeof t==`string`?t:oe(t)}return se(t,n,null,e)}function E(e,t){if(e===!1||e==null)throw Error(t)}function D(e,t){if(!e){typeof console<`u`&&console.warn(t);try{throw Error(t)}catch{}}}function re(){return Math.random().toString(36).substring(2,10)}function ie(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function ae(e,t,n=null,r,i){return{pathname:typeof e==`string`?e:e.pathname,search:``,hash:``,...typeof t==`string`?O(t):t,state:n,key:t&&t.key||r||re(),mask:i}}function oe({pathname:e=`/`,search:t=``,hash:n=``}){return t&&t!==`?`&&(e+=t.charAt(0)===`?`?t:`?`+t),n&&n!==`#`&&(e+=n.charAt(0)===`#`?n:`#`+n),e}function O(e){let t={};if(e){let n=e.indexOf(`#`);n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf(`?`);r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function se(e,t,n,r={}){let{window:i=document.defaultView,v5Compat:a=!1}=r,o=i.history,s=`POP`,c=null,l=u();l??(l=0,o.replaceState({...o.state,idx:l},``));function u(){return(o.state||{idx:null}).idx}function d(){s=`POP`;let e=u(),t=e==null?null:e-l;l=e,c&&c({action:s,location:h.location,delta:t})}function f(e,t){s=`PUSH`;let r=T(e)?e:ae(h.location,e,t);n&&n(r,e),l=u()+1;let d=ie(r,l),f=h.createHref(r.mask||r);try{o.pushState(d,``,f)}catch(e){if(e instanceof DOMException&&e.name===`DataCloneError`)throw e;i.location.assign(f)}a&&c&&c({action:s,location:h.location,delta:1})}function p(e,t){s=`REPLACE`;let r=T(e)?e:ae(h.location,e,t);n&&n(r,e),l=u();let i=ie(r,l),d=h.createHref(r.mask||r);o.replaceState(i,``,d),a&&c&&c({action:s,location:h.location,delta:0})}function m(e){return ce(i,e)}let h={get action(){return s},get location(){return e(i,o)},listen(e){if(c)throw Error(`A history only accepts one active listener`);return i.addEventListener(te,d),c=e,()=>{i.removeEventListener(te,d),c=null}},createHref(e){return t(i,e)},createURL:m,encodeLocation(e){let t=m(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:f,replace:p,go(e){return o.go(e)}};return h}function ce(e,t,n=!1){let r=`http://localhost`;e&&(r=e.location.origin===`null`?e.location.href:e.location.origin),E(r,`No window.location.(origin|href) available to create URL`);let i=typeof t==`string`?t:oe(t);return i=i.replace(/ $/,`%20`),!n&&C.test(i)&&(i=r+i),new URL(i,r)}function le(e,t,n=`/`){return ue(e,t,n,!1)}function ue(e,t,n,r,i){let a=j((typeof t==`string`?O(t):t).pathname||`/`,n);if(a==null)return null;let o=i??de(e),s=null,c=Ee(a);for(let e=0;s==null&&e<o.length;++e)s=Se(o[e],c,r);return s}function de(e){let t=fe(e);return me(t),t}function fe(e,t=[],n=[],r=``,i=!1){let a=(e,a,o=i,s)=>{let c={relativePath:s===void 0?e.path||``:s,caseSensitive:e.caseSensitive===!0,childrenIndex:a,route:e};if(c.relativePath.startsWith(`/`)){if(!c.relativePath.startsWith(r)&&o)return;E(c.relativePath.startsWith(r),`Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(r.length)}let l=Pe([r,c.relativePath]),u=n.concat(c);e.children&&e.children.length>0&&(E(e.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),fe(e.children,t,u,l,o)),(e.path!=null||e.index)&&t.push({path:l,score:k(l,e.index),routesMeta:u.map((e,t)=>{let[n,r]=Te(e.relativePath,e.caseSensitive,t===u.length-1);return{...e,matcher:n,compiledParams:r}})})};return e.forEach((e,t)=>{if(e.path===``||!e.path?.includes(`?`))a(e,t);else for(let n of pe(e.path))a(e,t,!0,n)}),t}function pe(e){let t=e.split(`/`);if(t.length===0)return[];let[n,...r]=t,i=n.endsWith(`?`),a=n.replace(/\?$/,``);if(r.length===0)return i?[a,``]:[a];let o=pe(r.join(`/`)),s=[];return s.push(...o.map(e=>e===``?a:[a,e].join(`/`))),i&&s.push(...o),s.map(t=>e.startsWith(`/`)&&t===``?`/`:t)}function me(e){e.sort((e,t)=>e.score===t.score?A(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)):t.score-e.score)}var he=/^:[\w-]+$/,ge=3,_e=2,ve=1,ye=10,be=-2,xe=e=>e===`*`;function k(e,t){let n=e.split(`/`),r=n.length;return n.some(xe)&&(r+=be),t&&(r+=_e),n.filter(e=>!xe(e)).reduce((e,t)=>e+(he.test(t)?ge:t===``?ve:ye),r)}function A(e,t){return e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n])?e[e.length-1]-t[t.length-1]:0}function Se(e,t,n=!1){let{routesMeta:r}=e,i={},a=`/`,o=[];for(let e=0;e<r.length;++e){let s=r[e],c=e===r.length-1,l=a===`/`?t:t.slice(a.length)||`/`,u={path:s.relativePath,caseSensitive:s.caseSensitive,end:c},d=s.matcher&&s.compiledParams?we(u,l,s.matcher,s.compiledParams):Ce(u,l),f=s.route;if(!d&&c&&n&&!r[r.length-1].route.index&&(d=Ce({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},l)),!d)return null;Object.assign(i,d.params),o.push({params:i,pathname:Pe([a,d.pathname]),pathnameBase:Ie(Pe([a,d.pathnameBase])),route:f}),d.pathnameBase!==`/`&&(a=Pe([a,d.pathnameBase]))}return o}function Ce(e,t){typeof e==`string`&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=Te(e.path,e.caseSensitive,e.end);return we(e,t,n,r)}function we(e,t,n,r){let i=t.match(n);if(!i)return null;let a=i[0],o=Fe(a,1),s=i.slice(1);return{params:r.reduce((e,{paramName:t,isOptional:n},r)=>{if(t===`*`){let e=s[r]||``;o=Fe(a.slice(0,a.length-e.length),1)}let i=s[r];return e[t]=n&&!i?void 0:(i||``).replace(/%2F/g,`/`),e},{}),pathname:a,pathnameBase:o,pattern:e}}function Te(e,t=!1,n=!0){D(e===`*`||!e.endsWith(`*`)||e.endsWith(`/*`),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,`/*`)}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,`/*`)}".`);let r=[],i=`^`+e.replace(/\/*\*?$/,``).replace(/^\/*/,`/`).replace(/[\\.*+^${}|()[\]]/g,`\\$&`).replace(/\/:([\w-]+)(\?)?/g,(e,t,n,i,a)=>{if(r.push({paramName:t,isOptional:n!=null}),n){let t=a.charAt(i+e.length);return t&&t!==`/`?`/([^\\/]*)`:`(?:/([^\\/]*))?`}return`/([^\\/]+)`}).replace(/\/([\w-]+)\?(\/|$)/g,`(/$1)?$2`);return e.endsWith(`*`)?(r.push({paramName:`*`}),i+=e===`*`||e===`/*`?`(.*)$`:`(?:\\/(.+)|\\/*)$`):n?i+=`\\/*$`:e!==``&&e!==`/`&&(i+=`(?:(?=\\/|$))`),[new RegExp(i,t?void 0:`i`),r]}function Ee(e){try{return e.split(`/`).map(e=>decodeURIComponent(e).replace(/\//g,`%2F`)).join(`/`)}catch(t){return D(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function j(e,t){if(t===`/`)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith(`/`)?t.length-1:t.length,r=e.charAt(n);return r&&r!==`/`?null:e.slice(n)||`/`}function De(e,t=`/`){let{pathname:n,search:r=``,hash:i=``}=typeof e==`string`?O(e):e,a;return n?(n=Ne(n),a=n.startsWith(`/`)||n.startsWith(`\\`)?Oe(n.substring(1),`/`):Oe(n,t)):a=t,{pathname:a,search:Le(r),hash:Re(i)}}function Oe(e,t){let n=Fe(t).split(`/`);return e.split(`/`).forEach(e=>{e===`..`?n.length>1&&n.pop():e!==`.`&&n.push(e)}),n.length>1?n.join(`/`):`/`}function ke(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Ae(e){return e.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function je(e){let t=Ae(e);return t.map((e,n)=>n===t.length-1?e.pathname:e.pathnameBase)}function Me(e,t,n,r=!1){let i;typeof e==`string`?i=O(e):(i={...e},E(!i.pathname||!i.pathname.includes(`?`),ke(`?`,`pathname`,`search`,i)),E(!i.pathname||!i.pathname.includes(`#`),ke(`#`,`pathname`,`hash`,i)),E(!i.search||!i.search.includes(`#`),ke(`#`,`search`,`hash`,i)));let a=e===``||i.pathname===``,o=a?`/`:i.pathname,s;if(o==null)s=n;else{let e=t.length-1;if(!r&&o.startsWith(`..`)){let t=o.split(`/`);for(;t[0]===`..`;)t.shift(),--e;i.pathname=t.join(`/`)}s=e>=0?t[e]:`/`}let c=De(i,s),l=o&&o!==`/`&&o.endsWith(`/`),u=(a||o===`.`)&&n.endsWith(`/`);return!c.pathname.endsWith(`/`)&&(l||u)&&(c.pathname+=`/`),c}var Ne=e=>e.replace(/[\\/]{2,}/g,`/`),Pe=e=>Ne(e.join(`/`));function Fe(e,t=0){let n=e.length;for(;n>t&&e.charCodeAt(n-1)===47;)n--;return n===e.length?e:e.slice(0,n)}var Ie=e=>Fe(e).replace(/^\/*/,`/`),Le=e=>!e||e===`?`?``:e.startsWith(`?`)?e:`?`+e,Re=e=>!e||e===`#`?``:e.startsWith(`#`)?e:`#`+e,ze=class{constructor(e,t,n,r=!1){this.status=e,this.statusText=t||``,this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function Be(e){return e!=null&&typeof e.status==`number`&&typeof e.statusText==`string`&&typeof e.internal==`boolean`&&`data`in e}function Ve(e){return Pe(e.map(e=>e.route.path).filter(Boolean))||`/`}var He=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;function Ue(e,t){let n=e;if(typeof n!=`string`||!ee.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,i=!1;if(He)try{let e=new URL(window.location.href),r=C.test(n)?new URL(w(n,e.protocol)):new URL(n),a=j(r.pathname,t);r.origin===e.origin&&a!=null?n=a+r.search+r.hash:i=!0}catch{D(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:i,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var We=new URL(`http://localhost`);function Ge(e){if(e.createURL)return e.createURL(`/`);try{return new URL(e.createHref(`/`),We)}catch{return We}}function Ke(e,t){return e.origin===t.origin&&(e.origin!==`null`||e.protocol===t.protocol&&e.host===t.host)}function qe(e,t){if(e.startsWith(`//`))return!0;let n=t.protocol.toLowerCase();return e.toLowerCase().startsWith(n)?t.host===``||e.slice(n.length).startsWith(`//`):!1}function Je(e,t,n,r){let i=null;try{i=e==null?null:new URL(e,n)}catch{}let a=new URL(t,n),o=i!=null&&!Ke(i,n),s=!Ke(a,n);if(r===`reject`){if(o||s)throw Error(`External navigation is not allowed`)}else if(s&&(i==null||!qe(e,i)||!Ke(i,a)))throw Error(`External navigation is not allowed`)}var Ye=[`POST`,`PUT`,`PATCH`,`DELETE`];new Set(Ye);var Xe=[`GET`,...Ye];new Set(Xe);var Ze=[`about:`,`blob:`,`chrome:`,`chrome-untrusted:`,`content:`,`data:`,`devtools:`,`file:`,`filesystem:`,`javascript:`];function Qe(e){try{return Ze.includes(new URL(e).protocol)}catch{return!1}}var $e=_.createContext(null);$e.displayName=`DataRouter`;var et=_.createContext(null);et.displayName=`DataRouterState`;var tt=_.createContext(!1);function nt(){return _.useContext(tt)}var rt=_.createContext({isTransitioning:!1});rt.displayName=`ViewTransition`;var it=_.createContext(new Map);it.displayName=`Fetchers`;var at=_.createContext(null);at.displayName=`Await`;var ot=_.createContext(null);ot.displayName=`Navigation`;var st=_.createContext(null);st.displayName=`Location`;var ct=_.createContext({outlet:null,matches:[],isDataRoute:!1});ct.displayName=`Route`;var lt=_.createContext(null);lt.displayName=`RouteError`;var ut=`REACT_ROUTER_ERROR`,dt=`REDIRECT`,ft=`ROUTE_ERROR_RESPONSE`;function pt(e){if(e.startsWith(`${ut}:${dt}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`&&typeof t.location==`string`&&typeof t.reloadDocument==`boolean`&&typeof t.replace==`boolean`)return t}catch{}}function mt(e){if(e.startsWith(`${ut}:${ft}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`)return new ze(t.status,t.statusText,t.data)}catch{}}function ht(e,{relative:t}={}){E(gt(),`useHref() may be used only in the context of a <Router> component.`);let{basename:n,navigator:r}=_.useContext(ot),{hash:i,pathname:a,search:o}=St(e,{relative:t}),s=a;return n!==`/`&&(s=a===`/`?n:Pe([n,a])),r.createHref({pathname:s,search:o,hash:i})}function gt(){return _.useContext(st)!=null}function _t(){return E(gt(),`useLocation() may be used only in the context of a <Router> component.`),_.useContext(st).location}var vt=`You should call navigate() in a React.useEffect(), not when your component is first rendered.`;function yt(e){_.useContext(ot).static||_.useLayoutEffect(e)}function bt(){let{isDataRoute:e}=_.useContext(ct);return e?zt():xt()}function xt(){E(gt(),`useNavigate() may be used only in the context of a <Router> component.`);let e=_.useContext($e),{basename:t,navigator:n}=_.useContext(ot),{matches:r}=_.useContext(ct),{pathname:i}=_t(),a=JSON.stringify(je(r)),o=_.useRef(!1);return yt(()=>{o.current=!0}),_.useCallback((r,s={})=>{if(D(o.current,vt),!o.current)return;if(typeof r==`number`){n.go(r);return}let c=Me(r,JSON.parse(a),i,s.relative===`path`);e==null&&t!==`/`&&(c.pathname=c.pathname===`/`?t:Pe([t,c.pathname])),Je(typeof r==`string`?r:oe(r),n.createHref(c),Ge(n),`reject`),(s.replace?n.replace:n.push)(c,s.state,s)},[t,n,a,i,e])}_.createContext(null);function St(e,{relative:t}={}){let{matches:n}=_.useContext(ct),{pathname:r}=_t(),i=JSON.stringify(je(n));return _.useMemo(()=>Me(e,JSON.parse(i),r,t===`path`),[e,i,r,t])}function Ct(e,t){return wt(e,t)}function wt(e,t,n){E(gt(),`useRoutes() may be used only in the context of a <Router> component.`);let{navigator:r}=_.useContext(ot),{matches:i}=_.useContext(ct),a=i[i.length-1],o=a?a.params:{},s=a?a.pathname:`/`,c=a?a.pathnameBase:`/`,l=a&&a.route;{let e=l&&l.path||``;Vt(s,!l||e.endsWith(`*`)||e.endsWith(`*?`),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${e}"> to <Route path="${e===`/`?`*`:`${e}/*`}">.`)}let u=_t(),d;if(t){let e=typeof t==`string`?O(t):t;E(c===`/`||e.pathname?.startsWith(c),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${e.pathname}" was given in the \`location\` prop.`),d=e}else d=u;let f=d.pathname||`/`,p=f;if(c!==`/`){let e=c.replace(/^\//,``).split(`/`);p=`/`+f.replace(/^\//,``).split(`/`).slice(e.length).join(`/`)}let m=n&&n.state.matches.length?n.state.matches.map(e=>Object.assign(e,{route:n.manifest[e.route.id]||e.route})):le(e,{pathname:p});D(l||m!=null,`No routes matched location "${d.pathname}${d.search}${d.hash}" `),D(m==null||m[m.length-1].route.element!==void 0||m[m.length-1].route.Component!==void 0||m[m.length-1].route.lazy!==void 0,`Matched leaf route at location "${d.pathname}${d.search}${d.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let h=jt(m&&m.map(e=>Object.assign({},e,{params:Object.assign({},o,e.params),pathname:Pe([c,r.encodeLocation?r.encodeLocation(e.pathname.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathname]),pathnameBase:e.pathnameBase===`/`?c:Pe([c,r.encodeLocation?r.encodeLocation(e.pathnameBase.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathnameBase])})),i,n);return t&&h?_.createElement(st.Provider,{value:{location:{pathname:`/`,search:``,hash:``,state:null,key:`default`,mask:void 0,...d},navigationType:`POP`}},h):h}function Tt(){let e=Rt(),t=Be(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r=`rgba(200,200,200, 0.5)`,i={padding:`0.5rem`,backgroundColor:r},a={padding:`2px 4px`,backgroundColor:r},o=null;return console.error(`Error handled by React Router default ErrorBoundary:`,e),o=_.createElement(_.Fragment,null,_.createElement(`p`,null,`💿 Hey developer 👋`),_.createElement(`p`,null,`You can provide a way better UX than this when your app throws errors by providing your own `,_.createElement(`code`,{style:a},`ErrorBoundary`),` or`,` `,_.createElement(`code`,{style:a},`errorElement`),` prop on your route.`)),_.createElement(_.Fragment,null,_.createElement(`h2`,null,`Unexpected Application Error!`),_.createElement(`h3`,{style:{fontStyle:`italic`}},t),n?_.createElement(`pre`,{style:i},n):null,o)}var Et=_.createElement(Tt,null),Dt=class extends _.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!==`idle`&&e.revalidation===`idle`?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error===void 0?t.error:e.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error(`React Router caught the following error during render`,e)}render(){let e=this.state.error;if(this.context&&typeof e==`object`&&e&&`digest`in e&&typeof e.digest==`string`){let t=mt(e.digest);t&&(e=t)}let t=e===void 0?this.props.children:_.createElement(ct.Provider,{value:this.props.routeContext},_.createElement(lt.Provider,{value:e,children:this.props.component}));return this.context?_.createElement(kt,{error:e},t):t}};Dt.contextType=tt;var Ot=new WeakMap;function kt({children:e,error:t}){let{basename:n,navigator:r}=_.useContext(ot);if(typeof t==`object`&&t&&`digest`in t&&typeof t.digest==`string`){let e=pt(t.digest);if(e){let i=Ot.get(t);if(i)throw i;let a=Ue(e.location,n),o=a.absoluteURL||a.to;if(Je(e.location,o,Ge(r),`allow-explicit`),Qe(o))throw Error(`Invalid redirect location`);if(He&&!Ot.get(t)){if(a.isExternal||e.reloadDocument)window.location.href=o;else{let n=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(a.to,{replace:e.replace}));throw Ot.set(t,n),n}}return _.createElement(`meta`,{httpEquiv:`refresh`,content:`0;url=${o}`})}}return e}function At({routeContext:e,match:t,children:n}){let r=_.useContext($e);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),_.createElement(ct.Provider,{value:e},n)}function jt(e,t=[],n){let r=n?.state;if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let i=e,a=r?.errors;if(a!=null){let e=i.findIndex(e=>e.route.id&&a?.[e.route.id]!==void 0);E(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(a).join(`,`)}`),i=i.slice(0,Math.min(i.length,e+1))}let o=!1,s=-1;if(n&&r){o=r.renderFallback;for(let e=0;e<i.length;e++){let t=i[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(s=e),t.route.id){let{loaderData:e,errors:a}=r,c=t.route.loader&&!e.hasOwnProperty(t.route.id)&&(!a||a[t.route.id]===void 0);if(t.route.lazy||c){n.isStatic&&(o=!0),i=s>=0?i.slice(0,s+1):[i[0]];break}}}}let c=n?.onError,l=r&&c?(e,t)=>{c(e,{location:r.location,params:r.matches?.[0]?.params??{},pattern:Ve(r.matches),errorInfo:t})}:void 0;return i.reduceRight((e,n,c)=>{let u,d=!1,f=null,p=null;r&&(u=a&&n.route.id?a[n.route.id]:void 0,f=n.route.errorElement||Et,o&&(s<0&&c===0?(Vt(`route-fallback`,!1,"No `HydrateFallback` element provided to render during initial hydration"),d=!0,p=null):s===c&&(d=!0,p=n.route.hydrateFallbackElement||null)));let m=t.concat(i.slice(0,c+1)),h=()=>{let t;return t=u?f:d?p:n.route.Component?_.createElement(n.route.Component,null):n.route.element?n.route.element:e,_.createElement(At,{match:n,routeContext:{outlet:e,matches:m,isDataRoute:r!=null},children:t})};return r&&(n.route.ErrorBoundary||n.route.errorElement||c===0)?_.createElement(Dt,{location:r.location,revalidation:r.revalidation,component:f,error:u,children:h(),routeContext:{outlet:null,matches:m,isDataRoute:!0},onError:l}):h()},null)}function Mt(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Nt(e){let t=_.useContext($e);return E(t,Mt(e)),t}function Pt(e){let t=_.useContext(et);return E(t,Mt(e)),t}function Ft(e){let t=_.useContext(ct);return E(t,Mt(e)),t}function It(e){let t=Ft(e),n=t.matches[t.matches.length-1];return E(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function Lt(){return It(`useRouteId`)}function Rt(){let e=_.useContext(lt),t=Pt(`useRouteError`),n=It(`useRouteError`);return e===void 0?t.errors?.[n]:e}function zt(){let{router:e}=Nt(`useNavigate`),t=It(`useNavigate`),n=_.useRef(!1);return yt(()=>{n.current=!0}),_.useCallback(async(r,i={})=>{D(n.current,vt),n.current&&(typeof r==`number`?await e.navigate(r):await e.navigate(r,{fromRouteId:t,...i}))},[e,t])}var Bt={};function Vt(e,t,n){!t&&!Bt[e]&&(Bt[e]=!0,D(!1,n))}_.memo(Ht);function Ht({routes:e,manifest:t,future:n,state:r,isStatic:i,onError:a}){return wt(e,void 0,{manifest:t,state:r,isStatic:i,onError:a,future:n})}function Ut({to:e,replace:t,state:n,relative:r}){E(gt(),`<Navigate> may be used only in the context of a <Router> component.`);let{static:i,navigator:a}=_.useContext(ot);D(!i,`<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.`);let{matches:o}=_.useContext(ct),{pathname:s}=_t(),c=bt(),l=Me(e,je(o),s,r===`path`);Je(typeof e==`string`?e:oe(e),a.createHref(l),Ge(a),`reject`);let u=JSON.stringify(l);return _.useEffect(()=>{c(JSON.parse(u),{replace:t,state:n,relative:r})},[c,u,r,t,n]),null}function Wt(e){E(!1,`A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`)}function Gt({basename:e=`/`,children:t=null,location:n,navigationType:r=`POP`,navigator:i,static:a=!1,useTransitions:o}){E(!gt(),`You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`);let s=e.replace(/^\/*/,`/`),c=_.useMemo(()=>({basename:s,navigator:i,static:a,useTransitions:o,future:{}}),[s,i,a,o]);typeof n==`string`&&(n=O(n));let{pathname:l=`/`,search:u=``,hash:d=``,state:f=null,key:p=`default`,mask:m}=n,h=_.useMemo(()=>{let e=j(l,s);return e==null?null:{location:{pathname:e,search:u,hash:d,state:f,key:p,mask:m},navigationType:r}},[s,l,u,d,f,p,r,m]);return D(h!=null,`<Router basename="${s}"> is not able to match the URL "${l}${u}${d}" because it does not start with the basename, so the <Router> won't render anything.`),h==null?null:_.createElement(ot.Provider,{value:c},_.createElement(st.Provider,{children:t,value:h}))}function Kt({children:e,location:t}){return Ct(qt(e),t)}_.Component;function qt(e,t=[]){let n=[];return _.Children.forEach(e,(e,r)=>{if(!_.isValidElement(e))return;let i=[...t,r];if(e.type===_.Fragment){n.push.apply(n,qt(e.props.children,i));return}E(e.type===Wt,`[${typeof e.type==`string`?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),E(!e.props.index||!e.props.children,`An index route cannot have child routes.`);let a={id:e.props.id||i.join(`-`),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,middleware:e.props.middleware,loader:e.props.loader,action:e.props.action,hydrateFallbackElement:e.props.hydrateFallbackElement,HydrateFallback:e.props.HydrateFallback,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:e.props.hasErrorBoundary===!0||e.props.ErrorBoundary!=null||e.props.errorElement!=null,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(a.children=qt(e.props.children,i)),n.push(a)}),n}var Jt=`get`,Yt=`application/x-www-form-urlencoded`;function Xt(e){return typeof HTMLElement<`u`&&e instanceof HTMLElement}function Zt(e){return Xt(e)&&e.tagName.toLowerCase()===`button`}function Qt(e){return Xt(e)&&e.tagName.toLowerCase()===`form`}function M(e){return Xt(e)&&e.tagName.toLowerCase()===`input`}function $t(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function en(e,t){return e.button===0&&(!t||t===`_self`)&&!$t(e)}var tn=null;function nn(){if(tn===null)try{new FormData(document.createElement(`form`),0),tn=!1}catch{tn=!0}return tn}var rn=new Set([`application/x-www-form-urlencoded`,`multipart/form-data`,`text/plain`]);function an(e){return e!=null&&!rn.has(e)?(D(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Yt}"`),null):e}function on(e,t){let n,r,i,a,o;if(Qt(e)){let o=e.getAttribute(`action`);r=o?j(o,t):null,n=e.getAttribute(`method`)||Jt,i=an(e.getAttribute(`enctype`))||Yt,a=new FormData(e)}else if(Zt(e)||M(e)&&(e.type===`submit`||e.type===`image`)){let o=e.form;if(o==null)throw Error(`Cannot submit a <button> or <input type="submit"> without a <form>`);let s=e.getAttribute(`formaction`)||o.getAttribute(`action`);if(r=s?j(s,t):null,n=e.getAttribute(`formmethod`)||o.getAttribute(`method`)||Jt,i=an(e.getAttribute(`formenctype`))||an(o.getAttribute(`enctype`))||Yt,a=new FormData(o,e),!nn()){let{name:t,type:n,value:r}=e;if(n===`image`){let e=t?`${t}.`:``;a.append(`${e}x`,`0`),a.append(`${e}y`,`0`)}else t&&a.append(t,r)}}else if(Xt(e))throw Error(`Cannot submit element that is not <form>, <button>, or <input type="submit|image">`);else n=Jt,r=null,i=Yt,o=e;return a&&i===`text/plain`&&(o=a,a=void 0),{action:r,method:n.toLowerCase(),encType:i,formData:a,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);function sn(e,t){if(e===!1||e==null)throw Error(t)}function cn(e,t,n,r){let i=typeof e==`string`?new URL(e,typeof window>`u`?`server://singlefetch/`:window.location.origin):e;return i.pathname=n?i.pathname.endsWith(`/`)?`${i.pathname}_.${r}`:`${i.pathname}.${r}`:i.pathname===`/`?`_root.${r}`:t&&j(i.pathname,t)===`/`?`${Fe(t)}/_root.${r}`:`${Fe(i.pathname)}.${r}`,i}async function ln(e,t){if(e.id in t)return t[e.id];try{let n=await S(()=>import(e.module),[]);return t[e.id]=n,n}catch(t){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(t),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function un(e){return e!=null&&typeof e.page==`string`}function dn(e){return e==null?!1:e.href==null?e.rel===`preload`&&typeof e.imageSrcSet==`string`&&typeof e.imageSizes==`string`:typeof e.rel==`string`&&typeof e.href==`string`}async function fn(e,t,n){return _n((await Promise.all(e.map(async e=>{let r=t.routes[e.route.id];if(r){let e=await ln(r,n);return e.links?e.links():[]}return[]}))).flat(1).filter(dn).filter(e=>e.rel===`stylesheet`||e.rel===`preload`).map(e=>e.rel===`stylesheet`?{...e,rel:`prefetch`,as:`style`}:{...e,rel:`prefetch`}))}function pn(e,t,n,r,i,a){let o=(e,t)=>!n[t]||e.route.id!==n[t].route.id,s=(e,t)=>n[t].pathname!==e.pathname||n[t].route.path?.endsWith(`*`)&&n[t].params[`*`]!==e.params[`*`];return a===`assets`?t.filter((e,t)=>o(e,t)||s(e,t)):a===`data`?t.filter((t,a)=>{let c=r.routes[t.route.id];if(!c||!c.hasLoader)return!1;if(o(t,a)||s(t,a))return!0;if(t.route.shouldRevalidate){let r=t.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:t.params,defaultShouldRevalidate:!0});if(typeof r==`boolean`)return r}return!0}):[]}function mn(e,t,{includeHydrateFallback:n}={}){return hn(e.map(e=>{let r=t.routes[e.route.id];if(!r)return[];let i=[r.module];return r.clientActionModule&&(i=i.concat(r.clientActionModule)),r.clientLoaderModule&&(i=i.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(i=i.concat(r.hydrateFallbackModule)),r.imports&&(i=i.concat(r.imports)),i}).flat(1))}function hn(e){return[...new Set(e)]}function gn(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function _n(e,t){let n=new Set,r=new Set(t);return e.reduce((e,i)=>{if(t&&!un(i)&&i.as===`script`&&i.href&&r.has(i.href))return e;let a=JSON.stringify(gn(i));return n.has(a)||(n.add(a),e.push({key:a,link:i})),e},[])}function vn(){let e=_.useContext($e);return sn(e,`You must render this element inside a <DataRouterContext.Provider> element`),e}function yn(){let e=_.useContext(et);return sn(e,`You must render this element inside a <DataRouterStateContext.Provider> element`),e}var bn=_.createContext(void 0);bn.displayName=`FrameworkContext`;function xn(){let e=_.useContext(bn);return sn(e,`You must render this element inside a <HydratedRouter> element`),e}function Sn(e,t){let n=_.useContext(bn),[r,i]=_.useState(!1),[a,o]=_.useState(!1),{onFocus:s,onBlur:c,onMouseEnter:l,onMouseLeave:u,onTouchStart:d}=t,f=_.useRef(null);_.useEffect(()=>{if(e===`render`&&o(!0),e===`viewport`){let e=new IntersectionObserver(e=>{e.forEach(e=>{o(e.isIntersecting)})},{threshold:.5});return f.current&&e.observe(f.current),()=>{e.disconnect()}}},[e]),_.useEffect(()=>{if(r){let e=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(e)}}},[r]);let p=()=>{i(!0)},m=()=>{i(!1),o(!1)};return n?e===`intent`?[a,f,{onFocus:Cn(s,p),onBlur:Cn(c,m),onMouseEnter:Cn(l,p),onMouseLeave:Cn(u,m),onTouchStart:Cn(d,p)}]:[a,f,{}]:[!1,f,{}]}function Cn(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function wn({page:e,...t}){let n=nt(),{nonce:r}=xn(),{router:i}=vn(),a=_.useMemo(()=>le(i.routes,e,i.basename),[i.routes,e,i.basename]);return a?(t.nonce==null&&r&&(t={...t,nonce:r}),n?_.createElement(En,{page:e,matches:a,...t}):_.createElement(Dn,{page:e,matches:a,...t})):null}function Tn(e){let{manifest:t,routeModules:n}=xn(),[r,i]=_.useState([]);return _.useEffect(()=>{let r=!1;return fn(e,t,n).then(e=>{r||i(e)}),()=>{r=!0}},[e,t,n]),r}function En({page:e,matches:t,...n}){let r=_t(),{future:i}=xn(),{basename:a}=vn(),o=_.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=cn(e,a,i.v8_trailingSlashAwareDataRequests,`rsc`),o=!1,s=[];for(let e of t)typeof e.route.shouldRevalidate==`function`?o=!0:s.push(e.route.id);return o&&s.length>0&&n.searchParams.set(`_routes`,s.join(`,`)),[n.pathname+n.search]},[a,i.v8_trailingSlashAwareDataRequests,e,r,t]);return _.createElement(_.Fragment,null,o.map(e=>_.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})))}function Dn({page:e,matches:t,...n}){let r=_t(),{future:i,manifest:a,routeModules:o}=xn(),{basename:s}=vn(),{loaderData:c,matches:l}=yn(),u=_.useMemo(()=>pn(e,t,l,a,r,`data`),[e,t,l,a,r]),d=_.useMemo(()=>pn(e,t,l,a,r,`assets`),[e,t,l,a,r]),f=_.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=new Set,l=!1;if(t.forEach(e=>{let t=a.routes[e.route.id];t&&t.hasLoader&&(!u.some(t=>t.route.id===e.route.id)&&e.route.id in c&&o[e.route.id]?.shouldRevalidate||t.hasClientLoader?l=!0:n.add(e.route.id))}),n.size===0)return[];let d=cn(e,s,i.v8_trailingSlashAwareDataRequests,`data`);return l&&n.size>0&&d.searchParams.set(`_routes`,t.filter(e=>n.has(e.route.id)).map(e=>e.route.id).join(`,`)),[d.pathname+d.search]},[s,i.v8_trailingSlashAwareDataRequests,c,r,a,u,t,e,o]),p=_.useMemo(()=>mn(d,a),[d,a]),m=Tn(d);return _.createElement(_.Fragment,null,f.map(e=>_.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})),p.map(e=>_.createElement(`link`,{key:e,rel:`modulepreload`,href:e,...n})),m.map(({key:e,link:t})=>_.createElement(`link`,{key:e,nonce:n.nonce,...t,crossOrigin:t.crossOrigin??n.crossOrigin})))}function On(...e){return t=>{e.forEach(e=>{typeof e==`function`?e(t):e!=null&&(e.current=t)})}}_.Component;var kn=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;try{kn&&(window.__reactRouterVersion=`7.18.4`)}catch{}function An({basename:e,children:t,useTransitions:n,window:r}){let i=_.useRef();i.current??=ne({window:r,v5Compat:!0});let a=i.current,[o,s]=_.useState({action:a.action,location:a.location}),c=_.useCallback(e=>{n===!1?s(e):_.startTransition(()=>s(e))},[n]);return _.useLayoutEffect(()=>a.listen(c),[a,c]),_.createElement(Gt,{basename:e,children:t,location:o.location,navigationType:o.action,navigator:a,useTransitions:n})}var jn=_.forwardRef(function({onClick:e,discover:t=`render`,prefetch:n=`none`,relative:r,reloadDocument:i,replace:a,mask:o,state:s,target:c,to:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m){let{basename:h,navigator:g,useTransitions:v}=_.useContext(ot),y=typeof l==`string`&&ee.test(l),b=Ue(l,h);l=b.to;let x=ht(l,{relative:r}),S=_t(),C=null;if(o){let e=Me(o,[],S.mask?S.mask.pathname:`/`,!0);h!==`/`&&(e.pathname=e.pathname===`/`?h:Pe([h,e.pathname])),C=g.createHref(e)}let[w,te,T]=Sn(n,p),ne=In(l,{replace:a,mask:o,state:s,target:c,preventScrollReset:u,relative:r,viewTransition:d,defaultShouldRevalidate:f,useTransitions:v});function E(t){e&&e(t),t.defaultPrevented||ne(t)}let D=!(b.isExternal||i),re=_.createElement(`a`,{...p,...T,href:(D?C:void 0)||b.absoluteURL||x,onClick:D?E:e,ref:On(m,te),target:c,"data-discover":!y&&t===`render`?`true`:void 0});return w&&!y?_.createElement(_.Fragment,null,re,_.createElement(wn,{page:x})):re});jn.displayName=`Link`;var Mn=_.forwardRef(function({"aria-current":e=`page`,caseSensitive:t=!1,className:n=``,end:r=!1,style:i,to:a,viewTransition:o,children:s,...c},l){let u=St(a,{relative:c.relative}),d=_t(),f=_.useContext(et),{navigator:p,basename:m}=_.useContext(ot),h=f!=null&&Vn(u)&&o===!0,g=p.encodeLocation?p.encodeLocation(u).pathname:u.pathname,v=d.pathname,y=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;t||(v=v.toLowerCase(),y=y?y.toLowerCase():null,g=g.toLowerCase()),y&&m&&(y=j(y,m)||y);let b=g!==`/`&&g.endsWith(`/`)?g.length-1:g.length,x=v===g||!r&&v.startsWith(g)&&v.charAt(b)===`/`,S=y!=null&&(y===g||!r&&y.startsWith(g)&&y.charAt(g.length)===`/`),ee={isActive:x,isPending:S,isTransitioning:h},C=x?e:void 0,w;w=typeof n==`function`?n(ee):[n,x?`active`:null,S?`pending`:null,h?`transitioning`:null].filter(Boolean).join(` `);let te=typeof i==`function`?i(ee):i;return _.createElement(jn,{...c,"aria-current":C,className:w,ref:l,style:te,to:a,viewTransition:o},typeof s==`function`?s(ee):s)});Mn.displayName=`NavLink`;var Nn=_.forwardRef(({discover:e=`render`,fetcherKey:t,navigate:n,reloadDocument:r,replace:i,state:a,method:o=Jt,action:s,onSubmit:c,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m)=>{let{useTransitions:h}=_.useContext(ot),g=zn(),v=Bn(s,{relative:l}),y=o.toLowerCase()===`get`?`get`:`post`,b=typeof s==`string`&&ee.test(s);return _.createElement(`form`,{ref:m,method:y,action:v,onSubmit:r?c:e=>{if(c&&c(e),e.defaultPrevented)return;e.preventDefault();let r=e.nativeEvent.submitter,s=r?.getAttribute(`formmethod`)||o,p=()=>g(r||e.currentTarget,{fetcherKey:t,method:s,navigate:n,replace:i,state:a,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f});h&&n!==!1?_.startTransition(()=>p()):p()},...p,"data-discover":!b&&e===`render`?`true`:void 0})});Nn.displayName=`Form`;function Pn(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Fn(e){let t=_.useContext($e);return E(t,Pn(e)),t}function In(e,{target:t,replace:n,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c,useTransitions:l}={}){let u=bt(),d=_t(),f=St(e,{relative:o});return _.useCallback(p=>{if(en(p,t)){p.preventDefault();let t=n===void 0?oe(d)===oe(f):n,m=()=>u(e,{replace:t,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c});l?_.startTransition(()=>m()):m()}},[d,u,f,n,r,i,t,e,a,o,s,c,l])}var Ln=0,Rn=()=>`__${String(++Ln)}__`;function zn(){let{router:e}=Fn(`useSubmit`),{basename:t}=_.useContext(ot),n=Lt(),r=e.fetch,i=e.navigate;return _.useCallback(async(e,a={})=>{let{action:o,method:s,encType:c,formData:l,body:u}=on(e,t);if(a.navigate===!1){let e=a.fetcherKey||Rn();await r(e,n,a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,flushSync:a.flushSync})}else await i(a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,replace:a.replace,state:a.state,fromRouteId:n,flushSync:a.flushSync,viewTransition:a.viewTransition})},[r,i,t,n])}function Bn(e,{relative:t}={}){let{basename:n}=_.useContext(ot),r=_.useContext(ct);E(r,`useFormAction must be used inside a RouteContext`);let[i]=r.matches.slice(-1),a={...St(e||`.`,{relative:t})},o=_t();if(e==null){a.search=o.search;let e=new URLSearchParams(a.search),t=e.getAll(`index`);if(t.some(e=>e===``)){e.delete(`index`),t.filter(e=>e).forEach(t=>e.append(`index`,t));let n=e.toString();a.search=n?`?${n}`:``}}return(!e||e===`.`)&&i.route.index&&(a.search=a.search?a.search.replace(/^\?/,`?index&`):`?index`),n!==`/`&&(a.pathname=a.pathname===`/`?n:Pe([n,a.pathname])),oe(a)}function Vn(e,{relative:t}={}){let n=_.useContext(rt);E(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=Fn(`useViewTransitionState`),i=St(e,{relative:t});if(!n.isTransitioning)return!1;let a=j(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=j(n.nextLocation.pathname,r)||n.nextLocation.pathname;return Ce(i.pathname,o)!=null||Ce(i.pathname,a)!=null}var Hn=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),N=o(((e,t)=>{t.exports=Hn()}))(),Un=()=>{sessionStorage.clear(),localStorage.removeItem(`isAdminLoggedIn`),window.location.replace(`/admin/login`)};function Wn(){let e=bt(),t=_t();return(0,N.jsxs)(`aside`,{className:`admin-sidebar`,children:[(0,N.jsxs)(`div`,{className:`sidebar-brand`,children:[(0,N.jsx)(`div`,{className:`brand-icon`,children:`🎓`}),(0,N.jsxs)(`div`,{children:[(0,N.jsxs)(`h1`,{children:[`Student`,(0,N.jsx)(`span`,{children:`College`})]}),(0,N.jsx)(`p`,{children:`Admission Platform`})]})]}),(0,N.jsxs)(`div`,{className:`sidebar-menu`,children:[(0,N.jsx)(`p`,{className:`menu-title`,children:`MAIN MENU`}),[[`Dashboard`,`⌂`,`/admin/dashboard`],[`Students`,`♙`,`/admin/students`],[`Colleges`,`▥`,`/admin/colleges`],[`Courses`,`▤`,`/admin/courses`],[`Leads`,`★`,`/admin/leads`],[`Applications`,`▣`,`/admin/applications`],[`Transactions`,`₹`,`/admin/transactions`],[`Reports`,`▥`,`/admin/reports`],[`Notifications`,`♢`,`/admin/notifications`],[`Users`,`♙`,`/admin/users`],[`Settings`,`⚙`,`/admin/settings`]].map(([n,r,i])=>(0,N.jsxs)(`button`,{className:`sidebar-item ${t.pathname===i?`active`:``}`,onClick:()=>{if(n===`Dashboard`){e(`/admin/dashboard`);return}e(i)},children:[(0,N.jsx)(`span`,{className:`sidebar-icon`,children:r}),(0,N.jsx)(`span`,{children:n}),n===`Leads`&&(0,N.jsx)(`span`,{className:`lead-star`,children:`★`})]},n))]}),(0,N.jsxs)(`div`,{className:`sidebar-bottom`,children:[(0,N.jsxs)(`div`,{className:`sidebar-admin-card`,children:[(0,N.jsx)(`div`,{className:`sidebar-avatar`,children:`A`}),(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`strong`,{children:`Admin`}),(0,N.jsx)(`span`,{children:`Super Admin`})]})]}),(0,N.jsxs)(`button`,{className:`logout-button`,onClick:Un,children:[`↪ `,(0,N.jsx)(`span`,{children:`Logout`})]})]})]})}var Gn=[{id:`STU10928`,name:`Keerthana`,email:`keerthana@gmail.com`,phone:`+91 98765 43210`,college:`ABC Engineering College`,course:`B.Tech CSE`,applications:3,status:`Active`,registered:`29 Sep 2026`,dob:`15 May 2005`,gender:`Female`,address:`12, Anna Nagar`,city:`Chennai`,leadStatus:`Purchased`,purchasedBy:`ABC Engineering College`,leadPrice:`₹100`,applicationList:[{college:`ABC Engineering College`,course:`B.Tech CSE`,status:`Accepted`},{college:`PSG College`,course:`B.Tech CSE`,status:`Pending`}]},{id:`STU10927`,name:`Rahul K`,email:`rahulk@gmail.com`,phone:`+91 98765 12345`,college:`PSG College`,course:`B.Tech Mechanical`,applications:2,status:`Active`,registered:`29 Sep 2026`,dob:`10 March 2004`,gender:`Male`,address:`45, RS Puram`,city:`Coimbatore`,leadStatus:`Purchased`,purchasedBy:`PSG College`,leadPrice:`₹100`,applicationList:[{college:`PSG College`,course:`B.Tech Mechanical`,status:`Pending`},{college:`City College`,course:`B.Tech Mechanical`,status:`Rejected`}]},{id:`STU10926`,name:`Ananya R`,email:`ananya@gmail.com`,phone:`+91 98765 11111`,college:`City College`,course:`BCA`,applications:4,status:`Active`,registered:`28 Sep 2026`,dob:`21 July 2005`,gender:`Female`,address:`23, MG Road`,city:`Bangalore`,leadStatus:`Converted`,purchasedBy:`City College`,leadPrice:`₹100`,applicationList:[{college:`City College`,course:`BCA`,status:`Accepted`},{college:`ABC Engineering College`,course:`BCA`,status:`Accepted`}]},{id:`STU10925`,name:`Arjun P`,email:`arjunp@gmail.com`,phone:`+91 98765 22222`,college:`St. Joseph's College`,course:`B.Com`,applications:1,status:`Active`,registered:`28 Sep 2026`,dob:`18 January 2005`,gender:`Male`,address:`8, Church Street`,city:`Chennai`,leadStatus:`New`,purchasedBy:`—`,leadPrice:`₹100`,applicationList:[{college:`St. Joseph's College`,course:`B.Com`,status:`Pending`}]},{id:`STU10924`,name:`Sneha M`,email:`sneham@gmail.com`,phone:`+91 98765 33333`,college:`Medical College`,course:`B.Sc Nursing`,applications:2,status:`Blocked`,registered:`27 Sep 2026`,dob:`05 February 2005`,gender:`Female`,address:`19, Lake View`,city:`Madurai`,leadStatus:`Invalid`,purchasedBy:`Medical College`,leadPrice:`₹100`,applicationList:[{college:`Medical College`,course:`B.Sc Nursing`,status:`Rejected`}]},{id:`STU10923`,name:`Vignesh S`,email:`vignesh@gmail.com`,phone:`+91 98765 44444`,college:`Kongu College`,course:`B.Tech IT`,applications:2,status:`Active`,registered:`27 Sep 2026`,dob:`12 June 2004`,gender:`Male`,address:`22, Gandhi Road`,city:`Erode`,leadStatus:`Purchased`,purchasedBy:`Kongu College`,leadPrice:`₹100`,applicationList:[{college:`Kongu College`,course:`B.Tech IT`,status:`Accepted`}]}],Kn=Array.from({length:44},(e,t)=>{let n=10922-t,r=[`Karthik S`,`Priya V`,`Mohamed A`,`Divya K`,`Harish R`,`Nithya P`,`Santhosh M`,`Swetha R`,`Dinesh K`,`Pavithra S`,`Lokesh B`],i=[`ABC Engineering College`,`PSG College`,`City College`,`Kongu College`,`St. Joseph's College`,`Medical College`,`XYZ Institute of Technology`],a=[`B.Tech CSE`,`B.Tech Mechanical`,`BCA`,`B.Com`,`B.Sc Nursing`,`B.Tech IT`,`BBA`],o=r[t%r.length],s=[`Priya V`,`Divya K`,`Nithya P`,`Swetha R`,`Pavithra S`],c=i[t%i.length],l=a[t%a.length],u=t%11==0;return{id:`STU${n}`,name:o,email:`${o.toLowerCase().replace(/\s+/g,``)}@gmail.com`,phone:`+91 98765 ${String(5e4+t).slice(-5)}`,college:c,course:l,applications:t%4+1,status:u?`Blocked`:`Active`,registered:`${27-t%20} Sep 2026`,dob:`${String(t%27+1).padStart(2,`0`)} ${[`January`,`February`,`March`,`April`,`May`,`June`,`July`][t%7]} 2005`,gender:s.includes(o)?`Female`:`Male`,address:`${t+10}, Main Road`,city:[`Chennai`,`Coimbatore`,`Bangalore`,`Madurai`,`Erode`][t%5],leadStatus:[`New`,`Purchased`,`Converted`,`Invalid`][t%4],purchasedBy:t%4==0?`—`:c,leadPrice:`₹100`,applicationList:[{college:c,course:l,status:t%3==0?`Accepted`:t%3==1?`Pending`:`Rejected`}]}});Gn.push(...Kn),Gn.forEach((e,t)=>{let n={Tamil:78+t%17,English:81+t%15,Mathematics:84+t%13,Science:79+t%16,SocialScience:82+t%14};n.Total=Object.values(n).reduce((e,t)=>e+t,0),n.Percentage=(n.Total/5).toFixed(2);let r=t%11,i={English:78+(r+2)%18,Physics:72+(r+5)%23,Chemistry:74+(r+3)%22,Mathematics:76+(r+7)%21,ComputerScience:80+(r+1)%18,Biology:75+(r+4)%20,Accountancy:77+(r+6)%19,Economics:79+(r+8)%17,Commerce:81+(r+9)%16},a=e.course.includes(`Nursing`)?[`English`,`Physics`,`Chemistry`,`Mathematics`,`Biology`]:e.course.includes(`CSE`)||e.course.includes(`IT`)||e.course.includes(`Mechanical`)?[`English`,`Physics`,`Chemistry`,`Mathematics`,`ComputerScience`]:e.course.includes(`B.Com`)||e.course.includes(`BBA`)?[`English`,`Accountancy`,`Economics`,`Commerce`,`Mathematics`]:[`English`,`Physics`,`Chemistry`,`Mathematics`,`ComputerScience`];i.Total=a.reduce((e,t)=>e+i[t],0),i.Percentage=(i.Total/a.length).toFixed(2),i.Subjects=a;let o=[`B.Tech CSE`,`B.Tech IT`,`B.Tech Mechanical`].includes(e.course)?((i.Mathematics+i.Physics+i.Chemistry)/2).toFixed(2):((i.Mathematics+i.English)/2).toFixed(2);e.tenthMarks=n,e.twelfthMarks=i,e.cutoff=o});function qn(){let[e,t]=(0,_.useState)(Gn),[n,r]=(0,_.useState)(null),[i,a]=(0,_.useState)(``),[o,s]=(0,_.useState)(`All Status`),[c,l]=(0,_.useState)(`All Courses`),[u,d]=(0,_.useState)(1),[f,p]=(0,_.useState)(null),[m,h]=(0,_.useState)(null),[g,v]=(0,_.useState)(null),[y,b]=(0,_.useState)(!1),x=[`All Courses`,...new Set(e.map(e=>e.course))],S=e.filter(e=>{let t=i.trim().toLowerCase(),n=!t||e.name?.toLowerCase().includes(t)||e.id?.toLowerCase().includes(t)||e.email?.toLowerCase().includes(t)||e.phone?.toLowerCase().includes(t)||e.college?.toLowerCase().includes(t)||e.course?.toLowerCase().includes(t)||e.status?.toLowerCase().includes(t)||e.city?.toLowerCase().includes(t)||e.leadStatus?.toLowerCase().includes(t),r=o===`All Status`||e.status===o,a=c===`All Courses`||e.course===c;return n&&r&&a}),ee=Math.ceil(S.length/5),C=(u-1)*5,w=S.slice(C,C+5),te=e=>{a(e),d(1)},T=e=>{s(e),d(1)},ne=e=>{l(e),d(1)},E=e=>{v(null),r(e),window.scrollTo({top:0,behavior:`smooth`})},D=()=>{r(null)},re=e=>{switch(e){case`Active`:return`status-active`;case`Blocked`:return`status-blocked`;case`Accepted`:return`status-accepted`;case`Pending`:return`status-pending`;case`Rejected`:return`status-rejected`;default:return``}};return(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(`style`,{children:`

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
          background: #f4f7fb;
          color: #17345d;
        }

        button,
        input,
        select {
          font-family: inherit;
        }

        .student-page {
          min-height: 100vh;
          background: #f4f7fb;
        }

        .app-shell {
          min-height: 100vh;
          display: flex;
          width: 100%;
        }

        .admin-sidebar {
          width: 236px;
          min-width: 236px;
          height: 100vh;
          position: sticky;
          top: 0;
          display: flex;
          flex-direction: column;
          background: #112746;
          color: #fff;
          z-index: 50;
        }

        .sidebar-brand {
          height: 82px;
          padding: 0 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 1px solid rgba(255,255,255,.07);
          flex-shrink: 0;
        }

        .brand-icon {
          width: 40px;
          height: 40px;
          border-radius: 11px;
          background: rgba(255,255,255,.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .sidebar-brand h1 { margin: 0; font-size: 16px; line-height: 1.2; color: #fff; }
        .sidebar-brand h1 span { color: #58a1ff; }
        .sidebar-brand p { margin: 3px 0 0; color: #91a5c2; font-size: 9px; }
        .sidebar-menu { flex: 1; padding: 24px 12px; overflow-y: auto; }
        .menu-title { margin: 0 12px 10px; color: #6f86a7; font-size: 9px; font-weight: 700; letter-spacing: 1px; }
        .sidebar-item { width: 100%; height: 43px; margin-bottom: 4px; padding: 0 13px; border: 0; border-radius: 8px; background: transparent; color: #afbdd1; display: flex; align-items: center; gap: 12px; text-align: left; cursor: pointer; font-size: 12px; }
        .sidebar-item:hover { color: #fff; background: rgba(255,255,255,.07); }
        .sidebar-item.active { color: #fff; background: #2177e8; box-shadow: 0 6px 18px rgba(33,119,232,.2); }
        .sidebar-icon { width: 20px; text-align: center; font-size: 16px; }
        .lead-star { margin-left: auto; color: #f4c44f; font-size: 10px; }
        .sidebar-bottom { padding: 14px; border-top: 1px solid rgba(255,255,255,.07); flex-shrink: 0; }
        .sidebar-admin-card { display: flex; align-items: center; gap: 10px; padding: 12px; border-radius: 10px; background: rgba(255,255,255,.055); }
        .sidebar-avatar { width: 34px; height: 34px; border-radius: 50%; background: #28558e; color: #fff; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:700; }
        .sidebar-admin-card strong { display:block; color:#fff; font-size:12px; }
        .sidebar-admin-card span { display:block; margin-top:2px; color:#8196b5; font-size:9px; }
        .logout-button { width:100%; margin-top:8px; height:34px; border:0; border-radius:8px; background:transparent; color:#93a6c0; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; font-size:11px; }
        .logout-button:hover { color:#fff; background:rgba(255,255,255,.07); }

        .student-main-area {
          flex: 1;
          min-width: 0;
          min-height: 100vh;
          background: #f4f7fb;
        }


        /* ==============================
           TOP NAVBAR
        ============================== */

        .top-navbar {
          height: 64px;
          background: #ffffff;
          border-bottom: 1px solid #e7edf5;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 28px;
          position: sticky;
          top: 0;
          z-index: 20;
        }

        .search-box {
          width: 300px;
          height: 38px;
          background: #f4f7fb;
          border-radius: 8px;
          display: flex;
          align-items: center;
          padding: 0 13px;
          color: #91a0b5;
        }

        .search-box span {
          font-size: 14px;
          margin-right: 10px;
        }

        .search-box input {
          width: 100%;
          border: none;
          outline: none;
          background: transparent;
          color: #17345d;
          font-size: 12px;
        }

        .search-box input::placeholder {
          color: #91a0b5;
        }

        .admin-area {
          display: flex;
          align-items: center;
          gap: 13px;
          position: relative;
        }

        .admin-profile-toggle {
          display: flex;
          align-items: center;
          gap: 10px;
          border: 0;
          background: transparent;
          cursor: pointer;
          padding: 6px;
          border-radius: 8px;
          font-family: inherit;
        }

        .admin-profile-toggle:hover {
          background: #f4f7fb;
        }

        .admin-dropdown {
          position: absolute;
          top: 48px;
          right: 0;
          width: 150px;
          background: #ffffff;
          border: 1px solid #e3eaf2;
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(23, 52, 93, 0.15);
          padding: 6px;
          z-index: 100;
        }

        .admin-dropdown button {
          width: 100%;
          padding: 10px 12px;
          border: 0;
          border-radius: 6px;
          background: transparent;
          color: #d94848;
          text-align: left;
          font-size: 12px;
          cursor: pointer;
        }

        .admin-dropdown button:hover {
          background: #fff1f1;
        }

        .notification {
          width: 34px;
          height: 34px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          color: #526984;
        }

        .notification-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ef5350;
          top: 7px;
          right: 7px;
        }

        .admin-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #173f70;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
        }

        .admin-info {
          line-height: 1.2;
        }

        .admin-name {
          font-size: 12px;
          font-weight: 700;
          color: #18375d;
        }

        .admin-role {
          font-size: 9px;
          color: #93a1b4;
          margin-top: 3px;
        }

        .admin-arrow {
          font-size: 10px;
          color: #75869d;
        }

        /* ==============================
           PAGE
        ============================== */

        .student-content {
          width: 100%;
          max-width: none;
          margin: 0;
          padding: 30px 28px 50px;
        }

        .page-heading {
          margin-bottom: 22px;
        }

        .page-heading h1 {
          margin: 0;
          color: #17375f;
          font-size: 26px;
          font-weight: 700;
        }

        .page-heading p {
          margin: 8px 0 0;
          color: #8091a8;
          font-size: 13px;
        }

        /* ==============================
           FILTER BAR
        ============================== */

        .filter-card {
          background: #ffffff;
          border: 1px solid #e4ebf3;
          border-radius: 9px;
          padding: 13px;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
        }

     
.filter-search {
  flex: 1;
  min-width: 0;
  height: 42px;
  border: 1px solid #dce5f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 14px;
  background: #ffffff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.filter-search:focus-within {
  border-color: #287ddd;
  box-shadow: 0 0 0 3px rgba(40, 125, 221, 0.10);
}

.filter-search-icon {
  color: #8a9bb1;
  margin-right: 12px;
  font-size: 15px;
  flex-shrink: 0;
}

.filter-search input {
  flex: 1;
  min-width: 0;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent !important;
  box-shadow: none;
  font-size: 14px;
  color: #17375f;
  -webkit-text-fill-color: #17375f;
}

.filter-search input::placeholder {
  color: #9aa9bb;
  opacity: 1;
}


        .filter-select {
          height: 38px;
          min-width: 125px;
          padding: 0 10px;
          border: 1px solid #e3eaf2;
          border-radius: 7px;
          background: #fff;
          color: #60748d;
          font-size: 13px;
          outline: none;
          cursor: pointer;
        }

        .refresh-btn {
          height: 38px;
          width: 40px;
          border: 1px solid #e3eaf2;
          border-radius: 7px;
          background: #ffffff;
          color: #6f839c;
          cursor: pointer;
          font-size: 14px;
        }

        .refresh-btn:hover {
          background: #f4f8fc;
        }

        /* ==============================
           STAT CARDS
        ============================== */

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 18px;
        }

        .stat-card {
          background: #ffffff;
          border: 1px solid #e3eaf2;
          border-radius: 9px;
          padding: 17px 18px;
          min-height: 105px;
        }

        .stat-title {
          color: #8192a8;
          font-size: 10px;
          margin-bottom: 9px;
        }

        .stat-number {
          font-size: 26px;
          color: #17375f;
          font-weight: 700;
        }

        .stat-sub {
          margin-top: 6px;
          font-size: 9px;
          color: #8a9aae;
        }

        .stat-sub span {
          color: #20ad79;
          font-weight: 600;
        }

        /* ==============================
           TABLE
        ============================== */

        .table-card {
          background: #ffffff;
          border: 1px solid #e2e9f2;
          border-radius: 9px;
          overflow: hidden;
        }

        .table-header {
          padding: 18px 18px 13px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .table-title h2 {
          margin: 0;
          color: #17375f;
          font-size: 14px;
        }

        .table-title p {
          margin: 5px 0 0;
          color: #91a0b3;
          font-size: 9px;
        }

        .student-count {
          font-size: 10px;
          color: #7d8fa7;
        }

        .table-wrapper {
          width: 100%;
          overflow-x: auto;
        }

        .student-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 850px;
        }

        .student-table thead {
          background: #f6f8fb;
        }

        .student-table th {
          padding: 12px 14px;
          text-align: left;
          color: #71859e;
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
        }

        .student-table td {
          padding: 14px;
          border-top: 1px solid #edf1f5;
          font-size: 12px;
          color: #526b87;
          vertical-align: middle;
        }

        .student-table tbody tr:hover {
          background: #fafcff;
        }

        .number-cell {
          width: 35px;
          color: #8797aa !important;
        }

        .student-name {
          display: flex;
          align-items: center;
          gap: 9px;
          min-width: 145px;
        }

        .student-avatar {
          width: 31px;
          height: 31px;
          border-radius: 50%;
          background: #edf4ff;
          color: #2879db;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 700;
          flex-shrink: 0;
        }

        .student-name strong {
          display: block;
          color: #29496e;
          font-size: 12px;
        }

        .student-id {
          display: block;
          margin-top: 3px;
          color: #9aa8b9;
          font-size: 10px;
        }

        .application-number {
          text-align: center;
          font-weight: 700;
          color: #345675 !important;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 6px 10px;
          border-radius: 14px;
          font-size: 8px;
          font-weight: 700;
          white-space: nowrap;
        }

        .status-active {
          background: #e5f8f0;
          color: #13a66e;
        }

        .status-blocked {
          background: #ffeaec;
          color: #e34e5c;
        }

        .status-accepted {
          background: #e5f8f0;
          color: #13a66e;
        }

        .status-pending {
          background: #fff3d9;
          color: #e7a322;
        }

        .status-rejected {
          background: #ffe8eb;
          color: #e14e5b;
        }

        .action-buttons {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .action-btn {
          width: 29px;
          height: 29px;
          border-radius: 6px;
          border: 1px solid #e1e8f0;
          background: #ffffff;
          color: #627890;
          cursor: pointer;
          font-size: 11px;
        }

        .action-btn:hover {
          background: #edf5ff;
          color: #2678d7;
          border-color: #cfe2f9;
        }

        .more-btn {
          font-size: 15px;
        }

        /* ==============================
           PAGINATION
        ============================== */

        .pagination {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 5px;
          padding: 15px 18px;
          border-top: 1px solid #edf1f5;
        }

        .page-btn {
          width: 29px;
          height: 29px;
          border-radius: 6px;
          border: 1px solid #e2e8ef;
          background: #ffffff;
          color: #74879d;
          cursor: pointer;
          font-size: 10px;
        }

        .page-btn:hover {
          background: #f1f6fc;
        }

        .page-btn.active {
          background: #287ddd;
          border-color: #287ddd;
          color: white;
        }

        .page-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        /* ==============================
           STUDENT DETAILS
        ============================== */

        .details-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .back-button {
          border: none;
          background: transparent;
          color: #2879d7;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
        }

        .back-button:hover {
          text-decoration: underline;
        }

        .details-id {
          font-size: 13px;
          color: #7e91a8;
        }

        .profile-card {
          background: #ffffff;
          border: 1px solid #e3eaf2;
          border-radius: 9px;
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 15px;
        }

        .profile-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .large-avatar {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: #edf4ff;
          color: #2879db;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 17px;
          font-weight: 700;
        }

        .profile-name {
          margin: 0;
          color: #17375f;
          font-size: 18px;
        }

        .profile-student-id {
          margin: 5px 0 0;
          font-size: 13px;
          color: #8b9caf;
        }

        .registered-date {
          margin-top: 5px;
          color: #9ba8b7;
          font-size: 12px;
        }

        .details-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 15px;
          margin-bottom: 15px;
        }

        .details-card {
          background: #ffffff;
          border: 1px solid #e3eaf2;
          border-radius: 9px;
          padding: 20px;
        }

        .details-card.full-width {
          margin-bottom: 15px;
        }

        .details-card-title {
          margin: 0 0 17px;
          font-size: 15px;
          font-weight: 700;
          color: #294c72;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .details-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px 25px;
        }

        .detail-item label {
          display: block;
          font-size: 12px;
          color: #97a5b6;
          margin-bottom: 5px;
        }

        .detail-item span {
          font-size: 14px;
          color: #365473;
          font-weight: 600;
        }

        .education-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px;
        }

        .education-item label {
          display: block;
          color: #97a5b6;
          font-size: 12px;
          margin-bottom: 6px;
        }

        .education-item strong {
          color: #365473;
          font-size: 14px;
        }

        .applications-list {
          display: flex;
          flex-direction: column;
        }

        .application-row {
          display: grid;
          grid-template-columns: 1.5fr 1fr 120px;
          align-items: center;
          padding: 13px 0;
          border-top: 1px solid #edf1f5;
        }

        .application-row:first-child {
          border-top: none;
        }

        .application-col {
          font-size: 13px;
          color: #536d88;
        }

        .application-col strong {
          color: #365473;
        }

        .lead-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .lead-item label {
          display: block;
          font-size: 12px;
          color: #97a5b6;
          margin-bottom: 6px;
        }

        .lead-item strong {
          color: #365473;
          font-size: 14px;
        }

        .details-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 20px;
        }

        .edit-button,
        .block-button {
          border: none;
          border-radius: 6px;
          padding: 10px 18px;
          font-size: 10px;
          font-weight: 600;
          cursor: pointer;
        }

        .edit-button {
          background: #287ddd;
          color: white;
        }

        .block-button {
          background: #ffe8ea;
          color: #df4d5a;
        }

        .edit-button:hover {
          background: #1f6fc8;
        }

        .block-button:hover {
          background: #ffdadd;
        }


        .more-action-wrap { position: relative; }
        .more-menu {
          position: absolute;
          top: 34px;
          right: 0;
          width: 145px;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(26,52,82,.14);
          padding: 5px;
          z-index: 30;
        }
        .more-menu button {
          width: 100%;
          border: 0;
          background: transparent;
          padding: 9px 10px;
          text-align: left;
          border-radius: 6px;
          color: #46617d;
          font-size: 10px;
          cursor: pointer;
        }
        .more-menu button:hover { background: #f2f6fb; color: #287ddd; }
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(13,31,54,.42);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 100;
        }
        .edit-modal {
          width: min(520px, 100%);
          background: #fff;
          border-radius: 12px;
          border: 1px solid #e1e8f0;
          box-shadow: 0 20px 50px rgba(20,45,75,.2);
          padding: 22px;
        }
        .edit-modal-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:18px; }
        .edit-modal-header h3 { margin:0; color:#17375f; font-size:16px; }
        .modal-close { border:0; background:#f2f5f8; width:30px; height:30px; border-radius:7px; cursor:pointer; color:#647a92; }
        .edit-form { display:grid; grid-template-columns:1fr 1fr; gap:13px; }
        .edit-field label { display:block; margin-bottom:5px; color:#8192a6; font-size:9px; }
        .edit-field input, .edit-field select { width:100%; height:36px; border:1px solid #dfe7ef; border-radius:7px; padding:0 10px; outline:none; color:#38536f; font-size:10px; }
        .edit-field input:focus, .edit-field select:focus { border-color:#72a9e8; }
        .edit-modal-actions { display:flex; justify-content:flex-end; gap:8px; margin-top:18px; }
        .modal-cancel, .modal-save { border:0; border-radius:7px; padding:9px 16px; font-size:10px; cursor:pointer; }
        .modal-cancel { background:#eef2f6; color:#63788f; }
        .modal-save { background:#287ddd; color:#fff; }

        /* ==============================
           EMPTY STATE
        ============================== */

        .empty-state {
          text-align: center;
          padding: 55px 20px;
          color: #8494a8;
        }

        .empty-icon {
          font-size: 30px;
          margin-bottom: 10px;
        }

        .empty-state h3 {
          margin: 0;
          color: #3c5875;
          font-size: 13px;
        }

        .empty-state p {
          font-size: 10px;
          margin-top: 6px;
        }

        .app-shell {
          width: 100vw;
          max-width: none;
          margin-left: calc(50% - 50vw);
        }

        .academic-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 15px;
        }

        .marks-table {
          width: 100%;
          border-collapse: collapse;
        }
        .marks-table th, .marks-table td {
          padding: 11px 10px;
          border-bottom: 1px solid #edf1f5;
          text-align: left;
          font-size: 13px;
        }
        .marks-table th { color: #7f91a7; font-weight: 600; }
        .marks-table td { color: #365473; font-weight: 600; }
        .cutoff-box {
          margin-top: 14px;
          padding: 12px 14px;
          border-radius: 8px;
          background: #edf6ff;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .cutoff-box span { color:#71859c; font-size:13px; }
        .cutoff-box strong { color:#1670d2; font-size:16px; }
        .edit-modal-subtitle { margin: 4px 0 0; color:#8a9aae; font-size:11px; }
        .edit-field input, .edit-field select {
          background: #ffffff !important;
          color: #284a6e !important;
          -webkit-text-fill-color: #284a6e !important;
          font-size: 13px !important;
        }
        .edit-field input::placeholder { color:#9aa8b8 !important; opacity:1; }

        /* ==============================
           RESPONSIVE
        ============================== */


        @media (max-width: 1100px) {
          .admin-sidebar { width: 76px; min-width: 76px; }
          .sidebar-brand { justify-content:center; padding:0; }
          .sidebar-brand > div:last-child, .menu-title, .sidebar-item span:not(.sidebar-icon), .sidebar-admin-card > div:last-child, .logout-button span { display:none; }
          .sidebar-item { justify-content:center; padding:0; }
          .sidebar-icon { font-size:18px; }
          .sidebar-bottom { padding:10px; }
          .sidebar-admin-card { justify-content:center; padding:9px; }
        }

        @media (max-width: 1000px) {

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .details-grid {
            grid-template-columns: 1fr;
          }
          .academic-grid {
            grid-template-columns: 1fr;
          }

        }

        @media (max-width: 700px) {
          .admin-sidebar { width: 58px; min-width: 58px; }
          .sidebar-brand { height: 64px; }
          .brand-icon { width: 34px; height: 34px; font-size: 17px; }

          .top-navbar {
            padding: 0 14px;
          }

          .search-box {
            width: 190px;
          }

          .admin-info,
          .admin-arrow {
            display: none;
          }

          .student-content {
            padding: 22px 14px 40px;
          }

          .page-heading h1 {
            font-size: 19px;
          }

          .filter-card {
            flex-wrap: wrap;
          }

          .filter-search {
            flex-basis: 100%;
          }

          .filter-select {
            flex: 1;
            min-width: 0;
          }

          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }

          .stat-card {
            min-height: 95px;
            padding: 14px;
          }

          .stat-number {
            font-size: 18px;
          }

          .table-header {
            padding: 15px;
          }

          .profile-card {
            align-items: flex-start;
            gap: 15px;
          }

          .profile-left {
            align-items: flex-start;
          }

          .details-list {
            grid-template-columns: 1fr;
          }

          .education-row {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .lead-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .application-row {
            grid-template-columns: 1fr;
            gap: 7px;
          }

          .details-actions {
            justify-content: stretch;
          }

          .edit-button,
          .block-button {
            flex: 1;
          }

        }

        @media (max-width: 450px) {

          .search-box {
            width: 145px;
          }

          .notification {
            display: none;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .admin-area {
            gap: 7px;
          }

          .filter-select {
            flex-basis: calc(50% - 5px);
          }

          .refresh-btn {
            width: 100%;
          }

          .details-topbar {
            align-items: flex-start;
            flex-direction: column;
            gap: 10px;
          }

          .edit-form { grid-template-columns: 1fr; }
          .edit-modal { padding: 18px; }

        }

      `}),(0,N.jsxs)(`div`,{className:`app-shell`,children:[(0,N.jsx)(Wn,{}),(0,N.jsxs)(`div`,{className:`student-main-area student-page`,children:[(0,N.jsxs)(`div`,{className:`top-navbar`,children:[(0,N.jsxs)(`div`,{className:`search-box`,children:[(0,N.jsx)(`span`,{children:`⌕`}),(0,N.jsx)(`input`,{type:`text`,value:i,onChange:e=>te(e.target.value),placeholder:`Search students, colleges, leads...`})]}),(0,N.jsxs)(`div`,{className:`admin-area`,children:[(0,N.jsxs)(`div`,{className:`notification`,children:[`♢`,(0,N.jsx)(`span`,{className:`notification-dot`})]}),(0,N.jsxs)(`button`,{type:`button`,className:`admin-profile-toggle`,"aria-expanded":y,onClick:()=>b(e=>!e),children:[(0,N.jsx)(`div`,{className:`admin-avatar`,children:`A`}),(0,N.jsxs)(`div`,{className:`admin-info`,children:[(0,N.jsx)(`div`,{className:`admin-name`,children:`Admin`}),(0,N.jsx)(`div`,{className:`admin-role`,children:`Super Admin`})]}),(0,N.jsx)(`div`,{className:`admin-arrow`,children:`˅`})]}),y&&(0,N.jsx)(`div`,{className:`admin-dropdown`,children:(0,N.jsx)(`button`,{type:`button`,onClick:Un,children:`↪ Logout`})})]})]}),(0,N.jsxs)(`main`,{className:`student-content`,children:[!n&&(0,N.jsxs)(N.Fragment,{children:[(0,N.jsxs)(`div`,{className:`page-heading`,children:[(0,N.jsx)(`h1`,{children:`Student Management`}),(0,N.jsx)(`p`,{children:`Manage registered students and their applications, leads and account status`})]}),(0,N.jsxs)(`div`,{className:`filter-card`,children:[(0,N.jsxs)(`div`,{className:`filter-search`,children:[(0,N.jsx)(`span`,{className:`filter-search-icon`,children:`🔍`}),(0,N.jsx)(`input`,{type:`text`,value:i,onChange:e=>te(e.target.value),placeholder:`Search students...`})]}),(0,N.jsxs)(`select`,{className:`filter-select`,value:o,onChange:e=>T(e.target.value),children:[(0,N.jsx)(`option`,{children:`All Status`}),(0,N.jsx)(`option`,{children:`Active`}),(0,N.jsx)(`option`,{children:`Blocked`})]}),(0,N.jsx)(`select`,{className:`filter-select`,value:c,onChange:e=>ne(e.target.value),children:x.map(e=>(0,N.jsx)(`option`,{children:e},e))}),(0,N.jsx)(`button`,{className:`refresh-btn`,onClick:()=>{a(``),s(`All Status`),l(`All Courses`),d(1)},children:`⟳`})]}),(0,N.jsxs)(`div`,{className:`stats-grid`,children:[(0,N.jsxs)(`div`,{className:`stat-card`,children:[(0,N.jsx)(`div`,{className:`stat-title`,children:`Total Students`}),(0,N.jsx)(`div`,{className:`stat-number`,children:`25,430`}),(0,N.jsxs)(`div`,{className:`stat-sub`,children:[(0,N.jsx)(`span`,{children:`↑ 12%`}),` vs last month`]})]}),(0,N.jsxs)(`div`,{className:`stat-card`,children:[(0,N.jsx)(`div`,{className:`stat-title`,children:`Active Students`}),(0,N.jsx)(`div`,{className:`stat-number`,children:`24,850`}),(0,N.jsxs)(`div`,{className:`stat-sub`,children:[(0,N.jsx)(`span`,{children:`↑ 8%`}),` vs last month`]})]}),(0,N.jsxs)(`div`,{className:`stat-card`,children:[(0,N.jsx)(`div`,{className:`stat-title`,children:`Applications`}),(0,N.jsx)(`div`,{className:`stat-number`,children:`8,240`}),(0,N.jsxs)(`div`,{className:`stat-sub`,children:[(0,N.jsx)(`span`,{children:`↑ 14%`}),` vs last month`]})]}),(0,N.jsxs)(`div`,{className:`stat-card`,children:[(0,N.jsx)(`div`,{className:`stat-title`,children:`Blocked Students`}),(0,N.jsx)(`div`,{className:`stat-number`,children:`580`}),(0,N.jsxs)(`div`,{className:`stat-sub`,children:[(0,N.jsx)(`span`,{children:`↓ 3%`}),` vs last month`]})]})]}),(0,N.jsxs)(`div`,{className:`table-card`,children:[(0,N.jsxs)(`div`,{className:`table-header`,children:[(0,N.jsxs)(`div`,{className:`table-title`,children:[(0,N.jsx)(`h2`,{children:`Registered Students`}),(0,N.jsx)(`p`,{children:`All students registered on the platform`})]}),(0,N.jsxs)(`div`,{className:`student-count`,children:[S.length,` Students`]})]}),w.length>0?(0,N.jsx)(`div`,{className:`table-wrapper`,children:(0,N.jsxs)(`table`,{className:`student-table`,children:[(0,N.jsx)(`thead`,{children:(0,N.jsxs)(`tr`,{children:[(0,N.jsx)(`th`,{children:`#`}),(0,N.jsx)(`th`,{children:`Student`}),(0,N.jsx)(`th`,{children:`Email`}),(0,N.jsx)(`th`,{children:`Phone`}),(0,N.jsx)(`th`,{children:`College`}),(0,N.jsx)(`th`,{children:`Applications`}),(0,N.jsx)(`th`,{children:`Status`}),(0,N.jsx)(`th`,{children:`Actions`})]})}),(0,N.jsx)(`tbody`,{children:w.map((e,i)=>(0,N.jsxs)(`tr`,{children:[(0,N.jsx)(`td`,{className:`number-cell`,children:C+i+1}),(0,N.jsx)(`td`,{children:(0,N.jsxs)(`div`,{className:`student-name`,children:[(0,N.jsx)(`div`,{className:`student-avatar`,children:e.name.charAt(0).toUpperCase()}),(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`strong`,{children:e.name}),(0,N.jsx)(`span`,{className:`student-id`,children:e.id})]})]})}),(0,N.jsx)(`td`,{children:e.email}),(0,N.jsx)(`td`,{children:e.phone}),(0,N.jsx)(`td`,{children:e.college}),(0,N.jsx)(`td`,{className:`application-number`,children:e.applications}),(0,N.jsx)(`td`,{children:(0,N.jsx)(`span`,{className:`status-badge ${re(e.status)}`,children:e.status})}),(0,N.jsx)(`td`,{children:(0,N.jsxs)(`div`,{className:`action-buttons`,children:[(0,N.jsx)(`button`,{className:`action-btn`,title:`View Student`,onClick:()=>E(e),children:`👁`}),(0,N.jsx)(`button`,{className:`action-btn`,title:`Edit Student`,onClick:()=>{v(null),p(e),h({...e})},children:`✏`}),(0,N.jsxs)(`div`,{className:`more-action-wrap`,children:[(0,N.jsx)(`button`,{className:`action-btn more-btn`,title:`More`,onClick:()=>v(g===e.id?null:e.id),children:`⋮`}),g===e.id&&(0,N.jsxs)(`div`,{className:`more-menu`,children:[(0,N.jsx)(`button`,{onClick:()=>E(e),children:`View Details`}),(0,N.jsx)(`button`,{onClick:()=>{v(null),p(e),h({...e})},children:`Edit Student`}),(0,N.jsx)(`button`,{onClick:()=>{let i=e.status===`Blocked`?`Active`:`Blocked`;t(t=>t.map(t=>t.id===e.id?{...t,status:i}:t)),n?.id===e.id&&r({...e,status:i}),v(null)},children:e.status===`Blocked`?`Activate Student`:`Block Student`})]})]})]})})]},e.id))})]})}):(0,N.jsxs)(`div`,{className:`empty-state`,children:[(0,N.jsx)(`div`,{className:`empty-icon`,children:`🔍`}),(0,N.jsx)(`h3`,{children:`No students found`}),(0,N.jsx)(`p`,{children:`Try changing your search or filters.`})]}),S.length>0&&(0,N.jsxs)(`div`,{className:`pagination`,children:[(0,N.jsx)(`button`,{className:`page-btn`,disabled:u===1,onClick:()=>d(e=>Math.max(e-1,1)),children:`‹`}),Array.from({length:ee},(e,t)=>t+1).map(e=>(0,N.jsx)(`button`,{className:`page-btn ${u===e?`active`:``}`,onClick:()=>d(e),children:e},e)),(0,N.jsx)(`button`,{className:`page-btn`,disabled:u===ee,onClick:()=>d(e=>Math.min(e+1,ee)),children:`›`})]})]})]}),n&&(0,N.jsxs)(N.Fragment,{children:[(0,N.jsxs)(`div`,{className:`details-topbar`,children:[(0,N.jsx)(`button`,{className:`back-button`,onClick:D,children:`← Back to Students`}),(0,N.jsxs)(`div`,{className:`details-id`,children:[`Student ID: `,(0,N.jsx)(`strong`,{children:n.id})]})]}),(0,N.jsxs)(`div`,{className:`profile-card`,children:[(0,N.jsxs)(`div`,{className:`profile-left`,children:[(0,N.jsx)(`div`,{className:`large-avatar`,children:n.name.charAt(0).toUpperCase()}),(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`h2`,{className:`profile-name`,children:n.name}),(0,N.jsx)(`div`,{className:`profile-student-id`,children:n.id}),(0,N.jsxs)(`div`,{className:`registered-date`,children:[`Registered: `,n.registered]})]})]}),(0,N.jsxs)(`span`,{className:`status-badge ${re(n.status)}`,children:[`🟢 `,n.status]})]}),(0,N.jsxs)(`div`,{className:`details-grid`,children:[(0,N.jsxs)(`div`,{className:`details-card`,children:[(0,N.jsx)(`h3`,{className:`details-card-title`,children:`Personal Details`}),(0,N.jsxs)(`div`,{className:`details-list`,children:[(0,N.jsxs)(`div`,{className:`detail-item`,children:[(0,N.jsx)(`label`,{children:`Name`}),(0,N.jsx)(`span`,{children:n.name})]}),(0,N.jsxs)(`div`,{className:`detail-item`,children:[(0,N.jsx)(`label`,{children:`Date of Birth`}),(0,N.jsx)(`span`,{children:n.dob})]}),(0,N.jsxs)(`div`,{className:`detail-item`,children:[(0,N.jsx)(`label`,{children:`Gender`}),(0,N.jsx)(`span`,{children:n.gender})]}),(0,N.jsxs)(`div`,{className:`detail-item`,children:[(0,N.jsx)(`label`,{children:`Student ID`}),(0,N.jsx)(`span`,{children:n.id})]})]})]}),(0,N.jsxs)(`div`,{className:`details-card`,children:[(0,N.jsx)(`h3`,{className:`details-card-title`,children:`Contact Information`}),(0,N.jsxs)(`div`,{className:`details-list`,children:[(0,N.jsxs)(`div`,{className:`detail-item`,children:[(0,N.jsx)(`label`,{children:`Email`}),(0,N.jsx)(`span`,{children:n.email})]}),(0,N.jsxs)(`div`,{className:`detail-item`,children:[(0,N.jsx)(`label`,{children:`Phone`}),(0,N.jsx)(`span`,{children:n.phone})]}),(0,N.jsxs)(`div`,{className:`detail-item`,children:[(0,N.jsx)(`label`,{children:`Address`}),(0,N.jsx)(`span`,{children:n.address})]}),(0,N.jsxs)(`div`,{className:`detail-item`,children:[(0,N.jsx)(`label`,{children:`City`}),(0,N.jsx)(`span`,{children:n.city})]})]})]})]}),(0,N.jsxs)(`div`,{className:`details-card full-width`,children:[(0,N.jsx)(`h3`,{className:`details-card-title`,children:`Education`}),(0,N.jsxs)(`div`,{className:`education-row`,children:[(0,N.jsxs)(`div`,{className:`education-item`,children:[(0,N.jsx)(`label`,{children:`College`}),(0,N.jsx)(`strong`,{children:n.college})]}),(0,N.jsxs)(`div`,{className:`education-item`,children:[(0,N.jsx)(`label`,{children:`Course`}),(0,N.jsx)(`strong`,{children:n.course})]})]})]}),(0,N.jsxs)(`div`,{className:`academic-grid`,children:[(0,N.jsxs)(`div`,{className:`details-card`,children:[(0,N.jsx)(`h3`,{className:`details-card-title`,children:`10th Standard Marks`}),(0,N.jsxs)(`table`,{className:`marks-table`,children:[(0,N.jsx)(`thead`,{children:(0,N.jsxs)(`tr`,{children:[(0,N.jsx)(`th`,{children:`Subject`}),(0,N.jsx)(`th`,{children:`Marks`})]})}),(0,N.jsxs)(`tbody`,{children:[(0,N.jsxs)(`tr`,{children:[(0,N.jsx)(`td`,{children:`Tamil`}),(0,N.jsx)(`td`,{children:n.tenthMarks?.Tamil})]}),(0,N.jsxs)(`tr`,{children:[(0,N.jsx)(`td`,{children:`English`}),(0,N.jsx)(`td`,{children:n.tenthMarks?.English})]}),(0,N.jsxs)(`tr`,{children:[(0,N.jsx)(`td`,{children:`Mathematics`}),(0,N.jsx)(`td`,{children:n.tenthMarks?.Mathematics})]}),(0,N.jsxs)(`tr`,{children:[(0,N.jsx)(`td`,{children:`Science`}),(0,N.jsx)(`td`,{children:n.tenthMarks?.Science})]}),(0,N.jsxs)(`tr`,{children:[(0,N.jsx)(`td`,{children:`Social Science`}),(0,N.jsx)(`td`,{children:n.tenthMarks?.SocialScience})]}),(0,N.jsxs)(`tr`,{children:[(0,N.jsx)(`td`,{children:(0,N.jsx)(`strong`,{children:`Total / Percentage`})}),(0,N.jsx)(`td`,{children:(0,N.jsxs)(`strong`,{children:[n.tenthMarks?.Total,` /`,` `,n.tenthMarks?.Percentage,`%`]})})]})]})]})]}),(0,N.jsxs)(`div`,{className:`details-card`,children:[(0,N.jsx)(`h3`,{className:`details-card-title`,children:`12th Standard Marks`}),(0,N.jsxs)(`table`,{className:`marks-table`,children:[(0,N.jsx)(`thead`,{children:(0,N.jsxs)(`tr`,{children:[(0,N.jsx)(`th`,{children:`Subject`}),(0,N.jsx)(`th`,{children:`Marks`})]})}),(0,N.jsxs)(`tbody`,{children:[(n.twelfthMarks?.Subjects||[]).map(e=>(0,N.jsxs)(`tr`,{children:[(0,N.jsx)(`td`,{children:e===`ComputerScience`?`Computer Science`:e}),(0,N.jsx)(`td`,{children:n.twelfthMarks?.[e]})]},e)),(0,N.jsxs)(`tr`,{children:[(0,N.jsx)(`td`,{children:(0,N.jsx)(`strong`,{children:`Total / Percentage`})}),(0,N.jsx)(`td`,{children:(0,N.jsxs)(`strong`,{children:[n.twelfthMarks?.Total,` /`,` `,n.twelfthMarks?.Percentage,`%`]})})]})]})]}),(0,N.jsxs)(`div`,{className:`cutoff-box`,children:[(0,N.jsx)(`span`,{children:`Calculated Cut-off`}),(0,N.jsx)(`strong`,{children:n.cutoff})]})]})]}),(0,N.jsxs)(`div`,{className:`details-card full-width`,children:[(0,N.jsx)(`h3`,{className:`details-card-title`,children:`Applications`}),(0,N.jsx)(`div`,{className:`applications-list`,children:n.applicationList.map((e,t)=>(0,N.jsxs)(`div`,{className:`application-row`,children:[(0,N.jsx)(`div`,{className:`application-col`,children:(0,N.jsx)(`strong`,{children:e.college})}),(0,N.jsx)(`div`,{className:`application-col`,children:e.course}),(0,N.jsx)(`div`,{children:(0,N.jsx)(`span`,{className:`status-badge ${re(e.status)}`,children:e.status})})]},t))})]}),(0,N.jsxs)(`div`,{className:`details-card full-width`,children:[(0,N.jsx)(`h3`,{className:`details-card-title`,children:`Lead Information`}),(0,N.jsxs)(`div`,{className:`lead-grid`,children:[(0,N.jsxs)(`div`,{className:`lead-item`,children:[(0,N.jsx)(`label`,{children:`Lead Status`}),(0,N.jsx)(`strong`,{children:n.leadStatus})]}),(0,N.jsxs)(`div`,{className:`lead-item`,children:[(0,N.jsx)(`label`,{children:`Purchased By`}),(0,N.jsx)(`strong`,{children:n.purchasedBy})]}),(0,N.jsxs)(`div`,{className:`lead-item`,children:[(0,N.jsx)(`label`,{children:`Lead Price`}),(0,N.jsx)(`strong`,{children:n.leadPrice})]})]})]}),(0,N.jsxs)(`div`,{className:`details-actions`,children:[(0,N.jsx)(`button`,{className:`edit-button`,onClick:()=>{p(n),h({...n})},children:`Edit Student`}),(0,N.jsx)(`button`,{className:`block-button`,onClick:()=>{let e=n.status===`Blocked`?`Active`:`Blocked`,i={...n,status:e};t(e=>e.map(e=>e.id===n.id?i:e)),r(i)},children:n.status===`Blocked`?`Activate Account`:`Block Account`})]})]})]}),f&&m&&(0,N.jsx)(`div`,{className:`modal-overlay`,onClick:()=>{p(null),h(null)},children:(0,N.jsxs)(`div`,{className:`edit-modal`,onClick:e=>e.stopPropagation(),children:[(0,N.jsxs)(`div`,{className:`edit-modal-header`,children:[(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`h3`,{children:`Edit Student`}),(0,N.jsx)(`p`,{className:`edit-modal-subtitle`,children:`Update student account information`})]}),(0,N.jsx)(`button`,{className:`modal-close`,onClick:()=>{p(null),h(null)},children:`✕`})]}),(0,N.jsxs)(`div`,{className:`edit-form`,children:[[[`name`,`Name`],[`email`,`Email`],[`phone`,`Phone`],[`college`,`College`],[`course`,`Course`]].map(([e,t])=>(0,N.jsxs)(`div`,{className:`edit-field`,children:[(0,N.jsx)(`label`,{children:t}),(0,N.jsx)(`input`,{value:m[e]||``,onChange:t=>h({...m,[e]:t.target.value})})]},e)),(0,N.jsxs)(`div`,{className:`edit-field`,children:[(0,N.jsx)(`label`,{children:`Status`}),(0,N.jsxs)(`select`,{value:m.status,onChange:e=>h({...m,status:e.target.value}),children:[(0,N.jsx)(`option`,{children:`Active`}),(0,N.jsx)(`option`,{children:`Blocked`})]})]})]}),(0,N.jsxs)(`div`,{className:`edit-modal-actions`,children:[(0,N.jsx)(`button`,{className:`modal-cancel`,onClick:()=>{p(null),h(null)},children:`Cancel`}),(0,N.jsx)(`button`,{className:`modal-save`,onClick:()=>{t(e=>e.map(e=>e.id===m.id?{...e,...m}:e)),n?.id===m.id&&r({...n,...m}),p(null),h(null)},children:`Save Changes`})]})]})})]})]})]})}var Jn=String.raw`/* =========================================================
   GLOBAL ADMIN
========================================================= */

* {
  box-sizing: border-box;
}
.admin-app {
  width: 100vw;
  min-height: 100vh;
  margin-left: calc(50% - 50vw);
  display: flex;
  background: #f4f7fb;
  color: #16243d;
  font-family:
    Inter,
    "Segoe UI",
    Roboto,
    Arial,
    sans-serif;
}


/* =========================================================
   ADMIN LOGIN
========================================================= */

.admin-login-page {
  width: 100vw;
  min-height: 100vh;
  margin-left: calc(50% - 50vw);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  background:
    radial-gradient(
      circle at top left,
      rgba(47, 128, 237, 0.13),
      transparent 32%
    ),
    linear-gradient(
      135deg,
      #f6f9ff 0%,
      #eef4fb 100%
    );
}

.admin-login-card {
  width: 100%;
  max-width: 470px;
  padding: 42px;
  border-radius: 22px;
  background: #ffffff;
  border: 1px solid #e6ebf2;
  box-shadow:
    0 24px 60px rgba(25, 52, 92, 0.12);
}

.login-logo {
  display: flex;
  align-items: center;
  gap: 13px;
  margin-bottom: 36px;
}

.login-logo-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eaf3ff;
  font-size: 27px;
}

.login-logo h1 {
  margin: 0;
  font-size: 21px;
  color: #172b4d;
}

.login-logo h1 span {
  color: #287bea;
}

.login-logo p {
  margin: 2px 0 0;
  color: #7b899f;
  font-size: 12px;
}

.login-heading {
  margin-bottom: 28px;
}

.login-heading h2 {
  margin: 0 0 7px;
  font-size: 30px;
  color: #152a4a;
}

.login-heading p {
  margin: 0;
  color: #7b899f;
  font-size: 14px;
}

.login-field {
  margin-bottom: 20px;
}

.login-field label {
  display: block;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 650;
  color: #33445f;
}

.input-wrapper {
  height: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 14px;
  border: 1px solid #dfe6ef;
  border-radius: 10px;
  background: #fbfcfe;
  transition: 0.2s ease;
}

.input-wrapper:focus-within {
  border-color: #2f80ed;
  box-shadow:
    0 0 0 3px rgba(47, 128, 237, 0.1);
}

.input-wrapper > span {
  font-size: 15px;
  color: #7890ad;
}

.input-wrapper input {
  width: 100%;
  height: 100%;
  border: 0;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: #172b4d;
}

.input-wrapper input::placeholder {
  color: #a5afbe;
}

.password-toggle {
  border: 0;
  background: transparent;
  color: #287bea;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
}

.login-error {
  padding: 11px 13px;
  margin-bottom: 15px;
  border-radius: 8px;
  background: #fff0f1;
  color: #d64550;
  font-size: 13px;
}

.login-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0 23px;
  font-size: 12px;
}

.login-options label {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #6d7b90;
}

.login-options button {
  border: 0;
  background: transparent;
  color: #287bea;
  cursor: pointer;
  font-size: 12px;
}

.admin-login-button {
  width: 100%;
  height: 50px;
  border: 0;
  border-radius: 10px;
  background: #2478e5;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  transition: 0.2s ease;
}

.admin-login-button:hover {
  background: #1768d2;
  transform: translateY(-1px);
}

.login-security {
  text-align: center;
  margin-top: 22px;
  color: #8190a6;
  font-size: 12px;
}

.login-demo {
  margin-top: 12px;
  text-align: center;
  color: #a1adbd;
  font-size: 10px;
}


/* =========================================================
   SIDEBAR
========================================================= */

.admin-sidebar {
  width: 236px;
  min-height: 100vh;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: #112746;
  color: #ffffff;
  position: sticky;
  top: 0;
  height: 100vh;
}

.sidebar-brand {
  height: 82px;
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 0 22px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.brand-icon {
  width: 40px;
  height: 40px;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  font-size: 21px;
}

.sidebar-brand h1 {
  margin: 0;
  color: #ffffff;
  font-size: 16px;
  line-height: 1.2;
}

.sidebar-brand h1 span {
  color: #58a1ff;
}

.sidebar-brand p {
  margin: 3px 0 0;
  color: #91a5c2;
  font-size: 9px;
}

.sidebar-menu {
  flex: 1;
  padding: 24px 12px;
  overflow-y: auto;
}

.menu-title {
  margin: 0 12px 10px;
  color: #6f86a7;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1px;
}

.sidebar-item {
  width: 100%;
  height: 43px;
  margin-bottom: 4px;
  padding: 0 13px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #afbdd1;
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
  cursor: pointer;
  font-size: 12px;
  transition: 0.2s ease;
}

.sidebar-item:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.07);
}

.sidebar-item.active {
  color: #ffffff;
  background: #2177e8;
  box-shadow:
    0 6px 18px rgba(33, 119, 232, 0.2);
}

.sidebar-icon {
  width: 20px;
  text-align: center;
  font-size: 16px;
}

.lead-star {
  margin-left: auto;
  color: #f4c44f;
  font-size: 10px;
}

.sidebar-bottom {
  padding: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}

.sidebar-admin-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.055);
}

.admin-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #28558e;
  color: #ffffff;
  font-weight: 700;
  font-size: 12px;
}

.sidebar-admin-card strong {
  display: block;
  color: #ffffff;
  font-size: 12px;
}

.sidebar-admin-card span {
  display: block;
  margin-top: 2px;
  color: #8196b5;
  font-size: 9px;
}

.logout-button {
  width: 100%;
  margin-top: 9px;
  height: 36px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #93a6c0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 11px;
}

.logout-button:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.07);
}


/* =========================================================
   MAIN AREA
========================================================= */

.admin-main {
  min-width: 0;
  flex: 1;
}

.admin-topbar {
  height: 72px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  border-bottom: 1px solid #e7ecf2;
}

.top-search-container {
  position: relative;
  width: 400px;
}

.top-search {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 14px;
  border-radius: 9px;
  background: #f4f7fb;
  color: #7b8da7;
}

.top-search span {
  font-size: 20px;
}

.top-search input {
  width: 100%;
  border: 0;
  outline: none;
  background: transparent;
  color: #253954;
  font-size: 12px;
}

.top-search input::placeholder {
  color: #99a7ba;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.notification-button {
  position: relative;
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #61738e;
  font-size: 20px;
  cursor: pointer;
}

.notification-dot {
  position: absolute;
  top: 7px;
  right: 7px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #f25f68;
}

.top-admin {
  display: flex;
  align-items: center;
  gap: 9px;
}

.top-admin-avatar {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #183f70;
  color: #ffffff;
  font-weight: 700;
  font-size: 12px;
}

.top-admin-details strong {
  display: block;
  color: #233854;
  font-size: 12px;
}

.top-admin-details span {
  display: block;
  color: #8c9aae;
  font-size: 9px;
  margin-top: 2px;
}

.top-admin-menu {
  border: 0;
  background: transparent;
  color: #71839c;
  cursor: pointer;
  font-size: 16px;
}


/* =========================================================
   CONTENT
========================================================= */

.admin-content {
  padding: 27px 30px 40px;
}

.dashboard-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 22px;
}

.dashboard-heading h1 {
  margin: 0;
  color: #172d4d;
  font-size: 28px;
  line-height: 1.2;
  font-weight: 750;
}

.dashboard-heading p {
  margin: 7px 0 0;
  color: #8492a7;
  font-size: 12px;
}

.dashboard-date {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #7f8ea3;
  font-size: 11px;
}

.calendar-icon {
  color: #6381a6;
}


/* =========================================================
   STAT CARDS
========================================================= */

.stats-grid {
  display: grid;
  grid-template-columns:
    repeat(4, minmax(0, 1fr));
  gap: 15px;
  margin-bottom: 17px;
}

.stat-card {
  min-height: 126px;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  border: 1px solid #e5ebf2;
  border-radius: 12px;
  background: #ffffff;
  box-shadow:
    0 3px 12px rgba(33, 60, 91, 0.035);
}

.stat-icon {
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 19px;
}

.stat-icon.blue {
  color: #2f80ed;
  background: #eaf3ff;
}

.stat-icon.green {
  color: #18b77c;
  background: #e5f9f1;
}

.stat-icon.purple {
  color: #8b5cf6;
  background: #f1eaff;
}

.stat-icon.orange {
  color: #e9992f;
  background: #fff2dc;
}

.stat-icon.cyan {
  color: #0b9bc1;
  background: #e4f8fd;
}

.stat-icon.gold {
  color: #b98922;
  background: #fff5d8;
}

.stat-icon.pink {
  color: #df5a8c;
  background: #ffeaf2;
}

.stat-icon.red {
  color: #e05b65;
  background: #ffeaed;
}

.stat-content {
  min-width: 0;
}

.stat-content p {
  margin: 0;
  color: #75869e;
  font-size: 11px;
  font-weight: 600;
}

.stat-content h3 {
  margin: 7px 0 6px;
  color: #193252;
  font-size: 24px;
  line-height: 1;
  font-weight: 750;
}

.stat-change {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.stat-change span {
  color: #1eb581;
  font-size: 10px;
  font-weight: 700;
}

.stat-change small {
  color: #a0acba;
  font-size: 9px;
}


/* =========================================================
   COMMON CARD
========================================================= */

.dashboard-card {
  border: 1px solid #e5ebf2;
  border-radius: 12px;
  background: #ffffff;
  box-shadow:
    0 3px 12px rgba(33, 60, 91, 0.035);
}

.card-header {
  min-height: 68px;
  padding: 17px 18px 13px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.card-header h2 {
  margin: 0;
  color: #1d3555;
  font-size: 17px;
  font-weight: 750;
}

.card-header p {
  margin: 4px 0 0;
  color: #97a4b4;
  font-size: 9px;
}

/* Recent Leads and Activity text size */
.recent-leads-card .card-header h2,
.activity-card .card-header h2 {
  font-size: 17px;
}

.recent-leads-card .card-header p,
.activity-card .card-header p {
  font-size: 12px;
}

/* =========================================================
   ANALYTICS
========================================================= */

.analytics-grid {
  display: grid;
  grid-template-columns:
    minmax(0, 1.65fr)
    minmax(320px, 0.9fr);
  gap: 15px;
  margin-bottom: 17px;
}

.chart-card {
  min-height: 330px;
}

.chart-filters {
  display: flex;
  gap: 4px;
}

.chart-filters button {
  border: 1px solid #e2e8f0;
  background: #ffffff;
  color: #8090a5;
  border-radius: 6px;
  padding: 6px 8px;
  min-width: 32px;
  font-size: 9px;
  cursor: pointer;
  outline: none;
  transition: 0.2s ease;
}

.chart-filters button:hover {
  border-color: #267ce9;
  color: #267ce9;
  background: #f5f9ff;
}

.chart-filters button.selected {
  background: #267ce9;
  border-color: #267ce9;
  color: #ffffff;
}

.chart-filters button.selected:hover {
  background: #267ce9;
  border-color: #267ce9;
  color: #ffffff;
}

.dynamic-chart-svg {
  transition: opacity 0.2s ease;
}

.chart-x-axis span {
  min-width: 0;
  white-space: nowrap;
}

.chart-area {
  display: flex;
  height: 245px;
  padding: 0 18px 15px;
}

.chart-y-axis {
  width: 32px;
  padding: 5px 0 31px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #94a1b2;
  font-size: 9px;
  text-align: right;
}

.line-chart {
  position: relative;
  flex: 1;
  min-width: 0;
  margin-left: 9px;
}

.line-chart svg {
  position: absolute;
  inset: 8px 0 28px;
  width: 100%;
  height: calc(100% - 36px);
}

.chart-grid-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: #edf1f5;
}

.line-1 {
  top: 7%;
}

.line-2 {
  top: 28%;
}

.line-3 {
  top: 49%;
}

.line-4 {
  top: 70%;
}

.line-5 {
  top: 91%;
}

.chart-x-axis {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  color: #96a3b3;
  font-size: 8px;
}


/* =========================================================
   LEAD STATUS
========================================================= */

.status-card {
  min-height: 330px;
}

.status-content {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 14px 18px 22px;
}

.donut-wrapper {
  width: 155px;
  display: flex;
  justify-content: center;
}

.donut-chart {
  width: 145px;
  height: 145px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    conic-gradient(
      #f3b436 0 34%,
      #2f80ed 34% 62%,
      #19bb7d 62% 86%,
      #ef626c 86% 100%
    );
  position: relative;
}

.donut-chart::after {
  content: "";
  position: absolute;
  width: 94px;
  height: 94px;
  border-radius: 50%;
  background: #ffffff;
}

.donut-center {
  position: relative;
  z-index: 2;
  text-align: center;
}

.donut-center strong {
  display: block;
  color: #1b3555;
  font-size: 19px;
}

.donut-center span {
  display: block;
  margin-top: 2px;
  color: #8b99aa;
  font-size: 9px;
}

.status-list {
  flex: 1;
}

.status-row {
  display: grid;
  grid-template-columns:
    10px minmax(65px, 1fr) auto auto;
  gap: 7px;
  align-items: center;
  margin-bottom: 15px;
  color: #687a92;
  font-size: 10px;
}

.status-row:last-child {
  margin-bottom: 0;
}

.status-row strong {
  color: #445872;
  font-size: 10px;
}

.status-row small {
  color: #8d9aac;
  font-size: 9px;
}

.status-color {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-color.pending {
  background: #f3b436;
}

.status-color.review {
  background: #2f80ed;
}

.status-color.accepted {
  background: #19bb7d;
}

.status-color.rejected {
  background: #ef626c;
}


/* =========================================================
   LOWER GRID
========================================================= */

.lower-grid {
  display: grid;
  grid-template-columns:
    minmax(0, 1.65fr)
    minmax(320px, 0.9fr);
  gap: 15px;
  margin-bottom: 17px;
}

.recent-leads-card {
  min-width: 0;
}

.view-all-button {
  border: 0;
  background: transparent;
  color: #277ce8;
  font-size: 10px;
  font-weight: 650;
  cursor: pointer;
}

.table-wrapper {
  overflow-x: auto;
  padding: 0 10px 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 650px;
}

thead {
  background: #f7f9fc;
}

th {
  padding: 10px 8px;
  color: #8290a3;
  text-align: left;
font-size: 14px;
  font-weight: 650;
}

td {
  padding: 10px 8px;
  border-top: 1px solid #edf1f5;
  color: #60738e;
font-size: 14px;
  white-space: nowrap;
}

.student-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.student-avatar {
  width: 27px;
  height: 27px;
  flex-shrink: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eaf3ff;
  color: #2f80ed;
  font-size: 10px;
  font-weight: 750;
}

.student-cell strong {
  display: block;
  color: #344c6b;
 font-size: 14px;
}

.student-cell span {
  display: block;
  color: #a0abba;
  font-size: 11px;
  margin-top: 2px;
}

.lead-status {
  display: inline-flex;
  padding: 5px 8px;
  border-radius: 20px;
 font-size: 12px;
  font-weight: 700;
}

.lead-status.new {
  color: #b47c14;
  background: #fff3d7;
}

.lead-status.purchased {
  color: #2776d9;
  background: #e9f3ff;
}

.lead-status.converted {
  color: #149d6a;
  background: #e4f9f0;
}

.lead-status.invalid {
  color: #d84c59;
  background: #ffecef;
}


/* =========================================================
   ACTIVITY
========================================================= */

.activity-card {
  min-height: 100%;
}

.activity-list {
  padding: 0 18px 15px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 0;
  border-bottom: 1px solid #edf1f5;
}

.activity-item:last-child {
  border-bottom: 0;
}

.activity-icon {
  width: 31px;
  height: 31px;
  flex-shrink: 0;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
}

.activity-icon.green {
  background: #e5f9f0;
  color: #1aac75;
}

.activity-icon.blue {
  background: #eaf3ff;
  color: #2f80ed;
}

.activity-icon.purple {
  background: #f0eaff;
  color: #865cf1;
}

.activity-icon.orange {
  background: #fff2df;
  color: #e49327;
}

.activity-icon.red {
  background: #ffecef;
  color: #dc5862;
}

.activity-details {
  min-width: 0;
}

.activity-details strong {
  display: block;
  color: #4a5d77;
font-size: 14px;
  line-height: 1.4;
}

.activity-details span {
  display: block;
  margin-top: 3px;
  color: #9ba7b7;
 font-size: 11px;
}


/* =========================================================
   QUICK ACTIONS
========================================================= */

.quick-actions-card {
  padding-bottom: 18px;
}

.quick-actions {
  display: grid;
  grid-template-columns:
    repeat(4, minmax(0, 1fr));
  gap: 12px;
  padding: 0 18px;
}

.quick-actions button {
  min-height: 75px;
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 13px;
  border: 1px solid #e7edf4;
  border-radius: 10px;
  background: #ffffff;
  text-align: left;
  cursor: pointer;
  transition: 0.2s ease;
}

.quick-actions button:hover {
  transform: translateY(-2px);
  box-shadow:
    0 7px 18px rgba(37, 70, 107, 0.07);
}

.quick-icon {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 700;
}

.quick-icon.blue {
  color: #2f80ed;
  background: #eaf3ff;
}

.quick-icon.green {
  color: #17aa73;
  background: #e5f9f0;
}

.quick-icon.purple {
  color: #885ef2;
  background: #f0eaff;
}

.quick-icon.orange {
  color: #df9025;
  background: #fff2dd;
}

.quick-actions strong {
  display: block;
  color: #435873;
  font-size: 14px;
}

.quick-actions small {
  display: block;
  margin-top: 4px;
  color: #99a6b7;
  font-size: 11px;
}

.quick-actions-card .card-header h2 {
  font-size: 17px;
}

.quick-actions-card .card-header p {
  font-size: 12px;
}

/* =========================================================
   PLACEHOLDER PAGES
========================================================= */

.admin-section-placeholder {
  min-height: calc(100vh - 130px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.placeholder-icon {
  width: 70px;
  height: 70px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eaf3ff;
  color: #287bea;
  font-size: 28px;
  margin-bottom: 20px;
}

.admin-section-placeholder h1 {
  margin: 0;
  color: #193252;
  font-size: 28px;
}

.admin-section-placeholder p {
  margin: 8px 0;
  color: #8795a8;
  font-size: 13px;
}

.admin-section-placeholder span {
  color: #2f80ed;
  font-size: 11px;
}



/* =========================================================
   SEARCH RESULTS
========================================================= */

.search-clear {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  border: 0;
  border-radius: 50%;
  background: #e8eef6;
  color: #61738e;
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.2s ease;
}

.search-clear:hover {
  background: #dbe5f1;
  color: #183f70;
}

.search-results {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  max-height: 390px;
  overflow-y: auto;
  z-index: 1000;
  padding: 7px;
  background: #ffffff;
  border: 1px solid #e3eaf2;
  border-radius: 12px;
  box-shadow: 0 16px 35px rgba(24, 63, 112, 0.14);
  animation: searchDropIn 0.18s ease-out;
}

@keyframes searchDropIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.search-results-heading {
  padding: 7px 10px;
  color: #8a9ab0;
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.search-result-item {
  width: 100%;
  display: grid;
  grid-template-columns: 30px minmax(0, 1fr) auto;
  align-items: center;
  gap: 9px;
  padding: 9px 10px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s ease;
}

.search-result-item:hover {
  background: #f4f7fb;
}

.search-result-icon {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #edf4ff;
  color: #2f80ed;
  font-size: 15px;
}

.search-result-text {
  min-width: 0;
}

.search-result-text strong {
  display: block;
  overflow: hidden;
  color: #233854;
  font-size: 11px;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.search-result-text small {
  display: block;
  margin-top: 3px;
  overflow: hidden;
  color: #8c9aae;
  font-size: 8px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.search-result-type {
  flex-shrink: 0;
  padding: 4px 7px;
  border-radius: 20px;
  background: #f0f5fa;
  color: #71839c;
  font-size: 7px;
  font-weight: 700;
}

.search-no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 28px 15px;
  text-align: center;
}

.search-no-results > span {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  border-radius: 50%;
  background: #f2f5f9;
  color: #8c9aae;
  font-size: 18px;
}

.search-no-results strong {
  color: #344a66;
  font-size: 11px;
}

.search-no-results small {
  max-width: 230px;
  margin-top: 4px;
  color: #9aa8b9;
  font-size: 8px;
  line-height: 1.5;
}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 1250px) {

  .stats-grid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }

  .analytics-grid,
  .lower-grid {
    grid-template-columns: 1fr;
  }

  .quick-actions {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }

}


@media (max-width: 900px) {

  .admin-sidebar {
    width: 76px;
  }

  .sidebar-brand {
    justify-content: center;
    padding: 0;
  }

  .sidebar-brand > div:last-child,
  .menu-title,
  .sidebar-item span:not(.sidebar-icon),
  .sidebar-admin-card > div:last-child,
  .logout-button span:last-child {
    display: none;
  }

  .sidebar-item {
    justify-content: center;
    padding: 0;
  }

  .sidebar-icon {
    font-size: 18px;
  }

  .sidebar-bottom {
    padding: 10px;
  }

  .sidebar-admin-card {
    justify-content: center;
    padding: 9px;
  }

  .logout-button {
    font-size: 0;
  }

  .logout-button::after {
    content: "↪";
    font-size: 18px;
  }

  .admin-topbar {
    padding: 0 20px;
  }

  .top-search {
    width: 320px;
  }

  .admin-content {
    padding: 22px 20px 35px;
  }

}


@media (max-width: 650px) {

  .top-search-container {
    width: 40px;
  }

  .admin-login-page {
    padding: 15px;
  }

  .admin-login-card {
    padding: 28px 22px;
  }

  .admin-topbar {
    height: 65px;
  }

  .top-search {
    width: 45px;
    padding: 0;
    justify-content: center;
  }

  .top-search input {
    display: none;
  }


  .search-results {
    position: fixed;
    top: 70px;
    left: 8px;
    right: 8px;
    width: auto;
    max-height: 60vh;
    border-radius: 12px;
  }

  .search-result-item {
    grid-template-columns: 30px minmax(0, 1fr);
  }

  .search-result-type {
    display: none;
  }

  .topbar-right {
    gap: 8px;
  }

  .top-admin-details,
  .top-admin-menu {
    display: none;
  }

  .dashboard-heading {
    display: block;
  }

  .dashboard-date {
    margin-top: 10px;
  }

  .dashboard-heading h1 {
    font-size: 24px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .status-content {
    flex-direction: column;
  }

  .donut-wrapper {
    width: 100%;
  }

  .quick-actions {
    grid-template-columns: 1fr;
  }

  .admin-content {
    padding: 18px 12px 30px;
  }

}

/* =========================================================
   VIEW ALL + CHART MOBILE FIX
   Added without changing the existing dashboard layout.
========================================================= */

.view-all-button {
  white-space: nowrap;
  min-width: max-content;
  padding: 3px 0;
  -webkit-tap-highlight-color: transparent;
}

.view-all-button:focus-visible {
  outline: 2px solid #267ce9;
  outline-offset: 3px;
  border-radius: 4px;
}

.chart-filters button {
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

.dynamic-chart-svg {
  display: block;
}

@media (max-width: 650px) {

  .chart-card .card-header {
    flex-wrap: wrap;
    gap: 10px;
  }

  .chart-card .card-header > div:first-child {
    width: 100%;
  }

  .chart-filters {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 2px;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }

  .chart-filters::-webkit-scrollbar {
    display: none;
  }

  .chart-filters button {
    flex: 0 0 auto;
    min-width: 42px;
    min-height: 32px;
    padding: 7px 9px;
    font-size: 10px;
  }

  .chart-area {
    min-width: 0;
    padding-left: 10px;
    padding-right: 10px;
  }

  .chart-y-axis {
    width: 25px;
    font-size: 8px;
  }

  .line-chart {
    margin-left: 6px;
    min-width: 0;
  }

  .line-chart svg {
    inset: 8px 0 32px;
    height: calc(100% - 40px);
  }

  .chart-x-axis {
    font-size: 7px;
    gap: 3px;
  }

  .chart-x-axis span {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .lower-grid {
    min-width: 0;
  }

  .recent-leads-card,
  .activity-card {
    min-width: 0;
  }

  .recent-leads-card .card-header,
  .activity-card .card-header {
    gap: 8px;
  }

  .view-all-button {
    font-size: 10px;
    flex-shrink: 0;
  }

  .table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}
`;function Yn({onLogin:e}){let[t,n]=(0,_.useState)(``),[r,i]=(0,_.useState)(``),[a,o]=(0,_.useState)(!1),[s,c]=(0,_.useState)(``);return(0,N.jsx)(`div`,{className:`admin-login-page`,children:(0,N.jsxs)(`div`,{className:`admin-login-card`,children:[(0,N.jsxs)(`div`,{className:`login-logo`,children:[(0,N.jsx)(`div`,{className:`login-logo-icon`,children:`🎓`}),(0,N.jsxs)(`div`,{children:[(0,N.jsxs)(`h1`,{children:[`Student`,(0,N.jsx)(`span`,{children:`College`})]}),(0,N.jsx)(`p`,{children:`Admission Platform`})]})]}),(0,N.jsxs)(`div`,{className:`login-heading`,children:[(0,N.jsx)(`h2`,{children:`Admin Login`}),(0,N.jsx)(`p`,{children:`Sign in to access the administration dashboard.`})]}),(0,N.jsxs)(`form`,{onSubmit:n=>{if(n.preventDefault(),!t||!r){c(`Please enter email and password.`);return}t===`admin@studentcollege.com`&&r===`admin123`?(c(``),e()):c(`Invalid admin email or password.`)},children:[(0,N.jsxs)(`div`,{className:`login-field`,children:[(0,N.jsx)(`label`,{children:`Email Address`}),(0,N.jsxs)(`div`,{className:`input-wrapper`,children:[(0,N.jsx)(`span`,{children:`✉`}),(0,N.jsx)(`input`,{type:`email`,placeholder:`admin@studentcollege.com`,value:t,onChange:e=>n(e.target.value)})]})]}),(0,N.jsxs)(`div`,{className:`login-field`,children:[(0,N.jsx)(`label`,{children:`Password`}),(0,N.jsxs)(`div`,{className:`input-wrapper`,children:[(0,N.jsx)(`span`,{children:`🔒`}),(0,N.jsx)(`input`,{type:a?`text`:`password`,placeholder:`Enter your password`,value:r,onChange:e=>i(e.target.value)}),(0,N.jsx)(`button`,{type:`button`,className:`password-toggle`,onClick:()=>o(!a),children:a?`Hide`:`Show`})]})]}),s&&(0,N.jsx)(`div`,{className:`login-error`,children:s}),(0,N.jsxs)(`div`,{className:`login-options`,children:[(0,N.jsxs)(`label`,{children:[(0,N.jsx)(`input`,{type:`checkbox`}),`Remember me`]}),(0,N.jsx)(`button`,{type:`button`,children:`Forgot Password?`})]}),(0,N.jsxs)(`button`,{className:`admin-login-button`,type:`submit`,children:[`Login to Dashboard`,(0,N.jsx)(`span`,{children:`→`})]})]}),(0,N.jsx)(`div`,{className:`login-security`,children:`🔐 Secure Admin Access`}),(0,N.jsx)(`p`,{className:`login-demo`,children:`Demo: admin@studentcollege.com / admin123`})]})})}function Xn({activePage:e,setActivePage:t,onLogout:n,navigate:r}){return(0,N.jsxs)(`aside`,{className:`admin-sidebar`,children:[(0,N.jsxs)(`div`,{className:`sidebar-brand`,children:[(0,N.jsx)(`div`,{className:`brand-icon`,children:`🎓`}),(0,N.jsxs)(`div`,{children:[(0,N.jsxs)(`h1`,{children:[`Student`,(0,N.jsx)(`span`,{children:`College`})]}),(0,N.jsx)(`p`,{children:`Admission Platform`})]})]}),(0,N.jsxs)(`div`,{className:`sidebar-menu`,children:[(0,N.jsx)(`p`,{className:`menu-title`,children:`MAIN MENU`}),[{name:`Dashboard`,icon:`⌂`},{name:`Students`,icon:`♙`},{name:`Colleges`,icon:`▥`},{name:`Courses`,icon:`▤`},{name:`Leads`,icon:`★`,important:!0},{name:`Applications`,icon:`▣`},{name:`Transactions`,icon:`₹`},{name:`Reports`,icon:`▥`},{name:`Notifications`,icon:`♢`},{name:`Users`,icon:`♙`},{name:`Settings`,icon:`⚙`}].map(n=>(0,N.jsxs)(`button`,{className:`sidebar-item ${e===n.name?`active`:``}`,onClick:()=>{n.name===`Students`?r(`/admin/students`):n.name===`Colleges`?r(`/admin/colleges`):t(n.name)},children:[(0,N.jsx)(`span`,{className:`sidebar-icon`,children:n.icon}),(0,N.jsx)(`span`,{children:n.name}),n.important&&(0,N.jsx)(`span`,{className:`lead-star`,children:`★`})]},n.name))]}),(0,N.jsxs)(`div`,{className:`sidebar-bottom`,children:[(0,N.jsxs)(`div`,{className:`sidebar-admin-card`,children:[(0,N.jsx)(`div`,{className:`admin-avatar`,children:`A`}),(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`strong`,{children:`Admin`}),(0,N.jsx)(`span`,{children:`Super Admin`})]})]}),(0,N.jsxs)(`button`,{className:`logout-button`,onClick:n,children:[(0,N.jsx)(`span`,{children:`↪`}),`Logout`]})]})]})}var Zn=[{title:`Keerthana`,subtitle:`STU10928 • B.Tech CSE • ABC Engineering College`,type:`Student Lead`,page:`Leads`},{title:`Rahul K`,subtitle:`STU10927 • B.Tech Mechanical • PSG College`,type:`Student Lead`,page:`Leads`},{title:`Ananya R`,subtitle:`STU10926 • BCA • City College`,type:`Student Lead`,page:`Leads`},{title:`Arjun P`,subtitle:`STU10925 • B.Com • St. Joseph's College`,type:`Student Lead`,page:`Leads`},{title:`Sneha M`,subtitle:`STU10924 • B.Sc Nursing • Medical College`,type:`Student Lead`,page:`Leads`},{title:`ABC Engineering College`,subtitle:`College verification and lead management`,type:`College`,page:`Colleges`},{title:`PSG College`,subtitle:`College lead purchases and transactions`,type:`College`,page:`Colleges`},{title:`City College`,subtitle:`BCA applications and student leads`,type:`College`,page:`Colleges`},{title:`B.Tech CSE`,subtitle:`Computer Science and Engineering`,type:`Course`,page:`Courses`},{title:`B.Tech Mechanical`,subtitle:`Mechanical Engineering`,type:`Course`,page:`Courses`},{title:`BCA`,subtitle:`Bachelor of Computer Applications`,type:`Course`,page:`Courses`},{title:`B.Com`,subtitle:`Bachelor of Commerce`,type:`Course`,page:`Courses`},{title:`B.Sc Nursing`,subtitle:`Nursing course and applications`,type:`Course`,page:`Courses`},{title:`₹100 Payment`,subtitle:`Lead purchase transaction`,type:`Transaction`,page:`Transactions`},{title:`Lead Reports`,subtitle:`Student lead and purchase analytics`,type:`Report`,page:`Reports`},{title:`Applications`,subtitle:`Student application management`,type:`Application`,page:`Applications`},{title:`Active Users`,subtitle:`Currently active platform users`,type:`User`,page:`Users`},{title:`Total Students`,subtitle:`25,430 registered students`,type:`Dashboard`,page:`Dashboard`},{title:`Total Colleges`,subtitle:`325 registered colleges`,type:`Dashboard`,page:`Dashboard`},{title:`Total Leads`,subtitle:`18,250 student leads`,type:`Dashboard`,page:`Dashboard`},{title:`Purchased Leads`,subtitle:`12,450 purchased leads`,type:`Dashboard`,page:`Dashboard`},{title:`Total Revenue`,subtitle:`₹12,45,000 platform revenue`,type:`Dashboard`,page:`Dashboard`}];function Qn({item:e,onSelect:t}){return(0,N.jsxs)(`button`,{type:`button`,className:`search-result-item`,onClick:()=>t(e),children:[(0,N.jsx)(`span`,{className:`search-result-icon`,children:`⌕`}),(0,N.jsxs)(`span`,{className:`search-result-text`,children:[(0,N.jsx)(`strong`,{children:e.title}),(0,N.jsx)(`small`,{children:e.subtitle})]}),(0,N.jsx)(`span`,{className:`search-result-type`,children:e.type})]})}function $n({onLogout:e,searchQuery:t,setSearchQuery:n,setActivePage:r}){let i=bt(),[a,o]=(0,_.useState)(!1),s=Zn.filter(e=>{let n=t.trim().toLowerCase();return n?e.title.toLowerCase().includes(n)||e.subtitle.toLowerCase().includes(n)||e.type.toLowerCase().includes(n)||e.page.toLowerCase().includes(n):!1}),c=e=>{n(e.target.value),o(!0)},l=e=>{if(n(e.title),o(!1),e.page===`Colleges`){i(`/admin/colleges`);return}r(e.page)};return(0,N.jsxs)(`header`,{className:`admin-topbar`,children:[(0,N.jsxs)(`div`,{className:`top-search-container`,children:[(0,N.jsxs)(`div`,{className:`top-search`,children:[(0,N.jsx)(`span`,{children:`⌕`}),(0,N.jsx)(`input`,{type:`text`,value:t,onChange:c,onFocus:()=>o(!0),onKeyDown:e=>{e.key===`Escape`&&o(!1)},placeholder:`Search students, colleges, leads...`,"aria-label":`Search dashboard`}),t&&(0,N.jsx)(`button`,{type:`button`,className:`search-clear`,onClick:()=>{n(``),o(!1)},"aria-label":`Clear search`,children:`×`})]}),a&&t.trim()&&(0,N.jsx)(`div`,{className:`search-results`,children:s.length>0?(0,N.jsxs)(N.Fragment,{children:[(0,N.jsxs)(`div`,{className:`search-results-heading`,children:[s.length,` result`,s.length>1?`s`:``,` found`]}),s.slice(0,8).map((e,t)=>(0,N.jsx)(Qn,{item:e,onSelect:l},`${e.title}-${e.type}-${t}`))]}):(0,N.jsxs)(`div`,{className:`search-no-results`,children:[(0,N.jsx)(`span`,{children:`⌕`}),(0,N.jsx)(`strong`,{children:`No results found`}),(0,N.jsx)(`small`,{children:`Try student name, college, course, lead or application.`})]})})]}),(0,N.jsxs)(`div`,{className:`topbar-right`,children:[(0,N.jsxs)(`button`,{className:`notification-button`,children:[`♢`,(0,N.jsx)(`span`,{className:`notification-dot`})]}),(0,N.jsxs)(`div`,{className:`top-admin`,children:[(0,N.jsx)(`div`,{className:`top-admin-avatar`,children:`A`}),(0,N.jsxs)(`div`,{className:`top-admin-details`,children:[(0,N.jsx)(`strong`,{children:`Admin`}),(0,N.jsx)(`span`,{children:`Super Admin`})]}),(0,N.jsx)(`button`,{className:`top-admin-menu`,onClick:e,title:`Logout`,children:`⌄`})]})]})]})}function er({icon:e,title:t,value:n,change:r,description:i,iconClass:a}){return(0,N.jsxs)(`div`,{className:`stat-card`,children:[(0,N.jsx)(`div`,{className:`stat-icon ${a}`,children:e}),(0,N.jsxs)(`div`,{className:`stat-content`,children:[(0,N.jsx)(`p`,{children:t}),(0,N.jsx)(`h3`,{children:n}),(0,N.jsxs)(`div`,{className:`stat-change`,children:[(0,N.jsxs)(`span`,{children:[`↑ `,r]}),(0,N.jsx)(`small`,{children:i})]})]})]})}function tr(){let e=new Date().getHours(),t=e<12?`Good Morning, Admin`:e<17?`Good Afternoon, Admin`:`Good Evening, Admin`,[n,r]=(0,_.useState)(!1),[i,a]=(0,_.useState)(!1),[o,s]=(0,_.useState)(`30D`),c={"7D":{values:[120,210,180,360,310,470,540],labels:[`Sep 23`,`Sep 24`,`Sep 25`,`Sep 26`,`Sep 27`,`Sep 28`,`Sep 29`]},"30D":{values:[80,150,320,240,420,370,480,430,610,500,660,550,720,680,810],labels:[`Aug 25`,`Aug 27`,`Aug 29`,`Sep 01`,`Sep 04`,`Sep 07`,`Sep 09`,`Sep 12`,`Sep 14`,`Sep 17`,`Sep 19`,`Sep 22`,`Sep 24`,`Sep 27`,`Sep 29`]},"3M":{values:[180,260,220,390,340,480,430,560,510,640,590,710],labels:[`Jul`,`Jul 08`,`Jul 16`,`Jul 24`,`Aug`,`Aug 08`,`Aug 16`,`Aug 24`,`Sep`,`Sep 08`,`Sep 18`,`Sep 29`]},"6M":{values:[120,180,250,220,340,300,430,390,510,470,620,580],labels:[`Apr`,`Apr 15`,`May`,`May 15`,`Jun`,`Jun 15`,`Jul`,`Jul 15`,`Aug`,`Aug 15`,`Sep`,`Sep 29`]},"1Y":{values:[100,180,150,240,300,270,390,450,420,560,650,810],labels:[`Oct 2025`,`Nov`,`Dec`,`Jan 2026`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`]}}[o],l=c.values.map((e,t)=>`${t/(c.values.length-1)*700},${260-e/800*250}`).join(` `),u=`
    M0 260
    ${c.values.map((e,t)=>`L${t/(c.values.length-1)*700} ${260-e/800*250}`).join(` `)}
    L700 260
    Z
  `,d=[{id:`STU10928`,student:`Keerthana`,college:`ABC Engineering College`,course:`B.Tech CSE`,status:`New`,date:`29 Sep 2026`},{id:`STU10927`,student:`Rahul K`,college:`PSG College`,course:`B.Tech Mechanical`,status:`Purchased`,date:`29 Sep 2026`},{id:`STU10926`,student:`Ananya R`,college:`City College`,course:`BCA`,status:`Converted`,date:`28 Sep 2026`},{id:`STU10925`,student:`Arjun P`,college:`St. Joseph's College`,course:`B.Com`,status:`New`,date:`28 Sep 2026`},{id:`STU10924`,student:`Sneha M`,college:`Medical College`,course:`B.Sc Nursing`,status:`Invalid`,date:`27 Sep 2026`},{id:`STU10923`,student:`Vignesh R`,college:`Kumaraguru College`,course:`B.Tech IT`,status:`Purchased`,date:`27 Sep 2026`},{id:`STU10922`,student:`Priya S`,college:`PSG College`,course:`BCA`,status:`Converted`,date:`26 Sep 2026`},{id:`STU10921`,student:`Karthik M`,college:`City College`,course:`B.Tech ECE`,status:`New`,date:`26 Sep 2026`},{id:`STU10920`,student:`Divya P`,college:`St. Joseph's College`,course:`B.Com`,status:`Purchased`,date:`25 Sep 2026`},{id:`STU10919`,student:`Arun K`,college:`ABC Engineering College`,course:`B.Tech CSE`,status:`Converted`,date:`25 Sep 2026`}],f=[{icon:`✓`,title:`ABC Engineering College approved`,time:`10 minutes ago`,type:`green`},{icon:`₹`,title:`PSG College purchased a student lead`,time:`25 minutes ago`,type:`blue`},{icon:`♙`,title:`New student STU10928 registered`,time:`40 minutes ago`,type:`purple`},{icon:`✓`,title:`College verification completed`,time:`1 hour ago`,type:`orange`},{icon:`₹`,title:`Payment of ₹100 completed`,time:`2 hours ago`,type:`red`},{icon:`✓`,title:`New college profile verified`,time:`3 hours ago`,type:`green`},{icon:`♙`,title:`New student STU10927 registered`,time:`4 hours ago`,type:`purple`},{icon:`₹`,title:`Student lead purchased by PSG College`,time:`5 hours ago`,type:`blue`},{icon:`✓`,title:`Application status updated`,time:`6 hours ago`,type:`orange`},{icon:`₹`,title:`Payment of ₹100 completed`,time:`7 hours ago`,type:`red`}];return(0,N.jsxs)(`div`,{className:`dashboard-home`,children:[(0,N.jsxs)(`div`,{className:`dashboard-heading`,children:[(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`h1`,{children:t}),(0,N.jsx)(`p`,{children:`Manage students, colleges, leads, applications and platform activity in one place.`})]}),(0,N.jsxs)(`div`,{className:`dashboard-date`,children:[(0,N.jsx)(`span`,{children:`Wednesday, 29 Sep 2026`}),(0,N.jsx)(`span`,{className:`calendar-icon`,children:`▣`})]})]}),(0,N.jsxs)(`div`,{className:`stats-grid`,children:[(0,N.jsx)(er,{icon:`♙`,title:`Total Students`,value:`25,430`,change:`+12%`,description:`vs last month`,iconClass:`blue`}),(0,N.jsx)(er,{icon:`▥`,title:`Total Colleges`,value:`325`,change:`+5%`,description:`vs last month`,iconClass:`green`}),(0,N.jsx)(er,{icon:`★`,title:`Total Leads`,value:`18,250`,change:`+18%`,description:`vs last month`,iconClass:`purple`}),(0,N.jsx)(er,{icon:`▣`,title:`Applications`,value:`3,642`,change:`+8%`,description:`vs last month`,iconClass:`orange`}),(0,N.jsx)(er,{icon:`🔓`,title:`Purchased Leads`,value:`12,450`,change:`+15%`,description:`vs last month`,iconClass:`cyan`}),(0,N.jsx)(er,{icon:`₹`,title:`Total Revenue`,value:`₹12,45,000`,change:`+20%`,description:`vs last month`,iconClass:`gold`}),(0,N.jsx)(er,{icon:`♙`,title:`Active Users`,value:`152`,change:`+8%`,description:`vs last month`,iconClass:`pink`}),(0,N.jsx)(er,{icon:`⚡`,title:`Recent Activity`,value:`24`,change:`+6`,description:`today`,iconClass:`red`})]}),(0,N.jsxs)(`div`,{className:`analytics-grid`,children:[(0,N.jsxs)(`div`,{className:`dashboard-card chart-card`,children:[(0,N.jsxs)(`div`,{className:`card-header`,children:[(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`h2`,{children:`Leads & Applications Overview`}),(0,N.jsx)(`p`,{children:`Platform activity over the selected period`})]}),(0,N.jsx)(`div`,{className:`chart-filters`,children:[`7D`,`30D`,`3M`,`6M`,`1Y`].map(e=>(0,N.jsx)(`button`,{type:`button`,className:o===e?`selected`:``,onClick:()=>s(e),"aria-pressed":o===e,children:e},e))})]}),(0,N.jsxs)(`div`,{className:`chart-area`,children:[(0,N.jsxs)(`div`,{className:`chart-y-axis`,children:[(0,N.jsx)(`span`,{children:`800`}),(0,N.jsx)(`span`,{children:`600`}),(0,N.jsx)(`span`,{children:`400`}),(0,N.jsx)(`span`,{children:`200`}),(0,N.jsx)(`span`,{children:`0`})]}),(0,N.jsxs)(`div`,{className:`line-chart`,children:[(0,N.jsx)(`div`,{className:`chart-grid-line line-1`}),(0,N.jsx)(`div`,{className:`chart-grid-line line-2`}),(0,N.jsx)(`div`,{className:`chart-grid-line line-3`}),(0,N.jsx)(`div`,{className:`chart-grid-line line-4`}),(0,N.jsx)(`div`,{className:`chart-grid-line line-5`}),(0,N.jsxs)(`svg`,{viewBox:`0 0 700 260`,preserveAspectRatio:`none`,className:`dynamic-chart-svg`,children:[(0,N.jsx)(`defs`,{children:(0,N.jsxs)(`linearGradient`,{id:`areaGradient`,x1:`0`,y1:`0`,x2:`0`,y2:`1`,children:[(0,N.jsx)(`stop`,{offset:`0%`,stopColor:`#2f80ed`,stopOpacity:`0.25`}),(0,N.jsx)(`stop`,{offset:`100%`,stopColor:`#2f80ed`,stopOpacity:`0.02`})]})}),(0,N.jsx)(`path`,{d:u,fill:`url(#areaGradient)`}),(0,N.jsx)(`polyline`,{points:l,fill:`none`,stroke:`#2f80ed`,strokeWidth:`3`,strokeLinecap:`round`,strokeLinejoin:`round`}),c.values.map((e,t)=>{let n=t/(c.values.length-1)*700,r=260-e/800*250;return(0,N.jsx)(`circle`,{cx:n,cy:r,r:t===c.values.length-1?`5`:`4`,fill:`#2f80ed`},`${o}-${t}`)})]},o),(0,N.jsx)(`div`,{className:`chart-x-axis`,children:c.labels.map((e,t)=>(0,N.jsx)(`span`,{children:e},`${o}-label-${t}`))})]})]})]}),(0,N.jsxs)(`div`,{className:`dashboard-card status-card`,children:[(0,N.jsx)(`div`,{className:`card-header`,children:(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`h2`,{children:`Lead Status`}),(0,N.jsx)(`p`,{children:`Current lead distribution`})]})}),(0,N.jsxs)(`div`,{className:`status-content`,children:[(0,N.jsx)(`div`,{className:`donut-wrapper`,children:(0,N.jsx)(`div`,{className:`donut-chart`,children:(0,N.jsxs)(`div`,{className:`donut-center`,children:[(0,N.jsx)(`strong`,{children:`18,250`}),(0,N.jsx)(`span`,{children:`Total Leads`})]})})}),(0,N.jsxs)(`div`,{className:`status-list`,children:[(0,N.jsxs)(`div`,{className:`status-row`,children:[(0,N.jsx)(`span`,{className:`status-color pending`}),(0,N.jsx)(`span`,{children:`New`}),(0,N.jsx)(`strong`,{children:`6,205`}),(0,N.jsx)(`small`,{children:`34%`})]}),(0,N.jsxs)(`div`,{className:`status-row`,children:[(0,N.jsx)(`span`,{className:`status-color review`}),(0,N.jsx)(`span`,{children:`Purchased`}),(0,N.jsx)(`strong`,{children:`5,110`}),(0,N.jsx)(`small`,{children:`28%`})]}),(0,N.jsxs)(`div`,{className:`status-row`,children:[(0,N.jsx)(`span`,{className:`status-color accepted`}),(0,N.jsx)(`span`,{children:`Converted`}),(0,N.jsx)(`strong`,{children:`4,380`}),(0,N.jsx)(`small`,{children:`24%`})]}),(0,N.jsxs)(`div`,{className:`status-row`,children:[(0,N.jsx)(`span`,{className:`status-color rejected`}),(0,N.jsx)(`span`,{children:`Invalid`}),(0,N.jsx)(`strong`,{children:`2,555`}),(0,N.jsx)(`small`,{children:`14%`})]})]})]})]})]}),(0,N.jsxs)(`div`,{className:`lower-grid`,children:[(0,N.jsxs)(`div`,{className:`dashboard-card recent-leads-card`,children:[(0,N.jsxs)(`div`,{className:`card-header`,children:[(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`h2`,{children:`Recent Student Leads`}),(0,N.jsx)(`p`,{children:`Latest student leads received by the platform`})]}),(0,N.jsx)(`button`,{type:`button`,className:`view-all-button`,onClick:()=>r(e=>!e),"aria-expanded":n,children:n?`Show Less ←`:`View All →`})]}),(0,N.jsx)(`div`,{className:`table-wrapper`,children:(0,N.jsxs)(`table`,{children:[(0,N.jsx)(`thead`,{children:(0,N.jsxs)(`tr`,{children:[(0,N.jsx)(`th`,{children:`#`}),(0,N.jsx)(`th`,{children:`Student`}),(0,N.jsx)(`th`,{children:`College`}),(0,N.jsx)(`th`,{children:`Course`}),(0,N.jsx)(`th`,{children:`Applied On`}),(0,N.jsx)(`th`,{children:`Status`})]})}),(0,N.jsx)(`tbody`,{children:d.slice(0,n?d.length:5).map((e,t)=>(0,N.jsxs)(`tr`,{children:[(0,N.jsx)(`td`,{children:t+1}),(0,N.jsx)(`td`,{children:(0,N.jsxs)(`div`,{className:`student-cell`,children:[(0,N.jsx)(`div`,{className:`student-avatar`,children:e.student.charAt(0)}),(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`strong`,{children:e.student}),(0,N.jsx)(`span`,{children:e.id})]})]})}),(0,N.jsx)(`td`,{children:e.college}),(0,N.jsx)(`td`,{children:e.course}),(0,N.jsx)(`td`,{children:e.date}),(0,N.jsx)(`td`,{children:(0,N.jsx)(`span`,{className:`lead-status ${e.status.toLowerCase()}`,children:e.status})})]},e.id))})]})})]}),(0,N.jsxs)(`div`,{className:`dashboard-card activity-card`,children:[(0,N.jsxs)(`div`,{className:`card-header`,children:[(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`h2`,{children:`Recent Activity`}),(0,N.jsx)(`p`,{children:`Latest admin and platform activities`})]}),(0,N.jsx)(`button`,{type:`button`,className:`view-all-button`,onClick:()=>a(e=>!e),"aria-expanded":i,children:i?`Show Less ←`:`View All →`})]}),(0,N.jsx)(`div`,{className:`activity-list`,children:f.slice(0,i?f.length:5).map((e,t)=>(0,N.jsxs)(`div`,{className:`activity-item`,children:[(0,N.jsx)(`div`,{className:`activity-icon ${e.type}`,children:e.icon}),(0,N.jsxs)(`div`,{className:`activity-details`,children:[(0,N.jsx)(`strong`,{children:e.title}),(0,N.jsx)(`span`,{children:e.time})]})]},t))})]})]}),(0,N.jsxs)(`div`,{className:`dashboard-card quick-actions-card`,children:[(0,N.jsx)(`div`,{className:`card-header`,children:(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`h2`,{children:`Quick Actions`}),(0,N.jsx)(`p`,{children:`Frequently used admin actions`})]})}),(0,N.jsxs)(`div`,{className:`quick-actions`,children:[(0,N.jsxs)(`button`,{children:[(0,N.jsx)(`span`,{className:`quick-icon blue`,children:`✓`}),(0,N.jsxs)(`span`,{children:[(0,N.jsx)(`strong`,{children:`Verify Colleges`}),(0,N.jsx)(`small`,{children:`Review pending colleges`})]})]}),(0,N.jsxs)(`button`,{children:[(0,N.jsx)(`span`,{className:`quick-icon green`,children:`★`}),(0,N.jsxs)(`span`,{children:[(0,N.jsx)(`strong`,{children:`View New Leads`}),(0,N.jsx)(`small`,{children:`Check recent student leads`})]})]}),(0,N.jsxs)(`button`,{children:[(0,N.jsx)(`span`,{className:`quick-icon purple`,children:`₹`}),(0,N.jsxs)(`span`,{children:[(0,N.jsx)(`strong`,{children:`Transactions`}),(0,N.jsx)(`small`,{children:`Monitor ₹100 purchases`})]})]}),(0,N.jsxs)(`button`,{children:[(0,N.jsx)(`span`,{className:`quick-icon orange`,children:`▥`}),(0,N.jsxs)(`span`,{children:[(0,N.jsx)(`strong`,{children:`Generate Report`}),(0,N.jsx)(`small`,{children:`Download analytics report`})]})]})]})]})]})}function nr({title:e}){return(0,N.jsxs)(`div`,{className:`admin-section-placeholder`,children:[(0,N.jsx)(`div`,{className:`placeholder-icon`,children:`⚙`}),(0,N.jsx)(`h1`,{children:e}),(0,N.jsxs)(`p`,{children:[e,` management page will be connected here.`]}),(0,N.jsx)(`span`,{children:`Dashboard UI is ready.`})]})}function rr(){let e=bt(),[t,n]=(0,_.useState)(()=>sessionStorage.getItem(`adminLoggedIn`)===`true`),[r,i]=(0,_.useState)(`Dashboard`),[a,o]=(0,_.useState)(``),s=()=>{sessionStorage.setItem(`adminLoggedIn`,`true`),n(!0)},c=()=>{sessionStorage.removeItem(`adminLoggedIn`),n(!1),i(`Dashboard`),o(``),e(`/admin/dashboard`,{replace:!0})};return t?(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(`style`,{children:Jn}),(0,N.jsxs)(`div`,{className:`admin-app`,children:[(0,N.jsx)(Xn,{activePage:r,setActivePage:i,onLogout:c,navigate:e}),(0,N.jsxs)(`div`,{className:`admin-main`,children:[(0,N.jsx)($n,{onLogout:c,searchQuery:a,setSearchQuery:o,setActivePage:i}),(0,N.jsx)(`main`,{className:`admin-content`,children:r===`Dashboard`?(0,N.jsx)(tr,{}):(0,N.jsx)(nr,{title:r})})]})]})]}):(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(`style`,{children:Jn}),(0,N.jsx)(Yn,{onLogin:s})]})}var ir=[`Hostel`,`Library`,`Laboratories`,`Transport`,`Sports`,`Canteen`,`Wi-Fi`,`Medical Centre`],ar=[`Hostel`,`Library`,`Computer Lab`,`Transport`,`Sports`,`Canteen`,`Wi-Fi`,`Auditorium`],or=[`Hostel`,`Central Library`,`Clinical Labs`,`Teaching Hospital`,`Transport`,`Sports`,`Canteen`,`Medical Services`],sr=[{company:`TCS`,industry:`IT Services`,hiringFor:`CSE / IT / ECE`,roles:`Software Developer, Analyst`,status:`Active`},{company:`Infosys`,industry:`IT Services`,hiringFor:`CSE / IT / ECE`,roles:`Software Engineer, Analyst`,status:`Active`},{company:`Wipro`,industry:`IT Services`,hiringFor:`CSE / IT / ECE`,roles:`Developer, Project Engineer`,status:`Active`},{company:`Accenture`,industry:`Consulting / IT`,hiringFor:`CSE / IT / ECE`,roles:`Associate Software Engineer`,status:`Active`},{company:`Cognizant`,industry:`IT Services`,hiringFor:`CSE / IT / ECE`,roles:`Programmer Analyst`,status:`Active`},{company:`Deloitte`,industry:`Consulting`,hiringFor:`CSE / IT / Management`,roles:`Analyst, Technology Consultant`,status:`Active`},{company:`Zoho`,industry:`Software`,hiringFor:`CSE / IT`,roles:`Member Technical Staff`,status:`Active`},{company:`Amazon`,industry:`Technology`,hiringFor:`CSE / IT`,roles:`Software Development`,status:`Active`},{company:`Microsoft`,industry:`Technology`,hiringFor:`CSE / IT`,roles:`Software Engineer`,status:`Active`}],cr=[{company:`TCS`,industry:`IT Services`,hiringFor:`BCA / B.Com / B.Sc`,roles:`Associate, Analyst`,status:`Active`},{company:`Infosys`,industry:`IT Services`,hiringFor:`BCA / B.Sc / B.Com`,roles:`Process Executive, Analyst`,status:`Active`},{company:`Wipro`,industry:`IT Services`,hiringFor:`BCA / B.Com / BBA`,roles:`Process Associate`,status:`Active`},{company:`Accenture`,industry:`Consulting / IT`,hiringFor:`BCA / B.Com / BBA`,roles:`Associate`,status:`Active`},{company:`Deloitte`,industry:`Consulting`,hiringFor:`B.Com / BBA`,roles:`Analyst`,status:`Active`},{company:`HDFC Bank`,industry:`Banking`,hiringFor:`B.Com / BBA`,roles:`Relationship Executive`,status:`Active`}],lr=[{company:`Apollo Hospitals`,industry:`Healthcare`,hiringFor:`Medical / Nursing / Allied Health`,roles:`Clinical / Healthcare Roles`,status:`Active`},{company:`Kauvery Hospital`,industry:`Healthcare`,hiringFor:`Nursing / Allied Health`,roles:`Clinical Roles`,status:`Active`},{company:`KMCH`,industry:`Healthcare`,hiringFor:`Medical / Nursing / Allied Health`,roles:`Clinical Roles`,status:`Active`},{company:`PSG Hospitals`,industry:`Healthcare`,hiringFor:`Medical / Nursing / Allied Health`,roles:`Clinical Roles`,status:`Active`},{company:`Fortis Healthcare`,industry:`Healthcare`,hiringFor:`Nursing / Allied Health`,roles:`Clinical Roles`,status:`Active`}];function P({id:e,short:t,name:n,category:r,location:i,type:a,ownership:o,grade:s,affiliation:c,established:l,status:u=`Verified`,courses:d,facilities:f,companies:p,annualFee:m=`College Specific`}){return{id:e,short:t,name:n,category:r,location:i,state:`Tamil Nadu`,type:a,ownership:o,grade:s,affiliation:c,established:l,status:u,accreditation:`College Specific`,website:`Official College Website`,courses:d,facilities:f,companies:p,annualFee:m,managementFee:`College Specific`,hostelFee:`College Specific`,counsellingFee:`College Specific`,otherFee:`College Specific`,eligibility:r===`Medical`?`Course-specific eligibility / NEET where applicable`:`12th completed / course-specific eligibility`,admission:`Counselling / Management / Applicable Admission Process`,placementAvailable:`Yes`,averagePackage:`College Specific`,highestPackage:`College Specific`,studentsPlaced:`College Specific`,description:`College information shown in this admin module. Production values can be updated by the administrator.`}}var ur={"Aerospace Engineering":`₹1,80,000 / year`,"Aeronautical Engineering (Lateral)":`₹1,60,000 / year`,"Agricultural Engineering":`₹1,20,000 / year`,"Automobile Engineering":`₹1,30,000 / year`,"Artificial Intelligence and Machine Learning":`₹2,00,000 / year`,"Bio-Medical Engineering":`₹1,40,000 / year`,"Civil Engineering":`₹1,20,000 / year`,"Computer Science and Engineering":`₹2,00,000 / year`,"Electrical & Electronics Engineering":`₹1,30,000 / year`,"Electronics and Communication Engineering":`₹1,50,000 / year`,"Electronics and Instrumentation Engineering":`₹1,35,000 / year`,"Mechatronics Engineering":`₹1,45,000 / year`,"Information Technology":`₹1,80,000 / year`,"Mechanical Engineering":`₹1,25,000 / year`,"Computer Science and Technology":`₹1,90,000 / year`},dr={"B.A English":`₹35,000 / year`,"B.A Economics":`₹35,000 / year`,"B.Com":`₹45,000 / year`,"B.Com Computer Applications":`₹50,000 / year`,BBA:`₹55,000 / year`,BCA:`₹60,000 / year`,"B.Sc Computer Science":`₹55,000 / year`,"B.Sc Mathematics":`₹35,000 / year`,"B.Sc Physics":`₹35,000 / year`,"B.Sc Chemistry":`₹40,000 / year`,"B.Sc Biotechnology":`₹60,000 / year`,"B.Sc Psychology":`₹45,000 / year`,"B.Sc Data Science":`₹65,000 / year`,"B.Sc Statistics":`₹40,000 / year`,"B.Sc Visual Communication":`₹55,000 / year`},fr={MBBS:`₹1,50,000 / year`,BDS:`₹2,50,000 / year`,"B.Sc Nursing":`₹1,00,000 / year`,"BPT / Physiotherapy":`₹90,000 / year`,Pharmacy:`₹1,10,000 / year`,"Allied Health Sciences":`₹80,000 / year`,Nursing:`₹1,00,000 / year`,"Postgraduate Medical Courses":`Course Specific`};function pr(e,t){return e.category===`Engineering`?ur[t]||e.annualFee:e.category===`Arts & Science`?dr[t]||e.annualFee:fr[t]||e.annualFee}var mr=[P({id:`ENG001`,short:`IIT`,name:`Indian Institute of Technology Madras`,category:`Engineering`,location:`Chennai`,type:`Institute`,ownership:`Government`,grade:`A++`,affiliation:`Autonomous / Institute of National Importance`,established:`1959`,courses:[`Aerospace Engineering`,`Aeronautical Engineering (Lateral)`,`Agricultural Engineering`,`Automobile Engineering`,`Artificial Intelligence and Machine Learning`,`Bio-Medical Engineering`,`Civil Engineering`,`Computer Science and Engineering`,`Electrical & Electronics Engineering`,`Electronics and Communication Engineering`,`Electronics and Instrumentation Engineering`,`Mechatronics Engineering`,`Information Technology`,`Mechanical Engineering`,`Computer Science and Technology`],facilities:ir,companies:sr}),P({id:`ENG002`,short:`NIT`,name:`National Institute of Technology Tiruchirappalli`,category:`Engineering`,location:`Tiruchirappalli`,type:`Institute`,ownership:`Government`,grade:`A++`,affiliation:`Institute of National Importance`,established:`1964`,courses:[`Aerospace Engineering`,`Aeronautical Engineering (Lateral)`,`Agricultural Engineering`,`Automobile Engineering`,`Artificial Intelligence and Machine Learning`,`Bio-Medical Engineering`,`Civil Engineering`,`Computer Science and Engineering`,`Electrical & Electronics Engineering`,`Electronics and Communication Engineering`,`Electronics and Instrumentation Engineering`,`Mechatronics Engineering`,`Information Technology`,`Mechanical Engineering`,`Computer Science and Technology`],facilities:ir,companies:sr}),P({id:`ENG003`,short:`AU`,name:`Anna University`,category:`Engineering`,location:`Chennai`,type:`University`,ownership:`Government`,grade:`A+`,affiliation:`Anna University`,established:`1978`,courses:[`Aerospace Engineering`,`Aeronautical Engineering (Lateral)`,`Agricultural Engineering`,`Automobile Engineering`,`Artificial Intelligence and Machine Learning`,`Bio-Medical Engineering`,`Civil Engineering`,`Computer Science and Engineering`,`Electrical & Electronics Engineering`,`Electronics and Communication Engineering`,`Electronics and Instrumentation Engineering`,`Mechatronics Engineering`,`Information Technology`,`Mechanical Engineering`,`Computer Science and Technology`],facilities:ir,companies:sr}),P({id:`ENG004`,short:`VIT`,name:`Vellore Institute of Technology`,category:`Engineering`,location:`Vellore`,type:`Deemed University`,ownership:`Private / Deemed`,grade:`A++`,affiliation:`VIT`,established:`1984`,courses:[`Aerospace Engineering`,`Aeronautical Engineering (Lateral)`,`Agricultural Engineering`,`Automobile Engineering`,`Artificial Intelligence and Machine Learning`,`Bio-Medical Engineering`,`Civil Engineering`,`Computer Science and Engineering`,`Electrical & Electronics Engineering`,`Electronics and Communication Engineering`,`Electronics and Instrumentation Engineering`,`Mechatronics Engineering`,`Information Technology`,`Mechanical Engineering`,`Computer Science and Technology`],facilities:ir,companies:sr}),P({id:`ENG005`,short:`SRM`,name:`SRM Institute of Science and Technology`,category:`Engineering`,location:`Chennai`,type:`Deemed University`,ownership:`Private / Deemed`,grade:`A++`,affiliation:`SRMIST`,established:`1985`,courses:[`Aerospace Engineering`,`Aeronautical Engineering (Lateral)`,`Agricultural Engineering`,`Automobile Engineering`,`Artificial Intelligence and Machine Learning`,`Bio-Medical Engineering`,`Civil Engineering`,`Computer Science and Engineering`,`Electrical & Electronics Engineering`,`Electronics and Communication Engineering`,`Electronics and Instrumentation Engineering`,`Mechatronics Engineering`,`Information Technology`,`Mechanical Engineering`,`Computer Science and Technology`],facilities:ir,companies:sr}),P({id:`ENG006`,short:`AMR`,name:`Amrita Vishwa Vidyapeetham`,category:`Engineering`,location:`Coimbatore`,type:`Deemed University`,ownership:`Private / Deemed`,grade:`A++`,affiliation:`Amrita Vishwa Vidyapeetham`,established:`1994`,courses:[`Aerospace Engineering`,`Aeronautical Engineering (Lateral)`,`Agricultural Engineering`,`Automobile Engineering`,`Artificial Intelligence and Machine Learning`,`Bio-Medical Engineering`,`Civil Engineering`,`Computer Science and Engineering`,`Electrical & Electronics Engineering`,`Electronics and Communication Engineering`,`Electronics and Instrumentation Engineering`,`Mechatronics Engineering`,`Information Technology`,`Mechanical Engineering`,`Computer Science and Technology`],facilities:ir,companies:sr}),P({id:`ENG007`,short:`PT`,name:`PSG College of Technology`,category:`Engineering`,location:`Coimbatore`,type:`Autonomous`,ownership:`Private`,grade:`A++`,affiliation:`Anna University`,established:`1951`,courses:[`Aerospace Engineering`,`Aeronautical Engineering (Lateral)`,`Agricultural Engineering`,`Automobile Engineering`,`Artificial Intelligence and Machine Learning`,`Bio-Medical Engineering`,`Civil Engineering`,`Computer Science and Engineering`,`Electrical & Electronics Engineering`,`Electronics and Communication Engineering`,`Electronics and Instrumentation Engineering`,`Mechatronics Engineering`,`Information Technology`,`Mechanical Engineering`,`Computer Science and Technology`],facilities:ir,companies:sr}),P({id:`ENG008`,short:`CIT`,name:`Coimbatore Institute of Technology`,category:`Engineering`,location:`Coimbatore`,type:`Autonomous`,ownership:`Private`,grade:`A+`,affiliation:`Anna University`,established:`1956`,courses:[`Aerospace Engineering`,`Aeronautical Engineering (Lateral)`,`Agricultural Engineering`,`Automobile Engineering`,`Artificial Intelligence and Machine Learning`,`Bio-Medical Engineering`,`Civil Engineering`,`Computer Science and Engineering`,`Electrical & Electronics Engineering`,`Electronics and Communication Engineering`,`Electronics and Instrumentation Engineering`,`Mechatronics Engineering`,`Information Technology`,`Mechanical Engineering`,`Computer Science and Technology`],facilities:ir,companies:sr}),P({id:`ENG009`,short:`KCT`,name:`Kumaraguru College of Technology`,category:`Engineering`,location:`Coimbatore`,type:`Autonomous`,ownership:`Private`,grade:`A+`,affiliation:`Anna University`,established:`1984`,courses:[`Aerospace Engineering`,`Aeronautical Engineering (Lateral)`,`Agricultural Engineering`,`Automobile Engineering`,`Artificial Intelligence and Machine Learning`,`Bio-Medical Engineering`,`Civil Engineering`,`Computer Science and Engineering`,`Electrical & Electronics Engineering`,`Electronics and Communication Engineering`,`Electronics and Instrumentation Engineering`,`Mechatronics Engineering`,`Information Technology`,`Mechanical Engineering`,`Computer Science and Technology`],facilities:ir,companies:sr}),P({id:`ENG010`,short:`SNS`,name:`SNS College of Technology`,category:`Engineering`,location:`Coimbatore`,type:`Autonomous`,ownership:`Private`,grade:`A`,affiliation:`Anna University`,established:`2002`,courses:[`Aerospace Engineering`,`Aeronautical Engineering (Lateral)`,`Agricultural Engineering`,`Automobile Engineering`,`Artificial Intelligence and Machine Learning`,`Bio-Medical Engineering`,`Civil Engineering`,`Computer Science and Engineering`,`Electrical & Electronics Engineering`,`Electronics and Communication Engineering`,`Electronics and Instrumentation Engineering`,`Mechatronics Engineering`,`Information Technology`,`Mechanical Engineering`,`Computer Science and Technology`],facilities:ir,companies:sr}),P({id:`ART001`,short:`PKW`,name:`PSGR Krishnammal College for Women`,category:`Arts & Science`,location:`Coimbatore`,type:`Autonomous`,ownership:`Private`,grade:`A++`,affiliation:`Bharathiar University`,established:`1963`,courses:[`B.A English`,`B.A Economics`,`B.Com`,`B.Com Computer Applications`,`BBA`,`BCA`,`B.Sc Computer Science`,`B.Sc Mathematics`,`B.Sc Physics`,`B.Sc Chemistry`,`B.Sc Biotechnology`,`B.Sc Psychology`,`B.Sc Data Science`,`B.Sc Statistics`,`B.Sc Visual Communication`],facilities:ar,companies:cr}),P({id:`ART002`,short:`LOY`,name:`Loyola College`,category:`Arts & Science`,location:`Chennai`,type:`Autonomous`,ownership:`Private`,grade:`A++`,affiliation:`University of Madras`,established:`1925`,courses:[`B.A English`,`B.A Economics`,`B.Com`,`B.Com Computer Applications`,`BBA`,`BCA`,`B.Sc Computer Science`,`B.Sc Mathematics`,`B.Sc Physics`,`B.Sc Chemistry`,`B.Sc Biotechnology`,`B.Sc Psychology`,`B.Sc Data Science`,`B.Sc Statistics`,`B.Sc Visual Communication`],facilities:ar,companies:cr}),P({id:`ART003`,short:`PCS`,name:`PSG College of Arts and Science`,category:`Arts & Science`,location:`Coimbatore`,type:`Autonomous`,ownership:`Private`,grade:`A++`,affiliation:`Bharathiar University`,established:`1947`,courses:[`B.A English`,`B.A Economics`,`B.Com`,`B.Com Computer Applications`,`BBA`,`BCA`,`B.Sc Computer Science`,`B.Sc Mathematics`,`B.Sc Physics`,`B.Sc Chemistry`,`B.Sc Biotechnology`,`B.Sc Psychology`,`B.Sc Data Science`,`B.Sc Statistics`,`B.Sc Visual Communication`],facilities:ar,companies:cr}),P({id:`ART004`,short:`MCC`,name:`Madras Christian College`,category:`Arts & Science`,location:`Chennai`,type:`Autonomous`,ownership:`Private`,grade:`A+`,affiliation:`University of Madras`,established:`1837`,courses:[`B.A English`,`B.A Economics`,`B.Com`,`B.Com Computer Applications`,`BBA`,`BCA`,`B.Sc Computer Science`,`B.Sc Mathematics`,`B.Sc Physics`,`B.Sc Chemistry`,`B.Sc Biotechnology`,`B.Sc Psychology`,`B.Sc Data Science`,`B.Sc Statistics`,`B.Sc Visual Communication`],facilities:ar,companies:cr}),P({id:`ART005`,short:`PC`,name:`Presidency College`,category:`Arts & Science`,location:`Chennai`,type:`Government`,ownership:`Government`,grade:`A+`,affiliation:`University of Madras`,established:`1840`,courses:[`B.A English`,`B.A Economics`,`B.Com`,`B.Com Computer Applications`,`BBA`,`BCA`,`B.Sc Computer Science`,`B.Sc Mathematics`,`B.Sc Physics`,`B.Sc Chemistry`,`B.Sc Biotechnology`,`B.Sc Psychology`,`B.Sc Data Science`,`B.Sc Statistics`,`B.Sc Visual Communication`],facilities:ar,companies:cr}),P({id:`ART006`,short:`TC`,name:`Thiagarajar College`,category:`Arts & Science`,location:`Madurai`,type:`Autonomous`,ownership:`Private`,grade:`A+`,affiliation:`Madurai Kamaraj University`,established:`1949`,courses:[`B.A English`,`B.A Economics`,`B.Com`,`B.Com Computer Applications`,`BBA`,`BCA`,`B.Sc Computer Science`,`B.Sc Mathematics`,`B.Sc Physics`,`B.Sc Chemistry`,`B.Sc Biotechnology`,`B.Sc Psychology`,`B.Sc Data Science`,`B.Sc Statistics`,`B.Sc Visual Communication`],facilities:ar,companies:cr}),P({id:`ART007`,short:`SMC`,name:`Stella Maris College`,category:`Arts & Science`,location:`Chennai`,type:`Autonomous`,ownership:`Private`,grade:`A+`,affiliation:`University of Madras`,established:`1947`,courses:[`B.A English`,`B.A Economics`,`B.Com`,`B.Com Computer Applications`,`BBA`,`BCA`,`B.Sc Computer Science`,`B.Sc Mathematics`,`B.Sc Physics`,`B.Sc Chemistry`,`B.Sc Biotechnology`,`B.Sc Psychology`,`B.Sc Data Science`,`B.Sc Statistics`,`B.Sc Visual Communication`],facilities:ar,companies:cr}),P({id:`ART008`,short:`ECW`,name:`Ethiraj College for Women`,category:`Arts & Science`,location:`Chennai`,type:`Autonomous`,ownership:`Private`,grade:`A+`,affiliation:`University of Madras`,established:`1948`,courses:[`B.A English`,`B.A Economics`,`B.Com`,`B.Com Computer Applications`,`BBA`,`BCA`,`B.Sc Computer Science`,`B.Sc Mathematics`,`B.Sc Physics`,`B.Sc Chemistry`,`B.Sc Biotechnology`,`B.Sc Psychology`,`B.Sc Data Science`,`B.Sc Statistics`,`B.Sc Visual Communication`],facilities:ar,companies:cr}),P({id:`ART009`,short:`KAS`,name:`Kongunadu Arts and Science College`,category:`Arts & Science`,location:`Coimbatore`,type:`Autonomous`,ownership:`Private`,grade:`A`,affiliation:`Bharathiar University`,established:`1973`,courses:[`B.A English`,`B.A Economics`,`B.Com`,`B.Com Computer Applications`,`BBA`,`BCA`,`B.Sc Computer Science`,`B.Sc Mathematics`,`B.Sc Physics`,`B.Sc Chemistry`,`B.Sc Biotechnology`,`B.Sc Psychology`,`B.Sc Data Science`,`B.Sc Statistics`,`B.Sc Visual Communication`],facilities:ar,companies:cr}),P({id:`ART010`,short:`HAS`,name:`Hindusthan College of Arts and Science`,category:`Arts & Science`,location:`Coimbatore`,type:`Autonomous`,ownership:`Private`,grade:`A`,affiliation:`Bharathiar University`,established:`1995`,courses:[`B.A English`,`B.A Economics`,`B.Com`,`B.Com Computer Applications`,`BBA`,`BCA`,`B.Sc Computer Science`,`B.Sc Mathematics`,`B.Sc Physics`,`B.Sc Chemistry`,`B.Sc Biotechnology`,`B.Sc Psychology`,`B.Sc Data Science`,`B.Sc Statistics`,`B.Sc Visual Communication`],facilities:ar,companies:cr}),P({id:`MED001`,short:`MMC`,name:`Madras Medical College`,category:`Medical`,location:`Chennai`,type:`Government Medical College`,ownership:`Government`,grade:`A++`,affiliation:`The Tamil Nadu Dr. M.G.R. Medical University`,established:`1835`,courses:[`MBBS`,`BDS`,`B.Sc Nursing`,`BPT / Physiotherapy`,`Pharmacy`,`Allied Health Sciences`,`Nursing`,`Postgraduate Medical Courses`],facilities:or,companies:lr}),P({id:`MED002`,short:`SMC`,name:`Stanley Medical College`,category:`Medical`,location:`Chennai`,type:`Government Medical College`,ownership:`Government`,grade:`A+`,affiliation:`The Tamil Nadu Dr. M.G.R. Medical University`,established:`1938`,courses:[`MBBS`,`BDS`,`B.Sc Nursing`,`BPT / Physiotherapy`,`Pharmacy`,`Allied Health Sciences`,`Nursing`,`Postgraduate Medical Courses`],facilities:or,companies:lr}),P({id:`MED003`,short:`KMC`,name:`Government Kilpauk Medical College`,category:`Medical`,location:`Chennai`,type:`Government Medical College`,ownership:`Government`,grade:`A+`,affiliation:`The Tamil Nadu Dr. M.G.R. Medical University`,established:`1924`,courses:[`MBBS`,`BDS`,`B.Sc Nursing`,`BPT / Physiotherapy`,`Pharmacy`,`Allied Health Sciences`,`Nursing`,`Postgraduate Medical Courses`],facilities:or,companies:lr}),P({id:`MED004`,short:`CMC`,name:`Coimbatore Medical College`,category:`Medical`,location:`Coimbatore`,type:`Government Medical College`,ownership:`Government`,grade:`A+`,affiliation:`The Tamil Nadu Dr. M.G.R. Medical University`,established:`1966`,courses:[`MBBS`,`BDS`,`B.Sc Nursing`,`BPT / Physiotherapy`,`Pharmacy`,`Allied Health Sciences`,`Nursing`,`Postgraduate Medical Courses`],facilities:or,companies:lr}),P({id:`MED005`,short:`MMC-M`,name:`Madurai Medical College`,category:`Medical`,location:`Madurai`,type:`Government Medical College`,ownership:`Government`,grade:`A+`,affiliation:`The Tamil Nadu Dr. M.G.R. Medical University`,established:`1954`,courses:[`MBBS`,`BDS`,`B.Sc Nursing`,`BPT / Physiotherapy`,`Pharmacy`,`Allied Health Sciences`,`Nursing`,`Postgraduate Medical Courses`],facilities:or,companies:lr}),P({id:`MED006`,short:`GMC-T`,name:`Tiruchirappalli Government Medical College`,category:`Medical`,location:`Tiruchirappalli`,type:`Government Medical College`,ownership:`Government`,grade:`A`,affiliation:`The Tamil Nadu Dr. M.G.R. Medical University`,established:`1990`,courses:[`MBBS`,`BDS`,`B.Sc Nursing`,`BPT / Physiotherapy`,`Pharmacy`,`Allied Health Sciences`,`Nursing`,`Postgraduate Medical Courses`],facilities:or,companies:lr}),P({id:`MED007`,short:`GMC-S`,name:`Government Mohan Kumaramangalam Medical College`,category:`Medical`,location:`Salem`,type:`Government Medical College`,ownership:`Government`,grade:`A`,affiliation:`The Tamil Nadu Dr. M.G.R. Medical University`,established:`1980`,courses:[`MBBS`,`BDS`,`B.Sc Nursing`,`BPT / Physiotherapy`,`Pharmacy`,`Allied Health Sciences`,`Nursing`,`Postgraduate Medical Courses`],facilities:or,companies:lr}),P({id:`MED008`,short:`PSG-M`,name:`PSG Institute of Medical Sciences & Research`,category:`Medical`,location:`Coimbatore`,type:`Medical College`,ownership:`Private`,grade:`A+`,affiliation:`The Tamil Nadu Dr. M.G.R. Medical University`,established:`1985`,courses:[`MBBS`,`BDS`,`B.Sc Nursing`,`BPT / Physiotherapy`,`Pharmacy`,`Allied Health Sciences`,`Nursing`,`Postgraduate Medical Courses`],facilities:or,companies:lr}),P({id:`MED009`,short:`SRI`,name:`Sri Ramachandra Institute of Higher Education and Research`,category:`Medical`,location:`Chennai`,type:`Deemed University`,ownership:`Private / Deemed`,grade:`A++`,affiliation:`Sri Ramachandra Institute`,established:`1985`,courses:[`MBBS`,`BDS`,`B.Sc Nursing`,`BPT / Physiotherapy`,`Pharmacy`,`Allied Health Sciences`,`Nursing`,`Postgraduate Medical Courses`],facilities:or,companies:lr}),P({id:`MED010`,short:`SAVE`,name:`Saveetha Institute of Medical and Technical Sciences`,category:`Medical`,location:`Chennai`,type:`Deemed University`,ownership:`Private / Deemed`,grade:`A+`,affiliation:`Saveetha Institute`,established:`1988`,courses:[`MBBS`,`BDS`,`B.Sc Nursing`,`BPT / Physiotherapy`,`Pharmacy`,`Allied Health Sciences`,`Nursing`,`Postgraduate Medical Courses`],facilities:or,companies:lr})];function hr({onCollegesClick:e}){let t=bt(),n=_t();return(0,N.jsxs)(`aside`,{className:`college-sidebar`,children:[(0,N.jsxs)(`div`,{className:`college-brand`,children:[(0,N.jsx)(`div`,{className:`brand-icon`,children:`🎓`}),(0,N.jsxs)(`div`,{children:[(0,N.jsxs)(`h1`,{children:[`Student`,(0,N.jsx)(`span`,{children:`College`})]}),(0,N.jsx)(`p`,{children:`Admission Platform`})]})]}),(0,N.jsxs)(`div`,{className:`sidebar-scroll`,children:[(0,N.jsx)(`p`,{className:`menu-title`,children:`MAIN MENU`}),[[`Dashboard`,`⌂`,`/admin/dashboard`],[`Students`,`♙`,`/admin/students`],[`Colleges`,`▥`,`/admin/colleges`],[`Courses`,`▤`,`/admin/courses`],[`Leads`,`★`,`/admin/leads`],[`Applications`,`▣`,`/admin/applications`],[`Transactions`,`₹`,`/admin/transactions`],[`Reports`,`▥`,`/admin/reports`],[`Notifications`,`♢`,`/admin/notifications`],[`Users`,`♙`,`/admin/users`],[`Settings`,`⚙`,`/admin/settings`]].map(([r,i,a])=>(0,N.jsxs)(`button`,{className:`college-sidebar-item ${n.pathname===a||r===`Colleges`&&n.pathname.startsWith(`/admin/colleges`)?`active`:``}`,onClick:()=>{r===`Colleges`&&e?.(),t(a)},children:[(0,N.jsx)(`span`,{className:`sidebar-icon`,children:i}),(0,N.jsx)(`span`,{children:r}),r===`Leads`&&(0,N.jsx)(`span`,{className:`lead-star`,children:`★`})]},r))]}),(0,N.jsxs)(`div`,{className:`sidebar-bottom`,children:[(0,N.jsxs)(`div`,{className:`sidebar-admin-card`,children:[(0,N.jsx)(`div`,{className:`sidebar-avatar`,children:`A`}),(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`strong`,{children:`Admin`}),(0,N.jsx)(`span`,{children:`Super Admin`})]})]}),(0,N.jsxs)(`button`,{className:`logout-button`,onClick:()=>{localStorage.removeItem(`adminLoggedIn`),localStorage.removeItem(`isAdminLoggedIn`),sessionStorage.clear(),window.location.replace(`/admin/login`)},children:[`↪ `,(0,N.jsx)(`span`,{children:`Logout`})]})]})]})}function gr({search:e,onSearchChange:t}){return bt(),(0,N.jsxs)(`header`,{className:`college-topbar`,children:[(0,N.jsxs)(`div`,{className:`global-search`,children:[(0,N.jsx)(`span`,{children:`⌕`}),(0,N.jsx)(`input`,{value:e,onChange:e=>t(e.target.value),placeholder:`Search students, colleges, leads...`})]}),(0,N.jsxs)(`div`,{className:`top-admin`,children:[(0,N.jsxs)(`button`,{className:`notification-button`,children:[`♢`,(0,N.jsx)(`span`,{className:`notification-dot`})]}),(0,N.jsxs)(`button`,{className:`top-admin-profile`,onClick:()=>{localStorage.removeItem(`adminLoggedIn`),localStorage.removeItem(`isAdminLoggedIn`),sessionStorage.clear(),window.location.replace(`/admin/login`)},children:[(0,N.jsx)(`span`,{className:`top-avatar`,children:`A`}),(0,N.jsxs)(`span`,{className:`top-admin-text`,children:[(0,N.jsx)(`strong`,{children:`Admin`}),(0,N.jsx)(`small`,{children:`Super Admin`})]}),(0,N.jsx)(`span`,{children:`⌄`})]})]})]})}Object.entries({ENG001:{phone:`+91-44-2257-8000`,email:`webmaster@iitm.ac.in`,website:`https://www.iitm.ac.in/`,address:`Sardar Patel Road, Chennai - 600036, Tamil Nadu, India`,about:`IIT Madras is an Institute of National Importance known for engineering, science, technology, research and innovation. It offers undergraduate, postgraduate and doctoral education with a strong research ecosystem.`},ENG002:{phone:`+91-431-2503000`,email:`deanap@nitt.edu`,website:`https://www.nitt.edu/`,address:`National Institute of Technology, Tiruchirappalli - 620015, Tamil Nadu, India`,about:`NIT Tiruchirappalli is an Institute of National Importance offering engineering, science, technology, management and research programmes with a strong academic and industry-oriented environment.`},ENG003:{phone:`044-2235-8314`,email:`registrar@annauniv.edu`,website:`https://www.annauniv.edu/`,address:`Sardar Patel Road, Anna University, Chennai - 600025, Tamil Nadu, India`,about:`Anna University is a major public technical university in Chennai offering engineering, technology, architecture, science, management and research programmes.`},ENG004:{phone:`+91-416-2243091`,email:`admin.chennai@vit.ac.in`,website:`https://vit.ac.in/`,address:`VIT Vellore Campus, Vellore - 632014, Tamil Nadu, India`,about:`VIT is a private university known for engineering, technology, science, management and research programmes with a large academic and international ecosystem.`},ENG005:{phone:`+91-44-27417400`,email:`admissions@srmist.edu.in`,website:`https://www.srmist.edu.in/`,address:`SRM Nagar, Kattankulathur, Chengalpattu - 603203, Tamil Nadu, India`,about:`SRM Institute of Science and Technology is a multidisciplinary institution offering engineering, science, medicine, management and other professional programmes.`},ENG006:{phone:`+91-422-2685000`,email:`info@av.amrita.edu`,website:`https://www.amrita.edu/`,address:`Amritanagar, Coimbatore - 641112, Tamil Nadu, India`,about:`Amrita Vishwa Vidyapeetham is a multidisciplinary university with strong academic, research, healthcare and innovation activities across its campuses.`},ENG007:{phone:`0422-2572177`,email:`principal@psgtech.ac.in`,website:`https://www.psgtech.ac.in/`,address:`Avinashi Road, Peelamedu, Coimbatore - 641004, Tamil Nadu, India`,about:`PSG College of Technology is a well-established autonomous engineering institution in Coimbatore with programmes across engineering, technology, science and management.`},ENG008:{phone:`94868 37757`,email:`principal.citoffice@cit.edu.in`,website:`https://cit.edu.in/`,address:`Civil Aerodrome Post, Coimbatore - 641014, Tamil Nadu, India`,about:`Coimbatore Institute of Technology is an autonomous engineering institution focused on quality education, innovation, research and industry-oriented learning.`},ENG009:{phone:`+91-99-9430-0600`,email:`info@kct.ac.in`,website:`https://kct.ac.in/`,address:`Kumaraguru Campus, Saravanampatti, Coimbatore - 641049, Tamil Nadu, India`,about:`Kumaraguru College of Technology is an autonomous engineering institution emphasizing technology education, research, entrepreneurship and industry collaboration.`},ENG010:{phone:`+91-75503-16701`,email:`snsct@snsgroups.com`,website:`https://snsct.org/`,address:`SNS Kalvi Nagar, Sathy Main Road, Saravanampatti, Coimbatore - 641035, Tamil Nadu, India`,about:`SNS College of Technology is an autonomous engineering institution focused on design thinking, innovation, technology education and career development.`},ART001:{phone:`0422-429-5959`,website:`https://www.psgrkcw.ac.in/`,address:`Avinashi Road, Peelamedu, Coimbatore - 641004, Tamil Nadu, India`,about:`PSGR Krishnammal College for Women is an autonomous women's college in Coimbatore, affiliated to Bharathiar University, offering undergraduate, postgraduate and research programmes in arts, science, commerce and management.`},ART003:{phone:`0422-4303300`,email:`principal@psgcas.ac.in`,website:`https://www.psgcas.ac.in/`,address:`Civil Aerodrome Post, Coimbatore - 641014, Tamil Nadu, India`,about:`PSG College of Arts & Science is an autonomous institution offering undergraduate and postgraduate programmes across arts, commerce, science and technology-related disciplines.`},ART002:{phone:`+91-44-28178200`,email:`enquiry.adm@loyolacollege.edu`,website:`https://www.loyolacollege.edu/`,address:`PB 3301, 01 Sterling Road, Nungambakkam, Chennai - 600034, Tamil Nadu, India`,about:`Loyola College is an autonomous institution in Chennai known for undergraduate, postgraduate and research education across arts, science, commerce and related disciplines.`},ART004:{phone:`044-22390675`,email:`principal@mcc.edu.in`,website:`https://mcc.edu.in/`,address:`Tambaram, Chennai - 600059, Tamil Nadu, India`,about:`Madras Christian College is a historic autonomous institution offering multidisciplinary higher education with a strong emphasis on academic excellence, service and holistic development.`},ART005:{phone:`+91-44-2854-4819`,email:`principal@presidencycollege.ac.in`,website:`https://www.presidencycollege.ac.in/`,address:`Kamarajar Salai, Chepauk, Chennai - 600005, Tamil Nadu, India`,about:`Presidency College, Chennai is a historic government institution offering undergraduate and postgraduate education across arts, science and related disciplines.`},ART006:{phone:`+91-452-2311875`,email:`principaltcarts@gmail.com`,website:`https://www.tcarts.in/`,address:`139-140 Kamarajar Salai, Madurai - 625009, Tamil Nadu, India`,about:`Thiagarajar College is an autonomous institution in Madurai offering multidisciplinary arts, science and commerce education with research and student development activities.`},ART007:{phone:`+91-44-28111987`,email:`principal@stellamariscollege.edu.in`,website:`https://stellamariscollege.edu.in/`,address:`17 Cathedral Road, Chennai - 600086, Tamil Nadu, India`,about:`Stella Maris College is an autonomous women's institution offering multidisciplinary undergraduate, postgraduate and research programmes in Chennai.`},ART008:{phone:`044-28279189`,email:`principal@ethirajcollege.edu.in`,website:`https://ethirajcollege.edu.in/`,address:`No. 70, Ethiraj Salai, Egmore, Chennai - 600008, Tamil Nadu, India`,about:`Ethiraj College for Women is an autonomous women's institution offering a broad range of arts, science, commerce and professional-oriented programmes.`},ART009:{phone:`+91-422-2642095`,email:`info@kongunaducollege.ac.in`,website:`https://kongunaducollege.ac.in/`,address:`GN Mills, Coimbatore - 641029, Tamil Nadu, India`,about:`Kongunadu Arts and Science College is an autonomous institution in Coimbatore offering multidisciplinary higher education and research programmes.`},ART010:{phone:`+91-98431-33333`,email:`info@hindusthan.net`,website:`https://hicas.ac.in/`,address:`Avinashi Road, behind Nava India, Udayampalayam, Coimbatore - 641028, Tamil Nadu, India`,about:`Hindusthan College of Arts and Science offers multidisciplinary undergraduate and postgraduate programmes with a focus on academic and professional development.`},MED001:{phone:`+91-44-25305000`,email:`dean@mmc.ac.in`,website:`https://mmc.ac.in/`,address:`Park Town, Chennai - 600003, Tamil Nadu, India`,about:`Madras Medical College is a premier government medical institution in Chennai with undergraduate, postgraduate and advanced medical education and clinical training.`},MED002:{phone:`+91-44-25281347`,email:`stanleymedicalcollege@gmail.com`,website:`https://stanley.edu.in/`,address:`Old Jail Road, Chennai - 600001, Tamil Nadu, India`,about:`Stanley Medical College is a government medical institution in Chennai known for medical education, clinical training, healthcare and research.`},MED003:{phone:`+91-44-26413600`,email:`dean@gkmc.in`,website:`https://kmc.edu.in/`,address:`Kilpauk, Chennai - 600010, Tamil Nadu, India`,about:`Government Kilpauk Medical College is a government medical institution offering medical education and clinical training with an associated teaching hospital.`},MED004:{phone:`+91-422-2570170`,email:`cmc@tn.gov.in`,website:`https://www.cmchospital.co.in/`,address:`Avinashi Road, Coimbatore - 641018, Tamil Nadu, India`,about:`Coimbatore Medical College is a government medical institution providing undergraduate and postgraduate medical education and clinical services.`},MED005:{phone:`+91-452-2532535`,email:`maduraimedicalcollege@gmail.com`,website:`https://maduraimedicalcollege.org/`,address:`Alwarpuram, Madurai - 625020, Tamil Nadu, India`,about:`Madurai Medical College is a government medical institution serving southern Tamil Nadu through medical education, training, research and healthcare services.`},MED006:{phone:`+91-431-2776000`,email:`gmctry@gmail.com`,website:`https://www.gmctry.edu.in/`,address:`K.A.P. Viswanatham Government Medical College campus, Tiruchirappalli, Tamil Nadu, India`,about:`The Tiruchirappalli government medical college provides medical education, clinical training and healthcare services to the region.`},MED007:{phone:`+91-427-2210000`,email:`gmkmch@tn.gov.in`,website:`https://www.gmkmch.edu.in/`,address:`Salem, Tamil Nadu, India`,about:`Government Mohan Kumaramangalam Medical College is a government medical institution in Salem providing medical education, clinical training and healthcare services.`},MED008:{phone:`+91-422-2570170`,email:`psgmedschool@psgimsr.ac.in`,website:`https://psgimsr.ac.in/`,address:`Post Box 1674, Off Avanashi Road, Peelamedu, Coimbatore - 641004, Tamil Nadu, India`,about:`PSG Institute of Medical Sciences & Research is a private medical institution with medical education, research, clinical training and a teaching hospital ecosystem.`},MED009:{phone:`+91-7010101510`,email:`admissions@sriramachandra.edu.in`,website:`https://www.sriramachandra.edu.in/`,address:`No. 1 Ramachandra Nagar, Porur, Chennai - 600116, Tamil Nadu, India`,about:`Sri Ramachandra Institute of Higher Education and Research is a multidisciplinary deemed university with strong healthcare, medical education, research and allied academic programmes.`},MED010:{phone:`+91-8939902737`,email:`admission@saveetha.ac.in`,website:`https://saveetha.ac.in/`,address:`Saveetha Nagar, Thandalam, Chennai - 602105, Tamil Nadu, India`,about:`Saveetha Institute of Medical and Technical Sciences is a multidisciplinary deemed university with healthcare, medical, engineering, technology and research programmes.`}}).forEach(([e,t])=>{let n=mr.find(t=>t.id===e);n&&Object.assign(n,t)});function _r({onSelect:e,search:t,setSearch:n}){let[r,i]=(0,_.useState)(`All Colleges`),[a,o]=(0,_.useState)(`All`),[s,c]=(0,_.useState)(`All`),l=(0,_.useMemo)(()=>mr.filter(e=>{let n=r===`All Colleges`||e.category===r,i=t.trim().toLowerCase(),o=i===``||[e.name,e.short,e.id,e.location,e.category,e.type,e.affiliation,e.ownership].some(e=>String(e||``).toLowerCase().includes(i)),c=a===`All`||e.location===a,l=s===`All`||e.status===s;return n&&o&&c&&l}),[r,t,a,s]),u=mr.length,d=mr.filter(e=>e.status===`Verified`).length,f=mr.filter(e=>e.status===`Pending`).length,p=mr.filter(e=>e.status===`Suspended`).length;return(0,N.jsxs)(`div`,{className:`college-page`,children:[(0,N.jsx)(`div`,{className:`college-page-heading`,children:(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`h2`,{children:`College Management`}),(0,N.jsx)(`p`,{children:`Manage registered colleges, courses, fees and status`})]})}),(0,N.jsx)(`div`,{className:`college-tabs`,children:[`All Colleges`,`Engineering`,`Arts & Science`,`Medical`].map(e=>(0,N.jsx)(`button`,{className:r===e?`active`:``,onClick:()=>i(e),children:e},e))}),(0,N.jsxs)(`div`,{className:`college-filter`,children:[(0,N.jsxs)(`div`,{className:`college-search`,children:[(0,N.jsx)(`span`,{children:`🔍`}),(0,N.jsx)(`input`,{value:t,onChange:e=>n(e.target.value),placeholder:`Search colleges...`})]}),(0,N.jsxs)(`select`,{value:a,onChange:e=>o(e.target.value),children:[(0,N.jsx)(`option`,{value:`All`,children:`Location`}),(0,N.jsx)(`option`,{value:`Chennai`,children:`Chennai`}),(0,N.jsx)(`option`,{value:`Coimbatore`,children:`Coimbatore`}),(0,N.jsx)(`option`,{value:`Vellore`,children:`Vellore`}),(0,N.jsx)(`option`,{value:`Madurai`,children:`Madurai`}),(0,N.jsx)(`option`,{value:`Tiruchirappalli`,children:`Tiruchirappalli`}),(0,N.jsx)(`option`,{value:`Salem`,children:`Salem`})]}),(0,N.jsxs)(`select`,{value:s,onChange:e=>c(e.target.value),children:[(0,N.jsx)(`option`,{value:`All`,children:`Status`}),(0,N.jsx)(`option`,{value:`Verified`,children:`Verified`}),(0,N.jsx)(`option`,{value:`Pending`,children:`Pending`}),(0,N.jsx)(`option`,{value:`Suspended`,children:`Suspended`})]}),(0,N.jsx)(`button`,{className:`reset-button`,onClick:()=>{i(`All Colleges`),n(``),o(`All`),c(`All`)},children:`Reset`})]}),(0,N.jsxs)(`div`,{className:`college-stats`,children:[(0,N.jsxs)(`div`,{className:`college-stat-card`,children:[(0,N.jsx)(`span`,{className:`stat-icon blue`,children:`🏫`}),(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`small`,{children:`Total Colleges`}),(0,N.jsx)(`strong`,{children:u})]})]}),(0,N.jsxs)(`div`,{className:`college-stat-card`,children:[(0,N.jsx)(`span`,{className:`stat-icon green`,children:`✓`}),(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`small`,{children:`Verified Colleges`}),(0,N.jsx)(`strong`,{children:d})]})]}),(0,N.jsxs)(`div`,{className:`college-stat-card`,children:[(0,N.jsx)(`span`,{className:`stat-icon orange`,children:`◷`}),(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`small`,{children:`Pending Colleges`}),(0,N.jsx)(`strong`,{children:f})]})]}),(0,N.jsxs)(`div`,{className:`college-stat-card`,children:[(0,N.jsx)(`span`,{className:`stat-icon red`,children:`!`}),(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`small`,{children:`Suspended Colleges`}),(0,N.jsx)(`strong`,{children:p})]})]})]}),(0,N.jsxs)(`div`,{className:`registered-heading`,children:[(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`h3`,{children:`REGISTERED COLLEGES`}),(0,N.jsx)(`p`,{children:`All colleges registered on the platform`})]}),(0,N.jsxs)(`span`,{children:[l.length,` colleges`]})]}),(0,N.jsx)(`div`,{className:`college-grid`,children:l.map(t=>(0,N.jsx)(vr,{college:t,onSelect:e},t.id))}),l.length===0&&(0,N.jsxs)(`div`,{className:`empty-colleges`,children:[(0,N.jsx)(`div`,{children:`🏫`}),(0,N.jsx)(`h3`,{children:`No colleges found`}),(0,N.jsx)(`p`,{children:`Try another search or filter.`})]})]})}function vr({college:e,onSelect:t}){return(0,N.jsxs)(`div`,{className:`college-card`,children:[(0,N.jsxs)(`div`,{className:`college-card-top`,children:[(0,N.jsx)(`div`,{className:`college-short`,children:e.short}),(0,N.jsxs)(`span`,{className:`college-status ${e.status===`Verified`?`verified`:e.status===`Pending`?`pending`:`suspended`}`,children:[e.status===`Verified`?`✓`:`●`,` `,e.status]})]}),(0,N.jsx)(`span`,{className:`college-category`,children:e.category}),(0,N.jsx)(`h3`,{children:e.name}),(0,N.jsxs)(`div`,{className:`college-location`,children:[`📍 `,e.location,`, Tamil Nadu`]}),(0,N.jsxs)(`div`,{className:`college-info-row`,children:[(0,N.jsx)(`span`,{children:`Type`}),(0,N.jsx)(`strong`,{children:e.type})]}),(0,N.jsxs)(`div`,{className:`college-info-row`,children:[(0,N.jsx)(`span`,{children:`Affiliation`}),(0,N.jsx)(`strong`,{children:e.affiliation})]}),(0,N.jsxs)(`div`,{className:`college-info-row`,children:[(0,N.jsx)(`span`,{children:`Established`}),(0,N.jsx)(`strong`,{children:e.established})]}),(0,N.jsx)(`button`,{className:`view-details-button`,onClick:()=>t(e),children:`View Details →`})]})}function yr({college:e,onBack:t}){let[n,r]=(0,_.useState)(`overview`),i=[[`overview`,`▣`,`Overview`],[`courses`,`▤`,`Courses`],[`facilities`,`▦`,`Facilities`],[`placement`,`💼`,`Placement`],[`admission`,`📝`,`Admission`],[`contact`,`☎`,`Contact`]],a=e=>{r(e),setTimeout(()=>{document.getElementById(`college-${e}`)?.scrollIntoView({behavior:`smooth`,block:`start`})},50)};return(0,N.jsxs)(`div`,{className:`college-details-page`,children:[(0,N.jsx)(`button`,{className:`back-colleges`,onClick:t,children:`← Back to Colleges`}),(0,N.jsxs)(`div`,{className:`college-detail-header`,children:[(0,N.jsx)(`div`,{className:`detail-logo`,children:e.short}),(0,N.jsxs)(`div`,{className:`detail-header-content`,children:[(0,N.jsxs)(`div`,{className:`detail-title-row`,children:[(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`span`,{className:`detail-category`,children:e.category}),(0,N.jsx)(`h1`,{children:e.name}),(0,N.jsxs)(`p`,{children:[`📍 `,e.location,`, Tamil Nadu`]}),e.website&&e.website.startsWith(`http`)&&(0,N.jsxs)(`a`,{className:`detail-official-link`,href:e.website,target:`_blank`,rel:`noreferrer`,children:[`🌐 Official Website:`,` `,e.website.replace(/^https?:\/\//,``).replace(/\/$/,``),` `,`↗`]})]}),(0,N.jsxs)(`span`,{className:`detail-status ${e.status===`Verified`?`verified`:e.status===`Pending`?`pending`:`suspended`}`,children:[e.status===`Verified`?`✓`:`●`,` `,e.status.toUpperCase()]})]}),(0,N.jsxs)(`div`,{className:`detail-tags`,children:[(0,N.jsx)(`span`,{children:e.type}),(0,N.jsx)(`span`,{children:e.ownership}),(0,N.jsxs)(`span`,{children:[e.grade,` Grade`]}),(0,N.jsx)(`span`,{children:e.affiliation}),(0,N.jsxs)(`span`,{children:[`Est. `,e.established]})]})]})]}),(0,N.jsxs)(`div`,{className:`detail-layout`,children:[(0,N.jsxs)(`aside`,{className:`detail-side-nav`,children:[(0,N.jsx)(`p`,{children:`COLLEGE DETAILS`}),i.map(([e,t,r])=>(0,N.jsxs)(`button`,{className:n===e?`active`:``,onClick:()=>a(e),children:[(0,N.jsx)(`span`,{children:t}),r]},e))]}),(0,N.jsxs)(`div`,{className:`detail-content`,children:[(0,N.jsxs)(`section`,{id:`college-overview`,className:`detail-section`,children:[(0,N.jsx)(br,{title:`COLLEGE INFORMATION`}),(0,N.jsxs)(`div`,{className:`info-table`,children:[(0,N.jsx)(xr,{label:`College Name`,value:e.name}),(0,N.jsx)(xr,{label:`Location`,value:`${e.location}, Tamil Nadu`}),(0,N.jsx)(xr,{label:`Established Year`,value:e.established}),(0,N.jsx)(xr,{label:`College Type`,value:e.type}),(0,N.jsx)(xr,{label:`Ownership`,value:e.ownership}),(0,N.jsx)(xr,{label:`College Grade`,value:e.grade}),(0,N.jsx)(xr,{label:`Affiliation`,value:e.affiliation}),(0,N.jsx)(xr,{label:`Accreditation`,value:e.accreditation}),(0,N.jsx)(xr,{label:`Website`,value:e.website}),(0,N.jsx)(xr,{label:`State`,value:`Tamil Nadu`})]}),(0,N.jsxs)(`div`,{className:`description-box`,children:[(0,N.jsx)(`h4`,{children:`About College`}),(0,N.jsx)(`p`,{children:e.about||e.description})]})]}),(0,N.jsxs)(`section`,{id:`college-courses`,className:`detail-section`,children:[(0,N.jsx)(br,{title:`COURSES OFFERED`}),(0,N.jsx)(`div`,{className:`course-detail-grid`,children:e.courses.map((t,n)=>(0,N.jsxs)(`div`,{className:`course-detail-card`,children:[(0,N.jsx)(`div`,{className:`course-icon`,children:`📚`}),(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`h4`,{children:t}),(0,N.jsx)(`p`,{children:`Duration: College / Course Specific`}),(0,N.jsxs)(`span`,{children:[`Annual Fee: `,pr(e,t)]})]})]},n))})]}),(0,N.jsxs)(`section`,{id:`college-facilities`,className:`detail-section`,children:[(0,N.jsx)(br,{title:`FACILITIES`}),(0,N.jsx)(`div`,{className:`facility-grid`,children:e.facilities.map((e,t)=>(0,N.jsxs)(`div`,{className:`facility-card`,children:[(0,N.jsx)(`span`,{children:[`🏠`,`📚`,`🧪`,`🚌`,`⚽`,`🍴`,`💻`,`🏥`][t%8]}),(0,N.jsx)(`strong`,{children:e})]},t))})]}),(0,N.jsxs)(`section`,{id:`college-placement`,className:`detail-section`,children:[(0,N.jsx)(br,{title:`PLACEMENT`}),(0,N.jsxs)(`div`,{className:`placement-summary`,children:[(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`small`,{children:`Placement Available`}),(0,N.jsxs)(`strong`,{children:[`✓ `,e.placementAvailable]})]}),(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`small`,{children:`Average Package`}),(0,N.jsx)(`strong`,{children:e.averagePackage})]}),(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`small`,{children:`Highest Package`}),(0,N.jsx)(`strong`,{children:e.highestPackage})]}),(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`small`,{children:`Students Placed`}),(0,N.jsx)(`strong`,{children:e.studentsPlaced})]})]}),(0,N.jsx)(`h3`,{className:`placement-company-heading`,children:`TOP RECRUITING COMPANIES`}),(0,N.jsx)(`div`,{className:`company-table-wrapper`,children:(0,N.jsxs)(`table`,{className:`company-table`,children:[(0,N.jsx)(`thead`,{children:(0,N.jsxs)(`tr`,{children:[(0,N.jsx)(`th`,{children:`Company`}),(0,N.jsx)(`th`,{children:`Industry`}),(0,N.jsx)(`th`,{children:`Hiring For`}),(0,N.jsx)(`th`,{children:`Job Roles`}),(0,N.jsx)(`th`,{children:`Status`})]})}),(0,N.jsx)(`tbody`,{children:e.companies.map((e,t)=>(0,N.jsxs)(`tr`,{children:[(0,N.jsx)(`td`,{children:(0,N.jsx)(`strong`,{children:e.company})}),(0,N.jsx)(`td`,{children:e.industry}),(0,N.jsx)(`td`,{children:e.hiringFor}),(0,N.jsx)(`td`,{children:e.roles}),(0,N.jsx)(`td`,{children:(0,N.jsxs)(`span`,{className:`company-active`,children:[`✓ `,e.status]})})]},t))})]})})]}),(0,N.jsxs)(`section`,{id:`college-admission`,className:`detail-section`,children:[(0,N.jsx)(br,{title:`ADMISSION`}),(0,N.jsxs)(`div`,{className:`admission-grid`,children:[(0,N.jsxs)(`div`,{className:`admission-card`,children:[(0,N.jsx)(`h4`,{children:`Admission Process`}),(0,N.jsx)(`p`,{children:e.admission})]}),(0,N.jsxs)(`div`,{className:`admission-card`,children:[(0,N.jsx)(`h4`,{children:`Eligibility`}),(0,N.jsx)(`p`,{children:e.eligibility})]}),(0,N.jsxs)(`div`,{className:`admission-card`,children:[(0,N.jsx)(`h4`,{children:`Required Documents`}),(0,N.jsxs)(`ul`,{children:[(0,N.jsx)(`li`,{children:`10th Mark Sheet`}),(0,N.jsx)(`li`,{children:`12th Mark Sheet`}),(0,N.jsx)(`li`,{children:`Transfer Certificate`}),(0,N.jsx)(`li`,{children:`Community Certificate`}),(0,N.jsx)(`li`,{children:`Government ID`})]})]})]})]}),(0,N.jsxs)(`section`,{id:`college-contact`,className:`detail-section`,children:[(0,N.jsx)(br,{title:`CONTACT & LOCATION`}),(0,N.jsxs)(`div`,{className:`contact-grid`,children:[(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`span`,{children:`📍`}),(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`small`,{children:`Address`}),(0,N.jsx)(`strong`,{children:e.address||`${e.location}, Tamil Nadu`})]})]}),(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`span`,{children:`☎`}),(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`small`,{children:`Phone`}),(0,N.jsx)(`strong`,{children:e.phone||`Official contact available on website`})]})]}),(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`span`,{children:`✉`}),(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`small`,{children:`Email`}),(0,N.jsx)(`strong`,{children:e.email||`Official email available on website`})]})]}),(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`span`,{children:`🌐`}),(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`small`,{children:`Website`}),(0,N.jsx)(`strong`,{children:e.website&&e.website.startsWith(`http`)?(0,N.jsx)(`a`,{href:e.website,target:`_blank`,rel:`noreferrer`,children:e.website}):`Official website available on request`})]})]})]}),e.website&&e.website.startsWith(`http`)&&(0,N.jsx)(`a`,{className:`visit-website-button`,href:e.website,target:`_blank`,rel:`noreferrer`,children:`🌐 Visit Official Website ↗`})]}),(0,N.jsxs)(`section`,{className:`admin-actions-section`,children:[(0,N.jsx)(`h3`,{children:`ADMIN ACTIONS`}),(0,N.jsxs)(`div`,{className:`admin-actions`,children:[(0,N.jsx)(`button`,{className:`edit`,children:`✏ Edit College`}),(0,N.jsx)(`button`,{className:`verify`,children:`✓ Verify College`}),(0,N.jsx)(`button`,{className:`suspend`,children:`⏸ Suspend College`}),(0,N.jsx)(`button`,{className:`reject`,children:`✕ Reject College`})]})]})]})]})]})}function br({title:e}){return(0,N.jsx)(`div`,{className:`section-title`,children:(0,N.jsx)(`h2`,{children:e})})}function xr({label:e,value:t}){return(0,N.jsxs)(`div`,{className:`info-item`,children:[(0,N.jsx)(`span`,{children:e}),(0,N.jsx)(`strong`,{children:t})]})}function Sr(){let[e,t]=(0,_.useState)(null),[n,r]=(0,_.useState)(``);return bt(),(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(`style`,{children:Cr}),(0,N.jsxs)(`div`,{className:`college-admin-app`,children:[(0,N.jsx)(hr,{onCollegesClick:()=>t(null)}),(0,N.jsxs)(`div`,{className:`college-main`,children:[(0,N.jsx)(gr,{search:n,onSearchChange:e=>{r(e),t(null)}}),(0,N.jsx)(`main`,{children:e?(0,N.jsx)(yr,{college:e,onBack:()=>t(null)}):(0,N.jsx)(_r,{onSelect:t,search:n,setSearch:r})})]})]})]})}var Cr=String.raw`

* {
  box-sizing: border-box;
}

/* Full-width reset (removes centered/narrow wrapper from default Vite styles) */
html,
body,
#root {
  width: 100% !important;
  max-width: none !important;
  margin: 0 !important;
  padding: 0 !important;
  text-align: left !important;
  border: 0 !important;
}

body {
  display: block !important;
  place-items: initial !important;
  min-width: 0 !important;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: Inter, Arial, Helvetica, sans-serif;
  background: #f5f8fc;
  color: #17375f;
}

button,
input,
select {
  font: inherit;
}

button {
  cursor: pointer;
}

/* =========================================================
   MAIN APP
========================================================= */

.college-admin-app {
  width: 100%;
  min-height: 100vh;
  display: flex;
  background: #f5f8fc;
}

.college-main {
  min-width: 0;
  flex: 1 1 auto;
  width: calc(100% - 230px);
  margin-left: 230px;
  overflow-x: hidden;
}

/* =========================================================
   SIDEBAR
========================================================= */

.college-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 228px;
  background: linear-gradient(180deg, #102f55 0%, #102b4d 100%);
  color: white;
  z-index: 100;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: Arial, Helvetica, sans-serif;
}

.college-brand {
  height: 82px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 0 14px;
  border-bottom: 1px solid rgba(255,255,255,.08);
}

.brand-icon {
  width: 39px;
  height: 39px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,.1);
  font-size: 22px;
}

.college-brand h1 {
  margin: 0;
  color: white;
  font-family: Inter, Arial, Helvetica, sans-serif;
  font-size: 16px;
  line-height: 1.2;
}

.college-brand h1 span {
  color: #62a8ff;
}

.college-brand p {
  margin: 4px 0 0;
  color: #9fb2ca;
  font-size: 9.5px;
}

.sidebar-scroll {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 28px 12px 18px 4px;
    scrollbar-width: none;
}

.menu-title {
  margin: 0 10px 11px;
  color: #7e96b3;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .8px;
  text-align: center;
}

.college-sidebar-item {
  width: 100%;
  min-height: 43px;
  border: 0;
  background: transparent;
  color: #b8c9dc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 13px;
  margin-bottom: 4px;
  text-align: left;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
  transition: .2s;
}

.college-sidebar-item:hover {
  background: rgba(255,255,255,.07);
  color: white;
}

.college-sidebar-item.active {
  background: #287fe8;
  color: white;
  box-shadow: 0 5px 14px rgba(25,107,211,.2);
}

.sidebar-icon {
  width: 20px;
  text-align: center;
  font-size: 14px;
}

.lead-star {
  margin-left: auto;
  color: #ffd24a;
  font-size: 10px;
}

.sidebar-bottom {
  flex-shrink: 0;
  padding: 16px 6px 8px;
  border-top: 1px solid rgba(255,255,255,.08);
}

.sidebar-admin-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 13px 12px;
  margin-bottom: 9px;
  background: rgba(255,255,255,.07);
  border-radius: 10px;
}

.sidebar-admin-card > div:last-child {
  text-align: center;
}

.sidebar-avatar,
.top-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #2d5c9a;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 800;
}

.sidebar-admin-card strong {
  display: block;
  color: white;
  font-size: 12px;
}

.sidebar-admin-card span {
  display: block;
  color: #8da4be;
  font-size: 9px;
  margin-top: 5px;
}

.logout-button {
  width: 100%;
  height: 36px;
  border: 0;
  background: transparent;
  color: #bdccdd;
  border-radius: 7px;
  text-align: center;
  padding: 0 12px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 11px;
}

.logout-button:hover {
  background: rgba(255,255,255,.08);
  color: white;
}
/* =========================================================
   TOP BAR
========================================================= */

.college-topbar {
  width: 100%;
  height: 64px;
  background: white;
  border-bottom: 1px solid #e5ebf2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  position: sticky;
  top: 0;
  z-index: 50;
  font-family: Arial, Helvetica, sans-serif;
}

.global-search {
  width: 300px;
  height: 38px;
  background: #f4f7fb;
  border: 1px solid #edf1f6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 14px;
  gap: 10px;
}

.global-search span {
  font-size: 12px;
  color: #8fa0b5;
}

.global-search input {
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent !important;
  color: #29496e;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
}

.global-search input::placeholder {
  color: #91a0b5;
}

.top-admin {
  display: flex;
  align-items: center;
  gap: 18px;
}

.notification-button {
  position: relative;
  border: 0;
  background: transparent;
  color: #17375f;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  padding: 4px 8px;
}

.notification-dot {
  position: absolute;
  top: 3px;
  right: 3px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #f0454d;
}

.top-admin-profile {
  border: 0;
  background: transparent;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #62758e;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 9px;
}

.top-avatar {
  width: 32px;
  height: 32px;
  background: #17407a;
  font-size: 13px;
}

.top-admin-text {
  text-align: center;
}

.top-admin-text strong {
  display: block;
  color: #244363;
  font-size: 12px;
  line-height: 1.2;
}

.top-admin-text small {
  display: block;
  color: #8a9bb0;
  font-size: 9px;
  line-height: 1.2;
  margin-top: 3px;
}

/* =========================================================
   PAGE
========================================================= */


.college-page,
.college-details-page {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 32px 32px 55px;
  overflow-x: hidden;
}

.college-page-heading {
  width: 100%;
  margin-bottom: 20px;
  text-align: center;
}

.college-page-heading h2 {
  margin: 0;
  font-size: 26px;
  font-weight: 800;
  line-height: 1.2;
  color: #17375f;
  letter-spacing: -0.08em;
}

.college-page-heading p {
  margin: 8px 0 0;
  color: #8091a8;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13.5px;
}

/* =========================================================
   TABS
========================================================= */

.college-tabs {
  display: flex;
  gap: 7px;
  margin-bottom: 16px;
  overflow-x: auto;
}

.college-tabs button {
  border: 1px solid #dfe7f0;
  background: white;
  color: #60748e;
  border-radius: 8px;
  padding: 10px 17px;
  font-size: 13px;
  white-space: nowrap;
}

.college-tabs button.active {
  background: #247de8;
  border-color: #247de8;
  color: white;
  box-shadow: 0 5px 14px rgba(36,125,232,.16);
}

/* =========================================================
   FILTER
========================================================= */

.college-filter {
  background: white;
  border: 1px solid #e2e9f1;
  border-radius: 10px;
  padding: 14px;
  display: grid;
  grid-template-columns: minmax(250px, 1fr) 190px 190px 100px;
  gap: 9px;
  margin-bottom: 17px;
}

.college-search {
  height: 46px;
  border: 1px solid #e1e8f0;
  border-radius: 7px;
  display: flex;
  align-items: center;
  padding: 0 11px;
  gap: 8px;
}

.college-search input {
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent !important;
  color: #29496e !important;
  -webkit-text-fill-color: #29496e;
  caret-color: #29496e;
  font-size: 13px;
  color: #29496e;
}

.college-filter select,
.reset-button {
  height: 46px;
  border: 1px solid #e1e8f0;
  border-radius: 7px;
  background: white;
  color: #60748e;
  padding: 0 10px;
  font-size: 13px;
}

.reset-button:hover {
  background: #f1f6fc;
}

/* =========================================================
   STATS
========================================================= */

.college-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 25px;
}

.college-stat-card {
  background: white;
  border: 1px solid #e3eaf2;
  border-radius: 10px;
  padding: 22px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.stat-icon {
  width: 38px;
  height: 38px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
}

.stat-icon.blue {
  background: #e9f2ff;
  color: #247de8;
}

.stat-icon.green {
  background: #e6f8f0;
  color: #13aa72;
}

.stat-icon.orange {
  background: #fff3df;
  color: #e9a329;
}

.stat-icon.red {
  background: #ffe9eb;
  color: #e75a65;
}

.college-stat-card small {
  display: block;
  color: #8495aa;
  font-size: 12px;
}

.college-stat-card strong {
  display: block;
  color: #25486d;
  font-size: 28px;
  margin-top: 3px;
}

/* =========================================================
   REGISTERED
========================================================= */

.registered-heading {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 13px;
}

.registered-heading h3 {
  margin: 0;
  color: #244668;
  font-size: 16px;
}

.registered-heading p {
  margin: 5px 0 0;
  color: #91a0b3;
  font-size: 13px;
}

.registered-heading > span {
  color: #72869e;
  font-size: 13px;
}

/* =========================================================
   COLLEGE GRID
========================================================= */

.college-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.college-card {
  background: white;
  border: 1px solid #e2e9f1;
  border-radius: 11px;
  padding: 17px;
  transition: .2s;
  min-width: 0;
}

.college-card:hover {
  transform: translateY(-2px);
  border-color: #c8dcf5;
  box-shadow: 0 9px 25px rgba(31,75,120,.08);
}

.college-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.college-short {
  width: 39px;
  height: 39px;
  border-radius: 9px;
  background: #edf5ff;
  color: #247de8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 13px;
}

.college-status {
  border-radius: 20px;
  padding: 5px 8px;
  font-size: 11px;
  font-weight: 800;
}

.college-status.verified {
  background: #e6f8f0;
  color: #13a96e;
}

.college-status.pending {
  background: #fff4df;
  color: #d99a21;
}

.college-status.suspended {
  background: #ffe8ea;
  color: #df5561;
}

.college-category {
  display: inline-block;
  margin-top: 11px;
  color: #287ce0;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
}

.college-card h3 {
  color: #27496c;
  font-size: 16px;
  line-height: 1.35;
  min-height: 38px;
  margin: 7px 0;
}

.college-location {
  color: #8092a8;
  font-size: 13px;
  margin-bottom: 12px;
}

.college-info-row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  border-top: 1px solid #edf1f5;
  padding: 9px 0;
  font-size: 12px;
}

.college-info-row span {
  color: #91a0b2;
}

.college-info-row strong {
  color: #4f6885;
  text-align: right;
}

.view-details-button {
  width: 100%;
  height: 42px;
  border: 0;
  border-radius: 7px;
  background: #247de8;
  color: white;
  font-size: 13px;
  font-weight: 800;
  margin-top: 7px;
}

.view-details-button:hover {
  background: #176dce;
}

/* =========================================================
   EMPTY
========================================================= */

.empty-colleges {
  background: white;
  border: 1px solid #e2e9f1;
  border-radius: 10px;
  text-align: center;
  padding: 60px 20px;
}

.empty-colleges div {
  font-size: 35px;
}

.empty-colleges h3 {
  color: #29496e;
}

.empty-colleges p {
  color: #8a9bae;
  font-size: 14px;
}

/* =========================================================
   DETAILS HEADER
========================================================= */

.back-colleges {
  border: 0;
  background: transparent;
  color: #247de8;
  font-size: 13px;
  font-weight: 700;
  padding: 0;
  margin-bottom: 15px;
}

.college-detail-header {
  background: white;
  border: 1px solid #e0e8f1;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.detail-logo {
  width: 68px;
  height: 68px;
  flex-shrink: 0;
  border-radius: 13px;
  background: linear-gradient(135deg,#247de8,#1457aa);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 19px;
  font-weight: 900;
}

.detail-header-content {
  width: 100%;
  min-width: 0;
}

.detail-title-row {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.detail-category {
  color: #287de2;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
}

.detail-title-row h1 {
  margin: 5px 0;
  color: #193b60;
  font-size: 26px;
}

.detail-title-row p {
  margin: 0;
  color: #8495a9;
  font-size: 13px;
}

.detail-status {
  height: fit-content;
  border-radius: 20px;
  padding: 7px 11px;
  font-size: 11px;
  font-weight: 800;
  white-space: nowrap;
}

.detail-status.verified {
  background: #e4f8ef;
  color: #12a56b;
}

.detail-status.pending {
  background: #fff2dc;
  color: #d79a25;
}

.detail-status.suspended {
  background: #ffe8ea;
  color: #df5661;
}

.detail-tags {
  display: flex;
  gap: 7px;
  margin-top: 11px;
  flex-wrap: wrap;
}

.detail-tags span {
  background: #f1f6fc;
  border: 1px solid #e0e9f3;
  color: #647991;
  border-radius: 5px;
  padding: 5px 8px;
  font-size: 11px;
}

/* =========================================================
   DETAIL LAYOUT
========================================================= */

.detail-layout {
  display: grid;
  grid-template-columns: 185px minmax(0, 1fr);
  gap: 15px;
  align-items: start;
}

.detail-side-nav {
  background: white;
  border: 1px solid #e0e8f1;
  border-radius: 10px;
  padding: 11px;
  position: sticky;
  top: 82px;
}

.detail-side-nav p {
  color: #91a0b2;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .8px;
  margin: 4px 8px 9px;
}

.detail-side-nav button {
  width: 100%;
  height: 37px;
  border: 0;
  background: transparent;
  color: #6e8199;
  border-radius: 7px;
  text-align: left;
  padding: 0 9px;
  display: flex;
  gap: 9px;
  align-items: center;
  font-size: 13px;
  margin-bottom: 3px;
}

.detail-side-nav button:hover {
  background: #f2f7fd;
  color: #247de8;
}

.detail-side-nav button.active {
  background: #eaf3ff;
  color: #247de8;
  font-weight: 800;
}

/* =========================================================
   DETAIL SECTION
========================================================= */

.detail-section {
  background: white;
  border: 1px solid #e0e8f1;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 15px;
  scroll-margin-top: 85px;
}

.section-title {
  border-bottom: 1px solid #edf1f5;
  padding-bottom: 12px;
  margin-bottom: 15px;
}

.section-title h2 {
  margin: 0;
  color: #244768;
  font-size: 16px;
}

/* =========================================================
   INFO
========================================================= */

.info-table {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid #e6edf4;
  border-radius: 8px;
  overflow: hidden;
}

.info-item {
  min-height: 49px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 9px 12px;
  border-bottom: 1px solid #edf1f5;
}

.info-item:nth-child(odd) {
  border-right: 1px solid #edf1f5;
}

.info-item span {
  color: #91a0b3;
  font-size: 12px;
}

.info-item strong {
  color: #4b6480;
  font-size: 13px;
  margin-top: 4px;
}

.description-box {
  margin-top: 14px;
  background: #f7faff;
  border: 1px solid #e6eef7;
  border-radius: 8px;
  padding: 13px;
}

.description-box h4 {
  margin: 0 0 6px;
  color: #294b70;
  font-size: 13px;
}

.description-box p {
  margin: 0;
  color: #74879e;
  font-size: 13px;
  line-height: 1.6;
}

/* =========================================================
   COURSES
========================================================= */

.course-detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.course-detail-card {
  border: 1px solid #e5ebf2;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  gap: 10px;
}

.course-icon {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: #edf5ff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.course-detail-card h4 {
  margin: 0;
  color: #365573;
  font-size: 13px;
  line-height: 1.4;
}

.course-detail-card p {
  margin: 5px 0;
  color: #8a9bad;
  font-size: 11px;
}

.course-detail-card span {
  color: #287de1;
  font-size: 11px;
  font-weight: 700;
}

/* =========================================================
   FEES
========================================================= */

.fees-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid #e5ebf2;
  border-radius: 8px;
  overflow: hidden;
}

.fee-item {
  min-height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding: 10px 13px;
  border-bottom: 1px solid #edf1f5;
}

.fee-item:nth-child(odd) {
  border-right: 1px solid #edf1f5;
}

.fee-item span {
  color: #8596aa;
  font-size: 12px;
}

.fee-item strong {
  color: #46617d;
  font-size: 12px;
  text-align: right;
}


/* =========================================================
   FACILITIES
========================================================= */

.facility-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.facility-card {
  min-height: 80px;
  border: 1px solid #e5ebf2;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.facility-card span {
  font-size: 22px;
}

.facility-card strong {
  color: #59708b;
  font-size: 12px;
  text-align: center;
}

/* =========================================================
   PLACEMENT
========================================================= */

.placement-summary {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

.placement-summary > div {
  background: #f7faff;
  border: 1px solid #e3ebf4;
  border-radius: 8px;
  padding: 13px;
}

.placement-summary small {
  display: block;
  color: #8999ac;
  font-size: 11px;
}

.placement-summary strong {
  display: block;
  color: #315574;
  font-size: 14px;
  margin-top: 7px;
}

.placement-company-heading {
  color: #385672;
  font-size: 14px;
  margin: 0 0 10px;
}

.company-table-wrapper {
  width: 100%;
  overflow-x: auto;
  border: 1px solid #e3eaf2;
  border-radius: 8px;
}

.company-table {
  width: 100%;
  min-width: 720px;
  border-collapse: collapse;
}

.company-table th {
  background: #f6f9fc;
  color: #8293a7;
  text-align: left;
  font-size: 11px;
  padding: 11px;
}

.company-table td {
  border-top: 1px solid #edf1f5;
  color: #647991;
  font-size: 12px;
  padding: 12px 11px;
  vertical-align: middle;
}

.company-table td strong {
  color: #385875;
}

.company-active {
  background: #e5f8ef;
  color: #12a76d;
  padding: 5px 7px;
  border-radius: 12px;
  font-size: 11px;
  white-space: nowrap;
}

/* =========================================================
   ADMISSION
========================================================= */

.admission-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}

.admission-card {
  border: 1px solid #e4ebf2;
  border-radius: 8px;
  padding: 13px;
}

.admission-card h4 {
  color: #385875;
  margin: 0 0 8px;
  font-size: 13px;
}

.admission-card p {
  color: #74879d;
  font-size: 12px;
  line-height: 1.6;
  margin: 0;
}

.admission-card ul {
  margin: 0;
  padding-left: 16px;
  color: #74879d;
  font-size: 12px;
  line-height: 1.8;
}

/* =========================================================
   CONTACT
========================================================= */

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.contact-grid > div {
  border: 1px solid #e5ebf2;
  border-radius: 8px;
  padding: 13px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.contact-grid > div > span {
  font-size: 20px;
}

.contact-grid small {
  display: block;
  color: #8c9bad;
  font-size: 11px;
}

.contact-grid strong {
  display: block;
  color: #4d6681;
  font-size: 12px;
  margin-top: 4px;
}

/* =========================================================
   ADMIN ACTIONS
========================================================= */

.admin-actions-section {
  background: white;
  border: 1px solid #e0e8f1;
  border-radius: 10px;
  padding: 18px;
}

.admin-actions-section h3 {
  color: #385875;
  font-size: 14px;
  margin: 0 0 12px;
}

.admin-actions {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 9px;
}

.admin-actions button {
  height: 39px;
  border: 0;
  border-radius: 7px;
  color: white;
  font-size: 12px;
  font-weight: 800;
}

.admin-actions .edit {
  background: #277ee7;
}

.admin-actions .verify {
  background: #18ae75;
}

.admin-actions .suspend {
  background: #eda72a;
}

.admin-actions .reject {
  background: #e75863;
}

/* =========================================================
   OFFICIAL WEBSITE LINKS
========================================================= */

.detail-official-link {
  display: inline-block;
  margin-top: 10px;
  padding: 7px 12px;
  border-radius: 7px;
  background: #eaf3ff;
  border: 1px solid #cfe2fb;
  color: #1f6fd6;
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
}

.detail-official-link:hover {
  background: #dcebff;
}

.contact-grid a {
  color: #247de8;
  text-decoration: none;
  word-break: break-all;
}

.contact-grid a:hover {
  text-decoration: underline;
}

.visit-website-button {
  display: inline-block;
  margin-top: 14px;
  padding: 11px 18px;
  border-radius: 8px;
  background: #247de8;
  color: white;
  font-size: 13px;
  font-weight: 800;
  text-decoration: none;
}

.visit-website-button:hover {
  background: #176dce;
}



/* =========================================================
   TABLET
========================================================= */

@media (max-width: 1100px) {

  .college-sidebar {
    width: 215px;
  }

  .college-main {
    margin-left: 215px;
    width: calc(100% - 215px);
  }

  .college-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .college-filter {
    grid-template-columns: 1fr 150px 150px;
  }

  .reset-button {
    width: 100%;
  }

  .college-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .detail-layout {
    grid-template-columns: 160px minmax(0,1fr);
  }

  .placement-summary {
    grid-template-columns: repeat(2, 1fr);
  }

  .facility-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 768px) {

  .college-admin-app {
    display: block;
  }

  .college-sidebar {
    position: fixed;
    left: -220px;
    width: 220px;
    transition: .25s;
  }

  .college-main {
    margin-left: 0;
    width: 100%;
  }

  .college-topbar {
    height: 60px;
    padding: 0 13px;
  }

  .global-search {
    width: 52%;
  }

  .global-search input {
    font-size: 12px;
  }

  .top-admin-text {
    display: none;
  }

  .college-page,
  .college-details-page {
    padding: 20px 13px 40px;
  }

  .college-page-heading h2 {
    font-size: 22px;
  }

  .college-tabs {
    padding-bottom: 3px;
  }

  .college-filter {
    grid-template-columns: 1fr;
  }

  .college-stats {
    grid-template-columns: 1fr 1fr;
  }

  .college-grid {
    grid-template-columns: 1fr;
  }

  .college-card h3 {
    min-height: auto;
  }

  .college-detail-header {
    padding: 14px;
  }

  .detail-title-row {
    flex-direction: column;
    gap: 9px;
  }

  .detail-title-row h1 {
    font-size: 20px;
  }

  .detail-layout {
    grid-template-columns: 1fr;
  }

  .detail-side-nav {
    position: sticky;
    top: 60px;
    z-index: 10;
    display: flex;
    overflow-x: auto;
    gap: 4px;
    padding: 8px;
  }

  .detail-side-nav p {
    display: none;
  }

  .detail-side-nav button {
    width: auto;
    flex-shrink: 0;
    white-space: nowrap;
    padding: 0 11px;
  }

  .info-table,
  .fees-grid {
    grid-template-columns: 1fr;
  }

  .info-item:nth-child(odd),
  .fee-item:nth-child(odd) {
    border-right: 0;
  }

  .course-detail-grid {
    grid-template-columns: 1fr;
  }

  .facility-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .placement-summary {
    grid-template-columns: 1fr 1fr;
  }

  .admission-grid,
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .admin-actions {
    grid-template-columns: 1fr 1fr;
  }
}

/* =========================================================
   SMALL MOBILE
========================================================= */

@media (max-width: 480px) {

  .global-search {
    width: 48%;
  }

  .global-search span {
    font-size: 13px;
  }

  .global-search input::placeholder {
    font-size: 11px;
  }

  .college-stats {
    grid-template-columns: 1fr;
  }

  .college-stat-card {
    padding: 13px;
  }

  .college-detail-header {
    flex-direction: column;
  }

  .detail-logo {
    width: 55px;
    height: 55px;
  }

  .detail-tags span {
    font-size: 10px;
  }

  .detail-section {
    padding: 14px;
  }

  .facility-grid {
    grid-template-columns: 1fr 1fr;
  }

  .placement-summary {
    grid-template-columns: 1fr;
  }

  .admin-actions {
    grid-template-columns: 1fr;
  }

  .registered-heading {
    align-items: flex-start;
    gap: 8px;
    flex-direction: column;
  }
}

`,wr={colleges:[{id:1,name:`Amrita Vishwa Vidyapeetham, Coimbatore Campus`,city:`Coimbatore`,state:`Tamil Nadu`,district:`Coimbatore`,type:`Deemed University`,autonomous:!0,autonomyNote:`Deemed to be University under the UGC Act.`,affiliation:`Amrita Vishwa Vidyapeetham`,established:2003,rating:4.8,fee:32e4,image:`https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Amrita_Vishwa_Vidyapeetham_coimbatore_campus.jpg/1920px-Amrita_Vishwa_Vidyapeetham_coimbatore_campus.jpg`,imageSource:`Wikimedia Commons`,about:`Deemed university campus offering B.Tech engineering programmes with a strong research culture and residential campus.`,facilities:[`Central Library`,`Residence Halls`,`Research Labs`,`Health Centre`,`Sports Complex`,`Innovation Cell`],eligibility:`50% in 12th with PCM`,courseIds:[1,2,4,7],website:`https://www.amrita.edu`,locality:`Coimbatore`,tneaCode:``,funding:``,minority:``,branches:[]},{id:2,name:`PSG College of Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`Coimbatore`,state:`Tamil Nadu`,type:`Autonomous (Government Aided)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2006); Government Aided, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2006`,funding:`Government Aided`,minority:`Non-Minority`,established:1951,rating:4.7,fee:22e4,image:`https://www.psgtech.edu/images/glances2.jpg`,imageSource:`Official college website (www.psgtech.edu)`,about:`The PSG group's flagship engineering college on the Peelamedu campus.`,facilities:[`Central Library`,`Boys and Girls Hostels`,`Research Laboratories`,`Sports Complex`,`Auditorium`,`Placement Cell`],eligibility:`50% in 12th with PCM / CE`,courseIds:[33,35,36,5,39,41,29,6,49,2,50,55,59,60,4,63,62,66,67,23,70,72,19,74],branches:[{code:`AS`,name:`AUTOMOBILE ENGINEERING`},{code:`BY`,name:`BIO MEDICAL ENGINEERING`},{code:`BS`,name:`BIO TECHNOLOGY`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CN`,name:`CIVIL ENGINEERING`},{code:`CG`,name:`Computer Science and Engineering (Artificial Intelligence and Machine Learning)`},{code:`CM`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EY`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`EM`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`FY`,name:`FASHION TECHNOLOGY`},{code:`IM`,name:`INFORMATION TECHNOLOGY`},{code:`IY`,name:`INSTRUMENTATION AND CONTROL ENGINEERING`},{code:`ME`,name:`MECHANICAL ENGINEERING`},{code:`MS`,name:`MECHANICAL ENGINEERING (SANDWICH)`},{code:`MF`,name:`MECHANICAL ENGINEERING`},{code:`MT`,name:`METALLURGICAL ENGINEERING`},{code:`MY`,name:`METALLURGICAL ENGINEERING`},{code:`PR`,name:`PRODUCTION ENGINEERING`},{code:`PN`,name:`PRODUCTION ENGINEERING`},{code:`RA`,name:`ROBOTICS AND AUTOMATION`},{code:`TX`,name:`TEXTILE TECHNOLOGY`},{code:`TT`,name:`TEXTILE TECHNOLOGY`}],website:`https://www.psgtech.edu`},{id:3,name:`Sri Ramakrishna Institute of Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`Pachapalayam`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2725); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2725`,funding:`Self-Financing`,minority:`Non-Minority`,established:1992,rating:4.5,fee:1e5,image:`https://upload.wikimedia.org/wikipedia/commons/a/a4/Sri_Ramakrishna_Institute_of_Technology%27s_Aerial_Shot.jpg`,imageSource:`Wikimedia Commons`,about:`Autonomous engineering college run by the SNR Sons Charitable Trust.`,facilities:[`Library`,`Hostels`,`Research Centres`,`Gymnasium`,`Playground`,`Placement Cell`],eligibility:`50% in 12th with PCM through TNEA counselling`,courseIds:[7,1,6,2,3,4],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.srit.org`},{id:4,name:`Karunya Institute of Technology and Sciences`,city:`Coimbatore`,state:`Tamil Nadu`,district:`Coimbatore`,type:`Deemed University`,autonomous:!0,autonomyNote:`Deemed to be University under the UGC Act.`,affiliation:`Karunya Institute of Technology and Sciences`,established:2004,rating:4.4,fee:21e4,image:`https://karunya.edu/img/homepage/Slides/slide1.jpg`,imageSource:`Official college website`,about:`Deemed university offering engineering and technology programmes with a residential campus.`,facilities:[`Central Library`,`Residence Halls`,`Laboratories`,`Health Centre`,`Sports Complex`,`Placement Cell`],eligibility:`50% in 12th with PCM`,courseIds:[1,2,3,4],website:`https://karunya.edu`,locality:`Coimbatore`,tneaCode:``,funding:``,minority:``,branches:[]},{id:5,name:`Kumaraguru College of Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`Chinnavedampatti`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2712); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2712`,funding:`Self-Financing`,minority:`Non-Minority`,established:1998,rating:4.4,fee:125e3,image:`https://kct.ac.in/wp-content/uploads/2024/06/Home-banner.webp`,imageSource:`Official college website`,about:`Autonomous engineering college at Chinnavedampatti offering engineering and technology programmes.`,facilities:[`Central Library`,`Hostels`,`Innovation Lab`,`Sports Complex`,`Research Centres`,`Placement Cell`],eligibility:`50% in 12th with PCM through TNEA counselling`,courseIds:[30,7,12,17,5,1,6,2,13,20,3,4,16,19],branches:[{code:`AE`,name:`AERONAUTICAL ENGINEERING`},{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`AU`,name:`AUTOMOBILE ENGINEERING`},{code:`BT`,name:`BIO TECHNOLOGY`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`EI`,name:`ELECTRONICS AND INSTRUMENTATION ENGINEERING`},{code:`FT`,name:`FASHION TECHNOLOGY`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`},{code:`MZ`,name:`Mechatronics Engineering`},{code:`TX`,name:`TEXTILE TECHNOLOGY`}],website:`https://kct.ac.in`},{id:6,name:`Sri Krishna College of Technology`,city:`Coimbatore`,state:`Tamil Nadu`,district:`Coimbatore`,type:`Autonomous (Private)`,autonomous:!0,autonomyNote:`Autonomous engineering institution affiliated to Anna University.`,affiliation:`Anna University, Chennai`,established:1985,rating:4.3,fee:105e3,image:`https://skct.edu.in/wp-content/uploads/2024/03/Facilities_skct.jpg`,imageSource:`Official college website`,about:`Autonomous engineering institution at Kovaipudur, Coimbatore.`,facilities:[`Library`,`Hostels`,`Laboratories`,`Sports Complex`,`Conference Halls`,`Placement Cell`],eligibility:`50% in 12th with PCM through TNEA counselling`,courseIds:[1,2,3,5,7],website:`https://skct.edu.in`,locality:`Coimbatore`,tneaCode:``,funding:``,minority:``,branches:[]},{id:7,name:`Dr N.G.P. Institute of Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`Kalapatti`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2736); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2736`,funding:`Self-Financing`,minority:`Non-Minority`,established:2007,rating:4.2,fee:125e3,image:`https://www.drngpit.ac.in/api/media/hero/1785490795219-957360082.png`,imageSource:`Official college website (www.drngpit.ac.in)`,about:`Engineering college at Kalapatti with engineering, technology, research and placement facilities.`,facilities:[`Library`,`Hostels`,`Research Labs`,`Sports Complex`,`Auditorium`,`Placement Cell`],eligibility:`50% in 12th with PCM through TNEA counselling`,courseIds:[7,11,5,27,1,9,6,2,3,4],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`BM`,name:`BIO MEDICAL ENGINEERING`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CB`,name:`COMPUTER SCIENCE AND BUSSINESS SYSTEM`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.drngpit.ac.in`},{id:8,name:`KGISL Institute of Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`Saravanampatti`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2751); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2751`,funding:`Self-Financing`,minority:`Non-Minority`,established:2008,rating:4.2,fee:1e5,image:`https://upload.wikimedia.org/wikipedia/commons/1/13/KGiSL_Institue_of_Technology.jpg`,imageSource:`Wikimedia Commons`,about:`Engineering college in Coimbatore with industry-backed engineering education.`,facilities:[`Library`,`Hostels`,`Laboratories`,`Innovation Centre`,`Sports Complex`,`Placement Cell`],eligibility:`50% in 12th with PCM through TNEA counselling`,courseIds:[7,27,1,8,9,2,3,4,10],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CB`,name:`COMPUTER SCIENCE AND BUSSINESS SYSTEM`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`AM`,name:`COMPUTER SCIENCE AND ENGINEERING (AI AND MACHINE LEARNING)`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`},{code:`RM`,name:`ROBOTICS AND AUTOMATION`}],website:`https://www.kgkite.ac.in`},{id:9,name:`Sri Krishna College of Engineering and Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`Sugunapuram`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2718); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2718`,funding:`Self-Financing`,minority:`Non-Minority`,established:1998,rating:4.2,fee:95e3,image:`https://skcet.ac.in/wp-content/uploads/2023/12/campus-tour-youtube-skcet.jpg`,imageSource:`Official college website (skcet.ac.in)`,about:`Premier autonomous engineering institution offering engineering and management programmes.`,facilities:[`Library`,`Hostels`,`Laboratories`,`Sports Complex`,`Innovation Centre`,`Placement Cell`],eligibility:`50% in 12th with PCM through TNEA counselling`,courseIds:[7,5,27,1,8,9,44,6,2,3,26,4,16],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CB`,name:`COMPUTER SCIENCE AND BUSSINESS SYSTEM`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`AM`,name:`COMPUTER SCIENCE AND ENGINEERING (AI AND MACHINE LEARNING)`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`CI`,name:`Computer Science and Engineering (Internet of Things)`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`CJ`,name:`M.Tech. Computer Science and Engineering (Integrated 5 years)`},{code:`ME`,name:`MECHANICAL ENGINEERING`},{code:`MZ`,name:`Mechatronics Engineering`}],website:`https://skcet.ac.in`},{id:10,name:`Government College of Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`Coimbatore`,state:`Tamil Nadu`,type:`Autonomous (Government)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2005); Government, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2005`,funding:`Government`,minority:`Non-Minority`,established:1942,rating:4.1,fee:48e3,image:`https://upload.wikimedia.org/wikipedia/commons/8/8e/Government_College_of_Technology_Coimbatore.jpg`,imageSource:`Wikimedia Commons`,about:`Government engineering college in Coimbatore known for affordable education and strong engineering programmes.`,facilities:[`Library`,`Hostel`,`Workshop`,`Computing Centre`,`Sports Ground`,`Placement Cell`],eligibility:`50% in 12th with PCM through TNEA counselling`,courseIds:[5,1,8,6,2,13,58,3,4,23],branches:[{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`AM`,name:`COMPUTER SCIENCE AND ENGINEERING (AI AND MACHINE LEARNING)`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`EI`,name:`ELECTRONICS AND INSTRUMENTATION ENGINEERING`},{code:`IB`,name:`INDUSTRIAL BIO TECHNOLOGY`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`},{code:`PR`,name:`PRODUCTION ENGINEERING`}],website:`https://www.gct.ac.in`},{id:11,name:`Karpagam College of Engineering`,city:`Coimbatore`,district:`Coimbatore`,locality:`Othakkal Mandapam`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2710); Self-Financing, Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2710`,funding:`Self-Financing`,minority:`Minority`,established:2e3,rating:4.1,fee:11e4,image:`https://www.kce.ac.in/images/kce/home/banner/b1.jpg`,imageSource:`Official college website`,about:`Autonomous engineering college at Myleripalayam offering engineering and technology programmes.`,facilities:[`Library`,`Hostels`,`Laboratories`,`Innovation Centre`,`Sports Complex`,`Placement Cell`],eligibility:`50% in 12th with PCM through TNEA counselling`,courseIds:[7,5,1,9,6,2,14,3,4],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`EV`,name:`Electronics Engineering (VLSI Design and Technology)`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.kce.ac.in`},{id:12,name:`KPR Institute of Engineering and Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`Kollupalayam`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2764); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2764`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:4.1,fee:1e5,image:`https://www.kpriet.ac.in/asset/frontend/images/homepage/banner/Iyanthani%20Website.jpg`,imageSource:`Official college website`,about:`Autonomous engineering college in Coimbatore with industry-oriented engineering education.`,facilities:[`Library`,`Hostels`,`Laboratories`,`Sports Complex`,`Placement Cell`],eligibility:`50% in 12th with PCM through TNEA counselling`,courseIds:[7,11,18,5,27,1,8,9,6,2,14,3,4,16],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`BM`,name:`BIO MEDICAL ENGINEERING`},{code:`CH`,name:`CHEMICAL ENGINEERING`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CB`,name:`COMPUTER SCIENCE AND BUSSINESS SYSTEM`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`AM`,name:`COMPUTER SCIENCE AND ENGINEERING (AI AND MACHINE LEARNING)`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`EV`,name:`Electronics Engineering (VLSI Design and Technology)`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`},{code:`MZ`,name:`Mechatronics Engineering`}],website:`https://www.kpriet.ac.in`},{id:13,name:`S N S College of Engineering`,city:`Coimbatore`,state:`Tamil Nadu`,district:`Coimbatore`,type:`Autonomous (Private)`,autonomous:!0,autonomyNote:`Autonomous engineering college.`,affiliation:`Anna University, Chennai`,established:2007,rating:4.1,fee:9e4,image:`https://cdn.bitrix24.in/b11752903/landing/896/896468f542a71ecbd9569d1ead65a086/snsce_1x.jpeg`,imageSource:`Official college website`,about:`Multi-disciplinary autonomous engineering college on Sathy Main Road, Coimbatore.`,facilities:[`Library`,`Hostels`,`Laboratories`,`Sports Complex`,`Placement Cell`],eligibility:`50% in 12th with PCM through TNEA counselling`,courseIds:[1,2,3,5],website:`https://snsce.ac.in`,locality:`Coimbatore`,tneaCode:``,funding:``,minority:``,branches:[]},{id:14,name:`SNS College of Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`Vazhiyampalayam`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2726); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2726`,funding:`Self-Financing`,minority:`Non-Minority`,established:2002,rating:4.1,fee:95e3,image:`https://snsct.org/preview.jpg`,imageSource:`Official college website`,about:`Autonomous engineering and technology college in Coimbatore.`,facilities:[`Library`,`Hostels`,`Laboratories`,`Sports Complex`,`Placement Cell`],eligibility:`50% in 12th with PCM through TNEA counselling`,courseIds:[24,25,7,32,12,11,5,40,1,43,46,47,6,2,21,3,61,4,16],branches:[{code:`AO`,name:`AEROSPACE ENGINEERING`},{code:`AG`,name:`AGRICULTURAL ENGINEERING`},{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`AL`,name:`Artificial Intelligence and Machine Learning`},{code:`AU`,name:`AUTOMOBILE ENGINEERING`},{code:`BM`,name:`BIO MEDICAL ENGINEERING`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CD`,name:`COMPUTER SCIENCE AND DESIGN`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`SB`,name:`Computer Science and Engineering (Internet of Things and Cyber Security including Block Chain Technology)`},{code:`TS`,name:`Computer Science and Technology`},{code:`DS`,name:`DATA SCIENCES`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`FD`,name:`FOOD TECHNOLOGY`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`MO`,name:`Mechanical and Mechatronics Engineering (Additive Manufacturing)`},{code:`ME`,name:`MECHANICAL ENGINEERING`},{code:`MZ`,name:`Mechatronics Engineering`}],website:`https://snsct.org`},{id:15,name:`Coimbatore Institute of Engineering and Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`Vellimalaipattinam`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2704); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2704`,funding:`Self-Financing`,minority:`Non-Minority`,established:2001,rating:4,fee:65e3,image:`https://www.cietcbe.edu.in/upload/slider-1-1.jpg`,imageSource:`Official college website (www.cietcbe.edu.in)`,about:`Engineering institute in Coimbatore offering engineering and technology programmes.`,facilities:[`Library`,`Hostels`,`Laboratories`,`Sports Complex`,`Placement Cell`],eligibility:`50% in 12th with PCM through TNEA counselling`,courseIds:[7,5,1,8,9,6,2,14,3,4,16],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`AM`,name:`COMPUTER SCIENCE AND ENGINEERING (AI AND MACHINE LEARNING)`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`EV`,name:`Electronics Engineering (VLSI Design and Technology)`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`},{code:`MZ`,name:`Mechatronics Engineering`}],website:`https://www.cietcbe.edu.in`},{id:16,name:`Coimbatore Institute of Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`Coimbatore`,state:`Tamil Nadu`,type:`Autonomous (Government Aided)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2007); Government Aided, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2007`,funding:`Government Aided`,minority:`Non-Minority`,established:null,rating:4,fee:6e4,image:`https://cit.edu.in/uploads/home/1767949157_CITAuditorium1.png`,imageSource:`Official college website (cit.edu.in)`,about:`Government-aided engineering institute in Coimbatore offering engineering programmes.`,facilities:[`Library`,`Hostels`,`Laboratories`,`Auditorium`,`Sports Complex`,`Placement Cell`],eligibility:`50% in 12th with PCM through TNEA counselling`,courseIds:[31,18,38,5,39,1,29,6,49,2,50,53,59,4,62],branches:[{code:`AT`,name:`ARTIFICIAL INTELLIGENCE AND DATA SCIENCE`},{code:`CH`,name:`CHEMICAL ENGINEERING`},{code:`CL`,name:`CHEMICAL ENGINEERING`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CN`,name:`CIVIL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`CM`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EY`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`EM`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`EL`,name:`Electronics Engineering (VLSI Design and Technology)`},{code:`IM`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`},{code:`MF`,name:`MECHANICAL ENGINEERING`}],website:`https://cit.edu.in`},{id:17,name:`Hindusthan College of Engineering and Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`Othakkal Mandapam`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2708); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2708`,funding:`Self-Financing`,minority:`Non-Minority`,established:2e3,rating:4,fee:9e4,image:`https://hicet.ac.in/images/banner/02.jpg`,imageSource:`Official college website`,about:`Engineering and technology college with a large campus on Pollachi Main Road.`,facilities:[`Library`,`Hostels`,`Laboratories`,`Sports Complex`,`Placement Cell`],eligibility:`50% in 12th with PCM through TNEA counselling`,courseIds:[30,25,32,12,11,18,5,27,1,9,6,2,13,21,3,4,16],branches:[{code:`AE`,name:`AERONAUTICAL ENGINEERING`},{code:`AG`,name:`AGRICULTURAL ENGINEERING`},{code:`AL`,name:`Artificial Intelligence and Machine Learning`},{code:`AU`,name:`AUTOMOBILE ENGINEERING`},{code:`BM`,name:`BIO MEDICAL ENGINEERING`},{code:`CH`,name:`CHEMICAL ENGINEERING`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CB`,name:`COMPUTER SCIENCE AND BUSSINESS SYSTEM`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`EI`,name:`ELECTRONICS AND INSTRUMENTATION ENGINEERING`},{code:`FD`,name:`FOOD TECHNOLOGY`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`},{code:`MZ`,name:`Mechatronics Engineering`}],website:`https://hicet.ac.in`},{id:18,name:`PSG Institute of Technology and Applied Research`,city:`Coimbatore`,district:`Coimbatore`,locality:`Neelambur`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2377); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2377`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:4,fee:9e4,image:`https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/PSG_iTech.jpg/1920px-PSG_iTech.jpg`,imageSource:`Wikimedia Commons`,about:`Applied sciences and technology institute of the PSG group in Coimbatore.`,facilities:[`Library`,`Hostels`,`Laboratories`,`Sports Complex`,`Placement Cell`],eligibility:`50% in 12th with PCM through TNEA counselling`,courseIds:[7,34,5,1,6,2,14,15,4,71],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`DA`,name:`Bachelor of Design`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`EV`,name:`Electronics Engineering (VLSI Design and Technology)`},{code:`IC`,name:`INSTRUMENTATION AND CONTROL ENGINEERING`},{code:`ME`,name:`MECHANICAL ENGINEERING`},{code:`RI`,name:`ROBOTICS AND ARTIFICIAL INTELLIGENCE`}],website:`https://psgitech.ac.in`},{id:19,name:`Sri Shakthi Institute of Engineering and Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`Chinniyampalayam`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2727); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2727`,funding:`Self-Financing`,minority:`Non-Minority`,established:2006,rating:4,fee:1e5,image:`https://web.archive.org/web/2025im_/www.siet.ac.in/images/unitysat/SIET_1_1%20-%20Photo.jpg`,imageSource:`Wayback Machine archive of official website (siet.ac.in)`,about:`Engineering institution known for industry-focused engineering education and student innovation.`,facilities:[`Library`,`Hostels`,`Laboratories`,`Satellite Lab`,`Sports Complex`,`Placement Cell`],eligibility:`50% in 12th with PCM through TNEA counselling`,courseIds:[25,7,32,11,17,5,1,9,6,2,14,21,3,4],branches:[{code:`AG`,name:`AGRICULTURAL ENGINEERING`},{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`AL`,name:`Artificial Intelligence and Machine Learning`},{code:`BM`,name:`BIO MEDICAL ENGINEERING`},{code:`BT`,name:`BIO TECHNOLOGY`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`EV`,name:`Electronics Engineering (VLSI Design and Technology)`},{code:`FD`,name:`FOOD TECHNOLOGY`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.siet.ac.in`},{id:20,name:`Rathinam Technical Campus`,city:`Coimbatore`,district:`Coimbatore`,locality:`Eachanari`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2329); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2329`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:3.9,fee:85e3,image:`https://rtc.ac.in/wp-content/uploads/slider/cache/16eb77f910c94c04a4496c34f94cdb09/banner2.webp`,imageSource:`Official college website`,about:`Engineering and technology campus at Eachanari, Coimbatore.`,facilities:[`Library`,`Hostels`,`Laboratories`,`Sports Complex`,`Incubator`,`Placement Cell`],eligibility:`50% in 12th with PCM through TNEA counselling`,courseIds:[25,7,17,1,8,9,45,2,3,4,16],branches:[{code:`AG`,name:`AGRICULTURAL ENGINEERING`},{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`BT`,name:`BIO TECHNOLOGY`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`AM`,name:`COMPUTER SCIENCE AND ENGINEERING (AI AND MACHINE LEARNING)`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`XS`,name:`COMPUTER SCIENCE AND ENGINEERING (TAMIL)`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`},{code:`MZ`,name:`Mechatronics Engineering`}],website:`https://rtc.ac.in`},{id:21,name:`Adithya Institute of Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`Kurumbapalayam`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2744); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2744`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://adithyatech.edu.in/wp-content/uploads/2025/03/homecs.jpg`,imageSource:`Official college website (adithyatech.edu.in)`,about:`Adithya Institute of Technology is a self-financing/aided autonomous engineering college at Kurumbapalayam, Coimbatore district, affiliated to Anna University. Its TNEA code is 2744 and the directory lists 7 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,5,1,6,2,3,4],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.adithyatech.edu.in`},{id:22,name:`Akshaya College of Engineering and Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`Kinathukadavu`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2763); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2763`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://www.acetcbe.edu.in/wp-content/uploads/2026/05/Homebanner3.webp`,imageSource:`Official college website (www.acetcbe.edu.in)`,about:`Akshaya College of Engineering and Technology is a self-financing/aided autonomous engineering college at Kinathukadavu, Coimbatore district, affiliated to Anna University. Its TNEA code is 2763 and the directory lists 9 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,5,27,1,9,6,2,4,16],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CB`,name:`COMPUTER SCIENCE AND BUSSINESS SYSTEM`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`ME`,name:`MECHANICAL ENGINEERING`},{code:`MZ`,name:`Mechatronics Engineering`}],website:`https://www.acetcbe.edu.in`},{id:23,name:`Anna University Regional Campus - Coimbatore`,city:`Coimbatore`,district:`Coimbatore`,locality:`Somayampalayam`,state:`Tamil Nadu`,type:`Non-Autonomous (Constituent College)`,autonomous:!1,autonomyNote:`Non-Autonomous in the TNEA college directory (TNEA code 2025); Constituent College, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2025`,funding:`Constituent College`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://image-static.collegedunia.com/public/college_data/images/appImage/1540964968newcover.jpg`,imageSource:`Collegedunia (verified Anna University Regional Campus - Coimbatore page)`,about:`Anna University Regional Campus - Coimbatore is a constituent college engineering college at Somayampalayam, Coimbatore district, affiliated to Anna University. Its TNEA code is 2025 and the directory lists 6 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,1,6,2,14,4],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`EV`,name:`Electronics Engineering (VLSI Design and Technology)`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.aurcc.ac.in`},{id:24,name:`Arjun College of Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`Kinathukadavu`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2367); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2367`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://www.actechnology.in/wp-content/uploads/2026/10/IMG_2825-1-scaled.jpg`,imageSource:`Official college website (www.actechnology.in)`,about:`Arjun College of Technology is a self-financing/aided autonomous engineering college at Kinathukadavu, Coimbatore district, affiliated to Anna University. Its TNEA code is 2367 and the directory lists 9 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,5,27,1,8,9,2,3,4],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CB`,name:`COMPUTER SCIENCE AND BUSSINESS SYSTEM`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`AM`,name:`COMPUTER SCIENCE AND ENGINEERING (AI AND MACHINE LEARNING)`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.actechnology.in`},{id:25,name:`Asian College of Engineering and Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`Kondayampalayam`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2338); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2338`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://image-static.collegedunia.com/public/college_data/images/appImage/55494_ACEEE-001.png`,imageSource:`Collegedunia (verified Asian College of Engineering and Technology page)`,about:`Asian College of Engineering and Technology is a self-financing/aided autonomous engineering college at Kondayampalayam, Coimbatore district, affiliated to Anna University. Its TNEA code is 2338 and the directory lists 7 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[25,7,11,1,6,3,4],branches:[{code:`AG`,name:`AGRICULTURAL ENGINEERING`},{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`BM`,name:`BIO MEDICAL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.acetcbe.in`},{id:26,name:`C M S College of Engineering and Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`Appachigoundapathy`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2772); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2772`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://cmscollege.edu.in/cet/wp-content/uploads/2023/01/cmscet-1-1.jpg`,imageSource:`Official college website (cmscollege.edu.in)`,about:`C M S College of Engineering and Technology is a self-financing/aided autonomous engineering college at Appachigoundapathy, Coimbatore district, affiliated to Anna University. Its TNEA code is 2772 and the directory lists 8 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,1,8,9,6,2,3,4],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`AM`,name:`COMPUTER SCIENCE AND ENGINEERING (AI AND MACHINE LEARNING)`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://cmscollege.edu.in/cet/`},{id:27,name:`Christ The King Engineering College`,city:`Coimbatore`,district:`Coimbatore`,locality:`Chikkarampalayam`,state:`Tamil Nadu`,type:`Non-Autonomous (Self-Financing)`,autonomous:!1,autonomyNote:`Non-Autonomous in the TNEA college directory (TNEA code 2650); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2650`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://www.ckec.ac.in/images/about/bg-1.png`,imageSource:`Official college website (www.ckec.ac.in)`,about:`Christ The King Engineering College is a self-financing engineering college at Chikkarampalayam, Coimbatore district, affiliated to Anna University. Its TNEA code is 2650 and the directory lists 7 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,1,8,9,2,3,4],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`AM`,name:`COMPUTER SCIENCE AND ENGINEERING (AI AND MACHINE LEARNING)`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.ckec.ac.in`},{id:28,name:`Dhaanish Ahmed Institute of Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`Pitchanur`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2349); Self-Financing, Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2349`,funding:`Self-Financing`,minority:`Minority`,established:null,rating:null,fee:null,image:`https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cf/Dhaanish_Ahmed_Institute_of_Technology.jpg/1920px-Dhaanish_Ahmed_Institute_of_Technology.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail`,imageSource:`Wikimedia Commons (File:Dhaanish Ahmed Institute of Technology.jpg)`,about:`Dhaanish Ahmed Institute of Technology is a self-financing/aided autonomous engineering college at Pitchanur, Coimbatore district, affiliated to Anna University. Its TNEA code is 2349 and the directory lists 9 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,11,1,8,9,2,21,3,10],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`BM`,name:`BIO MEDICAL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`AM`,name:`COMPUTER SCIENCE AND ENGINEERING (AI AND MACHINE LEARNING)`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`FD`,name:`FOOD TECHNOLOGY`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`RM`,name:`ROBOTICS AND AUTOMATION`}],website:`https://www.dhaanish.com`},{id:29,name:`Dhanalakshmi Srinivasan College of Engineering (CBE)`,city:`Coimbatore`,district:`Coimbatore`,locality:`Navakkarai`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2743); Self-Financing, Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2743`,funding:`Self-Financing`,minority:`Minority`,established:null,rating:null,fee:null,image:`https://upload.wikimedia.org/wikipedia/commons/1/1d/Dhanalakshmi_Srinivasan_College_of_Engineering_and_Technology.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled`,imageSource:`Wikimedia Commons (File:Dhanalakshmi Srinivasan College of Engineering and Technology.jpg)`,about:`Dhanalakshmi Srinivasan College of Engineering (CBE) is a self-financing/aided autonomous engineering college at Navakkarai, Coimbatore district, affiliated to Anna University. Its TNEA code is 2743 and the directory lists 11 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[25,7,11,17,5,1,9,6,2,21,4],branches:[{code:`AG`,name:`AGRICULTURAL ENGINEERING`},{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`BM`,name:`BIO MEDICAL ENGINEERING`},{code:`BT`,name:`BIO TECHNOLOGY`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`FD`,name:`FOOD TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.dsce.ac.in`},{id:30,name:`Dr Mahalingam College of Engineering and Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`Pollachi`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2706); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2706`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://drmcet.ac.in/wp-content/uploads/2024/01/slider2.jpg`,imageSource:`Official college website (drmcet.ac.in)`,about:`Dr Mahalingam College of Engineering and Technology is a self-financing/aided autonomous engineering college at Pollachi, Coimbatore district, affiliated to Anna University. Its TNEA code is 2706 and the directory lists 11 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,12,5,1,8,9,6,2,14,3,4],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`AU`,name:`AUTOMOBILE ENGINEERING`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`AM`,name:`COMPUTER SCIENCE AND ENGINEERING (AI AND MACHINE LEARNING)`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`EV`,name:`Electronics Engineering (VLSI Design and Technology)`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.drmcet.ac.in`},{id:31,name:`Easa College of Engineering and Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`Navakkarai`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2749); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2749`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://www.easacollege.com/images/easa-college-of-engineering-coimbatore.png`,imageSource:`Official college website (www.easacollege.com)`,about:`Easa College of Engineering and Technology is a self-financing/aided autonomous engineering college at Navakkarai, Coimbatore district, affiliated to Anna University. Its TNEA code is 2749 and the directory lists 10 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[25,7,11,1,8,9,6,2,3,4],branches:[{code:`AG`,name:`AGRICULTURAL ENGINEERING`},{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`BM`,name:`BIO MEDICAL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`AM`,name:`COMPUTER SCIENCE AND ENGINEERING (AI AND MACHINE LEARNING)`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.easacollege.com`},{id:32,name:`Hindusthan Institute of Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`Othakkal Mandapam`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2740); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2740`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://www.hit.edu.in/assets/hindusthan_images/hindusthan.png`,imageSource:`Official college website (www.hit.edu.in)`,about:`Hindusthan Institute of Technology is a self-financing/aided autonomous engineering college at Othakkal Mandapam, Coimbatore district, affiliated to Anna University. Its TNEA code is 2740 and the directory lists 6 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[30,7,1,2,3,4],branches:[{code:`AE`,name:`AERONAUTICAL ENGINEERING`},{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.hit.edu.in`},{id:33,name:`Info Institute of Engineering`,city:`Coimbatore`,district:`Coimbatore`,locality:`Sarakarsamakulam`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2732); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2732`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://www.infoengg.com/images//banners/InfoCollege/1111Banner1.png`,imageSource:`Official college website (www.infoengg.com)`,about:`Info Institute of Engineering is a self-financing/aided autonomous engineering college at Sarakarsamakulam, Coimbatore district, affiliated to Anna University. Its TNEA code is 2732 and the directory lists 6 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,1,6,2,3,4],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.infoengg.com`},{id:34,name:`Jansons Institute of Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`Karumathampatti`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2762); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2762`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://jit.ac.in/assets/uploads/2026/07/second-slide.jpg`,imageSource:`Official college website (www.jit.ac.in)`,about:`Jansons Institute of Technology is a self-financing/aided autonomous engineering college at Karumathampatti, Coimbatore district, affiliated to Anna University. Its TNEA code is 2762 and the directory lists 6 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,5,27,1,2,4],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CB`,name:`COMPUTER SCIENCE AND BUSSINESS SYSTEM`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.jit.ac.in`},{id:35,name:`JCT College of Engineering and Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`Pichanur`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2769); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2769`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://cdn.jct.ac.in/images/1781255577699-8fb54260-WhatsApp-Image-2026-06-12-at-2.38.19-PM.webp`,imageSource:`Official college website (www.jct.ac.in)`,about:`JCT College of Engineering and Technology is a self-financing/aided autonomous engineering college at Pichanur, Coimbatore district, affiliated to Anna University. Its TNEA code is 2769 and the directory lists 11 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,37,5,27,1,6,2,21,4,22,68],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`BC`,name:`Bio Technology and Bio Chemical Engineering`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CB`,name:`COMPUTER SCIENCE AND BUSSINESS SYSTEM`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`FD`,name:`FOOD TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`},{code:`PC`,name:`PETRO CHEMICAL TECHNOLOGY`},{code:`PE`,name:`PETROLEUM ENGINEERING`}],website:`https://www.jct.ac.in`},{id:36,name:`Karpagam Institute of Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`Seerapalayam`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2735); Self-Financing, Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2735`,funding:`Self-Financing`,minority:`Minority`,established:null,rating:null,fee:null,image:`https://karpagamtech.ac.in/kit/wp-content/uploads/2023/09/KIT-Website-Banner-4-3.jpg`,imageSource:`Official college website (karpagamtech.ac.in)`,about:`Karpagam Institute of Technology is a self-financing/aided autonomous engineering college at Seerapalayam, Coimbatore district, affiliated to Anna University. Its TNEA code is 2735 and the directory lists 6 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,1,6,2,3,4],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://karpagamtech.ac.in`},{id:37,name:`Kathir College of Engineering`,city:`Coimbatore`,district:`Coimbatore`,locality:`Neelambur`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2745); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2745`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://kathir.ac.in/wp-content/uploads/2026/01/Slider-image-01.jpg`,imageSource:`Official college website (kathir.ac.in)`,about:`Kathir College of Engineering is a self-financing/aided autonomous engineering college at Neelambur, Coimbatore district, affiliated to Anna University. Its TNEA code is 2745 and the directory lists 7 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,28,1,8,6,2,4],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CO`,name:`COMPUTER AND COMMUNICATION ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`AM`,name:`COMPUTER SCIENCE AND ENGINEERING (AI AND MACHINE LEARNING)`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.kathir.ac.in`},{id:38,name:`KIT - Kalaignarkarunanidhi Institute of Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`Kannampalayam`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2750); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2750`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://www.kitcbe.com/assets/img/sliders/slider-51.jpg`,imageSource:`Official college website (www.kitcbe.com)`,about:`KIT - Kalaignarkarunanidhi Institute of Technology is a self-financing/aided autonomous engineering college at Kannampalayam, Coimbatore district, affiliated to Anna University. Its TNEA code is 2750 and the directory lists 12 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[30,7,11,17,27,1,8,9,6,2,14,4],branches:[{code:`AE`,name:`AERONAUTICAL ENGINEERING`},{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`BM`,name:`BIO MEDICAL ENGINEERING`},{code:`BT`,name:`BIO TECHNOLOGY`},{code:`CB`,name:`COMPUTER SCIENCE AND BUSSINESS SYSTEM`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`AM`,name:`COMPUTER SCIENCE AND ENGINEERING (AI AND MACHINE LEARNING)`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`EV`,name:`Electronics Engineering (VLSI Design and Technology)`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.kitcbe.com`},{id:39,name:`Nehru Institute of Engineering and Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`Thirumalayampalayam`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2729); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2729`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://www.nehrucolleges.org/new/slider/tm-campus.webp`,imageSource:`Official college website (www.nehrucolleges.org)`,about:`Nehru Institute of Engineering and Technology is a self-financing/aided autonomous engineering college at Thirumalayampalayam, Coimbatore district, affiliated to Anna University. Its TNEA code is 2729 and the directory lists 9 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[30,7,27,1,6,2,3,4,16],branches:[{code:`AE`,name:`AERONAUTICAL ENGINEERING`},{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CB`,name:`COMPUTER SCIENCE AND BUSSINESS SYSTEM`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`},{code:`MZ`,name:`Mechatronics Engineering`}],website:`https://www.nehrucolleges.org`},{id:40,name:`Nehru Institute of Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`Kaliapuram`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2755); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2755`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://www.nehruinstitute.com/wp-content/uploads/2023/09/WhatsApp-Image-2023-09-01-at-22.54.05.jpg`,imageSource:`Official college website (www.nehruinstitute.com)`,about:`Nehru Institute of Technology is a self-financing/aided autonomous engineering college at Kaliapuram, Coimbatore district, affiliated to Anna University. Its TNEA code is 2755 and the directory lists 10 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[30,25,7,5,28,1,8,9,21,3],branches:[{code:`AE`,name:`AERONAUTICAL ENGINEERING`},{code:`AG`,name:`AGRICULTURAL ENGINEERING`},{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CO`,name:`COMPUTER AND COMMUNICATION ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`AM`,name:`COMPUTER SCIENCE AND ENGINEERING (AI AND MACHINE LEARNING)`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`FD`,name:`FOOD TECHNOLOGY`},{code:`IT`,name:`INFORMATION TECHNOLOGY`}],website:`https://www.nehruinstitute.com`},{id:41,name:`P A College of Engineering and Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`Pollachi`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2741); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2741`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://www.pacolleges.org/images/bg/bg7.jpg`,imageSource:`Official college website (www.pacolleges.org)`,about:`P A College of Engineering and Technology is a self-financing/aided autonomous engineering college at Pollachi, Coimbatore district, affiliated to Anna University. Its TNEA code is 2741 and the directory lists 7 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,5,1,6,2,3,4],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.pacolleges.org`},{id:42,name:`Park College of Engineering and Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`Kaniyur`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2716); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2716`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://www.pcet.ac.in/wp-content/uploads/2023/07/home-banner-16.jpg`,imageSource:`Official college website (www.pcet.ac.in)`,about:`Park College of Engineering and Technology is a self-financing/aided autonomous engineering college at Kaniyur, Coimbatore district, affiliated to Anna University. Its TNEA code is 2716 and the directory lists 16 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[30,25,7,11,1,9,6,2,20,56,3,4,16,65,10,19],branches:[{code:`AE`,name:`AERONAUTICAL ENGINEERING`},{code:`AG`,name:`AGRICULTURAL ENGINEERING`},{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`BM`,name:`BIO MEDICAL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`FT`,name:`FASHION TECHNOLOGY`},{code:`GI`,name:`GEO INFORMATICS`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`},{code:`MZ`,name:`Mechatronics Engineering`},{code:`MD`,name:`MEDICAL ELECTRONICS ENGINEERING`},{code:`RM`,name:`ROBOTICS AND AUTOMATION`},{code:`TX`,name:`TEXTILE TECHNOLOGY`}],website:`https://www.pcet.ac.in`},{id:43,name:`Park College of Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`Karumathampatti`,state:`Tamil Nadu`,type:`Non-Autonomous (Self-Financing)`,autonomous:!1,autonomyNote:`Non-Autonomous in the TNEA college directory (TNEA code 2768); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2768`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://www.pct.ac.in/img/about/About_Us.jpg`,imageSource:`Official college website (www.pct.ac.in)`,about:`Park College of Technology is a self-financing engineering college at Karumathampatti, Coimbatore district, affiliated to Anna University. Its TNEA code is 2768 and the directory lists 8 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[24,7,5,1,8,2,54,4],branches:[{code:`AO`,name:`AEROSPACE ENGINEERING`},{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`AM`,name:`COMPUTER SCIENCE AND ENGINEERING (AI AND MACHINE LEARNING)`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`EN`,name:`ENVIRONMENTAL ENGINEERING`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.pct.ac.in`},{id:44,name:`Pollachi Institute of Engineering and Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`Pollachi`,state:`Tamil Nadu`,type:`Non-Autonomous (Self-Financing)`,autonomous:!1,autonomyNote:`Non-Autonomous in the TNEA college directory (TNEA code 2354); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2354`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://www.pietech.edu.in/images/slider/slide-1.png`,imageSource:`Official college website (www.pietech.edu.in)`,about:`Pollachi Institute of Engineering and Technology is a self-financing engineering college at Pollachi, Coimbatore district, affiliated to Anna University. Its TNEA code is 2354 and the directory lists 7 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,5,1,6,2,3,4],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.pietech.edu.in`},{id:45,name:`PPG Institute of Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`Saravanampatti`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2753); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2753`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://media.getmyuni.com/azure/college-image/big/ppg-institute-of-technology-ppgit-coimbatore.jpg`,imageSource:`GetMyUni (verified PPG Institute of Technology page)`,about:`PPG Institute of Technology is a self-financing/aided autonomous engineering college at Saravanampatti, Coimbatore district, affiliated to Anna University. Its TNEA code is 2753 and the directory lists 8 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[25,7,11,1,8,2,3,4],branches:[{code:`AG`,name:`AGRICULTURAL ENGINEERING`},{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`BM`,name:`BIO MEDICAL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`AM`,name:`COMPUTER SCIENCE AND ENGINEERING (AI AND MACHINE LEARNING)`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.ppgit.in`},{id:46,name:`R V S Technical Campus Coimbatore`,city:`Coimbatore`,district:`Coimbatore`,locality:`Sulur`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2776); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2776`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://www.rvstcc.ac.in/wp-content/uploads/2024/12/event-image-home-1024x960-1.webp`,imageSource:`Official college website (www.rvstcc.ac.in)`,about:`R V S Technical Campus Coimbatore is a self-financing/aided autonomous engineering college at Sulur, Coimbatore district, affiliated to Anna University. Its TNEA code is 2776 and the directory lists 10 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[25,7,12,5,1,8,9,2,4,16],branches:[{code:`AG`,name:`AGRICULTURAL ENGINEERING`},{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`AU`,name:`AUTOMOBILE ENGINEERING`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`AM`,name:`COMPUTER SCIENCE AND ENGINEERING (AI AND MACHINE LEARNING)`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`ME`,name:`MECHANICAL ENGINEERING`},{code:`MZ`,name:`Mechatronics Engineering`}],website:`https://rvstcc.ac.in`},{id:47,name:`RVS College of Engineering and Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`Sulur`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2731); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2731`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://rvscet.ac.in/wp-content/uploads/2026/08/Rvscet-banner.png`,imageSource:`Official college website (rvscet.ac.in)`,about:`RVS College of Engineering and Technology is a self-financing/aided autonomous engineering college at Sulur, Coimbatore district, affiliated to Anna University. Its TNEA code is 2731 and the directory lists 8 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,11,1,6,2,3,4,22],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`BM`,name:`BIO MEDICAL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`},{code:`PC`,name:`PETRO CHEMICAL TECHNOLOGY`}],website:`https://www.rvscet.ac.in`},{id:48,name:`Sree Sakthi Engineering College`,city:`Coimbatore`,district:`Coimbatore`,locality:`Bettathapuram`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2673); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2673`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://www.sreesakthi.edu.in/assets/img/new-images/banner-five.webp`,imageSource:`Official college website (www.sreesakthi.edu.in)`,about:`Sree Sakthi Engineering College is a self-financing/aided autonomous engineering college at Bettathapuram, Coimbatore district, affiliated to Anna University. Its TNEA code is 2673 and the directory lists 10 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,5,1,8,9,6,2,3,4,16],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`AM`,name:`COMPUTER SCIENCE AND ENGINEERING (AI AND MACHINE LEARNING)`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`},{code:`MZ`,name:`Mechatronics Engineering`}],website:`https://www.sreesakthi.edu.in`},{id:49,name:`Sri Eshwar College of Engineering`,city:`Coimbatore`,district:`Coimbatore`,locality:`Kinathukadavu`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2739); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2739`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://sece.ac.in/wp-content/uploads/2025/03/Sri-Eshwar-College-of-Engineering-Centre-for-Research-And-Development-Banner.webp`,imageSource:`Official college website (sece.ac.in)`,about:`Sri Eshwar College of Engineering is a self-financing/aided autonomous engineering college at Kinathukadavu, Coimbatore district, affiliated to Anna University. Its TNEA code is 2739 and the directory lists 11 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,28,27,1,8,9,6,2,14,3,4],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CO`,name:`COMPUTER AND COMMUNICATION ENGINEERING`},{code:`CB`,name:`COMPUTER SCIENCE AND BUSSINESS SYSTEM`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`AM`,name:`COMPUTER SCIENCE AND ENGINEERING (AI AND MACHINE LEARNING)`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`EV`,name:`Electronics Engineering (VLSI Design and Technology)`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.sece.ac.in`},{id:50,name:`Sri Ramakrishna Engineering College`,city:`Coimbatore`,district:`Coimbatore`,locality:`Vattamalaipalayam`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2719); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2719`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://srec.ac.in/uploads/banner/cii.jpg`,imageSource:`Official college website (srec.ac.in)`,about:`Sri Ramakrishna Engineering College is a self-financing/aided autonomous engineering college at Vattamalaipalayam, Coimbatore district, affiliated to Anna University. Its TNEA code is 2719 and the directory lists 12 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[30,7,11,5,1,6,2,13,3,26,4,10],branches:[{code:`AE`,name:`AERONAUTICAL ENGINEERING`},{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`BM`,name:`BIO MEDICAL ENGINEERING`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`EI`,name:`ELECTRONICS AND INSTRUMENTATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`CJ`,name:`M.Tech. Computer Science and Engineering (Integrated 5 years)`},{code:`ME`,name:`MECHANICAL ENGINEERING`},{code:`RM`,name:`ROBOTICS AND AUTOMATION`}],website:`https://www.srec.ac.in`},{id:51,name:`Sri Ranganathar Institute of Engineering and Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`Athipalayam`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2342); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2342`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://www.sriet.ac.in/images/home/campusmoments/gallery.png`,imageSource:`Official college website (www.sriet.ac.in)`,about:`Sri Ranganathar Institute of Engineering and Technology is a self-financing/aided autonomous engineering college at Athipalayam, Coimbatore district, affiliated to Anna University. Its TNEA code is 2342 and the directory lists 8 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,5,1,9,6,2,3,4],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.sriet.ac.in`},{id:52,name:`Sri Sai Ranganathan Engineering College`,city:`Coimbatore`,district:`Coimbatore`,locality:`Viraliyur`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2737); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2737`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://www.reccbe.ac.in/assets/img/bg/college.jpg`,imageSource:`Official college website (www.reccbe.ac.in)`,about:`Sri Sai Ranganathan Engineering College is a self-financing/aided autonomous engineering college at Viraliyur, Coimbatore district, affiliated to Anna University. Its TNEA code is 2737 and the directory lists 9 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,5,1,8,9,6,2,3,4],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`AM`,name:`COMPUTER SCIENCE AND ENGINEERING (AI AND MACHINE LEARNING)`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.reccbe.ac.in`},{id:53,name:`Studyworld College of Engineering`,city:`Coimbatore`,district:`Coimbatore`,locality:`Palathurai`,state:`Tamil Nadu`,type:`Non-Autonomous (Self-Financing)`,autonomous:!1,autonomyNote:`Non-Autonomous in the TNEA college directory (TNEA code 2770); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2770`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://studyworldindia.com/wp-content/uploads/2023/03/campus-life-2.jpg`,imageSource:`Official college website (studyworldindia.com)`,about:`Studyworld College of Engineering is a self-financing engineering college at Palathurai, Coimbatore district, affiliated to Anna University. Its TNEA code is 2770 and the directory lists 8 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,1,8,9,6,2,3,4],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`AM`,name:`COMPUTER SCIENCE AND ENGINEERING (AI AND MACHINE LEARNING)`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://studyworldindia.com`},{id:54,name:`Suguna College of Engineering`,city:`Coimbatore`,district:`Coimbatore`,locality:`Coimbatore`,state:`Tamil Nadu`,type:`Non-Autonomous (Self-Financing)`,autonomous:!1,autonomyNote:`Non-Autonomous in the TNEA college directory (TNEA code 2360); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2360`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://media.getmyuni.com/azure/college-image/big/suguna-college-of-engineering-sce-coimbatore.jpg`,imageSource:`GetMyUni (verified Suguna College of Engineering page)`,about:`Suguna College of Engineering is a self-financing engineering college at Coimbatore, Coimbatore district, affiliated to Anna University. Its TNEA code is 2360 and the directory lists 7 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[25,7,1,2,3,4,16],branches:[{code:`AG`,name:`AGRICULTURAL ENGINEERING`},{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`},{code:`MZ`,name:`Mechatronics Engineering`}],website:`https://www.sugunace.com`},{id:55,name:`Tamilnadu College of Engineering`,city:`Coimbatore`,district:`Coimbatore`,locality:`Karumathampatti`,state:`Tamil Nadu`,type:`Non-Autonomous (Self-Financing)`,autonomous:!1,autonomyNote:`Non-Autonomous in the TNEA college directory (TNEA code 2721); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2721`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://www.tnce.ac.in/images/image_2.jpg`,imageSource:`Official college website (www.tnce.ac.in)`,about:`Tamilnadu College of Engineering is a self-financing engineering college at Karumathampatti, Coimbatore district, affiliated to Anna University. Its TNEA code is 2721 and the directory lists 9 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,12,5,1,6,2,3,15,4],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`AU`,name:`AUTOMOBILE ENGINEERING`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`IC`,name:`INSTRUMENTATION AND CONTROL ENGINEERING`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.tnce.ac.in`},{id:56,name:`United Institute of Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`G.koundampalayam`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2761); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2761`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://uit.ac.in/images/about/uit-11.jpg`,imageSource:`Official college website (uit.ac.in)`,about:`United Institute of Technology is a self-financing/aided autonomous engineering college at G.koundampalayam, Coimbatore district, affiliated to Anna University. Its TNEA code is 2761 and the directory lists 6 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,1,9,2,3,10],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`RM`,name:`ROBOTICS AND AUTOMATION`}],website:`https://www.uit.ac.in`},{id:57,name:`V.S.B. College of Engineering Technical Campus`,city:`Coimbatore`,district:`Coimbatore`,locality:`Solavampalayam`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2357); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2357`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://vsbcetc.edu.in/wp-content/uploads/al_opt_content/IMAGE/vsbcetc.edu.in/wp-content/uploads/2024/04/e5925692-9165-4e7d-aaf1-d08b34312c84.jpg.bv.webp`,imageSource:`Official college website (www.vsbcetc.edu.in)`,about:`V.S.B. College of Engineering Technical Campus is a self-financing/aided autonomous engineering college at Solavampalayam, Coimbatore district, affiliated to Anna University. Its TNEA code is 2357 and the directory lists 8 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[25,7,1,8,6,2,3,4],branches:[{code:`AG`,name:`AGRICULTURAL ENGINEERING`},{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`AM`,name:`COMPUTER SCIENCE AND ENGINEERING (AI AND MACHINE LEARNING)`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.vsbcetc.edu.in`},{id:58,name:`Vishnu Lakshmi College of Engineering and Technology`,city:`Coimbatore`,district:`Coimbatore`,locality:`Kanjikonampalayam`,state:`Tamil Nadu`,type:`Non-Autonomous (Self-Financing)`,autonomous:!1,autonomyNote:`Non-Autonomous in the TNEA college directory (TNEA code 2368); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2368`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://media.collegedekho.com/media/img/institute/crawled_images/Vishnu_Lakshmi_College_of_Engineering_and_Technology.jpg`,imageSource:`CollegeDekho (verified Vishnu Lakshmi College of Engineering and Technology page)`,about:`Vishnu Lakshmi College of Engineering and Technology is a self-financing engineering college at Kanjikonampalayam, Coimbatore district, affiliated to Anna University. Its TNEA code is 2368 and the directory lists 5 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[5,1,6,2,4],branches:[{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://WWW.VISHNULAKSHMIINSTITUTIONS.COM`},{id:59,name:`Bannari Amman Institute of Technology`,city:`Erode`,district:`Erode`,locality:`Alathukombai`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2702); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2702`,funding:`Self-Financing`,minority:`Non-Minority`,established:1996,rating:4.2,fee:12e4,image:`https://www.bitsathy.ac.in/wp-content/uploads/About-Card-scaled.jpg`,imageSource:`Official college website`,about:`Autonomous engineering college with NBA accredited programmes and modern campus facilities.`,facilities:[`Library`,`Hostels`,`Laboratories`,`Sports Complex`,`Clinic`,`Placement Cell`],eligibility:`50% in 12th with PCM through TNEA counselling`,courseIds:[25,7,32,17,1,6,2,13,3,4,16],branches:[{code:`AG`,name:`AGRICULTURAL ENGINEERING`},{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`AL`,name:`Artificial Intelligence and Machine Learning`},{code:`BT`,name:`BIO TECHNOLOGY`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`EI`,name:`ELECTRONICS AND INSTRUMENTATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`},{code:`MZ`,name:`Mechatronics Engineering`}],website:`https://www.bitsathy.ac.in`},{id:60,name:`HINDUSTHAN COLLEGE OF ENGINEERING`,city:`Erode`,district:`Erode`,locality:`Ingur`,state:`Tamil Nadu`,type:`Non-Autonomous (Self-Financing)`,autonomous:!1,autonomyNote:`Non-Autonomous in the TNEA college directory (TNEA code 2777); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2777`,funding:`Self-Financing`,minority:`Non-Minority`,established:2e3,rating:4,fee:9e4,image:`https://hicet.ac.in/images/banner/02.jpg`,imageSource:`Official college website`,about:`Engineering and technology college with a large campus on Pollachi Main Road.`,facilities:[`Library`,`Hostels`,`Laboratories`,`Sports Complex`,`Placement Cell`],eligibility:`50% in 12th with PCM through TNEA counselling`,courseIds:[7,1,2,3],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`}],website:`https://hicet.ac.in`},{id:61,name:`Aishwarya College of Engineering and Technology`,city:`Erode`,district:`Erode`,locality:`Errattaikarad`,state:`Tamil Nadu`,type:`Non-Autonomous (Self-Financing)`,autonomous:!1,autonomyNote:`Non-Autonomous in the TNEA college directory (TNEA code 2332); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2332`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://www.aishwaryaenggcollege.ac.in/gallery/ev1.jpg`,imageSource:`Official college website (www.aishwaryaenggcollege.ac.in)`,about:`Aishwarya College of Engineering and Technology is a self-financing engineering college at Errattaikarad, Erode district, affiliated to Anna University. Its TNEA code is 2332 and the directory lists 6 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,5,1,6,2,4],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.aishwaryaenggcollege.ac.in`},{id:62,name:`AL-Ameen Engineering College`,city:`Erode`,district:`Erode`,locality:`Karundevanpalayam`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2652); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2652`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://alameen.ac.in/wp-content/uploads/2023/09/Abouhome-t.png`,imageSource:`Official college website (alameen.ac.in)`,about:`AL-Ameen Engineering College is a self-financing/aided autonomous engineering college at Karundevanpalayam, Erode district, affiliated to Anna University. Its TNEA code is 2652 and the directory lists 6 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,1,6,2,3,4],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.alameen.ac.in`},{id:63,name:`Erode Sengunthar Engineering College`,city:`Erode`,district:`Erode`,locality:`Thudupathi`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2707); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2707`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://erode-sengunthar.ac.in/wp-content/uploads/2026/05/ascent2026.jpeg`,imageSource:`Official college website (erode-sengunthar.ac.in)`,about:`Erode Sengunthar Engineering College is a self-financing/aided autonomous engineering college at Thudupathi, Erode district, affiliated to Anna University. Its TNEA code is 2707 and the directory lists 20 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[25,7,11,17,18,5,40,1,8,9,44,6,2,51,13,3,26,4,64,10],branches:[{code:`AG`,name:`AGRICULTURAL ENGINEERING`},{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`BM`,name:`BIO MEDICAL ENGINEERING`},{code:`BT`,name:`BIO TECHNOLOGY`},{code:`CH`,name:`CHEMICAL ENGINEERING`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CD`,name:`COMPUTER SCIENCE AND DESIGN`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`AM`,name:`COMPUTER SCIENCE AND ENGINEERING (AI AND MACHINE LEARNING)`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`CI`,name:`Computer Science and Engineering (Internet of Things)`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`VL`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING (VLSI DESIGN AND TECHNOLOGY)`},{code:`EI`,name:`ELECTRONICS AND INSTRUMENTATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`CJ`,name:`M.Tech. Computer Science and Engineering (Integrated 5 years)`},{code:`ME`,name:`MECHANICAL ENGINEERING`},{code:`XM`,name:`MECHANICAL ENGINEERING (TAMIL MEDIUM)`},{code:`RM`,name:`ROBOTICS AND AUTOMATION`}],website:`https://www.erode-sengunthar.ac.in`},{id:64,name:`Government College of Engineering (Formerly Institute of Road and Transport Technology)`,city:`Erode`,district:`Erode`,locality:`Erode`,state:`Tamil Nadu`,type:`Non-Autonomous (Government)`,autonomous:!1,autonomyNote:`Non-Autonomous in the TNEA college directory (TNEA code 2709); Government, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2709`,funding:`Government`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://www.gcee.ac.in/College_Topbanner.jpg`,imageSource:`Official college website (www.gcee.ac.in)`,about:`Government College of Engineering (Formerly Institute of Road and Transport Technology) is a government engineering college at Erode, Erode district, affiliated to Anna University. Its TNEA code is 2709 and the directory lists 8 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[12,5,1,42,6,2,3,4],branches:[{code:`AU`,name:`AUTOMOBILE ENGINEERING`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`CF`,name:`COMPUTER SCIENCE AND ENGINEERING (DATA SCIENCE)`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.gcee.ac.in`},{id:65,name:`JKK Munirajah College of Technology`,city:`Erode`,district:`Erode`,locality:`Punjai Thurayampalayam`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2758); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2758`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://www.jkkmct.edu.in/software/uploads/slider/02.jpeg`,imageSource:`Official college website (www.jkkmct.edu.in)`,about:`JKK Munirajah College of Technology is a self-financing/aided autonomous engineering college at Punjai Thurayampalayam, Erode district, affiliated to Anna University. Its TNEA code is 2758 and the directory lists 9 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,12,5,1,9,6,2,3,4],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`AU`,name:`AUTOMOBILE ENGINEERING`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.jkkmct.edu.in`},{id:66,name:`Kongu Engineering College`,city:`Erode`,district:`Erode`,locality:`Perundurai`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2711); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2711`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://upload.wikimedia.org/wikipedia/commons/e/e8/Kongu_Engineering_college%2CErode.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled`,imageSource:`Wikimedia Commons (File:Kongu Engineering college,Erode.jpg)`,about:`Kongu Engineering College is a self-financing/aided autonomous engineering college at Perundurai, Erode district, affiliated to Anna University. Its TNEA code is 2711 and the directory lists 14 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,32,12,18,5,40,1,6,2,13,21,3,4,16],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`AL`,name:`Artificial Intelligence and Machine Learning`},{code:`AU`,name:`AUTOMOBILE ENGINEERING`},{code:`CH`,name:`CHEMICAL ENGINEERING`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CD`,name:`COMPUTER SCIENCE AND DESIGN`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`EI`,name:`ELECTRONICS AND INSTRUMENTATION ENGINEERING`},{code:`FD`,name:`FOOD TECHNOLOGY`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`},{code:`MZ`,name:`Mechatronics Engineering`}],website:`https://www.kongu.ac.in`},{id:67,name:`M.P.Nachimuthu M.Jaganathan Engineering College`,city:`Erode`,district:`Erode`,locality:`Chennimalai`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2713); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2713`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://mpnmjec.ac.in/wp-content/uploads/2020/08/Infrastructure.jpg`,imageSource:`Official college website (mpnmjec.ac.in)`,about:`M.P.Nachimuthu M.Jaganathan Engineering College is a self-financing/aided autonomous engineering college at Chennimalai, Erode district, affiliated to Anna University. Its TNEA code is 2713 and the directory lists 6 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[5,1,6,2,3,4],branches:[{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.mpnmjec.ac.in`},{id:68,name:`Nandha College of Technology`,city:`Erode`,district:`Erode`,locality:`Erode`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2752); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2752`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://nandhatech.org/wp-content/uploads/2026/09/Web-NCT-Freshers-Day-1920x600-Slider-2.jpg.jpeg`,imageSource:`Official college website (nandhatech.org)`,about:`Nandha College of Technology is a self-financing/aided autonomous engineering college at Erode, Erode district, affiliated to Anna University. Its TNEA code is 2752 and the directory lists 5 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,1,6,2,3],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`}],website:`https://www.nandhatech.org`},{id:69,name:`Nandha Engineering College`,city:`Erode`,district:`Erode`,locality:`Chennimalaipalayam`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2715); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2715`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://nandhaengg.org/wp-content/uploads/2026/09/Web-NEC-Freshers-Day-1920x600-Slider.jpg.jpg`,imageSource:`Official college website (nandhaengg.org)`,about:`Nandha Engineering College is a self-financing/aided autonomous engineering college at Chennimalaipalayam, Erode district, affiliated to Anna University. Its TNEA code is 2715 and the directory lists 12 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[25,7,11,18,5,1,9,44,6,2,3,4],branches:[{code:`AG`,name:`AGRICULTURAL ENGINEERING`},{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`BM`,name:`BIO MEDICAL ENGINEERING`},{code:`CH`,name:`CHEMICAL ENGINEERING`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`CI`,name:`Computer Science and Engineering (Internet of Things)`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.nandhaengg.org`},{id:70,name:`Shree Venkateshwara Hi-Tech Engineering College`,city:`Erode`,district:`Erode`,locality:`Othakuthirai`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2747); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2747`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://www.svhec.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-21-at-4.22.14-PM.jpeg`,imageSource:`Official college website (www.svhec.com)`,about:`Shree Venkateshwara Hi-Tech Engineering College is a self-financing/aided autonomous engineering college at Othakuthirai, Erode district, affiliated to Anna University. Its TNEA code is 2747 and the directory lists 13 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,11,17,5,1,8,9,6,2,3,4,69,10],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`BM`,name:`BIO MEDICAL ENGINEERING`},{code:`BT`,name:`BIO TECHNOLOGY`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`AM`,name:`COMPUTER SCIENCE AND ENGINEERING (AI AND MACHINE LEARNING)`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`},{code:`PH`,name:`PHARMACEUTICAL TECHNOLOGY`},{code:`RM`,name:`ROBOTICS AND AUTOMATION`}],website:`https://www.svhec.com`},{id:71,name:`Surya Engineering College`,city:`Erode`,district:`Erode`,locality:`Erode`,state:`Tamil Nadu`,type:`Non-Autonomous (Self-Financing)`,autonomous:!1,autonomyNote:`Non-Autonomous in the TNEA college directory (TNEA code 2748); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2748`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://www.surya.ac.in/assets/img/about1.jpg`,imageSource:`Official college website (www.surya.ac.in)`,about:`Surya Engineering College is a self-financing engineering college at Erode, Erode district, affiliated to Anna University. Its TNEA code is 2748 and the directory lists 8 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,11,1,8,9,2,3,4],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`BM`,name:`BIO MEDICAL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`AM`,name:`COMPUTER SCIENCE AND ENGINEERING (AI AND MACHINE LEARNING)`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.surya.ac.in`},{id:72,name:`Velalar College of Engineering and Technology`,city:`Erode`,district:`Erode`,locality:`Erode`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2723); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2723`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://www.velalarengg.ac.in/wp-content/uploads/2026/06/banner-2.jpg`,imageSource:`Official college website (www.velalarengg.ac.in)`,about:`Velalar College of Engineering and Technology is a self-financing/aided autonomous engineering college at Erode, Erode district, affiliated to Anna University. Its TNEA code is 2723 and the directory lists 11 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,11,5,1,8,9,6,2,3,4,65],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`BM`,name:`BIO MEDICAL ENGINEERING`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`AM`,name:`COMPUTER SCIENCE AND ENGINEERING (AI AND MACHINE LEARNING)`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`},{code:`MD`,name:`MEDICAL ELECTRONICS ENGINEERING`}],website:`https://www.velalarengg.ac.in`},{id:73,name:`A V S College of Technology`,city:`Salem`,district:`Salem`,locality:`Chinnagoundapuram`,state:`Tamil Nadu`,type:`Non-Autonomous (Self-Financing)`,autonomous:!1,autonomyNote:`Non-Autonomous in the TNEA college directory (TNEA code 2347); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2347`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://www.avstech.ac.in/assets/new-img/about.jpg`,imageSource:`Official college website (www.avstech.ac.in)`,about:`A V S College of Technology is a self-financing engineering college at Chinnagoundapuram, Salem district, affiliated to Anna University. Its TNEA code is 2347 and the directory lists 8 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[25,7,1,9,6,2,3,4],branches:[{code:`AG`,name:`AGRICULTURAL ENGINEERING`},{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.avstech.ac.in`},{id:74,name:`Annapoorana Engineering College`,city:`Salem`,district:`Salem`,locality:`Salem`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2648); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2648`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://www.aecsalem.edu.in/admin/uploads/post_22_1788000709_0.jpg`,imageSource:`Official college website (www.aecsalem.edu.in)`,about:`Annapoorana Engineering College is a self-financing/aided autonomous engineering college at Salem, Salem district, affiliated to Anna University. Its TNEA code is 2648 and the directory lists 9 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,12,11,5,1,6,2,3,4],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`AU`,name:`AUTOMOBILE ENGINEERING`},{code:`BM`,name:`BIO MEDICAL ENGINEERING`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.aecsalem.edu.in`},{id:75,name:`AVS Engineering College`,city:`Salem`,district:`Salem`,locality:`Salem`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2636); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2636`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://www.avsenggcollege.ac.in/img/ef1088aa-6a13-41dd-b493-71ba53f19f1c.jpg`,imageSource:`Official college website (www.avsenggcollege.ac.in)`,about:`AVS Engineering College is a self-financing/aided autonomous engineering college at Salem, Salem district, affiliated to Anna University. Its TNEA code is 2636 and the directory lists 9 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,11,5,1,8,6,2,3,4],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`BM`,name:`BIO MEDICAL ENGINEERING`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`AM`,name:`COMPUTER SCIENCE AND ENGINEERING (AI AND MACHINE LEARNING)`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.avsenggcollege.ac.in`},{id:76,name:`Bharathiyar Institute of Engineering for Women`,city:`Salem`,district:`Salem`,locality:`Deviyakurichi`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2643); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2643`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://biew.ac.in/wp-content/uploads/2025/03/slider-2-1.png`,imageSource:`Official college website (www.biew.ac.in)`,about:`Bharathiyar Institute of Engineering for Women is a self-financing/aided autonomous engineering college at Deviyakurichi, Salem district, affiliated to Anna University. Its TNEA code is 2643 and the directory lists 6 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,1,9,6,2,3],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`}],website:`https://www.biew.ac.in`},{id:77,name:`Dhirajlal Gandhi College of Technology`,city:`Salem`,district:`Salem`,locality:`Sikkanampatty`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2345); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2345`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://www.dgct.ac.in/assets/img/front/dgct-main-building.jpg`,imageSource:`Official college website (www.dgct.ac.in)`,about:`Dhirajlal Gandhi College of Technology is a self-financing/aided autonomous engineering college at Sikkanampatty, Salem district, affiliated to Anna University. Its TNEA code is 2345 and the directory lists 9 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[25,7,5,1,6,2,3,4,10],branches:[{code:`AG`,name:`AGRICULTURAL ENGINEERING`},{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`},{code:`RM`,name:`ROBOTICS AND AUTOMATION`}],website:`https://www.dgct.ac.in`},{id:78,name:`Ganesh College of Engineering`,city:`Salem`,district:`Salem`,locality:`Mettupatti`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2341); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2341`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`http://ganeshenggcollege.org/images/banner_image/banner-1.jpeg`,imageSource:`Official college website (ganeshenggcollege.org)`,about:`Ganesh College of Engineering is a self-financing/aided autonomous engineering college at Mettupatti, Salem district, affiliated to Anna University. Its TNEA code is 2341 and the directory lists 8 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,11,5,1,6,2,3,4],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`BM`,name:`BIO MEDICAL ENGINEERING`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`http://ganeshenggcollege.org/`},{id:79,name:`Government College of Engineering`,city:`Salem`,district:`Salem`,locality:`Karuppur`,state:`Tamil Nadu`,type:`Autonomous (Government)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2615); Government, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2615`,funding:`Government`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://gcesalem.edu.in/sites/gcesalem.edu.in/files/styles/home_banner/public/home_page_banners/2_1_50_1_50.jpg?h=ad728033&amp;itok=97VtUg-l`,imageSource:`Official college website (gcesalem.edu.in)`,about:`Government College of Engineering is a self-financing/aided autonomous engineering college at Karuppur, Salem district, affiliated to Anna University. Its TNEA code is 2615 and the directory lists 7 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[5,1,8,6,2,4,66],branches:[{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`AM`,name:`COMPUTER SCIENCE AND ENGINEERING (AI AND MACHINE LEARNING)`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`ME`,name:`MECHANICAL ENGINEERING`},{code:`MT`,name:`METALLURGICAL ENGINEERING`}],website:`https://www.gcesalem.edu.in`},{id:80,name:`Indian Institute of Handloom Technology`,city:`Salem`,district:`Salem`,locality:`Salem`,state:`Tamil Nadu`,type:`Non-Autonomous (Central Government Institution)`,autonomous:!1,autonomyNote:`Non-Autonomous in the TNEA college directory (TNEA code 2343); Central Government Institution, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2343`,funding:`Central Government Institution`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://www.iihtsalem.edu.in/wp-content/uploads/2025/04/Sardar-vallabhai-patel-college.jpg`,imageSource:`Official college website (www.iihtsalem.edu.in)`,about:`Indian Institute of Handloom Technology is a central government institution engineering college at Salem, Salem district, affiliated to Anna University. Its TNEA code is 2343 and the directory lists 1 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[57],branches:[{code:`HT`,name:`HANDLOOM AND TEXTILE TECHNOLOGY`}],website:`https://www.iihtsalem.edu.in`},{id:81,name:`Knowledge Institute of Technology`,city:`Salem`,district:`Salem`,locality:`Salem`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2653); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2653`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://i0.wp.com/kiot.ac.in/wp-content/uploads/2023/04/why-1.jpg?resize=175%2C186&#038;ssl=1`,imageSource:`Official college website (i0.wp.com)`,about:`Knowledge Institute of Technology is a self-financing/aided autonomous engineering college at Salem, Salem district, affiliated to Anna University. Its TNEA code is 2653 and the directory lists 9 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,5,27,1,6,2,52,3,4],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CB`,name:`COMPUTER SCIENCE AND BUSSINESS SYSTEM`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`EX`,name:`Electronics and Computer Engineering`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.kiot.ac.in`},{id:82,name:`Mahendra College of Engineering`,city:`Salem`,district:`Salem`,locality:`Valapady`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2623); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2623`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://mahendra.org/wp-content/uploads/2021/04/slider2.jpg`,imageSource:`Official college website (mahendra.org)`,about:`Mahendra College of Engineering is a self-financing/aided autonomous engineering college at Valapady, Salem district, affiliated to Anna University. Its TNEA code is 2623 and the directory lists 7 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,11,1,6,2,3,4],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`BM`,name:`BIO MEDICAL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.mahendracollege.com`},{id:83,name:`R P Sarathy Institute of Technology`,city:`Salem`,district:`Salem`,locality:`Poosaripatty`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2639); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2639`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://media.collegedekho.com/media/img/institute/crawled_images/Narasus_Sarathy_Institute_of_Technologya1a5dc.jpg`,imageSource:`CollegeDekho (verified R P Sarathy Institute of Technology page)`,about:`R P Sarathy Institute of Technology is a self-financing/aided autonomous engineering college at Poosaripatty, Salem district, affiliated to Anna University. Its TNEA code is 2639 and the directory lists 8 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,1,8,9,6,2,3,4],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`AM`,name:`COMPUTER SCIENCE AND ENGINEERING (AI AND MACHINE LEARNING)`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.rpsit.ac.in`},{id:84,name:`Salem College of Engineering and Technology`,city:`Salem`,district:`Salem`,locality:`Mettupatty Perumapalayam`,state:`Tamil Nadu`,type:`Non-Autonomous (Self-Financing)`,autonomous:!1,autonomyNote:`Non-Autonomous in the TNEA college directory (TNEA code 2659); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2659`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://media.collegedekho.com/media/img/institute/crawled_images/Salem_College_of_Engineering_and_Technology87g.jpg`,imageSource:`CollegeDekho (verified Salem College of Engineering and Technology page)`,about:`Salem College of Engineering and Technology is a self-financing engineering college at Mettupatty Perumapalayam, Salem district, affiliated to Anna University. Its TNEA code is 2659 and the directory lists 9 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,11,17,5,1,6,2,3,4],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`BM`,name:`BIO MEDICAL ENGINEERING`},{code:`BT`,name:`BIO TECHNOLOGY`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://salemcollege.ac.in`},{id:85,name:`Shree Sathyam College of Engineering and Technology`,city:`Salem`,district:`Salem`,locality:`Sankari`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2346); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2346`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://shreesathyam.edu.in/wp-content/uploads/2026/04/banner-2-25-26.jpg`,imageSource:`Official college website (shreesathyam.edu.in)`,about:`Shree Sathyam College of Engineering and Technology is a self-financing/aided autonomous engineering college at Sankari, Salem district, affiliated to Anna University. Its TNEA code is 2346 and the directory lists 7 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,11,1,6,2,3,4],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`BM`,name:`BIO MEDICAL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.shreesathyam.edu.in`},{id:86,name:`Sona College of Technology`,city:`Salem`,district:`Salem`,locality:`Salem`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2618); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2618`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://image-static.collegedunia.com/public/college_data/images/appImage/15174_sano.jpg`,imageSource:`Collegedunia (verified Sona College of Technology page)`,about:`Sona College of Technology is a self-financing/aided autonomous engineering college at Salem, Salem district, affiliated to Anna University. Its TNEA code is 2618 and the directory lists 18 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,11,5,27,40,1,8,9,48,6,2,52,14,20,3,4,16,73],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`BM`,name:`BIO MEDICAL ENGINEERING`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CB`,name:`COMPUTER SCIENCE AND BUSSINESS SYSTEM`},{code:`CD`,name:`COMPUTER SCIENCE AND DESIGN`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`AM`,name:`COMPUTER SCIENCE AND ENGINEERING (AI AND MACHINE LEARNING)`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`EF`,name:`Electrical and Computer Engineering`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`EX`,name:`Electronics and Computer Engineering`},{code:`EV`,name:`Electronics Engineering (VLSI Design and Technology)`},{code:`FT`,name:`FASHION TECHNOLOGY`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`},{code:`MZ`,name:`Mechatronics Engineering`},{code:`SF`,name:`Safety and Fire Engineering`}],website:`https://www.sonatech.ac.in`},{id:87,name:`Sri Shanmugha College of Engineering and Technology`,city:`Salem`,district:`Salem`,locality:`Pullipalayam`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2302); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2302`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://upload.wikimedia.org/wikipedia/commons/3/32/Sri_Shanmugha_College_of_Engineering_and_Technology_entrance.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled`,imageSource:`Wikimedia Commons (File:Sri Shanmugha College of Engineering and Technology entrance.jpg)`,about:`Sri Shanmugha College of Engineering and Technology is a self-financing/aided autonomous engineering college at Pullipalayam, Salem district, affiliated to Anna University. Its TNEA code is 2302 and the directory lists 9 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[25,7,32,11,1,9,2,3,4],branches:[{code:`AG`,name:`AGRICULTURAL ENGINEERING`},{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`AL`,name:`Artificial Intelligence and Machine Learning`},{code:`BM`,name:`BIO MEDICAL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`SC`,name:`Computer Science and Engineering (Cyber Security)`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://shanmugha.edu.in/`},{id:88,name:`Tagore Institute of Engineering and Technology`,city:`Salem`,district:`Salem`,locality:`Deviyakurichi`,state:`Tamil Nadu`,type:`Non-Autonomous (Self-Financing)`,autonomous:!1,autonomyNote:`Non-Autonomous in the TNEA college directory (TNEA code 2646); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2646`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://www.tagoreiet.ac.in/images/about-1.jpg`,imageSource:`Official college website (www.tagoreiet.ac.in)`,about:`Tagore Institute of Engineering and Technology is a self-financing engineering college at Deviyakurichi, Salem district, affiliated to Anna University. Its TNEA code is 2646 and the directory lists 8 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,5,1,8,6,2,3,4],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`AM`,name:`COMPUTER SCIENCE AND ENGINEERING (AI AND MACHINE LEARNING)`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.tagoreiet.ac.in`},{id:89,name:`The Kavery Engineering College`,city:`Salem`,district:`Salem`,locality:`m. Kalipatti`,state:`Tamil Nadu`,type:`Autonomous (Self-Financing)`,autonomous:!0,autonomyNote:`Autonomous in the TNEA college directory (TNEA code 2625); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2625`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://www.kavery.org.in/assets/img/institutions/k_engg.png`,imageSource:`Official college website (www.kavery.org.in)`,about:`The Kavery Engineering College is a self-financing/aided autonomous engineering college at m. Kalipatti, Salem district, affiliated to Anna University. Its TNEA code is 2625 and the directory lists 10 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[25,7,11,18,5,1,6,2,3,4],branches:[{code:`AG`,name:`AGRICULTURAL ENGINEERING`},{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`BM`,name:`BIO MEDICAL ENGINEERING`},{code:`CH`,name:`CHEMICAL ENGINEERING`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.kavery.org.in`},{id:90,name:`V S A Group of Institutions`,city:`Salem`,district:`Salem`,locality:`Salem`,state:`Tamil Nadu`,type:`Non-Autonomous (Self-Financing)`,autonomous:!1,autonomyNote:`Non-Autonomous in the TNEA college directory (TNEA code 2658); Self-Financing, Non-Minority, affiliated to Anna University`,affiliation:`Anna University`,tneaCode:`2658`,funding:`Self-Financing`,minority:`Non-Minority`,established:null,rating:null,fee:null,image:`https://media.collegedekho.com/media/img/institute/crawled_images/None/ariel_view.jpg?width=1080`,imageSource:`CollegeDekho (verified V S A Group of Institutions page)`,about:`V S A Group of Institutions is a self-financing engineering college at Salem, Salem district, affiliated to Anna University. Its TNEA code is 2658 and the directory lists 8 engineering branches here.`,facilities:[],eligibility:`12th with Physics, Chemistry and Mathematics; admission through TNEA counselling`,courseIds:[7,11,5,1,6,2,3,4],branches:[{code:`AD`,name:`Artificial Intelligence and Data Science`},{code:`BM`,name:`BIO MEDICAL ENGINEERING`},{code:`CE`,name:`CIVIL ENGINEERING`},{code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`},{code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`},{code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`},{code:`IT`,name:`INFORMATION TECHNOLOGY`},{code:`ME`,name:`MECHANICAL ENGINEERING`}],website:`https://www.vsagroup.ac.in`}],courses:[{id:1,code:`CS`,name:`COMPUTER SCIENCE AND ENGINEERING`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:2,code:`EC`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:3,code:`IT`,name:`INFORMATION TECHNOLOGY`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:4,code:`ME`,name:`MECHANICAL ENGINEERING`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:5,code:`CE`,name:`CIVIL ENGINEERING`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:6,code:`EE`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:7,code:`AD`,name:`Artificial Intelligence and Data Science`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:8,code:`AM`,name:`COMPUTER SCIENCE AND ENGINEERING (AI AND MACHINE LEARNING)`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:9,code:`SC`,name:`Computer Science and Engineering (Cyber Security)`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:10,code:`RM`,name:`ROBOTICS AND AUTOMATION`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:11,code:`BM`,name:`BIO MEDICAL ENGINEERING`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:12,code:`AU`,name:`AUTOMOBILE ENGINEERING`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:13,code:`EI`,name:`ELECTRONICS AND INSTRUMENTATION ENGINEERING`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:14,code:`EV`,name:`Electronics Engineering (VLSI Design and Technology)`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:15,code:`IC`,name:`INSTRUMENTATION AND CONTROL ENGINEERING`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:16,code:`MZ`,name:`Mechatronics Engineering`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:17,code:`BT`,name:`BIO TECHNOLOGY`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:18,code:`CH`,name:`CHEMICAL ENGINEERING`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:19,code:`TX`,name:`TEXTILE TECHNOLOGY`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:20,code:`FT`,name:`FASHION TECHNOLOGY`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:21,code:`FD`,name:`FOOD TECHNOLOGY`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:22,code:`PC`,name:`PETRO CHEMICAL TECHNOLOGY`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:23,code:`PR`,name:`PRODUCTION ENGINEERING`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:24,code:`AO`,name:`AEROSPACE ENGINEERING`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:25,code:`AG`,name:`AGRICULTURAL ENGINEERING`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:26,code:`CJ`,name:`M.Tech. Computer Science and Engineering (Integrated 5 years)`,category:`Engineering`,degree:`Integrated M.Tech`,duration:`5 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:27,code:`CB`,name:`COMPUTER SCIENCE AND BUSSINESS SYSTEM`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:28,code:`CO`,name:`COMPUTER AND COMMUNICATION ENGINEERING`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:29,code:`CM`,name:`COMPUTER SCIENCE AND ENGINEERING`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:30,code:`AE`,name:`AERONAUTICAL ENGINEERING`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:31,code:`AT`,name:`ARTIFICIAL INTELLIGENCE AND DATA SCIENCE`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:32,code:`AL`,name:`Artificial Intelligence and Machine Learning`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:33,code:`AS`,name:`AUTOMOBILE ENGINEERING`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:34,code:`DA`,name:`Bachelor of Design`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:35,code:`BY`,name:`BIO MEDICAL ENGINEERING`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:36,code:`BS`,name:`BIO TECHNOLOGY`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:37,code:`BC`,name:`Bio Technology and Bio Chemical Engineering`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:38,code:`CL`,name:`CHEMICAL ENGINEERING`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:39,code:`CN`,name:`CIVIL ENGINEERING`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:40,code:`CD`,name:`COMPUTER SCIENCE AND DESIGN`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:41,code:`CG`,name:`Computer Science and Engineering (Artificial Intelligence and Machine Learning)`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:42,code:`CF`,name:`COMPUTER SCIENCE AND ENGINEERING (DATA SCIENCE)`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:43,code:`SB`,name:`Computer Science and Engineering (Internet of Things and Cyber Security including Block Chain Technology)`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:44,code:`CI`,name:`Computer Science and Engineering (Internet of Things)`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:45,code:`XS`,name:`COMPUTER SCIENCE AND ENGINEERING (TAMIL)`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:46,code:`TS`,name:`Computer Science and Technology`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:47,code:`DS`,name:`DATA SCIENCES`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:48,code:`EF`,name:`Electrical and Computer Engineering`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:49,code:`EY`,name:`ELECTRICAL AND ELECTRONICS ENGINEERING`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:50,code:`EM`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:51,code:`VL`,name:`ELECTRONICS AND COMMUNICATION ENGINEERING (VLSI DESIGN AND TECHNOLOGY)`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:52,code:`EX`,name:`Electronics and Computer Engineering`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:53,code:`EL`,name:`Electronics Engineering (VLSI Design and Technology)`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:54,code:`EN`,name:`ENVIRONMENTAL ENGINEERING`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:55,code:`FY`,name:`FASHION TECHNOLOGY`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:56,code:`GI`,name:`GEO INFORMATICS`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:57,code:`HT`,name:`HANDLOOM AND TEXTILE TECHNOLOGY`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:58,code:`IB`,name:`INDUSTRIAL BIO TECHNOLOGY`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:59,code:`IM`,name:`INFORMATION TECHNOLOGY`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:60,code:`IY`,name:`INSTRUMENTATION AND CONTROL ENGINEERING`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:61,code:`MO`,name:`Mechanical and Mechatronics Engineering (Additive Manufacturing)`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:62,code:`MF`,name:`MECHANICAL ENGINEERING`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:63,code:`MS`,name:`MECHANICAL ENGINEERING (SANDWICH)`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:64,code:`XM`,name:`MECHANICAL ENGINEERING (TAMIL MEDIUM)`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:65,code:`MD`,name:`MEDICAL ELECTRONICS ENGINEERING`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:66,code:`MT`,name:`METALLURGICAL ENGINEERING`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:67,code:`MY`,name:`METALLURGICAL ENGINEERING`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:68,code:`PE`,name:`PETROLEUM ENGINEERING`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:69,code:`PH`,name:`PHARMACEUTICAL TECHNOLOGY`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:70,code:`PN`,name:`PRODUCTION ENGINEERING`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:71,code:`RI`,name:`ROBOTICS AND ARTIFICIAL INTELLIGENCE`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:72,code:`RA`,name:`ROBOTICS AND AUTOMATION`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:73,code:`SF`,name:`Safety and Fire Engineering`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`},{id:74,code:`TT`,name:`TEXTILE TECHNOLOGY`,category:`Engineering`,degree:`B.E / B.Tech`,duration:`4 Years`,eligibility:`12th with Physics, Chemistry and Mathematics (TNEA counselling)`,entranceExam:`TNEA`}],collegeCourses:[{id:1,collegeId:1,courseId:1,fee:null,seats:null},{id:2,collegeId:1,courseId:2,fee:null,seats:null},{id:3,collegeId:1,courseId:4,fee:null,seats:null},{id:4,collegeId:1,courseId:7,fee:null,seats:null},{id:5,collegeId:2,courseId:33,fee:null,seats:null},{id:6,collegeId:2,courseId:35,fee:null,seats:null},{id:7,collegeId:2,courseId:36,fee:null,seats:null},{id:8,collegeId:2,courseId:5,fee:null,seats:null},{id:9,collegeId:2,courseId:39,fee:null,seats:null},{id:10,collegeId:2,courseId:41,fee:null,seats:null},{id:11,collegeId:2,courseId:29,fee:null,seats:null},{id:12,collegeId:2,courseId:6,fee:null,seats:null},{id:13,collegeId:2,courseId:49,fee:null,seats:null},{id:14,collegeId:2,courseId:2,fee:null,seats:null},{id:15,collegeId:2,courseId:50,fee:null,seats:null},{id:16,collegeId:2,courseId:55,fee:null,seats:null},{id:17,collegeId:2,courseId:59,fee:null,seats:null},{id:18,collegeId:2,courseId:60,fee:null,seats:null},{id:19,collegeId:2,courseId:4,fee:null,seats:null},{id:20,collegeId:2,courseId:63,fee:null,seats:null},{id:21,collegeId:2,courseId:62,fee:null,seats:null},{id:22,collegeId:2,courseId:66,fee:null,seats:null},{id:23,collegeId:2,courseId:67,fee:null,seats:null},{id:24,collegeId:2,courseId:23,fee:null,seats:null},{id:25,collegeId:2,courseId:70,fee:null,seats:null},{id:26,collegeId:2,courseId:72,fee:null,seats:null},{id:27,collegeId:2,courseId:19,fee:null,seats:null},{id:28,collegeId:2,courseId:74,fee:null,seats:null},{id:29,collegeId:3,courseId:7,fee:null,seats:null},{id:30,collegeId:3,courseId:1,fee:null,seats:null},{id:31,collegeId:3,courseId:6,fee:null,seats:null},{id:32,collegeId:3,courseId:2,fee:null,seats:null},{id:33,collegeId:3,courseId:3,fee:null,seats:null},{id:34,collegeId:3,courseId:4,fee:null,seats:null},{id:35,collegeId:4,courseId:1,fee:null,seats:null},{id:36,collegeId:4,courseId:2,fee:null,seats:null},{id:37,collegeId:4,courseId:3,fee:null,seats:null},{id:38,collegeId:4,courseId:4,fee:null,seats:null},{id:39,collegeId:5,courseId:30,fee:null,seats:null},{id:40,collegeId:5,courseId:7,fee:null,seats:null},{id:41,collegeId:5,courseId:12,fee:null,seats:null},{id:42,collegeId:5,courseId:17,fee:null,seats:null},{id:43,collegeId:5,courseId:5,fee:null,seats:null},{id:44,collegeId:5,courseId:1,fee:null,seats:null},{id:45,collegeId:5,courseId:6,fee:null,seats:null},{id:46,collegeId:5,courseId:2,fee:null,seats:null},{id:47,collegeId:5,courseId:13,fee:null,seats:null},{id:48,collegeId:5,courseId:20,fee:null,seats:null},{id:49,collegeId:5,courseId:3,fee:null,seats:null},{id:50,collegeId:5,courseId:4,fee:null,seats:null},{id:51,collegeId:5,courseId:16,fee:null,seats:null},{id:52,collegeId:5,courseId:19,fee:null,seats:null},{id:53,collegeId:6,courseId:1,fee:null,seats:null},{id:54,collegeId:6,courseId:2,fee:null,seats:null},{id:55,collegeId:6,courseId:3,fee:null,seats:null},{id:56,collegeId:6,courseId:5,fee:null,seats:null},{id:57,collegeId:6,courseId:7,fee:null,seats:null},{id:58,collegeId:7,courseId:7,fee:null,seats:null},{id:59,collegeId:7,courseId:11,fee:null,seats:null},{id:60,collegeId:7,courseId:5,fee:null,seats:null},{id:61,collegeId:7,courseId:27,fee:null,seats:null},{id:62,collegeId:7,courseId:1,fee:null,seats:null},{id:63,collegeId:7,courseId:9,fee:null,seats:null},{id:64,collegeId:7,courseId:6,fee:null,seats:null},{id:65,collegeId:7,courseId:2,fee:null,seats:null},{id:66,collegeId:7,courseId:3,fee:null,seats:null},{id:67,collegeId:7,courseId:4,fee:null,seats:null},{id:68,collegeId:8,courseId:7,fee:null,seats:null},{id:69,collegeId:8,courseId:27,fee:null,seats:null},{id:70,collegeId:8,courseId:1,fee:null,seats:null},{id:71,collegeId:8,courseId:8,fee:null,seats:null},{id:72,collegeId:8,courseId:9,fee:null,seats:null},{id:73,collegeId:8,courseId:2,fee:null,seats:null},{id:74,collegeId:8,courseId:3,fee:null,seats:null},{id:75,collegeId:8,courseId:4,fee:null,seats:null},{id:76,collegeId:8,courseId:10,fee:null,seats:null},{id:77,collegeId:9,courseId:7,fee:null,seats:null},{id:78,collegeId:9,courseId:5,fee:null,seats:null},{id:79,collegeId:9,courseId:27,fee:null,seats:null},{id:80,collegeId:9,courseId:1,fee:null,seats:null},{id:81,collegeId:9,courseId:8,fee:null,seats:null},{id:82,collegeId:9,courseId:9,fee:null,seats:null},{id:83,collegeId:9,courseId:44,fee:null,seats:null},{id:84,collegeId:9,courseId:6,fee:null,seats:null},{id:85,collegeId:9,courseId:2,fee:null,seats:null},{id:86,collegeId:9,courseId:3,fee:null,seats:null},{id:87,collegeId:9,courseId:26,fee:null,seats:null},{id:88,collegeId:9,courseId:4,fee:null,seats:null},{id:89,collegeId:9,courseId:16,fee:null,seats:null},{id:90,collegeId:10,courseId:5,fee:null,seats:null},{id:91,collegeId:10,courseId:1,fee:null,seats:null},{id:92,collegeId:10,courseId:8,fee:null,seats:null},{id:93,collegeId:10,courseId:6,fee:null,seats:null},{id:94,collegeId:10,courseId:2,fee:null,seats:null},{id:95,collegeId:10,courseId:13,fee:null,seats:null},{id:96,collegeId:10,courseId:58,fee:null,seats:null},{id:97,collegeId:10,courseId:3,fee:null,seats:null},{id:98,collegeId:10,courseId:4,fee:null,seats:null},{id:99,collegeId:10,courseId:23,fee:null,seats:null},{id:100,collegeId:11,courseId:7,fee:null,seats:null},{id:101,collegeId:11,courseId:5,fee:null,seats:null},{id:102,collegeId:11,courseId:1,fee:null,seats:null},{id:103,collegeId:11,courseId:9,fee:null,seats:null},{id:104,collegeId:11,courseId:6,fee:null,seats:null},{id:105,collegeId:11,courseId:2,fee:null,seats:null},{id:106,collegeId:11,courseId:14,fee:null,seats:null},{id:107,collegeId:11,courseId:3,fee:null,seats:null},{id:108,collegeId:11,courseId:4,fee:null,seats:null},{id:109,collegeId:12,courseId:7,fee:null,seats:null},{id:110,collegeId:12,courseId:11,fee:null,seats:null},{id:111,collegeId:12,courseId:18,fee:null,seats:null},{id:112,collegeId:12,courseId:5,fee:null,seats:null},{id:113,collegeId:12,courseId:27,fee:null,seats:null},{id:114,collegeId:12,courseId:1,fee:null,seats:null},{id:115,collegeId:12,courseId:8,fee:null,seats:null},{id:116,collegeId:12,courseId:9,fee:null,seats:null},{id:117,collegeId:12,courseId:6,fee:null,seats:null},{id:118,collegeId:12,courseId:2,fee:null,seats:null},{id:119,collegeId:12,courseId:14,fee:null,seats:null},{id:120,collegeId:12,courseId:3,fee:null,seats:null},{id:121,collegeId:12,courseId:4,fee:null,seats:null},{id:122,collegeId:12,courseId:16,fee:null,seats:null},{id:123,collegeId:13,courseId:1,fee:null,seats:null},{id:124,collegeId:13,courseId:2,fee:null,seats:null},{id:125,collegeId:13,courseId:3,fee:null,seats:null},{id:126,collegeId:13,courseId:5,fee:null,seats:null},{id:127,collegeId:14,courseId:24,fee:null,seats:null},{id:128,collegeId:14,courseId:25,fee:null,seats:null},{id:129,collegeId:14,courseId:7,fee:null,seats:null},{id:130,collegeId:14,courseId:32,fee:null,seats:null},{id:131,collegeId:14,courseId:12,fee:null,seats:null},{id:132,collegeId:14,courseId:11,fee:null,seats:null},{id:133,collegeId:14,courseId:5,fee:null,seats:null},{id:134,collegeId:14,courseId:40,fee:null,seats:null},{id:135,collegeId:14,courseId:1,fee:null,seats:null},{id:136,collegeId:14,courseId:43,fee:null,seats:null},{id:137,collegeId:14,courseId:46,fee:null,seats:null},{id:138,collegeId:14,courseId:47,fee:null,seats:null},{id:139,collegeId:14,courseId:6,fee:null,seats:null},{id:140,collegeId:14,courseId:2,fee:null,seats:null},{id:141,collegeId:14,courseId:21,fee:null,seats:null},{id:142,collegeId:14,courseId:3,fee:null,seats:null},{id:143,collegeId:14,courseId:61,fee:null,seats:null},{id:144,collegeId:14,courseId:4,fee:null,seats:null},{id:145,collegeId:14,courseId:16,fee:null,seats:null},{id:146,collegeId:15,courseId:7,fee:null,seats:null},{id:147,collegeId:15,courseId:5,fee:null,seats:null},{id:148,collegeId:15,courseId:1,fee:null,seats:null},{id:149,collegeId:15,courseId:8,fee:null,seats:null},{id:150,collegeId:15,courseId:9,fee:null,seats:null},{id:151,collegeId:15,courseId:6,fee:null,seats:null},{id:152,collegeId:15,courseId:2,fee:null,seats:null},{id:153,collegeId:15,courseId:14,fee:null,seats:null},{id:154,collegeId:15,courseId:3,fee:null,seats:null},{id:155,collegeId:15,courseId:4,fee:null,seats:null},{id:156,collegeId:15,courseId:16,fee:null,seats:null},{id:157,collegeId:16,courseId:31,fee:null,seats:null},{id:158,collegeId:16,courseId:18,fee:null,seats:null},{id:159,collegeId:16,courseId:38,fee:null,seats:null},{id:160,collegeId:16,courseId:5,fee:null,seats:null},{id:161,collegeId:16,courseId:39,fee:null,seats:null},{id:162,collegeId:16,courseId:1,fee:null,seats:null},{id:163,collegeId:16,courseId:29,fee:null,seats:null},{id:164,collegeId:16,courseId:6,fee:null,seats:null},{id:165,collegeId:16,courseId:49,fee:null,seats:null},{id:166,collegeId:16,courseId:2,fee:null,seats:null},{id:167,collegeId:16,courseId:50,fee:null,seats:null},{id:168,collegeId:16,courseId:53,fee:null,seats:null},{id:169,collegeId:16,courseId:59,fee:null,seats:null},{id:170,collegeId:16,courseId:4,fee:null,seats:null},{id:171,collegeId:16,courseId:62,fee:null,seats:null},{id:172,collegeId:17,courseId:30,fee:null,seats:null},{id:173,collegeId:17,courseId:25,fee:null,seats:null},{id:174,collegeId:17,courseId:32,fee:null,seats:null},{id:175,collegeId:17,courseId:12,fee:null,seats:null},{id:176,collegeId:17,courseId:11,fee:null,seats:null},{id:177,collegeId:17,courseId:18,fee:null,seats:null},{id:178,collegeId:17,courseId:5,fee:null,seats:null},{id:179,collegeId:17,courseId:27,fee:null,seats:null},{id:180,collegeId:17,courseId:1,fee:null,seats:null},{id:181,collegeId:17,courseId:9,fee:null,seats:null},{id:182,collegeId:17,courseId:6,fee:null,seats:null},{id:183,collegeId:17,courseId:2,fee:null,seats:null},{id:184,collegeId:17,courseId:13,fee:null,seats:null},{id:185,collegeId:17,courseId:21,fee:null,seats:null},{id:186,collegeId:17,courseId:3,fee:null,seats:null},{id:187,collegeId:17,courseId:4,fee:null,seats:null},{id:188,collegeId:17,courseId:16,fee:null,seats:null},{id:189,collegeId:18,courseId:7,fee:null,seats:null},{id:190,collegeId:18,courseId:34,fee:null,seats:null},{id:191,collegeId:18,courseId:5,fee:null,seats:null},{id:192,collegeId:18,courseId:1,fee:null,seats:null},{id:193,collegeId:18,courseId:6,fee:null,seats:null},{id:194,collegeId:18,courseId:2,fee:null,seats:null},{id:195,collegeId:18,courseId:14,fee:null,seats:null},{id:196,collegeId:18,courseId:15,fee:null,seats:null},{id:197,collegeId:18,courseId:4,fee:null,seats:null},{id:198,collegeId:18,courseId:71,fee:null,seats:null},{id:199,collegeId:19,courseId:25,fee:null,seats:null},{id:200,collegeId:19,courseId:7,fee:null,seats:null},{id:201,collegeId:19,courseId:32,fee:null,seats:null},{id:202,collegeId:19,courseId:11,fee:null,seats:null},{id:203,collegeId:19,courseId:17,fee:null,seats:null},{id:204,collegeId:19,courseId:5,fee:null,seats:null},{id:205,collegeId:19,courseId:1,fee:null,seats:null},{id:206,collegeId:19,courseId:9,fee:null,seats:null},{id:207,collegeId:19,courseId:6,fee:null,seats:null},{id:208,collegeId:19,courseId:2,fee:null,seats:null},{id:209,collegeId:19,courseId:14,fee:null,seats:null},{id:210,collegeId:19,courseId:21,fee:null,seats:null},{id:211,collegeId:19,courseId:3,fee:null,seats:null},{id:212,collegeId:19,courseId:4,fee:null,seats:null},{id:213,collegeId:20,courseId:25,fee:null,seats:null},{id:214,collegeId:20,courseId:7,fee:null,seats:null},{id:215,collegeId:20,courseId:17,fee:null,seats:null},{id:216,collegeId:20,courseId:1,fee:null,seats:null},{id:217,collegeId:20,courseId:8,fee:null,seats:null},{id:218,collegeId:20,courseId:9,fee:null,seats:null},{id:219,collegeId:20,courseId:45,fee:null,seats:null},{id:220,collegeId:20,courseId:2,fee:null,seats:null},{id:221,collegeId:20,courseId:3,fee:null,seats:null},{id:222,collegeId:20,courseId:4,fee:null,seats:null},{id:223,collegeId:20,courseId:16,fee:null,seats:null},{id:224,collegeId:21,courseId:7,fee:null,seats:null},{id:225,collegeId:21,courseId:5,fee:null,seats:null},{id:226,collegeId:21,courseId:1,fee:null,seats:null},{id:227,collegeId:21,courseId:6,fee:null,seats:null},{id:228,collegeId:21,courseId:2,fee:null,seats:null},{id:229,collegeId:21,courseId:3,fee:null,seats:null},{id:230,collegeId:21,courseId:4,fee:null,seats:null},{id:231,collegeId:22,courseId:7,fee:null,seats:null},{id:232,collegeId:22,courseId:5,fee:null,seats:null},{id:233,collegeId:22,courseId:27,fee:null,seats:null},{id:234,collegeId:22,courseId:1,fee:null,seats:null},{id:235,collegeId:22,courseId:9,fee:null,seats:null},{id:236,collegeId:22,courseId:6,fee:null,seats:null},{id:237,collegeId:22,courseId:2,fee:null,seats:null},{id:238,collegeId:22,courseId:4,fee:null,seats:null},{id:239,collegeId:22,courseId:16,fee:null,seats:null},{id:240,collegeId:23,courseId:7,fee:null,seats:null},{id:241,collegeId:23,courseId:1,fee:null,seats:null},{id:242,collegeId:23,courseId:6,fee:null,seats:null},{id:243,collegeId:23,courseId:2,fee:null,seats:null},{id:244,collegeId:23,courseId:14,fee:null,seats:null},{id:245,collegeId:23,courseId:4,fee:null,seats:null},{id:246,collegeId:24,courseId:7,fee:null,seats:null},{id:247,collegeId:24,courseId:5,fee:null,seats:null},{id:248,collegeId:24,courseId:27,fee:null,seats:null},{id:249,collegeId:24,courseId:1,fee:null,seats:null},{id:250,collegeId:24,courseId:8,fee:null,seats:null},{id:251,collegeId:24,courseId:9,fee:null,seats:null},{id:252,collegeId:24,courseId:2,fee:null,seats:null},{id:253,collegeId:24,courseId:3,fee:null,seats:null},{id:254,collegeId:24,courseId:4,fee:null,seats:null},{id:255,collegeId:25,courseId:25,fee:null,seats:null},{id:256,collegeId:25,courseId:7,fee:null,seats:null},{id:257,collegeId:25,courseId:11,fee:null,seats:null},{id:258,collegeId:25,courseId:1,fee:null,seats:null},{id:259,collegeId:25,courseId:6,fee:null,seats:null},{id:260,collegeId:25,courseId:3,fee:null,seats:null},{id:261,collegeId:25,courseId:4,fee:null,seats:null},{id:262,collegeId:26,courseId:7,fee:null,seats:null},{id:263,collegeId:26,courseId:1,fee:null,seats:null},{id:264,collegeId:26,courseId:8,fee:null,seats:null},{id:265,collegeId:26,courseId:9,fee:null,seats:null},{id:266,collegeId:26,courseId:6,fee:null,seats:null},{id:267,collegeId:26,courseId:2,fee:null,seats:null},{id:268,collegeId:26,courseId:3,fee:null,seats:null},{id:269,collegeId:26,courseId:4,fee:null,seats:null},{id:270,collegeId:27,courseId:7,fee:null,seats:null},{id:271,collegeId:27,courseId:1,fee:null,seats:null},{id:272,collegeId:27,courseId:8,fee:null,seats:null},{id:273,collegeId:27,courseId:9,fee:null,seats:null},{id:274,collegeId:27,courseId:2,fee:null,seats:null},{id:275,collegeId:27,courseId:3,fee:null,seats:null},{id:276,collegeId:27,courseId:4,fee:null,seats:null},{id:277,collegeId:28,courseId:7,fee:null,seats:null},{id:278,collegeId:28,courseId:11,fee:null,seats:null},{id:279,collegeId:28,courseId:1,fee:null,seats:null},{id:280,collegeId:28,courseId:8,fee:null,seats:null},{id:281,collegeId:28,courseId:9,fee:null,seats:null},{id:282,collegeId:28,courseId:2,fee:null,seats:null},{id:283,collegeId:28,courseId:21,fee:null,seats:null},{id:284,collegeId:28,courseId:3,fee:null,seats:null},{id:285,collegeId:28,courseId:10,fee:null,seats:null},{id:286,collegeId:29,courseId:25,fee:null,seats:null},{id:287,collegeId:29,courseId:7,fee:null,seats:null},{id:288,collegeId:29,courseId:11,fee:null,seats:null},{id:289,collegeId:29,courseId:17,fee:null,seats:null},{id:290,collegeId:29,courseId:5,fee:null,seats:null},{id:291,collegeId:29,courseId:1,fee:null,seats:null},{id:292,collegeId:29,courseId:9,fee:null,seats:null},{id:293,collegeId:29,courseId:6,fee:null,seats:null},{id:294,collegeId:29,courseId:2,fee:null,seats:null},{id:295,collegeId:29,courseId:21,fee:null,seats:null},{id:296,collegeId:29,courseId:4,fee:null,seats:null},{id:297,collegeId:30,courseId:7,fee:null,seats:null},{id:298,collegeId:30,courseId:12,fee:null,seats:null},{id:299,collegeId:30,courseId:5,fee:null,seats:null},{id:300,collegeId:30,courseId:1,fee:null,seats:null},{id:301,collegeId:30,courseId:8,fee:null,seats:null},{id:302,collegeId:30,courseId:9,fee:null,seats:null},{id:303,collegeId:30,courseId:6,fee:null,seats:null},{id:304,collegeId:30,courseId:2,fee:null,seats:null},{id:305,collegeId:30,courseId:14,fee:null,seats:null},{id:306,collegeId:30,courseId:3,fee:null,seats:null},{id:307,collegeId:30,courseId:4,fee:null,seats:null},{id:308,collegeId:31,courseId:25,fee:null,seats:null},{id:309,collegeId:31,courseId:7,fee:null,seats:null},{id:310,collegeId:31,courseId:11,fee:null,seats:null},{id:311,collegeId:31,courseId:1,fee:null,seats:null},{id:312,collegeId:31,courseId:8,fee:null,seats:null},{id:313,collegeId:31,courseId:9,fee:null,seats:null},{id:314,collegeId:31,courseId:6,fee:null,seats:null},{id:315,collegeId:31,courseId:2,fee:null,seats:null},{id:316,collegeId:31,courseId:3,fee:null,seats:null},{id:317,collegeId:31,courseId:4,fee:null,seats:null},{id:318,collegeId:32,courseId:30,fee:null,seats:null},{id:319,collegeId:32,courseId:7,fee:null,seats:null},{id:320,collegeId:32,courseId:1,fee:null,seats:null},{id:321,collegeId:32,courseId:2,fee:null,seats:null},{id:322,collegeId:32,courseId:3,fee:null,seats:null},{id:323,collegeId:32,courseId:4,fee:null,seats:null},{id:324,collegeId:33,courseId:7,fee:null,seats:null},{id:325,collegeId:33,courseId:1,fee:null,seats:null},{id:326,collegeId:33,courseId:6,fee:null,seats:null},{id:327,collegeId:33,courseId:2,fee:null,seats:null},{id:328,collegeId:33,courseId:3,fee:null,seats:null},{id:329,collegeId:33,courseId:4,fee:null,seats:null},{id:330,collegeId:34,courseId:7,fee:null,seats:null},{id:331,collegeId:34,courseId:5,fee:null,seats:null},{id:332,collegeId:34,courseId:27,fee:null,seats:null},{id:333,collegeId:34,courseId:1,fee:null,seats:null},{id:334,collegeId:34,courseId:2,fee:null,seats:null},{id:335,collegeId:34,courseId:4,fee:null,seats:null},{id:336,collegeId:35,courseId:7,fee:null,seats:null},{id:337,collegeId:35,courseId:37,fee:null,seats:null},{id:338,collegeId:35,courseId:5,fee:null,seats:null},{id:339,collegeId:35,courseId:27,fee:null,seats:null},{id:340,collegeId:35,courseId:1,fee:null,seats:null},{id:341,collegeId:35,courseId:6,fee:null,seats:null},{id:342,collegeId:35,courseId:2,fee:null,seats:null},{id:343,collegeId:35,courseId:21,fee:null,seats:null},{id:344,collegeId:35,courseId:4,fee:null,seats:null},{id:345,collegeId:35,courseId:22,fee:null,seats:null},{id:346,collegeId:35,courseId:68,fee:null,seats:null},{id:347,collegeId:36,courseId:7,fee:null,seats:null},{id:348,collegeId:36,courseId:1,fee:null,seats:null},{id:349,collegeId:36,courseId:6,fee:null,seats:null},{id:350,collegeId:36,courseId:2,fee:null,seats:null},{id:351,collegeId:36,courseId:3,fee:null,seats:null},{id:352,collegeId:36,courseId:4,fee:null,seats:null},{id:353,collegeId:37,courseId:7,fee:null,seats:null},{id:354,collegeId:37,courseId:28,fee:null,seats:null},{id:355,collegeId:37,courseId:1,fee:null,seats:null},{id:356,collegeId:37,courseId:8,fee:null,seats:null},{id:357,collegeId:37,courseId:6,fee:null,seats:null},{id:358,collegeId:37,courseId:2,fee:null,seats:null},{id:359,collegeId:37,courseId:4,fee:null,seats:null},{id:360,collegeId:38,courseId:30,fee:null,seats:null},{id:361,collegeId:38,courseId:7,fee:null,seats:null},{id:362,collegeId:38,courseId:11,fee:null,seats:null},{id:363,collegeId:38,courseId:17,fee:null,seats:null},{id:364,collegeId:38,courseId:27,fee:null,seats:null},{id:365,collegeId:38,courseId:1,fee:null,seats:null},{id:366,collegeId:38,courseId:8,fee:null,seats:null},{id:367,collegeId:38,courseId:9,fee:null,seats:null},{id:368,collegeId:38,courseId:6,fee:null,seats:null},{id:369,collegeId:38,courseId:2,fee:null,seats:null},{id:370,collegeId:38,courseId:14,fee:null,seats:null},{id:371,collegeId:38,courseId:4,fee:null,seats:null},{id:372,collegeId:39,courseId:30,fee:null,seats:null},{id:373,collegeId:39,courseId:7,fee:null,seats:null},{id:374,collegeId:39,courseId:27,fee:null,seats:null},{id:375,collegeId:39,courseId:1,fee:null,seats:null},{id:376,collegeId:39,courseId:6,fee:null,seats:null},{id:377,collegeId:39,courseId:2,fee:null,seats:null},{id:378,collegeId:39,courseId:3,fee:null,seats:null},{id:379,collegeId:39,courseId:4,fee:null,seats:null},{id:380,collegeId:39,courseId:16,fee:null,seats:null},{id:381,collegeId:40,courseId:30,fee:null,seats:null},{id:382,collegeId:40,courseId:25,fee:null,seats:null},{id:383,collegeId:40,courseId:7,fee:null,seats:null},{id:384,collegeId:40,courseId:5,fee:null,seats:null},{id:385,collegeId:40,courseId:28,fee:null,seats:null},{id:386,collegeId:40,courseId:1,fee:null,seats:null},{id:387,collegeId:40,courseId:8,fee:null,seats:null},{id:388,collegeId:40,courseId:9,fee:null,seats:null},{id:389,collegeId:40,courseId:21,fee:null,seats:null},{id:390,collegeId:40,courseId:3,fee:null,seats:null},{id:391,collegeId:41,courseId:7,fee:null,seats:null},{id:392,collegeId:41,courseId:5,fee:null,seats:null},{id:393,collegeId:41,courseId:1,fee:null,seats:null},{id:394,collegeId:41,courseId:6,fee:null,seats:null},{id:395,collegeId:41,courseId:2,fee:null,seats:null},{id:396,collegeId:41,courseId:3,fee:null,seats:null},{id:397,collegeId:41,courseId:4,fee:null,seats:null},{id:398,collegeId:42,courseId:30,fee:null,seats:null},{id:399,collegeId:42,courseId:25,fee:null,seats:null},{id:400,collegeId:42,courseId:7,fee:null,seats:null},{id:401,collegeId:42,courseId:11,fee:null,seats:null},{id:402,collegeId:42,courseId:1,fee:null,seats:null},{id:403,collegeId:42,courseId:9,fee:null,seats:null},{id:404,collegeId:42,courseId:6,fee:null,seats:null},{id:405,collegeId:42,courseId:2,fee:null,seats:null},{id:406,collegeId:42,courseId:20,fee:null,seats:null},{id:407,collegeId:42,courseId:56,fee:null,seats:null},{id:408,collegeId:42,courseId:3,fee:null,seats:null},{id:409,collegeId:42,courseId:4,fee:null,seats:null},{id:410,collegeId:42,courseId:16,fee:null,seats:null},{id:411,collegeId:42,courseId:65,fee:null,seats:null},{id:412,collegeId:42,courseId:10,fee:null,seats:null},{id:413,collegeId:42,courseId:19,fee:null,seats:null},{id:414,collegeId:43,courseId:24,fee:null,seats:null},{id:415,collegeId:43,courseId:7,fee:null,seats:null},{id:416,collegeId:43,courseId:5,fee:null,seats:null},{id:417,collegeId:43,courseId:1,fee:null,seats:null},{id:418,collegeId:43,courseId:8,fee:null,seats:null},{id:419,collegeId:43,courseId:2,fee:null,seats:null},{id:420,collegeId:43,courseId:54,fee:null,seats:null},{id:421,collegeId:43,courseId:4,fee:null,seats:null},{id:422,collegeId:44,courseId:7,fee:null,seats:null},{id:423,collegeId:44,courseId:5,fee:null,seats:null},{id:424,collegeId:44,courseId:1,fee:null,seats:null},{id:425,collegeId:44,courseId:6,fee:null,seats:null},{id:426,collegeId:44,courseId:2,fee:null,seats:null},{id:427,collegeId:44,courseId:3,fee:null,seats:null},{id:428,collegeId:44,courseId:4,fee:null,seats:null},{id:429,collegeId:45,courseId:25,fee:null,seats:null},{id:430,collegeId:45,courseId:7,fee:null,seats:null},{id:431,collegeId:45,courseId:11,fee:null,seats:null},{id:432,collegeId:45,courseId:1,fee:null,seats:null},{id:433,collegeId:45,courseId:8,fee:null,seats:null},{id:434,collegeId:45,courseId:2,fee:null,seats:null},{id:435,collegeId:45,courseId:3,fee:null,seats:null},{id:436,collegeId:45,courseId:4,fee:null,seats:null},{id:437,collegeId:46,courseId:25,fee:null,seats:null},{id:438,collegeId:46,courseId:7,fee:null,seats:null},{id:439,collegeId:46,courseId:12,fee:null,seats:null},{id:440,collegeId:46,courseId:5,fee:null,seats:null},{id:441,collegeId:46,courseId:1,fee:null,seats:null},{id:442,collegeId:46,courseId:8,fee:null,seats:null},{id:443,collegeId:46,courseId:9,fee:null,seats:null},{id:444,collegeId:46,courseId:2,fee:null,seats:null},{id:445,collegeId:46,courseId:4,fee:null,seats:null},{id:446,collegeId:46,courseId:16,fee:null,seats:null},{id:447,collegeId:47,courseId:7,fee:null,seats:null},{id:448,collegeId:47,courseId:11,fee:null,seats:null},{id:449,collegeId:47,courseId:1,fee:null,seats:null},{id:450,collegeId:47,courseId:6,fee:null,seats:null},{id:451,collegeId:47,courseId:2,fee:null,seats:null},{id:452,collegeId:47,courseId:3,fee:null,seats:null},{id:453,collegeId:47,courseId:4,fee:null,seats:null},{id:454,collegeId:47,courseId:22,fee:null,seats:null},{id:455,collegeId:48,courseId:7,fee:null,seats:null},{id:456,collegeId:48,courseId:5,fee:null,seats:null},{id:457,collegeId:48,courseId:1,fee:null,seats:null},{id:458,collegeId:48,courseId:8,fee:null,seats:null},{id:459,collegeId:48,courseId:9,fee:null,seats:null},{id:460,collegeId:48,courseId:6,fee:null,seats:null},{id:461,collegeId:48,courseId:2,fee:null,seats:null},{id:462,collegeId:48,courseId:3,fee:null,seats:null},{id:463,collegeId:48,courseId:4,fee:null,seats:null},{id:464,collegeId:48,courseId:16,fee:null,seats:null},{id:465,collegeId:49,courseId:7,fee:null,seats:null},{id:466,collegeId:49,courseId:28,fee:null,seats:null},{id:467,collegeId:49,courseId:27,fee:null,seats:null},{id:468,collegeId:49,courseId:1,fee:null,seats:null},{id:469,collegeId:49,courseId:8,fee:null,seats:null},{id:470,collegeId:49,courseId:9,fee:null,seats:null},{id:471,collegeId:49,courseId:6,fee:null,seats:null},{id:472,collegeId:49,courseId:2,fee:null,seats:null},{id:473,collegeId:49,courseId:14,fee:null,seats:null},{id:474,collegeId:49,courseId:3,fee:null,seats:null},{id:475,collegeId:49,courseId:4,fee:null,seats:null},{id:476,collegeId:50,courseId:30,fee:null,seats:null},{id:477,collegeId:50,courseId:7,fee:null,seats:null},{id:478,collegeId:50,courseId:11,fee:null,seats:null},{id:479,collegeId:50,courseId:5,fee:null,seats:null},{id:480,collegeId:50,courseId:1,fee:null,seats:null},{id:481,collegeId:50,courseId:6,fee:null,seats:null},{id:482,collegeId:50,courseId:2,fee:null,seats:null},{id:483,collegeId:50,courseId:13,fee:null,seats:null},{id:484,collegeId:50,courseId:3,fee:null,seats:null},{id:485,collegeId:50,courseId:26,fee:null,seats:null},{id:486,collegeId:50,courseId:4,fee:null,seats:null},{id:487,collegeId:50,courseId:10,fee:null,seats:null},{id:488,collegeId:51,courseId:7,fee:null,seats:null},{id:489,collegeId:51,courseId:5,fee:null,seats:null},{id:490,collegeId:51,courseId:1,fee:null,seats:null},{id:491,collegeId:51,courseId:9,fee:null,seats:null},{id:492,collegeId:51,courseId:6,fee:null,seats:null},{id:493,collegeId:51,courseId:2,fee:null,seats:null},{id:494,collegeId:51,courseId:3,fee:null,seats:null},{id:495,collegeId:51,courseId:4,fee:null,seats:null},{id:496,collegeId:52,courseId:7,fee:null,seats:null},{id:497,collegeId:52,courseId:5,fee:null,seats:null},{id:498,collegeId:52,courseId:1,fee:null,seats:null},{id:499,collegeId:52,courseId:8,fee:null,seats:null},{id:500,collegeId:52,courseId:9,fee:null,seats:null},{id:501,collegeId:52,courseId:6,fee:null,seats:null},{id:502,collegeId:52,courseId:2,fee:null,seats:null},{id:503,collegeId:52,courseId:3,fee:null,seats:null},{id:504,collegeId:52,courseId:4,fee:null,seats:null},{id:505,collegeId:53,courseId:7,fee:null,seats:null},{id:506,collegeId:53,courseId:1,fee:null,seats:null},{id:507,collegeId:53,courseId:8,fee:null,seats:null},{id:508,collegeId:53,courseId:9,fee:null,seats:null},{id:509,collegeId:53,courseId:6,fee:null,seats:null},{id:510,collegeId:53,courseId:2,fee:null,seats:null},{id:511,collegeId:53,courseId:3,fee:null,seats:null},{id:512,collegeId:53,courseId:4,fee:null,seats:null},{id:513,collegeId:54,courseId:25,fee:null,seats:null},{id:514,collegeId:54,courseId:7,fee:null,seats:null},{id:515,collegeId:54,courseId:1,fee:null,seats:null},{id:516,collegeId:54,courseId:2,fee:null,seats:null},{id:517,collegeId:54,courseId:3,fee:null,seats:null},{id:518,collegeId:54,courseId:4,fee:null,seats:null},{id:519,collegeId:54,courseId:16,fee:null,seats:null},{id:520,collegeId:55,courseId:7,fee:null,seats:null},{id:521,collegeId:55,courseId:12,fee:null,seats:null},{id:522,collegeId:55,courseId:5,fee:null,seats:null},{id:523,collegeId:55,courseId:1,fee:null,seats:null},{id:524,collegeId:55,courseId:6,fee:null,seats:null},{id:525,collegeId:55,courseId:2,fee:null,seats:null},{id:526,collegeId:55,courseId:3,fee:null,seats:null},{id:527,collegeId:55,courseId:15,fee:null,seats:null},{id:528,collegeId:55,courseId:4,fee:null,seats:null},{id:529,collegeId:56,courseId:7,fee:null,seats:null},{id:530,collegeId:56,courseId:1,fee:null,seats:null},{id:531,collegeId:56,courseId:9,fee:null,seats:null},{id:532,collegeId:56,courseId:2,fee:null,seats:null},{id:533,collegeId:56,courseId:3,fee:null,seats:null},{id:534,collegeId:56,courseId:10,fee:null,seats:null},{id:535,collegeId:57,courseId:25,fee:null,seats:null},{id:536,collegeId:57,courseId:7,fee:null,seats:null},{id:537,collegeId:57,courseId:1,fee:null,seats:null},{id:538,collegeId:57,courseId:8,fee:null,seats:null},{id:539,collegeId:57,courseId:6,fee:null,seats:null},{id:540,collegeId:57,courseId:2,fee:null,seats:null},{id:541,collegeId:57,courseId:3,fee:null,seats:null},{id:542,collegeId:57,courseId:4,fee:null,seats:null},{id:543,collegeId:58,courseId:5,fee:null,seats:null},{id:544,collegeId:58,courseId:1,fee:null,seats:null},{id:545,collegeId:58,courseId:6,fee:null,seats:null},{id:546,collegeId:58,courseId:2,fee:null,seats:null},{id:547,collegeId:58,courseId:4,fee:null,seats:null},{id:548,collegeId:59,courseId:25,fee:null,seats:null},{id:549,collegeId:59,courseId:7,fee:null,seats:null},{id:550,collegeId:59,courseId:32,fee:null,seats:null},{id:551,collegeId:59,courseId:17,fee:null,seats:null},{id:552,collegeId:59,courseId:1,fee:null,seats:null},{id:553,collegeId:59,courseId:6,fee:null,seats:null},{id:554,collegeId:59,courseId:2,fee:null,seats:null},{id:555,collegeId:59,courseId:13,fee:null,seats:null},{id:556,collegeId:59,courseId:3,fee:null,seats:null},{id:557,collegeId:59,courseId:4,fee:null,seats:null},{id:558,collegeId:59,courseId:16,fee:null,seats:null},{id:559,collegeId:60,courseId:7,fee:null,seats:null},{id:560,collegeId:60,courseId:1,fee:null,seats:null},{id:561,collegeId:60,courseId:2,fee:null,seats:null},{id:562,collegeId:60,courseId:3,fee:null,seats:null},{id:563,collegeId:61,courseId:7,fee:null,seats:null},{id:564,collegeId:61,courseId:5,fee:null,seats:null},{id:565,collegeId:61,courseId:1,fee:null,seats:null},{id:566,collegeId:61,courseId:6,fee:null,seats:null},{id:567,collegeId:61,courseId:2,fee:null,seats:null},{id:568,collegeId:61,courseId:4,fee:null,seats:null},{id:569,collegeId:62,courseId:7,fee:null,seats:null},{id:570,collegeId:62,courseId:1,fee:null,seats:null},{id:571,collegeId:62,courseId:6,fee:null,seats:null},{id:572,collegeId:62,courseId:2,fee:null,seats:null},{id:573,collegeId:62,courseId:3,fee:null,seats:null},{id:574,collegeId:62,courseId:4,fee:null,seats:null},{id:575,collegeId:63,courseId:25,fee:null,seats:null},{id:576,collegeId:63,courseId:7,fee:null,seats:null},{id:577,collegeId:63,courseId:11,fee:null,seats:null},{id:578,collegeId:63,courseId:17,fee:null,seats:null},{id:579,collegeId:63,courseId:18,fee:null,seats:null},{id:580,collegeId:63,courseId:5,fee:null,seats:null},{id:581,collegeId:63,courseId:40,fee:null,seats:null},{id:582,collegeId:63,courseId:1,fee:null,seats:null},{id:583,collegeId:63,courseId:8,fee:null,seats:null},{id:584,collegeId:63,courseId:9,fee:null,seats:null},{id:585,collegeId:63,courseId:44,fee:null,seats:null},{id:586,collegeId:63,courseId:6,fee:null,seats:null},{id:587,collegeId:63,courseId:2,fee:null,seats:null},{id:588,collegeId:63,courseId:51,fee:null,seats:null},{id:589,collegeId:63,courseId:13,fee:null,seats:null},{id:590,collegeId:63,courseId:3,fee:null,seats:null},{id:591,collegeId:63,courseId:26,fee:null,seats:null},{id:592,collegeId:63,courseId:4,fee:null,seats:null},{id:593,collegeId:63,courseId:64,fee:null,seats:null},{id:594,collegeId:63,courseId:10,fee:null,seats:null},{id:595,collegeId:64,courseId:12,fee:null,seats:null},{id:596,collegeId:64,courseId:5,fee:null,seats:null},{id:597,collegeId:64,courseId:1,fee:null,seats:null},{id:598,collegeId:64,courseId:42,fee:null,seats:null},{id:599,collegeId:64,courseId:6,fee:null,seats:null},{id:600,collegeId:64,courseId:2,fee:null,seats:null},{id:601,collegeId:64,courseId:3,fee:null,seats:null},{id:602,collegeId:64,courseId:4,fee:null,seats:null},{id:603,collegeId:65,courseId:7,fee:null,seats:null},{id:604,collegeId:65,courseId:12,fee:null,seats:null},{id:605,collegeId:65,courseId:5,fee:null,seats:null},{id:606,collegeId:65,courseId:1,fee:null,seats:null},{id:607,collegeId:65,courseId:9,fee:null,seats:null},{id:608,collegeId:65,courseId:6,fee:null,seats:null},{id:609,collegeId:65,courseId:2,fee:null,seats:null},{id:610,collegeId:65,courseId:3,fee:null,seats:null},{id:611,collegeId:65,courseId:4,fee:null,seats:null},{id:612,collegeId:66,courseId:7,fee:null,seats:null},{id:613,collegeId:66,courseId:32,fee:null,seats:null},{id:614,collegeId:66,courseId:12,fee:null,seats:null},{id:615,collegeId:66,courseId:18,fee:null,seats:null},{id:616,collegeId:66,courseId:5,fee:null,seats:null},{id:617,collegeId:66,courseId:40,fee:null,seats:null},{id:618,collegeId:66,courseId:1,fee:null,seats:null},{id:619,collegeId:66,courseId:6,fee:null,seats:null},{id:620,collegeId:66,courseId:2,fee:null,seats:null},{id:621,collegeId:66,courseId:13,fee:null,seats:null},{id:622,collegeId:66,courseId:21,fee:null,seats:null},{id:623,collegeId:66,courseId:3,fee:null,seats:null},{id:624,collegeId:66,courseId:4,fee:null,seats:null},{id:625,collegeId:66,courseId:16,fee:null,seats:null},{id:626,collegeId:67,courseId:5,fee:null,seats:null},{id:627,collegeId:67,courseId:1,fee:null,seats:null},{id:628,collegeId:67,courseId:6,fee:null,seats:null},{id:629,collegeId:67,courseId:2,fee:null,seats:null},{id:630,collegeId:67,courseId:3,fee:null,seats:null},{id:631,collegeId:67,courseId:4,fee:null,seats:null},{id:632,collegeId:68,courseId:7,fee:null,seats:null},{id:633,collegeId:68,courseId:1,fee:null,seats:null},{id:634,collegeId:68,courseId:6,fee:null,seats:null},{id:635,collegeId:68,courseId:2,fee:null,seats:null},{id:636,collegeId:68,courseId:3,fee:null,seats:null},{id:637,collegeId:69,courseId:25,fee:null,seats:null},{id:638,collegeId:69,courseId:7,fee:null,seats:null},{id:639,collegeId:69,courseId:11,fee:null,seats:null},{id:640,collegeId:69,courseId:18,fee:null,seats:null},{id:641,collegeId:69,courseId:5,fee:null,seats:null},{id:642,collegeId:69,courseId:1,fee:null,seats:null},{id:643,collegeId:69,courseId:9,fee:null,seats:null},{id:644,collegeId:69,courseId:44,fee:null,seats:null},{id:645,collegeId:69,courseId:6,fee:null,seats:null},{id:646,collegeId:69,courseId:2,fee:null,seats:null},{id:647,collegeId:69,courseId:3,fee:null,seats:null},{id:648,collegeId:69,courseId:4,fee:null,seats:null},{id:649,collegeId:70,courseId:7,fee:null,seats:null},{id:650,collegeId:70,courseId:11,fee:null,seats:null},{id:651,collegeId:70,courseId:17,fee:null,seats:null},{id:652,collegeId:70,courseId:5,fee:null,seats:null},{id:653,collegeId:70,courseId:1,fee:null,seats:null},{id:654,collegeId:70,courseId:8,fee:null,seats:null},{id:655,collegeId:70,courseId:9,fee:null,seats:null},{id:656,collegeId:70,courseId:6,fee:null,seats:null},{id:657,collegeId:70,courseId:2,fee:null,seats:null},{id:658,collegeId:70,courseId:3,fee:null,seats:null},{id:659,collegeId:70,courseId:4,fee:null,seats:null},{id:660,collegeId:70,courseId:69,fee:null,seats:null},{id:661,collegeId:70,courseId:10,fee:null,seats:null},{id:662,collegeId:71,courseId:7,fee:null,seats:null},{id:663,collegeId:71,courseId:11,fee:null,seats:null},{id:664,collegeId:71,courseId:1,fee:null,seats:null},{id:665,collegeId:71,courseId:8,fee:null,seats:null},{id:666,collegeId:71,courseId:9,fee:null,seats:null},{id:667,collegeId:71,courseId:2,fee:null,seats:null},{id:668,collegeId:71,courseId:3,fee:null,seats:null},{id:669,collegeId:71,courseId:4,fee:null,seats:null},{id:670,collegeId:72,courseId:7,fee:null,seats:null},{id:671,collegeId:72,courseId:11,fee:null,seats:null},{id:672,collegeId:72,courseId:5,fee:null,seats:null},{id:673,collegeId:72,courseId:1,fee:null,seats:null},{id:674,collegeId:72,courseId:8,fee:null,seats:null},{id:675,collegeId:72,courseId:9,fee:null,seats:null},{id:676,collegeId:72,courseId:6,fee:null,seats:null},{id:677,collegeId:72,courseId:2,fee:null,seats:null},{id:678,collegeId:72,courseId:3,fee:null,seats:null},{id:679,collegeId:72,courseId:4,fee:null,seats:null},{id:680,collegeId:72,courseId:65,fee:null,seats:null},{id:681,collegeId:73,courseId:25,fee:null,seats:null},{id:682,collegeId:73,courseId:7,fee:null,seats:null},{id:683,collegeId:73,courseId:1,fee:null,seats:null},{id:684,collegeId:73,courseId:9,fee:null,seats:null},{id:685,collegeId:73,courseId:6,fee:null,seats:null},{id:686,collegeId:73,courseId:2,fee:null,seats:null},{id:687,collegeId:73,courseId:3,fee:null,seats:null},{id:688,collegeId:73,courseId:4,fee:null,seats:null},{id:689,collegeId:74,courseId:7,fee:null,seats:null},{id:690,collegeId:74,courseId:12,fee:null,seats:null},{id:691,collegeId:74,courseId:11,fee:null,seats:null},{id:692,collegeId:74,courseId:5,fee:null,seats:null},{id:693,collegeId:74,courseId:1,fee:null,seats:null},{id:694,collegeId:74,courseId:6,fee:null,seats:null},{id:695,collegeId:74,courseId:2,fee:null,seats:null},{id:696,collegeId:74,courseId:3,fee:null,seats:null},{id:697,collegeId:74,courseId:4,fee:null,seats:null},{id:698,collegeId:75,courseId:7,fee:null,seats:null},{id:699,collegeId:75,courseId:11,fee:null,seats:null},{id:700,collegeId:75,courseId:5,fee:null,seats:null},{id:701,collegeId:75,courseId:1,fee:null,seats:null},{id:702,collegeId:75,courseId:8,fee:null,seats:null},{id:703,collegeId:75,courseId:6,fee:null,seats:null},{id:704,collegeId:75,courseId:2,fee:null,seats:null},{id:705,collegeId:75,courseId:3,fee:null,seats:null},{id:706,collegeId:75,courseId:4,fee:null,seats:null},{id:707,collegeId:76,courseId:7,fee:null,seats:null},{id:708,collegeId:76,courseId:1,fee:null,seats:null},{id:709,collegeId:76,courseId:9,fee:null,seats:null},{id:710,collegeId:76,courseId:6,fee:null,seats:null},{id:711,collegeId:76,courseId:2,fee:null,seats:null},{id:712,collegeId:76,courseId:3,fee:null,seats:null},{id:713,collegeId:77,courseId:25,fee:null,seats:null},{id:714,collegeId:77,courseId:7,fee:null,seats:null},{id:715,collegeId:77,courseId:5,fee:null,seats:null},{id:716,collegeId:77,courseId:1,fee:null,seats:null},{id:717,collegeId:77,courseId:6,fee:null,seats:null},{id:718,collegeId:77,courseId:2,fee:null,seats:null},{id:719,collegeId:77,courseId:3,fee:null,seats:null},{id:720,collegeId:77,courseId:4,fee:null,seats:null},{id:721,collegeId:77,courseId:10,fee:null,seats:null},{id:722,collegeId:78,courseId:7,fee:null,seats:null},{id:723,collegeId:78,courseId:11,fee:null,seats:null},{id:724,collegeId:78,courseId:5,fee:null,seats:null},{id:725,collegeId:78,courseId:1,fee:null,seats:null},{id:726,collegeId:78,courseId:6,fee:null,seats:null},{id:727,collegeId:78,courseId:2,fee:null,seats:null},{id:728,collegeId:78,courseId:3,fee:null,seats:null},{id:729,collegeId:78,courseId:4,fee:null,seats:null},{id:730,collegeId:79,courseId:5,fee:null,seats:null},{id:731,collegeId:79,courseId:1,fee:null,seats:null},{id:732,collegeId:79,courseId:8,fee:null,seats:null},{id:733,collegeId:79,courseId:6,fee:null,seats:null},{id:734,collegeId:79,courseId:2,fee:null,seats:null},{id:735,collegeId:79,courseId:4,fee:null,seats:null},{id:736,collegeId:79,courseId:66,fee:null,seats:null},{id:737,collegeId:80,courseId:57,fee:null,seats:null},{id:738,collegeId:81,courseId:7,fee:null,seats:null},{id:739,collegeId:81,courseId:5,fee:null,seats:null},{id:740,collegeId:81,courseId:27,fee:null,seats:null},{id:741,collegeId:81,courseId:1,fee:null,seats:null},{id:742,collegeId:81,courseId:6,fee:null,seats:null},{id:743,collegeId:81,courseId:2,fee:null,seats:null},{id:744,collegeId:81,courseId:52,fee:null,seats:null},{id:745,collegeId:81,courseId:3,fee:null,seats:null},{id:746,collegeId:81,courseId:4,fee:null,seats:null},{id:747,collegeId:82,courseId:7,fee:null,seats:null},{id:748,collegeId:82,courseId:11,fee:null,seats:null},{id:749,collegeId:82,courseId:1,fee:null,seats:null},{id:750,collegeId:82,courseId:6,fee:null,seats:null},{id:751,collegeId:82,courseId:2,fee:null,seats:null},{id:752,collegeId:82,courseId:3,fee:null,seats:null},{id:753,collegeId:82,courseId:4,fee:null,seats:null},{id:754,collegeId:83,courseId:7,fee:null,seats:null},{id:755,collegeId:83,courseId:1,fee:null,seats:null},{id:756,collegeId:83,courseId:8,fee:null,seats:null},{id:757,collegeId:83,courseId:9,fee:null,seats:null},{id:758,collegeId:83,courseId:6,fee:null,seats:null},{id:759,collegeId:83,courseId:2,fee:null,seats:null},{id:760,collegeId:83,courseId:3,fee:null,seats:null},{id:761,collegeId:83,courseId:4,fee:null,seats:null},{id:762,collegeId:84,courseId:7,fee:null,seats:null},{id:763,collegeId:84,courseId:11,fee:null,seats:null},{id:764,collegeId:84,courseId:17,fee:null,seats:null},{id:765,collegeId:84,courseId:5,fee:null,seats:null},{id:766,collegeId:84,courseId:1,fee:null,seats:null},{id:767,collegeId:84,courseId:6,fee:null,seats:null},{id:768,collegeId:84,courseId:2,fee:null,seats:null},{id:769,collegeId:84,courseId:3,fee:null,seats:null},{id:770,collegeId:84,courseId:4,fee:null,seats:null},{id:771,collegeId:85,courseId:7,fee:null,seats:null},{id:772,collegeId:85,courseId:11,fee:null,seats:null},{id:773,collegeId:85,courseId:1,fee:null,seats:null},{id:774,collegeId:85,courseId:6,fee:null,seats:null},{id:775,collegeId:85,courseId:2,fee:null,seats:null},{id:776,collegeId:85,courseId:3,fee:null,seats:null},{id:777,collegeId:85,courseId:4,fee:null,seats:null},{id:778,collegeId:86,courseId:7,fee:null,seats:null},{id:779,collegeId:86,courseId:11,fee:null,seats:null},{id:780,collegeId:86,courseId:5,fee:null,seats:null},{id:781,collegeId:86,courseId:27,fee:null,seats:null},{id:782,collegeId:86,courseId:40,fee:null,seats:null},{id:783,collegeId:86,courseId:1,fee:null,seats:null},{id:784,collegeId:86,courseId:8,fee:null,seats:null},{id:785,collegeId:86,courseId:9,fee:null,seats:null},{id:786,collegeId:86,courseId:48,fee:null,seats:null},{id:787,collegeId:86,courseId:6,fee:null,seats:null},{id:788,collegeId:86,courseId:2,fee:null,seats:null},{id:789,collegeId:86,courseId:52,fee:null,seats:null},{id:790,collegeId:86,courseId:14,fee:null,seats:null},{id:791,collegeId:86,courseId:20,fee:null,seats:null},{id:792,collegeId:86,courseId:3,fee:null,seats:null},{id:793,collegeId:86,courseId:4,fee:null,seats:null},{id:794,collegeId:86,courseId:16,fee:null,seats:null},{id:795,collegeId:86,courseId:73,fee:null,seats:null},{id:796,collegeId:87,courseId:25,fee:null,seats:null},{id:797,collegeId:87,courseId:7,fee:null,seats:null},{id:798,collegeId:87,courseId:32,fee:null,seats:null},{id:799,collegeId:87,courseId:11,fee:null,seats:null},{id:800,collegeId:87,courseId:1,fee:null,seats:null},{id:801,collegeId:87,courseId:9,fee:null,seats:null},{id:802,collegeId:87,courseId:2,fee:null,seats:null},{id:803,collegeId:87,courseId:3,fee:null,seats:null},{id:804,collegeId:87,courseId:4,fee:null,seats:null},{id:805,collegeId:88,courseId:7,fee:null,seats:null},{id:806,collegeId:88,courseId:5,fee:null,seats:null},{id:807,collegeId:88,courseId:1,fee:null,seats:null},{id:808,collegeId:88,courseId:8,fee:null,seats:null},{id:809,collegeId:88,courseId:6,fee:null,seats:null},{id:810,collegeId:88,courseId:2,fee:null,seats:null},{id:811,collegeId:88,courseId:3,fee:null,seats:null},{id:812,collegeId:88,courseId:4,fee:null,seats:null},{id:813,collegeId:89,courseId:25,fee:null,seats:null},{id:814,collegeId:89,courseId:7,fee:null,seats:null},{id:815,collegeId:89,courseId:11,fee:null,seats:null},{id:816,collegeId:89,courseId:18,fee:null,seats:null},{id:817,collegeId:89,courseId:5,fee:null,seats:null},{id:818,collegeId:89,courseId:1,fee:null,seats:null},{id:819,collegeId:89,courseId:6,fee:null,seats:null},{id:820,collegeId:89,courseId:2,fee:null,seats:null},{id:821,collegeId:89,courseId:3,fee:null,seats:null},{id:822,collegeId:89,courseId:4,fee:null,seats:null},{id:823,collegeId:90,courseId:7,fee:null,seats:null},{id:824,collegeId:90,courseId:11,fee:null,seats:null},{id:825,collegeId:90,courseId:5,fee:null,seats:null},{id:826,collegeId:90,courseId:1,fee:null,seats:null},{id:827,collegeId:90,courseId:6,fee:null,seats:null},{id:828,collegeId:90,courseId:2,fee:null,seats:null},{id:829,collegeId:90,courseId:3,fee:null,seats:null},{id:830,collegeId:90,courseId:4,fee:null,seats:null}],users:[{id:`u1`,name:`Harini`,email:`harini8070@gmail.com`,password:`Harini@2006`,role:`student`}],applications:[]},Tr=`
:root {
  --cc-login-bg1: #4f46e5;
  --cc-login-bg2: #7c3aed;
  --cc-login-ink: #111827;
  --cc-login-mut: #6b7280;
  --cc-login-line: #e5e7eb;
  --cc-login-brand-text: #ffffff;
  --cc-login-card: #ffffff;
}
.cc-login-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #f1f2f6;
  font-family: "Segoe UI", system-ui, -apple-system, Arial, sans-serif;
  padding: 24px;
}
.cc-login-page *,
.cc-login-page *::before,
.cc-login-page *::after {
  box-sizing: border-box;
}
.cc-login-shell {
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  width: 100%;
  max-width: 960px;
  min-height: 560px;
  background: var(--cc-login-card);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(17, 24, 39, 0.18);
}
.cc-login-brand {
  background: linear-gradient(150deg, var(--cc-login-bg1), var(--cc-login-bg2));
  color: var(--cc-login-brand-text);
  padding: 44px 40px;
  display: flex;
}
.cc-login-brand-inner {
  display: flex;
  flex-direction: column;
  gap: 22px;
  width: 100%;
}
.cc-login-logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.cc-login-logo-mark {
  width: 38px;
  height: 38px;
  border-radius: 11px;
  background: rgba(255, 255, 255, 0.18);
  display: grid;
  place-items: center;
  font-weight: 800;
  font-size: 20px;
}
.cc-login-logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}
.cc-login-logo-text strong {
  font-size: 16px;
  letter-spacing: 0.2px;
}
.cc-login-logo-text small {
  font-size: 11px;
  opacity: 0.75;
}
.cc-login-brand h1 {
  margin: 8px 0 0;
  font-size: 30px;
  line-height: 1.2;
  font-weight: 700;
}
.cc-login-brand p {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  opacity: 0.85;
}
.cc-login-features {
  list-style: none;
  margin: 8px 0 0;
  padding: 0;
  display: grid;
  gap: 14px;
}
.cc-login-features li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13.5px;
  line-height: 1.45;
  opacity: 0.95;
}
.cc-login-features svg {
  flex: 0 0 auto;
  margin-top: 1px;
}
.cc-login-social {
  margin-top: 22px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  opacity: 0.85;
}
.cc-login-avatars {
  display: flex;
}
.cc-login-avatars span {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.9);
  display: grid;
  place-items: center;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  margin-right: -8px;
}
.cc-login-card {
  padding: 48px 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.cc-login-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  padding: 4px;
  background: #eef1f6;
  border-radius: 12px;
  margin-bottom: 22px;
}
.cc-login-tabs button {
  border: 0;
  background: transparent;
  padding: 9px 12px;
  border-radius: 9px;
  font-size: 14px;
  font-weight: 600;
  color: var(--cc-login-mut);
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}
.cc-login-tabs button.active {
  background: var(--cc-login-card);
  color: var(--cc-login-ink);
  box-shadow: 0 2px 8px rgba(17, 24, 39, 0.1);
}
.cc-login-card h2 {
  margin: 0 0 6px;
  font-size: 26px;
  color: var(--cc-login-ink);
}
.cc-login-card-sub {
  margin: 0 0 22px;
  font-size: 14px;
  color: var(--cc-login-mut);
  line-height: 1.55;
}
.cc-login-field {
  margin-bottom: 14px;
}
.cc-login-field label {
  display: block;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--cc-login-ink);
  margin-bottom: 6px;
}
.cc-login-input {
  width: 100%;
  padding: 11px 12px;
  border: 1px solid var(--cc-login-line);
  border-radius: 10px;
  font-size: 14px;
  color: var(--cc-login-ink);
  background: #fff;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.cc-login-input:focus {
  border-color: var(--cc-login-bg1);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
}
.cc-login-pw-wrap {
  position: relative;
}
.cc-login-pw-toggle {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  border: 0;
  background: transparent;
  color: var(--cc-login-mut);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 6px;
}
.cc-login-submit {
  width: 100%;
  padding: 12px 14px;
  border: 0;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--cc-login-bg1), var(--cc-login-bg2));
  color: #fff;
  font-size: 14.5px;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.15s ease, transform 0.05s ease;
  margin-top: 4px;
}
.cc-login-submit:hover {
  opacity: 0.92;
}
.cc-login-submit:active {
  transform: translateY(1px);
}
.cc-login-error {
  margin-top: 16px;
  padding: 10px 12px;
  border-radius: 10px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  font-size: 13px;
  line-height: 1.45;
}
.cc-login-switch {
  margin-top: 16px;
  text-align: center;
  font-size: 13px;
  color: var(--cc-login-mut);
}
.cc-login-switch button {
  border: 0;
  background: none;
  color: var(--cc-login-bg1);
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  padding: 0;
}
@media (max-width: 760px) {
  .cc-login-shell {
    grid-template-columns: 1fr;
    max-width: 440px;
  }
  .cc-login-brand {
    display: none;
  }
  .cc-login-card {
    padding: 36px 28px;
  }
}
`,Er=`scp_auth_users`;function Dr(){try{let e=localStorage.getItem(Er),t=e?JSON.parse(e):[];return Array.isArray(t)?t:[]}catch{return[]}}function Or(e){let t=Dr();t.push(e);try{localStorage.setItem(Er,JSON.stringify(t))}catch{}}function kr({users:e=[],onSuccess:t}){let[n,r]=(0,_.useState)(`signin`),[i,a]=(0,_.useState)(``),[o,s]=(0,_.useState)(``),[c,l]=(0,_.useState)(``),[u,d]=(0,_.useState)(``),[f,p]=(0,_.useState)(!1),[m,h]=(0,_.useState)(``),g=e=>{typeof t==`function`&&t(e)},v=Dr(),y=[...e,...v],b=e=>{r(e),h(``),d(``)},x=e=>{e.preventDefault(),h(``);let t=(o||``).trim().toLowerCase(),n=y.find(e=>String(e?.email||``).trim().toLowerCase()===t);if(!n){h(`No account found with this email. Create an account first.`);return}if(String(n?.password||``)!==c){h(`Incorrect password. Please try again.`);return}g({...n,provider:`email`})},S=e=>{e.preventDefault(),h(``);let t=(o||``).trim().toLowerCase();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)){h(`Enter a valid email address.`);return}if((c||``).length<6){h(`Password must be at least 6 characters.`);return}if((c||``)!==(u||``)){h(`Passwords do not match.`);return}if(y.some(e=>String(e?.email||``).trim().toLowerCase()===t)){h(`An account with this email already exists. Please sign in.`);return}let n={id:`u${Date.now()}`,name:(i||``).trim()||t.split(`@`)[0],email:t,password:c,role:`student`};Or(n),g({...n,provider:`email`})},ee=(0,N.jsx)(`svg`,{viewBox:`0 0 24 24`,width:`16`,height:`16`,fill:`none`,stroke:`#ffffff`,strokeWidth:`2.2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,N.jsx)(`path`,{d:`M4.5 12.5l4.5 4.5L19.5 6.5`})});return(0,N.jsxs)(`div`,{className:`cc-login-page`,children:[(0,N.jsx)(`style`,{children:Tr}),(0,N.jsxs)(`div`,{className:`cc-login-shell`,children:[(0,N.jsx)(`aside`,{className:`cc-login-brand`,children:(0,N.jsxs)(`div`,{className:`cc-login-brand-inner`,children:[(0,N.jsxs)(`div`,{className:`cc-login-logo`,children:[(0,N.jsx)(`span`,{className:`cc-login-logo-mark`,children:`SC`}),(0,N.jsxs)(`span`,{className:`cc-login-logo-text`,children:[(0,N.jsx)(`strong`,{children:`Student College`}),(0,N.jsx)(`small`,{children:`Student-College Admission Platform`})]})]}),(0,N.jsx)(`h1`,{children:`Find the Right College for Your Future`}),(0,N.jsx)(`p`,{children:`Compare engineering colleges across Coimbatore, Erode and Salem — courses, fees, eligibility and facilities in one place.`}),(0,N.jsxs)(`ul`,{className:`cc-login-features`,children:[(0,N.jsxs)(`li`,{children:[ee,` Browse 90+ verified engineering colleges`]}),(0,N.jsxs)(`li`,{children:[ee,` Compare courses, fees & eligibility side-by-side`]}),(0,N.jsxs)(`li`,{children:[ee,` Save favourites and revisit anytime`]})]}),(0,N.jsxs)(`div`,{className:`cc-login-social`,children:[(0,N.jsxs)(`div`,{className:`cc-login-avatars`,children:[(0,N.jsx)(`span`,{style:{background:`#f59e0b`},children:`RK`}),(0,N.jsx)(`span`,{style:{background:`#10b981`},children:`PM`}),(0,N.jsx)(`span`,{style:{background:`#3b82f6`},children:`AV`})]}),(0,N.jsx)(`span`,{children:`Trusted by 12,000+ students`})]})]})}),(0,N.jsxs)(`main`,{className:`cc-login-card`,children:[(0,N.jsxs)(`div`,{className:`cc-login-tabs`,children:[(0,N.jsx)(`button`,{type:`button`,className:n===`signin`?`active`:``,onClick:()=>b(`signin`),children:`Sign In`}),(0,N.jsx)(`button`,{type:`button`,className:n===`signup`?`active`:``,onClick:()=>b(`signup`),children:`Create Account`})]}),n===`signin`?(0,N.jsxs)(`form`,{onSubmit:x,children:[(0,N.jsx)(`h2`,{children:`Welcome back`}),(0,N.jsx)(`p`,{className:`cc-login-card-sub`,children:`Sign in with your email and password to open the platform.`}),(0,N.jsxs)(`div`,{className:`cc-login-field`,children:[(0,N.jsx)(`label`,{htmlFor:`cc-login-email`,children:`Email address`}),(0,N.jsx)(`input`,{id:`cc-login-email`,className:`cc-login-input`,type:`email`,placeholder:`you@example.com`,value:o,autoComplete:`email`,onChange:e=>s(e.target.value)})]}),(0,N.jsxs)(`div`,{className:`cc-login-field`,children:[(0,N.jsx)(`label`,{htmlFor:`cc-login-password`,children:`Password`}),(0,N.jsxs)(`div`,{className:`cc-login-pw-wrap`,children:[(0,N.jsx)(`input`,{id:`cc-login-password`,className:`cc-login-input`,type:f?`text`:`password`,placeholder:`Your password`,value:c,autoComplete:`current-password`,onChange:e=>l(e.target.value)}),(0,N.jsx)(`button`,{type:`button`,className:`cc-login-pw-toggle`,onClick:()=>p(e=>!e),children:f?`Hide`:`Show`})]})]}),(0,N.jsx)(`button`,{type:`submit`,className:`cc-login-submit`,children:`Sign In`})]}):(0,N.jsxs)(`form`,{onSubmit:S,children:[(0,N.jsx)(`h2`,{children:`Create your account`}),(0,N.jsx)(`p`,{className:`cc-login-card-sub`,children:`Register in a few seconds and start exploring colleges.`}),(0,N.jsxs)(`div`,{className:`cc-login-field`,children:[(0,N.jsx)(`label`,{htmlFor:`cc-login-name`,children:`Full name`}),(0,N.jsx)(`input`,{id:`cc-login-name`,className:`cc-login-input`,type:`text`,placeholder:`Your name`,value:i,autoComplete:`name`,onChange:e=>a(e.target.value)})]}),(0,N.jsxs)(`div`,{className:`cc-login-field`,children:[(0,N.jsx)(`label`,{htmlFor:`cc-login-email`,children:`Email address`}),(0,N.jsx)(`input`,{id:`cc-login-email`,className:`cc-login-input`,type:`email`,placeholder:`you@example.com`,value:o,autoComplete:`email`,onChange:e=>s(e.target.value)})]}),(0,N.jsxs)(`div`,{className:`cc-login-field`,children:[(0,N.jsx)(`label`,{htmlFor:`cc-login-password`,children:`Password`}),(0,N.jsxs)(`div`,{className:`cc-login-pw-wrap`,children:[(0,N.jsx)(`input`,{id:`cc-login-password`,className:`cc-login-input`,type:f?`text`:`password`,placeholder:`At least 6 characters`,value:c,autoComplete:`new-password`,onChange:e=>l(e.target.value)}),(0,N.jsx)(`button`,{type:`button`,className:`cc-login-pw-toggle`,onClick:()=>p(e=>!e),children:f?`Hide`:`Show`})]})]}),(0,N.jsxs)(`div`,{className:`cc-login-field`,children:[(0,N.jsx)(`label`,{htmlFor:`cc-login-confirm`,children:`Confirm password`}),(0,N.jsx)(`input`,{id:`cc-login-confirm`,className:`cc-login-input`,type:f?`text`:`password`,placeholder:`Repeat your password`,value:u,autoComplete:`new-password`,onChange:e=>d(e.target.value)})]}),(0,N.jsx)(`button`,{type:`submit`,className:`cc-login-submit`,children:`Create Account & Sign In`})]}),m?(0,N.jsx)(`div`,{className:`cc-login-error`,children:m}):null,(0,N.jsx)(`p`,{className:`cc-login-switch`,children:n===`signin`?(0,N.jsxs)(N.Fragment,{children:[`New here?`,` `,(0,N.jsx)(`button`,{type:`button`,onClick:()=>b(`signup`),children:`Create an account`})]}):(0,N.jsxs)(N.Fragment,{children:[`Already have an account?`,` `,(0,N.jsx)(`button`,{type:`button`,onClick:()=>b(`signin`),children:`Sign In`})]})})]})]})]})}var Ar=`/student-college-platform/assets/home%20student-CzX96I25.png`,jr=`/student-college-platform/assets/about%20student-o7RqfG8a.jpg`;function Mr({users:e,onSuccess:t}){let[n,r]=(0,_.useState)(``),[i,a]=(0,_.useState)(``),[o,s]=(0,_.useState)(``);return(0,N.jsx)(`div`,{style:{minHeight:`100vh`,display:`grid`,placeItems:`center`,background:`#f1f2f6`,fontFamily:`Segoe UI, system-ui, Arial, sans-serif`},children:(0,N.jsxs)(`div`,{style:{width:`100%`,maxWidth:400,background:`#fff`,borderRadius:16,padding:32,boxShadow:`0 18px 40px rgba(17,24,39,.15)`},children:[(0,N.jsx)(`h2`,{style:{margin:`0 0 6px`},children:`Sign in`}),(0,N.jsx)(`p`,{style:{margin:`0 0 16px`,color:`#6b7280`,fontSize:14},children:`Enter your registered email to continue.`}),(0,N.jsxs)(`form`,{onSubmit:r=>{r.preventDefault(),s(``);let a=e.find(e=>String(e?.email||``).trim().toLowerCase()===n.trim().toLowerCase());if(!a){s(`No account found with this email.`);return}if(String(a?.password||``)!==i){s(`Incorrect password. Please try again.`);return}t({...a,provider:`email`})},style:{display:`grid`,gap:12},children:[(0,N.jsx)(`input`,{type:`email`,placeholder:`you@example.com`,value:n,autoComplete:`email`,onChange:e=>r(e.target.value),style:{padding:`11px 12px`,borderRadius:10,border:`1px solid #e5e7eb`,fontSize:14}}),(0,N.jsx)(`input`,{type:`password`,placeholder:`Password`,value:i,autoComplete:`current-password`,onChange:e=>a(e.target.value),style:{padding:`11px 12px`,borderRadius:10,border:`1px solid #e5e7eb`,fontSize:14}}),(0,N.jsx)(`button`,{type:`submit`,style:{padding:`12px 14px`,borderRadius:10,border:0,background:`linear-gradient(135deg,#4f46e5,#7c3aed)`,color:`#fff`,fontSize:15,fontWeight:700,cursor:`pointer`},children:`Sign In`})]}),o?(0,N.jsx)(`p`,{style:{color:`#b91c1c`,fontSize:13,marginTop:12},children:o}):null]})})}var Nr=window.location.origin,Pr={cap:`M2 9l10-5 10 5-10 5L2 9zm4 3v5c0 1.5 3 3 6 3s6-1.5 6-3v-5`,search:`M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3`,check:`M4.5 12.5l4.5 4.5L19.5 6.5`,grid:`M4 4h6.5v6.5H4zM13.5 4H20v6.5h-6.5zM4 13.5h6.5V20H4zM13.5 13.5H20V20h-6.5z`,sparkle:`M12 3.5L13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9 12 3.5z`,arrow:`M5 12h14M13 6l6 6-6 6`,menu:`M4 7h16M4 12h16M4 17h16`,close:`M6 6l12 12M18 6L6 18`,pin:`M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11zM12 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z`,star:`M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5z`,globe:`M12 21a9 9 0 100-18 9 9 0 000 18zm0-18c2.2 2.4 3.3 5.4 3.3 9S14.2 18.6 12 21M12 3c-2.2 2.4-3.3 5.4-3.3 9S9.8 18.6 12 21M3 12h18`,phone:`M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012 4.2 2 2 0 014 2h3a2 2 0 012 1.7c.1 1 .3 1.9.7 2.8a2 2 0 01-.5 2.1L8 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.5c.9.4 1.8.6 2.8.7A2 2 0 0122 16.9z`,book:`M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 016.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z`,building:`M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2`,calendar:`M6 2v4M18 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z`};function F({name:e,size:t=20}){return(0,N.jsx)(`svg`,{width:t,height:t,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.8`,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":`true`,children:(0,N.jsx)(`path`,{d:Pr[e]})})}var Fr=[{label:`Home`,href:`#home`},{label:`About`,href:`#about`},{label:`Colleges`,href:`#colleges`},{label:`Courses`,href:`#courses`},{label:`Contact`,href:`#contact`}],Ir=e=>{let t=Number(e);return Number.isFinite(t)?t:0},Lr=e=>Array.isArray(e)?e.filter(Boolean):e==null||e===``?[]:[e],I=e=>typeof e==`boolean`?e?`Yes`:`No`:Array.isArray(e)?e.map(I).filter(Boolean).join(` · `):e&&typeof e==`object`?e.name||e.title||e.value||``:e==null?``:String(e),Rr=e=>{let t=Ir(e);return t<=0?``:new Intl.NumberFormat(`en-IN`,{style:`currency`,currency:`INR`,maximumFractionDigits:0}).format(t)},zr=e=>{let t=Array.isArray(e)?e[0]:e,n=typeof t==`string`?t.trim():t&&typeof t==`object`?t.url||t.src:``;return n?/^(https?:)?\/\//i.test(n)||n.startsWith(`data:`)?n:`${Nr}/${n.replace(/^\.?\//,``)}`:``},Br=e=>{e.currentTarget.style.display=`none`},Vr=e=>I(e?.name||e?.basicDetails?.name||e?.basic_details?.name),Hr=e=>I(e?.city||e?.location||e?.basicDetails?.location||e?.basic_details?.location),Ur=e=>I(e?.state||e?.basicDetails?.state||e?.basic_details?.state||`Tamil Nadu`),Wr=e=>I(e?.district||e?.basicDetails?.district||e?.basic_details?.district||e?.city),Gr=e=>I(e?.website||e?.websiteUrl||e?.url||e?.basicDetails?.website||e?.basic_details?.website),Kr=e=>I(e?.contact||e?.phone||e?.contactNumber||e?.basicDetails?.contact||e?.basic_details?.contact),qr=e=>I(e?.institutionType?.category||e?.institutionType?.type||e?.type||`Engineering`),Jr=e=>I(e?.affiliation||e?.institutionType?.affiliation||e?.basicDetails?.affiliation),Yr=e=>Ir(e?.rating||e?.reviews?.rating),Xr=e=>e?.fee||e?.fees||e?.startingFee||e?.courseFee||0,Zr=e=>Array.isArray(e?.courses)?e.courses:Array.isArray(e?.courseDetails)?e.courseDetails:[],Qr=e=>e?.facilities&&typeof e.facilities==`object`&&!Array.isArray(e.facilities)?e.facilities:{hostel:e?.hostel||``,placement:e?.placement||``,scholarship:e?.scholarship||``,transport:e?.transport||``,infrastructure:e?.infrastructure||``},$r=e=>Array.isArray(e?.facilities)?e.facilities.filter(Boolean):[],ei=e=>e?.admission&&typeof e.admission==`object`?e.admission:{admissionProcess:e?.admissionProcess||``,cutoff:e?.cutoff||``,counselling:e?.counselling||``,importantDates:e?.importantDates||``},ti=(e,t)=>(Array.isArray(e?.courseIds)?e.courseIds:e?.courseIds===void 0?[]:[e.courseIds]).map(e=>{let n=t[String(e)];return n?I(n.name||n.title||n.courseName||n.basicDetails?.courseName):``}).filter(Boolean),ni=(e,t)=>{let n=Zr(e);return n.length>0?n.map(e=>I(e.courseName||e.name||e.title||e.basicDetails?.courseName)).filter(Boolean):ti(e,t)},ri=(e,t)=>{let n=Zr(e);return n.length>0?n:Lr(e?.courseIds).map(e=>t[String(e)]).filter(Boolean).map(t=>({courseName:I(t.name||t.title||t.courseName||t.basicDetails?.courseName),degree:I(t.degree)||`B.E / B.Tech`,duration:I(t.duration)||`4 Years`,eligibility:I(t.eligibility)||I(e?.eligibility)||`12th with Physics, Chemistry and Mathematics`,entranceExam:I(t.entranceExam)||`TNEA`,fees:Rr(t.fees||t.fee||Xr(e))}))},ii=(e,t,n)=>{if(!n)return!0;let r=ni(e,t),i=ei(e),a=Qr(e);return[Vr(e),Hr(e),Ur(e),Wr(e),qr(e),Jr(e),Gr(e),Kr(e),e?.about,...r,...$r(e),I(i.admissionProcess),I(i.cutoff),I(i.counselling),I(i.importantDates),I(a.hostel),I(a.placement),I(a.scholarship),I(a.transport),I(a.infrastructure)].map(I).join(` `).toLowerCase().includes(n)},ai=(e,t)=>{if(t<=7)return Array.from({length:t},(e,t)=>t+1);let n=new Set([1,t,e-1,e,e+1]);e<=3&&(n.add(2),n.add(3),n.add(4)),e>=t-2&&(n.add(t-1),n.add(t-2),n.add(t-3));let r=[...n].filter(e=>e>=1&&e<=t).sort((e,t)=>e-t),i=[];return r.forEach((e,t)=>{t>0&&e-r[t-1]>1&&i.push(`dots-`+e),i.push(e)}),i},oi=`
html {
  scroll-behavior: smooth;
}

#root {
  width: 100%;
  max-width: none;
  margin: 0;
  text-align: left;
}

.cc-root {
  --brand: #2478FC;
  --brand-dark: #185fc8;
  --deep: #01459A;
  --navy: #061F3A;
  --blue-25: #EEF7FE;
  --blue-50: #E7F1FF;
  --muted: #64748B;
  --muted-dark: #475569;
  --border: #E2E8F0;
  --success: #12805C;
  --warning: #F59E0B;
  --radius: 16px;
  --radius-lg: 22px;
  --shadow-md: 0 10px 30px rgba(6,31,58,.10);
  --shadow-lg: 0 20px 45px rgba(6,31,58,.14);
  --shadow-brand: 0 12px 28px rgba(36,120,252,.28);
  --ease: cubic-bezier(.4,0,.2,1);

  color-scheme: light only;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.65;
  color: #0F1C33;
  background: #fff;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
}

.cc-root *,
.cc-root *::before,
.cc-root *::after {
  box-sizing: border-box;
}

.cc-root h1,
.cc-root h2,
.cc-root h3,
.cc-root h4 {
  color: var(--navy);
  font-weight: 700;
  line-height: 1.25;
  margin: 0;
}

.cc-root p {
  margin: 0;
  color: var(--muted);
}

.cc-root ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.cc-root a {
  color: inherit;
  text-decoration: none;
}

.cc-root img {
  display: block;
  max-width: 100%;
}

.cc-root [id] {
  scroll-margin-top: 84px;
}

.cc-wrap {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.cc-section {
  padding: 84px 0;
}

.cc-eyebrow {
  display: inline-block;
  font-size: .78rem;
  font-weight: 700;
  letter-spacing: .09em;
  text-transform: uppercase;
  color: var(--brand);
  background: var(--blue-25);
  border: 1px solid #d5e6fb;
  padding: 6px 14px;
  border-radius: 999px;
  margin-bottom: 14px;
}

/* BUTTONS */

.cc-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid transparent;
  border-radius: 999px;
  padding: 12px 24px;
  font-size: .95rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: .2s ease;
}

.cc-btn:hover {
  transform: translateY(-2px);
}

.cc-btn-primary {
  background: var(--brand);
  color: #fff;
  box-shadow: var(--shadow-brand);
}

.cc-btn-primary:hover {
  background: var(--brand-dark);
}

.cc-btn-ghost {
  background: #fff;
  color: var(--navy);
  border-color: var(--border);
}

.cc-btn-ghost:hover {
  border-color: var(--brand);
  color: var(--brand);
}

.cc-btn-outline {
  background: transparent;
  color: var(--brand);
  border-color: #bcd8fb;
}

.cc-btn-outline:hover {
  background: var(--blue-25);
}

.cc-btn-sm {
  padding: 9px 18px;
  font-size: .88rem;
}

.cc-btn-lg {
  padding: 14px 30px;
  font-size: 1rem;
}

.cc-btn-block {
  display: flex;
  width: 100%;
}

/* NAVBAR */

.cc-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255,255,255,.94);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
}

.cc-nav-toggle {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

.cc-nav-inner {
  display: flex;
  align-items: center;
  gap: 20px;
  height: 76px;
}

.cc-logo {
  display: flex;
  align-items: center;
  gap: 11px;
}

.cc-logo-mark {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 13px;
  background: linear-gradient(135deg, var(--brand), var(--deep));
  color: #fff;
}

.cc-logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.cc-logo-text strong {
  font-size: 1.08rem;
  color: var(--navy);
  font-weight: 800;
}

.cc-logo-text small {
  font-size: .68rem;
  color: var(--muted);
}

.cc-menu {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: auto;
}

.cc-menu a {
  padding: 9px 15px;
  border-radius: 999px;
  font-size: .95rem;
  font-weight: 600;
  color: var(--muted-dark);
}

.cc-menu a:hover {
  color: var(--brand);
  background: var(--blue-25);
}

.cc-nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cc-icon-btn {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: #fff;
  color: var(--navy);
}

.cc-icon-btn:hover {
  border-color: var(--brand);
  color: var(--brand);
}

.cc-burger {
  display: none;
}

.cc-icon-close {
  display: none;
}

.cc-mobile {
  display: none;
  flex-direction: column;
  padding: 8px 24px 26px;
  border-top: 1px solid var(--border);
  background: #fff;
}

.cc-mobile a {
  padding: 13px 4px;
  font-weight: 600;
  color: var(--navy);
}

/* HERO */

.cc-hero {
  position: relative;
  background: linear-gradient(160deg,#f4f9ff 0%,#e9f2fe 46%,#fff 100%);
  padding: 76px 0 0;
}

.cc-hero-grid {
  display: grid;
  grid-template-columns: 1.05fr .95fr;
  gap: 48px;
  align-items: center;
  padding-bottom: 68px;
}

.cc-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 15px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid #d5e6fb;
  color: var(--deep);
  font-size: .8rem;
  font-weight: 700;
}

.cc-hero h1 {
  font-size: clamp(2.1rem,4.6vw,3.3rem);
  margin-top: 20px;
}

.cc-hero h1 em {
  font-style: normal;
  color: var(--brand);
}

.cc-hero-text {
  margin-top: 18px;
  font-size: 1.06rem;
  color: var(--muted-dark);
  max-width: 52ch;
}

.cc-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.cc-points {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 24px;
  margin-top: 26px;
  font-size: .9rem;
  color: var(--muted-dark);
}

.cc-points li {
  display: flex;
  align-items: center;
  gap: 7px;
}

.cc-points svg {
  color: var(--success);
}

.cc-hero-visual {
  position: relative;
}

.cc-hero-img {
  height: 430px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  background: linear-gradient(135deg,#0b3a6f,#2f7de1);
}

.cc-hero-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cc-float {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 12px 16px;
  border-radius: var(--radius);
  background: #fff;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-md);
}

.cc-float-b {
  bottom: 56px;
  right: -16px;
}

.cc-float-c {
  bottom: -20px;
  left: 30px;
}

.cc-icon-circle {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 13px;
  background: var(--blue-25);
  color: var(--brand);
}

.cc-float strong {
  display: block;
  font-size: 1.1rem;
  color: var(--navy);
}

.cc-float small {
  font-size: .74rem;
  color: var(--muted);
}

.cc-strip {
  background: var(--navy);
  padding: 30px 0 24px;
}

.cc-strip-grid {
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 20px;
  text-align: center;
}

.cc-strip-grid strong {
  display: block;
  font-size: 2rem;
  color: #fff;
}

.cc-strip-grid span {
  font-size: .85rem;
  color: #9DB8D4;
}

/* ABOUT */

.cc-about {
  display: grid;
  grid-template-columns: 1.05fr .95fr;
  gap: 56px;
  align-items: center;
}

.cc-about h2 {
  font-size: clamp(1.5rem,2.6vw,2rem);
}

.cc-about-text {
  margin-top: 16px;
  font-size: 1.02rem;
  color: var(--muted-dark);
}

.cc-about-list {
  display: grid;
  gap: 12px;
  margin-top: 24px;
}

.cc-about-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--navy);
  font-weight: 500;
}

.cc-about-list svg {
  color: var(--success);
}

.cc-about-img {
  height: 380px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.cc-about-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* COLLEGES */

.cc-colleges {
  background: linear-gradient(180deg,#fff 0%,#f7fbff 100%);
  border-top: 1px solid var(--border);
}

.cc-col-head {
  max-width: 850px;
  margin-bottom: 30px;
}

.cc-col-head h2 {
  font-size: clamp(1.6rem,2.8vw,2.1rem);
}

.cc-col-head p {
  margin-top: 12px;
  font-size: 1rem;
  color: var(--muted-dark);
}

/* SEARCH */

.cc-tools {
  display: grid;
  grid-template-columns: 1.8fr 1fr 1fr 1.2fr;
  gap: 12px;
}

.cc-field {
  position: relative;
  display: flex;
  align-items: center;
}

.cc-field > svg {
  position: absolute;
  left: 15px;
  color: var(--muted);
  pointer-events: none;
}

.cc-input,
.cc-select {
  width: 100%;
  height: 48px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: #fff;
  font: inherit;
  font-size: .92rem;
  color: var(--navy);
}

.cc-input {
  padding: 0 18px 0 44px;
}

.cc-select {
  padding: 0 18px;
}

.cc-input:focus,
.cc-select:focus {
  outline: none;
  border-color: var(--brand);
  box-shadow: 0 0 0 4px rgba(36,120,252,.14);
}

.cc-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 22px 0 18px;
}

.cc-count {
  font-size: .9rem;
  font-weight: 700;
  color: var(--muted-dark);
}

.cc-link-btn {
  background: none;
  border: 0;
  font: inherit;
  font-weight: 700;
  color: var(--brand);
  cursor: pointer;
}

/* COLLEGE CARDS */

.cc-grid {
  display: grid;
  grid-template-columns: repeat(3,minmax(0,1fr));
  gap: 24px;
}

.cc-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 38px;
  padding-bottom: 10px;
}

.cc-page-numbers {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cc-page-dots {
  min-width: 24px;
  text-align: center;
  color: var(--muted);
  font-weight: 700;
}

.cc-page-btn {
  min-width: 42px;
  height: 42px;
  padding: 0 14px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: #fff;
  color: var(--navy);
  font-size: .9rem;
  font-weight: 700;
  cursor: pointer;
  transition: .2s ease;
}

.cc-page-btn:hover:not(:disabled) {
  border-color: var(--brand);
  color: var(--brand);
  background: var(--blue-25);
}

.cc-page-active {
  background: var(--brand);
  border-color: var(--brand);
  color: #fff;
  box-shadow: var(--shadow-brand);
}

.cc-page-active:hover {
  background: var(--brand-dark);
  color: #fff;
}

.cc-page-arrow {
  min-width: 90px;
}

.cc-page-btn:disabled {
  opacity: .45;
  cursor: not-allowed;
}

.cc-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: .25s ease;
}

.cc-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: #cfe2fb;
}

.cc-card-media {
  position: relative;
  height: 195px;
  background: linear-gradient(135deg,#0b3a6f,#2f7de1);
}

.cc-card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cc-card-type {
  position: absolute;
  top: 14px;
  left: 14px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(6,31,58,.82);
  color: #fff;
  font-size: .73rem;
  font-weight: 700;
}

.cc-card-rating {
  position: absolute;
  right: 14px;
  bottom: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 13px;
  border-radius: 999px;
  background: #fff;
  color: var(--navy);
  font-size: .82rem;
  font-weight: 800;
  box-shadow: var(--shadow-md);
}

.cc-card-rating svg {
  color: var(--warning);
}

.cc-card-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  flex: 1;
}

.cc-card-title {
  font-size: 1.1rem;
}

.cc-card-loc {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: .88rem;
  color: var(--muted-dark);
}

.cc-card-loc svg {
  color: var(--brand);
}

.cc-card-fact {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: .88rem;
}

.cc-card-fact span {
  color: var(--muted);
}

.cc-card-fact strong {
  color: var(--navy);
}

.cc-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: auto;
}

.cc-tag {
  padding: 6px 10px;
  border-radius: 999px;
  background: var(--blue-25);
  border: 1px solid #d5e6fb;
  color: var(--deep);
  font-size: .75rem;
  font-weight: 600;
}

.cc-card-foot {
  padding: 18px 20px 20px;
}

/* LOADING */

.cc-state {
  display: grid;
  place-items: center;
  gap: 12px;
  padding: 58px 24px;
  text-align: center;
  border: 1px dashed var(--border);
  border-radius: var(--radius-lg);
  background: #fff;
}

.cc-spinner {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 3px solid #dbeafe;
  border-top-color: var(--brand);
  animation: ccSpin .8s linear infinite;
}

@keyframes ccSpin {
  to {
    transform: rotate(360deg);
  }
}

/* =========================================================
   DETAILS MODAL
========================================================= */

.cc-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 120;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(6,31,58,.65);
}

.cc-modal {
  position: relative;
  width: min(1050px,100%);
  max-height: 92vh;
  overflow: auto;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 30px 80px rgba(0,0,0,.25);
}

.cc-modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 5;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: #fff;
  color: var(--navy);
  cursor: pointer;
}

.cc-modal-close:hover {
  color: var(--brand);
  border-color: var(--brand);
}

.cc-modal-hero {
  position: relative;
  height: 280px;
  background: linear-gradient(135deg,#0b3a6f,#2f7de1);
}

.cc-modal-hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cc-modal-hero-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  padding: 30px;
  background: linear-gradient(transparent,rgba(0,0,0,.72));
}

.cc-modal-hero-overlay h2 {
  color: #fff;
  font-size: clamp(1.5rem,3vw,2.2rem);
  max-width: 800px;
}

.cc-modal-content {
  padding: 30px;
}

.cc-detail-section {
  margin-top: 26px;
  border: 1px solid var(--border);
  border-radius: 18px;
  overflow: hidden;
  background: #fff;
}

.cc-detail-section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 17px 20px;
  background: #f8fbff;
  border-bottom: 1px solid var(--border);
  color: var(--navy);
  font-size: 1rem;
}

.cc-detail-section-title svg {
  color: var(--brand);
}

.cc-detail-section-content {
  padding: 20px;
}

.cc-basic-grid {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 14px;
}

.cc-info-box {
  padding: 15px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: #fff;
}

.cc-info-box span {
  display: block;
  font-size: .74rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: .05em;
  font-weight: 700;
  margin-bottom: 5px;
}

.cc-info-box strong {
  display: block;
  color: var(--navy);
  font-size: .9rem;
  word-break: break-word;
}

.cc-type-grid {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 12px;
}

.cc-type-item {
  padding: 14px;
  border-radius: 14px;
  background: var(--blue-25);
  border: 1px solid #d5e6fb;
}

.cc-type-item span {
  display: block;
  color: var(--muted);
  font-size: .75rem;
}

.cc-type-item strong {
  display: block;
  margin-top: 4px;
  color: var(--deep);
  font-size: .9rem;
}

.cc-course-list {
  display: grid;
  gap: 14px;
}

.cc-course-card {
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
}

.cc-course-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding: 15px 17px;
  background: #f8fbff;
  border-bottom: 1px solid var(--border);
}

.cc-course-header h4 {
  font-size: .95rem;
}

.cc-course-degree {
  padding: 5px 10px;
  border-radius: 999px;
  background: var(--brand);
  color: #fff;
  font-size: .72rem;
  font-weight: 700;
  white-space: nowrap;
}

.cc-course-grid {
  display: grid;
  grid-template-columns: repeat(5,1fr);
}

.cc-course-item {
  padding: 14px;
  border-right: 1px solid var(--border);
}

.cc-course-item:last-child {
  border-right: 0;
}

.cc-course-item span {
  display: block;
  font-size: .7rem;
  color: var(--muted);
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 4px;
}

.cc-course-item strong {
  display: block;
  color: var(--navy);
  font-size: .8rem;
}

.cc-admission-grid {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 14px;
}

.cc-admission-item {
  padding: 17px;
  border: 1px solid var(--border);
  border-radius: 14px;
}

.cc-admission-item span {
  display: block;
  color: var(--brand);
  font-size: .75rem;
  text-transform: uppercase;
  letter-spacing: .05em;
  font-weight: 800;
  margin-bottom: 7px;
}

.cc-admission-item p {
  color: var(--muted-dark);
  font-size: .88rem;
}

.cc-facility-grid {
  display: grid;
  grid-template-columns: repeat(5,1fr);
  gap: 12px;
}

.cc-facility {
  padding: 18px 12px;
  text-align: center;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: #fff;
}

.cc-facility-icon {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  margin: 0 auto 9px;
  border-radius: 12px;
  background: var(--blue-25);
  color: var(--brand);
}

.cc-facility strong {
  display: block;
  color: var(--navy);
  font-size: .8rem;
}

.cc-facility p {
  margin-top: 5px;
  font-size: .74rem;
}

.cc-detail-about {
  margin-top: 25px;
  padding: 20px;
  border-radius: 16px;
  background: #f8fbff;
}

.cc-detail-about h4 {
  font-size: .8rem;
  text-transform: uppercase;
  letter-spacing: .07em;
  margin-bottom: 8px;
}

.cc-detail-about p {
  color: var(--muted-dark);
  font-size: .9rem;
}

.cc-modal-actions {
  display: flex;
  gap: 12px;
  margin-top: 28px;
}

/* RESPONSIVE */

@media (max-width: 1024px) {
  .cc-menu {
    display: none;
  }

  .cc-nav-actions {
    margin-left: auto;
  }

  .cc-burger {
    display: grid;
  }

  .cc-nav-toggle:checked ~ .cc-nav-inner .cc-icon-burger {
    display: none;
  }

  .cc-nav-toggle:checked ~ .cc-nav-inner .cc-icon-close {
    display: block;
  }

  .cc-nav-toggle:checked ~ .cc-mobile {
    display: flex;
  }

  .cc-hero-grid,
  .cc-about {
    grid-template-columns: 1fr;
  }

  .cc-hero-img {
    height: 340px;
  }

  .cc-tools {
    grid-template-columns: 1fr 1fr;
  }

  .cc-grid {
    grid-template-columns: repeat(2,1fr);
  }

  .cc-basic-grid {
    grid-template-columns: repeat(2,1fr);
  }

  .cc-course-grid {
    grid-template-columns: repeat(3,1fr);
  }

  .cc-course-item {
    border-bottom: 1px solid var(--border);
  }

  .cc-facility-grid {
    grid-template-columns: repeat(3,1fr);
  }
}

@media (max-width: 680px) {
  .cc-root {
    font-size: 15px;
  }

  .cc-wrap {
    padding: 0 18px;
  }

  .cc-section {
    padding: 58px 0;
  }

  .cc-hero {
    padding-top: 52px;
  }

  .cc-strip-grid {
    grid-template-columns: 1fr 1fr;
  }

  .cc-hero-actions .cc-btn {
    width: 100%;
  }

  .cc-tools {
    grid-template-columns: 1fr;
  }

  .cc-grid {
    grid-template-columns: 1fr;
  }

  .cc-modal-content {
    padding: 20px;
  }

  .cc-modal-hero {
    height: 210px;
  }

  .cc-basic-grid,
  .cc-type-grid,
  .cc-admission-grid {
    grid-template-columns: 1fr;
  }

  .cc-course-grid {
    grid-template-columns: 1fr 1fr;
  }

  .cc-course-item {
    border-right: 1px solid var(--border);
  }

  .cc-facility-grid {
    grid-template-columns: 1fr 1fr;
  }

  .cc-modal-actions {
    flex-direction: column;
  }

  .cc-pagination {
    gap: 6px;
    flex-wrap: wrap;
  }

  .cc-page-numbers {
    gap: 5px;
  }

  .cc-page-btn {
    min-width: 38px;
    height: 38px;
    padding: 0 10px;
    font-size: .82rem;
  }

  .cc-page-arrow {
    min-width: 75px;
  }
}
`;function si(){let[e,t]=(0,_.useState)(()=>{try{let e=localStorage.getItem(`scp_session`);return e?JSON.parse(e):null}catch{return null}}),n=e=>{try{localStorage.setItem(`scp_session`,JSON.stringify(e))}catch{}t(e)},r=()=>{try{localStorage.removeItem(`scp_session`)}catch{}t(null)},i=e,a=i?.name?i.name.trim().split(/\s+/).slice(0,2).map(e=>e[0]).join(``).toUpperCase():`U`,o=i?.name?.trim().split(/\s+/)[0]||`Student`,[s,c]=(0,_.useState)([]),[l,u]=(0,_.useState)([]),[d,f]=(0,_.useState)(!0),[p,m]=(0,_.useState)(``),[h,g]=(0,_.useState)(``),[v,y]=(0,_.useState)(``),[b,x]=(0,_.useState)(``),[S,ee]=(0,_.useState)(`rating-desc`),[C,w]=(0,_.useState)(null),[te,T]=(0,_.useState)(1);(0,_.useEffect)(()=>{f(!0),m(``);let e=Array.isArray(wr?.colleges)?wr.colleges:[],t=Array.isArray(wr?.courses)?wr.courses:[],n=Array.isArray(wr?.collegeCourses)?wr.collegeCourses:[],r={};n.forEach(e=>{let t=e.collegeId??e.college_id,n=e.courseId??e.course_id;if(t==null||n==null)return;let i=String(t);r[i]||(r[i]=[]),r[i].push(n)}),c(e.map(e=>({...e,courseIds:[...new Set([...Lr(e.courseIds),...r[String(e.id)]||[]])]}))),u(t),f(!1)},[]),(0,_.useEffect)(()=>{let e=e=>{e.key===`Escape`&&w(null)};return window.addEventListener(`keydown`,e),()=>{window.removeEventListener(`keydown`,e)}},[]);let ne=(0,_.useMemo)(()=>{let e={};return l.forEach(t=>{t?.id!==void 0&&(e[String(t.id)]=t)}),e},[l]),E=(0,_.useMemo)(()=>[...new Set(s.map(e=>Hr(e)).filter(Boolean))].sort(),[s]),D=(0,_.useMemo)(()=>[...new Set(s.map(e=>qr(e)).filter(Boolean))].sort(),[s]),re=(0,_.useMemo)(()=>{let e=h.trim().toLowerCase(),t=s.filter(t=>v&&Hr(t)!==v||b&&qr(t)!==b?!1:ii(t,ne,e));return t=[...t],S===`rating-desc`&&t.sort((e,t)=>Yr(t)-Yr(e)),S===`rating-asc`&&t.sort((e,t)=>Yr(e)-Yr(t)),S===`fee-asc`&&t.sort((e,t)=>Ir(Xr(e))-Ir(Xr(t))),S===`fee-desc`&&t.sort((e,t)=>Ir(Xr(t))-Ir(Xr(e))),S===`name-asc`&&t.sort((e,t)=>Vr(e).localeCompare(Vr(t))),t},[s,ne,h,v,b,S]);(0,_.useEffect)(()=>{T(1)},[h,v,b,S]);let ie=Math.ceil(re.length/9),ae=(te-1)*9,oe=re.slice(ae,ae+9),O=e=>{e>=1&&e<=ie&&(T(e),document.getElementById(`colleges`)?.scrollIntoView({behavior:`smooth`,block:`start`}))},se=s.reduce((e,t)=>{let n=Zr(t);return n.length>0?e+n.length:e+Lr(t?.courseIds).length},0),ce=[{value:s.length,label:`Colleges listed`},{value:l.length||`8+`,label:`Courses available`},{value:se||`80+`,label:`Course options`},{value:new Set(s.map(e=>Hr(e)).filter(Boolean)).size,label:`Cities covered`}],le=!!(h||v||b),ue=()=>{g(``),y(``),x(``)},de=C?ri(C,ne):[],fe=C?Qr(C):{},pe=C?$r(C):[],me=C?zr(C.image||C.basicDetails?.image):``;return e?(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(`style`,{children:oi}),(0,N.jsx)(`style`,{children:ci}),(0,N.jsxs)(`div`,{className:`cc-root`,id:`home`,children:[(0,N.jsxs)(`header`,{className:`cc-nav`,children:[(0,N.jsx)(`input`,{type:`checkbox`,id:`cc-nav-toggle`,className:`cc-nav-toggle`}),(0,N.jsxs)(`div`,{className:`cc-wrap cc-nav-inner`,children:[(0,N.jsxs)(`a`,{href:`#home`,className:`cc-logo`,children:[(0,N.jsx)(`span`,{className:`cc-logo-mark`,children:(0,N.jsx)(F,{name:`cap`,size:24})}),(0,N.jsxs)(`span`,{className:`cc-logo-text`,children:[(0,N.jsx)(`strong`,{children:`Student College`}),(0,N.jsx)(`small`,{children:`Student-College Admission Platform`})]})]}),(0,N.jsx)(`nav`,{className:`cc-menu`,children:Fr.map(e=>(0,N.jsx)(`a`,{href:e.href,children:e.label},e.label))}),(0,N.jsxs)(`div`,{className:`cc-nav-actions`,children:[(0,N.jsx)(`a`,{href:`#colleges`,className:`cc-icon-btn`,"aria-label":`Search colleges`,children:(0,N.jsx)(F,{name:`search`,size:18})}),i?(0,N.jsxs)(`div`,{className:`cc-user`,children:[(0,N.jsx)(`span`,{className:`cc-user-avatar`,children:i.picture?(0,N.jsx)(`img`,{src:i.picture,alt:``}):a}),(0,N.jsx)(`span`,{className:`cc-user-name`,children:o}),(0,N.jsx)(`button`,{type:`button`,className:`cc-btn cc-btn-outline cc-btn-sm cc-user-signout`,onClick:r,children:`Sign out`})]}):(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(`a`,{href:`/login`,className:`cc-btn cc-btn-outline cc-btn-sm`,children:`Login`}),(0,N.jsx)(`a`,{href:`/register`,className:`cc-btn cc-btn-primary cc-btn-sm`,children:`Register`})]}),(0,N.jsxs)(`label`,{htmlFor:`cc-nav-toggle`,className:`cc-icon-btn cc-burger`,children:[(0,N.jsx)(`span`,{className:`cc-icon-burger`,children:(0,N.jsx)(F,{name:`menu`,size:20})}),(0,N.jsx)(`span`,{className:`cc-icon-close`,children:(0,N.jsx)(F,{name:`close`,size:20})})]})]})]}),(0,N.jsxs)(`nav`,{className:`cc-mobile`,children:[Fr.map(e=>(0,N.jsx)(`a`,{href:e.href,children:e.label},e.label)),i?(0,N.jsxs)(`div`,{className:`cc-user`,children:[(0,N.jsx)(`span`,{className:`cc-user-avatar`,children:i.picture?(0,N.jsx)(`img`,{src:i.picture,alt:``}):a}),(0,N.jsx)(`span`,{className:`cc-user-name`,children:o}),(0,N.jsx)(`button`,{type:`button`,className:`cc-btn cc-btn-outline cc-btn-block`,onClick:r,children:`Sign out`})]}):(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(`a`,{href:`/login`,className:`cc-btn cc-btn-outline cc-btn-block`,children:`Login`}),(0,N.jsx)(`a`,{href:`/register`,className:`cc-btn cc-btn-primary cc-btn-block`,children:`Register`})]})]})]}),(0,N.jsxs)(`section`,{className:`cc-hero`,children:[(0,N.jsxs)(`div`,{className:`cc-wrap cc-hero-grid`,children:[(0,N.jsxs)(`div`,{children:[(0,N.jsxs)(`span`,{className:`cc-pill`,children:[(0,N.jsx)(F,{name:`sparkle`,size:15}),`Tamil Nadu Engineering Colleges`]}),(0,N.jsxs)(`h1`,{children:[`Find the Right College for `,(0,N.jsx)(`em`,{children:`Your Future`})]}),(0,N.jsx)(`p`,{className:`cc-hero-text`,children:`Explore engineering colleges in Coimbatore, Erode and Salem with courses, fees, eligibility, facilities and important college details in one place.`}),(0,N.jsxs)(`div`,{className:`cc-hero-actions`,children:[(0,N.jsxs)(`a`,{href:`#colleges`,className:`cc-btn cc-btn-primary cc-btn-lg`,children:[`Explore Colleges`,(0,N.jsx)(F,{name:`arrow`,size:18})]}),(0,N.jsx)(`a`,{href:`#colleges`,className:`cc-btn cc-btn-ghost cc-btn-lg`,children:`Compare Colleges`})]}),(0,N.jsxs)(`ul`,{className:`cc-points`,children:[(0,N.jsxs)(`li`,{children:[(0,N.jsx)(F,{name:`check`,size:16}),`Courses & fees`]}),(0,N.jsxs)(`li`,{children:[(0,N.jsx)(F,{name:`check`,size:16}),`College details`]}),(0,N.jsxs)(`li`,{children:[(0,N.jsx)(F,{name:`check`,size:16}),`Facilities`]})]})]}),(0,N.jsxs)(`div`,{className:`cc-hero-visual`,children:[(0,N.jsx)(`div`,{className:`cc-hero-img`,children:(0,N.jsx)(`img`,{src:Ar,alt:`Students on a college campus`})}),(0,N.jsxs)(`div`,{className:`cc-float cc-float-b`,children:[(0,N.jsx)(`span`,{className:`cc-icon-circle`,children:(0,N.jsx)(F,{name:`building`,size:22})}),(0,N.jsxs)(`div`,{children:[(0,N.jsxs)(`strong`,{children:[s.length||`10`,`+`]}),(0,N.jsx)(`small`,{children:`Engineering Colleges`})]})]}),(0,N.jsxs)(`div`,{className:`cc-float cc-float-c`,children:[(0,N.jsx)(`span`,{className:`cc-icon-circle`,children:(0,N.jsx)(F,{name:`book`,size:22})}),(0,N.jsxs)(`div`,{children:[(0,N.jsxs)(`strong`,{children:[l.length||`8`,`+`]}),(0,N.jsx)(`small`,{children:`Courses Available`})]})]})]})]}),(0,N.jsx)(`div`,{className:`cc-strip`,children:(0,N.jsx)(`div`,{className:`cc-wrap cc-strip-grid`,children:ce.map(e=>(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`strong`,{children:e.value}),(0,N.jsx)(`span`,{children:e.label})]},e.label))})})]}),(0,N.jsx)(`section`,{className:`cc-section`,id:`about`,children:(0,N.jsxs)(`div`,{className:`cc-wrap cc-about`,children:[(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`span`,{className:`cc-eyebrow`,children:`About us`}),(0,N.jsx)(`h2`,{children:`Everything you need to choose your college`}),(0,N.jsx)(`p`,{className:`cc-about-text`,children:`Students can explore colleges and view their basic details, institution type, courses, admission information and facilities.`}),(0,N.jsx)(`p`,{className:`cc-about-text`,children:`The college information is fetched from the database, making it easier to search and compare colleges without manually entering information into the frontend.`}),(0,N.jsxs)(`ul`,{className:`cc-about-list`,children:[(0,N.jsxs)(`li`,{children:[(0,N.jsx)(F,{name:`check`,size:18}),`Basic college information`]}),(0,N.jsxs)(`li`,{children:[(0,N.jsx)(F,{name:`check`,size:18}),`Course, eligibility and fee details`]}),(0,N.jsxs)(`li`,{children:[(0,N.jsx)(F,{name:`check`,size:18}),`College information and facilities`]}),(0,N.jsxs)(`li`,{children:[(0,N.jsx)(F,{name:`check`,size:18}),`Hostel, placement and campus facilities`]})]})]}),(0,N.jsx)(`div`,{className:`cc-about-img`,children:(0,N.jsx)(`img`,{src:jr,alt:`College campus`})})]})}),(0,N.jsx)(`section`,{className:`cc-section cc-colleges`,id:`colleges`,children:(0,N.jsxs)(`div`,{className:`cc-wrap`,children:[(0,N.jsxs)(`div`,{className:`cc-col-head`,children:[(0,N.jsx)(`span`,{className:`cc-eyebrow`,children:`College Directory`}),(0,N.jsx)(`h2`,{children:`Explore Engineering Colleges`}),(0,N.jsx)(`p`,{children:`Search colleges and view complete information including basic details, institution type, courses, fees, eligibility and facilities.`})]}),(0,N.jsxs)(`div`,{className:`cc-tools`,children:[(0,N.jsxs)(`div`,{className:`cc-field`,children:[(0,N.jsx)(F,{name:`search`,size:18}),(0,N.jsx)(`input`,{className:`cc-input`,type:`search`,placeholder:`Search college, course, location...`,value:h,onChange:e=>g(e.target.value)})]}),(0,N.jsxs)(`select`,{className:`cc-select`,value:v,onChange:e=>y(e.target.value),children:[(0,N.jsx)(`option`,{value:``,children:`All locations`}),E.map(e=>(0,N.jsx)(`option`,{value:e,children:e},e))]}),(0,N.jsxs)(`select`,{className:`cc-select`,value:b,onChange:e=>x(e.target.value),children:[(0,N.jsx)(`option`,{value:``,children:`All institution types`}),D.map(e=>(0,N.jsx)(`option`,{value:e,children:e},e))]}),(0,N.jsxs)(`select`,{className:`cc-select`,value:S,onChange:e=>ee(e.target.value),children:[(0,N.jsx)(`option`,{value:`rating-desc`,children:`Rating: High to Low`}),(0,N.jsx)(`option`,{value:`rating-asc`,children:`Rating: Low to High`}),(0,N.jsx)(`option`,{value:`fee-asc`,children:`Fees: Low to High`}),(0,N.jsx)(`option`,{value:`fee-desc`,children:`Fees: High to Low`}),(0,N.jsx)(`option`,{value:`name-asc`,children:`Name: A-Z`})]})]}),!d&&!p&&(0,N.jsxs)(`div`,{className:`cc-meta-row`,children:[(0,N.jsxs)(`span`,{className:`cc-count`,children:[`Showing `,re.length,` of `,s.length,` colleges`]}),le&&(0,N.jsx)(`button`,{type:`button`,className:`cc-link-btn`,onClick:ue,children:`Clear filters`})]}),d&&(0,N.jsxs)(`div`,{className:`cc-state`,children:[(0,N.jsx)(`span`,{className:`cc-spinner`}),(0,N.jsx)(`strong`,{children:`Loading colleges...`})]}),!d&&p&&(0,N.jsxs)(`div`,{className:`cc-state`,children:[(0,N.jsx)(F,{name:`close`,size:26}),(0,N.jsx)(`strong`,{children:p}),(0,N.jsx)(`button`,{className:`cc-btn cc-btn-primary cc-btn-sm`,onClick:()=>window.location.reload(),children:`Try Again`})]}),!d&&!p&&re.length===0&&(0,N.jsxs)(`div`,{className:`cc-state`,children:[(0,N.jsx)(F,{name:`search`,size:26}),(0,N.jsx)(`strong`,{children:`No colleges found`}),(0,N.jsx)(`button`,{className:`cc-link-btn`,onClick:ue,children:`Clear filters`})]}),!d&&!p&&re.length>0&&(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(`div`,{className:`cc-grid`,children:oe.map(e=>{let t=Vr(e),n=Hr(e),r=Yr(e),i=zr(e.image),a=ni(e,ne);return(0,N.jsxs)(`article`,{className:`cc-card`,children:[(0,N.jsxs)(`div`,{className:`cc-card-media`,children:[i&&(0,N.jsx)(`img`,{src:i,alt:`${t} campus`,loading:`lazy`,onError:Br}),(0,N.jsx)(`span`,{className:`cc-card-type`,children:qr(e)}),r>0&&(0,N.jsxs)(`span`,{className:`cc-card-rating`,children:[(0,N.jsx)(F,{name:`star`,size:14}),r.toFixed(1)]})]}),(0,N.jsxs)(`div`,{className:`cc-card-body`,children:[(0,N.jsx)(`h3`,{className:`cc-card-title`,children:t}),n&&(0,N.jsxs)(`p`,{className:`cc-card-loc`,children:[(0,N.jsx)(F,{name:`pin`,size:15}),n,`, `,Ur(e)]}),Rr(Xr(e))&&(0,N.jsxs)(`p`,{className:`cc-card-fact`,children:[(0,N.jsx)(`span`,{children:`Starting Fees`}),(0,N.jsx)(`strong`,{children:Rr(Xr(e))})]}),(0,N.jsxs)(`p`,{className:`cc-card-fact`,children:[(0,N.jsx)(`span`,{children:`Institution`}),(0,N.jsx)(`strong`,{children:qr(e)})]}),(0,N.jsxs)(`div`,{className:`cc-card-tags`,children:[a.length===0?(0,N.jsx)(`span`,{className:`cc-tag`,children:`Courses available`}):a.slice(0,2).map((e,t)=>(0,N.jsx)(`span`,{className:`cc-tag`,children:e},`${e}-${t}`)),a.length>2&&(0,N.jsxs)(`span`,{className:`cc-tag`,children:[`+`,a.length-2,` more`]})]})]}),(0,N.jsx)(`div`,{className:`cc-card-foot`,children:(0,N.jsxs)(`button`,{type:`button`,className:`cc-btn cc-btn-primary cc-btn-block`,onClick:()=>w(e),children:[`View Full Details`,(0,N.jsx)(F,{name:`arrow`,size:16})]})})]},e.id)})}),ie>1&&(0,N.jsxs)(`div`,{className:`cc-pagination`,"aria-label":`College pages`,children:[(0,N.jsx)(`button`,{type:`button`,className:`cc-page-btn cc-page-arrow`,disabled:te===1,onClick:()=>O(te-1),children:`Previous`}),(0,N.jsx)(`div`,{className:`cc-page-numbers`,children:ai(te,ie).map(e=>typeof e==`string`?(0,N.jsx)(`span`,{className:`cc-page-dots`,children:`…`},e):(0,N.jsx)(`button`,{type:`button`,className:`cc-page-btn ${te===e?`cc-page-active`:``}`,"aria-current":te===e?`page`:void 0,onClick:()=>O(e),children:e},e))}),(0,N.jsx)(`button`,{type:`button`,className:`cc-page-btn cc-page-arrow`,disabled:te===ie,onClick:()=>O(te+1),children:`Next`})]})]})]})}),C&&(0,N.jsx)(`div`,{className:`cc-modal-backdrop`,onClick:e=>{e.target===e.currentTarget&&w(null)},children:(0,N.jsxs)(`div`,{className:`cc-modal`,role:`dialog`,"aria-modal":`true`,children:[(0,N.jsx)(`button`,{type:`button`,className:`cc-modal-close`,"aria-label":`Close details`,onClick:()=>w(null),children:(0,N.jsx)(F,{name:`close`,size:18})}),me&&(0,N.jsxs)(`div`,{className:`cc-modal-hero`,children:[(0,N.jsx)(`img`,{src:me,alt:`${Vr(C)} campus`,onError:Br}),(0,N.jsx)(`div`,{className:`cc-modal-hero-overlay`,children:(0,N.jsx)(`h2`,{children:Vr(C)})})]}),(0,N.jsxs)(`div`,{className:`cc-modal-content`,children:[!me&&(0,N.jsx)(`h2`,{children:Vr(C)}),(0,N.jsxs)(`section`,{className:`cc-detail-section`,children:[(0,N.jsxs)(`div`,{className:`cc-detail-section-title`,children:[(0,N.jsx)(F,{name:`building`,size:19}),(0,N.jsx)(`strong`,{children:`Basic Details`})]}),(0,N.jsx)(`div`,{className:`cc-detail-section-content`,children:(0,N.jsxs)(`div`,{className:`cc-basic-grid`,children:[(0,N.jsxs)(`div`,{className:`cc-info-box`,children:[(0,N.jsx)(`span`,{children:`Name`}),(0,N.jsx)(`strong`,{children:Vr(C)||`—`})]}),(0,N.jsxs)(`div`,{className:`cc-info-box`,children:[(0,N.jsx)(`span`,{children:`Location`}),(0,N.jsx)(`strong`,{children:Hr(C)||`—`})]}),(0,N.jsxs)(`div`,{className:`cc-info-box`,children:[(0,N.jsx)(`span`,{children:`State`}),(0,N.jsx)(`strong`,{children:Ur(C)||`—`})]}),(0,N.jsxs)(`div`,{className:`cc-info-box`,children:[(0,N.jsx)(`span`,{children:`District`}),(0,N.jsx)(`strong`,{children:Wr(C)||`—`})]}),Gr(C)&&(0,N.jsxs)(`div`,{className:`cc-info-box`,children:[(0,N.jsx)(`span`,{children:`Official Website`}),(0,N.jsx)(`strong`,{children:Gr(C)})]}),Kr(C)&&(0,N.jsxs)(`div`,{className:`cc-info-box`,children:[(0,N.jsx)(`span`,{children:`Contact`}),(0,N.jsx)(`strong`,{children:Kr(C)})]})]})})]}),(0,N.jsxs)(`section`,{className:`cc-detail-section`,children:[(0,N.jsxs)(`div`,{className:`cc-detail-section-title`,children:[(0,N.jsx)(F,{name:`grid`,size:19}),(0,N.jsx)(`strong`,{children:`Institution Type`})]}),(0,N.jsx)(`div`,{className:`cc-detail-section-content`,children:(0,N.jsxs)(`div`,{className:`cc-type-grid`,children:[(0,N.jsxs)(`div`,{className:`cc-type-item`,children:[(0,N.jsx)(`span`,{children:`Category`}),(0,N.jsx)(`strong`,{children:qr(C)})]}),Jr(C)&&(0,N.jsxs)(`div`,{className:`cc-type-item`,children:[(0,N.jsx)(`span`,{children:`Affiliation`}),(0,N.jsx)(`strong`,{children:Jr(C)})]}),typeof C.autonomous==`boolean`&&(0,N.jsxs)(`div`,{className:`cc-type-item`,children:[(0,N.jsx)(`span`,{children:`Autonomous`}),(0,N.jsxs)(`strong`,{children:[C.autonomous?`Yes`:`No`,I(C.autonomyNote)?` · ${I(C.autonomyNote)}`:``]})]})]})})]}),de.length>0&&(0,N.jsxs)(`section`,{className:`cc-detail-section`,children:[(0,N.jsxs)(`div`,{className:`cc-detail-section-title`,children:[(0,N.jsx)(F,{name:`book`,size:19}),(0,N.jsx)(`strong`,{children:`Courses`})]}),(0,N.jsx)(`div`,{className:`cc-detail-section-content`,children:(0,N.jsx)(`div`,{className:`cc-course-list`,children:de.map((e,t)=>{let n=I(e.courseName||e.name||e.title)||`Engineering Course`,r=I(e.degree)||`B.E / B.Tech`,i=I(e.duration)||`4 Years`,a=I(e.eligibility)||I(C.eligibility)||`12th with PCM`,o=I(e.entranceExam)||I(e.entrance)||`TNEA`,s=e.fees,c=(typeof s==`number`||s!==``&&s!=null&&!Number.isNaN(Number(s))?Rr(s):I(s))||Rr(Xr(C))||`Contact college`;return(0,N.jsxs)(`div`,{className:`cc-course-card`,children:[(0,N.jsxs)(`div`,{className:`cc-course-header`,children:[(0,N.jsx)(`h4`,{children:n}),(0,N.jsx)(`span`,{className:`cc-course-degree`,children:r})]}),(0,N.jsxs)(`div`,{className:`cc-course-grid`,children:[(0,N.jsxs)(`div`,{className:`cc-course-item`,children:[(0,N.jsx)(`span`,{children:`Degree`}),(0,N.jsx)(`strong`,{children:r})]}),(0,N.jsxs)(`div`,{className:`cc-course-item`,children:[(0,N.jsx)(`span`,{children:`Duration`}),(0,N.jsx)(`strong`,{children:i})]}),(0,N.jsxs)(`div`,{className:`cc-course-item`,children:[(0,N.jsx)(`span`,{children:`Eligibility`}),(0,N.jsx)(`strong`,{children:a})]}),(0,N.jsxs)(`div`,{className:`cc-course-item`,children:[(0,N.jsx)(`span`,{children:`Entrance Exam`}),(0,N.jsx)(`strong`,{children:o})]}),(0,N.jsxs)(`div`,{className:`cc-course-item`,children:[(0,N.jsx)(`span`,{children:`Fees`}),(0,N.jsx)(`strong`,{children:c})]})]})]},`${n}-${t}`)})})})]}),(0,N.jsxs)(`section`,{className:`cc-detail-section`,children:[(0,N.jsxs)(`div`,{className:`cc-detail-section-title`,children:[(0,N.jsx)(F,{name:`building`,size:19}),(0,N.jsx)(`strong`,{children:`Facilities`})]}),(0,N.jsx)(`div`,{className:`cc-detail-section-content`,children:(0,N.jsxs)(`div`,{className:`cc-facility-grid`,children:[pe.map(e=>(0,N.jsxs)(`div`,{className:`cc-facility`,children:[(0,N.jsx)(`div`,{className:`cc-facility-icon`,children:(0,N.jsx)(F,{name:`check`,size:19})}),(0,N.jsx)(`strong`,{children:e})]},e)),I(fe.hostel)&&(0,N.jsxs)(`div`,{className:`cc-facility`,children:[(0,N.jsx)(`div`,{className:`cc-facility-icon`,children:(0,N.jsx)(F,{name:`building`,size:19})}),(0,N.jsx)(`strong`,{children:`Hostel`}),(0,N.jsx)(`p`,{children:I(fe.hostel)})]}),I(fe.placement)&&(0,N.jsxs)(`div`,{className:`cc-facility`,children:[(0,N.jsx)(`div`,{className:`cc-facility-icon`,children:(0,N.jsx)(F,{name:`star`,size:19})}),(0,N.jsx)(`strong`,{children:`Placement`}),(0,N.jsx)(`p`,{children:I(fe.placement)})]}),I(fe.scholarship)&&(0,N.jsxs)(`div`,{className:`cc-facility`,children:[(0,N.jsx)(`div`,{className:`cc-facility-icon`,children:(0,N.jsx)(F,{name:`check`,size:19})}),(0,N.jsx)(`strong`,{children:`Scholarship`}),(0,N.jsx)(`p`,{children:I(fe.scholarship)})]}),I(fe.transport)&&(0,N.jsxs)(`div`,{className:`cc-facility`,children:[(0,N.jsx)(`div`,{className:`cc-facility-icon`,children:(0,N.jsx)(F,{name:`pin`,size:19})}),(0,N.jsx)(`strong`,{children:`Transport`}),(0,N.jsx)(`p`,{children:I(fe.transport)})]}),I(fe.infrastructure)&&(0,N.jsxs)(`div`,{className:`cc-facility`,children:[(0,N.jsx)(`div`,{className:`cc-facility-icon`,children:(0,N.jsx)(F,{name:`grid`,size:19})}),(0,N.jsx)(`strong`,{children:`Infrastructure`}),(0,N.jsx)(`p`,{children:I(fe.infrastructure)})]})]})})]}),I(C.about)&&(0,N.jsxs)(`div`,{className:`cc-detail-about`,children:[(0,N.jsx)(`h4`,{children:`About`}),(0,N.jsx)(`p`,{children:I(C.about)})]}),(0,N.jsxs)(`div`,{className:`cc-modal-actions`,children:[(0,N.jsx)(`button`,{type:`button`,className:`cc-btn cc-btn-ghost`,onClick:()=>w(null),children:`Close`}),Gr(C)&&(0,N.jsx)(`a`,{href:Gr(C).startsWith(`http`)?Gr(C):`https://${Gr(C)}`,target:`_blank`,rel:`noreferrer`,className:`cc-btn cc-btn-primary`,children:`Visit Website`})]})]})]})})]})]}):(0,N.jsx)(N.Fragment,{children:kr?(0,N.jsx)(kr,{users:Array.isArray(wr?.users)?wr.users:[],onSuccess:n}):(0,N.jsx)(Mr,{users:Array.isArray(wr?.users)?wr.users:[],onSuccess:n})})}var ci=`
.cc-user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 6px;
}

.cc-user-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #7c3aed, #4f46e5);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  overflow: hidden;
  flex: 0 0 auto;
}

.cc-user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cc-user-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-h, #08060d);
  max-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cc-user-signout {
  margin-left: 2px;
}

.cc-mobile .cc-user {
  gap: 12px;
  margin-bottom: 4px;
}

.cc-mobile .cc-user-name {
  flex: 1;
  font-size: 15px;
}
`;function li(){let e=`/student-college-platform/`.replace(/\/$/,``);return(0,N.jsx)(An,{basename:e,children:(0,N.jsxs)(Kt,{children:[(0,N.jsx)(Wt,{path:`/`,element:(0,N.jsx)(Ut,{to:`/student/dashboard`,replace:!0})}),(0,N.jsx)(Wt,{path:`/admin/dashboard`,element:(0,N.jsx)(rr,{})}),(0,N.jsx)(Wt,{path:`/admin/student-management`,element:(0,N.jsx)(qn,{})}),(0,N.jsx)(Wt,{path:`/admin/college-management`,element:(0,N.jsx)(Sr,{})}),(0,N.jsx)(Wt,{path:`/student/dashboard`,element:(0,N.jsx)(si,{})})]})})}function ui(){return(0,N.jsx)(li,{})}(0,v.createRoot)(document.getElementById(`root`)).render((0,N.jsx)(_.StrictMode,{children:(0,N.jsx)(ui,{})}));