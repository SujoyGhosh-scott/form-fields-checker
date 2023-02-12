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

module.exports = {
  isValidEmail,
  checkPasswordStrength,
  generatePassword,
};
