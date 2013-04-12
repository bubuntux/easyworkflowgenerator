function render(columns, data, container, r){
	var currentNode = '',
		availableList = '';

	$.each(data, function(name, metadata) {
		var nodeClass = 'disabled',
			nodeId = 'node_' + name +'_'+ container.parent().attr('id');
		
		add(container, nodeId, metadata, columns[name][0], r);
		
		if(metadata.current) {
			nodeClass = 'current';
			currentNode = name;
			availableList = metadata.available;
		} 

		$('#' + nodeId).addClass(nodeClass);
		$('#' + nodeId).data('metadata', metadata);
	});

	$.each(availableList, function(item, value) {
		$('#node_' + value +'_'+ container.parent().attr('id')).addClass('available');
		
	$.each(columns, function(key, value){
		$.each(value, function(link){
			if(link==currentNode){
				$('#node_' + key +'_'+ container.parent().attr('id')).removeClass('disabled').addClass('active');
			}
		})	
	});	
	
	});

	container.parent().find('.active, .available, .current').bind('click', function(event){
		if(window[$(this).data('metadata').callback]) {
			window[$(this).data('metadata').callback](event);
			$(this).css('cursor', 'pointer');
		}
	});
}

function getColumns(data){
	var columns={};
	var column= 1;
	var flag = false;
	$.each(data, function(name, metadata) {
		if(metadata.available === undefined){
			if(columns[name]===undefined){
				columns[name]={};
				columns[name][0]=column;
				metadata.column=column;
			}
			
			flag=true;
		} else {
			$.each(metadata.available, function(index, node){
				if(flag){
					$.each(columns, function(nam, val){
						$.each(columns[nam], function(na, va){
							if(na==name){
								if(columns[name]===undefined){
									columns[name]={};
									columns[name][0]=columns[nam][na]+1;
									metadata.column=columns[nam][na]+1;	
								}
								columns[name][node]=columns[nam][na]+1;	
							}
						});	
					});		
				} else {
					if(columns[name]===undefined){
						columns[name]={};
						columns[name][0]=column;
						metadata.column=column;
					}
					columns[name][node]=column;
				}
			});
		}	
		column++;
	});
	
	//console.log(columns);
	
	return columns;
}
