<!DOCTYPE html>
<html>

<head>
    <link href="/static/css/plugins/dagre/tipsy.css" rel="stylesheet">
    <style>
        h1 {
            font-size: 3em;
            font-weight: 300;
        }

        h2 {
            font-size: 1.5em;
            font-weight: 300;
        }

        section {
            margin-bottom: 3em;
        }

        section p {
            text-align: justify;
        }

        svg {
            border: 1px solid #ccc;
            overflow: hidden;
            margin: 0 auto;
        }

        pre {
            border: 1px solid #ccc;
        }
        .clusters rect {
            fill: #00ffd0;
            stroke: #999;
            stroke-width: 1.5px;
        }

        text {
            font-weight: 300;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serf;
            font-size: 14px;
        }

        .node rect {
            stroke: #999;
            fill: #fff;
            stroke-width: 1.5px;
        }

        .edgePath path.path {
            stroke: #333;
            fill: none;
            stroke-width: 1.5px;
        }

        .arrowhead {
            stroke: red;
            fill: red;
            stroke-width: 1.5px;
        }

    </style>
</head>

<body>
<svg id="svg-canvas" height=900 style="width:100%;"></svg>
<script src="/static/js/jquery.2.1.1.min.js"></script>
<script src="/static/js/plugins/dagre/d3.v3.min.js"></script>
<script src="/static/js/plugins/dagre/dagre-d3.min.js"></script>
<script src="/static/js/plugins/dagre/tipsy.js"></script>
<script type="text/javascript">
    var treejson=null;
    var treemap=null;
    var rid = '${rid?if_exists}';
    $.ajax({
        url:"/stateinfo/treejson?rid="+rid,
        async:false,
        success:function (d) {
            treejson = d.obj;
        }

    });
    $.ajax({
        url:"/stateinfo/map?rid="+rid,
        async:false,
        success:function (d) {
            treemap = d.obj;
        }

    });

    var getStateDesc = function(state,isall){
        var desc ="";
        $.each(treemap,function(key,value){
            if(state==key){
                desc = value;
                return false;
            }
        });
        return isall?desc:desc.substring(0,20);
    };

    var createStateLabel = function(state){
        var svg_label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        var tspan = document.createElementNS('http://www.w3.org/2000/svg','tspan');
        tspan.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:space', 'preserve');
        tspan.setAttribute('dy', '1em');
        tspan.setAttribute('x', '1');
        var link = document.createElementNS('http://www.w3.org/2000/svg', 'a');
        link.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'javascript:void(0)');
        link.setAttribute('target', '_blank');
        link.setAttribute('style', 'cursor:default');
        link.textContent = state+":"+getStateDesc(state);
        tspan.appendChild(link);
        svg_label.appendChild(tspan);

        return svg_label;
    };

    // Create the input graph
    var g = new dagreD3.graphlib.Graph({compound:true})
            .setGraph({})
            .setDefaultEdgeLabel(function() { return {}; });

    // Here we're setting the nodes
    var allstates = [];
    var profitstates = [];
    var nprofitstates = [];
    $.each(treemap,function(key,value){
        allstates.push(key);
    });
    $.each(treejson,function(key,value){
        var state = value.state;

        for(var i=0;i<value.state.length;i++){
            if(profitstates.indexOf(state[i])==-1) profitstates.push(state[i]);
            g.setNode(state[i], {label: createStateLabel(state[i]), labelType: 'svg' });
        }
        var event = value.event;
        if(event){
            for(var i=0;i<event.length;i++){
                var arr = event[i].split(',');
                var labelJSON = { label: arr[2] };
                if(arr.length>3){
                    var isMain = arr[3];
                    if(isMain==1){
                        labelJSON.style= "stroke: #f66; stroke-width: 3px; stroke-dasharray: 5, 5;";
                        labelJSON.arrowheadClass='arrowhead';
//                        labelJSON.arrowheadClass= 'arrowhead';
                    }
//                    labelJSON.style = isMain==1?"stroke: #f66; stroke-width: 3px;":"stroke: #fff; stroke-width: 3px;";
                }
                console.log(labelJSON);
                g.setEdge(arr[0], arr[1], labelJSON);
            }

        }

    });

    g.nodes().forEach(function(v) {
        var node = g.node(v);
        // Round the corners of the nodes
        node.rx = node.ry = 5;
    });


    // Create the renderer
    var render = new dagreD3.render();

    // Set up an SVG group so that we can translate the final graph.
    var svg = d3.select("svg"),
            svgGroup = svg.append("g");

    // Run the renderer. This is what draws the final graph.
    render(d3.select("svg g"), g);

    // Center the graph
    var xCenterOffset = ($('svg').width() - g.graph().width) / 2;
    svgGroup.attr("transform", "translate(" + xCenterOffset + ", 20)");
    svg.attr("height", g.graph().height + 40);

    svgGroup.selectAll("g.node")
            .attr("title", function(v) {
                return getStateDesc(v,1);
            }).each(function(v) { $(this).tipsy({ gravity: "w", opacity: 1, html: true }); });
</script>
</body>
</html>
