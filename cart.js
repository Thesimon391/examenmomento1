// ==========================================
// JAVASCRIPT - PÁGINA DEL CARRITO (CART.HTML)
// ==========================================

// Renderizar productos en el carrito
function renderizarCarrito() {
    const carrito = obtenerCarrito();
    const contenedor = document.querySelector('#carrito-items');
    
    if (!contenedor) return;
    
    contenedor.innerHTML = '';
    
    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; padding: 40px;">
                    <p>Tu carrito está vacío</p>
                    <a href="index.html" class="cus-btn primary">Seguir Comprando</a>
                </td>
            </tr>
        `;
        actualizarResumenCarrito();
        return;
    }
    
    carrito.forEach((item, index) => {
        const producto = obtenerProductoPorId(item.id);
        if (producto) {
            const cantidad = item.cantidad || 1;
            const subtotal = producto.precio * cantidad;
            
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td class="product-block">
                    <a href="#" class="remove-from-cart-btn btn-eliminar" data-index="${index}" style="margin-right: 10px;">
                        <i class="fa-solid fa-x"></i>
                    </a>
                    <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 60px; height: 60px; object-fit: cover; margin-right: 10px; border-radius: 4px;">
                    <a href="#" class="h6">${producto.nombre}</a>
                </td>
                <td>
                    <p class="lead color-black">$${producto.precio.toFixed(2)}</p>
                </td>
                <td>
                    <div class="quantity quantity-wrap">
                        <div class="decrement btn-disminuir" data-index="${index}">
                            <i class="fa-solid fa-minus"></i>
                        </div>
                        <input type="text" name="quantity" value="${cantidad}" maxlength="2" size="1" class="number cantidad-input" data-index="${index}" readonly>
                        <div class="increment btn-aumentar" data-index="${index}">
                            <i class="fa-solid fa-plus"></i>
                        </div>
                    </div>
                </td>
                <td>
                    <h6>$${subtotal.toFixed(2)}</h6>
                </td>
            `;
            contenedor.appendChild(fila);
        }
    });
}

// Actualizar resumen del carrito
function actualizarResumenCarrito() {
    const carrito = obtenerCarrito();
    let subtotal = 0;
    
    carrito.forEach(item => {
        const producto = obtenerProductoPorId(item.id);
        if (producto) {
            subtotal += producto.precio * (item.cantidad || 1);
        }
    });
    
    const domicilio = 5000; // Costo fijo de domicilio
    const total = subtotal + domicilio;
    
    // Actualizar subtotal
    const elementoSubtotal = document.querySelector('#subtotal-resumen');
    if (elementoSubtotal) {
        elementoSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    }
    
    // Actualizar domicilio
    const elementoDomicilio = document.querySelector('#domicilio-resumen');
    if (elementoDomicilio) {
        elementoDomicilio.textContent = `$${domicilio.toFixed(2)}`;
    }
    
    // Actualizar total
    const elementoTotal = document.querySelector('#total-resumen');
    if (elementoTotal) {
        elementoTotal.textContent = `$${total.toFixed(2)}`;
    }
}

// Eliminar producto del carrito
function eliminarProductoCarrito(index) {
    eliminarProducto(index);
    renderizarCarrito();
    actualizarContadorCarrito();
    actualizarTablaCarritoNavbar();
    mostrarNotificacion('Producto eliminado del carrito', 'info');
}

// Aumentar cantidad
function aumentarCantidad(index) {
    const carrito = obtenerCarrito();
    if (carrito[index]) {
        carrito[index].cantidad = (carrito[index].cantidad || 1) + 1;
        guardarCarrito(carrito);
        renderizarCarrito();
        actualizarResumenCarrito();
    }
}

// Disminuir cantidad
function disminuirCantidad(index) {
    const carrito = obtenerCarrito();
    if (carrito[index]) {
        const nuevaCantidad = (carrito[index].cantidad || 1) - 1;
        if (nuevaCantidad > 0) {
            carrito[index].cantidad = nuevaCantidad;
            guardarCarrito(carrito);
        } else {
            eliminarProductoCarrito(index);
            return;
        }
        renderizarCarrito();
        actualizarResumenCarrito();
    }
}

// Inicializar event listeners
function inicializarEventosCarrito() {
    // Botones de aumentar
    document.querySelectorAll('.btn-aumentar').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            aumentarCantidad(index);
        });
    });
    
    // Botones de disminuir
    document.querySelectorAll('.btn-disminuir').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            disminuirCantidad(index);
        });
    });
    
    // Botones de eliminar
    document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const index = parseInt(this.getAttribute('data-index'));
            if (confirm('¿Deseas eliminar este producto?')) {
                eliminarProductoCarrito(index);
            }
        });
    });
    
    // Botón de continuar comprando
    const btnContinuar = document.querySelector('.cus-btn.primary');
    if (btnContinuar) {
        btnContinuar.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }
    
    // Botón de checkout
    const btnCheckout = document.querySelector('a[href="checkout.html"]');
    if (btnCheckout) {
        btnCheckout.addEventListener('click', function(e) {
            const carrito = obtenerCarrito();
            if (carrito.length === 0) {
                e.preventDefault();
                mostrarNotificacion('El carrito está vacío', 'warning');
            }
        });
    }
}

// Agregar botón de checkout dinámicamente si no existe
function agregarBotonCheckout() {
    const resumen = document.querySelector('.cart-summary');
    if (resumen && !document.querySelector('a[href="checkout.html"]')) {
        const boton = document.createElement('a');
        boton.href = 'checkout.html';
        boton.className = 'cus-btn dark w-100';
        boton.style.marginTop = '20px';
        boton.innerHTML = `
            <span class="icon-wrapper">
                <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M16.2522 11.9789C14.4658 10.1925 13.7513 6.14339 15.6567 4.23792M15.6567 4.23792C14.565 5.3296 11.4885 7.21521 7.91576 3.64246M15.6567 4.23792L4.34301 15.5516" stroke="#FCFDFD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </span>
            Proceder al Checkout
        `;
        resumen.appendChild(boton);
    }
}

// Inicializar página de carrito
document.addEventListener('DOMContentLoaded', function() {
    renderizarCarrito();
    actualizarResumenCarrito();
    inicializarEventosCarrito();
    agregarBotonCheckout();
});