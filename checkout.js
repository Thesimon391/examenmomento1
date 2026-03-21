// ==========================================
// JAVASCRIPT - PÁGINA DE CHECKOUT (CHECKOUT.HTML)
// ==========================================

// Renderizar resumen de productos en checkout
function renderizarResumenCheckout() {
    const carrito = obtenerCarrito();
    const contenedor = document.querySelector('#detalle-productos-checkout');
    
    if (!contenedor) return;
    
    contenedor.innerHTML = '';
    
    let subtotal = 0;
    
    carrito.forEach(item => {
        const producto = obtenerProductoPorId(item.id);
        if (producto) {
            const cantidad = item.cantidad || 1;
            const subtotalProducto = producto.precio * cantidad;
            subtotal += subtotalProducto;
            
            const div = document.createElement('div');
            div.className = 'd-flex justify-content-between align-items-center mb-24';
            div.innerHTML = `
                <div>
                    <p class="lead color-black">${producto.nombre} x${cantidad}</p>
                </div>
                <p class="lead">$${subtotalProducto.toFixed(2)}</p>
            `;
            contenedor.appendChild(div);
        }
    });
    
    // Agregar línea de separación
    const separador = document.createElement('hr');
    contenedor.appendChild(separador);
    
    // Agregar subtotal
    const divSubtotal = document.createElement('div');
    divSubtotal.className = 'd-flex justify-content-between align-items-center mb-24';
    divSubtotal.innerHTML = `
        <p class="lead color-black">SUBTOTAL</p>
        <p class="lead" id="subtotal-checkout">$${subtotal.toFixed(2)}</p>
    `;
    contenedor.appendChild(divSubtotal);
    
    // Costo de domicilio
    const domicilio = 5000;
    const divDomicilio = document.createElement('div');
    divDomicilio.className = 'd-flex justify-content-between align-items-center mb-24';
    divDomicilio.innerHTML = `
        <p class="lead color-black">ENVÍO</p>
        <p class="lead" id="envio-checkout">$${domicilio.toFixed(2)}</p>
    `;
    contenedor.appendChild(divDomicilio);
}

// Actualizar total del checkout
function actualizarTotalCheckout() {
    const carrito = obtenerCarrito();
    let subtotal = 0;
    
    carrito.forEach(item => {
        const producto = obtenerProductoPorId(item.id);
        if (producto) {
            subtotal += producto.precio * (item.cantidad || 1);
        }
    });
    
    const domicilio = 5000;
    const metoPago = document.querySelector('input[name="metodo-pago"]:checked');
    const metodoPagoValue = metoPago ? metoPago.value : 'contra-entrega';
    
    let total = subtotal + domicilio;
    
    // Agregar % a contra entrega
    if (metodoPagoValue === 'contra-entrega') {
        total = subtotal + domicilio + (subtotal * 0.05); // 5%
    }
    
    const elementoTotal = document.querySelector('#total-checkout');
    if (elementoTotal) {
        elementoTotal.textContent = `$${total.toFixed(2)}`;
    }
}

// Validar formulario de checkout
function validarFormularioCheckout(datos) {
    const errores = [];
    
    if (!datos.nombres || datos.nombres.trim() === '') {
        errores.push('El nombre es requerido');
    }
    
    if (!datos.apellidos || datos.apellidos.trim() === '') {
        errores.push('El apellido es requerido');
    }
    
    if (!datos.email || !validarEmail(datos.email)) {
        errores.push('El email es inválido');
    }
    
    if (!datos.celular || !validarTelefono(datos.celular)) {
        errores.push('El celular es inválido');
    }
    
    if (!datos.direccion || datos.direccion.trim() === '') {
        errores.push('La dirección es requerida');
    }
    
    return errores;
}

// Obtener datos del formulario
function obtenerDatosFormularioCheckout() {
    return {
        nombres: document.querySelector('#nombres-checkout')?.value || '',
        apellidos: document.querySelector('#apellidos-checkout')?.value || '',
        email: document.querySelector('#email-checkout')?.value || '',
        celular: document.querySelector('#celular-checkout')?.value || '',
        direccion: document.querySelector('#direccion-checkout')?.value || '',
        direccion2: document.querySelector('#direccion2-checkout')?.value || '',
        notas: document.querySelector('#notas-checkout')?.value || '',
        metodoPago: document.querySelector('input[name="metodo-pago"]:checked')?.value || 'contra-entrega'
    };
}

// Generar número de pedido
function generarNumeroPedido() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `PED-${timestamp}${random}`.slice(0, 20);
}

// Guardar pedido
function guardarPedido(datos) {
    const carrito = obtenerCarrito();
    const numeroPedido = generarNumeroPedido();
    const fechaPedido = new Date().toISOString();
    
    let subtotal = 0;
    carrito.forEach(item => {
        const producto = obtenerProductoPorId(item.id);
        if (producto) {
            subtotal += producto.precio * (item.cantidad || 1);
        }
    });
    
    const domicilio = 5000;
    let total = subtotal + domicilio;
    
    if (datos.metodoPago === 'contra-entrega') {
        total += (subtotal * 0.05);
    }
    
    const pedido = {
        numeroPedido,
        fechaPedido,
        cliente: {
            nombres: datos.nombres,
            apellidos: datos.apellidos,
            email: datos.email,
            celular: datos.celular,
            direccion: datos.direccion,
            direccion2: datos.direccion2
        },
        productos: carrito,
        notas: datos.notas,
        metodoPago: datos.metodoPago,
        subtotal,
        domicilio,
        total,
        estado: 'pendiente'
    };
    
    // Guardar en localStorage
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    pedidos.push(pedido);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    
    // Guardar número de pedido para la página de confirmación
    localStorage.setItem('ultimoPedido', JSON.stringify(pedido));
    
    return numeroPedido;
}

// Manejar envío del formulario
function inicializarFormularioCheckout() {
    const formulario = document.querySelector('#form-checkout');
    
    if (!formulario) return;
    
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const datos = obtenerDatosFormularioCheckout();
        const errores = validarFormularioCheckout(datos);
        
        if (errores.length > 0) {
            mostrarNotificacion(
                'Errores en el formulario:<br>' + errores.join('<br>'),
                'danger'
            );
            return;
        }
        
        const numeroPedido = guardarPedido(datos);
        mostrarNotificacion('Pedido creado exitosamente', 'success');
        
        // Redirigir a página de confirmación
        setTimeout(() => {
            window.location.href = 'thankyou.html';
        }, 1500);
    });
}

// Manejar cambio de método de pago
function inicializarMetodosPago() {
    const radios = document.querySelectorAll('input[name="metodo-pago"]');
    
    radios.forEach(radio => {
        radio.addEventListener('change', function() {
            actualizarTotalCheckout();
        });
    });
}

// Auto llenar formulario si tiene datos guardados
function autoLlenarFormulario() {
    const datosGuardados = obtenerDatosFormulario('checkout');
    
    if (Object.keys(datosGuardados).length > 0) {
        if (datosGuardados.nombres) document.querySelector('#nombres-checkout').value = datosGuardados.nombres;
        if (datosGuardados.apellidos) document.querySelector('#apellidos-checkout').value = datosGuardados.apellidos;
        if (datosGuardados.email) document.querySelector('#email-checkout').value = datosGuardados.email;
        if (datosGuardados.celular) document.querySelector('#celular-checkout').value = datosGuardados.celular;
        if (datosGuardados.direccion) document.querySelector('#direccion-checkout').value = datosGuardados.direccion;
    }
}

// Guardar datos del formulario en tiempo real
function guardarFormularioEnTiempoReal() {
    const campos = document.querySelectorAll('#form-checkout input, #form-checkout textarea');
    
    campos.forEach(campo => {
        campo.addEventListener('change', function() {
            const datos = obtenerDatosFormularioCheckout();
            guardarDatosFormulario('checkout', datos);
        });
    });
}

// Inicializar página de checkout
document.addEventListener('DOMContentLoaded', function() {
    // Validar que haya productos en el carrito
    const carrito = obtenerCarrito();
    if (carrito.length === 0) {
        mostrarNotificacion('El carrito está vacío. Redirigiendo...', 'warning');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
        return;
    }
    
    renderizarResumenCheckout();
    actualizarTotalCheckout();
    inicializarFormularioCheckout();
    inicializarMetodosPago();
    autoLlenarFormulario();
    guardarFormularioEnTiempoReal();
});