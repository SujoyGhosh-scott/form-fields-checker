# form-fields-checker

npm package to validate form fields like email, phone no etc, check password strength, suggest new passwords, get country code and initials of all countries and so on. Make the form field validation process much easier and faster.
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

## isValidLink()

Checks if the provided link is valid or not.

### parameters

1. link: the link(string)

### example

## isValidPhone()

Checks if the provided phone no is valid or not.

### parameters

1. phone: phone no(string)
2. format: If not provided, then a standard phone no validation format is used to check the phone no. Otherwise if phone no has to be in a specific format, then format field is required. Different ways of adding format is described below.

### example

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

## License

ISC
