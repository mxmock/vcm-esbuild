import React from "react";
import Icon from "../Icon";
import Input from "../Input";
import Radio from "../Radio";
import Select from "../Select";
import Textarea from "../Textarea";
import DateInput from "../DateInput";
import store from "../../redux/store.js";
import { useSelector } from "react-redux";
import { COUNTRIES, GENDERS } from "../../constants/form.const";
import { carBooking, carFormUpdate } from "../../redux/car-form/car-form.slice";

const CarForm = ({ car, nbrOfPersons, inModal, onFullscreen }) => {
  const form = useSelector((store) => store.carFormReducer);

  return (
    <>
      <div className={`car-form ${inModal ? "car-form--fullscreen" : ""}`}>
        <div
          className="car-form__header"
          onClick={(e) => onFullscreen(e.clientX, e.clientY)}
        >
          <h3>À partir de {car.price}€ par jour</h3>
          <div className="car-form__expand">
            <Icon name={`${inModal ? "close-outline" : "expand-outline"}`} />
          </div>
        </div>

        <form onSubmit={(e) => handleSubmit(e, form, car.id)}>
          <div className="car-form__fields">
            <div>
              <div className="car-form__infos">
                <span>
                  {car.brand} {car.model}
                </span>
                <div>
                  <span>{nbrOfPersons} personnes</span>
                </div>
              </div>

              <p>
                <span>Pour quelles dates ?</span>
              </p>

              <DateInput
                id="startDate"
                required={true}
                min={form.startDate}
                label="Date d'arrivée"
                value={form.startDate}
                onChange={(val) => updateForm("startDate", val)}
              />
              <DateInput
                id="endDate"
                required={true}
                min={form.startDate}
                value={form.endDate}
                label="Date de départ"
                onChange={(val) => updateForm("endDate", val)}
              />

              <p>
                <span>Pour qui ?</span>
              </p>

              <Radio
                name="civility"
                hideLabel={true}
                choices={GENDERS}
                checked={form.gender}
                onChange={(val) => updateForm("gender", val)}
              />

              <Input
                id="name"
                label="Nom"
                required={true}
                value={form.name}
                onChange={(val) => updateForm("name", val)}
              />
              <Input
                label="Prénom"
                id="firstName"
                required={true}
                value={form.firstName}
                onChange={(val) => updateForm("firstName", val)}
              />
              <Input
                id="mail"
                type="email"
                label="Email"
                required={true}
                value={form.mail}
                onChange={(val) => updateForm("mail", val)}
                pattern="^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$"
              />
              <Input
                id="phone"
                type="tel"
                required={true}
                label="Téléphone"
                value={form.phone}
                onChange={(val) => updateForm("phone", val)}
              />

              <Select
                id="country"
                label="Pays"
                options={COUNTRIES}
                value={form.country}
                onChange={(val) => updateForm("country", val)}
              />

              <div>
                <Textarea
                  id="message"
                  label={"Message"}
                  value={form.message}
                  onChange={(val) => updateForm("message", val)}
                />
              </div>
            </div>
          </div>

          <div className="car-form__btn">
            <button
              className="button"
              type="submit"
            >
              <span>Demande de réservation</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const dispatch = store.dispatch;

const handleSubmit = (e, form, car) => {
  e.preventDefault();
  dispatch(carBooking({ ...form, car }));
};

const updateForm = (key, value) => {
  dispatch(carFormUpdate({ key, value }));
};

export default CarForm;
