require("expose-loader?$!jquery");
require("expose-loader?_echarts4!echarts/dist/echarts");
require("expose-loader?dat!dat.gui");
require('../index');

import { data } from './data';

const gui = new dat.GUI();
var params = {
    barWidth: 20
}

function getOption() {
    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line'
            }
        },
        legend: {
            show: true,
            orient: 'horizontal',
            x: 'right',
            y: 'top',
            itemGap: 10,
            selectedMode: 'multiple',
            textStyle: {
                fontSize: 14,
                fontWeight: 'normal'
                //color:'#36383c'
            },
            data:['group1','group2', 'group3', 'group4']
        },
        series: [{
            name: 'chord',
            type: 'chord',
            sort: 'descending',
            data : [
                {name : 'group1'},
                {name : 'group2'},
                {name : 'group3'},
                {name : 'group4'}
            ],
            matrix: [
                [11975,  5871, 8916, 2868],
                [ 1951, 10048, 2060, 6171],
                [ 8010, 16145, 8090, 8045],
                [ 1013,   990,  940, 6907]
            ]
        }]
    }
}

function init() {
    var chart = _echarts4.init(document.getElementById('main'));
    chart.setOption( getOption() );
}
init();





