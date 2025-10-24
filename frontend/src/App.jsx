// src/App.jsx
// --- KODE LENGKAP DENGAN PERBAIKAN ---

import { useState, useEffect, useCallback, useRef } from 'react';
import { VOCABULARY, CATEGORIES, RULES } from './data/vocabulary';
import './App.css';

// --- Data Konfigurasi SVG (Koordinat) ---
const SVG_VIEWBOX_WIDTH = 1000;
const SVG_VIEWBOX_HEIGHT = 600;

// Titik Awal Kereta (Harus sama dengan 'M' di TRACK_PATHS.main)
const TRAIN_START_X = 100;
const TRAIN_START_Y = 300;

const TRACK_PATHS = {
  main: "M100,300 C200,300 250,150 400,150 C550,150 600,300 600,300",
  branch1: "M600,300 L800,150",
  branch2: "M600,300 L800,300",
  branch3: "M600,300 L800,450",
};

const STATION_DEFINITIONS = [
  { id: 'stationA', x: 850, y: 150, width: 100, height: 60, color: '#e74c3c' },
  { id: 'stationB', x: 850, y: 300, width: 100, height: 60, color: '#2ecc71' },
  { id: 'stationC', x: 850, y: 450, width: 100, height: 60, color: '#3498db' },
];
// ----------------------------------------

const ALL_RULES = Object.values(RULES);
const ALL_CATEGORIES = Object.values(CATEGORIES);

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const shuffleArray = (arr) => {
  let a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

function App() {
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [roundCount, setRoundCount] = useState(0);

  const [currentWord, setCurrentWord] = useState(null);
  const [currentRule, setCurrentRule] = useState(ALL_RULES[0]);
  const [availableStations, setAvailableStations] = useState([]);
  const [correctStationId, setCorrectStationId] = useState(null);
  const [selectedStationId, setSelectedStationId] = useState(null);

  const [trainPathSegment, setTrainPathSegment] = useState('');
  const [trainAnimationKey, setTrainAnimationKey] = useState(0);
  const [isTrainMoving, setIsTrainMoving] = useState(false); // INI KUNCI UTAMA

  const trackPathRef = useRef({});

  // Fungsi untuk memulai ronde baru
  const nextRound = useCallback(() => {
    setSelectedStationId(null);
    setIsTrainMoving(false); // PERBAIKAN: Set kereta berhenti
    setRoundCount((c) => c + 1);

    // 1. Tentukan Aturan Main
    let newRule = currentRule;
    if (roundCount > 0 && roundCount % 3 === 0) {
      const otherRules = ALL_RULES.filter((r) => r.id !== currentRule.id);
      newRule = getRandomItem(otherRules);
      setCurrentRule(newRule);
    }

    // 2. Ambil Kata Baru
    const newWord = getRandomItem(VOCABULARY);
    setCurrentWord(newWord);

    // 3. Siapkan Stasiun Berdasarkan Aturan
    let correctLabel = '';
    if (newRule.id === 'CATEGORY') correctLabel = newWord.category;
    else if (newRule.id === 'FIRST_LETTER') correctLabel = newWord.startsWith;
    else if (newRule.id === 'LENGTH') correctLabel = newWord.length;

    const allPossibleLabels = [
      ...Object.values(CATEGORIES), 'Vokal', 'Konsonan', 'Pondok', 'Panjang'
    ].filter(label => label !== correctLabel);

    const shuffledPossibleLabels = shuffleArray(allPossibleLabels);
    const wrongLabels = [shuffledPossibleLabels[0], shuffledPossibleLabels[1]];
    const labelsForStations = shuffleArray([correctLabel, ...wrongLabels]);

    const currentRoundStations = STATION_DEFINITIONS.map((station, index) => ({
      ...station,
      label: labelsForStations[index],
    }));
    setAvailableStations(currentRoundStations);

    const correctStation = currentRoundStations.find(s => s.label === correctLabel);
    setCorrectStationId(correctStation ? correctStation.id : null);

    // PERBAIKAN: Jangan set path atau key animasi di sini
    // Biarkan kereta diam di titik awal
    
  }, [currentRule, roundCount]);

  // Fungsi untuk memulai game
  const startGame = () => {
    setScore(0);
    setLives(3);
    setRoundCount(0);
    setCurrentRule(ALL_RULES[0]);
    setGameState('playing');
    nextRound();
  };

  // Handler saat stasiun diklik
  const handleStationClick = (stationId) => {
    if (isTrainMoving) return;
    setSelectedStationId(stationId);
  };

  // Handler untuk menjalankan kereta (via Enter)
  const handleGoTrain = useCallback(() => {
    if (!selectedStationId || isTrainMoving) return;

    // Tentukan path ke stasiun yang dipilih
    const selectedStationIndex = STATION_DEFINITIONS.findIndex(s => s.id === selectedStationId);
    const branchPathKey = `branch${selectedStationIndex + 1}`;
    
    if (TRACK_PATHS[branchPathKey]) {
      const fullPath = TRACK_PATHS.main + ' ' + TRACK_PATHS[branchPathKey];
      setTrainPathSegment(fullPath);
      setTrainAnimationKey(k => k + 1);
      setIsTrainMoving(true); // PERBAIKAN: Baru gerakkan kereta SEKARANG
    }
  }, [selectedStationId, isTrainMoving]);

  // Cek jawaban saat animasi kereta selesai
  const handleTrainAnimationEnd = useCallback(() => {
    if (gameState !== 'playing' || !isTrainMoving) return;

    if (selectedStationId === correctStationId) {
      setScore((s) => s + 10);
    } else {
      // PERBAIKAN: Logika pengecekan nyawa yang aman (tidak stale)
      setLives((prevLives) => {
        const newLives = prevLives - 1;
        if (newLives <= 0) {
          setGameState('gameover');
        }
        return newLives;
      });
    }
    
    // Jangan set isTrainMoving di sini, biarkan nextRound yang urus
    setTimeout(nextRound, 800);

  }, [gameState, isTrainMoving, selectedStationId, correctStationId, nextRound]); // Hapus 'lives' dari dependency


  // Keyboard listener untuk 'Enter'
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState === 'playing' && e.key === 'Enter') {
        handleGoTrain();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, handleGoTrain]);


  return (
    <div className="App">
      {gameState === 'start' && (
        <div className="game-overlay">
          <h1>Train of Thought</h1>
          <p>Latihan Kosakata Basa Sunda</p>
          <p>
            Pilih stasiun yang tepat sesuai aturan, lalu tekan <strong>Enter</strong>{' '}
            untuk menjalankan kereta!
          </p>
          <button onClick={startGame}>Mulai</button>
        </div>
      )}

      {gameState === 'gameover' && (
        <div className="game-overlay">
          <h1>Game Over</h1>
          <p>Skor Akhir Anjeun: {score}</p>
          <button onClick={startGame}>Main deui (Lagi)</button>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="game-screen">
          <div className="status-bar">
            <div>Skor: {score}</div>
            <div className="rule-display">
              <strong>{currentRule.text}</strong>
            </div>
            <div>Nyawa: {'❤️'.repeat(lives)}</div>
          </div>

          <div className="svg-container">
            <svg viewBox={`0 0 ${SVG_VIEWBOX_WIDTH} ${SVG_VIEWBOX_HEIGHT}`} preserveAspectRatio="xMidYMid meet">
              <rect x="0" y="0" width={SVG_VIEWBOX_WIDTH} height={SVG_VIEWBOX_HEIGHT} fill="#55725d" />

              {/* Gambar Lintasan (path) */}
              {Object.entries(TRACK_PATHS).map(([id, d]) => (
                <path
                  key={id}
                  d={d}
                  fill="none"
                  stroke="var(--track-color)"
                  strokeWidth="15"
                  strokeLinecap="round"
                  ref={el => trackPathRef.current[id] = el}
                />
              ))}

              {/* Gambar Stasiun (rect) dan Label */}
              {availableStations.map((station) => (
                <g key={station.id} onClick={() => handleStationClick(station.id)}>
                  <rect
                    x={station.x - station.width / 2}
                    y={station.y - station.height / 2}
                    width={station.width}
                    height={station.height}
                    fill={station.color}
                    className={`station-svg ${selectedStationId === station.id ? 'selected' : ''}`}
                    rx="8" ry="8"
                  />
                  <text
                    x={station.x}
                    y={station.y}
                    className="station-label"
                  >
                    {station.label}
                  </text>
                </g>
              ))}

              {/* --- PERBAIKAN LOGIKA KERETA --- */}
              
              {/* 1. Kereta STATIS (DIAM) saat isTrainMoving = false */}
              {currentWord && !isTrainMoving && (
                <text
                  x={TRAIN_START_X}
                  y={TRAIN_START_Y}
                  className="train-svg"
                >
                  {currentWord.word}
                </text>
              )}

              {/* 2. Kereta BERGERAK (ANIMASI) saat isTrainMoving = true */}
              {currentWord && isTrainMoving && (
                <text className="train-svg" key={trainAnimationKey}>
                  {currentWord.word}
                  <animateMotion
                    path={trainPathSegment}
                    dur="3s" // Durasi tetap 3s
                    begin="0s"
                    fill="freeze"
                    onEnd={handleTrainAnimationEnd}
                  />
                </text>
              )}
              {/* --- AKHIR PERBAIKAN --- */}

            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;