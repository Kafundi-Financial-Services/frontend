var e=Object.defineProperty,t=Object.defineProperties,s=Object.getOwnPropertyDescriptors,a=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable,r=(t,s,a)=>s in t?e(t,s,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[s]=a,o=(e,t)=>{for(var s in t||(t={}))i.call(t,s)&&r(e,s,t[s]);if(a)for(var s of a(t))n.call(t,s)&&r(e,s,t[s]);return e},l=(e,a)=>t(e,s(a)),h=(e,t,s)=>(r(e,"symbol"!=typeof t?t+"":t,s),s);import{a as d,m as c,r as p,R as u,j as g,b as m,I as y,U as S,L as f,c as b,B as A,C as D,d as C,e as x,f as w,F as P,g as T,E as v,S as k,h as M,i as I,k as L,l as E,n as O,o as R,p as N,M as U,q as K,s as j,T as z,t as F,u as _,P as q,D as B,v as H,w as W,x as G,y as $,z as J,A as V,G as Y,H as Z,J as X,K as Q,N as ee,O as te,Q as se,V as ae,W as ie,X as ne,Y as re,Z as oe,_ as le,$ as he,a0 as de,a1 as ce}from"./vendor.d25a63c9.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const s of e)if("childList"===s.type)for(const e of s.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const pe={getItem:e=>"",setItem(e,t){}},ue=window.localStorage?window.localStorage:pe,ge=window.sessionStorage?window.sessionStorage:pe,me="ADMIN_AUTH_KEY";const ye=new class{getAuthKeyFromStorage(){const e=ue.getItem(me);return e||(ge.getItem(me)||"")}clearAuthKeys(){ue.setItem(me,""),ge.setItem(me,"")}setAuthKeyInSessionStorage(e){ge.setItem(me,e),ue.setItem(me,"")}setAuthKeyInLocalStorage(e){ue.setItem(me,e),ge.setItem(me,"")}setSiderCollapsedStateInLocalStorage(e){ue.setItem("ADMIN_SIDER_COLLAPSED_STATE",JSON.stringify(e))}setAdmin(e){ue.setItem("ADMIN_ADMIN",JSON.stringify(e))}isAdmin(){const e=ue.getItem("ADMIN_ADMIN");return e&&JSON.parse(e)}getSiderCollapsedStateFromLocalStorage(){const e=ue.getItem("ADMIN_SIDER_COLLAPSED_STATE");return e&&JSON.parse(e)}setDarkModeInLocalStorage(e){ue.setItem("ADMIN_DARK_MODE",JSON.stringify(e))}getDarkModeFromLocalStorage(){const e=ue.getItem("ADMIN_DARK_MODE");return e?JSON.parse(e):window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches}};class Se{constructor(e,t){h(this,"GET","GET"),h(this,"POST","POST"),h(this,"DELETE","DELETE"),h(this,"UPDATE","UPDATE"),h(this,"PUT","PUT"),h(this,"PATCH","PATCH"),h(this,"isDestroyed",!1),h(this,"authToken",""),this.baseUrl=e,this.onAuthFailure=t}createHeaders(){let e={};return this.authToken&&(e["X-Access-Token"]=this.authToken),e}setAuthToken(e){this.authToken=e}destroy(){this.isDestroyed=!0}fetch(e,t,s){const a=this;return function(){return Promise.resolve().then((function(){return Promise.resolve()})).then((function(){return a.fetchInternal(e,t,s)})).then((function(e){return e.data})).catch((function(e){return new Promise((function(t,s){s(new Error(e.response?e.response.data.message:e.message))}))}))}}fetchInternal(e,t,s){if(e===this.GET)return this.getReq(t,s);if(e===this.POST)return this.postReq(t,s);if(e===this.PUT)return this.putReq(t,s);if(e===this.PATCH)return this.patchReq(t,s);if(e===this.DELETE)return this.deleteReq(t,s);throw new Error(`Unknown method: ${e}`)}getReq(e,t){return d.get(this.baseUrl+e,{params:t,headers:this.createHeaders()})}postReq(e,t){return d.post(this.baseUrl+e,t,{headers:this.createHeaders()})}putReq(e,t){return d.put(this.baseUrl+e,t,{headers:this.createHeaders()})}deleteReq(e,t){return d.delete(this.baseUrl+e,{params:t,headers:this.createHeaders()})}patchReq(e,t){return d.patch(this.baseUrl+e,t,{headers:this.createHeaders()})}}const fe=class{constructor(){h(this,"http");const e=this;this.http=new Se(this.getApiBaseUrl(),(function(){return fe.lastKnownPassword?e.getAuthToken(fe.lastKnownUsername,fe.lastKnownPassword):Promise.reject(new Error("No saved password. Ignore if initial call."))})),this.http.setAuthToken(fe.authToken)}getApiBaseUrl(){return"https://kfs-api.igcfashion.co/api/v1"}static getApiUrl(){return"https://kfs-api.igcfashion.co/api/v1"}destroy(){this.http.destroy()}static getAuthTokenString(){return fe.authToken}setAuthToken(e){fe.authToken=e,e||ye.clearAuthKeys(),this.http.setAuthToken(e)}static isLoggedIn(){return!!fe.authToken}getAuthToken(e,t){const s=this.http;fe.lastKnownPassword=t,fe.lastKnownUsername=e;const a=this;return Promise.resolve().then(s.fetch(s.POST,"/auth/login",{password:t,username:e})).then((function(e){if(!e.token)return Promise.reject(e);a.setAuthToken(e.token),ye.setAdmin(e.isAdmin||!1)})).catch((function(e){return Promise.reject(e)}))}updatePathData(e,t){const s=this.http;return Promise.resolve().then(s.fetch(s.PATCH,e,t))}deletePathData(e,t){const s=this.http;return Promise.resolve().then(s.fetch(s.DELETE,e,t))}changePass(e,t,s){const a=this.http;return Promise.resolve().then(a.fetch(a.PATCH,"/me/updatePassword",{currentPassword:e,password:t,passwordConfirm:s}))}postPathData(e,t){const s=this.http;return Promise.resolve().then(s.fetch(s.POST,e,t))}getPathData(e,t){const s=this.http;return Promise.resolve().then(s.fetch(s.GET,e,o({},t)))}};let be=fe;h(be,"lastKnownPassword",""),h(be,"lastKnownUsername",""),h(be,"authToken",ye.getAuthKeyFromStorage()||"");var Ae={copyObject:e=>JSON.parse(JSON.stringify(e)),generateUuidV4:()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){let t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)})),deleteAllCookies(){let e=document.cookie.split(";");for(let t=0;t<e.length;t++){let s=e[t],a=s.indexOf("="),i=a>-1?s.substr(0,a):s;document.cookie=i+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT"}},getAnsiColorRegex(){const e=["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\\u0007)","(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"].join("|");return new RegExp(e,"g")},isMobile:()=>window.innerWidth<768,isSafari(){let e=!1;try{e=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)||!!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)}catch(t){console.log(t)}return e},getDelayedPromise:e=>e?new Promise(((t,s)=>{setTimeout((()=>{t()}),e)})):Promise.resolve(),createRandomStringHex(e){let t="";const s="0123456789abcdef",a=s.length;for(let i=0;i<e;i++)t+=s.charAt(Math.floor(Math.random()*a));return t},convertHexStringToUtf8:e=>e?decodeURIComponent(e.substring(8,e.length).replace(/\s+/g,"").replace(/[0-9a-f]{2}/g,"%$&")):"",mergeObjects(e,t){const s=e||{};return t=t||{},Object.keys(t).forEach((e=>{!s[e]||Array.isArray(s[e])||Array.isArray(t[e])?s[e]=t[e]:"object"==typeof t[e]&&"object"==typeof s[e]?s[e]=this.mergeObjects(s[e],t[e]):s[e]=t[e]})),s}};class De{static toast(e){c.error(e.message||"Something bad happened.")}static createCatcher(e){return function(t){De.toast(t),e&&e()}}}class Ce extends p.exports.Component{constructor(e){super(e),h(this,"willUnmountSoon"),h(this,"apiManager"),this.willUnmountSoon=!1,this.apiManager=new be}componentWillUnmount(){this.willUnmountSoon=!0,this.apiManager.destroy()}deletePathData(e){return new Promise((t=>{this.apiManager.deletePathData(e.path,e.query).then((e=>{t(e)})).catch((e=>{c.error(e.message)}))}))}updatePathData(e){return new Promise(((t,s)=>{this.apiManager.updatePathData(e.path,e.data).then((function(e){t(e)})).catch((e=>{s(e)}))}))}postPathData(e){return new Promise(((t,s)=>{this.apiManager.postPathData(e.path,e.data).then((e=>{t(e)})).catch((e=>{c.error(e.message),s(e)}))}))}getPathData(e){return new Promise(((t,s)=>{this.apiManager.getPathData(e.path,e.query).then((function(e){t(e)})).catch(De.createCatcher()).then(s)}))}}class xe extends Ce{constructor(e){super(e),this.state={loginOption:1}}componentDidMount(){super.componentDidMount&&super.componentDidMount(),Ae.deleteAllCookies()}onLoginRequested(e,t,s){const a=this;this.apiManager.getAuthToken(e,t).then((function(){2===a.state.loginOption?ye.setAuthKeyInSessionStorage(be.getAuthTokenString()):3===a.state.loginOption&&ye.setAuthKeyInLocalStorage(be.getAuthTokenString()),a.props.history.push("/"),s()})).catch((e=>{s(),c.error(e.message)}))}render(){const e=this;return be.isLoggedIn()?m(x,{to:"/"}):m("div",{children:m("div",{style:{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)"},children:m(w,{title:"Log in",style:{width:350},children:m(Pe,{onLoginRequested:(t,s,a,i)=>{e.setState({loginOption:a}),e.onLoginRequested(t,s,i)}})})})})}}const we={display:"block",height:"30px",lineHeight:"30px"};class Pe extends u.Component{constructor(e){super(e),h(this,"handleSubmit",(()=>{this.setState({loading:!0},(()=>{this.props.onLoginRequested(this.state.username,this.state.passwordEntered,this.state.loginOption,(()=>setTimeout((()=>{this.setState({loading:!1})}),500)))}))})),this.state={loginOption:2,passwordEntered:"",username:"",loading:!1}}render(){const e=this;return g("div",{children:[m(y,{style:{marginBottom:20},size:"large",prefix:m(S,{style:{color:"rgba(0,0,0,.25)"}}),onChange:t=>{e.setState({username:`${t.target.value}`})},placeholder:"Username"}),m(y.Password,{size:"large",onKeyDown:t=>{13===t.keyCode&&e.handleSubmit()},prefix:m(f,{style:{color:"rgba(0,0,0,.25)"}}),onChange:t=>{e.setState({passwordEntered:`${t.target.value}`})},placeholder:"Password"}),m("div",{style:{marginTop:20,marginBottom:20},children:m(b,{justify:"end",children:m(A,{type:"primary",htmlType:"submit",loading:e.state.loading,onClick:()=>{e.handleSubmit()},children:e.state.loading?"Please wait...":"Login"})})}),m(D,{children:m(D.Panel,{header:"Remember Me",children:g(C.Group,{onChange:t=>{e.setState({loginOption:t.target.value})},value:e.state.loginOption,children:[m(C,{style:we,value:1,children:"No session persistence"}),m(C,{style:we,value:2,children:"Use sessionStorage"}),m(C,{style:we,value:3,children:"Use localStorage"})]})},"1")})]})}}function Te(){return{type:"ROOT_KEY_CHANGED",payload:{}}}class ve extends Ce{constructor(e){super(e),this.state={isLoading:!1,stats:{},collections:0,profits:0}}getOptions(e){return{color:"#1b8ad3",tooltip:{trigger:"axis"},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:[{type:"category",data:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}],yAxis:[{type:"value"}],series:[{type:"bar",barWidth:"60%",data:e}]}}fetchStats(){this.getPathData({path:"/statistics/monthly"}).then((e=>{this.setState({stats:e}),this.fetchCollections()})).catch((()=>{}))}fetchCollections(){this.getPathData({path:"/statistics"}).then((e=>{console.log(e,"stats"),this.setState({collections:e.totalTransactions[0].amount}),this.setState({profits:e.profit[0].profit})})).catch((()=>{}))}componentDidMount(){this.fetchStats()}render(){return g(P,{children:[m(b,{justify:"center",gutter:20,children:m(T,{style:{marginBottom:20},lg:{span:10},xs:{span:23},children:m(w,{children:m(v,{option:l(o({},this.getOptions(this.state.stats.transactions)),{title:{text:"Transactions"}}),notMerge:!0,lazyUpdate:!0,style:{height:"220px",width:"100%"}})})})}),g(b,{justify:"center",gutter:20,children:[m(T,{children:m(k,{title:"Collections",value:`USD ${this.state.collections}`})}),m(T,{children:m(k,{title:"Profits",value:`USD ${this.state.profits}`})})]})]})}}class ke extends p.exports.Component{handleClick(e){e.preventDefault(),this.props.onLinkClicked&&this.props.onLinkClicked()}render(){return m("a",{onClick:e=>this.handleClick(e),children:this.props.children})}}const Me=new class{loadTheme(e){return Promise.resolve()}};class Ie extends p.exports.Component{constructor(e){super(e),this.state={isChecked:ye.getDarkModeFromLocalStorage()}}render(){return m(M,{checkedChildren:m(I,{}),unCheckedChildren:m(L,{}),checked:this.state.isChecked,onChange:e=>{ye.setDarkModeInLocalStorage(e),Me.loadTheme(e),this.setState({isChecked:e})}})}}class Le extends p.exports.Component{componentDidMount(){be.isLoggedIn()?this.props.history.push("/dashboard"):this.props.history.push("/login")}render(){return m("div",{})}}var Ee=E((function(e){return{}}),void 0)(Le);class Oe extends p.exports.Component{render(){return m("div",{style:{width:"100%",textAlign:"center"},children:m(O,{style:{marginTop:60,marginBottom:60,width:"100%"},indicator:m(R,{style:{fontSize:32},spin:!0}),size:"large"})})}}class Re extends p.exports.Component{render(){return g("div",{style:{textAlign:"center",padding:36},children:[m("p",{children:this.props.message?this.props.message:"An error occurred. Please try again."}),m(b,{justify:"center",children:m(A,{type:"primary",onClick:()=>this.props.reloadCallBack(),children:"Reload"})})]})}}var Ne=E(void 0,{emitRootKeyChanged:Te})(class extends Ce{constructor(e){super(e),this.state={isLoading:!1,isModalVisible:!1,data:N(e.data,{})}}setData(e,t){this.setState({data:N(this.state.data,{[`${e}`]:t})})}add(){this.setState({isLoading:!0},(()=>{this[this.props.data?"updatePathData":"postPathData"]({path:"/transactions",data:N(this.state.data)}).then((()=>{this.props.emitRootKeyChanged()})).catch((()=>{this.setState({isLoading:!1})}))}))}render(){return g(P,{children:[m(U,{title:(this.props.data?"UPDATE":"NEW")+" TRANSACTION",visible:this.state.isModalVisible,onOk:this.add.bind(this),onCancel:()=>this.setState({isModalVisible:!1}),okButtonProps:{disabled:this.state.isLoading},cancelButtonProps:{disabled:this.state.isLoading},okText:this.props.data?"UPDATE":"ADD",children:this.state.isLoading?m(Oe,{}):g(K,{layout:"vertical",children:[m(K.Item,{label:"AMOUNT",required:!this.props.data,children:m(y,{type:"number",placeholder:"Amount",name:"amount",size:"large",value:this.state.data.amount,onChange:e=>this.setData("amount",e.target.value)})}),m(K.Item,{label:"TRANSACTION ID",required:!this.props.data,children:m(y,{type:"text",placeholder:"Transaction ID",name:"amount",size:"large",value:this.state.data.transactionId,onChange:e=>this.setData("transactionId",e.target.value)})})]})}),u.cloneElement(this.props.children,{onClick:()=>this.setState({isModalVisible:!0})})]})}});var Ue=E((function(e){return{isMobile:e.globalReducer.isMobile}}),{emitRootKeyChanged:Te})(class extends Ce{constructor(e){super(e),this.state={searchTerm:"",apiData:void 0,isLoading:!1,confirmOrder:!1,transactions:void 0}}onSearchUser(e,t){return new RegExp(e,"ig").test(t.type)}reFetchData(e){this.setState({isLoading:e},(()=>{this.getPathData({path:"/browse/transactions"}).then((({items:e})=>{console.log(e,"transactions"),e.filter((e=>"successful"===e.payment)),e.filter((e=>"successful"!==e.payment)),this.setState({isLoading:!1,apiData:e,transactions:e})})).catch((()=>this.setState({isLoading:!1})))}))}componentDidMount(){this.reFetchData(!0)}render(){if(this.state.isLoading)return m(Oe,{});if(!this.state.apiData)return m(Re,{reloadCallBack:this.reFetchData.bind(this)});const e=m(y,{placeholder:"Search",type:"text",onChange:e=>this.setState({searchTerm:(e.target.value||"").trim()})});return m("div",{children:m(b,{justify:"center",children:m(T,{xs:{span:23},lg:{span:23},style:{paddingBottom:300},children:g(w,{title:g(u.Fragment,{children:[g("span",{children:[m(j,{}),"  "," TRANSACTIONS"]}),m("br",{}),this.props.isMobile&&m("div",{style:{marginTop:8},children:e})]}),children:[m(z,{rowKey:e=>e.id,pagination:{defaultPageSize:5,hideOnSinglePage:!0,showSizeChanger:!0},columns:[{title:"TID",dataIndex:"_id",render:(e,{transactionId:t})=>t.slice(-4),width:10},{title:"BY",dataIndex:"_id",render:(e,{user:t})=>t.username,width:15,responsive:["lg","md"]},{title:"Amount",dataIndex:"amount"},{title:"Status",dataIndex:"status",render:(e,{status:t})=>{let s;return console.log(t,"statuse"),s="PENDING"===t?"volcano":"green",m(F,{color:s,children:t.toUpperCase()},t)}},{title:"Profit",dataIndex:"profit",render:(e,{profit:t})=>Math.round(t)},{title:"CREATED AT",dataIndex:"createdAt",render:e=>m(P,{children:_(e).tz("Africa/Kampala").format("MMMM Do, h:mm a")}),responsive:["lg","md"]},{title:"ACTION",dataIndex:"actions",render:(e,t)=>g("span",{children:[m(q,{title:"Sure to delete?",onConfirm:()=>this.deletePathData({path:`/transactions/${t._id}`}).then((()=>this.props.emitRootKeyChanged())),children:m(A,{type:"primary",danger:!0,shape:"circle",style:{marginLeft:"10px"},icon:m(B,{})})}),m(q,{title:"sure to approve?",onConfirm:()=>{console.log(t),this.updatePathData({path:`/transactions/${t._id}`,data:{status:"SUCCESS",confirmedAt:new Date}}).then((()=>{this.props.emitRootKeyChanged()})).catch((e=>{c.error(e.message)}))},children:m(A,{type:"primary",shape:"circle",style:{marginLeft:"10px"},icon:m(H,{})})})]})}],dataSource:this.state.transactions,size:"small"}),m(Ne,{children:g(A,{type:"primary",style:{marginTop:"15px"},children:[m(W,{}),"ADD"]})})]})})})})}});class Ke extends Ce{constructor(e){super(e),this.state={isLoading:!1,old:"",new1:"",new2:""}}onChangePasswordClicked(){this.setState({isLoading:!0},(()=>{this.apiManager.changePass(this.state.old,this.state.new1,this.state.new2).then((e=>{c.success("Password changed successfully!"),this.setState({isLoading:!1})})).catch((e=>{c.error(e.message),this.setState({isLoading:!1})}))}))}render(){return this.state.isLoading?m(Oe,{}):g(K,{layout:"vertical",children:[m(K.Item,{label:"OLD PASSWORD",children:m(y.Password,{size:"large",onChange:e=>this.setState({old:e.target.value})})}),m(K.Item,{label:"NEW PASSWORD",children:m(y.Password,{size:"large",onChange:e=>this.setState({new1:e.target.value})})}),m(K.Item,{label:"CONFIRM NEW PASSWORD",children:m(y.Password,{size:"large",onChange:e=>this.setState({new2:e.target.value})})}),m(b,{justify:"end",children:m(A,{block:this.props.isMobile,onClick:()=>this.onChangePasswordClicked(),type:"primary",children:"CHANGE"})})]})}}var je=E((function(e){return{isMobile:e.globalReducer.isMobile,isAdmin:ye.isAdmin()}}),void 0)(class extends Ce{render(){return m("div",{children:m(b,{justify:"center",gutter:20,children:this.props.isAdmin&&m(T,{style:{marginBottom:20},lg:{span:10},xs:{span:23},children:m(w,{style:{height:"100%"},title:"CHANGE PASSWORD",children:m(Ke,{isMobile:this.props.isMobile})})})})})}});var ze=E(void 0,{emitRootKeyChanged:Te})(class extends Ce{constructor(e){super(e),this.state={isLoading:!1,isModalVisible:!1,data:N(e.data,{})}}setData(e,t){this.setState({data:N(this.state.data,{[`${e}`]:t})})}add(){this.setState({isLoading:!0},(()=>{this[this.props.data?"updatePathData":"postPathData"]({path:"/auth",data:N(this.state.data)}).then((()=>{this.props.emitRootKeyChanged()})).catch((()=>{this.setState({isLoading:!1})}))}))}render(){return g(P,{children:[m(U,{title:(this.props.data?"UPDATE":"NEW")+" USER",visible:this.state.isModalVisible,onOk:this.add.bind(this),onCancel:()=>this.setState({isModalVisible:!1}),okButtonProps:{disabled:this.state.isLoading},cancelButtonProps:{disabled:this.state.isLoading},okText:this.props.data?"UPDATE":"ADD",children:this.state.isLoading?m(Oe,{}):g(K,{layout:"vertical",children:[m(K.Item,{label:"USERNAME2",required:!this.props.data,children:m(y,{type:"text",placeholder:"Username",name:"username",size:"large",value:this.state.data.username,onChange:e=>this.setData("username",e.target.value)})}),m(K.Item,{label:"PASSWORD",required:!this.props.data,children:m(y.Password,{placeholder:"Password",name:"password",size:"large",value:this.state.data.password,onChange:e=>this.setData("password",e.target.value)})}),m(K.Item,{label:"ROLES",children:m(G,{onChange:e=>{this.setData("roles",e)},value:this.state.data.roles,size:"large",mode:"multiple",placeholder:"Roles",children:["ADMIN"].map(((e,t)=>m(G.Option,{value:e,children:e},t)))})})]})}),u.cloneElement(this.props.children,{onClick:()=>this.setState({isModalVisible:!0})})]})}});var Fe=E((function(e){return{isMobile:e.globalReducer.isMobile}}),{emitRootKeyChanged:Te})(class extends Ce{constructor(e){super(e),this.state={searchTerm:"",apiData:void 0,isLoading:!1}}onSearchUser(e,t){return new RegExp(e,"ig").test(t.username)}reFetchData(){this.setState({isLoading:!0},(()=>{this.getPathData({path:"/browse/staff"}).then((({items:e})=>{this.setState({isLoading:!1,apiData:e})})).catch((()=>this.setState({isLoading:!1})))}))}componentDidMount(){this.reFetchData()}render(){if(this.state.isLoading)return m(Oe,{});if(!this.state.apiData)return m(Re,{reloadCallBack:this.reFetchData.bind(this)});const e=this.state.apiData.filter((e=>!this.state.searchTerm||this.onSearchUser(this.state.searchTerm,e))),t=m(y,{placeholder:"Search",type:"text",onChange:e=>this.setState({searchTerm:(e.target.value||"").trim()})});return m(b,{justify:"center",children:m(T,{xs:{span:23},lg:{span:16},style:{paddingBottom:300},children:g(w,{extra:!this.props.isMobile&&t,title:g(u.Fragment,{children:[g("span",{children:[m($,{}),"  ","STAFF"]}),m("br",{}),this.props.isMobile&&m("div",{style:{marginTop:8},children:t})]}),children:[m(z,{rowKey:"username",pagination:{defaultPageSize:5,hideOnSinglePage:!0,showSizeChanger:!1},columns:[{title:"USERNAME",dataIndex:"username",sorter:(e,t)=>e.username.localeCompare(t.username),defaultSortOrder:"descend",sortDirections:["descend","ascend"]},{title:"ROLES",dataIndex:"roles",render:e=>m(P,{children:e.join(",")})},{title:"ACTIONS",dataIndex:"actions",render:(e,t)=>g("span",{children:[m(ze,{data:t,children:m(A,{shape:"circle",type:"primary",children:m(J,{})})}),m(q,{title:"Sure to delete?",onConfirm:()=>this.deletePathData({path:`/auth/${t.id}`}).then((()=>this.props.emitRootKeyChanged())),children:m(A,{type:"primary",danger:!0,shape:"circle",style:{marginLeft:"10px"},icon:m(B,{})})})]})}],dataSource:e,size:"small"}),m(ze,{children:g(A,{type:"primary",style:{marginTop:"15px"},children:[m(V,{}),"ADD"]})})]})})})}});const{Header:_e,Content:qe,Sider:Be}=X;var He=E((function(e){return{rootElementKey:e.globalReducer.rootElementKey,isMobile:e.globalReducer.isMobile,isAdmin:ye.isAdmin()}}),{emitSizeChanged:function(){return{type:"SIZE_CHANGED",payload:{}}}})(class extends Ce{constructor(e){super(e),h(this,"mainContainer"),h(this,"updateDimensions",(()=>this.props.emitSizeChanged())),h(this,"toggleSider",(()=>{ye.setSiderCollapsedStateInLocalStorage(!this.state.collapsed),this.setState({collapsed:!this.state.collapsed})})),this.mainContainer=u.createRef(),this.state={collapsed:!1,me:{}}}componentWillUnmount(){super.componentWillUnmount&&super.componentWillUnmount(),this.updateDimensions(),window.removeEventListener("resize",this.updateDimensions)}componentDidUpdate(e){this.props.location.pathname!==e.location.pathname&&this.props.isMobile&&this.setState({collapsed:!0})}componentDidMount(){this.updateDimensions(),window.addEventListener("resize",this.updateDimensions),be.isLoggedIn()?this.setState({collapsed:ye.getSiderCollapsedStateFromLocalStorage()}):this.goToLogin()}goToLogin(){this.props.history.push("/login")}logout(){this.apiManager.setAuthToken(""),ye.setAdmin(!1),this.goToLogin()}createUpdateAvailableIfNeeded(){const e=this;return m(p.exports.Fragment,{children:m(ke,{onLinkClicked:()=>e.props.history.push("/settings")})})}render(){const e=this,t=[...this.props.isAdmin?[{key:"dashboard",name:"Dashboard",icon:m(Y,{})},{key:"transactions",name:"TRANSACTIONS",icon:m(j,{})},{key:"staff",name:"STAFF",icon:m($,{})}]:[{key:"transactions",name:"Transactions",icon:m(j,{})}],{key:"settings",name:"SETTINGS",icon:m(Z,{})}];return g(X,{className:"full-screen",children:[m(_e,{className:"header",style:{padding:`0 ${this.props.isMobile?15:50}px`},children:m("div",{children:g(b,{children:[this.props.isMobile&&m(T,{span:4,children:m(A,{ghost:!0,icon:m(Q,{}),onClick:this.toggleSider})}),m(T,{lg:{span:12},xs:{span:20},children:m("div",{children:g("h3",{style:{color:"#fff"},children:[m("img",{alt:"logo",src:"/icon.png",style:{height:35,width:35,marginRight:10}}),"KAFUNDI FINANCIAL SERVICES"]})})}),!e.props.isMobile&&m(T,{span:12,children:g(b,{justify:"end",children:[m("span",{style:{marginRight:70},children:m(Ie,{})}),m("span",{children:m("span",{style:{border:"1px solid #1b8ad3",borderRadius:5,padding:8},children:g(ke,{onLinkClicked:this.logout.bind(this),children:["LOGOUT "," ",m(ee,{})]})})})]})})]})})}),g(X,{children:[m(Be,{breakpoint:"lg",trigger:this.props.isMobile&&void 0,collapsible:!0,collapsed:this.state.collapsed,width:200,collapsedWidth:e.props.isMobile?0:80,style:{zIndex:2},onCollapse:this.toggleSider,children:g(te,{selectedKeys:[this.props.location.pathname.substring(1)],theme:"dark",mode:"inline",defaultSelectedKeys:["users"],style:{height:"100%",borderRight:0},children:[t.map((e=>{var t;return(null==(t=e.subitems)?void 0:t.length)?m(te.SubMenu,{icon:e.icon,title:e.name,children:e.subitems.map((e=>m(te.Item,{children:m(se,{to:`/${e.key}`,className:"nav-text",children:e.name})},e.key)))},e.key):m(te.Item,{children:g(se,{to:`/${e.key}`,className:"nav-text",children:[e.icon,m("span",{children:e.name})]})},e.key)})),this.props.isMobile&&g(p.exports.Fragment,{children:[m("div",{style:{backgroundColor:"rgba(255, 255, 255, 0.65)",height:1,width:"80%",margin:"15px auto"}}),m("div",{className:"ant-menu-item",role:"menuitem",style:{paddingLeft:24},children:g(ke,{onLinkClicked:this.logout.bind(this),children:[m(ee,{}),"LOGOUT"]})})]})]})}),m(qe,{children:m("div",{ref:e.mainContainer,style:{paddingTop:12,paddingBottom:0,height:"100%",overflowY:"scroll",marginRight:e.state.collapsed?0:e.props.isMobile?-200:0,transition:"margin-right 0.3s ease"},id:"main-content-layout",children:g(ae,{children:[m(ie,{path:"/dashboard/",component:ve}),m(ie,{path:"/staff/",component:Fe}),m(ie,{path:"/transactions",component:Ue}),m(ie,{path:"/settings/",component:je}),m(ie,{path:"/",component:Ee})]})},e.props.rootElementKey)})]})]})}});const We={isAdmin:ye.isAdmin(),isMobile:Ae.isMobile()};const Ge=ne({globalReducer:function(e=We,t){switch(t.type){case"ROOT_KEY_CHANGED":return l(o({},e),{rootElementKey:Ae.generateUuidV4()});case"SIZE_CHANGED":return l(o({},e),{isMobile:Ae.isMobile()});default:return e}}}),$e=re(le)(oe)(Ge);class Je extends p.exports.Component{constructor(e){super(e),this.state={themeLoaded:!1};const t=ye.getDarkModeFromLocalStorage();Me.loadTheme(t).then((()=>{this.setState({themeLoaded:!0})}))}render(){const{themeLoaded:e}=this.state;return e?m(he,{store:$e,children:m("div",{className:"full-screen",children:m(de,{children:g(ae,{children:[m(ie,{path:"/login/",component:xe}),m(ie,{path:"/",component:He})]})})})}):m("div",{})}}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)),ce.render(m(Je,{}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((e=>{e.unregister()}));
