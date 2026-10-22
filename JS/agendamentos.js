/* ========================================================
   EXPLORAR + | Agendamentos & Viagens Logic
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initBookingApp();
});

const DESTINATION_PACKAGES = {
    Brotas: {
        name: 'Brotas, SP',
        img: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=600',
        packages: [
            {
                id: 1,
                title: 'Brotas Aventura Radical',
                desc: 'Rafting no Rio Jacaré-Pepira, tirolesas e almoço típico.',
                price: 1290.00,
                hotel: 'Eco Resort',
                duration: '3 dias / 2 noites',
                img: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=600'
            },
            {
                id: 2,
                title: 'Brotas Ecoturismo & Relax',
                desc: 'Nascente Areia que Canta, banho de cachoeira e spa.',
                price: 980.00,
                hotel: 'Pousada de Charme',
                duration: '2 dias / 1 noite',
                img: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=600'
            }
        ]
    },
    SaoRoque: {
        name: 'São Roque, SP',
        img: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=600',
        packages: [
            {
                id: 3,
                title: 'São Roque Rota do Vinho & Degustação',
                desc: 'Tour completo pelas vinícolas, sommelier e almoço harmonizado.',
                price: 890.00,
                hotel: 'Pousada dos Vinhedos',
                duration: '2 dias / 1 noite',
                img: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=600'
            },
            {
                id: 4,
                title: 'São Roque Gastronômico & Romântico',
                desc: 'Piquenique nos vinhedos, adegas históricas e hotel boutique.',
                price: 1150.00,
                hotel: 'Hotel Boutique Campestre',
                duration: '3 dias / 2 noites',
                img: 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=600'
            }
        ]
    },
    CamposDoJordao: {
        name: 'Campos do Jordão, SP',
        img: 'https://images.pexels.com/photos/1486974/pexels-photo-1486974.jpeg?auto=compress&cs=tinysrgb&w=600',
        packages: [
            {
                id: 5,
                title: 'Campos do Jordão Inverno & Charme',
                desc: 'Capivari, noite do fondue suíço e teleférico nas montanhas.',
                price: 1850.00,
                hotel: 'Hotel Boutique Europeu',
                duration: '3 dias / 2 noites',
                img: 'https://images.pexels.com/photos/1486974/pexels-photo-1486974.jpeg?auto=compress&cs=tinysrgb&w=600'
            },
            {
                id: 6,
                title: 'Campos do Jordão Mantiqueira Vip',
                desc: 'Chalé de luxo com lareira, cervejarias artesanais e Pico do Itapeva.',
                price: 2450.00,
                hotel: 'Chalé de Luxo',
                duration: '4 dias / 3 noites',
                img: 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=600'
            }
        ]
    }
};

let currentDestination = 'Brotas';
let currentPackage = null;
let peopleCount = 2;

function initBookingApp() {
    setupDatePickers();
    parseUrlParams();
    renderPackages();
    setupEventListeners();
    updateSummary();
    renderRecentBookings();
}

function setupDatePickers() {
    const partidaInput = document.getElementById('dtPartida');
    const retornoInput = document.getElementById('dtRetorno');

    // Define data mínima como hoje
    const today = new Date().toISOString().split('T')[0];
    if (partidaInput) {
        partidaInput.min = today;
        // Data padrão: 14 dias a partir de hoje
        const defaultPartida = new Date();
        defaultPartida.setDate(defaultPartida.getDate() + 14);
        partidaInput.value = defaultPartida.toISOString().split('T')[0];

        // Retorno: 16 dias a partir de hoje
        const defaultRetorno = new Date();
        defaultRetorno.setDate(defaultRetorno.getDate() + 16);
        if (retornoInput) {
            retornoInput.min = defaultPartida.toISOString().split('T')[0];
            retornoInput.value = defaultRetorno.toISOString().split('T')[0];
        }

        partidaInput.addEventListener('change', () => {
            if (retornoInput) {
                retornoInput.min = partidaInput.value;
                if (retornoInput.value < partidaInput.value) {
                    retornoInput.value = partidaInput.value;
                }
            }
            updateSummary();
        });
    }

    if (retornoInput) {
        retornoInput.addEventListener('change', () => {
            updateSummary();
        });
    }
}

function parseUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const destParam = params.get('destino');
    const pacoteParam = params.get('pacote');

    if (destParam) {
        const destKey = Object.keys(DESTINATION_PACKAGES).find(
            k => k.toLowerCase() === destParam.toLowerCase() ||
                 DESTINATION_PACKAGES[k].name.toLowerCase().includes(destParam.toLowerCase())
        );
        if (destKey) {
            currentDestination = destKey;
            const radio = document.querySelector(`input[name="destino"][value="${destKey}"]`);
            if (radio) radio.checked = true;
        }
    }

    if (pacoteParam) {
        const pId = parseInt(pacoteParam);
        for (const destKey in DESTINATION_PACKAGES) {
            const found = DESTINATION_PACKAGES[destKey].packages.find(p => p.id === pId);
            if (found) {
                currentDestination = destKey;
                const radio = document.querySelector(`input[name="destino"][value="${destKey}"]`);
                if (radio) radio.checked = true;
                currentPackage = found;
                break;
            }
        }
    }
}

function setupEventListeners() {
    // Rádios de Destino
    document.querySelectorAll('input[name="destino"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            currentDestination = e.target.value;
            currentPackage = null;
            renderPackages();
            updateSummary();
        });
    });

    // Contador de Pessoas
    const btnMinus = document.getElementById('btnMinusPeople');
    const btnPlus = document.getElementById('btnPlusPeople');
    const peopleDisplay = document.getElementById('peopleCountDisplay');
    const peopleInput = document.getElementById('nrPessoasInput');

    if (btnMinus) {
        btnMinus.addEventListener('click', () => {
            if (peopleCount > 1) {
                peopleCount--;
                if (peopleDisplay) peopleDisplay.textContent = peopleCount;
                if (peopleInput) peopleInput.value = peopleCount;
                updateSummary();
            }
        });
    }

    if (btnPlus) {
        btnPlus.addEventListener('click', () => {
            if (peopleCount < 12) {
                peopleCount++;
                if (peopleDisplay) peopleDisplay.textContent = peopleCount;
                if (peopleInput) peopleInput.value = peopleCount;
                updateSummary();
            }
        });
    }

    // Checkboxes de Extras
    ['extraSeguro', 'extraTransfer', 'extraGuia'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', updateSummary);
    });

    // Botão de Confirmação de Reserva
    const btnConfirm = document.getElementById('btnConfirmBooking');
    if (btnConfirm) {
        btnConfirm.addEventListener('click', handleBookingSubmit);
    }

    // Modal close
    const btnCloseModal = document.getElementById('btnCloseSuccessModal');
    const successModal = document.getElementById('successBookingModal');
    if (btnCloseModal && successModal) {
        btnCloseModal.addEventListener('click', () => {
            successModal.style.display = 'none';
        });
    }
}

function renderPackages() {
    const container = document.getElementById('packageListContainer');
    if (!container) return;

    const destData = DESTINATION_PACKAGES[currentDestination];
    if (!destData) return;

    if (!currentPackage || !destData.packages.some(p => p.id === currentPackage.id)) {
        currentPackage = destData.packages[0];
    }

    container.innerHTML = destData.packages.map(p => `
        <div class="package-choice-card ${p.id === currentPackage.id ? 'selected' : ''}" data-id="${p.id}">
            <div class="package-choice-left">
                <div class="package-radio-mark"></div>
                <div class="package-choice-info">
                    <h4>${p.title}</h4>
                    <p>${p.desc} • <strong>${p.duration}</strong></p>
                </div>
            </div>
            <div class="package-choice-price">
                <strong>R$ ${p.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
                <small>por pessoa</small>
            </div>
        </div>
    `).join('');

    // Adiciona listener para os cards
    container.querySelectorAll('.package-choice-card').forEach(card => {
        card.addEventListener('click', () => {
            const pId = parseInt(card.dataset.id);
            currentPackage = destData.packages.find(p => p.id === pId);
            container.querySelectorAll('.package-choice-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            updateSummary();
        });
    });

    const idInput = document.getElementById('idPacoteInput');
    if (idInput && currentPackage) {
        idInput.value = currentPackage.id;
    }
}

function updateSummary() {
    if (!currentPackage) return;

    const destData = DESTINATION_PACKAGES[currentDestination];
    const headerImg = document.getElementById('summaryHeaderImg');
    const destTag = document.getElementById('summaryDestTag');
    const titleEl = document.getElementById('summaryPackageTitle');
    const locEl = document.getElementById('summaryLocation');
    const datesEl = document.getElementById('summaryDates');
    const peopleEl = document.getElementById('summaryPeople');
    const hotelEl = document.getElementById('summaryHotel');

    if (headerImg) headerImg.style.backgroundImage = `url('${currentPackage.img || destData.img}')`;
    if (destTag) destTag.textContent = currentDestination;
    if (titleEl) titleEl.textContent = currentPackage.title;
    if (locEl) locEl.textContent = `📍 ${destData.name}`;
    if (hotelEl) hotelEl.textContent = currentPackage.hotel;

    // Datas formatadas
    const partida = document.getElementById('dtPartida')?.value;
    const retorno = document.getElementById('dtRetorno')?.value;
    if (datesEl) {
        if (partida && retorno) {
            datesEl.textContent = `${formatarDataBR(partida)} até ${formatarDataBR(retorno)}`;
        } else {
            datesEl.textContent = 'Selecione as datas';
        }
    }

    if (peopleEl) {
        peopleEl.textContent = `${peopleCount} ${peopleCount > 1 ? 'Viajantes' : 'Viajante'}`;
    }

    // Cálculos
    const basePackageTotal = currentPackage.price * peopleCount;
    let extrasTotal = 0;

    const seguro = document.getElementById('extraSeguro')?.checked;
    const transfer = document.getElementById('extraTransfer')?.checked;
    const guia = document.getElementById('extraGuia')?.checked;

    if (seguro) extrasTotal += (80 * peopleCount);
    if (transfer) extrasTotal += (150 * peopleCount);
    if (guia) extrasTotal += 120; // por grupo

    const finalTotal = basePackageTotal + extrasTotal;
    const pointsGained = Math.floor(finalTotal);

    // Atualiza campos
    const labelBase = document.getElementById('labelPackageBase');
    const valBase = document.getElementById('valPackageBase');
    const rowExtras = document.getElementById('rowExtras');
    const valExtras = document.getElementById('valExtras');
    const valTotal = document.getElementById('valTotalDisplay');
    const pointsDisplay = document.getElementById('pointsGainDisplay');
    const totalInput = document.getElementById('vlTotalInput');
    const idPacoteInput = document.getElementById('idPacoteInput');

    if (labelBase) labelBase.textContent = `Pacote (${peopleCount}x R$ ${currentPackage.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })})`;
    if (valBase) valBase.textContent = `R$ ${basePackageTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

    if (rowExtras && valExtras) {
        if (extrasTotal > 0) {
            rowExtras.style.display = 'flex';
            valExtras.textContent = `R$ ${extrasTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        } else {
            rowExtras.style.display = 'none';
        }
    }

    if (valTotal) valTotal.textContent = `R$ ${finalTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    if (pointsDisplay) pointsDisplay.textContent = `+${pointsGained.toLocaleString('pt-BR')} Pontos Explorar`;
    if (totalInput) totalInput.value = finalTotal.toFixed(2);
    if (idPacoteInput) idPacoteInput.value = currentPackage.id;
}

function formatarDataBR(isoDate) {
    if (!isoDate) return '';
    const [ano, mes, dia] = isoDate.split('-');
    return `${dia}/${mes}/${ano}`;
}

async function handleBookingSubmit() {
    const form = document.getElementById('bookingForm');
    const partida = document.getElementById('dtPartida')?.value;
    const retorno = document.getElementById('dtRetorno')?.value;

    if (!partida || !retorno) {
        alert('Por favor, informe as datas de partida e retorno da sua viagem.');
        return;
    }

    // Se o visitante não estiver logado, solicita login antes de finalizar
    if (typeof isUserLoggedIn === 'function' && !isUserLoggedIn()) {
        const querLogar = confirm(
            "🔒 Identificação de Viajante:\n\n" +
            "Para confirmar sua reserva, emitir seu voucher oficial e acumular seus pontos de fidelidade, você precisa entrar na sua conta.\n\n" +
            "Clique em 'OK' para entrar ou criar sua conta agora!"
        );
        if (querLogar) {
            window.location.href = 'login.html?redirect=agendamentos.html';
        }
        return;
    }

    const formData = new FormData(form);

    // Tenta enviar via fetch para php/agendar.php
    try {
        const response = await fetch('../php/agendar.php', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();

        if (data && data.sucesso) {
            salvarReservaLocal(data.id_agendamento || Date.now());
            exibirSucessoModal(data.pontos_ganhos);
            return;
        }
    } catch (err) {
        console.warn('Backend PHP não acessível via HTTP direto, gravando localmente...', err);
    }

    // Gravação local caso esteja rodando offline/sem PHP
    const mockId = Date.now();
    const finalTotal = parseFloat(document.getElementById('vlTotalInput')?.value || 2580);
    salvarReservaLocal(mockId);
    exibirSucessoModal(Math.floor(finalTotal));
}

function salvarReservaLocal(id) {
    const destData = DESTINATION_PACKAGES[currentDestination];
    const partida = document.getElementById('dtPartida')?.value;
    const retorno = document.getElementById('dtRetorno')?.value;
    const totalVal = document.getElementById('valTotalDisplay')?.textContent || 'R$ 2.580,00';

    const novaReserva = {
        id: id,
        destino: destData.name,
        pacote: currentPackage.title,
        dataPartida: partida,
        dataRetorno: retorno,
        pessoas: peopleCount,
        valor: totalVal,
        status: 'Confirmado',
        imagem: currentPackage.img || destData.img
    };

    let trips = [];
    const localTrips = localStorage.getItem('explorar_agendamentos');
    if (localTrips) {
        try { trips = JSON.parse(localTrips); } catch (e) {}
    }
    trips.unshift(novaReserva);
    localStorage.setItem('explorar_agendamentos', JSON.stringify(trips));

    // Atualiza pontos do usuário
    const userStr = localStorage.getItem('explorar_user');
    let userObj = { nome: 'Viajante Explorador', pontos: 3850 };
    if (userStr) {
        try { userObj = JSON.parse(userStr); } catch (e) {}
    }
    const pontosGanhos = Math.floor(parseFloat(document.getElementById('vlTotalInput')?.value || 0));
    userObj.pontos = (Number(userObj.pontos) || 0) + pontosGanhos;
    localStorage.setItem('explorar_user', JSON.stringify(userObj));

    renderRecentBookings();
}

function exibirSucessoModal(pontosGanhos) {
    const modal = document.getElementById('successBookingModal');
    const msg = document.getElementById('successModalMsg');
    if (msg) {
        msg.innerHTML = `Sua reserva para <strong>${currentPackage.title}</strong> foi confirmada!<br>Você acaba de acumular <strong style="color: var(--gold-400);">+${Number(pontosGanhos).toLocaleString('pt-BR')} pontos</strong> de fidelidade.`;
    }
    if (modal) modal.style.display = 'flex';
}

function renderRecentBookings() {
    const container = document.getElementById('recentBookingsList');
    if (!container) return;

    if (typeof isUserLoggedIn === 'function' && !isUserLoggedIn()) {
        container.innerHTML = `
            <div class="booking-preview-card glass-card" style="grid-column: 1 / -1; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; padding: 1.5rem;">
                <div>
                    <h4 style="font-size: 1.1rem; margin-bottom: 0.3rem;">🔒 Histórico de Reservas Privado</h4>
                    <p style="color: var(--text-secondary); font-size: 0.9rem;">Faça login na sua conta para acompanhar seus vouchers e viagens marcadas.</p>
                </div>
                <a href="login.html?redirect=agendamentos.html" class="btn-primary-custom btn-sm">Fazer Login →</a>
            </div>
        `;
        return;
    }

    let trips = [
        {
            pacote: 'Brotas Aventura Radical',
            destino: 'Brotas, SP',
            dataPartida: '2026-11-14',
            img: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=300'
        },
        {
            pacote: 'São Roque Rota do Vinho & Degustação',
            destino: 'São Roque, SP',
            dataPartida: '2026-09-12',
            img: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=300'
        }
    ];

    const localTrips = localStorage.getItem('explorar_agendamentos');
    if (localTrips) {
        try {
            const parsed = JSON.parse(localTrips);
            if (Array.isArray(parsed) && parsed.length > 0) trips = parsed;
        } catch (e) {}
    }

    container.innerHTML = trips.slice(0, 3).map(t => `
        <div class="booking-preview-card glass-card">
            <div class="bp-thumb">
                <img src="${t.imagem || t.img}" alt="${t.pacote}" />
            </div>
            <div class="bp-info">
                <h4>${t.pacote}</h4>
                <p>📍 ${t.destino}</p>
                <p>📅 ${formatarDataBR(t.dataPartida)}</p>
                <span class="bp-badge">✓ Confirmado</span>
            </div>
        </div>
    `).join('');
}

