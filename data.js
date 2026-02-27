const WORDS = [
    {
      "hanzi": "你",
      "pinyin": "nǐ",
      "en": "you",
      "tr": "sen",
      "hsk": 1,
      "compounds": [],
      "unit": 1
    },
    {
      "hanzi": "好",
      "pinyin": "hǎo",
      "en": "good",
      "tr": "iyi, güzel",
      "hsk": 1,
      "compounds": [],
      "unit": 1
    },
    {
      "hanzi": "我",
      "pinyin": "wǒ",
      "en": "I / me",
      "tr": "ben",
      "hsk": 1,
      "compounds": [],
      "unit": 1
    },
    {
      "hanzi": "叫",
      "pinyin": "jiào",
      "en": "to call",
      "tr": "denmek, adı ... olmak",
      "hsk": 1,
      "compounds": [],
      "unit": 1
    },
    {
      "hanzi": "是",
      "pinyin": "shì",
      "en": "to be",
      "tr": "olmak (ekmek fiili)",
      "hsk": 1,
      "compounds": [],
      "unit": 1
    },
    {
      "hanzi": "人",
      "pinyin": "rén",
      "en": "person",
      "tr": "insan, kişi",
      "hsk": 1,
      "compounds": [],
      "unit": 1
    },
    {
      "hanzi": "吗",
      "pinyin": "ma",
      "en": "question particle",
      "tr": "soru eki",
      "hsk": 1,
      "compounds": [],
      "unit": 1
    },
    {
      "hanzi": "他",
      "pinyin": "tā",
      "en": "he, him",
      "tr": "o (erkek)",
      "hsk": 1,
      "compounds": [],
      "unit": 1
    },
    {
      "hanzi": "不",
      "pinyin": "bù",
      "en": "",
      "tr": "değil, -mez",
      "hsk": 1,
      "compounds": [],
      "unit": 1
    },
    {
      "hanzi": "日本",
      "pinyin": "Rìběn",
      "en": "Japan",
      "tr": "Japonya",
      "hsk": 2,
      "compounds": [],
      "unit": 1
    },
    {
      "hanzi": "法国",
      "pinyin": "Fǎguó",
      "en": "France",
      "tr": "Fransa",
      "hsk": 2,
      "compounds": [],
      "unit": 1
    },
    {
      "hanzi": "加拿大",
      "pinyin": "Jiānádà",
      "en": "Canada",
      "tr": "Kanada",
      "hsk": 2,
      "compounds": [],
      "unit": 1
    },
    {
      "hanzi": "们",
      "pinyin": "men",
      "en": "",
      "tr": "çoğul eki",
      "hsk": 1,
      "compounds": [],
      "unit": 1
    },
    {
      "hanzi": "我们",
      "pinyin": "wǒmen",
      "en": "we, us",
      "tr": "biz",
      "hsk": 1,
      "compounds": [],
      "unit": 1
    },
    {
      "hanzi": "你们",
      "pinyin": "nǐmen",
      "en": "you (plural)",
      "tr": "siz",
      "hsk": 1,
      "compounds": [],
      "unit": 1
    },
    {
      "hanzi": "他们",
      "pinyin": "tāmen",
      "en": "they, them",
      "tr": "onlar (erkek)",
      "hsk": 1,
      "compounds": [],
      "unit": 1
    },
    {
      "hanzi": "她们",
      "pinyin": "tāmen",
      "en": "",
      "tr": "onlar (kadın)",
      "hsk": 1,
      "compounds": [],
      "unit": 1
    },
    {
      "hanzi": "老师",
      "pinyin": "lǎoshī",
      "en": "teacher",
      "tr": "öğretmen",
      "hsk": 1,
      "compounds": [],
      "unit": 1
    },
    {
      "hanzi": "您",
      "pinyin": "nín",
      "en": "",
      "tr": "siz (kibar)",
      "hsk": 1,
      "compounds": [],
      "unit": 1
    },
    {
      "hanzi": "学生",
      "pinyin": "xuésheng",
      "en": "student",
      "tr": "öğrenci",
      "hsk": 1,
      "compounds": [],
      "unit": 1
    },
    {
      "hanzi": "她",
      "pinyin": "tā",
      "en": "she, her",
      "tr": "o (kadın)",
      "hsk": 1,
      "compounds": [],
      "unit": 1
    },
    {
      "hanzi": "也",
      "pinyin": "yě",
      "en": "",
      "tr": "da, de",
      "hsk": 1,
      "compounds": [],
      "unit": 1
    },
    {
      "hanzi": "中国",
      "pinyin": "Zhōngguó",
      "en": "China",
      "tr": "Çin",
      "hsk": 1,
      "compounds": [],
      "unit": 1
    },
    {
      "hanzi": "这",
      "pinyin": "zhè",
      "en": "this",
      "tr": "bu",
      "hsk": 1,
      "compounds": [],
      "unit": 2
    },
    {
      "hanzi": "的",
      "pinyin": "de",
      "en": "possessive particle",
      "tr": "aitlik eki",
      "hsk": 1,
      "compounds": [],
      "unit": 2
    },
    {
      "hanzi": "书",
      "pinyin": "shū",
      "en": "book",
      "tr": "kitap",
      "hsk": 1,
      "compounds": [],
      "unit": 2
    },
    {
      "hanzi": "词典",
      "pinyin": "cídiǎn",
      "en": "dictionary",
      "tr": "sözlük",
      "hsk": 2,
      "compounds": [],
      "unit": 2
    },
    {
      "hanzi": "地图",
      "pinyin": "dìtú",
      "en": "map",
      "tr": "harita",
      "hsk": 2,
      "compounds": [],
      "unit": 2
    },
    {
      "hanzi": "本子",
      "pinyin": "běnzi",
      "en": "notebook",
      "tr": "defter",
      "hsk": 2,
      "compounds": [],
      "unit": 2
    },
    {
      "hanzi": "笔",
      "pinyin": "bǐ",
      "en": "pen, pencil",
      "tr": "kalem",
      "hsk": 2,
      "compounds": [],
      "unit": 2
    },
    {
      "hanzi": "有",
      "pinyin": "yǒu",
      "en": "to have",
      "tr": "sahip olmak, var",
      "hsk": 1,
      "compounds": [],
      "unit": 2
    },
    {
      "hanzi": "没有",
      "pinyin": "méiyǒu",
      "en": "not have",
      "tr": "sahip olmamak, yok",
      "hsk": 1,
      "compounds": [],
      "unit": 2
    },
    {
      "hanzi": "支",
      "pinyin": "zhī",
      "en": "",
      "tr": "sopa/uzun nesneler için sayı birimi (kalem)",
      "hsk": 1,
      "compounds": [],
      "unit": 2
    },
    {
      "hanzi": "个",
      "pinyin": "gè",
      "en": "",
      "tr": "genel sayı birimi",
      "hsk": 1,
      "compounds": [],
      "unit": 2
    },
    {
      "hanzi": "两",
      "pinyin": "liǎng",
      "en": "two",
      "tr": "iki (sayı biriminden önce)",
      "hsk": 2,
      "compounds": [],
      "unit": 2
    },
    {
      "hanzi": "本",
      "pinyin": "běn",
      "en": "measure word for books",
      "tr": "kitap/dergi için sayı birimi",
      "hsk": 1,
      "compounds": [],
      "unit": 2
    },
    {
      "hanzi": "张",
      "pinyin": "zhāng",
      "en": "",
      "tr": "düz nesneler için sayı birimi (kağıt, harita)",
      "hsk": 1,
      "compounds": [],
      "unit": 2
    },
    {
      "hanzi": "什么",
      "pinyin": "shénme",
      "en": "what",
      "tr": "ne",
      "hsk": 1,
      "compounds": [],
      "unit": 3
    },
    {
      "hanzi": "家",
      "pinyin": "jiā",
      "en": "home / family",
      "tr": "ev, aile",
      "hsk": 1,
      "compounds": [],
      "unit": 3
    },
    {
      "hanzi": "照片",
      "pinyin": "zhàopiàn",
      "en": "",
      "tr": "fotoğraf",
      "hsk": 1,
      "compounds": [],
      "unit": 3
    },
    {
      "hanzi": "几",
      "pinyin": "jǐ",
      "en": "how many (less than 10)",
      "tr": "kaç (10'dan küçük sayılar için)",
      "hsk": 1,
      "compounds": [],
      "unit": 3
    },
    {
      "hanzi": "口",
      "pinyin": "kǒu",
      "en": "mouth, (measure for family)",
      "tr": "aile üyeleri için sayı birimi",
      "hsk": 2,
      "compounds": [],
      "unit": 3
    },
    {
      "hanzi": "谁",
      "pinyin": "shéi / shuí",
      "en": "who",
      "tr": "kim",
      "hsk": 1,
      "compounds": [],
      "unit": 3
    },
    {
      "hanzi": "哥哥",
      "pinyin": "gēge",
      "en": "older brother",
      "tr": "ağabey",
      "hsk": 1,
      "compounds": [],
      "unit": 3
    },
    {
      "hanzi": "爸爸",
      "pinyin": "bàba",
      "en": "dad",
      "tr": "baba",
      "hsk": 1,
      "compounds": [],
      "unit": 3
    },
    {
      "hanzi": "妈妈",
      "pinyin": "māma",
      "en": "mom",
      "tr": "anne",
      "hsk": 1,
      "compounds": [],
      "unit": 3
    },
    {
      "hanzi": "姐姐",
      "pinyin": "jiějie",
      "en": "older sister",
      "tr": "abla",
      "hsk": 1,
      "compounds": [],
      "unit": 3
    },
    {
      "hanzi": "和",
      "pinyin": "hé",
      "en": "and, with",
      "tr": "ve",
      "hsk": 1,
      "compounds": [],
      "unit": 3
    },
    {
      "hanzi": "做",
      "pinyin": "zuò",
      "en": "to do",
      "tr": "yapmak",
      "hsk": 1,
      "compounds": [],
      "unit": 3
    },
    {
      "hanzi": "工作",
      "pinyin": "gōngzuò",
      "en": "work",
      "tr": "iş; çalışmak",
      "hsk": 1,
      "compounds": [],
      "unit": 3
    },
    {
      "hanzi": "妹妹",
      "pinyin": "mèimei",
      "en": "younger sister",
      "tr": "küçük kız kardeş",
      "hsk": 1,
      "compounds": [],
      "unit": 3
    },
    {
      "hanzi": "大夫",
      "pinyin": "dàifu",
      "en": "",
      "tr": "doktor",
      "hsk": 1,
      "compounds": [],
      "unit": 3
    },
    {
      "hanzi": "全",
      "pinyin": "quán",
      "en": "",
      "tr": "bütün, tüm",
      "hsk": 1,
      "compounds": [],
      "unit": 3
    },
    {
      "hanzi": "弟弟",
      "pinyin": "dìdi",
      "en": "younger brother",
      "tr": "küçük erkek kardeş",
      "hsk": 1,
      "compounds": [],
      "unit": 3
    },
    {
      "hanzi": "班",
      "pinyin": "bān",
      "en": "class, shift",
      "tr": "sınıf",
      "hsk": 2,
      "compounds": [],
      "unit": 4
    },
    {
      "hanzi": "多少",
      "pinyin": "duōshǎo",
      "en": "",
      "tr": "kaç, ne kadar",
      "hsk": 1,
      "compounds": [],
      "unit": 4
    },
    {
      "hanzi": "学习",
      "pinyin": "xuéxí",
      "en": "to study",
      "tr": "öğrenmek, çalışmak",
      "hsk": 1,
      "compounds": [],
      "unit": 4
    },
    {
      "hanzi": "学",
      "pinyin": "xué",
      "en": "study",
      "tr": "öğrenmek",
      "hsk": 1,
      "compounds": [],
      "unit": 4
    },
    {
      "hanzi": "汉语",
      "pinyin": "Hànyǔ",
      "en": "Chinese language",
      "tr": "Çince (dil)",
      "hsk": 1,
      "compounds": [],
      "unit": 4
    },
    {
      "hanzi": "语",
      "pinyin": "yǔ",
      "en": "language",
      "tr": "dil",
      "hsk": 1,
      "compounds": [],
      "unit": 4
    },
    {
      "hanzi": "英语",
      "pinyin": "Yīngyǔ",
      "en": "",
      "tr": "İngilizce",
      "hsk": 1,
      "compounds": [],
      "unit": 4
    },
    {
      "hanzi": "难",
      "pinyin": "nán",
      "en": "",
      "tr": "zor",
      "hsk": 1,
      "compounds": [],
      "unit": 4
    },
    {
      "hanzi": "同学",
      "pinyin": "tóngxué",
      "en": "classmate",
      "tr": "okul arkadaşı",
      "hsk": 1,
      "compounds": [],
      "unit": 4
    },
    {
      "hanzi": "男生",
      "pinyin": "nánshēng",
      "en": "",
      "tr": "erkek öğrenci",
      "hsk": 1,
      "compounds": [],
      "unit": 4
    },
    {
      "hanzi": "男",
      "pinyin": "nán",
      "en": "",
      "tr": "erkek",
      "hsk": 1,
      "compounds": [],
      "unit": 4
    },
    {
      "hanzi": "女生",
      "pinyin": "nǚshēng",
      "en": "",
      "tr": "kız öğrenci",
      "hsk": 1,
      "compounds": [],
      "unit": 4
    },
    {
      "hanzi": "女",
      "pinyin": "nǚ",
      "en": "",
      "tr": "kadın, kız",
      "hsk": 1,
      "compounds": [],
      "unit": 4
    },
    {
      "hanzi": "都",
      "pinyin": "dōu",
      "en": "all",
      "tr": "hep, her ikisi de",
      "hsk": 1,
      "compounds": [],
      "unit": 4
    },
    {
      "hanzi": "请",
      "pinyin": "qǐng",
      "en": "please",
      "tr": "lütfen; buyurmak",
      "hsk": 1,
      "compounds": [],
      "unit": 4
    },
    {
      "hanzi": "进",
      "pinyin": "jìn",
      "en": "",
      "tr": "girmek",
      "hsk": 1,
      "compounds": [],
      "unit": 4
    },
    {
      "hanzi": "外国",
      "pinyin": "wàiguó",
      "en": "foreign country",
      "tr": "yabancı ülke",
      "hsk": 1,
      "compounds": [],
      "unit": 4
    },
    {
      "hanzi": "朋友",
      "pinyin": "péngyou",
      "en": "friend",
      "tr": "arkadaş",
      "hsk": 1,
      "compounds": [],
      "unit": 4
    },
    {
      "hanzi": "名字",
      "pinyin": "míngzi",
      "en": "name",
      "tr": "isim",
      "hsk": 1,
      "compounds": [],
      "unit": 4
    },
    {
      "hanzi": "哪",
      "pinyin": "nǎ / něi",
      "en": "which",
      "tr": "hangi",
      "hsk": 1,
      "compounds": [],
      "unit": 4
    },
    {
      "hanzi": "国",
      "pinyin": "guó",
      "en": "country",
      "tr": "ülke",
      "hsk": 1,
      "compounds": [],
      "unit": 4
    },
    {
      "hanzi": "今天",
      "pinyin": "jīntiān",
      "en": "today",
      "tr": "bugün",
      "hsk": 1,
      "compounds": [],
      "unit": 5
    },
    {
      "hanzi": "昨天",
      "pinyin": "zuótiān",
      "en": "yesterday",
      "tr": "dün",
      "hsk": 1,
      "compounds": [],
      "unit": 5
    },
    {
      "hanzi": "明天",
      "pinyin": "míngtiān",
      "en": "tomorrow",
      "tr": "yarın",
      "hsk": 1,
      "compounds": [],
      "unit": 5
    },
    {
      "hanzi": "月",
      "pinyin": "yuè",
      "en": "month",
      "tr": "ay",
      "hsk": 1,
      "compounds": [],
      "unit": 5
    },
    {
      "hanzi": "号/日",
      "pinyin": "hào / rì",
      "en": "",
      "tr": "gün (tarih)",
      "hsk": 1,
      "compounds": [],
      "unit": 5
    },
    {
      "hanzi": "星期",
      "pinyin": "xīngqī",
      "en": "week",
      "tr": "hafta",
      "hsk": 1,
      "compounds": [],
      "unit": 5
    },
    {
      "hanzi": "生日",
      "pinyin": "shēngrì",
      "en": "birthday",
      "tr": "doğum günü",
      "hsk": 1,
      "compounds": [],
      "unit": 5
    },
    {
      "hanzi": "祝",
      "pinyin": "zhù",
      "en": "",
      "tr": "kutlamak, dilemek",
      "hsk": 1,
      "compounds": [],
      "unit": 5
    },
    {
      "hanzi": "快乐",
      "pinyin": "kuàilè",
      "en": "happy",
      "tr": "mutlu",
      "hsk": 1,
      "compounds": [],
      "unit": 5
    },
    {
      "hanzi": "礼物",
      "pinyin": "lǐwù",
      "en": "",
      "tr": "hediye",
      "hsk": 1,
      "compounds": [],
      "unit": 5
    },
    {
      "hanzi": "谢谢",
      "pinyin": "xièxie",
      "en": "thanks",
      "tr": "teşekkürler",
      "hsk": 1,
      "compounds": [],
      "unit": 5
    },
    {
      "hanzi": "对",
      "pinyin": "duì",
      "en": "correct, right",
      "tr": "doğru",
      "hsk": 2,
      "compounds": [],
      "unit": 5
    },
    {
      "hanzi": "送",
      "pinyin": "sòng",
      "en": "",
      "tr": "vermek, hediye etmek",
      "hsk": 1,
      "compounds": [],
      "unit": 5
    },
    {
      "hanzi": "很",
      "pinyin": "hěn",
      "en": "very",
      "tr": "çok",
      "hsk": 1,
      "compounds": [],
      "unit": 5
    },
    {
      "hanzi": "高兴",
      "pinyin": "gāoxìng",
      "en": "happy, pleased",
      "tr": "mutlu, sevinçli",
      "hsk": 1,
      "compounds": [],
      "unit": 5
    },
    {
      "hanzi": "问",
      "pinyin": "wèn",
      "en": "ask",
      "tr": "sormak",
      "hsk": 1,
      "compounds": [],
      "unit": 6
    },
    {
      "hanzi": "现在",
      "pinyin": "xiànzài",
      "en": "now",
      "tr": "şimdi",
      "hsk": 1,
      "compounds": [],
      "unit": 6
    },
    {
      "hanzi": "点",
      "pinyin": "diǎn",
      "en": "o'clock",
      "tr": "saat (zaman birimi)",
      "hsk": 1,
      "compounds": [],
      "unit": 6
    },
    {
      "hanzi": "零",
      "pinyin": "líng",
      "en": "zero",
      "tr": "sıfır",
      "hsk": 1,
      "compounds": [],
      "unit": 6
    },
    {
      "hanzi": "分",
      "pinyin": "fēn",
      "en": "minute",
      "tr": "dakika",
      "hsk": 1,
      "compounds": [],
      "unit": 6
    },
    {
      "hanzi": "不用",
      "pinyin": "bùyòng",
      "en": "no need to",
      "tr": "gerek yok",
      "hsk": 3,
      "compounds": [],
      "unit": 6
    },
    {
      "hanzi": "用",
      "pinyin": "yòng",
      "en": "",
      "tr": "kullanmak",
      "hsk": 1,
      "compounds": [],
      "unit": 6
    },
    {
      "hanzi": "早上",
      "pinyin": "zǎoshang",
      "en": "morning",
      "tr": "sabah erken",
      "hsk": 1,
      "compounds": [],
      "unit": 6
    },
    {
      "hanzi": "起床",
      "pinyin": "qǐchuáng",
      "en": "",
      "tr": "yataktan kalkmak",
      "hsk": 1,
      "compounds": [],
      "unit": 6
    },
    {
      "hanzi": "刻",
      "pinyin": "kè",
      "en": "",
      "tr": "çeyrek (15 dk)",
      "hsk": 1,
      "compounds": [],
      "unit": 6
    },
    {
      "hanzi": "晚上",
      "pinyin": "wǎnshang",
      "en": "evening",
      "tr": "akşam",
      "hsk": 1,
      "compounds": [],
      "unit": 6
    },
    {
      "hanzi": "睡觉",
      "pinyin": "shuìjiào",
      "en": "sleep",
      "tr": "uyumak",
      "hsk": 1,
      "compounds": [],
      "unit": 6
    },
    {
      "hanzi": "课",
      "pinyin": "kè",
      "en": "class / lesson",
      "tr": "ders",
      "hsk": 1,
      "compounds": [],
      "unit": 6
    },
    {
      "hanzi": "上课",
      "pinyin": "shàngkè",
      "en": "attend class",
      "tr": "ders başlamak",
      "hsk": 2,
      "compounds": [],
      "unit": 6
    },
    {
      "hanzi": "上",
      "pinyin": "shàng",
      "en": "up / above",
      "tr": "başlamak (iş/ders)",
      "hsk": 1,
      "compounds": [],
      "unit": 6
    },
    {
      "hanzi": "上午",
      "pinyin": "shàngwǔ",
      "en": "morning",
      "tr": "öğleden önce, sabah",
      "hsk": 1,
      "compounds": [],
      "unit": 6
    },
    {
      "hanzi": "时候",
      "pinyin": "shíhou",
      "en": "time, moment",
      "tr": "zaman, vakit",
      "hsk": 2,
      "compounds": [],
      "unit": 6
    },
    {
      "hanzi": "下课",
      "pinyin": "xiàkè",
      "en": "class is over",
      "tr": "ders bitmek",
      "hsk": 2,
      "compounds": [],
      "unit": 6
    },
    {
      "hanzi": "下",
      "pinyin": "xià",
      "en": "down / below",
      "tr": "bitirmek (iş/ders)",
      "hsk": 1,
      "compounds": [],
      "unit": 6
    },
    {
      "hanzi": "中午",
      "pinyin": "zhōngwǔ",
      "en": "noon",
      "tr": "öğle vakti",
      "hsk": 1,
      "compounds": [],
      "unit": 6
    },
    {
      "hanzi": "半",
      "pinyin": "bàn",
      "en": "half",
      "tr": "buçuk, yarım",
      "hsk": 1,
      "compounds": [],
      "unit": 6
    },
    {
      "hanzi": "下午",
      "pinyin": "xiàwǔ",
      "en": "afternoon",
      "tr": "öğleden sonra",
      "hsk": 1,
      "compounds": [],
      "unit": 6
    },
    {
      "hanzi": "差",
      "pinyin": "chà",
      "en": "bad, lacking",
      "tr": "kala (saat), eksik",
      "hsk": 3,
      "compounds": [],
      "unit": 6
    },
    {
      "hanzi": "银行",
      "pinyin": "yínháng",
      "en": "bank",
      "tr": "banka",
      "hsk": 2,
      "compounds": [],
      "unit": 7
    },
    {
      "hanzi": "在",
      "pinyin": "zài",
      "en": "at / in",
      "tr": "-de olmak (bulunmak)",
      "hsk": 1,
      "compounds": [],
      "unit": 7
    },
    {
      "hanzi": "哪儿",
      "pinyin": "nǎr",
      "en": "where",
      "tr": "nerede",
      "hsk": 1,
      "compounds": [],
      "unit": 7
    },
    {
      "hanzi": "东边",
      "pinyin": "dōngbian",
      "en": "east side",
      "tr": "doğu tarafı",
      "hsk": 2,
      "compounds": [],
      "unit": 7
    },
    {
      "hanzi": "东",
      "pinyin": "dōng",
      "en": "east",
      "tr": "doğu",
      "hsk": 1,
      "compounds": [],
      "unit": 7
    },
    {
      "hanzi": "边",
      "pinyin": "biān",
      "en": "side",
      "tr": "taraf",
      "hsk": 1,
      "compounds": [],
      "unit": 7
    },
    {
      "hanzi": "西边",
      "pinyin": "xībian",
      "en": "west side",
      "tr": "batı tarafı",
      "hsk": 2,
      "compounds": [],
      "unit": 7
    },
    {
      "hanzi": "西",
      "pinyin": "xī",
      "en": "west",
      "tr": "batı",
      "hsk": 1,
      "compounds": [],
      "unit": 7
    },
    {
      "hanzi": "地方",
      "pinyin": "dìfang",
      "en": "place",
      "tr": "yer",
      "hsk": 1,
      "compounds": [],
      "unit": 7
    },
    {
      "hanzi": "座",
      "pinyin": "zuò",
      "en": "",
      "tr": "büyük binalar için sayı birimi",
      "hsk": 1,
      "compounds": [],
      "unit": 7
    },
    {
      "hanzi": "楼",
      "pinyin": "lóu",
      "en": "",
      "tr": "bina, kat",
      "hsk": 1,
      "compounds": [],
      "unit": 7
    },
    {
      "hanzi": "书店",
      "pinyin": "shūdiàn",
      "en": "",
      "tr": "kitabevi",
      "hsk": 1,
      "compounds": [],
      "unit": 7
    },
    {
      "hanzi": "店",
      "pinyin": "diàn",
      "en": "",
      "tr": "dükkan",
      "hsk": 1,
      "compounds": [],
      "unit": 7
    },
    {
      "hanzi": "那",
      "pinyin": "nà",
      "en": "",
      "tr": "şu, o",
      "hsk": 1,
      "compounds": [],
      "unit": 7
    },
    {
      "hanzi": "不客气",
      "pinyin": "bù kèqi",
      "en": "you're welcome",
      "tr": "rica ederim",
      "hsk": 2,
      "compounds": [],
      "unit": 7
    },
    {
      "hanzi": "客气",
      "pinyin": "kèqi",
      "en": "polite, courteous",
      "tr": "kibar, nazik",
      "hsk": 2,
      "compounds": [],
      "unit": 7
    },
    {
      "hanzi": "学校",
      "pinyin": "xuéxiào",
      "en": "school",
      "tr": "okul",
      "hsk": 1,
      "compounds": [],
      "unit": 7
    },
    {
      "hanzi": "宿舍",
      "pinyin": "sùshè",
      "en": "dormitory",
      "tr": "yurt",
      "hsk": 3,
      "compounds": [],
      "unit": 7
    },
    {
      "hanzi": "北边",
      "pinyin": "běibian",
      "en": "",
      "tr": "kuzey tarafı",
      "hsk": 1,
      "compounds": [],
      "unit": 7
    },
    {
      "hanzi": "北",
      "pinyin": "běi",
      "en": "north",
      "tr": "kuzey",
      "hsk": 1,
      "compounds": [],
      "unit": 7
    },
    {
      "hanzi": "南边",
      "pinyin": "nánbian",
      "en": "",
      "tr": "güney tarafı",
      "hsk": 1,
      "compounds": [],
      "unit": 7
    },
    {
      "hanzi": "南",
      "pinyin": "nán",
      "en": "south",
      "tr": "güney",
      "hsk": 1,
      "compounds": [],
      "unit": 7
    },
    {
      "hanzi": "号",
      "pinyin": "hào",
      "en": "number, date",
      "tr": "numara",
      "hsk": 1,
      "compounds": [],
      "unit": 7
    },
    {
      "hanzi": "前边",
      "pinyin": "qiánbian",
      "en": "",
      "tr": "ön taraf",
      "hsk": 1,
      "compounds": [],
      "unit": 7
    },
    {
      "hanzi": "前",
      "pinyin": "qián",
      "en": "front",
      "tr": "ön",
      "hsk": 1,
      "compounds": [],
      "unit": 7
    },
    {
      "hanzi": "后边",
      "pinyin": "hòubian",
      "en": "behind",
      "tr": "arka taraf",
      "hsk": 2,
      "compounds": [],
      "unit": 7
    },
    {
      "hanzi": "后",
      "pinyin": "hòu",
      "en": "back",
      "tr": "arka",
      "hsk": 1,
      "compounds": [],
      "unit": 7
    },
    {
      "hanzi": "房间",
      "pinyin": "fángjiān",
      "en": "room",
      "tr": "oda",
      "hsk": 2,
      "compounds": [],
      "unit": 8
    },
    {
      "hanzi": "里",
      "pinyin": "lǐ",
      "en": "inside",
      "tr": "iç, içinde",
      "hsk": 1,
      "compounds": [],
      "unit": 8
    },
    {
      "hanzi": "里边",
      "pinyin": "lǐbian",
      "en": "",
      "tr": "iç taraf",
      "hsk": 1,
      "compounds": [],
      "unit": 8
    },
    {
      "hanzi": "外",
      "pinyin": "wài",
      "en": "outside",
      "tr": "dış",
      "hsk": 1,
      "compounds": [],
      "unit": 8
    },
    {
      "hanzi": "外边",
      "pinyin": "wàibian",
      "en": "outside",
      "tr": "dış taraf",
      "hsk": 2,
      "compounds": [],
      "unit": 8
    },
    {
      "hanzi": "桌子",
      "pinyin": "zhuōzi",
      "en": "desk / table",
      "tr": "masa",
      "hsk": 1,
      "compounds": [],
      "unit": 8
    },
    {
      "hanzi": "把",
      "pinyin": "bǎ",
      "en": "",
      "tr": "sandalyeler için sayı birimi",
      "hsk": 1,
      "compounds": [],
      "unit": 8
    },
    {
      "hanzi": "椅子",
      "pinyin": "yǐzi",
      "en": "",
      "tr": "sandalye",
      "hsk": 1,
      "compounds": [],
      "unit": 8
    },
    {
      "hanzi": "书架",
      "pinyin": "shūjià",
      "en": "",
      "tr": "kitaplık",
      "hsk": 1,
      "compounds": [],
      "unit": 8
    },
    {
      "hanzi": "柜子",
      "pinyin": "guìzi",
      "en": "",
      "tr": "dolap",
      "hsk": 1,
      "compounds": [],
      "unit": 8
    },
    {
      "hanzi": "墙",
      "pinyin": "qiáng",
      "en": "",
      "tr": "duvar",
      "hsk": 1,
      "compounds": [],
      "unit": 8
    },
    {
      "hanzi": "上",
      "pinyin": "shàng",
      "en": "up / above",
      "tr": "üst, üzerinde",
      "hsk": 1,
      "compounds": [],
      "unit": 8
    },
    {
      "hanzi": "上边",
      "pinyin": "shàngbian",
      "en": "above, top",
      "tr": "üst taraf",
      "hsk": 2,
      "compounds": [],
      "unit": 8
    },
    {
      "hanzi": "左边",
      "pinyin": "zuǒbian",
      "en": "",
      "tr": "sol taraf",
      "hsk": 1,
      "compounds": [],
      "unit": 8
    },
    {
      "hanzi": "左",
      "pinyin": "zuǒ",
      "en": "",
      "tr": "sol",
      "hsk": 1,
      "compounds": [],
      "unit": 8
    },
    {
      "hanzi": "右边",
      "pinyin": "yòubian",
      "en": "",
      "tr": "sağ taraf",
      "hsk": 1,
      "compounds": [],
      "unit": 8
    },
    {
      "hanzi": "右",
      "pinyin": "yòu",
      "en": "",
      "tr": "sağ",
      "hsk": 1,
      "compounds": [],
      "unit": 8
    },
    {
      "hanzi": "旁边",
      "pinyin": "pángbiān",
      "en": "beside",
      "tr": "yanı",
      "hsk": 1,
      "compounds": [],
      "unit": 8
    },
    {
      "hanzi": "旁",
      "pinyin": "páng",
      "en": "",
      "tr": "yan",
      "hsk": 1,
      "compounds": [],
      "unit": 8
    },
    {
      "hanzi": "呢",
      "pinyin": "ne",
      "en": "question particle",
      "tr": "peki ya? sorusu",
      "hsk": 1,
      "compounds": [],
      "unit": 8
    },
    {
      "hanzi": "下边",
      "pinyin": "xiàbian",
      "en": "below, underneath",
      "tr": "alt taraf",
      "hsk": 2,
      "compounds": [],
      "unit": 8
    },
    {
      "hanzi": "下",
      "pinyin": "xià",
      "en": "down / below",
      "tr": "alt",
      "hsk": 1,
      "compounds": [],
      "unit": 8
    },
    {
      "hanzi": "中间",
      "pinyin": "zhōngjiān",
      "en": "middle",
      "tr": "arasında, ortasında",
      "hsk": 1,
      "compounds": [],
      "unit": 8
    },
    {
      "hanzi": "坐",
      "pinyin": "zuò",
      "en": "",
      "tr": "oturmak",
      "hsk": 1,
      "compounds": [],
      "unit": 9
    },
    {
      "hanzi": "喝",
      "pinyin": "hē",
      "en": "to drink",
      "tr": "içmek",
      "hsk": 1,
      "compounds": [],
      "unit": 9
    },
    {
      "hanzi": "茶",
      "pinyin": "chá",
      "en": "tea",
      "tr": "çay",
      "hsk": 1,
      "compounds": [],
      "unit": 9
    },
    {
      "hanzi": "还是",
      "pinyin": "háishi",
      "en": "",
      "tr": "yoksa (soru)",
      "hsk": 1,
      "compounds": [],
      "unit": 9
    },
    {
      "hanzi": "咖啡",
      "pinyin": "kāfēi",
      "en": "coffee",
      "tr": "kahve",
      "hsk": 2,
      "compounds": [],
      "unit": 9
    },
    {
      "hanzi": "吃",
      "pinyin": "chī",
      "en": "to eat",
      "tr": "yemek",
      "hsk": 1,
      "compounds": [],
      "unit": 9
    },
    {
      "hanzi": "面包",
      "pinyin": "miànbāo",
      "en": "bread",
      "tr": "ekmek",
      "hsk": 2,
      "compounds": [],
      "unit": 9
    },
    {
      "hanzi": "欢迎",
      "pinyin": "huānyíng",
      "en": "welcome",
      "tr": "hoş geldiniz",
      "hsk": 2,
      "compounds": [],
      "unit": 9
    },
    {
      "hanzi": "位",
      "pinyin": "wèi",
      "en": "",
      "tr": "kişi (kibar, sayı birimi)",
      "hsk": 1,
      "compounds": [],
      "unit": 9
    },
    {
      "hanzi": "(一)点儿",
      "pinyin": "(yì)diǎnr",
      "en": "",
      "tr": "biraz",
      "hsk": 1,
      "compounds": [],
      "unit": 9
    },
    {
      "hanzi": "这儿",
      "pinyin": "zhèr",
      "en": "",
      "tr": "burada",
      "hsk": 1,
      "compounds": [],
      "unit": 9
    },
    {
      "hanzi": "米饭",
      "pinyin": "mǐfàn",
      "en": "",
      "tr": "pilav",
      "hsk": 1,
      "compounds": [],
      "unit": 9
    },
    {
      "hanzi": "饺子",
      "pinyin": "jiǎozi",
      "en": "dumpling",
      "tr": "mantı",
      "hsk": 2,
      "compounds": [],
      "unit": 9
    },
    {
      "hanzi": "包子",
      "pinyin": "bāozi",
      "en": "steamed stuffed bun",
      "tr": "buharda pişmiş içli hamur işi",
      "hsk": 2,
      "compounds": [],
      "unit": 9
    },
    {
      "hanzi": "面条",
      "pinyin": "miàntiáor",
      "en": "",
      "tr": "erişte",
      "hsk": 1,
      "compounds": [],
      "unit": 9
    },
    {
      "hanzi": "咱们",
      "pinyin": "zánmen",
      "en": "",
      "tr": "biz (sen ve ben)",
      "hsk": 1,
      "compounds": [],
      "unit": 9
    },
    {
      "hanzi": "吧",
      "pinyin": "ba",
      "en": "particle: suggestion/confirmation",
      "tr": "-elim (öneri eki)",
      "hsk": 2,
      "compounds": [],
      "unit": 9
    },
    {
      "hanzi": "行",
      "pinyin": "xíng",
      "en": "",
      "tr": "olur, tamam",
      "hsk": 1,
      "compounds": [],
      "unit": 9
    },
    {
      "hanzi": "不行",
      "pinyin": "bù xíng",
      "en": "not OK, won't do",
      "tr": "olmaz",
      "hsk": 2,
      "compounds": [],
      "unit": 9
    },
    {
      "hanzi": "啤酒",
      "pinyin": "píjiǔ",
      "en": "beer",
      "tr": "bira",
      "hsk": 2,
      "compounds": [],
      "unit": 9
    },
    {
      "hanzi": "酒",
      "pinyin": "jiǔ",
      "en": "",
      "tr": "alkollü içki",
      "hsk": 1,
      "compounds": [],
      "unit": 9
    },
    {
      "hanzi": "苹果",
      "pinyin": "píngguǒ",
      "en": "apple",
      "tr": "elma",
      "hsk": 1,
      "compounds": [],
      "unit": 10
    },
    {
      "hanzi": "块/元",
      "pinyin": "kuài / yuán",
      "en": "",
      "tr": "yuan (Çin para birimi)",
      "hsk": 1,
      "compounds": [],
      "unit": 10
    },
    {
      "hanzi": "毛/角",
      "pinyin": "máo / jiǎo",
      "en": "",
      "tr": "10 fen (yuan'ın 10'da biri)",
      "hsk": 1,
      "compounds": [],
      "unit": 10
    },
    {
      "hanzi": "分",
      "pinyin": "fēn",
      "en": "minute",
      "tr": "fen (yuan'ın 100'de biri)",
      "hsk": 1,
      "compounds": [],
      "unit": 10
    },
    {
      "hanzi": "斤",
      "pinyin": "jīn",
      "en": "",
      "tr": "500 gram (yarım kilo)",
      "hsk": 1,
      "compounds": [],
      "unit": 10
    },
    {
      "hanzi": "香蕉",
      "pinyin": "xiāngjiāo",
      "en": "",
      "tr": "muz",
      "hsk": 1,
      "compounds": [],
      "unit": 10
    },
    {
      "hanzi": "要",
      "pinyin": "yào",
      "en": "to want / will",
      "tr": "istemek",
      "hsk": 1,
      "compounds": [],
      "unit": 10
    },
    {
      "hanzi": "一共",
      "pinyin": "yígòng",
      "en": "altogether",
      "tr": "toplam",
      "hsk": 2,
      "compounds": [],
      "unit": 10
    },
    {
      "hanzi": "钱",
      "pinyin": "qián",
      "en": "money",
      "tr": "para",
      "hsk": 1,
      "compounds": [],
      "unit": 10
    },
    {
      "hanzi": "种",
      "pinyin": "zhǒng",
      "en": "",
      "tr": "çeşit, tür",
      "hsk": 1,
      "compounds": [],
      "unit": 10
    },
    {
      "hanzi": "太……了",
      "pinyin": "tài... le",
      "en": "",
      "tr": "çok (aşırılık belirtir)",
      "hsk": 1,
      "compounds": [],
      "unit": 10
    },
    {
      "hanzi": "贵",
      "pinyin": "guì",
      "en": "expensive",
      "tr": "pahalı",
      "hsk": 2,
      "compounds": [],
      "unit": 10
    },
    {
      "hanzi": "便宜",
      "pinyin": "piányi",
      "en": "cheap",
      "tr": "ucuz",
      "hsk": 2,
      "compounds": [],
      "unit": 10
    },
    {
      "hanzi": "怎么样",
      "pinyin": "zěnmeyàng",
      "en": "",
      "tr": "nasıl, ne dersin?",
      "hsk": 1,
      "compounds": [],
      "unit": 10
    },
    {
      "hanzi": "还",
      "pinyin": "hái",
      "en": "still, also",
      "tr": "ayrıca, hala",
      "hsk": 2,
      "compounds": [],
      "unit": 10
    },
    {
      "hanzi": "别的",
      "pinyin": "bié de",
      "en": "other, else",
      "tr": "başka",
      "hsk": 2,
      "compounds": [],
      "unit": 10
    },
    {
      "hanzi": "给",
      "pinyin": "gěi",
      "en": "give, for",
      "tr": "vermek",
      "hsk": 1,
      "compounds": [],
      "unit": 10
    },
    {
      "hanzi": "找",
      "pinyin": "zhǎo",
      "en": "",
      "tr": "para üstü vermek",
      "hsk": 1,
      "compounds": [],
      "unit": 10
    },
    {
      "hanzi": "好久不见",
      "pinyin": "hǎojiǔ bú jiàn",
      "en": "long time no see",
      "tr": "görüşmeyeli uzun zaman oldu",
      "hsk": 2,
      "compounds": [],
      "unit": 11
    },
    {
      "hanzi": "好久",
      "pinyin": "hǎojiǔ",
      "en": "long time",
      "tr": "uzun zaman",
      "hsk": 2,
      "compounds": [],
      "unit": 11
    },
    {
      "hanzi": "久",
      "pinyin": "jiǔ",
      "en": "",
      "tr": "uzun (zaman)",
      "hsk": 1,
      "compounds": [],
      "unit": 11
    },
    {
      "hanzi": "见",
      "pinyin": "jiàn",
      "en": "",
      "tr": "görmek",
      "hsk": 1,
      "compounds": [],
      "unit": 11
    },
    {
      "hanzi": "忙",
      "pinyin": "máng",
      "en": "",
      "tr": "meşgul",
      "hsk": 1,
      "compounds": [],
      "unit": 11
    },
    {
      "hanzi": "身体",
      "pinyin": "shēntǐ",
      "en": "",
      "tr": "vücut, sağlık",
      "hsk": 1,
      "compounds": [],
      "unit": 11
    },
    {
      "hanzi": "去",
      "pinyin": "qù",
      "en": "to go",
      "tr": "gitmek",
      "hsk": 1,
      "compounds": [],
      "unit": 11
    },
    {
      "hanzi": "回",
      "pinyin": "huí",
      "en": "return, go back",
      "tr": "dönmek",
      "hsk": 1,
      "compounds": [],
      "unit": 11
    },
    {
      "hanzi": "换",
      "pinyin": "huàn",
      "en": "change, exchange",
      "tr": "değiştirmek, bozdurmak",
      "hsk": 2,
      "compounds": [],
      "unit": 11
    },
    {
      "hanzi": "还",
      "pinyin": "hái",
      "en": "still, also",
      "tr": "hala",
      "hsk": 2,
      "compounds": [],
      "unit": 11
    },
    {
      "hanzi": "住",
      "pinyin": "zhù",
      "en": "",
      "tr": "oturmak, kalmak",
      "hsk": 1,
      "compounds": [],
      "unit": 11
    },
    {
      "hanzi": "电话",
      "pinyin": "diànhuà",
      "en": "telephone, phone call",
      "tr": "telefon",
      "hsk": 1,
      "compounds": [],
      "unit": 11
    },
    {
      "hanzi": "号码",
      "pinyin": "hàomǎ",
      "en": "",
      "tr": "numara",
      "hsk": 1,
      "compounds": [],
      "unit": 11
    },
    {
      "hanzi": "空儿",
      "pinyin": "kòngr",
      "en": "free time, spare time",
      "tr": "boş zaman",
      "hsk": 3,
      "compounds": [],
      "unit": 11
    },
    {
      "hanzi": "来",
      "pinyin": "lái",
      "en": "to come",
      "tr": "gelmek",
      "hsk": 1,
      "compounds": [],
      "unit": 11
    },
    {
      "hanzi": "玩儿",
      "pinyin": "wánr",
      "en": "",
      "tr": "oynamak, eğlenmek",
      "hsk": 1,
      "compounds": [],
      "unit": 11
    },
    {
      "hanzi": "再见",
      "pinyin": "zàijiàn",
      "en": "goodbye",
      "tr": "görüşürüz",
      "hsk": 1,
      "compounds": [],
      "unit": 11
    },
    {
      "hanzi": "百",
      "pinyin": "bǎi",
      "en": "",
      "tr": "yüz",
      "hsk": 1,
      "compounds": [],
      "unit": 11
    },
    {
      "hanzi": "千",
      "pinyin": "qiān",
      "en": "",
      "tr": "bin",
      "hsk": 1,
      "compounds": [],
      "unit": 11
    },
    {
      "hanzi": "万",
      "pinyin": "wàn",
      "en": "",
      "tr": "on bin",
      "hsk": 1,
      "compounds": [],
      "unit": 11
    },
    {
      "hanzi": "美元",
      "pinyin": "měiyuán",
      "en": "",
      "tr": "Amerikan doları",
      "hsk": 1,
      "compounds": [],
      "unit": 11
    },
    {
      "hanzi": "欧元",
      "pinyin": "ōuyuán",
      "en": "Euro",
      "tr": "euro",
      "hsk": 3,
      "compounds": [],
      "unit": 11
    },
    {
      "hanzi": "日元",
      "pinyin": "rìyuán",
      "en": "",
      "tr": "Japon yeni",
      "hsk": 1,
      "compounds": [],
      "unit": 11
    },
    {
      "hanzi": "超市",
      "pinyin": "chāoshì",
      "en": "supermarket",
      "tr": "süpermarket",
      "hsk": 2,
      "compounds": [],
      "unit": 11
    },
    {
      "hanzi": "买",
      "pinyin": "mǎi",
      "en": "to buy",
      "tr": "satın almak",
      "hsk": 1,
      "compounds": [],
      "unit": 11
    },
    {
      "hanzi": "东西",
      "pinyin": "dōngxi",
      "en": "thing",
      "tr": "eşya, şey",
      "hsk": 1,
      "compounds": [],
      "unit": 11
    },
    {
      "hanzi": "每",
      "pinyin": "měi",
      "en": "",
      "tr": "her",
      "hsk": 1,
      "compounds": [],
      "unit": 12
    },
    {
      "hanzi": "骑",
      "pinyin": "qí",
      "en": "",
      "tr": "binmek (bisiklet/ata)",
      "hsk": 1,
      "compounds": [],
      "unit": 12
    },
    {
      "hanzi": "自行车",
      "pinyin": "zìxíngchē",
      "en": "",
      "tr": "bisiklet",
      "hsk": 1,
      "compounds": [],
      "unit": 12
    },
    {
      "hanzi": "教室",
      "pinyin": "jiàoshì",
      "en": "classroom",
      "tr": "derslik, sınıf",
      "hsk": 1,
      "compounds": [],
      "unit": 12
    },
    {
      "hanzi": "走路",
      "pinyin": "zǒulù",
      "en": "",
      "tr": "yürümek",
      "hsk": 1,
      "compounds": [],
      "unit": 12
    },
    {
      "hanzi": "走",
      "pinyin": "zǒu",
      "en": "",
      "tr": "yürümek",
      "hsk": 1,
      "compounds": [],
      "unit": 12
    },
    {
      "hanzi": "路",
      "pinyin": "lù",
      "en": "",
      "tr": "yol",
      "hsk": 1,
      "compounds": [],
      "unit": 12
    },
    {
      "hanzi": "坐",
      "pinyin": "zuò",
      "en": "",
      "tr": "binmek (araçla)",
      "hsk": 1,
      "compounds": [],
      "unit": 12
    },
    {
      "hanzi": "出租车",
      "pinyin": "chūzūchē",
      "en": "taxi",
      "tr": "taksi",
      "hsk": 2,
      "compounds": [],
      "unit": 12
    },
    {
      "hanzi": "出租",
      "pinyin": "chūzū",
      "en": "",
      "tr": "kiralamak",
      "hsk": 1,
      "compounds": [],
      "unit": 12
    },
    {
      "hanzi": "车",
      "pinyin": "chē",
      "en": "",
      "tr": "araç",
      "hsk": 1,
      "compounds": [],
      "unit": 12
    },
    {
      "hanzi": "周末",
      "pinyin": "zhōumò",
      "en": "",
      "tr": "hafta sonu",
      "hsk": 1,
      "compounds": [],
      "unit": 12
    },
    {
      "hanzi": "公共汽车",
      "pinyin": "gōnggòng qìchē",
      "en": "",
      "tr": "otobüs",
      "hsk": 1,
      "compounds": [],
      "unit": 12
    },
    {
      "hanzi": "公共",
      "pinyin": "gōnggòng",
      "en": "public",
      "tr": "kamu, halka açık",
      "hsk": 2,
      "compounds": [],
      "unit": 12
    },
    {
      "hanzi": "汽车",
      "pinyin": "qìchē",
      "en": "car",
      "tr": "araba, otomobil",
      "hsk": 2,
      "compounds": [],
      "unit": 12
    },
    {
      "hanzi": "怎么",
      "pinyin": "zěnme",
      "en": "",
      "tr": "nasıl",
      "hsk": 1,
      "compounds": [],
      "unit": 12
    },
    {
      "hanzi": "挤",
      "pinyin": "jǐ",
      "en": "",
      "tr": "kalabalık, sıkışık",
      "hsk": 1,
      "compounds": [],
      "unit": 12
    },
    {
      "hanzi": "打的",
      "pinyin": "dǎdī",
      "en": "",
      "tr": "taksiye binmek",
      "hsk": 1,
      "compounds": [],
      "unit": 12
    },
    {
      "hanzi": "辆",
      "pinyin": "liàng",
      "en": "",
      "tr": "araçlar için sayı birimi",
      "hsk": 1,
      "compounds": [],
      "unit": 12
    },
    {
      "hanzi": "借",
      "pinyin": "jiè",
      "en": "",
      "tr": "ödünç almak/vermek",
      "hsk": 1,
      "compounds": [],
      "unit": 12
    },
    {
      "hanzi": "出发",
      "pinyin": "chūfā",
      "en": "",
      "tr": "yola çıkmak",
      "hsk": 1,
      "compounds": [],
      "unit": 12
    },
    {
      "hanzi": "没问题",
      "pinyin": "méi wèntí",
      "en": "",
      "tr": "sorun yok",
      "hsk": 1,
      "compounds": [],
      "unit": 12
    },
    {
      "hanzi": "问题",
      "pinyin": "wèntí",
      "en": "",
      "tr": "sorun, problem",
      "hsk": 1,
      "compounds": [],
      "unit": 12
    },
    {
      "hanzi": "找",
      "pinyin": "zhǎo",
      "en": "",
      "tr": "aramak, bulmak, para üstü vermek",
      "hsk": 1,
      "compounds": [],
      "unit": 12
    }
];

    const SENTENCES = [
      {
        "cn": "我爸爸是医生，我妈妈是护士。",
        "py": "Wǒ bàba shì yīshēng, wǒ māma shì hùshì.",
        "tr": "Babam bir doktor, annem bir hemşire.",
        "blocks": [
          "我",
          "爸爸",
          "是",
          "医生",
          "，",
          "我",
          "妈妈",
          "是",
          "护士",
          "。"
        ]
      },
      {
        "cn": "你早上吃面包还是喝牛奶？",
        "py": "Nǐ zǎoshang chī miànbāo háishì hē niúnǎi?",
        "tr": "Sabahları ekmek mi yersin yoksa süt mü içersin?",
        "blocks": [
          "你",
          "早上",
          "吃",
          "面包",
          "还是",
          "喝",
          "牛奶",
          "？"
        ]
      },
      {
        "cn": "他下午在图书馆学习汉语。",
        "py": "Tā xiàwǔ zài túshūguǎn xuéxí Hànyǔ.",
        "tr": "O öğleden sonra kütüphanede Çince çalışır.",
        "blocks": [
          "他",
          "下午",
          "在",
          "图书馆",
          "学习",
          "汉语",
          "。"
        ]
      },
      {
        "cn": "现在十二点半，我们去吃饭吧。",
        "py": "Xiànzài shí'èr diǎn bàn, wǒmen qù chīfàn ba.",
        "tr": "Şimdi saat on iki buçuk, hadi yemeğe gidelim.",
        "blocks": [
          "现在",
          "十二点",
          "半",
          "，",
          "我们",
          "去",
          "吃饭",
          "吧",
          "。"
        ]
      },
      {
        "cn": "明天上午我有汉语课和考试。",
        "py": "Míngtiān shàngwǔ wǒ yǒu Hànyǔ kè hé kǎoshì.",
        "tr": "Yarın sabah Çince dersim ve sınavım var.",
        "blocks": [
          "明天",
          "上午",
          "我",
          "有",
          "汉语",
          "课",
          "和",
          "考试",
          "。"
        ]
      },
      {
        "cn": "师傅，我要买一瓶水。",
        "py": "Shīfu, wǒ yào mǎi yī píng shuǐ.",
        "tr": "Usta, bir şişe su almak istiyorum.",
        "blocks": [
          "师傅",
          "，",
          "我",
          "要",
          "买",
          "一瓶",
          "水",
          "。"
        ]
      },
      {
        "cn": "下课以后，我和朋友一起去打球。",
        "py": "Xiàkè yǐhòu, wǒ hé péngyǒu yīqǐ qù dǎqiú.",
        "tr": "Dersten sonra arkadaşlarımla birlikte top oynamaya gideceğim.",
        "blocks": [
          "下课",
          "以后",
          "，",
          "我",
          "和",
          "朋友",
          "一起",
          "去",
          "打球",
          "。"
        ]
      },
      {
        "cn": "我每天坐公车去学校。",
        "py": "Wǒ měitiān zuò gōngchē qù xuéxiào.",
        "tr": "Hergün okula gitmek için otobüse binerim.",
        "blocks": [
          "我",
          "每天",
          "坐",
          "公车",
          "去",
          "学校",
          "。"
        ]
      },
      {
        "cn": "这家超市的东西很便宜。",
        "py": "Zhè jiā chāoshì de dōngxi hěn piányi.",
        "tr": "Bu süpermarketin eşyaları çok ucuz.",
        "blocks": [
          "这家",
          "超市",
          "的",
          "东西",
          "很",
          "便宜",
          "。"
        ]
      },
      {
        "cn": "我要买苹果和香蕉。",
        "py": "Wǒ yào mǎi píngguǒ hé xiāngjiāo.",
        "tr": "Elma ve muz almak istiyorum.",
        "blocks": [
          "我",
          "要",
          "买",
          "苹果",
          "和",
          "香蕉",
          "。"
        ]
      },
      {
        "cn": "你好，我叫大卫。",
        "py": "Nǐ hǎo, wǒ jiào Dàwèi.",
        "tr": "Merhaba, benim adım David.",
        "blocks": [
          "你",
          "好",
          "，",
          "我",
          "叫",
          "大卫",
          "。"
        ]
      },
      {
        "cn": "你是哪国人？",
        "py": "Nǐ shì nǎ guó rén?",
        "tr": "Sen hangi ülkedensin?",
        "blocks": [
          "你",
          "是",
          "哪",
          "国",
          "人",
          "？"
        ]
      },
      {
        "cn": "我们是学生。",
        "py": "Wǒmen shì xuésheng.",
        "tr": "Biz öğrenciyiz.",
        "blocks": [
          "我们",
          "是",
          "学生",
          "。"
        ]
      },
      {
        "cn": "这是我的书。",
        "py": "Zhè shì wǒ de shū.",
        "tr": "Bu benim kitabım.",
        "blocks": [
          "这",
          "是",
          "我",
          "的",
          "书",
          "。"
        ]
      },
      {
        "cn": "你家有几口人？",
        "py": "Nǐ jiā yǒu jǐ kǒu rén?",
        "tr": "Ailende kaç kişi var?",
        "blocks": [
          "你",
          "家",
          "有",
          "几",
          "口",
          "人",
          "？"
        ]
      },
      {
        "cn": "明天星期几？",
        "py": "Míngtiān xīngqī jǐ?",
        "tr": "Yarın günlerden ne?",
        "blocks": [
          "明天",
          "星期",
          "几",
          "？"
        ]
      },
      {
        "cn": "祝你生日快乐！",
        "py": "Zhù nǐ shēngrì kuàilè!",
        "tr": "Doğum günün kutlu olsun!",
        "blocks": [
          "祝",
          "你",
          "生日",
          "快乐",
          "！"
        ]
      },
      {
        "cn": "现在几点？",
        "py": "Xiànzài jǐ diǎn?",
        "tr": "Şu an saat kaç?",
        "blocks": [
          "现在",
          "几",
          "点",
          "？"
        ]
      },
      {
        "cn": "银行在哪儿？",
        "py": "Yínháng zài nǎr?",
        "tr": "Banka nerede?",
        "blocks": [
          "银行",
          "在",
          "哪儿",
          "？"
        ]
      },
      {
        "cn": "桌子上有一本书。",
        "py": "Zhuōzi shang yǒu yì běn shū.",
        "tr": "Masanın üzerinde bir kitap var.",
        "blocks": [
          "桌子",
          "上",
          "有",
          "一",
          "本",
          "书",
          "。"
        ]
      },
      {
        "cn": "我不去学校。",
        "py": "Wǒ bú qù xuéxiào.",
        "tr": "Ben okula gitmiyorum.",
        "blocks": [
          "我",
          "不",
          "去",
          "学校",
          "。"
        ]
      },
      {
        "cn": "他在房间里睡觉。",
        "py": "Tā zài fángjiān lǐ shuìjiào.",
        "tr": "O, odanın içinde uyuyor.",
        "blocks": [
          "他",
          "在",
          "房间",
          "里",
          "睡觉",
          "。"
        ]
      },
      {
        "cn": "你去图书馆吗？",
        "py": "Nǐ qù túshūguǎn ma?",
        "tr": "Kütüphaneye gidiyor musun?",
        "blocks": [
          "你",
          "去",
          "图书馆",
          "吗",
          "？"
        ]
      },
      {
        "cn": "我喜欢看电影。",
        "py": "Wǒ xǐhuan kàn diànyǐng.",
        "tr": "Film izlemeyi severim.",
        "blocks": [
          "我",
          "喜欢",
          "看",
          "电影",
          "。"
        ]
      },
      {
        "cn": "这个苹果多少钱？",
        "py": "Zhège píngguǒ duōshao qián?",
        "tr": "Bu elma ne kadar?",
        "blocks": [
          "这个",
          "苹果",
          "多少钱",
          "？"
        ]
      },
      {
        "cn": "太贵了，便宜一点儿吧。",
        "py": "Tài guì le, piányi yìdiǎnr ba.",
        "tr": "Çok pahalı, biraz ucuz olsun.",
        "blocks": [
          "太贵了",
          "，",
          "便宜",
          "一点儿",
          "吧",
          "。"
        ]
      },
      {
        "cn": "你想喝点儿什么？",
        "py": "Nǐ xiǎng hē diǎnr shénme?",
        "tr": "Ne içmek istersin?",
        "blocks": [
          "你",
          "想",
          "喝",
          "点儿",
          "什么",
          "？"
        ]
      },
      {
        "cn": "今天天气很热。",
        "py": "Jīntiān tiānqì hěn rè.",
        "tr": "Bugün hava很热。",
        "blocks": [
          "今天",
          "天气",
          "很热",
          "。"
        ]
      },
      {
        "cn": "很高兴认识你。",
        "py": "Hěn gāoxìng rènshi nǐ.",
        "tr": "Seni tanıdığıma çok sevindim.",
        "blocks": [
          "很高兴",
          "认识",
          "你",
          "。"
        ]
      },
      {
        "cn": "你在做什么呢？",
        "py": "Nǐ zài zuò shénme ne?",
        "tr": "Ne yapıyorsun?",
        "blocks": [
          "你",
          "在",
          "做",
          "什么",
          "呢",
          "？"
        ]
      }
    ];