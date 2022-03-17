import User from "../models/userModel.js";


const signupValidator = (req, res, next) => {

    let email = req.body.email
    let name = req.body.name
    let pwd = req.body.password
    let confirm = req.body.confirmPassword
    let atpos, dotpos


    if (!email) {
        return res.json({ Error: 'Email missing!' });
    }
    if (!name) {
        return res.json({ Error: 'Name missing!' });
    }
    if (name.length < 5) {
        return res.json({ Name: 'Enter at least 5 characters!' });
    }
    if (!pwd) {
        return res.json({ Error: 'Password missing!' });
    }
    if (!confirm) {
        return res.json({ Error: 'Please confirm password!' });
    }

    if (email != "") {
        atpos = email.indexOf("@");
        dotpos = email.lastIndexOf(".");

        if (atpos < 1 || (dotpos - atpos < 2)) {
            return res.json({ Error: 'Incorrect email!' });
        }

    }

    if (pwd != "" && confirm != "") {
        if (pwd !== confirm) {

            return res.json({ Error: 'Password does not match!' });
        }

    }

    if (pwd.length < 8) {
        return res.json({ Password: 'Enter at least 8 characters' });
    }
    try {
        let tel = req.body.phone
    } catch (error) {

    }
    User.confirmPassword = undefined
    next();
}

export { signupValidator as default }