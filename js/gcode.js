var gcode = 
[
    {
        "code" : "G0",
        "shortDescription" : "Linear non-extrusion movement",
        "longDescription" : "The G0 and G1 commands add a linear move to the queue to be performed after all previous moves are completed. These commands yield control back to the command parser as soon as the move is queued, but they may delay the command parser while awaiting a slot in the queue.",
        "type" : "G",
        "parameter" : 
        [
            {
                "name":"X",
                "require":false,
                "default":null,
                "append" : true
            },
            {
                "name":"Y",
                "require":false,
                "default":null,
                "append" : true
            },
            {
                "name":"Z",
                "require":false,
                "default":null,
                "append" : true
            },
            {
                "name":"E",
                "require":false,
                "default":null,
                "append" : true
            },
            {
                "name":"F",
                "require":false,
                "default":null,
                "append" : true
            },
        ]
    },
    {
        "code" : "G1",
        "shortDescription" : "Linear extrusion movement",
        "longDescription" : "The G0 and G1 commands add a linear move to the queue to be performed after all previous moves are completed. These commands yield control back to the command parser as soon as the move is queued, but they may delay the command parser while awaiting a slot in the queue.",
        "type" : "G",
        "parameter" : 
        [
            {
                "name":"X",
                "require":false,
                "default":null,
                "append" : true
            },
            {
                "name":"Y",
                "require":false,
                "default":null,
                "append" : true
            },
            {
                "name":"Z",
                "require":false,
                "default":null,
                "append" : true
            },
            {
                "name":"E",
                "require":false,
                "default":null,
                "append" : true
            },
            {
                "name":"F",
                "require":false,
                "default":null,
                "append" : true
            },
        ]
    },
    {
        "code" : "M0",
        "shortDescription" : "Unconditional stop",
        "longDescription" : "The M0 commands pause after the last movement and wait for the user to continue.",
        "type" : "M",
        "parameter" : 
        [
            {
                "name":"P",
                "require":false,
                "default":null,
                "append" : true
            },
            {
                "name":"S",
                "require":false,
                "default":null,
                "append" : true
            },
            {
                "name":"String",
                "require":false,
                "default":null,
                "append" : false
            }
        ]
    },
    {
        "code" : "T0",
        "shortDescription" : "Select Tool",
        "longDescription" : "Switches to the respective physical/virtual tool head",
        "type" : "T",
        "parameter" : 
        [
        ]
    }
]


