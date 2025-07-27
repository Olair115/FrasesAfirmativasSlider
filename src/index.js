import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
function App() {
  const [telaAtual, setTelaAtual] = useState('menu');

  const TelaMenu = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-800 p-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🍎 Nutrição</h1>
<p className="text-purple-200">
  Jornada iniciada com{' '}
  <a 
    href="https://www.youtube.com/@drolairrafael" 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-yellow-300 hover:text-yellow-200 underline hover:no-underline transition-all duration-300 font-semibold"
  >
    @drolairrafael
  </a>
</p>        </div>
        
        <div className="space-y-4">
          <button 
            onClick={() => setTelaAtual('alimentos')}
            className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-6 text-white hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
          >
            <div className="text-3xl mb-2">🥗</div>
            <h3 className="text-xl font-semibold">Alimentos Saudáveis</h3>
            <p className="text-purple-200 text-sm">Descubra opções nutritivas</p>
          </button>

          <button 
            onClick={() => setTelaAtual('receitas')}
            className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-6 text-white hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
          >
            <div className="text-3xl mb-2">👨‍🍳</div>
            <h3 className="text-xl font-semibold">Receitas Práticas</h3>
            <p className="text-purple-200 text-sm">Prepare refeições deliciosas</p>
          </button>

          <button 
            onClick={() => setTelaAtual('dicas')}
            className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-6 text-white hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
          >
            <div className="text-3xl mb-2">💡</div>
            <h3 className="text-xl font-semibold">Dicas de Nutrição</h3>
            <p className="text-purple-200 text-sm">Conselhos de especialista</p>
          </button>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-purple-300 text-sm">✨ Transforme sua alimentação ✨</p>
        </div>
      </div>
    </div>
  );

  const TelaAlimentos = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-700 to-emerald-800 p-6">
      <div className="max-w-md mx-auto">
        <button 
          onClick={() => setTelaAtual('menu')}
          className="mb-6 text-white hover:text-green-200 flex items-center"
        >
          ← Voltar ao Menu
        </button>
        
        <h2 className="text-3xl font-bold text-white mb-6 text-center">🥗 Alimentos Saudáveis</h2>
        
        <div className="space-y-4">
          {[
            { emoji: "🥑", nome: "Abacate", beneficio: "Rico em gorduras boas" },
            { emoji: "🥬", nome: "Espinafre", beneficio: "Fonte de ferro e vitaminas" },
            { emoji: "🐟", nome: "Salmão", beneficio: "Ômega-3 para o cérebro" },
            { emoji: "🥜", nome: "Castanhas", beneficio: "Antioxidantes naturais" },
            { emoji: "🫐", nome: "Blueberry", beneficio: "Poderoso antioxidante" },
            { emoji: "🥦", nome: "Brócolis", beneficio: "Rico em vitamina C" }
          ].map((alimento, index) => (
            <div key={index} className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-4">
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{alimento.emoji}</div>
                <div>
                  <h3 className="text-white font-semibold">{alimento.nome}</h3>
                  <p className="text-green-200 text-sm">{alimento.beneficio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-green-300 text-sm">🌱 Alimentação é medicina 🌱</p>
        </div>
      </div>
    </div>
  );

  const TelaReceitas = () => (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-700 to-pink-800 p-6">
      <div className="max-w-md mx-auto">
        <button 
          onClick={() => setTelaAtual('menu')}
          className="mb-6 text-white hover:text-orange-200 flex items-center"
        >
          ← Voltar ao Menu
        </button>
        
        <h2 className="text-3xl font-bold text-white mb-6 text-center">👨‍🍳 Receitas Práticas</h2>
        
        <div className="space-y-6">
          {[
            {
              nome: "Smoothie Verde",
              tempo: "5 min",
              ingredientes: ["Espinafre", "Banana", "Maçã", "Água de coco"],
              emoji: "🥤"
            },
            {
              nome: "Salada Colorida",
              tempo: "10 min", 
              ingredientes: ["Folhas verdes", "Tomate cereja", "Abacate", "Azeite"],
              emoji: "🥗"
            },
            {
              nome: "Omelete Proteica",
              tempo: "8 min",
              ingredientes: ["Ovos", "Espinafre", "Queijo", "Temperos"],
              emoji: "🍳"
            }
          ].map((receita, index) => (
            <div key={index} className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{receita.emoji}</div>
                  <h3 className="text-white font-semibold">{receita.nome}</h3>
                </div>
                <span className="text-orange-200 text-sm">⏱️ {receita.tempo}</span>
              </div>
              <div>
                <p className="text-orange-200 text-sm mb-2">Ingredientes:</p>
                <div className="flex flex-wrap gap-2">
                  {receita.ingredientes.map((ingrediente, i) => (
                    <span key={i} className="bg-white/10 px-2 py-1 rounded-lg text-white text-xs">
                      {ingrediente}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-orange-300 text-sm">🔥 Cozinhe com amor 🔥</p>
        </div>
      </div>
    </div>
  );

  const TelaDicas = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-700 to-purple-800 p-6">
      <div className="max-w-md mx-auto">
        <button 
          onClick={() => setTelaAtual('menu')}
          className="mb-6 text-white hover:text-blue-200 flex items-center"
        >
          ← Voltar ao Menu
        </button>
        
        <h2 className="text-3xl font-bold text-white mb-6 text-center">💡 Dicas de Nutrição</h2>
        
        <div className="space-y-4">
          {[
            { emoji: "💧", dica: "Beba pelo menos 2L de água por dia" },
            { emoji: "🍽️", dica: "Faça 5-6 refeições pequenas ao dia" },
            { emoji: "🌈", dica: "Varie as cores dos alimentos no prato" },
            { emoji: "⏰", dica: "Mastigue devagar e saboreie" },
            { emoji: "🥗", dica: "Comece sempre pelas verduras" },
            { emoji: "😴", dica: "Evite comer 2h antes de dormir" },
            { emoji: "🏃‍♂️", dica: "Combine alimentação com exercícios" }
          ].map((item, index) => (
            <div key={index} className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-4">
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{item.emoji}</div>
                <p className="text-white">{item.dica}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-blue-300 text-sm">✨ Pequenos hábitos, grandes resultados ✨</p>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {telaAtual === 'menu' && <TelaMenu />}
      {telaAtual === 'alimentos' && <TelaAlimentos />}
      {telaAtual === 'receitas' && <TelaReceitas />}
      {telaAtual === 'dicas' && <TelaDicas />}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);