(function(){

	var attr = 'data-toggle-hide';

	var getTarget = function(){
		var target = this.getAttribute('for');
		if (!target){
			target = this.nextElementSibling;
		} else {
			target = document.getElementById(target);
		}
		return target;
	}

	var toggle = function(){
		var target = getTarget.call(this);
		if (target){
			if (target.getAttribute(attr)){
				target.removeAttribute(attr);
				this.removeAttribute(attr);
			} else { 
				target.setAttribute(attr, 'true');
				this.setAttribute(attr, 'true');
			}
		}
	}

	var init = function(){
		var target = getTarget.call(this);
		if (target && target.getAttribute(attr) == 'true'){
			this.setAttribute(attr, 'true');
		}
	}

	xtag.addEvent(document, 'click:delegate(x-toggler)', function(e){		
		toggle.call(this);
	});


	xtag.register('x-toggler', {
		onCreate: function(){
			this.setAttribute('tabindex', 0);
		},
		onInsert: function(){
			init.call(this);
		},
		setters: {
			'for:attribute(for)': function(){				
				init.call(this);
			},
		},
		getters: {
			'toggled': function(){
				return this.getAttribute(attr) == 'true' ? false : true;
			}
		},
		methods: {
			toggle: toggle
		}
	});

})();
