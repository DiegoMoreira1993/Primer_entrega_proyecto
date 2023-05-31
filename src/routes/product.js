import express from 'express';
import ProductManager from '../datos/productManager.js';
import {Router} from 'express'
import { validarProducto } from '../utils/index.js';

const productRouter = Router();

const manager = new ProductManager();

productRouter.get('/', async (req, res) =>{
    const limit = req.query.limit;
//console.log(limit)
    let products = await manager.getproduct()
    let response;
    if (limit){
        response = products.slice(0,limit)
        // res.send(response)
        res.render('index', {response})
    }else {
        // res.send(products)
        res.render('index', {products})
    }
})

productRouter.get('/:pid', async (req,res) =>{
    let {pid} = req.params;
    let productos = await manager.getProductById(pid);
    if (!productos) {
        res.send(400).send({status: 'error', msg: `No existe este id: ${pid} para un producto`});
    } 
        res.send(productos); 
})

productRouter.post('/', async (req,res) =>{
    let producto = req.body;
    let code_repet = await manager.machCode(producto.code)
    if(!validarProducto(producto) || (code_repet !== -1 )){
        res.status(400).send({status: 'error', msg: 'Invalid product or code repeated'});
    }
    await manager.addProduct(producto);
    res.send({status: "success", msg: 'Producto agregado'})
    //res.send({status: "success", mgs:"product added", payload: producto})
})

productRouter.put ('/:pid', async (req,res) => {
    let pid = req.params.pid;
    let fields = req.body;
    let updateProd = await manager.updateProduct(pid,fields)
    if (!updateProd){
        res.status(400).send({status:'error', msg: 'Product not found'})
    }
    res.send({status: 'success', msg: `Product ${updateProd.pid} updated`})
})

productRouter.delete('/pid', async (req,res) =>{
    let pid = req.params.pid;
    let deleteProd = await manager.deleteProduct(pid)
    if(!deleteProd){
        res.status(400).send({status:'error', msg: 'Product not found'})
    }
        res.send({status: 'success', msg: `Product ${deleteProd.pid} elimined`})
})



export default productRouter;