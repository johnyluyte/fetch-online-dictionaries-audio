// Show upported site lists
var lists = chrome.i18n.getMessage("textSupportedSitesLists").split(",");
var show = "<p>" + chrome.i18n.getMessage("textSupportedSites") + "</p>";
show += "<ul>";
var len = lists.length;
for(var i=0; i<len; i++){
    if(lists[i]==""){continue;};
    show += "<li><a target='_blank' href='" + lists[i] + "'>" + lists[i] + "</li>";
}
show += "</ul>";
show += "<hr>";
$("#div_site_lists").append(show);


// Suggestions, issues
var issues = "<p>" + chrome.i18n.getMessage("textIssues");
issues += "<a target='_blank' href='https://github.com/johnyluyte/fetch-online-dictionaries-audio/issues'> Github </a>";
issues += "</p>";
$("#div_issues").append(issues);


// Source codes
var code = chrome.i18n.getMessage("textSourceCode");
code += "</br>";
code += "<a target='_blank' href='https://github.com/johnyluyte/fetch-online-dictionaries-audio'>https://github.com/johnyluyte/fetch-online-dictionaries-audio</a>";
$("#div_source_code").append(code);
