import{b as Y,e as Z,i as $,n as ee,q as te,r as ie}from"./chunk-CEHL2J6C.js";import{l as K,m as Q,n as X}from"./chunk-XMN23RCM.js";import{c as F,d as S,e as r,f as w}from"./chunk-372N4BOW.js";import{Ja as N,Pa as D,g as b,s as J}from"./chunk-ZOWDSB7W.js";import{$a as g,$b as q,Db as O,Ib as R,Jb as y,Ka as s,Kb as v,Lb as C,M as f,N as u,P as m,R as o,W as _,Wb as M,X as B,Xb as T,Zb as k,_a as a,ac as W,bc as U,db as h,eb as I,ec as x,la as c,pb as A,qb as P,tb as H,ub as d,vb as l,wb as E,wc as G,xc as p}from"./chunk-CRJKYNOU.js";var ne=`
    .p-iconfield {
        position: relative;
        display: block;
    }

    .p-inputicon {
        position: absolute;
        top: 50%;
        margin-top: calc(-1 * (dt('icon.size') / 2));
        color: dt('iconfield.icon.color');
        line-height: 1;
        z-index: 1;
    }

    .p-iconfield .p-inputicon:first-child {
        inset-inline-start: dt('form.field.padding.x');
    }

    .p-iconfield .p-inputicon:last-child {
        inset-inline-end: dt('form.field.padding.x');
    }

    .p-iconfield .p-inputtext:not(:first-child),
    .p-iconfield .p-inputwrapper:not(:first-child) .p-inputtext {
        padding-inline-start: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-iconfield .p-inputtext:not(:last-child) {
        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-iconfield:has(.p-inputfield-sm) .p-inputicon {
        font-size: dt('form.field.sm.font.size');
        width: dt('form.field.sm.font.size');
        height: dt('form.field.sm.font.size');
        margin-top: calc(-1 * (dt('form.field.sm.font.size') / 2));
    }

    .p-iconfield:has(.p-inputfield-lg) .p-inputicon {
        font-size: dt('form.field.lg.font.size');
        width: dt('form.field.lg.font.size');
        height: dt('form.field.lg.font.size');
        margin-top: calc(-1 * (dt('form.field.lg.font.size') / 2));
    }
`;var ue=["*"],me={root:({instance:e})=>["p-iconfield",{"p-iconfield-left":e.iconPosition=="left","p-iconfield-right":e.iconPosition=="right"}]},oe=(()=>{class e extends D{name="iconfield";style=ne;classes=me;static \u0275fac=(()=>{let t;return function(n){return(t||(t=c(e)))(n||e)}})();static \u0275prov=f({token:e,factory:e.\u0275fac})}return e})();var re=new m("ICONFIELD_INSTANCE"),j=(()=>{class e extends S{componentName="IconField";hostName="";_componentStyle=o(oe);$pcIconField=o(re,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=o(r,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}iconPosition="left";styleClass;static \u0275fac=(()=>{let t;return function(n){return(t||(t=c(e)))(n||e)}})();static \u0275cmp=a({type:e,selectors:[["p-iconfield"],["p-iconField"],["p-icon-field"]],hostVars:2,hostBindings:function(i,n){i&2&&M(n.cn(n.cx("root"),n.styleClass))},inputs:{hostName:"hostName",iconPosition:"iconPosition",styleClass:"styleClass"},features:[x([oe,{provide:re,useExisting:e},{provide:F,useExisting:e}]),h([r]),I],ngContentSelectors:ue,decls:1,vars:0,template:function(i,n){i&1&&(v(),C(0))},dependencies:[b,w],encapsulation:2,changeDetection:0})}return e})(),se=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=g({type:e});static \u0275inj=u({imports:[j]})}return e})();var he=["*"],Ie={root:"p-inputicon"},ae=(()=>{class e extends D{name="inputicon";classes=Ie;static \u0275fac=(()=>{let t;return function(n){return(t||(t=c(e)))(n||e)}})();static \u0275prov=f({token:e,factory:e.\u0275fac})}return e})(),de=new m("INPUTICON_INSTANCE"),V=(()=>{class e extends S{componentName="InputIcon";hostName="";styleClass;_componentStyle=o(ae);$pcInputIcon=o(de,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=o(r,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}static \u0275fac=(()=>{let t;return function(n){return(t||(t=c(e)))(n||e)}})();static \u0275cmp=a({type:e,selectors:[["p-inputicon"],["p-inputIcon"]],hostVars:2,hostBindings:function(i,n){i&2&&M(n.cn(n.cx("root"),n.styleClass))},inputs:{hostName:"hostName",styleClass:"styleClass"},features:[x([ae,{provide:de,useExisting:e},{provide:F,useExisting:e}]),h([r]),I],ngContentSelectors:he,decls:1,vars:0,template:function(i,n){i&1&&(v(),C(0))},dependencies:[b,N,w],encapsulation:2,changeDetection:0})}return e})(),le=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=g({type:e});static \u0275inj=u({imports:[V,N,N]})}return e})();function ve(e,L){if(e&1){let t=O();d(0,"div",5)(1,"p-iconfield",6),E(2,"p-inputicon",7),d(3,"input",8),U("ngModelChange",function(n){_(t);let z=y();return W(z.searchValue,n)||(z.searchValue=n),B(n)}),l()(),d(4,"p-button",9),R("click",function(){_(t);let n=y();return B(n.onSearch())}),l()()}if(e&2){let t=y();s(3),q("ngModel",t.searchValue)}}var pe=class e{title=p.required();actionLabel=p.required();actionLink=p.required();actionIcon=p('<i class="pi pi-arrow-left"></i>');isSearch=p(!1);search=G();searchValue="";onSearch(){this.search.emit(this.searchValue)}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=a({type:e,selectors:[["lib-crud-header"]],inputs:{title:[1,"title"],actionLabel:[1,"actionLabel"],actionLink:[1,"actionLink"],actionIcon:[1,"actionIcon"],isSearch:[1,"isSearch"]},outputs:{search:"search"},decls:8,vars:5,consts:[[1,"flex","flex-col","border-b","border-slate-200","pb-4","mb-4"],[1,"flex","items-center","justify-between","mb-4"],[1,"font-bold","uppercase","text-left"],[1,"pi","pi-folder-plus","mr-2","text-emerald-700"],["pButton","",1,"bg-blue-600","text-white","px-4","py-2","rounded-lg",3,"icon","routerLink"],[1,"relative","w-full"],[1,"w-full"],[1,"pi","pi-search"],["type","text","pInputText","","placeholder","Recherche",1,"w-full","pr-24",3,"ngModelChange","ngModel"],["icon","pi pi-search",1,"absolute","right-1","top-1/2","-translate-y-1/2",3,"click"]],template:function(t,i){t&1&&(d(0,"div",0)(1,"div",1)(2,"h1",2),E(3,"i",3),T(4),l(),d(5,"a",4),T(6),l()(),A(7,ve,5,1,"div",5),l()),t&2&&(s(4),k(" ",i.title()," "),s(),H("icon",i.actionIcon())("routerLink",i.actionLink()),s(),k(" ",i.actionLabel()," "),s(),P(i.isSearch()?7:-1))},dependencies:[X,K,Q,J,se,j,le,V,ie,te,ee,Y,Z,$],encapsulation:2})};export{j as a,V as b,pe as c};
