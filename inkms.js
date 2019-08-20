console.log("in inkms.js golf");
var pathname = window.location.pathname;
var mytimerhandle;
$(function () {
    console.log("doc ready, pathname=", pathname);
    if (!pathname.startsWith('/media/')) return;
    console.log("media entry. setting timer");
    mytimerhandle = window.setInterval(mytimer, 100);
});
var usingQnaFromSlido = false;
var metadataModdingDone = false;
var curSlidoDets= null;

function onWindowResize() {
    var dets= calcSlidoSize();
    if( dets === curSlidoDets) {
        // no need to do anything, same size and pos
        console.log("no refresh needed dets === curSlidoDets");
    } else {
        $("#slido").css({"top":dets.top+"px","left":dets.left+"px","width":dets.width+"px","height":dets.height+"px"});
        curSlidoDets= dets;
    }
}



function calcSlidoSize() {
    var json= {};
    var p = $("#mySidebar").position();
    json.top= Math.trunc(p.top);
    json.left= Math.trunc(p.left);
    json.height= Math.trunc($("#mySidebar").height() - 2);
    json.width= Math.trunc($("#mySidebar").width());
    console.log("calcSlidoSize json=",JSON.stringify(json));
    return json;
}

window.addEventListener("resize", onWindowResize);
function mytimer() {
    var fieldPickModule = $("#entry-metadata > dd.metadata__item.textSelect__items > div > a").text().trim();
    // stop conditions: found mt | timeout
    if (fieldPickModule === 'Use Slido' && usingQnaFromSlido === false) {
        var fieldEventCode = $("#entry-metadata > dd:nth-child(4) > div > div").text().trim();
        var fieldEmbedUrl = $("#entry-metadata > dd:nth-child(6) > div > div").text().trim();
        var moddedEventCode = '<a href="' + fieldEmbedUrl + '" target="slidotab" title="Click to open Slido in a new window/tab">' + fieldEventCode + '</a>';
        $("#entry-metadata > dd:nth-child(4) > div > div").html(moddedEventCode);
        console.log("fieldPickModule=", fieldPickModule, " fieldEventCode=", fieldEventCode, " fieldEmbedUrl=", fieldEmbedUrl);
        //clearInterval(mytimerhandle);
        window.setInterval(mytimer, 1000); // change interval to ease up on resources
        usingQnaFromSlido = true;
        embedSlido(fieldEventCode, fieldEmbedUrl);
    }
    if (fieldPickModule.length > 0 && metadataModdingDone === false) {
        // hide  always
        $("#entry-metadata > dt.metadata__label.textSelect__title").hide();
        $("#entry-metadata > dd.metadata__item.textSelect__items").hide()
        $("#entry-metadata > dt:nth-child(5)").hide();
        $("#entry-metadata > dd:nth-child(6)").hide();
        if (fieldPickModule === 'Use Kaltura') {
            // hide slido event code if not using slido
            $("#entry-metadata > dt:nth-child(3)").hide();
            $("#entry-metadata > dd:nth-child(4)").hide();
        }
        metadataModdingDone = true;
    }
    
}

function embedSlido(code, url) {
    console.log("embedSlido");
    curSlidoDets= calcSlidoSize();
    var slidoIframe = '<iframe frameBorder="1" style="border:1px black solid; position:absolute; top:' + curSlidoDets.top + 'px; left:' + curSlidoDets.left + 'px; width:' + curSlidoDets.width + 'px; height:' + curSlidoDets.height + 'px;" class="box" id="slido" src="' + url + '"></iframe>';
    console.log("slidoIframe=", slidoIframe);
    $("#wrap").append(slidoIframe);
}
