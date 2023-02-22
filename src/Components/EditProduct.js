import React, { Component } from 'react';
import "../styles/AddProduct.css";
const EditProduct = (props, RouteComponentProps) => {
    const form = props.productForm;
    console.log(RouteComponentProps)
    const category = [...form.categorySelect ];
    let options = category.map((option,index)=>(
    <option key={index} value={option.id}>{option.name}</option>
    ))
        
    const editProduct = (form,id)=>{
        const jwt = localStorage.getItem("accesToken")
      const filePhoto = document.querySelector("#"+form.nameForm).querySelector('input[type="file"]');
      let product = JSON.stringify({
        "name":form.name,                                                                                                                           
        "price":form.price,
        "quantity":form.quantity,
        "productDescription":form.productDescription,
      })
      console.log(form.category)
      let data = new FormData()
      console.log( filePhoto.files[0])
      console.log(id)
      
      data.append("idp", id)
      data.append("product", product)
      data.append("idCategory", form.category)
      data.append("file", filePhoto.files[0])
          fetch( `http://localhost:8080/montanashop/product/update`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Access-Control-Allow-Origin': '*',
                'X-Requested-With': 'XMLHttpRequest',
                "Authorization":"Bearer "+jwt
              },body: data
          }).then(
              res =>{
                console.log(res)
                if(res.status!==200){
                  if(res.status===401){
                    props.unauthorized().then(res=>{
                      if(res.status===200){
                        editProduct()
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
    <div className="addproduct">
      <h3>Edytuj produkt</h3>
      <form id={form.nameForm}
        className="form"
        onSubmit={(e) => props.handleSubmitForm(e, form, editProduct, "edit", props.id)
        
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
        className="input-name"
        name="category"
        value={form.category}
        placeholder="Kategoria"
        onChange={(e) =>
        props.formInputChange(e, form)}
        data-error={"false"}
      >
        
        {options}
      </select>
            <input
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
      />

        <input className="input-photo"
        onChange={(e) =>
          props.formInputChange(e, form)
        }
        onClick={
          (e) => {
            props.handleInputClickForm(e, form)
          }
        }
        type="file"
        name="photo"
        placeholder="Zdjęcie"
        value={form.photo}
        data-error={"false"}

      />
      
      <textarea
        onChange={(e) =>
          props.formInputChange(e, form)
        }
        // onClick={
        //   (e) => {
        //     props.handleInputClickForm(e, form)
        //   }
        // }
        className="textarea-content"
        type="text"
        name="productDescription"
        placeholder="Opis produktu"
        value={form.productDescription}
        data-error={"false"}
      />
      <button className="send-button">
        Edytuj
        </button>
      </form>
    </div >
  );
}
 
export default EditProduct;