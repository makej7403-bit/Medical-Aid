import Card from '../components/Card'

export default function Home(){
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <h1 className="text-3xl font-bold mb-3">Medical Aid</h1>
        <p className="mb-4">Your trusted companion for health information, medical support, and clinical assistance. Use the symptom checker, first-aid guides, medication lookup, and clinician tools.</p>
        <div className="flex gap-3">
          <a className="px-4 py-2 bg-ma-teal text-white rounded" href="/symptom-checker">Start Symptom Checker</a>
          <a className="px-4 py-2 border rounded" href="/first-aid">Open First Aid</a>
        </div>

        <div className="mt-6">
          <Card title="Emergency Quick Action">
            If you believe a condition is life-threatening, call your local emergency number immediately. <br/>
            In many countries this is <strong>112</strong> or <strong>911</strong>. Use local emergency numbers.
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <Card title="Clinician Toolkit">
          Templates for visit notes, patient education handouts, and discharge instructions. <br/>
          (Requires `OPENAI_API_KEY` on server to auto-generate notes.)
        </Card>

        <Card title="Safety & Compliance">
          Medical Aid provides informational content only. It is not medical advice. Seek a licensed provider for diagnosis and treatment.
        </Card>
      </div>
    </div>
  )
}
