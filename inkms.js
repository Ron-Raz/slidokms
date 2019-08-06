console.log("in inkms.js mike");
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

    var qnaDisplay=$(".qna-on-video-btn.qna-icon-Ask").css("display");
    console.log("qnaDisplay=",qnaDisplay);
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
    //$("#wrap").append(slidoIframe);
    // remove semi circle thingy
    var q1=$(".qna-on-video-btn.qna-icon-Ask").css("display");
    var q2=$(".qna-on-video-btn.qna-icon-Ask").is(":visible");
    var q3=$(".qna-on-video-btn").css("display");
    var q4=$(".qna-on-video-btn").is(":visible");
    var q5=$(".qna-on-video-btn .qna-icon-Ask").css("display");
    var q6=$(".qna-on-video-btn .qna-icon-Ask").is(":visible");
    
    console.log("q1=",q1," q2=",q2," q3=",q3," q4=",q4," q5=",q5," q6=",q6);
}