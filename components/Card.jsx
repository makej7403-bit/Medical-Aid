export default function Card({children, title}){
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      {title && <h3 className="font-semibold mb-2">{title}</h3>}
      <div>{children}</div>
    </div>
  )
}
