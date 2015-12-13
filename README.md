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
- (Japanese) Japanesepod101 [http://www.japanesepod101.com/](http://www.japanesepod101.com/)
- (France/French) 法语助手 [http://www.frdic.com/](http://www.frdic.com/)
- (English) Learner's Dictionary [http://www.learnersdictionary.com/](http://www.learnersdictionary.com/)


## Add a New Online Dictionaries

- Find a new Online Dictionaries which is not yet being supported.
- Add its audio distraction rules to `content_scripts.js`.
- Add the site's name to `textSupportedSitesLists` in `_locales\en\messages.json`.
- Add the site's name to `README.md`.
- Update version number in `manifest.json`.
- Commit & Push.
- Update & publish to Google Chrome Store.
- Add the site's name to `blog page`.


## License

This project is licensed under the terms of the [MIT license](http://opensource.org/licenses/MIT).

This project uses:

- [jQuery](https://jquery.com/)
- Audio icon made by [Freepik](http://www.freepik.com) from [www.flaticon.com](http://www.flaticon.com), licensed under [CC BY 3.0](http://creativecommons.org/licenses/by/3.0/)
- Download icon made by [Google](http://www.google.com) from [www.flaticon.com](http://www.flaticon.com), licensed under [CC BY 3.0](http://creativecommons.org/licenses/by/3.0/)
