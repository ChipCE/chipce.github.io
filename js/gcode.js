var gcode = 
[
    {
        "code" : "comment",
        "description" : "Comment",
        "type" : "comment",
        "parameters" : 
        [
        ]
    },
    {
        "code" : "G0",
        "description" : "Linear non-extrusion movement",
        "type" : "G",
        "parameters" : 
        [
            {
                "name":"X",
                "description":"A coordinate on the X axis",
                "require":false,
                "default":null
            },
            {
                "name":"Y",
                "description":"A coordinate on the Y axis",
                "require":false,
                "default":null
            },
            {
                "name":"Z",
                "description":"A coordinate on the Z axis",
                "require":false,
                "default":null
            },
            {
                "name":"E",
                "description":"The length of filament to feed into the extruder between the start and end point",
                "require":false,
                "default":null
            },
            {
                "name":"F",
                "description":"The maximum movement rate of the move between the start and end point. The feedrate set here applies to subsequent moves that omit this parameter.",
                "require":false,
                "default":null
            },
        ]
    },
    {
        "code" : "G1",
        "description" : "Linear extrusion movement",
        "type" : "G",
        "parameters" : 
        [
            {
                "name":"X",
                "description":"A coordinate on the X axis",
                "require":false,
                "default":null
            },
            {
                "name":"Y",
                "description":"A coordinate on the Y axis",
                "require":false,
                "default":null
            },
            {
                "name":"Z",
                "description":"A coordinate on the Z axis",
                "require":false,
                "default":null
            },
            {
                "name":"E",
                "description":"The length of filament to feed into the extruder between the start and end point",
                "require":false,
                "default":null
            },
            {
                "name":"F",
                "description":"The maximum movement rate of the move between the start and end point. The feedrate set here applies to subsequent moves that omit this parameter.",
                "require":false,
                "default":null
            },
        ]
    },
    {
        "code" : "M0",
        "description" : "m0 desc",
        "type" : "M",
        "parameters" : 
        [
            {
                "name":"X",
                "description":"A coordinate on the X axis",
                "require":false,
                "default":null
            },
            {
                "name":"Y",
                "description":"A coordinate on the Y axis",
                "require":false,
                "default":null
            },
            {
                "name":"Z",
                "description":"A coordinate on the Z axis",
                "require":false,
                "default":null
            },
            {
                "name":"E",
                "description":"The length of filament to feed into the extruder between the start and end point",
                "require":false,
                "default":null
            },
            {
                "name":"F",
                "description":"The maximum movement rate of the move between the start and end point. The feedrate set here applies to subsequent moves that omit this parameter.",
                "require":false,
                "default":null
            },
        ]
    }
]


