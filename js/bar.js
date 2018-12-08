require("expose-loader?$!jquery");
require("expose-loader?_echarts4!echarts");
require("expose-loader?dat!dat.gui");
require('../index');


import { data } from './data';

const gui = new dat.GUI();
var params = {
    barType:  'cylinder',
    barWidth: 20
}

function getOption() {
    return {
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        series: [{
            name: '直接访问',
            type: 'bar3d',
            barType: params.barType,
            data: data(),
            itemStyle: {
                normal: {
                    color: '#188df0',
                    opacity: 0.6,
                    barBorderColor: '#018df0'
                }
            }
        }],
        barWidth: 20
    }
}

function init() {
    var chart = _echarts4.init(document.getElementById('main'));
    chart.setOption( getOption() );
}

init();


gui.add(params, 'barType', ['cube', 'cylinder']).onChange(function(val){
    init();
});





