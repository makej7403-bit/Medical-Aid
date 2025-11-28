import {useState} from 'react'

export default function Clinician(){
  const [history,setHistory] = useState('')
  const [plan,setPlan] = useState('')
  const [result,setResult] = useState(null)
  const [loading,setLoading] = useState(false)

  async function gen(){
    setLoading(true)
    try{
      const res = await fetch('/api/notes', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({history,plan})
      })
      const data = await res.json()
      setResult(data.note)
    }catch(e){
      setResult('Error generating note')
    }
    setLoading(false)
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Clinician Toolkit</h2>
      <p className="mb-4">Enter brief HPI and plan; use the tool to generate a concise visit note or patient instructions.</p>
      <textarea className="w-full border p-2 mb-2" rows={4} placeholder="History of present illness" value={history} onChange={e=>setHistory(e.target.value)} />
      <textarea className="w-full border p-2 mb-2" rows={3} placeholder="Plan" value={plan} onChange={e=>setPlan(e.target.value)} />
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-ma-blue text-white" onClick={gen} disabled={loading}>{loading? 'Generating...' : 'Generate Note'}</button>
      </div>

      {result && (
        <div className="mt-4 p-4 border rounded bg-white"><pre className="whitespace-pre-wrap">{result}</pre></div>
      )}
    </div>
  )
}
