const https = require('https');
const zlib = require('zlib');
const fs = require('fs');

const url = 'https://www.mdbg.net/chinese/export/cedict/cedict_1_0_ts_utf-8_mdbg.txt.gz';

console.log('Downloading CEDICT from mdbg...');

https.get(url, (res) => {
    let rawBuf = [];
    
    // GZIP dekompresyon stream'i
    const unzip = zlib.createGunzip();
    res.pipe(unzip);
    
    unzip.on('data', (chunk) => rawBuf.push(chunk));
    
    unzip.on('end', () => {
        const text = Buffer.concat(rawBuf).toString('utf-8');
        const lines = text.split('\n');
        const words = [];
        
        console.log('Parsing ' + lines.length + ' lines...');
        
        for (let line of lines) {
            line = line.trim();
            if (!line || line.startsWith('#')) continue;
            
            // Format: Trad Simp [pinyin] /en1/en2/
            try {
                const parts = line.split(' [');
                const hanzi_part = parts[0].split(' ');
                const trad = hanzi_part[0];
                const simp = hanzi_part[1];
                
                const pinyin_en = parts[1].split('] /');
                const pinyin = pinyin_en[0];
                const en = pinyin_en[1].replace(/\/$/, '').replace(/\//g, ' / ');
                
                words.push({
                    hanzi: simp,
                    pinyin: pinyin,
                    en: en,
                    tr: "" // Türkçeleri index.html içinde kendimiz birleştireceğiz
                });
            } catch(e) {
                // Hatalı satırı atla
            }
        }
        
        console.log(`Parsed ${words.length} words.`);
        if (!fs.existsSync('data')) fs.mkdirSync('data');
        fs.writeFileSync('data/dict.json', JSON.stringify(words));
        console.log('Saved to data/dict.json (size: ' + (fs.statSync('data/dict.json').size / 1024 / 1024).toFixed(2) + ' MB)');
    });
});
