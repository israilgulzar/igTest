
- // login
    req_body ==
{
    'email': "ig@gmail.com", // R
    "password": "123" // R
}


res ==
    {
        "msg": "Login SuccessFul.",
        "status": 200,
        "ok": true,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTY5Njk1ZWQ5M2Q4MWQ0NmZhNzExOSIsInBhc3N3b3JkIjoiJDJiJDEwJDRwMEp6NC5oMUl2YmtZTDRHNllJOU9zN3BjeWZsYzlOelhBeFgyemhtOVNVVGlDZEczZXVDIiwiaWF0IjoxNjcxMjQyMzk2LCJleHAiOjE2NzEyNzIzOTZ9.b0BGRyqTuT2jBD82IXdSBezMlXIiEGS8bIJga2uHzqA"
    }


    - // addProducts

    // schema 
    // {
    //     name: { type: String, required: true },
    //     description: { type: String },
    //     thumb_image_url: { type: String },
    //     slider_image_url: [String],
    //     price: { type: Number, required: true },
    //     discount: { type: Number, default: 0 },
    //     is_active: { type: Boolean, default: true },
    //     quantity: 10,
    //     updated_date: { type: Date, default: Date.now },
    //     created_date: { type: Date, default: Date.now },
    // }


    req_header ==

    'authorization' = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTY5Njk1ZWQ5M2Q4MWQ0NmZhNzExOSIsInBhc3N3b3JkIjoiJDJiJDEwJDRwMEp6NC5oMUl2YmtZTDRHNllJOU9zN3BjeWZsYzlOelhBeFgyemhtOVNVVGlDZEczZXVDIiwiaWF0IjoxNjcwOTg0MDk4LCJleHAiOjE2NzEwMTQwOTh9.U1-qWAk52PmBanlGBT1b-qchT2VmuO63OTeeHM-V39o", // R


        req_body ==
        {
            name: 'testing', //R
            price: 15, //R
            description: 'fdfldsjdslfjsdlfjs',
            thumb_image_url: 'sabl/ff/hi.jpg',
            slider_image_url: ['sabl/ff/hi.jpg', 'sabl/ff/hi.jpg', 'sabl/ff/hi.jpg'],
            discount: 0,
            is_active: true,
            quantity: 10,
            updated_date: date,
            created_date: date,
        }


res ==
    {
        "msg": "Product added successful.",
        "status": 201,
        "ok": true,
        "data": {
            "name": "abc",
            "slider_image_url": [],
            "price": 10,
            "discount": 0,
            "is_active": true,
            "_id": "639d266a6e80e1a5af2942cd",
            "updated_date": "2022-12-17T02:16:10.951Z",
            "created_date": "2022-12-17T02:16:10.951Z",
            "__v": 0
        }
    }


    - //  getProductById

    req_header ==

    'authorization' = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTY5Njk1ZWQ5M2Q4MWQ0NmZhNzExOSIsInBhc3N3b3JkIjoiJDJiJDEwJDRwMEp6NC5oMUl2YmtZTDRHNllJOU9zN3BjeWZsYzlOelhBeFgyemhtOVNVVGlDZEczZXVDIiwiaWF0IjoxNjcwOTg0MDk4LCJleHAiOjE2NzEwMTQwOTh9.U1-qWAk52PmBanlGBT1b-qchT2VmuO63OTeeHM-V39o", // R


        req_body ==
        {
            id: '63993231749e3c03afcd316',
        }


res ==
    {
        "msg": "Product getting successful.",
        "status": 200,
        "ok": true,
        "data": {
            "_id": "63993220749e3c03afcd3161",
            "name": "igp",
            "slider_image_url": [],
            "price": 10,
            "discount": 0,
            "is_active": true,
            "updated_date": "2022-12-14T02:17:04.020Z",
            "created_date": "2022-12-14T02:17:04.020Z",
            "__v": 0
        }
    }

    - //  getProducts

    req_header ==

    'authorization' = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTY5Njk1ZWQ5M2Q4MWQ0NmZhNzExOSIsInBhc3N3b3JkIjoiJDJiJDEwJDRwMEp6NC5oMUl2YmtZTDRHNllJOU9zN3BjeWZsYzlOelhBeFgyemhtOVNVVGlDZEczZXVDIiwiaWF0IjoxNjcwOTg0MDk4LCJleHAiOjE2NzEwMTQwOTh9.U1-qWAk52PmBanlGBT1b-qchT2VmuO63OTeeHM-V39o", // R


        req_body ==
        {
            'start': 0,
            'limit': 3,
        }


res ==
{
    "data": [
        {
            "_id": "63993220749e3c03afcd3161",
            "name": "igp",
            "slider_image_url": [],
            "price": 10,
            "discount": 0,
            "is_active": true,
            "updated_date": "2022-12-14T02:17:04.020Z",
            "created_date": "2022-12-14T02:17:04.020Z",
            "__v": 0
        },
        {
            "_id": "63993231749e3c03afcd3163",
            "name": "abc",
            "slider_image_url": [],
            "price": 10,
            "discount": 0,
            "is_active": true,
            "updated_date": "2022-12-14T02:17:21.732Z",
            "created_date": "2022-12-14T02:17:21.732Z",
            "__v": 0
        },
        {
            "_id": "639d266a6e80e1a5af2942cd",
            "name": "abc",
            "slider_image_url": [],
            "price": 10,
            "discount": 0,
            "is_active": true,
            "updated_date": "2022-12-17T02:16:10.951Z",
            "created_date": "2022-12-17T02:16:10.951Z",
            "__v": 0
        }
    ],
    "msg": "Products Listing successful.",
    "status": 200,
    "ok": true
}