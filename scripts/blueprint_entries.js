'use strict';
// Kelle blueprint entries. {ids, layer, start, end?, v, allMatch?, note?}
// v:true  = verbatim: start[/end] are anchors located in the transcript; the CSV
//           stores the exact transcript slice. allMatch:true = every cited script
//           must literally contain it (exact shared line). default = any-match.
// v:false = label text (angles / persona avatars).
module.exports = [
  // ============================================================
  // BATCH 1 (pilot) — 10 scripts
  // ============================================================
  // ---- HOOKS ----
  {ids:['B#2.6'],layer:'Hook',v:true,start:"Ok, this is for every woman who owns a magnifying mirror just for tweezing their chin..."},
  {ids:['B#2.6','B#27','B#27.2'],layer:'Hook',v:true,note:'B#27/27.2 drop leading "Like,"',start:"If you're plucking your chin and upper lip every two days and pretending it's not taking over your life, sit down. We need to talk."},
  {ids:['B#2.6'],layer:'Hook',v:true,start:"My clients go from plucking their chin every single morning to not touching their tweezers in 5 weeks. And no, it's not laser."},
  {ids:['B#22'],layer:'Hook',v:true,start:"If your chin and upper lip hair seems to grow back faster and thicker every time you pluck, shave, or wax, it's not just menopause. These are signs of follicle trauma."},
  {ids:['B#22'],layer:'Hook',v:true,start:"If you can't seem to get rid of facial hair after 50, no matter what you try… It's not just hormones, age, and menopause. You're probably experiencing follicle trauma."},
  {ids:['B#33'],layer:'Hook',v:true,start:"I thought serum for stopping chin hair from growing back was BS until I tried it for 3 weeks."},
  {ids:['B#33'],layer:'Hook',v:true,start:"I've been plucking my chin every single morning for 6 years, and now I haven't touched my tweezers in 4 weeks."},
  {ids:['B#33'],layer:'Hook',v:true,start:"I thought laser was the only permanent solution for my chin hair until I tried this serum for 3 weeks."},
  {ids:['B#42'],layer:'Hook',v:true,start:"I've been an aesthetician for 23 years. And the biggest lie in my industry is that there's no permanent solution to facial hair after 50."},
  {ids:['B#42'],layer:'Hook',v:true,start:"I've been an aesthetician for 23 years. And the biggest lie in my industry is that laser and electrolysis are the only long-term solutions to facial hair after 40."},
  {ids:['B#42'],layer:'Hook',v:true,start:"If you're over 40 and have been plucking your chin every day for years… Stop doing that and listen up."},
  {ids:['B#75'],layer:'Hook',v:true,start:"I was one more failed product away from giving up on my facial hair."},
  {ids:['B#75'],layer:'Hook',v:true,start:"7 years and $2,600 later, I was starting to think some women are just stuck with facial hair forever."},
  {ids:['B#75'],layer:'Hook',v:true,start:"I got really good at removing my facial hair, but I never got any closer to getting rid of it."},
  {ids:['B#85'],layer:'Hook',v:true,start:"First man I'd dated since my divorce leaned in at the end of our third date, and I turned my cheek. Because I didn't want him to feel the stubble on my chin."},
  {ids:['B#85'],layer:'Hook',v:true,start:"I'm 53. And after my divorce, the scariest part of dating again wasn't being alone, it was the thought of a man getting close enough to feel the facial hair I'd been hiding for years."},
  {ids:['B#85'],layer:'Hook',v:true,start:"My first date after my divorce told me my profile photos didn't look like me. He was right, they were taken in soft lighting to hide my chin hairs."},
  {ids:['B#89'],layer:'Hook',v:true,start:"If you're using Cyperus Rotundus and not seeing results, there might be something wrong with how you're using it."},
  {ids:['B#89'],layer:'Hook',v:true,start:"The exact routine I used to get rid of my menopausal facial hair in under 7 weeks."},
  {ids:['B#37'],layer:'Hook',v:true,note:'no labeled hook — opening line',start:"Reminder: if you start using cyperus rotundus serum tonight and do it consistently, you'll stop obsessively plucking your chin every morning."},
  {ids:['B#37'],layer:'Hook',v:true,note:'no labeled hook — opening line',start:"Reminder: cyperus rotundus serum twice a day gets rid of menopausal facial hair"},
  {ids:['B#37'],layer:'Hook',v:true,note:'no labeled hook — opening line',start:"Reminder for women over 40: stop plucking your chin and start using cyperus rotundus"},
  {ids:['B#92'],layer:'Hook',v:true,note:'no labeled hook — opening line',start:"Still looking for a gift your mother will thank you for?"},
  {ids:['B#92'],layer:'Hook',v:true,note:'no labeled hook — opening line',start:"Your mom probably isn't telling you this…"},
  {ids:['B#92'],layer:'Hook',v:true,note:'no labeled hook — opening line',start:"She spent years taking care of everyone else."},
  {ids:['15sec-VSL'],layer:'Hook',v:true,note:'no labeled hook — opening line',start:"Cyperus rotundus serum reduces facial hair by blocking DHT at the follicle."},
  {ids:['15sec-VSL'],layer:'Hook',v:true,note:'no labeled hook — opening line',start:"Kelle Skin's Cyperus Rotundus Serum helps you get rid of unwanted facial hair without the endless plucking and shaving cycle."},
  // ---- ANGLE ----
  {ids:['B#2.6'],layer:'Angle',v:false,start:"Aesthetician daily-plucker empathy"},
  {ids:['B#22'],layer:'Angle',v:false,start:"Follicle trauma reframe (you're making it worse)"},
  {ids:['B#33'],layer:'Angle',v:false,start:"Skeptic turned believer"},
  {ids:['B#37'],layer:'Angle',v:false,start:"Reminder nudge (consistency)"},
  {ids:['B#42'],layer:'Angle',v:false,start:"DHT root cause (the industry lie)"},
  {ids:['B#75'],layer:'Angle',v:false,start:"Tried everything, about to give up"},
  {ids:['B#85'],layer:'Angle',v:false,start:"Post-divorce dating confidence"},
  {ids:['B#89'],layer:'Angle',v:false,start:"How-to-use routine (usage education)"},
  {ids:['B#92'],layer:'Angle',v:false,start:"Gift for mom (proxy buyer)"},
  {ids:['15sec-VSL'],layer:'Angle',v:false,start:"Fast mechanism + proof (short VSL)"},
  // ---- UNIQUE MECHANISM ----
  {ids:['B#2.6'],layer:'Unique mechanism',v:true,start:"I got so frustrated watching my clients go in circles",end:"But this actually stops it from growing."},
  {ids:['B#22'],layer:'Unique mechanism',v:true,start:"Here's what actually happens at the follicle level",end:"while weakening the follicles and reducing facial hair growth."},
  {ids:['B#42'],layer:'Unique mechanism',v:true,start:"But it's like ripping out weeds without ever touching the root.",end:"The follicle shuts down."},
  {ids:['B#42'],layer:'Unique mechanism',v:true,start:"It works on every hair color",end:"doesn't affect your hormones."},
  {ids:['B#75','B#27','B#27.2'],layer:'Unique mechanism',v:true,allMatch:true,note:'shared Daily Plucker mechanism block',start:"She told me about this serum.",end:"But this actually stops the follicle from producing it."},
  {ids:['B#85'],layer:'Unique mechanism',v:true,start:"During menopause, your estrogen drops",end:"It just quiets the signal telling the hair to grow."},
  {ids:['B#85'],layer:'Unique mechanism',v:true,start:"unlike most cyperus rotundus products out there that are essential oils",end:"reaches the follicle."},
  {ids:['B#89'],layer:'Unique mechanism',v:true,start:"They think Cyperus Rotundus is a hair remover",end:"Until eventually it doesn't grow back."},
  {ids:['B#92'],layer:'Unique mechanism',v:true,start:"Kelle Skin targets the hormonal signal behind menopausal facial hair."},
  {ids:['15sec-VSL'],layer:'Unique mechanism',v:true,start:"Cyperus rotundus serum reduces facial hair by blocking DHT at the follicle.",end:"slower, thinner, and less often."},
  // ---- CTA ----
  {ids:['B#2.6'],layer:'CTA',v:true,start:"I get it. That's why they have a 60-day money-back guarantee",end:"so you can check it out."},
  {ids:['B#22'],layer:'CTA',v:true,start:"And 60 days is exactly how long their money-back guarantee lasts.",end:"with a simple, gentle serum."},
  {ids:['B#33'],layer:'CTA',v:true,start:"And even better, they offer a full 60-day money-back guarantee",end:"putting their tweezers down for good."},
  {ids:['B#42'],layer:'CTA',v:true,start:"You have two options right now.",end:"Link is below."},
  {ids:['B#75','B#27','B#27.2'],layer:'CTA',v:true,allMatch:true,note:'shared Daily Plucker close',start:"And if you're thinking, 'I've heard this before.'",end:"so you can check it out."},
  {ids:['B#85'],layer:'CTA',v:true,start:"And to top it off, they offer a 60-day money-back guarantee.",end:"I literally had nothing to lose."},
  {ids:['B#85'],layer:'CTA',v:true,start:"Last time I checked, they had bundle offers running",end:"Link's below."},
  {ids:['B#89'],layer:'CTA',v:true,start:"Plus they offer a 60-day money-back guarantee",end:"before this batch is gone."},
  {ids:['B#92'],layer:'CTA',v:true,start:"Give her back the confidence menopause tried to take away.",end:"Buy 2 Get 1 Free"},
  {ids:['B#92'],layer:'CTA',v:true,start:"Helping her regain the quiet confidence that facial hair took away.",end:"Save up to 50%"},
  // ---- AVATAR ----
  {ids:['B#2.6'],layer:'Avatar',v:true,start:"most of my clients are women in their 40s and 50s dealing with menopausal facial hair"},
  {ids:['B#37','B#92'],layer:'Avatar',v:true,manual:true,note:'workhorse avatar phrase (kept manual — appears in many)',start:"women over 40"},
  {ids:['B#92'],layer:'Avatar',v:true,start:"A clinically proven serum designed specifically for women 40+."},
  {ids:['B#85'],layer:'Avatar',v:false,start:"Post-divorce dating woman (53)"},
  {ids:['B#92'],layer:'Avatar',v:false,start:"Gift-buying daughter (proxy buyer)"},
  {ids:['B#33'],layer:'Avatar',v:false,start:"Skeptic / doesn't believe it works"},
  {ids:['B#3.2','B#27.1'],layer:'Avatar',v:false,start:"Women with white / light facial hair (laser can't treat)"},
  // ---- PROBLEMS ----
  {ids:['B#2.6'],layer:'Problem',v:true,start:"You've been standing in front of the bathroom mirror with your tweezers every single morning."},
  {ids:['B#2.6'],layer:'Problem',v:true,start:"Hair by hair. Chin. Upper lip. Twenty minutes."},
  {ids:['B#2.6','B#42','B#27','B#27.2'],layer:'Problem',v:true,allMatch:true,start:"You avoid certain lighting."},
  {ids:['B#2.6','B#27','B#27.2'],layer:'Problem',v:true,allMatch:true,start:"You stop letting people get close to your face."},
  {ids:['B#42'],layer:'Problem',v:true,start:"You check your chin with your fingers in public."},
  {ids:['B#2.6','B#27','B#27.2'],layer:'Problem',v:true,allMatch:true,note:'B#42 variant: "You check your chin…"',start:"You catch yourself checking your chin with your fingers in public."},
  {ids:['B#2.6','B#75','B#27','B#27.1','B#27.2'],layer:'Problem',v:true,manual:true,note:"waxing red/dry — POV variants: B#75 'I tried…', B#27/27.1/27.2 'I've tried…'",start:"You've tried waxing, but your skin turned red and dry for days."},
  {ids:['B#2.6'],layer:'Problem',v:true,start:"And every day, there they are again. Thicker. More stubborn. Like they're mocking you."},
  {ids:['B#22'],layer:'Problem',v:true,start:"Shadow on the upper lip, thick dark hairs on the chin, peach fuzz on the cheeks…"},
  {ids:['B#22'],layer:'Problem',v:true,start:"If you have ingrowns, hyperpigmentation, if the hair seems to grow back thicker and faster than expected…"},
  {ids:['B#42'],layer:'Problem',v:true,start:"It's getting worse. I'm plucking every morning. I've tried everything."},
  {ids:['B#42'],layer:'Problem',v:true,start:"Your makeup won't sit right."},
  {ids:['B#75'],layer:'Problem',v:true,start:"I was stuck in the same cycle over and over again: wake up frustrated, spend 20 minutes removing facial hair, enjoy maybe a day of smooth skin, then watch the stubble return the next day and start dreading it all over again."},
  {ids:['B#85'],layer:'Problem',v:true,start:"My chin was raw and covered in tiny red bumps."},
  {ids:['B#85'],layer:'Problem',v:true,start:"I looked into laser, but half my hair is grey now, and laser doesn't work on grey or white hair."},
  {ids:['B#92'],layer:'Problem',v:true,start:"without waxing appointments, razor burns, or a single trip to a clinic"},
  {ids:['B#85'],layer:'Problem',v:true,start:"somewhere in the last four, I stopped letting my husband see me without makeup."},
  // ---- DESIRES ----
  {ids:['B#75'],layer:'Desire',v:true,start:"I just wanted to get ready in the morning and leave the house without thinking about facial hair at all."},
  {ids:['B#42'],layer:'Desire',v:true,start:"They stopped hiding. They stopped checking. They got their confidence back."},
  {ids:['B#85'],layer:'Desire',v:true,start:"for the first time in I don't know how long, I didn't turn my cheek away. I let him.",end:"And now I feel more like myself than I did at 45."},
  {ids:['B#92'],layer:'Desire',v:true,start:"Give her back the confidence menopause tried to take away."},
  {ids:['B#33'],layer:'Desire',v:true,start:"No more standing at the mirror every morning. No more turning away when someone gets close to my face. No more irritation or ingrown hairs."},
  {ids:['B#75','B#27','B#27.2'],layer:'Desire',v:true,allMatch:true,start:"completely smooth chin, and even the peach fuzz on the cheeks was gone"},
  // ---- REPEATED MESSAGING ----
  {ids:['B#2.6','B#33','B#42','B#75','B#85','B#89','B#3.2','B#3.3','B#14','B#26','B#27','B#27.2'],layer:'Repeated messaging',v:true,manual:true,note:'week-by-week future pacing — recurs (wording/weeks vary per ad)',start:"By week two, the regrowth on my upper lip was barely there.",end:"so fine I could barely see them."},
  {ids:['B#2.6','B#42','B#75','B#89','15sec-VSL','B#27','B#27.2'],layer:'Repeated messaging',v:true,manual:true,note:'removal-vs-inhibition contrast — recurs (wording varies)',start:"Waxing removes hair. Plucking removes hair. Shaving removes hair. But this actually stops the follicle from producing it."},
  {ids:['B#2.6','B#75','B#85','B#27','B#27.2'],layer:'Repeated messaging',v:true,manual:true,note:'the plucking-loop block — recurs (B#2.6 "mocking you")',start:"So I just kept plucking. Every morning. Like clockwork.",end:"Like they're mocking me."},
  {ids:['B#2.6','B#75','B#85','15sec-VSL','B#27','B#27.1','B#27.2'],layer:'Repeated messaging',v:true,note:'87,000-women social proof — recurs',start:"Over 87,000 women have used this",end:"the results stay."},
  {ids:['B#2.7','B#2.8','B#3.2','B#3.3','B#12.3','B#19','B#25','B#26'],layer:'Repeated messaging',v:true,note:'core CR mechanism line — targets follicle & weakens progressively → slower/thinner/lighter until it stops (recurs across nearly all educational ads; "lighter"/"sparser" vary)',start:"targets the hair follicle and weakens it progressively"},
  {ids:['B#2.6','B#75','B#85','B#27','B#27.1','B#27.2'],layer:'Repeated messaging',v:true,note:'the "friend showed up with smooth skin / WHAT DID YOU DO" reveal — recurs',start:"Then my friend, who'd had the same problem for years, showed up to lunch with the smoothest skin.",end:"And I said WHAT DID YOU DO"},

  // ============================================================
  // BATCH 2 — 15 scripts
  // ============================================================
  // ---------- B#2.7 (aesthetician, hidden cost of shaving) ----------
  {ids:['B#2.7'],layer:'Hook',v:true,start:"That is the hidden cost of shaving facial hair after menopause..."},
  {ids:['B#2.7'],layer:'Hook',v:true,start:"I have a client who went from plucking every 3 days to barely thinking about facial hair at all."},
  {ids:['B#2.7'],layer:'Angle',v:false,start:"Aesthetician — removal methods damage mature skin"},
  {ids:['B#2.7','B#2.8'],layer:'Unique mechanism',v:true,allMatch:true,note:'shared aesthetician-podcast mechanism block',start:"I consulted with other aestheticians and dermatologists and stumbled upon this ancient Egyptian botanical",end:"until eventually it doesn't grow back anymore."},
  {ids:['B#2.7'],layer:'Unique mechanism',v:true,start:"Every time you pluck a hair out from the root, you're creating tiny amounts of trauma around that follicle.",end:"come back faster and thicker over time."},
  {ids:['B#2.7'],layer:'CTA',v:true,note:'contains the "either forget about your facial hair or get your money back" risk-reversal',start:"Plus, they are offering a 60-day money-back guarantee.",end:"for anyone who has daily struggles with facial hair."},
  {ids:['B#2.7','B#2.8'],layer:'Problem',v:true,allMatch:true,note:'waxing-damages-mature-skin objection (recurs)',start:"And waxing… Uhh, it damages mature skin SO much - it pulls on it, leaves it dry and irritated, even makes wrinkles form faster"},
  {ids:['B#2.7'],layer:'Problem',v:true,start:"So repeatedly shaving the same areas can leave the skin irritated, dry, sensitive, and prone to ingrown hairs."},
  // ---------- B#2.8 (aesthetician, new avatar / same script) ----------
  {ids:['B#2.8','B#25'],layer:'Hook',v:true,allMatch:true,note:'shared hook (B#25 hook3)',start:"How this woman got rid of her facial hair for good. Without laser sessions or expensive treatments"},
  {ids:['B#2.8','B#3.3'],layer:'Hook',v:true,allMatch:true,note:'shared hook',start:"Nobody warns you that menopause comes with a beard. And every removal method you're trying is silently destroying your skin."},
  {ids:['B#2.8'],layer:'Angle',v:false,start:"Aesthetician — every removal method destroys mature skin"},
  {ids:['B#2.8'],layer:'CTA',v:true,note:'shared closing tail (also in B#2.7)',start:"This serum really is a game-changer.",end:"for anyone who has daily struggles with facial hair."},
  {ids:['B#2.8','B#25'],layer:'Problem',v:true,allMatch:true,note:'menopause symptom list (recurs)',start:"Thick dark hairs on the chin, peach fuzz on the cheeks, shadow on the upper lip",end:"as soon as we step into perimenopause or menopause."},
  {ids:['B#2.8','B#25'],layer:'Problem',v:true,allMatch:true,note:'shaving/plucking side effects (recurs)',start:"And daily shaving or plucking leaves ingrown hairs, makes the hair grow out faster and thicker, leaves dark spots"},
  {ids:['B#2.8'],layer:'Desire',v:true,note:'variant in B#19 ("like once a month"), B#25 ("every few weeks")',start:"They went from visible facial hair and daily struggles with removal to only plucking once a month, or are already completely hair-free."},
  // ---------- B#3.2 (AI Doctor, white hair) ----------
  {ids:['B#3.2'],layer:'Hook',v:true,start:"Does the white peach fuzz on your cheeks seem invisible indoors, but show up the moment you step into natural light? Then you need to hear this."},
  {ids:['B#3.2'],layer:'Hook',v:true,start:"If you're struggling with white peach fuzz and wiry chin hairs and laser isn't an option, you need to watch this."},
  {ids:['B#3.2'],layer:'Hook',v:true,start:"Hair identifier spray makes you look like a werewolf, and it's oddly satisfying to finally see every white hair before you shave. But it only helps you find them. Here's what helps you get rid of them, Forever."},
  {ids:['B#3.2'],layer:'Angle',v:false,start:"White/light hair — laser can't touch it"},
  {ids:['B#3.2'],layer:'Unique mechanism',v:true,start:"There is an ancient Egyptian herb called Cyperus Rotundus.",end:"while providing long-lasting and permanent results."},
  {ids:['B#3.2'],layer:'CTA',v:true,note:'templated close (also B#3.3, B#26)',start:"I'd recommend every woman to try this serum for 60 days.",end:"completely risk-free."},
  {ids:['B#3.2'],layer:'Problem',v:true,start:"Needless to say, laser hair removal targets the pigment in your hair. So if you have dark hair, it can work. But on white and light hair? It's basically useless."},
  // ---------- B#3.3 (AI Doctor, new avatar / same script) ----------
  {ids:['B#3.3'],layer:'Hook',v:true,start:"If you're over 40 and struggling with facial hair, you need to watch this!"},
  {ids:['B#3.3'],layer:'Hook',v:true,start:"If you're struggling with facial hair, but your mature skin is too sensitive for shaving, waxing, and plucking, you need to watch this!"},
  {ids:['B#3.3'],layer:'Angle',v:false,start:"Every removal method destroys sensitive mature skin"},
  {ids:['B#3.3'],layer:'Unique mechanism',v:true,start:"There is an ancient Egyptian herb called Cyperus Rotundus.",end:"while providing long-lasting results."},
  {ids:['B#3.3','B#26'],layer:'Unique mechanism',v:true,note:'Egypt-sourcing scarcity story (also B#26; wording varies)',start:"But the big problem",end:"at just a fraction of the cost with their"},
  {ids:['B#3.3'],layer:'CTA',v:true,note:'templated close',start:"I'd recommend every woman to try this serum for 60 days.",end:"completely risk-free."},
  {ids:['B#3.3'],layer:'Problem',v:true,start:"I mean, yes, it helps, but the prices for even one session are shocking, AND it's far from a permanent fix.",end:"It's also damaging mature skin."},
  {ids:['B#3.3','B#26'],layer:'Desire',v:true,allMatch:true,note:'recurs',start:"And now you can achieve smooth, hair-free skin from the comfort of your own home, without daily removal struggles, irritation, or spending a fortune."},
  // ---------- B#12.3 (animation, personified tools) ----------
  {ids:['B#12.3'],layer:'Hook',v:true,note:'Hook 3 line (Hook 2 was a production note)',start:"Hi, I'm Cyperus Rotundus. I'm an ancient botanical that weakens your menopausal facial hair until it stops growing completely."},
  {ids:['B#12.3'],layer:'Angle',v:false,start:"Personified removal methods vs Cyperus Rotundus (animation)"},
  {ids:['B#12.3'],layer:'Unique mechanism',v:true,start:"Hi, I'm Cyperus Rotundus. I'm an ancient Egyptian botanical and I target the hair follicles and weaken them progressively.",end:"until eventually it doesn't grow back anymore."},
  {ids:['B#12.3'],layer:'CTA',v:true,start:"Click the link below to find out how thousands of women broke free from daily struggles with removal with the help of this ancient herb."},
  {ids:['B#12.3'],layer:'Problem',v:true,start:"Hi, we are Tweezers. You can use us 30 times a day, and you'll still miss a ton of hairs that everybody will see as soon as you step outside!"},
  {ids:['B#12.3'],layer:'Problem',v:true,start:"Hi, I'm Razor. If you use me, I'll leave you with ingrowns and an even thicker stubble, so you'll have to shave again the next morning!"},
  {ids:['B#12.3'],layer:'Problem',v:true,start:"Hi, I'm Depilatory Cream. I'm a chemical disaster for your mature skin. I can dissolve hair, but I will also dissolve your skin barrier!"},
  {ids:['B#12.3'],layer:'Problem',v:true,start:"Hi, I'm Laser. I can get quite expensive, and I'm totally ineffective on white and light hairs!"},
  // ---------- B#14 (What Would Happen) ----------
  {ids:['B#14'],layer:'Hook',v:true,start:"What would happen if you used Cyperus Rotundus on your facial hair every day for 4 weeks?"},
  {ids:['B#14'],layer:'Hook',v:true,start:"This is what happens to your menopausal facial hair if you apply Cyperus Rotundus extract to your face every day for 4 weeks."},
  {ids:['B#14'],layer:'Hook',v:true,start:"What happens if a woman over 40 who's struggling with facial hair applies Cyperus Rotundus extract every day for 4 weeks."},
  {ids:['B#14'],layer:'Angle',v:false,start:"What-would-happen timeline demonstration"},
  {ids:['B#14'],layer:'Unique mechanism',v:true,start:"After 2 weeks, the hair starts to grow back slower, thinner, and sparser as this ancient botanical weakens the hair follicle.",end:"This is when the results solidify, even when you are not using the extract."},
  {ids:['B#14'],layer:'CTA',v:true,start:"Through the link below, you can try Cyperus Rotundus extract risk-free for 60 days.",end:"they can barely keep it in stock."},
  {ids:['B#14'],layer:'Desire',v:true,start:"Suddenly, you're not picking at your chin, locating the stubborn hairs you need to pluck out as soon as you get your hands on a pair of tweezers."},
  {ids:['B#14'],layer:'Desire',v:true,start:"No more feeling the stubble just hours later."},
  // ---------- B#14-WD (Women's Day BOF, fake-scam sale) ----------
  {ids:['B#14-WD','B#21'],layer:'Hook',v:true,allMatch:true,note:'shared scam hook',start:"CYPERUS ROTUNDUS for facial hair removal IS A SCAM!"},
  {ids:['B#14-WD'],layer:'Hook',v:true,start:"If you're over 40 and struggling with facial hair, WATCH OUT FOR THIS!"},
  {ids:['B#14-WD'],layer:'Hook',v:true,start:"If you're growing an actual beard in your 40s and 50s, WATCH THIS!"},
  {ids:['B#14-WD'],layer:'Angle',v:false,start:"Fake-scam callout → sale (BOF)"},
  {ids:['B#14-WD','B#21'],layer:'Unique mechanism',v:true,allMatch:true,note:'shared with B#21',start:"This serum is infused with an ancient botanical called Cyperus Rotundus.",end:"it targets the follicle itself and not the pigment of the hair."},
  {ids:['B#14-WD'],layer:'CTA',v:true,note:'sale/offer',start:"I'm mad because I paid the full price a week ago, and now they're running a Women's Day Sale",end:"an EXTRA discount with the code WOMAN10 at checkout!"},
  {ids:['B#14-WD','B#21'],layer:'CTA',v:true,allMatch:true,note:'guarantee line shared with B#21',start:"PLUS, they're so confident in this formula that they offer a 60-day money-back guarantee"},
  {ids:['B#14-WD','B#21'],layer:'Desire',v:true,allMatch:true,note:'benefit list shared (B#21 says "60 seconds" vs "30 seconds")',start:"No irritation, harsh chemicals, razor burns, ingrown hairs, or expensive treatments."},
  // ---------- B#19 (aesthetician podcast new) ----------
  {ids:['B#19'],layer:'Hook',v:true,note:'no hook provided (blank) — opening body line',start:"I've done thousands of facial hair waxing sessions over the years and I still get triggered when a mature client says they've been plucking or shaving for years."},
  {ids:['B#19'],layer:'Angle',v:false,start:"Aesthetician insider — plucking/shaving/waxing all wrong for mature skin"},
  {ids:['B#19'],layer:'Unique mechanism',v:true,start:"There is a plant called Cyperus Rotundus.",end:"can clog it and cause inflammation."},
  {ids:['B#19'],layer:'Problem',v:true,start:"And shaving won't actually make the hair grow out faster and thicker, as many think",end:"cutting the hair at its thickest part."},
  {ids:['B#19'],layer:'Problem',v:true,start:"And plucking? I mean, how much can you actually achieve with tweezers?",end:"you'll just irritate the skin."},
  {ids:['B#19'],layer:'Desire',v:true,note:'variant of B#2.8/B#25',start:"Most of them went from visible facial hair and daily struggles with removal to only plucking like once a month, or are already completely hair-free."},
  // ---------- B#21 (Spring Sale BOF) ----------
  {ids:['B#21'],layer:'Hook',v:true,start:"If you're over 40 and struggling with facial hair, DON'T FALL FOR THIS SCAM!"},
  {ids:['B#21'],layer:'Angle',v:false,start:"Fake-scam callout → Spring sale (BOF)"},
  {ids:['B#21'],layer:'CTA',v:true,note:'sale/offer',start:"I'm mad because I paid the full price a week ago, and now they're running a Spring Sale",end:"an EXTRA discount with the code SPRING10 at checkout!"},
  // ---------- B#23 (Short Hype, 2026) ----------
  {ids:['B#23'],layer:'Hook',v:true,start:"In 2026, we are no longer plucking our chin hairs, and we're putting down the razor."},
  {ids:['B#23'],layer:'Hook',v:true,start:"It's 2026… Women over 40 are no longer plucking, shaving, or waxing their facial hair…"},
  {ids:['B#23'],layer:'Hook',v:true,start:"If you're over 40 and struggling with facial hair… Put the tweezers down and throw away that razor."},
  {ids:['B#23'],layer:'Angle',v:false,start:"'It's 2026, we don't pluck anymore' social-trend"},
  {ids:['B#23'],layer:'Unique mechanism',v:true,start:"All you have to do is apply the serum twice a day, and it makes your hair grow back slower, thinner, and sparser.",end:"it targets the follicle itself and not the pigment of the hair."},
  {ids:['B#23'],layer:'CTA',v:true,start:"If the second option sounds better, you can click the link below and get it while the sale is still live"},
  {ids:['B#23'],layer:'Problem',v:true,start:"It becomes a constant loop of stubble, regrowth, ingrowns, hyperpigmentation, and irritation."},
  {ids:['B#23'],layer:'Desire',v:true,start:"you can literally slow down and stop the hair from growing while healing the ingrowns and hyperpigmentation you caused over the years."},
  // ---------- B#25 (dermatologist, from #2.1) ----------
  {ids:['B#25'],layer:'Angle',v:false,start:"Dermatologist — natural/affordable vs laser"},
  {ids:['B#25'],layer:'Unique mechanism',v:true,start:"What I can confidently recommend is this ancient Egyptian botanical called Cyperus Rotundus.",end:"oils can clog pores and even cause inflammation"},
  {ids:['B#25'],layer:'CTA',v:true,start:"And 60 days is exactly how long their money-back guarantee lasts, so you can try it completely risk-free.",end:"if they still have any bottles available."},
  {ids:['B#25'],layer:'Problem',v:true,start:"Laser is a much better solution.",end:"it won't work on light and white hairs."},
  {ids:['B#25'],layer:'Desire',v:true,note:'variant of B#2.8/B#19',start:"They went from visible facial hair and daily struggles with removal to only plucking every few weeks, or are already completely hair-free."},
  // ---------- B#26 (aesthetician, from #3.1) ----------
  {ids:['B#26'],layer:'Hook',v:true,start:"I've been an aesthetician for 17 years, and I still get triggered when someone asks me this."},
  {ids:['B#26'],layer:'Hook',v:true,start:"I've been an aesthetician for 17 years, and I've watched my over 50 clients fight daily battles with facial hair for years. And this thing could have gotten rid of it in 2 weeks"},
  {ids:['B#26'],layer:'Angle',v:false,start:"Aesthetician — objection sequence (shaving/waxing/laser) → CR"},
  {ids:['B#26'],layer:'Unique mechanism',v:true,start:"There is an ancient Egyptian herb called Cyperus Rotundus.",end:"while providing long-lasting results."},
  {ids:['B#26'],layer:'CTA',v:true,note:'templated close (also B#3.2/B#3.3)',start:"I'd recommend every woman to try this serum for 60 days.",end:"completely risk-free."},
  {ids:['B#26'],layer:'Problem',v:true,start:"I mean, yes, it helps, but the prices for even one session are shocking, AND it's completely ineffective on light and white hairs."},
  // ---------- B#27 & B#27.2 (Daily Plucker re-cut — most merges above) ----------
  {ids:['B#27','B#27.2'],layer:'Hook',v:true,allMatch:true,note:'B#27 & B#27.2 = same script, different format',start:"If you own a magnifying mirror just for tweezing your chin, this is for you."},
  {ids:['B#27','B#27.2'],layer:'Hook',v:true,allMatch:true,start:"I went from plucking my chin every single morning to not touching my tweezers in 5 weeks. And no, it wasn't laser."},
  {ids:['B#27','B#27.2'],layer:'Angle',v:false,note:'same script, diff format',start:"Daily plucker first-person testimonial (UGC)"},
  // ---------- B#27.1 (Daily Plucker — white hair / shaver variant) ----------
  {ids:['B#27.1'],layer:'Hook',v:true,start:"If you're dealing with white chin hairs and peach fuzz after 40, and laser is not an option, you need to see this."},
  {ids:['B#27.1'],layer:'Hook',v:true,start:"If you're struggling with white facial hair, but your mature skin is too sensitive for shaving, waxing, and plucking, you need to watch this!"},
  {ids:['B#27.1'],layer:'Hook',v:true,start:"How I got rid of my white menopausal facial hair for good. Without laser sessions or expensive treatments…"},
  {ids:['B#27.1'],layer:'Hook',v:true,start:"White hairs on my chin at 42? Might as well call me Granny."},
  {ids:['B#27.1'],layer:'Angle',v:false,start:"Daily shaver, white-hair testimonial (UGC)"},
  {ids:['B#27.1'],layer:'Unique mechanism',v:true,start:"She told me about this serum.",end:"But this actually stops the follicle from producing it."},
  {ids:['B#27.1'],layer:'CTA',v:true,start:"Plus they have a 60-day money-back guarantee.",end:"so you can check it out."},
  {ids:['B#27.1'],layer:'Problem',v:true,start:"at home, in normal light, I can convince myself I got them all but then I walk into sunlight and my whole face glistens."},
  {ids:['B#27.1'],layer:'Problem',v:true,start:"I looked into laser, but laser doesn't work on white and light hair."},
  {ids:['B#27.1'],layer:'Desire',v:true,start:"completely smooth chin, and even the peach fuzz on the cheeks was gone. No glisten. No halo."},

  // ============================================================
  // BATCH 3 — Cyperus Rotundus #1–#7.2 (the original templates; shared blocks auto-cover)
  // ============================================================
  // shared "no distinct hook" openers (auto-coverage lists every ad that opens this way)
  {ids:['CR#2'],layer:'Hook',v:true,note:'shared aesthetician-podcast opener (no distinct hook)',start:"So, I've been an aesthetician for 17 years"},
  {ids:['CR#2.4'],layer:'Hook',v:true,note:'no labeled hook — opener',start:"I'm Sharon, and I've been a beautician for the last 17 years."},
  {ids:['CR#3'],layer:'Hook',v:true,note:'shared AI-Doctor opener (no distinct hook)',start:"Shaving and plucking are the best ways to get rid of unwanted facial hair after menopause?"},
  // ---- CR#1 (sarcasm scam → borrow-your-serum flash sale) ----
  {ids:['CR#1'],layer:'Hook',v:true,start:"THIS FACIAL HAIR REMOVAL SERUM IS A SCAM!"},
  {ids:['CR#1'],layer:'Hook',v:true,start:"DON'T BUY THIS FACIAL HAIR REMOVAL SERUM!"},
  {ids:['CR#1'],layer:'Hook',v:true,start:"If you're over 40 and fighting daily battles with facial hair, DON'T BUY THIS SERUM!"},
  {ids:['CR#1'],layer:'Hook',v:true,start:"DON'T TRY THIS FACIAL HAIR REMOVAL HACK!"},
  {ids:['CR#1'],layer:'Angle',v:false,start:"Fake-scam sarcasm → everyone borrows your serum (flash sale)"},
  {ids:['CR#1'],layer:'Desire',v:true,start:"It's all smooth skin and hair-free life until your sisters, friends, and all the women in your family want to borrow your life-changing serum",end:"asking you how to order more…"},
  {ids:['CR#1'],layer:'CTA',v:true,note:'24-hour flash sale',start:"Because today, they're running a HUGE 24-hour flash sale!",end:"say goodbye to daily plucking for good!"},
  // ---- CR#2 family (aesthetician podcast, AU "Viareline" — body shared, auto-covers) ----
  {ids:['CR#2'],layer:'Angle',v:false,start:"Aesthetician podcast (AU) — researched a permanent solution"},
  {ids:['CR#2.1'],layer:'Angle',v:false,start:"Aesthetician podcast — new-hooks variant"},
  {ids:['CR#2.2'],layer:'Angle',v:false,start:"Aesthetician podcast — AI-avatar variant"},
  {ids:['CR#2.3'],layer:'Angle',v:false,start:"Aesthetician podcast — white-hair focus"},
  {ids:['CR#2.4'],layer:'Angle',v:false,start:"Aesthetician UGC (Sharon) — either/or 60-day close"},
  {ids:['CR#2.5'],layer:'Angle',v:false,start:"Aesthetician podcast — send-to-a-friend (US)"},
  {ids:['CR#2.5'],layer:'Hook',v:true,start:"If you have a friend who is over 40 and struggling with facial hair, send them this video."},
  {ids:['CR#2.3'],layer:'Unique mechanism',v:true,note:'white-hair: targets follicle not pigment',start:"And the thing is, cyperus rotundus targets the hair follicle itself and does NOT rely on hair pigment to be effective.",end:"basically ineffective on white or light hair."},
  {ids:['CR#2.4'],layer:'CTA',v:true,note:'either/or 60-day close (also CR#7 variant)',start:"Most women see the first results after just a few weeks, but I always suggest staying consistent for at least 60 days",end:"if they still have any bottles available."},
  // ---- CR#3 / CR#3.1 (AI Doctor — mechanism/Egypt/CTA auto-cover from Batch#3.x rows) ----
  {ids:['CR#3'],layer:'Angle',v:false,start:"AI Doctor — objection sequence (AU/Viareline)"},
  {ids:['CR#3.1'],layer:'Angle',v:false,start:"AI Doctor — objection sequence (US)"},
  {ids:['CR#3'],layer:'Problem',v:true,note:'laser objection variant',start:"I mean, yes, it helps, but the prices for even one session are shocking, AND it's still damaging to the skin."},
  // ---- CR#5 / CR#5.1 (new business launch hype) ----
  {ids:['CR#5'],layer:'Hook',v:true,note:'no labeled hook — opener',start:"If you're over 40 and living in Australia, listen up!"},
  {ids:['CR#5.1'],layer:'Hook',v:true,note:'no labeled hook — opener',start:"If you're over 40, listen up!"},
  {ids:['CR#5'],layer:'Angle',v:false,start:"New Australian business launch hype"},
  {ids:['CR#5.1'],layer:'Angle',v:false,start:"New business launch hype (US)"},
  {ids:['CR#5'],layer:'Unique mechanism',v:true,note:'new-business product intro',start:"a hydrating, gentle serum infused with an ancient Egyptian botanical that has been used for centuries by Egyptian women for painless and affordable hair removal with long-term results.",end:"it doesn't grow back anymore."},
  {ids:['CR#5'],layer:'CTA',v:true,note:'launch scarcity (ends at midnight)',start:"And today only, as a new small business taking on the big hair removal companies, they're running some insane deals!",end:"irritation, or high price tags!"},
  // ---- CR#6 / CR#6.1 (BOF — small biz sacrificing profit + consistency/AOV) ----
  {ids:['CR#6.1'],layer:'Hook',v:true,start:"If you're over 40 and suddenly growing hair all over your face, listen up!"},
  {ids:['CR#6'],layer:'Angle',v:false,start:"BOF — small biz sacrificing profit + consistency/AOV"},
  {ids:['CR#6.1'],layer:'Angle',v:false,start:"BOF — small biz + consistency/AOV (US)"},
  {ids:['CR#6'],layer:'CTA',v:true,note:'sacrificing-profit + biggest-bundle scarcity',start:"They are sacrificing their profits right now to gain customers and take on the big hair removal companies, so take advantage!"},
  {ids:['CR#6'],layer:'Repeated messaging',v:true,note:'consistency / 60-90 day AOV push (stock up on biggest bundle)',start:"Users report the first results in just 2 to 4 weeks, but everyone is stocking up because after 60 to 90 days of consistent use",end:"ditch your tweezers and razor for good…"},
  // ---- CR#7 / CR#7.1 / CR#7.2 (Mia the Founder story) ----
  {ids:['CR#7'],layer:'Hook',v:true,note:'no labeled hook — opener',start:"I'm Mia, and I watched my mum fight daily battles with facial hair for years, ever since she turned 50."},
  {ids:['CR#7.1'],layer:'Hook',v:true,start:"Attention Australian ladies over 40… Tired of daily plucking and tweezing? Irritation from waxing? Ingrowns from shaving?"},
  {ids:['CR#7.2'],layer:'Hook',v:true,start:"If you're over 40 and struggling with facial hair, watch this!"},
  {ids:['CR#7'],layer:'Angle',v:false,start:"Founder story — Mia & her mum"},
  {ids:['CR#7.1'],layer:'Angle',v:false,start:"Founder story — Mia (V2, all-hair/pigment)"},
  {ids:['CR#7.2'],layer:'Angle',v:false,start:"Founder story — Mia podcast"},
  {ids:['CR#7'],layer:'Angle',v:false,note:'founder emotional angle',start:"Industry-abandoned-women founder motivation"},
  {ids:['CR#7'],layer:'Problem',v:true,start:"That's when I realized the beauty and hair removal industry had abandoned women like my mom."},
  {ids:['CR#7'],layer:'CTA',v:true,note:'either/or close + founder confidence',start:"And 60 days is exactly how long our money-back guarantee lasts.",end:"or we sell out, again…"},
  {ids:['CR#7.1'],layer:'Unique mechanism',v:true,note:'targets follicle not pigment (all hair colors)',start:"This incredible formula targets the hair follicle itself and doesn't rely on hair pigment to be effective",end:"just can't deal with light and white hairs."},
  {ids:['CR#7.1'],layer:'CTA',v:true,note:'either love it or money back + exclusive deals',start:"And 60 days is exactly how long our money-back guarantee lasts…",end:"unlock your exclusive deals."},
  {ids:['CR#7.1'],layer:'Desire',v:true,note:'founder mission (shared CR#7.2)',start:"I wanted to create a gentle, permanent, and affordable solution to all facial hair concerns"},
  {ids:['CR#7.2'],layer:'Unique mechanism',v:true,note:'targets follicle not pigment, equally effective light/dark',start:"And as it targets the follicle itself and not the pigment of the hair, it's equally effective for light and dark hairs, unlike laser."},

  // ============================================================
  // BATCH 4 — CR#8–#18 + Batch#28–32
  // ============================================================
  // recurring "works when laser can't" mechanism line (auto-covers CR#8/9/11)
  {ids:['CR#9'],layer:'Unique mechanism',v:true,note:'targets follicle not pigment → works when laser can\'t (recurs)',start:"targets the follicle itself, not the pigment of the hair, so it works when laser can't"},
  // ---- CR#8 (aesthetician rates hair-removal methods) ----
  {ids:['CR#8'],layer:'Hook',v:true,start:"Aesthetician with 17 years of experience rates facial hair removal methods for women over 40."},
  {ids:['CR#8'],layer:'Hook',v:true,start:"So you've been an aesthetician for 17 years, right? And you said you mostly worked with women over 40 who are struggling with facial hair… How would you rate these hair removal methods?"},
  {ids:['CR#8'],layer:'Angle',v:false,start:"Aesthetician rates hair-removal methods (scorecard)"},
  {ids:['CR#8'],layer:'Problem',v:true,note:'laser rating — dark hair only',start:"Very good results. But only on dark hair. So grey hair, white hair, gingers… Forget about it… And it can be costly, let's be realistic."},
  // ---- CR#9 (white hair short) ----
  {ids:['CR#9'],layer:'Hook',v:true,start:"White facial hair and peach fuzz after 40?"},
  {ids:['CR#9'],layer:'Hook',v:true,start:"If you're over 40 and annoyed by the sudden peach fuzz and white facial hair…"},
  {ids:['CR#9'],layer:'Hook',v:true,start:"If you're suddenly growing white facial hair and peach fuzz in your 40s or 50s…"},
  {ids:['CR#9'],layer:'Angle',v:false,start:"White-hair short (laser won't, this will)"},
  {ids:['CR#9'],layer:'CTA',v:true,start:"Tap below and join thousands of happy women with smooth, hair-free skin without any ingrowns, razor burns, irritation, or high price tags!"},
  // ---- CR#10 (Nut Grass) ----
  {ids:['CR#10'],layer:'Hook',v:true,start:"This is what happens when you rub Nut Grass on your face every morning."},
  {ids:['CR#10'],layer:'Angle',v:false,start:"Nut Grass reveal (CR by its common name)"},
  {ids:['CR#10'],layer:'Unique mechanism',v:true,note:'names CR as "Nut Grass"',start:"And switch to Cyperus Rotundus, known as Nut Grass, in a hydrating serum with science-backed ingredients for long-term results and nourished skin."},
  // ---- CR#11 (everyone thinks it's laser) ----
  {ids:['CR#11'],layer:'Hook',v:true,start:"Everyone thinks I've done laser hair removal, but the truth…"},
  {ids:['CR#11'],layer:'Hook',v:true,start:"No laser, no electrolysis, just ancient herbs."},
  {ids:['CR#11'],layer:'Angle',v:false,start:"'Everyone thinks it's laser' testimonial"},
  {ids:['CR#11'],layer:'Problem',v:true,start:"In my 50s, I thought hot flashes were my biggest problem.",end:"literal whiskers and peach fuzz all over my cheeks."},
  {ids:['CR#11'],layer:'Desire',v:true,start:"For the first time in years, I'm not fighting daily battles with removal…"},
  {ids:['CR#11'],layer:'CTA',v:true,start:"Join thousands of women who have done the same and try the Cyperus Rotundus serum from Kelle for 60 days.",end:"you get every penny back!"},
  // ---- CR#12 (animation — personified facial hair) ----
  {ids:['CR#12'],layer:'Hook',v:true,start:"I'm Cyperus Rotundus, and I progressively weaken your facial hair until it doesn't grow back anymore."},
  {ids:['CR#12'],layer:'Angle',v:false,start:"Personified facial hair losing to CR (animation)"},
  {ids:['CR#12'],layer:'Problem',v:true,note:'personified hair',start:"If you shave me, I'll just grow back even faster and thicker."},
  {ids:['CR#12'],layer:'Problem',v:true,note:'personified hair — laser can\'t touch white',start:"Expensive laser treatments can get rid of us dark hairs, but our white friends are still laughing at you in the mirror every morning!"},
  {ids:['CR#12'],layer:'CTA',v:true,start:"Click the link below, unlock exclusive deals, and stop the daily struggles with removal with the help of a hydrating, gentle serum infused with an ancient botanical for long-term results."},
  // ---- CR#12.2 (animation — personified CR serum) ----
  {ids:['CR#12.2'],layer:'Hook',v:true,note:'near-dup of CR#2.5',start:"If you have a friend who's over 40 and struggling with facial hair, send them this video!"},
  {ids:['CR#12.2'],layer:'Angle',v:false,start:"Personified CR serum introduces itself (animation)"},
  {ids:['CR#12.2'],layer:'Unique mechanism',v:true,start:"I target the hair follicle and weaken it progressively.",end:"even white and gray hairs don't stand a chance with me."},
  {ids:['CR#12.2'],layer:'CTA',v:true,note:'90-day guarantee (vs usual 60)',start:"And I come with a 90-day money-back guarantee, so you either love me too, or you get your money back!"},
  // ---- CR#13 (Women's Day BOF — dup of B#14-WD; scam hook + body auto-cover) ----
  {ids:['CR#13'],layer:'Angle',v:false,start:"Fake-scam callout → Women's Day sale (BOF, twin of B#14-WD)"},
  // ---- CR#15 (aesthetician — 4 mistakes) ----
  {ids:['CR#15'],layer:'Hook',v:true,start:"This is the biggest mistake when it comes to facial hair removal after 40."},
  {ids:['CR#15'],layer:'Hook',v:true,start:"Avoid these 4 mistakes if you're over 40 and struggling with facial hair."},
  {ids:['CR#15'],layer:'Angle',v:false,start:"Aesthetician — 4 mistakes to avoid"},
  {ids:['CR#15'],layer:'Problem',v:true,note:'mistake #1',start:"Mistake #1 - shaving or dermaplaning.",end:"razor burn, ingrowns, and hyperpigmentation."},
  {ids:['CR#15'],layer:'Problem',v:true,note:'mistake #3 — bleaching/creams',start:"Mistake #3 - bleaching and instant hair removal creams.",end:"they'll dissolve the hair, and much more…"},
  // ---- CR#16 (aesthetician interview comment) ----
  {ids:['CR#16'],layer:'Hook',v:true,start:"I just turned 50, and the amount of facial hair I'm growing is absurd… What's the best way to get rid of it?"},
  {ids:['CR#16'],layer:'Hook',v:true,start:"Ever since I got close to menopause, I'm dealing with this annoying facial hair every single day… What can I do about it?"},
  {ids:['CR#16'],layer:'Angle',v:false,start:"Aesthetician Q&A (comment-reply interview)"},
  // ---- CR#17 (founder story — mum's perspective) ----
  {ids:['CR#17'],layer:'Hook',v:true,start:"I've fought daily battles with facial hair for years, ever since I stepped close to menopause… Until my daughter found a way to put an end to it for good."},
  {ids:['CR#17'],layer:'Angle',v:false,start:"Founder story — Mia's mum's perspective"},
  {ids:['CR#17'],layer:'Problem',v:true,start:"It impacted my confidence to the point where Mia even said I'm not the same person I once was."},
  {ids:['CR#17'],layer:'CTA',v:true,start:"So if you've been plucking, shaving, and waxing for years…",end:"catch some amazing deals today only."},
  // ---- CR#18 (scientific animation) ----
  {ids:['CR#18'],layer:'Hook',v:true,start:"Did you know what shaving and dermaplaning your facial hair does to your mature skin?"},
  {ids:['CR#18'],layer:'Hook',v:true,start:"Did you know what facial hair waxing does to your mature skin?"},
  {ids:['CR#18'],layer:'Hook',v:true,start:"Did you know what depilatory creams for facial hair removal do to mature skin?"},
  {ids:['CR#18'],layer:'Angle',v:false,start:"Scientific animation — what each method does to skin"},
  {ids:['CR#18'],layer:'Unique mechanism',v:true,start:"Cyperus Rotundus serum from Kelle Skin, infused with this ancient Egyptian botanical, progressively weakens the hair follicles",end:"you get more confident with your skin getting smoother and smoother."},
  // ---- B#28 (Daily Plucker — aesthetician salon UGC) ----
  {ids:['B#28'],layer:'Hook',v:true,start:"If you own a magnifying mirror just for tweezing your chin, listen up."},
  {ids:['B#28'],layer:'Hook',v:true,start:"My clients went from plucking their chin every single morning to not touching their tweezers in 5 weeks. And no, it wasn't laser."},
  {ids:['B#28'],layer:'Angle',v:false,start:"Daily Plucker — aesthetician salon UGC"},
  {ids:['B#28'],layer:'CTA',v:true,start:"So, if you want to ditch that magnifying mirror and tweezers, I'll leave the link below this video so you can check if they still have any bottles available."},
  // ---- B#29 (friend's failed laser — Linda) ----
  {ids:['B#29'],layer:'Hook',v:true,start:"If you want to get rid of facial hair after 40, avoid laser and do this instead."},
  {ids:['B#29'],layer:'Hook',v:true,start:"If you're over 40 and still obsessing over chin hairs every day, ditch your tweezers and do this instead."},
  {ids:['B#29'],layer:'Angle',v:false,start:"Friend's failed laser (Linda) — laser grows back"},
  {ids:['B#29'],layer:'Problem',v:true,start:"Linda's hair grew right back - chin, upper lip, almost all of it. Hundreds of dollars down the drain."},
  {ids:['B#29'],layer:'CTA',v:true,note:'curiosity teaser close',start:"Want to know what it is?",end:"Watch this."},
  // ---- B#30 (aesthetician client story — 60-second hack) ----
  {ids:['B#30'],layer:'Hook',v:true,start:"How my client got rid of her chin hairs permanently in just 60 seconds."},
  {ids:['B#30'],layer:'Hook',v:true,start:"How my over 40 client got rid of her facial hair for good in just 60 seconds."},
  {ids:['B#30'],layer:'Hook',v:true,start:"If you're still plucking your chin hairs every single day, watch this 60 second hack and get rid of them for good."},
  {ids:['B#30'],layer:'Angle',v:false,start:"Aesthetician client story — 60-second hack"},
  {ids:['B#30'],layer:'Problem',v:true,note:'makeup clings to peach fuzz',start:"even makeup doesn't sit right anymore… Foundation clings to the peach fuzz, makes the stubble on the chin and upper lip even more visible",end:"texture you get from constant plucking…"},
  {ids:['B#30'],layer:'CTA',v:true,note:'free bottles buy-2 offer',start:"So, if you're still plucking every day, and you're ready to ditch your tweezers and finally have smooth, glowing skin, try this serum for 60 days totally risk-free",end:"grab yours before it's gone…"},
  // ---- B#31 (animation — mother plucked 31 years) ----
  {ids:['B#31'],layer:'Hook',v:true,start:"My mother plucked the hairs from her chin for 31 years."},
  {ids:['B#31'],layer:'Hook',v:true,start:"My mother plucked her chin hairs every single day until the day she passed."},
  {ids:['B#31'],layer:'Hook',v:true,start:"My mother used to obsess with plucking her chin hairs to the point she almost passed with tweezers in her hand."},
  {ids:['B#31'],layer:'Angle',v:false,start:"Mother plucked 31 years — generational / emotional"},
  {ids:['B#31'],layer:'Problem',v:true,start:"She stopped letting people get close to her face. Turned away from kisses. Avoided direct sunlight like a vampire afraid someone will see the hairs she might have missed that morning."},
  {ids:['B#31'],layer:'Desire',v:true,start:"I cried. Not because of how I looked, but because I thought about my mother. 31 years.",end:"how different would her life have been?"},
  {ids:['B#31'],layer:'CTA',v:true,start:"Don't wait 31 years like my mother did.",end:"try it with their 60-day money-back guarantee."},
  // ---- B#32 (MUA — makeup won't sit right / hair is the barrier) ----
  {ids:['B#32'],layer:'Hook',v:true,start:"I'll tell you something that's going to make A LOT of mature women mad at me."},
  {ids:['B#32'],layer:'Hook',v:true,start:"Professional makeup artist reveals why makeup never sits right on mature skin. And it's not what we all thought…"},
  {ids:['B#32'],layer:'Angle',v:false,start:"Makeup won't sit right — hair is the hidden barrier (MUA)"},
  {ids:['B#32'],layer:'Problem',v:true,start:"You blend and blend and it still looks cakey around your mouth. Your chin has that rough, textured look no matter how thin you layer it. Your upper lip? Forget it.",end:"like it doesn't want to be on your face."},
  {ids:['B#32'],layer:'Unique mechanism',v:true,note:'hair as a foundation barrier',start:"Every fine hair on your face - even the ones you can barely see, even peach fuzz you've never thought about - is creating a barrier between your foundation and your skin.",end:"That's why your upper lip always looks off."},
  {ids:['B#32'],layer:'Desire',v:true,start:"Within the first four weeks, the hair is already so much finer that their foundation starts sitting completely differently. It's not catching anymore. It's actually bonding to skin.",end:"Smooth."},

  // ============================================================
  // BATCH 5 — Batch#34–53
  // ============================================================
  // recurring either/or CTA variant (auto-covers B#43/44/45/53)
  {ids:['B#43'],layer:'CTA',v:true,note:'either/or risk-reversal (recurs)',start:"So you either forget about the daily struggle with facial hair…",end:"Or you get your money back."},
  // ---- B#34 (AI UGC personal story) ----
  {ids:['B#34'],layer:'Hook',v:true,start:"Here's how I went from plucking my chin every single morning to not touching my tweezers for weeks."},
  {ids:['B#34'],layer:'Hook',v:true,start:"Why does nobody talk about the facial hair that comes with menopause? And this simple fix…"},
  {ids:['B#34'],layer:'Hook',v:true,start:"I got rid of my facial hair after menopause, and I'm never going back to obsessive plucking again."},
  {ids:['B#34'],layer:'Angle',v:false,start:"AI UGC personal story (Facebook-ad discovery)"},
  {ids:['B#34'],layer:'Problem',v:true,start:"The facial hair had gotten so bad that I'd stopped doing all the things I loved.",end:"feeling confident even around my own family."},
  {ids:['B#34'],layer:'CTA',v:true,start:"Anyone out there with chin hairs and facial hair after menopause if I can do it, you can too.",end:"Get yours and get your confidence back."},
  // ---- B#35 (ancient plant vs modern — clinical study) ----
  {ids:['B#35'],layer:'Hook',v:true,start:"Dermatologists are warning women over 40 to stop plucking their chin hairs. Here's what they're recommending instead."},
  {ids:['B#35'],layer:'Hook',v:true,start:"A new scientific study has just proved that everything you've been told about facial hair after menopause is wrong."},
  {ids:['B#35'],layer:'Hook',v:true,start:"This is what dermatologists are saying is the end of"},
  {ids:['B#35'],layer:'Angle',v:false,start:"Clinical-study reveal (ancient plant vs modern)"},
  {ids:['B#35'],layer:'Unique mechanism',v:true,note:'1,400-woman study + gamma-curcumene compound',start:"A clinical study tracked 1,400 women over 40 using conventional facial hair removal methods",end:"until it stops growing back at all."},
  // ---- B#36 (makeup artist witnesses client — Sarah) ----
  {ids:['B#36'],layer:'Hook',v:true,start:"If you pluck your chin hairs every morning and keep an extra set of tweezers in your car, keep watching."},
  {ids:['B#36'],layer:'Hook',v:true,start:"Here's how my client went from plucking her chin and upper lip every single day to not touching her tweezers in 4 weeks."},
  {ids:['B#36'],layer:'Angle',v:false,start:"Makeup artist witnesses client's transformation (Sarah, 58)"},
  {ids:['B#36'],layer:'Problem',v:true,note:'MUA sees hair under studio light',start:"no matter what primer I used, no matter how I layered her foundation, you could still see it. The stubble underneath, the texture, and the hairs she's missed."},
  {ids:['B#36'],layer:'Desire',v:true,start:"Her chin was smooth. Not 'she plucked really well this morning' smooth. Like SMOOTH smooth. No stubble. No ingrown bumps. No shadow."},
  // ---- B#38 (plucking is making it worse — animation) ----
  {ids:['B#38'],layer:'Hook',v:true,start:"Your chin hairs aren't growing back because of menopause. They're growing back thicker because you're plucking them. Here's what's actually happening under your skin."},
  {ids:['B#38'],layer:'Hook',v:true,start:"If you're over 40 and plucking your chin and upper lip every single day, you're making your facial hair problem worse."},
  {ids:['B#38'],layer:'Hook',v:true,start:"If you're over 40 and plucking your chin hairs every day, you're literally telling your body to grow them back stronger."},
  {ids:['B#38'],layer:'Angle',v:false,start:"Plucking makes it worse (follicle injury response)"},
  {ids:['B#38'],layer:'Unique mechanism',v:true,start:"Every time you pluck a hair, you yank it out of the follicle. Your body treats that like an injury.",end:"darker, coarser, and more stubborn every single time."},
  // ---- B#39 (esthetician whistleblower — exposing the secret) ----
  {ids:['B#39'],layer:'Hook',v:true,start:"My esthetician would get me arrested if she knew I was exposing this about facial hair after menopause."},
  {ids:['B#39'],layer:'Hook',v:true,start:"If you're over 40 and the hairs on your chin and upper lip are driving you insane, listen up."},
  {ids:['B#39'],layer:'Angle',v:false,start:"Esthetician-industry whistleblower (exposing the secret)"},
  {ids:['B#39'],layer:'Problem',v:true,start:"They'll book you in for a wax every few weeks, charge you thousands for laser sessions, and conveniently forget to mention that waxing is an absolute disaster for mature skin",end:"the hair just grows right back…"},
  {ids:['B#39'],layer:'Unique mechanism',v:true,note:'estrogen drop → growth signals go haywire',start:"It's because at this age, the drop in estrogen allows the growth signals your hair follicles receive to go haywire."},
  // ---- B#40 (visual hooks) ----
  {ids:['B#40'],layer:'Hook',v:true,start:"If your chin looks like THIS, or THIS, watch this video."},
  {ids:['B#40'],layer:'Hook',v:true,start:"If your chin looks like THIS, and your upper lip looks like THIS, save this video."},
  {ids:['B#40'],layer:'Angle',v:false,start:"Visual 'if your chin looks like THIS' hooks"},
  {ids:['B#40'],layer:'Desire',v:true,start:"But it grows back much, much slower and thinner, and MOST of it IS gone.",end:"I only pluck every few weeks now."},
  // ---- B#41 (frustrated daily plucker, skeptic personal) ----
  {ids:['B#41'],layer:'Hook',v:true,start:"How I got rid of my menopausal facial hair without laser sessions or expensive treatments."},
  {ids:['B#41'],layer:'Angle',v:false,start:"Frustrated daily plucker — skeptic personal story"},
  {ids:['B#41'],layer:'Desire',v:true,note:'results stick even if you skip',start:"And the results actually STICK. Even on weeks where I forgot a few applications, the hair didn't come roaring back like it does when you skip a day of plucking."},
  // ---- B#43 (3 mistakes — DHT / 5-alpha reductase) ----
  {ids:['B#43'],layer:'Hook',v:true,start:"Three mistakes to avoid if you're dealing with facial hair after 40."},
  {ids:['B#43'],layer:'Hook',v:true,start:"Stop these 3 mistakes if you want your facial hair to grow back softer, slower, and eventually not at all."},
  {ids:['B#43'],layer:'Hook',v:true,start:"Fix these three mistakes so you can finally wake up and not worry about facial hair."},
  {ids:['B#43'],layer:'Angle',v:false,start:"3 mistakes to avoid (DHT / 5-alpha reductase)"},
  {ids:['B#43'],layer:'Unique mechanism',v:true,note:'5-alpha reductase enzyme inhibition',start:"It helps inhibit the 5-alpha reductase enzyme, so less testosterone gets converted into DHT",end:"no longer signalled to produce thick hair."},
  {ids:['B#43'],layer:'Problem',v:true,start:"Facial hair during perimenopause or menopause is caused when estrogen drops, and excess testosterone gets converted to DHT.",end:"grow thick, coarse, dark hair."},
  // ---- B#44 (it's a system problem — hormonal vs mechanical) ----
  {ids:['B#44'],layer:'Hook',v:true,start:"Here's what nobody in the facial hair removal industry wants you to figure out."},
  {ids:['B#44'],layer:'Hook',v:true,start:"If you're still removing facial hair the old way, watch this."},
  {ids:['B#44'],layer:'Angle',v:false,start:"Hormonal problem, mechanical tool (system problem)"},
  {ids:['B#44'],layer:'Unique mechanism',v:true,note:'ingrown-hair mechanism from plucking',start:"due to plucking, the follicle canal temporarily narrows as the skin heals around it",end:"it can't find a way out and grows inward."},
  // ---- B#45 (ending the daily ritual) ----
  {ids:['B#45'],layer:'Hook',v:true,start:"Who said the first thing you do every morning has to be scanning your face for facial hair?"},
  {ids:['B#45'],layer:'Hook',v:true,start:"I stopped plucking and used this serum for 30 days… and I'm actually shocked."},
  {ids:['B#45'],layer:'Hook',v:true,start:"If looking for facial hair has become your morning ritual… You need to watch this."},
  {ids:['B#45'],layer:'Angle',v:false,start:"Ending the daily face-scanning ritual"},
  // ---- B#46 (aesthetician ranks laser/electrolysis/CR) ----
  {ids:['B#46'],layer:'Hook',v:true,note:'no hook — opening body line',start:"Okay if you're over 40 and you've found yourself having to constantly pluck or shave or wax"},
  {ids:['B#46'],layer:'Angle',v:false,start:"Aesthetician ranks laser / electrolysis / CR (3 fixes)"},
  {ids:['B#46'],layer:'Problem',v:true,note:'electrolysis objection',start:"electrolysis:",end:"it's super painful."},
  // ---- B#48 (research paper — CR extract vs laser, NLM) ----
  {ids:['B#48'],layer:'Hook',v:true,start:"Breaking news for women over 40 dealing with facial hair"},
  {ids:['B#48'],layer:'Hook',v:true,start:"I've been an aesthetician for 17 years. And I've watched so many women in their 40s and 50s spend thousands on laser sessions for chin and upper lip hair."},
  {ids:['B#48'],layer:'Hook',v:true,start:"If you're over 40 and spending thousands on laser… You need to hear this."},
  {ids:['B#48'],layer:'Angle',v:false,start:"Research paper — CR extract vs laser (NLM study)"},
  {ids:['B#48'],layer:'Unique mechanism',v:true,note:'NLM study: extract performed as well as laser',start:"A clinical study indexed in the U.S. National Library of Medicine directly compared Cyperus Rotundus extract against laser treatments,",end:"the extract performed just as well as the laser."},
  // ---- B#49 (AI UGC without VO — meme captions) ----
  {ids:['B#49'],layer:'Hook',v:true,start:"I'm convinced there's nothing on earth with a greater will to live than my chin hair"},
  {ids:['B#49'],layer:'Hook',v:true,start:"All I want is to stop plucking every single day"},
  {ids:['B#49'],layer:'Hook',v:true,start:"just get these freaking hairs off of my face!"},
  {ids:['B#49'],layer:'Angle',v:false,start:"Relatable meme captions ('Directed by Cyperus Rotundus')"},
  {ids:['B#49'],layer:'CTA',v:true,start:"Kelle Skin gave me my mornings back"},
  // ---- B#51 (before and after — up to 50% off) ----
  {ids:['B#51'],layer:'Angle',v:false,start:"Before/after transformation (how it started vs how it's going)"},
  {ids:['B#51'],layer:'CTA',v:true,note:'offer',start:"Click below for up to 50% off"},
  {ids:['B#51'],layer:'Desire',v:true,start:"me in 2026:",end:"feeling like the best version of me again"},
  // ---- B#52 (painful routine at 46) ----
  {ids:['B#52'],layer:'Hook',v:true,start:"At 46, I realised my whole life had quietly rearranged itself around one thing. And I hadn't even noticed it."},
  {ids:['B#52'],layer:'Hook',v:true,start:"At 46, I was dealing with things I never expected."},
  {ids:['B#52'],layer:'Hook',v:true,start:"At 46, my facial hair removal routine had become the most painful part of my day."},
  {ids:['B#52'],layer:'Angle',v:false,start:"Facial hair quietly took over my life at 46 (4 ways)"},
  {ids:['B#52'],layer:'Problem',v:true,note:'4 ways it took over',start:"It started with checking my chin every morning before I did anything else.",end:"facial hair had quietly taken over my life…"},
  {ids:['B#52'],layer:'Desire',v:true,start:"Now I get dressed up in the morning and walk out the door without any facial hair removal rituals.",end:"the best version of myself again."},
  // ---- B#53 (MOF — audience already aware of CR) ----
  {ids:['B#53'],layer:'Hook',v:true,start:"Can a Cyperus Rotundus serum actually stop facial hair for good?"},
  {ids:['B#53'],layer:'Hook',v:true,start:"So you've heard about Cyperus Rotundus for facial hair, but does it actually work?"},
  {ids:['B#53'],layer:'Hook',v:true,start:"Everyone's talking about Cyperus Rotundus. Here's what they're not telling you."},
  {ids:['B#53'],layer:'Angle',v:false,start:"MOF — audience already aware of CR (does it work?)"},
  {ids:['B#53'],layer:'Unique mechanism',v:true,note:'DHT intercept at follicle level',start:"After 40, your estrogen drops, and DHT starts signaling your facial follicles to grow.",end:"until eventually it just… stops."},

  // ============================================================
  // BATCH 6 — Batch#54–78.1 (many reuse the Daily-Plucker body → auto-covers)
  // ============================================================
  // ---- B#54 (industry expose) ----
  {ids:['B#54'],layer:'Hook',v:true,start:"Stop plucking your chin hairs. I'm serious."},
  {ids:['B#54'],layer:'Hook',v:true,start:"Everything you've been doing for facial hair after 40 is wrong."},
  {ids:['B#54'],layer:'Hook',v:true,start:"Why facial hair gets worse after 40. And it's not your fault."},
  {ids:['B#54'],layer:'Angle',v:false,start:"Industry expose — mechanical tool for a hormonal problem"},
  {ids:['B#54'],layer:'Unique mechanism',v:true,note:'follicle stem cells',start:"In fact, a clinical trial showed It goes straight to the follicle stem cells and weakens hair growth signals at the source."},
  // ---- B#55 (aesthetician rates methods 1-10) ----
  {ids:['B#55'],layer:'Hook',v:true,start:"Aesthetician rates the most popular facial hair removal methods from 1 to 10."},
  {ids:['B#55'],layer:'Hook',v:true,start:"I've been an aesthetician for 17 years. Here's my honest rating of every facial hair removal method from 1 to 10."},
  {ids:['B#55'],layer:'Hook',v:true,start:"Ranking every facial hair removal method for women over 40."},
  {ids:['B#55'],layer:'Angle',v:false,start:"Aesthetician rates methods 1–10 (scorecard v2)"},
  {ids:['B#55'],layer:'Problem',v:true,note:'method scorecard',start:"Shaving — 4 out of 10.",end:"for the white, grey, and blonde hair that most women deal with after menopause, it's completely pointless, AND expensive."},
  // ---- B#56 (text overlay — guarantee-forward) ----
  {ids:['B#56'],layer:'Hook',v:true,start:"If this doesn't reduce your facial hair, you get a full refund."},
  {ids:['B#56'],layer:'Hook',v:true,start:"See visibly less facial hair in 60 days, or pay nothing."},
  {ids:['B#56'],layer:'Hook',v:true,start:"60 days to visibly less facial hair. Or your money back."},
  {ids:['B#56'],layer:'Angle',v:false,start:"Guarantee-forward promise (money-back hook)"},
  {ids:['B#56'],layer:'CTA',v:true,note:'60-day try, refund if no results',start:"Try KelleSkin Cyperus Rotundus serum for 60 days.",end:"You get a full refund."},
  // ---- B#57 (AI Doctor — Daily Plucker doctor cut; body auto-covers) ----
  {ids:['B#57'],layer:'Hook',v:true,start:"My patients go from plucking their chin every single morning to not touching their tweezers in 5 weeks. And no, it's not laser."},
  {ids:['B#57'],layer:'Angle',v:false,start:"AI Doctor — Daily Plucker (doctor cut)"},
  // ---- B#58 (caught facial hair in car mirror — UGC skit) ----
  {ids:['B#58'],layer:'Hook',v:true,start:"Why do I always find them in the car?"},
  {ids:['B#58'],layer:'Hook',v:true,start:"I literally plucked my chin this morning, and it's 2 pm.",end:"I am so freaking tired."},
  {ids:['B#58'],layer:'Angle',v:false,start:"Caught facial hair in the car mirror (relatable UGC)"},
  {ids:['B#58'],layer:'Unique mechanism',v:true,note:'peer-reviewed: as effective as laser',start:"A peer-reviewed study showed it's as effective as laser at reducing hair density. But unlike laser, it's gentle. No heat. No damage. No side effects. All for a fraction of the cost."},
  // ---- B#59 (UGC — put the tweezers down) ----
  {ids:['B#59'],layer:'Hook',v:true,start:"Put the tweezers down. No more plucking your chin first thing in the morning."},
  {ids:['B#59'],layer:'Hook',v:true,start:"Drop the tweezers. You don't have to do this every morning anymore."},
  {ids:['B#59'],layer:'Hook',v:true,start:"Here's how I got rid of tweezers in two months."},
  {ids:['B#59'],layer:'Angle',v:false,start:"UGC — put the tweezers down (short testimonial)"},
  // ---- B#61 (Silent Bearer — the loneliness of facial hair) ----
  {ids:['B#61'],layer:'Hook',v:true,start:"How this woman got rid of her facial hair for good."},
  {ids:['B#61'],layer:'Angle',v:false,start:"Silent Bearer — the loneliness of facial hair (aesthetician)"},
  {ids:['B#61'],layer:'Problem',v:true,start:"They'd sit in the chair and tell me things they'd never told anyone. How they'd look in the mirror some mornings and think… who is this person?"},
  {ids:['B#61'],layer:'Unique mechanism',v:true,note:'smoke-alarm analogy',start:"It's like turning off the smoke alarm without putting out the fire."},
  // ---- B#63 (dermatologist — plucking trap / feeding it) ----
  {ids:['B#63'],layer:'Hook',v:true,start:"As a dermatologist, one of the hardest parts of my job is telling a patient something she should have been told years earlier."},
  {ids:['B#63'],layer:'Hook',v:true,start:"If you're over 40 and are constantly plucking your chin or upper lip hair, you're not managing the problem. You're feeding it."},
  {ids:['B#63'],layer:'Hook',v:true,start:"When you're over 40, plucking only gives you temporary relief, but every time you do it, you're making the problem slightly worse. Here's why."},
  {ids:['B#63'],layer:'Angle',v:false,start:"Dermatologist — the plucking trap (feeding the problem)"},
  {ids:['B#63'],layer:'Unique mechanism',v:true,note:'blood-flow → regrows stronger',start:"And every time you pull a hair from one of those hormonally active follicles, you increase blood flow to that follicle.",end:"every single time."},
  // ---- B#64 (20 mins each morning controls the day; Body Part 2 auto-covers) ----
  {ids:['B#64'],layer:'Hook',v:true,start:"Before I could even start my day, I was already spending 20 minutes hunting for facial hair."},
  {ids:['B#64'],layer:'Hook',v:true,start:"First 20 minutes of my day were spent dealing with facial hair… and somehow it was controlling my mood, confidence, and my entire day."},
  {ids:['B#64'],layer:'Angle',v:false,start:"20 minutes each morning controls the whole day"},
  {ids:['B#64'],layer:'Problem',v:true,start:"I'd get into a meeting and feel the light coming through the window, and suddenly I'm not listening anymore. I'm calculating. Is my facial hair exposed?"},
  // ---- B#65 (Zoom camera angles; Body Part 2 auto-covers) ----
  {ids:['B#65'],layer:'Hook',v:true,start:"I became weirdly obsessed with camera angles on Zoom because of the hairs on my chin."},
  {ids:['B#65'],layer:'Hook',v:true,start:"I didn't realize menopausal facial hair had taken over my brain until I caught myself doing this on Zoom."},
  {ids:['B#65'],layer:'Hook',v:true,start:"At some point, I started thinking more about hiding my facial hair than actually being in the photo."},
  {ids:['B#65'],layer:'Angle',v:false,start:"Obsessed with Zoom camera angles (hiding facial hair)"},
  {ids:['B#65'],layer:'Problem',v:true,start:"Every Zoom call, I set myself up the exact same way. Camera a little higher. Chin tilted just enough. Light directly in front of me, just never from the side."},
  // ---- B#66 (too light for laser — grey hair; Body auto-covers) ----
  {ids:['B#66'],layer:'Hook',v:true,start:"Nobody talks about what you're supposed to do when your facial hair is too light for laser."},
  {ids:['B#66'],layer:'Hook',v:true,start:"Laser won't work on my grey hair, so I was basically stuck plucking daily… until I finally found my way out."},
  {ids:['B#66'],layer:'Hook',v:true,start:"Here's what works for your grey facial hair when laser isn't an option."},
  {ids:['B#66'],layer:'Angle',v:false,start:"Too light for laser — grey-hair solution"},
  {ids:['B#66'],layer:'Problem',v:true,start:"But then my aesthetician told me laser wasn't even an option for me, because my hair wasn't dark enough.",end:"stuck removing facial hair forever."},
  // ---- B#67 (relationship cost; Body Part 2 auto-covers) ----
  {ids:['B#67'],layer:'Hook',v:true,start:"I thought I was just insecure. Then I realized I was organizing my entire relationship around hiding my facial hair."},
  {ids:['B#67'],layer:'Hook',v:true,start:"I genuinely thought this was just something women my age silently dealt with in relationships."},
  {ids:['B#67'],layer:'Hook',v:true,start:"I didn't realize facial hair had changed my relationship until I caught myself doing this."},
  {ids:['B#67'],layer:'Angle',v:false,start:"Relationship cost of facial hair"},
  {ids:['B#67'],layer:'Problem',v:true,start:"Turning my face slightly so he wouldn't notice the hair or stubble.",end:"I'd even flinch when he touched my face."},
  {ids:['B#67'],layer:'Desire',v:true,start:"I just wanted my own face to belong to me again,"},
  // ---- B#76 ("that old woman" fear; Body Part 2 auto-covers) ----
  {ids:['B#76'],layer:'Hook',v:true,start:"The thing that finally made me take my facial hair seriously wasn't what I saw in my bathroom mirror."},
  {ids:['B#76'],layer:'Hook',v:true,start:"I saw what my facial hair might look like in ten years and I couldn't stop thinking about it."},
  {ids:['B#76'],layer:'Hook',v:true,start:"I had a realization about my facial hair at my niece's wedding that scared the hell out of me."},
  {ids:['B#76'],layer:'Angle',v:false,start:"Fear of becoming 'that old woman with chin hair'"},
  {ids:['B#76'],layer:'Problem',v:true,start:"If my menopausal facial hair progressed this much in just the last four years, what will it look like when I'm 65? What about 70?"},
  // ---- B#77 (it's one enzyme — hormone-phobia; Body Part 2 auto-covers) ----
  {ids:['B#77'],layer:'Hook',v:true,start:"For years, I thought getting rid of menopausal facial hair meant messing with my hormones. Turns out I was wrong."},
  {ids:['B#77'],layer:'Hook',v:true,start:"If you're over 40 and suddenly dealing with chin hairs, don't make the same mistake I did."},
  {ids:['B#77'],layer:'Hook',v:true,start:"I knew my menopausal facial hair was hormonal. That's exactly why I refused to treat it."},
  {ids:['B#77'],layer:'Angle',v:false,start:"Hormone-phobia → it's just one enzyme (5-alpha reductase)"},
  {ids:['B#77'],layer:'Problem',v:true,note:'HRT/cancer fear',start:"I remember reading studies and hearing women talk about risks, side effects, and even concerns about cancer.",end:"No anti-androgen medications. Nothing."},
  {ids:['B#77'],layer:'Unique mechanism',v:true,note:'5-alpha reductase → DHT explanation',start:"She explained that there's an enzyme called 5-alpha reductase.",end:"to keep producing thicker facial hair."},
  {ids:['B#77'],layer:'Unique mechanism',v:true,note:'CR clinically proven to inhibit 5-alpha reductase',start:"It's made with Cyperus Rotundus, an ancient Egyptian botanical that's been clinically proven to inhibit 5-alpha reductase, reducing the production of DHT."},
  // ---- B#78 / B#78.1 (animation & claymation — identical body auto-covers both) ----
  {ids:['B#78'],layer:'Hook',v:true,start:"What menopause actually does to your facial hair and how to stop it."},
  {ids:['B#78'],layer:'Hook',v:true,start:"Nobody could explain why my facial hair kept coming back so quickly... until now."},
  {ids:['B#78'],layer:'Hook',v:true,start:"If you're constantly plucking your chin hairs, you need to hear this."},
  {ids:['B#78'],layer:'Angle',v:false,start:"Animation — why every method fails (DHT / 5-AR)"},
  {ids:['B#78.1'],layer:'Angle',v:false,start:"Claymation — why every method fails (twin of B#78)"},
  {ids:['B#78'],layer:'Unique mechanism',v:true,note:'5-AR → DHT seeks androgen-sensitive follicles',start:"When estrogen drops during perimenopause and menopause, testosterone goes completely unchecked, and there's this hidden enzyme called 5-alpha reductase",end:"the same way it does in men."},
  {ids:['B#78'],layer:'Unique mechanism',v:true,note:'water-based 2x more absorbable vs Amazon oils',start:"And unlike the cheap Cyperus oils on Amazon, which are essential oils that don't penetrate the follicle effectively, KelleSkin is a water-based serum that's 2x more absorbable",end:"the actives actually reach the follicle."},

  // ============================================================
  // BATCH 7 — Batch#79–99 (mostly avatar cuts; friend-reveal body auto-covers)
  // ============================================================
  // ---- AVATARS added this batch ----
  {ids:['B#79','B#81'],layer:'Avatar',v:false,note:'melanin-rich skin — laser/burn risk',start:"Black women (melanin-rich skin)"},
  {ids:['B#82.1','B#98'],layer:'Avatar',v:false,note:'whole-body use; B#82.1 targets ~30yo',start:"All body hair (underarms/legs/bikini) — younger women"},
  {ids:['B#86'],layer:'Avatar',v:false,start:"Finance executive / career woman (40s)"},
  {ids:['B#93'],layer:'Avatar',v:false,start:"Sandwiched-generation caregiver mom (47)"},
  {ids:['B#94'],layer:'Avatar',v:false,start:"Wellness / biohacker woman (51)"},
  {ids:['B#95'],layer:'Avatar',v:false,start:"Generational facial hair (family history)"},
  {ids:['B#96'],layer:'Avatar',v:false,start:"Indian-American women (threading culture)"},
  // ---- B#79 (Black women, shaving) ----
  {ids:['B#79'],layer:'Hook',v:true,start:"If you're constantly shaving your face and pretending it's not taking over your life, this is for you."},
  {ids:['B#79'],layer:'Hook',v:true,start:"Everybody warned me about hot flashes, but nobody warned me about these chin hairs going wild in my 40s."},
  {ids:['B#79'],layer:'Hook',v:true,start:"I'm losing my crown and growing a beard… girl, what is my body doing?"},
  {ids:['B#79'],layer:'Angle',v:false,start:"Black women — shaving / hyperpigmentation focus"},
  {ids:['B#79'],layer:'Problem',v:true,start:"I looked into laser, but after hearing about the burns, light patches, and skin damage it can leave on skin like mine, I wasn't doing that to my face."},
  // ---- B#80 (switched plucking for shaving) ----
  {ids:['B#80'],layer:'Hook',v:true,start:"I thought I was the only one who ditched plucking for shaving. Then I realized why more women aren't making the switch."},
  {ids:['B#80'],layer:'Hook',v:true,start:"Ditched plucking for shaving? Don't make the same mistake I did and end up with bumps, ingrowns, and dark spots."},
  {ids:['B#80'],layer:'Hook',v:true,start:"Plucking became too big of a chore, so I switched to shaving. But my skin hated me for it."},
  {ids:['B#80'],layer:'Angle',v:false,start:"Switched plucking → shaving (and regretted it)"},
  {ids:['B#80'],layer:'Unique mechanism',v:true,note:'shaving cuts at thickest part → blunt tip',start:"when you shave, the blade is cutting the hair right at its thickest part.",end:"it looks darker and more coarse."},
  // ---- B#81 (Black women — aesthetician, melanin/laser) ----
  {ids:['B#81'],layer:'Hook',v:true,start:"If your facial hair is going haywire after 40, this is the most important thing you'll hear today."},
  {ids:['B#81'],layer:'Hook',v:true,start:"As an aesthetician, I've seen too many women over 40 trapped in the same exhausting cycle with their facial hair. Here's what I started recommending that finally gets them out."},
  {ids:['B#81'],layer:'Angle',v:false,start:"Black women — aesthetician (laser targets melanin risk)"},
  {ids:['B#81'],layer:'Problem',v:true,start:"Laser works by going after melanin. Your hair's got melanin, but baby, so does your skin, so laser can leave you with skin burns, dark and light patches, and even scarring."},
  // ---- B#82 (solution-seeker static) ----
  {ids:['B#82'],layer:'Hook',v:true,start:"This single serum slows facial hair growth, blocks hormonal signal at the follicle, and heals the skin that years of plucking and shaving left damaged."},
  {ids:['B#82'],layer:'Hook',v:true,start:"If menopause has made facial hair your biggest insecurity, listen closely, because this serum targets the hormonal growth signal at the follicle to help you get rid of facial hair for good."},
  {ids:['B#82'],layer:'Angle',v:false,start:"Solution-seeker direct-response (one serum does it all)"},
  {ids:['B#82'],layer:'CTA',v:true,note:'attitude close',start:"If you're still trying to get rid of facial hair without this, I do not know what you"},
  // ---- B#82.1 (body-hair / all-hair expansion) ----
  {ids:['B#82.1'],layer:'Hook',v:true,start:"This single serum slows body hair growth, stops the signal that's telling your hair to grow back, and heals the skin that years of shaving, waxing, and IPL left damaged."},
  {ids:['B#82.1'],layer:'Hook',v:true,start:"I genuinely don't understand why people are still shaving every other day when this exists."},
  {ids:['B#82.1'],layer:'Angle',v:false,start:"Body-hair / all-hair expansion (underarms, legs, bikini)"},
  {ids:['B#82.1'],layer:'Unique mechanism',v:true,note:'whole-body use',start:"And yes, you can use it on your underarms, legs, arms, bikini line and even your face.",end:"anywhere unwanted hair shows up."},
  // ---- B#83 (musical animation) ----
  {ids:['B#83'],layer:'Hook',v:true,note:'song opener',start:"Since menopause, her face won't let her rest,"},
  {ids:['B#83'],layer:'Angle',v:false,start:"Musical animation (rhyming song)"},
  {ids:['B#83'],layer:'Unique mechanism',v:true,note:'DHT in verse',start:"Because estrogen dropping tells DHT to rise,",end:"growing thick and wide."},
  // ---- B#86 (finance executive avatar; DHT body auto-covers) ----
  {ids:['B#86'],layer:'Hook',v:true,start:"Your confidence at work has nothing to do with your competence and everything to do with the hair on your chin. Let me explain."},
  {ids:['B#86'],layer:'Hook',v:true,start:"I've negotiated seven-figure deals. But I still couldn't sit through a meeting without obsessing over the hair on my chin."},
  {ids:['B#86'],layer:'Hook',v:true,start:"Hard to own a room when half your mind is on whether your chin hair is exposed."},
  {ids:['B#86'],layer:'Angle',v:false,start:"Finance executive — confidence at work"},
  {ids:['B#86'],layer:'Problem',v:true,start:"And in an office, there's nowhere you can hide your facial hair. There are conference rooms, elevators, and bright lights that seem to highlight every single hair on your face."},
  {ids:['B#86'],layer:'Desire',v:true,start:"I'd walk into negotiations and realize halfway through that I'd been fully present the entire time. My whole brain was in the room."},
  // ---- B#87 (objection — will it thin brows/lashes?) ----
  {ids:['B#87'],layer:'Hook',v:true,start:"I've been using Cyperus Rotundus for a week, but I'm scared it's going to thin my lashes and brows."},
  {ids:['B#87'],layer:'Hook',v:true,start:"Have you noticed any thinning of your eyelashes or eyebrows since using Cyperus Rotundus?"},
  {ids:['B#87'],layer:'Hook',v:true,start:"I want to use Cyperus Rotundus for my chin hairs, but I'm worried it'll thin my eyelashes and eyebrows too."},
  {ids:['B#87'],layer:'Angle',v:false,start:"Objection handling — will it thin brows/lashes? (selective)"},
  {ids:['B#87'],layer:'Unique mechanism',v:true,note:'selective — only androgen-sensitive follicles',start:"Your eyelashes, eyebrows, and scalp hair are not androgen-sensitive. They follow completely different growth pathways.",end:"Cyperus Rotundus literally cannot affect them."},
  // ---- B#88 (cheap Amazon oil vs water-based) ----
  {ids:['B#88'],layer:'Hook',v:true,start:"If you're over 45 and about to buy a Cyperus Rotundus serum off Amazon for your chin hair, you need to watch this first."},
  {ids:['B#88'],layer:'Hook',v:true,start:"I'm about to reveal why 90% of cyperus rotundus serum out there are complete scams, and the one that actually works."},
  {ids:['B#88'],layer:'Angle',v:false,start:"Amazon oil scam vs water-based (90% are oil)"},
  {ids:['B#88'],layer:'Problem',v:true,start:"She told me that 90% of the Cyperus Rotundus serums out there have one big problem in common. They're all oil-based.",end:"it's doing nothing."},
  {ids:['B#88'],layer:'CTA',v:true,note:'16,000+ 5-star reviews proof',start:"Plus they've got over 16,000 5-star reviews, so I'd easily recommend this to any woman fighting daily battles with facial hair."},
  // ---- B#93 (sandwiched mom; body auto-covers) ----
  {ids:['B#93'],layer:'Hook',v:true,start:"I was so busy taking care of everyone else that I didn't realize I'd been growing a beard for two months."},
  {ids:['B#93'],layer:'Hook',v:true,start:"My teenager looked at my chin and asked if I was growing a beard. I couldn't look in the mirror the same way after that."},
  {ids:['B#93'],layer:'Hook',v:true,start:"Raising a teenager and looking after an aging parent is already a lot. The last thing I wanted to add to this list was managing chin hairs every single day."},
  {ids:['B#93'],layer:'Angle',v:false,start:"Sandwiched mom / caregiver (47)"},
  {ids:['B#93'],layer:'Problem',v:true,start:"So, I'm 47, I'm raising a teenager, and I'm taking care of my mom who has dementia…",end:"I completely stopped paying attention to myself."},
  // ---- B#94 (wellness woman; body auto-covers) ----
  {ids:['B#94'],layer:'Hook',v:true,start:"I've spent my forties dialing in my sleep, hormones, skin, and gut health. But the one thing my routine couldn't stop was the hair growing on my chin."},
  {ids:['B#94'],layer:'Hook',v:true,start:"I'm that wellness friend that everyone calls when they want to know which supplement to take. But there's one thing I can't help myself with. Menopausal facial hair."},
  {ids:['B#94'],layer:'Hook',v:true,start:"I beat every menopause symptom they warned me about, sleep, hot flashes, mood swings. But I still can't stop the hair from growing on my chin."},
  {ids:['B#94'],layer:'Angle',v:false,start:"Wellness woman — optimized everything except this"},
  {ids:['B#94'],layer:'Problem',v:true,start:"What made it worse was the shame of not being able to solve it for myself. If I can't fix this one thing with everything I know about wellness and hormones, what does that say about me?"},
  // ---- B#95 (generational; body auto-covers) ----
  {ids:['B#95'],layer:'Hook',v:true,start:"I watched my mother pluck her chin hairs for twenty two years. By 48, I was doing the exact same thing."},
  {ids:['B#95'],layer:'Hook',v:true,start:"The most discouraging part about finding chin hairs at 48 wasn't the hair itself. It was knowing exactly how the next twenty years were supposed to go."},
  {ids:['B#95'],layer:'Angle',v:false,start:"Generational — 'it's hereditary, nothing you can do'"},
  {ids:['B#95'],layer:'Problem',v:true,start:"For as long as I can remember, the women in my family have had facial hair after 45. My grandmother kept tweezers in her purse for the last 27 years of her life.",end:"only to settle for plucking the same hairs every three days forever."},
  // ---- B#96 (Indian-American, threading; body auto-covers) ----
  {ids:['B#96'],layer:'Hook',v:true,start:"If you're threading your chin and upper lip every two days and pretending it's not taking over your life, sit down. We need to talk."},
  {ids:['B#96'],layer:'Hook',v:true,start:"If you spend the entire family function worrying about whether anyone can see your chin hairs, this is for you."},
  {ids:['B#96'],layer:'Hook',v:true,start:"I went from threading my chin every single morning to not touching it in 5 weeks. And no, it wasn't another desi home remedy."},
  {ids:['B#96'],layer:'Angle',v:false,start:"Indian-American — threading culture"},
  {ids:['B#96'],layer:'Repeated messaging',v:true,note:'removal-vs-inhibition, threading variant',start:"Threading removes hair. Waxing removes hair. Shaving removes hair. But this actually stops the follicle from producing it."},
  // ---- B#97 (AI UGC — 'see this little bottle') ----
  {ids:['B#97'],layer:'Hook',v:true,start:"See this little bottle right here? Honestly... this thing has completely changed my mornings."},
  {ids:['B#97'],layer:'Hook',v:true,start:"See this little bottle right here? Yeah, this is the reason I haven't touched my tweezers in weeks."},
  {ids:['B#97'],layer:'Angle',v:false,start:"AI UGC — 'see this little bottle' testimonial"},
  {ids:['B#97'],layer:'Unique mechanism',v:true,start:"Cyperus Rotundus, an ancient Egyptian botanical women have used for centuries, doesn't remove the hair, it goes down targets DHT and weakens the follicle itself."},
  // ---- B#98 (AI UGC before/after — Cyperglow brand variant) ----
  {ids:['B#98'],layer:'Hook',v:true,start:"Here's how my chin and jawline went from this to this."},
  {ids:['B#98'],layer:'Hook',v:true,start:"I honestly thought I'd be plucking my chin forever... until I found this."},
  {ids:['B#98'],layer:'Hook',v:true,start:"My biggest menopause frustration wasn't the hot flashes. It was the chin hair."},
  {ids:['B#98'],layer:'Angle',v:false,note:'references alt brand name "Cypher Glow"',start:"AI UGC before/after (Cyperglow brand variant)"},
  // ---- B#99 (method progression: if you X → if you CR) ----
  {ids:['B#99'],layer:'Hook',v:true,start:"If you pluck, shave, or wax your facial hair, it'll usually come back again in two to three days."},
  {ids:['B#99'],layer:'Hook',v:true,start:"If you do laser for your facial hair, it still comes back over time without regular touchups."},
  {ids:['B#99'],layer:'Hook',v:true,start:"If you dermaplane your facial hair, it'll usually come back again in two to three days"},
  {ids:['B#99'],layer:'Angle',v:false,start:"Method progression (if you X → if you Cyperus Rotundus)"},
  {ids:['B#99'],layer:'Unique mechanism',v:true,start:"If you use Cyperus Rotundus extract, it helps block DHT, the hormone that's causing those hairs to grow in the first place.",end:"the hairs stop coming back completely."},

  // ============================================================
  // BATCH 8 — Batch#100–112 + oddballs (Untitled / VSL-Brightener / Makeupangle)
  // ============================================================
  // ---- AVATAR: the "AH" body-hair line ----
  {ids:['B#82.1','B#106','B#107','B#108','B#109','B#110','B#111','B#112'],layer:'Avatar',v:false,note:'Kelle "all-hair" body line — legs/underarms/bikini, IPL objection, buy-2-get-1',start:"Body-hair (AH) — younger women ~30"},
  // ---- B#100 (3 mistakes aesthetician v2) ----
  {ids:['B#100'],layer:'Hook',v:true,start:"Three mistakes I see women after 40 make with facial hair every single day."},
  {ids:['B#100'],layer:'Hook',v:true,start:"There are 3 reasons your facial hair keeps getting worse after 40... and almost nobody talks about them."},
  {ids:['B#100'],layer:'Hook',v:true,start:"Put the tweezers down. Three facial hair mistakes every woman over 40 needs to know."},
  {ids:['B#100'],layer:'Angle',v:false,start:"3 mistakes aesthetician (v2 — hair is the symptom)"},
  // ---- B#101 (AI animation — personified chin) ----
  {ids:['B#101'],layer:'Hook',v:true,start:"Please... just hear me out for 30 seconds."},
  {ids:['B#101'],layer:'Hook',v:true,start:"This isn't my fault... but I'm the one paying for it."},
  {ids:['B#101'],layer:'Angle',v:false,start:"Personified chin pleads with you (AI animation)"},
  {ids:['B#101'],layer:'Unique mechanism',v:true,note:'chin POV: DHT drives the hair',start:"But every time you remove the hair, you're only fixing what you can see. Deep inside my follicles, there is this DHT hormone that's telling those hairs to grow in the first place ever since you stepped into perimenopause and menopause."},
  // ---- B#102 (peach fuzz → whiskers progression) ----
  {ids:['B#102'],layer:'Hook',v:true,start:"Many women have always had a little peach fuzz. But once perimenopause starts, that peach fuzz can turn into thick whiskers, and even beard-like growth."},
  {ids:['B#102'],layer:'Hook',v:true,start:"Most women expect hot flashes during menopause. What they don't expect is suddenly growing coarse facial hair."},
  {ids:['B#102'],layer:'Hook',v:true,start:"If you've noticed random coarse hairs showing up on your chin or upper lip since perimenopause, you're not imagining it, and you're definitely not alone."},
  {ids:['B#102'],layer:'Angle',v:false,start:"Peach fuzz → whiskers progression"},
  {ids:['B#102'],layer:'Unique mechanism',v:true,note:'androgens don\'t decline at same rate → DHT louder',start:"When we go through perimenopause and menopause, estrogen levels drop, but our androgens, particularly testosterone and DHT, don't decline at the same rate.",end:"DHT is louder than it used to be."},
  // ---- B#103 (vs dermaplaning) ----
  {ids:['B#103'],layer:'Hook',v:true,start:"Okay so, can we talk about dermaplaning for a sec?"},
  {ids:['B#103'],layer:'Hook',v:true,start:"I was reading through this whole thread of women in their 40s and 50s talking about dermaplaning for facial hair. And look, here's what's seriously wrong with it."},
  {ids:['B#103'],layer:'Hook',v:true,start:"Before you buy another dermaplaner off Amazon — please just watch this real quick."},
  {ids:['B#103'],layer:'Angle',v:false,start:"VS dermaplaning (it's just fancy shaving)"},
  {ids:['B#103'],layer:'Problem',v:true,start:"Dermaplaning is basically just shaving your face with a fancier razor.",end:"starting the clock over."},
  // ---- B#104 (beauty-industry whistleblower) ----
  {ids:['B#104'],layer:'Hook',v:true,start:"So my boss pulled me aside last month and told me to stop telling clients the truth about facial hair after 40."},
  {ids:['B#104'],layer:'Hook',v:true,start:"There was one thing every aesthetician at our clinic knew we were never supposed to say out loud."},
  {ids:['B#104'],layer:'Hook',v:true,start:"The beauty industry makes a lot more money when you're stuck removing facial hair every few weeks."},
  {ids:['B#104'],layer:'Angle',v:false,start:"Beauty-industry whistleblower (boss told me to stop)"},
  {ids:['B#104'],layer:'Problem',v:true,start:"But booking someone every three weeks for years is more profitable than recommending something that actually addresses why it's happening."},
  // ---- B#105 (unaware — 'why tweezers in the car') ----
  {ids:['B#105'],layer:'Hook',v:true,start:"There's one beauty tool millions of women over 40 never planned on needing."},
  {ids:['B#105'],layer:'Hook',v:true,start:"The first sign of menopause for many women isn't what they expected."},
  {ids:['B#105'],layer:'Angle',v:false,start:"Unaware — 'why tweezers in the car?' (problem-aware entry)"},
  {ids:['B#105'],layer:'Problem',v:true,note:'stat: 1 in 2 women',start:"Almost 1 in 2 women after 40 deal with some degree of facial hair."},
  // ---- B#106 (AH — shaving scam UGC, body) ----
  {ids:['B#106'],layer:'Hook',v:true,start:"I genuinely think shaving is the biggest scam they ever sold women and i can prove it"},
  {ids:['B#106'],layer:'Hook',v:true,start:"if you've ever dry-shaved your legs in the car before a date… this one's for you"},
  {ids:['B#106'],layer:'Hook',v:true,start:"I just found out why Egyptian women didn't shave... and now I'm doing the exact same thing."},
  {ids:['B#106'],layer:'Angle',v:false,start:"Body hair — shaving scam UGC (legs/underarms/bikini)"},
  {ids:['B#106'],layer:'Unique mechanism',v:true,note:'androgens as growth signal (body)',start:"there are androgens underneath the skin acting as growth signals basically telling those hairs to keep growing back, and none of these methods do anything about that."},
  // ---- B#107 (AH — anti-recommendation) ----
  {ids:['B#107'],layer:'Hook',v:true,start:"Do NOT buy this serum from kelle skin."},
  {ids:['B#107'],layer:'Hook',v:true,start:"Do not get this serum if you like shaving. I am dead serious."},
  {ids:['B#107'],layer:'Hook',v:true,start:"Don't buy this if you're okay with your legs feeling prickly two days after shaving."},
  {ids:['B#107'],layer:'Angle',v:false,start:"Body hair — anti-recommendation ('don't buy this')"},
  // ---- B#108 (AH — this is what happens, 60-day) ----
  {ids:['B#108'],layer:'Hook',v:true,start:"This is what happens to your leg hair when you apply this serum every night for 60 days."},
  {ids:['B#108'],layer:'Hook',v:true,start:"This costs less than a single laser session and it works while you sleep."},
  {ids:['B#108'],layer:'Hook',v:true,start:"Do not buy this cyperus rotundus serum. Here's what happens when you use it every night for 60 days."},
  {ids:['B#108'],layer:'Angle',v:false,start:"Body hair — 60-day timeline demonstration"},
  {ids:['B#108'],layer:'Unique mechanism',v:true,note:'blocks 5-AR from first application (body)',start:"After your first application, the serum absorbs into your skin and immediately starts blocking the enzyme 5-alpha-reductase that signals your hair follicles to grow."},
  // ---- B#109 (AH — roommate discovery) ----
  {ids:['B#109'],layer:'Hook',v:true,start:"I asked my roommate why she never complains about hair removal anymore and her answer honestly kind of broke my brain."},
  {ids:['B#109'],layer:'Hook',v:true,start:"My roommate used to complain about leg stubble literally every day, until one day I realized her legs had stayed smooth for weeks."},
  {ids:['B#109'],layer:'Hook',v:true,start:"My roommate's legs were so smooth I thought she got laser — she didn't."},
  {ids:['B#109'],layer:'Angle',v:false,start:"Body hair — roommate discovery"},
  // ---- B#110 (AH — shaving trains hair, apply after shave) ----
  {ids:['B#110'],layer:'Hook',v:true,start:"Nobody told me that every time I shaved, I was literally training my hair to grow back thicker."},
  {ids:['B#110'],layer:'Hook',v:true,start:"If you're shaving every three days, you're probably stuck in this cycle without realizing it."},
  {ids:['B#110'],layer:'Angle',v:false,start:"Body hair — shaving trains hair to grow back"},
  {ids:['B#110'],layer:'Unique mechanism',v:true,note:'micro-injury → blood rush → faster growth',start:"The moment your razor runs across your skin, it's not just cutting hair. It's creating hundreds of tiny micro-injuries.",end:"making it grow hair even quicker."},
  // ---- B#111 (AH — enzyme mechanism explainer) ----
  {ids:['B#111'],layer:'Hook',v:true,start:"I spent 12 years shaving my legs before I realized I was never treating the reason the hair kept coming back."},
  {ids:['B#111'],layer:'Hook',v:true,start:"There's one enzyme that's helping your unwanted hair grow back, and almost every razor, wax and IPL device completely ignores it."},
  {ids:['B#111'],layer:'Hook',v:true,start:"The biggest mistake we've all made is thinking shaving is the best way to deal with unwanted body hair. It isn't. Here's why."},
  {ids:['B#111'],layer:'Angle',v:false,start:"Body hair — enzyme mechanism explainer (follicle miniaturization)"},
  {ids:['B#111'],layer:'Unique mechanism',v:true,note:'follicle miniaturization → dormancy',start:"So without 5α-reductase doing its thing, the follicle undergoes miniaturization, it shrinks, loses its ability to sustain a full growth cycle, and eventually enters dormancy."},
  // ---- B#112 (AH — price objection) ----
  {ids:['B#112'],layer:'Hook',v:true,start:"Cyperus Rotundus serums are ridiculously overpriced?"},
  {ids:['B#112'],layer:'Hook',v:true,start:"Someone just commented, There's no way I'd pay that for a hair reduction serum."},
  {ids:['B#112'],layer:'Hook',v:true,start:"I'd rather spend my money on waxing than a cyperus rotundus serum."},
  {ids:['B#112'],layer:'Angle',v:false,start:"Body hair — price objection (do the math vs waxing/laser)"},
  {ids:['B#112'],layer:'Problem',v:true,note:'cost-of-alternatives math',start:"The average woman spends like $80 to $120 on waxing every single month, Sometimes more. That's over a thousand dollars a year.",end:"like nothing happened."},
  // ---- Untitled document (aesthetician DHT — 15yr twin of B#42) ----
  {ids:['Untitled-doc'],layer:'Angle',v:false,start:"Aesthetician DHT (15-yr draft, twin of B#42)"},
  // ---- VSL-Brightener (post-purchase upsell) ----
  {ids:['VSL-Brightener'],layer:'Hook',v:true,note:'post-purchase confirmation open',start:"Congratulations. You just made one of the smartest decisions for your skin."},
  {ids:['VSL-Brightener'],layer:'Angle',v:false,start:"Post-purchase upsell VSL — Dark Spot Brightening Serum"},
  {ids:['VSL-Brightener'],layer:'Problem',v:true,note:'leftover dark spots after hair is gone',start:"But years of repeated plucking, shaving, and waxing leave behind a completely different problem—stubborn dark spots and uneven-looking skin."},
  {ids:['VSL-Brightener'],layer:'Unique mechanism',v:true,note:'Brightening serum: Tranexamic/Niacinamide/Alpha Arbutin/Centella',start:"Powered by high-performance ingredients like Tranexamic Acid, Niacinamide, Alpha Arbutin, and Centella Asiatica, this specialized serum helps visibly fade years of discoloration left behind."},
  {ids:['VSL-Brightener'],layer:'CTA',v:true,note:'upsell scarcity (<80 units) + one-time offer',start:"we've reserved less than 80 units of our Dark Spot Brightening Serum exclusively for women who ordered the Cyperus Rotundus Serum today."},
  {ids:['VSL-Brightener'],layer:'Desire',v:true,note:'Complete Facial Hair Transformation System',start:"Together, they form what we call the Complete Facial Hair Transformation System."},
  // ---- Makeupangle (makeup won't sit right — aesthetician cut, twin of B#32) ----
  {ids:['Makeupangle'],layer:'Hook',v:true,start:"This hair removal secret for women in their 50s is something my clients wanted me to keep private"},
  {ids:['Makeupangle'],layer:'Angle',v:false,start:"Makeup won't sit right (aesthetician cut, twin of B#32)"},
  {ids:['Makeupangle'],layer:'Desire',v:true,note:'imagine morning without the anxiety',start:"Imagine your morning routine without the anxiety.",end:"foundation that finally sits the way it's supposed to."},
];
