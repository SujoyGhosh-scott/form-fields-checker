# form-fields-checker

npm package to validate form fields like email, phone no etc, check password strength, suggest new passwords, get country code and initials of all countries and so on. Make the form field validation process much easier and faster.
To install the package run

```sh
npm i form-validator
```

As of now there are three main functions, isValidEmail, checkPasswordStrength and generatePassword. Detail explaination of them are given below.

## isValidEmail()

If an email is sent as a parameter to this function, it validates wheather the email is valid or not.

## checkPasswordStrength()

This functions checks the strength of the given password and returns how strong it is and a list suggetions to further strengthen the password. Strength can be one of these values `invalid | weak | moderate | strong | very strong` The parameters fo the function is explained below.
| Param | Type | About |
| ------ | ------ |------ |
| password | string | the password that is being checked |
| minLength | number | minimum length of the password, default 8 |
| maxLength | number | maximum length of the password |
|disbleBothCase| boolean| if it is not mandatory to have both upper and lowercase letters in the password |
|disbleSpecialChars| boolean| if it is not mandatory to have special characters in the password |
|disbleNumeric| boolean| if it is not mandatory to have numbers in the password |
|forbiddedWords|[string]|if there are words that cannot be present in the password. e.g. password cannot contain the word 'password'|

## generatePassword()

This function generates and returns a string password. And if some specific type of character is not wanted in the password that can also be mentioned. The parameters fo the function is explained below.
| Param | Type | About |
| ------ | ------ |------ |
| minLength | number | minimum length of the password, default 8 |
| maxLength | number | maximum length of the password, default 15 |
| avoidSpecialChar | boolean | in case special characters not needed in the password |
| avoidNumeric | boolean | in case numbers not needed in the password |
| avoidUpperCase | boolean | in case capital letters not needed in the password |
| avoidLowerCase | boolean | in case lower case letters not needed in the password |

## Example

## License

ISC
