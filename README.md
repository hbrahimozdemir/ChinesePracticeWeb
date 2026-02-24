# 汉语学习 · Çince Öğren

Tamamen ücretsiz, her yerden erişilebilen Çince öğrenme sitesi.

```
GitHub Pages  ──→  index.html  (site)
Render.com    ──→  server.py   (Edge TTS sesi)
```

---

## 🚀 Kurulum (15 dakika, tek seferlik)

### ADIM 1 — GitHub Repo Oluştur

1. [github.com](https://github.com) → **New repository**
2. İsim: `chinese-study` (veya istediğin bir isim)
3. **Public** seç
4. **Create repository** tıkla

### ADIM 2 — Dosyaları Yükle

Repo sayfasında **Add file → Upload files** tıkla, şu 4 dosyayı yükle:

```
index.html
server.py
requirements.txt
render.yaml
```

Commit mesajı yaz → **Commit changes**

### ADIM 3 — GitHub Pages Aç

1. Repo → **Settings** → sol menüde **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** → **/ (root)**
4. **Save** tıkla
5. Birkaç dakika bekle → `https://KULLANICIADUN.github.io/chinese-study` adresin hazır!

---

### ADIM 4 — Render.com'da TTS Server Kur

1. [render.com](https://render.com) → **Sign Up** (GitHub ile giriş yap)
2. Dashboard → **New +** → **Web Service**
3. **Connect a repository** → `chinese-study` seç
4. Ayarlar otomatik dolacak (`render.yaml`'dan okur):
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn server:app --workers 2 --timeout 60`
5. **Create Web Service** tıkla
6. Deploy başlar (~3 dakika), beklediğinde şöyle bir URL görürsün:
   ```
   https://chinese-study-tts.onrender.com
   ```
   ⚠ Bu URL her deployde aynı kalır, not et!

### ADIM 5 — Siteyi TTS Server'a Bağla

1. `https://KULLANICIADUN.github.io/chinese-study` adresini aç
2. Üst çubukta **SERVER** kutusuna Render URL'ini yaz:
   ```
   https://chinese-study-tts.onrender.com
   ```
3. **Bağlan** tıkla → yeşil nokta yanıyorsa hazır! 🎉

> URL tarayıcıya kaydedilir, bir daha girmen gerekmez.

---

## ⚡ Önemli Notlar

### Render Free Tier — Uyku Modu
Render ücretsiz plan, 15 dakika kullanılmazsa server'ı uyutur.
İlk istekte **30-60 saniye** gecikme olabilir, sonrası hızlı.

**Çözüm:** Render dashboard'da **Cron Job** ekle (opsiyonel):
```
https://chinese-study-tts.onrender.com/health
```
Her 10 dakikada ping → server uyanık kalır.
(Render'da New → Cron Job → schedule: `*/10 * * * *`)

### Ses Kalitesi
- Edge TTS bağlıyken: Microsoft Neural sesler (çok kaliteli)
- Edge TTS bağlı değilken: Tarayıcı Web Speech API (otomatik fallback)

---

## 📁 Dosya Yapısı

```
chinese-study/
├── index.html        ← Site (GitHub Pages'te çalışır)
├── server.py         ← Edge TTS server (Render'da çalışır)
├── requirements.txt  ← Python paketleri
├── render.yaml       ← Render otomatik config
└── README.md         ← Bu dosya
```

---

## 🔧 Lokal Geliştirme

```bash
# TTS server'ı lokalde çalıştır
pip install -r requirements.txt
python server.py
# → http://localhost:5050

# index.html'i tarayıcıda aç, SERVER kutusuna yaz:
# http://localhost:5050
```

---

## ✨ Özellikler

- **Sözlük + Karakter Ağı** — D3.js force graph, karakterler arası ilişkiler
- **Flashcard** — HSK seviye filtresiyle çift yönlü kartlar
- **Cümle Kurma** — Türkçeden Çinceye blok dizme egzersizi
- **Quiz** — Pinyin'den hanzi seçme, skor takibi
- **Edge TTS** — Microsoft Neural Çince sesler (6 farklı ses)
- **HSK 1-2-3 kelime listesi** — EN + TR çevirili
