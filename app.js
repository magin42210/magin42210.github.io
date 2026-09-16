let language='vi';
try{language=localStorage.getItem('huy-language')||'vi'}catch{}

const languageButton=document.querySelector('#language');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const motionButton=document.querySelector('#motion');
let paused=reduced.matches;

function updateMotion(){
 document.body.classList.toggle('motion-off',paused);
 motionButton.textContent=paused?'▶':'Ⅱ';
 motionButton.setAttribute('aria-label',language==='vi'?(paused?'Bật chuyển động':'Tạm dừng chuyển động'):(paused?'Play motion':'Pause motion'));
 motionButton.setAttribute('aria-pressed',String(!paused));
 window.dispatchEvent(new CustomEvent('huy-motion',{detail:{paused}}));
}

function setLanguage(value){
 language=value==='en'?'en':'vi';
 document.documentElement.lang=language;
 document.querySelectorAll('[data-vi]').forEach(element=>{element.innerHTML=element.dataset[language]});
 languageButton.textContent=language==='vi'?'EN':'VI';
 languageButton.setAttribute('aria-label',language==='vi'?'Switch to English':'Chuyển sang tiếng Việt');
 updateMotion();
 try{localStorage.setItem('huy-language',language)}catch{}
}

function getContentValue(content,path){
 return path.split('.').reduce((value,key)=>value?.[key],content);
}

function applyEditableContent(content){
 if(content.site?.title)document.title=content.site.title;
 if(content.site?.description)document.querySelector('meta[name="description"]')?.setAttribute('content',content.site.description);
 document.querySelectorAll('[data-content]').forEach(element=>{
  const value=getContentValue(content,element.dataset.content);
  if(value&&typeof value==='object'){
   if(typeof value.vi==='string')element.dataset.vi=value.vi;
   if(typeof value.en==='string')element.dataset.en=value.en;
  }else if(typeof value==='string')element.innerHTML=value;
 });
 document.querySelectorAll('[data-content-href]').forEach(element=>{
  const value=getContentValue(content,element.dataset.contentHref);
  if(typeof value==='string')element.setAttribute('href',value);
 });
 setLanguage(language);
}

async function loadEditableContent(){
 try{
  const response=await fetch('content.json',{cache:'no-cache'});
  if(!response.ok)throw new Error(`Content request failed: ${response.status}`);
  applyEditableContent(await response.json());
 }catch(error){
  console.warn('Using built-in portfolio text because content.json could not be loaded.',error);
 }
}

setLanguage(language);
loadEditableContent();
languageButton.addEventListener('click',()=>setLanguage(language==='vi'?'en':'vi'));
motionButton.addEventListener('click',()=>{paused=!paused;updateMotion()});
reduced.addEventListener('change',event=>{paused=event.matches;updateMotion()});

const progress=document.querySelector('.progress');
const siteHeader=document.querySelector('header');
let queued=false;
let lastScrollPosition=scrollY;
function updateScroll(){
 const max=document.documentElement.scrollHeight-innerHeight;
 const currentScrollPosition=Math.max(0,scrollY);
 progress.style.transform=`scaleX(${max>0?currentScrollPosition/max:0})`;
 if(currentScrollPosition<40){
  siteHeader.classList.remove('header-hidden');
 }else if(Math.abs(currentScrollPosition-lastScrollPosition)>7){
  siteHeader.classList.toggle('header-hidden',currentScrollPosition>lastScrollPosition);
  lastScrollPosition=currentScrollPosition;
 }
 queued=false;
}
addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(updateScroll)}},{passive:true});
addEventListener('resize',updateScroll);
updateScroll();
document.querySelector('#year').textContent=new Date().getFullYear();
