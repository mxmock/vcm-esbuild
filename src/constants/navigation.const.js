const getNavigation = (path) => [
  {
    label: "Accueil",
    link: `${path}index.html`,
    desc: `Lien vers la page d'accueil`,
  },
  {
    label: "Voitures",
    link: `${path}index.html#cars`,
    desc: `Lien vers la liste des voitures`,
  },
];

export default getNavigation;
