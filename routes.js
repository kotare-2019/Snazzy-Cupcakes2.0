const express = require('express')
const router = express.Router()
const data = require('./data')
const fs = require("fs")

const server = express();


let moreCupcakes = {
    cupcakes : data
}


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

router.get('/cupcakes/add/new', (req, res) => {
    
    res.render("cupcakes/add");
});

//  router.post('/cupcakes/add/new', (req, res) => {
//     req.body = 

//     console.log(body)
    // fs.appendFile(
    //     "./data.json",
    //     JSON.stringify(data, null, 2),
    //     "utf8",
    //     err => {
    //         if (err) throw err;
    //         console.log("The cupcakes have been updated");
    //         res.redirect("/cupcakes/");

    // })
    router.post('/cupcakes/add/new', (req, res) => {
        req.body.id = data.cupcakes.length + 1;
        
        data.cupcakes.push(req.body)
        console.log(req.body)
        fs.writeFile('data.json', JSON.stringify(data, null, 2), 'utf8', (err) => {
            res.redirect('/cupcakes/' + req.body.id);
        })
     })

module.exports = router
