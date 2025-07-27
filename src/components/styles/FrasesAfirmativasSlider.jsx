// src/components/FrasesAfirmativasSlider.jsx
import React, { useState, useEffect } from 'react';

const dimensoes = {
  "nutrição_fisico_quimica": {
    frases: [
      "Comer alimentos naturais renova a energia do organismo.",
      "Praticar jejum intermitente melhora a clareza mental.",
      // ... outras frases
    ],
    peso: 8,
    categoria: "Primária",
    impacto: "Alto na prevenção de doenças"
  },
  "corpo_fisico": {
    frases: [
      "Praticar atividade física mantém o corpo saudável.",
      "Dormir o suficiente equilibra o metabolismo.",
      // ... outras frases
    ],
    peso: 9,
    categoria: "Primária",
    impacto: "Impacto direto na saúde"
  },
  "inteligencia_emocional": {
    frases: [
      "Praticar gratidão promove bem-estar.",
      "Escutar com atenção fortalece os laços.",
      // ... outras frases
    ],
    peso: 8,
    categoria: "Primária", 
    impacto: "Influência imediata na qualidade de vida"
  },
  "desenvolvimento_cognitivo_intelectual": {
    frases: [
      "Ler regularmente expande horizontes.",
      "Resolver desafios aguça o raciocínio.",
      // ... outras frases
    ],
    peso: 6,
    categoria: "Secundária",
    impacto: "Essencial para manutenção do estímulo cognitivo"
  },
  "inteligencia_social": {
    frases: [
      "Cultivar amizades verdadeiras enriquece a vida.",
      "Participar de comunidades cria pertencimento.",
      // ... outras frases
    ],
    peso: 6,
    categoria: "Secundária",
    impacto: "Fundamental para evitar isolamento"
  },
  "realizacao_profissional": {
    frases: [
      "Desenvolver habilidades constantemente amplia oportunidades.",
      "Estabelecer metas claras direciona esforços.",
      // ... outras frases
    ],
    peso: 6,
    categoria: "Secundária",
    impacto: "Suporte para desenvolvimento pessoal"
  },
  "estabilidade_financeira": {
    frases: [
      "Planejar gastos mensais traz controle financeiro.",
      "Poupar regularmente constrói segurança futura.",
      // ... outras frases
    ],
    peso: 4,
    categoria: "Terciária",
    impacto: "Suporte indireto para condições de vida"
  },
  "eco_nomia_ecologia": {
    frases: [
      "Reduzir consumo preserva recursos naturais.",
      "Reciclar materiais diminui impacto ambiental.",
      // ... outras frases
    ],
    peso: 3,
    categoria: "Terciária",
    impacto: "Impacto indireto na saúde e bem-estar"
  }
};

const PesosPonderadosModal = ({ onAjustarPeso }) => {
  const [pesosSelecionados, setPesosSelecionados] = useState(dimensoes);

  const handlePesoChange = (dimensao, novoPeso) => {
    setPesosSelecionados(prev => ({
      ...prev,
      [dimensao]: {
        ...prev[dimensao],
        peso: novoPeso
      }
    }));
  };

  const salvarPesos = () => {
    onAjustarPeso(pesosSelecionados);
  };

  return (
    <div className="modal-pesos-ponderados">
      <h2>Ajuste de Pesos Científicos por Dimensão</h2>
      {Object.entries(pesosSelecionados).map(([dimensao, dados]) => (
        <div key={dimensao} className="peso-item">
          <div className="dimensao-info">
            <strong>{dimensao.replace(/_/g, ' ')}</strong>
            <span>Categoria: {dados.categoria}</span>
            <p>Impacto: {dados.impacto}</p>
          </div>
          <div className="slider-container">
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={dados.peso}
              onChange={(e) => handlePesoChange(dimensao, Number(e.target.value))}
            />
            <span>{dados.peso}/10</span>
          </div>
        </div>
      ))}
      <button onClick={salvarPesos}>Salvar Ajustes Científicos</button>
    </div>
  );
};

const FrasesAfirmativasSlider = () => {
  const [dimensaoAtual, setDimensaoAtual] = useState("nutrição_fisico_quimica");
  const [fraseAtual, setFraseAtual] = useState(0);
  const [mostrarPesos, setMostrarPesos] = useState(false);
  const [pesosDimensoes, setPesosDimensoes] = useState(dimensoes);

  const proximaFrase = () => {
    const proximoIndice = (fraseAtual + 1) % pesosDimensoes[dimensaoAtual].frases.length;
    setFraseAtual(proximoIndice);
  };

  const proximaDimensao = () => {
    const dimensoesKeys = Object.keys(pesosDimensoes);
    const indiceAtual = dimensoesKeys.indexOf(dimensaoAtual);
    const proximoIndice = (indiceAtual + 1) % dimensoesKeys.length;
    setDimensaoAtual(dimensoesKeys[proximoIndice]);
    setFraseAtual(0);
  };

  const handleAjustarPesos = (novosPesos) => {
    setPesosDimensoes(novosPesos);
    setMostrarPesos(false);
  };

  return (
    <div className="frases-afirmativas-container">
      <div className="slider-frases">
        <h2>{dimensaoAtual.replace(/_/g, ' ')}</h2>
        <p>{pesosDimensoes[dimensaoAtual].frases[fraseAtual]}</p>
        
        <div className="controles">
          <button onClick={proximaFrase}>Próxima Frase</button>
          <button onClick={proximaDimensao}>Próxima Dimensão</button>
          <button onClick={() => setMostrarPesos(true)}>
            Ajustar Pesos Científicos
          </button>
        </div>
      </div>

      {mostrarPesos && (
        <PesosPonderadosModal 
          onAjustarPeso={handleAjustarPesos} 
        />
      )}

      <div className="resumo-pesos">
        <h3>Cômputo Geral dos Pesos Científicos</h3>
        {Object.entries(pesosDimensoes).map(([dimensao, dados]) => (
          <div key={dimensao} className="peso-dimensao">
            <strong>{dimensao.replace(/_/g, ' ')}</strong>: 
            {dados.peso}/10 ({dados.categoria})
          </div>
        ))}
        <p>
          Baseado em evidências científicas de neurociências, 
          estes pesos refletem o impacto de cada dimensão na saúde e longevidade.
        </p>
      </div>
    </div>
  );
};

export default FrasesAfirmativasSlider;