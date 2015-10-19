/*
  If we use jQuery here, we should include jQuery in the "content_scripts" field in manifest.json.

  Reference:
    https://developer.chrome.com/extensions/overview
    https://developer.chrome.com/extensions/content_scripts
*/

$(function(){
  isValid(document.URL);
});

// window.onload = function(){
//   isValidURL(document.URL);
// }

function isValid(url){
  /*
    1. [REGEX in javascript]
      We do not need double quote "" here, because the function match(reg) requires RGEEX in its argument, and string confounded by double forward slash /MY_REG/ is the RGEEX in javascript

    2. [i18n in Chrome Extension]
      https://developer.chrome.com/extensions/i18n
  */

  // https://tw.dictionary.yahoo.com/dictionary?p=wall
  if(url.match(/http[s]?:\/\/*tw.dictionary.yahoo.com\/*/)){
    if(!$("audio source").length){
      return false;
    }
    audio_url = $("audio source").attr("src");
    insert_download_link(audio_url, '.button-audio');
  }

  // http://www.oxfordlearnersdictionaries.com/definition/english/wall_1?q=wall
  else if(url.match(/http:\/\/*www.oxfordlearnersdictionaries.com\/*/)){
    if(!$(".audio_play_button").length){
      return false;
    }
    $(".audio_play_button").each(function( index ) {
      audio_url = $( this ).attr("data-src-mp3");
      insert_download_link(audio_url, $(this));
    });
  }

  else{
    return false;
  }
}

function insert_download_link(audio_url, insert_after){
  img_url = chrome.extension.getURL('icons/icon_24.png');
  $("<a target='_blank' href='" + audio_url + "'>" + chrome.i18n.getMessage("textDownloadAudio") + "<img src='" + img_url + "' alt='Download Audio' height='16' width='16'></a>").insertAfter(insert_after);
}
