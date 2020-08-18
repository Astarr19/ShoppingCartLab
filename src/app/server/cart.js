"use strict";
const express = require('express');
const cart = express.Router();

let myCart = [
    {id: 1, product: 'Sandwich', price: 4.99, quantity: 4},
    {id: 2, product: 'Snickers', price: 3.59, quantity: 36},
    {id: 3, product: 'Furniture', price: 99.32, quantity: 1},
    {id: 4, product: 'Bouncy Ball', price: 0.19, quantity: 200},
];

cart.get('/', (req,res)=>{
    res.json(myCart);
    res.status(200);
})

cart.post('/', (req,res)=>{
    console.log(req.body);
    let item = {
        id: myCart.length + 1,
        product: req.body.newItem.product,
        price: req.body.newItem.price,
        quantity: req.body.newItem.quantity
    };
    myCart.push(item);
    res.status(201)
    res.json(item);
})

cart.put('/:id', (req,res)=>{
    if(req.params.id <= myCart.length && req.params.id > 0){
        let item = {
            id: parseInt(req.params.id) + 1,
            product: req.body.newItem.product,
            price: req.body.newItem.price,
            quantity: req.body.newItem.quantity
        };
        myCart.splice(parseInt(req.params.id),1,item);
        res.json(item);
        res.status(200);
    } else {
        res.json({message: "not a valid id"})
        res.status(400);
    }
})

cart.delete('/:id', (req,res)=>{
    if(req.params.id <= myCart.length && req.params.id >= 0){
        myCart.splice((req.params.id),1);
        res.status(204);
        res.end()
    } else {
        res.json({message: "not a valid id"})
        res.end()
    }
})

module.exports = cart;