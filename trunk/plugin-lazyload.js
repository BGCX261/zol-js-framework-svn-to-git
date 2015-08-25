/**
 * Switchable Lazyload Plugin
 * @creator     huang.can@zol.com.cn
 * @depends     zol, yui-base, widget, switchable, datalazyload
 */
ZOL.add("switchable-lazyload", function(Z) {

    var Y = YAHOO.util, Dom = Y.Dom,
        SWITCHABLE = "switchable",
        BEFORE_SWITCH = "beforeSwitch",
        IMG_SRC = "img-src", TEXTAREA_DATA = "textarea-data",
        FLAGS = {},
        Switchable = Z.Switchable,
        DataLazyload = Z.DataLazyload;

    FLAGS[IMG_SRC] = "data-lazyload-src-custom";
    FLAGS[TEXTAREA_DATA] = "zol-lazydata-custom";

    /**
     * 添加默认配置
     */
    Z.mix(Switchable.Config, {
        lazyDataType: "", // "img-src" or "textarea-data"
        lazyDataFlag: "" // "data-lazyload-src-custom" or "ks-datalazyload-custom"
    });

    /**
     * 织入初始化函数
     */
    Z.weave(function() {
        var self = this, cfg = self.config[SWITCHABLE],
            type = cfg.lazyDataType, flag = cfg.lazyDataFlag || FLAGS[type];
        if(!DataLazyload || !type || !flag) return; // 没有延迟项

        self.subscribe(BEFORE_SWITCH, loadLazyData);

        /**
         * 加载延迟数据
         */
        function loadLazyData(index) {
            //Z.log("switchable-lazyload: index = " + index);
            var steps = cfg.steps, from = index * steps , to = from + steps;

            DataLazyload.loadCustomLazyData(self.panels.slice(from, to), type, flag);
            if(isAllDone()) {
                self.unsubscribe(BEFORE_SWITCH, loadLazyData);
            }
        }

        /**
         * 是否都已加载完成
         */
        function isAllDone() {
            var imgs, textareas, i, len;

            if(type === IMG_SRC) {
                imgs = self.container.getElementsByTagName("img");
                for(i = 0, len = imgs.length; i < len; i++) {
                    if(imgs[i].getAttribute(flag)) return false;
                }
            } else if(type === TEXTAREA_DATA) {
                textareas = self.container.getElementsByTagName("textarea");
                for(i = 0, len = textareas.length; i < len; i++) {
                    if(Dom.hasClass(textareas[i], flag)) return false;
                }
            }

            return true;
        }

    }, "after", Switchable.prototype, "_initSwitchable");
});
