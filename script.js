document.addEventListener('DOMContentLoaded', () => {

  /* ---------- mobile nav ---------- */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('main-nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- hero laser cut path draw ---------- */
  const laserPath = document.getElementById('laser-path');
  if (laserPath) {
    const draw = () => {
      laserPath.style.transition = 'none';
      laserPath.style.strokeDashoffset = '1000';
      // force reflow
      void laserPath.getBoundingClientRect();
      laserPath.style.transition = 'stroke-dashoffset 4.5s linear';
      requestAnimationFrame(() => {
        laserPath.style.strokeDashoffset = '0';
      });
    };
    draw();
    setInterval(draw, 4700);
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const answer = btn.nextElementSibling;

      // close others
      document.querySelectorAll('.faq-q').forEach(other => {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
          other.nextElementSibling.style.maxHeight = null;
        }
      });

      btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      answer.style.maxHeight = expanded ? null : answer.scrollHeight + 'px';
    });
  });

  /* ---------- file drop ---------- */
  const fileDrop = document.getElementById('file-drop');
  const fileInput = document.getElementById('file');
  const fileText = document.getElementById('file-drop-text');
  if (fileDrop && fileInput) {
    ['dragenter', 'dragover'].forEach(evt =>
      fileDrop.addEventListener(evt, e => {
        e.preventDefault();
        fileDrop.classList.add('drag');
      })
    );
    ['dragleave', 'drop'].forEach(evt =>
      fileDrop.addEventListener(evt, e => {
        e.preventDefault();
        fileDrop.classList.remove('drag');
      })
    );
    fileDrop.addEventListener('drop', e => {
      const files = e.dataTransfer.files;
      if (files.length) {
        fileInput.files = files;
        fileText.textContent = files[0].name;
      }
    });
    fileInput.addEventListener('change', () => {
      if (fileInput.files.length) {
        fileText.textContent = fileInput.files[0].name;
      }
    });
  }

  /* ---------- contact form ---------- */
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = form.name.value.trim();
      const phone = form.phone.value.trim();

      if (!name || !phone) {
        status.textContent = 'Заполните имя и телефон.';
        status.style.color = '#ff5a1f';
        return;
      }

      status.style.color = '#8fd694';
      status.textContent = 'Заявка отправлена. Мы свяжемся с вами в течение 30 минут.';
      form.reset();
      fileText.textContent = 'Перетащите файл сюда или нажмите, чтобы выбрать (DXF, DWG, STEP, PDF)';
    });
  }

  /* ---------- scroll reveal for sections ---------- */
  const revealTargets = document.querySelectorAll(
    '.why-item, .service-card, .eq-card, .process-steps li, .case-card, .review-card'
  );
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealTargets.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(14px)';
      el.style.transition = 'opacity .5s ease, transform .5s ease';
      io.observe(el);
    });
  }
});
