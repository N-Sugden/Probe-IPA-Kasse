import React, { useState } from 'react'

interface LoginPageProps {
  onLogin: () => void
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState<string>('')
  const [busy, setBusy] = useState(false)

  const handleLogin = async () => {
    if (!email.trim()) {
      alert('Bitte geben Sie Ihre E-Mail ein')
      return
    }
    setBusy(true)
    try {
      // Simulate login - in production this would authenticate via Microsoft
      localStorage.setItem('userEmail', email)
      onLogin()
    } catch (e) {
      alert('Login fehlgeschlagen')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #6ec4e8 0%, #009de0 100%)',
      fontFamily: 'Arial, Helvetica, sans-serif'
    }}>
      <div style={{
        background: '#fff',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{textAlign: 'center', marginBottom: '30px', fontSize: '28px'}}>IPA Kasse</h1>
        
        <div style={{marginBottom: '20px'}}>
          <label style={{display: 'block', marginBottom: '8px', fontWeight: 600}}>
            E-Mail Adresse
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="beispiel@example.com"
            onKeyPress={e => e.key === 'Enter' && handleLogin()}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '14px'
            }}
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={busy}
          style={{
            width: '100%',
            padding: '12px',
            background: '#6ec4e8',
            border: 'none',
            borderRadius: '10px',
            cursor: busy ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 600,
            transition: 'background 0.15s',
            opacity: busy ? 0.7 : 1
          }}
          onMouseEnter={e => !busy && (e.currentTarget.style.background = '#009de0')}
          onMouseLeave={e => (e.currentTarget.style.background = '#6ec4e8')}
        >
          {busy ? 'Wird angemeldet...' : 'Anmelden'}
        </button>

        <div style={{
          marginTop: '20px',
          padding: '12px',
          background: '#f0f8ff',
          borderRadius: '4px',
          fontSize: '12px',
          color: '#666'
        }}>
          <strong>Demo-Modus:</strong> Geben Sie eine beliebige E-Mail ein zum Anmelden.
        </div>
      </div>
    </div>
  )
}

export default LoginPage
