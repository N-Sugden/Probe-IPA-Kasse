import React, { useState } from 'react'
import { Transaction, User } from '../types'

interface HistoryViewProps {
  history: Transaction[]
  users: User[]
}

export const HistoryView: React.FC<HistoryViewProps> = ({ history, users }) => {
  const [sortKey, setSortKey] = useState<'type' | 'date' | 'amount'>('date')
  const [sortAsc, setSortAsc] = useState(false)
  const [personFilter, setPersonFilter] = useState<string>('')

  const uniqueNames = Array.from(
    new Set(
      users
        .filter((u) =>
          u.first_name
            .toLowerCase()
            .includes(personFilter.toLowerCase())
        )
        .map((u) => `${u.first_name} ${u.last_name}`)
    )
  ).sort()

  const filtered = history.filter((t) => {
    const user = users.find((u) => u.id === t.user_id)
    if (!user) return false
    const fullName = `${user.first_name} ${user.last_name}`
    return personFilter === '' || fullName.includes(personFilter)
  })

  const sorted = [...filtered].sort((a, b) => {
    let cmp = 0
    if (sortKey === 'type') {
      cmp = a.type.localeCompare(b.type)
    } else if (sortKey === 'amount') {
      cmp = Number(a.amount) - Number(b.amount)
    } else {
      cmp = new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    }
    return sortAsc ? cmp : -cmp
  })

  return (
    <div className="panel">
      <h3>Guthabenverläufe</h3>

      <div style={{ marginTop: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
        <label style={{ whiteSpace: 'nowrap' }}>Person:</label>
        <input
          type="text"
          value={personFilter}
          onChange={(e) => setPersonFilter(e.target.value)}
          placeholder="Nach Name filtern..."
          style={{
            flex: 1,
            padding: '6px 10px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
      </div>

      {uniqueNames.length > 0 && (
        <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {uniqueNames.map((name) => (
            <button
              key={name}
              onClick={() => setPersonFilter(name)}
              style={{
                padding: '4px 12px',
                backgroundColor: personFilter === name ? '#009de0' : '#f0f0f0',
                color: personFilter === name ? '#fff' : '#333',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              {name}
            </button>
          ))}
          {personFilter && (
            <button
              onClick={() => setPersonFilter('')}
              style={{
                padding: '4px 12px',
                backgroundColor: '#f0f0f0',
                color: '#333',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              Alle
            </button>
          )}
        </div>
      )}

      {sorted.length > 0 && (
        <div style={{ marginTop: 20, overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th
                  onClick={() => {
                    if (sortKey === 'type') setSortAsc(!sortAsc)
                    else {
                      setSortKey('type')
                      setSortAsc(true)
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  Typ {sortKey === 'type' && (sortAsc ? '↑' : '↓')}
                </th>
                <th
                  onClick={() => {
                    if (sortKey === 'amount') setSortAsc(!sortAsc)
                    else {
                      setSortKey('amount')
                      setSortAsc(true)
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  Betrag {sortKey === 'amount' && (sortAsc ? '↑' : '↓')}
                </th>
                <th
                  onClick={() => {
                    if (sortKey === 'date') setSortAsc(!sortAsc)
                    else {
                      setSortKey('date')
                      setSortAsc(true)
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  Datum {sortKey === 'date' && (sortAsc ? '↑' : '↓')}
                </th>
                <th>Person</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((t) => {
                const user = users.find((u) => u.id === t.user_id)
                return (
                  <tr key={t.id}>
                    <td>{t.type === 'AUFLADUNG' ? 'Gutschrift' : 'Abbuchung'}</td>
                    <td>{Number(t.amount).toFixed(2)} CHF</td>
                    <td>{new Date(t.created_at).toLocaleString()}</td>
                    <td>
                      {user
                        ? `${user.first_name} ${user.last_name}`
                        : 'Unbekannt'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {sorted.length === 0 && (
        <div style={{ marginTop: 20, color: '#999', fontStyle: 'italic' }}>
          Keine Verläufe gefunden
        </div>
      )}
    </div>
  )
}
