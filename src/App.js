import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
//import cookies from "js-cookie";

import "flag-icon-css/css/flag-icon.min.css";
import "./App.scss";
const languages = [
  {
    code: "it",
    name: "Italiano",
    country_code: "it",
  },
  {
    code: "en",
    name: "English",
    country_code: "gb",
  },
];

function Navbar() {
  const { t, i18n } = useTranslation();

  const currentLanguageCode = i18n.language; //cookies.get("i18next") || "en";

  return (
    <div className="navbar">
      <div className="navigation">
        <button className="switcher__btn">
          <Link to="/">{t("navbar.home")}</Link>
        </button>
        <button className="switcher__btn">
          <Link to={`/${currentLanguageCode}/about-us`}>
            {t("navbar.about")}
          </Link>
        </button>
      </div>
      <div className="switcher">
        {languages.map(({ code, name, country_code }) => (
          <button
            style={{
              opacity: currentLanguageCode === code ? 0.3 : 1,
            }}
            className="switcher__btn"
            key={country_code}
            onClick={() => {
              i18next.changeLanguage(code);
              document.querySelector("html").setAttribute("lang", code); // Added to change language code in html lang property
              let here = window.location.pathname;
              here = here.slice(3);
              var there = "/" + code + here;
              window.location = there;
            }}
          >
            <span className={`flag-icon flag-icon-${country_code}`}></span>
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}

function Home() {
  const { t } = useTranslation();
  return (
    <div className="container">
      <h1>{t("home.message")}</h1>
    </div>
  );
}

function AboutUs() {
  const { t } = useTranslation();
  return (
    <div className="container">
      <h1>{t("about.message")}</h1>
    </div>
  );
}

function App() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language; //cookies.get("i18next") || "en";
  //const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

  useEffect(() => {
    document.title = t("app.title");
  }, [currentLanguage, t]);

  document.querySelector("html").setAttribute("lang", currentLanguage); // Added to change language code in html lang property

  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <Redirect to={`/${currentLanguage}`} />
          </Route>
          <Route path="/:lang" exact>
            <Home />
          </Route>
          <Route path="/:lang/about-us">
            <AboutUs />
          </Route>
          <div className="container">
            <h1>{t("app.welcome")}</h1>
          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
