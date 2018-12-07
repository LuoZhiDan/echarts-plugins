// 注意：UE中使用多个版本导致echarts依赖有问题
var echarts = _echarts4;

require('./bar3d/Bar3dSeries');
require('./bar3d/Bar3dView');

var barLayoutGrid = require("echarts/lib/layout/barGrid");

echarts.registerLayout(echarts.util.curry(barLayoutGrid.layout, 'bar3d'));
echarts.registerLayout(barLayoutGrid.largeLayout);
echarts.registerVisual({
    seriesType: 'bar3d',
    reset: function (seriesModel) {
      seriesModel.getData().setVisual('legendSymbol', 'roundRect');
    }
});
