import Card from '../components/Card'

const guides = [
  {title:'Bleeding', steps:['Apply direct pressure with clean cloth or bandage.','Maintain pressure until bleeding stops.','Elevate the injured area if possible.','If bleeding is heavy or does not stop, seek emergency care.']},
  {title:'Burns', steps:['Cool the burn under running cool (not cold) water for 10–20 minutes.','Do not apply ice directly.','Cover with sterile, non-stick dressing.','Seek immediate care for large, deep, or chemical burns.']},
  {title:'Fractures', steps:['Immobilize the limb using a splint or padding.','Avoid moving the patient if spine injury suspected.','Apply ice to reduce swelling.','Get professional assessment; do not attempt to set the bone at home.']}
]

export default function FirstAid(){
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">First Aid Helper</h2>
      <p className="mb-4">Quick, safety-first steps. For serious or life-threatening situations, call emergency services immediately.</p>
      <div className="grid gap-4 md:grid-cols-2">
        {guides.map(g=> (
          <Card key={g.title} title={g.title}>
            <ol className="pl-4 list-decimal">
              {g.steps.map((s,i)=> <li key={i}>{s}</li>)}
            </ol>
          </Card>
        ))}
      </div>
    </div>
  )
}
