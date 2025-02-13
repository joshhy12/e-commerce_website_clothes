// Testimonial Slider
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let currentSlide = 0;

  function showSlide(index) {
      slides.forEach(slide => slide.classList.remove('active'));
      slides[index].classList.add('active');
  }

  function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
  }

  function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
  }

  // Auto slide every 5 seconds
  setInterval(nextSlide, 5000);

  // Button click handlers
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
});

document.addEventListener('DOMContentLoaded', function() {
    const testimonials = document.querySelectorAll('.testimonial');
    const sliderDots = document.querySelector('.slider-dots');
    let currentSlide = 0;
  
    // Create dots
    testimonials.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      sliderDots.appendChild(dot);
    });
  
    function goToSlide(n) {
      testimonials[currentSlide].classList.remove('active');
      sliderDots.children[currentSlide].classList.remove('active');
      currentSlide = n;
      testimonials[currentSlide].classList.add('active');
      sliderDots.children[currentSlide].classList.add('active');
    }
  
    function nextSlide() {
      goToSlide((currentSlide + 1) % testimonials.length);
    }
  
    // Auto advance slides
    setInterval(nextSlide, 5000);
  
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        alert('Thank you for subscribing! We\'ll keep you updated with our latest news and offers.');
        this.reset();
      });
    }
  
    // Smooth scroll for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('/')) return; // Skip if external link
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Add scroll effect to header
    const header = document.querySelector('header');
    let lastScroll = 0;
  
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
  
      if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
      }
  
      if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
      } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
      }
      lastScroll = currentScroll;
    });
  });
  
  // Add animation to category cards on scroll
  const observerOptions = {
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.category-card').forEach(card => {
    observer.observe(card);
  });
