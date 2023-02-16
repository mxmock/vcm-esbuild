import React from "react";
import villasData from "../data/villas.data.json";
import Card from "./Card";
import Feature from "./Feature";

const VillaDetails = ({ data }) => {
  const [villa, setVilla] = React.useState(null);
  const [mainFeatures, setMainFeatures] = React.useState([]);

  React.useEffect(() => {
    if (!villasData || !data) return;
    const villa = villasData.find((v) => v.id === data.id);
    setVilla(villa);
    setMainFeatures(
      villa.features
        .filter((f) => !!f.icon)
        .map((f) => ({
          id: f.id,
          icon: f.icon,
          value: f.value,
          labelFR: f.labelFR,
        }))
    );
    console.log(villa);
  }, [villasData, data]);

  return (
    <>
      {villa && (
        <div className="villa-details">
          <ul className="villa-details__main-features">
            {mainFeatures.map((f) => (
              <li key={f.id}>
                <Feature feature={f} />
              </li>
            ))}
          </ul>

          <Card title={"Description"}>
            <div
              className="villa-details__text"
              dangerouslySetInnerHTML={{ __html: villa.descriptionFR }}
            ></div>
          </Card>
        </div>
      )}
    </>
  );
};

export default VillaDetails;
