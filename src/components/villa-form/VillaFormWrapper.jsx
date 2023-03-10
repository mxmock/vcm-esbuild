import React from "react";
import Modal from "../Modal";
import VillaForm from "./VillaForm";
import StatusPopup from "./StatusPopup";
import store from "../../redux/store.js";
import { useSelector } from "react-redux";
import villasData from "../../data/villas.data.json";
import { clearStatus } from "../../redux/villa-form/villa-form.slice";

const VillaFormWrapper = ({ data }) => {
  const handleFullscreen = (x, y) => {
    setModalPosition((prev) => (!prev && !!x && !!y ? { x, y } : null));
  };

  const [villa, setVilla] = React.useState(null);
  const [nbrOfPersons, setNbrOfPersons] = React.useState(0);
  const [modalPosition, setModalPosition] = React.useState(null);

  const form = useSelector((store) => store.villaFormReducer);

  React.useEffect(() => {
    if (!villasData || !data) return;
    const villa = villasData.find((v) => v.id === data.id);
    setVilla(villa);
    setNbrOfPersons(villa.features.find((f) => f.labelENG.includes("persons")).value);
  }, [villasData, data]);

  return (
    <>
      <StatusPopup
        form={form}
        onClose={() => {
          closeModal();
          if (!form.success) return;
          handleFullscreen();
        }}
      />
      {!!modalPosition && !!villa && (
        <Modal
          position={modalPosition}
          onClose={handleFullscreen}
        >
          <VillaForm
            form={form}
            villa={villa}
            inModal={true}
            nbrOfPersons={nbrOfPersons}
            onFullscreen={handleFullscreen}
          />
        </Modal>
      )}
      {!modalPosition && !!villa && (
        <VillaForm
          form={form}
          villa={villa}
          nbrOfPersons={nbrOfPersons}
          onFullscreen={handleFullscreen}
        />
      )}
    </>
  );
};

const dispatch = store.dispatch;

const closeModal = () => {
  dispatch(clearStatus());
};

export default VillaFormWrapper;
