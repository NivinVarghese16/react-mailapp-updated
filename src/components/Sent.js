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
        {sentMessages.map((message, index) => (
          <div key={index} className={SentCSS.email}>
            <p>Mail: {index + 1}</p>
            <p>From: {message.from}</p>
            <p>To: {message.to}</p>
            <p>Message: {message.message}</p>
          </div>
        ))}
      </div>
      <button className={SentCSS.clearButton} onClick={handleClearLocalStorage}>Clear</button>
    </div>
  );
};

export default Sent;

