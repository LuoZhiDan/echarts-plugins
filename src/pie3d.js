define(function (require) {

    
    // var echarts = require('echarts/lib/echarts');
    var echarts = _echarts4;
    var zrUtil = echarts.util;

    require('./pie3d/Pie3dSeries');
    require('./pie3d/Pie3dView');

    var createDataSelectAction = require("echarts/lib/action/createDataSelectAction");

    var dataColor = require("echarts/lib/visual/dataColor");

    var dataFilter = require("echarts/lib/processor/dataFilter");

    createDataSelectAction('pie', [{
        type: 'pieToggleSelect',
        event: 'pieselectchanged',
        method: 'toggleSelected'
      }, {
        type: 'pieSelect',
        event: 'pieselected',
        method: 'select'
      }, {
        type: 'pieUnSelect',
        event: 'pieunselected',
        method: 'unSelect'
      }]);

    echarts.registerVisual(dataColor('pie3d'));

    echarts.registerLayout(zrUtil.curry(
        require('./pie3d/pieLayout'), 'pie3d'
    ));

    echarts.registerProcessor(dataFilter('pie3d'));
});