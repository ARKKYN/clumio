export function isEmpty(value, ignoreWhitespace = true) {
  switch (typeof value) {
      case "string":
          return ignoreWhitespace
              ? value.length === 0
              : value.trim().length === 0;
      case "number":
      case "boolean":
          return !value;
      case "undefined":
          return true;
      case "object":
          return value === null || Object.keys(value).length === 0; // handling for null.
      case "function":
      case "symbol":
          return false;
      default:
          return !value;
  }
}


/**
 *
 * @param text input text
 * @param splitCamelCase if `true` it splits  camel cased string and returns the text with space between the splited text
 * @returns string
 */
export function toTitleCase(text , splitCamelCase = false) {
    if (!isNaN(text)) {
        return text;
    }

    let textToBeProcessed = text;
    if (splitCamelCase && text.split(" ").length === 1) {
        textToBeProcessed = text
            .replace(/([a-z0-9])([A-Z])/g, "$1 $2");

    }
    return textToBeProcessed
        .split(" ")
        .map(x => {
            return x.charAt(0).toUpperCase() + x.slice(1);
        })
        .join(" ");
}
