console.log("in inkms.js");
var pathname = window.location.pathname;
$(function () {
    console.log("doc ready, pathname=", pathname);
    if (!pathname.startsWith('/media/')) return;
    console.log("media entry");
    var mt= $("#entry-metadata > dd > div > div").text();
    var mh= $("#entry-metadata").html();

    console.log("mt=",mt);
    console.log("mh=",mh);
});