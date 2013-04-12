function add(parent, nodeId, nodeData, currentColumn, r) {
	var node = null,
		column = null;

	if($('#column' + currentColumn +'_'+ parent.parent().attr('id')).length) {
		column = $('#column' + currentColumn+'_'+ parent.parent().attr('id'));
	//	console.log('ya existe', currentColumn)
	} else {
		column = $('<div>', {
			id: 'column' + currentColumn +'_'+ parent.parent().attr('id'),
			class: 'column'
		});
		parent.append(column);
	}

	if($('#' + nodeId).length) {
		node = $('#' + nodeId);
		console.log('exists');
	} else {
		node = $('<div>', {
			id: nodeId,
			text: nodeData.title,
			class: 'node',
			title: nodeData.tooltip
		});

		node.append($('<span>', {
			text: nodeData.available
		}));

		node.append($('<span>', {
			class: 'nodeId',
			text: nodeId
		}));

		column.append(node);
		nodeData.row=column.children().length;
				
		var pos1 = $('#'+nodeId).offset(),
			pos2 = $('#'+nodeId).parent().offset(),
			x1 = $('#'+nodeId).offset().left-$('#'+nodeId).parent().parent().offset().left,
		    y1 = pos1.top - pos2.top + 3,
			rect = r.rect(x1, y1, $('#'+nodeId).width(), $('#'+nodeId).height(), 0);

		nodeData.index=shapes.length;
		shapes.push(rect);

	}

	return node;
};
