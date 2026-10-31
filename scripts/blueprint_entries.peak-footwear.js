'use strict';
/**
 * Per-brand blueprint config — Peak Footwear (brand_id 66).
 *
 * One brand, two GetHook pages:
 *   - main page   (page_id 217, 50 ads) → bare-number IDs 1..50
 *   - "Secondary" (page_id 218, 49 ads) → letter-tagged IDs 1(a)..49(a)
 * Page-aware IDs (cfg.pageLetters): ads are ranked WITHIN each page by
 * scrape/impressions order (= priority), and the page letter is stamped onto
 * the id so it reveals which page ran the ad and stays identical across the
 * per-page and combined builds. 9 titles repeat and some are editorial, so IDs
 * come from page rank, never titles.
 *
 * Build all three deliverables from this one config:
 *   node scripts/build_blueprint.js --brand "Peak Footwear"             # combined (99)
 *   node scripts/build_blueprint.js --brand "Peak Footwear" --page=main # main (50)
 *   node scripts/build_blueprint.js --brand "Peak Footwear" --page=a    # secondary (49)
 *
 * Products: Snug Boot (winter boot), Kazdava Master / Casper Flex / Frost Flows
 * (winter barefoot shoes), Lorax Pro (everyday walking / neuropathy).
 */
module.exports = {
  brandName: 'Peak Footwear',
  dupTitles: [],
  pageLetters: { 217: '', 218: 'a' }, // main → '', secondary → 'a'
  entries: [
    // ================================================================
    // LAYER 2 — ANGLE (ad-specific premise; CONTROLLED/SHARED labels that
    // repeat; merged by ~85% premise. coverage count = how many ads re-tested
    // that angle. Candidates I considered-and-dropped are kept as
    // 'Angle (candidate)' rows with the removal reason in `note`.
    // Angle = this ad's premise; the wide-toe-box/zero-drop/flexible "natural
    // movement" message is NOT here — it recurs across ~every ad = Unique mechanism.
    // ================================================================
    { ids: ['1', '28', '41', '42', '16(a)', '29(a)', '33(a)'], layer: 'Angle', v: false, start: 'Cute barefoot BOOTS you don’t have to give up when it gets cold (breathe/lined/waterproof/affordable UGC)' },
    { ids: ['2', '4', '7', '11', '19'], layer: 'Angle', v: false, start: 'Labor Day sale — "why discount your coziest boot before fall?" natural-movement rundown (objection-to-discount skit)' },
    { ids: ['3', '31'], layer: 'Angle', v: false, start: 'Barefoot shoes can really help with neuropathy (calm clinician voice)' },
    { ids: ['5', '30', '39', '49', '12(a)'], layer: 'Angle', v: false, start: 'Walking on wet leaves / snow / ice makes you nervous → Snug built different (up to 50% off)' },
    { ids: ['6', '15', '15(a)'], layer: 'Angle', v: false, start: 'Skeptic — didn’t think a shoe this minimal/simple could fix tired, heavy feet after long days' },
    { ids: ['8', '21', '25', '33', '7(a)'], layer: 'Angle', v: false, start: 'Warehouse is overloaded / management freaking out → crazy BOGO (employee-insider POV)' },
    { ids: ['9', '13', '9(a)'], layer: 'Angle', v: false, start: 'Testimonial: traditional shoes made walking harder → Lorax, finally felt aligned / natural stride' },
    { ids: ['10'], layer: 'Angle', v: false, start: '12 hours on your feet shouldn’t feel like a full-body workout — traditional sneakers wreck your posture/back' },
    { ids: ['18'], layer: 'Angle', v: false, start: '14-day one-pair barefoot challenge — "I didn’t fix my feet, I changed my shoes"' },
    { ids: ['16', '40', '48'], layer: 'Angle', v: false, start: 'Gift for mom — bought for fall, now she wears them every single day' },
    { ids: ['17', '29', '38'], layer: 'Angle', v: false, start: 'Humor: my cramped toes were "flying economy" → now they have room / first class (Kazdava)' },
    { ids: ['20'], layer: 'Angle', v: false, start: 'Sensitive feet / older adults — most winter boots squeeze where it hurts (measured, caveated "listen to your feet")' },
    { ids: ['22', '32', '46', '5(a)'], layer: 'Angle', v: false, start: 'Founder confession — we overproduced this batch of Snug → that’s why you get BOGO / a low price' },
    { ids: ['23'], layer: 'Angle', v: false, start: '3 products that FAILED for plantar fasciitis/neuropathy balance → what actually works is Lorax (fail-vs-fix)' },
    { ids: ['24', '36'], layer: 'Angle', v: false, start: 'Good orthopedic winter boots don’t have to cost $200 — mine were $80 (value skit)' },
    { ids: ['14', '45'], layer: 'Angle', v: false, start: 'European tour-guide who’s led ladies through winter mountains 15 yrs rates every boot 1–5 → Snug wins on steadiness/grip' },
    { ids: ['26'], layer: 'Angle', v: false, start: '"Everyone told you to buy MORE supportive boots — that advice is why you feel less steady" (shoe-guide, over-50)' },
    { ids: ['43'], layer: 'Angle', v: false, start: 'Mexican-canyon elder — losing your footing isn’t aging; 4 free foot exercises + the 4 shoes sabotaging you → Snug' },
    { ids: ['44'], layer: 'Angle', v: false, start: 'There’s a reason some keep walking confidently into their 70s/80s — your feet were designed to move (over-50 longevity)' },
    { ids: ['37', '47', '50'], layer: 'Angle', v: false, start: 'Wisconsin girl done with heavy winter boots — ridiculously lightweight/flexible Snug (UGC)' },
    { ids: ['35'], layer: 'Angle', v: false, start: 'One rule for cold-weather boots: if it can’t bend like THIS, I don’t want it (flexibility demo)' },
    { ids: ['27', '46(a)'], layer: 'Angle', v: false, start: 'Hate bulky/uncomfortable winter shoes → Casper Flex barefoot alternative (product showcase UGC)' },
    { ids: ['34'], layer: 'Angle', v: false, start: 'Busy parent — foot pain meant I had to say no to racing my daughter → Lorax gave my energy/identity back' },
    { ids: ['1(a)'], layer: 'Angle', v: false, start: 'Didn’t expect shoes to be my favorite Mother’s Day gift — support without looking/feeling orthopedic (Lorax)' },
    { ids: ['2(a)'], layer: 'Angle', v: false, start: 'Marta, 55 — staying active is the secret to feeling young; every winter boot slowed me down except this one (Kazdava)' },
    { ids: ['3(a)'], layer: 'Angle', v: false, start: 'Looks too simple to possibly work — why a barefoot shoe beats bulky "support" (Lorax explainer, B2G1)' },
    { ids: ['4(a)', '10(a)', '11(a)'], layer: 'Angle', v: false, start: 'Wake up with heel pain / plantar fasciitis → barefoot targets the root cause, not a band-aid (BOGO)' },
    { ids: ['6(a)'], layer: 'Angle', v: false, start: 'Guess how much I paid — you don’t have to spend a fortune for pain-free comfort (BOGO value reveal, Lorax)' },
    { ids: ['8(a)'], layer: 'Angle', v: false, start: 'Lorax function-first for the everyday problems that wear you down (swollen feet, cramped toes, knee/hip/back, B2G1)' },
    { ids: ['13(a)', '44(a)'], layer: 'Angle', v: false, start: 'Cute winter boots that fit my WIDE feet and keep clumsy me steady (style-led UGC)' },
    { ids: ['14(a)'], layer: 'Angle', v: false, start: 'The only winter boot you need — feels like a slipper, non-slip, and actually adorable (UGC)' },
    { ids: ['17(a)'], layer: 'Angle', v: false, start: 'Podiatrist: thick cushioned shoes (Skechers/Crocs) are turning off your balance → Lorax (worst/best shoes, fall fear)' },
    { ids: ['18(a)'], layer: 'Angle', v: false, start: 'Trying to lose weight by walking 10k steps — the wrong shoe held me back; barefoot made it possible (Brooke, 40)' },
    { ids: ['19(a)'], layer: 'Angle', v: false, start: 'Neuropathy isn’t only a nerve problem — your shoes keep adding pressure; remove it (Lorax VSL)' },
    { ids: ['20(a)'], layer: 'Angle', v: false, start: 'Columbus Day BOGO — cutest, most functional non-slip boot (UGC, offer-led)' },
    { ids: ['21(a)'], layer: 'Angle', v: false, start: 'A winter barefoot shoe with the sole of a TIRE — Frost Flows grip/weight showcase (500k sold)' },
    { ids: ['22(a)'], layer: 'Angle', v: false, start: 'Plantar fasciitis mom — smarter support you can wear all day (school pickup / Target run, UGC)' },
    { ids: ['24(a)'], layer: 'Angle', v: false, start: '8 of 10 people in my walking group switched — pain/neuropathy/PF gone (social proof, 187g/10.7cm specs)' },
    { ids: ['25(a)'], layer: 'Angle', v: false, start: 'Why do I feel unstable when I walk? Neuropathy → couldn’t feel the ground → Lorax, no more fear of falling (testimonial)' },
    { ids: ['26(a)'], layer: 'Angle', v: false, start: 'That daily ache isn’t aging — your narrowing shoe is COMPRESSING your foot nerves → foot-shaped Lorax (anatomy explainer)' },
    { ids: ['27(a)'], layer: 'Angle', v: false, start: '30-day transformation diary — week-by-week what changes when her feet get room (Lorax)' },
    { ids: ['28(a)'], layer: 'Angle', v: false, start: 'I slipped on ice and got a severe concussion — now I only buy non-slip barefoot boots (homestead UGC)' },
    { ids: ['30(a)'], layer: 'Angle', v: false, start: 'Humor: my daughter wants these returned because I’m "too hard to keep up with" now (reverse testimonial, 187g)' },
    { ids: ['31(a)', '35(a)'], layer: 'Angle', v: false, start: 'Every step feels more cautious → Lorax for independence / better balance from more toe space (explainer, BOGO)' },
    { ids: ['34(a)', '39(a)', '40(a)'], layer: 'Angle', v: false, start: 'Homesteader "letting everybody know" — non-slip waterproof snug boots + sizing tip (unisex, UGC)' },
    { ids: ['38(a)'], layer: 'Angle', v: false, start: 'Why these are the safest winter boots for active seniors — my daughter bought me these, steady on ice (grip)' },
    { ids: ['41(a)'], layer: 'Angle', v: false, start: 'Trauma nurse of 24 yrs — the #1 thing we see every winter is elderly ground-level falls → Peak Snug grip (gift for elderly parent)' },
    { ids: ['42(a)'], layer: 'Angle', v: false, start: 'Your feet didn’t get weaker with age — your shoes did the weakening; Lorax is the middle-ground to wake them up (reframe)' },
    { ids: ['43(a)'], layer: 'Angle', v: false, start: 'Found these at 58 — my feet haven’t felt this good since 40 (age-reversal testimonial, 187g)' },
    { ids: ['48(a)'], layer: 'Angle', v: false, start: 'I made my grandpa switch his everyday shoes for 4 weeks — it’s not age, it’s what you wear (experiment)' },
    { ids: ['49(a)'], layer: 'Angle', v: false, start: 'The shoes your foot wishes you’d wear — extra-wide toe box + winter grip + slipper feel (showcase)' },
    // ---- Angle CANDIDATES (considered, then dropped — reason kept for audit) ----
    { ids: ['1', '2', '5', '9', '26', '42(a)'], layer: 'Angle (candidate)', v: false, start: 'Wide toe box + zero-drop + thin flexible sole = natural movement', note: 'REJECTED as an angle — this is the brand UNIQUE MECHANISM (it recurs across nearly every ad), not any single ad’s premise. Teaching example of the Angle(ad-specific) vs UM(brand-wide) test.' },
    { ids: ['39'], layer: 'Angle (candidate)', v: false, start: 'Over-50 "watching every single step" winter fall-fear', note: 'Merged into the wet/ice slip-anxiety angle (5/30/39/49/12(a)) — 39 is the same up-to-50%-off script with an over-50 opener. The standalone over-50 balance premise is already its own angle in 26/44.' },
    { ids: ['34'], layer: 'Angle (candidate)', v: false, start: 'On-your-feet-all-day worker (overlaps ad 10)', note: 'Dropped as primary for 34 — its real premise is parent identity (couldn’t race my daughter), not generic on-feet work. Overlaps the ad-10 worker angle.' },
    { ids: ['11(a)'], layer: 'Angle (candidate)', v: false, start: 'Doctors couldn’t fix my plantar fasciitis but these did (authority-failure hook)', note: 'Merged into the plantar-fasciitis root-cause angle (4(a)/10(a)/11(a)) — same body + offer; the "doctors failed" hook is a distinct opener but not a distinct angle.' },
    { ids: ['25(a)'], layer: 'Angle (candidate)', v: false, start: 'Lorax natural-stride testimonial (overlaps 9/13/9(a))', note: 'Kept 25(a) as its own neuropathy-instability testimonial — the neuropathy framing is distinct from the generic "felt aligned" testimonial, though they overlap.' },
    { ids: ['26', '26(a)', '42(a)'], layer: 'Angle (candidate)', v: false, start: 'Blame your shoes, not your age (single merged "reframe" angle)', note: 'NOT merged — 26 (supportive-boots rating), 26(a) (nerve compression) and 42(a) (shoes weakened your feet) share a reframe theme but are distinct ad-specific executions, so each stays its own angle.' },
    // ---- Junk / failed-transcript ads (no usable copy → exempt from real Hook/Angle; logged for completeness) ----
    { ids: ['12'], layer: 'Angle (junk)', v: false, start: 'No usable transcript — "No transcript available / no spoken words" (static or music ad)', note: 'Failed transcript; cannot extract a real hook/angle. Logged so every ad is accounted for.' },
    { ids: ['23(a)'], layer: 'Angle (junk)', v: false, start: 'No usable transcript — single word "You" captured', note: 'Failed transcript; no real hook/angle.' },
    { ids: ['32(a)'], layer: 'Angle (junk)', v: false, start: 'No usable transcript — "No transcript available / no spoken words"', note: 'Failed transcript; no real hook/angle.' },
    { ids: ['36(a)'], layer: 'Angle (junk)', v: false, start: 'No usable transcript — only "No, please! No!" captured', note: 'Failed transcript; no real hook/angle.' },
    { ids: ['37(a)'], layer: 'Angle (junk)', v: false, start: 'No usable transcript — song lyrics only ("pretty girls walk like this")', note: 'Music ad, no VO; no real hook/angle.' },
    { ids: ['45(a)'], layer: 'Angle (junk)', v: false, start: 'No usable transcript — "Thanks for watching!" only', note: 'Failed transcript; no real hook/angle.' },
    { ids: ['47(a)'], layer: 'Angle (junk)', v: false, start: 'No usable transcript — garbled captions', note: 'Failed transcript; no real hook/angle.' },

    // ================================================================
    // LAYER 1 — HOOK (opening lines, verbatim, auto-coverage)
    // ================================================================
    { layer: 'Hook', v: true, start: 'If you love barefoot shoes but hate giving them up when it gets cold, you need to see these.' },
    { layer: 'Hook', v: true, start: 'Can you please put the snug boots on sale before fall?' },
    { layer: 'Hook', v: true, start: 'I want the snug boots so bad, but I’ve been waiting for a Labor Day sale.' },
    { layer: 'Hook', v: true, start: 'Barefoot shoes can really help with neuropathy.' },
    { layer: 'Hook', v: true, start: 'Stop. If walking on wet leaves, snow, or ice makes you nervous, you need to see these boots.' },
    { layer: 'Hook', v: true, start: 'I never thought a shoe this minimal could change the way I walk.' },
    { layer: 'Hook', v: true, start: 'Can you make Kazdava Master cheaper for Labor Day?' },
    { layer: 'Hook', v: true, start: 'If you’ve been waiting to try snug boots, you need to see what’s happening in our warehouse.' },
    { layer: 'Hook', v: true, start: 'Most shoes don’t support natural movement.' },
    { layer: 'Hook', v: true, start: '12 hours on your feet shouldn’t feel like a full-body workout.' },
    { layer: 'Hook', v: true, start: 'If Lorax Pro has been sitting in your cart, this is probably the sign you were waiting for.' },
    { layer: 'Hook', v: true, start: 'Discomfort, uneven steps.' },
    { layer: 'Hook', v: true, start: 'The thicker the winter boot, the less steady you actually are.' },
    { layer: 'Hook', v: true, start: 'I didn’t expect something this simple to feel this good.' },
    { layer: 'Hook', v: true, start: 'I bought these for my mom for fall, and now they’re basically the only shoes she wears.' },
    { layer: 'Hook', v: true, start: 'Apparently, my toes didn’t need more support.' },
    { layer: 'Hook', v: true, start: 'I didn’t fix my feet, I changed my shoes.' },
    { layer: 'Hook', v: true, start: 'Most winter boots squeeze the exact areas sensitive feet need to protect.' },
    { layer: 'Hook', v: true, start: 'I’m not supposed to show you this, but our warehouse is completely overloaded with snug boots.' },
    { layer: 'Hook', v: true, start: 'As the founder of Peak Footwear, I need to be completely honest with you.' },
    { layer: 'Hook', v: true, start: 'Three products that failed for plantar fasciitis.' },
    { layer: 'Hook', v: true, start: 'Comfortable winter boots don’t have to cost a fortune.' },
    { layer: 'Hook', v: true, start: 'Okay, I’m on my break and management just approved a crazy deal on snug boots' },
    { layer: 'Hook', v: true, start: 'Everyone told you to buy more supportive boots.' },
    { layer: 'Hook', v: true, start: 'If you hate bulky winter shoes you need to see this.' },
    { layer: 'Hook', v: true, start: 'Wait, why did nobody tell me barefoot boots could actually look this cute?' },
    { layer: 'Hook', v: true, start: 'My old boots gave my toes economy seats.' },
    { layer: 'Hook', v: true, start: 'Your winter boots might be making you feel less stable and almost nobody talks about why.' },
    { layer: 'Hook', v: true, start: 'Most people with neuropathy look for more cushion,' },
    { layer: 'Hook', v: true, start: 'See all these snug boots behind me?' },
    { layer: 'Hook', v: true, start: 'I work at the Peak Footwear Warehouse and the snug boot situation is getting out of control.' },
    { layer: 'Hook', v: true, start: 'This is how I survived 12 hour work days without foot pain.' },
    { layer: 'Hook', v: true, start: 'I have one rule for cold weather boots.' },
    { layer: 'Hook', v: true, start: 'You don’t need to spend $200 on comfortable winter boots.' },
    { layer: 'Hook', v: true, start: 'Whoever decided winter boots need to be heavy, stiff, and bulky clearly never had to walk around in them all day.' },
    { layer: 'Hook', v: true, start: 'I didn’t realize my toes were claustrophobic until I tried these.' },
    { layer: 'Hook', v: true, start: 'If you’re over 50 and you’ve started watching every single step you take outside,' },
    { layer: 'Hook', v: true, start: 'The second those chilly fall mornings started, my mom basically started living in these boots.' },
    { layer: 'Hook', v: true, start: 'These look like regular cute boots, but your toes can actually move inside them.' },
    { layer: 'Hook', v: true, start: 'If you hate winter boots because they absolutely destroy your toes, look at these.' },
    { layer: 'Hook', v: true, start: 'You have been told that losing your footing is just part of getting older,' },
    { layer: 'Hook', v: true, start: 'There’s a reason some people keep walking confidently into their 70s and 80s,' },
    { layer: 'Hook', v: true, start: 'Here is what nobody tells you about those soft, cushioned winter boots.' },
    { layer: 'Hook', v: true, start: 'We made one pretty big mistake with our best-selling snug boots this season,' },
    { layer: 'Hook', v: true, start: 'I’ve lived through enough Wisconsin winters to know one thing, boots do not need to weigh' },
    { layer: 'Hook', v: true, start: 'Finding a gift my mom will actually use is almost impossible.' },
    { layer: 'Hook', v: true, start: 'If you have to stare at the ground every time the sidewalk gets wet or icy,' },
    { layer: 'Hook', v: true, start: 'I think I just found the winter boots for people who absolutely hate wearing winter boots.' },
    // secondary-only hooks
    { layer: 'Hook', v: true, start: 'I didn’t expect shoes to be my favorite Mother’s Day gift, but the moment I put them on I felt' },
    { layer: 'Hook', v: true, start: 'Every winter boot slowed me down, except this one.' },
    { layer: 'Hook', v: true, start: 'If it doesn’t look complex, people assume it can’t possibly feel better than traditional' },
    { layer: 'Hook', v: true, start: 'Wake up with heel pain? You need to see this.' },
    { layer: 'Hook', v: true, start: 'As the founder of Peak Footwear, I want to be straight with you.' },
    { layer: 'Hook', v: true, start: 'Your guess is wrong. These didn’t cost what you think.' },
    { layer: 'Hook', v: true, start: 'I’m in the warehouse,' },
    { layer: 'Hook', v: true, start: 'This may be one of the most generous chances we have had to put Lorax Pro on more feet for less.' },
    { layer: 'Hook', v: true, start: 'I thought struggling with balance was just part of aging, until I changed my shoes.' },
    { layer: 'Hook', v: true, start: 'Doctors couldn’t fix my plantar fasciitis but these shoes did.' },
    { layer: 'Hook', v: true, start: 'I finally found cute winter boots that fit my wide feet and help me stay steady.' },
    { layer: 'Hook', v: true, start: 'These might be the only pair of boots that you’re going to need for the rest of this winter.' },
    { layer: 'Hook', v: true, start: 'When I first saw these shoes, I thought there was no way something this simple could actually' },
    { layer: 'Hook', v: true, start: 'If you’re a fan of barefoot shoes, you have to see these.' },
    { layer: 'Hook', v: true, start: 'Most people don’t realize this, but thick, cushioned shoes are slowly turning off your' },
    { layer: 'Hook', v: true, start: 'Walking helped me drop the weight.' },
    { layer: 'Hook', v: true, start: 'You’ve been told neuropathy is only a nerve problem,' },
    { layer: 'Hook', v: true, start: 'Seriously, these boots by Peak Footwear' },
    { layer: 'Hook', v: true, start: 'A winter barefoot shoe with the sole of a tire?' },
    { layer: 'Hook', v: true, start: 'Do you have plantar fasciitis like I do?' },
    { layer: 'Hook', v: true, start: '8 out of 10 people in my walking group have switched to these barefoot shoes.' },
    { layer: 'Hook', v: true, start: 'Why do I feel unstable when I walk?' },
    { layer: 'Hook', v: true, start: 'Something inside your shoe is compressing your foot nerves every single day.' },
    { layer: 'Hook', v: true, start: '30 days ago, her feet felt stiff, tired, and trapped.' },
    { layer: 'Hook', v: true, start: 'Friends, I went and picked up these barefoot boots.' },
    { layer: 'Hook', v: true, start: 'These are Peak Footwear Barefoot Boots and tell me these don’t look cute like normal boots.' },
    { layer: 'Hook', v: true, start: 'My daughter is literally forcing me to return these barefoot shoes.' },
    { layer: 'Hook', v: true, start: 'If every step has started feeling more cautious, this is worth paying attention to.' },
    { layer: 'Hook', v: true, start: 'Don’t worry girl, fall is around the corner and I found the perfect boots for you.' },
    { layer: 'Hook', v: true, start: 'a non-slip boot that I have been waiting for.' },
    { layer: 'Hook', v: true, start: 'Better balance often starts with giving your toes more space.' },
    { layer: 'Hook', v: true, start: 'Why are these the safest winter boots' },
    { layer: 'Hook', v: true, start: 'Hey, I heard these are on sale winter here up north.' },
    { layer: 'Hook', v: true, start: 'No more slipping for me.' },
    { layer: 'Hook', v: true, start: 'As a nurse of 24 years and now specializing in trauma,' },
    { layer: 'Hook', v: true, start: 'A lot of people think their feet got weaker with age, when in reality their shoes did' },
    { layer: 'Hook', v: true, start: 'Found these barefoot shoes at 58. My feet haven’t felt this good since 40.' },
    { layer: 'Hook', v: true, start: 'There’s so many winter shoes so uncomfortable.' },
    { layer: 'Hook', v: true, start: 'I asked my grandpa to switch his everyday shoes and see what happens.' },
    { layer: 'Hook', v: true, start: 'While most shoes are cramped, Peak Footwear is nice and wide.' },

    // ================================================================
    // LAYER 3 — UNIQUE MECHANISM (brand-wide CAUSAL "why it works" reasoning,
    // full verbatim). Each must explain WHY/HOW (cause → effect), not just name
    // features. Pure feature/spec lists (wide toe box + fur lining + waterproof +
    // grip), the Frostgrip grip claim, the bare 187g/10.7cm specs, and
    // "developed with orthopedists" were REMOVED from this layer — they are
    // features / proof / authority, not a mechanism. (They still live in the ad
    // bodies, Repeated messaging, and Avatar-trust rows.)
    // --- Solution-side mechanism: the barefoot biomechanics chain ---
    { layer: 'Unique mechanism', v: true, start: 'First, look at this toe box.', end: 'fighting against a rigid boot.', note: 'Snug "designed differently": toe box → toes spread; flexible sole → foot bends/moves instead of fighting a rigid boot' },
    { layer: 'Unique mechanism', v: true, start: 'The wide toe box gives the toes room to spread out and grip a bigger base under you,', end: 'the body keeps you steady', note: 'Tour-guide full chain: wide toe box → grip a bigger base; flat heel-to-toe → body lined up, back ok; sole bends → feel the ground → body keeps you steady' },
    { layer: 'Unique mechanism', v: true, start: 'a four-millimeter flexible sole,', end: 'fire with every single step.', note: '4mm sole thin enough to feel the ground → balance muscles wake up and fire' },
    { layer: 'Unique mechanism', v: true, start: 'And the sole is thin and flexible.', end: 'Western doctors call that proprioception.', note: 'Thin flexible sole → feel the ground again → steadying muscles wake up = proprioception' },
    { layer: 'Unique mechanism', v: true, start: 'The sole is completely flat from heel to toe.', end: 'your steps feel controlled, not forced.', note: 'Podiatrist chain: flat sole → weight even; wide toe box → toes act like anchors; thin flexible → feel & adapt to the ground' },
    { layer: 'Unique mechanism', v: true, start: 'The Lorax Pro is shaped like a foot.', end: 'fighting through foam to find it.', note: 'Shaped like a foot (wide/zero-drop/4mm) → feet feel the ground instead of fighting through foam' },
    { layer: 'Unique mechanism', v: true, start: 'no rigid arch, your feet engage.', note: 'No rigid arch support → feet engage = a gentle workout (intentional)' },
    { layer: 'Unique mechanism', v: true, start: 'Think of them as a gentle workout for your foot muscles,', note: 'Barefoot shoe reframed as a gentle daily workout for the foot muscles' },
    { layer: 'Unique mechanism', v: true, start: 'wearing barefoot style shoes can increase foot muscle strength by over 50% in just eight weeks.', note: '+50% foot-muscle strength in 8 weeks (research-backed mechanism claim)' },
    { layer: 'Unique mechanism', v: true, start: 'These are 187 grams, almost nothing on your foot.', end: 'less pressure on hurting nerves and joints.', note: 'Light weight (187g) → less pressure on hurting nerves and joints (spec used causally)' },
    // --- Problem-side mechanism: why "support"/cushion is the cause ---
    { layer: 'Unique mechanism', v: true, start: 'That thick, squishy foam blocks the signals your feet send to your brain,', end: 'stop doing their job.', note: 'Reframe: thick foam blocks foot→brain signals → stabilizing muscles stop doing their job (podiatrist)' },
    { layer: 'Unique mechanism', v: true, start: 'Your feet are supposed to sense the ground, adjust your posture,', end: 'feel balanced and in control.', note: 'Reframe: when shoes do all the work your feet stop doing theirs → toes stop spreading, stabilizers stop engaging' },
    { layer: 'Unique mechanism', v: true, start: 'And every hour you spend in a shoe that narrows where your foot widens,', end: 'That’s compression.', note: 'Anatomy reframe: narrow shoe vs wide foot → compresses nerves/blood flow/joints daily → "that’s not aging, that’s compression"' },
    { layer: 'Unique mechanism', v: true, start: 'When your feet are already sensitive, the last thing they need is more pressure.', end: 'already irritated.', note: 'Neuropathy reframe: traditional shoes squeeze/trap/stiffen → every step adds pressure to already-irritated feet' },

    // ================================================================
    // LAYER 4 — CTA / OFFER / RISK-REVERSAL (full verbatim closes)
    // ================================================================
    { layer: 'CTA', v: true, start: 'You simply get your second pair free.', end: 'give one to someone you love.', note: 'Founder BOGO close' },
    { layer: 'CTA', v: true, start: 'Right now, when you order one pair of snug boots, you get a second pair completely free.', note: 'Warehouse BOGO offer' },
    { layer: 'CTA', v: true, start: 'Right now, the buy one, get one free deal is live.', end: 'feel the difference of natural comfort.', note: 'Lorax Pro BOGO close' },
    { layer: 'CTA', v: true, start: 'Buy one, get one free.', note: 'Bare BOGO line (clinician ads)' },
    { layer: 'CTA', v: true, start: 'Right now, Lorax Pro is buy two, get one free.', note: 'B2G1 offer' },
    { layer: 'CTA', v: true, start: 'Buy two, get one free.', note: 'B2G1 bare line' },
    { layer: 'CTA', v: true, start: '30 days to send them back.', note: '30-day returns (clinician)' },
    { layer: 'CTA', v: true, start: '30 days to try them. And if your feet do not thank you, send them back.', note: 'Tour-guide 30-day guarantee' },
    { layer: 'CTA', v: true, start: 'Free shipping and a 30 day money back guarantee.', end: 'send them back for every cent.', note: 'Canyon-elder guarantee' },
    { layer: 'CTA', v: true, start: '30 days.', end: 'the choice is yours.', note: 'Anti-compression 30-day / love-it-or-pay close' },
    { layer: 'CTA', v: true, start: 'selected snug boots are available at up to 50% off,', note: 'Up to 50% off (scarcity)' },
    { layer: 'CTA', v: true, start: 'the Snug is 53% off in our big sale.', note: '53% off (over-50 ad)' },
    { layer: 'CTA', v: true, start: 'Check below to see if your size and color are still available,', note: 'Check size/color availability' },
    { layer: 'CTA', v: true, start: 'Click below, choose your size and favorite color,', note: 'Click/choose size+color close (sale skits)' },

    // ================================================================
    // LAYER 6 — PROBLEM (ICP roadblocks, verbatim)
    // ================================================================
    { layer: 'Problem', v: true, start: 'Most traditional winter boots are heavy, stiff, and narrow.', end: 'two bricks strapped to your feet.', note: 'Heavy/stiff/narrow → bricks' },
    { layer: 'Problem', v: true, start: 'And they don’t feel like I strapped two bricks to my feet.', note: 'Bricks-on-feet (Kazdava humor)' },
    { layer: 'Problem', v: true, start: 'without feeling like you have bricks strapped to your feet.', note: 'Bricks-on-feet (Wisconsin)' },
    { layer: 'Problem', v: true, start: 'If your winter shoes feel more like foot prisons,', note: 'Foot prisons' },
    { layer: 'Problem', v: true, start: 'My toes have been flying economy this whole time.', note: 'Toes flying economy' },
    { layer: 'Problem', v: true, start: 'Narrow toe boxes that squeeze your toes.', end: 'bulky designs you can’t wait to take off.', note: 'Founder: the 4 traditional-boot problems' },
    { layer: 'Problem', v: true, start: 'Your toes get squeezed together, your feet barely flex,', note: 'Toes squeezed, feet barely flex' },
    { layer: 'Problem', v: true, start: 'They tell me they feel less sure on their feet', end: 'They have started holding the rail.', note: 'Less sure on feet / holding the rail' },
    { layer: 'Problem', v: true, start: 'For months, I struggled with plantar fasciitis,', note: 'Plantar fasciitis struggle' },
    { layer: 'Problem', v: true, start: 'Wake up with heel pain?', note: 'Wake up with heel pain' },
    { layer: 'Problem', v: true, start: 'The tingling keeps going.', end: 'feel strange,', note: 'Neuropathy tingling/numbness' },
    { layer: 'Problem', v: true, start: 'by evening my feet feel tired and my legs feel heavy.', note: 'Feet tired / legs heavy by evening' },
    { layer: 'Problem', v: true, start: 'my knees were aching, my heels were burning,', note: 'Knees aching, heels burning (parent)' },
    { layer: 'Problem', v: true, start: 'That foam is so thick, your foot cannot feel the ground at all.', note: 'Thick foam blocks ground feel' },

    // ================================================================
    // LAYER 7 — DESIRE (dream state, verbatim)
    // ================================================================
    { layer: 'Desire', v: true, start: 'They actually let your feet move naturally.', note: 'Feet move naturally' },
    { layer: 'Desire', v: true, start: 'gives your feet room to move,', note: 'Room to move' },
    { layer: 'Desire', v: true, start: 'feel the ground again.', note: 'Feel the ground again' },
    { layer: 'Desire', v: true, start: 'feel the difference of natural comfort.', note: 'Natural comfort' },
    { layer: 'Desire', v: true, start: 'keep doing the things they enjoy.', note: 'Keep doing the things you enjoy' },
    { layer: 'Desire', v: true, start: 'Now I can stay active even when the temperature drops.', note: 'Stay active in cold' },
    { layer: 'Desire', v: true, start: 'they look really cute on her too.', note: 'Looks cute' },
    { layer: 'Desire', v: true, start: 'felt smooth, supported', note: 'Smooth, supported, steady walking' },
    { layer: 'Desire', v: true, start: 'makes them feel almost like slippers.', note: 'Feels like slippers' },
    { layer: 'Desire', v: true, start: 'you stay sure on the frost.', note: 'Stay sure on the frost' },

    // ================================================================
    // LAYER 5 — AVATAR (who it targets — labels + verbatim descriptors)
    // ================================================================
    { ids: ['3', '20', '23', '31', '19(a)', '24(a)', '25(a)'], layer: 'Avatar', v: false, start: 'Neuropathy sufferers (burning/tingling/numb, scared of falling)' },
    { ids: ['3', '23', '4(a)', '10(a)', '11(a)', '22(a)'], layer: 'Avatar', v: false, start: 'Plantar fasciitis / chronic foot-pain sufferers' },
    { ids: ['20', '26', '39', '43', '44', '2(a)', '38(a)', '41(a)', '42(a)', '43(a)', '48(a)'], layer: 'Avatar', v: false, start: 'Adults 50+ worried about balance / falling on ice' },
    { ids: ['13(a)', '28(a)', '34(a)', '44(a)'], layer: 'Avatar', v: false, start: 'People with wide feet / self-described "clumsy"' },
    { ids: ['16', '40', '48'], layer: 'Avatar', v: false, start: 'Gift-buyers shopping for mom' },
    { ids: ['10', '34', '18(a)'], layer: 'Avatar', v: false, start: 'On-your-feet-all-day workers & busy parents' },
    { ids: ['18(a)'], layer: 'Avatar', v: false, start: 'Walkers trying to lose weight (10k steps/day)' },
    { ids: ['37', '47', '50', '28(a)', '39(a)'], layer: 'Avatar', v: false, start: 'Cold-climate / Wisconsin & northern winter walkers' },
    { ids: ['1', '16(a)', '28', '33(a)'], layer: 'Avatar', v: false, start: 'Existing barefoot-shoe fans wanting a cold-weather option' },
    { ids: ['17(a)', '41(a)', '3', '31', '23'], layer: 'Avatar', v: false, start: 'Trust-by-authority: podiatrist / nurse / orthopedist-endorsed' },
    { layer: 'Avatar', v: true, start: 'I’m Marta, 55, and I’ve always believed staying active is the secret to feeling young.', note: 'Persona: Marta, 55, active' },
    { layer: 'Avatar', v: true, start: 'Meet Brooke, a 40-year-old office worker', end: 'walking 10,000 steps a day.', note: 'Persona: Brooke, 40, office worker' },
    { layer: 'Avatar', v: true, start: 'I am a Wisconsin girl and I am done with heavy winter boots.', note: 'Persona: Wisconsin girl' },

    // ================================================================
    // LAYER 8 — REPEATED MESSAGING (spine blocks recurring across 3+ ads)
    // ================================================================
    { layer: 'Repeated messaging', v: true, start: 'And here’s what I see every year.', end: 'the same stiff boots they already hated.', note: 'Every-year waiting/regret block' },
    { layer: 'Repeated messaging', v: true, start: 'Because once you experience a winter boot that actually gives your feet room to move, going back to stiff, narrow boots feels pretty difficult.', note: 'Once you experience it, no going back' },
    { layer: 'Repeated messaging', v: true, start: 'I work at the Peak Footwear Warehouse and right now we are completely overloaded with snug boot inventory.', note: 'Warehouse overstock premise' },
    { layer: 'Repeated messaging', v: true, start: 'We produced a larger batch of our best-selling snug boots than planned.', note: 'Founder overproduction premise' },
    { layer: 'Repeated messaging', v: true, start: 'More than 255,000 people wear them now.', note: '255k social proof (tour-guide)' },
    { layer: 'Repeated messaging', v: true, start: 'Over 255,000 plus say they are the most comfortable', note: '255k social proof (founder/walking-group)' },
    { layer: 'Repeated messaging', v: true, start: 'These actually allow your feet to breathe a little bit and they’re lined so they’re', end: 'Could not recommend more.', note: 'UGC "cute cozy waterproof affordable" body (shared across many)' },
    { layer: 'Repeated messaging', v: true, start: 'I’ll be putting them right there', note: 'UGC "I’ll be putting them right there" sign-off' },
    { layer: 'Repeated messaging', v: true, start: 'If the link is still up, that means there’s still stock left.', note: 'Link-still-up = stock-left scarcity' },
  ],
};
