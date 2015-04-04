function OMG.shuffleBinned(img,opt)
   local opt         = opt or {}
   local img         = img or rick
   local imgh        = opt.imgh or defaultSize
   local imgw        = opt.imgw or defaultSize * 1.5
   local verbose     = opt.verbose or true
   local wBlocksNo   = opt.wBlocksNo or 16
   local hBlocksNo   = opt.hBlocksNo or 16
   local imgInfos    = pixels.getFileInfo(img)
   local img         = image.scale(img,imgh,imgw)[{{1,3}}]
   local imgdims     = #img
   local blockw      = imgdims[3]/wBlocksNo
   local blockh      = imgdims[2]/hBlocksNo
   local imgHSL      = image.rgb2hsv(img)*0.99
   local blocks      = imgHSL:unfold(3,blockw,blockw):unfold(2,blockh,blockh)
   local allBlocks   = blocks:reshape((#blocks)[1],
                                   (#blocks)[2]*(#blocks)[3],
                                   (#blocks)[4]*(#blocks)[5])
   if verbose then
      print(col.Magenta('Bins tensors Dimensions = '))
      print(imgw..'*'..imgh..'*'.. wBlocksNo..'*'..wBlocksNo..'*'..hBlocksNo)
   end
   for i = 1, (#allBlocks)[2] do
      xlua.progress(i,(#allBlocks)[2])
      local rdmPositions = torch.randperm((#allBlocks)[3]) --Randomize Bins
      for j = 1, (#allBlocks)[3] do
         allBlocks[{ 1,i,j }] = allBlocks[{ 1,i,rdmPositions[j] }]
         allBlocks[{ 2,i,j }] = allBlocks[{ 2,i,rdmPositions[j] }]
         allBlocks[{ 3,i,j }] = allBlocks[{ 3,i,rdmPositions[j] }]
      end
   end
   img = allBlocks:reshape((#blocks)[1],
                           (#blocks)[2],
                           (#blocks)[3],
                           (#blocks)[4],
                           (#blocks)[5])
   img = image.hsv2rgb(img:transpose(3,4):reshape(3,imgh,imgw))
   if verbose then
      print('Shuffle -> #img=',#img)
      print('Reorganize -> #img=',#img)
   end
   return img
end
