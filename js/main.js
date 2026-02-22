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

  // ===== CONTACT FORM SUBMIT =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.btn-send');
      btn.textContent = 'Enviando...';
      btn.disabled = true;
      setTimeout(() => {
        showToast('Mensaje enviado correctamente ✦');
        contactForm.reset();
        btn.textContent = 'Enviar Mensaje';
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

});