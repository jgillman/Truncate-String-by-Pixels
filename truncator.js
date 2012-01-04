var getStyledStringWidth = function(targetStyleElm, string) {
	var attr = [
		'font-family','font-size','font-weight','font-style','text-transform',
		'text-decoration','letter-spacing','word-spacing','padding-right',
		'padding-left','white-space'
	],
	holder,
	width;

	// If string is undefined use the text from targetStyleElm
	string = (string === undefined) ? targetStyleElm.text() : string;

	holder = $(document.createElement('span'));

	holder.html(string).css({
		position : 'absolute',
		display : 'none',
		width : 'auto'
	});

	// apply the appropriate styles from the style-target element to the invisible span
	for (var i = 0; i < attr.length; i++) {
		holder.css( attr[i], targetStyleElm.css(attr[i]) );
	}

	$('body').append(holder);

	width = holder.width() + parseInt(holder.css('paddingLeft'), 10) + parseInt(holder.css('paddingRight'), 10);

	holder.remove();

	// return the element's width + left and right padding
	return width;
};
















var truncateStyledStringToPixelWidth = function(targetStyleElm, maxWidth) {
	var attr = [
		'font-family','font-size','font-weight','font-style','text-transform',
		'text-decoration','letter-spacing','word-spacing','padding-right',
		'padding-left','white-space'
	],
	string = targetStyleElm.text(),
	ellipseWidth = getStyledStringWidth( targetStyleElm, '&hellip;' ),
	holder,
	width;


	// Create the holder
	holder = $(document.createElement('span'));

	holder.text(string).css({
		position : 'absolute',
		display : 'none',
		width : 'auto'
	});

	// apply the appropriate styles from the style-target element to
	// the invisible span
	for (var i = 0; i < attr.length; i++) {
		holder.css( attr[i], targetStyleElm.css(attr[i]) );
	}

	$('body').append(holder);


	// Now that we have the string in holder remove one char at a
	// time until it's the right length
	while ( holder.width() > maxWidth - ellipseWidth) {
		holder.text( holder.text().substr(0, holder.text().length-1) );
	}

	// Remove any uncalculated whitespace
	holder.text( $.trim(holder.text()) );

	holder.remove();

	targetStyleElm.html( holder.text() + "&hellip;" );

};

$('.trunkUs li span').each(function(i, elm) {
	truncateStyledStringToPixelWidth( $(elm), 100 );
});


