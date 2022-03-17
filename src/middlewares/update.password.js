import bcrypt from 'bcrypt'
export const changePwd = async(req, res, next) => {
    try {
        const oldPassword = req.body.OldPassword
        const newPassword = req.body.NewPassword
        const confirmPassword = req.body.ConfirmPassword

        // if (!oldPassword || !newPassword || !confirmPassword) {
        //     res.status(400).json({
        //         Message: "All fileds are required!!"
        //     })
        // }
        if (!(newPassword == confirmPassword)) {
            res.status(400).json({
                Message: `Password confirmation don't match!`
            })
        } else {
            const validPassword = bcrypt.compareSync(oldPassword, req.user.password);

            if (!validPassword) {
                res.status(400).json({
                    Message: "Old Password incorrect!!"
                })
            }
        }



    } catch (error) {
        res.status(400).json({
            Message: "Can't update your Password!!",
            //Error: error.stack
        })
    }

    next()
}