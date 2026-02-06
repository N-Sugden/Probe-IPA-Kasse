import React, { useState } from 'react'
import * as api from '../services/api'

interface DepositFormProps {
  onDone?: () => void
}

export const DepositForm: React.FC<DepositFormProps> = ({ onDone }) => {
  const [amount, setAmount] = useState<string>('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string>('')

  const handleDeposit = async () => {
    setError('')
    const numAmount = parseFloat(amount)

    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      setError('Gültige Betrag erforderlich (>0)')
      return
    }

    setBusy(true)
    try {
      console.log('[DepositForm] Sending deposit request:', { amount: numAmount })
      await api.deposit(numAmount)
      console.log('[DepositForm] Deposit successful')
      setAmount('')
      onDone && await onDone()
    } catch (e: any) {
      console.error('[DepositForm] Deposit failed:', e)
      setError('Fehler: ' + e.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Betrag eingeben (z.B. 10.50)"
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
          disabled={busy}
        />
        <button className="btn" onClick={handleDeposit} disabled={busy || !amount}>
          {busy ? 'Wird geladen...' : 'Aufladen'}
        </button>
      </div>
      {error && (
        <div style={{ color: '#d32f2f', fontSize: 14 }}>
          {error}
        </div>
      )}
    </div>
  )
}
