import Slider from "./Slider";
import React, { useEffect } from "react";
import villasData from "../data/villas.data.json";
import { ASSETS_URL } from "../constants/api-url.const";

const getVilla = (villas, id) => villas.find((v) => v.id === id) || null;

const getImages = (id) =>
  getVilla(villasData, id)?.documents?.sort((a, b) => b.type - a.type) || [];

const VillaGallery = ({ data }) => {
  const images = getImages(data.id);

  // useEffect(() => {
  //   console.log(images);
  // }, [images]);

  return (
    <Slider>
      {images.map((i, index) => (
        <li className="gallery" key={i.id}>
          <div className="adaptive-img-cover gallery__image">
            <img
              decoding="async"
              alt={i.description}
              title={i.description}
              src={`${ASSETS_URL}/${i.path}`}
              loading={index >= 2 ? "lazy" : "eager"}
            />
          </div>
        </li>
      ))}
    </Slider>
  );
};

export default VillaGallery;
