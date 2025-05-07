$(document).ready(function () {
    // Cargar tabla de solicitudes
    inicializarTablaSolicitudes();
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
        estadoTramite: 'APROBADA'
    },
    {
        oid: 2,
        fechaSolicitud: '2025-05-01',
        tipoSolicitud: 'MODIFICACION',
        companiaOperadora: 'AeroSky Services',
        estadoTramite: 'PENDIENTE'
    },
    {
        oid: 3,
        fechaSolicitud: '2025-05-02',
        tipoSolicitud: 'RENOVACIÓN',
        companiaOperadora: 'SkyHigh Drone Co.',
        estadoTramite: 'MODIFICACION'
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

    // Cargar datos dummy al abrir
    cargarDatosDummy();
}

// ==========================
// Cargar Datos Dummy Dentro del Modal
// ==========================
function cargarDatosDummy() {
    // Aeronaves Dummy
    const aeronaves = [
        { fabricante: 'Boeing', modelo: '737', serie: '12345', matricula: 'HC-ABC', configuracion: 'Pasajeros', etapaRuido: 'Etapa 3', peso: '70000' },
        { fabricante: 'Airbus', modelo: 'A320', serie: '67890', matricula: 'HC-DEF', configuracion: 'Carga', etapaRuido: 'Etapa 4', peso: '80000' },
        { fabricante: 'Boeing', modelo: '737', serie: '99999', matricula: 'HC-GHI', configuracion: 'Pasajeros', etapaRuido: 'Etapa 3', peso: '70000' }
    ];

    // Llenar tabla aeronaves
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

    // ➡️ Contador dinámico de aeronaves
    const resumen = {};
    aeronaves.forEach(a => {
        const key = `${a.fabricante} ${a.modelo}`;
        resumen[key] = (resumen[key] || 0) + 1;
    });

    const textoResumen = Object.entries(resumen)
        .map(([key, count]) => `${count}x ${key}`)
        .join('\n');

    $('#contadorAeronaves').val(textoResumen);

    // Operaciones dummy
    $('#fechaInicioOperaciones').val('2025-06-01');
    $('#tiposOperacion').val('Operaciones Regulares\nPasajeros/Carga/Correo');
    $('#aeropuertosEcuador').val('Quito\nGuayaquil');
    $('#resumenOperaciones').val('Operaciones regulares en Quito y Guayaquil, transporte de pasajeros.');

    // Anexos dummy
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
