// ==========================================
// FUNCIONES COMUNES - TODAS LAS PÁGINAS
// ==========================================

// Actualizar contador del carrito en la navbar
function actualizarContadorCarrito() {
    const contador = obtenerCantidadCarrito();
    const elemento = document.querySelector('.contar-pro');
    if (elemento) {
        elemento.textContent = contador;
    }
}

// Actualizar tabla del carrito en la navbar
function actualizarTablaCarritoNavbar() {
    const carrito = obtenerCarrito();
    const tbody = document.querySelector('.list-cart tbody');
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    carrito.forEach((item, index) => {
        const producto = obtenerProductoPorId(item.id);
        if (producto) {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${index + 1}</td>
                <td><img src="${producto.imagen}" alt="${producto.nombre}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 3px;"></td>
                <td>${producto.nombre}</td>
                <td>$${producto.precio.toFixed(2)}</td>
            `;
            tbody.appendChild(fila);
        }
    });
}

// Mostrar notificación
function mostrarNotificacion(mensaje, tipo = 'success') {
    const notificacion = document.createElement('div');
    notificacion.className = `alert alert-${tipo} alert-dismissible fade show`;
    notificacion.style.position = 'fixed';
    notificacion.style.top = '20px';
    notificacion.style.right = '20px';
    notificacion.style.zIndex = '9999';
    notificacion.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        notificacion.remove();
    }, 3000);
}

// Validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Validar teléfono
function validarTelefono(telefono) {
    const regex = /^[\d\s\-\+\(\)]{10,}$/;
    return regex.test(telefono);
}

// Formatear dinero
function formatearDinero(cantidad) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2
    }).format(cantidad);
}

// Inicializar contador al cargar página
document.addEventListener('DOMContentLoaded', actualizarContadorCarrito);

// Actualizar tabla del navbar al cargar
document.addEventListener('DOMContentLoaded', actualizarTablaCarritoNavbar);