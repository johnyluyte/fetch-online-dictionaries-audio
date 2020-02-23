/*
  If we use jQuery here, we should include jQuery in the "content_scripts" field in manifest.json.

  Reference:
    https://developer.chrome.com/extensions/overview
    https://developer.chrome.com/extensions/content_scripts
*/

$(function() {
  mainJob(document.URL);
});

function mainJob(url) {
  /*
    1. [REGEX in javascript]
      We do not need double quote "" here, because the function match(reg) requires RGEEX in its argument, and string confounded by double forward slash /MY_REG/ is the RGEEX in javascript

    2. [i18n in Chrome Extension]
      https://developer.chrome.com/extensions/i18n
  */

  // https://tw.dictionary.yahoo.com/
  if (url.match(/http[s]?:\/\/*tw.dictionary.search.yahoo.com\/*/)) {
    // audio element might not be loaded yet, we should check it again later.
    function captureUrlWithRetry(retryCount) {
      function captureUrl() {
        if (!$(".dict-sound > audio").length) {
          return false;
        }
        $(".dict-sound > audio").each(function() {
          const audioUrl = $(this).attr("src");
          insertDownloadLink(audioUrl, $(this).parent());
        });
        return true;
      }

      if (!captureUrl()) {
        const retryMaxLimitation = 5;
        const retryInterval = 300;
        if (retryCount < retryMaxLimitation) {
          setTimeout(function() {
            captureUrlWithRetry(retryCount + 1);
          }, retryInterval);
        }
      }
    }

    captureUrlWithRetry(0);
  }

  // http://www.oxfordlearnersdictionaries.com/definition/english/wall_1?q=wall
  else if (url.match(/http[s]?:\/\/*www.oxfordlearnersdictionaries.com\/*/)) {
    if (!$(".audio_play_button").length) {
      return false;
    }
    $(".audio_play_button").each(function() {
      const audioUrl = $(this).attr("data-src-mp3");
      insertDownloadLink(audioUrl, $(this));
    });
  }

  // http://jisho.org/
  else if (url.match(/http[s]?:\/\/*jisho.org\/*/)) {
    if (!$("a.concept_audio").length) {
      return false;
    }
    $("a.concept_audio").each(function() {
      const audioUrl = $(this)
        .prev()
        .children()
        .first()
        .attr("src");
      insertDownloadLink(audioUrl, $(this));
    });
  }

  // https://www.moedict.tw/
  else if (url.match(/http[s]?:\/\/*www.moedict.tw\/*/)) {
    if (!$(".icon-play.playAudio").length) {
      return false;
    }
    $(".icon-play.playAudio").each(function() {
      const audioUrl = $(this)
        .children()
        .filter(function() {
          return $(this).attr("itemprop") === "contentURL";
        })
        .attr("content");
      insertDownloadLink(audioUrl, $(this));
    });
  }

  // http://dictionary.cambridge.org/
  else if (url.match(/http[s]?:\/\/*dictionary.cambridge.org\/*/)) {
    if (!$(".sound.audio_play_button").length) {
      return false;
    }
    $(".sound.audio_play_button").each(function() {
      const audioUrl = $(this).attr("data-src-mp3");
      insertDownloadLink(audioUrl, $(this));
    });
  }

  // http://www.godic.net/
  else if (url.match(/http[s]?:\/\/*www.godic.net\/*/)) {
    if (!$("#dict-body .voice-js.voice-button").length) {
      return false;
    }
    $("#dict-body .voice-js.voice-button").each(function() {
      // 排除掉中文發音
      if (
        !$(this)
          .attr("data-rel")
          .match(/langid=de*/)
      ) {
        // If we "return false" here, we will accidentally break out of each() loops early. see http://api.jquery.com/each/
        return;
      }
      const audioUrl =
        "http://api.frdic.com/api/v2/speech/speakweb?" +
        $(this).attr("data-rel");
      insertDownloadLink(audioUrl, $(this));
    });
  }

  // http://www.frdic.com/
  else if (url.match(/http[s]?:\/\/*www.frdic.com\/*/)) {
    if (!$("#dict-body .voice-js.voice-button").length) {
      return false;
    }
    $("#dict-body .voice-js.voice-button").each(function() {
      // 排除掉中文發音
      if (
        !$(this)
          .attr("data-rel")
          .match(/langid=fr*/)
      ) {
        // If we "return false" here, we will accidentally break out of each() loops early. see http://api.jquery.com/each/
        return;
      }
      const audioUrl =
        "http://api.frdic.com/api/v2/speech/speakweb?" +
        $(this).attr("data-rel");
      insertDownloadLink(audioUrl, $(this));
    });
  }

  // http://www.japanesepod101.com/
  else if (url.match(/http[s]?:\/\/*www.japanesepod101.com\/*/)) {
    if (!$(".ill-onebuttonplayer").length) {
      return false;
    }
    $(".ill-onebuttonplayer").each(function() {
      const audioUrl = $(this).attr("data-url");
      insertDownloadLink(audioUrl, $(this));
    });
  }

  // http://www.vietnamesepod101.com/
  else if (url.match(/http[s]?:\/\/*www.vietnamesepod101.com\/*/)) {
    if (!$(".ill-onebuttonplayer").length) {
      return false;
    }
    $(".ill-onebuttonplayer").each(function() {
      const audioUrl = $(this).attr("data-url");
      insertDownloadLink(audioUrl, $(this));
    });
  }

  // http://www.learnersdictionary.com/definition/dog
  else if (url.match(/http[s]?:\/\/*www.learnersdictionary.com\/*/)) {
    if (!$(".fa.fa-volume-up.play_pron").length) {
      return false;
    }
    $(".fa.fa-volume-up.play_pron").each(function() {
      const dir = $(this).attr("data-dir");
      const file = $(this).attr("data-file");
      const audioUrl =
        "http://media.merriam-webster.com/audio/prons/en/us/mp3/" +
        dir +
        "/" +
        file +
        ".mp3";
      insertDownloadLink(audioUrl, $(this));
    });
  }

  // https://tw.voicetube.com/definition/prodigy?ref=def
  else if (url.match(/http[s]?:\/\/*tw.voicetube.com\/definition\/*/)) {
    if (!$(".audioButton").length) {
      return false;
    }
    $(".audioButton").each(function() {
      const audioUrl = "https://tw.voicetube.com" + $(this).attr("href");
      insertDownloadLink(
        audioUrl,
        $(this)
          .parent()
          .parent()
      );
    });
  }

  // http://www.merriam-webster.com/dictionary/cat
  else if (url.match(/http[s]?:\/\/*www.merriam-webster.com\/*/)) {
    if (!$(".play-pron").length) {
      return false;
    }
    $(".play-pron").each(function() {
      const dir = $(this).attr("data-dir");
      const file = $(this).attr("data-file");
      const audioUrl =
        "http://media.merriam-webster.com/audio/prons/en/us/mp3/" +
        dir +
        "/" +
        file +
        ".mp3";
      insertDownloadLink(audioUrl, $(this));
    });
  }

  // http://yun.dreye.com/dict_new/dict.php?w=dog&hidden_codepage=01
  // http://yun.dreye.com/dict_new/dict.php?w=accordance
  else if (url.match(/http[s]?:\/\/*yun.dreye.com\/dict_new\/*/)) {
    // 從網址取得查詢的單字
    // Could use split(regex) here to make it less ugly
    const tmp = url.split("=")[1];
    const vocab = tmp.split("&")[0];
    if (!vocab) {
      return false;
    }
    // 取得第一個字母，並將其轉成大寫，例如 'a' -> 'A'
    const dir = vocab.charAt(0).toUpperCase();
    // 真人發音(男)
    if ($("#real_pron_m").length) {
      $("#real_pron_m").each(function() {
        const audioUrl =
          "http://yun.dreye.com/dict_new/media/" + dir + "/" + vocab + ".mp3";
        insertDownloadLink(audioUrl, $(this));
      });
    }
    // 真人發音(女)
    if ($("#real_pron_f").length) {
      $("#real_pron_f").each(function() {
        const audioUrl =
          "http://yun.dreye.com/dict_new/female_media/" +
          dir +
          "/" +
          vocab +
          ".mp3";
        insertDownloadLink(audioUrl, $(this));
      });
    }
  }

  // https://www.vocabulary.com/dictionary/dog
  else if (url.match(/http[s]?:\/\/*www.vocabulary.com\/dictionary\/*/)) {
    if (!$("a.audio").length) {
      return false;
    }
    $("a.audio").each(function() {
      const audioUrl =
        "https://audio.vocab.com/1.0/us/" + $(this).attr("data-audio") + ".mp3";
      insertDownloadLink(audioUrl, $(this));
    });
  }

  // http://www.thefreedictionary.com/dog
  else if (url.match(/http[s]?:\/\/*www.thefreedictionary.com\/*/)) {
    // 美國
    if ($(".i.snd-icon-US").length > 0) {
      $(".i.snd-icon-US").each(function() {
        const tmp = $(this).attr("onclick");
        const audioUrl = tmp.substring(10, tmp.length - 2);
        insertDownloadLink(audioUrl, $(this));
      });
    }
    // 英國
    if ($(".i.snd-icon-UK").length > 0) {
      $(".i.snd-icon-UK").each(function() {
        const tmp = $(this).attr("onclick");
        const audioUrl = tmp.substring(10, tmp.length - 2);
        insertDownloadLink(audioUrl, $(this));
      });
    }
    // plain
    if ($(".i.snd-icon-plain").length > 0) {
      $(".i.snd-icon-plain").each(function() {
        const tmp = $(this).attr("onclick");
        const audioUrl = tmp.substring(10, tmp.length - 2);
        insertDownloadLink(audioUrl, $(this));
      });
    }
    // TODO: too lazy to deal with duplicated codes.
  }

  // TODO: 寫法髒且太過 Hard Code?
  // https://quizlet.com/
  else if (url.match(/http[s]?:\/\/*quizlet.com\/*/)) {
    if (!$("a.play-audio").length) {
      return false;
    }
    // 從 DOM 裡面找到設定 Quizlet.SetPage 的 <script>
    const isTarget = function(aikotoba) {
      if (aikotoba === "Quizlet.SetPage") {
        return true;
      }
      return false;
    };
    const scripts = document.getElementsByTagName("script");
    let targetScript = null;
    for (let i = 0; i < scripts.length; ++i) {
      if (isTarget(scripts[i].innerHTML.substring(15, 30))) {
        targetScript = scripts[i].innerHTML;
        break;
      }
    }
    // 取得有 data-id 與 word_audio 關聯的 json
    const posStart = targetScript.indexOf("[{");
    const posEnd = targetScript.indexOf("}])");
    const myJson = JSON.parse(targetScript.substring(posStart, posEnd + 2));
    $("a.play-audio").each(function() {
      // 往上找到所屬之 data-id
      const dataId = $(this)
        .closest(".has-audio")[0]
        .getAttribute("data-id");
      for (let i = 0; i < myJson.length; i++) {
        if (myJson[i].id === dataId) {
          insertDownloadLink(myJson[i].word_audio, $(this));
          break;
        }
      }
    });
  }

  // http://www.macmillandictionary.com/dictionary/british/dog_1
  else if (
    url.match(/http[s]?:\/\/*www.macmillandictionary.com\/dictionary\/*/)
  ) {
    if (!$("span.PRONS").length) {
      return false;
    }
    $("span.PRONS").each(function() {
      const audioUrl = $(this)
        .children(".audio_play_button")
        .attr("data-src-mp3");
      insertDownloadLink(audioUrl, $(this));
    });
  }

  // http://dict.hjenglish.com/
  else if (url.match(/http[s]?:\/\/*dict.hjenglish.com\/*/)) {
    if (!$(".word-audio").length) {
      return false;
    }
    $(".word-audio").each(function() {
      const audioUrl = $(this).attr("data-src");
      insertDownloadLink(audioUrl, $(this));
    });
  }

  // http://tratu.coviet.vn/
  else if (url.match(/http[s]?:\/\/*tratu.coviet.vn\/*/)) {
    if (!$("#sound > param[name='FlashVars']").length) {
      return false;
    }
    $("#sound > param[name='FlashVars']").each(function() {
      const value = $(this).attr("value");
      const audioUrl = value.substring(5, value.length - 16);
      insertDownloadLink(audioUrl, $(this));
    });
  }

  // http://www.yueyv.cn/
  else if (url.match(/http[s]?:\/\/*www.yueyv.cn\/*/)) {
    // 單字發音
    if ($(".dictvoice").length) {
      $(".dictvoice").each(function() {
        const target = $(this).attr("data-rel");
        const audioUrl = "http://www.yueyv.cn/voice/" + target + ".mp3";
        insertDownloadLink(audioUrl, $(this));
      });
    }
    // 例句發音
    if ($("audio[id^=mediacontrol]").length) {
      $("audio[id^=mediacontrol]").each(function() {
        const target = $(this).attr("src");
        const audioUrl = "http://www.yueyv.cn/" + target;
        insertDownloadLink(audioUrl, $(this));
      });
    }
  }

  // http://www.dictionary.com/
  else if (url.match(/http[s]?:\/\/*www.dictionary.com\/*/)) {
    if (!$(".audio-wrapper").length) {
      return false;
    }
    $(".audio-wrapper>audio").each(function() {
      const audioUrl = $(this)
        .children()
        .filter(function() {
          return $(this).attr("type") === "audio/mpeg";
        })
        .attr("src");
      insertDownloadLink(audioUrl, $(this).parent());
    });
  }

  // http://www.gavo.t.u-tokyo.ac.jp/ojad/
  else if (url.match(/http[s]?:\/\/*www.gavo.t.u-tokyo.ac.jp\/ojad\/*/)) {
    const preUrl = "http://www.gavo.t.u-tokyo.ac.jp/ojad/sound4/mp3/";
    // 女生發音
    if (!$(".katsuyo_proc_female_button").length) {
      return false;
    }
    $(".katsuyo_proc_female_button").each(function() {
      const audioUrl = ojadGetURL(
        preUrl + "female/",
        $(this).attr("id") + ".mp3"
      );
      if (audioUrl !== null) {
        insertDownloadLink(
          audioUrl,
          $(this)
            .parent()
            .prev()
        );
      }
    });
    // 男生發音
    if (!$(".katsuyo_proc_male_button").length) {
      return false;
    }
    $(".katsuyo_proc_male_button").each(function() {
      const audioUrl = ojadGetURL(
        preUrl + "male/",
        $(this).attr("id") + ".mp3"
      );
      if (audioUrl !== null) {
        insertDownloadLink(
          audioUrl,
          $(this)
            .parent()
            .prev()
        );
      }
    });
  }

  // http://www.youdao.com/
  else if (url.match(/http[s]?:\/\/*www.youdao.com\/*/)) {
    if (!$(".dictvoice").length) {
      return false;
    }
    $(".dictvoice").each(function() {
      const audioUrl =
        "http://dict.youdao.com/dictvoice?audio=" + $(this).attr("data-rel");
      insertDownloadLink(audioUrl, $(this).parent());
    });
  }

  // http://www.ldoceonline.com/dictionary/
  else if (url.match(/http[s]?:\/\/*www.ldoceonline.com\/dictionary\/*/)) {
    if (!$(".speaker").length) {
      return false;
    }
    $(".speaker").each(function() {
      const audioUrl = $(this).attr("data-src-mp3");
      insertDownloadLink(audioUrl, $(this), false);
    });
  }

  // http://www.linguee.com/
  else if (url.match(/http[s]?:\/\/*www.linguee.com\/*/)) {
    if (!$(".audio").length) {
      return false;
    }
    $(".audio").each(function() {
      const audioUrl = "http://www.linguee.com/mp3/" + $(this).attr("id");
      insertDownloadLink(audioUrl, $(this), false);
    });
  }

  // http://dict.tu-chemnitz.de/
  else if (url.match(/http[s]?:\/\/*dict.tu-chemnitz.de\/*/)) {
    console.log($("img[src*='/pics/s1.png']").length);
    if (!$("img[src*='/pics/s1.png']").length) {
      return false;
    }
    $("img[src*='/pics/s1.png']")
      .parent()
      .each(function() {
        const tmp = $(this).attr("href");
        const audioUrl =
          "http://dict.tu-chemnitz.de/speak-" +
          tuchemnitz(tmp.substring(17, tmp.length - 2)) +
          ".mp3";
        insertDownloadLink(audioUrl, $(this), false);
      });
  }

  // http://www.thai2english.com
  else if (url.match(/http[s]?:\/\/*www.thai2english.com\/*/)) {
    if (!$("img[src*='img/sound.gif']").length) {
      return false;
    }
    $("img[src*='/img/sound.gif']").each(function() {
      const tmp = $(this)
        .parent()
        .attr("onclick"); // PlaySound('ป่า', 1370321)
      const regexResult = /(.*), (.*)\)/g.exec(tmp);
      const id = regexResult[2]; // 1370321)
      const audioUrl = "http://www.thai2english.com/sounds/" + id + ".mp3";
      // console.log(audioUrl);
      insertDownloadLink(audioUrl, $(this).parent(), false);
    });
  }

  // http://www.thai-language.com
  else if (url.match(/http[s]?:\/\/*www.thai-language.com\/*/)) {
    if (!$("img[src*='img/speaker_sm.gif']").length) {
      return false;
    }
    $("img[src*='/img/speaker_sm.gif']").each(function() {
      const tmp = $(this)
        .parent()
        .attr("onclick"); // PlayAudioFile('/audio/P202463.wma')
      const regexResult = /PlayAudioFile\('(.*)'\)/g.exec(tmp);
      const id = regexResult[1]; //
      const audioUrl = "http://www.thai-language.com" + id;
      // console.log(audioUrl);
      insertDownloadLink(audioUrl, $(this).parent(), false);
    });
  }

  // http://dict.cn/
  else if (url.match(/http[s]?:\/\/*dict.cn\/*/)) {
    if (!$(".sound").length) {
      return false;
    }
    $(".sound").each(function() {
      const audioUrl = "http://audio.dict.cn/" + $(this).attr("naudio");
      insertDownloadLink(audioUrl, $(this), false);
    });
  }

  // https://www.collinsdictionary.com/
  else if (url.match(/http[s]?:\/\/*www.collinsdictionary.com\/*/)) {
    if (!$(".audio_play_button").length) {
      return false;
    }
    $(".audio_play_button").each(function() {
      const audioUrl =
        "https://www.collinsdictionary.com" + $(this).attr("data-src-mp3");
      insertDownloadLink(audioUrl, $(this), false);
    });
  }

  // http://dic.naver.com
  else if (url.match(/http[s]?:\/\/*dic.naver.com\/*/)) {
    if (!$("a.play").length) {
      return false;
    }
    $("a.play").each(function() {
      const audioUrl = $(this).attr("playlist");
      insertDownloadLink(audioUrl, $(this), false);
    });
  }

  // http://www.zdic.net/z
  else if (url.match(/http[s]?:\/\/*www.zdic.net\/z\/*/)) {
    if (!$("i.sound").length) {
      return false;
    }
    $("i.sound").each(function() {
      const audioUrl =
        "http://www.zdic.net/p/mp3/" + $(this).attr("audio") + ".mp3";
      insertDownloadLink(audioUrl, $(this), false);
    });
  }

  // http://dict.eudic.net/dicts/en/
  else if (url.match(/http[s]?:\/\/*dict.eudic.net\/dicts\/en\/*/)) {
    if (!$("a.voice-button").length) {
      return false;
    }
    $("a.voice-button").each(function() {
      const audioUrl =
        "http://api.frdic.com/api/v2/speech/speakweb?" +
        $(this).attr("data-rel");
      insertDownloadLink(audioUrl, $(this), false);
    });
  }

  // http://e-dictionary.apc.gov.tw/
  else if (url.match(/http[s]?:\/\/*e-dictionary.apc.gov.tw\/*/)) {
    if (!$("a.play").length) {
      return false;
    }
    $("a.play").each(function() {
      const audioUrl = "http://e-dictionary.apc.gov.tw" + $(this).attr("rel");
      insertDownloadLink(audioUrl, $(this), false);
    });
  }

  // https://learngerman.dw.com/en/
  else if (url.match(/http[s]?:\/\/*learngerman.dw.com\/en\/*/)) {
    if (!$("a.audio-link > audio > source").length) {
      return false;
    }
    $("a.audio-link > audio > source").each(function() {
      const audioUrl = $(this).attr("src");
      insertDownloadLink(
        audioUrl,
        $(this)
          .parent()
          .parent()
      );
    });
  }

  // http://www.wordreference.com/
  else if (url.match(/http[s]?:\/\/*www.wordreference.com\/*/)) {
    if (!$("#listen_widget").length) {
      return false;
    }
    $("#listen_widget").each(function() {
      const prefix = `http://www.wordreference.com`;
      insertDownloadLink(
        prefix + $("#aud7 > source").attr("src"),
        $(this),
        true,
        `(JAMAICAN)<br/>`
      );
      insertDownloadLink(
        prefix + $("#aud6 > source").attr("src"),
        $(this),
        true,
        `(US-SOUNTHERN)<br/>`
      );
      insertDownloadLink(
        prefix + $("#aud5 > source").attr("src"),
        $(this),
        true,
        `(SCOTTISH)<br/>`
      );
      insertDownloadLink(
        prefix + $("#aud4 > source").attr("src"),
        $(this),
        true,
        `(IRISH)<br/>`
      );
      insertDownloadLink(
        prefix + $("#aud3 > source").attr("src"),
        $(this),
        true,
        `(UK-YORKSHIRE)<br/>`
      );
      insertDownloadLink(
        prefix + $("#aud2 > source").attr("src"),
        $(this),
        true,
        `(UK-RP)<br/>`
      );
      insertDownloadLink(
        prefix + $("#aud1 > source").attr("src"),
        $(this),
        true,
        `(UK)<br/>`
      );
      insertDownloadLink(
        prefix + $("#aud0 > source").attr("src"),
        $(this),
        true,
        `(US)<br/>`
      );
    });
  }

  // https://itaigi.tw/k/%E9%86%AB%E7%94%9F
  else if (url.match(/http[s]?:\/\/*itaigi.tw\/*/)) {
    if (!$(".HuatIm > audio > source").length) {
      return false;
    }
    $(".HuatIm > audio > source").each(function() {
      let audioUrl = $(this).attr("src");
      if (!audioUrl.includes(`.mp3`)) {
        audioUrl += `.mp3`;
      }
      insertDownloadLink(
        audioUrl,
        $(this)
          .parent()
          .parent()
      );
    });
  }

  // https://www.leo.org/
  else if (url.match(/http[s]?:\/\/*dict.leo.org\/*/)) {
    if (!$(".icon_play-circle-outline").length) {
      return false;
    }
    $(".icon_play-circle-outline").each(function() {
      const audioUrl =
        `https://dict.leo.org/media/audio/` +
        $(this).attr("data-dz-rel-audio") +
        `.ogg`;
      insertDownloadLink(
        audioUrl,
        $(this)
          .parent()
          .next()
          .children()
      );
    });
  }

  // TODO: too lazy to tidy up duplicated codes
  else {
    // console.log("no match");
    return false;
  }
}

function insertDownloadLink(
  audioUrl,
  insertAfterDOM,
  isInsertLogo = true,
  text = ""
) {
  // console.log("audioUrl = " + audioUrl);
  const imageUrl = chrome.extension.getURL("icons/icon_24.png");
  let HTML =
    "<span style='font-size:14px'><a target='_blank' href='" +
    audioUrl +
    "'>" +
    chrome.i18n.getMessage("textDownloadAudio") +
    text;
  if (isInsertLogo) {
    HTML +=
      "<img src='" +
      imageUrl +
      "' alt='Download Audio' height='16' width='16'>";
  }
  HTML += "</a></font>";
  $(HTML).insertAfter(insertAfterDOM);
}

function tuchemnitz(fileName) {
  const myRegexp = /(.*?);(.*)/g;
  const regexResult = myRegexp.exec(fileName);
  if (regexResult === null) {
    return null;
  }
  // console.log(regexResult);
  return regexResult[1];
}

function ojadGetURL(preUrl, fileName) {
  const myRegexp = /(.*?)_(.*)_/g;
  const regexResult = myRegexp.exec(fileName);
  if (regexResult === null) {
    return null;
  }
  const prefix = regexResult[1];
  // console.log(prefix);

  let categoryUrl = Math.floor(prefix / 100).toString();
  while (categoryUrl.length < 3) {
    categoryUrl = "0" + categoryUrl;
  }
  // console.log(categoryUrl);
  return preUrl + categoryUrl + "/" + fileName;
}

/*
  `content_script.js` and `background.js` use "Message Passing" to communicate with each other.
  FYI, `background.js` controls `page action`.

  Reference:
    https://developer.chrome.com/extensions/pageAction
    https://developer.chrome.com/extensions/messaging
*/
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.greeting === "onClickedPageActionButton") {
    mainJob(document.URL);
    sendResponse({
      farewell: "goodbye"
    });
  }
});
