import{d as m,r as c,am as P,an as k,ao as d,ap as h,aq as K,J as y,ar as D,as as g,o as w,b as C,at as M,au as H,av as L,aw as I,ax as $,ay as v}from"./C2B0ufkW.js";var N=(l=>(l[l.Open=0]="Open",l[l.Closed=1]="Closed",l))(N||{});let E=Symbol("DisclosureContext");function O(l){let o=$(E,null);if(o===null){let r=new Error(`<${l} /> is missing a parent <Disclosure /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,O),r}return o}let x=Symbol("DisclosurePanelContext");function U(){return $(x,null)}let A=m({name:"Disclosure",props:{as:{type:[Object,String],default:"template"},defaultOpen:{type:[Boolean],default:!1}},setup(l,{slots:o,attrs:r}){let n=c(l.defaultOpen?0:1),e=c(null),i=c(null),s={buttonId:c(`headlessui-disclosure-button-${P()}`),panelId:c(`headlessui-disclosure-panel-${P()}`),disclosureState:n,panel:e,button:i,toggleDisclosure(){n.value=k(n.value,{0:1,1:0})},closeDisclosure(){n.value!==1&&(n.value=1)},close(t){s.closeDisclosure();let u=t?t instanceof HTMLElement?t:t.value instanceof HTMLElement?d(t):d(s.button):d(s.button);u==null||u.focus()}};return h(E,s),K(y(()=>k(n.value,{0:D.Open,1:D.Closed}))),()=>{let{defaultOpen:t,...u}=l,p={open:n.value===0,close:s.close};return g({theirProps:u,ourProps:{},slot:p,slots:o,attrs:r,name:"Disclosure"})}}}),J=m({name:"DisclosureButton",props:{as:{type:[Object,String],default:"button"},disabled:{type:[Boolean],default:!1},id:{type:String,default:null}},setup(l,{attrs:o,slots:r,expose:n}){let e=O("DisclosureButton"),i=U(),s=y(()=>i===null?!1:i.value===e.panelId.value);w(()=>{s.value||l.id!==null&&(e.buttonId.value=l.id)}),C(()=>{s.value||(e.buttonId.value=null)});let t=c(null);n({el:t,$el:t}),s.value||M(()=>{e.button.value=t.value});let u=H(y(()=>({as:l.as,type:o.type})),t);function p(){var a;l.disabled||(s.value?(e.toggleDisclosure(),(a=d(e.button))==null||a.focus()):e.toggleDisclosure())}function f(a){var b;if(!l.disabled)if(s.value)switch(a.key){case v.Space:case v.Enter:a.preventDefault(),a.stopPropagation(),e.toggleDisclosure(),(b=d(e.button))==null||b.focus();break}else switch(a.key){case v.Space:case v.Enter:a.preventDefault(),a.stopPropagation(),e.toggleDisclosure();break}}function S(a){switch(a.key){case v.Space:a.preventDefault();break}}return()=>{var a;let b={open:e.disclosureState.value===0},{id:B,...T}=l,j=s.value?{ref:t,type:u.value,onClick:p,onKeydown:f}:{id:(a=e.buttonId.value)!=null?a:B,ref:t,type:u.value,"aria-expanded":e.disclosureState.value===0,"aria-controls":e.disclosureState.value===0||d(e.panel)?e.panelId.value:void 0,disabled:l.disabled?!0:void 0,onClick:p,onKeydown:f,onKeyup:S};return g({ourProps:j,theirProps:T,slot:b,attrs:o,slots:r,name:"DisclosureButton"})}}}),Q=m({name:"DisclosurePanel",props:{as:{type:[Object,String],default:"div"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0},id:{type:String,default:null}},setup(l,{attrs:o,slots:r,expose:n}){let e=O("DisclosurePanel");w(()=>{l.id!==null&&(e.panelId.value=l.id)}),C(()=>{e.panelId.value=null}),n({el:e.panel,$el:e.panel}),h(x,e.panelId);let i=L(),s=y(()=>i!==null?(i.value&D.Open)===D.Open:e.disclosureState.value===0);return()=>{var t;let u={open:e.disclosureState.value===0,close:e.close},{id:p,...f}=l,S={id:(t=e.panelId.value)!=null?t:p,ref:e.panel};return g({ourProps:S,theirProps:f,slot:u,attrs:o,slots:r,features:I.RenderStrategy|I.Static,visible:s.value,name:"DisclosurePanel"})}}});export{A as N,J as Q,Q as V};
