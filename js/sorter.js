function ordenarNodos(nodos) {
    var nodosConReferencias = $.extend(true, {}, nodos); // Clonar estructura
    var nodosReferenciados = [];

    $.each(nodos, function(name, metadata) {
        var hijos = [];
        if (metadata.available) {
            for(var i=0; i<metadata.available.length; i++) {
                var hijoString = metadata.available[i];
                hijos.push(nodosConReferencias[hijoString]);
                if ($.inArray(hijoString, nodosReferenciados) === -1) {
                    nodosReferenciados.push(hijoString);
                }
            }
            nodosConReferencias[name].hijos = hijos;
        }
        nodosConReferencias[name].id = name;
    });

    var obtenerNodoInicialString = function (nodos, nodosReferenciados) {
        var nodosCopia = $.extend(true, {}, nodos);
        for (var i = 0; i < nodosReferenciados.length; i++) {
            delete nodosCopia[nodosReferenciados[i]];
        };
        var nodoInicialString;
        $.each(nodosCopia, function(name, metadata) {
            nodoInicialString = name;
            return false;
        });
        return nodoInicialString;
    };

    var nodoInicialString = obtenerNodoInicialString(nodos, nodosReferenciados);

    var buscarRutaMasLarga = function(nodo) {
        return buscarRutaMasLargaIter(nodo, []);
    };

    var buscarRutaMasLargaIter = function (nodo, ruta) {
        var rutaReturn = ruta.slice();
        if ($.inArray(nodo.id, ruta) === -1) {
            rutaReturn.push(nodo.id);
            if (nodo.hijos && nodo.hijos.length > 0) {
                var posiblesRutas = [];
                for (var i = 0; i < nodo.hijos.length; i++) {
                    posiblesRutas.push(buscarRutaMasLargaIter(nodo.hijos[i], rutaReturn));
                }
                var rutaReturn = posiblesRutas[0];
                for (var i = 1; i < posiblesRutas.length; i++) {
                    if (posiblesRutas[i].length > rutaReturn.length) {
                        rutaReturn = posiblesRutas[i];
                    }
                }
            }
        }
        return rutaReturn;
    };
    
    var rutaMasLarga = buscarRutaMasLarga(nodosConReferencias[nodoInicialString]);
    var nodosOrdenados = {};
    for (var i = 0; i < rutaMasLarga.length; i++) {
        nodosOrdenados[rutaMasLarga[i]] = nodos[rutaMasLarga[i]];
    }

    var nodosCopia = $.extend(true, {}, nodos);
    for (var i = 0; i < rutaMasLarga.length; i++) {
        delete nodosCopia[rutaMasLarga[i]];
    };
    $.each(nodosCopia, function(name, metadata) {
        nodosOrdenados[name] = metadata;
    });
    return nodosOrdenados;
}