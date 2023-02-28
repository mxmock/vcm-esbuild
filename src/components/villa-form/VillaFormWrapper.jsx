import React from "react";
import Modal from "../Modal";
import VillaForm from "./VillaForm";
import villasData from "../../data/villas.data.json";

const VillaFormWrapper = ({ data }) => {
  const handleFullscreen = (x, y) => {
    setModalPosition((prev) => (!!prev ? null : { x, y }));
  };

  const [villa, setVilla] = React.useState(null);
  const [nbrOfPersons, setNbrOfPersons] = React.useState(0);
  const [modalPosition, setModalPosition] = React.useState(null);

  React.useEffect(() => {
    if (!villasData || !data) return;
    const villa = villasData.find((v) => v.id === data.id);
    setVilla(villa);
    setNbrOfPersons(villa.features.find((f) => f.labelENG.includes("persons")).value);
  }, [villasData, data]);

  return (
    <>
      {!!modalPosition && !!villa && (
        <Modal
          position={modalPosition}
          onClose={handleFullscreen}
        >
          <VillaForm
            villa={villa}
            inModal={true}
            nbrOfPersons={nbrOfPersons}
            onFullscreen={handleFullscreen}
          />
        </Modal>
      )}
      {villa && (
        <VillaForm
          villa={villa}
          nbrOfPersons={nbrOfPersons}
          onFullscreen={handleFullscreen}
        />
      )}
    </>
  );
};

export default VillaFormWrapper;
