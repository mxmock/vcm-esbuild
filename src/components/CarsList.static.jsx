import React from "react";
import Slider from "./Slider";
import Feature from "./Feature";
import carsData from "../data/cars.data.json";
import { ASSETS_URL } from "../constants/api-url.const";

const CARS = carsData;
const LINK_DESCRIPTION = `Lien vers la voiture`;
const IMG_DESCRIPTION = `Photo principale de la voiture`;

const CarsList = () => (
  <Slider>
    {CARS.map((car) => (
      <li key={car.id}>
        <article className="cars-list__article">
          <div className="cars-list__image">{getImageHtml(car)}</div>
          <div className="cars-list__card">{getCardHtml(car)}</div>
        </article>
      </li>
    ))}
  </Slider>
);

const getImageHtml = (car) => {
  const mainImage = getMainImg(car);
  return (
    <a
      href={`./cars/${car.id}.html`}
      title={`${LINK_DESCRIPTION} ${car.brand} ${car.model}`}
    >
      <div className="adaptive-img-cover">
        <img
          loading="lazy"
          decoding="async"
          src={mainImage}
          alt={`${IMG_DESCRIPTION} ${car.brand} ${car.model}`}
          title={`${IMG_DESCRIPTION} ${car.brand} ${car.model}`}
        />
      </div>
    </a>
  );
};

const getMainImg = (car) => {
  const filter = (d) => d.name.includes("avant_1");
  const doc = car.documents.find(filter);
  return doc ? `${ASSETS_URL}/${doc.path}` : "";
};

const getCardHtml = (car) => (
  <>
    <div className="cars-list__title">
      <h2>
        {car.brand} {car.model}
      </h2>
    </div>

    <ul className="cars-list__features">
      {getFeaturesHtml(car.features.filter((f) => f.showOnHome))}
    </ul>

    <div className="cars-list__footer">
      <div className="cars-list__price">
        <span>à partir de</span>
        <span>{car.price}€</span>
        <span>par jour</span>
      </div>

      <div className="cars-list__btn">
        <a
          className="button"
          href={`./cars/${car.id}.html`}
          title={`${LINK_DESCRIPTION} ${car.brand} ${car.model}`}
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

export default CarsList;
