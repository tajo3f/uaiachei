// script.js

// ===============================
// LOADER INICIAL
// ===============================
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";

    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 1200);
});


// ===============================
// HEADER AO ROLAR
// ===============================
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});


// ===============================
// SCROLL SUAVE MENU
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const destino = document.querySelector(this.getAttribute("href"));

    if (destino) {
      destino.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});


// ===============================
// CONTADOR ANIMADO
// ===============================
const counters = document.querySelectorAll("[data-target]");

const startCounter = () => {
  counters.forEach(counter => {
    const target = +counter.getAttribute("data-target");
    let count = 0;

    const speed = target / 100;

    const updateCount = () => {
      count += speed;

      if (count < target) {
        counter.innerText = Math.floor(count);
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target.toLocaleString("pt-BR");
      }
    };

    updateCount();
  });
};

let counterStarted = false;

window.addEventListener("scroll", () => {
  const section = document.querySelector(".counter");

  if (!section) return;

  const top = section.getBoundingClientRect().top;

  if (top < window.innerHeight - 100 && !counterStarted) {
    startCounter();
    counterStarted = true;
  }
});


// ===============================
// SLIDER DE DEPOIMENTOS
// ===============================
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

setInterval(() => {
  currentSlide++;

  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  showSlide(currentSlide);
}, 3000);


// ===============================
// REVEAL AO ROLAR
// ===============================
const revealElements = document.querySelectorAll(
  ".cat, .product, .hero-text, .hero-image, .benefits div, .cta, .testimonials"
);

function revealOnScroll() {
  revealElements.forEach(el => {
    const top = el.getBoundingClientRect().top;

    if (top < window.innerHeight - 80) {
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


// ===============================
// BOTÕES QUERO ESSE
// ===============================
document.querySelectorAll(".product button").forEach(btn => {
  btn.addEventListener("click", () => {
    alert("Adicione seu link do produto aqui depois 🔥");
  });
});


// ===============================
// PREÇOS ZERADOS IDENTIFICÁVEIS
// Troque no HTML por:
//
// class="old">R$ 0,00
// class="price">R$ 0,00
//
// Depois edite manualmente.
// ===============================


// ===============================
// EFEITO PARALLAX HERO
// ===============================
window.addEventListener("mousemove", e => {
  const cards = document.querySelectorAll(".floating-card");

  cards.forEach((card, i) => {
    const x = (window.innerWidth / 2 - e.pageX) / (25 + i * 5);
    const y = (window.innerHeight / 2 - e.pageY) / (25 + i * 5);

    card.style.transform = `translate(${x}px, ${y}px)`;
  });
});
