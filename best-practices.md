# Basic Concepts & Best Practices of Custom Tag Development

### Browser Support Requirements

* Firefox 5+
* IE 10+
* Chrome 4+
* Opera 12+
* Safari: 4+
* Android Browser: 2.2+
* iOS Safari: 4+


### Testing

* We are looking into how to automate testing of each element.  We will probably end up using a combination of Selenium and nodejs scripts to ensure functionality. TBD
* Currently cross browser/platform testing can be achieved using browserstack.com

### Dependancies
* Do not depend on, or include, a Javascript library or framework like jQuery, MooTools etc.
* Modular dependancies that are *entirely specific* to the function of the tag being deleveloped (such as a map element) are acceptible if included within the tag definition's closure.


### Tag Registration

* Always use the prefix "x-" when registering your tags.
* Use  the 'content' property with an HTML strings to adding basic, default, internal elements to your tags. Use onCreate if you need more advanced  control over adding default elements or manipulating initial markup that  was added by the end user.
* Use attributes beginning with "data-" to allow users to set options that your tag will use on initial parse. (using "data-" prevents conflicts with future, standard HTML attributes)
* Utilize getters and setters to provide users with ways to modify the behavior or state of a custom tag in the DOM and retrieve useful state information. Be sure to set a matching attribute, if applicable, to reflect in markup any state changes that occur.
* The 'events' object available within the tag registration object provides a few common event pseudos to help ease development. One of these is ':delegate(.someSelector)'. The delegation pseudo takes a CSS selector string and automatically sets the internal 'this' reference of the provided function to match the target element.
* All events should be attached to the tag element itself, and use delegation wherever event interaction on a sub element is desired.


### CSS

* Tags SHOULD NOT HAVE PRESENTATIONAL STYLES applied to them!!!
* Don't use JavaScript for things that are feasible to do in CSS
* In their default state, tags should appear unstyled, as native browser tags do
* Use CSS for animations and transitions, default tags should not include presentational animations
* Use flexbox styles wherever possible to reduce structural JavaScript logic


### JavaScript

* You may use ECMA 5 native type methods
* Do not use JavaScript to set styles directly on elements. Instead, include a CSS class or attribute selector with the styles you need for a given tag state in the tag's included CSS file.
* All event actions that do not directly act on the base tag itself should delegate events to child elements.
* Custom  events are often the best way to give developers a hook to the internal operations and state changes of your tags. For example, you might want to  provide the user with a custom event if: you have complete a long logic chain or series of events, or something about significant changes about your tag without user interaction that could provide value to the developer user.


### Device and Environment

* Your tag should be device and platform aware.
* Depending on bandwidth limitations or allowances, your tag may need to loading of assets differently or more incramentally.
* On less powerful devices, like phones, limit the number of in-DOM elements your tag shows. A large amount of elements in the DOM at once tends to slow down slower machaines and devices.
