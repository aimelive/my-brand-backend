import User from "../models/userModel.js";


const signupValidator = (req, res, next) => {

    let email = req.body.email
    let name = req.body.name
    let pwd = req.body.password
    let confirm = req.body.confirmPassword
    let atpos, dotpos


    if (!email) {
        return res.status(400).json({ Error: 'Email missing!' });
    }
    if (!name) {
        return res.status(400).json({ Error: 'Name missing!' });
    }
    if (name.length < 5) {
        return res.status(400).json({ Error: 'Enter at least 5 characters!' });
    }
    if (!pwd) {
        return res.status(400).json({ Error: 'Password missing!' });
    }
    if (!confirm) {
        return res.status(400).json({ Error: 'Please confirm password!' });
    }

    if (email != "") {
        atpos = email.indexOf("@");
        dotpos = email.lastIndexOf(".");

        if (atpos < 1 || (dotpos - atpos < 2)) {
            return res.status(400).json({ Error: 'Incorrect email!' });
        }

    }

    if (pwd != "" && confirm != "") {
        if (pwd !== confirm) {

            return res.status(400).json({ Error: 'Password does not match!' });
        }

    }

    if (pwd.length < 8) {
        return res.status(400).json({ Error: 'Enter at least 8 characters' });
    }
    try {
        let tel = req.body.phone
    } catch (error) {

    }
    User.confirmPassword = undefined
    next();
}

export { signupValidator as default }