// Real rock classics, distributed across eras & tags
window.SONGS = [
  // ---- 80s ----
  { id: 's01', name: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', duration: '5:56', tags: ['80s', 'High Energy'],              grad: ['#ff8a3d', '#2b1406'], tip: '$5',  enabled: true },
  { id: 's02', name: 'Livin\' on a Prayer',  artist: 'Bon Jovi',      duration: '4:09', tags: ['80s', 'High Energy'],              grad: ['#ff4d8d', '#2b1055'], tip: null,  enabled: true },
  { id: 's03', name: 'Every Breath You Take', artist: 'The Police',   duration: '4:13', tags: ['80s', 'Ballads'],                  grad: ['#4fc3f7', '#082942'], tip: null,  enabled: true },
  { id: 's04', name: 'Enter Sandman',        artist: 'Metallica',     duration: '5:31', tags: ['80s', 'High Energy'],              grad: ['#7c5cff', '#1a0f3c'], tip: '$10', enabled: true },
  { id: 's05', name: 'Hotel California',     artist: 'Eagles',        duration: '6:30', tags: ['80s', 'Ballads'],                  grad: ['#ffd54f', '#2b200a'], tip: null,  enabled: true },

  // ---- 90s ----
  { id: 's06', name: 'Smells Like Teen Spirit', artist: 'Nirvana',    duration: '5:01', tags: ['90s', 'High Energy', 'Punk-Rock'], grad: ['#ff5252', '#2a0a0a'], tip: null,  enabled: true },
  { id: 's07', name: 'Wonderwall',           artist: 'Oasis',         duration: '4:18', tags: ['90s', 'Acústico', 'Ballads'],      grad: ['#ffb347', '#3a1f0b'], tip: '$3',  enabled: true },
  { id: 's08', name: 'Black',                artist: 'Pearl Jam',     duration: '5:43', tags: ['90s', 'Ballads'],                  grad: ['#b0bec5', '#1c2428'], tip: null,  enabled: true },
  { id: 's09', name: 'Black Hole Sun',       artist: 'Soundgarden',   duration: '5:18', tags: ['90s', 'High Energy'],              grad: ['#ffb347', '#2b1055'], tip: null,  enabled: true },
  { id: 's10', name: 'Killing in the Name',  artist: 'Rage Against the Machine', duration: '5:14', tags: ['90s', 'Punk-Rock', 'High Energy'], grad: ['#ff3d00', '#240505'], tip: '$5',  enabled: true },
  { id: 's11', name: 'Basket Case',          artist: 'Green Day',     duration: '3:03', tags: ['90s', 'Punk-Rock'],                grad: ['#a0e85b', '#142b0c'], tip: null,  enabled: true },

  // ---- 2000s ----
  { id: 's12', name: 'Seven Nation Army',    artist: 'The White Stripes', duration: '3:51', tags: ['2000s', 'High Energy'],       grad: ['#ff5252', '#1c0404'], tip: null,  enabled: true },
  { id: 's13', name: 'Mr. Brightside',       artist: 'The Killers',   duration: '3:42', tags: ['2000s', 'High Energy'],            grad: ['#26c6da', '#0a2a33'], tip: '$5',  enabled: true },
  { id: 's14', name: 'Chasing Cars',         artist: 'Snow Patrol',   duration: '4:27', tags: ['2000s', 'Ballads', 'Acústico'],    grad: ['#13c296', '#0b3a2e'], tip: null,  enabled: true },
  { id: 's15', name: 'In the End',           artist: 'Linkin Park',   duration: '3:36', tags: ['2000s', 'High Energy'],            grad: ['#9c27b0', '#1a0524'], tip: null,  enabled: true },
  { id: 's16', name: 'Last Nite',            artist: 'The Strokes',   duration: '3:14', tags: ['2000s', 'Punk-Rock'],              grad: ['#ff6ec7', '#2b0a3a'], tip: null,  enabled: true },
  { id: 's17', name: 'Boulevard of Broken Dreams', artist: 'Green Day', duration: '4:20', tags: ['2000s', 'Ballads', 'Punk-Rock'], grad: ['#7c5cff', '#0a0a24'], tip: '$2',  enabled: false },

  // ---- 2010+ ----
  { id: 's18', name: 'Do I Wanna Know?',     artist: 'Arctic Monkeys', duration: '4:32', tags: ['2010+', 'Ballads'],               grad: ['#ff4d8d', '#1a0a24'], tip: null,  enabled: true },
  { id: 's19', name: 'Somebody That I Used to Know', artist: 'Gotye', duration: '4:05', tags: ['2010+', 'Acústico', 'Ballads'],    grad: ['#ffd54f', '#2b1406'], tip: null,  enabled: true },
  { id: 's20', name: 'Uprising',             artist: 'Muse',          duration: '5:02', tags: ['2010+', 'High Energy'],            grad: ['#ff8a3d', '#240505'], tip: '$10', enabled: true },
  { id: 's21', name: 'Radioactive',          artist: 'Imagine Dragons', duration: '3:07', tags: ['2010+', 'High Energy'],          grad: ['#13c296', '#0a2a33'], tip: null,  enabled: true },
  { id: 's22', name: 'Ho Hey',               artist: 'The Lumineers', duration: '2:43', tags: ['2010+', 'Acústico'],               grad: ['#ffb347', '#3a2208'], tip: null,  enabled: true },
  { id: 's23', name: 'Pumped Up Kicks',      artist: 'Foster the People', duration: '3:59', tags: ['2010+', 'Ballads'],            grad: ['#4fc3f7', '#0a2a33'], tip: null,  enabled: false },
  { id: 's24', name: 'Take Me to Church',    artist: 'Hozier',        duration: '4:02', tags: ['2010+', 'Ballads'],                grad: ['#b0bec5', '#14181a'], tip: '$5',  enabled: true },
];

window.TAGS = ['80s', '90s', '2000s', '2010+', 'Ballads', 'High Energy', 'Punk-Rock', 'Acústico'];

window.ACTIVITY_LOG = [
  { id: 'a01', kind: 'played',   songId: 's04', time: '21:18', fan: 'MartinV' },
  { id: 'a02', kind: 'played',   songId: 's11', time: '21:24', fan: 'Carla.wav' },
  { id: 'a03', kind: 'rejected', songId: 's08', time: '21:31', fan: 'anon' },
  { id: 'a04', kind: 'played',   songId: 's01', time: '21:38', fan: 'Lu_Rockera' },
  { id: 'a05', kind: 'played',   songId: 's05', time: '21:45', fan: 'Diego_84' },
];

window.ANALYTICS = {
  topRequested: [
    { songId: 's05', count: 18 },
    { songId: 's01', count: 14 },
    { songId: 's04', count: 11 },
    { songId: 's11', count: 9 },
    { songId: 's07', count: 7 },
  ],
  uniqueScans: 142,
  totalRequests: 87,
  played: 24,
  rejected: 5,
  avgTip: 37.00,
};

// Initial pending requests for musician panel
window.INITIAL_REQUESTS = [
  { id: 'r01', songId: 's05', fan: 'Lu_Rockera',  time: '21:42', note: null, tip: '$10' },
  { id: 'r02', songId: 's01', fan: 'MartinV',     time: '21:44', note: 'Para el cumple de mi novia 🖤', tip: '$5' },
  { id: 'r03', songId: 's09', fan: 'Carla.wav',   time: '21:45', note: null, tip: null },
  { id: 'r04', songId: 's11', fan: 'Diego_84',    time: '21:46', note: null, tip: '$5' },
  { id: 'r05', songId: 's04', fan: 'anon',        time: '21:47', note: '¡Please, la del solo!', tip: null },
];
