document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navList = document.getElementById('nav-list');
  
  function toggleMenu() {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    navList.setAttribute('aria-hidden', isExpanded);
    
    hamburger.classList.toggle('active');
    navList.classList.toggle('active');
    document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
  }
  
  hamburger.addEventListener('click', toggleMenu);
  
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navList.classList.contains('active')) {
        toggleMenu();
      }
    });
  });
  
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  hamburger.addEventListener('click', function() {
  if (!navList.classList.contains('active')) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link, index) => {
      link.style.animation = `fadeInDown 0.5s ease forwards ${index * 0.1}s`;
    });
  } else {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.style.animation = '';
    });
  }
});
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});