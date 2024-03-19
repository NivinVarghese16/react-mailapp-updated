import React, { useState, useEffect } from 'react';
import ComposeCSS from './Compose.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Compose = () => {
  const [emailData, setEmailData] = useState({
    from: '',
    to: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    from: '',
    to: ''
  });

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const draftIndex = searchParams.get('draftIndex');

  useEffect(() => {
    const storedDrafts = JSON.parse(localStorage.getItem('drafts')) || [];
    if (draftIndex !== null && storedDrafts[draftIndex]) {
      const draftData = storedDrafts[draftIndex];
      setEmailData(draftData);
    }
  }, [draftIndex]);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmailData({ ...emailData, [name]: value });

    if (name === 'from' || name === 'to') {
      setErrors({ ...errors, [name]: validateEmail(value) ? '' : 'Invalid email address' });
    }
  };

  const handleSaveAsDraft = () => {
    if (emailData.from.trim() === '' || emailData.to.trim() === '') {
      alert('Please enter both From and To addresses.');
      return;
    }

    if (errors.from === '' && errors.to === '') {
      const existingDrafts = JSON.parse(localStorage.getItem('drafts')) || [];
      const updatedDrafts = [...existingDrafts];
      if (draftIndex !== null) {
        updatedDrafts[draftIndex] = emailData;
      } else {
        updatedDrafts.push(emailData);
      }
      localStorage.setItem('drafts', JSON.stringify(updatedDrafts));
      navigate('/draft');
    } else {
      alert('Please correct the email address errors before saving.');
    }
  };

  const handleSend = () => {
    if (emailData.from.trim() === '' || emailData.to.trim() === '') {
      alert('Please enter both From and To addresses.');
      return;
    }

    if (errors.from === '' && errors.to === '') {
      const existingEmails = JSON.parse(localStorage.getItem('emails')) || [];
      const updatedEmails = [...existingEmails, emailData];
      localStorage.setItem('emails', JSON.stringify(updatedEmails));

      if (draftIndex !== null) {
        const storedDrafts = JSON.parse(localStorage.getItem('drafts')) || [];
        const updatedDrafts = storedDrafts.filter((draft, index) => index !== Number(draftIndex));
        localStorage.setItem('drafts', JSON.stringify(updatedDrafts));
      }

      const sentMessages = JSON.parse(localStorage.getItem('sentMessages')) || [];
      sentMessages.push(emailData);
      localStorage.setItem('sentMessages', JSON.stringify(sentMessages));

      setEmailData({ from: '', to: '', message: '' });
      navigate('/');
    } else {
      alert('Please correct the email address errors before sending.');
    }
  };

  return (
    <div>
      <input
        className={`${ComposeCSS.from} ${errors.from ? ComposeCSS.error : ''}`}
        name='from'
        type='text'
        placeholder='From address'
        value={emailData.from}
        onChange={handleInputChange}
      />
      {errors.from && <span className={ComposeCSS.errorMessage}>{errors.from}</span>}
      <br />
      <input
        className={`${ComposeCSS.to} ${errors.to ? ComposeCSS.error : ''}`}
        name='to'
        type='text'
        placeholder='To address'
        value={emailData.to}
        onChange={handleInputChange}
      />
      {errors.to && <span className={ComposeCSS.errorMessage}>{errors.to}</span>}
      <br />
      <textarea
        name='message'
        placeholder='Message'
        value={emailData.message}
        onChange={handleInputChange}
      /><br />
      <button className={ComposeCSS.save} type='button' onClick={handleSaveAsDraft}>Save</button>
      <button className={ComposeCSS.sendcompose} type='button' onClick={handleSend}>Send</button>
    </div>
  );
}

export default Compose;


