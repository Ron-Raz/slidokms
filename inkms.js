console.log("in inkms.js ver2");
var pathname = window.location.pathname;
$(function () {
    console.log("doc ready, pathname=", pathname);
    if (!pathname.startsWith('/media/')) return;
    console.log("media entry");
    var metadata= $("#entry-metadata").text();
    console.log("metadata=",metadata);
});