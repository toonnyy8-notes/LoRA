import{d as _,u as d,a as u,c as m,b as h,r as p,e as s,f as t,t as a,g as l,F as f,h as g,n as v,i as x,o as n,j as y,k as b,l as k,m as N,_ as w}from"./index-Jt7ceGSq.js";import{N as L}from"./NoteDisplay-grUWa7mq.js";const P={class:"m-4"},V={class:"mb-10"},S={class:"text-4xl font-bold mt-2"},T={class:"opacity-50"},A={class:"text-lg"},B={class:"font-bold flex gap-2"},D={class:"opacity-50"},H=t("div",{class:"flex-auto"},null,-1),R={key:0,class:"border-gray-400/50 mb-8"},j=_({__name:"PresenterPrint",setup(z){d(`
@page {
  size: A4;
  margin-top: 1.5cm;
  margin-bottom: 1cm;
}
* {
  -webkit-print-color-adjust: exact;
}
html,
html body,
html #app,
html #page-root {
  height: auto;
  overflow: auto !important;
}
`),u({title:`Notes - ${m.title}`});const i=h(()=>p.map(o=>{var r;return(r=o.meta)==null?void 0:r.slide}).filter(o=>o!==void 0&&o.noteHTML!==""));return(o,r)=>(n(),s("div",{id:"page-root",style:v(l(x))},[t("div",P,[t("div",V,[t("h1",S,a(l(m).title),1),t("div",T,a(new Date().toLocaleString()),1)]),(n(!0),s(f,null,g(i.value,(e,c)=>(n(),s("div",{key:c,class:"flex flex-col gap-4 break-inside-avoid-page"},[t("div",null,[t("h2",A,[t("div",B,[t("div",D,a(e==null?void 0:e.no)+"/"+a(l(y)),1),b(" "+a(e==null?void 0:e.title)+" ",1),H])]),k(L,{"note-html":e.noteHTML,class:"max-w-full"},null,8,["note-html"])]),c<i.value.length-1?(n(),s("hr",R)):N("v-if",!0)]))),128))])],4))}}),M=w(j,[["__file","/home/runner/work/LoRA/LoRA/node_modules/@slidev/client/internals/PresenterPrint.vue"]]);export{M as default};
