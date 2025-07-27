document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const screens = document.querySelectorAll('.screen');
    const startButton = document.getElementById('start-button');
    const calculateImcButton = document.getElementById('calculate-imc');
    const continueToAssessmentButton = document.getElementById('continue-to-assessment');
    const backButtons = document.querySelectorAll('.back-button');
    const nextQuestionButton = document.getElementById('next-question');
    const prevQuestionButton = document.getElementById('prev-question');
    const restartButton = document.getElementById('restart-button');
    const backToResultsButton = document.getElementById('back-to-results');
    
    // Estado da aplicação
    let currentScreen = 0;
    let userData = {
        name: '',
        age: 0,
        weight: 0,
        height: 0,
        imc: 0,
        imcCategory: ''
    };
    
    let currentQuestion = 0;
    let answers = {};
    
    // Questões da avaliação
    const questions = [
        // Dimensão Física
        {
            id: 'q1',
            dimension: 'física',
            text: 'Como você avalia sua energia diária?',
            options: [
                { value: 1, text: 'Frequentemente me sinto cansado(a) e sem energia' },
                { value: 2, text: 'Tenho energia baixa durante a maior parte do dia' },
                { value: 3, text: 'Minha energia varia ao longo do dia' },
                { value: 4, text: 'Geralmente tenho boa energia' },
                { value: 5, text: 'Tenho excelente energia ao longo de todo o dia' }
            ]
        },
        {
            id: 'q2',
            dimension: 'física',
            text: 'Como está sua qualidade de sono?',
            options: [
                { value: 1, text: 'Péssima - tenho grandes dificuldades para dormir' },
                { value: 2, text: 'Ruim - frequentemente acordo cansado(a)' },
                { value: 3, text: 'Regular - durmo o suficiente, mas não me sinto descansado(a)' },
                { value: 4, text: 'Boa - geralmente durmo bem' },
                { value: 5, text: 'Excelente - durmo profundamente e acordo revigorado(a)' }
            ]
        },
        {
            id: 'q3',
            dimension: 'física',
            text: 'Com que frequência você pratica atividade física?',
            options: [
                { value: 1, text: 'Nunca ou raramente' },
                { value: 2, text: 'Menos de uma vez por semana' },
                { value: 3, text: '1-2 vezes por semana' },
                { value: 4, text: '3-4 vezes por semana' },
                { value: 5, text: '5 ou mais vezes por semana' }
            ]
        },
        
        // Dimensão Mental
        {
            id: 'q4',
            dimension: 'mental',
            text: 'Como está sua capacidade de concentração?',
            options: [
                { value: 1, text: 'Péssima - não consigo me concentrar' },
                { value: 2, text: 'Ruim - me distraio facilmente' },
                { value: 3, text: 'Regular - varia conforme o dia' },
                { value: 4, text: 'Boa - geralmente mantenho o foco' },
                { value: 5, text: 'Excelente - consigo me concentrar por longos períodos' }
            ]
        },
        {
            id: 'q5',
            dimension: 'mental',
            text: 'Com que frequência você se sente mentalmente cansado(a)?',
            options: [
                { value: 1, text: 'Constantemente' },
                { value: 2, text: 'Frequentemente' },
                { value: 3, text: 'Às vezes' },
                { value: 4, text: 'Raramente' },
                { value: 5, text: 'Quase nunca' }
            ]
        },
        {
            id: 'q6',
            dimension: 'mental',
            text: 'Como você avalia sua capacidade de aprendizado e memória?',
            options: [
                { value: 1, text: 'Muito fraca' },
                { value: 2, text: 'Fraca' },
                { value: 3, text: 'Média' },
                { value: 4, text: 'Boa' },
                { value: 5, text: 'Excelente' }
            ]
        },
        
        // Dimensão Emocional
        {
            id: 'q7',
            dimension: 'emocional',
            text: 'Como você lida com situações estressantes?',
            options: [
                { value: 1, text: 'Muito mal - me sinto dominado(a) pelo estresse' },
                { value: 2, text: 'Mal - o estresse me afeta bastante' },
                { value: 3, text: 'Razoavelmente - consigo lidar, mas com dificuldade' },
                { value: 4, text: 'Bem - geralmente lido bem com o estresse' },
                { value: 5, text: 'Muito bem - mantenho a calma mesmo sob pressão' }
            ]
        },
        {
            id: 'q8',
            dimension: 'emocional',
            text: 'Com que frequência você experimenta emoções positivas (alegria, gratidão, etc)?',
            options: [
                { value: 1, text: 'Raramente' },
                { value: 2, text: 'Ocasionalmente' },
                { value: 3, text: 'Algumas vezes por semana' },
                { value: 4, text: 'Diariamente' },
                { value: 5, text: 'Várias vezes por dia' }
            ]
        },
        {
            id: 'q9',
            dimension: 'emocional',
            text: 'Você consegue expressar suas emoções de forma saudável?',
            options: [
                { value: 1, text: 'Não, tenho grande dificuldade' },
                { value: 2, text: 'Raramente consigo' },
                { value: 3, text: 'Às vezes sim, às vezes não' },
                { value: 4, text: 'Na maioria das vezes' },
                { value: 5, text: 'Sim, consigo expressar adequadamente' }
            ]
        },
        
        // Dimensão Social
        {
            id: 'q10',
            dimension: 'social',
            text: 'Como você avalia a qualidade dos seus relacionamentos próximos?',
            options: [
                { value: 1, text: 'Muito insatisfatória' },
                { value: 2, text: 'Insatisfatória' },
                { value: 3, text: 'Neutra' },
                { value: 4, text: 'Satisfatória' },
                { value: 5, text: 'Muito satisfatória' }
            ]
        },
        {
            id: 'q11',
            dimension: 'social',
            text: 'Você se sente apoiado(a) por pessoas ao seu redor?',
            options: [
                { value: 1, text: 'Nada apoiado(a)' },
                { value: 2, text: 'Pouco apoiado(a)' },
                { value: 3, text: 'Moderadamente apoiado(a)' },
                { value: 4, text: 'Bem apoiado(a)' },
                { value: 5, text: 'Extremamente apoiado(a)' }
            ]
        },
        {
            id: 'q12',
            dimension: 'social',
            text: 'Com que frequência você se sente sozinho(a)?',
            options: [
                { value: 5, text: 'Nunca ou raramente' },
                { value: 4, text: 'Ocasionalmente' },
                { value: 3, text: 'Às vezes' },
                { value: 2, text: 'Frequentemente' },
                { value: 1, text: 'Quase sempre' }
            ]
        },
        
        // Dimensão Espiritual
        {
            id: 'q13',
            dimension: 'espiritual',
            text: 'Você sente que sua vida tem um propósito claro?',
            options: [
                { value: 1, text: 'Não sinto nenhum propósito' },
                { value: 2, text: 'Raramente sinto propósito' },
                { value: 3, text: 'Às vezes sinto propósito' },
                { value: 4, text: 'Frequentemente sinto propósito' },
                { value: 5, text: 'Tenho um forte senso de propósito' }
            ]
        },
        {
            id: 'q14',
            dimension: 'espiritual',
            text: 'Com que frequência você pratica atividades que nutrem sua espiritualidade?',
            options: [
                { value: 1, text: 'Nunca' },
                { value: 2, text: 'Raramente' },
                { value: 3, text: 'Ocasionalmente' },
                { value: 4, text: 'Frequentemente' },
                { value: 5, text: 'Diariamente' }
            ]
        },
        {
            id: 'q15',
            dimension: 'espiritual',
            text: 'Você se sente conectado(a) a algo maior que você mesmo(a)?',
            options: [
                { value: 1, text: 'Não, nunca' },
                { value: 2, text: 'Raramente' },
                { value: 3, text: 'Às vezes' },
                { value: 4, text: 'Frequentemente' },
                { value: 5, text: 'Quase sempre' }
            ]
        }
    ];
    
    // Inicialização
    initApp();
    
    // Funções de inicialização
    function initApp() {
        attachEventListeners();
    }
    
    function attachEventListeners() {
        // Botão de início
        startButton.addEventListener('click', function() {
            changeScreen(1);
        });
        
        // Botões de voltar
        backButtons.forEach(button => {
            button.addEventListener('click', function() {
                changeScreen(currentScreen - 1);
            });
        });
        
        // Botão de calcular IMC
        calculateImcButton.addEventListener('click', calculateIMC);
        
        // Botão de continuar para avaliação
        continueToAssessmentButton.addEventListener('click', function() {
            changeScreen(2);
            renderQuestion();
        });
        
        // Navegação de perguntas
        nextQuestionButton.addEventListener('click', nextQuestion);
        prevQuestionButton.addEventListener('click', prevQuestion);
        
        // Botão de reiniciar
        restartButton.addEventListener('click', function() {
            resetApp();
            changeScreen(0);
        });
        
        // Botão de voltar aos resultados
        backToResultsButton.addEventListener('click', function() {
            changeScreen(3);
        });
    }
    
    // Navegação entre telas
    function changeScreen(index) {
        screens.forEach(screen => {
            screen.classList.remove('active');
        });
        screens[index].classList.add('active');
        currentScreen = index;
        
        // Configurações específicas de tela
        if (index === 2) {
            updateProgressBar();
        }
    }
    
    // Funcionalidade do IMC
    function calculateIMC() {
        const nameInput = document.getElementById('name');
        const ageInput = document.getElementById('age');
        const weightInput = document.getElementById('weight');
        const heightInput = document.getElementById('height');
        
        // Validação básica
        if (!nameInput.value || !ageInput.value || !weightInput.value || !heightInput.value) {
            alert('Por favor, preencha todos os campos');
            return;
        }
        
        // Coleta de dados
        userData.name = nameInput.value;
        userData.age = parseInt(ageInput.value);
        userData.weight = parseFloat(weightInput.value);
        userData.height = parseFloat(heightInput.value);
        
        // Cálculo do IMC
        userData.imc = userData.weight / Math.pow(userData.height / 100, 2);
        userData.imc = parseFloat(userData.imc.toFixed(2));
        
        // Determinação da categoria do IMC
        if (userData.imc < 18.5) {
            userData.imcCategory = 'Abaixo do peso';
        } else if (userData.imc < 25) {
            userData.imcCategory = 'Peso normal';
        } else if (userData.imc < 30) {
            userData.imcCategory = 'Sobrepeso';
        } else if (userData.imc < 35) {
            userData.imcCategory = 'Obesidade grau I';
        } else if (userData.imc < 40) {
            userData.imcCategory = 'Obesidade grau II';
        } else {
            userData.imcCategory = 'Obesidade grau III';
        }
        
        // Exibição dos resultados do IMC
        document.getElementById('imc-value').textContent = userData.imc;
        document.getElementById('imc-category').textContent = `Categoria: ${userData.imcCategory}`;
        document.getElementById('imc-result').classList.remove('hidden');
        
        // Mostra o botão para continuar
        continueToAssessmentButton.classList.remove('hidden');
    }
    
    // Renderização das perguntas
    function renderQuestion() {
        const questionContainer = document.getElementById('question-container');
        const currentQ = questions[currentQuestion];
        
        // Atualiza o progresso
        updateProgressBar();
        
        // Cria o HTML da pergunta
        let questionHTML = `
            <div class="question-card show">
                <h3 class="text-xl font-medium mb-2">Dimensão ${capitalizeFirstLetter(currentQ.dimension)}</h3>
                <p class="text-lg font-medium mb-6">${currentQuestion + 1}. ${currentQ.text}</p>
                <div class="space-y-4">
        `;
        
        // Adiciona as opções
        currentQ.options.forEach((option, index) => {
            const isChecked = answers[currentQ.id] === option.value ? 'checked' : '';
            questionHTML += `
                <div class="flex items-center">
                    <input type="radio" name="question-${currentQ.id}" id="option-${currentQ.id}-${index}" 
                           class="w-5 h-5 text-blue-600" value="${option.value}" ${isChecked}>
                    <label for="option-${currentQ.id}-${index}" class="ml-2 text-gray-700">
                        ${option.text}
                    </label>
                </div>
            `;
        });
        
        questionHTML += `
                </div>
            </div>
        `;
        
        questionContainer.innerHTML = questionHTML;
        
        // Adiciona eventos aos radio buttons
        document.querySelectorAll(`input[name="question-${currentQ.id}"]`).forEach(radio => {
            radio.addEventListener('change', function() {
                answers[currentQ.id] = parseInt(this.value);
            });
        });
        
        // Atualiza a visibilidade dos botões de navegação
        prevQuestionButton.style.visibility = currentQuestion === 0 ? 'hidden' : 'visible';
        nextQuestionButton.textContent = currentQuestion === questions.length - 1 ? 'Ver Resultados' : 'Próxima';
    }
    
    // Navegação entre perguntas
    function nextQuestion() {
        const currentQ = questions[currentQuestion];
        
        // Verifica se a pergunta atual foi respondida
        if (!answers[currentQ.id] && nextQuestionButton.textContent !== 'Ver Resultados') {
            alert('Por favor, responda a pergunta atual antes de continuar.');
            return;
        }
        
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            renderQuestion();
        } else {
            // Finaliza o questionário e mostra os resultados
            calculateResults();
            changeScreen(3);
        }
    }
    
    function prevQuestion() {
        if (currentQuestion > 0) {
            currentQuestion--;
            renderQuestion();
        }
    }
    
    // Atualiza a barra de progresso
    function updateProgressBar() {
        const progressBar = document.getElementById('progress-bar');
        const progress = ((currentQuestion + 1) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }
    
    // Cálculo de resultados
    function calculateResults() {
        // Agrupa as respostas por dimensão
        let dimensionScores = {
            física: { total: 0, count: 0 },
            mental: { total: 0, count: 0 },
            emocional: { total: 0, count: 0 },
            social: { total: 0, count: 0 },
            espiritual: { total: 0, count: 0 }
        };
        
        // Soma as pontuações por dimensão
        questions.forEach(question => {
            if (answers[question.id]) {
                dimensionScores[question.dimension].total += answers[question.id];
                dimensionScores[question.dimension].count++;
            }
        });
        
        // Calcula a média para cada dimensão (escala de 1-5)
        let finalScores = {};
        Object.keys(dimensionScores).forEach(dim => {
            if (dimensionScores[dim].count > 0) {
                finalScores[dim] = dimensionScores[dim].total / dimensionScores[dim].count;
            } else {
                finalScores[dim] = 0;
            }
        });
        
        // Exibe os resultados
        displayResults(finalScores);
    }
    
    // Exibição dos resultados
    function displayResults(scores) {
        // Exibe as informações do usuário
        document.getElementById('result-name').textContent = userData.name;
        document.getElementById('result-age').textContent = `Idade: ${userData.age} anos`;
        document.getElementById('result-imc').textContent = `IMC: ${userData.imc} (${userData.imcCategory})`;
        
        // Cria o gráfico radar
        createRadarChart(scores);
        
        // Exibe os resultados detalhados por dimensão
        displayDetailedResults(scores);
        
        // Gera recomendações personalizadas
        generateRecommendations(scores);
    }
    
    // Criação do gráfico radar
    function createRadarChart(scores) {
        const ctx = document.getElementById('radar-chart').getContext('2d');
        
        // Define as cores para cada dimensão
        const colors = {
            física: 'rgba(54, 162, 235, 0.7)',     // azul
            mental: 'rgba(75, 192, 192, 0.7)',     // verde-água
            emocional: 'rgba(153, 102, 255, 0.7)', // roxo
            social: 'rgba(255, 206, 86, 0.7)',     // amarelo
            espiritual: 'rgba(255, 99, 132, 0.7)'  // rosa
        };
        
        // Configura os dados do gráfico
        const data = {
            labels: ['Física', 'Mental', 'Emocional', 'Social', 'Espiritual'],
            datasets: [{
                label: 'Seu Perfil',
                data: [
                    scores.física || 0, 
                    scores.mental || 0, 
                    scores.emocional || 0, 
                    scores.social || 0, 
                    scores.espiritual || 0
                ],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 0.8)',
                pointBackgroundColor: Object.values(colors),
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: Object.values(colors),
                borderWidth: 2
            }]
        };
        
        // Configura as opções do gráfico
        const options = {
            scale: {
                min: 0,
                max: 5,
                ticks: {
                    beginAtZero: true,
                    stepSize: 1
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        };
        
        // Cria o gráfico
        const radarChart = new Chart(ctx, {
            type: 'radar',
            data: data,
            options: options
        });
    }
    
    // Exibe os resultados detalhados
    function displayDetailedResults(scores) {
        const container = document.getElementById('dimension-results');
        let html = '';
        
        // Define cores e descrições para cada dimensão
        const dimensions = {
            física: {
                color: 'blue',
                title: 'Saúde Física',
                descriptions: [
                    'Necessita atenção imediata',
                    'Abaixo do ideal',
                    'Regular',
                    'Bom',
                    'Excelente'
                ]
            },
            mental: {
                color: 'green',
                title: 'Saúde Mental',
                descriptions: [
                    'Necessita atenção imediata',
                    'Abaixo do ideal',
                    'Regular',
                    'Bom',
                    'Excelente'
                ]
            },
            emocional: {
                color: 'purple',
                title: 'Saúde Emocional',
                descriptions: [
                    'Necessita atenção imediata',
                    'Abaixo do ideal',
                    'Regular',
                    'Bom',
                    'Excelente'
                ]
            },
            social: {
                color: 'yellow',
                title: 'Saúde Social',
                descriptions: [
                    'Necessita atenção imediata',
                    'Abaixo do ideal',
                    'Regular',
                    'Bom',
                    'Excelente'
                ]
            },
            espiritual: {
                color: 'red',
                title: 'Saúde Espiritual',
                descriptions: [
                    'Necessita atenção imediata',
                    'Abaixo do ideal',
                    'Regular',
                    'Bom',
                    'Excelente'
                ]
            }
        };
        
        // Gera HTML para cada dimensão
        Object.keys(scores).forEach(dimension => {
            const score = scores[dimension];
            const roundedScore = Math.round(score);
            const desc = dimensions[dimension].descriptions[Math.min(Math.max(Math.floor(score) - 1, 0), 4)];
            
            html += `
                <div class="p-4 border rounded-lg bg-${dimensions[dimension].color}-50">
                    <h4 class="font-semibold text-${dimensions[dimension].color}-700 mb-2">
                        ${dimensions[dimension].title}
                    </h4>
                    <div class="flex items-center mb-2">
                        <div class="text-2xl font-bold mr-2">${score.toFixed(1)}</div>
                        <div class="text-sm text-gray-600">(de 5)</div>
                    </div>
                    <div class="h-2 bg-gray-200 rounded-full mb-2">
                        <div class="h-full bg-${dimensions[dimension].color}-500 rounded-full" 
                             style="width: ${(score/5)*100}%"></div>
                    </div>
                    <p class="text-sm">${desc}</p>
                </div>
            `;
        });
        
        container.innerHTML = html;
    }
    
    // Gera recomendações personalizadas
    function generateRecommendations(scores) {
        const container = document.getElementById('recommendations');
        let recommendations = [];
        
        // Analisa cada dimensão e fornece recomendações específicas
        if (scores.física < 3) {
            recommendations.push(`
                <div class="mb-3">
                    <h4 class="font-semibold text-blue-700">Saúde Física</h4>
                    <ul class="list-disc pl-5 space-y-1">
                        <li>Considere incorporar 30 minutos de atividade física moderada diariamente</li>
                        <li>Melhore seus hábitos de sono estabelecendo uma rotina regular</li>
                        <li>Revise sua alimentação com um profissional de saúde</li>
                    </ul>
                </div>
            `);
        }
        
        if (scores.mental < 3) {
            recommendations.push(`
                <div class="mb-3">
                    <h4 class="font-semibold text-green-700">Saúde Mental</h4>
                    <ul class="list-disc pl-5 space-y-1">
                        <li>Pratique técnicas de mindfulness por 10 minutos diários</li>
                        <li>Estabeleça períodos de descanso mental entre atividades</li>
                        <li>Considere atividades que estimulem o cérebro, como leitura ou jogos de lógica</li>
                    </ul>
                </div>
            `);
        }
        
        if (scores.emocional < 3) {
            recommendations.push(`
                <div class="mb-3">
                    <h4 class="font-semibold text-purple-700">Saúde Emocional</h4>
                    <ul class="list-disc pl-5 space-y-1">
                        <li>Mantenha um diário de emoções para identificar padrões</li>
                        <li>Pratique técnicas de respiração para momentos de estresse</li>
                        <li>Considere buscar apoio profissional para processar emoções difíceis</li>
                    </ul>
                </div>
            `);
        }
        
        if (scores.social < 3) {
            recommendations.push(`
                <div class="mb-3">
                    <h4 class="font-semibold text-yellow-700">Saúde Social</h4>
                    <ul class="list-disc pl-5 space-y-1">
                        <li>Dedique tempo para fortalecer relacionamentos importantes</li>
                        <li>Considere participar de grupos ou atividades comunitárias</li>
                        <li>Pratique habilidades de comunicação e escuta ativa</li>
                    </ul>
                </div>
            `);
        }
        
        if (scores.espiritual < 3) {
            recommendations.push(`
                <div class="mb-3">
                    <h4 class="font-semibold text-red-700">Saúde Espiritual</h4>
                    <ul class="list-disc pl-5 space-y-1">
                        <li>Reserve momentos para reflexão e conexão com seus valores</li>
                        <li>Experimente práticas como meditação ou contemplação na natureza</li>
                        <li>Considere explorar práticas que proporcionem significado e propósito</li>
                    </ul>
                </div>
            `);
        }
        
        // Recomendações gerais
        recommendations.push(`
            <div>
                <h4 class="font-semibold text-gray-800">Recomendações Gerais</h4>
                <ul class="list-disc pl-5 space-y-1">
                    <li>Refaça esta avaliação a cada 3-6 meses para acompanhar seu progresso</li>
                    <li>Lembre-se que pequenas mudanças consistentes geram grandes resultados</li>
                    <li>Busque ajuda profissional para áreas que precisam de mais atenção</li>
                </ul>
            </div>
        `);
        
        container.innerHTML = recommendations.join('');
    }
    
    // Reinicia o aplicativo
    function resetApp() {
        userData = {
            name: '',
            age: 0,
            weight: 0,
            height: 0,
            imc: 0,
            imcCategory: ''
        };
        
        currentQuestion = 0;
        answers = {};
        
        // Limpa os campos do formulário
        document.getElementById('name').value = '';
        document.getElementById('age').value = '';
        document.getElementById('weight').value = '';
        document.getElementById('height').value = '';
        document.getElementById('imc-result').classList.add('hidden');
        document.getElementById('continue-to-assessment').classList.add('hidden');
    }
    
    // Funções auxiliares
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});