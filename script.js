/* ========================================================================
   PROJECT: UAI, ACHEI NA SHOPEE - CORE ENGINE
   FEATURES: GSAP Animations, Live Notifications, Dynamic Grid
======================================================================== */

// 1. BANCO DE DADOS DE PRODUTOS (Array de Objetos)
// Você pode adicionar ou remover produtos aqui facilmente
const PRODUTOS_ACHADOS = [
    {
        id: 1,
        nome: "Smartwatch Ultra Series 9 Titanium - Edição Luxo",
        precoAntigo: "R$ 450,00",
        precoNovo: "R$ 187,00",
        imagem: "https://via.placeholder.com/600", // Substitua pelo link da imagem real
        link: "https://shope.ee/exemplo1",
        tag: "MAIS VENDIDO"
    },
    {
        id: 2,
        nome: "Fone de Ouvido Noise Cancelling - Black Matte",
        precoAntigo: "R$ 299,00",
        precoNovo: "R$ 124,50",
        imagem: "https://via.placeholder.com/600",
        link: "https://shope.ee/exemplo2",
        tag: "PREMIUM"
    },
    {
        id: 3,
        nome: "Projetor 4K Portátil Cinema em Casa",
        precoAntigo: "R$ 890,00",
        precoNovo: "R$ 432,00",
        imagem: "https://via.placeholder.com/600",
        link: "https://shope.ee/exemplo3",
        tag: "OFERTA"
    }
];

// 2. CONFIGURAÇÕES DAS NOTIFICAÇÕES (SOCIAL PROOF)
const nomesVendas = ["Ricardo", "Fernanda", "Gabriel", "Mariana", "Lucas", "Beatriz", "João", "Clara"];
const cidadesVendas = ["São Paulo", "Belo Horizonte", "Vitória", "Rio de Janeiro", "Curitiba", "Salvador"];

// 3. INICIALIZAÇÃO DO SITE
document.addEventListener("DOMContentLoaded", () => {
    renderizarProdutos();
    iniciarAnimacoes();
    gerenciarLoader();
    loopNotificacoes();
});

// 4. FUNÇÃO PARA GERAR O GRID DE PRODUTOS
function renderizarProdutos() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    grid.innerHTML = PRODUTOS_ACHADOS.map(produto => `
        <div class="card-achado" data-aos="fade-up">
            ${produto.tag ? `<span class="badge-new">${produto.tag}</span>` : ''}
            <div class="card-img">
                <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
            </div>
            <h3>${produto.nome}</h3>
            <div class="price-tag">
                <span class="old-p">${produto.precoAntigo}</span>
                <span class="new-p">${produto.precoNovo}</span>
            </div>
            <a href="${produto.link}" target="_blank" class="btn-link">EU QUERO O DESCONTO</a>
        </div>
    `).join('');
}

// 5. GERENCIAMENTO DO LOADER (PRÉ-CARREGAMENTO)
function gerenciarLoader() {
    const loader = document.getElementById('loader');
    
    // Simula o tempo de carregamento dos assets
    window.addEventListener('load', () => {
        setTimeout(() => {
            gsap.to(loader, {
                opacity: 0,
                duration: 0.8,
                onComplete: () => {
                    loader.style.display = 'none';
                    animarEntradaConteudo();
                }
            });
        }, 1200);
    });
}

// 6. ANIMAÇÕES DE IMPACTO (GSAP)
function iniciarAnimacoes() {
    // Efeito de Header no Scroll
    window.addEventListener("scroll", () => {
        const header = document.querySelector("header");
        header.classList.toggle("scrolled", window.scrollY > 50);
    });
}

function animarEntradaConteudo() {
    const tl = gsap.timeline();

    tl.from(".hero h1", { y: 50, opacity: 0, duration: 1, ease: "power4.out" })
      .from(".hero p", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.5")
      .from(".cat-item", { scale: 0.8, opacity: 0, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" }, "-=0.3");
}

// 7. SISTEMA DE NOTIFICAÇÕES INFINITO
function loopNotificacoes() {
    const notif = document.getElementById('liveNotif');
    const txt = document.getElementById('notifText');
    
    if (!notif) return;

    const mostrar = () => {
        const nome = nomesVendas[Math.floor(Math.random() * nomesVendas.length)];
        const cidade = cidadesVendas[Math.floor(Math.random() * cidadesVendas.length)];
        
        txt.innerHTML = `🔥 <b>${nome}</b> de ${cidade} acabou de garantir um achadinho!`;
        notif.classList.add('show');

        setTimeout(() => {
            notif.classList.remove('show');
            // Agenda a próxima notificação entre 10 e 20 segundos
            setTimeout(mostrar, Math.random() * (20000 - 10000) + 10000);
        }, 5000); // Fica visível por 5 segundos
    };

    // Primeira execução após 8 segundos
    setTimeout(mostrar, 8000);
}

// 8. LOG DE SEGURANÇA E PERFORMANCE
console.log("%c UAI, ACHEI NA SHOPEE %c v4.0 Ativa ", "color: #fff; background: #FF4500; padding: 5px; border-radius: 5px 0 0 5px;", "color: #fff; background: #333; padding: 5px; border-radius: 0 5px 5px 0;");
