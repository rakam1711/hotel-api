const { body, query, check } = require('express-validator'); // express validator import
const Admin = require('../Models/Admin');

exports.adminRegister = ((req, res) => {
    return [
        body('email', 'Email is Required').isEmail()
        .custom((result, { req }) => {
            return Admin.findOne({ email: result })
                .then(admin => {
                    if (admin) {
                        throw new Error('Email Already Exist');
                    } else {
                        return true;
                    }
                })
        }),
        // check('password', 'Password is Required').isLength({ min: 8 })
        // .withMessage('Password Must Be at Least 8 Characters')
        // .matches('[0-9]').withMessage('Password Must Contain a Number')
        // .matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter')
        // .matches('[a-z]').withMessage('Password Must Contain an Lowercase Letter')
        // .trim().escape()
    ];
})

exports.adminLogin = (req, res) => {
    return [
        check('password', 'Password is Required')
        // .isLength({ min: 8 })
        // .withMessage('Password Must Be at Least 8 Characters')
        // .matches('[0-9]').withMessage('Password Must Contain a Number')
        // .matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter')
        // .matches('[a-z]').withMessage('Password Must Contain an Lowercase Letter')
        .trim().escape()
        .custom((result,{ req }) => {
            const data = req.body;
            return Admin.findOne({ email: data.email })
                .then(admin => {
                    if (admin) {
                        req.adminData = admin; //to save user details in req
                    } else {
                        throw new Error('User Does Not Exist');
                    }
                })

        })
    ]
}

exports.checkAdminStatus = (req,res)=>{
    return [
        check('email','Email is required').custom((result,{req})=>{
            const data = req?.userData
            return Admin.findOne({email:data?.email}).then(admin=>{
                if (admin?.status == true) {
                    return true
                } else {
                    throw new Error('Your account is blocked.Kindly contact to admin');
                }
            })
        })
    ]
}