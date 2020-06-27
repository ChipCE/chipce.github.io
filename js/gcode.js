var gcode = 
[
    {
        "code" : "G0",
        "codeDescription" : "Linear non-extrusion movement",
        "parameterDescription" : "[E<pos>] The length of filament to feed into the extruder between the start and end point\n[F<rate>] The maximum movement rate of the move between the start and end point. The feedrate set here applies to subsequent moves that omit this parameter\n[X<pos>] A coordinate on the X axis\n[Y<pos>] A coordinate on the Y axis\n[Z<pos>] A coordinate on the Z axis",
        "url" : "https://marlinfw.org/docs/gcode/G000-G001.html",
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
                "name":"F",
                "require":false,
                "default":null,
                "append" : true
            }
        ]
    },
    {
        "code" : "G1",
        "codeDescription" : "Linear extrusion movement",
        "parameterDescription" : "[E<pos>] The length of filament to feed into the extruder between the start and end point\n[F<rate>] The maximum movement rate of the move between the start and end point. The feedrate set here applies to subsequent moves that omit this parameter\n[X<pos>] A coordinate on the X axis\n[Y<pos>] A coordinate on the Y axis\n[Z<pos>] A coordinate on the Z axis",
        "url" : "https://marlinfw.org/docs/gcode/G000-G001.html",
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
            }
        ]
    },
    {
        "code" : "G2",
        "codeDescription" : "Arc move",
        "parameterDescription" : "G2 adds a clockwise arc move to the planner; G3 adds a counter-clockwise arc. An arc move starts at the current position and ends at the given XYZ, pivoting around a center-point offset given by I and J or R.\nCNC_WORKSPACE_PLANES allows G2/G3 to operate in the selected XY, ZX, or YZ workspace plane.",
        "url" : "https://marlinfw.org/docs/gcode/G002-G003.html",
        "parameter" : 
        [
            {
                "name":"E",
                "require":false,
                "default":null,
                "append" : true
            },
            {
                "name":"I",
                "require":false,
                "default":null,
                "append" : true
            },
            {
                "name":"J",
                "require":false,
                "default":null,
                "append" : true
            },
            {
                "name":"P",
                "require":false,
                "default":null,
                "append" : true
            },
            {
                "name":"R",
                "require":false,
                "default":null,
                "append" : true
            },
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
                "name":"X",
                "require":false,
                "default":null,
                "append" : true
            }

        ]
    }
]


