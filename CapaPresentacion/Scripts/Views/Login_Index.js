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
    cargarEmpresas(); // datos dummy

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