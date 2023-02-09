import React from "react";
import Icon from "./Icon";
import Feature from "./Feature";
import URL from "../constants/api-url.const";
import carsData from "../data/cars.data.json";

const CARS = carsData;
const LINK_DESCRIPTION = `Lien vers la voiture`;
const IMG_DESCRIPTION = `Photo principale de la voiture`;
const SLIDER_DIRECTION = { RIGHT: 1, LEFT: -1, STOP: 0 };

const CarsList = () => {
  const carsList = React.useRef(null);

  const moveSlider = (slider, direction) => {
    const { scrollWidth, scrollLeft, clientWidth } = slider;
    const maxScroll = scrollLeft + clientWidth;
    if (maxScroll >= scrollWidth) setSliderDirection(SLIDER_DIRECTION.LEFT);
    if (scrollLeft <= 0) setSliderDirection(SLIDER_DIRECTION.RIGHT);
    carsList.current.scrollLeft += 316 * direction;
  };

  const getArrowsHtml = () => (
    <div className="slider__arrows">
      <div
        className={scrollPosition === 0 ? `hide` : ""}
        onClick={() => moveSlider(carsList.current, SLIDER_DIRECTION.LEFT)}
      >
        <Icon name="chevron-left-outline" />
      </div>
      <div
        className={scrollPosition === maxScroll ? `hide` : ""}
        onClick={() => moveSlider(carsList.current, SLIDER_DIRECTION.RIGHT)}
      >
        <Icon name="chevron-right-outline" />
      </div>
    </div>
  );

  const [maxScroll, setMaxScroll] = React.useState(0);
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [sliderDirection, setSliderDirection] = React.useState(
    SLIDER_DIRECTION.RIGHT
  );

  // const [clearInterval, startInverval] = useInterval(
  //   () => moveSlider(carsList.current, sliderDirection),
  //   2000,
  //   sliderDirection
  // );

  React.useEffect(() => {
    if (!carsList?.current?.clientWidth) return;
    const { scrollWidth, clientWidth } = carsList.current;
    setMaxScroll(scrollWidth - clientWidth);
  }, [carsList.current?.clientWidth]);

  return (
    <div className="slider">
      <ul
        ref={carsList}
        className="cars-list"
        // onMouseEnter={() => clearInterval()}
        // onMouseLeave={() => startInverval()}
        onScroll={(e) => setScrollPosition(e.target.scrollLeft)}
      >
        {CARS.map((car) => (
          <li key={car.id}>
            <article className="cars-list__article">
              <div className="cars-list__image">{getImageHtml(car)}</div>
              <div className="cars-list__card">{getCardHtml(car)}</div>
            </article>
          </li>
        ))}
      </ul>
      {getArrowsHtml()}
    </div>
  );
};

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
  return doc ? `${URL}/${doc.path}` : "";
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
