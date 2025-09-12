// Funcionalidades específicas da página de filiais

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    const filiaisGrid = document.getElementById('filiaisGrid');
    const searchInput = document.getElementById('searchFiliais');
    const filiaisCards = document.querySelectorAll('.filial-card');

    // Dados das filiais para busca
    const filiaisData = [
        {
            element: document.querySelector('[data-estado="sp"][data-cidade="sao-paulo"]:first-of-type'),
            estado: 'sp',
            cidade: 'sao-paulo',
            nome: 'São Paulo - Centro',
            endereco: 'Rua da Consolação, 1234',
            telefone: '(11) 3333-4444'
        },
        {
            element: document.querySelector('[data-estado="sp"][data-cidade="sao-paulo"]:last-of-type'),
            estado: 'sp',
            cidade: 'sao-paulo',
            nome: 'São Paulo - Zona Sul',
            endereco: 'Av. Paulista, 5678',
            telefone: '(11) 4444-5555'
        },
        {
            element: document.querySelector('[data-estado="rj"]'),
            estado: 'rj',
            cidade: 'rio-de-janeiro',
            nome: 'Rio de Janeiro - Copacabana',
            endereco: 'Av. Atlântica, 9876',
            telefone: '(21) 2222-3333'
        },
        {
            element: document.querySelector('[data-estado="mg"]'),
            estado: 'mg',
            cidade: 'belo-horizonte',
            nome: 'Belo Horizonte - Savassi',
            endereco: 'Rua Pernambuco, 1111',
            telefone: '(31) 3333-4444'
        },
        {
            element: document.querySelector('[data-estado="pr"]'),
            estado: 'pr',
            cidade: 'curitiba',
            nome: 'Curitiba - Centro',
            endereco: 'Rua XV de Novembro, 2222',
            telefone: '(41) 4444-5555'
        },
        {
            element: document.querySelector('[data-estado="rs"]'),
            estado: 'rs',
            cidade: 'porto-alegre',
            nome: 'Porto Alegre - Moinhos',
            endereco: 'Av. Osvaldo Aranha, 3333',
            telefone: '(51) 5555-6666'
        },
        {
            element: document.querySelector('[data-estado="sc"]'),
            estado: 'sc',
            cidade: 'florianopolis',
            nome: 'Florianópolis - Centro',
            endereco: 'Rua Felipe Schmidt, 4444',
            telefone: '(48) 6666-7777'
        },
        {
            element: document.querySelector('[data-estado="go"]'),
            estado: 'go',
            cidade: 'goiania',
            nome: 'Goiânia - Setor Marista',
            endereco: 'Av. T-10, 5555',
            telefone: '(62) 7777-8888'
        },
        {
            element: document.querySelector('[data-estado="df"]'),
            estado: 'df',
            cidade: 'brasilia',
            nome: 'Brasília - Asa Sul',
            endereco: 'SCS Quadra 1, 6666',
            telefone: '(61) 8888-9999'
        },
        {
            element: document.querySelector('[data-estado="ba"]'),
            estado: 'ba',
            cidade: 'salvador',
            nome: 'Salvador - Pituba',
            endereco: 'Av. Manoel Dias da Silva, 7777',
            telefone: '(71) 9999-0000'
        },
        {
            element: document.querySelector('[data-estado="ce"]'),
            estado: 'ce',
            cidade: 'fortaleza',
            nome: 'Fortaleza - Aldeota',
            endereco: 'Av. Beira Mar, 8888',
            telefone: '(85) 0000-1111'
        },
        {
            element: document.querySelector('[data-estado="pe"]'),
            estado: 'pe',
            cidade: 'recife',
            nome: 'Recife - Boa Viagem',
            endereco: 'Av. Boa Viagem, 9999',
            telefone: '(81) 1111-2222'
        }
    ];

    // Mapeamento de estados para nomes completos
    const estadosMap = {
        'sp': 'São Paulo',
        'rj': 'Rio de Janeiro',
        'mg': 'Minas Gerais',
        'pr': 'Paraná',
        'rs': 'Rio Grande do Sul',
        'sc': 'Santa Catarina',
        'go': 'Goiás',
        'df': 'Distrito Federal',
        'ba': 'Bahia',
        'ce': 'Ceará',
        'pe': 'Pernambuco'
    };

    // Função para filtrar filiais por estado
    function filtrarPorEstado(estado) {
        filiaisCards.forEach(card => {
            const cardEstado = card.getAttribute('data-estado');
            
            if (estado === 'todos' || cardEstado === estado) {
                card.classList.remove('hidden');
                card.classList.add('show');
            } else {
                card.classList.add('hidden');
                card.classList.remove('show');
            }
        });
    }

    // Função para buscar filiais por texto
    function buscarFiliais(termo) {
        const termoLower = termo.toLowerCase();
        
        filiaisCards.forEach(card => {
            const nome = card.querySelector('h3').textContent.toLowerCase();
            const endereco = card.querySelector('.info-item span').textContent.toLowerCase();
            const telefone = card.querySelectorAll('.info-item span')[1].textContent.toLowerCase();
            
            const match = nome.includes(termoLower) || 
                         endereco.includes(termoLower) || 
                         telefone.includes(termoLower) ||
                         estadosMap[card.getAttribute('data-estado')].toLowerCase().includes(termoLower);
            
            if (match) {
                card.classList.remove('hidden');
                card.classList.add('show');
            } else {
                card.classList.add('hidden');
                card.classList.remove('show');
            }
        });
    }

    // Event listeners para filtros por estado
    filtroBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove classe active de todos os botões
            filtroBtns.forEach(b => b.classList.remove('active'));
            // Adiciona classe active ao botão clicado
            this.classList.add('active');
            
            // Filtra as filiais
            const estado = this.getAttribute('data-estado');
            filtrarPorEstado(estado);
            
            // Limpa a busca
            searchInput.value = '';
        });
    });

    // Event listener para busca
    searchInput.addEventListener('input', function() {
        const termo = this.value.trim();
        
        if (termo === '') {
            // Se não há termo de busca, mostra todas as filiais do estado ativo
            const estadoAtivo = document.querySelector('.filtro-btn.active').getAttribute('data-estado');
            filtrarPorEstado(estadoAtivo);
        } else {
            // Busca por termo
            buscarFiliais(termo);
        }
    });

    // Event listeners para botões de ação das filiais
    filiaisCards.forEach(card => {
        const btnMapa = card.querySelector('.btn-primary');
        const btnLigar = card.querySelector('.btn-secondary');
        
        if (btnMapa) {
            btnMapa.addEventListener('click', function() {
                const endereco = card.querySelector('.info-item span').textContent;
                const nome = card.querySelector('h3').textContent;
                
                // Abre o Google Maps com o endereço
                const enderecoEncoded = encodeURIComponent(endereco);
                window.open(`https://www.google.com/maps/search/?api=1&query=${enderecoEncoded}`, '_blank');
            });
        }
        
        if (btnLigar) {
            btnLigar.addEventListener('click', function() {
                const telefone = card.querySelectorAll('.info-item span')[1].textContent;
                const numeroLimpo = telefone.replace(/\D/g, '');
                
                // Abre o aplicativo de telefone
                window.open(`tel:${numeroLimpo}`, '_self');
            });
        }
    });

    // Animação de entrada das filiais
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplica animação aos cards de filiais
    filiaisCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Efeito de hover nos cards
    filiaisCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Contador de filiais por estado
    function atualizarContadorFiliais() {
        const estadoAtivo = document.querySelector('.filtro-btn.active').getAttribute('data-estado');
        let contador = 0;
        
        filiaisCards.forEach(card => {
            if (!card.classList.contains('hidden')) {
                contador++;
            }
        });
        
        // Atualiza o título com o contador
        const titulo = document.querySelector('.filiais-title');
        if (estadoAtivo === 'todos') {
            titulo.textContent = `Nossas Filiais`;
        } else {
            const nomeEstado = estadosMap[estadoAtivo];
            titulo.textContent = `Filiais em ${nomeEstado} (${contador})`;
        }
    }

    // Atualiza contador quando filtra
    filtroBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            setTimeout(atualizarContadorFiliais, 300);
        });
    });

    // Atualiza contador quando busca
    searchInput.addEventListener('input', function() {
        setTimeout(atualizarContadorFiliais, 100);
    });

    // Inicializa o contador
    atualizarContadorFiliais();

    // Efeito de loading simulado para demonstração
    function simularLoading() {
        filiaisGrid.classList.add('loading');
        
        setTimeout(() => {
            filiaisGrid.classList.remove('loading');
        }, 1000);
    }

    // Adiciona loading ao trocar de estado (opcional)
    filtroBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.getAttribute('data-estado') !== 'todos') {
                simularLoading();
            }
        });
    });

    // Função para destacar resultados da busca
    function destacarResultados(termo) {
        if (termo === '') return;
        
        filiaisCards.forEach(card => {
            if (!card.classList.contains('hidden')) {
                const elementos = card.querySelectorAll('h3, .info-item span');
                elementos.forEach(elemento => {
                    const texto = elemento.textContent;
                    const regex = new RegExp(`(${termo})`, 'gi');
                    const textoDestacado = texto.replace(regex, '<mark>$1</mark>');
                    elemento.innerHTML = textoDestacado;
                });
            }
        });
    }

    // Aplica destaque na busca
    searchInput.addEventListener('input', function() {
        const termo = this.value.trim();
        if (termo !== '') {
            destacarResultados(termo);
        } else {
            // Remove destaque quando limpa a busca
            filiaisCards.forEach(card => {
                const elementos = card.querySelectorAll('h3, .info-item span');
                elementos.forEach(elemento => {
                    elemento.innerHTML = elemento.textContent;
                });
            });
        }
    });

    // Adiciona efeito de digitação no título
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Aplica efeito de digitação quando a página carrega
    window.addEventListener('load', () => {
        const titulo = document.querySelector('.filiais-title');
        if (titulo) {
            const textoOriginal = titulo.textContent;
            typeWriter(titulo, textoOriginal, 80);
        }
    });
});
