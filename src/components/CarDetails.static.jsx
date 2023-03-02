import React from "react";
import Card from "./Card";
import Icon from "./Icon";
import Feature from "./Feature";
import carsData from "../data/cars.data.json";

/* TODO: Refacto: same as VillaDetails component ? */

const CarDetails = ({ data }) => {
  const car = carsData.find((c) => c.id === data.id);

  console.log(car);

  const globalView = car.features.filter((f) => byCat(f, 3)).map(mapFeature);
  const mainFeatures = car.features.filter((f) => byCat(f, 6)).map(mapFeature);

  return (
    <div className="villa-details">
      <ul className="villa-details__main-features">
        {mainFeatures.map((f) => (
          <li key={f.id}>
            <Feature feature={f} />
          </li>
        ))}
      </ul>

      <Card
        readMore="lire la suite"
        title={"Description"}
      >
        <div
          className="villa-details__text"
          dangerouslySetInnerHTML={{ __html: car.descriptionFR }}
        ></div>
      </Card>

      <Card title="Vue d'ensemble">
        <ul className="villa-details__columns">
          {globalView.map((f) => (
            <li key={f.id}>
              <div className="villa-details__second-features">
                <Icon name="sun-outline" />
                <div>
                  <span>{f.labelFR}</span>
                  {f.value && (
                    <span>
                      : {f.value} (dont {f.value} privatifs)
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

const byCat = (f, category) => f.category === category;

const mapFeature = (f) => ({
  id: f.id,
  icon: f.icon,
  value: f.value,
  labelFR: f.labelFR,
});

export default CarDetails;
