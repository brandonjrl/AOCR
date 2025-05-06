$(document).ready(function () {
    // 1. Datos
    const datosSolicitudes = [
        {
            oid: 1,
            fechaSolicitud: '2025-04-30',
            tipoSolicitud: 'EMISIÓN',
            companiaOperadora: 'URBANOFILMS CIA. LTDA.',
            estadoTramite: 'APROBADA'      // Aprobada, pendeinte y modificacion
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
        },
    ];

    // 2. Función para construir el HTML de acciones por fila
    function construirAcciones(item) {
        const idSolicitud = item.oid;
        let btnConsultar = '';
        // El botón de consultar siempre activo
        btnConsultar = '<a href="#" class="btn btn-outline-success btn-sm" onclick="consultarSolicitud(' + idSolicitud + ')" title="Consultar Solicitud">' +
            '<i class="fas fa-search"></i>' +
            '</a>';

        return '<div>' + btnConsultar + '</div>';
    }

    // 3. Función auxiliar para pintar el estadoAutorizacion visualmente
    function formatoEstadoAutorizacion(estado) {
        if (estado === 'APROBADA') {
            return '<a class="text-success"><i class="fas fa-check-circle"></i> APROBADA</a>';
        } else if (estado === 'PENDIENTE') {
            return '<a class="text-warning"><i class="fas fa-clock"></i> PENDIENTE</a>';
        } else if (estado === 'RECHAZADA') {
            return '<a class="text-danger"><i class="fas fa-times-circle"></i> RECHAZADA</a>';
        } else if (estado === 'MODIFICACION') {
            return '<a class="text-primary"><i class="fas fa-edit"></i> MODIFICACION</a>';
        }
        return estado;
    }

    // 4. Preparar los datos para el DataTable
    const datosTabla = datosSolicitudes.map(item => ({
        oid: item.oid,
        fechaSolicitud: item.fechaSolicitud,
        tipoSolicitud: item.tipoSolicitud,
        companiaOperadora: item.companiaOperadora,
        estadoTramite: formatoEstadoAutorizacion(item.estadoTramite), // Pintar el estadoAutorizacion
        acciones: construirAcciones(item)
    }));

    // 5. Definición de columnas
    const columnasSolicitudes = [
        { data: 'oid' },
        { data: 'fechaSolicitud' },
        { data: 'tipoSolicitud' },
        { data: 'companiaOperadora' },
        { data: 'estadoTramite' },
        { data: 'acciones' }
    ];

    // 6. Inicializar DataTable
    const tabla = $('#tablaSolicitudes').DataTable({
        data: datosTabla,
        columns: columnasSolicitudes,
        language: {
            url: $.MisUrls.url.Url_datatable_spanish
        },
        initComplete: function (settings, json) {
            // Cuando termina de cargar, ocultar el loader y mostrar la tabla
            $('#loader').hide();
            $('#tablaSolicitudes').show();
        }
    });
});
