/**
 * zol-javascript-framework
 * @module zol
 * @creator saymoon@gmail.com
 */

(function(){

    var _instances = {},

        /**
         * ��װ��ͬ������¼��󶨷���
         *
         */
        add = function() {
            if (window.addEventListener) {
                return function(el, type, fn, capture) {
                    el.addEventListener(type, fn, (!!capture));
                };
            } else if (window.attachEvent) {
                return function(el, type, fn) {
                    el.attachEvent("on" + type, fn);
                };
            } else {
                return function(){};
            }
        }(),

        /**
         * ��װ��ͬ������¼�����󶨷���
         *
         */
        remove = function() {
            if (window.removeEventListener) {
                return function (el, type, fn, capture) {
                    el.removeEventListener(type, fn, !!capture);
                };
            } else if (window.detachEvent) {
                return function (el, type, fn) {
                    el.detachEvent("on" + type, fn);
                };
            } else {
                return function(){};
            }
        }(),

		/**
		 * �ṩJavascript OOʵ�ֵĻ������������ƻ�������Ը�����
		 * Applies the supplier's properties to the receiver.  By default
		 * all prototype and static propertes on the supplier are applied
		 * to the corresponding spot on the receiver.  By default all
		 * properties are applied, and a property that is already on the
		 * reciever will not be overwritten.  The default behavior can
		 * be modified by supplying the appropriate parameters.
		 *
		 * @TODO add constants for the modes
		 *
		 * @method mix
		 * @param {Function} r  the object to receive the augmentation
		 * @param {Function} s  the object that supplies the properties to augment
		 * @param ov {boolean} if true, properties already on the receiver
		 * will be overwritten if found on the supplier.
		 * @param wl {string[]} a whitelist.  If supplied, only properties in 
		 * this list will be applied to the receiver.
		 * Used by Y.aggregate
		 * @return {object} the augmented object
		 */
		mix = function(r, s, ov, wl) {
			if (!s || !r) return r;
			if (typeof ov === UNDEFINED) ov = true;
			var i, p, l;

			if (wl && (l = wl.length)) {
				// ��whitelist����ѭ������whitelist�е����Ը��Ƹ��̳ж���(r)
				for (i = 0; i < l; i++) {
					p = wl[i];
					if (p in s) {
						if (ov || !(p in r)) {
							r[p] = s[p];
						}
					}
				}
			} else { //���û��ʹ��whitelist��ѭ�����̳ж���(s)�е�ÿ�����ԡ�������
					 //���жϼ̳ж���(r)���Ƿ�����������ԡ��������ݸ��ǲ���(ov)���и���
				for (p in s) {
					if (ov || !(p in r)) {
						r[p] = s[p];
					}
				}
			}

			return r;
		},

		UNDEFINED = 'undefined',

        SLICE = Array.prototype.slice;

/**
 * ��鲢��ʼ��ZOL��ʵ��
 *
 */
if (typeof ZOL === 'undefined' || !ZOL) {

    ZOL = function(){

        var Z = this;

        if (!(Z instanceof ZOL)) {
            return new ZOL();
        } else {
            Z._init();
            Z._setup();

            return Z;
        }
    };
}

/**
 * ����ZOL��Prototype
 * ZOL �� prototype ԭ�ͣ����������������ģ������Ҫ��ע�ᡢ��ʼ��������
 */
ZOL.prototype = {

	_config: function(o) {}, // ��ȡ������Ϣ����������

    _init: function() {	// ��ʼ����������

		var v = '@VERSION@', Z = this;

        if (v.indexOf('@') > -1) {
            v = 'test';
        }

        Z.version = v;

        Z.Env = {
            // @todo expand the new module metadata
            mods: {},	// 
            _idx: 0,
            _used: {},
            _attached: {},
            _loaded: {}
        };

		Z.constructor = ZOL;

        // Ĭ������
        Z.config = {

            win: window || {},
            doc: document,
            debug: true,
            useBrowserConsole: true,
            throwFail: true,
            bootstrap: true,
            fetchCSS: true
        
        };

	},

    _setup: function() {
		//this.use("yui-base");
		//this.use("zol-log");
	},

    /**
	 * ע��һ��ģ��
	 * ����Ҫ���ص�ģ����Ϣ����ZOLģ�Ͷ��д���
     * Register a module
     * @method add
     * @param name {string} module name
     * @param fn {Function} entry point into the module that
     * is used to bind module to the YUI instance
     * @param version {string} version string
     * @param details optional config data: 
     * requires   - features that should be present before loading
     * optional   - optional features that should be present if load optional defined
     * use  - features that should be attached automatically
     * skinnable  -
     * rollup
     * omit - features that should not be loaded if this module is present
     * @return {YUI} the YUI instance
     *
     */
    add: function(name, fn, version, details) {
        // this.log('Adding a new component ' + name);
        
        ZOL.Env.mods[name] = {
            name: name, 
            fn: fn,
            version: version,
            details: details || {}
        };

        return this; // ֧����ʽ����
    },

	/**
	 * ����ZOLģ�Ͷ������Ѽ��ؿ���ģ����Ϣ����ִ�м���
	 * ÿ��ģ�麯�����ж�����ģ���Ƿ���أ������μ���
	 */
    _attach: function(r, fromLoader) {
        var mods = ZOL.Env.mods,
            attached = this.Env._attached,
            i, l = r.length, name, m, d, req, use;
        for (i=0; i<l; i=i+1) {

            name = r[i]; 
            m    = mods[name];

            // console.log(name + '::' + m);

            if (!m) {
            }

            if (!attached[name] && m) {

                attached[name] = true;

                d   = m.details; 
                req = d.requires; 
                use = d.use;

                if (req) {
                    //this._attach(this.Array(req));
                }

                // this.log('attaching ' + name, 'info', 'yui');

                if (m.fn) {
                    m.fn(this);
                }

                if (use) {
                    this._attach(this.Array(use));
                }
            }
        }

    },

	/**
	 * ��һ��ģ�鵽ZOL��ʵ����
	 *
	 */
	 use: function() {

		var Z = this,
			a = SLICE.call(arguments, 0),
			mods = ZOL.Env.mods,
			firstArg = a[0],
			used = Z.Env._used,
			callback = a[a.length-1],
			k,i,l = [],
			r = [],
			f = function(name) {

                // only attach a module once
                if (used[name]) {
                    return;
                }

                var m = mods[name], j, req, use;

                if (m) {

                    used[name] = true;

                    req = m.details.requires;
                    use = m.details.use;
                } else {

					// YUI���ж�css�Ƿ���أ���ʱ�ò���
                    // CSS files don't register themselves, see if it has been loaded
                    //if (!ZOL.Env._loaded[Z.version][name]) {
                    //    missing.push(name);
                    //} else {
                        // probably css
                        used[name] = true;
                    //}
                }

                // make sure requirements are attached
                if (req) {
				/*
                    if (Y.Lang.isString(req)) {
                        f(req);
                    } else {
                        for (j = 0; j < req.length; j = j + 1) {
                            f(req[j]);
                        }
                    }
				*/
                }

                // add this module to full list of things to attach
                r.push(name);

            };

		if (typeof callback === 'function') {
			a.pop();
		} else {
			callback = null;
		}

		// �����п���ģ��󶨵���ǰʵ��
        if (firstArg === "*") {
            a = [];

            for (k in mods) {
                if (mods.hasOwnProperty(k)) {
                    a.push(k);
                }
            }
            
            if (callback) {
                a.push(callback);
            }

            return Z.use.apply(Z, a);
        }

        l = a.length;

        for (i=0; i<l; i=i+1) {
            f(a[i]);
        }

        Z._attach(r);

		if (callback) {
			callback(Z);
		}

		return Z;
	 },


	/**
	 * Copies all the properties of s to r. overwrite mode.
	 * @return {object} the augmented object
	 */
	mix: mix,

	/**
	 * ��������������ж�������Ժϲ���һ���¶����з���
	 * Returns a new object containing all of the properties of
	 * all the supplied objects.  The properties from later objects
	 * will overwrite those in earlier objects.  Passing in a
	 * single object will create a shallow copy of it.
	 * @return {object} the new merged object
	 */
	merge: function() {
		var a = arguments, o = {}, i, l = a.length;
		for (i = 0; i < l; ++i) {
			mix(o, a[i], true);
		}
		return o;
	},

	/**
	 * Utility to set up the prototype, constructor and superclass properties to
	 * support an inheritance strategy that can chain constructors and methods.
	 * Static members will not be inherited.
	 *
	 * @method extend
	 * @param {Function} r the object to modify
	 * @param {Function} s the object to inherit
	 * @param {Object} px prototype properties to add/override
	 * @param {Object} sx static properties to add/override
	 * @return {ZOL} the ZOL instance
	 */
	extend: function(r, s, px, sx) {
		if (!s || !r) return r;

		var OP = Object.prototype,
			O = function (o) {
				function F() {
				}

				F.prototype = o;
				return new F();
			},
			sp = s.prototype,
			rp = O(sp); // ����s��ԭ�����Ե�һ���º���������

		r.prototype = rp;
		rp.constructor = r;
		r.superclass = sp;

		// assign constructor property
		if (s !== Object && sp.constructor === OP.constructor) {
			sp.constructor = s;
		}

		// add prototype overrides
		if (px) {
			mix(rp, px);
		}

		// add object overrides
		if (sx) {
			mix(r, sx);
		}

		return r;
	},

	/**
	 * Executes the supplied function on each item in the array.
	 * @method each
	 * @param arr {Array} the array to iterate
	 * @param fn {Function} the function to execute on each item.  The
	 * function receives three arguments: the value, the index, the full array.
	 * @param obj Optional context object
	 */
	each: function (arr, fn, obj) {
		var l = (arr && arr.length) || 0, i;
		for (i = 0; i < l; i++) {
			fn.call(obj || this, arr[i], i, arr);
		}
		return this;
	},

	/**
	 * Execute the supplied method after the specified function
	 * @param fn {Function} the function to execute
	 * @param when {string} before or after
	 * @param obj the object hosting the method to displace
	 * @param sFn {string} the name of the method to displace
	 */
	weave: function(fn, when, obj, sFn) {
		var arr = [obj[sFn], fn];

		if (when === "before") arr.reverse();
		obj[sFn] = function() {
			for (var i = 0, args = SLICE.call(arguments, 0); i < 2; i++) {
				arr[i].apply(this, args);
			}
		};

		return this;
	},

	/**
	 * ���Ƹ�������ԭ�͵�Ŀ�꺯����ԭ��
	 * Applies prototype properties from the supplier to the receiver.
	 * The receiver must be a Function.
	 * @param {Function} r  the object to receive the augmentation
	 * @param {Function} s  the object that supplies the properties to augment
	 * @param wl {string[]} a whitelist.  If supplied, only properties in this list will be applied to the receiver.
	 * @return {object} the augmented object
	 */
	augment: function(r, s, ov, wl) {
		return mix(r.prototype, s.prototype, ov, wl);
	},

    /**
     * Returns the namespace specified and creates it if it doesn't exist
     * <pre>
     * YUI.namespace("property.package");
     * YUI.namespace("YAHOO.property.package");
     * </pre>
     * Either of the above would create YUI.property, then
     * YUI.property.package (YAHOO is scrubbed out, this is
     * to remain compatible with YUI2)
     *
     * Be careful when naming packages. Reserved words may work in some browsers
     * and not others. For instance, the following will fail in Safari:
     * <pre>
     * YUI.namespace("really.long.nested.namespace");
     * </pre>
     * This fails because "long" is a future reserved word in ECMAScript
     *
     * @method namespace
     * @param  {string*} arguments 1-n namespaces to create 
     * @return {object}  A reference to the last namespace object created
     */
    namespace: function() {
        var a=arguments, o=null, i, j, d;
        for (i=0; i<a.length; i=i+1) {
            d = ("" + a[i]).split(".");
            o = this;
            for (j=(d[0] == "ZOL") ? 1 : 0; j<d.length; j=j+1) {
                o[d[j]] = o[d[j]] || {};
                o = o[d[j]];
            }
        }
        return o;
    }

};

    p = ZOL.prototype;

	// �ڲ�ͨ��newʵ����ZOL������½�ZOL.prototypeӳ�䵽ZOL[prototype]��
    // inheritance utilities are not available yet
    for (i in p) {
        if (1) { // intenionally ignoring hasOwnProperty check
            ZOL[i] = p[i];
        }
    }

	// ��ʼ������
	ZOL._init();
})();

ZOL.namespace("ZOL.util");