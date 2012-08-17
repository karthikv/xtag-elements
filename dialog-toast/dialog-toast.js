(function(window, document, undefined) {
	var durationAttr = 'data-duration';
	var locationAttr = 'data-location';
	var excludeCloseAttr = 'data-exclude-close';

	xtag.register('x-toast', {
		onInsert: function() {
			// insert a close button if not already present
			var closeSelector = '.close';
			if (!this.excludeClose && xtag.query(this, closeSelector).length === 0) {
				this.innerHTML += '<a href="#close" class="close">&#215;</a>';

				var close = xtag.query(this, closeSelector)[0];
				var self = this;
				close.addEventListener('click', function(event) {
					event.preventDefault();
					self.xtag.hide();
				});
			}

			this.xtag.show();
		},

		setters: {
			duration: function(duration) {
				this.setAttribute(durationAttr, duration);
			},

			location: function(location) {
				this.setAttribute(locationAttr, location);
			},

			excludeClose: function(excludeClose) {
				if (excludeClose) {
					this.setAttribute(excludeCloseAttr, excludeClose);
				} else {
					this.removeAttribute(excludeCloseAttr);
				}
			}
		},

		getters: {
			duration: function() {
				// default duration is 3 seconds
				return parseInt(this.getAttribute(durationAttr), 10) || 3000;
			},

			location: function() {
				var location = this.getAttribute(locationAttr);

				// default location is bottom
				if (location !== 'top') {
					location = 'bottom';
				}

				return location;
			},

			excludeClose: function() {
				return !!this.getAttribute(excludeCloseAttr);
			}
		},

		methods: {
			/**
			 * Makes this toast appear for the interval specified by the data-duration
			 * attribute or duration property.
			 */
			show: function() {
				var self = this;

				// only show if not already displayed
				if (!self.getAttribute('data-show')) {
					self.setAttribute('data-show', 'true');
					// center the toast relative to the window
					this.style.left = ( window.innerWidth / 2 - this.offsetWidth / 2 ) + 'px';

					xtag.fireEvent(self, 'show');
					self.durationTimeout = setTimeout(function() {
						self.durationTimeout = null;
						self.xtag.hide();
					}, self.duration);
				}
			},

			/**
			 * Makes this toast disappear if it is not hidden already.
			 */
			hide: function() {
				var self = this;

				if (self.durationTimeout) {
					clearTimeout(self.durationTimeout);
					self.durationTimeout = null;
				}

				// only hide if not already hidden
				if (self.getAttribute('data-show')) {
					self.removeAttribute('data-show');
					xtag.fireEvent(self, 'hide');
				}
			}
		}
	});
})(this, this.document);
