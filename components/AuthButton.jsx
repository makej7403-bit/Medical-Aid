import { useState, useEffect } from 'react'
import { auth, provider, signInWithPopup, signOut, onAuthStateChanged } from '../lib/firebase'

export default function AuthButton(){
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, (u)=>{
      setUser(u)
    })
    return unsub
  },[])

  async function login(){
    try{
      await signInWithPopup(auth, provider)
    }catch(e){
      console.error('login error', e)
      alert('Login failed: '+e.message)
    }
  }

  async function logout(){
    try{ await signOut(auth) }catch(e){console.error(e)}
  }

  if(user){
    return (
      <div className="flex items-center gap-3">
        <img src={user.photoURL} alt="avatar" className="w-8 h-8 rounded-full" />
        <span className="text-sm">{user.displayName}</span>
        <button onClick={logout} className="px-3 py-1 border rounded text-sm">Sign out</button>
      </div>
    )
  }

  return <button onClick={login} className="px-3 py-1 bg-white text-ma-blue border rounded">Sign in with Google</button>
}
