// Making a new JS component
// 1 - Replace componentTemplate with new name ( 8 occurences in this file )
// 2 - All code goes into init()
// 3 - Save file as new name .js
var randomiser = {
    name: 'randomiser',
    componentInitSelector: '.randomiser',
    registerComponent: function() {
        if ($(randomiser.componentInitSelector).length) {
            framework.registerComponent(randomiser);
        }
    },
    initrandomiser: function() {
        // Put your target search here with their options.

    },
    init: function() {
        // All code for this component goes in here
        // NOTE <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script> MuST BE IN HTML
        var padding = {top:20, right:40, bottom:0, left:0},
            w = 500 - padding.left - padding.right,
            h = 500 - padding.top  - padding.bottom,
            r = Math.min(w, h)/2,
            rotation = 0,
            oldrotation = 0,
            picked = 100000,
            oldpick = [],
            color = d3.scale.category20();

        var data = [
            {
                "label": "James Smee",
                "image": "James-Smee",
                "value": 1,
                "question": "James Smee is bar man!"
            },
            {
                "label": "Simon Butler",
                "image": "Simon-Butler",
                "value": 1,
                "question": "Simon Butler is bar man!"
            },
            {
                "label": "Samantha Cottle",
                "image": "Samantha-Cottle",
                "value": 1,
                "question": "Samantha Cottle is bar maiden!"
            },
            {
                "label": "Louise Watt",
                "image": "Louise-Watt",
                "value": 1,
                "question": "Louise Watt is bar maiden!"
            },
            {
                "label": "Joe Tipping",
                "image": "Joe-Tipping",
                "value": 1,
                "question": "Joe Tipping is bar man!"
            },
            {
                "label": "Simon Billington",
                "image": "Simon-Billington",
                "value": 1,
                "question": "Simon Billington is bar lady!"
            },
            {
                "label": "Vanessa Verron",
                "image": "Vanessa-Verron",
                "value": 1,
                "question": "Vanessa Verron is bar maiden!"
            },
            {
                "label": "Bradley Richmond",
                "image": "Bradley-Richmond",
                "value": 1,
                "question": "Bradley Richmond is bar man!"
            },
            {
                "label": "Daniel Roberts",
                "image": "Daniel-Roberts",
                "value": 1,
                "question": "Daniel Roberts is bar man!"
            },
            {
                "label": "Nicolay Hekkens",
                "image": "Nicolay-Hekkens",
                "value": 1,
                "question": "Nicolay Hekkens is bar man!"
            },
            {
                "label": "Matt Gigg",
                "image": "Matt-Gigg",
                "value": 1,
                "question": "Matt Gigg is bar man!"
            },
            {
                "label": "Luke Shires",
                "image": "Luke-Shires",
                "value": 1,
                "question": "Luke Shires is bar man!"
            },
            {
                "label": "Hannah Balogun",
                "image": "Hannah-Balogun",
                "value": 1,
                "question": "Hannah Balogun is bar maiden!"
            },
            {
                "label": "Jason King",
                "image": "Jason-King",
                "value": 1,
                "question": "Jason King is bar man!"
            },
            {
                "label": "Rachel Littler",
                "image": "Rachel-Littler",
                "value": 1,
                "question": "Rachel Littler is bar maiden!"
            },
            {
                "label": "Tom Bourner",
                "image": "Tom-Bourner",
                "value": 1,
                "question": "Tom Bourner is bar man!"
            },
            {
                "label": "SHOTS",
                "image": "SHOTS",
                "value": 1,
                "question": "Everybody has to do a shot. Then Roll again"
            }
        ];


        var svg = d3.select('#chart')
            .append("svg")
            .data([data])
            .attr("width",
                    w + padding.left + padding.right)
            .attr("height", h + padding.top + padding.bottom);
        var container = svg.append("g")
            .attr("class", "chartholder")
            .attr("transform", "translate(" + (w/2 + padding.left) + "," + (h/2 + padding.top) + ")");
        var vis = container
            .append("g");

        var pie = d3.layout.pie().sort(null).value(function(d){return 1;});
        // declare an arc generator function
        var arc = d3.svg.arc().outerRadius(r);
        // select paths, use arc generator to draw
        var arcs = vis.selectAll("g.slice")
            .data(pie)
            .enter()
            .append("g")
            .attr("class", "slice");

        arcs.append("path")
            .attr("fill", function(d, i){ return color(i); })
            .attr("d", function (d) { return arc(d); });
        // add the text
        arcs.append("text").attr("transform", function(d){
                d.innerRadius = 0;
                d.outerRadius = r;
                d.angle = (d.startAngle + d.endAngle)/2;
                return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
            })
            .attr("text-anchor", "end")
            .text( function(d, i) {
                return data[i].label;
            });
        container.on("click", spin);
        function spin(d){
            //all slices have been seen, all done
            if(oldpick.length == data.length){
                console.log("done");
                container.on("click", null);
                return;
            }
            var  ps       = 360/data.length,
                 pieslice = Math.round(1440/data.length),
                 rng      = Math.floor((Math.random() * 1440) + 360);

            rotation = (Math.round(rng / ps) * ps);

            picked = Math.round(data.length - (rotation % 360)/ps);
            picked = picked >= data.length ? (picked % data.length) : picked;
            if(oldpick.indexOf(picked) !== -1){
                d3.select(this).call(spin);
                return;
            } else {
                oldpick.push(picked);
            }
            rotation += 90 - Math.round(ps/2);
            vis.transition()
                .duration(3000)
                .attrTween("transform", rotTween)
                .each("end", function(){
                    //mark question as seen
                    d3.select(".slice:nth-child(" + (picked + 1) + ") path")
                        .attr("fill", "#111");
                    //populate question
                    d3.select("#question h1")
                        .text(data[picked].question);
                    d3.select("#question img")
                        .attr('src', '/Assets/components/randomiser/' + data[picked].image + '.jpg');
                    d3.select("#question img")
                        .attr('alt', '' + data[picked].label + '');
                    oldrotation = rotation;
                });
        }
        //make arrow
        svg.append("g")
            .attr("transform", "translate(" + (w + padding.left + padding.right) + "," + ((h/2)+padding.top) + ")")
            .append("path")
            .attr("d", "M-" + (r*0.15) + ",0L0," + (r*0.05) + "L0,-" + (r*0.05) + "Z")
            .style({"fill":"black"});
        //draw spin circle
        container.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 60)
            .style({"fill":"white","cursor":"pointer"});
        //spin text
        container.append("text")
            .attr("x", 0)
            .attr("y", 15)
            .attr("text-anchor", "middle")
            .text("SPIN")
            .style({"font-weight":"bold", "font-size":"30px"});

        function rotTween(to) {
          var i = d3.interpolate(oldrotation % 360, rotation);
          return function(t) {
            return "rotate(" + i(t) + ")";
          };
        }

        function getRandomNumbers(){
            var array = new Uint16Array(1000);
            var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);
            if(window.hasOwnProperty("crypto") && typeof window.crypto.getRandomValues === "function"){
                window.crypto.getRandomValues(array);
                console.log("works");
            } else {
                //no support for crypto, get crappy random numbers
                for(var i=0; i < 1000; i++){
                    array[i] = Math.floor(Math.random() * 100000) + 1;
                }
            }
            return array;
        }

        // End
        randomiser.initrandomiser();
        log(config.application.name + " •• randomiser in " + Math.round( performance.now() - framework.initComponents.componentInitTime) + " milliseconds" );
    }
}

// Register self to the framework
randomiser.registerComponent();
