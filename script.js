/**
 * SCRIPT.JS - Uai, Achei na Shopee
 * Responsável pela renderização dinâmica, notificações e animações.
 */

// 1. BANCO DE DADOS DE PRODUTOS
// Você pode adicionar ou remover produtos aqui seguindo este padrão
const MEUS_PRODUTOS = [
    { 
        id: 1, 
        nome: "Corretor de Postura Premium – Suporte Lombar Imediato", 
        precoAntigo: "R$ 39,99", 
        precoNovo: "R$ 14,88", 
        img: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-lwyhrg9sci4f9e.webp", 
        link: "https://s.shopee.com.br/4LFgvmMQZY" 
    },
    { 
        id: 2, 
        nome: "Fone Bluetooth AirDots 3 Pro - Original Lacrado", 
        precoAntigo: "R$ 180,00", 
        precoNovo: "R$ 89,90", 
        img: "https://down-br-br.img.susercontent.com/file/7c050f4a7c1b5a5c68f7b5b5c68f7b5b", 
        link: "#" 
    },
    { 
        id: 3, 
        nome: "Kit Cozinha Utensílios de Silicone - 12 Peças", 
        precoAntigo: "R$ 120,00", 
        precoNovo: "R$ 54,90", 
        img: "https://down-br-br.img.susercontent.com/file/9b1076f8a85f4e1f8a85f4e1f8a85f4e", 
        link: "#" 
    },
    { 
        id: 4, 
        nome: "Mini Projetor Portátil 4K UHD - Cinema em Casa", 
        precoAntigo: "R$ 450,00", 
        precoNovo: "R$ 297,00", 
        img: "https://down-br-br.img.susercontent.com/file/3a1c6e7d8f9a0b1c2d3e4f5g6h7j8k9l", 
        link: "#" 
    }
];

// 2. DADOS PARA AS NOTIFICAÇÕES (Simulação de Vendas)
const f_nomes = ["Gabriel", "Juliana", "Thiago", "Amanda", "Lucas", "Fernanda", "Ricardo", "Beatriz", "João", "Ellen"];
const f_cidades = ["Vitória", "São Paulo", "Rio de Janeiro", "Curitiba", "Salvador", "Fortaleza", "Belo Horizonte", "Cariacica"];

/**
 * FUNÇÃO: Renderizar os cards no grid
 */
function renderizarProdutos() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    grid.innerHTML = MEUS_PRODUTOS.map(p => `
        <div class="card-achado">
            <div class="card-img">
                <img src="${p.img}" alt="${p.nome}" loading="lazy">
            </div>
            <h3>${p.nome}</h3>
            <span class="old-p">${p.precoAntigo}</span>
            <span class="new-p">${p.precoNovo}</span>
            <a href="${p.link}" target="_blank" class="btn-link">RESGATAR OFERTA</a>
        </div>
    `).join('');
}

/**
 * FUNÇÃO: Lógica das Notificações "Live"
 */
function dispararNotificacao() {
    const el = document.getElementById('liveNotif');
    const txt = document.getElementById('notifText');
    
    if (!el || !txt) return;

    const nome = f_nomes[Math.floor(Math.random() * f_nomes.length)];
    const cidade = f_cidades[Math.floor(Math.random() * f_cidades.length)];
    
    txt.innerHTML = `<b>${nome}</b> de ${cidade} acabou de comprar!`;
    
    // Mostra a notificação
    el.classList.add('show');

    // Esconde após 4.5 segundos
    setTimeout(() => {
        el.classList.remove('show');
    }, 4500);

    // Agenda a próxima notificação para um tempo aleatório entre 10 e 20 segundos
    const proximoIntervalo = Math.random() * (20000 - 10000) + 10000;
    setTimeout(dispararNotificacao, proximoIntervalo);
}

/**
 * FUNÇÃO: Animações de Entrada (GSAP)
 */
function aplicarAnimacoes() {
    // Título do Hero descendo e aparecendo
    gsap.from(".hero h1", { 
        opacity: 0, 
        y: 100, 
        duration: 1.5, 
        ease: "power4.out" 
    });

    // Frase do Hero
    gsap.from(".hero p", { 
        opacity: 0, 
        y: 30, 
        duration: 1, 
        delay: 0.4,
        ease: "power2.out" 
    });

    // Cards surgindo um por um (efeito stagger)
    gsap.from(".card-achado", { 
        opacity: 0, 
        y: 80, 
        stagger: 0.2, 
        duration: 1, 
        delay: 0.6,
        ease: "power3.out"
    });
}

/**
 * INICIALIZAÇÃO PRINCIPAL
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Gera os produtos na tela
    renderizarProdutos();

    // 2. Inicia o ciclo de notificações (primeira após 3 segundos)
    setTimeout(dispararNotificacao, 3000);

    // 3. Aplica as animações visuais
    if (typeof gsap !== "undefined") {
        aplicarAnimacoes();
    }
});

// Efeito de Header ao rolar a página
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = "15px 4%";
        header.style.background = "rgba(0, 0, 0, 0.98)";
    } else {
        header.style.padding = "25px 4%";
        header.style.background = "rgba(0, 0, 0, 0.95)";
    }
});
