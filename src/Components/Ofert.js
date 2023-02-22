import React, { useState, useEffect } from "react";
import "../styles/Ofert.css";
import { Prompt } from "react-router-dom";


const Ofert = (props) => {  
  const form = props.filtersProductForm;

const category = [...form.categorySelect ];
    let options = category.map((option,index)=>(
    <option key={index} value={option.id}>{option.name}</option>
    ))
    let partPath = "other-"
    const [products, setProductsByCategory] = useState([]);
    let link;
    if(props.userProduct){
      console.log("Xdd")
      partPath="user-"
    }
    if(form.category!=="" && form.name===""){
      link = `http://localhost:8080/montanashop/product/${partPath}all-by-category?id=${form.category}`}
    else if(form.category==="" && form.name!==""){
        link = `http://localhost:8080/montanashop/product/${partPath}all-by-name?name=${form.name}`
    }
    else if(form.category!=="" && form.name!==""){
      link = `http://localhost:8080/montanashop/product/${partPath}all-by-category-and-name?id=${form.category}&name=${form.name}`
    }
    else{
      link = `http://localhost:8080/montanashop/product/${partPath}all`
    }
    
    const fetchProducts = ()=>{
      const jwt = localStorage.getItem("accesToken")  
      fetch(link,{
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
            props.unauthorized().then(res=>{
              if(res.status===200){
                fetchProducts() 
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
            console.log(res)

            return res.json()
          }else{
            throw res;
          }
        }).then(res=>{    
          console.log(res)
  
          setProductsByCategory(res)
        }).catch(err=>{
          console.log(err)
        })
    }

    const deleteProduct = (id)=>{
      const jwt = localStorage.getItem("accesToken")
        fetch(  `http://localhost:8080/montanashop/product/delete?id=${id}`,{
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
                      deleteProduct()
                    }else{
                      throw res
                    }
                  })
              }else{
                throw res
              }}else{
                fetchProducts()
            }}).catch(e=>{
              console.log(e)
            })
        }
    
  
  
    useEffect(
      fetchProducts
      ,[]
    )  
    const oferts = products.map((product, index)=>{ return props.role==="[ROLE_USER]" &&!props.userProduct ?(
      <li key={index}>
      <h3>{product.name}</h3>
      <img src={product.photo} alt="" />
      <h4>{"cana:"+ product.price +" zł"}</h4>
      <h3 className="quantity">Ilość:{" " + product.quantity}</h3>
      
      <button className="btn-description">Zobacz opis</button>
      <button
       className="btn-add-product"
       onClick={() => 
        { 
          props.shopingCartHandler(product, product.id)}
       }
     >
       {"Dodaj do koszyka"}
     </button>
   </li>
   
  ):
  props.role==="[ROLE_ADMIN]"||props.userProduct?
  (
    <li key={index}>
    <h3>{product.name}</h3>
    <img src={product.photo} alt="" />
    <h4>{"cana:"+ product.price +" zł"}</h4>
    <h3 className="quantity">Ilość:{" " + product.quantity}</h3>
    
    <button className="btn-description">Edytuj</button>
    <button
     className="btn-add-product"
     onClick={() => 
      { 
        deleteProduct(product.id)
     }}
   >
     usuń
   </button>
 </li>
 
):""
})  
    return (
     
    <div className="oferta">
       <button className="btn-filters" onClick={()=>{
          let filters = document.querySelector(".oferta .form");
          filters.classList.toggle("active");
       }}>
        Filtry
        </button>   
      <form id={form.nameForm}
      className="form active"
      onSubmit={(e) => {
        e.preventDefault()
        fetchProducts()
      }
      }
    >
       <input
          type="text"
          name="name"
          placeholder="Nazwa produktu"
          onChange={(e) =>
          props.formInputChange(e, form)}
          onClick={
          (e) => {
          props.handleInputClickForm(e, form)
          }}
          data-error={"false"}
          value={form.name}/>
    <select
      onSelect={()=>{
        console.log("xx")
      }}
      className="input-name"
      name="category"
      value={form.category}
      placeholder="Kategoria"
      onChange={(e) =>
      props.formInputChange(e, form)}
      data-error={"false"}
    >
      <option value="">Wszystkie</option>
      {options}
    </select>
          {/* <input
          type="number"
          name="price"
          placeholder="Cena"
          onChange={(e) =>
          props.formInputChange(e, form)}
          onClick={
          (e) => {
          props.handleInputClickForm(e, form)
          }}
          data-error={"false"}
          value={form.price}/>                                                                                                                                                                                                                                                                                                                                                                                                                                      
    <input
      className="input-name"
      type="number"
      name="quantity"
      placeholder="ilość"
      onChange={(e) =>
        props.formInputChange(e, form)
      }
      onClick={
        (e) => {
          props.handleInputClickForm(e, form)
        }
      }
      data-error={"false"}
      value={form.quantity}
    /> */}
    <button className="send-button">
      Szukaj
      </button>
    </form>
      <ul className="ul-oferta">{oferts}</ul>
    </div>
    
  )

  
}




export default Ofert;
