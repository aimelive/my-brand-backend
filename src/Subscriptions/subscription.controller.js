import subscription from "./subscription.model.js";

export const addSubscription = async(req, res) => {
    try {
        const email = req.body.email

        const emailExist = await subscription.find({
            email: email.toLowerCase()
        })
        if (emailExist.length) {
            res.status(400).json({
                Message: `Subscription <${email}> exists!!`
            })
        } else {
            const Subscriber = await subscription.create(req.body)
            res.status(201).json({
                Congratulation: "Subscription Added Successfully!!",
                Data: Subscriber

            })

        }

    } catch (error) {}
}

export const getSubscription = async(req, res) => {
    try {
        const Subscriber = await subscription.find()
        res.status(201).json({
            Message: "ALL SUBSCRIPTIONS RETRIEVED!!",
            Results: Subscriber.length,
            Data: { Subscriber }

        })

    } catch (error) {
        res.status(400).json({
            Message: "An error occured!!",
            //Error: error.stack
        })
    }
}

export const getOneSubscription = async(req, res) => {
    try {
        const Subscriber = await subscription.findById(req.params.id)
        res.status(201).json({
            Message: "ONE SUBSCRIPTION RETRIEVED!!",
            Subscriber: `${Subscriber.name}`,
            Data: { Subscriber }

        })

    } catch (error) {
        res.status(404).json({
            Message: "Subscription not found!!"
        })
    }
}

export const updateSubscription = async(req, res) => {
    try {
        const Subscriber = await subscription.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        res.status(201).json({
            Message: "SUBSCRIPTION UPDATED!!",
            Subscriber: `${Subscriber.name}`,
            Data: { Subscriber }

        })

    } catch (error) {
        res.status(404).json({
            Message: "Subscription not found!!",
        })
    }
}

export const deleteSubscription = async(req, res) => {
    try {
        const Subscriber = await subscription.findByIdAndDelete(req.params.id)
        res.status(202).json({
            Message: `SUBSCRIBER ${Subscriber.name} DELETED SUCCESSFULLY!!`
        })

    } catch (error) {
        res.status(404).json({
            Message: "Subscription not found!!",
        })
    }
}