import{d as w,M as C,N as B,O as I,r as v,J as S,aA as N,c as s,e as o,f as d,n as l,R as e,F as f,Y as y,S as g,h as U,t as A,ae as D,af as z,al as F,U as O,W as R}from"./C2B0ufkW.js";const V=["onClick"],E=w({inheritAttrs:!1,__name:"Tabs",props:{selectedIndex:{type:Number,default:0},class:{type:[String,Object,Array],default:void 0}},setup(h){const x={wrapper:"relative my-5 space-y-6",header:"flex items-center relative overflow-x-auto",border:"absolute bottom-0 inset-x-0 w-full h-px bg-gray-200 dark:bg-gray-800",tab:{base:"px-4 py-2.5 font-semibold text-sm/6 flex items-center gap-1.5 border-b z-[1] focus-visible:outline-primary",active:"text-primary border-primary",inactive:"text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border-transparent hover:border-gray-300 dark:hover:border-gray-700",icon:{base:"w-5 h-5 flex-shrink-0"}}},m=h,i=C(),{ui:r,attrs:_}=B("content.tabs",void 0,x,I(m,"class"),!0),p=v(m.selectedIndex||0),k=v(1),b=S(()=>{var u;return((u=i.default)==null?void 0:u.call(i).map((n,c)=>{var t,a;return{index:c,label:((t=n.props)==null?void 0:t.label)||`${c}`,icon:(a=n.props)==null?void 0:a.icon,component:n}}))||[]});return N(()=>{k.value+=1}),(u,n)=>{const c=R;return s(),o("div",O({class:e(r).wrapper},e(_)),[d("div",{class:l(e(r).header)},[d("div",{class:l(e(r).border)},null,2),(s(!0),o(f,null,y(e(b),(t,a)=>(s(),o("button",{key:a,class:l([e(r).tab.base,e(p)===a?e(r).tab.active:e(r).tab.inactive]),onClick:$=>p.value=a},[t.icon?(s(),g(c,{key:0,name:t.icon,class:l(e(r).tab.icon.base)},null,8,["name","class"])):U("",!0),d("span",null,A(t.label),1)],10,V))),128))],2),(s(!0),o(f,null,y(e(b),(t,a)=>D((s(),o("div",{key:a},[(s(),g(F(t.component)))])),[[z,e(p)===a]])),128))],16)}}});export{E as default};
