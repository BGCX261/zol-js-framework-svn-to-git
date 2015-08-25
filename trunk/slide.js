/**
 * Tabs Widget
 * @creator     huang.can@zol.com.cn
 * @depends     zol, yui-base
 */
ZOL.add("slide", function(Z) {

    var SWITCHABLE = "switchable",

    /**
     * Ĭ�����ã��� Switchable ��ͬ�Ĳ��ִ˴�δ�г�
     */
    defaultConfig = {
        autoplay: true,
        circular: true
    };

    /**
     * Slide Class
     * @constructor
     */
    function Slide(container, config) {
        var self = this;

        // factory or constructor
        if (!(self instanceof Slide)) {
            return new Slide(container, config);
        }

        config = Z.merge(defaultConfig, config || { });
        Slide.superclass.constructor.call(self, container, config);
        self.switchable(self.config);

        // add quick access for config
        self.config = self.config[SWITCHABLE];
        self.config[SWITCHABLE] = self.config;
    }

    Z.extend(Slide, Z.Widget);
    Z.Slide = Slide;
});
