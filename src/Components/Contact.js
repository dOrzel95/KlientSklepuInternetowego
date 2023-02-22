import "../styles/Contact.css";
import React from "react";

const Contact = props => {

  const form = props.contactForm;

  const sendMessage = (form)=>{
  const jwt = localStorage.getItem("accesToken")
  let message = {
    subject:form.subject,
    message:form.message
  }  
    fetch(  `http://localhost:8080/montanashop/client/send-message`,{
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization':"Bearer " +jwt 
      },body:JSON.stringify(message)
    }).then(
        res =>{
          console.log(res)
          if(res.status!==200){
            if(res.status===401){
              props.unauthorized().then(res=>{
                if(res.status===200){
                  sendMessage()
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
    <div className="contact">
      <h3>Napisz do nas</h3>
      <form
        id="contactForm"
        className="form"
        onSubmit={(e) => props.handleSubmitForm(e, form, sendMessage)}
      >
        <input
          type="text"
          name="name"
          placeholder="Imię"
          onChange={(e) =>
            props.formInputChange(e, form)
          }
          onClick={
            (e) => {
              props.handleInputClickForm(e, form)
            }
          }
          data-error={"false"}

          value={form.name}
        />
        
        
      <input
        className="input-name"
        type="text"
        name="subject"
        placeholder="Temat"
        onChange={(e) =>
          props.formInputChange(e, form)
        }
        onClick={
          (e) => {
            props.handleInputClickForm(e, form)
          }
        }
        data-error={"false"}
        value={form.subject}
      />
      
      <textarea
        onChange={(e) =>
          props.formInputChange(e, form)
        }
        onClick={
          (e) => {
            props.handleInputClickForm(e, form)
          }
        }
        className="message-content"
        type="text"
        name="message"
        placeholder="Treść"
        value={form.message}
        data-error={"false"}

      />
      <button className="send-button">
        Wyślij
        </button>
      </form>
    </div >
  );
};

export default Contact;
