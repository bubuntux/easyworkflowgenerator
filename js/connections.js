Raphael.fn.connection = function (source, destination, attributes, arrow) {
	var src = source.getBBox(),
		des = destination.getBBox(),
		p = [
				{x: src.x + src.width / 2, y: src.y - 1},
				{x: src.x + src.width / 2, y: src.y + src.height + 1},
				{x: src.x - 1, y: src.y + src.height / 2},
				{x: src.x + src.width + 1, y: src.y + src.height / 2},
				{x: des.x + des.width / 2, y: des.y - 1},
				{x: des.x + des.width / 2, y: des.y + des.height + 1},
				{x: des.x - 1, y: des.y + des.height / 2},
				{x: des.x + des.width + 1, y: des.y + des.height / 2}
			],
		d = {}, 
		dis = [];

	var defaultAttributes = {'stroke':'#666', 'stroke-width':1.5, 'opacity':0.5};
	//console.log(arrow);
	if (arrow === undefined || arrow) {
		defaultAttributes["arrow-end"] = "classic-wide-long";
	}
	attributes = attributes || defaultAttributes;

	for (var i = 0; i < 4; i++) {
		for (var j = 4; j < 8; j++) {
			if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
				dis.push(Math.abs(p[i].x - p[j].x) + Math.abs(p[i].y - p[j].y));
				d[dis[dis.length - 1]] = [i, j];
			}
		}
	}

	var res = d[Math.min.apply(Math, dis)],
		x1 = p[res[0]].x-2,
		y1 = p[res[0]].y,
		x4 = p[res[1]].x,
		y4 = p[res[1]].y,
		dx = Math.max(Math.abs(x1 - x4) / 2, 10),
		dy = Math.max(Math.abs(y1 - y4) / 2, 10),
		x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
		y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
		x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
		y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3),
		path = null;

	if(x4-x1>40) {
		path = ["M", x1, y1, "C", x4, y1, x4, y4, x4, y4].join(",");
	} else {
		path = ["M", x1, y1, "C", x2, y2, x3, y3, x4, y4].join(",");
	}

	return {
		line: this.path(path).attr(attributes)
	};
};
