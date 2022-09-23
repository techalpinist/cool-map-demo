(()=>{"use strict";var e;!function(e){e.LOADED="inject.loaded",e.SETUP="inject.setup",e.RESOLVE="inject.resolve"}(e||(e={}));class DictArray{constructor(){this.values={}}add(e,s){this.getValuesAtKey(e).push(s)}remove(e,s){const t=this.values[e];if(t){const e=t.indexOf(s);e>-1&&t.splice(e,1)}}removeKey(e){delete this.values[e]}getValuesAtKey(e){const s=this.values[e]||[];return this.values[e]=s,s}valuesPerKey(e){return this.getValuesAtKey(e).length}find(e,s){return this.values[e]&&this.values[e].find(s)}get keys(){return Object.keys(this.values)}hasKey(e){return e in this.values}has(e,s){return this.hasKey(e)&&this.values[e].includes(s)}*[Symbol.iterator](){for(const e in this.values)for(const s of this.values[e])yield[e,s]}}class SimplePostMessage{constructor(e,s,t){this.sourceId=e,this.targetId=s,this.target=t,this.messageHandlers=new DictArray,this.onMessage=e=>{const{type:s,fromId:t,toId:n}=e.data;if(t!==this.targetId||n!==this.sourceId)return;const a=this.messageHandlers.getValuesAtKey(s);for(const s of a)s(...e.data.payload)},window.addEventListener("message",this.onMessage)}updateTarget(e){this.target=e}facade(){const e=this;return new class PostMessageFacade{dispose(){e.dispose()}on(s,t){e.on(s,t)}off(s,t){e.off(s,t)}send(s,...t){e.send(s,...t)}}}dispose(){window.removeEventListener("message",this.onMessage),this.messageHandlers=new DictArray}on(e,s){this.messageHandlers.add(e,s)}off(e,s){this.messageHandlers.remove(e,s)}send(e,...s){this.target.postMessage({toId:this.targetId,fromId:this.sourceId,type:e,payload:s},"*")}}function s(e,s,t){for(;s.childNodes.length;){const n=s.childNodes[0];if("SCRIPT"===n.nodeName){const e=document.createElement("script"),a=n;a.src?e.setAttribute("src",a.src):e.innerHTML=a.innerHTML||"",s.removeChild(n),t.push(e)}else e.append(n)}}window.addEventListener("message",(function t(n){if(n.source===window.parent&&n.data.type===e.SETUP){const a=n.data.windowPath,o=Function("return window.parent"+a)();window.removeEventListener("message",t),function(e,s){const t=new SimplePostMessage(e.id,e.targetId,s).facade(),n=e.messageFcnMapping;window[n.send]=(e,...s)=>t.send(e,...s),window[n.on]=(e,s)=>t.on(e,s),window[n.off]=(e,s)=>t.off(e,s)}(n.data,o);const i=(new DOMParser).parseFromString(n.data.customHTML,"text/html"),d=[];s(document.head,i.head,d),s(document.body,i.body,d),function e(s){const t=s[0];t&&(t.onload=function(){s.shift(),e(s)},document.head.appendChild(t))}(d),o.postMessage({type:e.RESOLVE,fromId:n.data.id,toId:n.data.targetId},"*")}}))})();