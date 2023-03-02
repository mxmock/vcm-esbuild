import React from "react";
import Modal from "./Modal";
import Slider from "./Slider";
import carsData from "../data/cars.data.json";
import { ASSETS_URL } from "../constants/api-url.const";

/* TODO: Refacto: same as VillaGallery component */

const getCar = (cars, id) => cars.find((c) => c.id === id) || null;

const getImages = (id) => getCar(carsData, id)?.documents?.sort((a, b) => b.type - a.type) || [];

const CarGallery = ({ data }) => {
  const images = getImages(data.id);

  const unzoom = () => {
    setModalPosition(null);
    setSelectedImg(null);
  };

  const zoom = (image, x, y) => {
    setModalPosition({ x, y });
    setSelectedImg(image);
  };

  const [selectedImg, setSelectedImg] = React.useState(null);
  const [modalPosition, setModalPosition] = React.useState(null);

  return (
    <>
      {!!selectedImg && !!modalPosition && (
        <Modal
          onClose={unzoom}
          fullscreen={true}
          position={modalPosition}
        >
          <div
            onClick={() => unzoom()}
            className="adaptive-img-contain gallery__fullscreen"
          >
            <img
              decoding="async"
              loading={"eager"}
              alt={selectedImg.description}
              title={selectedImg.description}
              src={`${ASSETS_URL}${selectedImg.path}`}
            />
          </div>
        </Modal>
      )}

      <Slider>
        {images.map((i, index) => (
          <li
            key={i.id}
            className="gallery"
          >
            <div
              className="adaptive-img-cover gallery__image"
              onClick={(e) => zoom(i, e.clientX, e.clientY)}
            >
              <img
                decoding="async"
                alt={i.description}
                title={i.description}
                src={`${ASSETS_URL}${i.path}`}
                loading={index >= 2 ? "lazy" : "eager"}
              />
            </div>
          </li>
        ))}
      </Slider>
    </>
  );
};

export default CarGallery;
