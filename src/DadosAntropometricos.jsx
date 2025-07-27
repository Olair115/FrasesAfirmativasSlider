import React, { useState } from 'react';

function DadosAntropometricos({ navigate, userData, setUserData }) {
  const [dados, setDados] = useState({
    nome: userData.anthropometric?.nome || '',
    idade: userData.anthropometric?.idade || '',
    peso: userData.anthropometric?.peso || '',
    altura: userData.anthropometric?.altura || '',
    sexo: userData.anthropometric?.sexo || '',
    objetivo: userData.anthropometric?.objetivo || ''
  });

  const [imc, setImc] = useState(null);
  const [interpretacao, setInterpretacao] = useState('');

  const calcularIMC = () => {
    if (dados.peso && dados.altura) {
      const alturaMetros = parseFloat(dados.altura) / 100;
      const imcCalculado = parseFloat(dados.peso) / (alturaMetros * alturaMetros);
      setImc(imcCalculado.toFixed(1));
      
      // Interpretação do IMC
      if (imcCalculado < 18.5) {
        setInterpretacao({
          categoria: 'Abaixo do peso',
          cor: '#60A5FA',
          descricao: 'Pode ser indicativo de desnutrição ou outras condições de saúde.',
          recomendacao: 'Consulte um profissional para avaliação nutricional completa.'
        });
      } else if (imcCalculado < 25) {
        setInterpretacao({
          categoria: 'Peso normal',
          cor: '#10B981',
          descricao: 'Faixa de peso associada aos menores riscos de doenças.',
          recomendacao: 'Mantenha hábitos saudáveis de alimentação e exercícios.'
        });
      } else if (imcCalculado < 30) {
        setInterpretacao({
          categoria: 'Sobrepeso',
          cor: '#F59E0B',
          descricao: 'Aumento do risco de doenças cardiovasculares e diabetes.',
          recomendacao: 'Considere mudanças graduais no estilo de vida.'
        });
      } else {
        setInterpretacao({
          categoria: 'Obesidade',
          cor: '#EF4444',
          descricao: 'Risco significativamente elevado para várias condições de saúde.',
          recomendacao: 'Recomenda-se acompanhamento médico e nutricional especializado.'
        });
      }
    }
  };

  const handleInputChange = (campo, valor) => {
    const novosDados = { ...dados, [campo]: valor };
    setDados(novosDados);
    
    // Atualiza userData
    setUserData(prev => ({
      ...prev,
      anthropometric: novosDados
    }));
    
    // Recalcula IMC se peso ou altura mudaram
    if (campo === 'peso' || campo === 'altura') {
      if (novosDados.peso && novosDados.altura) {
        setTimeout(calcularIMC, 100);
      }
    }
  };

  const podeAvancar = dados.nome && dados.idade && dados.peso && dados.altura && dados.sexo;

  return (
    <div className="screen-container">
      <div className="anthropometric-icon" style={{ textAlign: 'center', margin: '2rem 0' }}>
        <span style={{ fontSize: '4rem' }}>📏</span>
      </div>
      
      <h1 className="section-title">Dados Antropométricos</h1>
      <p className="subtitle">
        Vamos conhecer suas características físicas para uma avaliação mais precisa
      </p>
      
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Nome completo</label>
          <input
            type="text"
            className="form-input"
            placeholder="Como você gostaria de ser chamado?"
            value={dados.nome}
            onChange={(e) => handleInputChange('nome', e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Idade</label>
          <input
            type="number"
            className="form-input"
            placeholder="Sua idade em anos"
            value={dados.idade}
            onChange={(e) => handleInputChange('idade', e.target.value)}
            min="1"
            max="120"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Peso (kg)</label>
          <input
            type="number"
            className="form-input"
            placeholder="Seu peso atual"
            value={dados.peso}
            onChange={(e) => handleInputChange('peso', e.target.value)}
            min="1"
            step="0.1"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Altura (cm)</label>
          <input
            type="number"
            className="form-input"
            placeholder="Sua altura em centímetros"
            value={dados.altura}
            onChange={(e) => handleInputChange('altura', e.target.value)}
            min="1"
            step="1"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Sexo biológico</label>
          <select
            className="form-input"
            value={dados.sexo}
            onChange={(e) => handleInputChange('sexo', e.target.value)}
          >
            <option value="">Selecione...</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">Objetivo principal</label>
          <select
            className="form-input"
            value={dados.objetivo}
            onChange={(e) => handleInputChange('objetivo', e.target.value)}
          >
            <option value="">Qual seu foco?</option>
            <option value="perder-peso">Perder peso</option>
            <option value="ganhar-peso">Ganhar peso</option>
            <option value="manter-peso">Manter peso</option>
            <option value="ganhar-massa">Ganhar massa muscular</option>
            <option value="saude-geral">Melhorar saúde geral</option>
            <option value="bem-estar">Aumentar bem-estar</option>
          </select>
        </div>
      </div>
      
      {/* Resultado do IMC */}
      {imc && (
        <div className="result-card">
          <h3 style={{ color: 'var(--cor-destaque)', marginBottom: '1rem' }}>
            📊 Seu Índice de Massa Corporal (IMC)
          </h3>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '2rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ 
              fontSize: '3rem', 
              fontWeight: '900',
              color: interpretacao.cor 
            }}>
              {imc}
            </div>
            <div>
              <div style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600',
                color: interpretacao.cor,
                marginBottom: '0.5rem'
              }}>
                {interpretacao.categoria}
              </div>
              <div style={{ 
                color: 'var(--cor-texto-secundario)',
                fontSize: '0.9rem'
              }}>
                Referência: Peso (kg) ÷ Altura² (m)
              </div>
            </div>
          </div>
          
          <div className="interpretation-box">
            <div className="interpretation-title">Interpretação</div>
            <p style={{ color: 'var(--cor-texto-secundario)', marginBottom: '1rem' }}>
              {interpretacao.descricao}
            </p>
            <p style={{ color: 'var(--cor-texto-principal)', fontWeight: '500' }}>
              💡 <strong>Recomendação:</strong> {interpretacao.recomendacao}
            </p>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '1rem',
            borderRadius: '8px',
            fontSize: '0.85rem',
            color: 'var(--cor-texto-terciario)'
          }}>
            <strong>Importante:</strong> O IMC é apenas um indicador inicial. Para uma avaliação 
            completa da composição corporal, considere outros fatores como massa muscular, 
            distribuição de gordura e histórico de saúde.
          </div>
        </div>
      )}
      
      <div className="button-group">
        <button 
          className="button button-secondary"
          onClick={() => navigate(3)}
        >
          ← Voltar
        </button>
        <button 
          className={`button ${podeAvancar ? 'button-primary' : 'button-secondary'}`}
          onClick={() => navigate(5)}
          disabled={!podeAvancar}
        >
          {podeAvancar ? 'Avaliar Dimensões →' : 'Preencha os dados →'}
        </button>
      </div>
    </div>
  );
}

export default DadosAntropometricos;