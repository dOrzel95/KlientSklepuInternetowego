import React from 'react';
import "../styles/Settings.css";
import Users from './Users';



const Settings = (props) => {

    let inputChange = props.formInputChange;
    const form = props.updateForm;

    const deleteUser = ()=>{
    const jwt = localStorage.getItem("accesToken")

      fetch(  `http://localhost:8080/montanashop/client/delete`,{
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
                props.logout()
          }}).catch(e=>{
            console.log(e)
          })
      }
      const updateUser = (data)=>{
        let user = {
            "username": data.login,
            "password": data.password,
            "email": data.email
          }  
        const jwt = localStorage.getItem("accesToken")  
      fetch(  `http://localhost:8080/montanashop/client/update`,{
        method: 'PUT',
        headers: {
          'Accept': 'application/json, text/plain, */*',
              'Content-type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
              'Authorization':"Bearer " +jwt 
        }, body:JSON.stringify(user)
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
                props.logout()
          }}).catch(e=>{
            console.log(e)
          })
      }
    return (
        <div className="settings">
            <h3>Ustawienia konta</h3>
            <form id={form.nameForm}
                className="form"
                onSubmit={(e) => props.handleSubmitForm(e, form)}
            >
                <div className="form-part" >
                    <input
                        className="update-login-input"
                        type="text"
                        name="login"
                        placeholder="Nowy login"
                        onChange={(e) =>
                            props.formInputChange(e, form)
                        }
                        onClick={
                            (e) => {
                                props.handleInputClickForm(e, form)
                            }
                        }
                        value={form.login}
                        data-error={"false"}
                    />
                </div>
                <div className="form-part">
                    <input
                        type="password"
                        name="password"
                        placeholder="Nowe hasło"
                        onChange={(e) =>
                            props.formInputChange(e, form)
                        }
                        onClick={
                            (e) =>
                                props.handleInputClickForm(e, form)
                        }
                        data-error={"false"}
                        value={form.password}
                    />
                    <i className="password-prompt" onClick={() => props.handlePasswordPrompt()}></i>
                </div>
                <div className="form-part">
                    <button className="update-button"
                      onClick={()=>{
                        updateUser(form)
                    }}
                    >
                        Edytuj konto
                    </button>
                </div>
            </form>
                    <button className="delete-button"
                    onClick={()=>{
                        deleteUser()
                    }}
                    >
                        Usouń konto
                    </button>             
        </div >
    )
}
 
export default Settings;