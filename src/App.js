import React, { useState, useEffect } from 'react';
import './App.css';

interface WeatherData {
  city: string;
  temp: number;
  description: string;
  humidity: number;
}

interface UserData {
  cep: string;
  weather?: WeatherData;
  scores: { [key: string]: number };
  currentQuestion: number;
  totalQuestions: number;
}

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<string>('welcome');
  const [userData, setUserData] = useState<UserData>({
    cep: '',
    scores: {},
    currentQuestion: 1,
    totalQuestions: 39
  });

  const [weatherLoading, setWeatherLoading] = useState<boolean>(false);

  // API de Clima via CEP (simulada por enquanto)
  const fetchWeatherByCep = async (cep: string) => {
    if (!cep || cep.length !== 8) return;
    
    setWeatherLoading(true);
    try {
      // Simulação de API - substituir por APIs reais depois
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const weather: WeatherData = {
        city: `São Paulo, SP`, // Simular baseado no CEP
        temp: Math.round(Math.random() * 15 + 15), // 15-30°C
        description: 'Parcialmente nublado',
        humidity: Math.round(Math.random() * 30 + 50) // 50-80%
      };
      
      setUserData(prev => ({ ...prev, weather }));
    } catch (error) {
      console.error('Erro ao buscar clima:', error);
    }
    setWeatherLoading(false);
  };

  // Questões do formulário (versão simplificada para demonstração)
  const questions = [
    { id: 'q1', category: 'corporal', title: 'Hidratação Consciente', description: 'Manter hidratação constante ao longo do dia com água pura e fresca' },
    { id: 'q2', category: 'corporal', title: 'Timing Nutricional', description: 'Consumir frutas com o estômago vazio ou antes das refeições' },
    { id: 'q3', category: 'mental', title: 'Alimentação Consciente', description: 'Mastigar devagar e saborear cada alimento' },
    { id: 'q4', category: 'emocional', title: 'Equilíbrio Emocional', description: 'Não comer por ansiedade ou estresse' },
    { id: 'q5', category: 'social', title: 'Refeições Sociais', description: 'Compartilhar refeições em família ou amigos' }
  ];

  const handleSliderChange = (questionId: string, value: number) => {
    setUserData(prev => ({
      ...prev,
      scores: { ...prev.scores, [questionId]: value }
    }));
  };

  const calculateResults = () => {
    const categories = ['corporal', 'mental', 'emocional', 'social', 'espiritual'];
    
    const results = categories.map(category => {
      const categoryQuestions = questions.filter(q => q.category === category);
      const totalScore = categoryQuestions.reduce((sum, q) => sum + (userData.scores[q.id] || 50), 0);
      const average = categoryQuestions.length > 0 ? totalScore / categoryQuestions.length : 50;
      
      return {
        category,
        score: Math.round(average),
        level: getScoreLevel(average)
      };
    });

    return results;
  };

  const getScoreLevel = (score: number) => {
    if (score < 20) return { label: 'Atenção', color: 'red' };
    if (score < 40) return { label: 'Desenvolvimento', color: 'orange' };
    if (score < 60) return { label: 'Crescimento', color: 'yellow' };
    if (score < 80) return { label: 'Consolidação', color: 'blue' };
    return { label: 'Excelência', color: 'green' };
  };

  const getWeatherNutritionTip = (weather?: WeatherData) => {
    if (!weather) return '';
    
    if (weather.temp > 25) {
      return '🌡️ Clima quente: Priorize hidratação e alimentos refrescantes como melancia, pepino e água de coco!';
    } else if (weather.temp < 18) {
      return '❄️ Clima frio: Ideal para sopas nutritivas, chás quentes e alimentos termogênicos como gengibre!';
    } else {
      return '🌤️ Clima agradável: Perfeito para refeições balanceadas ao ar livre e atividade física!';
    }
  };

  return (
    <div className="app-container">
      {/* Badge 1 MÊS GRÁTIS */}
      <div className="test-badge">
        ✨ TESTE GRÁTIS - 1 MÊS COMPLETO
      </div>

      {currentScreen === 'welcome' && (
        <div className="welcome-screen fade-in">
          <div className="section-card">
            <div className="text-center">
              <div className="welcome-emoji">🌟</div>
              
              <h2 className="trial-badge">TESTE GRÁTIS</h2>
              <p className="trial-period">Prazo de validade: 1 mês completo</p>
              
              <h1 className="app-title">JORNADA DA NUTRIÇÃO INTEGRAL</h1>
              
              <div className="doctor-card">
                <h3>Dr Olair Rafael da Silva Júnior</h3>
                <p>Médico Especialista (RQE CRM-SP) em Pediatria e Medicina do Trabalho<br/>
                   Pós-graduado em Homeopatia, Nutrologia, Medicina Canábica,<br/>
                   Medicina do Estilo de Vida e Longevidade Saudável</p>
              </div>

              {/* CEP Input para Clima */}
              <div className="weather-section">
                <h4>🌤️ Recomendações baseadas no seu clima local</h4>
                <div className="cep-input-group">
                  <input
                    type="text"
                    placeholder="Digite seu CEP (ex: 01234567)"
                    value={userData.cep}
                    onChange={(e) => setUserData(prev => ({ ...prev, cep: e.target.value.replace(/\D/g, '') }))}
                    maxLength={8}
                    className="cep-input"
                  />
                  <button 
                    onClick={() => fetchWeatherByCep(userData.cep)}
                    disabled={weatherLoading || userData.cep.length !== 8}
                    className="weather-btn"
                  >
                    {weatherLoading ? '⏳' : '🔍'}
                  </button>
                </div>
                
                {userData.weather && (
                  <div className="weather-card">
                    <p><strong>{userData.weather.city}</strong></p>
                    <p>{userData.weather.temp}°C - {userData.weather.description}</p>
                    <p className="weather-tip">{getWeatherNutritionTip(userData.weather)}</p>
                  </div>
                )}
              </div>
              
              <div className="welcome-text">
                <p>Aceita as minhas Boas-Vindas!</p>
                <p>Comece agora os seus primeiros passos na sua <strong><em>Evolução Consciente</em></strong> para um modo Alegre e Feliz de bem-viver!</p>
              </div>
              
              <div className="action-buttons">
                <button 
                  onClick={() => setCurrentScreen('assessment')}
                  className="primary-btn"
                >
                  <em>Vamos iniciar com a sua <strong>AUTOAVALIAÇÃO NUTRICIONAL</strong></em>
                </button>
                
                <button 
                  onClick={() => setCurrentScreen('about')}
                  className="secondary-btn"
                >
                  📖 Sobre o Método
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentScreen === 'assessment' && (
        <div className="assessment-screen fade-in">
          <div className="section-card">
            <h1>📊 Autoavaliação dos Cinco Corpos</h1>
            <p>Avalie seu grau de compromisso com a nutrição física e sutil</p>
            
            {/* Progress Bar */}
            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${(Object.keys(userData.scores).length / questions.length) * 100}%` }}
                />
              </div>
              <p>Concluídas: {Object.keys(userData.scores).length} de {questions.length}</p>
            </div>

            {/* Questões */}
            {questions.map((question, index) => (
              <div key={question.id} className="questao-card">
                <h3>{String(index + 1).padStart(2, '0')}. {question.title}</h3>
                <p>{question.description}</p>
                <div className="slider-container">
                  <input
                    type="range"
                    className="slider"
                    min="0"
                    max="99"
                    value={userData.scores[question.id] || 50}
                    onChange={(e) => handleSliderChange(question.id, parseInt(e.target.value))}
                  />
                  <div className="valor-display">
                    {userData.scores[question.id] || 50}
                  </div>
                </div>
              </div>
            ))}

            <div className="assessment-actions">
              <button 
                onClick={() => setCurrentScreen('results')}
                className="primary-btn"
              >
                📈 Ver Meu Plano Personalizado
              </button>
            </div>
          </div>
        </div>
      )}

      {currentScreen === 'results' && (
        <div className="results-screen fade-in">
          <div className="section-card">
            <h1>🎯 Seu Plano Personalizado</h1>
            
            {userData.weather && (
              <div className="weather-recommendation">
                <h3>🌤️ Recomendação baseada no clima de {userData.weather.city}</h3>
                <p>{getWeatherNutritionTip(userData.weather)}</p>
              </div>
            )}

            <div className="results-grid">
              {calculateResults().map((result) => (
                <div key={result.category} className="resultado-card">
                  <h3>{result.category.toUpperCase()}</h3>
                  <div className="score-display">{result.score}</div>
                  <p className={`level-${result.level.color}`}>{result.level.label}</p>
                </div>
              ))}
            </div>

            <div className="subscription-section">
              <h2>🎊 Parabéns! Você completou a avaliação!</h2>
              <p>Continue sua jornada com acesso completo por apenas:</p>
              
              <div className="pricing-card">
                <div className="price">R$ 97,00/mês</div>
                <div className="trial-info">✨ Primeiro mês GRÁTIS!</div>
                
                <button 
                  onClick={() => setCurrentScreen('payment')}
                  className="subscribe-btn"
                >
                  🚀 Continuar Jornada - PIX Instantâneo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentScreen === 'payment' && (
        <div className="payment-screen fade-in">
          <div className="section-card">
            <h1>💳 Finalizar Assinatura</h1>
            
            <div className="payment-summary">
              <h3>📋 Resumo do Pedido</h3>
              <div className="plan-details">
                <p><strong>Plano:</strong> Jornada da Nutrição Integral</p>
                <p><strong>Primeiro mês:</strong> <span className="free">GRÁTIS</span></p>
                <p><strong>A partir do 2º mês:</strong> R$ 97,00</p>
              </div>
            </div>

            <div className="pix-section">
              <h3>📱 Pagamento via PIX</h3>
              <div className="qr-code-placeholder">
                <div className="qr-code">
                  [QR CODE AQUI]
                </div>
                <p>Escaneie o código ou use a chave PIX:</p>
                <div className="pix-key">pix@jornadadanutricao.com.br</div>
              </div>
              
              <button className="confirm-payment-btn">
                ✅ Confirmar Pagamento
              </button>
            </div>

            <button 
              onClick={() => setCurrentScreen('welcome')}
              className="secondary-btn"
              style={{marginTop: '2rem'}}
            >
              ← Voltar ao Início
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;