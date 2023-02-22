import React, { Component } from 'react';
import Select from 'react-select'
import "../styles/AddProduct.css";
const AddProduct = (props) => {
    const form = props.productForm;
    const category = [...form.categorySelect ];
    let options = category.map((option,index)=>(
    <option key={index} value={option.id}>{option.name}</option>
    ))

     return (
    <div className="addproduct">
      <h3>Dodaj produkt</h3>
      <form id={form.nameForm}
        className="form"
        onSubmit={(e) => props.handleSubmitForm(e, form)
        
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
        Dodaj
        </button>
      </form>
    </div >
  );
}
 
export default AddProduct;