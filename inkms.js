console.log("in inkms.js alpha");
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
    var iframe= document.getElementById("slido");
    if (iframe){
        var app= iframe.contentWindow.document.getElementById("app");
        if( el) {
            console.log('app=',app);
        }
    }
}

function embedSlido(code, url) {

    // $(".qna-on-video-btn").css({
    //     "background-color": "yellowgreen",
    //     "font-weight": "bold"
    // });

    console.log("embedSlido");
    var p = $("#mySidebar").position();
    var slidoIframe = '<iframe frameBorder="1" style="border:1px black solid; position:absolute; top:' + Math.trunc(p.top) + 'px; left:' + Math.trunc(p.left) + 'px; width:' + Math.trunc($("#mySidebar").width()) + 'px; height:' + Math.trunc($("#mySidebar").height() - 2) + 'px;" class="box" id="slido" src="' + url + '"></iframe>';
    console.log("slidoIframe=", slidoIframe);
    $("#wrap").append(slidoIframe);

    // remove semi circle thingy
}

// var myConfObj = {
//     iframeMouseOver : false
//   }
//   window.addEventListener('blur',function(){
//     if(myConfObj.iframeMouseOver){
//       console.log('Wow! Iframe Click!');
//     }
//   });

//   document.getElementById('YOUR_CONTAINER_ID').addEventListener('mouseover',function(){
//      myConfObj.iframeMouseOver = true;
//   });
//   document.getElementById('YOUR_CONTAINER_ID').addEventListener('mouseout',function(){
//       myConfObj.iframeMouseOver = false;
//   });
