import React from 'react'
import { User } from '../types'

interface OverviewViewProps {
  allBalances: User[]
}

export const OverviewView: React.FC<OverviewViewProps> = ({ allBalances }) => {
  const mitarbeiter = allBalances.filter((u) => u.role === 'MITARBEITER')
  const lernende = allBalances.filter((u) => u.role === 'LERNENDER')

  return (
    <div className="panel">
      <h3>Gesamtübersicht</h3>

      <div style={{ marginTop: 20 }}>
        <h4 style={{ marginBottom: 12 }}>Mitarbeiter</h4>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 12
          }}
        >
          {mitarbeiter.map((u) => (
            <div
              key={u.id}
              style={{
                backgroundColor: '#f5f5f5',
                padding: 12,
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            >
              <div style={{ fontWeight: 600 }}>
                {u.first_name} {u.last_name}
              </div>
              <div style={{ fontSize: 14, color: '#666', marginTop: 4 }}>
                #{u.id}
              </div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#009de0',
                  marginTop: 8
                }}
              >
                {Number(u.balance).toFixed(2)} CHF
              </div>
            </div>
          ))}
        </div>
        {mitarbeiter.length === 0 && (
          <div style={{ color: '#999', fontStyle: 'italic' }}>
            Keine Mitarbeiter
          </div>
        )}
      </div>

      <div style={{ marginTop: 30 }}>
        <h4 style={{ marginBottom: 12 }}>Lernende</h4>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 12
          }}
        >
          {lernende.map((u) => (
            <div
              key={u.id}
              style={{
                backgroundColor: '#f0f8ff',
                padding: 12,
                borderRadius: '8px',
                border: '1px solid #b3d9f2'
              }}
            >
              <div style={{ fontWeight: 600 }}>
                {u.first_name} {u.last_name}
              </div>
              <div style={{ fontSize: 14, color: '#666', marginTop: 4 }}>
                #{u.id}
              </div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#009de0',
                  marginTop: 8
                }}
              >
                {Number(u.balance).toFixed(2)} CHF
              </div>
            </div>
          ))}
        </div>
        {lernende.length === 0 && (
          <div style={{ color: '#999', fontStyle: 'italic' }}>
            Keine Lernenden
          </div>
        )}
      </div>
    </div>
  )
}
