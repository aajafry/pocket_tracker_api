const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../../models/user/index');

const userController = {
    register: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const user = new userModel({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            });
            await user.save();
            res.status(201).json({
                message: "user registered successfully"
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "there was an server side error",
                error: error
            });
        }
    },
    login: async (req, res) => {
        try {

            const {email , password} = req.body;
            const user = await userModel.find({email: email});

            if(user && user.length > 0){
                const isValidPassword = await bcrypt.compare(
                    password, user[0].password
                );
                if (isValidPassword) {
                    const token = jwt.sign({
                        id: user[0]._id,
                        name: user[0].name,
                        email: user[0].email
                    }, process.env.JWT_SECRET);
                    res.status(200).json({
                        message: "user logged in successfully",
                        token: token
                    });
                } else {
                    res.status(401).json({
                        message: 'authentication failed'
                    })
                }
            }else{
                res.status(401).json({
                    message: 'authentication failed'
                })
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "there was an server side error",
                error: error
            });
        }
    }
}

module.exports = userController;