console.log("in inkms.js golf");
var pathname = window.location.pathname;
var mytimerhandle;
$(function () {
    console.log("doc ready, pathname=", pathname);
    if (!pathname.startsWith('/media/')) return;
    console.log("media entry. setting timer");
    mytimerhandle = window.setInterval(mytimer, 100);
});
var it = 20;
function mytimer() {
    var mt = $("#entry-metadata > dd > div > div").text();
    it -= 1;
    // stop conditions: found mt | timeout
    if (mt.length > 2 || it === 0) {
        console.log("it=", it, "mt=", mt);
        clearInterval(mytimerhandle);
        if (mt.length > 2) {
            embedSlido();
        }
    }
}

function embedSlido() {
    console.log("embedSlido")
    $("#mySidebar").hide();
    var p = $("#mySidebar").position();
    var slidoIframe= '<iframe frameBorder="0" style="position:absolute; top:'+Math.trunc(p.top)+'px; left:'+Math.trunc(p.left)+'px; width:'+Math.trunc($("#mySidebar").width())+'px; height:'+Math.trunc($("#mySidebar").height()-1)+'px;" class="box" id="slido" src="https://app.sli.do/event/udv57pcy"></iframe>';
    console.log("slidoIframe=",slidoIframe);
    $("#wrap").append(slidoIframe);
    // remove semi circle thingy
    $(".qna-on-video-btn.qna-icon-Ask").remove();
}