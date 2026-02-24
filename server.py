"""
Edge TTS Server — Render.com compatible
Çince Öğren projesi için Microsoft Neural TTS
"""

import asyncio
import hashlib
import io
import os
import sys

try:
    import edge_tts
except ImportError:
    print("❌  pip install edge-tts flask flask-cors gunicorn")
    sys.exit(1)

from flask import Flask, request, Response, jsonify
from flask_cors import CORS

app = Flask(__name__)

# GitHub Pages URL'ini buraya ekle (deploy sonrası güncelle)
# Şimdilik tüm originlere açık bırakıyoruz
CORS(app, origins="*")

PORT          = int(os.environ.get("PORT", 5050))  # Render PORT env'i kullanır
DEFAULT_VOICE = "zh-CN-XiaoxiaoNeural"

VOICES = [
    {"id": "zh-CN-XiaoxiaoNeural",  "name": "Xiaoxiao",  "gender": "Kadın",  "desc": "Doğal, sıcak"},
    {"id": "zh-CN-XiaoyiNeural",    "name": "Xiaoyi",    "gender": "Kadın",  "desc": "Canlı"},
    {"id": "zh-CN-YunxiNeural",     "name": "Yunxi",     "gender": "Erkek",  "desc": "Net, eğitim"},
    {"id": "zh-CN-YunjianNeural",   "name": "Yunjian",   "gender": "Erkek",  "desc": "Güçlü"},
    {"id": "zh-CN-YunyangNeural",   "name": "Yunyang",   "gender": "Erkek",  "desc": "Profesyonel"},
    {"id": "zh-TW-HsiaoChenNeural", "name": "HsiaoChen", "gender": "Kadın",  "desc": "Tayvan"},
    {"id": "zh-TW-YunJheNeural",    "name": "YunJhe",    "gender": "Erkek",  "desc": "Tayvan Erkek"},
]

# Bellek içi cache (Render free tier'da disk persist olmaz, memory yeterli)
_cache = {}

def run_async(coro):
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    try:
        return loop.run_until_complete(coro)
    finally:
        loop.close()

async def synthesize(text: str, voice: str, rate: str, pitch: str) -> bytes:
    communicate = edge_tts.Communicate(text=text, voice=voice, rate=rate, pitch=pitch)
    buf = io.BytesIO()
    async for chunk in communicate.stream():
        if chunk["type"] == "audio":
            buf.write(chunk["data"])
    return buf.getvalue()

def get_audio(text, voice, rate, pitch):
    key = hashlib.md5(f"{text}|{voice}|{rate}|{pitch}".encode()).hexdigest()
    if key not in _cache:
        _cache[key] = run_async(synthesize(text, voice, rate, pitch))
    return _cache[key]

# ── Routes ────────────────────────────────────────────────────

@app.route("/")
def index():
    return jsonify({"status": "ok", "service": "Chinese Study TTS", "voices": len(VOICES)})

@app.route("/health")
def health():
    return jsonify({"status": "ok", "voice": DEFAULT_VOICE, "cached": len(_cache)})

@app.route("/voices")
def voices():
    return jsonify(VOICES)

@app.route("/tts")
def tts():
    text  = request.args.get("text", "").strip()
    if not text:
        return jsonify({"error": "text gerekli"}), 400
    if len(text) > 300:
        return jsonify({"error": "max 300 karakter"}), 400

    slow  = request.args.get("slow", "0") == "1"
    voice = request.args.get("voice", DEFAULT_VOICE)
    rate  = request.args.get("rate",  "-35%" if slow else "-10%")
    pitch = request.args.get("pitch", "+0Hz")

    # Sadece izin verilen sesler
    allowed = {v["id"] for v in VOICES}
    if voice not in allowed:
        voice = DEFAULT_VOICE

    try:
        audio = get_audio(text, voice, rate, pitch)
        return Response(audio, mimetype="audio/mpeg", headers={
            "Cache-Control": "public, max-age=86400",
            "Access-Control-Allow-Origin": "*",
        })
    except Exception as e:
        print(f"[TTS ERROR] {e}")
        return jsonify({"error": str(e)}), 500

# ── Start ─────────────────────────────────────────────────────
if __name__ == "__main__":
    print(f"🀄  TTS Server → http://localhost:{PORT}")
    app.run(host="0.0.0.0", port=PORT, debug=False, threaded=True)
