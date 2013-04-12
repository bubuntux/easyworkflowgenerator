$.randomize = function(arr) {
	for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
	return arr;
};

function showDropdown(x, y) {
	$('#dropdown').css({left:x,top:y}).slideDown();
	var $li = $('li', '#dropdown').get();

	var random = $.randomize($li);

	$('#dropdown').empty();

	$(random).appendTo('#dropdown');	
}

function a_callback(event){
	var p = $('#'+event.target.id).offset();
	showDropdown(p.left, p.top+40);
}

function c_callback(event){
	var p = $('#'+event.target.id).offset();
	showDropdown(p.left, p.top+40);
}

function f_callback(event){
	$('#'+event.target.id).fadeOut()
	$('#'+event.target.id).fadeIn()
}

