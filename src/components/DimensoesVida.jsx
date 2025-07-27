import React, { useState } from 'react';
import { frasesAfirmativas } from '../data/frasesAfirmativas';

function DimensoesVida({ navigate, userData, setUserData }) {
  const [dimensionScores, setDimensionScores] = useState(
    userData.dimensions || {}
  );
  const [affirmationChecks, setAffirmationChecks] = useState({});

  const dimensions = [
    { id: 'nutricional', title: '🍎 Nutrição & Alimentação', frases: frasesAfirmativas.nutricional },
    { id: 'fisico', title: '💪 Saúde Física & Movimento', frases: frasesAfirmativas.fisico },
    { id: 'mental', title: '🧠 Saúde Mental & Cognitiva', frases: frasesAfirmativas.mental },
    { id: 'emocional', title: '❤️ Inteligência Emocional', frases: frasesAfirmativas.emocional },
    { id: 'social', title: '👥 Relacionamentos & Conexões', frases: frasesAfirmativas.social },
    { id: 'profissional', title: '💼 Propósito & Carreira', frases: frasesAfirmativas.profissional },
    { id: 'financeira', title: '💰 Saúde Financeira', frases: frasesAfirmativas.financeira },
    { id: 'espiritual', title: '🙏 Espiritualidade & Transcendência', frases: frasesAfirmativas.espiritual },
    { id: 'ambiental', title: '🌍 Ambiente & Sustentabilidade', frases: frasesAfirmativas.ambiental },
    { id: 'criativa', title: '🎨 Criatividade & Expressão', frases: frasesAfirmativas.criativa }
  ];

  const getCorDoGradiente = (valor) => {
    // Gradiente de marrom (#8B4513) até lilás (#9B59B6)
    const marrom = { r: 139, g: 69, b: 19 };
    const lilas = { r: 155, g: 89, b: 182 };
    
    const percent = valor / 99;
    const r = Math.round(marrom.r + (lilas.r - marrom.r) * percent);
    const g = Math.round(marrom.g + (lilas.g - marrom.g) * percent);
    const b = Math.round(marrom.b + (lilas.b - marrom.b) * percent);
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  const handleSliderChange = (dimensionId, value) => {
    const newScores = { ...dimensionScores, [dimensionId]: value };
    setDimensionScores(newScores);
    
    setUserData(prev => ({
      ...prev,
      dimensions: newScores
    }));
  };

  const handleAffirmationToggle = (dimensionId, affirmationIndex) => {
    const key = `${dimensionId}_${affirmationIndex}`;
    setAffirmationChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="screen-container">
      <h1 className="section-title">10 Dimensões da Vida</h1>
      <p className="subtitle">
        Avalie cada dimensão deslizando o controle de 0 a 99. 
        Marque as afirmações que mais se identificam com você.
      </p>

      <div className="dimensions-container">
        {dimensions.map((dimension) => {
          const score = dimensionScores[dimension.id] || 50;
          const checkedCount = dimension.frases.filter((_, index) => 
            affirmationChecks[`${dimension.id}_${index}`]
          ).length;

          return (
            <div key={dimension.id} className="dimension-item">
              <div className="dimension-header">
                <h3 className="dimension-title">{dimension.title}</h3>
                <div 
                  className="dimension-score" 
                  style={{ color: getCorDoGradiente(score) }}
                >
                  {score}
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="99"
                value={score}
                onChange={(e) => handleSliderChange(dimension.id, parseInt(e.target.value))}
                className="dimension-slider"
                style={{
                  background: `linear-gradient(90deg, #8B4513 0%, ${getCorDoGradiente(score)} ${score}%, #9B59B6 100%)`
                }}
              />

              <div className="slider-labels" style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.8rem',
                color: 'var(--cor-texto-terciario)',
                marginTop: '0.5rem'
              }}>
                <span>0 - Muito baixo</span>
                <span>99 - Excelente</span>
              </div>

              <div className="affirmations-list">
                <h4 style={{ 
                  margin: '1.5rem 0 1rem 0', 
                  color: 'var(--cor-texto-secundario)',
                  fontSize: '1rem'
                }}>
                  Afirmações identificadas ({checkedCount}/12):
                </h4>
                
                {dimension.frases.map((frase, index) => (
                  <div key={index} className="affirmation-item">
                    <div
                      className={`affirmation-check ${affirmationChecks[`${dimension.id}_${index}`] ? 'checked' : ''}`}
                      onClick={() => handleAffirmationToggle(dimension.id, index)}
                    >
                      {affirmationChecks[`${dimension.id}_${index}`] && '✓'}
                    </div>
                    <span style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>
                      {frase}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="evaluation-summary" style={{
        background: 'rgba(139, 92, 246, 0.1)',
        border: '1px solid var(--cor-destaque)',
        borderRadius: '16px',
        padding: '2rem',
        margin: '3rem 0',
        textAlign: 'center'
      }}>
        <h3 style={{ color: 'var(--cor-destaque)', marginBottom: '1rem' }}>
          📊 Resumo da Avaliação
        </h3>
        <p style={{ color: 'var(--cor-texto-secundario)', marginBottom: '1rem' }}>
          Você avaliou <strong>{Object.keys(dimensionScores).length}</strong> de 10 dimensões
        </p>
        <p style={{ color: 'var(--cor-texto-principal)' }}>
          Total de afirmações marcadas: <strong>
            {Object.values(affirmationChecks).filter(Boolean).length}
          </strong> de 120 possíveis
        </p>
      </div>

      <div className="button-group">
        <button 
          className="button button-secondary"
          onClick={() => navigate(4)}
        >
          ← Voltar
        </button>
        <button 
          className="button button-primary"
          onClick={() => navigate(6)}
        >
          Ponderar Dimensões →
        </button>
      </div>
    </div>
  );
}

export default DimensoesVida;