import React from "react";
import Feature from "./Feature";
import URL from "../constants/api-url.const";
import villasData from "../data/villas.data.json";

const LINK_DESCRIPTION = `Lien vers la villa`;
const IMG_DESCRIPTION = `Photo principale de la villa`;

const villas = villasData.sort((a, b) => a.listOrder - b.listOrder);

const VillasList = () => (
  <ul className="villas-list">
    {villas.map((villa, index) => (
      <li key={villa.id}>
        <article className="villas-list__article">
          <div className="villas-list__image">{getImageHtml(villa, index)}</div>
          {<div className="villas-list__card">{getCardHtml(villa)}</div>}
        </article>
      </li>
    ))}
  </ul>
);

const getImageHtml = (villa, index) => {
  const mainImage = getMainImg(villa);
  return (
    <a
      href={`./villas/${villa.id}.html`}
      title={`${LINK_DESCRIPTION} ${villa.name}`}
    >
      <div className="adaptive-img-cover">
        <img
          loading={index >= 2 ? "lazy" : "eager"}
          decoding="async"
          src={
            "https://furansujapon.com/wp-content/uploads/2022/09/Great-Teacher-Onizuka.jpg"
          }
          srcSet={`${mainImage} 480w, ${mainImage} 1000w`}
          sizes="50vw"
          alt={`${IMG_DESCRIPTION} ${villa.name}`}
          title={`${IMG_DESCRIPTION} ${villa.name}`}
        />
      </div>
    </a>
  );
};

const getMainImg = (villa) => {
  const f = (d) => d.name.includes("ext_1") || d.name.includes("debordement");
  const doc = villa.documents.find(f);
  return doc ? `${URL}/${doc.path}` : "";
};

const getCardHtml = (villa) => (
  <>
    <div className="villas-list__title">
      <h2>{villa.name}</h2>
    </div>

    <ul className="villas-list__features">
      {getFeaturesHtml(villa.features.filter((f) => f.showOnHome))}
    </ul>

    <div className="villas-list__footer">
      <div className="villas-list__price">
        <span>à partir de</span>
        <span>{villa.price}€</span>
        <span>par nuit</span>
      </div>

      <div className="villas-list__btn">
        <a
          className="button"
          href={`./villas/${villa.id}.html`}
          title={`${LINK_DESCRIPTION} ${villa.name}`}
        >
          <span>Détails</span>
        </a>
      </div>
    </div>
  </>
);

const getFeaturesHtml = (features) =>
  features.map((f) => (
    <li key={f.id}>
      <Feature feature={f} />
    </li>
  ));

export default VillasList;
