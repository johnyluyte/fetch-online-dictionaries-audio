// ==UserScript==
// @name            Fetch Audio
// @author          smailzhu
// @updateURL       https://github.com/smailzhu/fetch-online-dictionary-audio/raw/master/fetch-online-dictionary-audio.user.js
// @namespace       https://blog.btn.pw/
// @version         0.1.20190130.2
// @description     Adds links to download audio for serveral on-line dictionaries.
// @icon            https://github.com/smailzhu/fetch-online-dictionaries-audio/blob/master/icons/icon_48.png
// @license         MIT
// @copyright       2015, Chien Chun (http://blog.chunnorris.cc/2015/10/fetch-online-dictionary-audio.html)
// @copyright       2019, smailzhu (https://blog.saz.pw/)
// @match           *://www.oxfordlearnersdictionaries.com/*
// @match           *://dictionary.cambridge.org/*
// @match           *://jisho.org/*
// @match           *://*.moedict.tw/*
// @match           *://*.yueyv.cn/*
// @match           *://yun.dreye.com/*
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
// @grant           none
// ==/UserScript==


(() => {
    this.$ = this.jQuery = jQuery.noConflict(true);
    const url = window.location.href;

    function insertDownloadLink(audioUrl, insertAfterDOM, text = "") {
        // console.log("audioUrl = " + audioUrl);
        let HTML = "<span style='font-size:14px'><a target='_blank' href='" + audioUrl + "'>" + "Download" + text
        HTML += "</a></font>"
        $(HTML).insertAfter(insertAfterDOM);
    }

    // https://www.oxfordlearnersdictionaries.com/
    if (url.includes("oxfordlearnersdictionaries")) {
        if (!$(".audio_play_button").length) {
            return false;
        }
        $(".audio_play_button").each(function () {
            const audioUrl = $(this).attr("data-src-mp3");
            insertDownloadLink(audioUrl, $(this));
        });
    }

    // https://dictionary.cambridge.org/
    else if (url.includes("cambridge.org")){
        if (!$(".sound.audio_play_button").length) {
            return false;
        }
        $(".sound.audio_play_button").each(function () {
            const audioUrl = $(this).attr("data-src-mp3");
            insertDownloadLink(audioUrl, $(this));
        });
    }

    // http://jisho.org/
    else if (url.includes("jisho.org")) {
        if (!$("a.concept_audio").length) {
            return false;
        }
        $("a.concept_audio").each(function () {
            const audioUrl = $(this).prev().children().first().attr("src");
            insertDownloadLink(audioUrl, $(this), " Audio");
        });
    }

    // https://www.moedict.tw/
    else if (url.includes("moedict.tw")){
        if (!$(".icon-play.playAudio").length) {
            return false;
        }
        $(".icon-play.playAudio").each(function () {
            const audioUrl = $(this).children().filter(function () {
                return $(this).attr("itemprop") === "contentURL";
            }).attr("content");
            insertDownloadLink(audioUrl, $(this));
        });
    }

    // http://yun.dreye.com/dict_new/dict.php?w=dog&hidden_codepage=01
    // http://yun.dreye.com/dict_new/dict.php?w=accordance
    else if (url.includes("yun.dreye.com")){
        // 真人發音(男)
        if ($("#real_pron_m").length) {
            $("#real_pron_m").each(function () {
                if (RealSoundPath){
                    insertDownloadLink(RealSoundPath, $(this));
                }
            });
        }
        // 真人發音(女)
        if ($("#real_pron_f").length) {
            $("#real_pron_f").each(function () {
                if (F_RealSoundPath){
                    insertDownloadLink(F_RealSoundPath, $(this));
                }
            });
        }
    }
        
    else{return False;}

})();
