import React from "react";
import Icon from "./Icon";
import Input from "./Input";
import Radio from "./Radio";
import Select from "./Select";
import Switch from "./Switch";
import Textarea from "./Textarea";
import DateInput from "./DateInput";
import NumberInput from "./NumberInput";
import villasData from "../data/villas.data.json";
import { useDispatch, useSelector } from "react-redux";
import { COUNTRIES, GENDERS } from "../constants/form.const";

import {
  villaBooking,
  villaFormUpdate,
} from "../redux/villa-form/villa-form.slice";

const VillaForm = ({ data }) => {
  const dispatch = useDispatch();
  const villa = villasData.find((v) => v.id === data.id);
  const nbrOfPersons = villa.features.find((f) =>
    f.labelENG.includes("persons")
  ).value;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(villaBooking({ ...form, villa: villa.id }));
  };

  const updateForm = (key, value) => {
    dispatch(villaFormUpdate({ key, value }));
  };

  const handleFullscreen = (posY) => {
    setAsideTop(`${posY}px`);
    setTimeout(() => {
      setFullscreen(!fullscreen);
      setAsideTop(fullscreen ? "initial" : "0px");
    }, 10);
  };

  const [asideTop, setAsideTop] = React.useState("initial");
  const [fullscreen, setFullscreen] = React.useState(false);

  const form = useSelector((store) => store.villaFormReducer);

  console.log(villa);

  return (
    <div
      className={`villa-form ${fullscreen ? "fullscreen" : ""}`}
      style={{ ["--form-top"]: `${asideTop}` }}
    >
      <div
        className="villa-form__header"
        onClick={(e) => handleFullscreen(e.clientY)}
      >
        <h3>À partir de {villa.price}€ par nuit</h3>
        <div className="villa-form__expand">
          <Icon name={`${fullscreen ? "close-outline" : "expand-outline"}`} />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="villa-form__fields">
          <div>
            <div className="villa-form__infos">
              <span>Villa {villa.name}</span>
              <div>
                <span>{villa.rooms.length} chambres</span>
                <span>, max {nbrOfPersons} personnes</span>
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
              <span>Pour combien ?</span>
            </p>

            <NumberInput
              min="1"
              required={true}
              max={`${nbrOfPersons}`}
              id="numberOfAdult"
              label="Nombre d'adultes"
              value={form.numberOfAdult}
              onChange={(val) => updateForm("numberOfAdult", val)}
            />

            <NumberInput
              min="0"
              max="10"
              id="numberOfChild"
              label="Nombre d'enfants"
              value={form.numberOfChild}
              onChange={(val) => updateForm("numberOfChild", val)}
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

            <p>
              <span>Avec une option ?</span>
            </p>

            <Switch
              id="wantACar"
              positiveTxt="Oui"
              negativeTxt="Non"
              value={form.wantACar}
              label="Location de voiture"
              onChange={(val) => updateForm("wantACar", val)}
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

        <div className="villa-form__btn">
          <button className="button" type="submit">
            <span>Demande de réservation</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default VillaForm;
