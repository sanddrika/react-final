import {FormControl, MenuItem, Select} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {languageCodes} from "../../helper";

export const LanguageSelect = () => {
  const languageCode = localStorage.getItem("langCode");
  const [LangCode, setLangCode] = useState(
    languageCode || "en"
    // return localStorage.getItem("langcode") || "en";
  );
  const {i18n} = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(LangCode);
    localStorage.setItem("langCode", LangCode);
  }, [LangCode, i18n]);

  return (
    <FormControl sx={{minWidth: 120, m: 1}}>
      <Select
        sx={{color: "#ff9900", border: "2px solid blue"}}
        value={LangCode}
        onChange={(e) => {
          setLangCode(e.target.value);
        }}
        defaultValue={LangCode}
      >
        {Object.entries(languageCodes).map((item) => {
          const [laguageKey, languageValue] = item;
          return (
            <MenuItem key={laguageKey} value={laguageKey}>
              {languageValue}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
