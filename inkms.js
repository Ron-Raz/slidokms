console.log("in inkms.js ver2");
var pathname= window.location.pathname;
if( pathname.startsWith('/media/')) { // check if a media entry
    console.log("media entry");
} else {
    console.log("do nothing")
}
