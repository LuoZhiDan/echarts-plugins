require("expose-loader?$!jquery");
// require("expose-loader?_echarts4!echarts/dist/echarts");
require("expose-loader?dat!dat.gui");
require('..');

import { data } from './data';

const gui = new dat.GUI();
var params = {
    barWidth: 20
}

function getOption() {
    return {
        "color": ["#379CF8", "#AFE37B", "#F9B32A", "#c4a9f8", "#83e5e5", "#f288bc", "#ff8f83", "#9956AC", "#6e7074", "#546570", "#c4ccd3"],
        "tooltip": [{
            "show": true,
            "trigger": "item",
            "numFormatter": true,
            "percentFormatter": false,
            "formatter": "{a} <br/>{b} : {c}",
            "confine": true,
            "backgroundColor": "rgba(54, 56, 55, 0.8)",
            "axisPointer": {
                "lineStyle": {
                    "color": "#cccccc"
                },
                "crossStyle": {
                    "color": "#008acd",
                    "width": 1,
                    "type": "dashed",
                    "textStyle": {}
                },
                "shadowStyle": {
                    "color": "rgba(200,200,200,0.2)"
                },
                "type": "line",
                "axis": "auto",
                "animation": "auto",
                "animationDurationUpdate": 200,
                "animationEasingUpdate": "exponentialOut"
            },
            "textStyle": {
                "color": "#ffffff",
                "fontSize": 14
            },
            "zlevel": 0,
            "z": 60,
            "showContent": true,
            "triggerOn": "mousemove|click",
            "alwaysShowContent": false,
            "displayMode": "single",
            "renderMode": "auto",
            "showDelay": 0,
            "hideDelay": 100,
            "transitionDuration": 0.4,
            "enterable": false,
            "borderColor": "#333",
            "borderRadius": 4,
            "borderWidth": 0,
            "padding": 5,
            "extraCssText": ""
        }],
        "series": [{
            "name": "面积模式",
            "type": "pie3d",
            "radius": ["35", "140"],
            "center": ["50%", "50%"],
            "zAngle": 45,
            "sectorGap": 0,
            "sectorHeight": 17,
            "roseType": false,
            "selectedMode": "single",
            "selectedOffset": 30,
            "x": "50%",
            "max": 40,
            "sort": "ascending",
            "pieLabelType": "stack",
            "sectorHeightRise": false,
            "sectorNum": 30,
            "labelLine": {
                "length": 20,
                "show": false,
                "normal": {
                    "show": false,
                    "length": 20,
                    "length2": 15,
                    "smooth": false,
                    "lineStyle": {
                        "width": 1,
                        "type": "solid"
                    }
                },
                "labelLine": {},
                "emphasis": {
                    "labelLine": {}
                }
            },
            "data": [{
                "value": 10,
                "name": "Type1"
            }, {
                "value": 5,
                "name": "Type2"
            }, {
                "value": 15,
                "name": "Type3"
            }, {
                "value": 25,
                "name": "Type4"
            }, {
                "value": 20,
                "name": "Type5"
            }, {
                "value": 35,
                "name": "Type6"
            }, {
                "value": 30,
                "name": "Type7"
            }, {
                "value": 40,
                "name": "Type8"
            }],
            "itemStyle": {
                "labelLine": null,
                "label": null,
                "normal": {
                },
                "emphasis": {}
            },
            "left": "50%",
            "zlevel": 0,
            "z": 2,
            "legendHoverLink": true,
            "hoverAnimation": true,
            "clockwise": true,
            "startAngle": 90,
            "minAngle": 0,
            "avoidLabelOverlap": true,
            "stillShowZeroSum": true,
            "animationType": "expansion",
            "animationEasing": "cubicOut",
            "emphasis": {
                "label": {
                    "show": false
                }
            }
        }],
        "markArea": [{
            "zlevel": 0,
            "z": 1,
            "tooltip": {
                "trigger": "item"
            },
            "animation": false,
            "label": {
                "show": true,
                "position": "top"
            },
            "itemStyle": {
                "borderWidth": 0
            },
            "emphasis": {
                "label": {
                    "show": true,
                    "position": "top"
                }
            }
        }
        ],
        "markLine": [{
            "zlevel": 0,
            "z": 5,
            "symbol": ["circle", "arrow"],
            "symbolSize": [8, 16],
            "precision": 2,
            "tooltip": {
                "trigger": "item"
            },
            "label": {
                "show": true,
                "position": "end"
            },
            "lineStyle": {
                "type": "dashed"
            },
            "emphasis": {
                "label": {
                    "show": true
                },
                "lineStyle": {
                    "width": 3
                }
            },
            "animationEasing": "linear"
        }
        ],
        "markPoint": [{
            "zlevel": 0,
            "z": 5,
            "symbol": "pin",
            "symbolSize": 50,
            "tooltip": {
                "trigger": "item"
            },
            "label": {
                "show": true,
                "position": "inside"
            },
            "itemStyle": {
                "borderWidth": 2
            },
            "emphasis": {
                "label": {
                    "show": true
                }
            }
        }
        ],
        "marker": [],
        "visualMap": [],
        "dataZoom": [],
        "brush": [],
        "legend": [{
            "show": true,
            "left": "center",
            "top": "bottom",
            "orient": "horizontal",
            // "backgroundColor": "rgba(0,0,0,0)",
            "textStyle": {
                "fontSize": 14,
                "fontWeight": "normal",
                "color": "#36383c"
            },
            "selectedMode": "multiple",
            "itemGap": 10,
            "padding": 30,
            "data": ["Type1", "Type2", "Type3", "Type4", "Type5", "Type6", "Type7", "Type8"],
            "zlevel": 0,
            "z": 4,
            "align": "auto",
            "borderColor": "#ccc",
            "borderRadius": 0,
            "borderWidth": 0,
            "itemWidth": 25,
            "itemHeight": 14,
            "inactiveColor": "#ccc",
            "tooltip": {
                "show": false
            },
            "right": null,
            "bottom": null,
            "selected": {}
        }
        ],
        "curChartType": "pieCd",
        "pieType": "pie",
        "addDataAnimation": true,
        "returnColor": "#36383c",
        "_resizeRedius": {
            "flg": true
        },
        "calculable": false,
        "_labelType": "stack",
        "backgroundColor": "transparent",
        // "colorG": ["#379CF8", "#AFE37B", "#F9B32A", "#c4a9f8", "#83e5e5", "#f288bc", "#ff8f83", "#9956AC"],
        "_paddingx": "center",
        "_paddingy": "bottom",
        "legendLabelLimit": 10,
        "id": "a154417389927532",
        "chartType": "_echarts3",
        "categoryAxis": {
            "axisLine": {
                "lineStyle": {
                    "color": "red"
                }
            },
            "axisLabel": {
                "textStyle": {
                    "color": "red"
                }
            },
            "splitLine": {
                "lineStyle": {
                    "color": ["#eee"]
                }
            }
        },
        "valueAxis": {
            "axisLine": {
                "lineStyle": {
                    "color": "#cccccc",
                    "type": "solid"
                }
            },
            "splitArea": {
                "areaStyle": {
                    "color": ["rgba(250,250,250,0.1)", "rgba(200,200,200,0.1)"]
                }
            },
            "splitLine": {
                "lineStyle": {
                    "color": ["#eee"]
                }
            }
        },
        "labelItemStyle": {
            "itemStyle": {
                "normal": {
                    "label": {
                        "textStyle": {
                            "color": "#36383c"
                        }
                    }
                }
            }
        }
    }
}

function init() {
    var chart = _echarts4.init(document.getElementById('main'));
    chart.setOption(getOption());
}
init();





