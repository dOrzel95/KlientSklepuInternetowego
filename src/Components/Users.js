import React, { useState, useEffect } from "react";
import "../styles/UserList.css";

 
 


const Users = (props) => {
    const [users, setUsers] = useState([]);
    console.log(users)
    const usersList = users.map(user=>(<li key={user.id}>
        <label>{user.username+" "+user.email}</label>
        <div className="buttons">
         <button onClick={()=>{
                         deleteUser(user.id)
        }}>Usuń</button><button onClick={()=>{
          blockUser(user.id)
        }} >Zablokuj</button>

<button onClick={()=>{
          unlockUser(user.id)
        }} >Odblokuj</button>

        </div>

    </li>))

const getUsersList = ()=>{
        const jwt = localStorage.getItem("accesToken")  
    fetch(  "http://localhost:8080/montanashop/client/all",{
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization':"Bearer " +jwt 
      }
    }).then(
        res =>{

          console.log(res)
          if(res.status!==200){
            if(res.status===401){
              props.unauthorized().then(res=>{
                if(res.status===200){
                  getUsersList()
                }else{
                  throw res
                }
              })
          }else{
            throw res
          }}else{
            return res.json()
        }}).then(res=>{
            setUsers(res)
        })
  }
  const getUsersBesideActive = ()=>{
    const jwt = localStorage.getItem("accesToken")  
fetch(  "http://localhost:8080/montanashop/client/all-other-users",{
  method: 'GET',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Authorization':"Bearer " +jwt 
  }
}).then(
    res =>{

      console.log(res)
      if(res.status!==200){
        if(res.status===401){
          props.unauthorized().then(res=>{
            if(res.status===200){
              getUsersBesideActive()
            }else{
              throw res
            }
          })
      }else{
        throw res
      }}else{
        return res.json()
    }}).then(res=>{
      console.log(res)
        setUsers(res)
    }).catch(e=>{
      console.log(e)
    })
}

  const deleteUser = (id)=>{
  const jwt = localStorage.getItem("accesToken")  
fetch(  `http://localhost:8080/montanashop/client/delete/${id}`,{
  method: 'DELETE',
  headers: {
    'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization':"Bearer " +jwt 
  }
}).then(
    res =>{
      console.log(res)
      if(res.status!==200){
        if(res.status===401){
          props.unauthorized().then(res=>{
            if(res.status===200){
              deleteUser()
            }else{
              throw res
            }
          })
      }else{
        throw res
      }}else{
        getUsersBesideActive()
    }}).catch(e=>{
      console.log(e)
    })
}
const blockUser = (id)=>{
  const jwt = localStorage.getItem("accesToken")  
fetch(  `http://localhost:8080/montanashop/client/block-account?id=${id}`,{
  method: 'PUT',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Authorization':"Bearer " +jwt 
  }
}).then(
    res =>{
      console.log(res)
      if(res.status!==200){
        if(res.status===401){
          props.unauthorized().then(res=>{
            if(res.status===200){
              blockUser()
            }else{
              throw res
            }
          })
      }else{
        throw res
      }}}).catch(e=>{
        console.log(e)
      })
}
  useEffect(()=>{
    getUsersBesideActive()
  }
    ,[])

    const unlockUser = (id)=>{
      const jwt = localStorage.getItem("accesToken")  
    fetch(  `http://localhost:8080/montanashop/client/unlock-account?id=${id}`,{
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization':"Bearer " +jwt 
      }
    }).then(
        res =>{
          console.log(res)
          if(res.status!==200){
            if(res.status===401){
              props.unauthorized().then(res=>{
                if(res.status===200){
                  unlockUser()
                }else{
                  throw res
                }
              })
          }else{
            throw res
          }}}).catch(e=>{
            console.log(e)
          })
    }


      useEffect(()=>{
        getUsersBesideActive()
      }
        ,[])

    
    return ( <>
        <div className="users">
            <ul>
                {usersList}
            </ul>
        </div>
    </> );
}
 
export default Users;