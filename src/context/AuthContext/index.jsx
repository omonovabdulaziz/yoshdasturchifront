import React from 'react'

const user =  user ? {isLogged:true, user:user} : {isLogged:false, user:null}
const AuthContext = () => {

    const [authuser,setAuthUser] = useState(user)
  return (
    <div>AuthContext</div>
  )
}

export default AuthContext