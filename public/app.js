
const $=id=>document.getElementById(id);
const api=(p,o={})=>fetch(p,{...o,headers:{'Content-Type':'application/json',...(localStorage.t?{Authorization:`Bearer ${localStorage.t}`}:{})}}).then(r=>r.ok?r.json():r.json().then(Promise.reject));

$('register').onclick=()=>go('/register');
$('login').onclick=()=>go('/login');
function go(r){api(r,{method:'POST',body:JSON.stringify({email:$('email').value,password:$('password').value})}).then(d=>{if(r==='/login'){localStorage.t=d.token;init()}$('msg').textContent='✓'}).catch(e=>$('msg').textContent=e.error);}
function init(){if(!localStorage.t)return;$('auth').style.display='none';$('new').style.display='block';load();}
$('add').onclick=()=>api('/notes',{method:'POST',body:JSON.stringify({title:$('title').value,content:$('content').value})}).then(add);
function load(){api('/notes').then(ns=>{ns.forEach(add)});}
function add(n){const li=document.createElement('li');li.textContent=`${n.title}: ${n.content}`;$('notes').append(li);}
init();
