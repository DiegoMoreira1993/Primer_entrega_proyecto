import ProductManager from "../../src/datos/productManager";

const socket = io();

let product = await getproduct()

socket.on('messages', data => {
    let product = getproduct()
})