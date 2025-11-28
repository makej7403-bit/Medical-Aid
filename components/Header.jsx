import Link from 'next/link'
import AuthButton from './AuthButton'

export default function Header(){
  return (
    <header className="bg-ma-blue text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Medical Aid" className="h-8 w-auto"/>
          <span className="font-semibold">Medical Aid</span>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/">Home</Link>
          <Link href="/symptom-checker">Symptom Checker</Link>
          <Link href="/first-aid">First Aid</Link>
          <Link href="/meds">Medication</Link>
          <Link href="/clinician">Clinician</Link>
          <AuthButton />
        </nav>
      </div>
    </header>
  )
}
