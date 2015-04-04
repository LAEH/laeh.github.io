dim            = {};
dim.initGrid            = function(opts) {
   var opts = opts || {};

   // Set-Up
   var docw                      = Math.max(812,$('body').width());
   var doch                      = Math.max(600,$( document ).height());
   var docw                      = $('body').width();
   var doch                      = $( document ).height();
   var ntile                     = opts.ntile || 9;
   var gridSize                  = Math.sqrt(ntile);
   var width                     = opts.width || 1;
   var minMarginFactor           = opts.minMarginFactor || 3;
   var bigSquareTopMarginFactor  = opts.bigSquareTopMarginFactor || 0; // Seperation between Big square
   var bigSquarePadding          = opts.bigSquarePadding || 1;
   var minmargin                 = mad.factorial(gridSize);
   var margin                    = minMarginFactor * minmargin;
   var portraitHorizontalMargin  = margin * ( 1 + 2 * bigSquarePadding );
   var portraitVerticalMargin    = margin * ( 0 + 2 * bigSquarePadding );
   var landscapeHorizontalMargin = margin * ( 0 + 2 * bigSquarePadding );
   var landscapeVerticalMargin   = margin * ( 1 + 2 * bigSquarePadding );
   var availablePortrait         = Math.floor(width * docw  -  portraitHorizontalMargin);
   var tilePortrait              = Math.floor(availablePortrait / (2*gridSize));
   var squarePortrait            = gridSize * tilePortrait;
   var squareLandscape           = squarePortrait + margin/2;
   var tileLandscape             = squareLandscape / gridSize;
   var bigSquareWidth            = 2 * squarePortrait + portraitHorizontalMargin;
   var radius                    = Math.floor(availablePortrait / 32);
   var bigSquareHeightLandscape  = 2 * squareLandscape + landscapeVerticalMargin;
   var bigSquareHeightPortrait   = 2 * squarePortrait + portraitVerticalMargin;
   var residual                  = availablePortrait - gridSize * tilePortrait - portraitHorizontalMargin;
   var squarePortraitTextSize    = squarePortrait /12
   var squareLandscapeTextSize   = squarePortrait /12
   // Grid Table
   var grid = {
      font : {
         small : 11,
         medium : 13,
         big : 18,
      },
      big : {
         radius : radius,
         w: bigSquareWidth,
         marginTop : bigSquareTopMarginFactor * margin,
         portrait : {
            w: bigSquareWidth,
            h: bigSquareHeightPortrait,
            tile : {
               w: bigSquareWidth/gridSize,
               h: bigSquareHeightPortrait/gridSize,
            }

         },
         landscape : {
            w: bigSquareWidth,
            h: bigSquareHeightLandscape,

            tile : {
               w: bigSquareWidth/gridSize,
               h: bigSquareHeightLandscape/gridSize,
            }
         }
      },
      rec : {
         radius : radius,
         margin : margin,
         portrait : {
            tile : tilePortrait,
            w: squarePortrait,
            h: 2 * squarePortrait,
            tile : {
               w : tilePortrait,
               h : tilePortrait,
            },
            square : {
               text : {
                  top : squarePortrait / 8,
                  font : squarePortrait / 12,
               },
               w: squarePortrait,
               h: squarePortrait,
               size : tilePortrait,
            }
         },
         landscape : {
            w: 2 * squarePortrait + margin,
            h: squareLandscape,
            tile : {
               w : tileLandscape,
               h : tileLandscape,
            },
            square : {
               text : {
                  top : squareLandscape/8,
                  font : squareLandscape/12,
               },
               w : squareLandscape,
               h : squareLandscape,
               tile : tilePortrait,
            }
         }
      }
   }
   this.grid = grid;
   // console.log('dim.js:log', JSON.stringify(grid));
   // console.log(grid)
   return grid;
}

block4Orientations = ['portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape',,'portrait','portrait','landscape','landscape',,'portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape','portrait','portrait','landscape','landscape'];

