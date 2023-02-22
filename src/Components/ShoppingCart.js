import React, { useState, useEffect } from "react";
import "../styles/ShoppingCart.css";
const ShoppingCart = props => {
 
 
  const [products, setShopngCart] = useState([]);

  const productInShoppingCart = products.map((product, index) => (
    <li key={index}>
      <h3>{product.name}</h3>

      <img src={product.photo} alt="" />
      <h3 className="quantity">Ilość:{" " + product.quantity}</h3>
      <h4>{"cana:"+ product.price +" zł"}</h4>
    </li>
  ));

  const deleteProductByShoppingCart = ()=>{
    const jwt = localStorage.getItem("accesToken")  
    fetch("http://localhost:8080/montanashop/positionshopping/delete-all",{
        method: 'DELETE',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods' : 'DELETE',
          'Authorization':"Bearer " +jwt 
        }}).then(res =>{
          console.log(res)
          if(res.status!==200){
            if(res.status===401){
              this.unauthorized().then(res=>{
                if(res.status===200){
                  this.deleteProductByShoppingCart();
                }else{
                  throw res
                }
              })
          }else{
            throw res
          }}else{
            fetchSchopingCart()
          }}).catch(err=>{
            console.log(err)
          })
  }

  const fetchSchopingCart = ()=>{
    const jwt = localStorage.getItem("accesToken")  
    
    fetch(  "http://localhost:8080/montanashop/positionshopping/all-by-shoppingcart",{
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

        console.log(response)
        if(response.status===401){
          props.unauthorized().then(res=>{
            if(res.status===200){
              this.fetchSchopingCart(); 
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
        props.getShoppibngCartQuantity()
     
       setShopngCart(res)
      }).catch(err=>{
        console.log(err)
      })
  }

  const cleanSchopingCart = ()=>{
    console.log(products)

    const productList = {prodycts:products}
    console.log(JSON.stringify(productList))
    const jwt = localStorage.getItem("accesToken")  
    fetch(  "http://localhost:8080/montanashop/product/update-all",{
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization':"Bearer " +jwt 
      }, body:JSON.stringify(products)
    
    }).then(
        res =>{

          console.log(res)
          if(res.status!==201){
            if(res.status===401){
              this.unauthorized().then(res=>{
                if(res.status===200){
                  this.cleanSchopingCart()
                }else{
                  throw res
                }
              })
          }else{
            throw res
          }}else{
            deleteProductByShoppingCart()
            props.getShoppibngCartQuantity()
          }})
  }
  
  

  useEffect(
    fetchSchopingCart
    ,[]
  )
  return props.addShoppingCart>0?
  (
    <div className="shopping-cart">
      <ul className="ul-shopping-cart">{productInShoppingCart}</ul>
      <button className="btn-buy" onClick={()=>{
             deleteProductByShoppingCart()
            }}>Kup rpodukty</button>
          <button className="btn-delete"  onClick={()=>{
             cleanSchopingCart()}}>Wyczyść koszyk</button>
    </div>
  ):(
    <div className="shopping-cart">
      <h3>Brak produktow w koszyku</h3>
    </div>
  )
};

export default ShoppingCart;
