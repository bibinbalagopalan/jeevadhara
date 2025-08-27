document.addEventListener("DOMContentLoaded", function() {
    
    // --- DYNAMIC CANVAS BACKGROUND ---
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    let particlesArray;
    class Particle { constructor(x, y, dX, dY, s, c) { this.x=x;this.y=y;this.directionX=dX;this.directionY=dY;this.size=s;this.color=c; } draw() { ctx.beginPath(); ctx.arc(this.x,this.y,this.size,0,Math.PI*2,false);ctx.fillStyle='rgba(165,214,167,0.5)';ctx.fill(); } update() { if (this.x>canvas.width||this.x<0) this.directionX=-this.directionX; if (this.y>canvas.height||this.y<0) this.directionY=-this.directionY; this.x+=this.directionX; this.y+=this.directionY; this.draw(); } }
    function init() { particlesArray=[]; let num = (canvas.height * canvas.width)/9000; for (let i=0;i<num;i++) { let s=(Math.random()*2)+1; let x=(Math.random()*((innerWidth-s*2)-(s*2))+s*2); let y=(Math.random()*((innerHeight-s*2)-(s*2))+s*2); let dX=(Math.random()*.4)-.2; let dY=(Math.random()*.4)-.2; particlesArray.push(new Particle(x,y,dX,dY,s,'#a5d6a7')); } }
    function connect() { let opacityValue=1; for (let a=0;a<particlesArray.length;a++) { for (let b=a;b<particlesArray.length;b++) { let distance=((particlesArray[a].x-particlesArray[b].x)*(particlesArray[a].x-particlesArray[b].x))+((particlesArray[a].y-particlesArray[b].y)*(particlesArray[a].y-particlesArray[b].y)); if (distance<(canvas.width/7)*(canvas.height/7)) { opacityValue=1-(distance/20000); ctx.strokeStyle=`rgba(165,214,167,${opacityValue})`; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(particlesArray[a].x,particlesArray[a].y); ctx.lineTo(particlesArray[b].x,particlesArray[b].y); ctx.stroke(); } } } }
    function animate() { requestAnimationFrame(animate); ctx.clearRect(0,0,innerWidth,innerHeight); for (let i=0;i<particlesArray.length;i++) { particlesArray[i].update(); } connect(); }
    window.addEventListener('resize', () => { canvas.width=innerWidth; canvas.height=innerHeight; init(); });
    init(); animate();

    // --- DYNAMIC HEADER ON SCROLL ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => { window.scrollY > 50 ? header.classList.add('scrolled') : header.classList.remove('scrolled'); });

    // --- SMOOTH SCROLL FOR NAV LINKS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => { anchor.addEventListener('click', function(e) { if(this.getAttribute('href') !== '#') { e.preventDefault(); document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' }); } }); });

    // --- INTERACTIVE TABS FOR FEATURES ---
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabLinks.forEach(link => { link.addEventListener('click', () => { const tabId=link.getAttribute('data-tab'); tabLinks.forEach(item => item.classList.remove('active')); tabPanes.forEach(pane => pane.classList.remove('active')); link.classList.add('active'); document.getElementById(tabId).classList.add('active'); }); });

    // --- INTERACTIVE AURORA EFFECT ---
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => { card.addEventListener('mousemove', e => { const rect=card.getBoundingClientRect(); const x=e.clientX-rect.left; const y=e.clientY-rect.top; card.style.setProperty('--mouse-x',`${x}px`); card.style.setProperty('--mouse-y',`${y}px`); }); });

    // --- SCROLL-IN ANIMATION ---
    const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); } }); }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));

    // --- MODAL DIALOG LOGIC ---
    const modalOverlay = document.getElementById('modal-overlay');
    const modalCloseButton = document.getElementById('modal-close-button');
    const ctaButtons = document.querySelectorAll('.cta-button');

    const showModal = () => {
        modalOverlay.classList.add('visible');
    };

    const hideModal = () => {
        modalOverlay.classList.remove('visible');
    };

    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent anchor link jump
            showModal();
        });
    });

    modalCloseButton.addEventListener('click', hideModal);
    modalOverlay.addEventListener('click', (e) => {
        // Hide modal only if clicking on the overlay itself, not the dialog
        if (e.target === modalOverlay) {
            hideModal();
        }
    });
});