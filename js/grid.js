grid = {
    initialize: function(opts) {
        this.collection = opts.images;
        this.$container = opts.$container;
    },
    th: {
        screen      : 'hsla(0,0%,0%,1)', //'hsla(0,0%,95%,1)',
        scrollable  : 'hsla(0,0%,0%,1)', //'hsla(0,0%,95%,1)',
        big         : 'hsla(0,0%,0%,1)', //'hsla(0,0%,95%,1)',
        r0          : 'white',
        r1          : 'white',
        r0s1        : 'white',
        r1s0        : 'white',
        r0s0        : 'white',
        r1s1        : 'white',
    },

    render: function(nbig,nsmall) {
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
    },

    renderNRec: function($scrollable, grid, nRecBlocks, orientationBiais) {
        var orientationBiais = orientationBiais || '1';

        var recsPairs = [];
        for (var i = 0; i < nRecBlocks/2; i++) {
            var orientation = block4Orientations[i];
            var twoRecs = this['renderUnitSquare']($scrollable,grid, orientation);
            recsPairs[i] = twoRecs;
        }
        var styledRecsArray = this.styleRec(grid, _.flatten(recsPairs));
        return styledRecsArray;
    },

    styleRec: function(grid, recsArray) {
        var nImages = 9;
        var styledRecsArray = [];
        for (var i = 0; i < recsArray.length; i++) {
            var r = recsArray[i];
            styledRecsArray[i] = r;
            // console.log('flow.js:log', styledRecsArray[i]);
        }
        return styledRecsArray;
    },

    makeBigSquare : function (opts){
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
    },

    renderUnitSquare: function ($scrollableParent,grid, orientation) {
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
    },
}

