console.log("in inkms.js");
var pathname = window.location.pathname;
$(function () {
    console.log("doc ready, pathname=", pathname);
    if (!pathname.startsWith('/media/')) return;
    console.log("media entry. setting timer");
    window.setInterval(mytimer, 100);
});
var it = 0;
function mytimer() {
    var mt = $("#entry-metadata > dd > div > div").text();
    var mh = $("#entry-metadata").html();
    it += 1;
    console.log("it=", it, " mt=", mt, " mh=", mh);
}