/* =============================================
   NAVBAR — active link + mobile toggle
   ============================================= */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar__links a');
const toggle   = document.querySelector('.navbar__toggle');
const navMenu  = document.querySelector('.navbar__links');

// Highlight the nav link whose section is in view
function updateActiveLink() {
  const scrollY = window.scrollY + 120;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(a => a.classList.remove('active'));
      const match = document.querySelector(`.navbar__links a[href="#${id}"]`);
      if (match) match.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

// Mobile menu toggle
toggle.addEventListener('click', () => {
  toggle.classList.toggle('open');
  navMenu.classList.toggle('open');
});

// Close menu on nav link click (mobile)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    toggle.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

/* =============================================
   SCROLL-REVEAL
   ============================================= */
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach(el => observer.observe(el));

/* =============================================
   CONTACT FORM
   ============================================= */
const form       = document.getElementById('contact-form');
const statusBox  = document.getElementById('form-status');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = form.querySelector('#name').value.trim();
  const email   = form.querySelector('#email').value.trim();
  const subject = form.querySelector('#subject').value.trim();
  const message = form.querySelector('#message').value.trim();

  // Basic validation
  if (!name || !email || !subject || !message) {
    showStatus('Please fill in all fields.', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showStatus('Please enter a valid email address.', 'error');
    return;
  }

  // Simulate send (replace with real API call / mailto / FormSubmit, etc.)
  const submitBtn = form.querySelector('.btn--primary');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  setTimeout(() => {
    showStatus(`Thanks ${name}! Your message has been sent. I'll be in touch soon.`, 'success');
    form.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  }, 1400);
});

function showStatus(message, type) {
  statusBox.textContent = message;
  statusBox.className = `form__status form__status--${type}`;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* =============================================
   ANIMATED COUNTER (stats)
   ============================================= */
function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1400;
  const step     = Math.ceil(target / (duration / 16));
  let current    = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current + (el.dataset.suffix || '');
  }, 16);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.stat-card__number').forEach(el => {
  counterObserver.observe(el);
});
