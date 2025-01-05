import React, { useState, useEffect } from 'react';
import './CookieConsent.css'; // Archivo CSS para estilos opcionales

const CookieConsent = () => {
  const [consent, setConsent] = useState(localStorage.getItem('cookieConsent'));

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setConsent('accepted');
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setConsent('rejected');
  };

  useEffect(() => {
    if (consent === 'rejected') {
      document.body.style.overflow = 'hidden'; // Bloquear scroll y acceso a la página
    } else {
      document.body.style.overflow = 'auto'; // Permitir el scroll si se acepta
    }
  }, [consent]);

  if (consent === 'accepted') return null;
  if (consent === 'rejected') {
    return (
      <div className="blocked-content">
        <p>No puedes navegar en este sitio sin aceptar las cookies.</p>
      </div>
    );
  }
  

  return (
    <div className="cookie-banner">
      <p>
        Al navegar por este sitio aceptás el uso de cookies para agilizar tu experiencia de navegación.
      </p>
      <div className="cookie-buttons">
        <button onClick={handleAccept}>Entendido</button>
        <button onClick={handleReject} className="reject-button">Rechazar</button>
      </div>
    </div>
    
  );
};

export default CookieConsent;
