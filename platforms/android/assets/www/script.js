// Phonegap Functions
var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};





// Main Functions
// localStorage IP Storage
if(localStorage.getItem("ipAddress") == null) {
    localStorage.setItem("ipAddress","http://192.168.1.134/miato-brick/Server-APIs/");
}
var ip = localStorage.getItem("ipAddress");
$("#ipText").val(ip);
$("#ipText").on("input",function(){
    ip = $("#ipText").val();
    localStorage.setItem("ipAddress",ip);
});


$("#tasks").html("loading...");
$.getJSON(ip+"print2.php").done(function(data){
    arraylen = data.length;
    $("#tasks").html("");
    for(var i=0;i<arraylen;i++){
        if(data[i] == 0){
            $("#tasks").append("<li class='task disabled'>"+(i+1)+"</li>");
        } else {
            $("#tasks").append("<li class='task enabled'>"+(i+1)+"</li>");
        }
    }
    $(".task").click(function(){
        if($(this).hasClass("enabled")) {
            $(this).removeClass("enabled");
            $(this).addClass("disabled");
            changeState($(this).text(),false);
        } else {
            $(this).removeClass("disabled");
            $(this).addClass("enabled");
            changeState($(this).text(),true);
        }
    });
});
function changeState(moduleID, state){
    if(state){
        $.get(ip+"set.php?task="+moduleID+"&state=1");
    } else {
        $.get(ip+"set.php?task="+moduleID+"&state=0");
    }
}