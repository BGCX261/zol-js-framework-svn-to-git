/**
 * Widget
 * @creator     saymoon<saymoon@gmail.com>
 * @depends     zol, yui-base
 */
ZOL.add("widget", function(Z) {

    /**
     * Widget Class
     * @constructor
     */
    function Widget(container, config) {
        var self = this;

        // factory or constructor
        if (!(self instanceof Widget)) {
            return new Widget(container, config);
        }

        /**
         * the container of widget
         * @type HTMLElement
         */
        self.container = YAHOO.util.Dom.get(container);

        /**
         * config infomation
         * @type object
         */
        self.config = config || {};
	//console.log(self.config);
    }

    Z.Widget = Widget;
});