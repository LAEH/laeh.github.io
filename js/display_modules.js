Display = (function () {

    // Slideshow

    var Slideshow = function(opts) {
        this.collection = opts.images;
        this.$container = opts.$container;
        this.slideDuration = opts.slideDuration;
    };

    Slideshow.prototype.start = function() {
        var random_indexes = this.randperm(this.collection.length);

        var $current = $('<div>', {'class': 'slide img current blur'});
        $current.appendTo(this.$slide_wrap);

        var $next = $('<div>', {'class': 'slide img next'});
        $next.appendTo(this.$slide_wrap);

        var $wait = $('<i>', {'class': 'wait bts bt-spinner-clock bt-spin'});
        $wait.appendTo($current);

        var idx = 0;

        this.loadBackground(this.collection[random_indexes[idx]], $current, $wait);
        var random_indexes = this.randperm(this.collection.length);
        this.loadBackground(this.collection[random_indexes[++idx]], $next);

        var _this = this;
        this.timer = setInterval(function() {
            // Current -> Old
            $current.removeClass('current').addClass('old');
            var $cache_current = $current;
            setTimeout(function() {
                $cache_current.remove();
            }, 1000);

            // Next -> Current
            $next.removeClass('next').addClass('current');
            $current = $next;

            // Load next
            if (++idx > _this.collection.length) idx = 0;
            $next = $('<div>', {'class': 'slide img next'});
            $next.appendTo(_this.$slide_wrap);
            _this.loadBackground(_this.collection[random_indexes[idx]], $next);
        }, this.slideDuration);
    };

    Slideshow.prototype.reset = function() {
        clearInterval(this.timer);
        this.$container.empty();
    };

    Slideshow.prototype.render = function() {
        this.$slide_wrap = $('<div>', {'class': 'slideWrap blur'});
        this.$container.append(this.$slide_wrap);
    };

    Slideshow.prototype.update = function(images) {
        this.collection = images;
    };

    Slideshow.prototype.randperm = function(maxValue) {
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
    };

    Slideshow.prototype.loadBackground = function(url, $el, $wait) {
        var image = new Image();
        image.onload = function() {
            $el.css({
                'background-image' : 'url(' + url + ')',
            });
            if($wait) $wait.remove();
        };
        image.onerror = function() {
            $el.remove();
        }
        image.src = url;
    };

    // Scroll module

    var Scroll = function(opts) {
        this.collection = opts.images;
        this.$container = opts.$container;
    };

    Scroll.prototype.start = function() {
        this.generateRandom();
    };

    Scroll.prototype.reset = function() {
        this.$container.empty();
        this.generateRandom();
        this.$container.scrollTop(0);
    };

    Scroll.prototype.render = function() {
        this.$container.click(this.reset.bind(this));
        this.$container.css({'overflow': 'scroll'});
    };

    Scroll.prototype.update = function(images) {
        this.collection = images;
    };

    Scroll.prototype.generateRandom = function() {
        var pageSize = 12;
        var random_indexes = this.randperm(this.collection.length);

        for(var i = 0; i < pageSize; i++) {
            var $img = ($('<img>'));
            var idx = random_indexes[i];
            var url = this.collection[idx];
            this.loadBackground(url, $img)
        }
    };

    Scroll.prototype.loadBackground = function(url, $el) {
        var _this = this;
        var image = new Image();
        image.onload = function() {
            $el.attr({
                'src': url,
            });
            _this.$container.append($el);
        };
        image.onerror = function() {
            $el.remove();
        }
        image.src = url;
    };

    Scroll.prototype.randperm = function(maxValue) {
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
    };

    // Grid module

    var Grid = function(opts) {
        this.collection = opts.images;
        this.$container = opts.$container;
    };

    Grid.prototype.render = function(nbig,nsmall) {
        var $screen, $scrollable, $frame;
        var gridSmall = dim.initGrid({
            width:1,
        });
        var docw = $('body').width();

        $screen = $('#screenDomino');
        $screen.empty();
        $scrollable = $('<div>',{class:'scrollable'});
        $scrollable.appendTo($screen);
        $scrollable.css({
            'position'      :'relative',
            'top'           :'0',
            'left'          : (docw - gridSmall.big.landscape.w)/2 ,
            'width'         : gridSmall.big.landscape.h,
            'padding-top'   : 1 * gridSmall.rec.margin,
            'height'        : '100%',
            'overflow'      : 'hidden',
            'overflow-y'    : 'scroll',
            // 'padding-top': '80px',
            '-webkit-overflow-scrolling': 'touch',
        });

        var blocks = this.renderNRec($scrollable,gridSmall, nsmall);
        return blocks;
    };

    Grid.prototype.renderNRec = function($scrollable, grid, nRecBlocks, orientationBiais) {
        var orientationBiais = orientationBiais || '1';

        var recsPairs = [];
        for (var i = 0; i < nRecBlocks/2; i++) {
            var orientation = block4Orientations[i];
            var twoRecs = this['renderUnitSquare']($scrollable,grid, orientation);
            recsPairs[i] = twoRecs;
        }
        var styledRecsArray = this.styleRec(grid, _.flatten(recsPairs));
        return styledRecsArray;
    };

    Grid.prototype.styleRec = function(grid, recsArray) {
        var nImages = 9;
        var styledRecsArray = [];
        for (var i = 0; i < recsArray.length; i++) {
            var r = recsArray[i];
            styledRecsArray[i] = r;
            // console.log('flow.js:log', styledRecsArray[i]);
        }
        return styledRecsArray;
    };

    Grid.prototype.makeBigSquare = function(opts) {
        var _this           = this;
        var opts            = opts || {};
        var th              = opts.flowTheme;
        var grid            = opts.grid || dim.grid;
        var $scrollable     = opts.$scrollable;
        var rdmOrientation  = _.shuffle(['portrait','landscape'])[0];
        var orientation     = opts.orientation || rdmOrientation;
        var cssRdmColor = function() {
            var css = {
                'background-color' : hue.rdm.dark(),
            };
            return css
        };

        var cssbig = {
            'overflow'         : 'hidden',
            'position'         : 'relative',
            'display'          : 'inline-block',
            'width'            : grid.big[orientation].w,
            'height'           : grid.big[orientation].h,
            'margin-top'       : grid.big.marginTop,

        };
        var css_r0 = {
            'width'                 : grid.rec[orientation].w,
            'height'                : grid.rec[orientation].h,
            'position'              : 'absolute',
            'display'               : 'block',
            'top'                   : 0,
            'left'                  : 0,
            'overflow'              : 'hidden',
            'background'            : '#fff',
            // 'background'            : hue.rdm.all(),
            // 'border'                : '1px solid #e8e8e8',
            '-webkit-box-shadow'    : '0 1px 0 rgba(0, 0, 0, .05)',
            'box-shadow': '0px 2px 12px 0px rgba(0,0,0,0.50)'
        };

        var css_r1 = {
            'position'              :'absolute',
            'display'               :'block',
            'overflow'              :'hidden',
            'background'            :'#fff',
            // 'background'            : hue.rdm.all(),
            // 'border'                :'1px solid #e8e8e8',
            '-webkit-box-shadow'    : '0 1px 0 rgba(0, 0, 0, .05)',
            'width'                 : grid.rec[orientation].w,
            'height'                : grid.rec[orientation].h,
            'bottom'                : grid.rec.margin,
            'right'                 : grid.rec.margin,
            'box-shadow': '0px 2px 8px 0px rgba(0,0,0,0.50)'
        };

        var cssSquare0 = {
            'position'      :'absolute',
            'display'       : 'block',
            'overflow'      : 'hidden',
            'top'           : 0,
            'left'          : 0,
            'width'         : grid.rec[orientation].square.w,
            'height'        : grid.rec[orientation].square.h,
            // 'z-index'       : 10,
            'overflow'      :'hidden',
        };

        var cssSquare1 = {
            'position'      : 'absolute',
            'display'       : 'block',
            'overflow'      : 'hidden',
            'bottom'        : 0,
            'right'         : 0,
            'width'         : grid.rec[orientation].square.w,
            'height'        : grid.rec[orientation].square.h,
            // 'z-index'       : 10,
            'overflow'      :'hidden',
        };
        var $big  = $('<div>').addClass('big-' + orientation).css(cssbig).appendTo($scrollable);
        var $r0   = $('<div>').addClass('rec0-' + orientation).css(css_r0).appendTo($big);
        var $r1   = $('<div>').addClass('rec1-' + orientation).css(css_r1).appendTo($big);
        var $r0s0 = $('<div>').addClass('img r0s0-' + orientation);
        var $r0s1 = $('<div>').addClass('img r0s1-' + orientation);
        var $r1s0 = $('<div>').addClass('img r1s0-' + orientation);
        var $r1s1 = $('<div>').addClass('img r1s1-' + orientation);
        $r0s0.css(cssSquare0).appendTo($r0);
        $r0s1.css(cssSquare1).appendTo($r0);
        $r1s0.css(cssSquare0).appendTo($r1);
        $r1s1.css(cssSquare1).appendTo($r1);

        $('img').hide()

        var big = {
            $big    : $big,
            $r0     : $r0,
            $r0s0   : $r0s0,
            $r0s1   : $r0s1,
            $r1     : $r1,
            $r1s0   : $r1s0,
            $r1s1   : $r1s1,
            orientation: orientation,
        }
        return big;
    };

    Grid.prototype.renderUnitSquare = function($scrollableParent, grid, orientation) {
        var bigSquare = this.makeBigSquare({
            $scrollable     : $scrollableParent,
            grid            : grid,
            orientation     : orientation,
        });

        var files = this.collection;
        var css = {
            'background-position'   : 'center',
            'background-repeat'     : 'no-repeat',
            'background-size'       : 'cover',
            'cursor'                : 'pointer'
        };

        var $big    = bigSquare.$big;
        var $r1     = bigSquare.$r1;
        var $r0     = bigSquare.$r0;
        var $r1s0   = bigSquare.$r1s0.css(css);
        var $r1s1   = bigSquare.$r1s1.css(css);
        var $r0s0   = bigSquare.$r0s0.css(css);
        var $r0s1   = bigSquare.$r0s1.css(css);

        mad.imgload(files[mad.rdmno(files.length)],$r1s0)
        mad.imgload(files[mad.rdmno(files.length)],$r1s1)
        mad.imgload(files[mad.rdmno(files.length)],$r0s0)
        mad.imgload(files[mad.rdmno(files.length)],$r0s1)


        $big.css({
            'height': $big.height() - grid.rec.margin,
            'width' : $big.width() - grid.rec.margin,
        });
    };

    return {
        'slideshow': Slideshow,
        'scroll': Scroll,
        'grid': Grid
    };
})();
