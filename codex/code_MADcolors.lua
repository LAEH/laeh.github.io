function HUE.circular(opt)
   opt = opt or {}
   local n  = 40
   local value = opt.value or torch.random(1,9)
   local chroma = opt.chroma or torch.random(1,99)
   local degree = opt.degree or torch.random(1,40)
   local goLeft = opt.goLeft or torch.random(1,20)
   local goRight = opt.goRight or torch.random(1,20)

   ----hue
   local idx = degree
   if goRight~=0 then idx = idx + goRight end
   if goLeft~=0 then idx = idx - goLeft end

   ----list -> circle
   if idx > n then idx = idx - n end
   if idx < 0 then idx = n - idx end

   ----light row
   value = 10 - value
   local valueRow = MADpalettes.munsell.flat[idx][value]

   ----color
   local nChroma = #valueRow
   local chromaIndex = math.ceil((chroma/100)*nChroma)
   local color = valueRow[chromaIndex]

   h1([[
      ------------------
      MADcolors.circular ({
         Value  =]].. value   ..[[,  (1-9)
         Chroma =]].. chroma  ..[[,  (1-100)
         degree =]].. degree  ..[[,  (1-40)
         rLeft  =]].. goLeft  ..[[,  (1-20)
         rRight =]].. goRight ..[[,  (1-20)
      })
      COLOR = ]]..color..[[
   ]]
   )

   ---- RETURN
   return color
end
