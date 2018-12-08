require("expose-loader?$!jquery");
// require("expose-loader?_echarts4!echarts/dist/echarts");
require("expose-loader?dat!dat.gui");
require('../index');

import { data } from './data';

const gui = new dat.GUI();
var params = {
    barWidth: 20
}

function getOption() {
    return {
        xAxis: {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name: '直接访问',
            type: 'area3d',
            data: data(),
            symbol: 'coils',
            symbolLineColor: '#ff0',
            symbolSize: 20,
            symbolLineWidth: 2,
            showSymbol: true,
            // symbolLineType: 'solid',
            faceWidth: 6,
            smooth: true,
            itemStyle: {
                normal: {
                    color: '#188df0',
                    opacity: 0.6,
                    barBorderColor: '#018df0'
                }
            }
        }]
    }
}

function init() {
    var chart = _echarts4.init(document.getElementById('main'));
    chart.setOption( getOption() );
}
init();





