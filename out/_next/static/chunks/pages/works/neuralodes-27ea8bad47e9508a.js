(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[344],{7105:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/works/neuralodes",function(){return r(773)}])},3025:function(e,n,r){"use strict";r.d(n,{Et:function(){return h},Pg:function(){return x}});var t=r(5893),i=r(1664),s=r.n(i),l=r(5675),a=r.n(l),o=r(7747),c=r(6725),u=r(4e3),d=r(917);let h=e=>{let{children:n,category:r="works",id:i,title:l,thumbnail:d}=e;return(0,t.jsx)(o.xu,{w:"100%",textAlign:"center",children:(0,t.jsxs)(c.f,{as:s(),href:"/".concat(r,"/").concat(i),scroll:!1,cursor:"pointer",children:[(0,t.jsx)(a(),{src:d,alt:l,className:"grid-item-thumbnail",placeholder:"blur"}),(0,t.jsx)(c.A,{as:"div",href:"/".concat(r,"/").concat(i),children:(0,t.jsx)(u.x,{mt:2,fontSize:20,children:l})}),(0,t.jsx)(u.x,{fontSize:14,children:n})]})})},x=()=>(0,t.jsx)(d.xB,{styles:"\n      .grid-item-thumbnail {\n        border-radius: 12px;\n      }\n    "})},6741:function(e,n,r){"use strict";var t=r(5893),i=r(9379),s=r(9008),l=r.n(s),a=r(3025);let o={hidden:{opacity:0,x:0,y:20},enter:{opacity:1,x:0,y:0},exit:{opacity:0,x:-0,y:20}};n.Z=e=>{let{children:n,title:r}=e,s="".concat(r," - Brent Tan");return(0,t.jsx)(i.E.article,{initial:"hidden",animate:"enter",exit:"exit",variants:o,transition:{duration:.4,type:"easeInOut"},style:{position:"relative"},children:(0,t.jsxs)(t.Fragment,{children:[r&&(0,t.jsxs)(l(),{children:[(0,t.jsx)("title",{children:s}),(0,t.jsx)("meta",{name:"twitter:title",content:s}),(0,t.jsx)("meta",{property:"og:title",content:s})]}),n,(0,t.jsx)(a.Pg,{})]})})}},2263:function(e,n,r){"use strict";r.d(n,{h_:function(){return N},Dx:function(){return g},Rn:function(){return y},WZ:function(){return b}});var t=r(5893),i=r(1664),s=r.n(i),l=r(7747),a=r(2883),o=r(2757),c=r(6554),u=(0,c.G)(function(e,n){let{htmlWidth:r,htmlHeight:i,alt:s,...l}=e;return(0,t.jsx)("img",{width:r,height:i,ref:n,alt:s,...l})});u.displayName="NativeImage";var d=r(6245),h=r(7294),x=(e,n)=>"loaded"!==e&&"beforeLoadOrError"===n||"failed"===e&&"onError"===n,m=r(9653),f=(0,c.G)(function(e,n){let{fallbackSrc:r,fallback:i,src:s,srcSet:l,align:a,fit:o,loading:c,ignoreFallback:f,crossOrigin:j,fallbackStrategy:p="beforeLoadOrError",referrerPolicy:g,...y}=e,b=void 0!==r||void 0!==i,N=null!=c||f||!b,_=x(function(e){let{loading:n,src:r,srcSet:t,onLoad:i,onError:s,crossOrigin:l,sizes:a,ignoreFallback:o}=e,[c,u]=(0,h.useState)("pending");(0,h.useEffect)(()=>{u(r?"loading":"pending")},[r]);let x=(0,h.useRef)(),m=(0,h.useCallback)(()=>{if(!r)return;f();let e=new Image;e.src=r,l&&(e.crossOrigin=l),t&&(e.srcset=t),a&&(e.sizes=a),n&&(e.loading=n),e.onload=e=>{f(),u("loaded"),null==i||i(e)},e.onerror=e=>{f(),u("failed"),null==s||s(e)},x.current=e},[r,l,t,a,i,s,n]),f=()=>{x.current&&(x.current.onload=null,x.current.onerror=null,x.current=null)};return(0,d.G)(()=>{if(!o)return"loading"===c&&m(),()=>{f()}},[c,m,o]),o?"loaded":c}({...e,crossOrigin:j,ignoreFallback:N}),p),v={ref:n,objectFit:o,objectPosition:a,...N?y:function(e,n=[]){let r=Object.assign({},e);for(let e of n)e in r&&delete r[e];return r}(y,["onError","onLoad"])};return _?i||(0,t.jsx)(m.m.img,{as:u,className:"chakra-image__placeholder",src:r,...v}):(0,t.jsx)(m.m.img,{as:u,src:s,srcSet:l,crossOrigin:j,loading:c,referrerPolicy:g,className:"chakra-image",...v})});f.displayName="Image";var j=r(4880),p=r(3459);let g=e=>{let{children:n}=e;return(0,t.jsxs)(l.xu,{children:[(0,t.jsx)(a.r,{as:s(),href:"/research",children:"Research"}),(0,t.jsxs)("span",{children:[" ",(0,t.jsx)(p.X,{})," "]}),(0,t.jsx)(o.X,{display:"inline-block",as:"h3",fontSize:20,mb:4,children:n})]})},y=e=>{let{children:n}=e;return(0,t.jsxs)(l.xu,{children:[(0,t.jsx)(a.r,{as:s(),href:"/papers",children:"Projects"}),(0,t.jsxs)("span",{children:[" ",(0,t.jsx)(p.X,{})," "]}),(0,t.jsx)(o.X,{display:"inline-block",as:"h3",fontSize:20,mb:4,children:n})]})},b=e=>{let{src:n,alt:r}=e;return(0,t.jsx)(f,{borderRadius:"lg",w:"full",src:n,alt:r,mb:4})},N=e=>{let{children:n}=e;return(0,t.jsx)(j.C,{colorScheme:"green",mr:2,children:n})}},773:function(e,n,r){"use strict";r.r(n);var t=r(5893),i=r(2338),s=r(4880),l=r(3804),a=r(2883),o=r(5349),c=r(2263),u=r(6741);n.default=()=>(0,t.jsx)(u.Z,{title:"Neural ODEs and Symbolic Regression",children:(0,t.jsxs)(i.W,{children:[(0,t.jsxs)(c.Dx,{children:["Neural ODEs and Symbolic Regression ",(0,t.jsx)(s.C,{children:"2024"})]}),(0,t.jsx)(l.aV,{ml:4,my:4,children:(0,t.jsxs)(l.HC,{children:[(0,t.jsx)(c.h_,{children:"Paper"}),(0,t.jsxs)(a.r,{href:"",children:["Neural ODEs and Symbolic Regression ",(0,t.jsx)(o.h,{mx:"2px"})]})]})}),"Neural ODEs and Symbolic Regression"]})})},3459:function(e,n,r){"use strict";r.d(n,{X:function(){return t}});var t=(0,r(4027).I)({d:"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z",displayName:"ChevronRightIcon"})},5349:function(e,n,r){"use strict";r.d(n,{h:function(){return s}});var t=r(4027),i=r(5893),s=(0,t.I)({displayName:"ExternalLinkIcon",path:(0,i.jsxs)("g",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"2",children:[(0,i.jsx)("path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}),(0,i.jsx)("path",{d:"M15 3h6v6"}),(0,i.jsx)("path",{d:"M10 14L21 3"})]})})},3804:function(e,n,r){"use strict";r.d(n,{HC:function(){return m},aV:function(){return x}});var t=r(6948),i=r(5227),s=r(2495),l=r(6554),a=r(7030),o=r(3179),c=r(9653),u=r(5893),[d,h]=(0,i.k)({name:"ListStylesContext",errorMessage:"useListStyles returned is 'undefined'. Seems you forgot to wrap the components in \"<List />\" "}),x=(0,l.G)(function(e,n){let r=(0,a.jC)("List",e),{children:t,styleType:i="none",stylePosition:l,spacing:h,...x}=(0,o.Lr)(e),m=(0,s.W)(t);return(0,u.jsx)(d,{value:r,children:(0,u.jsx)(c.m.ul,{ref:n,listStyleType:i,listStylePosition:l,role:"list",__css:{...r.container,...h?{"& > *:not(style) ~ *:not(style)":{mt:h}}:{}},...x,children:m})})});x.displayName="List",(0,l.G)((e,n)=>{let{as:r,...t}=e;return(0,u.jsx)(x,{ref:n,as:"ol",styleType:"decimal",marginStart:"1em",...t})}).displayName="OrderedList",(0,l.G)(function(e,n){let{as:r,...t}=e;return(0,u.jsx)(x,{ref:n,as:"ul",styleType:"initial",marginStart:"1em",...t})}).displayName="UnorderedList";var m=(0,l.G)(function(e,n){let r=h();return(0,u.jsx)(c.m.li,{ref:n,...e,__css:r.item})});m.displayName="ListItem",(0,l.G)(function(e,n){let r=h();return(0,u.jsx)(t.J,{ref:n,role:"presentation",...e,__css:r.icon})}).displayName="ListIcon"},4880:function(e,n,r){"use strict";r.d(n,{C:function(){return c}});var t=r(6554),i=r(7030),s=r(3179),l=r(9653),a=r(5432),o=r(5893),c=(0,t.G)(function(e,n){let r=(0,i.mq)("Badge",e),{className:t,...c}=(0,s.Lr)(e);return(0,o.jsx)(l.m.span,{ref:n,className:(0,a.cx)("chakra-badge",e.className),...c,__css:{display:"inline-block",whiteSpace:"nowrap",verticalAlign:"middle",...r}})});c.displayName="Badge"}},function(e){e.O(0,[925,888,774,179],function(){return e(e.s=7105)}),_N_E=e.O()}]);