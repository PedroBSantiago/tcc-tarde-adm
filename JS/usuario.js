/* ========================================================
   EXPLORAR + | Área do Usuário Logic
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    loadUserData();
    setupProfileForm();
    setupModal();
});

// Mock padrão focado exclusivamente em Brotas, São Roque e Campos do Jordão
const defaultTrips = [
    {
        id: 1,
        destino: 'Brotas, SP',
        pacote: 'Brotas Aventura Radical',
        dataPartida: '2026-11-14',
        dataRetorno: '2026-11-16',
        pessoas: 2,
        valor: 'R$ 2.580,00',
        status: 'Confirmado',
        imagem: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        id: 2,
        destino: 'São Roque, SP',
        pacote: 'São Roque Rota do Vinho & Degustação',
        dataPartida: '2026-09-12',
        dataRetorno: '2026-09-13',
        pessoas: 2,
        valor: 'R$ 1.780,00',
        status: 'Concluído',
        imagem: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
];

const defaultPointsHistory = [
    { data: '14/10/2026', desc: 'Reserva antecipada: Brotas Aventura', tipo: 'credito', pontos: '+1.570' },
    { data: '12/09/2026', desc: 'Viagem realizada: Rota do Vinho São Roque', tipo: 'credito', pontos: '+1.780' },
    { data: '01/08/2026', desc: 'Bônus de Boas-vindas ao se cadastrar', tipo: 'credito', pontos: '+500' }
];

function initTabs() {
    const tabs = document.querySelectorAll('.dash-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabTarget = tab.dataset.tab;
            switchDashboardTab(tabTarget);
        });
    });
}

function switchDashboardTab(tabId) {
    document.querySelectorAll('.dash-tab').forEach(t => {
        t.classList.toggle('active', t.dataset.tab === tabId);
    });

    document.querySelectorAll('.dash-panel').forEach(p => {
        p.classList.toggle('active', p.id === `tab-${tabId}`);
    });
}

function loadUserData() {
    // Tenta carregar do localStorage primeiro
    const storedUser = localStorage.getItem('explorar_user');
    let user = {
        nome: 'Viajante Explorador',
        email: 'viajante@explorarmais.com.br',
        telefone: '(11) 98765-4321',
        pontos: 3850
    };

    if (storedUser) {
        try {
            const parsed = JSON.parse(storedUser);
            user = { ...user, ...parsed };
        } catch (e) {
            console.error('Erro ao ler usuário salvo', e);
        }
    }

    // Carrega reservas do localStorage se houver novas
    let savedTrips = defaultTrips;
    const localTrips = localStorage.getItem('explorar_agendamentos');
    if (localTrips) {
        try {
            const parsedTrips = JSON.parse(localTrips);
            if (Array.isArray(parsedTrips) && parsedTrips.length > 0) {
                savedTrips = parsedTrips;
            }
        } catch (e) {}
    }

    // Atualiza elementos da UI
    const nameEl = document.getElementById('userNameDisplay');
    const emailEl = document.getElementById('userEmailDisplay');
    const avatarEl = document.getElementById('userAvatarText');
    const pointsEl = document.getElementById('userPointsDisplay');
    const tabPointsEl = document.getElementById('tabPointsBalance');
    const tripsCountEl = document.getElementById('userTripsCount');
    const tabTripsCountEl = document.getElementById('tabViagensCount');
    const profNome = document.getElementById('profNome');
    const profEmail = document.getElementById('profEmail');
    const profTel = document.getElementById('profTelefone');

    if (nameEl) nameEl.textContent = user.nome;
    if (emailEl) emailEl.textContent = user.email;
    if (avatarEl) {
        const initials = user.nome.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
        avatarEl.textContent = initials || 'VE';
    }
    if (pointsEl) pointsEl.textContent = Number(user.pontos).toLocaleString('pt-BR');
    if (tabPointsEl) tabPointsEl.textContent = Number(user.pontos).toLocaleString('pt-BR');
    if (tripsCountEl) tripsCountEl.textContent = savedTrips.length;
    if (tabTripsCountEl) tabTripsCountEl.textContent = savedTrips.length;
    if (profNome) profNome.value = user.nome;
    if (profEmail) profEmail.value = user.email;
    if (profTel && user.telefone) profTel.value = user.telefone;

    renderTrips(savedTrips);
    renderPointsHistory();
}

function renderTrips(trips) {
    const overviewContainer = document.getElementById('overviewTripsContainer');
    const allTripsContainer = document.getElementById('allTripsContainer');

    if (!allTripsContainer) return;

    if (trips.length === 0) {
        allTripsContainer.innerHTML = `
            <div class="empty-state-card glass-card" style="text-align: center; padding: 3rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🧳</div>
                <h3>Você ainda não possui viagens agendadas</h3>
                <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">Explore nossos destinos exclusivos: Brotas, São Roque e Campos do Jordão!</p>
                <a href="agendamentos.html" class="btn-primary-custom">Agendar Primeira Viagem →</a>
            </div>
        `;
        if (overviewContainer) overviewContainer.innerHTML = allTripsContainer.innerHTML;
        return;
    }

    const html = trips.map(t => {
        const statusClass = t.status.toLowerCase() === 'confirmado' ? 'status-confirmado' : 
                           (t.status.toLowerCase() === 'cancelado' ? 'status-cancelado' : 'status-concluido');

        return `
            <div class="trip-card">
                <div class="trip-card-thumb">
                    <img src="${t.imagem}" alt="${t.pacote}" />
                </div>
                <div class="trip-card-body">
                    <span class="status-pill ${statusClass}">${t.status}</span>
                    <h4>${t.pacote}</h4>
                    <p class="trip-location">📍 ${t.destino}</p>
                    <p class="trip-dates">📅 ${formatarData(t.dataPartida)} até ${formatarData(t.dataRetorno)} • 👥 ${t.pessoas} ${t.pessoas > 1 ? 'viajantes' : 'viajante'}</p>
                </div>
                <div class="trip-card-actions">
                    <span class="trip-price-tag">${t.valor}</span>
                    <div class="trip-action-btns">
                        <button class="btn-secondary-custom btn-xs" onclick="abrirVoucher(${t.id})">📄 Voucher</button>
                        ${t.status === 'Confirmado' ? `<button class="btn-danger-custom btn-xs" style="color: #f87171; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 6px; padding: 5px 10px; cursor: pointer;" onclick="cancelarViagem(${t.id})">Cancelar</button>` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');

    allTripsContainer.innerHTML = html;
    if (overviewContainer) {
        overviewContainer.innerHTML = trips.slice(0, 1).map(t => `
            <div class="trip-card">
                <div class="trip-card-thumb">
                    <img src="${t.imagem}" alt="${t.pacote}" />
                </div>
                <div class="trip-card-body">
                    <span class="status-pill status-confirmado">${t.status}</span>
                    <h4>${t.pacote}</h4>
                    <p class="trip-location">📍 ${t.destino}</p>
                    <p class="trip-dates">📅 ${formatarData(t.dataPartida)}</p>
                </div>
                <div class="trip-card-actions">
                    <button class="btn-primary-custom btn-xs" onclick="switchDashboardTab('viagens')">Ver Reserva</button>
                </div>
            </div>
        `).join('');
    }
}

function renderPointsHistory() {
    const tableBody = document.getElementById('extratoTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = defaultPointsHistory.map(item => `
        <tr>
            <td>${item.data}</td>
            <td>${item.desc}</td>
            <td><span class="${item.tipo === 'credito' ? 'extrato-credito' : 'extrato-debito'}">${item.tipo === 'credito' ? 'Crédito' : 'Débito'}</span></td>
            <td class="${item.tipo === 'credito' ? 'extrato-credito' : 'extrato-debito'}">${item.pontos}</td>
        </tr>
    `).join('');
}

function formatarData(dataStr) {
    if (!dataStr) return '';
    const parts = dataStr.split('-');
    if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dataStr;
}

window.resgatarRecompensa = function(nomeRecompensa, pontosNecessarios) {
    const userStr = localStorage.getItem('explorar_user');
    let pontosAtuais = 3850;
    let userObj = {};

    if (userStr) {
        try {
            userObj = JSON.parse(userStr);
            if (userObj.pontos !== undefined) pontosAtuais = Number(userObj.pontos);
        } catch (e) {}
    }

    if (pontosAtuais < pontosNecessarios) {
        alert(`Saldo insuficiente! Você possui ${pontosAtuais} pontos e precisa de ${pontosNecessarios}.`);
        return;
    }

    const confirma = confirm(`Deseja resgatar "${nomeRecompensa}" por ${pontosNecessarios} pontos?`);
    if (!confirma) return;

    // Atualiza saldo
    pontosAtuais -= pontosNecessarios;
    userObj.pontos = pontosAtuais;
    localStorage.setItem('explorar_user', JSON.stringify(userObj));

    // Adiciona ao extrato
    const hoje = new Date().toLocaleDateString('pt-BR');
    defaultPointsHistory.unshift({
        data: hoje,
        desc: `Resgate: ${nomeRecompensa}`,
        tipo: 'debito',
        pontos: `-${pontosNecessarios}`
    });

    loadUserData();
    alert(`🎉 Parabéns! Recompensa "${nomeRecompensa}" resgatada com sucesso! Seu voucher de benefício foi enviado para seu e-mail.`);
};

window.cancelarViagem = function(tripId) {
    const confirma = confirm("Tem certeza que deseja cancelar esta reserva?");
    if (!confirma) return;

    let trips = defaultTrips;
    const localTrips = localStorage.getItem('explorar_agendamentos');
    if (localTrips) {
        try { trips = JSON.parse(localTrips); } catch (e) {}
    }

    const trip = trips.find(t => t.id === tripId);
    if (trip) {
        trip.status = 'Cancelado';
        localStorage.setItem('explorar_agendamentos', JSON.stringify(trips));
        loadUserData();
        alert('Agendamento cancelado com sucesso.');
    }
};

window.abrirVoucher = function(tripId) {
    let trips = defaultTrips;
    const localTrips = localStorage.getItem('explorar_agendamentos');
    if (localTrips) {
        try { trips = JSON.parse(localTrips); } catch (e) {}
    }

    const trip = trips.find(t => t.id === tripId) || trips[0];
    const modal = document.getElementById('tripModal');
    const content = document.getElementById('tripModalContent');

    if (!modal || !content) return;

    content.innerHTML = `
        <div style="text-align: center; margin-bottom: 1.5rem;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">✈️</div>
            <h3 style="font-size: 1.4rem; color: var(--text-primary);">Voucher de Viagem Oficial</h3>
            <p style="color: var(--teal-400); font-weight: 600;">Reserva #${1000 + trip.id} • Explorar +</p>
        </div>
        <div style="background: rgba(255,255,255,0.03); border: 1px dashed rgba(255,255,255,0.15); padding: 1.2rem; border-radius: 8px; margin-bottom: 1.5rem;">
            <p><strong>Pacote:</strong> ${trip.pacote}</p>
            <p><strong>Destino:</strong> ${trip.destino}</p>
            <p><strong>Período:</strong> ${formatarData(trip.dataPartida)} até ${formatarData(trip.dataRetorno)}</p>
            <p><strong>Passageiros:</strong> ${trip.pessoas} pessoa(s)</p>
            <p><strong>Status:</strong> <span style="color: #4ade80; font-weight: bold;">${trip.status}</span></p>
            <p><strong>Valor Total:</strong> ${trip.valor}</p>
        </div>
        <div style="display: flex; gap: 1rem; justify-content: center;">
            <button class="btn-primary-custom btn-sm" onclick="window.print()">🖨️ Imprimir Voucher</button>
            <button class="btn-secondary-custom btn-sm" onclick="document.getElementById('tripModal').style.display = 'none'">Fechar</button>
        </div>
    `;

    modal.style.display = 'flex';
};

function setupProfileForm() {
    const form = document.getElementById('profileForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = document.getElementById('profNome').value;
        const email = document.getElementById('profEmail').value;
        const telefone = document.getElementById('profTelefone').value;

        const userStr = localStorage.getItem('explorar_user');
        let userObj = {};
        if (userStr) {
            try { userObj = JSON.parse(userStr); } catch (e) {}
        }

        userObj.nome = nome;
        userObj.email = email;
        userObj.telefone = telefone;

        localStorage.setItem('explorar_user', JSON.stringify(userObj));
        loadUserData();
        alert('Dados cadastrais atualizados com sucesso!');
    });
}

function setupModal() {
    const modal = document.getElementById('tripModal');
    const closeBtn = document.getElementById('closeTripModal');

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });
    }
}
