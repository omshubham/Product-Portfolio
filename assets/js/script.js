'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalIcon = document.querySelector("[data-modal-icon]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalIcon.innerHTML = this.querySelector("[data-testimonials-avatar]").innerHTML;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


// Animated space background — drifting through stars
(function () {
  const canvas = document.createElement('canvas');
  canvas.id = 'space-stars';
  Object.assign(canvas.style, {
    position: 'fixed', top: '0', left: '0',
    width: '100%', height: '100%',
    zIndex: '-1', pointerEvents: 'none'
  });
  document.body.prepend(canvas);

  let W, H, ctx, stars = [], shooters = [], raf;

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function makeStar(layer) {
    // layer 0 = far/slow/tiny  |  1 = mid  |  2 = near/fast/large
    const speeds  = [0.06, 0.18, 0.42];
    const radii   = [[0.15, 0.55], [0.5, 1.1], [1.0, 2.2]];
    const opRange = [[0.2, 0.55], [0.3, 0.65], [0.4, 0.85]];
    const colors  = [
      ['255,255,255', '200,220,255'],
      ['255,255,255', '180,215,255', '255,240,200'],
      ['255,255,255', '160,210,255', '255,230,180']
    ];
    const col = colors[layer][Math.floor(Math.random() * colors[layer].length)];
    return {
      x: rand(0, W), y: rand(0, H),
      r: rand(...radii[layer]),
      speed: rand(speeds[layer] * 0.7, speeds[layer] * 1.4),
      baseOp: rand(...opRange[layer]),
      twinklePhase: rand(0, Math.PI * 2),
      twinkleSpeed: rand(0.008, 0.025),
      col, layer
    };
  }

  function makeShooter() {
    const angle = rand(-0.3, 0.3); // mostly horizontal with slight tilt
    const speed = rand(6, 12);
    return {
      x: rand(0, W), y: rand(0, H * 0.5),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed + rand(1, 3),
      len: rand(80, 180),
      life: 1.0, decay: rand(0.012, 0.022)
    };
  }

  function init() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    ctx = canvas.getContext('2d');
    stars = [];
    // Far layer — most stars, very slow
    for (let i = 0; i < 220; i++) stars.push(makeStar(0));
    // Mid layer
    for (let i = 0; i < 70;  i++) stars.push(makeStar(1));
    // Near layer — fewest, most visible
    for (let i = 0; i < 22;  i++) stars.push(makeStar(2));

    // Galaxy cluster — dense patch of faint stars
    const gx = W * rand(0.55, 0.75), gy = H * rand(0.15, 0.45);
    for (let i = 0; i < 120; i++) {
      const a = rand(0, Math.PI * 2), d = rand(0, 1) ** 1.5 * Math.min(W, H) * 0.18;
      stars.push({
        x: gx + Math.cos(a) * d * 1.6,
        y: gy + Math.sin(a) * d,
        r: rand(0.12, 0.45),
        speed: rand(0.04, 0.09),
        baseOp: rand(0.15, 0.45),
        twinklePhase: rand(0, Math.PI * 2),
        twinkleSpeed: rand(0.005, 0.018),
        col: Math.random() > 0.5 ? '220,200,255' : '200,220,255',
        layer: 0
      });
    }
  }

  function drawNebula() {
    const blobs = [
      { px: 0.12, py: 0.28, rx: 0.44, ry: 0.28, angle: 0.5,  col: '90,20,160',  a: 0.22 },
      { px: 0.82, py: 0.12, rx: 0.36, ry: 0.22, angle: -0.3, col: '15,55,175',  a: 0.18 },
      { px: 0.65, py: 0.82, rx: 0.40, ry: 0.25, angle: 0.8,  col: '0,110,155',  a: 0.16 },
      { px: 0.38, py: 0.75, rx: 0.30, ry: 0.20, angle: -0.6, col: '70,15,130',  a: 0.14 },
      { px: 0.55, py: 0.45, rx: 0.55, ry: 0.35, angle: 0.2,  col: '10,30,80',   a: 0.10 }
    ];
    for (const b of blobs) {
      const cx = W * b.px, cy = H * b.py;
      const rr = Math.min(W, H) * b.rx;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rr);
      g.addColorStop(0,   `rgba(${b.col},${b.a})`);
      g.addColorStop(0.45,`rgba(${b.col},${(b.a * 0.45).toFixed(3)})`);
      g.addColorStop(1,   'transparent');
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(b.angle);
      ctx.scale(1, b.ry / b.rx);
      ctx.translate(-cx, -cy);
      ctx.beginPath();
      ctx.arc(cx, cy, rr, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.restore();
    }
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);

    // Nebula (redrawn each frame so it's always behind stars)
    drawNebula();

    // Drift stars downward
    for (const s of stars) {
      s.y += s.speed;
      if (s.y > H + 4) { s.y = -4; s.x = rand(0, W); }

      s.twinklePhase += s.twinkleSpeed;
      const op = s.baseOp * (0.82 + 0.18 * Math.sin(s.twinklePhase));

      if (s.layer >= 1) {
        // Soft glow halo for mid/near stars
        const halo = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3.5);
        halo.addColorStop(0, `rgba(${s.col},${(op * 0.55).toFixed(3)})`);
        halo.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${s.col},${op.toFixed(3)})`;
      ctx.fill();
    }

    // Shooting stars — spawn randomly
    if (Math.random() < 0.003) shooters.push(makeShooter());

    for (let i = shooters.length - 1; i >= 0; i--) {
      const s = shooters[i];
      s.x += s.vx; s.y += s.vy;
      s.life -= s.decay;
      if (s.life <= 0 || s.x > W + 50 || s.y > H + 50) { shooters.splice(i, 1); continue; }

      const tailX = s.x - s.vx * (s.len / Math.hypot(s.vx, s.vy));
      const tailY = s.y - s.vy * (s.len / Math.hypot(s.vx, s.vy));
      const grad  = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
      grad.addColorStop(0, 'transparent');
      grad.addColorStop(1, `rgba(255,255,255,${(s.life * 0.9).toFixed(3)})`);
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(s.x, s.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = s.life * 1.5;
      ctx.stroke();
    }

    raf = requestAnimationFrame(frame);
  }

  function start() {
    cancelAnimationFrame(raf);
    init();
    frame();
  }

  start();
  window.addEventListener('resize', start);
}());
