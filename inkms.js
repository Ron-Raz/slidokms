console.log("in inkms.js mike");
var pathname = window.location.pathname;
var mytimerhandle;
var serviceUrl= 'http://rraz.herokuapp.com/'
$(function () {
    console.log("doc ready, pathname=", pathname);
    if (pathname.startsWith('/media/')) {
        console.log("media entry. setting timer");
        mytimerhandle = window.setInterval(mytimer, 100);
    } else if (pathname.startsWith('/edit/')) {
        $( "#customdata-PickQnAModule" ).change(function() {
            //console.log('process qna change');
            // get partnerid
            var pid= window.kms_kWidgetJsLoader_partnerId;
            var tokens= pathname.split('/');
            var entryid= tokens[tokens.length-1];
            var value= $( this ).val();
            //console.log('pid=',pid,' entryid=',entryid,' value=',value);
            $.post( serviceUrl, { 'partnerid': pid, 'entryid': entryid, 'value':value })
                .done(function( data ) {
                    console.log('response=',data);
                });
        });
    }
});
var usingQnaFromSlido = false;
var metadataModdingDone = false;
var curSlidoDets= null;

function onWindowResize() {
    var dets= calcSlidoSize();
    var changes= {};
    if( dets.top != curSlidoDets.top ) changes.top= dets.top+"px";
    if( dets.left != curSlidoDets.left) changes.left= dets.left+"px";
    if( dets.width != curSlidoDets.width) changes.width= dets.width+"px";
    if( dets.height != curSlidoDets.height) changes.height= dets.height+"px";
    if( Object.keys(changes).length > 0) {
        $("#slido").css(changes);
        curSlidoDets= dets;
        console.log("onWindowResize changes=",changes);
    } else {
        console.log("onWindowResize nochanges");
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
