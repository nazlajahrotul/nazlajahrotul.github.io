const WA_NUMBER = '6289601973356';
window.products = [{"pid": 1, "name": "Kelinci Pastel", "img": "assets/img/bunny.svg", "price": 89000, "rating": 4.8, "desc": "Kelinci rajut lembut warna pastel. Cocok untuk hadiah."}, {"pid": 2, "name": "Dino Chillin", "img": "assets/img/dino.svg", "price": 95000, "rating": 4.7, "desc": "Dino hijau pastel yang kalem."}, {"pid": 3, "name": "Nanas Ceria", "img": "assets/img/pine.svg", "price": 72000, "rating": 4.5, "desc": "Nanas rajut ceria dengan senyuman menggemaskan."}];
// thuRs chrochet v3 main script (rest)
function $(s,p=document){return p.querySelector(s)}
function $$(s,p=document){return Array.from(p.querySelectorAll(s))}

document.addEventListener('DOMContentLoaded', function(){ 
  // hide loading
  var load = document.getElementById('loading');
  setTimeout(function(){ if(load) load.style.display='none'; document.querySelectorAll('.page-fade').forEach(function(el){el.classList.add('show')}); }, 750);

  // init slider simple
  var slides = document.getElementById('slides');
  var slide=0; setInterval(function(){ slide=(slide+1)%3; if(slides) slides.style.transform='translateX(-'+(slide*100)+'%)'; }, 4000);

  // render products grid
  var grid = document.getElementById('grid');
  window.products.forEach(function(p){ var el = document.createElement('article'); el.className='card'; el.innerHTML = '<div class=\"img\"><img src=\"'+p.img+'\" alt=\"'+p.name+'\"></div><h3>'+p.name+'</h3><div class=\"meta\">Rp '+p.price.toLocaleString('id-ID')+' • '+p.rating+'★</div><div class=\"actions\"><button class=\"icon detail\" data-id=\"'+p.pid+'\">Detail</button><button class=\"icon add\" data-id=\"'+p.pid+'\">Tambah</button><button class=\"icon fav\" data-id=\"'+p.pid+'\" aria-pressed=\"false\">❤</button></div>'; grid.appendChild(el); });
  grid.addEventListener('click', function(e){ var d = e.target.closest('.detail'); if(d){ var id = d.dataset.id; window.location.href='products/product-'+id+'.html'; } var a = e.target.closest('.add'); if(a){ var id = Number(a.dataset.id); var p = window.products.find(function(x){return x.pid===id}); addToCart(p); } });

  // cart drawer
  var cartOpen = document.getElementById('cartOpen'), cartClose = document.getElementById('cartClose'), cart = document.getElementById('cart');
  if(cartOpen) cartOpen.addEventListener('click', function(){ cart.classList.add('open'); renderCart(); });
  if(cartClose) cartClose.addEventListener('click', function(){ cart.classList.remove('open') });

  // audio toggle
  var audio = document.getElementById('bgm'); var audioToggle = document.getElementById('audioToggle'); if(audio) audio.volume=0.18;
  if(audioToggle) audioToggle.addEventListener('click', function(){ if(audio.paused) audio.play().catch(function(){}); else audio.pause(); audioToggle.textContent = audio.paused? '♪':'⏸'; });

  // theme toggle simple
  var themeBtn = document.getElementById('theme'); if(themeBtn) themeBtn.addEventListener('click', function(){ document.documentElement.classList.toggle('dark'); });

  // smooth scroll links
  document.querySelectorAll('.link').forEach(function(btn){ btn.addEventListener('click', function(){ var to = btn.getAttribute('data-to'); document.querySelector(to).scrollIntoView({behavior:'smooth'}); }); });

  renderCart();
});

function addToCart(p){ var cart = JSON.parse(localStorage.getItem('thurs_cart')||'[]'); var it = cart.find(function(x){return x.id===p.pid}); if(it) it.qty++; else cart.push({id:p.pid,name:p.name,price:p.price,img:p.img,qty:1}); localStorage.setItem('thurs_cart', JSON.stringify(cart)); renderCart(); burst(); showToast('Ditambahkan: '+p.name); }
function renderCart(){ var cartItems = document.getElementById('cartItems'); var cartCount = document.getElementById('cartCount'); var cartTotal = document.getElementById('cartTotal'); var waCart = document.getElementById('waCart'); var cart = JSON.parse(localStorage.getItem('thurs_cart')||'[]'); cartItems.innerHTML=''; var total=0; cart.forEach(function(i){ total += i.price*i.qty; var row = document.createElement('div'); row.className='cart-row'; row.innerHTML = '<div style=\"display:flex;gap:8px;align-items:center\"><img src=\"'+i.img+'\" style=\"width:48px;height:48px;border-radius:8px\"/><div><strong>'+i.name+'</strong><div>Rp '+i.price.toLocaleString('id-ID')+' x '+i.qty+'</div></div></div>'; cartItems.appendChild(row); }); cartTotal.textContent = 'Rp '+(total).toLocaleString('id-ID'); cartCount.textContent = cart.reduce(function(s,i){return s+i.qty},0); if(waCart) waCart.href = waLinkFor(cart); }
function waLinkFor(items){ if(!items || items.length===0) return 'https://wa.me/'+WA_NUMBER; var lines = items.map(function(i){ return i.name+' x'+i.qty+' (Rp '+i.price.toLocaleString('id-ID')+')' }); var total = items.reduce(function(s,i){return s + i.qty*i.price},0); var msg = 'Halo thuRs chrochet! Saya ingin order:%0A'+lines.join('%0A')+'%0A%0ATotal: Rp '+total.toLocaleString('id-ID')+'%0A%0ANama:%0AAlamat:%0A'; return 'https://wa.me/'+WA_NUMBER+'?text='+encodeURIComponent(msg); }
function showToast(m){ var t = document.getElementById('toast'); if(!t) return; t.textContent = m; t.hidden=false; setTimeout(function(){ t.hidden=true },1600); }
function burst(){ var c = document.getElementById('confetti'); if(!c) return; var ctx = c.getContext('2d'); var pieces = Array.from({length:60}, function(){ return {x:Math.random()*innerWidth,y:innerHeight+Math.random()*20,vx:(Math.random()-.5)*2,vy:-4-Math.random()*3,r:2+Math.random()*3,a:1} }); var t=0; (function tick(){ ctx.clearRect(0,0,innerWidth,innerHeight); pieces.forEach(function(p){ p.x+=p.vx; p.y+=p.vy; p.vy+=.06; p.a-=.012; ctx.globalAlpha=Math.max(p.a,0); ctx.fillStyle = t%3===0?'#ffe9a8':(t%3===1?'#b9d4ff':'#fff'); ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill(); }); t++; if(t<120) requestAnimationFrame(tick); else ctx.clearRect(0,0,innerWidth,innerHeight); })(); }
