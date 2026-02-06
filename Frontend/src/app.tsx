import React, { useState, useEffect } from 'react'
import * as api from './services/api'
import { log, LogLevel } from './utils/logger'
import LoginPage from './pages/LoginPage'
import { DepositForm } from './components/DepositForm'
import { WithdrawForm } from './components/WithdrawForm'
import { BalanceView } from './components/BalanceView'
import { HistoryView } from './components/HistoryView'
import { OverviewView } from './components/OverviewView'
import { Role, View, User, Transaction, Message } from './types'

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [role, setRole] = useState<Role>('MITARBEITER')
  const [view, setView] = useState<View>('AUFLADUNG')
  const [users, setUsers] = useState<User[]>([])
  const [userId, setUserId] = useState<number>(3)
  const [balanceValue, setBalanceValue] = useState<number | null>(null)
  const [message, setMessage] = useState<Message | null>(null)
  const [allBalances, setAllBalances] = useState<User[]>([])
  const [history, setHistory] = useState<Transaction[]>([])

  // Check if already logged in on mount
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn')
    if (loggedIn === 'true') {
      setIsLoggedIn(true)
    }
  }, [])

  // Fetch users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:3000/dev/users')
        const data = await res.json()
        setUsers([...(data.mitarbeiter || []), ...(data.lernende || [])])
        log(LogLevel.INFO, 'Users loaded from backend')
      } catch (e: any) {
        log(LogLevel.ERROR, 'Failed to load users: ' + e.message)
        setMessage({ type: 'error', text: 'Benutzer konnte nicht geladen werden' })
      }
    }
    fetchUsers()
  }, [])

  // Get users for current role
  const usersForRole = users.filter(u => u.role === role)

  // Reset view if not valid for current role, clear history on role change
  useEffect(() => {
    const validViews: View[] = role === 'MITARBEITER'
      ? ['AUFLADUNG','ABBUCHUNG','GUTHABEN','GESAMTUEBERSICHT','VERLAUFE']
      : ['AUFLADUNG','ABBUCHUNG','GUTHABEN']
    
    if (!validViews.includes(view)) {
      setView('AUFLADUNG')
    }
    setHistory([])
    setBalanceValue(null)
  }, [role])

  // Set initial user and clear history when role changes
  useEffect(() => {
    if (usersForRole.length > 0 && !usersForRole.find(u => u.id === userId)) {
      setUserId(usersForRole[0].id)
    }
    setHistory([])
  }, [role, usersForRole])

  // Clear history and balance when userId changes
  useEffect(() => {
    setHistory([])
    setBalanceValue(null)
  }, [userId])

  // Auto-load data when view changes
  useEffect(() => {
    const loadViewData = async () => {
      if (view === 'GUTHABEN') {
        try {
          const b = await api.getBalance()
          setBalanceValue(Number(b.balance))
          const h = await api.getMyHistory()
          setHistory(h.history || [])
          log(LogLevel.INFO, 'Balance and history loaded')
        } catch (e: any) {
          log(LogLevel.ERROR, 'Failed to load balance: ' + e.message)
        }
      } else if (view === 'GESAMTUEBERSICHT') {
        try {
          const res = await api.getAllBalances()
          setAllBalances(res.balances || [])
          log(LogLevel.INFO, 'All balances loaded')
        } catch (e: any) {
          log(LogLevel.ERROR, 'Failed to load balances: ' + e.message)
        }
      } else if (view === 'VERLAUFE') {
        try {
          const res = await api.getAllHistory()
          setHistory(res.history || [])
          log(LogLevel.INFO, 'All history loaded')
        } catch (e: any) {
          log(LogLevel.ERROR, 'Failed to load history: ' + e.message)
        }
      }
    }
    loadViewData()
  }, [view])

  // Fetch token when userId changes
  useEffect(() => {
    const getToken = async () => {
      try {
        const res = await fetch('http://localhost:3000/dev/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId })
        })
        const data = await res.json()
        if (data.token) {
          localStorage.setItem('dev_token', data.token)
          const user = users.find(u => u.id === userId)
          setMessage({
            type: 'info',
            text: `Token für ${user?.first_name} ${user?.last_name} gesetzt`
          })
          log(LogLevel.INFO, `Token set for user ${userId}`)
        }
      } catch (e: any) {
        log(LogLevel.ERROR, 'Token fetch failed: ' + e.message)
        setMessage({ type: 'error', text: 'Token konnte nicht abgerufen werden' })
      }
    }
    if (userId) getToken()
  }, [userId])

  const buttonsForRole: View[] = role === 'MITARBEITER'
    ? ['AUFLADUNG','ABBUCHUNG','GUTHABEN','GESAMTUEBERSICHT','VERLAUFE']
    : ['AUFLADUNG','ABBUCHUNG','GUTHABEN']

  // Show login page if not logged in
  if (!isLoggedIn) {
    return <LoginPage onLogin={() => { setIsLoggedIn(true); localStorage.setItem('isLoggedIn', 'true') }} />
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="logo">IPA Kasse</div>
        <div className="topcontrols">
          <select value={role} onChange={e => setRole(e.target.value as Role)} aria-label="Role selector">
            <option value="MITARBEITER">Mitarbeiter</option>
            <option value="LERNENDER">Lernender</option>
          </select>
          <button className="btn logout" onClick={() => { setIsLoggedIn(false); localStorage.setItem('isLoggedIn', 'false'); setHistory([]); setBalanceValue(null); setAllBalances([]) }}>Logout</button>
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

      <div style={{padding:12,display:'flex',gap:12,alignItems:'center',borderBottom:'1px solid #eee'}}>
        <label>Benutzer:</label>
        <select value={userId} onChange={e => setUserId(Number(e.target.value))}>
          {usersForRole.map(u => (
            <option key={u.id} value={u.id}>{u.first_name} {u.last_name} (#{u.id})</option>
          ))}
        </select>
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
            <DepositForm onDone={async () => { 
              try { 
                const b = await api.getBalance()
                setBalanceValue(Number(b.balance))
                setMessage({type:'info', text:'Aufgeladen ✓'})
                log(LogLevel.INFO, 'Deposit succeeded') 
              } catch (e:any) { 
                setMessage({type:'error', text: e.message})
                log(LogLevel.ERROR, e.message) 
              } 
            }} />
          </div>
        )}

        {view === 'ABBUCHUNG' && (
          <div className="panel">
            <h3>Abbuchen</h3>
            <WithdrawForm onDone={async () => { 
              try { 
                const b = await api.getBalance()
                setBalanceValue(Number(b.balance))
                setMessage({type:'info', text:'Abgebucht ✓'})
                log(LogLevel.INFO, 'Withdraw succeeded') 
              } catch (e:any) { 
                setMessage({type:'error', text: e.message})
                log(LogLevel.ERROR, e.message) 
              } 
            }} />
          </div>
        )}

        {view === 'GUTHABEN' && (
          <BalanceView balanceValue={balanceValue} history={history} />
        )}

        {view === 'GESAMTUEBERSICHT' && (
          <OverviewView allBalances={allBalances} />
        )}

        {view === 'VERLAUFE' && (
          <HistoryView history={history} users={users} />
        )}
      </main>
    </div>
  )
}

export default App
