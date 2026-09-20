/* Kita-Alps Expeditions - Interactive Elevation Profile Controller */

document.addEventListener('DOMContentLoaded', () => {
  const waypointData = {
    kamikochi: {
      name: "Kamikochi Trailhead",
      kanji: "上高地バスターミナル",
      altitude: "1,500 m / 4,921 ft",
      grade: "Class 1 (Wide Forest Trail)",
      porterRole: "Initial pack weigh-in & load transfer (max 12kg into porter duffel).",
      evacZone: "Paved access, direct vehicle extraction & mountain rescue depot."
    },
    yarisawa: {
      name: "Yarisawa Lodge",
      kanji: "槍沢ロッヂ",
      altitude: "1,820 m / 5,971 ft",
      grade: "Class 1+ (Gentle River Valley Ascent)",
      porterRole: "Porter leads 45 mins ahead to stage hydration & energy provisions.",
      evacZone: "Helipad clearing; satellite check-in station."
    },
    tengubara: {
      name: "Tengubara Junction",
      kanji: "天狗原分岐",
      altitude: "2,348 m / 7,703 ft",
      grade: "Class 2 (Glacial Moraine Scree)",
      porterRole: "Helmet & climbing sling check before entering rockfall cone.",
      evacZone: "Cirque landing zone (weather permitting); Garmin inReach check."
    },
    yarigatake_cottage: {
      name: "Yarigatake Mountain Cottage",
      kanji: "槍ヶ岳山荘",
      altitude: "3,080 m / 10,105 ft",
      grade: "Class 2+ (Ridge Crest Yamagoya)",
      porterRole: "Client luggage delivered inside reserved room prior to guest arrival.",
      evacZone: "Nagano Prefectural Police Mountain Rescue outpost on-site."
    },
    yarigatake_summit: {
      name: "Mt. Yarigatake Spearhead",
      kanji: "槍ヶ岳山頂",
      altitude: "3,180 m / 10,433 ft",
      grade: "Class 3+ (Vertical Iron Chains & Ladders)",
      porterRole: "Climbers ascend unburdened with chalk/gloves; guide provides top-rope tether.",
      evacZone: "High-exposure vertical terrain; technical alpine rescue protocol."
    },
    daikiretto: {
      name: "Daikiretto Col",
      kanji: "大キレット切通",
      altitude: "2,740 m / 8,989 ft",
      grade: "Class 4 (Knife-Edge Gap Scramble)",
      porterRole: "Light-pack agility mandatory (<7kg). Heavy duffel ported via valley bypass.",
      evacZone: "Extreme exposure zone; strict 1:2 guide ratio required in wet conditions."
    },
    kitahotaka: {
      name: "Mt. Kitahotakadake Summit",
      kanji: "北穂高岳山頂",
      altitude: "3,106 m / 10,190 ft",
      grade: "Class 3 (Granite Block Cirque)",
      porterRole: "Handoff at Kitahotaka Goya (highest hut in Japan); warm meal reception.",
      evacZone: "Emergency satellite distress beacon coordinates active."
    }
  };

  const nodes = document.querySelectorAll('.waypoint-node');
  const nameEl = document.getElementById('readout-name');
  const kanjiEl = document.getElementById('readout-kanji');
  const altEl = document.getElementById('readout-alt');
  const gradeEl = document.getElementById('readout-grade');
  const roleEl = document.getElementById('readout-role');
  const evacEl = document.getElementById('readout-evac');

  if (!nodes.length || !nameEl) return;

  function updateReadout(key) {
    const data = waypointData[key];
    if (!data) return;

    // Remove active from all
    nodes.forEach(n => n.classList.remove('active'));

    // Set active on matching
    const activeNode = document.querySelector(`.waypoint-node[data-waypoint="${key}"]`);
    if (activeNode) activeNode.classList.add('active');

    // Update text
    nameEl.textContent = data.name;
    if (kanjiEl) kanjiEl.textContent = data.kanji;
    if (altEl) altEl.textContent = data.altitude;
    if (gradeEl) gradeEl.textContent = data.grade;
    if (roleEl) roleEl.textContent = data.porterRole;
    if (evacEl) evacEl.textContent = data.evacZone;
  }

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      const wp = node.getAttribute('data-waypoint');
      updateReadout(wp);
    });

    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const wp = node.getAttribute('data-waypoint');
        updateReadout(wp);
      }
    });
  });
});
