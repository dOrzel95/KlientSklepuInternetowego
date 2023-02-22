import React from 'react';
import "../styles/Register.css";

const Register = (props) => {

    let inputChange = props.formInputChange;

    const form = props.registerForm;

    return (
        <div className="register">

            <h3>Rejestracja</h3>
            <form id="registerForm"
                className="form"
                onSubmit={(e) => props.handleSubmitForm(e, form)}
            >
                <div className="form-part" >
                    <input
                        className="register-login-input"
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
                    <input
                        className="register-email-input"
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={(e) =>
                            props.formInputChange(e, form)
                        }
                        onClick={
                            (e) =>
                                props.handleInputClickForm(e, form)
                        }
                        value={form.email}
                        data-error={"false"}
                    />
                </div>
                <div className="form-part">
                    <button className="register-button"
                    >
                        Zerejestruj
                    </button>
                </div>
            </form>
        </div >


    );
}

export default Register;