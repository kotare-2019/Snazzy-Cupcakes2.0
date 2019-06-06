const express = require('express')
const router = express.Router()
const data = require('./data')
const fs = require("fs")

const server = express();

router.get('/', (req, res) => {
    res.render('cupcakes/index', data)
})

router.get('/cupcakes', (req, res) => {
    res.render('cupcakes/index', data)
})

router.get('/cupcakes/:id', (req, res) => {
    const cupcakeArray = data.cupcakes.find(item => {
        return item.id == req.params.id;
    });
    res.render("cupcakes/view", cupcakeArray);
});

router.get('/cupcakes/edit/:id', (req, res) => {
    const cupcakeArray = data.cupcakes.find(item => {
        return item.id == req.params.id;
    });
    res.render("cupcakes/edit", cupcakeArray);
});

router.post('/cupcakes/edit/:id', (req, res) => {
    let updatedCupcakes = req.body;
    updatedCupcakes.id = req.params.id
    let cupcakeArr = data.cupcakes.map(cupper => {
        if(cupper.id == req.params.id) {
            return updatedCupcakes
        } else {
            return cupper
        }
    });

    data.cupcakes = cupcakeArr

    fs.writeFile(
        "./data.json",
        JSON.stringify(data, null, 2),
        "utf8",
        err => {
            if (err) throw err;
            console.log("The cupcakes have been updated");
            res.redirect("/cupcakes/");
        }
    );
})

module.exports = router





// "breed": "Human 1",

//  "_locals": {}


