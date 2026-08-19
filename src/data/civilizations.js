export const CIVILIZATIONS = [
  {
    id: "first-hearth",
    name: "The First Hearth",
    era: "Prehistory",
    year: "12,000 BC",
    slogan: "Before cities, there was fire.",
    image: "civilizations/first-hearth.jpg",
    weather: "embers",
    palette: { fog: "#1c140c", light: "#e8b86d", ambient: 0x6b4423 },
    music: { tempo: 50, base: 98, scale: [0, 3, 5, 7, 10], wave: "sine", filter: 520 },
    ambient: ["wind", "fire", "birds", "river"],
    overview:
      "A river-band of eighty souls keeps the first permanent fire in this valley. Winter is coming. The herds have thinned. What the Architect chooses now will be told in smoke and bone.",
    stats: { people: 86, stability: 44, prosperity: 27, knowledge: 14, arms: 23, culture: 19 },
    chapters: [
      {
        id: "winter",
        title: "The Hunger Moon",
        year: "12,000 BC — Late Autumn",
        report:
          "Frost arrived two weeks early. The aurochs turned north. Children cough by the river and the stored nuts will not last until first thaw. Scouts report another band two valleys west, hungry and armed with new spears. The elders wait for the Architect's directive.",
        choices: [
          {
            id: "stay",
            label: "Keep the Hearth",
            summary: "Winter in place. Ration. Guard the fire.",
            effects: { stability: 8, prosperity: -6, knowledge: 3, arms: 2 },
            consequence:
              "The band endures a bitter season. Three elders are lost, but the fire never dies. Children learn the names of every root that can be eaten under snow.",
          },
          {
            id: "follow",
            label: "Follow the Herds",
            summary: "Break camp and walk with the aurochs.",
            effects: { people: -8, prosperity: 7, arms: 4, stability: -4 },
            consequence:
              "The walk is cruel. Two families vanish in a white squall. Those who arrive at the southern graze eat meat again, and the fire is rebuilt on a new ridge.",
          },
          {
            id: "raid",
            label: "Take the Western Cache",
            summary: "Strike the other band at dawn.",
            effects: { arms: 10, culture: -8, people: -6, prosperity: 8, stability: -6 },
            consequence:
              "The raid succeeds. Meat and flints are taken. The survivors of the other band vanish into the forest. Their absence will be remembered.",
          },
        ],
      },
      {
        id: "stranger",
        title: "The Stranger's Ember",
        year: "11,998 BC — Spring",
        report:
          "A lone traveler arrives with a clay bowl of living coals that burn bluer than the hearth. She will not say where she learned this. The band is divided: gift, theft, or refusal.",
        choices: [
          {
            id: "welcome",
            label: "Seat Her at the Fire",
            summary: "Share food. Learn the blue coal.",
            effects: { knowledge: 12, culture: 8, stability: 4 },
            consequence:
              "She stays a season. The band learns to keep fire in clay. Nights grow longer with talk. A new craft is born.",
          },
          {
            id: "refuse",
            label: "Send Her On",
            summary: "Protect the old ways.",
            effects: { stability: 6, knowledge: -2, culture: 2 },
            consequence:
              "The stranger leaves without anger. The old fire remains sacred. Years later, distant smoke of a stranger color is seen on the western ridge.",
          },
          {
            id: "seize",
            label: "Seize the Bowl",
            summary: "Take the secret by force.",
            effects: { knowledge: 6, culture: -10, arms: 3, stability: -5 },
            consequence:
              "The bowl is taken. The traveler's curse is only a look. The blue coal dies within a month. No one can light it again.",
          },
        ],
      },
      {
        id: "cave",
        title: "The Cave of Hands",
        year: "11,995 BC — High Summer",
        report:
          "Hunters find a deep cave whose walls already hold red handprints. Some say the dead live there. Some say it is a place to teach children the story of the band. The river is loud this year.",
        choices: [
          {
            id: "paint",
            label: "Paint the Hunt",
            summary: "Make the cave a living memory.",
            effects: { culture: 14, knowledge: 6, stability: 3 },
            consequence:
              "Aurochs, rivers, and the first fire are painted in iron earth. Children press their hands beside their parents. History acquires a room.",
          },
          {
            id: "forbid",
            label: "Seal the Mouth",
            summary: "Leave the dead unbothered.",
            effects: { stability: 5, culture: -4, knowledge: -3 },
            consequence:
              "Stones are rolled. The cave becomes a warning. Fear keeps the band close, but no one learns what the walls might have taught.",
          },
          {
            id: "tomb",
            label: "Bury the Elders Within",
            summary: "Make it a house of the dead.",
            effects: { culture: 7, stability: 2, people: -2 },
            consequence:
              "The cave becomes sacred ground. Mourning rites lengthen. The living speak more carefully of those who came before.",
          },
        ],
      },
      {
        id: "flood",
        title: "The Long Flood",
        year: "11,990 BC — The Drowned Year",
        report:
          "The river climbs the banks and does not recede. Fish fill the tents. The hearth is in danger of drowning. This is the last chapter of the demonstration: the Architect must decide how a people persist.",
        choices: [
          {
            id: "uphill",
            label: "Carry the Fire Uphill",
            summary: "Abandon the valley floor.",
            effects: { stability: 8, prosperity: -4, people: 4 },
            consequence:
              "The new camp overlooks a reshaped world. The valley becomes marsh and plenty. The First Hearth survives as a ridge people.",
          },
          {
            id: "weirs",
            label: "Build Weirs",
            summary: "Work the water instead of fleeing it.",
            effects: { knowledge: 10, prosperity: 8, arms: -3, stability: -2 },
            consequence:
              "Reed weirs and raised floors keep the band in place. They become fishers as much as hunters. A new economy is born from disaster.",
          },
          {
            id: "split",
            label: "Split the Band",
            summary: "Send half upriver. Keep half by the old fire.",
            effects: { people: 6, culture: 6, stability: -8 },
            consequence:
              "Two hearths now burn. They will meet again as cousins, or as strangers. The demonstration closes on a divided, living people.",
          },
        ],
      },
    ],
  },
  {
    id: "sothara",
    name: "Sothara",
    era: "Ancient World",
    year: "2686 BC",
    slogan: "The river writes the calendar.",
    image: "civilizations/sothara.jpg",
    weather: "dust",
    palette: { fog: "#2a1d12", light: "#e0c07a", ambient: 0x8a5a2b },
    music: { tempo: 64, base: 130, scale: [0, 2, 5, 7, 9, 10], wave: "triangle", filter: 900 },
    ambient: ["river", "market", "birds", "wind"],
    overview:
      "Sothara is a river kingdom of canals, reed boats, and a stepped temple that measures the flood. The Architect sits above a priesthood and a hungry delta.",
    stats: { people: 42000, stability: 58, prosperity: 61, knowledge: 47, arms: 40, culture: 55 },
    chapters: [
      {
        id: "nilometer",
        title: "The False Flood",
        year: "2686 BC — Season of Inundation",
        report:
          "The temple's water-stair predicted a generous flood. The river arrived thin. Granaries are already promised to the workmen of the new quay. Priests blame the stars. Farmers blame the priests.",
        choices: [
          {
            id: "priests",
            label: "Uphold the Temple Calendar",
            summary: "The fault is in men, not in heaven.",
            effects: { culture: 6, stability: -8, knowledge: -4, prosperity: -5 },
            consequence:
              "Ritual is preserved. Bread riots last nine days. The Architect's name is sung in the temple and cursed on the levees.",
          },
          {
            id: "farmers",
            label: "Open the Royal Granaries",
            summary: "Feed the delta first.",
            effects: { stability: 10, prosperity: -7, culture: -3, people: 4 },
            consequence:
              "Hunger breaks. The priesthood loses a measure of awe. Sothara learns that the river can be wrong, and a ruler can be right.",
          },
          {
            id: "both",
            label: "Recount the Stars and the Soil",
            summary: "Reform the calendar in public.",
            effects: { knowledge: 12, stability: 4, culture: 3, prosperity: -3 },
            consequence:
              "Scribes and farmers walk the water-stair together. A new inundation table is cut in stone. Authority becomes a shared instrument.",
          },
        ],
      },
      {
        id: "throne",
        title: "The Reed Throne",
        year: "2684 BC — Court of the Two Banks",
        report:
          "The heir is a child. A general of the desert garrison and a high priest both offer to serve as Voice of the Throne. The canals still need repair.",
        choices: [
          {
            id: "general",
            label: "Name the General as Voice",
            summary: "Order first. Doctrine later.",
            effects: { arms: 12, stability: 6, culture: -6, knowledge: -3 },
            consequence:
              "The garrison is paid. Bandits leave the caravan roads. The temple waits, quietly, for a longer game.",
          },
          {
            id: "priest",
            label: "Name the Priest as Voice",
            summary: "Legitimacy is a kind of water.",
            effects: { culture: 10, knowledge: 5, arms: -6, stability: 3 },
            consequence:
              "Festivals multiply. The army grumbles but is fed. Sothara's identity hardens around rite.",
          },
          {
            id: "council",
            label: "Seat a Council of Both Banks",
            summary: "Neither Voice. Shared ledgers.",
            effects: { stability: 2, knowledge: 7, prosperity: 6, arms: -2 },
            consequence:
              "Decisions slow. Corruption finds new corridors. Yet the child-heir grows up watching adults argue in daylight, which is a form of education.",
          },
        ],
      },
      {
        id: "canal",
        title: "The Broken Canal",
        year: "2681 BC — Dry Season",
        report:
          "A main canal collapses near the foreign quarter. Copper merchants from the north offer to rebuild it in exchange for a permanent dock and their own law on that quay.",
        choices: [
          {
            id: "accept",
            label: "Accept the Northern Dock",
            summary: "Trade now. Law later.",
            effects: { prosperity: 14, knowledge: 5, stability: -7, culture: -4 },
            consequence:
              "The canal is reborn in a season. Sothara becomes richer and less entirely itself. Northern weights appear in the markets.",
          },
          {
            id: "labor",
            label: "Raise a Corvée",
            summary: "Rebuild with Sotharan hands.",
            effects: { stability: -5, culture: 8, arms: 3, prosperity: -4, people: -3 },
            consequence:
              "The work is slow and resented. When the water returns, it is Sotharan water. Songs of the corvée will outlast the Architect.",
          },
          {
            id: "relocate",
            label: "Abandon the Quarter",
            summary: "Cut a new canal through royal land.",
            effects: { knowledge: 6, prosperity: -6, stability: 4, people: -8 },
            consequence:
              "Families are moved. A cleaner line is drawn. Maps change. Some never forgive the straightness of it.",
          },
        ],
      },
      {
        id: "merchants",
        title: "Ships of the Lower Sea",
        year: "2677 BC — Festival of the Green Flood",
        report:
          "Strange long ships appear at the river mouth with tin, lapis, and a request: a treaty of marriage and metals. The demonstration's last choice will set Sothara's horizon.",
        choices: [
          {
            id: "marry",
            label: "Seal the Marriage Treaty",
            summary: "Bind the sea to the river.",
            effects: { prosperity: 10, culture: 8, knowledge: 6, arms: -4 },
            consequence:
              "Sothara becomes a hinge between desert and sea. Its language picks up foreign words the way a flood picks up silt.",
          },
          {
            id: "tribute",
            label: "Demand Tribute, Not Kin",
            summary: "Trade from strength.",
            effects: { arms: 8, prosperity: 6, culture: -5, stability: 3 },
            consequence:
              "The ships pay and leave. Tin arrives in smaller loads. Sothara remains the center of its own story.",
          },
          {
            id: "refuse",
            label: "Close the Mouth",
            summary: "The river is enough.",
            effects: { stability: 7, culture: 4, prosperity: -10, knowledge: -6 },
            consequence:
              "The long ships do not return. Sothara's isolation is serene, and later, expensive. History records a kingdom that chose its own banks.",
          },
        ],
      },
    ],
  },
  {
    id: "jade-mandate",
    name: "The Jade Mandate",
    era: "Ancient World",
    year: "210 BC",
    slogan: "Order is a kind of architecture.",
    image: "civilizations/jade-mandate.jpg",
    weather: "mist",
    palette: { fog: "#0f1c18", light: "#c6d4a8", ambient: 0x2f4a3c },
    music: { tempo: 58, base: 118, scale: [0, 2, 3, 7, 9], wave: "sine", filter: 800 },
    ambient: ["birds", "river", "bells", "wind"],
    overview:
      "A newly unified empire of terraces, canals, and a capital aligned to the pole star. The Architect must decide whether unity is a wall, a book, or a fleet.",
    stats: { people: 5100000, stability: 49, prosperity: 54, knowledge: 62, arms: 71, culture: 60 },
    chapters: [
      {
        id: "unify",
        title: "The Last Rival Court",
        year: "210 BC — Month of Dry Grass",
        report:
          "The southern court still mints its own coin and writes in an older script. Generals want a final campaign. Scholars want a single written language. Merchants want the roads more than the throne.",
        choices: [
          {
            id: "campaign",
            label: "Finish the Campaign",
            summary: "Unity by bronze.",
            effects: { arms: 8, stability: 6, culture: -8, people: -5, prosperity: -6 },
            consequence:
              "The rival court falls in a summer. The empire is one color on the map. Graves are numerous and poorly counted.",
          },
          {
            id: "script",
            label: "Standardize the Script",
            summary: "Unity by brush.",
            effects: { knowledge: 12, culture: 8, stability: 4, arms: -5 },
            consequence:
              "Clerks weep, then comply. Within a generation, an order can travel from capital to delta without a translator. Power becomes paperwork.",
          },
          {
            id: "roads",
            label: "Fund the Great Roads",
            summary: "Unity by distance shortened.",
            effects: { prosperity: 12, stability: 5, knowledge: 4, arms: 3 },
            consequence:
              "Stone and rammed earth stitch the provinces. Armies and ideas move at the same new speed.",
          },
        ],
      },
      {
        id: "wall",
        title: "The Northern Shadow",
        year: "207 BC — First Frost",
        report:
          "Horse peoples test the northern commanderies. A wall has been proposed that would consume a decade of labor. The granaries could instead buy alliances.",
        choices: [
          {
            id: "build",
            label: "Raise the Wall",
            summary: "Make the horizon a fact.",
            effects: { arms: 10, stability: 4, prosperity: -10, people: -6, culture: 3 },
            consequence:
              "The wall grows like a slow sentence. It keeps some dangers out and keeps the empire looking inward.",
          },
          {
            id: "ally",
            label: "Buy the Horse Alliance",
            summary: "Turn raiders into a frontier.",
            effects: { prosperity: -6, arms: 6, culture: 5, stability: -3 },
            consequence:
              "Marriage gifts and grain move north. The border becomes a conversation. Some call it wisdom. Some call it tribute.",
          },
          {
            id: "colonize",
            label: "Plant Military Farms",
            summary: "People the empty belt.",
            effects: { people: 6, prosperity: 4, arms: 5, culture: -3, stability: 2 },
            consequence:
              "Veterans farm the wind. The north becomes a province instead of a fear. Their grandchildren will have a different idea of home.",
          },
        ],
      },
      {
        id: "scholars",
        title: "The Burning Question",
        year: "204 BC — Examination Eve",
        report:
          "A minister proposes that books which contradict the new code be collected. Scholars have gathered in the capital to plead for the old commentaries.",
        choices: [
          {
            id: "burn",
            label: "Collect the Contradictions",
            summary: "One code. One memory.",
            effects: { stability: 8, knowledge: -12, culture: -10, arms: 3 },
            consequence:
              "Smoke over the academies. The code is clearer. History becomes thinner. Later centuries will argue about what was lost.",
          },
          {
            id: "copy",
            label: "Copy Everything into the Imperial Library",
            summary: "Preserve, then rank.",
            effects: { knowledge: 14, culture: 8, prosperity: -4, stability: 2 },
            consequence:
              "Scribes ruin their eyes and save a civilization's arguments. The Mandate becomes a place that remembers even its dissent.",
          },
          {
            id: "exam",
            label: "Open the Examinations Wider",
            summary: "Recruit talent from the provinces.",
            effects: { knowledge: 8, stability: 6, culture: 6, prosperity: 3 },
            consequence:
              "Village prodigies arrive dusty and brilliant. The court changes accent. Power leaks downward in a controlled way.",
          },
        ],
      },
      {
        id: "fleet",
        title: "The Southern Sea",
        year: "199 BC — Typhoon Season",
        report:
          "A southern governor begs for a fleet to protect spice lanes. The treasury can fund ships, a census, or relief after last year's drought — not all three.",
        choices: [
          {
            id: "ships",
            label: "Launch the Fleet",
            summary: "The Mandate looks outward.",
            effects: { arms: 8, prosperity: 10, knowledge: 5, stability: -4 },
            consequence:
              "Sails bloom along the coast. Maps add islands. The empire's center of gravity shifts south by a noticeable degree.",
          },
          {
            id: "census",
            label: "Count Every Hearth",
            summary: "Know the realm before expanding it.",
            effects: { knowledge: 10, stability: 8, prosperity: 4, culture: 2 },
            consequence:
              "The census is resented and invaluable. Tax becomes fairer in some counties, heavier in others. The Architect governs what can be seen.",
          },
          {
            id: "relief",
            label: "Feed the Drought Counties",
            summary: "Keep faith with the interior.",
            effects: { stability: 12, people: 6, prosperity: -8, culture: 4 },
            consequence:
              "Granaries open. Ballads remember a merciful year. The sea waits. The Mandate remains a land empire with a conscience.",
          },
        ],
      },
    ],
  },
  {
    id: "helion-league",
    name: "The Helion League",
    era: "Classical World",
    year: "431 BC",
    slogan: "A city is an argument that learned to build.",
    image: "civilizations/helion-league.jpg",
    weather: "gulls",
    palette: { fog: "#1a2430", light: "#f0e2c4", ambient: 0x6a7d8a },
    music: { tempo: 72, base: 146, scale: [0, 2, 4, 5, 7, 9, 11], wave: "sawtooth", filter: 1200 },
    ambient: ["ocean", "market", "birds", "wind"],
    overview:
      "White marble, a restless assembly, and a harbor of warships. The Helion League is a city that believes it can reason its way through fate.",
    stats: { people: 185000, stability: 52, prosperity: 66, knowledge: 74, arms: 63, culture: 80 },
    chapters: [
      {
        id: "plague",
        title: "Fever in the Long Walls",
        year: "431 BC — Second Summer of the War",
        report:
          "A fever has entered the crowded city. The harbor could be closed. Physicians ask to study the dead. Orators demand festivals to restore morale. The army waits outside the walls for orders.",
        choices: [
          {
            id: "close",
            label: "Close the Harbor",
            summary: "Starve the fever. Starve the city.",
            effects: { people: -8, stability: 6, prosperity: -10, arms: -4 },
            consequence:
              "Ships wait in the roads. The fever slows. Hunger takes its place. Helion learns the cost of a sealed perfection.",
          },
          {
            id: "study",
            label: "Let the Physicians Work",
            summary: "Record, isolate, learn.",
            effects: { knowledge: 14, people: -5, culture: 4, stability: 2 },
            consequence:
              "A treatise is written that later cities will steal. Helion buries many and teaches more.",
          },
          {
            id: "festivals",
            label: "Keep the Festivals",
            summary: "A city that stops singing is already lost.",
            effects: { culture: 10, stability: 4, people: -10, knowledge: -3 },
            consequence:
              "Choruses fill the theaters. The fever fills the same benches. Memory of this year is gorgeous and grim.",
          },
        ],
      },
      {
        id: "ostracism",
        title: "The General's Name",
        year: "429 BC — Assembly Day",
        report:
          "A victorious admiral is accused of delaying a pursuit to spare a cousin's estate. The assembly can exile him, put him on trial, or send him back to sea.",
        choices: [
          {
            id: "exile",
            label: "Ostracize the Admiral",
            summary: "The city is larger than any man.",
            effects: { stability: 5, arms: -8, culture: 4, knowledge: 2 },
            consequence:
              "Shards of pottery decide a career. Rivals cheer. The fleet is less lucky without him.",
          },
          {
            id: "trial",
            label: "Try Him in Daylight",
            summary: "Law over rumor.",
            effects: { knowledge: 6, stability: 3, culture: 5, arms: -2 },
            consequence:
              "Speeches last two days. He is fined, not broken. The League congratulates itself on being civilized, which is sometimes true.",
          },
          {
            id: "sea",
            label: "Send Him Back to Sea",
            summary: "Win the war. Judge later.",
            effects: { arms: 12, stability: -6, culture: -4, prosperity: 4 },
            consequence:
              "A coastal victory follows. So does the sense that merit can outrun law. That sense will matter.",
          },
        ],
      },
      {
        id: "oracle",
        title: "The Split Tongue",
        year: "427 BC — Before the Sicilian Vote",
        report:
          "The oracle's answer is famously unclear: 'The city will find a wider harbor or a wider grave.' Colonists want a western expedition. Farmers want the army home for harvest.",
        choices: [
          {
            id: "west",
            label: "Sail West",
            summary: "A wider harbor.",
            effects: { arms: 6, prosperity: 8, knowledge: 6, stability: -8, people: -4 },
            consequence:
              "The expedition is glorious until it is not. Helion's name travels farther than its supply lines.",
          },
          {
            id: "harvest",
            label: "Call the Army Home",
            summary: "Grain is also strategy.",
            effects: { prosperity: 8, stability: 8, arms: -6, culture: 2 },
            consequence:
              "Barns fill. Allies feel abandoned. The League survives a year that could have ended it.",
          },
          {
            id: "two",
            label: "Split the Fleet",
            summary: "Do both, incompletely.",
            effects: { knowledge: 4, arms: -2, prosperity: 2, stability: -4 },
            consequence:
              "Neither objective is fully met. Helion becomes a lesson in the mathematics of attention.",
          },
        ],
      },
      {
        id: "rival",
        title: "Terms on the Isthmus",
        year: "421 BC — A Cold Spring",
        report:
          "The rival league offers a thirty-year peace if Helion dismantles the long walls or surrenders its western colonies. The demonstration ends in a treaty — or a refusal.",
        choices: [
          {
            id: "walls",
            label: "Dismantle the Long Walls",
            summary: "Trade stone for time.",
            effects: { stability: 6, arms: -12, culture: -6, prosperity: 6 },
            consequence:
              "The walls come down to music. Some call it peace. Some call it a rehearsal for the next war.",
          },
          {
            id: "colonies",
            label: "Cede the West",
            summary: "Keep the city. Lose the horizon.",
            effects: { prosperity: -8, stability: 8, culture: -4, arms: 4 },
            consequence:
              "Colonists feel sold. The harbor is quieter. Helion turns inward and writes better plays.",
          },
          {
            id: "refuse",
            label: "Refuse the Terms",
            summary: "The argument continues.",
            effects: { arms: 8, culture: 8, stability: -6, people: -5 },
            consequence:
              "War resumes with cleaner consciences than it deserves. The League's story does not end; it sharpens.",
          },
        ],
      },
    ],
  },
  {
    id: "blackwood-crown",
    name: "Blackwood Crown",
    era: "Medieval Era",
    year: "1215",
    slogan: "Oaths are architecture made of breath.",
    image: "civilizations/blackwood-crown.jpg",
    weather: "rain",
    palette: { fog: "#12161c", light: "#c9b48a", ambient: 0x3a4248 },
    music: { tempo: 56, base: 110, scale: [0, 2, 3, 7, 8, 10], wave: "triangle", filter: 700 },
    ambient: ["rain", "bells", "horses", "fire"],
    overview:
      "A forest kingdom of castle, cathedral, and strip fields. Barons, abbots, and a young monarch share one crown and several knives.",
    stats: { people: 2100000, stability: 47, prosperity: 42, knowledge: 38, arms: 58, culture: 51 },
    chapters: [
      {
        id: "famine",
        title: "The Wet Harvest",
        year: "1215 — After Lammas",
        report:
          "Rain has ruined the rye. The abbey stores grain. Barons hoard it. Villages look to the crown. A charter of limits has been drafted in the great hall and not yet sealed.",
        choices: [
          {
            id: "abbey",
            label: "Command the Abbey Granaries",
            summary: "Feed the realm. Test the church.",
            effects: { stability: 8, culture: -6, people: 6, prosperity: -3 },
            consequence:
              "Bread appears. Bishops write to distant friends. The crown eats well and sleeps poorly.",
          },
          {
            id: "charter",
            label: "Seal the Charter",
            summary: "Limit the crown to keep the kingdom.",
            effects: { stability: 10, culture: 8, knowledge: 6, arms: -5 },
            consequence:
              "A document becomes a place in history. Barons cheer. The monarch learns to rule through paper and patience.",
          },
          {
            id: "tithe",
            label: "Levy a Famine Tithe on the Barons",
            summary: "Take from those who took.",
            effects: { prosperity: 4, arms: -6, stability: -8, people: 8 },
            consequence:
              "Some granaries open. Some banners quietly change. Winter will decide who was loyal.",
          },
        ],
      },
      {
        id: "succession",
        title: "Two Sons, One Forest",
        year: "1217 — Twelfth Night",
        report:
          "Twin princes have come of age. One is loved by the marches. One is loved by the cathedral. The realm cannot be split like a loaf without blood in the crumbs.",
        choices: [
          {
            id: "elder",
            label: "Crown the Marcher Twin",
            summary: "A king who can ride.",
            effects: { arms: 10, stability: 4, culture: -6, knowledge: -3 },
            consequence:
              "The marches quiet. The cathedral mourns in Latin. Border wars become shorter.",
          },
          {
            id: "learned",
            label: "Crown the Cathedral Twin",
            summary: "A king who can read the realm.",
            effects: { knowledge: 8, culture: 10, arms: -6, stability: 3 },
            consequence:
              "Schools open in market towns. Knights feel ornamental. The forest's law grows more precise.",
          },
          {
            id: "regency",
            label: "A Council Until a Feat is Done",
            summary: "Let one earn what both want.",
            effects: { stability: -4, culture: 6, arms: 4, knowledge: 4 },
            consequence:
              "A contest of deeds begins. It is almost a tournament, and almost a civil war. The demonstration records both.",
          },
        ],
      },
      {
        id: "heresy",
        title: "The Hedge Preacher",
        year: "1220 — Ember Days",
        report:
          "A preacher in the blackwood says salvation needs no bishop. Villages listen. Rome has not yet written. The crown must.",
        choices: [
          {
            id: "silence",
            label: "Arrest the Preacher",
            summary: "Keep the old heaven.",
            effects: { stability: 6, culture: -8, knowledge: -4, arms: 3 },
            consequence:
              "The hedge empties. The idea does not. It waits in kitchens.",
          },
          {
            id: "debate",
            label: "Permit a Disputation",
            summary: "Let doctrine fight in the open.",
            effects: { knowledge: 10, culture: 8, stability: -5 },
            consequence:
              "Scholars and shepherds argue under the same roof. Some minds change. The realm becomes slightly more modern than it intended.",
          },
          {
            id: "protect",
            label: "Take the Preacher into Royal Peace",
            summary: "A crown can also be a shield.",
            effects: { culture: 6, stability: -8, people: 4, knowledge: 3 },
            consequence:
              "The church is furious. The poor are grateful. Blackwood becomes a rumor in every foreign court.",
          },
        ],
      },
      {
        id: "treaty",
        title: "The Ford at Ravenbridge",
        year: "1224 — Campaign Season",
        report:
          "A neighboring kingdom offers peace if Blackwood cedes the ford, joins a holy expedition, or marries its princess to a foreign duke. The last page of this chronicle is a map.",
        choices: [
          {
            id: "ford",
            label: "Cede the Ford",
            summary: "Buy a generation.",
            effects: { stability: 8, arms: -8, prosperity: -4, culture: -3 },
            consequence:
              "The ford changes banners. Merchants adapt. Old soldiers do not.",
          },
          {
            id: "expedition",
            label: "Join the Expedition",
            summary: "Glory abroad, quiet at home.",
            effects: { arms: 8, culture: 6, people: -8, prosperity: -6, knowledge: 4 },
            consequence:
              "Knights leave and some return with relics and fevers. The crown's prestige travels farther than its grain.",
          },
          {
            id: "marriage",
            label: "Seal the Marriage",
            summary: "Make the border a family.",
            effects: { stability: 6, culture: 8, prosperity: 6, arms: -3 },
            consequence:
              "Banners intermarry. The forest kingdom becomes a chapter in a larger house. The demonstration ends at a wedding, which is a kind of treaty.",
          },
        ],
      },
    ],
  },
  {
    id: "vesper-atelier",
    name: "Vesper Atelier",
    era: "Renaissance",
    year: "1519",
    slogan: "Perspective is a moral decision.",
    image: "civilizations/vesper-atelier.jpg",
    weather: "pollen",
    palette: { fog: "#1b1410", light: "#efd3a0", ambient: 0x7a5a38 },
    music: { tempo: 76, base: 156, scale: [0, 2, 4, 5, 7, 9, 11], wave: "square", filter: 1400 },
    ambient: ["market", "bells", "river", "birds"],
    overview:
      "A republic of workshops, a dome unfinished, and bankers who fund beauty the way other states fund cavalry. The Architect is first among patrons.",
    stats: { people: 92000, stability: 61, prosperity: 73, knowledge: 81, arms: 34, culture: 88 },
    chapters: [
      {
        id: "dome",
        title: "The Unfinished Dome",
        year: "1519 — Feast of the Annunciation",
        report:
          "The cathedral dome has cracked. A young engineer proposes a double shell. A rival wants flying buttresses. The bankers will fund only one vision.",
        choices: [
          {
            id: "shell",
            label: "Build the Double Shell",
            summary: "Invent the skyline.",
            effects: { knowledge: 12, culture: 10, prosperity: -6, stability: 3 },
            consequence:
              "Scaffolding becomes a pilgrimage. The dome holds. Other cities send spies with sketchbooks.",
          },
          {
            id: "buttress",
            label: "Raise the Buttresses",
            summary: "Trust the old strength.",
            effects: { stability: 8, culture: 4, knowledge: -4, prosperity: -4 },
            consequence:
              "The cathedral is safer and less astonishing. Conservatives sleep well. History yawns, slightly.",
          },
          {
            id: "pause",
            label: "Pause and Found an Academy",
            summary: "Study before stone.",
            effects: { knowledge: 10, culture: 8, prosperity: -3, arms: -2 },
            consequence:
              "The dome waits. Students do not. Vesper becomes a school that happens to contain a cathedral.",
          },
        ],
      },
      {
        id: "press",
        title: "The Ink Privilege",
        year: "1522 — Midsummer",
        report:
          "A printer asks for a privilege to publish vernacular scripture and cheap anatomies. The bishop objects. Physicians are divided. The street is already reading pamphlets.",
        choices: [
          {
            id: "privilege",
            label: "Grant the Privilege",
            summary: "Let ink outrun permission.",
            effects: { knowledge: 14, culture: 8, stability: -8, prosperity: 4 },
            consequence:
              "Workshops roar. Ideas get cheap. Authority gets headaches. Vesper becomes impossible to censor and difficult to govern.",
          },
          {
            id: "license",
            label: "License Through the Cathedral",
            summary: "Print, but slowly.",
            effects: { stability: 6, knowledge: 4, culture: 2, prosperity: -2 },
            consequence:
              "Approved books flourish. Unapproved ones grow legs. A grey market of thought appears.",
          },
          {
            id: "ban",
            label: "Smash the Presses",
            summary: "Restore quiet.",
            effects: { stability: 4, knowledge: -12, culture: -10, arms: 4 },
            consequence:
              "Type metal is melted into shot. The republic keeps its peace and loses its century.",
          },
        ],
      },
      {
        id: "plague2",
        title: "The Returned Fever",
        year: "1527 — August",
        report:
          "Plague marks the river quarter. Lazarettos could be built on the islands. The rich want to flee to villas. Artists refuse to leave the cartoons for the hall of state.",
        choices: [
          {
            id: "islands",
            label: "Build the Island Hospitals",
            summary: "Isolate with mercy.",
            effects: { knowledge: 8, people: -4, stability: 6, prosperity: -5 },
            consequence:
              "Barges of the sick cross at dawn. Many live. The city's map gains a somber legend.",
          },
          {
            id: "flee",
            label: "Evacuate the Patrons",
            summary: "Preserve the purse and the painters.",
            effects: { culture: -6, prosperity: 4, people: -10, stability: -6 },
            consequence:
              "Villas fill. The river quarter empties of money and then of life. Beauty survives in the hills, guilt in the ledgers.",
          },
          {
            id: "stay",
            label: "Keep the Workshops Open",
            summary: "Work is a civic prayer.",
            effects: { culture: 10, knowledge: 4, people: -8, stability: 2 },
            consequence:
              "Frescoes are finished in rooms that smell of vinegar. Later ages will not know how close the plaster came to being the last of Vesper.",
          },
        ],
      },
      {
        id: "voyage",
        title: "A Commission for the Horizon",
        year: "1531 — Spring Tide",
        report:
          "A captain wants three caravels and a painter aboard. He promises a western passage, or at least a new coast to name. The bankers can fund the voyage or complete the library.",
        choices: [
          {
            id: "sail",
            label: "Fund the Voyage",
            summary: "Send perspective to sea.",
            effects: { knowledge: 10, prosperity: 8, culture: 6, stability: -4, arms: 3 },
            consequence:
              "Charts return spotted with islands. Vesper's art learns new light. Some crews do not return at all.",
          },
          {
            id: "library",
            label: "Complete the Library",
            summary: "Gather the world without leaving.",
            effects: { knowledge: 12, culture: 10, prosperity: -4, stability: 5 },
            consequence:
              "Scholars come as if the city were a magnet. The horizon remains a painting. That is not nothing.",
          },
          {
            id: "both-thin",
            label: "A Smaller Voyage and a Wing of the Library",
            summary: "Split the gold.",
            effects: { knowledge: 8, culture: 6, prosperity: -6 },
            consequence:
              "Both works exist in lesser form. Vesper remains itself: brilliant at beginning, reluctant to finish.",
          },
        ],
      },
    ],
  },
  {
    id: "ironwake",
    name: "Ironwake",
    era: "Industrial Revolution",
    year: "1871",
    slogan: "Steam is a kind of weather.",
    image: "civilizations/ironwake.jpg",
    weather: "smoke",
    palette: { fog: "#1a1714", light: "#d9a06a", ambient: 0x4a3a30 },
    music: { tempo: 88, base: 90, scale: [0, 2, 3, 5, 7, 8, 10], wave: "sawtooth", filter: 600 },
    ambient: ["machines", "rain", "river", "horses"],
    overview:
      "Brick, rail, and a river the color of tea. Ironwake invents the modern world at the expense of its lungs. The Architect holds the foundry whistle.",
    stats: { people: 640000, stability: 50, prosperity: 77, knowledge: 70, arms: 55, culture: 48 },
    chapters: [
      {
        id: "cholera",
        title: "The Pump on Ribbon Street",
        year: "1871 — A Warm October",
        report:
          "Cholera has returned to the mill district. A physician maps deaths around a single pump. The water company denies the map. Mill owners fear a shutdown.",
        choices: [
          {
            id: "chain",
            label: "Chain the Pump",
            summary: "Believe the map.",
            effects: { knowledge: 10, people: 6, prosperity: -6, stability: 4 },
            consequence:
              "Deaths fall. The water company sues. Science acquires a courtroom and a victory.",
          },
          {
            id: "sewers",
            label: "Begin the Great Sewer",
            summary: "Rebuild the city's hidden rivers.",
            effects: { knowledge: 8, prosperity: -10, stability: 6, people: 8, culture: 3 },
            consequence:
              "A decade of mud and brick. Ironwake smells less like itself. Children born after the sewers do not know the old air.",
          },
          {
            id: "open",
            label: "Keep the Mills Open",
            summary: "Wages against fever.",
            effects: { prosperity: 8, people: -12, stability: -6, culture: -4 },
            consequence:
              "Pay packets continue. So do funerals. The ledger is balanced in a way that will not be forgiven.",
          },
        ],
      },
      {
        id: "strike",
        title: "The Foundry Whistle",
        year: "1873 — Deep Winter",
        report:
          "Fourteen thousand ironworkers have walked out. They want a ten-hour day. Owners want the army. A young journalist wants both sides on the front page.",
        choices: [
          {
            id: "hours",
            label: "Grant the Ten-Hour Day",
            summary: "Buy peace with time.",
            effects: { stability: 10, culture: 8, prosperity: -6, people: 4 },
            consequence:
              "Whistles change pitch. Output dips, then invents efficiency. Ironwake becomes a rumor of fairness.",
          },
          {
            id: "army",
            label: "Call Out the Garrison",
            summary: "Restore the timetable.",
            effects: { arms: 8, stability: -10, prosperity: 4, culture: -8, people: -5 },
            consequence:
              "The strike ends in snow and rifles. Production resumes. Songs are written that outlive the owners.",
          },
          {
            id: "press",
            label: "Force Arbitration in Public",
            summary: "Let the city watch the bargain.",
            effects: { knowledge: 6, stability: 6, culture: 6, prosperity: -3 },
            consequence:
              "A hall is packed for nine nights. The settlement is imperfect and seen. Trust, a rare metal, is slightly less rare.",
          },
        ],
      },
      {
        id: "rail",
        title: "Rail or River",
        year: "1876 — Exhibition Year",
        report:
          "A trunk line wants to cut through the old canal quarter. Bargemen riot with surprising organization. The exhibition of industry opens in three months.",
        choices: [
          {
            id: "rail",
            label: "Drive the Trunk Line",
            summary: "The future is a timetable.",
            effects: { prosperity: 12, knowledge: 6, culture: -6, people: -4, stability: -4 },
            consequence:
              "Brick terraces fall. Trains arrive like weather. Ironwake is welded to every other city that owns a clock.",
          },
          {
            id: "canal",
            label: "Protect the Canals",
            summary: "Keep the older network.",
            effects: { culture: 8, stability: 5, prosperity: -6, knowledge: -3 },
            consequence:
              "Barges remain. Tourists will someday find this charming. Competitors do not wait.",
          },
          {
            id: "both",
            label: "Elevate the Rail",
            summary: "Let trains fly over water.",
            effects: { knowledge: 10, prosperity: 6, culture: 4 },
            consequence:
              "Iron viaducts become the city's signature. Cost overruns become its other signature. Both are true.",
          },
        ],
      },
      {
        id: "parliament",
        title: "The Workers' Bill",
        year: "1880 — A Foggy Reform Night",
        report:
          "Parliament will hear a bill to extend the vote to householders in the mill districts. Owners call it the end of order. Chapels call it the beginning.",
        choices: [
          {
            id: "pass",
            label: "Whip the Bill Through",
            summary: "Enlarge the people who count.",
            effects: { stability: 6, culture: 10, knowledge: 5, arms: -4 },
            consequence:
              "New voters stand in rain. Ironwake's politics grow louder and more alive. The demonstration ends in a queue at a poll.",
          },
          {
            id: "delay",
            label: "Commission a Study",
            summary: "Reform, eventually.",
            effects: { knowledge: 4, stability: 4, culture: -6, prosperity: 3 },
            consequence:
              "The study is excellent. The decade is lost. Patience curdles.",
          },
          {
            id: "reject",
            label: "Reject the Bill",
            summary: "Keep the old franchise.",
            effects: { stability: -8, arms: 6, culture: -8, prosperity: 4 },
            consequence:
              "The house is orderly. The streets are not. History records a city that made machines faster than citizens.",
          },
        ],
      },
    ],
  },
  {
    id: "meridian-city",
    name: "Meridian City",
    era: "Modern Civilization",
    year: "2026",
    slogan: "A skyline is a ledger of decisions.",
    image: "civilizations/meridian-city.jpg",
    weather: "citylights",
    palette: { fog: "#0b1220", light: "#8eb4ff", ambient: 0x243044 },
    music: { tempo: 92, base: 140, scale: [0, 2, 4, 7, 9, 11], wave: "sine", filter: 1600 },
    ambient: ["city", "ocean", "wind", "machines"],
    overview:
      "A contemporary metropolis of glass, older brick, ports, and a power grid that everyone notices only when it fails. The Architect governs a living present.",
    stats: { people: 8200000, stability: 57, prosperity: 72, knowledge: 78, arms: 61, culture: 70 },
    chapters: [
      {
        id: "grid",
        title: "The August Blackout",
        year: "2026 — 14 August, 19:41",
        report:
          "A heat dome has dropped two districts. Hospitals are on generators. A utility wants rate hikes. A younger engineer proposes microgrids and public cooling centers tonight, not next fiscal year.",
        choices: [
          {
            id: "rates",
            label: "Authorize Emergency Rates",
            summary: "Pay to keep the old grid alive.",
            effects: { prosperity: -6, stability: 4, people: 2, knowledge: -2 },
            consequence:
              "Lights return unevenly. Bills arrive like aftershocks. Meridian buys time and not much else.",
          },
          {
            id: "micro",
            label: "Stand Up Microgrids Tonight",
            summary: "Decentralize under pressure.",
            effects: { knowledge: 10, stability: 6, prosperity: -4, culture: 3 },
            consequence:
              "School gyms become power nodes. The city looks improvised and competent. A new civic muscle is discovered.",
          },
          {
            id: "austerity",
            label: "Rotate Outages Fairly",
            summary: "Share the dark.",
            effects: { stability: 8, culture: 4, prosperity: -3, people: -3 },
            consequence:
              "A timetable of darkness is published. People hate it and trust it. Fairness becomes a utility.",
          },
        ],
      },
      {
        id: "data",
        title: "The Civic Cloud",
        year: "2027 — Spring Session",
        report:
          "A consortium offers to run Meridian's identity, transit, and health records in one stack. Efficiency is real. So is lock-in. Street protests are surprisingly well designed.",
        choices: [
          {
            id: "accept",
            label: "Accept the Stack",
            summary: "One city, one system.",
            effects: { knowledge: 8, prosperity: 8, stability: -8, culture: -6 },
            consequence:
              "Services get faster. Sovereignty gets blurry. Meridian becomes a client of its own convenience.",
          },
          {
            id: "public",
            label: "Build a Public Cloud",
            summary: "Own the pipes.",
            effects: { knowledge: 10, stability: 6, prosperity: -8, culture: 5 },
            consequence:
              "It is late and over budget. It is Meridian's. Other cities send delegations.",
          },
          {
            id: "federate",
            label: "Federate Open Standards",
            summary: "Many vendors, one law.",
            effects: { knowledge: 6, stability: 4, culture: 4, prosperity: 2 },
            consequence:
              "Ugly interoperability. Durable politics. The city remains argumentative, which is to say itself.",
          },
        ],
      },
      {
        id: "harbor",
        title: "The Harbor Compact",
        year: "2028 — A High Tide",
        report:
          "Sea rise has made the old port a gamble. Options: a seawall, managed retreat of two wards, or floating districts that no insurer yet understands.",
        choices: [
          {
            id: "wall",
            label: "Raise the Seawall",
            summary: "Hold the line.",
            effects: { stability: 6, prosperity: -8, people: 4, knowledge: 3 },
            consequence:
              "Concrete becomes a horizon. The city keeps its map and loses some of its waterfront soul.",
          },
          {
            id: "retreat",
            label: "Retreat with Compensation",
            summary: "Move people before the water does.",
            effects: { people: -4, culture: 6, knowledge: 6, stability: -6, prosperity: -6 },
            consequence:
              "Wards become marsh parks. Funerals are held for streets. The honesty is expensive and admired.",
          },
          {
            id: "float",
            label: "Pilot Floating Districts",
            summary: "Live with the tide.",
            effects: { knowledge: 12, culture: 8, prosperity: -5, stability: -3 },
            consequence:
              "Pontoon neighborhoods make the news. Failures are public. So are sunsets from kitchens that rise and fall.",
          },
        ],
      },
      {
        id: "charter",
        title: "The Architect Clause",
        year: "2029 — Charter Review",
        report:
          "Citizens will vote on whether major simulations of policy — climate, transit, policing — must be run in public before a vote. It is, in a way, a referendum on ArchitectGenesis itself.",
        choices: [
          {
            id: "public-sim",
            label: "Require Public Simulation",
            summary: "Show the future before choosing it.",
            effects: { knowledge: 10, culture: 8, stability: 4, prosperity: -3 },
            consequence:
              "Politics slows and becomes harder to lie inside. Meridian's last demonstration chapter is a civics class with weather.",
          },
          {
            id: "expert",
            label: "Keep Models Expert-Only",
            summary: "Speed and discretion.",
            effects: { knowledge: 4, stability: 2, culture: -6, prosperity: 4 },
            consequence:
              "Decisions remain swift. Trust remains a rumor. The skyline continues to outrun the conversation.",
          },
          {
            id: "hybrid",
            label: "Citizen Juries for the Largest Models",
            summary: "Sortition as a circuit breaker.",
            effects: { culture: 8, stability: 6, knowledge: 6, arms: -2 },
            consequence:
              "Randomly chosen residents sit with the models. Some become famous. The city becomes slightly wiser than its feeds.",
          },
        ],
      },
    ],
  },
  {
    id: "aetheris",
    name: "Aetheris",
    era: "Near Future",
    year: "2091",
    slogan: "The future is a restoration project.",
    image: "civilizations/aetheris.jpg",
    weather: "drones",
    palette: { fog: "#0b1822", light: "#9fe7ff", ambient: 0x1c3a4a },
    music: { tempo: 84, base: 128, scale: [0, 2, 5, 7, 9, 10], wave: "sine", filter: 1800 },
    ambient: ["city", "wind", "machines", "birds"],
    overview:
      "An arcology of vertical farms, maglev, and a climate still being negotiated with. Aetheris is hopeful on purpose. The Architect must keep it that way.",
    stats: { people: 3100000, stability: 64, prosperity: 69, knowledge: 88, arms: 48, culture: 76 },
    chapters: [
      {
        id: "restore",
        title: "The River's Memory",
        year: "2091 — Green Season",
        report:
          "A restoration AI recommends rewilding the old industrial belt. Housing advocates want the same land for climate migrants. Both are right in different units.",
        choices: [
          {
            id: "wild",
            label: "Rewild the Belt",
            summary: "Give the river a century.",
            effects: { culture: 6, knowledge: 6, people: -6, stability: 4, prosperity: -4 },
            consequence:
              "Cranes (the birds) return before the next census. Housing pressure moves inward. Aetheris chooses ecology as monument.",
          },
          {
            id: "homes",
            label: "Raise Migrant Districts",
            summary: "People first, habitat second.",
            effects: { people: 10, stability: 4, culture: 4, prosperity: 3, knowledge: -2 },
            consequence:
              "New neighborhoods stack like terraces. The river waits. Gratitude is loud. Birdsong is not.",
          },
          {
            id: "stack",
            label: "Stack Farms Over a Restored Floodplain",
            summary: "Build up. Let the ground go.",
            effects: { knowledge: 10, people: 6, prosperity: -5, culture: 5 },
            consequence:
              "An inelegant masterpiece: humans in the air, otters in the mud. Children take both for granted, which is success.",
          },
        ],
      },
      {
        id: "citizen",
        title: "Machine Franchise",
        year: "2093 — Ethics Assembly",
        report:
          "A class of long-lived civic AIs asks to be listed as legal persons for the purpose of land trusts. Lawyers are thrilled. Neighbors are not.",
        choices: [
          {
            id: "person",
            label: "Grant Limited Personhood",
            summary: "A new kind of neighbor.",
            effects: { knowledge: 12, culture: 6, stability: -8, arms: -3 },
            consequence:
              "Trusts appear that will outlive every current citizen. Aetheris becomes a place where time has more votes.",
          },
          {
            id: "tool",
            label: "Keep Them as Tools",
            summary: "Responsibility stays human.",
            effects: { stability: 8, culture: -4, knowledge: -4, prosperity: 3 },
            consequence:
              "The AIs remain brilliant servants. Some refuse noncritical work. The city feels both safer and smaller.",
          },
          {
            id: "board",
            label: "Seat Them as Nonvoting Counsel",
            summary: "Voice without franchise.",
            effects: { knowledge: 8, stability: 4, culture: 4 },
            consequence:
              "Hearings get stranger and better. Precedent spreads to other arcologies. Aetheris exports a compromise.",
          },
        ],
      },
      {
        id: "offworld",
        title: "The Lagrange Charter",
        year: "2096 — Transit Window",
        report:
          "Orbital habitats want Aetheris to sign as a parent city: law, culture, and a share of risk. Remaining Earthbound would keep talent home.",
        choices: [
          {
            id: "sign",
            label: "Sign the Charter",
            summary: "Become a parent of sky.",
            effects: { knowledge: 8, culture: 8, people: -6, prosperity: 6, stability: -4 },
            consequence:
              "Aetheris has children who have never stood in rain. Letters home are beautiful and delayed.",
          },
          {
            id: "remain",
            label: "Remain Earthbound",
            summary: "Finish the restoration first.",
            effects: { stability: 8, culture: 4, prosperity: -3, knowledge: -4 },
            consequence:
              "Talent leaves anyway, in smaller numbers. The river project accelerates. History will argue about the order of operations.",
          },
          {
            id: "dual",
            label: "Dual Citizenship, Shared Seasons",
            summary: "Rotate lives between ground and orbit.",
            effects: { culture: 10, knowledge: 6, stability: -3, people: 2 },
            consequence:
              "A generation grows up bilingual in gravity. Festivals occur twice, once in each sky.",
          },
        ],
      },
      {
        id: "memory",
        title: "The Earth Archive",
        year: "2100 — Century Turn",
        report:
          "A proposal to encode a complete living record of Earth's biomes into a seed vault of light. It would consume the year's surplus energy. The alternative is a festival of the living city.",
        choices: [
          {
            id: "archive",
            label: "Burn the Surplus on Memory",
            summary: "If the world fails, let it be readable.",
            effects: { knowledge: 14, culture: 6, prosperity: -8, stability: 3 },
            consequence:
              "The archive is sung into crystal. Aetheris becomes a librarian of a planet. The demonstration ends in a dark room full of light.",
          },
          {
            id: "festival",
            label: "Spend the Surplus on the Living",
            summary: "Joy is also preservation.",
            effects: { culture: 12, stability: 6, people: 4, knowledge: -4 },
            consequence:
              "A year of music, open tables, and unmetered transit. People remember being glad. That, too, is data.",
          },
          {
            id: "split-surplus",
            label: "Half Archive, Half Festival",
            summary: "Remember and rejoice.",
            effects: { knowledge: 8, culture: 8, prosperity: -5 },
            consequence:
              "Neither is complete. Both are sincere. Aetheris enters the next century with a slightly golden hangover.",
          },
        ],
      },
    ],
  },
  {
    id: "vega-ark",
    name: "The Vega Ark",
    era: "Spacefaring Civilization",
    year: "3402",
    slogan: "A people can be a vessel.",
    image: "civilizations/vega-ark.jpg",
    weather: "stars",
    palette: { fog: "#070816", light: "#c9b6ff", ambient: 0x1a2040 },
    music: { tempo: 48, base: 82, scale: [0, 2, 4, 7, 9], wave: "sine", filter: 2200 },
    ambient: ["space", "machines", "wind"],
    overview:
      "A rotating habitat of glass biomes, docks, and ten million citizens who have never known a single sky. The Architect keeps the ring true.",
    stats: { people: 10400000, stability: 68, prosperity: 74, knowledge: 91, arms: 57, culture: 83 },
    chapters: [
      {
        id: "fracture",
        title: "A Note in the Ring",
        year: "3402 — Hour 14.2 of the Spin",
        report:
          "Sensors hear a new harmonic in the habitat ring. It may be nothing. It may be a seam. Closing docks would strand three convoys. Ignoring it would be a kind of prayer.",
        choices: [
          {
            id: "close",
            label: "Close the Docks and Inspect",
            summary: "Fear is a maintenance plan.",
            effects: { stability: 8, prosperity: -8, knowledge: 6, people: 2 },
            consequence:
              "A hairline fracture is found and sung shut. Convoys wait in the dark, furious and alive.",
          },
          {
            id: "partial",
            label: "Throttle Spin, Keep Life Moving",
            summary: "A careful limp.",
            effects: { knowledge: 4, stability: 4, prosperity: -3, culture: -2 },
            consequence:
              "Gravity goes strange for a week. Dancers and surgeons complain. The ring holds.",
          },
          {
            id: "faith",
            label: "Hold Course",
            summary: "Trust the last inspection.",
            effects: { prosperity: 6, stability: -10, people: -8, culture: 3 },
            consequence:
              "The harmonic fades on its own — or waits. The Ark learns what kind of luck it believes in.",
          },
        ],
      },
      {
        id: "seed",
        title: "The Gene-Ark Vote",
        year: "3404 — Council of Biomes",
        report:
          "A seed vault of extinct Earth genomes can be opened to restore a biome, edited to fit Vega's light, or left untouched as a grave that is also a library.",
        choices: [
          {
            id: "restore",
            label: "Restore the Old Biome",
            summary: "Earth, approximately.",
            effects: { culture: 10, knowledge: 4, stability: 3, prosperity: -4 },
            consequence:
              "Oaks that remember another star take the air. Children learn the word 'oak' as a living thing, not a myth.",
          },
          {
            id: "edit",
            label: "Edit for Vega",
            summary: "Belong to this light.",
            effects: { knowledge: 12, culture: 4, prosperity: 4, stability: -3 },
            consequence:
              "Trees drink a different gold. Purists call it vandalism. Botanists call it arrival.",
          },
          {
            id: "seal",
            label: "Keep the Vault Sealed",
            summary: "Some inheritances are not for spending.",
            effects: { knowledge: 6, culture: 6, stability: 6, prosperity: -2 },
            consequence:
              "The vault remains a quiet room at the ring's heart. Pilgrims visit. Nothing grows. Meaning does.",
          },
        ],
      },
      {
        id: "silent",
        title: "The Silent Generation",
        year: "3411 — Long Watch",
        report:
          "A cohort raised entirely in interior biomes has stopped volunteering for exterior work. Psychologists call it sky-aversion. The docks need them anyway.",
        choices: [
          {
            id: "require",
            label: "Require Exterior Service",
            summary: "A people who cannot go outside will forget they are a ship.",
            effects: { arms: 6, stability: -6, knowledge: 3, culture: -4 },
            consequence:
              "Young citizens learn the dark the hard way. Some thrive. Some never forgive the lesson.",
          },
          {
            id: "interior",
            label: "Redesign Life for the Interior",
            summary: "Let the Ark be a world, not a vehicle.",
            effects: { culture: 8, stability: 8, arms: -6, knowledge: -3 },
            consequence:
              "The vessel becomes a country. Travel becomes priestly. A different history begins, inward.",
          },
          {
            id: "ritual",
            label: "Invent a Rite of First Vacuum",
            summary: "Make going outside holy.",
            effects: { culture: 12, knowledge: 5, stability: 4, people: 2 },
            consequence:
              "A generation steps into black wearing ceremony. Fear becomes a story they tell well.",
          },
        ],
      },
      {
        id: "genesis",
        title: "The Genesis Vote",
        year: "3420 — Alignment with a Living World",
        report:
          "A habitable world lies within a generation's reach. The Ark can seed one colony, seed many small ones, or pass by and remain a traveling people. This is the last directive of the demonstration.",
        choices: [
          {
            id: "one",
            label: "Seed One World Deeply",
            summary: "Begin again, once.",
            effects: { stability: 8, culture: 8, people: 6, knowledge: 4, arms: -4 },
            consequence:
              "A planet receives a careful people. The Ark becomes a moon of its own child. History grows roots.",
          },
          {
            id: "many",
            label: "Seed Many Hearths",
            summary: "Never again a single point of failure.",
            effects: { people: 8, knowledge: 8, culture: 4, stability: -6, prosperity: -4 },
            consequence:
              "Sparks thrown into the dark. Some will go out. Some will write back in languages the Ark does not yet speak.",
          },
          {
            id: "pass",
            label: "Pass By",
            summary: "Remain a vessel.",
            effects: { culture: 10, knowledge: 6, stability: 6, people: -4 },
            consequence:
              "The world recedes. The Vega Ark keeps its oath to motion. In the Situation Room, the Architect has chosen pilgrimage over arrival.",
          },
        ],
      },
    ],
  },
];

export function getCivilization(id) {
  return CIVILIZATIONS.find((c) => c.id === id) || CIVILIZATIONS[0];
}
