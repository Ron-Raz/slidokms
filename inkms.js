console.log("in inkms.js");
var pathname = window.location.pathname;
$(function () {
    console.log("doc ready, pathname=", pathname);
    if (!pathname.startsWith('/media/')) return;
    console.log("media entry");
    var metadata= $("#entry-metadata > dd > div > div").text();
    console.log("metadata=",metadata);
});