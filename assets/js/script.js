import productos from "./productos.js"
import Producto from "./Producto.js";


function cargarTabla(listaProductos){
    let cuerpoTabla = document.querySelector(".section_mantenedor_productos tbody");
    cuerpoTabla.innerHTML = "";

    let acumuladorFilas = "";
    listaProductos.forEach(producto => {
        acumuladorFilas += `
                <tr>
                    <th scope="row">${producto.id}</th>
                    <td>${producto.nombre}</td>
                    <td>${producto.descripcion}</td>
                    <td>${producto.precio}</td>
                    <td>${producto.stock}</td>
                    <td>${producto.imagen}</td>
                </tr>
        `
    });
    cuerpoTabla.innerHTML = acumuladorFilas;

}

function buscarProducto(id){
    let producto = new Producto(id);
    return producto.getProduct();
}

crud_form.addEventListener("submit", (event)=>{
    event.preventDefault();
})


//funcion que capture evento del input crud_id

let inputId = document.getElementById("crud_id");
inputId.addEventListener("change", (event) =>{
    event.preventDefault();
    let id =  inputId.value;
    let producto = buscarProducto(id);
    if(producto){
        crud_nombre.value = producto.nombre;
        crud_descripcion.value = producto.descripcion;
        crud_precio.value = producto.precio;
        crud_stock.value = producto.stock;
        crud_imagen.value = producto.imagen;
    }else{
        crud_nombre.value = "";
        crud_descripcion.value = "";
        crud_precio.value = 0;
        crud_stock.value = 0;
        crud_imagen.value = "";

    }
})

//AGREGAR PRODUCTOS
document.getElementById("btn-agregar").addEventListener("click", (event)=> {
    event.preventDefault();
    let id = crud_id.value;
    let nombre = crud_nombre.value;
    let descripcion = crud_descripcion.value;
    let precio = crud_precio.value;
    let stock = crud_stock.value;
    let imagen = crud_imagen.value;
    
    let nuevoProducto = new Producto(id, nombre, descripcion, precio, stock, imagen);
    if(nuevoProducto.getProduct()){
        alert("Ya existe un producto con dicho ID.")
    }else{
        nuevoProducto.addProduct();
        cargarTabla(nuevoProducto.getProducts());
    } 
})

//ELIMINAR PRODUCTOS
document.getElementById("btn-eliminar").addEventListener("click", (event)=> {
    event.preventDefault();
    let id = crud_id.value;
    
    let producto = new Producto(id);
    if(producto.getProduct()){
        let respuesta = confirm("Está seguro que quiere eliminar el producto con ID: " + producto.id);
        if(respuesta){
            producto.deleteProduct();
        cargarTabla(producto.getProducts());
        }
        
    }else{
        alert("El producto que intenta eliminar no existe en la BD.")
    }
    
})

//MODIFICAR PRODUCTOS
document.getElementById("btn-modificar").addEventListener("click", (event)=> {
    event.preventDefault();
    let id = crud_id.value;
    let nombre = crud_nombre.value;
    let descripcion = crud_descripcion.value;
    let precio = crud_precio.value;
    let stock = crud_stock.value;
    let imagen = crud_imagen.value;

    let producto= new Producto(id, nombre, descripcion, precio, stock, imagen);
    if(producto.getProduct()){
        producto.updateProduct();
        cargarTabla(producto.getProducts());
    }else{
        alert("El producto que intenta actualizar no existe en la BD.")
    } 
})

function main(){
    let productosStorage = JSON.parse(localStorage.getItem("productos"));
    if(!productosStorage){
        productosStorage = productos;
        localStorage.setItem("productos", JSON.stringify(productosStorage))
    }

    cargarTabla(productosStorage);

}

main();

let productosStorage = JSON.parse(localStorage.getItem("productos")) || [];

export default class Producto{
    constructor(id, nombre = "", descripcion = "Sin descripción", precio = 999999, stock = 0, imagen = ""){
        this.id = id;
        this.nombre = nombre;
        this.descripcion= descripcion
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
    }

    getProducts(){
        productosStorage = productosStorage = JSON.parse(localStorage.getItem("productos")) || []
        return productosStorage;
    }
    getProduct(){
        productosStorage = JSON.parse(localStorage.getItem("productos")) || []
        return productosStorage.find(producto => producto.id == this.id);
    }
    deleteProduct(){
        productosStorage = JSON.parse(localStorage.getItem("productos")) || []
        productosStorage = productosStorage.filter(producto => producto.id != this.id)
        localStorage.setItem("productos", JSON.stringify(productosStorage))
        return productosStorage;
    }
    updateProduct(){
        productosStorage = JSON.parse(localStorage.getItem("productos")) || []
        let producto = productosStorage.find(producto => producto.id ==this.id)
        producto.nombre= this.nombre;
        producto.descripcion= this.descripcion;
        producto.precio = this.precio;
        producto.stock = this.stock;
        producto.imagen = this.imagen;
        localStorage.setItem("productos", JSON.stringify(productosStorage))
        return producto;
    }
    addProduct(){
        productosStorage = JSON.parse(localStorage.getItem("productos")) || []
        productosStorage.push(
            {
                id: this.id,
                nombre: this.nombre,
                descripcion: this.descripcion,
                precio: this.precio, 
                stock: this.stock,
                imagen: this.imagen
            }
            )
            localStorage.setItem("productos", JSON.stringify(productosStorage))
        return productosStorage
    }

}