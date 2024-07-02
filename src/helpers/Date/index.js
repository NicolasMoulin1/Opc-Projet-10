// J'ai supprimé les chiffres car, par défaut, janvier = index 0.

export const MONTHS = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre"
];


export const getMonth = (date) => MONTHS[date.getMonth()];