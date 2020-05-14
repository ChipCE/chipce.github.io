// Onload
$( document ).ready(function() {
   
});

function onProgressButtonClicked(ele)
{
    let selectedStep = $(ele).attr( 'step' );

    $(".bs-wizard-step").addClass("disabled");
    $(".bs-wizard-step").removeClass("active");
    $(".bs-wizard-step").removeClass("complete");

    $(".configStep").addClass("d-none");
    $("#configStep-" + selectedStep).removeClass("d-none");
    
    // let selectedStep = $(ele).attr( 'step' );
    // // set lower step to completed
    // for (let i = 0 ;i <selectedStep;i++)
    // {
    //     $("#step"+i+"-progress").removeClass("disabled");
    //     $("#step"+i+"-progress").removeClass("active");
    //     $("#step"+i+"-progress").addClass("complete");
    // }
    // set current step to active
    $(ele).removeClass("disabled");
    $(ele).addClass("complete");

    if(selectedStep == 6)
        generateConfig();
}

function switchToStep(step)
{
    $(".bs-wizard-step").addClass("disabled");
    $(".bs-wizard-step").removeClass("active");
    $(".bs-wizard-step").removeClass("complete");

    $(".configStep").addClass("d-none");
    $("#configStep-" + step).removeClass("d-none");
    
    // set current step to active step2-progress
    $("#step" + step + "-progress").removeClass("disabled");
    $("#step" + step + "-progress").addClass("complete");

    if(step == 6)
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
    if (currentStep <6 )
        switchToStep(parseInt(currentStep)+1);
}

function generateConfig()
{
    let configStr = "...<Some other headers here>...";
    configStr = configStr + "#define " + $( "#printerType option:selected" ).text() + "\n";
    configStr = configStr + "#define " + $( "#abl-type option:selected" ).text() + "\n";
    configStr = configStr + "#define " + $( "#filament-sensor-type option:selected" ).text() + "\n";
    if ($("#MOUNTED_FILAMENT_SENSOR").is(':checked'))
        configStr = configStr + "#define MOUNTED_FILAMENT_SENSOR\n"

    // set
    $("#configuration_h").val(configStr);
}