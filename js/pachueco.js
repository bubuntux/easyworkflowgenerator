(function($) {
	$.fn.pachueco = function( options ) {
		var settings = $.extend({
				json : null,
				steps : 5,
				class: 'node'
			}, options);

		return this.each( function() {
			var element = $(this),
				elementId = element.attr('id') + '_holder',
				columns = {},
				container = null;

			if(settings.json) {
				$.getJSON(settings.json, function(data, textStatus, jqXHR) {
					//Ordenar nodos de entrada
					console.log(data);
					data = ordenarNodos(data);
					console.log(data);
					
					element.html(data);

					element.append($('<div>', {
						id: elementId,
						class: 'raphael'
					}));

					container = $('<div>', {
						class: 'container'
					});
					element.append(container);

					var canvas = Raphael(elementId, 1600, 800);
						connections = [],
						shapes = [],
						columns = getColumns(data);

					render(columns, data, container, canvas);
					
					for (var i = 0, ii = shapes.length; i < ii; i++) {
						shapes[i].attr({"stroke-width": 0});
					}			

					$.each(data, function(name, metadata){
						if(metadata.available!=undefined){
							$.each(metadata.available, function(avail, val){
								var originColumn= data[name].column,
									targetColumn=data[val].column,
									originRow = data[name].row,
									targetRow = data[val].row,
									jump=false;
								
								for(var i=originColumn+1; i<targetColumn; i++){
							//		console.log(container);
									var count= $('#column' + i+'_'+container.parent().attr('id')).children().length;				
									if(count >= originRow && count >= targetRow  ){
										jump=true;
										break;
									}
								}
								
								var distance = data[name].column - data[val].column; 	

								if((distance <=1 && distance>=-1) || !jump){
									connections.push(canvas.connection(shapes[data[name].index], shapes[data[val].index]));
								} else {
									var getMaxYDistance = function(shapes) {
										var maxYDistance = 0;
										for(var i=0;i<shapes.length;i++) {
											var bbox = shapes[i].getBBox(),
												maxYForShape = bbox.y + bbox.height;

											if (maxYForShape > maxYDistance) {
												maxYDistance = maxYForShape;
											}
										}
										return maxYDistance;
									};
									var createInvisibleShapesAndConnect = function (shapes, data, y) {
										var originBBox = shapes[data[name].index].getBBox(),
											targetBBox = shapes[data[val].index].getBBox(),
											originX = originBBox.x + originBBox.width,
											targetX = targetBBox.x,
											originInvisibleRectangle = canvas.rect(originX + 30, y, 0, 0, 0),
											targetInvisibleRectangle = canvas.rect(targetX - 30, y, 0, 0, 0);

										shapes.push(originInvisibleRectangle);
										shapes.push(targetInvisibleRectangle);
										connections.push(canvas.connection(shapes[data[name].index], originInvisibleRectangle, undefined, false));
										connections.push(canvas.connection(originInvisibleRectangle, targetInvisibleRectangle, undefined, false));
										connections.push(canvas.connection(targetInvisibleRectangle, shapes[data[val].index], undefined, true));
									};
									createInvisibleShapesAndConnect(shapes, data, getMaxYDistance(shapes) + 15);
								}						
							});
						}
					});

					var maxHeight = 0,
						maxWidth = 0;
					$.each(element.find('.column'), function(index, column){
						if($(column).height() > maxHeight) {
							maxHeight = $(column).height();
						}
						maxWidth += $(column).outerWidth(true);
					});
					element.height(maxHeight+20).width(maxWidth);
					console.log(maxWidth);
				}).fail(function(){
					console.log('error!');
					element.html('ERROR: invalid JSON file! [' + settings.json + ']');
				});					
			} else {
				element.html('ERROR: JSON file not specified!');
			}
		});
	}
}(jQuery));
