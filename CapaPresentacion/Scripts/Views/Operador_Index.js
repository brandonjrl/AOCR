$(document).ready(function () {
    // 1. Datos
    const datosSolicitudes = [
        {
            oid: 1,
            fechaSolicitud: '2025-04-30',
            tipoSolicitud: 'EMISIÓN',
            estadoSolicitud: 'APROBADA',        // Solo puede ser: APROBADA, ENVIADA, RECHAZADA
            companiaOperadora: 'URBANOFILMS CIA. LTDA.',
            inspectorAsignado: 'Carlos Pérez',
            noAutorizacion: 'DGAC-REG-UAS-00000046-2025',
            fechaAprobacion: '2025-05-01',
            uasRegistro: 'HCD0000044',
            estadoAutorizacion: 'APROBADA'      // Dato explícito
        },
        {
            oid: 2,
            fechaSolicitud: '2025-05-01',
            tipoSolicitud: 'EMISIÓN',
            estadoSolicitud: 'ENVIADA',
            companiaOperadora: 'AeroSky Services',
            inspectorAsignado: '', // No asignado
            noAutorizacion: '',
            fechaAprobacion: '',
            uasRegistro: '',
            estadoAutorizacion: 'PENDIENTE'
        },
        {
            oid: 3,
            fechaSolicitud: '2025-05-02',
            tipoSolicitud: 'RENOVACIÓN',
            estadoSolicitud: 'RECHAZADA',
            companiaOperadora: 'SkyHigh Drone Co.',
            inspectorAsignado: 'Andrea Martínez',
            noAutorizacion: '',
            fechaAprobacion: '',
            uasRegistro: '',
            estadoAutorizacion: 'RECHAZADA'
        },
        {
            oid: 4,
            fechaSolicitud: '2025-05-02',
            tipoSolicitud: 'RENOVACIÓN',
            estadoSolicitud: 'ENVIADA',
            companiaOperadora: 'SkyHigh Drone Co.',
            inspectorAsignado: 'Andrea Martínez',
            noAutorizacion: '',
            fechaAprobacion: '',
            uasRegistro: '',
            estadoAutorizacion: 'MODIFICACION'
        }
    ];

    // 2. Función para construir el HTML de acciones por fila
    function construirAcciones(item) {
        const idSolicitud = item.oid;
        const codigoAutorizacion = item.noAutorizacion || '';

        let btnImprimir = '';
        let btnConsultar = '';

        // Si estadoSolicitud es APROBADA puede imprimir
        if (item.estadoSolicitud === 'APROBADA') {
            btnImprimir = '<a href="#" class="btn btn-outline-primary btn-sm" onclick="imprimir(\'' + codigoAutorizacion + '\', \'01\')" title="Imprimir Autorización">' +
                '<i class="fas fa-print"></i>' +
                '</a>&nbsp;';
        } else {
            btnImprimir = '<a href="#" class="btn btn-outline-primary btn-sm disabled" title="Imprimir Autorización">' +
                '<i class="fas fa-print"></i>' +
                '</a>&nbsp;';
        }

        // El botón de consultar siempre activo
        btnConsultar = '<a href="#" class="btn btn-outline-success btn-sm" onclick="consultarSolicitud(' + idSolicitud + ')" title="Consultar Solicitud">' +
            '<i class="fas fa-search"></i>' +
            '</a>';

        return '<div>' + btnImprimir + btnConsultar + '</div>';
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
        estadoSolicitud: item.estadoSolicitud, // Se mantiene como texto
        companiaOperadora: item.companiaOperadora,
        inspectorAsignado: item.inspectorAsignado || '<span class="text-danger">PENDIENTE</span>',
        noAutorizacion: item.noAutorizacion || '-',
        fechaAprobacion: item.fechaAprobacion || '-',
        uasRegistro: item.uasRegistro,
        estadoAutorizacion: formatoEstadoAutorizacion(item.estadoAutorizacion), // Pintar el estadoAutorizacion
        acciones: construirAcciones(item)
    }));

    // 5. Definición de columnas
    const columnasSolicitudes = [
        { data: 'oid' },
        { data: 'fechaSolicitud' },
        { data: 'tipoSolicitud' },
        { data: 'estadoSolicitud' },
        { data: 'companiaOperadora' },
        { data: 'inspectorAsignado' },
        { data: 'noAutorizacion' },
        { data: 'fechaAprobacion' },
        { data: 'uasRegistro' },
        { data: 'estadoAutorizacion' },
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
