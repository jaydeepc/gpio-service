$(document).ready(function() {
    $(".switch-off").on('click', function(){
        $.ajax({
            type: "GET",
            dataType: 'text',
            url: "http://192.168.0.101:3001/off/18"
        })
    });
    $(".switch-on").on('click', function(){
        $.ajax({
            type: "GET",
            dataType: 'text',
            url: "http://192.168.0.101:3001/on/18"
        })
    });

});