export default function Footer(){
  return (
    <footer className="bg-gray-100 text-gray-700 mt-12">
      <div className="container mx-auto px-4 py-6 text-sm">
        <div>© {new Date().getFullYear()} Medical Aid — Information only. Not a substitute for professional medical advice.</div>
      </div>
    </footer>
  )
}
