import React from "react";
import "../styles/HomePage.css";

const HomePage = (props) => {
  return (
    <div className="home-page">
      <article>
        <h2 className="title-article">O NAS</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dolores
          illum adipisci aspernatur ut reiciendis odit, sed quas repellat magnam
          quia blanditiis eveniet corrupti in voluptates suscipit deserunt nihil
          quasi? Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Tenetur, voluptatibus ipsam. Tempora vitae dicta maxime delectus
          eaque? Architecto molestias, vero cumque impedit possimus quam quod
          perferendis minus ad. Possimus, laudantium?Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Mollitia molestias dolore pariatur
          nostrum at sint odit rerum perferendis! Dolorum unde dignissimos
          dolore labore fuga et dicta enim aliquam exercitationem. Aut. Lorem,
          ipsum dolor sit amet consectetur adipisicing elit. Fuga quia, eius
          aliquam laborum eum sed nesciunt aperiam ea qui quos doloremque
          ratione, neque, animi soluta facere a. Reprehenderit, aspernatur
          quibusdam?Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Error corporis, nisi consequatur labore quo aliquid culpa nostrum
          voluptatem veniam nam vero quaerat blanditiis repellendus quam quae,
          accusamus animi quibusdam dolorem. Lorem ipsum dolor, sit amet
          consectetur adipisicing elit. Sint quibusdam enim recusandae sunt quas
          omnis nesciunt? Atque provident voluptatum obcaecati suscipit
          blanditiis fugiat dolore, nesciunt corrupti. Quas vero molestiae
          laudantium.
        </p>
      </article>
      <button className="login-button" onClick={(e) =>{e.preventDefault();
        props.getAllProducts()}}>
                        ZalogujXXX
                    </button>
    </div>
  );
};

export default HomePage;
