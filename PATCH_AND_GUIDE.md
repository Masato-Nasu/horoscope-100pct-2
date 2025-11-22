# Horoscope100%2 角度オンリー総合エンジン差し替え手順

このZIPには **新しいアイコンと manifest / sw テンプレ**が入っています。
オリジナル `horoscope-100pct` のコードはこの環境から直接取得できないため、
**あなたのオリジナル index.html に以下をコピペして差し替えてください。**

---

## 1) エンジンコードを追加
index.html の JS 部分（関数定義が並んでいる所）に、丸ごと追加:

(1) ASPECTS 定義  
(2) normalizeAngleDiff / aspectWeight / computeAspectPowerForAngle  
(3) computeAngleOnlyScore

※ 直前にお渡しした「Angle-Only Hardcore Engine (Multi-Planet)」一式。

---

## 2) 既存の “太陽‐月の伸開角スコア” を置き換え
太陽・月（＋水星等）の黄経を計算した直後に:

```js
const planets = [
  { name: "Sun",     lonDeg: sunLon,     weight: 1.0 },
  { name: "Moon",    lonDeg: moonLon,    weight: 1.0 },
  { name: "Mercury", lonDeg: mercLon,    weight: 0.6 },
  { name: "Venus",   lonDeg: venusLon,   weight: 0.8 },
  { name: "Mars",    lonDeg: marsLon,    weight: 0.8 },
  { name: "Jupiter", lonDeg: jupiterLon, weight: 0.7 },
  { name: "Saturn",  lonDeg: saturnLon,  weight: 0.7 }
];

const angleResult = computeAngleOnlyScore(planets);
const baseAngleScore = angleResult.score;
```

その後段で使っている “角度スコア変数（旧）” を
**baseAngleScore に差し替え**れば Aモード化完了です。

---

## 3) PWA設定の差し替え
このZIP内の `manifest.json / icon-192.png / icon-512.png / favicon.svg / sw.js`
を、horoscope-100pct-2 へ配置してください。

- manifest の start_url / scope は /horoscope-100pct-2/ に合わせ済み
- sw の CACHE_NAME も別名化済み
