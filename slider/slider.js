(function(){
	
	var selected = null;
	xtag.addEvent(document, 'mouseup', function(e){
		selected = null;
		console.log("up");
		document.body.style.cursor = 'auto';
	});

	xtag.addEvent(document, 'mousemove', function(e){

		if (selected) {
			var range = selected.knob.parentNode;
			if (e.clientX >= range.offsetLeft && e.clientX <= range.offsetWidth + range.offsetLeft){
						
				var position = 	Math.round(
						(e.clientX - range.offsetLeft) / 
							(range.offsetWidth) * 1000)/10;
				selected.knob.style.marginLeft = position + '%';
			
			}
			console.log(e);
			if (e.preventDefault){ e.preventDefault(); }
			e.stopPropagation();
    		return false;
		}
	});

	xtag.register('x-slider', {
		onCreate: function(){
			var template = '<div class="x-slider-label">${label}</div><div class="x-slider-container">'+
				'<div class="x-slider-min">${minLabel}</div>' +
				'<div class="x-slider-range"><div class="x-slider-knob">&nbsp;</div></div>' +
				'<div class="x-slider-max">${maxLabel}</div></div>' +
				'<input name="${name}" type="hidden" value="${startValue}" />';
			template = template.replace('${label}', this.dataset.label || 'Slider')
				.replace('${minLabel}', this.dataset.minLabel || 0)
				.replace('${maxLabel}', this.dataset.maxLabel || 10)
				.replace('${name}', this.dataset.name || this.id || "")
				.replace('${startValue}', this.dataset.startValue || "");
			this.innerHTML = template;
			this.knob = xtag.query(this, '.x-slider-knob')[0];
		},
		onInsert: function(){
		},
		events:{
			'mousemove': function(e) {
				
			},
			'mousedown': function(e) {
				selected = this;
				document.body.style.cursor = 'pointer';
			}
		},
		setters: {
			
		},
		getters: {
			
		},
		methods: {
		
		}
	});

})();