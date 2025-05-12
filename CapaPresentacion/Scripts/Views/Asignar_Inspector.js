$(document).ready(function () {
    // Inicializar tabla
    inicializarTablaSolicitudes();

    // Ocultar el botón al cargar la página
    $('#btnAsignarInspector').hide();

    // Mostrar/ocultar botón al cambiar de menú
    $('a[data-toggle="list"]').on('shown.bs.tab', function (e) {
        const target = $(e.target).attr("href"); // href="#inspector", etc.

        if (target === "#inspector") {
            $('#btnAsignarInspector').show();
        } else {
            $('#btnAsignarInspector').hide();
        }
    });
});

// =========================
// Datos de Solicitudes Dummy
// =========================
const datosSolicitudes = [
    {
        oid: 1,
        fechaSolicitud: '2025-04-30',
        tipoSolicitud: 'EMISIÓN',
        companiaOperadora: 'URBANOFILMS CIA. LTDA.',
        inspectorAsignado: 'Carlos Pérez',
        estadoTramite: 'APROBADA'
    },
    {
        oid: 2,
        fechaSolicitud: '2025-05-01',
        tipoSolicitud: 'MODIFICACION',
        companiaOperadora: 'AeroSky Services',
        inspectorAsignado: '', // No asignado
        estadoTramite: 'PENDIENTE'
    }
];

// ==========================
// Inicializar DataTable
// ==========================
function inicializarTablaSolicitudes() {
    $('#loader').show();
    $('#tablaSolicitudes').hide();

    const datosTabla = datosSolicitudes.map(item => ({
        oid: item.oid,
        fechaSolicitud: item.fechaSolicitud,
        tipoSolicitud: item.tipoSolicitud,
        companiaOperadora: item.companiaOperadora,
        inspectorAsignado: item.inspectorAsignado || '<span class="text-danger">PENDIENTE</span>',
        estadoTramite: formatoEstado(item.estadoTramite),
        acciones: construirAcciones(item)
    }));

    $('#tablaSolicitudes').DataTable({
        data: datosTabla,
        columns: [
            { data: 'oid' },
            { data: 'fechaSolicitud' },
            { data: 'tipoSolicitud' },
            { data: 'companiaOperadora' },
            { data: 'inspectorAsignado' },
            { data: 'estadoTramite' },
            { data: 'acciones' }
        ],
        language: {
            url: $.MisUrls.url.Url_datatable_spanish
        },
        initComplete: function () {
            $('#loader').hide();
            $('#tablaSolicitudes').fadeIn();
        }
    });
}

// ==========================
// Formateo Estado Visual
// ==========================
function formatoEstado(estado) {
    switch (estado) {
        case 'APROBADA':
            return '<span class="text-success"><i class="fas fa-check-circle"></i> APROBADA</span>';
        case 'PENDIENTE':
            return '<span class="text-warning"><i class="fas fa-clock"></i> PENDIENTE</span>';
        case 'MODIFICACION':
            return '<span class="text-primary"><i class="fas fa-edit"></i> MODIFICACION</span>';
        default:
            return estado;
    }
}

// ==========================
// Construir Botón Acción
// ==========================
function construirAcciones(item) {
    return `
        <div>
            <a href="#" class="btn btn-outline-success btn-sm" onclick="consultarSolicitud(${item.oid})" title="Consultar Solicitud">
                <i class="fas fa-search"></i>
            </a>
        </div>
    `;
}

// ==========================
// Función al Consultar Solicitud
// ==========================
function consultarSolicitud(idSolicitud) {
    $('#modalSolicitud').modal('show');
    $('#modalSolicitud').data('solicitud-id', idSolicitud); // Guardar el id de la solicitud en el modal

    // Cargar datos dummy al abrir
    cargarDatosDummy();
    const solicitud = datosSolicitudes.find(s => s.oid === idSolicitud);
    if (solicitud && solicitud.estadoTramite === 'PENDIENTE') {
        $('#bloqueAsignacionInspector').show();
    } else {
        $('#bloqueAsignacionInspector').hide();
    }
}

// ==========================
// Cargar Datos Dummy Dentro del Modal
// ==========================
function cargarDatosDummy() {
    const aeronaves = [
        { fabricante: 'Boeing', modelo: '737', serie: '12345', matricula: 'HC-ABC', configuracion: 'Pasajeros', etapaRuido: 'Etapa 3', peso: '70000' },
        { fabricante: 'Airbus', modelo: 'A320', serie: '67890', matricula: 'HC-DEF', configuracion: 'Carga', etapaRuido: 'Etapa 4', peso: '80000' },
        { fabricante: 'Boeing', modelo: '737', serie: '99999', matricula: 'HC-GHI', configuracion: 'Pasajeros', etapaRuido: 'Etapa 3', peso: '70000' }
    ];

    let tbody = $('#tablaAeronaves tbody');
    tbody.empty();
    aeronaves.forEach(a => {
        tbody.append(`
            <tr>
                <td>${a.fabricante}</td>
                <td>${a.modelo}</td>
                <td>${a.serie}</td>
                <td>${a.matricula}</td>
                <td>${a.configuracion}</td>
                <td>${a.etapaRuido}</td>
                <td>${a.peso}</td>
            </tr>
        `);
    });

    const resumen = {};
    aeronaves.forEach(a => {
        const key = `${a.fabricante} ${a.modelo}`;
        resumen[key] = (resumen[key] || 0) + 1;
    });

    const textoResumen = Object.entries(resumen)
        .map(([key, count]) => `${count}x ${key}`)
        .join('\n');

    $('#contadorAeronaves').val(textoResumen);

    $('#fechaInicioOperaciones').val('2025-06-01');
    $('#tiposOperacion').val('Operaciones Regulares\nPasajeros/Carga/Correo');
    $('#aeropuertosEcuador').val('Quito\nGuayaquil');
    $('#resumenOperaciones').val('Operaciones regulares en Quito y Guayaquil, transporte de pasajeros.');

    const anexos = [
        { nombre: 'Factura de Pago', url: '/Content/documents/prueba.pdf' },
        { nombre: 'Copia de AOC', url: '/Content/documents/prueba.pdf' }
    ];

    let tbodyAnexos = $('#tablaAnexos tbody');
    tbodyAnexos.empty();
    anexos.forEach(doc => {
        tbodyAnexos.append(`
            <tr>
                <td>${doc.nombre}</td>
                <td><a href="${doc.url}" target="_blank" class="btn btn-sm btn-success">Ver</a></td>
                <td><a href="${doc.url}" download class="btn btn-sm btn-primary">Descargar</a></td>
            </tr>
        `);
    });
}

// ==========================
// Asignar Inspector a Solicitud
// ==========================
$('#btnAsignarInspector').click(function () {
    const inspectorSeleccionado = $('#selectInspector').val();

    if (inspectorSeleccionado) {
        const solicitudId = $('#modalSolicitud').data('solicitud-id');
        const solicitud = datosSolicitudes.find(s => s.oid === solicitudId);
        solicitud.inspectorAsignado = inspectorSeleccionado;

        const tabla = $('#tablaSolicitudes').DataTable();
        tabla.row(`#solicitud-${solicitudId}`).data({
            ...solicitud,
            inspectorAsignado: inspectorSeleccionado,
            estadoTramite: formatoEstado(solicitud.estadoTramite),
            acciones: construirAcciones(solicitud)
        }).draw();

        $('#modalSolicitud').modal('hide');

        alert('Inspector asignado: ' + inspectorSeleccionado);
    } else {
        alert('Por favor, seleccione un inspector');
    }
});
