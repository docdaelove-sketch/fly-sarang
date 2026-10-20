// ============================================================================
// 🚀 날아라 사랑아! (Fly Sarang!) - 우주 젤리 디펜스 3D (10 Stages + 실시간 공유 랭킹)
// ============================================================================

const FUNNY_QUOTES = [
  "말랑말랑 대폭발! 🍮",
  "우주 최강 사랑이! 💖",
  "푸딩처럼 팡팡! ✨",
  "명사수 사랑이 출동! 🎯",
  "젤리 쥬스 완성~! 🧃",
  "쫀득쫀득 명중! 💥",
  "우주 평화는 내가 지킨다! 🚀",
  "보들보들 젤리 컷! 🌈",
  "대박! 눈부신 비행 실력! 🌟"
];

const CHAIN_QUOTES = [
  "💣 폭탄 젤리 연쇄 대폭발!!",
  "🎆 도미노 젤리 팡팡팡!!",
  "🔥 일타쌍피 슈퍼 폭발!!"
];

// --- 1단계부터 10단계까지 스테이지별 설정 및 변화 안내 문구 ---
const STAGE_CONFIG = {
  1: {
    targetKills: 10,
    spawnInterval: 1.15,
    speedMult: 1.15,
    maxSlimes: 8,
    pool: ['GREEN', 'GREEN', 'YELLOW'],
    changeText: "⚡ 새로운 변화: 초록 말랑이 & 빠른 노란 통통이 출현!",
    subText: "조이스틱으로 조준하고 오른손으로 발사하세요!"
  },
  2: {
    targetKills: 14,
    spawnInterval: 1.05,
    speedMult: 1.25,
    maxSlimes: 9,
    pool: ['GREEN', 'YELLOW', 'RED_BOMB', 'TILT_LOCK'],
    changeText: "🛸 새로운 변화: 우주선 비행 록온 젤리 & 빨간 폭탄이 등장!",
    subText: "황금 링이 달린 젤리는 폰을 기울여 우주선을 정면으로 맞춰야 터져요!"
  },
  3: {
    targetKills: 18,
    spawnInterval: 0.95,
    speedMult: 1.32,
    maxSlimes: 10,
    pool: ['GREEN', 'YELLOW', 'PURPLE', 'RED_BOMB', 'TILT_LOCK'],
    changeText: "🟣 새로운 변화: 맞으면 2마리로 쪼개지는 보라 분열 젤리 등장!",
    subText: "쪼개진 미니 젤리까지 재빨리 처리하세요!"
  },
  4: {
    targetKills: 22,
    spawnInterval: 0.9,
    speedMult: 1.4,
    maxSlimes: 11,
    pool: ['YELLOW', 'PURPLE', 'BLUE', 'RED_BOMB', 'TILT_LOCK', 'TILT_LOCK'],
    changeText: "🔵 새로운 변화: 단단한 3중 보호막 파란 실드맨 등장!",
    subText: "비행 록온 젤리도 더 자주 나타납니다! 부지런히 움직이세요!"
  },
  5: {
    targetKills: 1, // 중간 보스전
    spawnInterval: 1.3,
    speedMult: 1.45,
    maxSlimes: 6,
    pool: ['YELLOW', 'RED_BOMB', 'TILT_LOCK'],
    changeText: "👾 새로운 변화: 5단계 중간보스 [거대 캡틴 블루젤리] 출현!",
    subText: "우주선을 좌우로 기울이며 중간보스의 몸통을 집중 사격하세요!"
  },
  6: {
    targetKills: 26,
    spawnInterval: 0.82,
    speedMult: 1.55,
    maxSlimes: 12,
    pool: ['YELLOW', 'YELLOW', 'PURPLE', 'BLUE', 'RED_BOMB', 'TILT_LOCK'],
    changeText: "⚡ 새로운 변화: 젤리 이동 속도 대폭 상승! (스피드 웨이브)",
    subText: "아이템 캡슐을 적극적으로 맞춰 무지개 기관총을 발동하세요!"
  },
  7: {
    targetKills: 30,
    spawnInterval: 0.78,
    speedMult: 1.62,
    maxSlimes: 13,
    pool: ['PURPLE', 'BLUE', 'RED_BOMB', 'TILT_LOCK', 'TILT_LOCK', 'TILT_LOCK'],
    changeText: "🛸 새로운 변화: 비행 록온 젤리 대군단 습격!",
    subText: "가만히 있으면 맞출 수 없어요! 폰을 기울여 링 안으로 들어가세요!"
  },
  8: {
    targetKills: 34,
    spawnInterval: 0.72,
    speedMult: 1.7,
    maxSlimes: 14,
    pool: ['YELLOW', 'PURPLE', 'BLUE', 'BLUE', 'RED_BOMB', 'TILT_LOCK'],
    changeText: "🛡️ 새로운 변화: 강화 실드 & 분열 젤리 합동 공격!",
    subText: "빨간 폭탄 젤리를 노려 한 번에 연쇄 폭발을 일으키세요!"
  },
  9: {
    targetKills: 40,
    spawnInterval: 0.65,
    speedMult: 1.8,
    maxSlimes: 15,
    pool: ['YELLOW', 'PURPLE', 'BLUE', 'RED_BOMB', 'RED_BOMB', 'TILT_LOCK', 'TILT_LOCK'],
    changeText: "🔥 새로운 변화: 보스 직전 초고속 총공세! 젤리 폭풍!",
    subText: "위험할 땐 오른손 황금 슈퍼폭탄을 사용하세요!"
  },
  10: {
    targetKills: 1, // 최종 대왕 보스전
    spawnInterval: 1.1,
    speedMult: 1.85,
    maxSlimes: 7,
    pool: ['YELLOW', 'BLUE', 'RED_BOMB', 'TILT_LOCK'],
    changeText: "👑 최종 변화: STAGE 10 대왕 왕관 젤리킹 등장!!",
    subText: "황금 방어막이 켜지면 우주선을 보스 정면으로 이동시켜 격파하세요!"
  }
};

// --- 슬라임 종류 정의 (우주선 조정 필수 젤리 TILT_LOCK 포함) ---
const SLIME_TYPES = {
  GREEN: {
    id: 'GREEN',
    name: '초록 말랑이',
    color: 0x39ff14,
    emissive: 0x0f5505,
    hp: 1,
    speed: 17,
    scale: 2.1,
    score: 100
  },
  YELLOW: {
    id: 'YELLOW',
    name: '노란 통통이',
    color: 0xffe600,
    emissive: 0x665500,
    hp: 1,
    speed: 23,
    scale: 1.85,
    score: 150
  },
  PURPLE: {
    id: 'PURPLE',
    name: '보라 분열이',
    color: 0xc724ff,
    emissive: 0x4b006e,
    hp: 2,
    speed: 15,
    scale: 2.8,
    score: 220
  },
  BLUE: {
    id: 'BLUE',
    name: '파란 실드맨',
    color: 0x00e5ff,
    emissive: 0x004466,
    hp: 3,
    speed: 14,
    scale: 2.5,
    score: 280
  },
  RED_BOMB: {
    id: 'RED_BOMB',
    name: '빨간 폭탄이',
    color: 0xff2255,
    emissive: 0x77001a,
    hp: 1,
    speed: 16,
    scale: 2.4,
    score: 320
  },
  TILT_LOCK: {
    id: 'TILT_LOCK',
    name: '🛸 비행록온 젤리',
    color: 0xffaa00,
    emissive: 0x663300,
    hp: 2,
    speed: 14,
    scale: 2.6,
    score: 400,
    requiresShipAlign: true // 실제 우주선(카메라)의 X/Y 위치가 이 젤리와 가까워야 데미지가 들어감!
  }
};

// --- 4가지 아이템 종류 정의 ---
const ITEM_TYPES = [
  { id: 'RAPID', name: '🌈 무지개 기관총!', color: 0xff55ff, duration: 8 },
  { id: 'MAGNET', name: '⚡ 자석 유도 레이저!', color: 0x00ffcc, duration: 8 },
  { id: 'BOMB_PLUS', name: '🌟 슈퍼스타 폭탄 +1!', color: 0xffdd00, duration: 0 },
  { id: 'HEAL_SHIELD', name: '💖 하트 회복 & 무적보호막!', color: 0xff3377, duration: 6 }
];

// ============================================================================
// 🏆 실시간 글로벌 공유 랭킹 매니저 (ntfy.sh Pub/Sub + LocalStorage 동기화)
// ============================================================================
class RankingManager {
  constructor() {
    this.topic = 'fly-sarang-global-rank-2026-v2';
    this.storageKey = 'fly_sarang_rankings_v2';
    this.rankings = this.loadLocal();
    this.renderList();
    this.fetchGlobalRankings();
    // 8초마다 실시간 랭킹 동기화
    setInterval(() => this.fetchGlobalRankings(), 8000);
  }

  loadLocal() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return [
      { name: '사랑이대장', score: 18500, kills: 95, timeSec: 160, stage: 6 },
      { name: '우주용사', score: 14200, kills: 72, timeSec: 130, stage: 5 },
      { name: '젤리헌터', score: 9800, kills: 50, timeSec: 95, stage: 4 },
      { name: '별빛파일럿', score: 6400, kills: 34, timeSec: 70, stage: 3 },
      { name: '말랑이', score: 3200, kills: 18, timeSec: 45, stage: 2 }
    ];
  }

  saveLocal() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.rankings));
    } catch (e) {}
  }

  mergeEntries(entries) {
    const map = new Map();
    [...this.rankings, ...entries].forEach(item => {
      if (!item || !item.name || typeof item.score !== 'number') return;
      const key = `${item.name.trim().slice(0, 8)}`;
      const existing = map.get(key);
      if (!existing || item.score > existing.score) {
        map.set(key, {
          name: key,
          score: Math.round(item.score),
          kills: item.kills || 0,
          timeSec: item.timeSec || 0,
          stage: item.stage || 1
        });
      }
    });

    this.rankings = Array.from(map.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, 15);
    this.saveLocal();
    this.renderList();
  }

  async fetchGlobalRankings() {
    try {
      const res = await fetch(`https://ntfy.sh/${this.topic}/json?poll=1&since=24h`);
      if (!res.ok) return;
      const text = await res.text();
      const lines = text.trim().split('\n');
      const incoming = [];
      for (const line of lines) {
        if (!line) continue;
        try {
          const pkt = JSON.parse(line);
          if (pkt.event === 'message' && pkt.message) {
            const data = JSON.parse(pkt.message);
            incoming.push(data);
          }
        } catch (err) {}
      }
      if (incoming.length > 0) {
        this.mergeEntries(incoming);
      }
    } catch (err) {
      // 오프라인일 경우 로컬 랭킹 유지
    }
  }

  async submitScore(entry) {
    this.mergeEntries([entry]);
    try {
      await fetch(`https://ntfy.sh/${this.topic}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      });
      this.fetchGlobalRankings();
    } catch (err) {}
  }

  renderList(currentName = '') {
    const ul = document.getElementById('lb-list');
    if (!ul) return;
    const top5 = this.rankings.slice(0, 5);
    const medals = ['🥇', '🥈', '🥉', '4.', '5.'];

    ul.innerHTML = '';
    for (let i = 0; i < 5; i++) {
      const r = top5[i];
      const li = document.createElement('li');
      const isMe = r && currentName && r.name === currentName;
      li.className = `lb-item${isMe ? ' me' : ''}`;
      if (r) {
        li.innerHTML = `<span>${medals[i]} ${r.name} <small>(S${r.stage})</small></span><span>${r.score.toLocaleString()}점</span>`;
      } else {
        li.innerHTML = `<span>${medals[i]} -</span><span>0점</span>`;
      }
      ul.appendChild(li);
    }
  }
}

// ============================================================================
// 🔊 효과음 합성기 + 폴더 내 bgm.mp3 자동 재생 컨트롤러
// ============================================================================
class SoundSystem {
  constructor() {
    this.ctx = null;
    this.bgmAudio = document.getElementById('bgm-audio');
    this.bgmPlaying = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playLaser(isRainbow = false) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = isRainbow ? 'triangle' : 'sawtooth';
    osc.frequency.setValueAtTime(isRainbow ? 920 : 680, now);
    osc.frequency.exponentialRampToValueAtTime(160, now + 0.1);

    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  // 방패에 막혔을 때 팅! 하는 효과음
  playShieldBlock() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.setValueAtTime(160, now + 0.05);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  playJellyPop(pitchScale = 1.0) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    const baseFreq = (330 + Math.random() * 180) * pitchScale;
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 2.6, now + 0.14);

    gain.gain.setValueAtTime(0.32, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);

    const chime = this.ctx.createOscillator();
    const chimeGain = this.ctx.createGain();
    chime.type = 'triangle';
    chime.frequency.setValueAtTime(baseFreq * 3, now + 0.04);
    chime.frequency.exponentialRampToValueAtTime(baseFreq * 4, now + 0.22);

    chimeGain.gain.setValueAtTime(0.14, now + 0.04);
    chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    chime.connect(chimeGain);
    chimeGain.connect(this.ctx.destination);
    chime.start(now + 0.04);
    chime.stop(now + 0.22);
  }

  playBigBoom() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(32, now + 0.45);
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.45);

    [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = 'triangle';
      o.frequency.setValueAtTime(freq, now + idx * 0.04);
      g.gain.setValueAtTime(0.18, now + idx * 0.04);
      g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.35);
      o.connect(g);
      g.connect(this.ctx.destination);
      o.start(now + idx * 0.04);
      o.stop(now + idx * 0.04 + 0.35);
    });
  }

  playPowerUp() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + i * 0.06);
      g.gain.setValueAtTime(0.22, now + i * 0.06);
      g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.2);
      osc.connect(g);
      g.connect(this.ctx.destination);
      osc.start(now + i * 0.06);
      osc.stop(now + i * 0.06 + 0.2);
    });
  }

  startBGM() {
    this.init();
    const btn = document.getElementById('bgm-btn');
    this.bgmAudio.volume = 0.65;
    this.bgmAudio.play().then(() => {
      this.bgmPlaying = true;
      btn.classList.add('active');
      btn.textContent = '🎵 BGM';
    }).catch((err) => {
      console.warn('BGM auto-play blocked until interaction:', err);
    });
  }

  toggleBGM() {
    this.init();
    const btn = document.getElementById('bgm-btn');
    if (this.bgmPlaying) {
      this.bgmAudio.pause();
      this.bgmPlaying = false;
      btn.classList.remove('active');
      btn.textContent = '🔇 BGM';
    } else {
      this.startBGM();
    }
  }
}

// ============================================================================
// 🎮 메인 게임 엔진
// ============================================================================
class FlySarangGame {
  constructor() {
    this.container = document.getElementById('game-container');
    this.sound = new SoundSystem();
    this.ranking = new RankingManager();

    this.playerName = '사랑이';
    this.isRunning = false;
    this.score = 0;
    this.totalKills = 0;
    this.elapsedPlayTime = 0;
    this.combo = 0;
    this.hp = 100;
    this.maxHp = 100;
    this.bombs = 2;

    // 1~10 스테이지 관리
    this.stage = 1;
    this.stageKills = 0;
    this.boss = null;

    // 우주선 위치 (스마트폰 기울기 조종)
    this.shipPos = new THREE.Vector2(0, 0);
    this.shipTarget = new THREE.Vector2(0, 0);
    this.gyroOffset = { x: 0, y: 0 };
    this.rawGyro = { x: 0, y: 0 };
    this.hasGyro = false;

    // 조준점 위치 (왼손 조이스틱)
    this.reticlePos = new THREE.Vector2(0, 0);
    this.joystickVec = new THREE.Vector2(0, 0);

    // 무기 및 버프 상태
    this.isFiring = false;
    this.fireCooldown = 0;
    this.buffs = { rapid: 0, magnet: 0, shield: 0 };

    // 오브젝트 리스트
    this.slimes = [];
    this.lasers = [];
    this.particles = [];
    this.items = [];

    this.spawnTimer = 0;
    this.itemSpawnTimer = 0;
    this.clock = new THREE.Clock();

    this.initThree();
    this.initControls();
    this.animate();
  }

  initThree() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x07051a, 0.0075);

    this.camera = new THREE.PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      0.1,
      300
    );
    this.camera.position.set(0, 0, 18);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.72);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.95);
    dirLight.position.set(15, 25, 20);
    this.scene.add(dirLight);

    const pinkLight = new THREE.PointLight(0xff44cc, 1.2, 120);
    pinkLight.position.set(-20, -15, 10);
    this.scene.add(pinkLight);

    // 우주 별 파티클
    const starGeo = new THREE.BufferGeometry();
    const starCount = 750;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 190;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 130;
      starPositions[i * 3 + 2] = -Math.random() * 160;

      const c = new THREE.Color().setHSL(Math.random(), 0.85, 0.85);
      starColors[i * 3] = c.r;
      starColors[i * 3 + 1] = c.g;
      starColors[i * 3 + 2] = c.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.9
    });

    this.starField = new THREE.Points(starGeo, starMat);
    this.scene.add(this.starField);

    // 1인칭 우주선 양옆 레이저 캐논
    this.shipGroup = new THREE.Group();
    this.camera.add(this.shipGroup);
    this.scene.add(this.camera);

    const cannonGeo = new THREE.CylinderGeometry(0.18, 0.32, 2.5, 12);
    cannonGeo.rotateX(Math.PI / 2);
    const cannonMat = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      metalness: 0.6,
      roughness: 0.2,
      emissive: 0x004466
    });

    this.leftCannon = new THREE.Mesh(cannonGeo, cannonMat);
    this.leftCannon.position.set(-2.4, -1.6, -2.5);
    this.rightCannon = new THREE.Mesh(cannonGeo, cannonMat);
    this.rightCannon.position.set(2.4, -1.6, -2.5);
    this.shipGroup.add(this.leftCannon, this.rightCannon);

    window.addEventListener('resize', () => this.onResize());
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  initControls() {
    const joyBase = document.getElementById('joystick-base');
    const joyStick = document.getElementById('joystick-stick');
    let joyTouchId = null;
    const maxRadius = 44;

    const updateJoystick = (clientX, clientY) => {
      const rect = joyBase.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      let dx = clientX - centerX;
      let dy = clientY - centerY;
      const dist = Math.hypot(dx, dy);
      if (dist > maxRadius) {
        dx = (dx / dist) * maxRadius;
        dy = (dy / dist) * maxRadius;
      }
      joyStick.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
      this.joystickVec.set(dx / maxRadius, -dy / maxRadius);
    };

    const resetJoystick = () => {
      joyTouchId = null;
      joyStick.style.transform = `translate(-50%, -50%)`;
      this.joystickVec.set(0, 0);
    };

    joyBase.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const touch = e.changedTouches[0];
      joyTouchId = touch.identifier;
      updateJoystick(touch.clientX, touch.clientY);
    }, { passive: false });

    joyBase.addEventListener('touchmove', (e) => {
      e.preventDefault();
      for (const touch of e.changedTouches) {
        if (touch.identifier === joyTouchId) {
          updateJoystick(touch.clientX, touch.clientY);
        }
      }
    }, { passive: false });

    joyBase.addEventListener('touchend', (e) => {
      for (const touch of e.changedTouches) {
        if (touch.identifier === joyTouchId) resetJoystick();
      }
    });
    joyBase.addEventListener('touchcancel', resetJoystick);

    let mouseJoyDown = false;
    joyBase.addEventListener('mousedown', (e) => {
      mouseJoyDown = true;
      updateJoystick(e.clientX, e.clientY);
    });
    window.addEventListener('mousemove', (e) => {
      if (mouseJoyDown) updateJoystick(e.clientX, e.clientY);
    });
    window.addEventListener('mouseup', () => {
      if (mouseJoyDown) {
        mouseJoyDown = false;
        resetJoystick();
      }
    });

    const fireBtn = document.getElementById('fire-btn');
    const bombBtn = document.getElementById('bomb-btn');

    const startFire = (e) => {
      e.preventDefault();
      this.isFiring = true;
      fireBtn.classList.add('pressed');
      this.fireLaser();
    };
    const stopFire = (e) => {
      e.preventDefault();
      this.isFiring = false;
      fireBtn.classList.remove('pressed');
    };

    fireBtn.addEventListener('touchstart', startFire, { passive: false });
    fireBtn.addEventListener('touchend', stopFire, { passive: false });
    fireBtn.addEventListener('touchcancel', stopFire, { passive: false });
    fireBtn.addEventListener('mousedown', startFire);
    window.addEventListener('mouseup', () => {
      this.isFiring = false;
      fireBtn.classList.remove('pressed');
    });

    bombBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.useSuperBomb();
    }, { passive: false });
    bombBtn.addEventListener('click', () => this.useSuperBomb());

    // 스마트폰 기울기 센서 (넓은 비행 반경 지원)
    window.addEventListener('deviceorientation', (e) => {
      if (e.gamma === null && e.beta === null) return;
      this.hasGyro = true;

      const orient = window.orientation || (window.screen.orientation && window.screen.orientation.angle) || 90;
      let tiltLR = 0;
      let tiltUD = 0;

      if (orient === 90) {
        tiltLR = e.beta || 0;
        tiltUD = -(e.gamma || 0);
      } else if (orient === -90 || orient === 270) {
        tiltLR = -(e.beta || 0);
        tiltUD = e.gamma || 0;
      } else {
        tiltLR = e.gamma || 0;
        tiltUD = e.beta || 0;
      }

      this.rawGyro.x = tiltLR;
      this.rawGyro.y = tiltUD;

      const adjX = THREE.MathUtils.clamp((tiltLR - this.gyroOffset.x) / 20, -1, 1);
      const adjY = THREE.MathUtils.clamp((tiltUD - this.gyroOffset.y) / 18, -1, 1);

      this.shipTarget.set(adjX * 20, adjY * 11);

      const tiltIcon = document.getElementById('tilt-icon');
      if (tiltIcon) {
        tiltIcon.style.transform = `rotate(${adjX * 30}deg)`;
      }
    });

    document.getElementById('gyro-cali-btn').addEventListener('click', () => {
      this.gyroOffset.x = this.rawGyro.x;
      this.gyroOffset.y = this.rawGyro.y;
      this.showFunnyText('🧭 기울기 영점 완료!', window.innerWidth / 2, window.innerHeight / 2, '#00ffcc');
    });

    this.keys = {};
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
      if (e.code === 'Space') this.isFiring = true;
      if (e.code === 'KeyB') this.useSuperBomb();
    });
    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
      if (e.code === 'Space') this.isFiring = false;
    });

    document.getElementById('bgm-btn').addEventListener('click', () => {
      this.sound.toggleBGM();
    });

    document.getElementById('start-btn').addEventListener('click', () => this.requestSensorAndStart());
    document.getElementById('restart-btn').addEventListener('click', () => this.startGame());
  }

  async requestSensorAndStart() {
    const nameInput = document.getElementById('player-name');
    if (nameInput && nameInput.value.trim()) {
      this.playerName = nameInput.value.trim().slice(0, 8);
    }
    this.sound.init();
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        await DeviceOrientationEvent.requestPermission();
      } catch (err) {}
    }
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
    this.sound.startBGM();
    this.startGame();
  }

  // --------------------------------------------------------------------------
  // 🎬 게임 시작 및 10단계 스테이지 관리
  // --------------------------------------------------------------------------
  startGame() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('end-screen').classList.add('hidden');
    document.getElementById('boss-hud').classList.add('hidden');
    document.getElementById('tilt-guide-alert').classList.add('hidden');

    this.slimes.forEach(s => this.scene.remove(s.mesh));
    this.lasers.forEach(l => this.scene.remove(l.mesh));
    this.particles.forEach(p => this.scene.remove(p.mesh));
    this.items.forEach(it => this.scene.remove(it.mesh));
    if (this.boss) {
      this.scene.remove(this.boss.mesh);
      this.boss = null;
    }

    this.slimes = [];
    this.lasers = [];
    this.particles = [];
    this.items = [];

    this.score = 0;
    this.totalKills = 0;
    this.elapsedPlayTime = 0;
    this.combo = 0;
    this.hp = 100;
    this.bombs = 2;
    this.stage = 1;
    this.stageKills = 0;
    this.buffs = { rapid: 0, magnet: 0, shield: 0 };
    this.gyroOffset = { x: this.rawGyro.x, y: this.rawGyro.y };

    this.updateHUD();
    this.ranking.renderList(this.playerName);
    this.isRunning = true;
    this.announceStage(1);
  }

  announceStage(stageNum) {
    this.stage = stageNum;
    this.stageKills = 0;
    const cfg = STAGE_CONFIG[stageNum];

    document.getElementById('stage-display').textContent = `STAGE ${stageNum} / 10`;

    const banner = document.getElementById('stage-banner');
    document.getElementById('banner-tag').textContent =
      stageNum === 10 ? '👑 FINAL STAGE 10 👑' : `🚀 STAGE ${stageNum} 돌입!`;
    document.getElementById('banner-title').textContent =
      stageNum === 10 ? '최종 결전! 대왕 왕관 젤리킹' : `STAGE ${stageNum}`;
    document.getElementById('banner-change-box').textContent = cfg.changeText;
    document.getElementById('banner-sub').textContent = cfg.subText;

    banner.classList.remove('hidden');
    setTimeout(() => banner.classList.add('hidden'), 3200);

    if (stageNum === 5) {
      setTimeout(() => this.spawnBoss(true), 1400);
    } else if (stageNum === 10) {
      setTimeout(() => this.spawnBoss(false), 1400);
    }
  }

  // --------------------------------------------------------------------------
  // 🟢🟡🟣🔵🔴🛸 슬라임 생성 (비행 조정 필수 TILT_LOCK 포함)
  // --------------------------------------------------------------------------
  createCuteEyes(radius) {
    const eyeGroup = new THREE.Group();
    const whiteGeo = new THREE.SphereGeometry(radius * 0.22, 12, 12);
    const whiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const pupilGeo = new THREE.SphereGeometry(radius * 0.12, 10, 10);
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x111122 });

    [-1, 1].forEach(dir => {
      const eye = new THREE.Mesh(whiteGeo, whiteMat);
      eye.position.set(dir * radius * 0.36, radius * 0.18, radius * 0.85);
      const pupil = new THREE.Mesh(pupilGeo, pupilMat);
      pupil.position.set(0, 0, radius * 0.14);
      eye.add(pupil);
      eyeGroup.add(eye);
    });

    return eyeGroup;
  }

  spawnSlime(forcedType = null, customPos = null, customScale = null) {
    const stg = STAGE_CONFIG[this.stage] || STAGE_CONFIG[10];
    let typeKey = forcedType;
    if (!typeKey) {
      typeKey = stg.pool[Math.floor(Math.random() * stg.pool.length)];
    }

    const cfg = SLIME_TYPES[typeKey];
    const radius = customScale || cfg.scale;
    const group = new THREE.Group();

    const geo = new THREE.SphereGeometry(radius, 22, 22);
    const mat = new THREE.MeshPhongMaterial({
      color: cfg.color,
      emissive: cfg.emissive,
      shininess: 115,
      transparent: true,
      opacity: 0.9
    });
    const body = new THREE.Mesh(geo, mat);
    group.add(body);
    group.add(this.createCuteEyes(radius));

    let shieldMesh = null;
    if (typeKey === 'BLUE') {
      const sGeo = new THREE.TorusGeometry(radius * 1.25, 0.15, 12, 32);
      const sMat = new THREE.MeshBasicMaterial({ color: 0x7df9ff, wireframe: true });
      shieldMesh = new THREE.Mesh(sGeo, sMat);
      group.add(shieldMesh);
    }

    if (typeKey === 'RED_BOMB') {
      const fuseGeo = new THREE.OctahedronGeometry(radius * 0.38);
      const fuseMat = new THREE.MeshBasicMaterial({ color: 0xffe600 });
      const fuse = new THREE.Mesh(fuseGeo, fuseMat);
      fuse.position.set(0, radius * 1.18, 0);
      group.add(fuse);
    }

    // 🛸 실제 우주선 조정 필수 젤리(TILT_LOCK): 전면 배리어 실드 + 터널 가이드 링
    let alignRing = null;
    let barrierMesh = null;
    if (typeKey === 'TILT_LOCK') {
      const ringGeo = new THREE.RingGeometry(radius * 1.35, radius * 1.7, 28);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xffdd00,
        side: THREE.DoubleSide
      });
      alignRing = new THREE.Mesh(ringGeo, ringMat);
      alignRing.position.z = radius * 0.9;
      group.add(alignRing);

      const barGeo = new THREE.SphereGeometry(radius * 1.28, 16, 16);
      const barMat = new THREE.MeshBasicMaterial({
        color: 0xffaa00,
        wireframe: true,
        transparent: true,
        opacity: 0.75
      });
      barrierMesh = new THREE.Mesh(barGeo, barMat);
      group.add(barrierMesh);
    }

    if (customPos) {
      group.position.copy(customPos);
    } else {
      // TILT_LOCK 젤리는 플레이어가 일부러 우주선을 좌우/상하로 기울여 찾아가야 하도록 바깥쪽 좌표에 주로 배치
      if (typeKey === 'TILT_LOCK') {
        const sideX = (Math.random() < 0.5 ? -1 : 1) * (8 + Math.random() * 10);
        const sideY = (Math.random() - 0.5) * 16;
        group.position.set(sideX, sideY, -95 - Math.random() * 20);
      } else {
        group.position.set(
          (Math.random() - 0.5) * 38,
          (Math.random() - 0.5) * 22,
          -95 - Math.random() * 25
        );
      }
    }

    this.scene.add(group);

    this.slimes.push({
      mesh: group,
      bodyMesh: body,
      shieldMesh,
      alignRing,
      barrierMesh,
      type: typeKey,
      cfg,
      hp: customScale ? 1 : cfg.hp,
      speed: cfg.speed * stg.speedMult,
      radius,
      baseX: group.position.x,
      baseY: group.position.y,
      wobbleSeed: Math.random() * 100,
      isMini: Boolean(customScale),
      isAligned: false
    });
  }

  // 👑 Stage 5 중간보스 & Stage 10 대왕 왕관 젤리킹 생성
  spawnBoss(isMidBoss = false) {
    if (this.boss) return;
    const radius = isMidBoss ? 5.8 : 7.8;
    const group = new THREE.Group();

    const bodyGeo = new THREE.SphereGeometry(radius, 32, 32);
    const bodyMat = new THREE.MeshPhongMaterial({
      color: isMidBoss ? 0x00b8ff : 0xff2a85,
      emissive: isMidBoss ? 0x002255 : 0x550022,
      shininess: 130,
      transparent: true,
      opacity: 0.92
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    group.add(body);
    group.add(this.createCuteEyes(radius));

    // 황금 왕관
    const crownGroup = new THREE.Group();
    const crownBaseGeo = new THREE.CylinderGeometry(3.4, 2.8, 2.2, 8);
    const crownMat = new THREE.MeshStandardMaterial({
      color: isMidBoss ? 0x00ffcc : 0xffd700,
      metalness: 0.7,
      roughness: 0.2,
      emissive: 0x443300
    });
    const crownBase = new THREE.Mesh(crownBaseGeo, crownMat);
    crownGroup.add(crownBase);

    const gemGeo = new THREE.OctahedronGeometry(0.7);
    const gemMat = new THREE.MeshBasicMaterial({ color: 0xff00aa });
    for (let i = 0; i < 6; i++) {
      const gem = new THREE.Mesh(gemGeo, gemMat);
      const angle = (i / 6) * Math.PI * 2;
      gem.position.set(Math.cos(angle) * 3.1, 0.3, Math.sin(angle) * 3.1);
      crownGroup.add(gem);
    }

    crownGroup.position.set(0, radius + 1.1, 0);
    group.add(crownGroup);

    group.position.set(0, 2, -68);
    this.scene.add(group);

    const maxHp = isMidBoss ? 45 : 110;
    this.boss = {
      mesh: group,
      bodyMesh: body,
      crown: crownGroup,
      radius,
      hp: maxHp,
      maxHp,
      isMidBoss,
      time: 0
    };

    document.getElementById('boss-name-label').textContent = isMidBoss
      ? '👾 STAGE 5 중간보스: 캡틴 블루젤리 👾'
      : '👑 STAGE 10 최종보스: 대왕 왕관 젤리킹 👑';
    document.getElementById('boss-hud').classList.remove('hidden');
    document.getElementById('boss-hp-fill').style.width = '100%';
  }

  spawnItemCapsule() {
    const itemCfg = ITEM_TYPES[Math.floor(Math.random() * ITEM_TYPES.length)];
    const group = new THREE.Group();

    const geo = new THREE.OctahedronGeometry(2.1, 1);
    const mat = new THREE.MeshPhongMaterial({
      color: itemCfg.color,
      emissive: itemCfg.color,
      emissiveIntensity: 0.35,
      shininess: 120
    });
    const mesh = new THREE.Mesh(geo, mat);
    group.add(mesh);

    const ringGeo = new THREE.TorusGeometry(2.7, 0.16, 10, 28);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    group.add(ring);

    group.position.set(
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 16,
      -85
    );

    this.scene.add(group);
    this.items.push({
      mesh: group,
      ring,
      cfg: itemCfg,
      radius: 2.8
    });
  }

  // --------------------------------------------------------------------------
  // 🔫 레이저 발사 (난이도 상향: 기본 에임보정 축소 & 빠른 탄속)
  // --------------------------------------------------------------------------
  fireLaser() {
    if (!this.isRunning || this.fireCooldown > 0) return;

    const isRapid = this.buffs.rapid > 0;
    this.fireCooldown = isRapid ? 0.085 : 0.16;
    this.sound.playLaser(isRapid);

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(this.reticlePos, this.camera);

    const targetPoint = new THREE.Vector3();
    raycaster.ray.at(75, targetPoint);

    // 난이도를 한 단계 높여 기본 에임 보정 반경을 줄임 (자석 아이템 획득 시에는 강력 유도)
    const magnetRange = this.buffs.magnet > 0 ? 16 : 3.2;
    let lockedTarget = null;
    let minDist = magnetRange;

    const candidates = [...this.slimes];
    if (this.boss) candidates.push(this.boss);

    for (const enemy of candidates) {
      const closestPt = new THREE.Vector3();
      raycaster.ray.closestPointToPoint(enemy.mesh.position, closestPt);
      const dist = closestPt.distanceTo(enemy.mesh.position);
      if (dist < minDist + enemy.radius * 0.45) {
        minDist = dist;
        lockedTarget = enemy;
      }
    }

    if (lockedTarget) {
      targetPoint.copy(lockedTarget.mesh.position);
    }

    const origins = [
      new THREE.Vector3(-2.2, -1.4, -2.0).applyMatrix4(this.camera.matrixWorld),
      new THREE.Vector3(2.2, -1.4, -2.0).applyMatrix4(this.camera.matrixWorld)
    ];

    origins.forEach((origin) => {
      const dir = new THREE.Vector3().subVectors(targetPoint, origin).normalize();
      const color = isRapid
        ? new THREE.Color().setHSL(Math.random(), 1.0, 0.55).getHex()
        : 0x00ffcc;

      const laserGeo = new THREE.SphereGeometry(isRapid ? 0.52 : 0.4, 8, 8);
      const laserMat = new THREE.MeshBasicMaterial({ color });
      const mesh = new THREE.Mesh(laserGeo, laserMat);
      mesh.position.copy(origin);
      this.scene.add(mesh);

      this.lasers.push({
        mesh,
        vel: dir.multiplyScalar(155),
        life: 1.35,
        lockedTarget: this.buffs.magnet > 0 ? lockedTarget : null
      });
    });

    this.leftCannon.position.z = -1.9;
    this.rightCannon.position.z = -1.9;
  }

  useSuperBomb() {
    if (!this.isRunning || this.bombs <= 0) return;
    this.bombs--;
    this.updateHUD();
    this.sound.playBigBoom();

    this.showFunnyText('🌟 슈퍼스타 올킬 대폭발!! 🌟', window.innerWidth / 2, window.innerHeight * 0.4, '#ffe600');

    const currentSlimes = [...this.slimes];
    currentSlimes.forEach(s => this.destroySlime(s, true));

    if (this.boss) {
      this.damageBoss(14);
    }
  }

  // --------------------------------------------------------------------------
  // 💥 젤리 스플래시 파티클 & 폭탄 연쇄 폭발
  // --------------------------------------------------------------------------
  createJellySplash(pos, baseColor, count = 28, isBig = false) {
    const candyColors = [baseColor, 0xff66cc, 0xffe600, 0x00ffcc, 0xffffff];

    for (let i = 0; i < count; i++) {
      const size = (isBig ? 0.55 : 0.38) * (0.5 + Math.random() * 1.1);
      const geo = new THREE.SphereGeometry(size, 8, 8);
      const col = candyColors[i % candyColors.length];
      const mat = new THREE.MeshPhongMaterial({
        color: col,
        emissive: col,
        emissiveIntensity: 0.35,
        shininess: 100,
        transparent: true,
        opacity: 0.95
      });

      const drop = new THREE.Mesh(geo, mat);
      drop.position.copy(pos);

      const speed = (isBig ? 28 : 18) * (0.4 + Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const vel = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta) * speed,
        Math.sin(phi) * Math.sin(theta) * speed + 4,
        Math.cos(phi) * speed
      );

      this.scene.add(drop);
      this.particles.push({
        mesh: drop,
        vel,
        life: 0.75 + Math.random() * 0.45
      });
    }
  }

  destroySlime(slime, fromChain = false) {
    const idx = this.slimes.indexOf(slime);
    if (idx === -1) return;
    this.slimes.splice(idx, 1);
    this.scene.remove(slime.mesh);

    this.combo++;
    this.totalKills++;
    this.stageKills++;
    this.score += slime.cfg.score + Math.min(this.combo * 12, 240);

    const screenPt = this.worldToScreen(slime.mesh.position);

    if (slime.type === 'RED_BOMB') {
      this.sound.playBigBoom();
      this.createJellySplash(slime.mesh.position, 0xff2255, 45, true);

      const quote = CHAIN_QUOTES[Math.floor(Math.random() * CHAIN_QUOTES.length)];
      this.showFunnyText(quote, screenPt.x, screenPt.y, '#ff4466');

      const chainRadius = 22;
      const nearby = this.slimes.filter(
        other => other.mesh.position.distanceTo(slime.mesh.position) < chainRadius
      );
      nearby.forEach(other => this.destroySlime(other, true));
    } else {
      this.sound.playJellyPop(slime.isMini ? 1.35 : 1.0);
      this.createJellySplash(slime.mesh.position, slime.cfg.color, 26, false);

      if (!fromChain && (Math.random() < 0.38 || this.combo % 6 === 0)) {
        const quote = FUNNY_QUOTES[Math.floor(Math.random() * FUNNY_QUOTES.length)];
        this.showFunnyText(quote, screenPt.x, screenPt.y, '#ffe600');
      }
    }

    if (slime.type === 'PURPLE' && !slime.isMini) {
      [-2.2, 2.2].forEach(offsetX => {
        const splitPos = slime.mesh.position.clone();
        splitPos.x += offsetX;
        this.spawnSlime('PURPLE', splitPos, 1.45);
      });
    }

    this.updateHUD();
    this.checkStageProgression();
  }

  damageBoss(dmg) {
    if (!this.boss) return;
    this.boss.hp -= dmg;
    this.sound.playJellyPop(0.75);
    this.createJellySplash(this.boss.mesh.position, 0xff2a85, 14, false);

    const ratio = Math.max(0, (this.boss.hp / this.boss.maxHp) * 100);
    document.getElementById('boss-hp-fill').style.width = `${ratio}%`;

    if (Math.random() < 0.25) {
      const bossCry = [
        "👑 아야! 내 탱글탱글한 볼살이!!",
        "👑 사랑이 레이저 너무 따가워~!",
        "👑 으악! 왕관 흔들린다구!!"
      ];
      const pt = this.worldToScreen(this.boss.mesh.position);
      this.showFunnyText(bossCry[Math.floor(Math.random() * bossCry.length)], pt.x, pt.y, '#ff99cc');
    }

    if (this.boss.hp <= 0) {
      this.defeatBoss();
    }
  }

  defeatBoss() {
    const wasMidBoss = this.boss.isMidBoss;
    const bossPos = this.boss.mesh.position.clone();
    this.scene.remove(this.boss.mesh);
    this.boss = null;
    document.getElementById('boss-hud').classList.add('hidden');

    this.sound.playBigBoom();
    this.createJellySplash(bossPos, 0xff2a85, 85, true);
    this.createJellySplash(bossPos, 0xffe600, 65, true);

    this.totalKills++;
    this.score += wasMidBoss ? 2000 : 5000;
    this.updateHUD();

    const pt = this.worldToScreen(bossPos);
    if (wasMidBoss) {
      this.showFunnyText("👾 중간보스 격파 성공!! STAGE 6로 전진!", pt.x, pt.y, '#00ffcc');
      setTimeout(() => this.announceStage(6), 1500);
    } else {
      this.showFunnyText("👑 으악! 젤리킹 항복~!! 푸딩이 되었어요!! 🍮", pt.x, pt.y, '#ffe600');
      setTimeout(() => this.endGame(true), 2200);
    }
  }

  checkStageProgression() {
    if (this.stage === 5 || this.stage === 10) return; // 보스 스테이지는 보스 처치 시 이동
    const target = STAGE_CONFIG[this.stage].targetKills;
    if (this.stageKills >= target) {
      this.announceStage(this.stage + 1);
    }
  }

  // --------------------------------------------------------------------------
  // 🖥️ UI 업데이트 및 점수 합산 (처치 수 + 클리어 시간 보너스)
  // --------------------------------------------------------------------------
  worldToScreen(pos) {
    const v = pos.clone().project(this.camera);
    return {
      x: (v.x * 0.5 + 0.5) * window.innerWidth,
      y: (-(v.y * 0.5) + 0.5) * window.innerHeight
    };
  }

  showFunnyText(text, x, y, color = '#ffffff') {
    const layer = document.getElementById('funny-text-layer');
    const el = document.createElement('div');
    el.className = 'funny-pop';
    el.textContent = text;
    el.style.left = `${THREE.MathUtils.clamp(x, 110, window.innerWidth - 110)}px`;
    el.style.top = `${THREE.MathUtils.clamp(y, 70, window.innerHeight - 90)}px`;
    el.style.color = color;
    layer.appendChild(el);
    setTimeout(() => el.remove(), 1150);
  }

  formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  updateHUD() {
    document.getElementById('score-display').textContent = this.score.toLocaleString();
    document.getElementById('kill-display').textContent = this.totalKills;
    document.getElementById('bomb-count').textContent = this.bombs;
    document.getElementById('hp-bar-fill').style.width = `${Math.max(0, this.hp)}%`;

    const comboEl = document.getElementById('combo-display');
    if (this.combo >= 2) {
      comboEl.classList.remove('hidden');
      comboEl.textContent = `${this.combo} COMBO! 🔥`;
    } else {
      comboEl.classList.add('hidden');
    }
  }

  endGame(isClear) {
    this.isRunning = false;
    const endScreen = document.getElementById('end-screen');
    const badge = document.getElementById('end-badge');
    const title = document.getElementById('end-title');
    const quoteBox = document.getElementById('boss-quote-box');

    // 깨는 시간과 물리친 젤리 숫자를 합산한 최종 랭킹 점수 계산
    const timeSec = Math.max(1, Math.round(this.elapsedPlayTime));
    const killBonus = this.totalKills * 150;
    const timeSpeedBonus = isClear
      ? Math.max(1000, Math.round((420 - Math.min(timeSec, 400)) * 35))
      : this.stage * 350;
    const totalFinalScore = this.score + killBonus + timeSpeedBonus;

    document.getElementById('end-kills').textContent = `${this.totalKills}마리 (+${killBonus.toLocaleString()}점)`;
    document.getElementById('end-time').textContent = `${timeSec}초 (STAGE ${this.stage})`;
    document.getElementById('end-time-bonus').textContent = `+${timeSpeedBonus.toLocaleString()}점`;
    document.getElementById('final-score').textContent = totalFinalScore.toLocaleString();

    // 글로벌 공유 랭킹에 즉시 등록 및 좌측 보드 갱신
    this.ranking.submitScore({
      name: this.playerName,
      score: totalFinalScore,
      kills: this.totalKills,
      timeSec,
      stage: this.stage
    });

    if (isClear) {
      badge.textContent = '🎉 STAGE 10 ALL CLEAR! 🎉';
      title.textContent = '우주 최강 수호자 사랑이 승리!';
      quoteBox.innerHTML =
        '👑 <strong>대왕 왕관 젤리킹의 유언:</strong><br/>' +
        '"으악!! 10단계까지 뚫고 와서 내 황금 왕관을 딸기 푸딩으로 만들다니!<br/>' +
        '사랑이 대장님의 환상적인 비행 조종 실력에 우주 젤리들은 모두 항복합니다~!<br/>' +
        '다음엔 맛있는 젤리 간식 들고 평화롭게 놀러 올게요~ 뿅! 🍮💖"';
    } else {
      badge.textContent = `💫 STAGE ${this.stage} 기록 달성! 💫`;
      title.textContent = '우주선이 젤리 범벅이 되었어요!';
      quoteBox.innerHTML =
        '젤리들이 우주선 유리창에 잔뜩 붙어버렸어요!<br/>' +
        '점수가 좌측 실시간 랭킹에 기록되었습니다. 다시 출동해 볼까요? 🚀';
    }

    endScreen.classList.remove('hidden');
  }

  // --------------------------------------------------------------------------
  // 🔄 메인 게임 루프
  // --------------------------------------------------------------------------
  animate() {
    requestAnimationFrame(() => this.animate());

    const dt = Math.min(this.clock.getDelta(), 0.1);
    const elapsed = this.clock.getElapsedTime();

    if (this.starField) {
      const positions = this.starField.geometry.attributes.position.array;
      const starSpeed = this.isRunning ? 28 + this.stage * 3 : 20;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] += dt * starSpeed;
        if (positions[i + 2] > 20) positions[i + 2] = -150;
      }
      this.starField.geometry.attributes.position.needsUpdate = true;
    }

    if (!this.isRunning) {
      this.renderer.render(this.scene, this.camera);
      return;
    }

    // 플레이 시간 갱신
    this.elapsedPlayTime += dt;
    document.getElementById('time-display').textContent = this.formatTime(this.elapsedPlayTime);

    // 1. 키보드 보조 입력 (PC 테스트용)
    if (!this.hasGyro) {
      if (this.keys['KeyA']) this.shipTarget.x -= 22 * dt;
      if (this.keys['KeyD']) this.shipTarget.x += 22 * dt;
      if (this.keys['KeyW']) this.shipTarget.y += 16 * dt;
      if (this.keys['KeyS']) this.shipTarget.y -= 16 * dt;
      this.shipTarget.x = THREE.MathUtils.clamp(this.shipTarget.x, -20, 20);
      this.shipTarget.y = THREE.MathUtils.clamp(this.shipTarget.y, -11, 11);
    }

    // 2. 기울기에 따른 우주선 위치 업데이트
    this.shipPos.lerp(this.shipTarget, dt * 5.5);
    this.camera.position.x = this.shipPos.x;
    this.camera.position.y = this.shipPos.y;
    this.camera.rotation.z = -this.shipPos.x * 0.015;

    // 3. 왼손 조이스틱으로 조준선(크로스헤어) 이동
    let joyX = this.joystickVec.x;
    let joyY = this.joystickVec.y;
    if (this.keys['ArrowLeft']) joyX = -1;
    if (this.keys['ArrowRight']) joyX = 1;
    if (this.keys['ArrowUp']) joyY = 1;
    if (this.keys['ArrowDown']) joyY = -1;

    this.reticlePos.x = THREE.MathUtils.clamp(this.reticlePos.x + joyX * dt * 1.5, -0.84, 0.84);
    this.reticlePos.y = THREE.MathUtils.clamp(this.reticlePos.y + joyY * dt * 1.5, -0.76, 0.76);

    const ch = document.getElementById('crosshair');
    ch.style.left = `${(this.reticlePos.x * 0.5 + 0.5) * 100}%`;
    ch.style.top = `${(-this.reticlePos.y * 0.5 + 0.5) * 100}%`;

    this.leftCannon.position.z = THREE.MathUtils.lerp(this.leftCannon.position.z, -2.5, dt * 12);
    this.rightCannon.position.z = THREE.MathUtils.lerp(this.rightCannon.position.z, -2.5, dt * 12);

    // 4. 연사 및 버프 타이머
    if (this.fireCooldown > 0) this.fireCooldown -= dt;
    if (this.isFiring) this.fireLaser();

    let buffHtml = '';
    if (this.buffs.rapid > 0) {
      this.buffs.rapid -= dt;
      buffHtml += `<div class="buff-pill">🌈 기관총 ${Math.ceil(this.buffs.rapid)}s</div>`;
    }
    if (this.buffs.magnet > 0) {
      this.buffs.magnet -= dt;
      buffHtml += `<div class="buff-pill">⚡ 유도탄 ${Math.ceil(this.buffs.magnet)}s</div>`;
    }
    if (this.buffs.shield > 0) {
      this.buffs.shield -= dt;
      buffHtml += `<div class="buff-pill">💖 무적실드 ${Math.ceil(this.buffs.shield)}s</div>`;
    }
    document.getElementById('active-buffs').innerHTML = buffHtml;

    // 5. 스테이지별 슬라임 및 아이템 스폰
    const stg = STAGE_CONFIG[this.stage] || STAGE_CONFIG[10];
    this.spawnTimer -= dt;
    if (this.spawnTimer <= 0 && this.slimes.length < stg.maxSlimes) {
      this.spawnSlime();
      this.spawnTimer = stg.spawnInterval;
    }

    this.itemSpawnTimer += dt;
    if (this.itemSpawnTimer > 9.0) {
      this.itemSpawnTimer = 0;
      this.spawnItemCapsule();
    }

    // 비행 록온 젤리(TILT_LOCK) 존재 여부 체크 및 우주선 정렬 상태 업데이트
    let hasUnalignedTiltSlime = false;
    for (const s of this.slimes) {
      if (s.type === 'TILT_LOCK') {
        const alignDist = Math.hypot(
          s.mesh.position.x - this.camera.position.x,
          s.mesh.position.y - this.camera.position.y
        );
        // 우주선이 젤리의 정면 반경 6.8 이내로 비행 이동해야 방어막이 해제됨!
        s.isAligned = alignDist < 6.8;
        if (s.alignRing && s.barrierMesh) {
          if (s.isAligned) {
            s.alignRing.material.color.setHex(0x39ff14);
            s.barrierMesh.visible = false;
          } else {
            s.alignRing.material.color.setHex(0xff3300);
            s.barrierMesh.visible = true;
            hasUnalignedTiltSlime = true;
          }
        }
      }
    }

    const tiltAlert = document.getElementById('tilt-guide-alert');
    if (hasUnalignedTiltSlime) {
      tiltAlert.classList.remove('hidden');
    } else {
      tiltAlert.classList.add('hidden');
    }

    // 6. 레이저 이동 및 충돌 판정
    for (let i = this.lasers.length - 1; i >= 0; i--) {
      const l = this.lasers[i];
      l.life -= dt;

      if (l.lockedTarget && l.lockedTarget.mesh.parent) {
        const desired = new THREE.Vector3()
          .subVectors(l.lockedTarget.mesh.position, l.mesh.position)
          .normalize()
          .multiplyScalar(155);
        l.vel.lerp(desired, dt * 10);
      }

      l.mesh.position.addScaledVector(l.vel, dt);
      let hit = false;

      // 아이템 캡슐 타격
      for (let j = this.items.length - 1; j >= 0; j--) {
        const it = this.items[j];
        if (l.mesh.position.distanceTo(it.mesh.position) < it.radius + 1.4) {
          this.activateItem(it);
          this.scene.remove(it.mesh);
          this.items.splice(j, 1);
          hit = true;
          break;
        }
      }

      // 슬라임 타격
      if (!hit) {
        for (let j = this.slimes.length - 1; j >= 0; j--) {
          const s = this.slimes[j];
          if (l.mesh.position.distanceTo(s.mesh.position) < s.radius + 1.2) {
            // 🛸 TILT_LOCK 젤리는 실제 우주선이 정면으로 이동해 정렬되지 않으면 총알이 튕겨나감!
            if (s.type === 'TILT_LOCK' && !s.isAligned) {
              this.sound.playShieldBlock();
              const pt = this.worldToScreen(s.mesh.position);
              if (Math.random() < 0.35) {
                this.showFunnyText('🛸 우주선을 기울여 정면으로 맞추세요!', pt.x, pt.y, '#ffaa00');
              }
              hit = true;
              break;
            }

            s.hp--;
            if (s.hp <= 0) {
              this.destroySlime(s);
            } else {
              this.sound.playJellyPop(1.4);
              this.createJellySplash(l.mesh.position, s.cfg.color, 8, false);
              s.bodyMesh.scale.set(1.25, 0.75, 1.25);
              if (s.shieldMesh && s.hp === 1) {
                s.mesh.remove(s.shieldMesh);
              }
            }
            hit = true;
            break;
          }
        }
      }

      // 보스 타격
      if (!hit && this.boss) {
        if (l.mesh.position.distanceTo(this.boss.mesh.position) < this.boss.radius + 1.5) {
          this.damageBoss(1);
          hit = true;
        }
      }

      if (hit || l.life <= 0) {
        this.scene.remove(l.mesh);
        this.lasers.splice(i, 1);
      }
    }

    // 7. 슬라임 이동 업데이트
    for (let i = this.slimes.length - 1; i >= 0; i--) {
      const s = this.slimes[i];
      s.mesh.position.z += s.speed * dt;

      const wobble = Math.sin(elapsed * 7.5 + s.wobbleSeed) * 0.16;
      s.bodyMesh.scale.lerp(new THREE.Vector3(1 + wobble, 1 - wobble, 1 + wobble), dt * 10);

      if (s.type === 'YELLOW') {
        s.mesh.position.x = s.baseX + Math.sin(elapsed * 5.0 + s.wobbleSeed) * 7.5;
        s.mesh.position.y = s.baseY + Math.abs(Math.cos(elapsed * 6.5 + s.wobbleSeed)) * 4.5;
      } else if (s.type === 'TILT_LOCK') {
        // 비행 록온 젤리는 플레이어가 직접 우주선을 움직여 맞추도록 자기 라인을 유지하며 다가옴
        s.mesh.position.x = s.baseX + Math.sin(elapsed * 1.5 + s.wobbleSeed) * 2.0;
        if (s.barrierMesh) s.barrierMesh.rotation.y += dt * 3;
      } else {
        s.mesh.position.x = THREE.MathUtils.lerp(s.mesh.position.x, this.camera.position.x, dt * 0.42);
        s.mesh.position.y = THREE.MathUtils.lerp(s.mesh.position.y, this.camera.position.y, dt * 0.42);
      }

      if (s.shieldMesh) {
        s.shieldMesh.rotation.x += dt * 2.2;
        s.shieldMesh.rotation.y += dt * 2.2;
      }

      // 우주선과 충돌 판정 (난이도 한 단계 상향: 데미지 16)
      if (s.mesh.position.z > this.camera.position.z - 2.5) {
        const distToShip = Math.hypot(
          s.mesh.position.x - this.camera.position.x,
          s.mesh.position.y - this.camera.position.y
        );

        if (distToShip < s.radius + 5.2 && this.buffs.shield <= 0) {
          this.hp -= 16;
          this.combo = 0;
          this.showFunnyText('아야! 젤리 충돌! 우주선을 기울여 피하세요! 💦', window.innerWidth / 2, window.innerHeight * 0.7, '#ff4466');
          this.updateHUD();
          if (this.hp <= 0) {
            this.scene.remove(s.mesh);
            this.slimes.splice(i, 1);
            this.endGame(false);
            return;
          }
        }
        this.scene.remove(s.mesh);
        this.slimes.splice(i, 1);
      }
    }

    // 8. 보스 움직임 업데이트
    if (this.boss) {
      this.boss.time += dt;
      this.boss.mesh.position.x = Math.sin(this.boss.time * 1.35) * 16;
      this.boss.mesh.position.y = 2 + Math.cos(this.boss.time * 1.8) * 6;
      this.boss.crown.rotation.y += dt * 1.8;

      const bWobble = Math.sin(this.boss.time * 6.5) * 0.12;
      this.boss.bodyMesh.scale.set(1 + bWobble, 1 - bWobble, 1 + bWobble);
    }

    // 9. 아이템 캡슐 이동
    for (let i = this.items.length - 1; i >= 0; i--) {
      const it = this.items[i];
      it.mesh.position.z += 13 * dt;
      it.mesh.rotation.y += dt * 2.5;
      it.ring.rotation.x += dt * 3;
      if (it.mesh.position.z > 20) {
        this.scene.remove(it.mesh);
        this.items.splice(i, 1);
      }
    }

    // 10. 파티클 업데이트
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= dt;
      p.vel.y -= 18 * dt;
      p.mesh.position.addScaledVector(p.vel, dt);
      p.mesh.scale.multiplyScalar(0.97);

      if (p.life <= 0) {
        this.scene.remove(p.mesh);
        this.particles.splice(i, 1);
      }
    }

    this.renderer.render(this.scene, this.camera);
  }

  activateItem(item) {
    this.sound.playPowerUp();
    const cfg = item.cfg;
    const pt = this.worldToScreen(item.mesh.position);
    this.showFunnyText(`🎁 ${cfg.name}`, pt.x, pt.y, '#00ffcc');

    if (cfg.id === 'RAPID') {
      this.buffs.rapid = cfg.duration;
    } else if (cfg.id === 'MAGNET') {
      this.buffs.magnet = cfg.duration;
    } else if (cfg.id === 'BOMB_PLUS') {
      this.bombs++;
    } else if (cfg.id === 'HEAL_SHIELD') {
      this.hp = Math.min(this.maxHp, this.hp + 35);
      this.buffs.shield = cfg.duration;
    }
    this.updateHUD();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new FlySarangGame();
});
