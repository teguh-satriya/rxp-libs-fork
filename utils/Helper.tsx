export const decodeSAPDate = function(dateval: string) {
  return [dateval.slice(0, 4), dateval.slice(4, 6), dateval.slice(6, 8)].join(
    "-"
  );
};

export const encodeSAPDate = function(dateval: string) {
  let re = /-/gi;
  return dateval.replace(re, "");
};

export function getShortDate(date: Date, sperator: string = "-") {
  return (
    date.getFullYear() +
    sperator +
    lpad((date.getMonth() + 1).toString(), "0", 2) +
    sperator +
    lpad(date.getDate().toString(), "0", 2)
  );
}

export function lpad(str: string, padString: string, length: number) {
  while (str.length < length) {
    str = padString + str;
  }
  return str;
}

export function wildcardToRegExp(s: string) {
  return new RegExp(
    "^" +
      s
        .split(/\*+/)
        .map(regExpEscape)
        .join(".*") +
      "$"
  );
}

function regExpEscape(s: string) {
  return s.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
}

export const fuzzyMatch = function(needle: string, haystack: string) {
  if (needle === "" || haystack === "") return true;

  needle = needle.toLowerCase().replace(/ /g, "");
  haystack = haystack.toLowerCase();

  // All characters in needle must be present in haystack
  var j = 0; // haystack position
  for (var i = 0; i < needle.length; i++) {
    // Go down the haystack until we find the current needle character
    while (needle[i] !== haystack[j]) {
      j++;

      // If we reached the end of the haystack, then this is not a match
      if (j === haystack.length) {
        return false;
      }
    }

    // Here, needle character is same as haystack character
    //console.log(needle + ":" + i + " === " + haystack + ":" + j);
  }

  // At this point, we have matched every single letter in the needle without returning false
  return true;
};
