var l=Object.create;var u=Object.defineProperty,y=Object.defineProperties,N=Object.getOwnPropertyDescriptor,B=Object.getOwnPropertyDescriptors,E=Object.getOwnPropertyNames,c=Object.getOwnPropertySymbols,k=Object.getPrototypeOf,p=Object.prototype.hasOwnProperty,d=Object.prototype.propertyIsEnumerable,$=Reflect.get;var w=(r,e)=>(e=Symbol[r])?e:Symbol.for("Symbol."+r),g=r=>{throw TypeError(r)};var M=(r,e,a)=>e in r?u(r,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):r[e]=a,S=(r,e)=>{for(var a in e||={})p.call(e,a)&&M(r,a,e[a]);if(c)for(var a of c(e))d.call(e,a)&&M(r,a,e[a]);return r},x=(r,e)=>y(r,B(e));var b=(r,e)=>{var a={};for(var t in r)p.call(r,t)&&e.indexOf(t)<0&&(a[t]=r[t]);if(r!=null&&c)for(var t of c(r))e.indexOf(t)<0&&d.call(r,t)&&(a[t]=r[t]);return a};var j=(r,e)=>()=>(e||r((e={exports:{}}).exports,e),e.exports),q=(r,e)=>{for(var a in e)u(r,a,{get:e[a],enumerable:!0})},P=(r,e,a,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of E(e))!p.call(r,s)&&s!==a&&u(r,s,{get:()=>e[s],enumerable:!(t=N(e,s))||t.enumerable});return r};var v=(r,e,a)=>(a=r!=null?l(k(r)):{},P(e||!r||!r.__esModule?u(a,"default",{value:r,enumerable:!0}):a,r));var z=(r,e,a)=>$(k(r),a,e);var A=(r,e,a)=>new Promise((t,s)=>{var n=o=>{try{i(a.next(o))}catch(f){s(f)}},m=o=>{try{i(a.throw(o))}catch(f){s(f)}},i=o=>o.done?t(o.value):Promise.resolve(o.value).then(n,m);i((a=a.apply(r,e)).next())}),F=function(r,e){this[0]=r,this[1]=e};var C=r=>{var e=r[w("asyncIterator")],a=!1,t,s={};return e==null?(e=r[w("iterator")](),t=n=>s[n]=m=>e[n](m)):(e=e.call(r),t=n=>s[n]=m=>{if(a){if(a=!1,n==="throw")throw m;return m}return a=!0,{done:!1,value:new F(new Promise(i=>{var o=e[n](m);o instanceof Object||g("Object expected"),i(o)}),1)}}),s[w("iterator")]=()=>s,t("next"),"throw"in e?t("throw"):s.throw=n=>{throw n},"return"in e&&t("return"),s};var h=class r{constructor(e,a){this.correlationId=a,this.measureName=r.makeMeasureName(e,a),this.startMark=r.makeStartMark(e,a),this.endMark=r.makeEndMark(e,a)}static makeMeasureName(e,a){return`msal.measure.${e}.${a}`}static makeStartMark(e,a){return`msal.start.${e}.${a}`}static makeEndMark(e,a){return`msal.end.${e}.${a}`}static supportsBrowserPerformance(){return typeof window<"u"&&typeof window.performance<"u"&&typeof window.performance.mark=="function"&&typeof window.performance.measure=="function"&&typeof window.performance.clearMarks=="function"&&typeof window.performance.clearMeasures=="function"&&typeof window.performance.getEntriesByName=="function"}static flushMeasurements(e,a){if(r.supportsBrowserPerformance())try{a.forEach(t=>{let s=r.makeMeasureName(t.name,e);window.performance.getEntriesByName(s,"measure").length>0&&(window.performance.clearMeasures(s),window.performance.clearMarks(r.makeStartMark(s,e)),window.performance.clearMarks(r.makeEndMark(s,e)))})}catch{}}startMeasurement(){if(r.supportsBrowserPerformance())try{window.performance.mark(this.startMark)}catch{}}endMeasurement(){if(r.supportsBrowserPerformance())try{window.performance.mark(this.endMark),window.performance.measure(this.measureName,this.startMark,this.endMark)}catch{}}flushMeasurement(){if(r.supportsBrowserPerformance())try{let e=window.performance.getEntriesByName(this.measureName,"measure");if(e.length>0){let a=e[0].duration;return window.performance.clearMeasures(this.measureName),window.performance.clearMarks(this.startMark),window.performance.clearMarks(this.endMark),a}}catch{}return null}};export{S as a,x as b,b as c,j as d,q as e,v as f,z as g,A as h,C as i,h as j};
