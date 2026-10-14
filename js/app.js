var IMG={
  "QUA": "assets/quantix-logo.jpg",
  "KSR": "assets/ksrce-logo.jpg",
  "PRA": "assets/praskla-logo.png",
  "FLYER": "assets/flyer.jpeg"
};

(function(){
"use strict";
var useState=React.useState,useEffect=React.useEffect,useRef=React.useRef;
var h=React.createElement;
var FORM="https://docs.google.com/forms/d/e/1FAIpQLSdTKTcflw1Xd1MwzrQ62AeMMN_r6_e7ccnRiqJcwPfIb4ygmQ/viewform?usp=sharing&ouid=107403460728283306105";
var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
var canHover=window.matchMedia&&matchMedia("(hover: hover)").matches;
function pad(x){return String(x).padStart(2,"0")}

/* ---------- data ---------- */
var NAV=[["about","About"],["tracks","Domains"],["schedule","Schedule"],["rules","Guidelines"],["food","Food"],["contact","Contact"]];
var TRACKS=["Artificial Intelligence & Machine Learning","Sustainability, CleanTech & Green Energy","HealthTech & Biomedical Innovation","Cybersecurity & Blockchain Technology","Smart Agriculture & Rural Development (AgniTech)","Data Science & Analytics"];
var SCHEDULE=[
 ["23 Oct · 10:00 AM","Hackathon begins","Report for attendance and seating. Problem statements are released on the spot."],
 ["23 Oct · Afternoon","Lunch","Provided for all participants, online and on-spot."],
 ["23 Oct · Evening","Evening refreshments","Provided for all participants."],
 ["23 Oct · Night","Dinner","Provided for all participants."],
 ["Midnight","Midnight refreshments","Fuel up for the final stretch."],
 ["24 Oct · Morning","Morning refreshments & submissions","Submit your PPT, GitHub link and demo link through the Technical Committee."],
 ["24 Oct · 10:00 AM","Hackathon ends","PPT evaluation, working product demo, then the winners announcement."]
];
var MEALS=[["Lunch","23 Oct · Afternoon","utensils"],["Evening refreshments","23 Oct · Evening","cup"],["Dinner","23 Oct · Night","plate"],["Midnight refreshments","Late night","moon"],["Morning refreshments","24 Oct · Morning","sun"]];
var TICKER=["Real ideas","Real code","Real impact","24 hours","6 domains","On-spot problem statements","Pre-placement opportunities","₹450 per head","Emerald Hall"];

/* ---------- hooks ---------- */
function useInView(threshold){
  var ref=useRef(null),s=useState(false),on=s[0],set=s[1];
  useEffect(function(){
    var el=ref.current;if(!el)return;
    if(reduce||!("IntersectionObserver" in window)){set(true);return}
    var io=new IntersectionObserver(function(en){if(en[0].isIntersecting){set(true);io.disconnect()}},{threshold:threshold||.15,rootMargin:"0px 0px -6% 0px"});
    io.observe(el);return function(){io.disconnect()};
  },[]);
  return [ref,on];
}
function useCountUp(target,on,dur){
  var s=useState(reduce?target:0),v=s[0],set=s[1];
  useEffect(function(){
    if(!on||reduce){if(reduce)set(target);return}
    var t0=null,raf;
    function f(t){if(t0===null)t0=t;var p=Math.min(1,(t-t0)/(dur||1400));set(Math.round(target*(1-Math.pow(1-p,3))));if(p<1)raf=requestAnimationFrame(f)}
    raf=requestAnimationFrame(f);return function(){cancelAnimationFrame(raf)};
  },[on]);
  return v;
}
function useCountdown(){
  var T=Date.parse("2026-10-23T10:00:00+05:30"),E=Date.parse("2026-10-24T10:00:00+05:30");
  function calc(){var now=Date.now(),d=T-now,st=now<T?"before":(now<E?"live":"done");if(d<0)d=0;
    return {d:Math.floor(d/864e5),h:Math.floor(d%864e5/36e5),m:Math.floor(d%36e5/6e4),s:Math.floor(d%6e4/1e3),state:st}}
  var s=useState(calc),v=s[0],set=s[1];
  useEffect(function(){var id=setInterval(function(){set(calc())},1000);return function(){clearInterval(id)}},[]);
  return v;
}
function spot(e){var r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty("--mx",(e.clientX-r.left)+"px");e.currentTarget.style.setProperty("--my",(e.clientY-r.top)+"px")}

/* ---------- small components ---------- */
function Reveal(p){
  var r=useInView(),ref=r[0],on=r[1];
  var style=Object.assign({"--d":(p.delay||0)+"ms"},p.style||{});
  return h(p.as||"div",{ref:ref,className:"rv rv-"+(p.dir||"up")+(on?" in":"")+(p.className?" "+p.className:""),style:style,onPointerMove:p.spot&&canHover?spot:undefined},p.children);
}
function Icon(p){return h("svg",{viewBox:"0 0 24 24",width:20,height:20,fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":true},p.children)}
function Letters(p){
  return h("span",{className:"wd"},p.text.split("").map(function(c,i){
    return h("span",{key:i,className:"ch "+p.cls,"aria-hidden":"true",style:{"--i":p.start+i,"--t":(p.text.length>1?i/(p.text.length-1)*100:0)+"%"}},c);
  }));
}

/* ---------- animated network background ---------- */
function Network(np){
  var ref=useRef(null);
  useEffect(function(){
    var c=ref.current,ctx=c.getContext("2d"),w=0,hh=0,nodes=[],raf=0,visible=true;
    function size(){
      var r=c.parentElement.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2);
      w=r.width;hh=r.height;c.width=w*dpr;c.height=hh*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
      var n=Math.round(Math.min(64,Math.max(16,w*hh/24000)));
      nodes=[];for(var i=0;i<n;i++)nodes.push({x:Math.random()*w,y:Math.random()*hh,vx:(Math.random()-.5)*.32,vy:(Math.random()-.5)*.32,r:1.2+Math.random()*1.8});
      draw();
    }
    function draw(){
      ctx.clearRect(0,0,w,hh);
      var dark=!!(np&&np.onDark)||document.documentElement.getAttribute("data-theme")==="dark";
      var a=dark?"167,139,250":"109,40,217",b=dark?"96,165,250":"37,99,235",max=Math.min(150,Math.max(90,w/6));
      for(var i=0;i<nodes.length;i++){
        var p=nodes[i];
        for(var j=i+1;j<nodes.length;j++){
          var q=nodes[j],dx=p.x-q.x,dy=p.y-q.y,d=Math.sqrt(dx*dx+dy*dy);
          if(d<max){ctx.strokeStyle="rgba("+a+","+((1-d/max)*(dark?.4:.26))+")";ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke()}
        }
        ctx.fillStyle="rgba("+b+","+(dark?.8:.55)+")";ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,6.2832);ctx.fill();
      }
    }
    function step(){
      for(var i=0;i<nodes.length;i++){var p=nodes[i];p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>hh)p.vy*=-1}
      draw();
    }
    function loop(){if(visible&&!document.hidden)step();raf=requestAnimationFrame(loop)}
    size();
    var io=("IntersectionObserver" in window)?new IntersectionObserver(function(e){visible=e[0].isIntersecting}):null;
    if(io)io.observe(c);
    var t;function onR(){clearTimeout(t);t=setTimeout(size,150)}
    window.addEventListener("resize",onR);
    var ro=window.ResizeObserver?new ResizeObserver(onR):null;if(ro)ro.observe(c.parentElement);
    var mo=new MutationObserver(draw);mo.observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});
    if(!reduce)raf=requestAnimationFrame(loop);
    return function(){cancelAnimationFrame(raf);window.removeEventListener("resize",onR);if(io)io.disconnect();if(ro)ro.disconnect();mo.disconnect()};
  },[]);
  return h("canvas",{ref:ref,className:"net"+(np&&np.className?" "+np.className:""),"aria-hidden":"true"});
}

/* ---------- sections ---------- */
function Header(p){
  return h("header",{className:p.scrolled?"sm":""},
    h("div",{className:"wrap nav"},
      h("a",{className:"brand",href:"#top"},h("img",{src:IMG.QUA,alt:"Quantix logo"}),"QUANTIX 2K26"),
      h("nav",{id:"menu",className:p.open?"open":"","aria-label":"Main"},
        h("ul",null,NAV.map(function(n){return h("li",{key:n[0]},h("a",{href:"#"+n[0],className:p.active===n[0]?"on":"",onClick:function(){p.setOpen(false)}},n[1]))}))),
      h("div",{className:"actions"},
        h("button",{className:"icon-btn",onClick:p.toggleTheme,"aria-label":p.theme==="dark"?"Switch to light theme":"Switch to dark theme"},
          p.theme==="dark"
            ?h(Icon,null,h("circle",{cx:12,cy:12,r:4}),h("path",{d:"M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"}))
            :h(Icon,null,h("path",{d:"M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"}))),
        h("a",{className:"btn primary reg",href:FORM,target:"_blank",rel:"noopener"},"Register now"),
        h("button",{className:"burger"+(p.open?" x":""),"aria-label":"Toggle menu","aria-expanded":p.open,onClick:function(){p.setOpen(!p.open)}},h("i"),h("i"),h("i")))));
}

function Countdown(){
  var c=useCountdown();
  var cells=[["d","Days"],["h","Hours"],["m","Min"],["s","Sec"]];
  var note=c.state==="before"?"until kickoff at 10:00 AM":(c.state==="live"?"Hackathon is live now!":"Hackathon has ended. Thank you!");
  return h("div",{className:"count"},
    h("strong",null,"23–24 October 2026"),
    h("div",{className:"cd"},cells.map(function(x){return h("div",{key:x[0]},h("b",{key:c[x[0]],className:"tk"},pad(c[x[0]])),h("span",null,x[1]))})),
    h("small",null,note));
}

function Hero(){
  function glow(e){if(!canHover||reduce)return;var r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty("--gx",(e.clientX-r.left)+"px");e.currentTarget.style.setProperty("--gy",(e.clientY-r.top)+"px")}
  return h("div",{className:"hero",onPointerMove:glow},
    h(Network),
    h("div",{className:"wrap"},
      h("div",{className:"hero-copy"},
        h("p",{className:"presents hi"},"KSRCE AI Innovation Hub & QUANTIX Association present"),
        h("h1",{className:"mark","aria-label":"Quantix 2K26"},h(Letters,{text:"QUANTIX",cls:"q",start:0}),h("span",{className:"sp"}," "),h(Letters,{text:"2K26",cls:"k",start:7})),
        h("div",{className:"slant"},h("span",null,"24 hours ",h("i",null,"//")," hackathon")),
        h("div",{className:"circuit hi hi2"},"Real ideas. Real code. Real impact."),
        h("div",{className:"cta hi hi3"},
          h("a",{className:"btn primary pulse",href:FORM,target:"_blank",rel:"noopener"},"Register your team"),
          h("a",{className:"btn ghost",href:"#schedule"},"View schedule"))),
      h("aside",{className:"side hi hi2"},
        h("div",{className:"plate-wrap"},h("div",{className:"ring"}),h("div",{className:"plate"},h("img",{src:IMG.QUA,alt:"QUANTIX AI & DS Association emblem"}))),
        h(Countdown))));
}

function Facts(){
  var items=[["23–24 Oct 2026","10:00 AM to 10:00 AM"],["₹450 per head","Registration fee"],["1–4 members","Per team"],["22 Oct, 12 PM","Online registration closes"]];
  return h("div",{className:"facts"},h("div",{className:"wrap"},
    h("div",{className:"band"},items.map(function(x,i){return h(Reveal,{key:i,delay:i*90},h("b",null,x[0]),h("span",null,x[1]))})),
    h("p",{className:"note"},"On-spot registration is also available at Emerald Hall.")));
}

function Partners(){
  var items=[[IMG.KSR,"K.S.R. College of Engineering","Host institution"],[IMG.QUA,"QUANTIX Association","Organised by"],[IMG.PRA,"Praskla Technology","Innovation & career partner"]];
  return h("div",{className:"partners"},h("div",{className:"wrap logos"},items.map(function(x,i){
    return h(Reveal,{key:i,as:"figure",delay:i*110},h("div",{className:"lg"},h("img",{src:x[0],alt:x[1]})),x[2]);
  })));
}

function Head(p){return h(Reveal,{className:"head"},h("h2",null,p.title),h("p",null,p.sub))}

function Stat(p){
  var r=useInView(),ref=r[0],on=r[1],v=useCountUp(p.to,on);
  return h("div",{ref:ref,className:"stat rv rv-up"+(on?" in":""),style:{"--d":p.delay+"ms"}},h("b",null,v+(p.suffix||"")),h("span",null,p.label));
}

function About(){
  var cards=[["On-spot problems","Problem statements are released at kickoff. Open innovation is also allowed, though on-spot problem solvers get more positive consideration."],["Real code, real demo","Pitch your idea in a PPT, then show a working product to the judges."],["Career launchpad","Winners earn exciting rewards plus pre-placement opportunities with Praskla Technology."]];
  return h("section",{id:"about"},h("div",{className:"wrap"},
    h(Head,{title:"Build something that matters",sub:"One night, one team, one working product. Hosted by the Departments of AI&DS, CSE and CSD with the KSRCE AI Innovation Hub."}),
    h("div",{className:"cards"},cards.map(function(c,i){return h(Reveal,{key:i,className:"card spot",delay:i*110,spot:true},h("div",{className:"bar"}),h("h3",null,c[0]),h("p",null,c[1]))})),
    h("div",{className:"stats"},
      h(Stat,{to:24,suffix:"h",label:"Non-stop building",delay:0}),h(Stat,{to:6,label:"Hackathon domains",delay:90}),h(Stat,{to:2,label:"Evaluation rounds",delay:180}),h(Stat,{to:25,label:"Years of KSRCE",delay:270}))));
}

function Tracks(){
  return h("section",{id:"tracks",className:"alt"},h("div",{className:"wrap"},
    h(Head,{title:"Hackathon domains",sub:"Pick the domain that fits your team, or bring your own idea."}),
    h("div",{className:"tracks"},TRACKS.map(function(t,i){return h(Reveal,{key:i,className:"trk spot",delay:(i%3)*90,spot:true},h("b",null,i+1),h("h3",null,t))}))));
}

function Schedule(){
  var ref=useRef(null);
  useEffect(function(){
    var el=ref.current,raf=0;
    function upd(){raf=0;var r=el.getBoundingClientRect(),vh=window.innerHeight;var p=(vh*.62-r.top)/r.height;p=Math.max(0,Math.min(1,p));el.style.setProperty("--p",reduce?1:p)}
    function on(){if(!raf)raf=requestAnimationFrame(upd)}
    upd();addEventListener("scroll",on,{passive:true});addEventListener("resize",on);
    return function(){removeEventListener("scroll",on);removeEventListener("resize",on)};
  },[]);
  return h("section",{id:"schedule"},h("div",{className:"wrap"},
    h(Head,{title:"Event schedule",sub:"Emerald Hall, Abdul Kalam Block, K.S.R. College of Engineering."}),
    h("div",{className:"tl",ref:ref},SCHEDULE.map(function(s,i){
      return h(Reveal,{key:i,className:"it",dir:"left",delay:60},h("time",null,s[0]),h("h3",null,s[1]),h("p",null,s[2]));
    }))));
}

function Rules(){
  function L(items){return h("ul",{className:"ck"},items.map(function(t,i){var m=t.indexOf("Mandatory: ")===0;return m?h("li",{key:i,className:"must-li"},h("span",{className:"must"},"Mandatory"),t.slice(11)):h("li",{key:i},t)}))}
  var cards=[
    ["Bring with you",["Mandatory: Bringing a laptop is compulsory for every team","College ID card and registration details","One junction box per team","Report to Emerald Hall, Abdul Kalam Block for attendance and seating","Follow the organising committee and volunteers throughout"]],
    ["Evaluation",["PPT evaluation: present your idea and approach","Product evaluation: demo your working product","Submit PPT, GitHub link and demo link via the Technical Committee before evaluation","Winners announced on the morning of 24 October"]],
    ["Registration",["₹450 per head, 1 to 4 members per team","Online registration closes on 22 October at 12 PM","On-spot registration is available","Problem statements are released on the spot; open innovation is also allowed"]]];
  return h("section",{id:"rules",className:"alt"},h("div",{className:"wrap"},
    h(Head,{title:"Guidelines",sub:"Please read these before submitting your registration."}),
    h("div",{className:"two"},cards.map(function(c,i){return h(Reveal,{key:i,className:"card spot",delay:i*110,spot:true},h("h3",null,c[0]),L(c[1]))}))));
}

function MealIcon(p){
  var k=p.k,c;
  if(k==="utensils")c=[h("path",{key:1,d:"M3 2v7a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6a2 2 0 0 0 2 2h3zm0 0v7"})];
  else if(k==="cup")c=[h("path",{key:1,d:"M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4zM6 2v2M10 2v2M14 2v2"})];
  else if(k==="plate")c=[h("circle",{key:1,cx:12,cy:12,r:9}),h("circle",{key:2,cx:12,cy:12,r:4})];
  else if(k==="moon")c=[h("path",{key:1,d:"M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"})];
  else c=[h("circle",{key:1,cx:12,cy:12,r:4}),h("path",{key:2,d:"M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"})];
  return h("svg",{viewBox:"0 0 24 24",width:26,height:26,fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":true},c);
}
function Food(){
  return h("section",{id:"food"},h("div",{className:"wrap"},
    h(Head,{title:"Food & refreshments",sub:"Stay fuelled all night. Everything below is provided for every participant."}),
    h(Reveal,{className:"allpill"},h("i",null),"For all participants · online and on-spot registrations"),
    h(Reveal,{as:"ol",className:"meals",delay:80},MEALS.map(function(m,i){
      return h("li",{key:i,className:"meal",style:{"--i":i}},
        h("span",{className:"ic"},h(MealIcon,{k:m[2]})),
        h("h3",null,m[0]),h("time",null,m[1]));
    }))));
}

function Ticker(){
  function set(hide){return h("div",{className:"tk-set","aria-hidden":hide?"true":undefined},TICKER.map(function(t,i){return h("span",{key:i},t)}))}
  return h("div",{className:"ticker",role:"presentation"},h("div",{className:"tk-row"},set(false),set(true)));
}

function Rewards(){
  return h("section",{className:"rewards"},h("div",{className:"wrap"},
    h(Reveal,{className:"ribbon",dir:"zoom"},h("h2",null,"Exciting rewards for winners + pre-placement opportunities")),
    h(Reveal,{as:"p",delay:120},"Top teams take home prizes and a fast track to opportunities with our innovation and career partner, Praskla Technology."),
    h(Reveal,{delay:220},h("a",{className:"btn primary pulse",href:FORM,target:"_blank",rel:"noopener"},"Claim your spot"))));
}

function Poster(){
  var ref=useRef(null);
  function move(e){if(!canHover||reduce)return;var r=e.currentTarget.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    ref.current.style.transform="perspective(900px) rotateY("+(x*8)+"deg) rotateX("+(-y*8)+"deg)"}
  function leave(){if(ref.current)ref.current.style.transform=""}
  return h("section",null,h("div",{className:"wrap posterwrap"},
    h(Reveal,{dir:"left",className:"pw",style:{}},h("div",{className:"tilt",onPointerMove:move,onPointerLeave:leave},h("img",{ref:ref,src:IMG.FLYER,alt:"QUANTIX 2K26 24-hour hackathon flyer",loading:"lazy"}))),
    h(Reveal,{delay:120,dir:"right"},h("h2",null,"Join us at Emerald Hall"),
      h("ul",{className:"meta"},
        h("li",null,h("b",null,"Venue: "),"Emerald Hall, K.S.R. College of Engineering, Tiruchengode"),
        h("li",null,h("b",null,"When: "),"23 October 2026, 10:00 AM to 24 October 2026, 10:00 AM"),
        h("li",null,h("b",null,"Organised by: "),"QUANTIX Association")),
      h("a",{className:"btn primary",href:FORM,target:"_blank",rel:"noopener"},"Register on Google Forms"))));
}

function Contact(){
  function tel(n){return h("a",{href:"tel:+91"+n},n)}
  return h("section",{id:"contact",className:"alt"},h("div",{className:"wrap"},
    h(Head,{title:"Contact us",sub:"Questions about registration or the event? Call us."}),
    h("div",{className:"two ct"},
      h(Reveal,{className:"card spot",spot:true},h("h3",null,"Student coordinators"),h("ul",null,
        h("li",null,"Gopinath D · ",tel("7010879522")),h("li",null,"Nishanth M.S. · ",tel("7604990204")),h("li",null,"Abinaya Sri S · ",tel("9751817592")))),
      h(Reveal,{className:"card spot",delay:110,spot:true},h("h3",null,"Faculty coordinator"),h("ul",null,h("li",null,"Mr. Gopinath V",h("br"),h("span",{className:"role"},"Assistant Professor, AI&DS"),h("br"),tel("9842680244")))),
      h(Reveal,{className:"card spot",delay:220,spot:true},h("h3",null,"Technical support"),h("ul",null,h("li",null,"Jestin M K",h("br"),h("span",{className:"role"},"Tech Lead"),h("br"),tel("8608067217"),h("br"),h("a",{href:"mailto:kmjestin25@gmail.com"},"kmjestin25@gmail.com")))))));
}

function mag(e){if(!canHover||reduce)return;var r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.transform="translate("+((e.clientX-r.left-r.width/2)*.22)+"px,"+((e.clientY-r.top-r.height/2)*.3)+"px)"}
function unmag(e){e.currentTarget.style.transform=""}
function copyText(t){
  function fb(){try{var a=document.createElement("textarea");a.value=t;a.setAttribute("readonly","");a.style.cssText="position:fixed;opacity:0;top:0";document.body.appendChild(a);a.select();var ok=document.execCommand("copy");document.body.removeChild(a);return ok}catch(e){return false}}
  return new Promise(function(res){
    try{if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(t).then(function(){res(true)},function(){res(fb())});return}}catch(e){}
    res(fb());
  });
}
function CopyBtn(p){
  var s=useState(0),st=s[0],set=s[1];
  useEffect(function(){if(!st)return;var t=setTimeout(function(){set(0)},1800);return function(){clearTimeout(t)}},[st]);
  return h("button",{type:"button",className:"cp"+(st===1?" ok":""),"aria-label":p.label,"aria-live":"polite",onClick:function(){copyText(p.text).then(function(ok){set(ok?1:2)})}},st===1?"Copied ✓":(st===2?"Copy failed":"Copy"));
}
function ShareBtn(){
  var s=useState(0),st=s[0],set=s[1];
  useEffect(function(){if(!st)return;var t=setTimeout(function(){set(0)},2000);return function(){clearTimeout(t)}},[st]);
  function go(){
    var url=location.href;
    if(navigator.share){navigator.share({title:"QUANTIX 2K26",text:"24-hour hackathon at K.S.R. College of Engineering, 23–24 October 2026",url:url}).catch(function(){})}
    else copyText(url).then(function(ok){set(ok?1:2)});
  }
  return h("button",{type:"button",className:"btn ghost light mg",onClick:go,onPointerMove:mag,onPointerLeave:unmag,"aria-live":"polite"},st===1?"Link copied ✓":(st===2?"Copy the address bar link":"Share this page"));
}
function calcStatus(){
  var n=Date.now();
  if(n<Date.parse("2026-10-22T12:00:00+05:30"))return {k:"open",t:"Online registration open"};
  if(n<Date.parse("2026-10-24T10:00:00+05:30"))return {k:"spot",t:"Online closed · On-spot registration available"};
  return {k:"done",t:"Event completed"};
}
function useStatus(){
  var s=useState(calcStatus),v=s[0],set=s[1];
  useEffect(function(){var id=setInterval(function(){set(calcStatus())},30000);return function(){clearInterval(id)}},[]);
  return v;
}
function Footer(){
  var c=useCountdown(),st=useStatus();
  var kick=c.state==="before"?"Kickoff in "+c.d+"d "+pad(c.h)+"h "+pad(c.m)+"m "+pad(c.s)+"s":(c.state==="live"?"The hackathon is live now!":"Thank you for being part of QUANTIX 2K26.");
  function row(label,val,tel,copy,href){
    return h("div",{className:"crow"},h("span",{className:"lbl"},label),
      h("div",{className:"cval"},h("a",{href:href},val),h(CopyBtn,{text:copy,label:"Copy "+label})));
  }
  return h("footer",{className:"site-foot"},
    h(Network,{onDark:true,className:"foot-net"}),
    h("div",{className:"wrap fin"},
      h(Reveal,{className:"fband",dir:"zoom"},
        h("div",{className:"fb-text"},
          h("span",{className:"badge "+st.k},h("i"),st.t),
          h("h3",null,"Ready to build something that matters?"),
          h("p",null,"₹450 per head · 1–4 members per team · Online registration closes 22 October, 12 PM."),
          h("small",{className:"kick"},kick)),
        h("div",{className:"fb-act"},
          h("a",{className:"btn primary mg",href:FORM,target:"_blank",rel:"noopener",onPointerMove:mag,onPointerLeave:unmag},"Register your team"),
          h(ShareBtn))),
      h("div",{className:"foot"},
        h(Reveal,{className:"fbrand"},h("img",{src:IMG.QUA,alt:""}),h("strong",null,"QUANTIX 2K26"),
          h("p",null,"24-hour hackathon, 23–24 October 2026, Emerald Hall, K.S.R. College of Engineering, Tiruchengode."),
          h("p",{className:"tagl"},"Real ideas. Real code. Real impact.")),
        h(Reveal,{className:"fnav",delay:100},h("h4",null,"Quick links"),
          h("ul",{role:"list"},NAV.map(function(n){return h("li",{key:n[0]},h("a",{href:"#"+n[0]},n[1]))}),
            h("li",{key:"reg"},h("a",{href:FORM,target:"_blank",rel:"noopener"},"Register")),
            h("li",{key:"top"},h("a",{href:"#top"},"Back to top")))),
        h(Reveal,{className:"fcon",delay:200},h("h4",null,"Get in touch"),
          row("Technical support","8608067217",true,"8608067217","tel:+918608067217"),
          row("Faculty coordinator","9842680244",true,"9842680244","tel:+919842680244"),
          row("Email","kmjestin25@gmail.com",false,"kmjestin25@gmail.com","mailto:kmjestin25@gmail.com"))),
      h(Reveal,{className:"fmark",spot:true,dir:"up"},h("span",{"aria-hidden":"true"},"QUANTIX 2K26")),
      h("div",{className:"fbottom"},
        h("span",null,"QUANTIX Association · Department of AI & DS · K.S.R. College of Engineering, Tiruchengode"),
        h("button",{type:"button",className:"fup",onClick:function(){window.scrollTo({top:0,behavior:reduce?"auto":"smooth"})}},"Back to top",h("span",{"aria-hidden":"true"}," ↑"))))
  );
}

/* ---------- app ---------- */
function App(){
  var t=useState(document.documentElement.getAttribute("data-theme")||"light"),theme=t[0],setTheme=t[1];
  var o=useState(false),open=o[0],setOpen=o[1];
  var a=useState(""),active=a[0],setActive=a[1];
  var sc=useState(false),scrolled=sc[0],setScrolled=sc[1];
  var tp=useState(false),showTop=tp[0],setShowTop=tp[1];
  var bar=useRef(null);

  function toggleTheme(){
    var n=theme==="dark"?"light":"dark";
    document.documentElement.setAttribute("data-theme",n);setTheme(n);
    try{localStorage.setItem("qx-theme",n)}catch(e){}
  }
  useEffect(function(){
    var raf=0;
    function upd(){raf=0;var y=window.scrollY,max=document.documentElement.scrollHeight-window.innerHeight;
      if(bar.current)bar.current.style.transform="scaleX("+(max>0?Math.min(1,y/max):0)+")";
      setScrolled(y>24);setShowTop(y>700)}
    function on(){if(!raf)raf=requestAnimationFrame(upd)}
    upd();addEventListener("scroll",on,{passive:true});addEventListener("resize",on);
    return function(){removeEventListener("scroll",on);removeEventListener("resize",on)};
  },[]);
  useEffect(function(){
    if(!("IntersectionObserver" in window))return;
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)setActive(e.target.id)})},{rootMargin:"-40% 0px -55% 0px"});
    NAV.forEach(function(n){var el=document.getElementById(n[0]);if(el)io.observe(el)});
    return function(){io.disconnect()};
  },[]);
  useEffect(function(){
    if(reduce)return;
    function rip(e){
      var b=e.target.closest&&e.target.closest(".btn");if(!b)return;
      var r=b.getBoundingClientRect(),d=Math.max(r.width,r.height),sp=document.createElement("span");
      sp.className="rip";sp.setAttribute("aria-hidden","true");
      sp.style.cssText="width:"+d+"px;height:"+d+"px;left:"+(e.clientX-r.left-d/2)+"px;top:"+(e.clientY-r.top-d/2)+"px";
      b.appendChild(sp);setTimeout(function(){if(sp.parentNode)sp.parentNode.removeChild(sp)},700);
    }
    document.addEventListener("pointerdown",rip,{passive:true});
    return function(){document.removeEventListener("pointerdown",rip)};
  },[]);
  useEffect(function(){
    function k(e){if(e.key==="Escape")setOpen(false)}
    addEventListener("keydown",k);return function(){removeEventListener("keydown",k)};
  },[]);

  return h(React.Fragment,null,
    h("div",{className:"progress",ref:bar,"aria-hidden":"true"}),
    h(Header,{theme:theme,toggleTheme:toggleTheme,open:open,setOpen:setOpen,active:active,scrolled:scrolled}),
    h("main",{id:"top"},h(Hero),h(Facts),h(Partners),h(Ticker),h(About),h(Tracks),h(Schedule),h(Rules),h(Food),h(Rewards),h(Poster),h(Contact)),
    h(Footer),
    h("button",{className:"totop"+(showTop?" show":""),"aria-label":"Back to top",onClick:function(){window.scrollTo({top:0,behavior:reduce?"auto":"smooth"})}},
      h(Icon,null,h("path",{d:"M12 19V5M5 12l7-7 7 7"}))));
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));
})();
