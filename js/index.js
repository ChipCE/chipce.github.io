// Onload
$( document ).ready(function() {
    $( ".config-option" ).change(function(event) {
        // select
        if($( event.delegateTarget ).prop("type") == "select-one")
        {
            let targetValue = $( event.delegateTarget ).val();
            console.log("search for " + targetValue)
            // first, hide all sub option
            $('.config-option-warpper-sub[parent="' + $( event.delegateTarget ).prop('id') + '"]').addClass("d-none");
            // then show the matched target only
            // $('.config-option-warpper-sub[parent="' + $( event.delegateTarget ).prop('id') + '"][targetValue="' + targetValue + '"]').removeClass("d-none");
            let subConfigList = $('.config-option-warpper-sub[parent="' + $( event.delegateTarget ).prop('id') + '"]');
            $(subConfigList.get()).each(function () {
                if(matchedTargetValue(targetValue,$(this).attr('targetValue')))
                    $(this).removeClass("d-none");
            });

        }
        //check box
        else if($( event.delegateTarget ).prop("type") == "checkbox")
        {
            let targetValue = $( event.delegateTarget ).prop('checked');
            $('.config-option-warpper-sub[parent="' + $( event.delegateTarget ).prop('id') + '"]').addClass("d-none");
            $('.config-option-warpper-sub[parent="' + $( event.delegateTarget ).prop('id') + '"][targetValue="' + targetValue + '"]').removeClass("d-none");
        }
    });

    reloadTarget();
   
});

function onProgressButtonClicked(ele)
{
    let selectedStep = $(ele).attr( 'step' );

    $(".bs-wizard-step").addClass("disabled");
    $(".bs-wizard-step").removeClass("active");
    $(".bs-wizard-step").removeClass("complete");

    $(".configStep").addClass("d-none");
    $("#config-step-" + selectedStep).removeClass("d-none");


    $(ele).removeClass("disabled");
    $(ele).addClass("complete");

    if(selectedStep == 7)
        generateConfig();
}

function switchToStep(step)
{
    $(".bs-wizard-step").addClass("disabled");
    $(".bs-wizard-step").removeClass("active");
    $(".bs-wizard-step").removeClass("complete");

    // show config  step gropup
    $(".configStep").addClass("d-none");
    $("#config-step-" + step).removeClass("d-none");
    
    // set current step progress to active
    $("#progress-bar-" + step).removeClass("disabled");
    $("#progress-bar-" + step).addClass("complete");

    if(step == 7)
        generateConfig();
}


function prevButtonHandle(ele){
    let currentStep = $(ele).closest('.configStep').attr("step");
    if (currentStep > 1)
        switchToStep(parseInt(currentStep)-1);
}

function nextButtonHandle(ele)
{
    let currentStep = $(ele).closest('.configStep').attr("step");
    if (currentStep < 7)
        switchToStep(parseInt(currentStep)+1);
}

function generateConfig()
{
    getConfigStr();
    return false;
}

function matchedTargetValue(targetValue,targetValueList)
{
    return targetValueList.split(",").includes(targetValue);
}

function getSubConfigArg(parentId,targetValue)
{
    let subConfigStr = "";
    // console.log("sub");
    // subConfigList = $('.config-option-warpper-sub[parent="' + parentId + '"][targetValue="' + targetValue + '"]').find(".config-option-sub");
    subConfigList = $('.config-option-warpper-sub[parent="' + parentId + '"]');
    console.log(subConfigList);
    $(subConfigList.get()).each(function () {
        console.log($(this).attr('targetValue'));
        if(matchedTargetValue(targetValue,$(this).attr('targetValue')))
        {
            let subConfig = $(this).find(".config-option-sub");
            if (subConfig.prop('type') == "select-one")
            {
                subConfigStr = subConfigStr + "#define " + $(subConfig).val() + "\n";
            }
            else if ($(subConfig).prop('type') == "checkbox")
            {
                if ($(subConfig).prop('checked'))
                {
                    subConfigStr = subConfigStr + "#define " + $(subConfig).prop("id") + "\n";
                }
            }
            else if ($(subConfig).prop('type') == "text" || $(subConfig).prop('type') == "number")
            {
                if ( $(subConfig).val() != "")
                {
                    subConfigStr = subConfigStr + "#define " + $(subConfig).prop("id") + " " + $(subConfig).val() + "\n";
                }
            }
        }
    });
    // console.log(subConfigStr);
    return subConfigStr;

}

function submitButtonHandle()
{
    console.log(getConfigStr());
}

function getConfigStr()
{
    let configStr = "";
    let wrapperList = $(".config-option");
    $(wrapperList.get()).each(function () {
        if ($(this).prop('type') == "select-one")
        {
            configStr = configStr + "#define " + $(this).val() + "\n";

            // also search for its sub 
            let subConfigStr = getSubConfigArg($(this).prop("id"),$(this).val());
            if(subConfigStr != "")
            configStr = configStr + subConfigStr;
        }
        else if ($(this).prop('type') == "checkbox")
        {
            if ($(this).prop('checked'))
            {
                configStr = configStr + "#define " + $(this).prop("id") + "\n";
                // also search for its sub 
                let subConfigStr = getSubConfigArg($(this).prop("id"),"true");
                if(subConfigStr != "")
                    configStr = configStr + subConfigStr;
            }
        }
        else if ($(this).prop('type') == "text" || $(this).prop('type') == "number")
        {
            if ( $(this).val() != "")
            {
                configStr = configStr + "#define " + $(this).prop("id") + " " + $(this).val() + "\n";
            }
            // no sub config support for this form type
        }
    });

    console.log(configStr);
    return configStr;
}

function checkInputError()
{
    return false;
}

function applyCompatibilityLayer()
{
    return false;
}

//show sub menu based on default target
function reloadTarget()
{
    let configStr = "";
    let wrapperList = $(".config-option");
    $(wrapperList.get()).each(function () {
        if ($(this).prop('type') == "select-one")
            $(this).val($(this).val()).change();
        else if ($(this).prop('type') == "checkbox")
        {
            if ($(this).prop('checked'))
            {
                $(this).attr('checked', 'checked').change();
            }
        }
    });
}