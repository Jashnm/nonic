import { Remarkable } from "remarkable";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

const md = new Remarkable({
  html: true,
  xhtmlOut: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, {
          language: lang,
          ignoreIllegals: true
        }).value;
      } catch (err) {}
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (err) {}

    return ""; // use external default escaping
  }
});

// => <h1>Remarkable rulezz!</h1>

export default md;
