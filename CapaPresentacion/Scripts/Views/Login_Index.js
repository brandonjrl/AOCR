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
//add modal bancos
$(document).ready(function () {
    $('#modalCuentasBancos').modal('show');
});
// Ocultar campos de contraseña cuando se abre el modal
$('#modalRegistroUsuario').on('show.bs.modal', function () {
    $('#grupoPassword').hide(); // ocultar al inicio
});
