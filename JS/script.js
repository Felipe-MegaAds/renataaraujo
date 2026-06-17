/**
 * Script Principal de Interação - Landing Page Renata Araújo
 * Este arquivo lida com o menu responsivo, filtragem de serviços por abas,
 * funcionamento do FAQ (sanfona) e envio de dados de rastreamento ao GTM.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. MENU MOBILE (HAMBÚRGUER)
    // Gerencia a abertura e fechamento do menu em dispositivos móveis.
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fecha o menu ao clicar em qualquer um dos links internos
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 2. FILTRAGEM DE SERVIÇOS (ABAS)
    // Permite que o usuário clique nas categorias para ver apenas os serviços correspondentes.
    const tabBtns = document.querySelectorAll('.tab-btn');
    const serviceCards = document.querySelectorAll('.service-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove classe ativa de todos os botões e adiciona no botão clicado
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');

            serviceCards.forEach(card => {
                // Se a categoria for "todos" ou se o card pertencer à categoria, exibe-o; caso contrário, oculta
                if (category === 'todos' || card.getAttribute('data-category') === category) {
                    card.style.display = 'flex';
                    // Adiciona um pequeno efeito de entrada suave por CSS
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        // Remove os estilos inline após a transição para manter o hover suave do CSS intacto
                        setTimeout(() => {
                            card.style.opacity = '';
                        }, 400);
                    }, 50);
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    });

    // 3. SANFONA DO FAQ (PERGUNTAS FREQUENTES)
    // Expande ou recolhe as respostas quando as perguntas correspondentes são clicadas.
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = item.querySelector('.faq-answer');
            const isActive = item.classList.contains('active');

            // Fecha outros itens de FAQ abertos para manter a página limpa
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-answer').style.maxHeight = null;
            });

            // Se o item não estava ativo, abre-o calculando a altura do conteúdo
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // 4. HEADER COM EFEITO DE ROLAGEM (SCROLL EFFECT)
    // Gerencia a classe 'scrolled' no cabeçalho ao rolar a página para ativar as transições de tamanho via CSS.
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 5. RASTREAMENTO DO GOOGLE TAG MANAGER (GTM / DATALAYER)
    // Captura os cliques em botões e links que possuem o atributo 'data-track' e envia para o dataLayer.
    // Importante: Não utiliza preventDefault() para evitar o bloqueio dos redirecionamentos do WhatsApp ou links internos.
    window.dataLayer = window.dataLayer || [];

    const trackingElements = document.querySelectorAll('[data-track]');
    trackingElements.forEach(element => {
        element.addEventListener('click', () => {
            const trackVal = element.getAttribute('data-track');
            const elementId = element.getAttribute('id') || '';
            const elementText = element.textContent.trim();
            const elementHref = element.getAttribute('href') || '';

            // Envia o evento formatado para o dataLayer do GTM
            window.dataLayer.push({
                'event': 'click_link_whatsapp',
                'eventCategory': 'Link Conversão',
                'eventAction': 'Clique',
                'eventLabel': trackVal,
                'elementId': elementId,
                'elementText': elementText,
                'elementUrl': elementHref
            });
        });
    });
});
