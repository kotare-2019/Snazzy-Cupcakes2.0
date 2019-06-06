const express = require('express')
const router = express.Router()
const data = require('./data')
const fs = require("fs")

const server = express();

router.get('/', (req, res) => {
    res.render('puppies/index', data)
})

router.get('/puppies', (req, res) => {
    res.render('puppies/index', data)
})

router.get('/puppies/:id', (req, res) => {
    const puppyArray = data.puppies.find(item => {
        return item.id == req.params.id;
    });
    res.render("puppies/view", puppyArray);
});

router.get('/puppies/edit/:id', (req, res) => {
    const puppyArray = data.puppies.find(item => {
        return item.id == req.params.id;
    });
    res.render("puppies/edit", puppyArray);
});

router.post('/puppies/edit/:id', (req, res) => {
    let updatedPuppy = req.body;
    updatedPuppy.id = req.params.id
    let puppyArr = data.puppies.map(pupper => {
        if(pupper.id == req.params.id) {
            return updatedPuppy
        } else {
            return pupper
        }
    });

    data.puppies = puppyArr

    fs.writeFile(
        "./data.json",
        JSON.stringify(data, null, 2),
        "utf8",
        err => {
            if (err) throw err;
            console.log("The puppies have been updated");
            res.redirect("/puppies/");
        }
    );
})

module.exports = router





// "breed": "Human 1",

//  "_locals": {}


