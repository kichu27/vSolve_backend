import en from "./en.js";

export default function  getText (lang, textkey)  {
  try {
    let message;
    message = en[textkey];

    console.log(message)
    if (message === undefined) {
      return `Missing key: ${textkey} in ${lang}`;
    }
    return message;
  } catch (error) {
    console.error("Error in getText:", error);
    return `An unexpected error occurred.`;
  }
};

