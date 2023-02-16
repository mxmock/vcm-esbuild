import React from "react";
import Card from "./Card";
import Icon from "./Icon";
import Feature from "./Feature";
import villasData from "../data/villas.data.json";
import annexeData from "../data/annexe.data.json";

const byCat = (f, category) => f.category === category;

const mapFeature = (f) => ({
  id: f.id,
  icon: f.icon,
  value: f.value,
  labelFR: f.labelFR,
});

const mapRoom = (room) => {
  const beds = Object.keys(room).reduce(
    (arr, key) =>
      key.includes("bed") && !!room[key] ? [...arr, room[key]] : [...arr],
    []
  );
  return {
    beds,
    id: room.id,
    wc: room.wc,
    label: room.labelFR,
    bathroom: room.bathroom,
    pictures: room.documents,
    convertible: room.convertible,
  };
};

const initFeatures = {
  rooms: [],
  stuff: [],
  around: [],
  services: [],
  globalView: [],
  additionnals: [],
  mainFeatures: [],
};

const VillaDetails = ({ data }) => {
  const [villa, setVilla] = React.useState(null);
  const [
    { rooms, stuff, around, services, globalView, mainFeatures, additionnals },
    setFeatures,
  ] = React.useState(initFeatures);

  React.useEffect(() => {
    if (!villasData || !data?.id) return;
    const villa = villasData.find((v) => v.id === data.id);
    setVilla(villa);
    setFeatures({
      rooms: [...villa.rooms, annexeData].map(mapRoom),
      stuff: villa.features.filter((f) => byCat(f, 2)).map(mapFeature),
      around: villa.features.filter((f) => byCat(f, 5)).map(mapFeature),
      services: villa.features.filter((f) => byCat(f, 3)).map(mapFeature),
      globalView: villa.features.filter((f) => byCat(f, 1)).map(mapFeature),
      mainFeatures: villa.features.filter((f) => byCat(f, 6)).map(mapFeature),
      additionnals: villa.features.filter((f) => byCat(f, 4)).map(mapFeature),
    });

    console.log(villa);
  }, [villasData, annexeData, data]);

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

          <Card readMore="lire la suite" title={"Description"}>
            <div
              className="villa-details__text"
              dangerouslySetInnerHTML={{ __html: villa.descriptionFR }}
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

          <Card readMore="voir tous les équipements" title={"Équipement"}>
            <ul className="villa-details__columns">
              {stuff.map((f) => (
                <li key={f.id}>
                  <div className="villa-details__second-features">
                    <Icon name="sun-outline" />
                    <span>{f.labelFR}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Informations sur les chambres">
            <ul className="villa-details__columns">
              {rooms.map((r) => (
                <li key={r.id} className="villa-details__room">
                  <h4>{r.label ? r.label : "Chambre classique"}</h4>
                  <ul>
                    {r.beds.map((b, i) => (
                      <li key={i} className="villa-details__second-features">
                        <Icon name="bed-simple-outline" />
                        <span>Lit {b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="villa-details__second-features">
                    {r.convertible && (
                      <>
                        <Icon name="sofa-outline" />
                        <span>Canapé convertible</span>
                      </>
                    )}
                  </div>
                  <div className="villa-details__second-features">
                    {r.bathroom && (
                      <>
                        <Icon name="bath-outline" />
                        <span>Salle de bain</span>
                      </>
                    )}
                  </div>
                  <div className="villa-details__second-features">
                    {r.wc && (
                      <>
                        <Icon name="wc-outline" />
                        <span>WC privatif</span>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card readMore="voir tous les services" title={"Services inclus"}>
            <ul className="villa-details__columns">
              {services.map((f) => (
                <li key={f.id}>
                  <div className="villa-details__second-features">
                    <Icon name="sun-outline" />
                    <span>{f.labelFR}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card title={"Services supplémentaires"}>
            <ul className="villa-details__columns">
              {additionnals.map((f) => (
                <li key={f.id}>
                  <div className="villa-details__second-features">
                    <Icon name="sun-outline" />
                    <span>{f.labelFR}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card title={"Aux alentours"}>
            <ul className="villa-details__columns">
              {around.map((f) => (
                <li key={f.id}>
                  <div className="villa-details__second-features">
                    <Icon name="sun-outline" />
                    <span>{f.labelFR}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    </>
  );
};

export default VillaDetails;
