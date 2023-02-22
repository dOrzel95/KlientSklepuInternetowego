import React from "react";
const tableSocialMedia = [
  {
    id: 0,
    title: "Faacebook",
    icon: (
      <i class="fab fa-facebook-square">
        <a href="https://webwavecms.com/blog/co-umiescic-w-stopce-strony-www"></a>
      </i>
    )
  },
  {
    id: 1,
    title: "Instagram",
    icon: (
      <i class="fab fa-instagram">
        <a href="https://webwavecms.com/blog/co-umiescic-w-stopce-strony-www"></a>
      </i>
    )
  },
  {
    id: 2,
    title: "Github",
    icon: (
      <i class="fab fa-github">
        <a href="https://webwavecms.com/blog/co-umiescic-w-stopce-strony-www"></a>
      </i>
    )
  }
];

const tableDataPerson = [
  {
    id: 0,
    title: "Imie",
    value: "Damian"
  },
  {
    id: 1,
    title: "Nazwisko",
    value: "Orzeł"
  },
  {
    id: 2,
    title: "Telefon",
    value: "796092136"
  }
];
const Footer = () => {
  // const data =
  const socialMedia = tableSocialMedia.map(social => (
    <li key={social.id}>{social.icon}</li>
  ));
  const dataPerson = tableDataPerson.map(data => (
    <li key={data.id}>
      {data.title}
      {" : "}
      {<strong>{data.value}</strong>}
    </li>
  ));
  // const special =

  return (
    <div className="information-footer">
      <div className="data">
        <h3>Dane właściciela</h3>
        <ul className="ul-data">{dataPerson}</ul>
      </div>
      <div className="social-media">
        <h3>Media społecznościwe</h3>
        <ul className="ul-social-media">{socialMedia}</ul>
      </div>
    </div>
  );
};

export default Footer;
