(this["webpackJsonpoptions-profit-calculator"]=this["webpackJsonpoptions-profit-calculator"]||[]).push([[0],{146:function(t,e,r){},147:function(t,e,r){"use strict";r.r(e);var c=r(0),n=r(1),a=r(39),i=r.n(a),u=(r(46),r(4)),s=r(40);r(146);function o(t){var e=Object(n.useState)(""),r=Object(u.a)(e,2),a=r[0],i=r[1],s=Object(n.useState)(""),o=Object(u.a)(s,2),l=o[0],j=o[1],b=Object(n.useState)(""),O=Object(u.a)(b,2),h=O[0],v=O[1],f=Object(n.useState)(""),d=Object(u.a)(f,2),x=d[0],k=d[1],g=Object(n.useState)(""),y=Object(u.a)(g,2),C=y[0],S=y[1];return Object(c.jsx)("div",{class:"Input",children:Object(c.jsxs)("div",{class:"wrapper",children:[Object(c.jsx)("input",{type:"text",placeholder:"Ticker",value:a,onChange:function(t){return i(t.target.value)}}),Object(c.jsx)("input",{type:"text",placeholder:"Current price",value:l,onChange:function(t){return j(t.target.value)}}),Object(c.jsx)("input",{type:"text",placeholder:"Strike price",value:h,onChange:function(t){return v(t.target.value)}}),Object(c.jsx)("input",{type:"text",placeholder:"Option type",value:x,onChange:function(t){return k(t.target.value)}}),Object(c.jsx)("input",{type:"text",placeholder:"Option Price",value:C,onChange:function(t){return S(t.target.value)}}),Object(c.jsx)("button",{onClick:function(){return t.createOutput(Object(c.jsx)(p,{ticker:a,price:l,strike:h,type:x,optionPrice:C}))},children:"Calculate"})]})})}function p(t){var e=Object(n.useState)({}),r=Object(u.a)(e,2),a=r[0],i=r[1],o=function(){var e=[];return e.push(t.strike-4),e.push(t.strike-2),e.push(t.strike),e.push(parseInt(t.strike)+2),e.push(parseInt(t.strike)+4),e},p=function(t,e){switch(e){case"call":return j(t);case"put":return l(t)}},l=function(e){for(var r=[],c=0;c<e.length;c++)if(e[c]<=t.strike){var n=t.strike-e[c]-t.optionPrice;r.push(100*n)}else{var a=0-parseFloat(t.optionPrice);r.push(100*a)}return r},j=function(e){for(var r=[],c=0;c<e.length;c++)if(e[c]<=t.strike){var n=0-parseFloat(t.optionPrice);r.push(100*n)}else{var a=e[c]-t.strike-t.optionPrice;r.push(100*a)}return r};return Object(n.useEffect)((function(){i({labels:o(),datasets:[{label:"".concat(t.ticker," ").concat(t.strike," ").concat(t.type),data:p(o(),t.type),borderColor:"rgba(255, 99, 132, 100)",fill:!1,borderJoinStyle:"miter",lineTension:0}]})})),Object(c.jsx)("div",{class:"Output",children:Object(c.jsx)("div",{class:"wrapper",children:Object(c.jsx)(s.Line,{data:a})})})}var l=function(){var t=Object(n.useState)(""),e=Object(u.a)(t,2),r=e[0],a=e[1];return Object(c.jsxs)("div",{className:"Calculator",children:[Object(c.jsx)(o,{createOutput:a}),r]})};var j=function(){return Object(c.jsx)("div",{className:"App",children:Object(c.jsx)(l,{})})};i.a.render(Object(c.jsx)(j,{}),document.getElementById("root"))},46:function(t,e,r){}},[[147,1,2]]]);
//# sourceMappingURL=main.3fc6c128.chunk.js.map