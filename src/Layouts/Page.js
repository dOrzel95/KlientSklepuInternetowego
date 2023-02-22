import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "../Components/HomePage";
import Ofert from "../Components/Ofert";
import ShoppingCart from "../Components/ShoppingCart";
import Contact from "../Components/Contact";
import Register from "../Components/Register";
import Confirm from "../Components/Confirm"
import Login from "../Components/Login"
import AddProduct from "../Components/AddProduct"
import Users from "../Components/Users";
import Settings from "../Components/Settings";
import UsersOfert from "../Components/UsersOfert"
import EditProduct from "../Components/EditProduct";



const Page = props => {
  return (
    <>
      <Switch>
        <Route exact path="/" render={()=>{
         
          
          return props.logIn===1?(<HomePage  getAllProducts={props.getAllProducts}/>):props.logIn===2?(<Redirect to = "/login"/>):""
        }} />
        <Route
          path="/ofert"
          render={() =>{ return props.logIn===1?(
            <Ofert products={props.products} shopingCartHandler={props.shopingCartHandler} getAllProducts={props.getAllProducts} links={props.links}
            filtersProductForm={props.filtersProductForm}
            formInputChange={props.formInputChange}
            // handleSubmitForm={props.handleSubmitForm}
            handleInputClickForm={props.handleInputClickForm} 
            role={props.role}
            
            />
          ):(
            <Redirect to = "/login"/>
          )}}
        />
        <Route
          path="/shopping-cart"
          render={() => { return props.logIn===1?(<ShoppingCart  unauthorized={props.unauthorized} shopingCartHandler={props.shopingCartHandler} getShoppibngCartQuantity={props.getShoppibngCartQuantity}
            addShoppingCart={props.addShoppingCart}

          />):(
            <Redirect to = "/login"/>
          )}}
        />
         <Route
          path="/users"
          render={() => { return props.logIn===1?(<Users  unauthorized={props.unauthorized}
          />):(
            <Redirect to = "/login"/>
          )}}
        />

        <Route
          path="/contact"
          render={() => {return props.logIn===1?(
            <Contact
              contactForm={props.contactForm}
              formInputChange={props.formInputChange}
              handleSubmitForm={props.handleSubmitForm}
              handleInputClickForm={props.handleInputClickForm}
              unauthorized={props.unauthorized}
            />
          ):(
            <Redirect to = "/login"/>
          )}}
        />

        <Route
          path="/register"
          render={() => {

            return props.logIn===2||0?(
              <Register
                registerForm={props.registerForm}
                formInputChange={props.formInputChange}
                handleSubmitForm={props.handleSubmitForm}
                handleInputClickForm={props.handleInputClickForm}
                handlePasswordPrompt={props.handlePasswordPrompt}
              />
            ):props.logIn===1?(
              <Redirect to = "/"/>
            ):""
          }}
        />
        <Route exact path={"/confirm/:id"} component={Confirm} />
        <Route path="/login" render={() => {
             return props.logIn===2?(
           
            <Login
              loginForm={props.loginForm}
              login={props.login}
              formInputChange={props.formInputChange}
              handleSubmitForm={props.handleSubmitForm}
              handleInputClickForm={props.handleInputClickForm}
              handlePasswordPrompt={props.handlePasswordPrompt} 
              logIn={props.logIn}
              logout={props.logout}
              />
              ):props.logIn===1?(
                <Redirect to = "/"/>
              ):""
        }} />
           <Route
              path="/logout" render={()=>{
                return(<Redirect to = "/login"/>)}}  
                />
         <Route
              path="/addproduct" render={() => {return props.logIn===1?(
                <AddProduct
                  productForm={props.productForm}
                  formInputChange={props.formInputChange}
                  handleSubmitForm={props.handleSubmitForm}
                  handleInputClickForm={props.handleInputClickForm}
                />
              ):(
                <Redirect to = "/login"/>
              )}}/>
               <Route
                path="/settings" render={() => {return props.logIn===1?(
                <Settings
                  updateForm={props.registerForm}
                  formInputChange={props.formInputChange}
                  handleSubmitForm={props.handleSubmitForm}
                  handleInputClickForm={props.handleInputClickForm}
                  handlePasswordPrompt={props.handlePasswordPrompt}
                  logout={props.logout}
                  unauthorized={props.unauthorized}
                />
              ):(
                <Redirect to = "/login"/>
              )}}/>

              <Route
              path="/addproduct" render={() => {return props.logIn===1?(
                <AddProduct
                  productForm={props.productForm}
                  formInputChange={props.formInputChange}
                  handleSubmitForm={props.handleSubmitForm}
                  handleInputClickForm={props.handleInputClickForm}
                />
              ):(
                <Redirect to = "/login"/>
              )}}/>
                      <Route
          path="/my-products"
          render={() =>{ return props.logIn===1?(
            <UsersOfert products={props.products} shopingCartHandler={props.shopingCartHandler} getAllProducts={props.getAllProducts} links={props.links}
            filtersProductForm={props.filtersProductForm}
            formInputChange={props.formInputChange}
            handleSubmitForm={props.handleSubmitForm}
            handleInputClickForm={props.handleInputClickForm} 
            role={props.role}
            userProduct={true}
            />
          ):(
            <Redirect to = "/login"/>
          )}}
        />
         <Route
              path="/edit-product/:id" render={(match) => {
                return props.logIn===1?(
                <EditProduct
                  productForm={props.productForm}
                  formInputChange={props.formInputChange}
                  handleSubmitForm={props.handleSubmitForm}
                  handleInputClickForm={props.handleInputClickForm}
                  id={match.match.params.id}
                />
              ):(
                <Redirect to = "/login"/>
              )}}/>



      </Switch>
    </>

  );
};

export default Page;
