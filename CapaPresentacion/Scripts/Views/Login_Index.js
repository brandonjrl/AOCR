function togglePassword() {
    const input = document.getElementById("clave");
    const icon = document.getElementById("toggleIcon");

    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}

// Mostrar automáticamente el modal de bancos (si existe)
$(document).ready(function () {
    $('#modalCuentasBancos').modal('show');

    // Activar o desactivar botón de login según checkbox 
    const termsCheck = document.getElementById("termsCheck");
    const loginBtn = document.getElementById("loginBtn");

    if (termsCheck && loginBtn) {
        termsCheck.addEventListener("change", function () {
            loginBtn.disabled = !this.checked;
        });
    }
});

// Al mostrar el modal de registro, ocultar contraseñas y cargar empresas
$('#modalRegistroUsuario').on('show.bs.modal', function () {
    $('#grupoPassword').hide();
    cargarEmpresas();
    cargarRoles();// datos dummy

    if ($('#Empresa').length && $('#Rol').length) {
        $('#Empresa').val('');
        $('#Rol').val('');
    }
});

function mostrarCamposContrasena() {
    $('#grupoPassword').show();
}

function cargarEmpresas() {
    const empresas = [
        { id: '1', nombre: 'DGAC' },
        { id: '2', nombre: 'LATAM Airlines' },
        { id: '3', nombre: 'TAME EP' },
        { id: '4', nombre: 'Avianca Ecuador' },
        { id: '5', nombre: 'Aeroregional' },
        { id: '6', nombre: 'Equair' }
    ];

    const select = $('#Empresa');
    select.empty();
    select.append('<option value="">-- Seleccione una empresa --</option>');

    empresas.forEach(e => {
        select.append(`<option value="${e.id}">${e.nombre}</option>`);
    });
}

function cargarRoles() {
    const Roles = [
        { id: '1', nombre: 'Representante legal en el Ecuador' },
        { id: '2', nombre: 'Director de Operaciones del EAE' },
        { id: '3', nombre: 'Director AACE' },
        { id: '4', nombre: 'POI AACE' },
        { id: 'otro', nombre: 'Otro' }
    ];

    const select = $('#Rol');
    select.empty();
    select.append('<option value="">-- Seleccione un Rol --</option>');

    Roles.forEach(e => {
        select.append(`<option value="${e.id}">${e.nombre}</option>`);
    });

    // Mostrar u ocultar el campo personalizado al seleccionar "Otro"
    select.off('change').on('change', function () {
        if ($(this).val() === 'otro') {
            $('#otroRolContainer').slideDown(); // muestra con animación
        } else {
            $('#otroRolContainer').slideUp();   // oculta con animación
            $('#OtroRol').val('');
        }
    });
}
