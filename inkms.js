console.log("in inkms.js sierra");
var pathname = window.location.pathname;
var mytimerhandle;
$(function () {
    console.log("doc ready, pathname=", pathname);
    if (!pathname.startsWith('/media/')) return;
    console.log("media entry. setting timer");
    mytimerhandle = window.setInterval(mytimer, 100);
});
var it = 200;
function mytimer() {
    var fieldPickModule = $("#entry-metadata > dd.metadata__item.textSelect__items > div > a").text();
    var fieldEventCode = $("#entry-metadata > dd:nth-child(4) > div > div").text();
    var fieldEmbedUrl = $("#entry-metadata > dd:nth-child(6) > div > div").text();
    it -= 1;
    // stop conditions: found mt | timeout
    if (fieldPickModule.length > 2 || it === 0) {
        console.log("it=", it, "fieldPickModule=", fieldPickModule," fieldEventCode=",fieldEventCode," fieldEmbedUrl=",fieldEmbedUrl);
        clearInterval(mytimerhandle);
        if (fieldPickModule.length > 2) {
            embedSlido();
        }
    }
}

function embedSlido() {

    // $(".qna-on-video-btn").css({
    //     "background-color": "yellowgreen",
    //     "font-weight": "bold"
    // });

    console.log("embedSlido")
    $("#mySidebar").hide();
    var p = $("#mySidebar").position();

    var slidoIframe= '<iframe frameBorder="0" style="position:absolute; top:'+Math.trunc(p.top)+'px; left:'+Math.trunc(p.left)+'px; width:'+Math.trunc($("#mySidebar").width())+'px; height:'+Math.trunc($("#mySidebar").height()-1)+'px;" class="box" id="slido" src="https://app.sli.do/event/udv57pcy"></iframe>';
    console.log("slidoIframe=",slidoIframe);
    $("#wrap").append(slidoIframe);
    // remove semi circle thingy
}