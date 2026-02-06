import React from 'react'
import { Transaction } from '../types'

interface BalanceViewProps {
  balanceValue: number | null
  history: Transaction[]
}

export const BalanceView: React.FC<BalanceViewProps> = ({ balanceValue, history }) => {
  return (
    <div className="panel">
      <h3>Guthaben</h3>
      <div style={{ marginTop: 12, fontSize: 18, fontWeight: 600 }}>
        Aktuelles Guthaben:{' '}
        <span style={{ color: '#009de0' }}>
          {balanceValue !== null && typeof balanceValue === 'number'
            ? balanceValue.toFixed(2) + ' CHF'
            : 'Lädt...'}
        </span>
      </div>
      {history.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h4>Meine Historia</h4>
          <table>
            <thead>
              <tr>
                <th>Typ</th>
                <th>Betrag</th>
                <th>Datum</th>
              </tr>
            </thead>
            <tbody>
              {history.map((it) => (
                <tr key={it.id}>
                  <td>{it.type === 'AUFLADUNG' ? 'Gutschrift' : 'Abbuchung'}</td>
                  <td>{Number(it.amount).toFixed(2)} CHF</td>
                  <td>{new Date(it.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {history.length === 0 && (
        <div style={{ marginTop: 20, color: '#999', fontStyle: 'italic' }}>
          Noch keine Transaktionen
        </div>
      )}
    </div>
  )
}
