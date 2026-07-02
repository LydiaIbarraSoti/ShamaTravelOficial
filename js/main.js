// ===== SHAMAN TRAVEL - JAVASCRIPT PRINCIPAL =====

document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR SCROLL =====
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const updateNavbar = () => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
        navbar.classList.remove('transparent');
      } else {
        navbar.classList.remove('scrolled');
        navbar.classList.add('transparent');
      }
    };
    updateNavbar();
    window.addEventListener('scroll', updateNavbar);
  }

  // ===== MOBILE MENU =====
  

  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");
  const closeMenu = document.getElementById("closeMenu");

  if (hamburger && mobileNav && closeMenu) {

  hamburger.addEventListener("click", () => {
    mobileNav.classList.add("active");
  });

  closeMenu.addEventListener("click", () => {
    mobileNav.classList.remove("active");
  });

  mobileNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("active");
    });
  });

}

  // ===== FAQ ACCORDION =====
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ===== SCROLL REVEAL =====
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  reveals.forEach(r => observer.observe(r));

  // ===== MENORES AGES BUILDER (COTIZAR) =====
  const numMenores = document.getElementById('numMenores');
  const edadesContainer = document.getElementById('edadesContainer');

  if (numMenores && edadesContainer) {
    numMenores.addEventListener('change', () => {
      const count = parseInt(numMenores.value) || 0;
      edadesContainer.innerHTML = '';
      for (let i = 1; i <= count; i++) {
        const div = document.createElement('div');
        div.className = 'edad-input';
        div.innerHTML = `
          <span>Menor ${i}:</span>
          <input type="number" name="edad_menor_${i}" min="0" max="17" placeholder="0" required>
          <span>años</span>
        `;
        edadesContainer.appendChild(div);
      }
    });
  }

  // ===== QUOTE FORM SUBMIT =====
  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = quoteForm.querySelector('.btn-primary');
      btn.textContent = 'Enviando...';
      btn.disabled = true;
      setTimeout(() => {
        showToast('¡Solicitud enviada! Te contactaremos pronto 🌿');
        quoteForm.reset();
        if (edadesContainer) edadesContainer.innerHTML = '';
        btn.textContent = 'Solicitar Cotización';
        btn.disabled = false;
      }, 1500);
    });
  }
  // ===== TOAST =====
  window.showToast = (msg) => {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  };

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== SLIDER PREMIUM =====
  const slidesHero = document.querySelectorAll(".slide");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  if (slidesHero.length && nextBtn && prevBtn) {

    let current = 0;

    function showSlide(index) {
      slidesHero.forEach(slide => slide.classList.remove("active"));
      slidesHero[index].classList.add("active");
    }

    nextBtn.addEventListener("click", () => {
      current = (current + 1) % slidesHero.length;
      showSlide(current);
    });

    prevBtn.addEventListener("click", () => {
      current = (current - 1 + slidesHero.length) % slidesHero.length;
      showSlide(current);
    });

    setInterval(() => {
      current = (current + 1) % slidesHero.length;
      showSlide(current);
    }, 6000);
  }

  // ===== CARRUSEL DE VIAJEROS (galería por destino) =====
  (function initGaleriaViajeros() {
    const track = document.getElementById('tgalTrack');
    if (!track) return; // esta página no tiene galería

    // Las fotos se definen en cada HTML con:  window.fotosViajeros = [...]
    const fotos = window.fotosViajeros || [];
    if (!fotos.length) return;

    const prevBtn = document.getElementById('tgalPrev');
    const nextBtn = document.getElementById('tgalNext');
    const dotsWrap = document.getElementById('tgalDots');
    const GAP = 16;
    let index = 0;

    fotos.forEach((f, i) => {
      const s = document.createElement('div');
      s.className = 'tgal-slide';
      s.dataset.i = i;
      s.innerHTML =
        '<img src="' + f.img + '" alt="' + (f.nombre || 'Viajero') + '" loading="lazy">' +
        '<div class="tgal-cap"><div class="n">' + (f.nombre || '') + '</div><div class="d">' + (f.desc || '') + '</div></div>';
      track.appendChild(s);
    });
    const slides = Array.from(track.children);

    const perView = () => window.innerWidth <= 560 ? 1 : window.innerWidth <= 900 ? 2 : 3;
    const maxIndex = () => Math.max(0, slides.length - perView());
    const step = () => slides[0].getBoundingClientRect().width + GAP;

    function update() {
      index = Math.min(index, maxIndex());
      track.style.transform = 'translateX(' + (-index * step()) + 'px)';
      prevBtn.disabled = index <= 0;
      nextBtn.disabled = index >= maxIndex();
      Array.from(dotsWrap.children).forEach((d, i) => d.classList.toggle('active', i === index));
    }
    function buildDots() {
      dotsWrap.innerHTML = '';
      for (let i = 0; i <= maxIndex(); i++) {
        const b = document.createElement('button');
        b.className = 'tgal-dot' + (i === index ? ' active' : '');
        b.addEventListener('click', () => { index = i; update(); });
        dotsWrap.appendChild(b);
      }
    }

    prevBtn.addEventListener('click', () => { index--; update(); });
    nextBtn.addEventListener('click', () => { index++; update(); });

    let timer = setInterval(auto, 5000);
    function auto() { index = index >= maxIndex() ? 0 : index + 1; update(); }
    const wrap = track.closest('.tgal');
    wrap.addEventListener('mouseenter', () => clearInterval(timer));
    wrap.addEventListener('mouseleave', () => timer = setInterval(auto, 5000));

    const lb = document.createElement('div');
    lb.className = 'tgal-lb';
    lb.innerHTML = '<button class="tgal-lb-close" aria-label="Cerrar"><i class="bi bi-x-lg"></i></button><img src="" alt="">';
    document.body.appendChild(lb);
    const lbImg = lb.querySelector('img');
    slides.forEach(s => s.addEventListener('click', () => { lbImg.src = fotos[s.dataset.i].img; lb.classList.add('open'); }));
    lb.addEventListener('click', e => { if (e.target !== lbImg) lb.classList.remove('open'); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('open'); });

    let rt;
    window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { buildDots(); update(); }, 150); });

    buildDots();
    update();
  })();

  // BOTON PARA MANDAR COTIZAION POR WHATSAPP
  document.getElementById('contactForm').addEventListener('submit', function (e) 
  {  
    e.preventDefault();   
   
    const nombre = document.getElementById('nombre').value.trim();    
    const telefono = document.getElementById('telefono').value.trim();
    const texto = document.getElementById('mensaje').value.trim();   

    if (!nombre || !telefono || !texto) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    let mensaje = `¡Hola! Soy ${nombre}, mi teléfono es ${telefono}. Mensaje:  ${texto}.\n\n`;   

    const numeroWhatsApp = "529981109237"; // ← tu número
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  });

  


});
