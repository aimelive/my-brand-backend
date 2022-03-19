export const subscriptionMiddlware = async(req, res, next) => {
    try {
        const name = req.body.name
        const email = req.body.email
        let atpos, dotpos

        if (!name) {
            return res.status(400).json({
                Message: "Name required!!"
            })
        }
        if (!email) {
            return res.status(400).json({
                Message: "Email required for subscription"
            })
        }
        if (email != "") {
            atpos = email.indexOf("@");
            dotpos = email.lastIndexOf(".");

            if (atpos < 1 || (dotpos - atpos < 2)) {
                return res.status(400).json({ Message: '@ or . missing in your email' });
            }

        }

    } catch (error) {
        res.status(500).json({
            Message: "Oops, We can't add your subscription now!",
            //Error: error.stack
        })
    }

    next()
}