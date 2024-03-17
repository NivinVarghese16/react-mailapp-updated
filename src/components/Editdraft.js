import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ComposeCSS from './Compose.module.css';

const Editdraft = () => {
  const { index } = useParams();
  const [draftData, setDraftData] = useState({
    from: '',
    to: '',
    message: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedDrafts = JSON.parse(localStorage.getItem('drafts')) || [];
    if (index >= 0 && index < storedDrafts.length) {
      setDraftData(storedDrafts[index]);
    } else {
      navigate('/draft');
    }
  }, [index, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDraftData({ ...draftData, [name]: value });
  };

  const handleSaveEdit = () => {
    const storedDrafts = JSON.parse(localStorage.getItem('drafts')) || [];
    const updatedDrafts = [...storedDrafts];
    updatedDrafts[index] = draftData;
    localStorage.setItem('drafts', JSON.stringify(updatedDrafts));
    navigate('/draft');
  };

  return (
    <div>
      <input
        className={ComposeCSS.from}
        name='from'
        type='text'
        placeholder='From address'
        value={draftData.from}
        onChange={handleInputChange}
      /><br />
      <input
        className={ComposeCSS.to}
        name='to'
        type='text'
        placeholder='To address'
        value={draftData.to}
        onChange={handleInputChange}
      /><br />
      <textarea
        name='message'
        placeholder='Message'
        value={draftData.message}
        onChange={handleInputChange}
      /><br />
      <button className={`${ComposeCSS.save} ${ComposeCSS.sendcompose}`} type='button' onClick={handleSaveEdit}>Save</button>
    </div>
  );
}

export default Editdraft;
