(function(){

	var attr = 'data-toggle-hide';
	var toggleState = 'data-toggle-state';

	var getTargets = function(){
		var target = this.getAttribute('data-targetset').split(' ');
		var targets = [];
		if (target.length){
			target.forEach(function(item){
				var e = document.getElementById(item);
				if (e)targets.push(e);
			});
		} else {
			targets.push(this.nextElementSibling);
		}
		return targets;
	}

	var toggle = function(){
		var targets = getTargets.call(this);
		targets.forEach(function(item){
			if (item.attributes[attr]){
				item.removeAttribute(attr);
			} else {
				item.setAttribute(attr, null);
			}
		});
	}

	xtag.addEvent(document, 'click:delegate(x-toggler)', function(e){
		toggle.call(this);
		if (this.attributes[toggleState] && this.getAttribute(toggleState) == 'open'){
			this.setAttribute(toggleState,'close');
		} else {
			this.setAttribute(toggleState,'open');
		}
	});


	xtag.register('x-toggler', {
		onCreate: function(){
			this.setAttribute('tabindex', 0);
		},
		onInsert: function(){
			if (this.attributes[toggleState]){
				var targets = getTargets.call(this);
				targets.forEach(function(item){
					if (force == 'open'){
						item.removeAttribute(attr);
					} else if (force == 'close') { 
						item.setAttribute(attr, null);
					}
				});
			}
		},
		setters: {
			
		},
		getters: {
			'state': function(){
				return this.getAttribute(targetState);
			}
		},
		methods: {
			toggle: toggle
		}
	});

})();
