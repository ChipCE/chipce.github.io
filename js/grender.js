function test()
{
    console.log("clicked");
}

$(document).ready(function(){
    // set content height 
    let contentHeight = document.body.clientHeight - $("#topNavBar").height() - $("#sticky-footer").height() - $("#tabNav").height();
    $("#tabNavContent").height(contentHeight);
    //set gcode list height
    let gcodeListHeight = contentHeight -$("#searchGroup").height() -100;
    $('#gcodeList').css('max-height', gcodeListHeight +"px");
    let renderListHeight = contentHeight -85;
    $('#renderList').css('max-height', renderListHeight +"px");


    $(window).resize(function(){
        // set content height 
        let contentHeight = document.body.clientHeight - $("#topNavBar").height() - $("#sticky-footer").height() - $("#tabNav").height();
        $("#tabNavContent").height(contentHeight);
        // set gcode list height
        let gcodeListHeight = contentHeight -$("#searchGroup").height() -100;
        $('#gcodeList').css('max-height', gcodeListHeight +"px");
        let renderListHeight = contentHeight -85;
        $('#renderList').css('max-height', renderListHeight +"px");

    });

    // live search
    $("#search").on("keyup", function(){
        let searchStr = $(this).val();
        if(searchStr != "")
        {
            $("#searchHelp").html('Showing results for : ' + searchStr + '<a class="text-primary float-right" onclick="clearSearch();"><i class="fa fa-times"></i> Clear</a>');
            let gcodeList = $(".gcodeItem");
            $(gcodeList.get()).each(function () {
                if($(this).find(".badge").text().includes(searchStr))
                    $(this).removeClass("d-none");
                else
                    $(this).addClass("d-none");
            });
        }
        else
            clearSearch()
    });

    drawGcodeList();
});


function drawGcodeList()
{
    gcode.forEach(function(entry) {
        //console.log(entry);
        if(entry.type=="comment")
        {
            $("#gcodeList").html($("#gcodeList").html() + '<li class="list-group-item py-2 list-group-item-secondary gcodeItem" onclick="insertHandle(this);"><span class="badge badge-pill badge-secondary">'+ entry.code + '</span> ' + entry.description + '</li>');
        }
        else if(entry.type=="G")
        {
            $("#gcodeList").html($("#gcodeList").html() + '<li class="list-group-item py-2 list-group-item-primary gcodeItem" onclick="insertHandle(this);"><span class="badge badge-pill badge-primary">'+ entry.code + '</span> ' + entry.description + '</li>');
        }
        else if(entry.type=="M")
        {
            $("#gcodeList").html($("#gcodeList").html() + '<li class="list-group-item py-2 list-group-item-info gcodeItem" onclick="insertHandle(this);"><span class="badge badge-pill badge-info">'+ entry.code + '</span> ' + entry.description + '</li>');
        }
    });
}

function getGcodeObject(codeName)
{
    // get selected gcode data
    for(let i = 0;i < gcode.length;i++)
        if(gcode[i].code == codeName)
            return gcode[i];
    return null;

    // draw dialog content

    // show dialog
}

function insertHandle(ele)
{
    let codeName = $(ele).find(".badge").text();
    console.log(codeName);
    console.log(getGcodeObject(codeName));
}

function deleteHandle(ele)
{
    console.log("delete");
    $(ele).closest(".renderItem").remove();
}

function clearSearch()
{
    $("#searchHelp").text("Showing results for : All");
    $("#search").val("");
    //show alll
    $(".gcodeItem").removeClass("d-none");
}