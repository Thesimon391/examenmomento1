// Seleccionamos todos los productos
const productos = document.querySelectorAll(".producto");

// Seleccionamos la tabla del carrito
const tablaCarrito = document.querySelector(".list-cart tbody");

// contador del carrito
const contador = document.querySelector(".contar-pro");

// variable para contar productos
let totalProductos = 0;


// recorrer todos los productos
productos.forEach(function(producto){

    // cuando se haga clic en un producto
    producto.addEventListener("click", function(){

        // obtener datos del producto
        let id = producto.dataset.id;
        let nombre = producto.dataset.name;
        let precio = producto.dataset.price;
        let imagen = producto.dataset.image;

        // crear fila en la tabla
        let fila = document.createElement("tr");

        fila.innerHTML = `
        <td>${id}</td>
        <td><img src="${imagen}" width="50"></td>
        <td>${nombre}</td>
        <td>$${precio}</td>
        `;

        // agregar fila a la tabla
        tablaCarrito.appendChild(fila);

        // aumentar contador
        totalProductos++;
        contador.textContent = totalProductos;

    });

});