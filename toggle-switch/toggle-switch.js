(function(window, document, undefined) {
	var onTextAttr = 'data-on-text';
	var offTextAttr = 'data-off-text';

	var buttonSelector = '.x-toggle-switch-button';
	var styleOffAttr = 'data-off';

	xtag.register('x-toggle-switch', {
		onCreate: function() {
			this.onText = this.getAttribute(onTextAttr);
			this.offText = this.getAttribute(offTextAttr);
		},

		onInsert: function() {
			if (xtag.query(this, buttonSelector).length === 0) {
				// add button HTML dynamically
				this.innerHTML +=
					'<div class="' + buttonSelector.substring(1) + '">' +
						'<span>' + this.onText + '</span>' +
						'<div></div>' +
					'</div>';
			}
		},

		events: {
			'click:delegate(.x-toggle-switch-button)': function(event, toggleSwitch) {
				event.preventDefault();

				if (!this.hasMouseBeenDragged) {
					// don't toggle twice if drag + click
					toggleSwitch.xtag.toggle();
				}
			},

			'mousedown:delegate(.x-toggle-switch-button)': function(event, toggleSwitch) {
				this.isMouseDown = true;

				if (this.hasMouseBeenDragged) {
					this.hasMouseBeenDragged = false;
				}
			},

			'mouseup:delegate(.x-toggle-switch-button)': function(event, toggleSwitch) {
				this.isMouseDown = false;
			},

			'mousemove:delegate(.x-toggle-switch-button)': function(event, toggleSwitch) {
				if (this.isMouseDown && !this.hasMouseBeenDragged) {
					// mouse is being dragged
					event.preventDefault();
					toggleSwitch.xtag.toggle();

					// only trigger drag toggle once
					this.hasMouseBeenDragged = true;
				}
			}
		},

		setters: {
			onText: function(onText) {
				onText = onText || 'on';
				this.setAttribute(onTextAttr, onText);
			},

			offText: function(offText) {
				offText = offText || 'off';
				this.setAttribute(offTextAttr, offText);
			}
		},

		getters: {
			onText: function(onText) {
				return this.getAttribute(onTextAttr);
			},

			offText: function(offText) {
				return this.getAttribute(offTextAttr);
			}
		},

		methods: {
			/**
			 * Toggles this toggle switch, triggering an 'on' or 'off' event.
			 */
			toggle: function(selectedItem) {
				var button = xtag.query(this, buttonSelector)[0];
				var buttonText = xtag.query(button, 'span')[0];

				if (button.getAttribute(styleOffAttr)) {
					// button is off; turn it on
					button.removeAttribute(styleOffAttr);
					buttonText.textContent = this.onText;

					xtag.fireEvent(this, 'on');
				} else {
					// button is on; turn it off
					button.setAttribute(styleOffAttr, 'true');
					buttonText.textContent = this.offText;

					xtag.fireEvent(this, 'off');
				}
			}
		}
	});
})(this, this.document);
