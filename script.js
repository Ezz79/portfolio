const roles=["SOC Analyst in the making","Blue Team Enthusiast","Threat Hunter","Security Operations Learner"];let ri=0,ci=0,del=false;const typing=document.getElementById("typingText");
function type(){const t=roles[ri];typing.textContent=del?t.slice(0,--ci):t.slice(0,++ci);if(!del&&ci===t.length){del=true;return setTimeout(type,1500)}if(del&&ci===0){del=false;ri=(ri+1)%roles.length}setTimeout(type,del?45:75)}type();

const navLinks=[...document.querySelectorAll("nav a")];const sections=[...document.querySelectorAll("section[id]")];
window.addEventListener("scroll",()=>{let y=scrollY+120;let current=sections.reduce((a,s)=>s.offsetTop<=y?s.id:a,"home");navLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+current))});
document.getElementById("menuBtn").onclick=()=>document.body.classList.toggle("mobile-open");
navLinks.forEach(a=>a.onclick=()=>document.body.classList.remove("mobile-open"));

document.getElementById("themeBtn").onclick=()=>{document.body.classList.toggle("light");document.getElementById("themeBtn").textContent=document.body.classList.contains("light")?"☀":"☾";localStorage.theme=document.body.classList.contains("light")?"light":"dark"};
if(localStorage.theme==="light"){document.body.classList.add("light");document.getElementById("themeBtn").textContent="☀"}

document.querySelectorAll(".filter").forEach(btn=>btn.onclick=()=>{document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));btn.classList.add("active");const f=btn.dataset.filter;document.querySelectorAll(".project").forEach(p=>p.style.display=f==="all"||p.dataset.cat===f?"":"none")});

const modal=document.getElementById("modal");document.querySelectorAll(".open-project").forEach(btn=>btn.onclick=()=>{const p=btn.closest(".project");document.getElementById("modalTitle").textContent=p.dataset.title;document.getElementById("modalDesc").textContent=p.dataset.desc;modal.classList.add("show");modal.setAttribute("aria-hidden","false")});
function closeModal(){modal.classList.remove("show");modal.setAttribute("aria-hidden","true")}document.getElementById("closeModal").onclick=closeModal;modal.onclick=e=>{if(e.target===modal)closeModal()};document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});

const counters=[...document.querySelectorAll("[data-count]")];let counted=false;const observer=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)&&!counted){counted=true;counters.forEach(el=>{const end=+el.dataset.count;let n=0;const step=Math.max(1,Math.ceil(end/40));const timer=setInterval(()=>{n=Math.min(end,n+step);el.textContent=n;if(n===end)clearInterval(timer)},25)})}},{threshold:.3});observer.observe(document.querySelector(".stats"));
function clock(){document.getElementById("clock").textContent=new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}clock();setInterval(clock,1000);
document.querySelectorAll('a[href="#"]').forEach(a=>a.onclick=e=>e.preventDefault());