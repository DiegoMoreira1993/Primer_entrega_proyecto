import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import ProductManager from './datos/productManager.js';
import productRouter from './routes/product.js';
import cartRouter from './routes/cart.js';

const app = express();
const httpServer = app.listen(8080, () => console.log(`Server running`)); // socket
const socketServer = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.set('views', './views');
app.set('view engine', 'handlebars');
app.use(productRouter)

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));


//Implementación de proyecto
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);

/* nuevo de socket  */

socketServer.on('connection',  socket => {
    //socket.get(ProductManager) 
    console.log(socket)
    // socket.on('messages', data =>{
    //     console.log('prueba prueba')
    // })
    // socket.emit('messages', this.getproduct())
    // app.get('/api/product', productRouter)
})

//const PORT = 8080;
// const server = app.listen(PORT, () => console.log(`Server running on port: ${server.address().port}`))
// server.on('error', error => console.log(error))