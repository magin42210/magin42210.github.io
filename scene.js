import * as THREE from './assets/three.module.js';
const host=document.querySelector('#computer-stage');
const chapter=document.querySelector('.computer-chapter');
try { start(); } catch(error) { chapter.classList.add('scene-failed');document.body.classList.add('welcome-visible');document.body.style.setProperty('--welcome',1); console.warn('3D unavailable; showing portrait.',error); }
function start(){
 const scene=new THREE.Scene();scene.background=new THREE.Color('#e7e2d6');
 const camera=new THREE.PerspectiveCamera(35,1,.1,80);
 const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.2;
 renderer.domElement.setAttribute('aria-hidden','true');host.appendChild(renderer.domElement);
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();chapter.classList.remove('scene-ready');chapter.classList.add('scene-failed');document.body.classList.add('welcome-visible');document.body.style.setProperty('--welcome',1);renderer.setAnimationLoop(null)});
 scene.add(new THREE.HemisphereLight(0xfff8df,0x72705b,2.2));
 const key=new THREE.DirectionalLight(0xfff1d3,4);key.position.set(-5,9,7);key.castShadow=true;key.shadow.mapSize.set(2048,2048);key.shadow.camera.left=-8;key.shadow.camera.right=8;key.shadow.camera.top=8;key.shadow.camera.bottom=-8;key.shadow.normalBias=.035;key.shadow.bias=-.0002;key.shadow.radius=5;scene.add(key);
 const fill=new THREE.DirectionalLight(0xc1dbed,1.1);fill.position.set(5,4,-2);scene.add(fill);
 const glow=new THREE.PointLight(0xbecbd1,1.5,5);glow.position.set(0,2.4,3);scene.add(glow);
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.MeshStandardMaterial({color:'#e7e2d6',roughness:1}));floor.rotation.x=-Math.PI/2;floor.position.y=-3.45;floor.receiveShadow=true;scene.add(floor);
 const machine=new THREE.Group();scene.add(machine);
 const cream=new THREE.MeshStandardMaterial({color:'#bfc0a6',roughness:.65,metalness:.05});
 const side=new THREE.MeshStandardMaterial({color:'#aaa991',roughness:.8});
 const edge=new THREE.MeshStandardMaterial({color:'#626753',roughness:.65});
 const black=new THREE.MeshStandardMaterial({color:'#252e2b',roughness:.6});
 const darkkey=new THREE.MeshStandardMaterial({color:'#636b56',roughness:.7});
 const red=new THREE.MeshStandardMaterial({color:'#b64f31',roughness:.6});
 function rounded(w,h,d,r,mat,x,y,z,parent=machine){const shape=new THREE.Shape();const l=-w/2,b=-h/2;shape.moveTo(l+r,b);shape.lineTo(l+w-r,b);shape.quadraticCurveTo(l+w,b,l+w,b+r);shape.lineTo(l+w,b+h-r);shape.quadraticCurveTo(l+w,b+h,l+w-r,b+h);shape.lineTo(l+r,b+h);shape.quadraticCurveTo(l,b+h,l,b+h-r);shape.lineTo(l,b+r);shape.quadraticCurveTo(l,b,l+r,b);const geo=new THREE.ExtrudeGeometry(shape,{depth:d,bevelEnabled:true,bevelThickness:.035,bevelSize:.035,bevelSegments:2,steps:1,curveSegments:5});geo.translate(0,0,-d/2);const mesh=new THREE.Mesh(geo,mat);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;}

 // A horizontal olive desk anchors the complete vignette. No pencil.
 const olive=new THREE.MeshStandardMaterial({color:'#697454',roughness:.48,metalness:.10});
 const orange=new THREE.MeshStandardMaterial({color:'#b95425',roughness:.38,metalness:.16});
 const paper=new THREE.MeshStandardMaterial({color:'#ded3b4',roughness:.95});
 const brass=new THREE.MeshStandardMaterial({color:'#94734c',roughness:.4,metalness:.65});
 const desk=new THREE.Group();scene.add(desk);
 const top=rounded(16,7.2,.32,.38,olive,-.8,-.20,1.0,desk);top.rotation.x=-Math.PI/2;
 for(const x of [-7.4,5.8])for(const z of [-1.6,3.65]){const leg=new THREE.Mesh(new THREE.CylinderGeometry(.17,.14,3.05,16),olive);leg.position.set(x,-1.9,z);leg.castShadow=true;desk.add(leg)}
 const props=[];
 function prop(x,z,phase,dx,dz,spin){const g=new THREE.Group();g.position.set(x,.04,z);scene.add(g);props.push({g,x,z,phase,dx,dz,spin});return g}
 function mesh(geometry,material,x,y,z,parent){const m=new THREE.Mesh(geometry,material);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m}
 const speaker=prop(-3.95,.15,0,-.18,.10,-.15);
 const speakerCase=rounded(1.25,2.28,.96,.13,darkkey,0,1.16,0,speaker);speakerCase.userData.audioControl='toggle';
 const audioControlTargets=[];
 const knobMaterial=new THREE.MeshStandardMaterial({color:'#566046',roughness:.45,metalness:.34});
 const knobMarkerMaterial=new THREE.MeshStandardMaterial({color:'#a99260',roughness:.38,metalness:.68,emissive:'#1c2118',emissiveIntensity:.16});
 const knobRingMaterial=new THREE.MeshStandardMaterial({color:'#2b342a',roughness:.38,metalness:.62,emissive:'#121812',emissiveIntensity:.1});
 const volumeKnob=new THREE.Group();volumeKnob.position.set(.36,.35,.59);volumeKnob.userData.audioControl='knob';speaker.add(volumeKnob);
 const knobBase=mesh(new THREE.CylinderGeometry(.20,.20,.045,32),black,0,0,0,volumeKnob);knobBase.rotation.x=Math.PI/2;
 const knobCap=mesh(new THREE.CylinderGeometry(.15,.15,.07,32),knobMaterial,0,0,.055,volumeKnob);knobCap.rotation.x=Math.PI/2;
 const knobRing=mesh(new THREE.TorusGeometry(.205,.012,6,32),knobRingMaterial,0,0,.042,volumeKnob);
 mesh(new THREE.BoxGeometry(.027,.112,.026),knobMarkerMaterial,0,.080,.105,volumeKnob);
 for(let i=0;i<7;i++){const angle=-2.15+i*.715;const tick=mesh(new THREE.BoxGeometry(.018,.052,.018),brass,Math.sin(angle)*.252,Math.cos(angle)*.252,.055,volumeKnob);tick.rotation.z=-angle}
 const speakerIconMaterial=new THREE.MeshStandardMaterial({color:'#c16f4b',roughness:.38,metalness:.36,emissive:'#2a120e',emissiveIntensity:.08});
 const speakerIcon=new THREE.Group();speakerIcon.position.set(-.34,.35,.62);speakerIcon.userData.audioControl='toggle';speaker.add(speakerIcon);
 mesh(new THREE.BoxGeometry(.055,.13,.028),speakerIconMaterial,-.065,0,0,speakerIcon);
 const iconHorn=mesh(new THREE.CylinderGeometry(.105,.048,.12,4),speakerIconMaterial,.040,0,0,speakerIcon);iconHorn.rotation.z=Math.PI/2;
 const iconWave=mesh(new THREE.TorusGeometry(.105,.011,5,16,Math.PI*.72),speakerIconMaterial,.092,0,.020,speakerIcon);iconWave.rotation.z=-Math.PI*.36;
 const muteSlash=mesh(new THREE.BoxGeometry(.025,.255,.035),red,0,0,.045,speakerIcon);muteSlash.rotation.z=-.72;
 const speakerHitArea=new THREE.Mesh(new THREE.BoxGeometry(1.12,2.08,.018),new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}));speakerHitArea.position.set(0,1.14,.548);speakerHitArea.userData.audioControl='toggle';speaker.add(speakerHitArea);
 audioControlTargets.push(volumeKnob,speakerIcon,speakerHitArea,speakerCase);
 function driver(radius,y){const ring=mesh(new THREE.TorusGeometry(radius,.05,10,40),black,0,y,.51,speaker);const cone=mesh(new THREE.ConeGeometry(radius-.045,.14,40),edge,0,y,.53,speaker);cone.rotation.x=Math.PI/2;mesh(new THREE.SphereGeometry(radius*.30,20,12),black,0,y,.62,speaker)}
 driver(.41,.80);driver(.19,1.72);mesh(new THREE.SphereGeometry(.025,10,8),orange,.40,.20,.52,speaker);
 const notebooks=prop(-5.0,2.6,1.8,.23,-.12,.20);
 function book(w,d,y,angle){const b=new THREE.Group();b.rotation.y=angle;notebooks.add(b);rounded(w,.055,d,.025,cream,0,y,0,b);rounded(w-.06,.16,d-.08,.03,paper,0,y+.11,0,b);rounded(w,.055,d,.025,cream,0,y+.22,0,b);rounded(.032,.015,d,.007,edge,w*.31,y+.26,0,b)}
 book(2.4,1.5,.02,-.08);book(2.15,1.37,.30,.12);
 const mouse=prop(3.45,2.55,3.2,.20,.13,-.25);
 const mouseBody=mesh(new THREE.SphereGeometry(1,32,20),cream,0,.23,0,mouse);mouseBody.scale.set(.43,.23,.66);
 const seam=new THREE.CatmullRomCurve3([new THREE.Vector3(0,.42,-.54),new THREE.Vector3(0,.462,-.28),new THREE.Vector3(0,.465,0)]);mesh(new THREE.TubeGeometry(seam,14,.008,6,false),edge,0,0,0,mouse);
 const wheel=mesh(new THREE.CylinderGeometry(.06,.06,.075,16),darkkey,0,.45,-.24,mouse);wheel.rotation.z=Math.PI/2;
 const mouseCable=new THREE.CatmullRomCurve3([new THREE.Vector3(0,.11,-.62),new THREE.Vector3(.36,.055,-1.15),new THREE.Vector3(.3,.06,-1.75),new THREE.Vector3(-.5,.06,-2.3)]);mesh(new THREE.TubeGeometry(mouseCable,32,.022,6,false),cream,0,0,0,mouse);
 const lamp=prop(4.55,.0,4.7,-.11,-.08,.14);
 mesh(new THREE.CylinderGeometry(.65,.69,.15,40),orange,0,.12,0,lamp);
 mesh(new THREE.CylinderGeometry(.09,.10,2.15,20),orange,0,1.23,0,lamp);
 const armCurve=new THREE.CatmullRomCurve3([new THREE.Vector3(0,2.25,0),new THREE.Vector3(-.05,2.57,0),new THREE.Vector3(-.38,2.75,0)]);mesh(new THREE.TubeGeometry(armCurve,24,.065,10,false),brass,0,0,0,lamp);
 const shadeGroup=new THREE.Group();shadeGroup.position.set(-.43,2.62,0);shadeGroup.rotation.z=-.48;lamp.add(shadeGroup);
 const profile=[];for(let i=0;i<=20;i++){const t=i/20;profile.push(new THREE.Vector2(.11+.59*Math.sin(t*Math.PI/2),.35-t*.85))}
 const shadeMat=orange.clone();shadeMat.side=THREE.DoubleSide;mesh(new THREE.LatheGeometry(profile,40),shadeMat,0,0,0,shadeGroup);
 const innerMat=new THREE.MeshStandardMaterial({color:'#ffe5ad',emissive:'#ffbf62',emissiveIntensity:.6,side:THREE.DoubleSide});
 const inner=mesh(new THREE.CircleGeometry(.65,40),innerMat,0,-.43,0,shadeGroup);inner.rotation.x=Math.PI/2;
 const light=new THREE.PointLight(0xffbd69,5,6,2);light.position.set(-.65,2.12,.25);lamp.add(light);
 const bulb=mesh(new THREE.SphereGeometry(.13,16,12),innerMat,0,-.37,0,shadeGroup);

 // Sculpted CRT casing, with real depth and a stepped front bezel.
 rounded(5.35,3.85,1.7,.24,side,0,3.03,-.25);
 rounded(5.55,4.0,.30,.24,cream,0,3.03,.64);
 rounded(4.94,3.30,.085,.20,edge,0,3.17,.83);
 rounded(4.71,3.03,.065,.18,black,0,3.20,.91);
 // Rear ventilation, visible when the visitor rotates the machine.
 for(let i=0;i<13;i++)rounded(3.75,.035,.022,.01,edge,0,2.15+i*.16,-1.126);
 for(let i=0;i<9;i++){const v=new THREE.Mesh(new THREE.BoxGeometry(.015,.65,.045),edge);v.position.set(2.713,2.9,-.9+i*.12);machine.add(v);}
 rounded(1.05,1.0,.80,.10,side,0,.85,-.1);
 rounded(2.85,.20,1.65,.16,cream,0,.23,.05);
 rounded(2.6,.06,1.40,.10,edge,0,.08,.05);
 const led=new THREE.Mesh(new THREE.SphereGeometry(.045,12,8),new THREE.MeshStandardMaterial({color:'#a1d264',emissive:'#6b9d31',emissiveIntensity:1}));led.position.set(1.65,1.4,.83);machine.add(led);
 const power=new THREE.Mesh(new THREE.CylinderGeometry(.11,.11,.055,24),darkkey);power.rotation.x=Math.PI/2;power.position.set(2.06,1.41,.84);machine.add(power);
 function label(text,w,h,color,bg,x,y,z){const c=document.createElement('canvas');c.width=512;c.height=96;const q=c.getContext('2d');if(bg){q.fillStyle=bg;q.fillRect(0,0,512,96)}q.fillStyle=color;q.font='bold 48px monospace';q.textAlign='center';q.textBaseline='middle';q.fillText(text,256,48);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:t,transparent:true,toneMapped:false}));m.position.set(x,y,z);machine.add(m);}
 label('HUY / 21',1.10,.21,'#414c38',null,-1.75,1.40,.837);
 // Compact mechanical keyboard, key caps, and an orange spacebar.
 const keyboard=new THREE.Group();keyboard.position.set(0,.25,2.25);keyboard.rotation.x=-.12;machine.add(keyboard);
 rounded(4.8,.27,1.58,.13,cream,0,0,0,keyboard);
 const keyGeo=new THREE.BoxGeometry(.255,.15,.235);const keyMats=[cream,darkkey,red];
 for(let row=0;row<4;row++){for(let col=0;col<14;col++){if(row===3&&col>2&&col<10)continue;const k=new THREE.Mesh(keyGeo,keyMats[col===0?2:(col>11?1:0)]);k.position.set(-2.07+col*.315,.205,-.55+row*.325);k.castShadow=true;k.receiveShadow=true;keyboard.add(k);}}
 const spaceMaterial=red.clone();const space=new THREE.Mesh(new THREE.BoxGeometry(2.18,.15,.235),spaceMaterial);space.position.set(-.18,.205,.425);space.castShadow=true;space.userData.audioControl='track';keyboard.add(space);audioControlTargets.push(space);
 const spaceHitArea=new THREE.Mesh(new THREE.BoxGeometry(2.5,.28,.48),new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}));spaceHitArea.position.set(-.18,.28,.425);spaceHitArea.userData.audioControl='track';keyboard.add(spaceHitArea);audioControlTargets.push(spaceHitArea);
 // A small cable from the keyboard back towards the monitor.
 const cablePath=new THREE.CatmullRomCurve3([new THREE.Vector3(1.8,.25,1.5),new THREE.Vector3(2.7,.13,1.15),new THREE.Vector3(2.9,.12,.1),new THREE.Vector3(2.4,.22,-.8)]);
 machine.add(new THREE.Mesh(new THREE.TubeGeometry(cablePath,32,.035,6,false),darkkey));
 // The approved portrait is expanded and graded to match the retro editing room.
 const screenCanvas=document.createElement('canvas');screenCanvas.width=1440;screenCanvas.height=900;const ctx=screenCanvas.getContext('2d');
 const screenTexture=new THREE.CanvasTexture(screenCanvas);screenTexture.colorSpace=THREE.SRGBColorSpace;screenTexture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
 const screenGeo=new THREE.PlaneGeometry(4.49,2.83,32,24);const pos=screenGeo.attributes.position;for(let i=0;i<pos.count;i++){const x=pos.getX(i)/2.245,y=pos.getY(i)/1.415;pos.setZ(i,.095*(1-x*x)*(1-y*y))}screenGeo.computeVertexNormals();
 const screen=new THREE.Mesh(screenGeo,new THREE.MeshBasicMaterial({map:screenTexture,toneMapped:false}));screen.position.set(0,3.21,.965);machine.add(screen);
 const portrait=new Image();portrait.src='assets/huy-portrait-retro.png';portrait.onload=()=>{dirty=true};
 let paused=document.body.classList.contains('motion-off'),elapsed=0,dirty=true,last=0,screenTick=0;
 let rotation=-.21,tilt=.025,targetX=0,targetY=0,drag=null,audioDrag=null,moved=false,zoom=0;
 const audioFallback=document.createElement('div');audioFallback.className='audio-fallback';audioFallback.setAttribute('aria-label','Điều khiển âm thanh');
 audioFallback.innerHTML='<button class="audio-toggle" type="button" aria-label="Bật âm thanh" aria-pressed="false" title="Bật hoặc tắt âm thanh"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 9v6h4l5 4V5L8 9H4Z"></path><path class="audio-wave" d="M16 9.5a4 4 0 0 1 0 5M18.5 7a7.5 7.5 0 0 1 0 10"></path><path class="audio-slash" d="m4 4 16 16"></path></svg><span class="sr-only">Bật hoặc tắt âm thanh</span></button><button class="audio-track-switch" type="button" aria-label="Đổi bài nhạc" title="Đổi bài bằng phím Space 3D">01</button><label class="sr-only" for="volume-control">Âm lượng</label><input class="audio-range" id="volume-control" type="range" min="0" max="100" value="0" step="1" aria-label="Âm lượng" aria-valuetext="Đang tắt"><span class="sr-only" aria-live="polite"></span>';
 document.querySelector('.scene-buttons').prepend(audioFallback);
 const speakerToggle=audioFallback.querySelector('.audio-toggle');
 const trackSwitch=audioFallback.querySelector('.audio-track-switch');
 const volumeRange=audioFallback.querySelector('.audio-range');
 const audioStatus=audioFallback.querySelector('[aria-live]');
 const uploadedTrack=new Audio('assets/mot-cai-om-mck.m4a');uploadedTrack.loop=true;uploadedTrack.preload='auto';
 let volume=0,previousVolume=.62,muted=true,selectedTrack=0,audioContext=null,audioOutput=null,musicBus=null,uploadedSource=null,uploadedGain=null,noiseBuffer=null,musicTimer=null,nextMusicStep=0,musicStep=0,musicBar=0,lastKnobTick=0,spaceReleaseTimer=null;
 function isEnglish(){return document.documentElement.lang==='en'}
 function createNoiseBuffer(){
  const length=audioContext.sampleRate*2;const buffer=audioContext.createBuffer(1,length,audioContext.sampleRate);const channel=buffer.getChannelData(0);let lastNoise=0;
  for(let i=0;i<length;i++){lastNoise=lastNoise*.78+(Math.random()*2-1)*.22;channel[i]=lastNoise}
  return buffer;
 }
 function scheduleTone(frequency,start,duration,level,type='triangle'){
  if(!audioContext||!musicBus)return;const oscillator=audioContext.createOscillator();const gain=audioContext.createGain();oscillator.type=type;oscillator.frequency.value=frequency;
  gain.gain.setValueAtTime(.0001,start);gain.gain.exponentialRampToValueAtTime(level,start+.028);gain.gain.exponentialRampToValueAtTime(.0001,start+duration);
  oscillator.connect(gain).connect(musicBus);oscillator.start(start);oscillator.stop(start+duration+.03);
 }
 function scheduleNoise(start,duration,level,frequency){
  if(!audioContext||!musicBus||!noiseBuffer)return;const source=audioContext.createBufferSource();const filter=audioContext.createBiquadFilter();const gain=audioContext.createGain();source.buffer=noiseBuffer;filter.type='highpass';filter.frequency.value=frequency;
  gain.gain.setValueAtTime(level,start);gain.gain.exponentialRampToValueAtTime(.0001,start+duration);source.connect(filter).connect(gain).connect(musicBus);source.start(start);source.stop(start+duration+.02);
 }
 function scheduleKick(start){
  const oscillator=audioContext.createOscillator();const gain=audioContext.createGain();oscillator.type='sine';oscillator.frequency.setValueAtTime(92,start);oscillator.frequency.exponentialRampToValueAtTime(43,start+.13);
  gain.gain.setValueAtTime(.11,start);gain.gain.exponentialRampToValueAtTime(.0001,start+.18);oscillator.connect(gain).connect(musicBus);oscillator.start(start);oscillator.stop(start+.19);
 }
 function schedulePad(start,chord){
  chord.forEach((frequency,index)=>scheduleTone(frequency,start,2.72,index===0 ? .030 : .018,index===0?'triangle':'sine'));
 }
 function scheduleMusicStep(start,step){
  const chords=[[130.81,164.81,196],[110,130.81,164.81],[87.31,110,130.81],[98,123.47,146.83]];
  const roots=[65.41,55,43.65,49];const motifs=[[261.63,0,0,0,329.63,0,293.66,0,261.63,0,392,0,329.63,0,293.66,0],[220,0,261.63,0,329.63,0,261.63,0,220,0,329.63,0,293.66,0,261.63,0],[174.61,0,220,0,261.63,0,220,0,174.61,0,293.66,0,261.63,0,220,0],[196,0,246.94,0,293.66,0,246.94,0,196,0,329.63,0,293.66,0,246.94,0]];
  const bar=musicBar%4;if(step===0)schedulePad(start,chords[bar]);if(step===0||step===8)scheduleTone(roots[bar],start,.58,.043,'sine');
  const note=motifs[bar][step];if(note)scheduleTone(note,start,.34,.024,'sine');if(step===0||step===10)scheduleKick(start);if(step===4||step===12)scheduleNoise(start,.13,.040,1100);if(step%2===0)scheduleNoise(start,.035,.012,5200);
 }
 function scheduleMusic(){
  if(!audioContext||!musicBus)return;const stepLength=60/82/4;if(nextMusicStep<audioContext.currentTime-.5)nextMusicStep=audioContext.currentTime+.04;
  while(nextMusicStep<audioContext.currentTime+.18){scheduleMusicStep(nextMusicStep,musicStep);musicStep=(musicStep+1)%16;if(musicStep===0)musicBar++;nextMusicStep+=stepLength}
 }
 function applyTrackSelection(userInitiated=false,restart=false){
  if(!audioContext||!musicBus||!uploadedGain)return;const now=audioContext.currentTime;musicBus.gain.cancelScheduledValues(now);uploadedGain.gain.cancelScheduledValues(now);
  musicBus.gain.setTargetAtTime(selectedTrack===0 ? .90 : 0,now,.07);uploadedGain.gain.setTargetAtTime(selectedTrack===1 ? 1 : 0,now,.07);
  if(selectedTrack===1&&userInitiated){if(restart)uploadedTrack.currentTime=0;if(uploadedTrack.paused)uploadedTrack.play().catch(error=>console.warn('Uploaded track could not play.',error))}
  if(selectedTrack===0&&!uploadedTrack.paused)window.setTimeout(()=>{if(selectedTrack===0)uploadedTrack.pause()},260);
 }
 function startAudio(userInitiated=false){
  if(audioContext){audioContext.resume?.();if(userInitiated&&selectedTrack===1&&uploadedTrack.paused)uploadedTrack.play().catch(error=>console.warn('Uploaded track could not play.',error));return}
  const AudioContextConstructor=window.AudioContext||window.webkitAudioContext;if(!AudioContextConstructor)return;
  try{
   audioContext=new AudioContextConstructor();audioOutput=audioContext.createGain();audioOutput.gain.value=0;
   const masterFilter=audioContext.createBiquadFilter();masterFilter.type='lowpass';masterFilter.frequency.value=2600;masterFilter.Q.value=.35;
   const limiter=audioContext.createDynamicsCompressor();limiter.threshold.value=-10;limiter.knee.value=8;limiter.ratio.value=8;limiter.attack.value=.003;limiter.release.value=.22;
   audioOutput.connect(masterFilter);masterFilter.connect(limiter);limiter.connect(audioContext.destination);
   musicBus=audioContext.createGain();musicBus.gain.value=selectedTrack===0 ? .90 : 0;const musicFilter=audioContext.createBiquadFilter();musicFilter.type='lowpass';musicFilter.frequency.value=1850;musicFilter.Q.value=.7;musicBus.connect(musicFilter).connect(audioOutput);
   uploadedSource=audioContext.createMediaElementSource(uploadedTrack);uploadedGain=audioContext.createGain();uploadedGain.gain.value=selectedTrack===1 ? 1 : 0;uploadedSource.connect(uploadedGain).connect(audioOutput);
   const bed=audioContext.createOscillator();bed.type='triangle';bed.frequency.value=55;const bedGain=audioContext.createGain();bedGain.gain.value=.024;bed.connect(bedGain).connect(audioOutput);
   const shimmer=audioContext.createOscillator();shimmer.type='sine';shimmer.frequency.value=110;const shimmerGain=audioContext.createGain();shimmerGain.gain.value=.006;shimmer.connect(shimmerGain).connect(audioOutput);
   const flutter=audioContext.createOscillator();flutter.type='sine';flutter.frequency.value=.17;const flutterGain=audioContext.createGain();flutterGain.gain.value=2.4;flutter.connect(flutterGain).connect(shimmer.frequency);
   noiseBuffer=createNoiseBuffer();const hiss=audioContext.createBufferSource();const hissFilter=audioContext.createBiquadFilter();const hissGain=audioContext.createGain();hiss.buffer=noiseBuffer;hiss.loop=true;hissFilter.type='bandpass';hissFilter.frequency.value=3200;hissFilter.Q.value=.5;hissGain.gain.value=.007;hiss.connect(hissFilter).connect(hissGain).connect(audioOutput);
   bed.start();shimmer.start();flutter.start();hiss.start();nextMusicStep=audioContext.currentTime+.06;scheduleMusic();musicTimer=window.setInterval(scheduleMusic,90);audioContext.resume();applyTrackSelection(userInitiated);
  }catch(error){audioContext=null;audioOutput=null;musicBus=null;if(musicTimer)clearInterval(musicTimer);console.warn('Audio unavailable.',error)}
 }
 function applyAudioLevel(){
  if(!audioContext||!audioOutput)return;const target=!muted&&volume>0 ? Math.pow(volume,.72)*1.05 : 0;
  audioOutput.gain.cancelScheduledValues(audioContext.currentTime);audioOutput.gain.setTargetAtTime(target,audioContext.currentTime,.045);
 }
 function playKnobTick(){
  if(!audioContext||muted||volume<=0||performance.now()-lastKnobTick<70)return;lastKnobTick=performance.now();const now=audioContext.currentTime;const tick=audioContext.createOscillator();const tickGain=audioContext.createGain();
  tick.type='square';tick.frequency.setValueAtTime(690,now);tick.frequency.exponentialRampToValueAtTime(430,now+.026);tickGain.gain.setValueAtTime(.010*volume,now);tickGain.gain.exponentialRampToValueAtTime(.0001,now+.03);tick.connect(tickGain).connect(audioOutput);tick.start(now);tick.stop(now+.032);
 }
 function updateAudioControls(){
  const active=!muted&&volume>0;const level=Math.round(volume*100);const english=isEnglish();const trackName=selectedTrack===0?'EDIT SUITE LOOP':'MỘT CÁI ÔM · MCK';
  volumeKnob.rotation.z=-2.15+volume*4.3;knobMarkerMaterial.color.set(active?'#e0ce84':'#a99260');knobRingMaterial.color.set(active?'#a57543':'#2b342a');
  speakerIconMaterial.color.set(active?'#d8d7a8':'#c16f4b');speakerIconMaterial.emissive.set(active?'#304221':'#2a120e');speakerIconMaterial.emissiveIntensity=active ? .28 : .08;iconWave.visible=active;muteSlash.visible=!active;
  speakerToggle.setAttribute('aria-pressed',String(active));speakerToggle.setAttribute('aria-label',active?(english?'Mute sound':'Tắt âm thanh'):(english?'Turn sound on':'Bật âm thanh'));speakerToggle.title=active?(english?'Mute sound':'Tắt âm thanh'):(english?'Turn sound on':'Bật âm thanh');
  trackSwitch.textContent=selectedTrack===0?'01':'02';trackSwitch.setAttribute('aria-label',english?'Change track. Current: '+trackName:'Đổi bài nhạc. Đang chọn: '+trackName);trackSwitch.title=english?'Tap the 3D spacebar to change track':'Chạm phím Space 3D để đổi bài';audioFallback.dataset.track=String(selectedTrack+1);
  volumeRange.value=String(level);volumeRange.setAttribute('aria-valuetext',active?(english?String(level)+' percent':String(level)+' phần trăm'):(english?'Muted':'Đang tắt'));
  audioStatus.textContent=active?(english?'Sound on, '+level+' percent. Track: '+trackName+'.':'Âm thanh đang bật, '+level+' phần trăm. Bài: '+trackName+'.'):(english?'Sound muted. Selected track: '+trackName+'.':'Âm thanh đang tắt. Bài đang chọn: '+trackName+'.');
  audioFallback.dataset.muted=String(!active);applyAudioLevel();
 }
 function setVolume(next,userInitiated=false){
  const level=THREE.MathUtils.clamp(next,0,1);const changed=Math.abs(level-volume)>.005;volume=level;if(level>0){previousVolume=level;muted=false;if(userInitiated)startAudio(userInitiated)}else muted=true;
  updateAudioControls();if(userInitiated&&changed)playKnobTick();
 }
 function toggleMute(userInitiated=false){if(muted||volume===0){setVolume(previousVolume||.62,userInitiated);return}muted=true;updateAudioControls()}
 function pressSpacebar(){
  if(spaceReleaseTimer)clearTimeout(spaceReleaseTimer);space.position.y=.145;spaceMaterial.emissive.set('#7a2414');spaceMaterial.emissiveIntensity=.45;
  spaceReleaseTimer=window.setTimeout(()=>{space.position.y=.205;spaceMaterial.emissive.set('#000000');spaceMaterial.emissiveIntensity=0},135);
 }
 function changeTrack(userInitiated=false){
  selectedTrack=selectedTrack===0?1:0;pressSpacebar();
  if(muted||volume===0){setVolume(previousVolume||.62,userInitiated);applyTrackSelection(userInitiated,true)}
  else{startAudio();applyTrackSelection(userInitiated,true);updateAudioControls()}
 }
 uploadedTrack.addEventListener('error',()=>console.warn('Uploaded M4A track is unavailable.'));
 speakerToggle.addEventListener('click',()=>toggleMute(true));trackSwitch.addEventListener('click',()=>changeTrack(true));volumeRange.addEventListener('input',()=>setVolume(Number(volumeRange.value)/100,true));updateAudioControls();
 window.addEventListener('huy-motion',e=>{paused=e.detail.paused;dirty=true});
 const ray=new THREE.Raycaster();const point=new THREE.Vector2();
 function pointFromEvent(e){const r=renderer.domElement.getBoundingClientRect();point.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1)}
 function audioControlHit(e){pointFromEvent(e);ray.setFromCamera(point,camera);const hit=ray.intersectObjects(audioControlTargets,true)[0];for(let object=hit?.object;object;object=object.parent){if(object.userData.audioControl)return object.userData.audioControl}return null}
 function screenHit(e){const r=renderer.domElement.getBoundingClientRect();point.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(point,camera);return ray.intersectObject(screen)[0];}
 function seek(hit){if(hit?.uv&&hit.uv.y<.275){elapsed=Math.max(0,Math.min(29.99,((hit.uv.x*1440-150)/1210)*30));dirty=true;return true}return false}
 renderer.domElement.addEventListener('pointerdown',e=>{if(e.button!==0)return;const audioControl=audioControlHit(e);if(audioControl){audioDrag={x:e.clientX,y:e.clientY,volume,kind:audioControl,moved:false};renderer.domElement.setPointerCapture(e.pointerId);e.preventDefault();return}const hit=screenHit(e);moved=false;drag={x:e.clientX,y:e.clientY,r:rotation,t:tilt,scrub:!!(hit&&hit.uv.y<.275)};if(drag.scrub)seek(hit);renderer.domElement.setPointerCapture(e.pointerId)});
 renderer.domElement.addEventListener('pointermove',e=>{const r=renderer.domElement.getBoundingClientRect();if(audioDrag){const dx=e.clientX-audioDrag.x,dy=e.clientY-audioDrag.y;audioDrag.moved=audioDrag.moved||Math.abs(dx)+Math.abs(dy)>4;if(audioDrag.kind==='knob'&&audioDrag.moved)setVolume(audioDrag.volume+dx*.0035-dy*.006,true);return}if(drag){const dx=e.clientX-drag.x,dy=e.clientY-drag.y;moved=moved||Math.abs(dx)+Math.abs(dy)>5;if(drag.scrub){seek(screenHit(e));return}rotation=THREE.MathUtils.clamp(drag.r+dx*.004,-.72,.72);tilt=THREE.MathUtils.clamp(drag.t+dy*.001,-.07,.09);}else if(!paused&&e.pointerType==='mouse'){targetX=((e.clientX-r.left)/r.width-.5)*.12;targetY=((e.clientY-r.top)/r.height-.5)*.04;renderer.domElement.style.cursor=audioControlHit(e)?'pointer':'grab'}});
 const release=e=>{if(audioDrag){if(e.type==='pointerup'&&!audioDrag.moved){if(audioDrag.kind==='track')changeTrack(true);else toggleMute(true)}audioDrag=null;return}drag=null};renderer.domElement.addEventListener('pointerup',release);renderer.domElement.addEventListener('pointercancel',release);renderer.domElement.addEventListener('lostpointercapture',release);renderer.domElement.addEventListener('pointerleave',()=>{targetX=0;targetY=0;renderer.domElement.style.cursor='grab'});
 document.querySelector('#reset-view').addEventListener('click',()=>{rotation=-.21;tilt=.025;targetX=targetY=0});
 function rect(x,y,w,h,c){ctx.fillStyle=c;ctx.fillRect(x,y,w,h)}function text(s,x,y,size=16,c='#c7cabb',font='monospace'){ctx.fillStyle=c;ctx.font=`${size}px ${font}`;ctx.textAlign='left';ctx.fillText(s,x,y)}
 function coverPortrait(x,y,w,h){const scale=Math.max(w/portrait.naturalWidth,h/portrait.naturalHeight);const sw=w/scale,sh=h/scale;ctx.drawImage(portrait,(portrait.naturalWidth-sw)/2,(portrait.naturalHeight-sh)/2,sw,sh,x,y,w,h)}
 function draw(){
 rect(0,0,1440,900,'#252c28');rect(0,0,1440,44,'#b6bba4');text('h.  HUY EDIT SUITE',22,29,23,'#253326');text('FILE   EDIT   CLIP   SEQUENCE   WINDOW',390,29,17,'#253326');text('PROJECT 01',1260,29,16,'#253326');
 rect(8,54,264,550,'#333d35');rect(8,54,264,34,'#454e3f');text('PROJECT / HUY',23,78,17);text('FOLIO_2026',28,123,19,'#e0dec9');
 const files=['01  ABOUT_ME.PNG','02  SHORT_FORM','03  LONG_FORM','04  DOCUMENTARY'];files.forEach((s,i)=>{rect(20,144+i*45,238,34,i===0?'#6e775a':'#384238');text(s,29,167+i*45,17)});
 rect(24,345,231,175,'#202821');if(portrait.complete&&portrait.naturalWidth){coverPortrait(24,345,231,175)}text('Huy / Film portrait',23,552,15,'#b4b8a5');text('IMAGE · 01',23,580,14,'#939d86');
 rect(282,54,944,36,'#454e3f');text('PROGRAM: A LITTLE HUY',299,79,17);text('FIT   100%',1090,79,15);rect(282,96,944,472,'#17201c');
 // Fill the entire program preview without stretching the wide portrait.
 if(portrait.complete&&portrait.naturalWidth){coverPortrait(282,96,944,472)}
 const shade=ctx.createLinearGradient(0,420,0,568);shade.addColorStop(0,'rgba(0,0,0,0)');shade.addColorStop(1,'rgba(15,23,17,.6)');ctx.fillStyle=shade;ctx.fillRect(282,420,944,148);
 text('NGUYỄN TIẾN HUY',305,475,31,'#f2eedb','sans-serif');text('VIDEO EDITOR',305,511,18,'#e8bf84');text('SINCE 2021',1030,541,15,'#d1ceb7');
 rect(282,576,944,38,'#454e3f');const secs=Math.floor(elapsed);const tc='00:00:'+String(secs).padStart(2,'0')+':'+String(Math.floor(elapsed%1*30)).padStart(2,'0');text(tc,303,602,20,'#edc694');text(paused?'▶':'Ⅱ',730,602,24);text('◀    ■    ▶',810,602,19);
 rect(1236,54,196,562,'#343e34');text('AUDIO',1258,82,17);for(let j=0;j<2;j++){for(let i=0;i<24;i++){const level=paused?12:14+Math.sin(elapsed*3+j)*6;rect(1270+j*56,530-i*17,34,12,i<level?(i>19?'#d28d50':'#9baa71'):'#4a5443')}}text('L    R',1272,576,18);
 rect(8,626,1424,266,'#303b33');rect(8,626,1424,34,'#545e4a');text('SEQUENCE 01 / MY STORY',25,649,17);text('30 FPS',1290,649,16);
 for(let i=0;i<7;i++){text('00:'+String(i*5).padStart(2,'0'),158+i*190,684,14,'#c3c5b1');rect(157+i*190,692,1,182,'#566148')}
 const tracks=[{y:704,c:'#919d76',name:'V2',parts:[[0,280,'NGUYEN TIEN HUY'],[288,440,'SHORT / LONG / DOC']]},{y:752,c:'#6c866e',name:'V1',parts:[[0,190,'PORTRAIT'],[198,310,'STORY'],[516,365,'MOMENTS'],[890,308,'THE CUT']]},{y:804,c:'#b07c52',name:'A1',parts:[[0,1198,'']] }];
 tracks.forEach(t=>{text(t.name,33,t.y+25,18);t.parts.forEach(([x,w,s])=>{rect(150+x,t.y,w,38,t.c);if(s)text(s,158+x,t.y+25,15,'#1e2a22')})});
 ctx.strokeStyle='#4c3c28';ctx.lineWidth=1;ctx.beginPath();for(let x=155;x<1350;x+=4){const amplitude=5+Math.abs(Math.sin(x*.078)*Math.cos(x*.023))*21;ctx.moveTo(x,823-amplitude/2);ctx.lineTo(x,823+amplitude/2)}ctx.stroke();
 const playX=150+(elapsed/30)*1198;rect(playX,686,2,181,'#efc090');ctx.fillStyle='#efc090';ctx.beginPath();ctx.moveTo(playX-8,682);ctx.lineTo(playX+8,682);ctx.lineTo(playX,694);ctx.fill();
 text('H U Y   /   EDIT WITH FEELING',22,883,13,'#929e83');text('1920 × 1080',1240,883,13,'#929e83');
 // Subtle scan lines and corner falloff, applied to the interface only.
 ctx.fillStyle='rgba(0,0,0,.085)';for(let y=0;y<900;y+=4)ctx.fillRect(0,y,1440,1);const grad=ctx.createRadialGradient(720,420,300,720,450,870);grad.addColorStop(0,'transparent');grad.addColorStop(1,'rgba(0,0,0,.3)');ctx.fillStyle=grad;ctx.fillRect(0,0,1440,900);
 screenTexture.needsUpdate=true;document.querySelector('#timecode').textContent=tc;
 }
 let visible=true;new IntersectionObserver(entries=>{visible=entries[0].isIntersecting},{rootMargin:'100px'}).observe(host);
 function resize(){const w=host.clientWidth,h=host.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();dirty=true}new ResizeObserver(resize).observe(host);resize();
 let motionTime=0;
 let smoothZoom=matchMedia('(prefers-reduced-motion: reduce)').matches?1:0;const look=new THREE.Vector3();
 renderer.setAnimationLoop(ms=>{
 const dt=Math.min((ms-last)/1000,.05)||0;last=ms;if(document.hidden||!visible)return;if(!paused){elapsed=(elapsed+dt)%30;screenTick+=dt}if(dirty||(!paused&&screenTick>.09)){draw();screenTick=0;dirty=false}
 const mobile=host.clientWidth<760;const max=chapter.offsetHeight-innerHeight;zoom=paused?smoothZoom:THREE.MathUtils.clamp(-chapter.getBoundingClientRect().top/Math.max(max,1),0,1);smoothZoom=THREE.MathUtils.lerp(smoothZoom,zoom,.075);const reveal=THREE.MathUtils.smoothstep(smoothZoom,.46,.88);document.body.style.setProperty('--welcome',reveal);document.body.classList.toggle('welcome-visible',reveal>.05);
 if(!paused)motionTime+=dt;
 const response=(rotation+.21)+(paused?0:targetX)*3;
 for(const p of props){
  const sway=paused?0:Math.sin(motionTime*.75+p.phase)*.025;
  p.g.position.x=THREE.MathUtils.lerp(p.g.position.x,p.x+response*p.dx+sway,.055);
  p.g.position.z=THREE.MathUtils.lerp(p.g.position.z,p.z+response*p.dz+(paused?0:targetY)*2,.045);
  p.g.rotation.y=THREE.MathUtils.lerp(p.g.rotation.y,response*p.spin+sway,.05);
 }
 machine.position.y=.12;
 machine.rotation.y=THREE.MathUtils.lerp(machine.rotation.y,(rotation+(paused?0:targetX))*smoothZoom,.075);machine.rotation.x=THREE.MathUtils.lerp(machine.rotation.x,(tilt+(paused?0:targetY))*smoothZoom,.075);
 const distance=mobile?18.5:16.0;const fovTan=Math.tan(THREE.MathUtils.degToRad(camera.fov/2));const closeDistance=Math.max(2.83/(2*fovTan),4.49/(2*fovTan*camera.aspect))*1.05+1.06;const t=smoothZoom*smoothZoom*(3-2*smoothZoom);camera.position.set((mobile?0:-.30)*t,THREE.MathUtils.lerp(3.33,6.2,t),THREE.MathUtils.lerp(closeDistance,distance,t));look.set((mobile?0:-.30)*t,THREE.MathUtils.lerp(3.33,2.10,t),THREE.MathUtils.lerp(1.06,.30,t));camera.lookAt(look);
 if(!mobile){camera.setViewOffset(host.clientWidth,host.clientHeight,-host.clientWidth*.085*smoothZoom,0,host.clientWidth,host.clientHeight)}else{camera.clearViewOffset()}
 renderer.render(scene,camera);if(!chapter.classList.contains('scene-ready'))chapter.classList.add('scene-ready');
 });
}
