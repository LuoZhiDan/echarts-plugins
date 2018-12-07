define(function (require) {

    
    // var echarts = require('echarts/lib/echarts');
    var echarts = _echarts4;
    var zrUtil = echarts.util;

    require('./pie3d/Pie3dSeries');
    require('./pie3d/Pie3dView');
    require('echarts/lib/action/createDataSelectAction')('pie3d', [{
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

    echarts.registerVisual(zrUtil.curry(require('echarts/lib/visual/dataColor'), 'pie3d'));

    echarts.registerLayout(zrUtil.curry(
        require('./pie3d/pieLayout'), 'pie3d'
    ));

    echarts.registerProcessor(zrUtil.curry(require('echarts/lib/processor/dataFilter'), 'pie3d'));
});