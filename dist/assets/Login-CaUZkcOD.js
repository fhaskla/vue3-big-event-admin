import{b as O,d as b,m as w,a as k,i as G,c as y,u as B,o as $,e as E,w as a,r as q,n as A,f as s,g as h,h as D,_ as F,j as K,k as H,l as M,p as J,q as C,s as Q,t as W,v as X,x as Y,y as o,z as R,A as v,B as Z,C as x,D as ee,E as I,F as te,G as se,H as L,I as N}from"./index-BtdZa8Qe.js";import{E as oe,a as le}from"./el-form-item-Dg5GH0_m.js";import{E as re}from"./el-link-COOrOMed.js";import{_ as ae,E as ne}from"./_plugin-vue_export-helper-CkUarTxb.js";import{E as ue}from"./el-checkbox-DghVFmXz.js";import{E as pe}from"./el-input-C-TomgvI.js";import"./el-message-CgnsFL7S.js";import"./isEqual-BeSQZJ7H.js";const de=O({tag:{type:String,default:"div"},span:{type:Number,default:24},offset:{type:Number,default:0},pull:{type:Number,default:0},push:{type:Number,default:0},xs:{type:b([Number,Object]),default:()=>w({})},sm:{type:b([Number,Object]),default:()=>w({})},md:{type:b([Number,Object]),default:()=>w({})},lg:{type:b([Number,Object]),default:()=>w({})},xl:{type:b([Number,Object]),default:()=>w({})}}),P=Symbol("rowContextKey"),ie=k({name:"ElCol"}),me=k({...ie,props:de,setup(V){const l=V,{gutter:t}=G(P,{gutter:y(()=>0)}),p=B("col"),i=y(()=>{const r={};return t.value&&(r.paddingLeft=r.paddingRight=`${t.value/2}px`),r}),m=y(()=>{const r=[];return["span","offset","pull","push"].forEach(n=>{const e=l[n];K(e)&&(n==="span"?r.push(p.b(`${l[n]}`)):e>0&&r.push(p.b(`${n}-${l[n]}`)))}),["xs","sm","md","lg","xl"].forEach(n=>{K(l[n])?r.push(p.b(`${n}-${l[n]}`)):H(l[n])&&Object.entries(l[n]).forEach(([e,f])=>{r.push(e!=="span"?p.b(`${n}-${e}-${f}`):p.b(`${n}-${f}`))})}),t.value&&r.push(p.is("guttered")),[p.b(),r]});return(r,c)=>($(),E(D(r.tag),{class:A(s(m)),style:h(s(i))},{default:a(()=>[q(r.$slots,"default")]),_:3},8,["class","style"]))}});var fe=F(me,[["__file","col.vue"]]);const ce=M(fe),ge=["start","center","end","space-around","space-between","space-evenly"],ye=["top","middle","bottom"],_e=O({tag:{type:String,default:"div"},gutter:{type:Number,default:0},justify:{type:String,values:ge,default:"start"},align:{type:String,values:ye}}),be=k({name:"ElRow"}),we=k({...be,props:_e,setup(V){const l=V,t=B("row"),p=y(()=>l.gutter);J(P,{gutter:p});const i=y(()=>{const r={};return l.gutter&&(r.marginRight=r.marginLeft=`-${l.gutter/2}px`),r}),m=y(()=>[t.b(),t.is(`justify-${l.justify}`,l.justify!=="start"),t.is(`align-${l.align}`,!!l.align)]);return(r,c)=>($(),E(D(r.tag),{class:A(s(m)),style:h(s(i))},{default:a(()=>[q(r.$slots,"default")]),_:3},8,["class","style"]))}});var ve=F(we,[["__file","row.vue"]]);const xe=M(ve),$e={__name:"Login",setup(V){const l=C(!0),t=Q({username:"",password:"",repassword:""}),p={username:[{required:!0,message:"请输入用户名",trigger:"blur"},{pattern:/^[a-z0-9]{1,10}$/i,message:"用户名必须是1-10位大小写字母和数字",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{pattern:/^\S{6,15}$/,message:"密码必须是6-15位的非空字符",trigger:"blur"}],repassword:[{required:!0,message:"请再次输入密码",trigger:"blur"},{pattern:/^\S{6,15}$/,message:"密码必须是6-15位的非空字符",trigger:"blur"},{validator(n,e,f){e!==t.password?f(new Error("两次密码不一致")):f()}}]},i=C();async function m(){try{await i.value.validate(),await ee(t),I.success("注册成功"),l.value=!0}catch{}}const r=W();async function c(){try{i.value.validate();const n=await te(t);r.setToken(n.token),g.value?localStorage.setItem("rememberedUsername",t.username):localStorage.removeItem("rememberedUsername"),I.success("登录成功"),se.push("/")}catch{}}const g=C(!1);return X(()=>{const n=localStorage.getItem("rememberedUsername");n&&(t.username=n,g.value=!0)}),Y(l,()=>{t.username="",t.password="",t.repassword=""}),(n,e)=>{const f=ce,d=oe,_=pe,T=ue,S=ne,j=re,U=le,z=xe;return $(),E(z,{class:"login"},{default:a(()=>[o(f,{span:12,class:"bg"}),o(f,{span:6,offset:3,class:"form"},{default:a(()=>[s(l)?($(),E(U,{key:0,ref_key:"form",ref:i,model:s(t),rules:p,size:"large"},{default:a(()=>[o(d,null,{default:a(()=>e[8]||(e[8]=[R("h1",null,"登录",-1)])),_:1}),o(d,{prop:"username"},{default:a(()=>[o(_,{modelValue:s(t).username,"onUpdate:modelValue":e[0]||(e[0]=u=>s(t).username=u),"prefix-icon":s(L),placeholder:"请输入用户名",onKeyup:v(c,["enter"])},null,8,["modelValue","prefix-icon"])]),_:1}),o(d,{prop:"password"},{default:a(()=>[o(_,{modelValue:s(t).password,"onUpdate:modelValue":e[1]||(e[1]=u=>s(t).password=u),"prefix-icon":s(N),type:"password","show-password":"",placeholder:"请输入密码",onKeyup:v(c,["enter"])},null,8,["modelValue","prefix-icon"])]),_:1}),o(d,null,{default:a(()=>[o(T,{modelValue:s(g),"onUpdate:modelValue":e[2]||(e[2]=u=>Z(g)?g.value=u:null)},{default:a(()=>e[9]||(e[9]=[x("记住我")])),_:1},8,["modelValue"])]),_:1}),o(d,null,{default:a(()=>[o(S,{onClick:c,class:"button",type:"primary"},{default:a(()=>e[10]||(e[10]=[x(" 登 录 ")])),_:1})]),_:1}),o(d,null,{default:a(()=>[o(j,{type:"info",underline:!1,onClick:e[3]||(e[3]=u=>l.value=!s(l))},{default:a(()=>e[11]||(e[11]=[x(" 注册 → ")])),_:1})]),_:1})]),_:1},8,["model"])):($(),E(U,{key:1,ref_key:"form",ref:i,model:s(t),rules:p,size:"large"},{default:a(()=>[o(d,null,{default:a(()=>e[12]||(e[12]=[R("h1",null,"注册",-1)])),_:1}),o(d,{prop:"username"},{default:a(()=>[o(_,{modelValue:s(t).username,"onUpdate:modelValue":e[4]||(e[4]=u=>s(t).username=u),"prefix-icon":s(L),placeholder:"请输入用户名",onKeyup:v(m,["enter"])},null,8,["modelValue","prefix-icon"])]),_:1}),o(d,{prop:"password"},{default:a(()=>[o(_,{modelValue:s(t).password,"onUpdate:modelValue":e[5]||(e[5]=u=>s(t).password=u),"prefix-icon":s(N),type:"password",placeholder:"请输入密码",onKeyup:v(m,["enter"])},null,8,["modelValue","prefix-icon"])]),_:1}),o(d,{prop:"repassword"},{default:a(()=>[o(_,{modelValue:s(t).repassword,"onUpdate:modelValue":e[6]||(e[6]=u=>s(t).repassword=u),"prefix-icon":s(N),placeholder:"请再次输入密码",onKeyup:v(m,["enter"])},null,8,["modelValue","prefix-icon"])]),_:1}),o(d,null,{default:a(()=>[o(S,{class:"button",type:"primary",onClick:m},{default:a(()=>e[13]||(e[13]=[x(" 注册 ")])),_:1})]),_:1}),o(d,null,{default:a(()=>[o(j,{type:"info",underline:!1,onClick:e[7]||(e[7]=u=>l.value=!s(l))},{default:a(()=>e[14]||(e[14]=[x(" ← 返回 ")])),_:1})]),_:1})]),_:1},8,["model"]))]),_:1})]),_:1})}}},Ke=ae($e,[["__scopeId","data-v-62c22b4c"]]);export{Ke as default};
