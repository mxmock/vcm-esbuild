import React from "react";
import Modal from "./Modal";
import Slider from "./Slider";
import villasData from "../data/villas.data.json";
import { ASSETS_URL } from "../constants/api-url.const";

const getVilla = (villas, id) => villas.find((v) => v.id === id) || null;

const getImages = (id) =>
  getVilla(villasData, id)
    ?.documents?.sort((a, b) => b.type - a.type)
    ?.map(mapImage) || [];

const mapImage = (image) => {
  const toIgnore = `/images/`;
  const index = image.path.indexOf(toIgnore);
  const path = image.path.slice(index + toIgnore.length, image.path.length - 3);
  return {
    ...image,
    pathFull: `${ASSETS_URL}/c_scale,q_auto,w_1900/v1677858588/${path}webp`,
    pathLarge: `${ASSETS_URL}/c_scale,q_auto,w_992/v1677858588/${path}webp`,
    pathMedium: `${ASSETS_URL}/c_scale,q_auto,w_768/v1677858588/${path}webp`,
    pathSmall: `${ASSETS_URL}/c_scale,q_auto,w_600/v1677858588/${path}webp`,
  };
};

const VillaGallery = ({ data }) => {
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

  React.useEffect(() => {
    console.log(images);
    const test = mapImage(images[0]);

    console.log(test);
  }, [images]);

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
              src={selectedImg.pathFull}
              alt={selectedImg.description}
              title={selectedImg.description}
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
                sizes="80vw"
                decoding="async"
                src={i.pathFull}
                alt={i.description}
                title={i.description}
                loading={index >= 2 ? "lazy" : "eager"}
                srcSet={`${i.pathLarge} 992w, ${i.pathMedium} 768w, ${i.pathSmall} 600w`}
              />
            </div>
          </li>
        ))}
      </Slider>
    </>
  );
};

export default VillaGallery;
