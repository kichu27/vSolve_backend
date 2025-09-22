import getText from "../message/get-text.js";

export function generateResponse(textKey, data = {}) {

  let message =  getText("en" ,textKey)

  return {
    message ,
    ...(Object.keys(data).length ? { data } : {})
  };
}