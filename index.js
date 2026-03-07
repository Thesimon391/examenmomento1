// ==========================================
// JAVASCRIPT - PÁGINA DE INICIO (INDEX.HTML)
// ==========================================

// Renderizar productos en la sección de burgers
function renderizarProductos() {
    const burgerSection = document.querySelector('#burger .row');
    
    if (!burgerSection) return;
    
    // Limpiar contenido existente
    burgerSection.innerHTML = '';
    
    // Obtener todos los productos
    const todos = obtenerTodosProductos();
    
    todos.forEach(producto => {
        const col = document.createElement('div');
        col.className = 'col-md-3 py-3 py-md-0';
        col.innerHTML = `
            <div class="card" style="border: none; box-shadow: 0 4px 8px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden; height: 100%;">
                <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 100%; height: 250px; object-fit: cover;">
                <div class="card-body" style="padding: 15px;">
                    <h5 class="card-title" style="margin-bottom: 8px; font-weight: bold; color: #333;">${producto.nombre}</h5>
                    <p class="card-text" style="font-size: 13px; color: #666; margin-bottom: 10px;">${producto.descripcion}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                        <p style="color: #ffc800; font-weight: bold; font-size: 18px; margin: 0;">$${producto.precio.toFixed(2)}</p>
                    </div>
                    <button class="cus-btn primary btn-agregar-carrito" data-id="${producto.id}" style="width: 100%; font-size: 13px; padding: 8px 0;">
                        <i class="fa-solid fa-cart-plus"></i> Agregar
                    </button>
                </div>
            </div>
        `;
        burgerSection.appendChild(col);
    });
}

// Agregar producto al carrito
function agregarProductoCarrito(idProducto) {
    const producto = obtenerProductoPorId(idProducto);
    
    if (!producto) {
        mostrarNotificacion('Producto no encontrado', 'danger');
        return;
    }
    
    const carrito = obtenerCarrito();
    const productoExistente = carrito.find(item => item.id === idProducto);
    
    if (productoExistente) {
        productoExistente.cantidad = (productoExistente.cantidad || 1) + 1;
    } else {
        carrito.push({
            id: idProducto,
            cantidad: 1
        });
    }
    
    guardarCarrito(carrito);
    actualizarContadorCarrito();
    actualizarTablaCarritoNavbar();
    mostrarNotificacion(`${producto.nombre} agregado al carrito`, 'success');
}

// Event listeners para botones de agregar
function inicializarEventosAgregar() {
    const botonesAgregar = document.querySelectorAll('.btn-agregar-carrito, #rn');
    
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Si tiene data-id, usar ese
            const idProducto = this.getAttribute('data-id');
            if (idProducto) {
                agregarProductoCarrito(parseInt(idProducto));
            } else {
                // Si no, usar un producto por defecto (para botones genéricos)
                agregarProductoCarrito(1);
            }
        });
    });
}

// Filtrar productos por categoría
function filtrarPorCategoria(categoria) {
    const productos = obtenerProductosPorCategoria(categoria);
    const burgerSection = document.querySelector('#burger .row');
    
    if (!burgerSection) return;
    
    burgerSection.innerHTML = '';
    
    productos.forEach(producto => {
        const col = document.createElement('div');
        col.className = 'col-md-3 py-3 py-md-0';
        col.innerHTML = `
            <div class="card" style="border: none; box-shadow: 0 4px 8px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden; height: 100%;">
                <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 100%; height: 250px; object-fit: cover;">
                <div class="card-body" style="padding: 15px;">
                    <h5 class="card-title" style="margin-bottom: 8px; font-weight: bold; color: #333;">${producto.nombre}</h5>
                    <p class="card-text" style="font-size: 13px; color: #666; margin-bottom: 10px;">${producto.descripcion}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                        <p style="color: #ffc800; font-weight: bold; font-size: 18px; margin: 0;">$${producto.precio.toFixed(2)}</p>
                    </div>
                    <button class="cus-btn primary btn-agregar-carrito" data-id="${producto.id}" style="width: 100%; font-size: 13px; padding: 8px 0;">
                        <i class="fa-solid fa-cart-plus"></i> Agregar
                    </button>
                </div>
            </div>
        `;
        burgerSection.appendChild(col);
    });
    
    inicializarEventosAgregar();
}

// Manejar clics en el menú de navegación
function inicializarNavegacion() {
    // Links del menú
    const linkBurger = document.querySelector('.navbar-nav .nav-link:nth-child(2)');
    const linkPizza = document.querySelector('.dropdown-menu .dropdown-item:nth-child(1)');
    const linkFries = document.querySelector('.dropdown-menu .dropdown-item:nth-child(2)');
    const linkChicken = document.querySelector('.dropdown-menu .dropdown-item:nth-child(3)');
    
    if (linkBurger) {
        linkBurger.addEventListener('click', function(e) {
            e.preventDefault();
            filtrarPorCategoria('burgers');
        });
    }
    
    if (linkPizza) {
        linkPizza.addEventListener('click', function(e) {
            e.preventDefault();
            filtrarPorCategoria('pizza');
        });
    }
    
    if (linkFries) {
        linkFries.addEventListener('click', function(e) {
            e.preventDefault();
            filtrarPorCategoria('papas');
        });
    }
    
    if (linkChicken) {
        linkChicken.addEventListener('click', function(e) {
            e.preventDefault();
            filtrarPorCategoria('pollo');
        });
    }
}

// Manejar clics en el icono del carrito
function manejarCarrito() {
    const carritoIcon = document.querySelector('.carrito');
    
    if (carritoIcon) {
        carritoIcon.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'cart.html';
        });
    }
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', function() {
    renderizarProductos();
    inicializarEventosAgregar();
    inicializarNavegacion();
    manejarCarrito();
    
    // Logs de depuración
    console.log('Base de datos:', obtenerResumenBD());
    console.log('Carrito:', obtenerCarrito());
});