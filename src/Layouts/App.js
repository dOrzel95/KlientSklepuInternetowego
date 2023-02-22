import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "../styles/App.css";
import "../styles/Footer.css";
import Page from "./Page.js";
import Footer from "./Footer.js";
import Header from "./Header";
import imgCegla from "../img/cegła.jpg";
import imgCement from "../img/cement.jpg";
import imgFarba from "../img/farba.jpg";
import imgPustak from "../img/pustak.jpg";
import Axios from "axios";



const proxyurl = "https://cors-anywhere.herokuapp.com/";
const http = "http://localhost:8080/product/all"
const httpadd = "https://carapp2.herokuapp.com//api/cars/addcar"
const httpdelete = "https://carapp2.herokuapp.com//api/cars/daletecar/?id="





class App extends Component {
  state = {
    products:[{}],
    addShoppingCart: 0,
    linksLogIn: [
      {
        id: 0,
        path: "/",
        title: "Strona Główna"
      },
      {
        id: 1,
        path: "/ofert",
        title: "Oferta"
      },
      {
        id: 2,
        path: "/contact",
        title: "Kontakt"
      },
      {
        id: 3,
        path: "/addproduct",
        title: "Wystaw produkt"
      },
      {
        id: 4,
        path: "/shopping-cart",
        title: <i class="fas fa-shopping-cart">{" " + 0}</i>
      },
      {
        id: 7,
        path: "/my-products",
        title: "Moje produkty"
      },
      {
        id: 5,
        path: "/settings",
        title: <i class="fas fa-cog"></i>
      },
      {
        id: 6,
        path: "/logout",
        title:"Wyloguj"
      },
    ],

    linksLogOut: [
      {
        id: 0,
        path: "/register",
        title: "rejestracja"
      },
      {
        id: 1,
        path: "/login",
        title: "Login"
      }
    ],
    linksLogAdmin: [
      {
        id: 0,
        path: "/users",
        title: "Użytkownicy"
      },
      {
        id: 1,
        path: "/ofert",
        title: "oferta"
      },
      {
        id: 2,
        path: "/add-categories",
        title: "Dodaj kategorie"
      },
      {
        id: 3,
        path: "/logout",
        title:"Wyloguj"
      },
    ],
    roleUser:0,
    // Formularz rejestracyjny
    form: {
      "registerForm": {
        nameForm: "registerForm",
        login: "",
        password: "",
        email: ""
      },
    //Formularz kontaktowy
      "contactForm": {
        nameForm: "contactForm",
        name: "",
        subject: "",
        message: ""
      },
      "loginForm": {
        nameForm: "loginForm",
        login: "",
        password: "",
      },
      "productForm":{
        nameForm: "productForm",
        name:"",
        price:"",
        quantity:"",
        photo:"",
        categorySelect:[],
        category:1,
        productDescription:""
      },
      "filtersProductForm":{
        nameForm: "filtersProductForm",
        name:"",
        price:"",
        quantity:"",
        photo:"",
        categorySelect:[],
        category:"",
        productDescription:""
      },
      "updateForm": {
        nameForm: "updateForm",
        login: "",
        password: "",
        email: ""
      },

    },

    logIn:0,
    
  }; 

  validFormAfterBackend = (formAfterValid, error)=>{
     
      const formInputHandler = [...document.querySelector("#" + formAfterValid.nameForm).querySelectorAll("input")];
      
      formInputHandler.forEach(i=>{
        if(i.name===error.id){
          if (i.type === "password") {
            i.type = "text";
          }
          formAfterValid[error.id]=error.message;
          this.setState({
            formAfterValid           
          })  
        i.dataset["error"]="true";
        i.classList.toggle("input-error")}
        else if(error.id==="account"&&i.name==="login"){
          formAfterValid["login"]=error.message;
          this.setState({
            formAfterValid           
          })
          i.dataset["error"]="true";
          i.classList.toggle("input-error")
        }
      
      })
  }

  logout=()=>{
    localStorage.removeItem("in")
    localStorage.removeItem('accesToken');
      localStorage.removeItem('refreshtoken');
    this.setState({
      logIn:2
    })
  }
 

  getAllProducts = ()=>{
    const jwt = localStorage.getItem("accesToken")  
    fetch(  "http://localhost:8080/montanashop/product/all",{
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization':"Bearer " +jwt 
      }}).then(
        response =>{
          return response
        }
      ).then(response =>{
        if(response.status===401){
          this.unauthorized().then(res=>{
            if(res.status===200){
              this.getAllProducts(); 
            }else{
              throw res
            }
          })
      
        }else{
          return response
        }
      } ).then(res=>{
        if(res.status===200){
          return res.json()
        }else{
          throw res;
        }
      }).then(res=>{    
        console.log(res)
        this.setState({
          products:res,
        })
      }).catch(err=>{
        console.log(err)
      })
  }


  unauthorized = (res)=>{
       return     fetch("http://localhost:8080/montanashop/refreshtoken", {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'X-Requested-With': 'XMLHttpRequest',
        'refreshtoken':"Bearer "+localStorage.getItem('refreshtoken'),
      }, 
    }
   ).then(r =>  r.json().then(data => ({status: r.status, body: data})))
   .then(
     res=>{
       if(res.status===401){
        this.logout();
        throw res
      }
      else if(res.status===200){
        return res
      }
  }).then((res)=>{
    const accestoken =  res.body["accestoken"]
    console.log(res.body)
    console.log(accestoken)
    localStorage.removeItem("accesToken")
    localStorage.setItem("accesToken",accestoken)
    return res
  })
  .catch(err=>{
    console.log(err)
  })
  }

    login = (form)=>{
    let loginFormError = false


    let sendLogin = {
      "username": form.login,
      "password": form.password,
    }
    fetch("http://localhost:8080/montanashop/login", {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'X-Requested-With': 'XMLHttpRequest',
      }, body:JSON.stringify(sendLogin)
    }
   ).then(response=>{

    if(response.status!==200){
      loginFormError = true;
      return response.json();
    }
    else{
      return response.json()
    }

   }).then(response=>{

    if(loginFormError){
      throw response
    }else{
      return response
    }
  }).then(response=>
    {
      localStorage.setItem('accesToken', response["acces-token"]);
      localStorage.setItem('refreshtoken', response["refreshtoken"]);
      return fetch("http://localhost:8080/montanashop/login-page",{
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Access-Control-Allow-Origin': '*',
          'Authorization': "Bearer "+localStorage.getItem('accesToken')
        }, 
      }).then(
        res=>{
          if(res.status===200){
            return res.json()

          }

        }
      )
      .then(res=>{
        localStorage.setItem("in","1")

      
        this.getShoppibngCartQuantity()
        this.getCategoryProduct()
        if(res["role-user"]==="[ROLE_USER]"){
          localStorage.setItem("role","1")
        }else if(res["role-user"]==="[ROLE_ADMIN]"){  
          localStorage.setItem("role","2")
        }

        this.setState({
          logIn:1,
          roleUser:res["role-user"]
        })
      })
      }
  )
      
      .catch(err=>{
        this.validFormAfterBackend(form,err)
      })
  }
 
  getCategoryProduct = ()=>{
    let jwt = localStorage.getItem("accesToken")
    fetch("http://localhost:8080/montanashop/category/all", {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization':"Bearer " +jwt 
      },
    }).then(res=>{
      if(res.status!==200){
        if(res.status===401){
          this.unauthorized().then(res=>{
            if(res.status===200){
              this.getCategoryProduct();
            }else{
              throw res
            }
          })
      }else{
        throw res
      }}else{
        return res.json()
      }
    }).then(res=>{
      Object.assign({}, this.state.form["productForm"].categorySelect = res)
      Object.assign({}, this.state.form["filtersProductForm"].categorySelect = res)
      Object.assign({}, this.state.form["productForm"].category = res[0].id)
    
    }).catch(err=>{
        console.log(err)
      })    
  }

  getShoppibngCartQuantity = ()=>{
    const jwt = localStorage.getItem("accesToken")

    fetch("http://localhost:8080/montanashop/positionshopping/quantity-by-shoppingcart",{
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization':"Bearer " +jwt 
      }}).then(
        response =>{
          return response
        }
      ).then(response =>{
        if(response.status===401){
          this.unauthorized().then(res=>{
            if(res.status===200){
              this.getShoppibngCartQuantity(); 
            }else{
              throw res
            }
          })
        }else{
          return response
        }
      } ).then(res=>{
        if(res.status===200){
          console.log(res.body)
          return res.json()
        }else{
          throw res;
        }
      }).then(res=>{
        const copyLinks = this.state.linksLogIn[4];
        let addCart = res 
        copyLinks.title = <i class="fas fa-shopping-cart">{" " + addCart}</i>     
        this.setState({
          addShoppingCart:addCart,
          links:copyLinks
        })
        
        
      }).catch(err=>{
        console.log(err)
      })
  }
  



  
  addProduct = (concreteForm)=>{
    const jwt = localStorage.getItem("accesToken")
      const filePhoto = document.querySelector("#"+concreteForm.nameForm).querySelector('input[type="file"]');
      let product = JSON.stringify({
        "name":concreteForm.name,                                                                                                                           
        "price":concreteForm.price,
        "quantity":concreteForm.quantity,
        "productDescription":concreteForm.productDescription,
      })
      console.log(concreteForm.category)
      let data = new FormData()
      console.log( filePhoto.files[0])
      
      data.append("product", product)
      data.append("idCategory", concreteForm.category)
      data.append("file", filePhoto.files[0])



      fetch("http://localhost:8080/montanashop/product/add", {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Access-Control-Allow-Origin': '*',
        'X-Requested-With': 'XMLHttpRequest',
        "Authorization":"Bearer "+jwt
      },body: data
    }).then(res => { return res }).then(
      res => {
        if(res.status!==200){
          if(res.status===401){
            this.unauthorized().then(res=>{
              if(res.status===200){
                this.addProduct();
              }else{
                throw res
              }
            })
        }else{
          throw res
        }}else{
          return res.json()
        }
      })
     .catch(err=>{
      console.log(err)
    })

  }

  register = (data) => {
    let registerFormError = false
    let sendData = {
      "username": data.login,
      "password": data.password,
      "email": data.email
    }



    fetch("http://localhost:8080/montanashop/register", {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify(sendData)
    }).then(response => { return response }).then(
      response => {
        if (response.status === 201 && response.ok){
          registerFormError = false
          return response.json()
        }
        else{      
          registerFormError=true
              
          return response.json()
        }
    }).then(response=>{

      if(registerFormError){
        throw response
      }else{
        return response
      }
    })
   
    .then(response => {
      let key = response.value;
      const link = "http://localhost:3000/confirm/:"
      this.setState({
        confirmKey: key
      })
      return (fetch("http://localhost:8080/montanashop/confirm", {
        method: "POST",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }, body: JSON.stringify({ link: link, key: key })

      })).then(res => {

      })
    }) .catch(err=>{
      this.validFormAfterBackend(data,err)
    })
  }


  // deleteData = (id) => {

  //   fetch(proxyurl + httpdelete + id, {
  //     method: 'DELETE',
  //     headers: {
  //       'Accept': 'application/json, text/plain, */*',
  //       'Content-type': 'application/json'
  //     },
  //   })
  // }

  handleInputChange = (e, concreteForm) => {
    console.log(concreteForm)
    let name = e.target.name;
    console.log(name)
    console.log(e.target.value)
    let currentForm = Object.assign({}, concreteForm[name] = e.target.value)
    console.log(currentForm)
    this.setState(
      prevState => {
        return ({ prevState: currentForm })
      })
  }
  validationForm = (form) => {
    const formInputHandler = [...document.querySelector("#" + form.nameForm).querySelectorAll(["input", "textarea"])];
    const regexEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[\!\@\#\$\%\^\&\*\(\)\_\+\-\=])(?=.*[A-Z])(?!.*\s).{8,}$/;
    for (const prop of Object.getOwnPropertyNames(form)) {
      if(prop!=="category" && prop!=="categorySelect"){
        console.log(form[prop])
      if (!(form[prop].length > 0)) {
        form[prop] = prop + " :to pole jest puste"
        formInputHandler.forEach(input => {
          if (input.name.includes(prop)) {
            input.dataset["error"] = "true"
            input.classList.toggle("input-error");
            if (input.type === "password") {
              input.type = "text";
            }
          }
        })
      } else if (form[prop].length > 50) {

        form[prop] = prop + " :to pole jest za długie"
        formInputHandler.forEach(input => {
          if (input.name.includes(prop)) {
            input.dataset["error"] = "true"
            input.classList.toggle("input-error");
            if (input.type === "password") {
              input.type = "text";
            }
          }
        })
      } else if (prop.includes("email")) {
        if (!RegExp(regexEmail).test(form[prop])) {
          formInputHandler.forEach(input => {
            if (input.type === "email") {
              input.dataset["error"] = "true"
              input.classList.toggle("input-error");
            }
          })

          form[prop] = "Nieprawidłowy adres email"
        }
      }
      else if (prop.includes("password")) {
        if (!RegExp(regexPassword).test(form[prop])) {

          formInputHandler.forEach(input => {
            if (input.type === "password") {
              input.type = "text"
              form[prop] = "Nieprawidłowe hasło"
              input.dataset["error"] = "true"
              input.classList.toggle("input-error");
            }
          })
        }

      
    }
  }}
    return (form)
  }

  handleInputClickForm = (e, concreteForm) => {
    if (e.target.dataset["error"] === "true") {
      const currentForm = Object.assign({}, concreteForm[e.target.name] = "")
      e.target.classList.toggle("input-error");

      e.target.dataset["error"] = "false"
      currentForm[e.target.name] = ""

      if (e.target.name.includes("password")) {
        e.target.type = "password"
      }
      this.setState({ currentForm })
    }
  }
  handleSubmitForm = (e, concreteForm, sendMethod, action, id) => {
    e.preventDefault();
    const formAfterValid = Object.assign({}, concreteForm)
    const formValid = this.validationForm(concreteForm);

    if (JSON.stringify(formValid) === JSON.stringify(formAfterValid)) {
      if(formValid.nameForm ==="registerForm")
      this.register(formValid)
      else if(formValid.nameForm ==="loginForm"){
        this.login(formValid)
      }else if(formValid.nameForm ==="productForm" && !action){
        this.addProduct(formValid)
      }
      else if(formValid.nameForm ==="productForm" && action==="edit"){
          sendMethod(formValid, id)

      }
      else if(formValid.nameForm ==="contactForm"){
        sendMethod(formValid)

      }

      for (const prop of Object.getOwnPropertyNames(concreteForm)) {
        if (formValid[prop] !== formValid.nameForm &&formValid[prop]!==formValid.categorySelect) {
          formValid[prop] = ""
        }
      }
      this.setState(
        prevState => {
          return ({ prevState: formValid })
        })
    } else {
      this.setState(
        prevState => {
          return ({ prevState: formValid })

        })
    }
  }

  

  handlePasswordPrompt = () => {
    const handlePasswordPrompt = document.querySelector(".password-prompt")
    handlePasswordPrompt.classList.toggle("password-prompt-active")
  }
  checkLogIn = ()=>{
   if(localStorage.getItem("in")==="1" && localStorage.getItem("role")==="2"){
      console.log("Xdd")
     this.setState({
       logIn: 1,
       roleUser:"[ROLE_ADMIN]"
     })
   }
   else if(localStorage.getItem("in")==="1" && localStorage.getItem("role")==="1"){
    this.setState({
      logIn: 1,
      roleUser:"[ROLE_USER]"

    })
  }
   else {
    this.setState({
      logIn: 2
    })
   }

  }

  shopingCartHandler = (product, id)=>{
    const copyLinks = this.state.linksLogIn[4];
    let addCart = this.state.addShoppingCart;
    addCart+=1
    copyLinks.title = <i class="fas fa-shopping-cart">{" " + addCart}</i>
   
    const jwt = localStorage.getItem("accesToken")  

    

    fetch( "http://localhost:8080/montanashop/positionshopping/add",{
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': "*",
      'X-Requested-With': 'XMLHttpRequest',
      "Authorization":"Bearer "+jwt
    },
    body: JSON.stringify(product)
  }).then(res=>{
        console.log(res)
        if(res.status===201){
          return res
        }
        else{
          if(res.status===401){
            this.unauthorized().then(res=>{
              if(res.status===200){
                this.shopingCartHandler(id); 
              }else{
                throw res
              }
            })
          }
        }
      }).then(res=>{
          return res.json()
        
      }).catch(err=>{
        console.log(err)
      })


      .then(res=>{    
        this.setState({
          products:res,
        })
      })
      
    this.setState({
      addShoppingCart:addCart,
      links:copyLinks
    })
  }

 


  componentDidMount() {
    this.checkLogIn()
    this.getShoppibngCartQuantity()
    this.getCategoryProduct()
    // this.getShoppibngCartQuantity()
    // this.downloadData();
    // this.addData();
    // this.deleteData(1);
  }

  render() {

    console.log(this.state.logIn +" "+ this.roleUser)
    return (
      <Router>
        <div className="App">
          <header>
            {
              <Header
              logout={this.logout}
              logIn={this.state.logIn}
              addShoppingCart={this.state.addShoppingCart}

              links= {this.state.logIn===1 && this.state.roleUser==="[ROLE_USER]"?this.state.linksLogIn
              :this.state.logIn===1 && this.state.roleUser==="[ROLE_ADMIN]"?this.state.linksLogAdmin:this.state.linksLogOut}
              />
            }
          </header>
          
          <main>
            <section>
              {
                <Page
                  products={this.state.products}
                  shopingCartHandler={this.shopingCartHandler}
                  contactForm={this.state.form["contactForm"]}
                  formInputChange={this.handleInputChange}
                  registerForm={this.state.form["registerForm"]}
                  updateForm={this.state.form["updateForm"]}
                  loginForm={this.state.form["loginForm"]}
                  productForm={this.state.form["productForm"]}
                  filtersProductForm={this.state.form["filtersProductForm"]}
                  handleSubmitForm={this.handleSubmitForm}
                  handleInputClickForm={this.handleInputClickForm}
                  handlePasswordPrompt={this.handlePasswordPrompt}
                  activateAccount={this.confirmAccount}
                  getAllProducts={this.getAllProducts}
                  logIn={this.state.logIn}
                  unauthorized={this.unauthorized}
                  logout={this.logout}
                  getShoppibngCartQuantity = {this.getShoppibngCartQuantity}
                  addShoppingCart={this.state.addShoppingCart}
                  role = {this.state.roleUser}
                  

               
                  links={this.state.logIn===1?this.state.linksLogIn
                    :this.state.Login===2?this.state.linksLogOut:this.state.linksLogOut}

                />
              }
            </section>
          </main>
          <footer>{<Footer />}</footer>
        </div>
      </Router>

    );
  }
}

export default App;
