// import Swal from 'sweetalert2';
// const Swal = require('sweetalert2');
let productosCarro = [];

if (localStorage.getItem("productos")) {
    productosCarro = JSON.parse(localStorage.getItem("productos"));
    // console.log(productosCarro);
    actualizarCarro(productosCarro);
  }

cargarProductos(productos);

//FUNCION ENCARGADA DE CARGAR PRODUCTOS
function cargarProductos(listadoProductos) {
    let acumulador = "";
    // console.log(listadoProductos);
    listadoProductos.forEach(producto => {
        // console.log(producto);
      let template = `
              <div class="col-12 col-md-6 col-lg-4">
                  <div class="card m-auto my-3" style="width: 18rem;">
                      <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre
        }">
                      <div class="card-body">
                      <h5 class="card-title">${producto.nombre}</h5>
                      <p class="card-text">${producto.sku}</p>
                      <p class="card-text">Precio Normal: $ ${producto.precio}</p>
                      <p class="card-text text-danger">Descuento: -  $ ${producto.descuento
        }</p>
                      <p class="card-text text-success">Precio final: $ ${producto.precio - producto.descuento
        }</p>
                      <a class="btn btn-primary" data-sku="${producto.sku
        }" onclick="addToCart('${producto.sku}')">Comprar</a>
                      </div>
                  </div>
              </div>
          `;
      acumulador += template;
    });
  
    document.querySelector("#productos .row").innerHTML = acumulador;
  }

  function addToCart(sku) {
    let objProducto = {
      sku,
      cantidad: 1,
    };
  
    let productoEncontrado = productosCarro.find(
      (producto) => producto.sku == sku
    );
    if (productoEncontrado) {
      productoEncontrado.cantidad = productoEncontrado.cantidad + 1;
    } else {
      productosCarro.push(objProducto);
    }
    // alert("Producto agregado correctamente !!");

    Swal.fire({
      title: '',
      text: 'Producto agregado correctamente !!',
      icon: 'success',
      confirmButtonText: 'Ok'
    })

    // console.log(productosCarro);
     actualizarCarro(productosCarro);
  
     
  }
  //actualiza carro index
  function actualizarCarro(listadoProductos) {
    localStorage.setItem("productos", JSON.stringify(listadoProductos));
  
    let valorInicial = 0;
    let sumaProductos = listadoProductos.reduce(
      (accumulator, producto) => accumulator = + producto.cantidad,
      valorInicial
    );
  

    // console.log(sumaProductos)
    // const cantidad =  localStorage.getItem("productos");
    
    document.querySelector("#cantidad-productos").innerText = sumaProductos;
  }
  
//   cargarProductos();