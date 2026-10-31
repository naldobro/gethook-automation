'use strict';
/**
 * Per-brand blueprint config — HIKE Footwear (brand_id 67).
 *
 * One brand, two GetHook pages:
 *   - main page            (page_id 219, 98 ads) → bare-number IDs 1..98
 *   - "YOUR HEALTH JOURNAL" (page_id 220, 98 ads) → letter-tagged IDs 1(a)..98(a)
 * Page-aware IDs (cfg.pageLetters): ads are ranked WITHIN each page by
 * scrape/impressions order (= priority), and the page letter is stamped onto
 * the id so it reveals which page ran the ad and stays identical across the
 * per-page and combined builds. Titles are near-all identical ("Best Walking
 * Shoe 2026!") or null, so IDs come from page rank, never titles.
 *
 * Build all three deliverables from this one config:
 *   node scripts/build_blueprint.js --brand "HIKE Footwear"             # combined (196) — use for the fidelity guard
 *   node scripts/build_blueprint.js --brand "HIKE Footwear" --page=main # main page (98)
 *   node scripts/build_blueprint.js --brand "HIKE Footwear" --page=a    # YOUR HEALTH JOURNAL (98)
 *
 * Products: HF Stride (flagship barefoot walking shoe), HF Cloud (barefoot
 * walking shoe for women 60+), Cozely/Cozily (barefoot winter boot, faux-fur lined).
 *
 * UNIQUE MECHANISM (brand-wide, recurs across nearly every ad — therefore NOT
 * an angle): the barefoot-biomechanics causal chain (wide toe box → toes spread
 * & grip a steady base; zero-drop → level, not pitched forward; thin flexible
 * sole → feel the ground → stabilizer muscles wake up / proprioception) + the
 * problem-side reframe ("the more your shoes cushion & support, the weaker and
 * less steady your feet get"). The feature list alone (wide toe box / zero-drop /
 * lightweight / hands-free) is NOT a mechanism; only the causal passages are.
 */
module.exports = {
  brandName: 'HIKE Footwear',
  dupTitles: [],
  pageLetters: { 219: '', 220: 'a' }, // main → '', YOUR HEALTH JOURNAL → 'a'
  entries: [
    // ================================================================
    // LAYER 2 — ANGLE (ad-specific premise, our words; merged by ~85%.
    // coverage = how many ads re-tested that premise. The barefoot-biomechanics
    // "natural movement / balance" message is NOT here — it recurs across ~every
    // ad = Unique mechanism (see the Angle(candidate) teaching row below).
    // ---- MAIN PAGE (page_id 219) ----
    // ================================================================
    { ids: ['1', '3'], layer: 'Angle', v: false, start: 'Founder confession — we overproduced this batch of HF Stride, so rather than let them sit in the warehouse we’re selling at a flash/clearance price (3: + "started 5 yrs ago to help my mom")' },
    { ids: ['6', '22'], layer: 'Angle', v: false, start: 'We messed up our inventory — warehouse overloaded, manager threatens to double our storage cost → buy one get one free (overstock-insider)' },
    { ids: ['9'], layer: 'Angle', v: false, start: 'Founder warning — we’re relocating to a bigger facility; it costs more to move these than to sell at a loss, so clearing every pair BOGO before the move' },
    { ids: ['59'], layer: 'Angle', v: false, start: 'Founder — our manufacturer’s costs go up next month so prices must rise; one last chance at BOGO before the increase' },
    { ids: ['4', '10', '41'], layer: 'Angle', v: false, start: 'Comment-reply skit — "these are too expensive, any sale?" → surprise: the summer sale is live right now, buy one get one free' },
    { ids: ['18'], layer: 'Angle', v: false, start: 'We owe you an apology — if you bought HF Stride last month you won’t like this: it’s now buy one get one free' },
    { ids: ['7'], layer: 'Angle', v: false, start: 'Last call on the free-pair deal — two pairs one price: one for you, one for someone whose feet have been bothering them (mom/sister/friend)' },
    { ids: ['8', '11'], layer: 'Angle', v: false, start: 'Personified HF Stride speaks — "get two of me for the price of one"; I stop the wobbling, I was designed with podiatrists for stability' },
    { ids: ['5'], layer: 'Angle', v: false, start: 'Personified barefoot-shoe manifesto — "Footwear industry, you’ve profited off people’s fear of falling; I’m HF Stride, I’m taking it from here"' },
    { ids: ['21', '28'], layer: 'Angle', v: false, start: 'Linda, 67 — husband left her after 34 yrs; she fell & shrank her life, then met Carol (71, walks like 50) in HF Stride; ex sees her transformed at Target (emotional redemption VSL)' },
    { ids: ['24'], layer: 'Angle', v: false, start: 'Twin sisters, both 73 — one walks the streets alone & fearless, the other grips every cart in fear; the only difference is the shoes (rhyming VSL)' },
    { ids: ['25'], layer: 'Angle', v: false, start: '21 days in — most shoes are built like little mattresses that weaken your feet; week-by-week I stopped looking for a bench and walked the whole zoo (transformation)' },
    { ids: ['23', '48'], layer: 'Angle', v: false, start: 'Insider rates the popular shoes that secretly wreck your balance (Dansko/New Balance/Brooks/Hoka/Skechers) → the fix is HF Stride (23: hairdresser of 35 yrs; 48: podiatrist)' },
    { ids: ['40'], layer: 'Angle', v: false, start: 'My 70-yo mom started HF Stride for her wobble — after 30 days, root-cause senior balance transformation (daughter documents; "47,000 seniors switching a month")' },
    { ids: ['32', '56', '83', '92'], layer: 'Angle', v: false, start: 'My balance was slipping — gripping the handrail/cart, or a bad fall — then HF Stride made me steady again (refuse to be one of those people who stop)' },
    { ids: ['31', '39', '42'], layer: 'Angle', v: false, start: 'These aren’t your grandma’s orthopedic shoes — college professor wore them to teach 5 hrs on her feet; students never noticed and her feet didn’t hurt' },
    { ids: ['14', '19', '60', '75', '93'], layer: 'Angle', v: false, start: 'I was skeptical — other barefoot shoes felt like cardboard/gloves or looked like clown shoes; Hike’s are the first that look normal AND feel supportive' },
    { ids: ['55', '68'], layer: 'Angle', v: false, start: '"Welcome to your 50s" — runner hit with sudden foot pain refuses to accept it, researches barefoot; every pair felt like cardboard until Hike' },
    { ids: ['12', '45', '50', '57', '65', '77'], layer: 'Angle', v: false, start: 'Finally barefoot shoes that look good AND feel good — I won’t give up style for comfort (and I don’t have to)' },
    { ids: ['27', '35', '36', '70'], layer: 'Angle', v: false, start: 'Do your toes feel cramped/squeezed all day? The wide toe box finally gives them room to spread (what if your shoes are the problem, not your feet)' },
    { ids: ['63', '71', '82', '84'], layer: 'Angle', v: false, start: 'Humor — your toes are stuck "bumper to bumper in rush-hour traffic"; Hike got rid of the middleman (hands-free) and gave them room' },
    { ids: ['86'], layer: 'Angle', v: false, start: 'Would you wear a glove that crushes your fingers? Then why do it to your toes? (glove analogy)' },
    { ids: ['47', '78', '97'], layer: 'Angle', v: false, start: 'I didn’t realize how much my shoes affected the way I stand & walk until I switched — zero-drop makes me feel grounded and level' },
    { ids: ['62'], layer: 'Angle', v: false, start: 'Traveling cross-country, airports & sightseeing without sore feet at the end of the day' },
    { ids: ['61'], layer: 'Angle', v: false, start: 'Dog-walk humor — my terrier used to outlast me and we’d limp home; now the negotiation is reversed, she gets tired before I do' },
    { ids: ['49', '69', '94'], layer: 'Angle', v: false, start: 'A friend who reviews things online wore nothing but these — so I tried them and now I get it (reviewer-referral; 94: + wide feet)' },
    { ids: ['51', '72'], layer: 'Angle', v: false, start: 'Someone close recommended them (my daughter / my girlfriend) — I stopped complaining after my walks and getting out the door feels easier' },
    { ids: ['74'], layer: 'Angle', v: false, start: 'Repeat buyer — I loved my hikes so much I bought another pair/color (and love the eco-friendly packaging)' },
    { ids: ['34', '85'], layer: 'Angle', v: false, start: 'Years of foot pain / plantar fasciitis (from sports) made me picky about shoes → with HF Stride I can walk without thinking about my sore feet' },
    { ids: ['16', '87', '98'], layer: 'Angle', v: false, start: 'My podiatrist (or podiatrist relative) told me to switch; I feared they’d be ugly — they’re not; PF & ingrown toenails gone, easy to slip on after surgery ("don’t be mean to your feet")' },
    { ids: ['37', '89'], layer: 'Angle', v: false, start: 'Who says you slow down after 50/60? Staying active on trails / park / by the water with a roomy slip-on barefoot shoe' },
    { ids: ['38', '43', '88', '95'], layer: 'Angle', v: false, start: 'After 40/50/60 your feet stop tolerating bad shoes — give them room (measured "invest in the foundations that carry you" aging foot-care)' },
    { ids: ['30', '33', '81'], layer: 'Angle', v: false, start: 'If your feet ache by the end of the day / you’re tired of peeling your shoes off halfway through — wear these all day with no ache' },
    { ids: ['52'], layer: 'Angle', v: false, start: 'My go-to shoe for work — and I got a pair for my husband, a nurse practitioner' },
    { ids: ['96'], layer: 'Angle', v: false, start: 'On my feet all day chasing the grandkids + on my GLP-1 journey — swollen feet don’t need shoes squeezing them, they need room' },
    { ids: ['26'], layer: 'Angle', v: false, start: 'Flexibility demo — if you can’t bend your shoe like this, you’re probably doing more harm than good to your feet' },
    { ids: ['17', '20'], layer: 'Angle', v: false, start: 'If you want better posture/stability you’re actually after a new type of shoe — an ultra-wide toe box lets your toes open up for a steadier base' },
    { ids: ['29', '46', '58', '79'], layer: 'Angle', v: false, start: 'Barefoot-curious / honest-review convert showcase — I never got barefoot shoes until I tried Hike, now I’m hooked' },
    { ids: ['2'], layer: 'Angle', v: false, start: 'HF Cloud, biggest sale of the year — the alternatives all fail (big brands go soft for a week, bulky orthopedics are ugly & throw off balance, cheap memory foam flattens & swells), so we built HF Cloud for women 60+' },
    { ids: ['13', '44', '53', '54', '64', '66', '67', '73', '76', '80', '90', '91'], layer: 'Angle', v: false, start: 'Cozely/Cozily barefoot WINTER BOOT — finally a warm fleece-lined winter boot that isn’t heavy/stiff/bulky: wide toe box, grip for ice, lightweight, cute (seasonal line extension)' },
    // ---- Angle CANDIDATES (considered, then resolved — reason kept for audit) ----
    { ids: ['1', '8', '14', '40', '48'], layer: 'Angle (candidate)', v: false, start: 'Wide toe box + zero-drop + thin flexible sole = natural movement / better balance', note: 'REJECTED as an angle — this is the brand UNIQUE MECHANISM (it recurs across nearly every HIKE ad), not any single ad’s premise. Canonical Angle(ad-specific) vs UM(brand-wide) test.' },
    { ids: ['1', '18', '59'], layer: 'Angle (candidate)', v: false, start: 'Designed with podiatrists to solve real daily problems', note: 'REJECTED as an angle — recurring authority/proof claim across the brand, lives in Repeated messaging + Avatar-trust, not a single ad’s premise.' },
    { ids: ['83'], layer: 'Angle (candidate)', v: false, start: 'Buying a second pair for my elderly parents who keep falling', note: 'Secondary to 83’s primary balance-decline premise; merged into the balance-slipping angle (32/56/83/92). Noted, not a separate angle.' },
    { ids: ['57', '65'], layer: 'Angle (candidate)', v: false, start: '"Finally a barefoot shoe that isn’t ugly / I didn’t think barefoot could be this cute"', note: 'Merged into the look-good-AND-feel-good angle (12/45/50/57/65/77) — same style-vs-comfort premise, not distinct.' },
    { ids: ['70'], layer: 'Angle (candidate)', v: false, start: '"What if your shoes are the problem and not your feet?" reframe hook', note: 'Distinct opener but same cramped-toes→room premise; merged into 27/35/36/70 rather than split into a bespoke angle.' },
    { ids: ['55', '68', '14', '19', '60', '75', '93'], layer: 'Angle (candidate)', v: false, start: '"Welcome to your 50s" runner vs generic cardboard-skeptic — kept separate', note: 'NOT merged — 55/68 carry the distinct "refuse to accept age-related foot pain, runner" premise, while 14/19/60/75/93 are the look-based skeptic convert. Related but distinct executions.' },
    // ---- Junk / failed-transcript ads (no usable copy → exempt from real Hook/Angle; logged for completeness) ----
    { ids: ['15'], layer: 'Angle (junk)', v: false, start: 'No usable transcript — upbeat music only, no spoken words', note: 'Music ad, no VO; cannot extract a real hook/angle. Logged so every ad is accounted for.' },

    // ================================================================
    // LAYER 1 — HOOK (opening ~12–20 words, verbatim, auto-coverage). MAIN PAGE.
    // ================================================================
    { layer: 'Hook', v: true, start: 'As the founder of Hike Footwear, this is honestly one of the best opportunities we' }, // 1 + 59 (shared opening)
    { layer: 'Hook', v: true, start: 'If you’ve been waiting for HF Cloud to go on sale, this is it.' }, // 2
    { layer: 'Hook', v: true, start: 'I started this company 5 years ago to help my mom walk without pain.' }, // 3
    { layer: 'Hook', v: true, start: 'Okay, I need these HF Stride, but they’re not cheap any chance of a sale.' }, // 4
    { layer: 'Hook', v: true, start: 'Footwear industry you’ve been profiting off people’s fear of falling.' }, // 5
    { layer: 'Hook', v: true, start: 'We made a mistake with our inventory, and it’s actually really good news for you.' }, // 6
    { layer: 'Hook', v: true, start: 'This is your last call on the free pair deal for HF Stride.' }, // 7
    { layer: 'Hook', v: true, start: 'I’m HF Stride, and right now you can get two of me for the price of one.' }, // 8
    { layer: 'Hook', v: true, start: 'I want to get HF Stride for my mom, but it’s too expensive for me.' }, // 9
    { layer: 'Hook', v: true, start: 'I’ve been wanting HF Stride forever, but the price?' }, // 10
    { layer: 'Hook', v: true, start: 'I’m the HF Stride, and I’m about to fix a problem you’ve been struggling with for' }, // 11
    { layer: 'Hook', v: true, start: 'you’d be amazed the difference a good pair of comfortable shoes can make when your feet start' }, // 12
    { layer: 'Hook', v: true, start: 'These are the coziest boots I’ve ever put on,' }, // 13
    { layer: 'Hook', v: true, start: 'I keep hearing about these barefoot shoes being great for foot health and balance,' }, // 14
    { layer: 'Hook', v: true, start: 'When my podiatrist told me to switch to barefoot shoes,' }, // 16
    { layer: 'Hook', v: true, start: 'If you’re looking for better foot posture,' }, // 17
    { layer: 'Hook', v: true, start: 'We owe you an apology.' }, // 18
    { layer: 'Hook', v: true, start: 'I keep hearing about barefoot shoes being great for your posture and your balance,' }, // 19
    { layer: 'Hook', v: true, start: 'If you’re looking for a better style shoe that gives you better stability, then you’re' }, // 20
    { layer: 'Hook', v: true, start: 'He left me cause I got slow' }, // 21
    { layer: 'Hook', v: true, start: 'We messed up, we overestimated demand for this quarter, badly.' }, // 22
    { layer: 'Hook', v: true, start: 'Nobody stands more than a hairdresser.' }, // 23
    { layer: 'Hook', v: true, start: 'Linda and I are twins both 73 same mother same father same family tree' }, // 24
    { layer: 'Hook', v: true, start: '21 days in these shoes and I can walk without stopping.' }, // 25
    { layer: 'Hook', v: true, start: 'If you can’t bend your shoe like this, then you’re probably doing more harm than good' }, // 26
    { layer: 'Hook', v: true, start: 'Do your toes feel cramped and squeezed together in regular shoes?' }, // 27
    { layer: 'Hook', v: true, start: 'This was me at 62, and this is me at 67' }, // 28
    { layer: 'Hook', v: true, start: 'I never understood why people love barefoot shoes so much until I started wearing them' }, // 29
    { layer: 'Hook', v: true, start: 'If you’re tired of taking your shoes off halfway through the day,' }, // 30
    { layer: 'Hook', v: true, start: 'These are not your grandma’s orthopedic shoes.' }, // 31
    { layer: 'Hook', v: true, start: 'Knew my balance was getting worse when I started gripping the handrail every time I came down the' }, // 32
    { layer: 'Hook', v: true, start: 'If your feet are killing you by the end of the day,' }, // 33
    { layer: 'Hook', v: true, start: 'I played sports most of my life and my feet have definitely paid for it.' }, // 34
    { layer: 'Hook', v: true, start: 'Have you ever had a shoe that was the correct size, but it still felt so tight across the toes?' }, // 35
    { layer: 'Hook', v: true, start: 'Do your toes ever feel cramped and squeezed together after wearing your shoes all day long?' }, // 36
    { layer: 'Hook', v: true, start: 'Staying active in my 60s means I need shoes that work for my everyday' }, // 37
    { layer: 'Hook', v: true, start: 'Didn’t think another pair of shoes would make a difference, but I was wrong' }, // 38
    { layer: 'Hook', v: true, start: 'Nobody really warns you that getting older means your feet start hurting too.' }, // 39
    { layer: 'Hook', v: true, start: 'My 70-year-old mom started wearing H.S. Stride for her wobble, and after 30 days, this happened.' }, // 40
    { layer: 'Hook', v: true, start: 'These barefoot shoes are way too expensive.' }, // 41
    { layer: 'Hook', v: true, start: 'really did used to think that foot pain was just something you deal with as you' }, // 42
    { layer: 'Hook', v: true, start: 'In my 50s era here, and my feet are sore and tired by the end of the day,' }, // 43
    { layer: 'Hook', v: true, start: 'Where were these before I bought all the other 20 pairs?' }, // 44
    { layer: 'Hook', v: true, start: 'I finally found comfortable shoes that actually look good.' }, // 45
    { layer: 'Hook', v: true, start: 'Most Jews squeeze your foot into a point.' }, // 46
    { layer: 'Hook', v: true, start: 'I didn’t realize how much my shoes were affecting the way I was standing and walking' }, // 47
    { layer: 'Hook', v: true, start: 'Y’all, some of the most popular walking shoes are the first ones I tell my patients to stop' }, // 48
    { layer: 'Hook', v: true, start: 'A friend of mine who reviews things online got Cynthia’s shoes,' }, // 49
    { layer: 'Hook', v: true, start: 'You’d be amazed at the difference a good pair of comfortable shoes can make when your feet start hurting.' }, // 50
    { layer: 'Hook', v: true, start: 'So my daughter just told me that she hasn’t heard me complain once after I do my evening walks.' }, // 51
    { layer: 'Hook', v: true, start: 'This is my favorite shoe to wear to work.' }, // 52
    { layer: 'Hook', v: true, start: 'These are my new barefoot boots.' }, // 53
    { layer: 'Hook', v: true, start: 'If you’re looking to get someone my age a gift, these cozily boots are both beautiful and useful,' }, // 54
    { layer: 'Hook', v: true, start: 'I was griping to a friend one time about foot pain that showed up after years of me being' }, // 55 + 68
    { layer: 'Hook', v: true, start: 'When you come home at the end of the day with your feet aching,' }, // 56
    { layer: 'Hook', v: true, start: 'Finally, a barefoot shoe that isn’t ugly.' }, // 57
    { layer: 'Hook', v: true, start: 'Alright, so, honest review of these shoes.' }, // 58
    { layer: 'Hook', v: true, start: 'I kept hearing that barefoot shoes were good for you, but every pair I tried on,' }, // 60
    { layer: 'Hook', v: true, start: 'I stopped reading the dog walk and Darcy has questions' }, // 61
    { layer: 'Hook', v: true, start: 'Recently, I had some trips planned across country and up the coast to see family.' }, // 62
    { layer: 'Hook', v: true, start: 'Now, when’s the last time you touched your toes?' }, // 63
    { layer: 'Hook', v: true, start: 'It hasn’t started snowing yet, but I am ready.' }, // 64
    { layer: 'Hook', v: true, start: 'You probably don’t realize how much your shoes affect the way you stand and walk' }, // 65
    { layer: 'Hook', v: true, start: 'I’m wearing my winter boots on the couch because they’re that cozy.' }, // 66
    { layer: 'Hook', v: true, start: 'I don’t think I’ve ever said this, but these are the softest, warmest boots I’ve ever owned.' }, // 67
    { layer: 'Hook', v: true, start: 'A friend of mine who reviews stuff online got sent these shoes by Hike,' }, // 69
    { layer: 'Hook', v: true, start: 'What if your shoes are the problem and not your feet?' }, // 70
    { layer: 'Hook', v: true, start: 'It’s time we got something straight about our shoes.' }, // 71
    { layer: 'Hook', v: true, start: 'My girlfriend got a pair of these and it’s the only thing she has worn when we go out for walks,' }, // 72
    { layer: 'Hook', v: true, start: 'I love going out for a walk in the cold weather, but it’s the slipping that really scares me.' }, // 73
    { layer: 'Hook', v: true, start: 'I love my other pair of hikes so much I got another pair' }, // 74
    { layer: 'Hook', v: true, start: 'I thought barefoot shoes would look a lot more outdoorsy, but these hike sneakers look' }, // 75
    { layer: 'Hook', v: true, start: 'Winter’s coming and this year I’m actually going to be prepared.' }, // 76
    { layer: 'Hook', v: true, start: 'If you want to stop choosing between shoes that look good' }, // 77
    { layer: 'Hook', v: true, start: 'I didn’t get these barefoot sneakers by Hike for the reasons they went viral.' }, // 78
    { layer: 'Hook', v: true, start: 'I never really thought about how much room my feet had in my shoes until I tried these.' }, // 79
    { layer: 'Hook', v: true, start: 'I was having so many problems finding winter boots that I really liked until I got these' }, // 80
    { layer: 'Hook', v: true, start: 'If you have trouble finding shoes that don’t hurt your feet,' }, // 81
    { layer: 'Hook', v: true, start: 'Come on, I know I’m not the only one whose feet are tired of getting stuck in rush hour traffic.' }, // 82
    { layer: 'Hook', v: true, start: 'Confessions of a middle-aged woman.' }, // 83
    { layer: 'Hook', v: true, start: 'Look, no hands.' }, // 84
    { layer: 'Hook', v: true, start: 'These are my hike shoes. After dealing with foot pain, I did my research' }, // 85
    { layer: 'Hook', v: true, start: 'Would you buy a glove that does this to your fingers and wear it?' }, // 86
    { layer: 'Hook', v: true, start: 'I wanted shoes I could put on by myself after shoulder surgery,' }, // 87
    { layer: 'Hook', v: true, start: 'Want to move confident as you get older, don’t overlook your feet.' }, // 88
    { layer: 'Hook', v: true, start: 'Who says you have to slow down after 50?' }, // 89
    { layer: 'Hook', v: true, start: 'Every winter, my boots squish my toes.' }, // 90
    { layer: 'Hook', v: true, start: 'Every winter my boots squish my toes, not this year.' }, // 91
    { layer: 'Hook', v: true, start: 'Got balance issues? I was ignoring mine until I had a pretty bad fall, and then I paid attention.' }, // 92
    { layer: 'Hook', v: true, start: 'I kept hearing about how great barefoot shoes were, so I started wearing them about three years ago.' }, // 93
    { layer: 'Hook', v: true, start: 'A friend of mine who reviews things online told me about these sneakers that she was wearing.' }, // 94
    { layer: 'Hook', v: true, start: 'Anybody hit 40 and realize your feet just aren’t putting up with the same stuff anymore.' }, // 95
    { layer: 'Hook', v: true, start: 'I was on my feet all day today chasing the grands.' }, // 96
    { layer: 'Hook', v: true, start: 'I did not realize how much my shoes were affecting the way I stand and walk until I switched to' }, // 97
    { layer: 'Hook', v: true, start: 'My son-in-law is a podiatrist, so of course I asked him about barefoot shoes.' }, // 98

    // ================================================================
    // LAYER 3 — UNIQUE MECHANISM (brand-wide CAUSAL "why it works", full verbatim).
    // Each explains WHY/HOW (cause → effect), not just names features.
    // ================================================================
    { layer: 'Unique mechanism', v: true, start: 'The more your shoes cushion and support your feet, the weaker and less steady your feet', end: 'how they were built to move.', note: 'Core problem-side reframe: more cushion/support → feet get weaker & less steady over time; "we do the opposite, bring feet back to how they were built to move"' },
    { layer: 'Unique mechanism', v: true, start: 'A wide toe box so your toes can relax instead of being squeezed.', end: 'which is exactly what keeps you steady.', note: 'Solution chain: wide toe box → toes relax; zero-drop → flat & level; thin flexible sole → feel the floor again = what keeps you steady' },
    { layer: 'Unique mechanism', v: true, start: 'The thin, flexible sole lets your feet feel the ground again, restoring the proprioceptive', end: 'blocking for years.', note: 'Clinician: thin flexible sole → feel the ground → restores proprioceptive feedback that cushioned shoes blocked for years' },
    { layer: 'Unique mechanism', v: true, start: 'That thick, pillowy foam completely blocks the sensory feedback your nervous system uses', end: 'get a little weaker.', note: 'Podiatrist: thick foam blocks the sensory feedback → stabilizer muscles stop firing → get weaker each month' },
    { layer: 'Unique mechanism', v: true, start: 'That elevated heel is constantly shifting your center of gravity forward,', end: 'atrophy quietly month after month.', note: 'Raised heel → center of gravity forward → subtle imbalance; shoe does the work → stabilizers never engage → atrophy' },
    { layer: 'Unique mechanism', v: true, start: 'The zero-drop sole keeps your foot flat and level, with no elevated heel tilting your', end: 'they get stronger.', note: 'Zero-drop → no forward tilt → stabilizer muscles have to work → get stronger over time' },
    { layer: 'Unique mechanism', v: true, start: 'Most standard shoes squeeze your toes together into a point which messes up your balance,', end: 'knees and lower back.', note: 'Narrow pointed toe box → messes up balance → stress up into knees & lower back' },
    { layer: 'Unique mechanism', v: true, start: 'What most women, including my mom, blamed on age was actually cushioned shoes shutting', end: 'nerves in her feet,', note: 'Senior reframe: what gets blamed on age is actually cushioned shoes shutting off the nerves in the feet' },
    { layer: 'Unique mechanism', v: true, start: 'wrap your foot in foam for 30 years or more and those nerves stop firing.', note: 'Twin VSL: feet have thousands of nerve endings signaling the brain; wrap them in foam for 30 yrs → nerves stop firing → they don’t know the floor' },
    { layer: 'Unique mechanism', v: true, start: 'the thin, flexible sole, which wakes up the 200,000 nerve endings in her', note: 'Thin flexible sole → wakes up the 200,000 nerve endings in the feet → feel the floor again (balance)' },

    // ================================================================
    // LAYER 4 — CTA / OFFER / RISK-REVERSAL (full verbatim closes)
    // ================================================================
    { layer: 'CTA', v: true, start: 'So right now, when you buy one pair, the second pair is completely free, plus free shipping', end: 'send them back.', note: 'Warehouse/overstock BOGO + free shipping + 30-day returns' },
    { layer: 'CTA', v: true, start: 'Right now, I’m on a buy one, get one free deal.', end: '30-day money back guarantee.', note: 'Personified-shoe BOGO + free shipping + 30-day guarantee' },
    { layer: 'CTA', v: true, start: 'Check below to see if your size is still available, and thank you for trusting us with your steps.' }, // 1
    { layer: 'CTA', v: true, start: 'Up to 70% off with free shipping on select pairs', note: 'HF Cloud up-to-70%-off clearance' },
    { layer: 'CTA', v: true, start: 'Right now the HF Stride', end: 'Full refund', note: 'VSL close: up to 50% off + 30-day money-back / full refund' },
    { layer: 'CTA', v: true, start: 'Switch to H.F. Stride now.', end: 'Link below.', note: 'Personified close: 36% off, free shipping, 30-day money-back guarantee' },
    { layer: 'CTA', v: true, start: 'HF stride is on sale this week half the price with a 30-day promise', note: 'Twin VSL: half price + 30-day promise' },
    { layer: 'CTA', v: true, start: 'Right now, they’re 50% off with free shipping.', end: 'send them back, and you don’t pay.', note: '21-day testimonial: 50% off + 30-day test, send back if no change' },
    { layer: 'CTA', v: true, start: 'Click below and try H.S. Stride risk-free with a 30-day guarantee.' }, // 40
    { layer: 'CTA', v: true, start: 'And you don’t risk a thing.', end: 'or your money back.', note: 'Last-call: wear 30 days, feet don’t feel better → full refund, "all-day comfort guaranteed or your money back"' },

    // ================================================================
    // LAYER 5 — AVATAR (who it targets — labels + verbatim personas)
    // ================================================================
    { ids: ['2', '24', '32', '40', '83', '92'], layer: 'Avatar', v: false, start: 'Seniors / women 60+ afraid of falling & losing balance (gripping rails/carts, had a fall)' },
    { ids: ['37', '38', '43', '55', '68', '88', '89', '95'], layer: 'Avatar', v: false, start: 'Active women 40–60 noticing age-related foot pain, refusing to slow down' },
    { ids: ['16', '34', '49', '85', '98'], layer: 'Avatar', v: false, start: 'Plantar fasciitis / chronic foot-pain sufferers (incl. ingrown toenails)' },
    { ids: ['94'], layer: 'Avatar', v: false, start: 'People with wide feet' },
    { ids: ['7', '9', '54', '83'], layer: 'Avatar', v: false, start: 'Gift-buyers shopping for mom / elderly parents / someone "my age"' },
    { ids: ['31', '39', '42', '52', '96'], layer: 'Avatar', v: false, start: 'On-their-feet-all-day workers, teachers & grandparents chasing grandkids' },
    { ids: ['62'], layer: 'Avatar', v: false, start: 'Travelers wanting all-day comfort through airports & sightseeing' },
    { ids: ['96'], layer: 'Avatar', v: false, start: 'GLP-1 journey / swollen-feet sufferers' },
    { ids: ['14', '19', '55', '60', '68', '75', '93'], layer: 'Avatar', v: false, start: 'Barefoot-curious skeptics burned by ugly/"cardboard" minimalist shoes' },
    { ids: ['13', '44', '53', '54', '64', '66', '67', '73', '76', '80', '90', '91'], layer: 'Avatar', v: false, start: 'Cold-climate winter-boot shoppers who hate heavy/stiff boots' },
    { ids: ['23', '48', '98'], layer: 'Avatar', v: false, start: 'Trust-by-authority: hairdresser of 35 yrs / podiatrist / podiatrist relative endorsed' },
    { layer: 'Avatar', v: true, start: 'I hadn’t seen Robert in almost five years', note: 'Persona: Linda, 67, divorced after 34 yrs of marriage' },
    { layer: 'Avatar', v: true, start: 'Nobody stands more than a hairdresser.', note: 'Persona: hairdresser, 35 years on her feet' },
    { layer: 'Avatar', v: true, start: 'My son-in-law is a podiatrist, so of course I asked him about barefoot shoes.', note: 'Persona: older woman w/ podiatrist son-in-law' },

    // ================================================================
    // LAYER 6 — PROBLEM (ICP roadblocks, verbatim)
    // ================================================================
    { layer: 'Problem', v: true, start: 'Bending down to put on shoes, swollen feet, narrow toe boxes that crush', end: 'from the ground up.', note: 'The 4 daily problems: bending to put shoes on, swollen feet, crushing toe boxes, back/knee/hip pain from the ground up' },
    { layer: 'Problem', v: true, start: 'The big brands feel soft for a week,', end: 'make swelling worse by lunchtime.', note: 'Why the alternatives fail: soft-for-a-week heels burn, bulky orthopedics throw off balance, memory foam flattens & traps heat & swells' },
    { layer: 'Problem', v: true, start: 'gripping the handrail every time I came down the', note: 'Gripping the handrail on the stairs' },
    { layer: 'Problem', v: true, start: 'I grabbed the grocery cart before I even needed it', note: 'Grabbing the grocery cart as a security blanket' },
    { layer: 'Problem', v: true, start: 'Then I fell in my kitchen, nothing dramatic,', end: 'what getting old feels like', note: 'The fall in the kitchen → "so this is what getting old feels like"' },
    { layer: 'Problem', v: true, start: 'my ankles\n    and feet swollen up horribly,', note: 'Ankles & feet swollen horribly by day’s end' },
    { layer: 'Problem', v: true, start: 'that stabbing pain in your heel when', end: 'ingrown toenails.', note: 'Plantar fasciitis stabbing heel pain + ingrown toenails' },
    { layer: 'Problem', v: true, start: 'Most shoes today are built like little mattresses.', end: 'more cramped.', note: 'Shoes built like little mattresses → feet get weaker, stiffer, more cramped' },
    { layer: 'Problem', v: true, start: 'walking starts to feel like work.', end: 'enjoying the walk.', note: 'Walking feels like work → cut the route short, look for the bench, watch every step' },

    // ================================================================
    // LAYER 7 — DESIRE (dream state, verbatim)
    // ================================================================
    { layer: 'Desire', v: true, start: 'walk with less pain\n    and more freedom.', note: 'Walk with less pain and more freedom' },
    { layer: 'Desire', v: true, start: 'they feel more independent again.', note: 'Feel more independent again' },
    { layer: 'Desire', v: true, start: 'feel the ground again', note: 'Feel the ground again' },
    { layer: 'Desire', v: true, start: 'finally keep up with their grandkids.', note: 'Keep up with the grandkids' },
    { layer: 'Desire', v: true, start: 'feel steady and free again,', note: 'Feel steady and free again' },
    { layer: 'Desire', v: true, start: 'your toes can finally relax instead of being squeezed.', note: 'Toes finally relax instead of squeezed' },
    { layer: 'Desire', v: true, start: 'I feel like I’m wearing my slippers.', note: 'Feels like wearing slippers (cozy boot)' },
    { layer: 'Desire', v: true, start: 'stay warm and toasty in the cold winter.', note: 'Warm & toasty toes in winter' },
    { layer: 'Desire', v: true, start: 'I can walk long distance and my feet don’t hurt anymore.', note: 'Walk long distances pain-free' },

    // ================================================================
    // LAYER 8 — REPEATED MESSAGING (spine blocks recurring across 3+ ads)
    // ================================================================
    { layer: 'Repeated messaging', v: true, start: 'They’re hands free.', end: 'step in and go.', note: 'Hands-free "just step in and go" (no bending/laces) — recurs widely' },
    { layer: 'Repeated messaging', v: true, start: 'designed with podiatrists to solve real daily problems', note: 'Designed-with-podiatrists authority spine' },
    { layer: 'Repeated messaging', v: true, start: 'Wide toe box so your toes can finally relax instead of being squeezed.', note: 'Wide-toe-box spec spine line' },
    { layer: 'Repeated messaging', v: true, start: 'The more your shoes cushion and support your feet, the weaker and less steady your feet', note: 'More-cushion-weaker-feet spine (verbatim recurs)' },
    { layer: 'Repeated messaging', v: true, start: 'Don’t be mean to your feet', note: 'Don’t-be-mean-to-your-feet sign-off (podiatrist UGC)' },
    { layer: 'Repeated messaging', v: true, start: 'Over 1.4 million people', note: 'Social proof: over 1.4 million people / women switched' },
    { layer: 'Repeated messaging', v: true, start: 'over\n    1,450,000 plus people prioritize their foot health,', note: 'Social proof: 1,450,000+ prioritizing foot health' },
    { layer: 'Repeated messaging', v: true, start: 'No bending, no laces,', note: 'No bending / no laces / no losing your balance putting them on' },
    { layer: 'Repeated messaging', v: true, start: '30-day money back guarantee.', note: '30-day money-back guarantee spine' },

    // ================================================================
    // ============  YOUR HEALTH JOURNAL (page_id 220, ids N(a))  ======
    // Whitelist/3rd-party page. Same brand UM (auto-covered by the verbatim
    // anchors above). Heavy on long-form listicle/comparison VSLs and story
    // VSLs rather than the main page's UGC showcases.
    // ================================================================

    // ---- LAYER 2 — ANGLE (YHJ) ----
    { ids: ['1(a)', '7(a)', '18(a)', '23(a)', '74(a)'], layer: 'Angle', v: false, start: 'Podiatrist condemns the popular shoes/soles that wreck your balance (Skechers/New Balance/Brooks/Hoka; 74: ranks worst sole TYPES) → HF Stride restores it' },
    { ids: ['3(a)', '70(a)'], layer: 'Angle', v: false, start: 'Podiatrist: the 4 shoes making your NEUROPATHY worse (Hoka/Orthofeet/Skechers/New Balance) → HF Cloud lets damaged nerves feel the ground' },
    { ids: ['2(a)'], layer: 'Angle', v: false, start: 'Scored head-to-head for KNEE pain — Skechers/Brooks/Hoka/Asics ranked 5→1, HF Stride wins 8.9/10 at half the price' },
    { ids: ['4(a)', '36(a)'], layer: 'Angle', v: false, start: 'Scored ranking of the top fall-prevention shoes (Propet/Orthofeet/Hoka/Brooks) → HF Stride #1 at $69.95' },
    { ids: ['10(a)', '15(a)'], layer: 'Angle', v: false, start: 'We reviewed the 5 most popular shoes women over 60 wear (Nike/Hoka/Brooks/Vivo) → HF Stride #1 (9.3/10)' },
    { ids: ['45(a)'], layer: 'Angle', v: false, start: 'Ranked the top 5 NURSING shoes for 12-hr shifts (Hoka/Crocs/Skechers Work/Brooks) → HF Stride #1' },
    { ids: ['11(a)', '46(a)'], layer: 'Angle', v: false, start: 'Podiatrist/shopper at the shoe store rates what women our age actually buy ("some should be illegal") → HF Stride 10/10' },
    { ids: ['14(a)', '21(a)', '25(a)', '27(a)', '53(a)'], layer: 'Angle', v: false, start: 'Rapid-fire ratings of the big brands (Hoka/Brooks/NB/Nike/Adidas/Vivo) all 2–5/10 → HF Stride/Cloud 10/10, cheapest at $70' },
    { ids: ['65(a)'], layer: 'Angle', v: false, start: 'I spent 3 months comparing every shoe category doctors swear by (cushioned/orthopedic/narrow/athletic-minimalist) — all fail → HF Stride (for osteoporosis)' },
    { ids: ['5(a)', '71(a)', '84(a)', '85(a)', '93(a)', '94(a)', '95(a)'], layer: 'Angle', v: false, start: 'The foreign-secret story — moved abroad (Italy/Japan) at 62, every local in their 60s–70s moves 20 yrs younger; their secret is flat shoes that let the feet work → HF Stride (men/women variants)' },
    { ids: ['8(a)', '32(a)', '76(a)'], layer: 'Angle', v: false, start: 'Sergeant Earl (30-yr army vet) — "the feet are the roots of the body"; the 3 worst shoes (Crocs/New Balance/Hoka) turned off your muscles → HF Flow' },
    { ids: ['9(a)', '39(a)', '50(a)', '77(a)', '91(a)'], layer: 'Angle', v: false, start: 'Retail worker 20+ yrs, then daughter sends a specialist’s article that explains the real root cause → HF Stride does "three things" (edema/second-heart, balance, weak ankles variants)' },
    { ids: ['6(a)'], layer: 'Angle', v: false, start: 'If your second toe is longer than your big toe (Morton’s toe) you’ve bought the wrong shoes your whole life → HF Cloud is shaped for your actual foot structure' },
    { ids: ['12(a)', '26(a)', '37(a)'], layer: 'Angle', v: false, start: 'Watch what happens to this woman’s feet within seconds → week 3 when she switches (hammer toes / fear of falling / swollen ankles — HF Cloud/Stride transformation)' },
    { ids: ['28(a)', '64(a)'], layer: 'Angle', v: false, start: 'What 14 days in HF Cloud does to your feet, day-by-day (generic / plantar fasciitis framing)' },
    { ids: ['48(a)', '52(a)', '66(a)', '73(a)'], layer: 'Angle', v: false, start: 'What 4 weeks in HF Stride does to your body, week-by-week (feet "waking up", muscles re-firing)' },
    { ids: ['62(a)'], layer: 'Angle', v: false, start: 'My doctor said I’d have foot pain forever — here’s my 4-week recovery, first-person (undoing years of tight shoes)' },
    { ids: ['13(a)'], layer: 'Angle', v: false, start: 'We need to publicly apologize — we "lied": the shoes are this good, and now it’s up to 50% off (grab a couple as gifts)' },
    { ids: ['16(a)'], layer: 'Angle', v: false, start: 'Last call — still thinking about those barefoot shoes everyone raves about? Up to 50% off right now' },
    { ids: ['17(a)', '42(a)', '72(a)', '79(a)'], layer: 'Angle', v: false, start: 'We challenged 100 people to ditch their cushioned shoes for 30 days — shocking discovery, week-1/2/4 transformation (balance / extra weight / knee pain; Margaret/Edna)' },
    { ids: ['19(a)', '90(a)'], layer: 'Angle', v: false, start: 'The strange reason your shoes make you fall — my mom’s decline & kitchen fall; a specialist showed feet are sensory organs → HF Stride' },
    { ids: ['20(a)'], layer: 'Angle', v: false, start: 'This is the shoe you can put on without bending down — the first hands-free barefoot shoe, and why it’s changing lives' },
    { ids: ['22(a)', '31(a)', '87(a)'], layer: 'Angle', v: false, start: 'I didn’t realize how much my shoes affected how I stand & walk until I switched — zero-drop = grounded & stable (posture UGC)' },
    { ids: ['24(a)', '33(a)'], layer: 'Angle', v: false, start: 'Nobody told heavier people their $150 shoes are designed for someone half their weight — a durability test on 5 people over 180/220 lb → HF Stride held firm (women/men)' },
    { ids: ['29(a)'], layer: 'Angle', v: false, start: 'I just got hired at Hike and I’m already thinking of leaving after what I heard — insider reveals the last-day winter sale, up to 50% off' },
    { ids: ['30(a)'], layer: 'Angle', v: false, start: 'What if hammer toes have nothing to do with orthotics/surgery? They’re a mechanical problem your shoes created → HF Cloud lets them straighten' },
    { ids: ['34(a)', '40(a)'], layer: 'Angle', v: false, start: 'Warehouse-insider on break — we’re drowning in HF Stride inventory, clearing it at the lowest price ever before new stock arrives' },
    { ids: ['35(a)'], layer: 'Angle', v: false, start: 'Gratitude hook — "to this podiatrist, I’m gonna give you the biggest hug"; not all barefoot shoes are equal, HF Cloud beats Vivo/Xero for true foot freedom' },
    { ids: ['38(a)'], layer: 'Angle', v: false, start: 'Scripted skit — Grandma can’t walk the pumpkin-patch trail with her grandson; a friend shows her HF Flow ("I stopped putting my feet in a cast") and she walks the mile' },
    { ids: ['41(a)', '54(a)', '69(a)'], layer: 'Angle', v: false, start: 'Assisted-living owner / doctor long VSL — the first fall is a countdown (70% → second fall); it’s proprioceptive loss, not aging; Frank’s 12-week recovery → HF Stride' },
    { ids: ['47(a)', '56(a)'], layer: 'Angle', v: false, start: 'Nursing-home-fear long VSL — a single fall sends 3 of 4 people to assisted living; sensory deprivation at the feet, biomechanics-researcher breakthrough → HF Stride' },
    { ids: ['43(a)'], layer: 'Angle', v: false, start: 'Physical therapist answers 13 questions about balance your doctor won’t — proprioception, why supportive shoes fail → HF Stride' },
    { ids: ['44(a)'], layer: 'Angle', v: false, start: 'Do your knees angle inward? Knock-knees — Linda’s knee pain was really her collapsing feet → HF Stride straightened her knee tracking' },
    { ids: ['49(a)'], layer: 'Angle', v: false, start: 'A week in the life in my hikes — morning walk shoe + the new Valenza dress shoe, four outfits, zero foot pain (lifestyle/line-extension)' },
    { ids: ['51(a)'], layer: 'Angle', v: false, start: 'Slip-on shoes built for middle-aged & older MEN done fighting with their feet every day (men’s showcase)' },
    { ids: ['55(a)'], layer: 'Angle', v: false, start: 'As a podiatrist, everyone should wear barefoot shoes at some point — quick intro to HF Flow' },
    { ids: ['57(a)'], layer: 'Angle', v: false, start: 'Rhyming VSL — in Korea women walk into their 90s without fear; a 400-yr grandmother’s secret is in the feet, not the knees → HF Stride' },
    { ids: ['58(a)'], layer: 'Angle', v: false, start: 'Dorothy’s kitchen cam, 6 months ago vs today — told she needed a $2,000 walker, researched instead, found HF Stride, cancelled the walker' },
    { ids: ['59(a)'], layer: 'Angle', v: false, start: 'Personified feet skit — your toes, foot muscles, heel and soles each complain about what your shoes do to them → HF Stride gives them everything at once' },
    { ids: ['60(a)'], layer: 'Angle', v: false, start: '7 reasons everyone’s obsessed with these barefoot shoes for seniors ("took 10 years off my age")' },
    { ids: ['61(a)'], layer: 'Angle', v: false, start: 'Pregnancy — 3rd trimester, couldn’t reach my feet to put shoes on; the first hands-free barefoot shoe let me step in and keep walking (BOGO)' },
    { ids: ['63(a)', '97(a)'], layer: 'Angle', v: false, start: 'HF Bare barefoot SANDALS — thin sole lets damaged nerves feel the ground / all-day summer comfort for older folks (neuropathy / general)' },
    { ids: ['67(a)', '98(a)'], layer: 'Angle', v: false, start: 'Five signs your shoes are making your SCIATICA worse — proprioceptive suppression + pelvis tilt crush the nerve → HF Flow (symptom checklist)' },
    { ids: ['68(a)', '82(a)', '92(a)'], layer: 'Angle', v: false, start: 'The 4 shoes crushing your SCIATIC nerve (Crocs/NB/Brooks/Hoka) — raised heel tilts the pelvis onto the disc → HF Flow (PT / Sergeant Earl rundown)' },
    { ids: ['75(a)', '80(a)', '96(a)'], layer: 'Angle', v: false, start: 'Barefoot-curious / cramped-toes showcase — didn’t get the hype until I tried them; wide toe box so your feet stop being squeezed (UGC)' },
    { ids: ['78(a)'], layer: 'Angle', v: false, start: 'My dad hid his knee pain for years (waited in the car, took the elevator) — his cushioned raised-heel shoes were the cause → HF Flow' },
    { ids: ['81(a)'], layer: 'Angle', v: false, start: 'Cancer survivor testimonial — chemo gave her neuropathy & balance loss (fell down stairs); HF let her walk 3 miles pain-free, owns 15 pairs (authentic long UGC)' },
    { ids: ['83(a)'], layer: 'Angle', v: false, start: 'The "cloud walking" trend taking over senior walking groups — Sarah showed up in these, now the whole group switched → HF Cloud' },
    { ids: ['88(a)'], layer: 'Angle', v: false, start: 'I’ve lived with neuropathy for years — here’s what finally helped: wide toe box + circulation → less burning/tingling (HF Cloud testimonial)' },
    { ids: ['89(a)'], layer: 'Angle', v: false, start: 'My dad waited in the car during family hikes — so we built HF Stride; word spread, we made too many → clearance (dad-story + overproduction)' },
    // ---- Angle CANDIDATES (YHJ) ----
    { ids: ['68(a)', '82(a)', '92(a)', '67(a)', '98(a)'], layer: 'Angle (candidate)', v: false, start: 'All sciatica ads as one angle', note: 'NOT fully merged — 67/98 are the 5-SIGNS symptom checklist; 68/82/92 are the 4-SHOES rundown. Same sciatica→HF Flow premise, distinct executions, so two angles.' },
    { ids: ['41(a)', '54(a)', '69(a)', '47(a)', '56(a)'], layer: 'Angle (candidate)', v: false, start: 'All long fall-cascade VSLs as one angle', note: 'NOT merged — 41/54/69 is the "first fall is a countdown"/Frank narrative; 47/56 is the "sensory deprivation"/John-Blackson narrative. Same science, distinct stories.' },
    { ids: ['3(a)', '70(a)', '1(a)', '7(a)', '18(a)', '23(a)'], layer: 'Angle (candidate)', v: false, start: 'All podiatrist "worst shoes" rundowns as one angle', note: 'NOT merged — 1/7/18/23 target BALANCE → HF Stride; 3/70 target NEUROPATHY → HF Cloud. Same rundown device, different problem+product.' },
    { ids: ['2(a)', '4(a)', '10(a)', '36(a)', '45(a)'], layer: 'Angle (candidate)', v: false, start: 'All scored comparison listicles as one angle', note: 'Kept split by the problem each one hooks on (knee pain / fall prevention / women-60+ / nurses). Same scorecard device, distinct ICP premise per ad.' },
    // ---- Junk (YHJ) ----
    { ids: ['86(a)'], layer: 'Angle (junk)', v: false, start: 'No usable transcript — "Pottery Barn" outro bleed, no product copy', note: 'Mis-captured audio; no real hook/angle. Logged so every ad is accounted for.' },

    // ---- LAYER 1 — HOOK (YHJ, verbatim openings) ----
    { layer: 'Hook', v: true, start: 'Here are four shoes I would never recommend' }, // 1,7,23
    { layer: 'Hook', v: true, start: 'We compared Skechers, Brooks, Hoka, Asics,' }, // 2
    { layer: 'Hook', v: true, start: 'I’m a podiatrist. Here are 4 shoes I would never recommend to my patients with neuropathy.' }, // 3
    { layer: 'Hook', v: true, start: 'We analyzed the top five fall prevention shoes.' }, // 4
    { layer: 'Hook', v: true, start: 'I just got back from two years in Italy and everyone keeps asking me how I fixed my feet.' }, // 5
    { layer: 'Hook', v: true, start: 'If your second toe is longer than your big toe, you’ve been buying the wrong shoes your entire life.' }, // 6
    { layer: 'Hook', v: true, start: 'This is the equipment you were issued the day you were born' }, // 8
    { layer: 'Hook', v: true, start: 'The best way to fix chronic swelling is to rest more, right?' }, // 9,91
    { layer: 'Hook', v: true, start: 'We reviewed five of the most popular shoes' }, // 10,15
    { layer: 'Hook', v: true, start: 'I came to Dix to rate the most popular shoes women over 60 are actually buying for balance.' }, // 11
    { layer: 'Hook', v: true, start: 'This 65-year-old woman struggling with hammer toes' }, // 12
    { layer: 'Hook', v: true, start: 'We need to publicly apologize to anyone' }, // 13
    { layer: 'Hook', v: true, start: 'HOKA 1? 4 out of 10.' }, // 14
    { layer: 'Hook', v: true, start: 'This is your last call if you’ve been thinking' }, // 16
    { layer: 'Hook', v: true, start: 'Watch what happened when we challenged seniors struggling with balance to ditch their supportive' }, // 17
    { layer: 'Hook', v: true, start: 'Here are the most recommended shoes for balance problems right now, and as a podiatrist, I' }, // 18
    { layer: 'Hook', v: true, start: 'The strange reason why your shoes are making you more likely to fall,' }, // 19,90
    { layer: 'Hook', v: true, start: 'This is the shoe you can put on without bending down,' }, // 20
    { layer: 'Hook', v: true, start: 'Lens Primal 2? 4 out of 10.' }, // 21
    { layer: 'Hook', v: true, start: 'Nobody told heavier women that the shoes they’re spending $150 on' }, // 24
    { layer: 'Hook', v: true, start: 'Limbs Primal 2. 4 out of 10.' }, // 25
    { layer: 'Hook', v: true, start: 'This 65-year-old woman who is afraid of falling' }, // 26
    { layer: 'Hook', v: true, start: 'Lems Primal, 4 out of 10,' }, // 27
    { layer: 'Hook', v: true, start: 'Here’s what happens to your feet after 14 days in HF Cloud.' }, // 28
    { layer: 'Hook', v: true, start: 'I just got hired at Hike Footwear, and I’m already thinking about leaving this company' }, // 29
    { layer: 'Hook', v: true, start: 'What if the solution to hammer toes has nothing to do with orthotics, spacers, or surgery?' }, // 30
    { layer: 'Hook', v: true, start: 'The shoe industry has been getting away with this for 40 years.' }, // 32
    { layer: 'Hook', v: true, start: 'If you’re a bigger guy, this one’s for you.' }, // 33
    { layer: 'Hook', v: true, start: 'Okay, I’m on my break, so I have like two minutes.' }, // 34
    { layer: 'Hook', v: true, start: 'when I find you, I’m gonna give you the biggest hug ever' }, // 35
    { layer: 'Hook', v: true, start: 'Before you buy shoes for balance problems, you need to see this ranking.' }, // 36
    { layer: 'Hook', v: true, start: 'A woman with swollen ankles steps into HF Stride shoes instead of her compression socks.' }, // 37
    { layer: 'Hook', v: true, start: 'Grandma, come on, the trail is right there.' }, // 38
    { layer: 'Hook', v: true, start: 'The best way to fix poor balance is to rest more, right?' }, // 39
    { layer: 'Hook', v: true, start: 'I could get fired for this, but Hike Footwear is practically giving away shoes right now,' }, // 40
    { layer: 'Hook', v: true, start: 'Every time a senior falls twice, my business grows.' }, // 41
    { layer: 'Hook', v: true, start: 'Watch what happened when we challenged 100 people' }, // 42
    { layer: 'Hook', v: true, start: 'I’m a physical therapist, here are 13 questions about balance problems' }, // 43
    { layer: 'Hook', v: true, start: 'Do your knees angle inward instead of straight ahead?' }, // 44
    { layer: 'Hook', v: true, start: 'After analyzing the top five nursing shoes,' }, // 45
    { layer: 'Hook', v: true, start: 'Okay, so I am at Dick’s right now and I am rating the most popular shoes' }, // 46
    { layer: 'Hook', v: true, start: 'My best friend, John Blackson, 78, had a bad fall in his bathroom.' }, // 47
    { layer: 'Hook', v: true, start: 'You wouldn’t believe what HF Stride do to your body after 30 days.' }, // 48
    { layer: 'Hook', v: true, start: 'Okay, so a week in the life with my hikes.' }, // 49
    { layer: 'Hook', v: true, start: 'Elevating your legs is the best way to relieve edema, right?' }, // 50
    { layer: 'Hook', v: true, start: 'These slip-on shoes are built for middle-aged and older men who are done fighting with their feet' }, // 51
    { layer: 'Hook', v: true, start: 'Here’s what happens to your body after just four weeks in HF Stride shoes.' }, // 52,73
    { layer: 'Hook', v: true, start: 'Sketcher’s Hands Free Slip-Ins 3 out of 10' }, // 53
    { layer: 'Hook', v: true, start: 'Most doctors won’t tell you this, but falling after 70 has nothing to do with bad luck,' }, // 54,69
    { layer: 'Hook', v: true, start: 'I’m sure you wear at least one of these.' }, // 55
    { layer: 'Hook', v: true, start: 'Here’s how your body forgets how to walk properly,' }, // 56
    { layer: 'Hook', v: true, start: 'In Korea, we walk into our 90s without fear' }, // 57
    { layer: 'Hook', v: true, start: 'This is Dorothy’s kitchen cam from six months ago and this is today.' }, // 58
    { layer: 'Hook', v: true, start: 'Stop cramming us in! You’re crushing us!' }, // 59
    { layer: 'Hook', v: true, start: 'I didn’t believe a pair of barefoot shoes could take 10 years off my age' }, // 60
    { layer: 'Hook', v: true, start: 'I sat on the bed and cried, third trimester.' }, // 61
    { layer: 'Hook', v: true, start: 'My doctor told me I’d have to live with foot pain forever,' }, // 62
    { layer: 'Hook', v: true, start: 'Why neuropathy patients who wear these sandals' }, // 63
    { layer: 'Hook', v: true, start: 'This is how HF Cloud helps plantar fasciitis in just 14 days.' }, // 64
    { layer: 'Hook', v: true, start: 'I spent three months comparing every shoe doctor’s swear by.' }, // 65
    { layer: 'Hook', v: true, start: 'What four weeks in HF Stride actually does to your body.' }, // 66
    { layer: 'Hook', v: true, start: 'Five signs your shoes are making your sciatica worse.' }, // 67,98
    { layer: 'Hook', v: true, start: 'Same shoe, same sidewalk, same morning, folks.' }, // 68
    { layer: 'Hook', v: true, start: 'If your feet feel like they’re on fire, or you’re walking on pins and needles,' }, // 70
    { layer: 'Hook', v: true, start: 'My husband sent me this the morning after I fell in the kitchen.' }, // 71
    { layer: 'Hook', v: true, start: 'Watch what happened when we challenged seniors struggling\n    with knee pain to ditch their cushioned shoes for 30 days.' }, // 72
    { layer: 'Hook', v: true, start: 'Let’s rank the worst shoe soles elderly people could ever wear.' }, // 74
    { layer: 'Hook', v: true, start: 'I didn’t understand the hype around barefoot shoes until I actually put these on my feet.' }, // 75
    { layer: 'Hook', v: true, start: 'If your feet hurt, stop scrolling because I’m going to show you the three shoes making it worse.' }, // 76
    { layer: 'Hook', v: true, start: 'The number one way to prevent ankle rolls' }, // 77
    { layer: 'Hook', v: true, start: 'Bad knees are wear and tear.' }, // 78
    { layer: 'Hook', v: true, start: 'We gave 100 seniors with knee pain a pair of HF Stride.' }, // 79
    { layer: 'Hook', v: true, start: 'What if I told you the reason your feet hurt all day is because they’re cramped in your shoes?' }, // 80
    { layer: 'Hook', v: true, start: 'Listen to this powerful cancer survivor’s story and how some shoes changed her life.' }, // 81
    { layer: 'Hook', v: true, start: 'Right now, over 8 million Americans are living with sciatica.' }, // 82,92
    { layer: 'Hook', v: true, start: 'The new cloud walking trend that’s taking over senior walking groups this winter?' }, // 83
    { layer: 'Hook', v: true, start: 'I moved to Japan at 62 with bad feet.' }, // 84
    { layer: 'Hook', v: true, start: 'My daughter sent me this right after she saw me almost fall reaching for the mailbox.' }, // 85
    { layer: 'Hook', v: true, start: 'One of my favorite things about these shoes is how easy they are to slip off and slip on and go.' }, // 87
    { layer: 'Hook', v: true, start: 'I’ve been living with neuropathy for years.' }, // 88
    { layer: 'Hook', v: true, start: 'My dad used to wait in the car during family hikes because his feet hurt too much to walk with us.' }, // 89
    { layer: 'Hook', v: true, start: 'I lived in Italy for two years at 62.' }, // 93
    { layer: 'Hook', v: true, start: 'I lived in Japan for two years for work.' }, // 94
    { layer: 'Hook', v: true, start: 'I moved to Italy at 62 with bad feet.' }, // 95
    { layer: 'Hook', v: true, start: 'These might look a little different than your normal sneakers, but that’s exactly the point.' }, // 96
    { layer: 'Hook', v: true, start: 'These sandals became a hit with older folks and here’s why.' }, // 97

    // ---- LAYER 3 — UNIQUE MECHANISM (YHJ-specific, brand-recurring causal) ----
    { layer: 'Unique mechanism', v: true, start: 'The bottom of each foot is packed with over 200,000 nerve endings.', end: 'your brain flies blind.', note: 'Fall cascade: 200,000 nerve endings scream spatial data to the brain; blocked → the brain flies blind (proprioceptive loss)' },
    { layer: 'Unique mechanism', v: true, start: 'Industry estimates suggest the average comfort shoe blocks 90% of the signal', end: 'send to your brain.', note: 'The average comfort shoe blocks ~90% of the ground signal your feet send the brain' },
    { layer: 'Unique mechanism', v: true, start: 'our feet and calves are like a second heart.', end: 'swelling builds.', note: 'Second heart: feet & calves pump blood back up; stiff rigid shoes freeze it → blood pools, fluid leaks, swelling (edema)' },
    { layer: 'Unique mechanism', v: true, start: 'the raised heels on those shoes', end: 'right on top of your sciatic nerve.', note: 'Sciatica: raised heel tips the pelvis forward → lumbar discs driven onto the sciatic nerve' },
    { layer: 'Unique mechanism', v: true, start: 'Your toes are supposed to spread wide when you stand.', end: 'A tripod.', note: 'Tripod base: big toe, little toe, heel = three-point stable base; narrow shoes crush it to a pencil point' },
    { layer: 'Unique mechanism', v: true, start: 'No raised heel shifting stress onto your knees.', end: 'instead of constantly compensating.', note: 'Knee chain: zero-drop → no stress onto the knees; flexible sole → knees track properly instead of compensating' },

    // ---- LAYER 4 — CTA / OFFER (YHJ) ----
    { layer: 'CTA', v: true, start: 'two pairs for 43% off each', end: 'money\n    back guarantee.', note: 'Foreign-secret offer: two pairs 43% off each + free shipping + 30-day money-back' },
    { layer: 'CTA', v: true, start: '49% off plus free shipping.', note: 'Fall-VSL offer: 49% off + free shipping (+ 30-day guarantee)' },
    { layer: 'CTA', v: true, start: '$69.95 instead of $140 with free shipping', note: 'Sergeant offer: half off — $69.95 vs $140' },
    { layer: 'CTA', v: true, start: 'Right now, HF Stride is doing buy one, get one free.', note: 'Pregnancy BOGO close' },

    // ---- LAYER 5 — AVATAR (YHJ) ----
    { ids: ['5(a)', '8(a)', '33(a)', '51(a)', '93(a)', '95(a)'], layer: 'Avatar', v: false, start: 'Men — middle-aged & older with foot pain ("Italian/Japanese men", bigger guys, done fighting their feet)' },
    { ids: ['61(a)'], layer: 'Avatar', v: false, start: 'Pregnant women (3rd trimester — swollen feet, can’t bend to put shoes on)' },
    { ids: ['45(a)'], layer: 'Avatar', v: false, start: 'Nurses on 12-hour hospital shifts' },
    { ids: ['65(a)'], layer: 'Avatar', v: false, start: 'Women with osteoporosis / fragile bones' },
    { ids: ['67(a)', '68(a)', '82(a)', '92(a)', '98(a)'], layer: 'Avatar', v: false, start: 'Sciatica / chronic lower-back-pain sufferers' },
    { ids: ['3(a)', '63(a)', '70(a)', '81(a)', '88(a)'], layer: 'Avatar', v: false, start: 'Neuropathy sufferers (burning/tingling/numbness — incl. chemo-induced)' },
    { ids: ['24(a)', '33(a)'], layer: 'Avatar', v: false, start: 'Heavier / plus-size adults (180–220+ lb) whose shoes collapse under their weight' },
    { ids: ['41(a)', '47(a)', '54(a)', '56(a)', '58(a)', '69(a)'], layer: 'Avatar', v: false, start: 'Seniors terrified of the "second fall" → nursing home / losing independence' },
    { layer: 'Avatar', v: true, start: 'I am Sergeant Earl.', note: 'Persona: Sergeant Earl, 30-yr army veteran' },
    { layer: 'Avatar', v: true, start: 'I run an assisted living facility.', note: 'Persona: assisted-living facility owner (15 yrs)' },
    { layer: 'Avatar', v: true, start: 'My colleague Marco is 68', note: 'Persona: American researcher abroad; local colleague in their 60s–70s (Marco / Sophia / Keiko)' },

    // ---- LAYER 6 — PROBLEM (YHJ) ----
    { layer: 'Problem', v: true, start: 'that shooting pain down your leg', end: 'into your leg.', note: 'Sciatica: shooting pain from the lower back down the hip into the leg on standing' },
    { layer: 'Problem', v: true, start: 'By noon, my feet felt like', end: 'overfilled balloons.', note: 'Edema: feet filled with wet concrete by noon, ankles like overfilled balloons' },
    { layer: 'Problem', v: true, start: 'Once you have your first fall, there', end: 'within a year.', note: '70% chance of a second fall within a year (fall statistic)' },
    { layer: 'Problem', v: true, start: 'wincing on stairs, dreading every step, and popping ibuprofen', note: 'Knee pain: wincing on stairs, popping ibuprofen to get through the day' },
    { layer: 'Problem', v: true, start: 'The burning, the tingling, the numbness.', note: 'Neuropathy: burning, tingling, numbness' },
    { layer: 'Problem', v: true, start: 'gripping furniture,', end: 'fear of falling.', note: 'Balance: gripping furniture, second-guessing every step, constant fear of falling' },

    // ---- LAYER 7 — DESIRE (YHJ) ----
    { layer: 'Desire', v: true, start: 'walking freely again.', note: 'Walking freely again (no cart / no wall)' },
    { layer: 'Desire', v: true, start: 'I feel like me.', note: 'Feel like myself again' },
    { layer: 'Desire', v: true, start: 'back walking to the mailbox alone, back feeling like herself.', note: 'Back to the mailbox alone, feeling like herself' },
    { layer: 'Desire', v: true, start: 'take real walks again,', note: 'Take real walks again with my husband' },

    // ---- LAYER 8 — REPEATED MESSAGING (YHJ spine) ----
    { layer: 'Repeated messaging', v: true, start: 'over 200,000 nerve endings', note: '200,000 nerve endings in the soles (proprioception spine)' },
    { layer: 'Repeated messaging', v: true, start: 'Their last restock sold out in 72 hours.', note: 'Scarcity: small company, last restock sold out in 72 hours' },
    { layer: 'Repeated messaging', v: true, start: 'Do not buy random barefoot shoes off Amazon.', note: 'Knockoff warning (long fall VSLs)' },
    { layer: 'Repeated messaging', v: true, start: 'sole is 4.5 millimeters thick.', note: '4.5mm sole spec (long VSLs)' },
    { layer: 'Repeated messaging', v: true, start: 'over 2.4 million', note: 'Social proof: over 2.4 million (men / pairs)' },
  ],
};
