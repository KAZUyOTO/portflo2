// Shared interactivity for project detail pages
(function(){
  // Reveal on scroll
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  },{threshold:0.12});
  document.querySelectorAll('.body-content h2, .img-card, .stat, .next-link, .hero-meta, .proj-h1').forEach(el=>{
    el.classList.add('reveal'); io.observe(el);
  });

  // Cursor follower
  if(matchMedia('(pointer:fine)').matches){
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);
    let tx=0,ty=0,cx=0,cy=0,visible=false;
    window.addEventListener('mousemove', e=>{
      tx=e.clientX; ty=e.clientY;
      if(!visible){ visible=true; dot.style.opacity='.85'; }
    });
    function loop(){
      cx += (tx-cx)*.18; cy += (ty-cy)*.18;
      dot.style.left = cx+'px'; dot.style.top = cy+'px';
      requestAnimationFrame(loop);
    }
    loop();
    document.querySelectorAll('a, button, .img-card, .stat').forEach(el=>{
      el.addEventListener('mouseenter', ()=>{ dot.style.transform='translate(-50%,-50%) scale(2.6)'; dot.style.opacity='.45'; });
      el.addEventListener('mouseleave', ()=>{ dot.style.transform='translate(-50%,-50%) scale(.8)'; dot.style.opacity='.85'; });
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const id = a.getAttribute('href');
      if(id.length>1){
        const t = document.querySelector(id);
        if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth', block:'start'}); }
      }
    });
  });
})();
