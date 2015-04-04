// Common Library
mad = {

    // Animations definition
    animations: 'transitionend webkitTransitionEnd animationend webkitAnimationEnd MSAnimationEnd oanimationend mozAnimationEnd',

    makeKeysArray: function(table) {
        var keys = []
        idx= 0;
        for ( key in table) {
            keys[idx] = table[key]
            idx++;
        }
        return keys;
    },

    flattenKeys: function(doc,keys) {
        keys = keys || [];
        for (var key in doc) {
            if (typeof doc[key] === 'object' || typeof doc[key] === 'array') {
                keys.push(key);
                flattenKeys(doc[key], keys);
            }
        }
        return keys;
    },

    rdmno: function(maxNo) {
        return _.shuffle(_.range(0,maxNo))[0];
    },

    trueFalse: function(){
        return _.shuffle([true,false])[1];
    },

    p05: function(){
        return _.shuffle([true,false])[1];
    },

    isOdd: function(num) {
        return num % 2;
    },

    p03: function(){
        return _.shuffle([true,false,,false])[1];
    },

    p08: function(){
        return _.shuffle([true,true,false])[1];pass
    },

    factorial: function(n) {
        if (n <= 1) return 1;
        return n * mad.factorial(n-1);
    },

    toTitleCase: function(str) {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    },

    onclick: function($el, cb, object) {
        if (!$el) return;
        $el.off('click');
        $el.on('click', function(evt) {
            if (!object) {
                object = this;
            }
            evt.stopPropagation();
            cb(object);
        });
    },

    onanim: function($el, cb) {
        if (!$el) return;
        $el.off(this.animations);
        $el.on(this.animations, function(evt) {
            evt.stopPropagation();
            cb(this);
        });
    },

    onscroll: function($el, object, cb) {
        if (!$el) return;
        $el.off('scroll');
        $el.on('scroll', function(evt) {
            evt.stopPropagation();
            cb(object);
        });
    },

    randperm: function(maxValue) {
        // First generate number sequence
        var permArray = new Array(maxValue);
        for (var i = 0; i < maxValue; i++) {
            permArray[i] = i;
        }

        // Draw out of the number sequence
        for (var j = (maxValue - 1); j >= 0; --j) {
            var randPos = Math.floor(i * Math.random());
            var tmpStore = permArray[j];
            permArray[j] = permArray[randPos];
            permArray[randPos] = tmpStore;
        }
        return permArray;
    },

    formatDate: function(timestamp) {
        var date = new Date(timestamp*1000);
        var now = new Date();

        // Diff:
        var diff_s = Math.floor((now - date)/1000);
        var diff_m = Math.floor(diff_s / 60);
        var diff_h = Math.floor(diff_m / 60);
        var diff_d = Math.floor(diff_h / 24);
        var diff_y = Math.floor(diff_d / 365);

        // Txt:
        var formattedTime = '';
        if (diff_y > 0) { formattedTime = diff_y + 'y'; }
        else if (diff_d > 0) { formattedTime = diff_d + 'd'; }
        else if (diff_h > 0) { formattedTime = diff_h + 'h'; }
        else if (diff_m > 14) { formattedTime = diff_m + 'm'; }
        else { formattedTime = 'Now'; }

        return formattedTime;
    },

    replaceAtSign: function(toTest) {
        return toTest.replace(/@/g,'<span style="font-family: helvetica;">@</span>');
    },

    isPublic: function(user) {
        return user && user._id && user._id === this.getPublicId();
    },

    getPublicId: function() {
        return '52daf34bbbe6247426000001';
    },

    randomIndex: function(maxNo) {
        return _.shuffle(_.range(1,maxNo-1))[1];
    },

    rdmno: function(maxNo) {
        return _.shuffle(_.range(1,maxNo))[1];

    },
    imgload: function(url, $el) {
        var image = new Image();
        image.onload = function() {
            $el.fadeIn(50);
            $el.css({
                'background-image' : 'url(' + url + ')',
            });
        };
        image.onerror = function() {
            $el.remove();
        }
        image.src = url;
    },

    imgbox: function(opts) {
        var _this        = this;
        var opts         = opts || {};
        var $parent      = opts.$parent;
        var url          = opts.url || '/img/img.jpg';
        var width        = opts.width || 16;
        var color        = opts.color;
        var height       = opts.height || width;
        var imgSize      = opts.imgSize || 'cover';
        var opacity      = opts.opacity || 1;
        var opacityColor = opts.opacityColor || 1;
        var opacityImage = opts.opacityImage || 1;
        var blur         = opts.blur || '0px';

        var $box = ( $('<div>',{class:'box'})).appendTo($parent);
        var $bgd = ( $('<div>',{class:'bgd'})).appendTo($box);
        var $imgwrap = ( $('<div>',{class:'imgwrap'})).appendTo($box);
        var $img = ( $('<div>',{class:'img'})).appendTo($imgwrap);

        $box.css({
            'position'  :'relative',
            'float'     :'left',
            'opacity'   : 1,
            'width'     : width,
            'height'    : width,
        });
        $bgd.css({
            'position'          : 'absolute',
            'top'               : 0,
            'left'              : 0,
            'width'             : width,
            'height'            : width,
            'background-color'  : color,
            'opacity'           : opacityColor,
        });
        $imgwrap.css({
            'position': 'absolute',
            'top': 0,
            'left': 0,
            'width'   : width,
            'height': width,
            'opacity': opacityImage,
            // '-webkit-transform': 'translateZ(0px)',
        });
        $img.css({
            'position': 'absolute',
            'top': '-5%',
            'left': '-5%',
            'width': '110%',
            'height': '110%',
            'background-position': 'center',
            'background-repeat': 'no-repeat',
            'background-size': imgSize,
            'box-shadow' : '0 0 0 1px rgba(0,0,0,.1),inset 0 0 0 1px rgba(255,255,255,.12)',
            '-webkit-filter': 'blur(' + blur + 'px)',
        });
        $img.hide();
        var image = new Image();
        image.onload = function() {
            $img.fadeIn(50);
            $img.css({
                'background-image' : 'url(' + url + ')',
            });
        };
        image.onerror = function() {
            $box.remove();
        }
        image.src = url;
        return $box;
    },
    smoothLoading: function($el, url) {
        var image = new Image();

        image.onload = function() {
            $el.addClass('visible');
            $el.css({
                'background-image' : 'url(' + url + ')',
            });
        };
        image.onerror = function() {
            $el.remove();
        }
        image.src = url;
    },

};
