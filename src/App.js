// src/App.js

import React, { useState, useRef, useEffect } from 'react';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import { MoveLeftIcon } from 'lucide-react';
import './App.css';
import logo from './assets/logo.png';
import SuccessModal from './components/SuccessModal';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showFairplayIframe, setShowFairplayIframe] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ username, password, phoneNumber });
  };

  useEffect(() => {
    // This effect is no longer needed since we're changing the order of operations
    // Keep this commented as a reference
    // if (!showModal && showFairplayIframe) {
    //   window.location.href = 'https://www.fairplay.live/home';
    // }
  }, [showModal, showFairplayIframe]);

  const handleSignUp = () => {
    // Save to localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    localStorage.setItem('phone', phone);
    
    // First show the iframe/change the site
    setShowFairplayIframe(true);
    
    // Modal will be shown after iframe loads (see iframeLoaded useEffect)
  };
  
  // Handle iframe load event
  useEffect(() => {
    if (iframeLoaded && showFairplayIframe) {
      // Show modal once iframe is loaded
      setShowModal(true);
      
      // Auto-close the modal after 5 seconds
      const timer = setTimeout(() => {
        setShowModal(false);
        // After modal closes, redirect if needed
        window.location.href = 'https://www.fairplay.live/home';
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [iframeLoaded, showFairplayIframe]);
  
  const handleCloseModal = () => {
    setShowModal(false);
    // Redirect immediately when user manually closes modal
    window.location.href = 'https://www.fairplay.live/home';
  };

  // Render fairplay.live in an iframe with modal overlay
  if (showFairplayIframe) {
    return (
      <div className="fairplay-container">
        <iframe 
          ref={iframeRef}
          src="https://www.fairplay.live/home"
          className="fairplay-iframe"
          title="FairPlay"
          onLoad={() => setIframeLoaded(true)}
        />
        
        {/* Success Modal */}
        <SuccessModal 
          isOpen={showModal} 
          username={username} 
          onClose={handleCloseModal} 
        />
      </div>
    );
  }

  return (
    <div className='root'>
      <img src={logo} className='logo' alt='logo' />
      <div className="container">
        <div className='small-container'>
          <div className='back-part'>
            <div className='back-icon-div'>
              <MoveLeftIcon className='backicon' />
            </div>
            <div className="back">Back</div>
          </div>
          <div className='signup'>Sign Up</div>
          <div className='description'>Create your account by following these<br /> simple steps.</div>
          <div className='input-group'>
            <div className='username-input'>
              <div className='username'>username*</div>
              <input
                type='text'
                className='input-username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Enter username' />
            </div>
            <div className='password-input'>
              <div className='password'>password*</div>
              <input
                type='text'
                className='input-password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter password' />
            </div>
            <div className='phonenumber-group'>
              <div className='phonenumber-part'>
                <div className='phonenumber-input'>
                  <div className='phonenumber'>Phonenumber*</div>
                  <div className="input-phonenumber-wrapper">
                    <PhoneInput
                      country={'in'}
                      value={phone}
                      onChange={setPhone}
                      inputClass="input-phonenumber"
                      buttonClass="input-phonenumber-button"
                      containerClass="input-phonenumber-container"
                    />
                  </div>
                </div>
              </div>
              <div className='otp-btn'>Sent OTP</div>
            </div>
          </div>
          <div className='signin-description'>
            Have an account?<span className='login'>Login</span>
          </div>
          <button className="button" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>
      </div>

      <div className='footer'>
        Disclaimer: Please note that Gambling involves a financial risk and could be<br />
        addictive over time if not practised within limits. Only 18+ people should use<br />
        the services and should use it responsibly. Players should be aware of any<br />
        financial risk and govern themselves accordingly.<br />
      </div>
      <div className='privacy'>
        <span>Terms of Conditions</span>
        <span>Privacy Policy</span>
      </div>
    </div>
  );
};

export default SignUpForm;
