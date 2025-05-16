import React from 'react';

const EmailVerification = ({ verificationLink, userName }) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', textAlign: 'center' }}>
      <div style={{ backgroundColor: '#1E90FF', color: 'white', padding: '20px' }}>
        <h1>Welcome to Tweet Analytica, {userName}!</h1>
      </div>

      <p style={{ fontSize: '18px', color: '#555' }}>Please verify your email by clicking the button below:</p>
      
      <a href={verificationLink} style={{
        display: 'inline-block', 
        backgroundColor: '#1E90FF', 
        color: 'white', 
        padding: '15px 30px', 
        textDecoration: 'none', 
        borderRadius: '5px', 
        fontSize: '18px'
      }}>
        Verify Your Email
      </a>

      <footer style={{ marginTop: '30px', fontSize: '12px', color: '#777' }}>
        <p>If you did not sign up, please ignore this email.</p>
      </footer>
    </div>
  );
};

export default EmailVerification;
