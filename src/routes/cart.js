import express from 'express';
import { Router } from "express";
import cartManager from "../datos/CartManager.js";

const cartRouter = Router();

const  carManager = new cartManager()

cartRouter.get('/', async (req, res) =>{
    let carrito = await carManager.getCarts()
    res.send(carrito)
})

cartRouter.get('/:cid', async (req, res) =>{
    let {cid} = req.params;
    let carrito = await carManager.getCartsById(cid);
    if (!carrito) {
        res.send(400).send({status: 'error', msg: `No existe este id: ${cid} para un carrito`});
    } 
        res.send(carrito); 
})

cartRouter.post('/', async (req, res) => {
    let cart = await carManager.createCar();
    res.send({status: "success", msg: "cart created"})
})

cartRouter.post('/:cid/product/:pid', async(req,res) =>{
    let {cid} = req.params;
    let {pid} = req.params;
    let carrito = await carManager.addProductToCart(cid,pid);
    res.send({status: "success", msg: "se agrego product"})

})


export default cartRouter;

