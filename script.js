/* ========================================================================
   PROJECT: UAI, ACHEI NA SHOPEE - CORE ENGINE
   FEATURES: GSAP Animations, Live Notifications, Dynamic Grid
   ======================================================================== */

// 1. BANCO DE DADOS DE NOTIFICAÇÕES
const f_nomes = ["Biel_027", "Thiago Silva", "Julia_M", "jp_ferreira", "Amanda_L", "Gui_Tech", "beatriz.oliveira", "Vinícius Jr", "Lucas_V", "Carla.S", "Rodrigo_Achados", "Mafe.011", "Enzo_Gamer", "Larissa_Store", "Pedro_Viana", "Ana_Shopee", "Gustavo_M", "Mirella_K", "Felipe_Z", "Sophia_L", "Matheus_Dev", "Camila_R", "Igor_Achadinhos", "Bruna_P", "Léo_Souza", "Vivian_A", "Rafael_88", "Gabi_Mendes", "Heitor_V", "Brenda_L", "Cadu_Tech", "Tati_Achei", "Nando_G", "Kadu_P", "Lara_V", "João Pedro", "Fernanda A", "Murilo T", "Bianca_L", "Arthur V", "Kelly Silva", "Diego Souza", "Vanessa P", "Leandro_027", "Talita M", "Ricardo Lima", "Paty_Oficial", "Eduardo R", "Melissa Rocha", "Samuel V", "Natália Costa", "Ruan Tech", "Juliana F", "Henrique_Dev", "Paula Moraes", "Caio Martins", "Yasmin_Real", "Bruno_77", "Ana Clara", "Pedro Henrique", "Mariana Souza", "Felipe Costa", "Nathy_01", "Camila Lima", "GustavoX", "Lari_Mendes", "Jean Carlos", "Fernanda Alves", "Carlos M", "Priscila R", "João Paulo", "Tamiris Moreira", "Alyna Brandão", "Fernando Brandão", "Marcos Vinicius"];

const f_cidades = ["Afonso Cláudio", "Vitória", "Vila Velha", "Cariacica", "Serra", "Guarapari", "Linhares", "Colatina", "Aracruz", "Venda Nova do Imigrante", "Domingos Martins", "Santa Teresa", "Santa Maria de Jetibá", "Cachoeiro de Itapemirim", "Viana", "Anchieta", "Piúma", "Marataízes", "Castelo", "Iúna", "Guaçuí", "Baixo Guandu", "João Neiva", "Fundão", "Itaguaçu", "Laranja da Terra", "Marechal Floriano", "Ibiraçu", "Jaguaré", "Sooretama", "Nova Venécia", "Barra de São Francisco", "São Mateus", "Conceição da Barra", "Pedro Canário", "Pinheiros", "Montanha", "Mimoso do Sul", "Alegre", "Muqui", "Fortaleza", "Recife", "Manaus", "Goiânia", "Belém", "Porto Alegre", "Guarulhos", "Campinas", "São Luís", "São Gonçalo", "Maceió", "Duque de Caxias", "Natal", "Teresina", "São Bernardo do Campo"];

const f_acoes = ["acabou de garantir um achadinho!", "pegou uma promoção relâmpago!", "economizou R$ 60,00 agora!", "aproveitou o frete grátis!", "comprou com cupom de 50%!", "garantiu o estoque antes que acabasse!", "acabou de minerar um produto!", "pegou o menor preço do ano!", "finalizou a compra com sucesso!", "adicionou um item raro ao carrinho!", "usou o link exclusivo do Instagram!", "economizou R$ 45,00 agora!", "comprou antes de esgotar!", "garantiu o último item disponível!", "acabou de aproveitar a oferta do dia!", "recebeu frete grátis na compra!", "economizou R$ 32,90 agora!", "pegou um super desconto exclusivo!", "garantiu preço baixo por tempo limitado!", "comprou com cashback especial!", "aproveitou a promoção surpresa!", "fechou pedido com preço imperdível!", "acabou de usar cupom secreto!", "garantiu desconto no carrinho!", "economizou R$ 59,90 agora!", "comprou com entrega grátis!", "aproveitou a chance antes de virar o preço!", "pegou uma oferta rara!", "finalizou a compra em minutos!", "comprou com desconto progressivo!", "garantiu item campeão de vendas!", "aproveitou preço promocional agora!", "economizou R$ 27,50 agora!", "acabou de comprar com mega desconto!", "pegou a oferta mais buscada!", "garantiu promoção exclusiva do app!", "comprou sem pagar frete!", "aproveitou cupom limitado!", "economizou R$ 73,00 agora!", "garantiu o produto queridinho do momento!"];

// 2. BANCO DE DADOS DE PRODUTOS
const MEUS_PRODUTOS = [
    { 
        id: 1, 
        nome: "Corretor de Postura Premium – Alinhamento da Coluna e Suporte Lombar Imediato", 
        precoAntigo: "R$39,99", 
        precoNovo: "R$ 14,88", 
        img: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-lwyhrg9sci4f9e.webp", 
        link: "https://s.shopee.com.br/4LFgvmMQZY" 
    },
    { 
        id: 2, 
        nome: "Fone Bluetooth AirDots 3 Pro - Case Anti-Impacto", 
        precoAntigo: "R$ 180,00", 
        precoNovo: "R$ 89,90", 
        img: "https://via.placeholder.com/600", 
        link: "#" 
    }
];

// 3. INICIALIZAÇÃO DO SITE
document.addEventListener("DOMContentLoaded", () => {
    renderizarProdutos();
    animarEntradaConteudo();
    loopNotificacoes();
    configurarHeader();
});

// 4. RENDERIZAÇÃO DA VITRINE
function renderizarProdutos() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    grid.innerHTML = MEUS_PRODUTOS.map(p => `
        <div class="card-achado">
            <div class="card-img"><img src="${p.img}" alt="${p.nome}" loading="lazy"></div>
            <h3>${p.nome}</h3>
            <div class="price-tag">
                <span class="old-p">${p.precoAntigo}</span>
                <span class="new-p">${p.precoNovo}</span>
            </div>
            <a href="${p.link}" target="_blank" class="btn-link">RESGATAR OFERTA</a>
        </div>
    `).join('');
}

// 5. ANIMAÇÕES DE IMPACTO (GSAP)
function animarEntradaConteudo() {
    const tl = gsap.timeline();

    // Reset de opacidade para evitar "piscada"
    gsap.set(".hero h1, .hero p, .cat-item, .card-achado", { opacity: 0, y: 30 });

    tl.to(".hero h1", { opacity: 1, y: 0, duration: 1, ease: "power4.out" })
      .to(".hero p", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .to(".cat-item", { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" }, "-=0.4")
      .to(".card-achado", { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" }, "-=0.2");
}

// 6. SISTEMA DE NOTIFICAÇÕES INFINITO
function loopNotificacoes() {
    const el = document.getElementById('liveNotif');
    const txt = document.getElementById('notifText');
    
    if (!el || !txt) return;

    const mostrar = () => {
        // Sorteio de dados
        const nome = f_nomes[Math.floor(Math.random() * f_nomes.length)];
        const cidade = f_cidades[Math.floor(Math.random() * f_cidades.length)];
        const acao = f_acoes[Math.floor(Math.random() * f_acoes.length)];
        
        txt.innerHTML = `<b>${nome}</b> de ${cidade} ${acao}`;
        el.classList.add('show');

        // Esconde após 5 segundos
        setTimeout(() => {
            el.classList.remove('show');
            // Agenda a próxima notificação entre 8 e 15 segundos
            const proxima = Math.floor(Math.random() * (15000 - 8000)) + 8000;
            setTimeout(mostrar, proxima);
        }, 5000);
    };

    // Inicia a primeira notificação após 4 segundos de página aberta
    setTimeout(mostrar, 4000);
}

// 7. COMPORTAMENTO DO HEADER NO SCROLL
function configurarHeader() {
    const header = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// 8. LOG DE STATUS
console.log("%c UAI, ACHEI NA SHOPEE %c Engine v4.0 Ativa ", "color: #fff; background: #FF4500; padding: 5px; border-radius: 5px 0 0 5px;", "color: #fff; background: #333; padding: 5px; border-radius: 0 5px 5px 0;");
