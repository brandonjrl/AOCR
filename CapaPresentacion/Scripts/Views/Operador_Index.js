$(document).ready(function () {
    // 1. Datos
    const datosSolicitudes = [
        // 1. Financiero MODIFICACIÓN (no puede avanzar)
        {
            oid: 1,
            fechaSolicitud: '2025-05-01',
            tipoSolicitud: 'EMISIÓN',
            estadoSolicitud: 'ENVIADA',
            companiaOperadora: 'DroneX S.A.',
            estadoFinanciero: 'MODIFICACIÓN',
            inspectorAsignado: '',
            estadoInspector: '',
            viaticosInspector: '',
            estadoViaticos: '',
            estadoInspeccion: '',
            noAutorizacion: '',
            fechaAprobacion: '',
            uasRegistro: '',
            estadoAutorizacion: 'MODIFICACION'
        },
        // 2. Financiero aprobado, inspector MODIFICACIÓN
        {
            oid: 2,
            fechaSolicitud: '2025-05-02',
            tipoSolicitud: 'RENOVACIÓN',
            estadoSolicitud: 'ENVIADA',
            companiaOperadora: 'SkyTech Solutions',
            estadoFinanciero: 'APROBADO',
            inspectorAsignado: 'Carlos Pérez',
            estadoInspector: 'MODIFICACIÓN',
            viaticosInspector: 'NO',
            estadoViaticos: '',
            estadoInspeccion: '',
            noAutorizacion: '',
            fechaAprobacion: '',
            uasRegistro: '',
            estadoAutorizacion: 'MODIFICACION'
        },
        // 3. Financiero aprobado, inspector aprobado, necesita viáticos, viáticos MODIFICACION
        {
            oid: 3,
            fechaSolicitud: '2025-05-03',
            tipoSolicitud: 'EMISIÓN',
            estadoSolicitud: 'ENVIADA',
            companiaOperadora: 'DroneFlyTech',
            estadoFinanciero: 'APROBADO',
            inspectorAsignado: 'Lucía Fernández',
            estadoInspector: 'APROBADO',
            viaticosInspector: 'SI',
            estadoViaticos: 'MODIFICACION',
            estadoInspeccion: '',
            noAutorizacion: '',
            fechaAprobacion: '',
            uasRegistro: '',
            estadoAutorizacion: 'MODIFICACION'
        },
        // 4. Financiero aprobado, inspector aprobado, viáticos SI aprobados, inspección MODIFICACION
        {
            oid: 4,
            fechaSolicitud: '2025-05-04',
            tipoSolicitud: 'RENOVACIÓN',
            estadoSolicitud: 'ENVIADA',
            companiaOperadora: 'AeroSky Services',
            estadoFinanciero: 'APROBADO',
            inspectorAsignado: 'María López',
            estadoInspector: 'APROBADO',
            viaticosInspector: 'SI',
            estadoViaticos: 'APROBADO',
            estadoInspeccion: 'MODIFICACIÓN',
            noAutorizacion: '',
            fechaAprobacion: '',
            uasRegistro: '',
            estadoAutorizacion: 'MODIFICACION'
        },
        // 5. Todo aprobado, viáticos NO, inspección RECHAZADO
        {
            oid: 5,
            fechaSolicitud: '2025-05-05',
            tipoSolicitud: 'EMISIÓN',
            estadoSolicitud: 'RECHAZADA',
            companiaOperadora: 'Urbanofilms Cía. Ltda.',
            estadoFinanciero: 'APROBADO',
            inspectorAsignado: 'Andrea Martínez',
            estadoInspector: 'APROBADO',
            viaticosInspector: 'NO',
            estadoViaticos: '',
            estadoInspeccion: 'RECHAZADO',
            noAutorizacion: '',
            fechaAprobacion: '',
            uasRegistro: '',
            estadoAutorizacion: 'RECHAZADA'
        },
        // 6. Todo aprobado, viáticos NO, inspección APROBADO, pero faltan datos
        {
            oid: 6,
            fechaSolicitud: '2025-05-06',
            tipoSolicitud: 'RENOVACIÓN',
            estadoSolicitud: 'ENVIADA',
            companiaOperadora: 'Drones Aérea',
            estadoFinanciero: 'APROBADO',
            inspectorAsignado: 'Gabriela Sánchez',
            estadoInspector: 'APROBADO',
            viaticosInspector: 'NO',
            estadoViaticos: '',
            estadoInspeccion: 'APROBADO',
            noAutorizacion: '',
            fechaAprobacion: '',
            uasRegistro: '',
            estadoAutorizacion: 'PENDIENTE'
        },
        // 7. Todo aprobado, viáticos SI, inspección APROBADO, falta completar datos
        {
            oid: 7,
            fechaSolicitud: '2025-05-07',
            tipoSolicitud: 'EMISIÓN',
            estadoSolicitud: 'ENVIADA',
            companiaOperadora: 'NewDroneTech',
            estadoFinanciero: 'APROBADO',
            inspectorAsignado: 'Marcelo Vargas',
            estadoInspector: 'APROBADO',
            viaticosInspector: 'SI',
            estadoViaticos: 'APROBADO',
            estadoInspeccion: 'APROBADO',
            noAutorizacion: '',
            fechaAprobacion: '',
            uasRegistro: '',
            estadoAutorizacion: 'PENDIENTE'
        },
        // 8. Todo aprobado, viáticos NO, inspección APROBADO, y todos datos llenos
        {
            oid: 8,
            fechaSolicitud: '2025-05-08',
            tipoSolicitud: 'RENOVACIÓN',
            estadoSolicitud: 'APROBADA',
            companiaOperadora: 'AeroSystems S.A.',
            estadoFinanciero: 'APROBADO',
            inspectorAsignado: 'Luisa Mendoza',
            estadoInspector: 'APROBADO',
            viaticosInspector: 'NO',
            estadoViaticos: '',
            estadoInspeccion: 'APROBADO',
            noAutorizacion: 'DGAC-REG-UAS-00000300-2025',
            fechaAprobacion: '2025-05-09',
            uasRegistro: 'HCD0000300',
            estadoAutorizacion: 'APROBADA'
        },
        // 9. Financiero aprobado, inspector aprobado, viáticos NO, inspección PENDIENTE
        {
            oid: 9,
            fechaSolicitud: '2025-05-09',
            tipoSolicitud: 'EMISIÓN',
            estadoSolicitud: 'ENVIADA',
            companiaOperadora: 'DroneSky Aerials',
            estadoFinanciero: 'APROBADO',
            inspectorAsignado: 'Martina López',
            estadoInspector: 'APROBADO',
            viaticosInspector: 'NO',
            estadoViaticos: '',
            estadoInspeccion: '',
            noAutorizacion: '',
            fechaAprobacion: '',
            uasRegistro: '',
            estadoAutorizacion: 'PENDIENTE'
        },
        // 10. Financiero aprobado, inspector aprobado, necesita viáticos, viáticos aprobados, inspección aprobado, todo lleno
        {
            oid: 10,
            fechaSolicitud: '2025-05-10',
            tipoSolicitud: 'RENOVACIÓN',
            estadoSolicitud: 'APROBADA',
            companiaOperadora: 'DroneFly Systems',
            estadoFinanciero: 'APROBADO',
            inspectorAsignado: 'Ana Suárez',
            estadoInspector: 'APROBADO',
            viaticosInspector: 'SI',
            estadoViaticos: 'APROBADO',
            estadoInspeccion: 'APROBADO',
            noAutorizacion: 'DGAC-REG-UAS-00000400-2025',
            fechaAprobacion: '2025-05-11',
            uasRegistro: 'HCD0000400',
            estadoAutorizacion: 'APROBADA'
        },
        // 11. Aún vacío, esperando pagos
        {
            oid: 11,
            fechaSolicitud: '2025-05-03',
            tipoSolicitud: 'EMISIÓN',
            estadoSolicitud: 'ENVIADA',
            companiaOperadora: 'DroneFlyTech',
            estadoFinanciero: 'APROBADO',
            inspectorAsignado: 'Lucía Fernández',
            estadoInspector: 'APROBADO',
            viaticosInspector: 'SI',
            estadoViaticos: '',  // Vacío, esperando subir pagos
            estadoInspeccion: '',
            noAutorizacion: '',
            fechaAprobacion: '',
            uasRegistro: '',
            estadoAutorizacion: 'PENDIENTE'
        }
    ];
    // 2. Función para construir el HTML de acciones por fila
    function construirAcciones(item) {
        const idSolicitud = item.oid;
        const codigoAutorizacion = item.noAutorizacion || '';

        let btnImprimir = '';
        let btnConsultar = '';
        let btnViaticos = '';

        // Botón Imprimir
        if (item.estadoSolicitud === 'APROBADA') {
            btnImprimir = '<a href="#" class="btn btn-outline-primary btn-sm" onclick="imprimir(\'' + codigoAutorizacion + '\', \'01\')" title="Imprimir Autorización">' +
                '<i class="fas fa-print"></i>' +
                '</a>&nbsp;';
        } else {
            btnImprimir = '<a href="#" class="btn btn-outline-primary btn-sm disabled" title="Imprimir Autorización">' +
                '<i class="fas fa-print"></i>' +
                '</a>&nbsp;';
        }

        // Botón Consultar
        btnConsultar = '<a href="#" class="btn btn-outline-success btn-sm" onclick="consultarSolicitud(' + idSolicitud + ')" title="Consultar Solicitud">' +
            '<i class="fas fa-search"></i>' +
            '</a>&nbsp;';

        // Botón Pago Viáticos
        if (item.viaticosInspector === 'SI') {
            if (item.estadoViaticos === 'MODIFICACION' || item.estadoViaticos === '') {
                // Si necesita corregir viáticos o aún no ha subido
                btnViaticos = '<a href="#" class="btn btn-outline-warning btn-sm" onclick="pagarViaticos(' + idSolicitud + ')" title="Pago de Viáticos">' +
                    '<i class="fas fa-dollar-sign"></i>' +
                    '</a>';
            } else {
                // Viáticos ya aprobados
                btnViaticos = '<a href="#" class="btn btn-outline-warning btn-sm disabled" title="Pago de Viáticos">' +
                    '<i class="fas fa-dollar-sign"></i>' +
                    '</a>';
            }
        } else {
            // No necesita viáticos
            btnViaticos = '<a href="#" class="btn btn-outline-warning btn-sm disabled" title="Pago de Viáticos">' +
                '<i class="fas fa-dollar-sign"></i>' +
                '</a>';
        }

        return '<div>' + btnImprimir + btnConsultar + btnViaticos + '</div>';
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
    // 3.1 Fúncion auxiliar para automatizar el estado autorizacion (Solo para pruebas)
    function calcularEstadoAutorizacion(item) {
        if (item.estadoInspeccion === 'RECHAZADO') {
            return 'RECHAZADA';
        }
        if (item.estadoFinanciero === 'MODIFICACIÓN' || item.estadoInspector === 'MODIFICACIÓN' || item.estadoInspeccion === 'MODIFICACIÓN') {
            return 'MODIFICACION';
        }
        if (item.estadoFinanciero === 'APROBADO' && item.estadoInspector === 'APROBADO' && item.estadoInspeccion === 'APROBADO') {
            if (item.noAutorizacion && item.fechaAprobacion && item.uasRegistro) {
                return 'APROBADA';
            } else {
                return 'PENDIENTE';
            }
        }
        return 'PENDIENTE';
    }

    // 4. Preparar los datos para el DataTable
    const datosTabla = datosSolicitudes.map(item => ({
        oid: item.oid,
        fechaSolicitud: item.fechaSolicitud,
        tipoSolicitud: item.tipoSolicitud,
        companiaOperadora: item.companiaOperadora,
        estadoFinanciero: item.estadoFinanciero,
        inspectorAsignado: item.inspectorAsignado || '<span class="text-danger">PENDIENTE</span>',
        estadoInspector: item.estadoInspector,
        viaticosInspector: item.viaticosInspector ,
        estadoViaticos: item.estadoViaticos,
        estadoInspeccion: item.estadoInspeccion ,
        noAutorizacion: item.noAutorizacion ,
        fechaAprobacion: item.fechaAprobacion ,
        uasRegistro: item.uasRegistro,
        estadoAutorizacion: formatoEstadoAutorizacion(calcularEstadoAutorizacion(item)),
        acciones: construirAcciones(item)
    }));



    // 5. Definición de columnas
    const columnasSolicitudes = [
        { data: 'oid' },
        { data: 'fechaSolicitud' },
        { data: 'tipoSolicitud' },
        { data: 'companiaOperadora' },
        { data: 'estadoFinanciero' },
        { data: 'inspectorAsignado' },
        { data: 'estadoInspector' },
        { data: 'viaticosInspector' },
        { data: 'estadoViaticos' },
        { data: 'estadoInspeccion' },
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
