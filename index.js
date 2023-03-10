/**
 * Checks if the provided email is valid or not
 * @param {string} email
 * @returns {boolean} True if the email is valid
 */
const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(email);
};

/**
 * Checks if the given link is valid or not
 * @param {string} link
 * @returns {boolean} True if the link is valid
 */
const isValidLink = (link) => {
  re =
    /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/i;

  return re.test(link);
};

/**
 * This functions checks the strength of the given password and returns how strong it is and a list suggetions to further strengthen the password
 * @param {string} password
 * @param {number} minLength
 * @param {number} maxLength
 * @param {boolean} disableBothCase
 * @param {boolean} disableSpecialChars
 * @param {boolean} disableNumeric
 * @param {[string]} forbiddenWords
 * @returns Strength of the password and suggetions to further strengthen the password
 */
const checkPasswordStrength = (
  password,
  minLength = 8,
  maxLength,
  disableBothCase = false,
  disableSpecialChars = false,
  disableNumeric = false,
  forbiddenWords = []
) => {
  let strength = "";
  let suggetions = [];

  if (password.length < minLength) {
    strength = "weak";
    suggetions.push("too short");
  }
  if (maxLength && password.length > maxLength) {
    strength = "invalid";
    suggetions.push("too long");
  }
  if (!disableBothCase && !(/[A-Z]/.test(password) && /[A-Z]/.test(password))) {
    strength = "weak";
    suggetions.push(
      "password should contain both uppercase and lowecase letters"
    );
  } else {
    strength = "moderate";
  }
  if (
    !disableSpecialChars &&
    !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)
  ) {
    strength = "weak";
    suggetions.push("password should contain a special symbol");
  } else {
    strength = "strong";
  }
  if (!disableNumeric && !/[0-9]/.test(password)) {
    strength = "moderate";
    suggetions.push("password should contain number");
  } else {
    strength = "very storng";
  }
  forbiddenWords.map((word) => {
    if (password.includes(word)) {
      (strength = "invalid"), suggetions.push("contains a forbidden word");
      return;
    }
  });

  return { strength, suggetions };
};

/**
 * This function generates and returns a string password. And if some specific type of character is not wanted in the password that can also be mentioned.
 * @param {number} minLength
 * @param {number} maxLength
 * @param {boolean} avoidSpecialChar
 * @param {boolean} avoidNumeric
 * @param {boolean} avoidUpperCase
 * @param {boolean} avoidLowerCase
 * @returns {string} Generated password
 */
const generatePassword = (
  minLength = 8,
  maxLength = 15,
  avoidSpecialChar,
  avoidNumeric,
  avoidUpperCase,
  avoidLowerCase
) => {
  let length = Math.round(Math.random() * (maxLength - minLength) + minLength);
  let letters = {
    small: "abcdefghijklmnopqurstuvwxyz",
    capital: "ABCDEFGHIJKLMNOPQURSTUVWXYZ",
    special: `!@#$%^&*()_+-=[]{};':"|,.<>/?`,
    number: "0123456789",
  };
  let letterTypes = [];
  if (!avoidUpperCase) {
    letterTypes.push("capital");
  }
  if (!avoidLowerCase) {
    letterTypes.push("small");
  }
  if (!avoidSpecialChar) {
    letterTypes.push("special");
  }
  if (!avoidNumeric) {
    letterTypes.push("number");
  }
  // console.log("letter types: ", letterTypes, " length: ", length);
  let password = "";
  for (let i = 0; i < length; i++) {
    //getting a key field
    let key = letterTypes[Math.floor(Math.random() * letterTypes.length)];
    //getting the values of that key field
    let values = letters[key];
    //getting random value from them
    let value = values[Math.floor(Math.random() * values.length)];
    //appending the value
    password += value;
  }
  return password;
};

/**
 * Dynamically generates the regular expression based on the given format
 * @param {string} format
 * @returns
 */
const genRegEx = (format) => {
  let nos = format.split(" ");
  let pattern = "";
  let startFrom = 0;

  // error handling for invalid cc
  // console.log(nos);
  if (
    !Number.isInteger(parseInt(nos[0])) &&
    !["+(cc)", "(+cc)", "(cc)", "+cc", "cc"].includes(nos[0])
  ) {
    return "invalid format";
  }

  //if country code is there in the first item,
  // pattern = "[\\+]?[(]?[0-9]{3}[)] ";
  if (nos[0] === "+(cc)") {
    //if starts with +(cc)
    pattern = "[\\+]+[(]+\\d{1,3}[)]+ ";
    startFrom = 1;
  } else if (nos[0] === "(+cc)") {
    //or it may start with (+cc)
    pattern = "[(]+[+]+\\d{1,3}[)]+ ";
    startFrom = 1;
  } else if (nos[0] === "(cc)") {
    //or it may start with (cc)
    pattern = "[+]?\\d{1,3} ";
    startFrom = 1;
  } else if (nos[0] === "+cc") {
    //or it may start with +cc
    pattern = "[+]+\\d{1,3} ";
    startFrom = 1;
  } else if (nos[0] === "cc") {
    //or it may start with cc
    pattern = "\\d{1,3} ";
    startFrom = 1;
  }

  for (let i = startFrom; i < nos.length; i++) {
    pattern += `\\d{${nos[i]}}`;
    if (i < nos.length - 1) {
      pattern += " ";
    }
  }

  // console.log(nos, pattern);

  let regEx = new RegExp(pattern);
  return regEx;
};

/**
 * This function checks if the given phone no is valid or not. If the phone no needs to be in a specific format that also can be done by providing the format param. To know more about foramt please read the docs.
 * @param {string} phone
 * @param {string | [string]} format
 * @returns {boolean} True if the phone no is valid, if the format is wrong then "invalid format"
 */
const isValidPhone = (phone, format) => {
  //if format is not provided, then a general regexp is used to validate
  if (!format) {
    let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(phone);
  }

  //in case there are multiple accepted formats
  if (Array.isArray(format)) {
    for (let i = 0; i < format.length; i++) {
      let re = genRegEx(format[i]);
      if (re === "invalid format") {
        return re;
      } else if (re.test(phone)) {
        return true;
      }
    }
    return false;
  }

  let re = genRegEx(format);
  if (re === "invalid format") {
    return re;
  }
  return re.test(phone);
};

module.exports = {
  isValidEmail,
  isValidLink,
  isValidPhone,
  checkPasswordStrength,
  generatePassword,
};
