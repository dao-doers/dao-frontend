export function toTitleCase(str) {
  const result = str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
  const spl = result.split(".");
  if (spl.length > 1) {
    const txt = spl[1];
    return (
      spl[0] + "." + txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  }
  return result;
}

export const pluralize = (count, noun, suffix = "s") =>
  `${count} ${noun}${count !== 1 ? suffix : ""}`;
