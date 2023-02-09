import React from "react";
import Icon from "./Icon";
import MainLogo from "./MainLogo";
import Navigation from "./Navigation";

const Header = ({ data }) => {
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);

  return (
    <div className="container">
      <div className="header__logo">
        <a title="Lien vers la page d'accueil" href={`${data.path}index.html`}>
          <MainLogo />
        </a>
      </div>

      <div className="header__right-part">
        <nav className="header__nav">
          <Navigation path={data.path} />
        </nav>
        <div
          className="header__menu"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <Icon name={showMobileMenu ? `close-outline` : `menu-outline`} />
        </div>
        <div id="languageSwitcher"></div>
      </div>

      {showMobileMenu && (
        <nav className="header__mobile-menu">
          <Navigation path={data.path} />
        </nav>
      )}
    </div>
  );
};

export default Header;
