//Function to validate password
//Checks that the user enters a username and email of atleast one character
//User enters a pass of 5 or more characters with at min one letter and one number
function validateUser(username, email, password){
    const usernameLength = username.length >=1
    const passLength = password.length >=5
    const emailLength = email.length >=1

    let hasLetter = /[a-zA-Z]/g.test(password)
    let hasNum = /[0-9]/g.test(password);

    return (usernameLength && passLength && emailLength && hasLetter && hasNum)

}

module.exports = validateUser