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

  // https://tw.dictionary.yahoo.com/dictionary?p=wall
  if (url.match(/http[s]?:\/\/*tw.dictionary.yahoo.com\/*/)) {
    if (!$("audio source").length) {
      return false;
    }
    const audioUrl = $("audio source").attr("src");
    insertDownloadLink(audioUrl, '.button-audio');
  }

  // http://www.oxfordlearnersdictionaries.com/definition/english/wall_1?q=wall
  else if (url.match(/http:\/\/*www.oxfordlearnersdictionaries.com\/*/)) {
    if (!$(".audio_play_button").length) {
      return false;
    }
    $(".audio_play_button").each(function() {
      const audioUrl = $(this).attr("data-src-mp3");
      insertDownloadLink(audioUrl, $(this));
    });
  }

  // http://jisho.org/
  else if (url.match(/http:\/\/*jisho.org\/*/)) {
    if (!$("a.concept_audio").length) {
      return false;
    }
    $("a.concept_audio").each(function() {
      const audioUrl = $(this).prev().children().first().attr("src");
      insertDownloadLink(audioUrl, $(this));
    });
  }

  // https://www.moedict.tw/
  else if (url.match(/http[s]?:\/\/*www.moedict.tw\/*/)) {
    if (!$(".icon-play.playAudio").length) {
      return false;
    }
    $(".icon-play.playAudio").each(function() {
      const audioUrl = $(this).children().filter(function() {
        return $(this).attr("itemprop") === "contentURL";
      }).attr("content");
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
      if (!$(this).attr("data-rel").match(/langid=de*/)) {
        // If we "return false" here, we will accidentally break out of each() loops early. see http://api.jquery.com/each/
        return;
      }
      const audioUrl = "http://api.frdic.com/api/v2/speech/speakweb?" + $(this).attr("data-rel");
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
      if (!$(this).attr("data-rel").match(/langid=fr*/)) {
        // If we "return false" here, we will accidentally break out of each() loops early. see http://api.jquery.com/each/
        return;
      }
      const audioUrl = "http://api.frdic.com/api/v2/speech/speakweb?" + $(this).attr("data-rel");
      insertDownloadLink(audioUrl, $(this));
    });
  }

  // http://www.japanesepod101.com/
  else if (url.match(/http[s]?:\/\/*www.japanesepod101.com\/japanese-dictionary\/*/)) {
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
      const audioUrl = "http://media.merriam-webster.com/audio/prons/en/us/mp3/" + dir + "/" + file + ".mp3";
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
      insertDownloadLink(audioUrl, $(this).parent().parent());
    });
  }

  // http://www.merriam-webster.com/dictionary/cat
  else if (url.match(/http[s]?:\/\/*www.merriam-webster.com\/dictionary\/*/)) {
    if (!$(".play-pron").length) {
      return false;
    }
    $(".play-pron").each(function() {
      const dir = $(this).attr("data-dir");
      const file = $(this).attr("data-file");
      const audioUrl = "http://media.merriam-webster.com/audio/prons/en/us/mp3/" + dir + "/" + file + ".mp3";
      insertDownloadLink(audioUrl, $(this));
    });
  }

  // http://yun.dreye.com/dict_new/dict.php?w=dog&hidden_codepage=01
  // http://yun.dreye.com/dict_new/dict.php?w=accordance
  else if (url.match(/http[s]?:\/\/*yun.dreye.com\/dict_new\/*/)) {
    // 從網址取得查詢的單字
    // Could use split(regex) here to make it less ugly
    const tmp = url.split('=')[1];
    const vocab = tmp.split('&')[0];
    if (!vocab) {
      return false;
    }
    // 取得第一個字母，並將其轉成大寫，例如 'a' -> 'A'
    const dir = vocab.charAt(0).toUpperCase();
    // 真人發音(男)
    if ($("#real_pron_m").length) {
      $("#real_pron_m").each(function() {
        const audioUrl = "http://yun.dreye.com/dict_new/media/" + dir + "/" + vocab + ".mp3";
        insertDownloadLink(audioUrl, $(this));
      });
    }
    // 真人發音(女)
    if ($("#real_pron_f").length) {
      $("#real_pron_f").each(function() {
        const audioUrl = "http://yun.dreye.com/dict_new/female_media/" + dir + "/" + vocab + ".mp3";
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
      const audioUrl = "https://audio.vocab.com/1.0/us/" + $(this).attr("data-audio") + ".mp3";
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
      if (aikotoba === 'Quizlet.SetPage') {
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
    const posStart = targetScript.indexOf('[{');
    const posEnd = targetScript.indexOf('}])');
    const myJson = JSON.parse(targetScript.substring(posStart, posEnd + 2));
    $("a.play-audio").each(function() {
      // 往上找到所屬之 data-id
      const dataId = $(this).closest('.has-audio')[0].getAttribute('data-id');
      for (let i = 0; i < myJson.length; i++) {
        if (myJson[i].id === dataId) {
          insertDownloadLink(myJson[i].word_audio, $(this));
          break;
        }
      }
    });
  }

  // http://www.macmillandictionary.com/dictionary/british/dog_1
  else if (url.match(/http[s]?:\/\/*www.macmillandictionary.com\/dictionary\/*/)) {
    if (!$("span.PRONS").length) {
      return false;
    }
    $("span.PRONS").each(function() {
      const audioUrl = $(this).children('.audio_play_button').attr("data-src-mp3");
      insertDownloadLink(audioUrl, $(this));
    });
  }

  // http://www.vietnamesepod101.com/
  else if (url.match(/http[s]?:\/\/*www.vietnamesepod101.com\/vietnamese-dictionary\/*/)) {
    if (!$(".ill-onebuttonplayer").length) {
      return false;
    }
    $(".ill-onebuttonplayer").each(function() {
      const audioUrl = $(this).attr("data-url");
      insertDownloadLink(audioUrl, $(this));
    });
  }

  // http://dict.hjenglish.com/
  else if (url.match(/http[s]?:\/\/*dict.hjenglish.com\/*/)) {
    if (!$(".voice_track").length) {
      return false;
    }
    $(".voice_track").each(function() {
      const audioUrl = $(this).attr("src");
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
        const audioUrl = 'http://www.yueyv.cn/voice/' + target + '.mp3';
        insertDownloadLink(audioUrl, $(this));
      });
    }
    // 例句發音
    if ($("audio[id^=mediacontrol]").length) {
      $("audio[id^=mediacontrol]").each(function() {
        const target = $(this).attr("src");
        const audioUrl = 'http://www.yueyv.cn/' + target;
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
      const audioUrl = $(this).children().filter(function() {
        return $(this).attr('type') === 'audio/mpeg';
      }).attr("src");
      insertDownloadLink(audioUrl, $(this).parent());
    });
  }

  else {
    // console.log("no match");
    return false;
  }
}

function insertDownloadLink(audioUrl, insertAfterDOM) {
  // console.log("audioUrl = " + audioUrl);
  const imageUrl = chrome.extension.getURL('icons/icon_24.png');
  $("<span style='font-size:14px'><a target='_blank' href='" + audioUrl + "'>" + chrome.i18n.getMessage("textDownloadAudio") + "<img src='" + imageUrl + "' alt='Download Audio' height='16' width='16'></a></font>").insertAfter(insertAfterDOM);
}


/*
  `content_script.js` and `background.js` use "Message Passing" to communicate with each other.
  FYI, `background.js` controls `page action`.

  Reference:
    https://developer.chrome.com/extensions/pageAction
    https://developer.chrome.com/extensions/messaging
*/
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting === "onClickedPageActionButton") {
      mainJob(document.URL);
      sendResponse({farewell: "goodbye"});
    }
  });
