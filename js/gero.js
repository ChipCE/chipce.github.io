

function configLevlelHandle()
{
    if ($("#configLevel").val() == "main")
    {
        $("#sub").addClass("d-none");
        $("#main").removeClass("d-none");
        $("#mainConfigType").val("select").change();
    }
    else
    {
        $("#main").addClass("d-none");
        $("#sub").removeClass("d-none");
        $("#subConfigType").val("select").change();
    }
}

function configTypeHandle(ele)
{
    if($(ele).val() == "text" || $(ele).val() == "number")
    {
        $(".configRequire").removeClass("d-none");
        $(".configDefault").removeClass("d-none");
        $(".configArg").addClass("d-none");
        $(".configIdAppend").addClass("d-none");
        $(".configForceMacro").removeClass("d-none");
    }
    else if($(ele).val() == "select")
    {
        $(".configRequire").addClass("d-none");
        $(".configDefault").addClass("d-none");
        $(".configArg").removeClass("d-none");
        $(".configIdAppend").removeClass("d-none");
        $(".configForceMacro").addClass("d-none");
    }
    else
    {
        $(".configRequire").addClass("d-none");
        $(".configDefault").removeClass("d-none");
        $(".configArg").addClass("d-none");
        $(".configIdAppend").addClass("d-none");
        $(".configForceMacro").addClass("d-none");
    }
}

function make()
{
    //$("#source").text("yolo");
    let level = $("#configLevel").val();
    

    console.log(level);
    if(level == "main")
    {
        let type = $("#mainConfigType").val();
        console.log(type);
        let name = $("#mainConfigName").val();
        console.log(name);
        let diplayName = $("#mainConfigDisplay").val();;
        console.log(diplayName);
        let description = $("#mainConfigDecsription").val();
        console.log(description);

        if(type=="number" || type=="text")
        {
            let require = $("#mainNotNull").val();
            console.log(require);
            let value = $("#mainDefaultValue").val();
            console.log(value);
            let macro = $("#mainForceMacro").val();

            configStr = '<!-- @' + name + ' --><div class="config-option-warpper col-12"><label for="' + name + '" class="text-primary"><i class="fa fa-chevron-down"></i> ' + diplayName + '</label><input type="' + type + '" class="form-control config-option" id="' + name + '" placeholder="" name="' + name + '" ' + ' autocomplete="off" value="' + value + '"' + ((require == "true")?' required="true"':'') + ' forceMacro="'+ macro + '"><p class="text-muted"><i class="fa fa-info-circle"></i> ' + description + '</p></div>';
            $("#source").text(configStr);
        }
        else if(type=="checkbox")
        {
            let value = $("#mainDefaultValue").val();
            console.log(value);
            let configStr = '<!-- @' + name + ' --><div class="config-option-warpper col-12"><input class="form-check-input config-option" type="checkbox" value="" id="' + name + '" name="' + name + '" autocomplete="off"' + ((value=="true")?' checked="checked"':'') +'><label class="form-check-label text-primary" for="' + name + '">' + diplayName + '</label><p class="text-muted"><i class="fa fa-info-circle"></i> ' + description + '</p></div>';
            $("#source").text(configStr);
        }
        else if(type=="select")
        {
            let appendId = $("#mainAppendId").val();
            let arg = $("#mainConfigArg").val();
            let argList=arg.split(",");
            console.log(argList);
            let configStr='<!-- @' + name + ' --><div class="config-option-warpper col-12"><label for="' + name + '" class="text-primary"><i class="fa fa-chevron-down"></i> ' + diplayName + '</label><select class="custom-select config-option" name="' + name + '" autocomplete="off" id="' + name + '" appendId="' + appendId + '">';
            for(let i = 0;i<argList.length;i++)
            {
                
                configStr = configStr + '<option value="' + argList[i] + '"' + ((i==0)?' selected="selected"':'') +'>' + argList[i] +'</option>';
            }
            configStr = configStr + '</select><p class="text-muted"><i class="fa fa-info-circle"></i> ' + description + '</p></div>';
            $("#source").text(configStr);
        }
    }
    else
    {
        let type = $("#subConfigType").val();
        console.log(type);
        let name = $("#subConfigName").val();
        console.log(name);
        let diplayName = $("#subConfigDisplay").val();;
        console.log(diplayName);
        let description = $("#subConfigDecsription").val();
        console.log(description);

        let targetConfig = $("#targetConfig").val();
        console.log(targetConfig);
        let targetValue = $("#targetValue").val();
        console.log(targetValue);

        if(type=="number" || type=="text")
        {
            let macro = $("#mainForceMacro").val();
            let require = $("#subNotNull").val();
            console.log(require);
            let value = $("#subDefaultValue").val();
            console.log(value);

            configStr = '<!-- @' + name + ' --><div class="config-option-warpper-sub col-12 d-none" parent="' + targetConfig + '" targetValue="' + targetValue + '"><label for="' + name + '" class="text-primary"><i class="fa fa-chevron-down"></i> ' + diplayName + '</label><input type="' + type + '" class="form-control config-option-sub" id="' + name + '" placeholder="" name="' + name + '" ' + ' autocomplete="off" value="' + value + '"' + ((require == "true")?' required="true"':'') + ' forceMacro="' + macro +'"><p class="text-muted"><i class="fa fa-info-circle"></i> ' + description + '</p></div>';
            $("#source").text(configStr);
        }
        else if(type=="checkbox")
        {
            let value = $("#subDefaultValue").val();
            console.log(value);
            let configStr = '<!-- @' + name + ' --><div class="config-option-warpper-sub col-12 d-none" parent="' + targetConfig + '" targetValue="' + targetValue + '"><input class="form-check-input config-option-sub" type="checkbox" value="" id="' + name + '" name="' + name + '" autocomplete="off"' + ((value=="true")?' checked="checked"':'') +'><label class="form-check-label text-primary" for="' + name + '">' + diplayName + '</label><p class="text-muted"><i class="fa fa-info-circle"></i> ' + description + '</p></div>';
            $("#source").text(configStr);
        }
        else if(type=="select")
        {
            let appendId = $("#subAppendId").val();
            let arg = $("#subConfigArg").val();
            let argList=arg.split(",");
            console.log(argList);

            let configStr='<!-- @' + name + ' --><div class="config-option-warpper-sub col-12 d-none" parent="' + targetConfig + '" targetValue="' + targetValue + '"><label for="' + name + '" class="text-primary"><i class="fa fa-chevron-down"></i> ' + diplayName + '</label><select class="custom-select config-option-sub" name="' + name + '" autocomplete="off" id="' + name + '" appendId="'+ appendId +'">\n';
            for(let i = 0;i<argList.length;i++)
            {
                
                configStr = configStr + '<option value="' + argList[i] + '"' + ((i==0)?' selected="selected"':'') +'>' + argList[i] +'</option>\n';
            }
            configStr = configStr + '</select><p class="text-muted"><i class="fa fa-info-circle"></i> ' + description + '</p></div>';
            $("#source").text(configStr);
        }
    }
}