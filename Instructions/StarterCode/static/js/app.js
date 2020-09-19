//creating function to build the different plots
function plot(id){
    d3.json("sampledata/samples.json").then((data) => {
        
        //filter top 10 OTUs
        var samples = data.samples.filter(s => s.id.toString()=== id)[0];
        var sampleValues = samples.sample_values.slice(0, 10).reverse();
        var topTen = (samples.otu_ids.slice(0,10)).reverse();
        var topTen_id = topTen.map(d => "OTU " + d)
        var l = samples.otu_labels.slice(0,10);
        
        //code to create bar chart layout
        var bar = {
            x: sampleValues,
            y: topTen_id,
            text: l,
            marker: {color: 'rgb(100, 195, 136)'},
            type: "bar",
            orientation: "h",
        };
        var data_bar = [bar];
        var structure_bar = {
            title: "Top 10 OTUs",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };
        //actually generating the image
        Plotly.newPlot("bar", data_bar, structure_bar);

        //code to create bubble chart layout
        var bubble = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids,
            },
            text: samples.otu_labels
        };
        var data_bubble = [bubble];
        var structure_bubble = {
            xaxis: {
                title: "otu id"
            },
            height: 700,
            width: 1000
        };

        //actually generating the chart
        Plotly.newPlot("bubble", data_bubble ,structure_bubble);

    }
    );
}
//function to extract data
function info(id){
    d3.json("sampledata/samples.json").then((data) => {
        var metadata = data.metadata;
        var r = metadata.filter(meta => meta.id.toString() === id)[0]
        var d_info = d3.select("#sample-metadata");
        d_info.html("");
        Object.entries(r).forEach((key) => {
            d_info.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    });
}

function changeEvent(id){
    info(id);
    plot(id);
    
}

//init function to render data
function init(){
    var dropdown_menu = d3.select("#selDataset");
    
    //path to read data
    d3.json("sampledata/samples.json").then((data) => {
        data.names.forEach(function(name) {
            dropdown_menu.append("option").text(name).property("value");
        });
        info(data.names[0]);
        plot(data.names[0]);
        
    });
}init();
