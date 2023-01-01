// created by IG
// third party pkgs
const express = require('express');
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");


// importing file
require('./ConnectionDB')

// custom functions
const service = require("./Services/Services");
const adminService = require("./Services/AdminServices");

// creating app 
const app = express();
app.use(express.json());

// listening servaer
let port = 5000;
app.listen(port, () => {
    console.log(`Server Started at Port --> ${port} <-- `)
})

// body pareser
app.use(bodyParser.urlencoded({ extended: true }))

// middleware
const checkToken = async (req, res, next) => {
    const auth = req.headers.authorization
    if (auth === undefined || auth === '' || auth === null) {
        return res.json({
            ok: false,
            msg: 'The request is Unauthorized!',
            status: 401
        })
    }
    const token = auth.split(' ')[1];
    req.body.token = token
    try {
        const data = await adminService.getData();
        if (data[0].token !== '') {
            next()
        }
        else {
            res.status(401).json({
                ok: false,
                msg: 'Please login again.',
                status: 401
            })
        }
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'Internal Error!',
            status: 401
        });
    }
}
const verifyToken = (req, res, next) => {
    jwt.verify(req.body.token, 'secretKey', (err, auth) => {
        if (!err) {
            next()
            return
        }
        res.json({
            ok: false,
            msg: 'Invalid Token!',
            status: 498
        })
    })
}


// routes
app.post('/sendMail', async (req, res) => {
    let { countryCode, phone } = req.body
    let response = {
        msg: 'Mail sent SuccessFul.',
        status: 500,
        ok: false
    }
    try {
        if (phone && phone !== undefined && phone !== '' && countryCode && countryCode !== undefined && countryCode !== '') {
            await mailSend(req.body).catch(console.error);
            response.status = 200,
                response.ok = true,
                res.status(200).json(response);
        } else {
            response.msg = "Mail didn't send! ";
            res.status(400).json(response);
            response.status = 400;
        }
    } catch (err) {
        response.msg = 'Internal server Error';
        response.error = err.message,
            res.status(500).json(response);
    }
});

app.post('/login', async (req, res) => {
    let response = {
        msg: 'Login SuccessFul.',
        status: 200,
        ok: false
    }
    try {
        const data = await adminService.getOneData({ email: req.body.email });
        if (data && data !== null) {
            bcrypt.compare(req.body.password, data.password, function (err, result) {
                if (!err) {
                    if (result) {
                        jwt.sign({
                            id: data._id,
                            userName: data.user_name,
                            password: data.password
                        }, 'secretKey', { expiresIn: '30000s' }, async (err, token) => {
                            if (err) {
                                response.status = 400;
                                response.msg = 'Something went Wrong!';
                                response.error = err;
                            } else {
                                response.token = token;
                                response.ok = true;
                                const getAdmin = await adminService.updateData({ _id: data.id }, { token });
                            }
                            res.json(response);
                        })
                    } else {
                        response.status = 401;
                        response.msg = 'Email and Password are not matched!';
                        res.json(response);
                    }
                }
            })

        } else {
            response.status = 400;
            response.msg = 'No such Admin exists!';
            res.json(response);
        }
    } catch (err) {
        response.status = 500;
        response.msg = 'Internal server Error';
        response.error = err.message,
            res.status(500).json(response);
    }
});
app.post('/logout', checkToken, verifyToken, async (req, res) => {
    let response = {
        msg: 'Logout SuccessFul.',
        status: 200,
        ok: false
    }
    try {
        if (req.body.token && req.body.token !== undefined) {
            const aData = await adminService.getData();
            await adminService.updateData({ _id: aData[0].id }, { token: '' });
            res.status(200).json({ ...response, ok: true });
        } else {
            response.status = 400;
            response.msg = 'Some thing went wrons!';
            res.status(400).json(response);
        }
    } catch (err) {
        response.status = 500;
        response.msg = 'Internal server Error';
        response.error = err.message,
            res.status(500).json(response);
    }
});

//  products apis
app.post('/user/getProducts', async (req, res) => {
    let response = {
        msg: 'Products Listing fail!.',
        status: 500,
        ok: false
    }
    try {
        // let { start, limit, search, filter } = req.body
        // if (start && start !== undefined && start !== null && limit && limit !== undefined && limit !== null) {
        if (1) {
            const data = await service.getData();
            response.msg = 'Products Listing successful.'
            response.status = 200;
            response.ok = true;
            response.data = data
            res.status(200).json(response);

        } else {
            response.status = 400;
            response.ok = false;
            res.status(400).json({ response });
        }

    } catch (err) {
        res.status(500).json({ ...response, error: err.message });
    }

})
app.post('/getProducts', checkToken, verifyToken, async (req, res) => {
    let response = {
        msg: 'Products Listing fail!.',
        status: 500,
        ok: false
    }
    try {
        // let { start, limit, search, filter } = req.body
        // if (start && start !== undefined && start !== null && limit && limit !== undefined && limit !== null) {
        if (1) {
            const data = await service.getData();
            response.msg = 'Products Listing successful.'
            response.status = 200;
            response.ok = true;
            response.data = data
            res.status(200).json(response);

        } else {
            response.status = 400;
            response.ok = false;
            res.status(400).json(response);
        }

    } catch (err) {
        res.status(500).json({ ...response, error: err.message });
    }

})
app.post('/addProduct', checkToken, verifyToken, async (req, res) => {
    let response = {
        msg: 'Product adding fail!.',
        status: 500,
        ok: false
    }
    try {
        if (req.body.name && req.body.name !== undefined && req.body.price && req.body.price !== undefined) {
            const data = await service.addData(req.body);
            response.msg = 'Product added successful.'
            response.status = 201;
            response.ok = true;
            response.data = data
            res.status(201).json(response);
        } else {
            response.status = 400;
            response.ok = false;
            res.status(400).json({ ...data, response });
        }
    } catch (err) {
        res.status(500).json({ ...response, error: err.message });
    }
})
app.post('/getProductById', checkToken, verifyToken, async (req, res) => {
    const id = req.body.id;
    let response = {
        msg: 'Product getting fail!',
        status: 500,
        ok: false
    }
    try {
        if (id && id !== undefined && id !== '') {
            const data = await service.getDataById(id);

            response.status = 200
            response.ok = true
            response.msg = 'Product getting successful.'
            response.data = data

        }
        else {
            response.status = 400
        }
        res.status(response.status).json(response);
    } catch (err) {
        res.status(500).json({ ...response, error: err.message });
    }

})
app.post('/updateProduct', checkToken, verifyToken, async (req, res) => {
    const id = req.body.id;
    let response = {
        msg: 'Product not updated!',
        status: 500,
        ok: false
    }
    try {
        if (id && id !== undefined && id !== '') {
            response.msg = 'Product updated successful!';
            response.status = 200;
            response.ok = true;
            const data = await service.updateOneData(req.body.id, req.body);
            res.status(200).json(response);
        } else {
            response.status = 400;
            res.status(400).json(response);
        }
    } catch (err) {
        res.status(500).json({ ...response, error: err.message });
    }
})
app.post('/deleteProduct', checkToken, verifyToken, async (req, res) => {
    const id = req.body.id;
    let response = {
        msg: 'Product deleting failed!',
        status: 500,
        ok: false
    }
    try {
        if (id && id !== undefined && id !== '') {
            response.msg = 'Product deleted successful!';
            response.status = 200;
            response.ok = true;
            await service.deleteData(id);;
            res.status(200).json(response);
        } else {
            response.status = 400;
            res.status(400).json(response);
        }
    } catch (err) {
        res.status(500).json({ ...response, error: err.message });
    }
})

//  admin apis
app.post('/getAdmins', checkToken, verifyToken, async (req, res) => {
    try {
        const blogs = await adminService.getAllData();
        res.json({ data: blogs, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})
// app.post('/addAdmin', async (req, res) => {
//     try {
//         const aData = await adminService.getData();
//         await adminService.updateData({ _id: aData.id }, { token: '' });
//         res.status(200).json({status: 200, ok: true, msg: 'You Logout successful.' });
//     } catch (err) {
//         res.status(500).json({ error: err.message, status: 500, ok: false, msg: 'some thing went wrong!' });
//     }
// })
app.post('/getAdminById', checkToken, verifyToken, async (req, res) => {
    try {
        const blog = await adminService.getDataById(req.params.id);
        res.json({ data: blog, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

})
app.post('/updateAdmin', checkToken, verifyToken, async (req, res) => {
    try {
        const blog = await adminService.updateData(req.params.id, req.body);
        res.json({ data: blog, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

})
app.post('/deleteAdmin', checkToken, verifyToken, async (req, res) => {
    try {
        const blog = await adminService.deleteData(req.params.id);
        res.json({ data: blog, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// email sending here
const mailSend = async (parms) => {
    let name = parms && parms !== undefined && parms.name && parms.name !== undefined ? parms.name : 'Our One Customer';
    let email = parms && parms !== undefined && parms.email && parms.email !== undefined ? parms.email : 'Not Provided';
    let phone = parms && parms !== undefined && parms.countryCode && parms.countryCode !== undefined && parms.phone && parms.phone !== undefined ? '+' + parms.countryCode + ' ' + parms.phone : 'Not Provided';
    let message = parms && parms !== undefined && parms.message && parms.message !== undefined ? parms.message : 'Not Provided';
    let htmlContent = `<p> Name : <b> ${name} </b><p> <br/>
    <p> Email : <b> ${email} </b><p> <br/>
    <p> Phone : <b> ${phone} </b><p> <br/>
    <p> Message : <b> ${message} </b><p> <br/>
    `;
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'sherasiyaperfume@gmail.com',
            pass: 'hghsqindpyspejdb',
        },
    });

    let info = await transporter.sendMail({
        from: 'sherasiyaperfume@gmail.com',
        to: "israilgulzar@gmail.com",
        html: htmlContent,
        subject: "Sherasiya Perfumes Customer Email ✔",
    });
    console.log("Message sent: %s", info.messageId);
}
