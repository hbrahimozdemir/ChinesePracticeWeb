import urllib.request
import zipfile
import io
import json
import os

print("İndiriliyor...")
url = "https://www.mdbg.net/chinese/export/cedict/cedict_1_0_ts_utf-8_mdbg.zip"
response = urllib.request.urlopen(url)
zip_data = response.read()

print("Çıkarılıyor ve işleniyor...")
words = []
with zipfile.ZipFile(io.BytesIO(zip_data)) as z:
    for filename in z.namelist():
        if filename.endswith('.u8'):
            content = z.read(filename).decode('utf-8')
            for line in content.split('\n'):
                line = line.strip()
                if not line or line.startswith('#'): continue
                
                # Format: Trad Simp [pinyin] /en1/en2/
                try:
                    parts = line.split(' [')
                    hanzi_part = parts[0].split(' ')
                    trad = hanzi_part[0]
                    simp = hanzi_part[1]
                    
                    pinyin_en = parts[1].split('] /')
                    pinyin = pinyin_en[0]
                    en = pinyin_en[1].strip('/').replace('/', ' / ')
                    
                    words.append({
                        "hanzi": simp,
                        "pinyin": pinyin,
                        "en": en,
                        "tr": "" # Türkçe boş kalsın, biz eski listeyle tamamlayacağız
                    })
                except Exception as e:
                    pass

print(f"Toplam {len(words)} kelime bulundu.")
os.makedirs('data', exist_ok=True)
with open('data/dict.json', 'w', encoding='utf-8') as f:
    json.dump(words, f, ensure_ascii=False)
print("data/dict.json kaydedildi.")
