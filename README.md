# Fetch Audio of Online Dictionaries

## What is this

This Chrome Exthension adds links to download audio for serveral on-line dictionaries.

![](demo/jisho.jpg)

**Please note that the copyright of the audio clips belong to their original owners.**


## Supported Online Dictionaries

- (English) 台灣雅虎奇摩字典 [http://tw.dictionary.yahoo.com/](http://tw.dictionary.yahoo.com/)
- (English) Oxford Learners Dictionaries [http://www.oxfordlearnersdictionaries.com/](http://www.oxfordlearnersdictionaries.com/)
- (Japanese) jisho Japanese-English dictionary [http://jisho.org/](http://jisho.org/)
- (Traditional Chinese) 萌典 [https://www.moedict.tw/](https://www.moedict.tw/)
- (English) Cambridge Dictionaries online [http://dictionary.cambridge.org/](http://dictionary.cambridge.org/)
- (German/Deutsch) 德语助手 [http://www.godic.net/](http://www.godic.net/)
- (Japanese) Japanesepod101 [http://www.japanesepod101.com/](http://www.japanesepod101.com/japanese-dictionary/)
- (France/French) 法语助手 [http://www.frdic.com/](http://www.frdic.com/)
- (English) Learner's Dictionary [http://www.learnersdictionary.com/](http://www.learnersdictionary.com/)
- (English) Merriam-Webster [http://www.merriam-webster.com/](http://www.merriam-webster.com/)
- (English) VoiceTube [https://tw.voicetube.com/](https://tw.voicetube.com/)
- (English) Dr.eye 譯典通 [http://yun.dreye.com/dict_new/](http://yun.dreye.com/dict_new/)
- (English) Vocabulary.com [https://www.vocabulary.com/](https://www.vocabulary.com/)
- (English) The Free Dictionary [http://www.thefreedictionary.com/](http://www.thefreedictionary.com/)
- (English) Quizlet [https://quizlet.com/](https://quizlet.com/)
- (English) Macmillan Dictionary [http://www.macmillandictionary.com/dictionary/](http://www.macmillandictionary.com/dictionary/)
- (Vietnamese) Vietnamesepod101 [http://www.vietnamesepod101.com/](http://www.vietnamesepod101.com/vietnamese-dictionary/)
- (J/E) 沪江小d [http://dict.hjenglish.com/](http://dict.hjenglish.com/)
- (Vietnamese) tratu.coviet.vn [http://tratu.coviet.vn/](http://tratu.coviet.vn/)
- (粵語) 粵語發音詞典 [http://www.yueyv.cn/](http://www.yueyv.cn/)
- (English) Dictionary.com [http://www.dictionary.com/](http://www.dictionary.com/)
- (Japanese) Online Japanese Accent Dictionary [http://www.gavo.t.u-tokyo.ac.jp/ojad/](http://www.gavo.t.u-tokyo.ac.jp/ojad/)
- (English) 有道詞典 [http://www.youdao.com/](http://www.youdao.com/)
- (English) Longman Dictionary of Contemporary English [http://www.ldoceonline.com/](http://www.ldoceonline.com/)
- (All) Linguee [http://www.linguee.com/](http://www.linguee.com/)
- (English/German) BeoLingus [http://dict.tu-chemnitz.de/](http://dict.tu-chemnitz.de/)
- (English/Thai) thai2english [http://www.thai2english.com/](http://www.thai2english.com/)
- (English/Thai) thai-language.com [http://www.thai-language.com/](http://www.thai-language.com/)
- (English) Dict.cn [http://dict.cn/](http://dict.cn/)
- (All) Collins Dictionary [https://www.collinsdictionary.com/](https://www.collinsdictionary.com/)
- (Korean) Naver Dictionary [http://dic.naver.com/](http://dic.naver.com/)
- (漢語) 漢典 [http://www.zdic.net/](http://www.zdic.net/)
- (English) 歐路辭典 [http://dict.eudic.net/](http://dict.eudic.net/)
- (原住民語) 原住民族語言線上辭典 [http://e-dictionary.apc.gov.tw/](http://e-dictionary.apc.gov.tw/)
- (English/German) learngerman.dw.com [https://learngerman.dw.com/](https://learngerman.dw.com/)
- (English) WordReference [http://www.wordreference.com/](http://www.wordreference.com/)
- (台語) i taigi [https://itaigi.tw](https://itaigi.tw)
- (German/Deutsch) [https://dict.leo.org](https://dict.leo.org)
- (All) Forvo [https://forvo.com](https://forvo.com)

## Add a New Entry

- Find a new Online Dictionary which is not yet being supported.
- Add its audio extraction rules to `content_scripts.js`.
- Remove or comment out debug message.
- Add the site's name to `textSupportedSitesLists` in `_locales\en\messages.json`.
- Add the site's name to `README.md`.
- Update version number in `manifest.json`.
- Add version notes in `updates.html`.
- Commit & Push to github.
- Update & publish to Google Chrome Store.
- Add the site's name to `blog page`.


## License

This project is licensed under the terms of the [MIT license](http://opensource.org/licenses/MIT).

This project uses:

- [jQuery](https://jquery.com/)
- Audio icon made by [Freepik](http://www.freepik.com) from [www.flaticon.com](http://www.flaticon.com), licensed under [CC BY 3.0](http://creativecommons.org/licenses/by/3.0/)
- Download icon made by [Google](http://www.google.com) from [www.flaticon.com](http://www.flaticon.com), licensed under [CC BY 3.0](http://creativecommons.org/licenses/by/3.0/)
