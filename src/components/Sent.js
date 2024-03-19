import React, { useEffect, useState } from 'react';
import SentCSS from './Sent.module.css';
import { useNavigate } from 'react-router-dom';

const Sent = () => {
  const [sentMessages, setSentMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedSentMessages = JSON.parse(localStorage.getItem('sentMessages')) || [];
    setSentMessages(storedSentMessages);
  }, []);

  const handleClearLocalStorage = () => {
    localStorage.removeItem('sentMessages');
    localStorage.removeItem('drafts'); 
    localStorage.removeItem('emails');
    setSentMessages([]);
  };

  return (
    <div className={SentCSS.container}>
      <button onClick={() => navigate('/compose')} className={SentCSS.button} type="button">Compose</button>
      <div className={SentCSS.box}>
        {sentMessages.length === 0 ? (
          <p className={SentCSS.empty}>No sent mails yet</p>
        ) : (
          sentMessages.map((message, index) => (
            <div key={index} className={SentCSS.email}>
              <p>{index + 1}. Message: {message.message}</p>
              <p>From: {message.from}</p>
              <p>To: {message.to}</p>
            </div>
          ))
        )}
      </div>
      <button className={SentCSS.clearButton} onClick={handleClearLocalStorage}>Reset</button>
    </div>
  );
};

export default Sent;


