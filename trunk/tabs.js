/**
 * Tabs Widget
 * @creator     saymoon<saymoon@gmail.com>
 * @depends     ZOL, yui-base
 */
ZOL.add("tabs", function(Z) {

    var SWITCHABLE = "switchable";

    /**
     * Tabs Class
     * @constructor
     */
    function Tabs(container, config) {
        var self = this;

        // factory or constructor
        if (!(self instanceof Tabs)) {
            return new Tabs(container, config);
        }

		//console.log(Tabs.superclass.constructor);
        Tabs.superclass.constructor.call(self, container, config);
        self.switchable(self.config);

        // add quick access for config
        self.config = self.config[SWITCHABLE];
        self.config[SWITCHABLE] = self.config;
    }

    Z.extend(Tabs, Z.Widget);
    Z.Tabs = Tabs;
});