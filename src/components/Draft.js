import React, { useState, useEffect } from 'react';
import DraftCSS from './Draft.module.css';
import { useNavigate } from 'react-router-dom';

const Draft = () => {
  const navigatee = useNavigate();
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    const storedDrafts = JSON.parse(localStorage.getItem('drafts')) || [];
    setDrafts(storedDrafts);
  }, []);

  const handleSend = (index, draftData) => {
    const updatedDrafts = drafts.filter((draft, i) => i !== index);
    localStorage.setItem('drafts', JSON.stringify(updatedDrafts));


    const sentMessages = JSON.parse(localStorage.getItem('sentMessages')) || [];
    sentMessages.push(draftData);
    localStorage.setItem('sentMessages', JSON.stringify(sentMessages));

    navigatee('/');
  };

  return (
    <div className={DraftCSS.container} >
      {drafts.map((draft, index) => (
        <div key={index} className={DraftCSS.box}>
          <div>
          <p>{draft.message}</p>
            <p>From: {draft.from}</p>
            <p>To: {draft.to}</p>
          </div>

            <button onClick={() => navigatee(`/compose?draftIndex=${index}`)} className={DraftCSS.edit} type="button">Edit</button>
            <button onClick={() => handleSend(index, draft)} className={DraftCSS.send} type="button">Send</button>

        </div>
      ))}
    </div>
  )
}

export default Draft
