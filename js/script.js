// Create floating particles
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 30;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random properties
    const size = Math.random() * 8 + 2;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = Math.random() * 15 + 10;
    const opacity = Math.random() * 0.3 + 0.1;
    
    // Apply styles
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.opacity = opacity;
    
    // Random color
    const colors = ['rgba(124, 58, 237, 0.2)', 'rgba(236, 72, 153, 0.2)', 'rgba(6, 182, 212, 0.2)'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    particlesContainer.appendChild(particle);
  }
}

// Header scroll effect
window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Smooth scroll for header links
document.querySelectorAll('header nav a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault(); 
    const target = document.querySelector(a.getAttribute('href'));
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

// Reveal on scroll with Intersection Observer
const obs = new IntersectionObserver((entries) => {
  entries.forEach(entry => { 
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      
      // Animate skill bars
      if (entry.target.id === 'skills') {
        document.querySelectorAll('.bar').forEach(bar => {
          const width = bar.getAttribute('data-width');
          bar.style.setProperty('--width', width);
          bar.querySelector('i').style.width = width;
        });
      }
      
      // Animate projects with staggered delay
      if (entry.target.id === 'projects') {
        const projects = document.querySelectorAll('.project');
        projects.forEach((project, index) => {
          setTimeout(() => {
            project.classList.add('animate__fadeInUp');
          }, index * 100);
        });
      }
    }
  });
}, {threshold: 0.1});

document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

// Project modal logic
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalLink = document.getElementById('modal-link');

document.querySelectorAll('.project').forEach(project => {
  project.addEventListener('click', () => {
    const data = JSON.parse(project.getAttribute('data-project'));
    modalTitle.textContent = data.title;
    modalBody.innerHTML = `<p>${data.desc.replace(/\n\n/g, '</p><p>')}</p><p><strong>Technologies:</strong> ${data.tech}</p>`;
    modalLink.href = data.link || '#';
    modal.classList.add('open');
  });
});

document.getElementById('modal-close').addEventListener('click', () => modal.classList.remove('open'));
document.getElementById('modal-close-2').addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', (e) => { if(e.target === modal) modal.classList.remove('open') });

// Typing animation for roles
const roles = ['Aspiring Data Scientist', 'Web Developer', 'Problem Solver', 'Tech Enthusiast'];
const typingText = document.getElementById('typing-text');
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeRoles() {
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typingText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typingText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }
  
  if (!isDeleting && charIndex === currentRole.length) {
    typingSpeed = 1500;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 500;
  }
  
  setTimeout(typeRoles, typingSpeed);
}

// Small keyboard shortcut to open email: press 'e'
document.addEventListener('keydown', (e) => { 
  if (e.key === 'e') { 
    window.location.href = 'mailto:akshayjare691@gmail.com'; 
  } 
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  createParticles();
  typeRoles();
  
  // Hide scroll indicator when user scrolls
  const scrollIndicator = document.querySelector('.scroll-indicator');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      scrollIndicator.style.opacity = '0';
      setTimeout(() => {
        scrollIndicator.style.display = 'none';
      }, 300);
    }
  });
});