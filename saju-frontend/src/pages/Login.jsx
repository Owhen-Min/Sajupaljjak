import React from 'react';
import logo from '../assets/logo.webp';
import KakaoLoginREST from '../components/KakaoLoginREST';

function LogInPage() {
  return (
    <div className="login">
      <img src={logo} alt="logo" />
      <KakaoLoginREST />
    </div>
  );
}

export default LogInPage;