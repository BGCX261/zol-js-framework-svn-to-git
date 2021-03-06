/**
 * Switchable Autoplay Plugin
 * @creator     huang.can@zol.com.cn
 * @depends     zol, yui-base, widget, switchable
 */
ZOL.add("switchable-autoplay", function(Z) {

    var Y = YAHOO.util, Event = Y.Event, Lang = YAHOO.lang,
        SWITCHABLE = "switchable",
        Switchable = Z.Switchable;

    /**
     * 添加默认配置
     */
    Z.mix(Switchable.Config, {
        autoplay: false,
        interval: 5, // 自动播放间隔时间
        pauseOnHover: true  // triggerType 为 mouse 时，鼠标悬停在 slide 上是否暂停自动播放
    });

    /**
     * 织入初始化函数
     * attached members:
     *   - this.paused
     *   - this.autoplayTimer
     */
    Z.weave(function() {
        var self = this, cfg = self.config[SWITCHABLE];
        if (!cfg.autoplay) return;

        // 鼠标悬停，停止自动播放
        if (cfg.pauseOnHover) {
            Event.on(self.container, "mouseenter", function() {
                self.paused = true;
            });
            Event.on(self.container, "mouseleave", function() {
                // 假设 interval 为 10s
                // 在 8s 时，通过 focus 主动触发切换，停留 1s 后，鼠标移出
                // 这时如果不 setTimeout, 再过 1s 后，主动触发的 panel 将被替换掉
                // 为了保证每个 panel 的显示时间都不小于 interval, 此处加上 setTimeout
                setTimeout(function() {
                    self.paused = false;
                }, cfg.interval * 1000);
            });
        }

        // 设置自动播放
        self.autoplayTimer = Lang.later(cfg.interval * 1000, self, function() {
            if (self.paused) return;
            self.switchTo(self.activeIndex < self.length - 1 ? self.activeIndex + 1 : 0);
        }, null, true);

    }, "after", Switchable.prototype, "_initSwitchable");
});

/**
 * TODO:
 *  - 是否需要提供 play / pause / stop API ?
 *  - autoplayTimer 和 switchTimer 的关联？
 */
