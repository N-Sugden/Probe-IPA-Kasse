const BASE = 'http://localhost:3000'

function bearer() {
  const t = localStorage.getItem('dev_token')
  return { Authorization: t ? `Bearer ${t}` : '' }
}

export async function getBalance() {
  const res = await fetch(`${BASE}/api/balance/balance`, { headers: { ...bearer() } })
  const body = await res.json()
  if (!res.ok) throw new Error(body.message || res.statusText)
  return body
}

export async function deposit(amount: number) {
  const res = await fetch(`${BASE}/api/balance/deposit`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', ...bearer() }, body: JSON.stringify({ amount })
  })
  const body = await res.json()
  if (!res.ok) throw new Error(body.message || res.statusText)
  return body
}

export async function withdraw(amount: number) {
  const res = await fetch(`${BASE}/api/balance/withdraw`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', ...bearer() }, body: JSON.stringify({ amount })
  })
  const body = await res.json()
  if (!res.ok) throw new Error(body.message || res.statusText)
  return body
}

export async function getAllBalances() {
  const res = await fetch(`${BASE}/api/balance/all-balances`, { headers: { ...bearer() } })
  const body = await res.json()
  if (!res.ok) throw new Error(body.message || res.statusText)
  return body
}

export async function getAllHistory() {
  const res = await fetch(`${BASE}/api/history/all-history`, { headers: { ...bearer() } })
  const body = await res.json()
  if (!res.ok) throw new Error(body.message || res.statusText)
  return body
}

export async function getMyHistory() {
  const res = await fetch(`${BASE}/api/history/history`, { headers: { ...bearer() } })
  const body = await res.json()
  if (!res.ok) throw new Error(body.message || res.statusText)
  return body
}
