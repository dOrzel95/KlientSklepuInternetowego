
import "../styles/Login.css"
import React from 'react';
import { Redirect } from 'react-router-dom'
const Login = (props) => {
    let inputChange = props.formInputChange;
    const form = props.loginForm;
    const logIn = props.logIn;
    const logout=props.logout
    
   

    return logIn===2? (
        <div className="login">
            <h3>Logowanie</h3>
            <form id="loginForm"
                className="form"
                onSubmit={(e) => props.handleSubmitForm(e, form)}
            >
                <div className="form-part" >
                    <input
                        className="login-input"
                        type="text"
                        name="login"
                        placeholder="Login"
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
                        placeholder="Hasło"
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
                    <button className="login-button">
                        Zaloguj
                    </button>
                   
                </div>
            </form>
         
        </div >


    ):
    (
    <>
    <Redirect to="/"/>
    </>
    )
}

export default Login;