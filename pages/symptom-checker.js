import {useState} from 'react'

export default function SymptomChecker(){
  const [symptom, setSymptom] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  async function check(){
    setLoading(true)
    try{
      const res = await fetch('/api/symptom', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({symptom})
      })
      const data = await res.json()
      setResult(data)
    }catch(e){
      setResult({guidance:'An error occurred. Try again.'})
    }
    setLoading(false)
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Symptom Checker</h2>
      <p className="mb-4">Enter your main symptom and get safe guidance and next steps.</p>
      <div className="flex gap-2 mb-4">
        <input className="border p-2 flex-1" value={symptom} onChange={e=>setSymptom(e.target.value)} placeholder="e.g. chest pain" />
        <button onClick={check} className="px-4 py-2 bg-ma-blue text-white" disabled={!symptom||loading}>{loading? 'Checking...' : 'Check'}</button>
      </div>

      {result && (
        <div className="mt-4 p-4 border rounded bg-white">
          <h3 className="font-semibold">Guidance</h3>
          <p className="mt-2">{result.guidance}</p>
          {result.reason && <p className="mt-2 text-sm text-gray-600">Reason: {result.reason}</p>}
          <p className="mt-2 text-sm text-gray-600">This is informational only. If symptoms are severe, seek emergency care.</p>
        </div>
      )}
    </div>
  )
}
