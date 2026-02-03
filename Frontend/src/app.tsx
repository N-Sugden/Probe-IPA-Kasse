import React, { useState, useEffect } from 'react'
import * as api from './services/api'
import { log, LogLevel } from './utils/logger'

type Role = 'MITARBEITER' | 'LERNENDER'
type View = 'AUFLADUNG' | 'ABBUCHUNG' | 'GUTHABEN' | 'GESAMTUEBERSICHT' | 'VERLAUFE'

const App: React.FC = () => {
  const [role, setRole] = useState<Role>('MITARBEITER')
  const [view, setView] = useState<View>('AUFLADUNG')
  const [userId, setUserId] = useState<number>(3)
  const [balanceValue, setBalanceValue] = useState<number | null>(null)
  const [message, setMessage] = useState<{type:'info'|'error', text:string} | null>(null)
  const [allBalances, setAllBalances] = useState<any[]>([])
  const [history, setHistory] = useState<any[]>([])

  // simple user lists matching mockData
  const mitarbeiter = [ { id: 3, name: 'Anna Admin' }, { id: 6, name: 'Karl Weber' }, { id: 8, name: 'Thomas Lang' } ]
  const lernende = [ { id:1, name:'Max Muster' }, { id:2, name:'Lisa Schmidt' }, { id:4, name:'Peter Meier' }, { id:5, name:'Julia Bauer' }, { id:7, name:'Sophie Huber' }, { id:9, name:'Maria Keller' }, { id:10, name:'Daniel Frei' } ]

  useEffect(() => {
    // when user changes, request a dev token and store it
    const getToken = async () => {
      try {
        const res = await fetch('http://localhost:3000/dev/token', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId }) })
        const data = await res.json()
        if (data.token) {
          localStorage.setItem('dev_token', data.token)
          setMessage('Token gesetzt für Benutzer ' + userId)
        }
      } catch (e) {
        setMessage('Fehler beim Abrufen des Tokens')
      }
    }
    getToken()
  }, [userId])

  const buttonsForRole: View[] = role === 'MITARBEITER'
    ? ['AUFLADUNG','ABBUCHUNG','GUTHABEN','GESAMTUEBERSICHT','VERLAUFE']
    : ['AUFLADUNG','ABBUCHUNG','GUTHABEN']

  return (
    <div className="app">
      <header className="topbar">
        <div className="logo">IPA Kasse</div>
        <div className="topcontrols">
          <select value={role} onChange={e => setRole(e.target.value as Role)} aria-label="Role selector">
            <option value="MITARBEITER">Mitarbeiter</option>
            <option value="LERNENDER">Lernender</option>
          </select>
          <button className="btn logout">Logout</button>
        </div>
      </header>

      <nav className="nav">
        {buttonsForRole.map(b => (
          <button
            key={b}
            className={`btn navbtn ${view === b ? 'active' : ''}`}
            onClick={() => setView(b)}
          >
            {b}
          </button>
        ))}
      </nav>

      <div style={{padding:12,display:'flex',gap:12,alignItems:'center'}}>
        <label>Benutzer:</label>
        <select value={userId} onChange={e => setUserId(Number(e.target.value))}>
          {(role==='MITARBEITER' ? mitarbeiter : lernende).map(u => (
            <option key={u.id} value={u.id}>{u.name} (#{u.id})</option>
          ))}
        </select>
        <div style={{color:'#666'}}>{message?.text}</div>
      </div>

      {message && (
        <div className={`toast ${message.type==='error' ? 'error' : 'info'}`} role="status">
          {message.text}
        </div>
      )}

      <main className="content">
        {view === 'AUFLADUNG' && (
          <div className="panel">
            <h3>Aufladen</h3>
            <DepositForm onDone={async () => { try { const b = await api.getBalance(); setBalanceValue(b.balance); setMessage({type:'info', text:'Aufgeladen'}); log(LogLevel.INFO, 'Deposit succeeded') } catch (e:any) { setMessage({type:'error', text: e.message}); log(LogLevel.ERROR, e.message) } }} />
          </div>
        )}

        {view === 'ABBUCHUNG' && (
          <div className="panel">
            <h3>Abbuchen</h3>
            <WithdrawForm onDone={async () => { try { const b = await api.getBalance(); setBalanceValue(b.balance); setMessage({type:'info', text:'Abgebucht'}); log(LogLevel.INFO, 'Withdraw succeeded') } catch (e:any) { setMessage({type:'error', text: e.message}); log(LogLevel.ERROR, e.message) } }} />
          </div>
        )}

        {view === 'GUTHABEN' && (
          <div className="panel">
            <h3>Guthaben</h3>
            <button className="btn" onClick={async () => { try { const b = await api.getBalance(); setBalanceValue(b.balance); setMessage(null); log(LogLevel.INFO, 'Balance fetched') } catch (e:any) { setMessage({type:'error', text: e.message}); log(LogLevel.ERROR, e.message) } }}>Aktualisieren</button>
            <div style={{marginTop:12}}>Aktuelles Guthaben: {balanceValue !== null ? balanceValue.toFixed(2) + ' CHF' : '—'}</div>
            <div style={{marginTop:12}}>
              <button className="btn" onClick={async () => { try { const h = await api.getMyHistory(); setHistory(h.history || []); setMessage(null); log(LogLevel.INFO, 'My history loaded') } catch (e:any) { setMessage({type:'error', text: e.message}); log(LogLevel.ERROR, e.message) } }}>Meine Historie laden</button>
              {history.length>0 && <ul>{history.map((it,idx)=>(<li key={idx}>{it.type} {it.amount} CHF — {new Date(it.created_at).toLocaleString()}</li>))}</ul>}
            </div>
          </div>
        )}

        {view === 'GESAMTUEBERSICHT' && (
          <div className="panel">
            <h3>Gesamtübersicht</h3>
            <button className="btn" onClick={async ()=>{ try { const res = await api.getAllBalances(); setAllBalances(res.balances || []); setMessage(null); log(LogLevel.INFO, 'All balances loaded') } catch (e:any) { setMessage({type:'error', text: e.message}); log(LogLevel.ERROR, e.message) } }}>Laden</button>
            <ul>
              {allBalances.map((u:any)=> (<li key={u.id}>{u.first_name} {u.last_name}: {Number(u.balance).toFixed(2)} CHF</li>))}
            </ul>
          </div>
        )}

        {view === 'VERLAUFE' && (
          <div className="panel">
            <h3>Guthabenverläufe</h3>
            <button className="btn" onClick={async ()=>{ try { const res = await api.getAllHistory(); setHistory(res.history || []); setMessage(null); log(LogLevel.INFO, 'All history loaded') } catch (e:any) { setMessage({type:'error', text: e.message}); log(LogLevel.ERROR, e.message) } }}>Alle Verläufe laden</button>
            <ul>
              {history.map((it:any,idx)=>(<li key={idx}>User #{it.user_id} {it.type} {it.amount} CHF — {new Date(it.created_at).toLocaleString()}</li>))}
            </ul>
          </div>
        )}
      </main>
    </div>
  )
}

export default App

// small inline components for forms
function DepositForm({ onDone }: { onDone?: ()=>void }){
  const [amount, setAmount] = useState<number>(0)
  const [busy, setBusy] = useState(false)
  return (
    <div>
      <input type="number" value={amount} onChange={e=>setAmount(Number(e.target.value))} />
      <button className="btn" onClick={async ()=>{ setBusy(true); try { await api.deposit(amount); onDone && await onDone() } catch (e:any) { console.error(e); alert('Fehler: '+e.message) } finally { setBusy(false) } }} disabled={busy}>Aufladen</button>
    </div>
  )
}

function WithdrawForm({ onDone }: { onDone?: ()=>void }){
  const [amount, setAmount] = useState<number>(0)
  const [busy, setBusy] = useState(false)
  return (
    <div>
      <input type="number" value={amount} onChange={e=>setAmount(Number(e.target.value))} />
      <button className="btn" onClick={async ()=>{ setBusy(true); try { await api.withdraw(amount); onDone && await onDone() } catch (e:any) { console.error(e); alert('Fehler: '+e.message) } finally { setBusy(false) } }} disabled={busy}>Abbuchen</button>
    </div>
  )
}
