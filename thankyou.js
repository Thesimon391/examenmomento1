// ==========================================
// JAVASCRIPT - PÁGINA DE CONFIRMACIÓN (THANKYOU.HTML)
// ==========================================

// Mostrar información del pedido
function mostrarInformacionPedido() {
    const pedido = JSON.parse(localStorage.getItem('ultimoPedido'));
    
    if (!pedido) {
        mostrarNotificacion('No se encontró información del pedido', 'warning');
        return;
    }
    
    // Mostrar número de pedido
    const elementoNumeroPedido = document.querySelector('#numero-pedido-final');
    if (elementoNumeroPedido) {
        elementoNumeroPedido.textContent = `#${pedido.numeroPedido}`;
    }
    
    // Mostrar tiempo de entrega
    const elementoTiempoEntrega = document.querySelector('#tiempo-entrega');
    if (elementoTiempoEntrega) {
        // Calcular tiempo estimado (30-45 minutos)
        const tiempoEstimado = Math.floor(Math.random() * 15) + 30; // Entre 30 y 45 minutos
        elementoTiempoEntrega.textContent = `${tiempoEstimado} minutos`;
    }
    
    // Log de información
    console.log('Pedido confirmado:', pedido);
}

// Crear resumen del pedido
function crearResumenPedido() {
    const pedido = JSON.parse(localStorage.getItem('ultimoPedido'));
    
    if (!pedido) return;
    
    const contenedor = document.querySelector('.page-content');
    if (!contenedor) return;
    
    // Crear sección de detalles del pedido
    const detalles = document.createElement('div');
    detalles.style.marginTop = '40px';
    detalles.innerHTML = `
        <div class="row">
            <div class="col-xxl-4 col-lg-6 col-md-8 col-sm-10 offset-xxl-4 offset-lg-3 offset-md-2 offset-sm-1">
                <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
                    <h6 style="color: #999; margin: 0; font-size: 12px; font-weight: bold;">DATOS DE ENTREGA</h6>
                    <p style="margin: 10px 0; color: #333;">
                        <strong>${pedido.cliente.nombres} ${pedido.cliente.apellidos}</strong><br>
                        ${pedido.cliente.email}<br>
                        ${pedido.cliente.celular}<br>
                        ${pedido.cliente.direccion}
                        ${pedido.cliente.direccion2 ? '<br>' + pedido.cliente.direccion2 : ''}
                    </p>
                </div>
                
                <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
                    <h6 style="color: #999; margin: 0; font-size: 12px; font-weight: bold; margin-bottom: 10px;">RESUMEN DE ORDEN</h6>
                    <div id="resumen-productos-thankyou" style="margin-bottom: 15px;"></div>
                    <hr style="margin: 15px 0;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span>Subtotal:</span>
                        <strong>$${pedido.subtotal.toFixed(2)}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span>Envío:</span>
                        <strong>$${pedido.domicilio.toFixed(2)}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 18px; color: #ffc800;">
                        <span>TOTAL:</span>
                        <strong>$${pedido.total.toFixed(2)}</strong>
                    </div>
                </div>
                
                <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc800;">
                    <h6 style="color: #999; margin: 0; font-size: 12px; font-weight: bold; margin-bottom: 10px;">MÉTODO DE PAGO</h6>
                    <p style="margin: 0; color: #333;">
                        <strong>${formatearMetodoPago(pedido.metodoPago)}</strong>
                    </p>
                </div>
            </div>
        </div>
    `;
    
    contenedor.appendChild(detalles);
    
    // Renderizar productos
    renderizarProductosPedido(pedido);
}

// Formatear método de pago
function formatearMetodoPago(metodo) {
    const metodos = {
        'contra-entrega': 'Contra Entrega (+5%)',
        'pse': 'PSE',
        'transferencia': 'Transferencia Bancaria'
    };
    return metodos[metodo] || metodo;
}

// Renderizar productos del pedido
function renderizarProductosPedido(pedido) {
    const contenedor = document.querySelector('#resumen-productos-thankyou');
    if (!contenedor) return;
    
    contenedor.innerHTML = '';
    
    pedido.productos.forEach(item => {
        const producto = obtenerProductoPorId(item.id);
        if (producto) {
            const cantidad = item.cantidad || 1;
            const subtotal = producto.precio * cantidad;
            
            const div = document.createElement('div');
            div.style.display = 'flex';
            div.style.justifyContent = 'space-between';
            div.style.marginBottom = '8px';
            div.style.fontSize = '14px';
            div.innerHTML = `
                <span>${producto.nombre} x${cantidad}</span>
                <strong>$${subtotal.toFixed(2)}</strong>
            `;
            contenedor.appendChild(div);
        }
    });
}

// Manejar botón de volver al inicio
function inicializarBotonesAccion() {
    const btnVolver = document.querySelector('a[href="index.html"]');
    if (btnVolver) {
        btnVolver.addEventListener('click', function(e) {
            e.preventDefault();
            // Limpiar carrito y últimos datos
            vaciarCarrito();
            localStorage.removeItem('ultimoPedido');
            window.location.href = 'index.html';
        });
    }
}

// Enviar confirmación por email (simulado)
function enviarConfirmacionEmail() {
    const pedido = JSON.parse(localStorage.getItem('ultimoPedido'));
    
    if (!pedido) return;
    
    // En una aplicación real, este sería un llamado a API
    console.log('Enviando confirmación a:', pedido.cliente.email);
    console.log('Detalles del pedido:', pedido);
    
    // Mostrar mensaje
    mostrarNotificacion(
        `Confirmación enviada a ${pedido.cliente.email}`,
        'success'
    );
}

// Imprimir pedido
function permitirImpresion() {
    const btnImprimir = document.createElement('button');
    btnImprimir.className = 'cus-btn primary';
    btnImprimir.style.marginTop = '10px';
    btnImprimir.innerHTML = `
        <i class="fa-solid fa-print"></i> Imprimir Pedido
    `;
    btnImprimir.addEventListener('click', function() {
        window.print();
    });
    
    const contenedor = document.querySelector('.page-content');
    if (contenedor) {
        const div = document.createElement('div');
        div.style.textAlign = 'center';
        div.style.marginTop = '20px';
        div.appendChild(btnImprimir);
        contenedor.appendChild(div);
    }
}

// Inicializar página de confirmación
document.addEventListener('DOMContentLoaded', function() {
    const pedido = JSON.parse(localStorage.getItem('ultimoPedido'));
    
    if (!pedido) {
        mostrarNotificacion(
            'No hay información de pedido. Redirigiendo...',
            'warning'
        );
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
        return;
    }
    
    mostrarInformacionPedido();
    crearResumenPedido();
    inicializarBotonesAccion();
    enviarConfirmacionEmail();
    permitirImpresion();
    
    console.log('Página de confirmación inicializada');
});