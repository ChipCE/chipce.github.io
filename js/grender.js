function test()
{
    console.log("clicked");
}

var currentIndex = -1;
var gcodeList = [];

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
        liveSearch($(this).val());
    });

    drawGcodeList();
});

function liveSearch(searchStr)
{
    if(searchStr != "")
    {
        $("#searchHelp").html('Showing results for : ' + searchStr + '<a class="text-primary float-right" onclick="liveSearch(\'\');"><i class="fa fa-times"></i> Clear</a>');
        let gcodeList = $(".gcodeItem");
        $(gcodeList.get()).each(function () {
            if($(this).text().toLowerCase().includes(searchStr.toLowerCase()))
                $(this).removeClass("d-none");
            else
                $(this).addClass("d-none");
        });
    }
    else
    {
        $("#searchHelp").text("Showing results for : All");
        $("#search").val("");
        //show alll
        $(".gcodeItem").removeClass("d-none");
    }
}

function drawGcodeList()
{
    gcode.forEach(function(entry) {
        //console.log(entry);
        if(entry.type=="G")
        {
            $("#gcodeList").html($("#gcodeList").html() + '<li class="list-group-item py-2 list-group-item-primary gcodeItem" onclick="insertHandle(this);"><span class="badge badge-pill badge-primary">'+ entry.code + '</span> ' + entry.shortDescription + '</li>');
        }
        else if(entry.type=="M")
        {
            $("#gcodeList").html($("#gcodeList").html() + '<li class="list-group-item py-2 list-group-item-info gcodeItem" onclick="insertHandle(this);"><span class="badge badge-pill badge-info">'+ entry.code + '</span> ' + entry.shortDescription + '</li>');
        }
        else if(entry.type=="T")
        {
            $("#gcodeList").html($("#gcodeList").html() + '<li class="list-group-item py-2 list-group-item-success gcodeItem" onclick="insertHandle(this);"><span class="badge badge-pill badge-success">'+ entry.code + '</span> ' + entry.shortDescription + '</li>');
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
}

function insertHandle(ele)
{
    let codeName = $(ele).find(".badge").text();
    setOptionTemplate(codeName,currentIndex+1);
    $("#optionModal").modal('show');
}

function setOptionTemplate(codeName,lineTarget)
{
    

    // search for gcode data
    let gcodeObj = getGcodeObject(codeName);
    // set dialog data
    $("#optionModalTitle").text(gcodeObj.code);
    
    $("#optionModalDescription").html('<p class="text-muted"><i class="fa fa-info-circle"></i> ' + gcodeObj.longDescription + '</p>');
    let configStr="";
    for(let i = 0;i<gcodeObj.parameter.length;i++)
    {
        configStr = configStr + '<div class="col-3 optionParameter" append="' + gcodeObj.parameter[i].append  + '"><label class="text-info"><i class="fa fa-pencil-square-o"></i> ' + gcodeObj.parameter[i].name + '</label><input type="text" class="form-control" placeholder="' + (gcodeObj.parameter[i].default!=null?gcodeObj.parameter[i].default:"") + '" name="' + gcodeObj.parameter[i].name +'" value="' + getUserParamVal(lineTarget,gcodeObj.parameter[i].name) + '"></div>';
    }
    //append inline comment
    configStr = configStr + '<div class="col-12"><label class="text-success"><i class="fa fa-pencil"></i> comment</label><input type="text" class="form-control" placeholder="Inline comment" name="inlineComment" id="optionInlineComment" onClick="clearDefaultComment(this,\'' + gcodeObj.shortDescription.toString() + '\');" value="' + (getUserParamVal(lineTarget,"comment")!=""?getUserParamVal(lineTarget,"comment"):gcodeObj.shortDescription) +'"></div>';

    $("#optionModalParameter").html(configStr);
    $('#optionModalParameter').attr('targetLine', lineTarget.toString());
}

function deleteHandle(ele)
{
    //console.log("delete");
    $(ele).closest(".renderItem").remove();
}


function editHandle(ele)
{
    let targetLine = $(ele).closest(".renderItem").attr("line");
    //console.log(targetLine);
    let rawCode = $(ele).closest(".renderItem").find(".badge").text();
    //console.log(rawCode);
    let comment = $(ele).closest(".renderItem").find("code").text().trim().substr(1);
    //console.log(comment);
    let codeName = rawCode.split(" ")[0];
    //console.log(codeName);

    console.log({"line":targetLine,"rawCode":rawCode,"codeName":codeName,"comment":comment})

    setOptionTemplate(codeName,targetLine);
    $("#optionModal").modal('show');
}

function getUserParamVal(index,param)
{
    if(index > gcodeList.length -1)
        return "";
    
    if(param == "comment")
        return gcodeList[index].comment;
    
    for(let i = 0;i<gcodeList[index].parameter.length;i++)
        if(gcodeList[index].parameter[i].name == param)
            return gcodeList[index].parameter[i].value;
    
    return "";
}

function applyGcode(ele)
{
    $("#optionModal").modal('hide');

    let gcodeObj = {
        "name":"",
        "parameter":[],
        "comment":""
    };
    // 


    let targetLine = $("#optionModalParameter").attr("targetLine");
    let codeName = $("#optionModalTitle").text();
    let gcodeParam = "";
    let gcodeComment = "";

    gcodeObj.name = codeName;
    gcodeObj.parameter = [];

    let configObj = $(".optionParameter");
    $(configObj.get()).each(function () {
        let name = $(this).find("input").attr('name');
        let val = $(this).find("input").val();
        let append = $(this).attr("append");

        gcodeObj.parameter.push({"name":name,"value":val});

        //console.log($(this).attr("append"));
        if(val!="")
            gcodeParam = gcodeParam + " " + (append=="true"?name+val:val);
    });
    

    //append inline comment
    gcodeComment =  " ;" + $("#optionInlineComment").val();
    gcodeObj.comment = $("#optionInlineComment").val();
    

    if(targetLine>currentIndex)
    {
        $("#renderList").html($("#renderList").html() + getRenderString(codeName,gcodeParam,gcodeComment,targetLine));
        currentIndex = currentIndex + 1;
        //scroll
        $("#renderList").animate({ scrollTop: $('#renderList').prop("scrollHeight")}, 500);

        gcodeList.push(gcodeObj);
    }
    else
    {
        //edit
        $('.renderItem[line="' + targetLine+ '"]').html(getSubRenderString(codeName,gcodeParam,gcodeComment));
        gcodeList[targetLine] = gcodeObj;
    }
}

function getSubRenderString(name,param,comment)
{
    let colorClass = "";
    if(name[0] == "T")
        colorClass="success";
    else if(name[0] == "G")
        colorClass="primary";
    else if(name[0] == "M")
        colorClass="info";

    return '<span class="codeBadge badge badge-pill badge-' + colorClass + '" onclick="editHandle(this);">' + name + param + '</span><code class="codeComment text-dark comment" onclick="editHandle(this);">' + comment + '</code><a class="float-right" onclick="deleteHandle(this);"><i class="fa fa-times float-right"></i></a>';
}

function clearDefaultComment(ele,defaultVal){
    if($(ele).val() == defaultVal)
        $(ele).val("");
}

function getRenderString(name,param,comment,line)
{
    let colorClass = "";
    if(name[0] == "T")
        colorClass="success";
    else if(name[0] == "G")
        colorClass="primary";
    else if(name[0] == "M")
        colorClass="info";

    return '<li class="list-group-item py-2 list-group-item-' + colorClass + ' renderItem" line="' + line +'"><span class="codeBadge badge badge-pill badge-' + colorClass + '" onclick="editHandle(this);">' + name + param + '</span><code class="codeComment text-dark comment" onclick="editHandle(this);">' + comment + '</code><a class="float-right" onclick="deleteHandle(this);"><i class="fa fa-times float-right"></i></a></li>';
}

function clearDefaultComment(ele,defaultVal){
    if($(ele).val() == defaultVal)
        $(ele).val("");
}