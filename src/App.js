import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import cookies from "js-cookie";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import Home from "./components/Home";

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
  const { t } = useTranslation();
  const currentLanguageCode = cookies.get("i18next") || "en";

  return (
    <div>
      <div>
        <button>
          <Link to={`/${currentLanguageCode}`}>Home</Link>
        </button>
        <button>
          <Link to={`/${currentLanguageCode}/${t("about-us")}`}>About Us</Link>
        </button>
        {languages.map(({ code, name, country_code }) => (
          <button
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
            <span
              className={`flag-icon flag-icon-${country_code}`}
              style={{
                opacity: currentLanguageCode === code ? 0.2 : 1,
              }}
            ></span>
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}

function App() {
  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("app_title");
  }, [currentLanguage, t]);

  document.querySelector("html").setAttribute("lang", currentLanguageCode); // Added to change language code in html lang property

  return (
    <Router>
      <div>
        <Navbar></Navbar>
        <Switch>
          <Route path="/" exact>
            <Redirect to={`/${currentLanguageCode}`}></Redirect>
          </Route>
          <Route path="/:lang" exact>
            <Home page="home" />
          </Route>
        </Switch>
      </div>
    </Router>
    /*<div className="container">
      <Navbar />

      <div className="d-flex flex-column align-items-start">
        <h1 className="font-weight-normal mb-3">{t("welcome-to-react")}</h1>
      </div>
    </div>*/
  );
}

export default App;
