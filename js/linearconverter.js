$(document).ready(function(){
    // set content height 
    let contentHeight = document.body.clientHeight - $("#topNavBar").height() - $("#sticky-footer").height() - $("#calcRow").height();
    $('#srcRow').css('max-height', (contentHeight-100) +"px");


    $(window).resize(function(){
        // set content height 
        let contentHeight = document.body.clientHeight - $("#topNavBar").height() - $("#sticky-footer").height();
        $('#main').css('max-height', (contentHeight-100) +"px");
    });

    $("#lin15val").on("keyup", function(){
        if(!isNaN($("#lin15val").val()) && $("#lin15val").val()!="")
        {
            $("#lin10val").val( 10**((parseFloat($("#lin15val").val())+0.033)/0.043) -22.97 );
        }
        else
        {
            if($("#lin15val").val()=="")
                $("#lin10val").val("?");
            else
                $("#lin10val").val("invalid value");
        }
    });


    $("#lin10val").on("keyup", function(){
        if(!isNaN($("#lin10val").val())  && $("#lin10val").val()!="")
        {
            $("#lin15val").val( Math.log10(parseFloat($("#lin10val").val()) + 22.97)*0.043-0.033  );
        }
        else
        {
            if($("#lin10val").val()=="")
                $("#lin15val").val("?");
            else
                $("#lin15val").val("invalid value");
        }
    });

});