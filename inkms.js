console.log("in inkms.js echo");
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
    var slidoIframe= '<iframe style="position:absolute; top:'+p.top+'px; left:'+String(p.left)+'px; width:'+String($("#mySidebar").width())+'px; height:'+String($("#mySidebar").height())+'px;" class="box" id="slido" src="https://app.sli.do/event/udv57pcy"></iframe>';
    console.log("slidoIframe=",slidoIframe);
    $("#wrap").append();
}