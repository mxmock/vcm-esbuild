import React from "react";
import Modal from "../Modal";
import CarForm from "./CarForm";
import carsData from "../../data/cars.data.json";

const CarFormWrapper = ({ data }) => {
  const handleFullscreen = (x, y) => {
    setModalPosition((prev) => (!!prev ? null : { x, y }));
  };

  const [car, setCar] = React.useState(null);
  const [nbrOfPersons, setNbrOfPersons] = React.useState(0);
  const [modalPosition, setModalPosition] = React.useState(null);

  React.useEffect(() => {
    if (!carsData || !data) return;
    const car = carsData.find((v) => v.id === data.id);
    console.log(car);
    setCar(car);
    setNbrOfPersons(car.features.find((f) => f.labelENG.includes("Places")).value);
  }, [carsData, data]);

  return (
    <>
      {!!modalPosition && !!car && (
        <Modal
          position={modalPosition}
          onClose={handleFullscreen}
        >
          <CarForm
            car={car}
            inModal={true}
            nbrOfPersons={nbrOfPersons}
            onFullscreen={handleFullscreen}
          />
        </Modal>
      )}
      {car && (
        <CarForm
          car={car}
          nbrOfPersons={nbrOfPersons}
          onFullscreen={handleFullscreen}
        />
      )}
    </>
  );
};

export default CarFormWrapper;
