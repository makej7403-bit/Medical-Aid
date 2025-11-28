import {useState} from 'react'

export default function MedSearch(){
  const [q,setQ] = useState('')
  const [loading,setLoading] = useState(false)
  const [res,setRes] = useState(null)

  async function search(){
    if(!q) return
    setLoading(true)
    try{
      const r = await fetch(`/api/medicines?q=${encodeURIComponent(q)}`)
      const j = await r.json()
      setRes(j)
    }catch(e){
      setRes({error:String(e)})
    }
    setLoading(false)
  }

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input className="border p-2 flex-1" placeholder="Search medication e.g. Paracetamol" value={q} onChange={e=>setQ(e.target.value)} />
        <button onClick={search} className="px-4 py-2 bg-ma-blue text-white" disabled={loading}>{loading? 'Searching...':'Search'}</button>
      </div>

      {res && (
        <div className="p-4 border rounded bg-white">
          <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(res, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
