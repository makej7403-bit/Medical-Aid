import MedSearch from '../components/MedSearch'

export default function Meds(){
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Medication Info</h2>
      <p className="mb-4">Search for medication information and combined RxNorm + openFDA data.</p>
      <MedSearch />
    </div>
  )
}
