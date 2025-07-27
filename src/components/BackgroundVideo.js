// src/components/BackgroundVideo.js
import React, { useState, useRef, useEffect } from 'react';
import './BackgroundVideo.css';

const BackgroundVideo = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [volume, setVolume] = useState(0.15); // 15% volume inicial

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Configurações iniciais
      video.volume = volume;
      video.muted = isMuted;
      
      // Auto-play quando carregar
      const handleCanPlay = () => {
        setIsLoaded(true);
        video.play().catch(e => {
          console.log('Autoplay bloqueado - usuário precisa interagir primeiro');
        });
      };

      video.addEventListener('canplaythrough', handleCanPlay);
      
      return () => {
        video.removeEventListener('canplaythrough', handleCanPlay);
      };
    }
  }, [volume, isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const startVideo = () => {
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play();
    }
  };

  return (
    <div className="background-video-container">
      {/* Vídeo de Background */}
      <video
        ref={videoRef}
        className="background-video"
        loop
        muted={isMuted}
        playsInline
        preload="metadata"
        onLoadStart={() => console.log('🎵 Carregando música ambiente...')}
        onError={(e) => console.log('Erro no vídeo:', e)}
      >
        <source 
          src="./assets/videos/🔥 Chill Background Guitar (Royalty Free Music) - AMBIENT by strange day 🇩🇪.mp4" 
          type="video/mp4" 
        />
        Seu navegador não suporta vídeo HTML5.
      </video>

      {/* Controles Discretos */}
      <div className="video-controls">
        {/* Botão Mute/Unmute */}
        <button 
          className={`control-btn mute-btn ${isMuted ? 'muted' : ''}`}
          onClick={toggleMute}
          title={isMuted ? 'Ativar som ambiente' : 'Silenciar som ambiente'}
        >
          {isMuted ? '🔇' : '🎵'}
        </button>

        {/* Controle de Volume */}
        <div className="volume-control">
          <input
            type="range"
            min="0"
            max="0.5"
            step="0.05"
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="volume-slider"
            title="Ajustar volume ambiente"
          />
          <span className="volume-label">{Math.round(volume * 200)}%</span>
        </div>

        {/* Botão Play (caso autoplay falhe) */}
        {!isLoaded && (
          <button 
            className="control-btn play-btn"
            onClick={startVideo}
            title="Iniciar música ambiente"
          >
            ▶️
          </button>
        )}
      </div>

      {/* Overlay sutil para não interferir no conteúdo */}
      <div className="video-overlay"></div>
    </div>
  );
};

export default BackgroundVideo;