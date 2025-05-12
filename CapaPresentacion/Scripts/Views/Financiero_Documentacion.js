$(document).ready(function () {
    inicializarTablaSolicitudes();
});

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

function construirAcciones(item) {
    return `
        <div>
            <a href="#" class="btn btn-outline-success btn-sm" onclick="consultarSolicitud(${item.oid})" title="Consultar Solicitud">
                <i class="fas fa-search"></i>
            </a>
        </div>
    `;
}

function consultarSolicitud(idSolicitud) {
    $('#modalSolicitud').modal('show');
    cargarDatosDummy();
}

function cargarDatosDummy() {
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
