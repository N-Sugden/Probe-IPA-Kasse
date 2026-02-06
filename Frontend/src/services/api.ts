const BASE = 'http://localhost:3000'

function bearer() {
  const t = localStorage.getItem('dev_token')
  return { Authorization: t ? `Bearer ${t}` : '' }
}

export async function getBalance() {
  console.log('[API] Getting balance')
  const res = await fetch(`${BASE}/api/balance/balance`, { headers: { ...bearer() } })
  const body = await res.json()
  console.log('[API] Balance response:', body)
  if (!res.ok) throw new Error(body.message || res.statusText)
  return body
}

export async function deposit(amount: number) {
  console.log('[API] Depositing', amount)
  const res = await fetch(`${BASE}/api/balance/deposit`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', ...bearer() }, body: JSON.stringify({ amount })
  })
  const body = await res.json()
  console.log('[API] Deposit response:', body)
  if (!res.ok) throw new Error(body.message || res.statusText)
  return body
}

export async function withdraw(amount: number) {
  console.log('[API] Withdrawing', amount)
  const res = await fetch(`${BASE}/api/balance/withdraw`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', ...bearer() }, body: JSON.stringify({ amount })
  })
  const body = await res.json()
  console.log('[API] Withdraw response:', body)
  if (!res.ok) throw new Error(body.message || res.statusText)
  return body
}

export async function getAllBalances() {
  console.log('[API] Getting all balances')
  const res = await fetch(`${BASE}/api/balance/all-balances`, { headers: { ...bearer() } })
  const body = await res.json()
  console.log('[API] All balances response:', body)
  if (!res.ok) throw new Error(body.message || res.statusText)
  return body
}

export async function getAllHistory() {
  console.log('[API] Getting all history')
  const res = await fetch(`${BASE}/api/history/all-history`, { headers: { ...bearer() } })
  const body = await res.json()
  console.log('[API] All history response:', body)
  if (!res.ok) throw new Error(body.message || res.statusText)
  return body
}

export async function getMyHistory() {
  console.log('[API] Getting my history')
  const res = await fetch(`${BASE}/api/history/history`, { headers: { ...bearer() } })
  const body = await res.json()
  console.log('[API] My history response:', body)
  if (!res.ok) throw new Error(body.message || res.statusText)
  return body
}
