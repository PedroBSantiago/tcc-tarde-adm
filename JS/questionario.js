/* ========================================================
   EXPLORAR + | Quiz de Destinos (Brotas, São Roque, Campos do Jordão)
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startQuiz');
    const intro = document.getElementById('quizIntro');
    const progress = document.getElementById('quizProgress');
    const questions = document.getElementById('quizQuestions');
    const nav = document.getElementById('quizNav');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const result = document.getElementById('quizResult');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');

    let currentStep = 1;
    const totalSteps = 6;

    // Destinos Exclusivos Oficiais
    const destinations = {
        Brotas: {
            name: 'Brotas, SP',
            title: 'Brotas — Capital da Aventura & Ecoturismo',
            desc: 'Você tem espírito livre e ama a natureza! Brotas é o seu paraíso ideal: rafting emocionante nas corredeiras do Rio Jacaré-Pepira, banho em cachoeiras cristalinas, tirolesa nas alturas e noites sob o céu estrelado.',
            price: 'R$ 890,00',
            img: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=600',
            destParam: 'Brotas',
            badge: 'Aventura & Ecoturismo',
            tags: ['calor_natureza', 'aventura', 'rafting_trilhas', 'amigos_turma', 'solo', 'moderado_aventura', 'feriado', 'semana']
        },
        SaoRoque: {
            name: 'São Roque, SP',
            title: 'São Roque — A Rota do Vinho & Charme Rural',
            desc: 'Você valoriza os prazeres da boa mesa e momentos de serenidade! São Roque é o refúgio perfeito: passeios guiados por vinhedos premiados, degustação de rótulos artesanais, gastronomia ítalo-portuguesa e pousadas campestres aconchegantes.',
            price: 'R$ 650,00',
            img: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=600',
            destParam: 'SaoRoque',
            badge: 'Rota do Vinho',
            tags: ['ameno_rural', 'enoturismo', 'degustacao_vinhos', 'casal', 'familia', 'fim_de_semana', 'economico_moderado', 'relaxar']
        },
        CamposDoJordao: {
            name: 'Campos do Jordão, SP',
            title: 'Campos do Jordão — A Suíça Brasileira na Mantiqueira',
            desc: 'Você busca sofisticação, clima europeu e romance! Campos do Jordão combina perfeitamente com seu estilo: lareiras acolhedoras, fondue tradicional em Capivari, teleférico nas montanhas, cervejarias artesanais e chocolates finos.',
            price: 'R$ 1.150,00',
            img: 'https://images.pexels.com/photos/1486974/pexels-photo-1486974.jpeg?auto=compress&cs=tinysrgb&w=600',
            destParam: 'CamposDoJordao',
            badge: 'Serra & Romântico',
            tags: ['frio_serra', 'romantica_charme', 'fondue_teleferico', 'casal', 'conforto_serrano', 'premium_luxo', 'feriado', 'semana']
        }
    };

    // Iniciar quiz
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            intro.style.display = 'none';
            progress.style.display = 'block';
            questions.style.display = 'block';
            nav.style.display = 'flex';
            showStep(1);
        });
    }

    // Próxima pergunta
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const currentStepEl = document.querySelector(`.quiz-step[data-step="${currentStep}"]`);
            const selected = currentStepEl.querySelector('input:checked');
            
            if (!selected) {
                nextBtn.style.animation = 'shake 0.4s ease';
                setTimeout(() => nextBtn.style.animation = '', 400);
                alert('Por favor, selecione uma opção para continuar.');
                return;
            }

            if (currentStep < totalSteps) {
                currentStep++;
                showStep(currentStep);
            } else {
                showResult();
            }
        });
    }

    // Voltar pergunta
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                showStep(currentStep);
            }
        });
    }

    function showStep(step) {
        document.querySelectorAll('.quiz-step').forEach(s => s.style.display = 'none');
        const stepEl = document.querySelector(`.quiz-step[data-step="${step}"]`);
        if (stepEl) {
            stepEl.style.display = 'block';
            stepEl.querySelector('.quiz-question').style.animation = 'slide-up 0.4s ease';
        }

        if (progressFill) progressFill.style.width = `${(step / totalSteps) * 100}%`;
        if (progressText) progressText.textContent = `Pergunta ${step} de ${totalSteps}`;

        if (prevBtn) prevBtn.style.display = step > 1 ? 'inline-flex' : 'none';
        if (nextBtn) nextBtn.textContent = step === totalSteps ? '✨ Revelar Destino Ideal' : 'Próxima Pergunta →';
    }

    function showResult() {
        questions.style.display = 'none';
        nav.style.display = 'none';
        progress.style.display = 'none';

        // Coleta respostas
        const answers = {};
        document.querySelectorAll('input[type="radio"]:checked').forEach(r => {
            answers[r.name] = r.value;
        });

        // Algoritmo de Pontuação para Brotas, São Roque e Campos do Jordão
        const scores = { Brotas: 0, SaoRoque: 0, CamposDoJordao: 0 };

        // Avalia cada resposta comparando com as tags de cada destino
        Object.values(answers).forEach(val => {
            for (const key in destinations) {
                if (destinations[key].tags.includes(val)) {
                    scores[key] += 2;
                }
            }
        });

        // Determina o vencedor
        let winnerKey = 'Brotas';
        let maxScore = -1;
        for (const key in scores) {
            if (scores[key] > maxScore) {
                maxScore = scores[key];
                winnerKey = key;
            }
        }

        const bestDest = destinations[winnerKey];

        // Tenta salvar via backend
        salvarResultadoQuiz(answers, bestDest.name);

        // Renderiza resultado
        const resultContainer = document.getElementById('resultDestination');
        const actionsContainer = document.getElementById('resultActions');

        if (resultContainer) {
            resultContainer.innerHTML = `
                <div class="result-dest-card" style="display: flex; gap: 1.5rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border-glow); border-radius: var(--radius-lg); overflow: hidden; margin: 1.5rem 0; text-align: left; flex-wrap: wrap;">
                    <div style="flex: 1; min-width: 250px; height: 230px;">
                        <img src="${bestDest.img}" alt="${bestDest.name}" style="width: 100%; height: 100%; object-fit: cover;" />
                    </div>
                    <div style="flex: 1.5; min-width: 260px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: center;">
                        <span class="badge-custom badge-aventura" style="margin-bottom: 0.5rem; align-self: flex-start;">${bestDest.badge}</span>
                        <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--text-primary);">${bestDest.title}</h3>
                        <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1rem;">${bestDest.desc}</p>
                        <div style="font-size: 1.3rem; font-weight: 800; color: var(--gold-400);">A partir de ${bestDest.price}</div>
                    </div>
                </div>
            `;
        }

        if (actionsContainer) {
            actionsContainer.innerHTML = `
                <a href="agendamentos.html?destino=${bestDest.destParam}" class="btn-primary-custom">📅 Agendar Minha Viagem para ${bestDest.name} →</a>
                <a href="pacotes.html#${bestDest.destParam.toLowerCase()}" class="btn-secondary-custom">Ver Pacotes Especiais</a>
                <button type="button" class="btn-link" id="retryQuizBtn" style="margin-top: 1rem; display: block; width: 100%;">Refazer Quiz de Destinos</button>
            `;

            document.getElementById('retryQuizBtn')?.addEventListener('click', resetQuiz);
        }

        if (result) {
            result.style.display = 'block';
            result.querySelector('.result-card').style.animation = 'slide-up 0.6s ease';
        }
    }

    function resetQuiz() {
        currentStep = 1;
        document.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
        result.style.display = 'none';
        intro.style.display = 'block';
        progress.style.display = 'none';
        questions.style.display = 'none';
        nav.style.display = 'none';
    }

    async function salvarResultadoQuiz(answers, resultadoNome) {
        // Salva localmente
        localStorage.setItem('explorar_quiz_resultado', resultadoNome);

        try {
            const formData = new FormData();
            formData.append('clima', answers.clima || '');
            formData.append('tipo_viagem', answers.tipo_viagem || '');
            formData.append('orcamento', answers.orcamento || '');
            formData.append('duracao', answers.duracao || '');
            formData.append('atividades', answers.atividades || '');
            formData.append('companhia', answers.companhia || '');
            formData.append('resultado', resultadoNome);

            await fetch('../php/salvar_quiz.php', {
                method: 'POST',
                body: formData
            });
        } catch (e) {
            console.log('Quiz gravado em modo offline/local', e);
        }
    }
});
