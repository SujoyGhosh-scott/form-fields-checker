# form-fields-checker

npm package to validate form fields like email, phone no, links etc, checks password strength, suggests new passwords, get country code and initials of all countries and so on. Make the form field validation process much easier and faster.
To install the package run

```sh
npm i form-fields-checker
```

As of now there are three main functions, isValidEmail, checkPasswordStrength and generatePassword. Detail explaination of them are given below.

## isValidEmail()

Checks if the provided email is valid or not

### parameters

1. email: the email(string)

### example

```js
const fieldsChecker = require("form-fields-checker");

console.log(fieldsChecker.isValidEmail("testemail@gmail.com")); //true
console.log(fieldsChecker.isValidEmail("sujoyghosh@company.com")); //true
```

## isValidLink()

Checks if the provided link is valid or not.

### parameters

1. link: the link(string)

### example

```js
const fieldsChecker = require("form-fields-checker");

console.log(fieldsChecker.isValidLink("www.facebook.com")); //true
console.log(fieldsChecker.isValidLink("https://github.com/")); //true
```

## isValidPhone()

Checks if the provided phone no is valid or not.

### parameters

1. phone: phone no(string)
2. format: Can be string or an array of string. If not provided, then a standard phone no validation format is used to check the phone no. Otherwise if phone no has to be in a specific format, then format field is required. Different ways of adding format is described below. If there are multiple accepted formats, they can be sent as an array of strings, true will be returned if any of the format is valid for the given phone no.

| format(string)           | example           | About                                                                                 |
| ------------------------ | ----------------- | ------------------------------------------------------------------------------------- |
| null/not provided        |                   | it will check for the standard formats like (+999999999999, 9999999999, 999-999-9999) |
| 10                       | 1234512345        | a 10 digit mobile no                                                                  |
| 5 5                      | 12345 12345       | space saperated 10 digits                                                             |
| 4 6                      | 1234 123456       | space saperated 10 digits                                                             |
| cc 4 6                   | 91 1234 123456    | space saperated phone with country code                                               |
| +cc 4 6                  | +91 1234 123456   | space saperated phone with country code                                               |
| (cc) 5 5                 | (91) 12345 12345  | space saperated phone with country code in parentheses                                |
| +(cc) 6 4                | +(91) 123456 1234 | space saperated phone with country code and positive sign outside                     |
| (+cc) 5 5                | (+91) 12345 12345 | space saperated phone with country code and positive sign inside                      |
| ["(+cc) 5 5", "+cc 5 5"] |                   | acepted formats provided as a array of string                                         |
| ["10", "+cc 10"]         |                   |                                                                                       |

this way you can different formats can be validated if required.

### example

```js
const fieldsChecker = require("form-fields-checker");

console.log(fieldsChecker.isValidPhone("9999999999")); // true
console.log(fieldsChecker.isValidPhone("+919999999999")); // true
console.log(fieldsChecker.isValidPhone("999 999 9999")); // true
console.log(fieldsChecker.isValidPhone("+919999 9 9999 9")); // false

console.log(fieldsChecker.isValidPhone("1234 123456", "4 6")); // true
console.log(fieldsChecker.isValidPhone("12345 12345", "4 6")); // false

console.log(fieldsChecker.isValidPhone("+91 12345 12345", "+cc 5 5")); // true
console.log(fieldsChecker.isValidPhone("+91 12345 12345", "(+cc) 5 5")); // false
console.log(fieldsChecker.isValidPhone("+(91) 12345 12345", "(+cc) 5 5")); // false
console.log(fieldsChecker.isValidPhone("(+91) 12345 12345", "(+cc) 5 5")); // true

console.log(
  fieldsChecker.isValidPhone("+91 12345 12345", ["(+cc) 5 5", "+cc 5 5"])
); // true, matched second
console.log(fieldsChecker.isValidPhone("12345 12345", ["10", "+cc 10"])); // false, matched none
console.log(fieldsChecker.isValidPhone("1234512345", ["10", "+cc 10"])); // true, matched first
console.log(fieldsChecker.isValidPhone("+91 1234512345", ["10", "+cc 10"])); // true, matched second
```

## checkPasswordStrength()

This functions checks the strength of the given password and returns how strong it is and a list suggetions to further strengthen the password. Strength can be one of these values `invalid | weak | moderate | strong | very strong` The parameters fo the function is explained below.

### parameters

| Param              | Type     | About                                                                                                       |
| ------------------ | -------- | ----------------------------------------------------------------------------------------------------------- |
| password           | string   | the password that is being checked                                                                          |
| minLength          | number   | minimum length of the password, default 8                                                                   |
| maxLength          | number   | maximum length of the password                                                                              |
| disbleBothCase     | boolean  | if it is not mandatory to have both upper and lowercase letters in the password                             |
| disbleSpecialChars | boolean  | if it is not mandatory to have special characters in the password                                           |
| disbleNumeric      | boolean  | if it is not mandatory to have numbers in the password                                                      |
| forbiddedWords     | [string] | if there are words that cannot be present in the password. e.g. password cannot contain the word 'password' |

### examples

```js
const fieldsChecker = require("form-fields-checker");

console.log(fieldsChecker.checkPasswordStrength("1234", 8));
// {
//   strength: 'very storng',
//   suggetions: [
//     'too short',
//     'password should contain both uppercase and lowecase letters',
//     'password should contain a special symbol'
//   ]
// }

console.log(fieldsChecker.checkPasswordStrength("1234aA#", 8, 16));
// { strength: 'very storng', suggetions: [ 'too short' ] }

console.log(fieldsChecker.checkPasswordStrength("abcdef#1", 8, 16));
// {
//   strength: 'very storng',
//   suggetions: [ 'password should contain both uppercase and lowecase letters' ]
// }
```

## generatePassword()

This function generates and returns a string password. And if some specific type of character is not wanted in the password that can also be mentioned. The parameters fo the function is explained below.

### parameters

| Param            | Type    | About                                                 |
| ---------------- | ------- | ----------------------------------------------------- |
| minLength        | number  | minimum length of the password, default 8             |
| maxLength        | number  | maximum length of the password, default 15            |
| avoidSpecialChar | boolean | in case special characters not needed in the password |
| avoidNumeric     | boolean | in case numbers not needed in the password            |
| avoidUpperCase   | boolean | in case capital letters not needed in the password    |
| avoidLowerCase   | boolean | in case lower case letters not needed in the password |

### examples

```js
const fieldsChecker = require("form-fields-checker");

console.log(fieldsChecker.generatePassword(8, 12)); // ?[@R/x/m1
console.log(fieldsChecker.generatePassword(20, 30)); // LJQk8nkD(R8C_NW0&@<Nk(
console.log(fieldsChecker.generatePassword(8, 12, true)); // without special char:  nTKHiC7H8
console.log(fieldsChecker.generatePassword(8, 12, false, false, false, true)); // without uppercase letters:  3%MP25YU!
```

## License

ISC
