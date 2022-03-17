//Adding users into the database

app.post('/register', async(req, res) => {
    try {
        const response = await users.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.tel,
            status: req.body.status,
            dateCreated: Date.now()
        })
        res.status(201).json({
            Message: "User added successfully to the DB",
            Info: response

        })
    } catch (error) {

    }


    //console.log(req.body);

})

//getting all users stored in the database

app.get('/users', async(req, res) => {
    try {
        const usersInfo = await users.find().sort({ dateCreated: -1 });
        res.status(202).json({
            Message: "List of Registered users retrieved here:",
            Users: usersInfo
        })
    } catch (error) {
        console.log(error);
    }
})

//get one user informations by using his or her ID

app.get('/user/:id', async(req, res) => {

    try {
        const userID = req.params.id;
        const user = await users.findById(userID);
        res.status(202).json({
            Message: `User ${user.name} retrieved successfully!!!!`,
            User: user
        })
    } catch (error) {
        res.status(202).json({
                Message: `Error: User with an ID ${req.params.id} not found!!!!`

            })
            //console.log(error);
    }
})

//update an existing user informations
app.patch('/update/:id', async(req, res) => {

    try {
        const userID = req.params.id;
        const userUpdated = await users.findByIdAndUpdate(userID, {
            ...req.body
        });
        res.status(202).json({
            Message: `User ${userUpdated.name} updated successfully!!!!`
        })
    } catch (error) {

        res.status(202).json({
                Message: `Error: User with an ID ${req.params.id} not found!!!!`
            })
            //console.log(error);
    }
})

//deleting users from the database
app.delete('/delete/:id', async(req, res) => {

    try {
        const userID = req.params.id;
        const userDeleted = await users.findByIdAndDelete(userID, {
            ...req.body
        });
        res.status(202).json({
            Message: `User ${userDeleted.name} deleted successfully!!!!`

        })
    } catch (error) {
        res.status(202).json({
            Message: `Error: User with an ID ${req.params.id} not found!!!!`

        })
    }
})



//adding messages to a database


app.post('/contact', async(req, res) => {
    try {
        const query = await messages.create({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
            date: Date.now()
        })
        res.status(201).json({
            Output: "Message sent to Aime Ndayambaje @Aimelive successfully",
            Message: query.message,
            Info: query

        })
    } catch (error) {
        res.status(201).json({
            Output: "Error: Message not sent!!",

        })
    }

})

//displaying messages

app.get('/messages', async(req, res) => {
    try {
        const messageDetail = await messages.find().sort({ dateCreated: -1 });
        res.status(202).json({
            Output: "Messages received are these:",
            Details: messageDetail
        })
    } catch (error) {
        console.log(error);
    }
})