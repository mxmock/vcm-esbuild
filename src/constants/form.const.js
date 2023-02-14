import getToday from "../utils/date.utils";

const GENDERS = [
  {
    id: "male",
    label: "Homme",
    icon: {
      name: "male-outline",
      color: "var(--blue-logo)",
    },
  },
  {
    id: "female",
    label: "Femme",
    icon: {
      name: "female-outline",
      color: "var(--red)",
    },
  },
];

const COUNTRIES = [
  {
    value: "FRANCE",
    label: "France",
  },
  {
    value: "ANGLETERRE",
    label: "England",
  },
  {
    value: "ESPAGNE",
    label: "España",
  },
  {
    value: "ITALIE",
    label: "Italia",
  },
  {
    value: "PORTUGAL",
    label: "Portugal",
  },
  {
    value: "USA",
    label: "USA",
  },
  {
    value: "HOLLANDE",
    label: "Holland",
  },
  {
    value: "ALLEMAGNE",
    label: "Deutschland",
  },
  {
    value: "AUTRE",
    label: "Autre",
  },
];

const getInitVillaForm = () => ({
  startDate: getToday(),
  endDate: getToday(),
  numberOfAdult: "1",
  numberOfChild: "0",
  gender: "male",
  name: "",
  firstName: "",
  mail: "",
  phone: "",
  country: "FRANCE",
  wantACar: false,
  message: "",
});

export { getInitVillaForm, GENDERS, COUNTRIES };
