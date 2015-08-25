/**
 * Carousel Widget
 * @creator     huang.can@zol.com.cn
 * @depends     yui, yui-base
 */
ZOL.add("carousel", function(Z) {

    var SWITCHABLE = "switchable",

        /**
         * 默认配置，和 Switchable 相同的部分此处未列出
         */
        defaultConfig = {
            circular: true
        };

    /**
     * Carousel Class
     * @constructor
     */
    function Carousel(container, config) {
        var self = this;

        // factory or constructor
        if (!(self instanceof Carousel)) {
            return new Carousel(container, config);
        }

        config = Z.merge(defaultConfig, config || { });
        Carousel.superclass.constructor.call(self, container, config);
        self.switchable(self.config);

        // add quick access for config
        self.config = self.config[SWITCHABLE];
        self.config[SWITCHABLE] = self.config;
    }

    Z.extend(Carousel, Z.Widget);
    Z.Carousel = Carousel;
});
