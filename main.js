// Main animations & effects (deferred)
document.addEventListener('DOMContentLoaded', () => {
  // year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // tsParticles background
  if (window.tsParticles) {
    tsParticles.load("tsparticles", {
      fpsLimit: 60,
      interactivity: { detectsOn: "canvas", events: { onHover: { enable: true, mode: "repulse" }, resize: true } },
      particles: {
        number: { value: 40, density: { enable: true, area: 800 } },
        color: { value: ["#00f6ff","#ff00d6","#8bdcff"] },
        shape: { type: "circle" },
        opacity: { value: 0.12 },
        size: { value: { min: 1, max: 4 } },
        move: { enable: true, speed: 0.6, outModes: "out" },
        links: { enable: true, distance: 160, color: "#ffffff11", opacity: 0.06, width: 1 }
      },
      detectRetina: true
    });
  }

  // Vanilla-tilt for cards
  if (window.VanillaTilt) {
    const tiltEls = document.querySelectorAll('.tilt');
    VanillaTilt.init(tiltEls, {
      max: 12,
      speed: 400,
      glare: true,
      'max-glare': 0.12,
      scale: 1.02
    });
  }

  // GSAP intro
  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline();
    tl.from('.avatar', {duration:1.1, scale:0.86, opacity:0, ease:"power3.out"});
    tl.from('.name', {duration:0.9, y:18, opacity:0, ease:"power3.out"}, "-=0.7");
    tl.from('.tagline', {duration:0.8, y:12, opacity:0}, "-=0.6");
    tl.from('.card', {duration:0.8, y:20, opacity:0, stagger:0.08, ease:"power3.out",
      scrollTrigger: { trigger: '.projects', start: 'top 80%' }
    }, "-=0.3");

    // Reveal each card on scroll
    gsap.utils.toArray('.card').forEach((card) => {
      gsap.from(card, {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none reverse" }
      });
    });
  }

  // Smooth internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // Accessibility: remove motion for reduced-motion users (redundant with CSS)
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    // stop tsParticles if running
    if (tsParticles && tsParticles.dom && tsParticles.dom.length) {
      tsParticles.dom.forEach(p => p.pause());
    }
  }
});
