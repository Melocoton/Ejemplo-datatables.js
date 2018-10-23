Ejemplo de datatables, con datos cargados por ajax
El json devuelto por ajax debe tener el siguiente formato
{data : [
    ["columna 1", "columna 2"...], //fila 1
    ["columna 1", "columna 2"...] //fila 2
]}
Dependencias:
    Jquery: https://jquery.com/ (https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js)
Framework usado en el ejemplo:
    Materializecss 1.0.0: https://materializecss.com/
Datatables:
    https://datatables.net/

Todo el codigo de este ejemplo esta comentado, se mostrara 
-como covertir una tabla html en datatable
-como cargar datos desde un json por ajax
-como cambiar la forma en la que se muestran los datos
-como realizar operaciones sobre los datos
-como recargar los datos desde un evento
-como configurar la tabla (opciones de busqueda, visualizacion, orden de datos...)
-como añadir botones para exportar datos/añadir acciones personalizadas