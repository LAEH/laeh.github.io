function webView(idir)
   local files = mad.dir.imgs(idir)
   local imgDIVstrings = {}
   for i, root in ipairs(order) do
      if webTable[root] then
         local fraction = webTable[root].fraction
         local scaled = fraction/maxv
         print(fraction)
         local opacity
         if fraction == maxv then
            print('max :', maxv)
            opacity = 0
         else
            opacity = math.min(1- scaled, .8)
         end
         print(opacity)
         table.insert(imgDIVstrings,
            mad.dom.DIV({
               class = 'box',
               content = table.concat({
                  mad.dom.DIV({
                     class = 'img',
                     url = dmosaics..'/'..root..'.jpg',
                  }),
                  mad.dom.DIV({
                     class = 'mask',
                     style = 'background:rgba(0,0,0,'..opacity..')'
                  }),
                  mad.dom.DIV({
                     class = 'text title',
                     text = root
                  }),
                  mad.dom.DIV({
                     class = 'text total',
                     text = webTable[root].total
                  }),
                  mad.dom.DIV({
                     class = 'text percent',
                     text = webTable[root].percent,
                  })
               })
            })

         )
      end
   end
   local imagesWrap = mad.dom.DIV({
      class ='imagesWrap',
      content = table.concat(imgDIVstrings)
   })
   mad.dom.makeDoc ({
      docName = id..'.html',
      html = mad.dom.knitDoc({
         content = imagesWrap,
         fcss = '/Users/laeh/laeh/ui/server/css/style.css'
      }),
   })
   os.execute('open '..id..'.html')
end
