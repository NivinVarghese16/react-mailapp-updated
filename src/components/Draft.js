import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Draft.module.css';

const Draft = () => {
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    const storedDrafts = JSON.parse(localStorage.getItem('drafts')) || [];
    setDrafts(storedDrafts);
  }, []);

  const handleSend = (index) => {
  };

  return (
    <div className={styles.container}>
      {drafts.map((draft, index) => (
        <div key={index} className={styles.listItem}>
          <div>
            <p>From: {draft.from}</p>
            <p>To: {draft.to}</p>
            <p>Message: {draft.message}</p>
          </div>
          <div className={styles.buttonContainer}>
            <Link to={`/compose?draftIndex=${index}`} className={styles.link}>Edit</Link>
            <button className={styles.sendButton} onClick={() => handleSend(index)}>Send</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Draft;
