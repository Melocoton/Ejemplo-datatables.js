let tabla;
document.addEventListener('DOMContentLoaded', () => {
    tabla = $('#gastosDatatable').DataTable({ //Inicializamos la tabla
        "ajax": "datos/datos1.json", //aqui indicamos la url si queremos cargar los datos por ajax, no borramos esta linea se creara una datatable con los datos del html
        "paging": true, //habilita la agrupacion por paginas de X cantidad
        "pagingType": "first_last_numbers", //opciones de paging habilitadas: numbers, full_numbers, first_last_numbers
        "lengthChange": true, //habilita la opcion de agrupar X filas por pagina
        "lengthMenu": [10, 25, 50, 100], //default, si se comenta, seguira mostrando estos por defecto, salvo que exista otra definicion
        //"lengthMenu": [ [-1, 10, 25, 50, ], ["Todos", 10, 25, 50, ] ],
        //"ordering": true, //habilita la ordenacion asc/desc de cada columna, no aplica si parametrizas columnDefs
        "scrollCollapse": true, //permite a la tabla reducir la altura cuando hay pocos datos, aunque se haya fijado una altura
        "scrollY": "400px", //altura de la tabla
        "searching": true, //habilita la busqueda
        "search": { //opciones de busqueda
            "caseInsensitive": true, //Indica si se ignoran las mayusculas
            "smart": true, //filtro inteligente de datatables https://datatables.net/reference/option/search.smart
            //"regex" : true //trata el texto de busqueda como una expresion regular
        },
        "stateSave": true, //si true: las parametrizaciones hechas se conservan incluso al recargar/salir de la pagina
        "stateDuration": 30, //en segundos. 0 => infinito
        //"stripeClasses": [ 'textcolor1', 'textcolor2', 'textcolor3', 'textcolor4', 'textcolor5' ], //CSS a cada fila en bucle
        /*"columns": [  //Permite asignar clases que afectan a cada columna. 
            { className: "color1 white-text" },
            { className: "color2 white-text" },
            { className: "color3 white-text" },
            { className: "color4 white-text" },
            { className: "color5 white-text" },
            { className: "color1 white-text" },
            { className: "color2 white-text" },
            { className: "color3 white-text" }
          ],*/
        "order": [[ 0, "desc" ]], //permite aplicar un orden predefinido a las columnas
        "columnDefs": [ //configuracion de cada columna
            {
                "width": "auto",
                "targets": [0], //indica que dato vamos a colocar en la columna, en este caso el primer dato de cada "fila" del json
                "orderable": false, //indica si se puede reordenar la columna (funciona aveces)
                "searchable": true, //indica si se puede buscar datos de esta columna
                "className": "center", //aplica clases css a la columna
            },
            {
                "width": "auto",
                "targets": [1],
                "orderable": true,
                "searchable": true,
                "className": "center",                
            },
            {
                "width": "auto",
                "targets": [2],
                "orderable": true,
                "searchable": true,
                "className": "center",
                "render" : (data, type, row) => {
                    /*
                    Nos permite mostrar datos en la celda de forma personalizada, ya sea una transformacion matematica o un html personalizado para mostrar un boton, imagen...
                    data -> hace referencia al dato correspondiente a la celda
                    type -> es el tipo de variable que tiene data
                    row  -> hace referencia a toda la fila actual
                    */
                    return `${data.toFixed(2)}€` //ej: convertimos el dato actual a un string con dos posiciones decimales y concatenamos "€"
                }
            },
            {
                "width": "auto",
                "targets": [3],
                "orderable": false,
                "searchable": false,
                "className": "center",
                "render": (data, type, row) => {
                    return `<a href="#!" class="white-text btn red darken-4" onclick="borrarRegistro(${row[3]})">Borrar</a>`; //ej: Creamos un boton que llama a la funcion borrarRegistro, la cual pasara el dato de la tercera celda
                },
            }
        ],
        "autoWidth": true,
        "language": { //configuracion del idioma mostrado
            "emptyTable": "No existe ningún registro de gastos",
            "info": "<span class=\"negrita textcolor1\">Página _PAGE_/_PAGES_ de un total de _TOTAL_ registros de gastos</span>",
            "infoEmpty": "<span class=\"negrita textcolor1\">Ningún registro de gastos encontrado</span>",
            "infoFiltered": "<span class=\"negrita textcolor1\"> - Filtrado de _MAX_ registros</span>",
            //"infoPostFix": " | Cualquier informacion posible" //se añadirá a la informacion en cualquier caso.
            "lengthMenu": "<span class=\"negrita black-text left \" ><i class=\"material-icons tiny \">menu</i> REGISTROS MOSTRADOS</span> _MENU_",
            "paginate": {
                "first": "<span class=\"negrita textcolor3\">Primera</span>",
                "last": "<span class=\"negrita textcolor5\">Última</span>",
                "next": "Siguiente",
                "previous": "Anterior",
            },
            "search": "<span class=\"negrita black-text left\">&nbsp;<i class=\"material-icons tiny\">search</i> BÚSQUEDA</span>",
            "searchPlaceholder": "Escribe para buscar...",
            "zeroRecords": "<span class=\"negrita textcolor3\">No hay registros para mostrar</span>",
            "select": {
                "rows": {
                    _: "<span class=\"negrita textcolor2\">%d filas seleccionadas</span>",
                    0: "<span class=\"negrita textcolor2\"></span>",
                    1: "<span class=\"negrita textcolor2\">1 fila seleccionada</span>"
                },
            },
        },
        "select": false, //habilita la opcion de seleccionar una o varias filas
        // "select": {
        //     style: 'os', //single -> una fila, multi -> varias, os -> S.O       
        //     className: 'blue white-text negrita', //efectos apicados al seleccionar una o varias lineas
        //     info: true,
        // },
        "responsive": {
            responsive: true,
            details: true, //muestra detalles por defecto, si false solo se muestran las columnas que quepan en pantalla

            // details: { //mostrarlas abiertas / no abiertas con cruz roja
            //     display: $.fn.dataTable.Responsive.display.childRowImmediate,
            //     type: 'inline' //inline / column (por defecto) : muestra rows abiertas con cruz roja / muestra rows abiertas sin cruz
            // },

            /*details: { //informacion en un modal sin header + cruz verde
                display: $.fn.dataTable.Responsive.display.modal()
            }*/

            /*details: { //Mostrar informacion en un modal con header + cruz verde                
                display: $.fn.dataTable.Responsive.display.modal({
                    header: function (row) {
                        var data = row.data();
                        return "<h5 class=\"textcolor1 center\">" + data[1] + " " + data[2] + "<h5>";
                    },
                }),
                renderer: $.fn.dataTable.Responsive.renderer.tableAll({
                    tableClass: 'table',
                })
            },*/
        },
        /*
        l - Length changing
        f - Filtering input
        t - The Table!
        i - Information
        p - Pagination
        r - pRocessing 
        < and > -div elements 
        < "#id" and > -div with an id 
        < "class" and > -div with a class
        < "#id.class" and > -div with an id and class
        */
        //dom: 'l<"left"f><"right"B>tip<"clear">',
        dom: '<"left"l> <"left"f> <"right"B> t i p <"clear">',
        buttons: [ //nos premite mostrar botones personalizados
            { //boton para exportar a excel, utiliza una extension de datatables
                extend: 'excelHtml5',
                text: '<i class="material-icons tiny left">grid_on</i> Excel',
                name: 'excelButton',
                attr: {
                    title: 'Generar archivo Excel',
                    id: 'excelButton',
                    class: "btn white light-green-text negrita DTBM DTEBB",
                },
                className: 'excelButton'
            },
            { //boton personalizado, utiliza una accion que escribamos nosotros
                text: '<i class="material-icons left">add</i> AÑADIR GASTO',
                name: 'addGastoButton',
                attr: {
                    title: 'Añade un registro a la tabla',
                    id: 'addGastoButton',
                    class: "btn green negita DTBM",
                },
                action: function () { //accion personalizada a ejecutar cuando se pulse el boton
                    M.toast({html: 'Añadir gasto'});
                }
            }
        ],
        //funcion que se ejecuta cada vez que se carguen datos, https://datatables.net/reference/option/footerCallback
        "footerCallback" : (row, data, start, end, display) => {
            //ej: sumamos el total de una columna y lo mostramos
            let total = data.reduce((a,b) => {
                return a+b[2]
            },0);
            document.getElementById('totalGastos').innerHTML = `total ${total.toFixed(2)}€`;
        }
    });
    M.AutoInit(); //Inicializacion de materialize
});

function borrarRegistro(codigo) {
    M.toast({html: `Borrar registro con codigo ${codigo}`});
}

function cargar() {
    //nos permite recargar los datos con otra url
    tabla.ajax.url('datos/datos2.json').load();
}
