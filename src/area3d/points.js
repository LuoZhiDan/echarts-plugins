var _util = require("zrender/lib/core/util");

var map = _util.map;

var createRenderPlanner = require("echarts/lib/chart/helper/createRenderPlanner");

var _dataStackHelper = require("echarts/lib/data/helper/dataStackHelper");

var isDimensionStacked = _dataStackHelper.isDimensionStacked;

function _default(seriesType) {
  return {
    seriesType: seriesType,
    plan: createRenderPlanner(),
    reset: function (seriesModel) {
      var data = seriesModel.getData();
      var coordSys = seriesModel.coordinateSystem;
      var pipelineContext = seriesModel.pipelineContext;
      var isLargeRender = pipelineContext.large;

      if (!coordSys) {
        return;
      }

      var dims = map(coordSys.dimensions, function (dim) {
        return data.mapDimension(dim);
      }).slice(0, 2);
      var dimLen = dims.length;
      var stackResultDim = data.getCalculationInfo('stackResultDimension');

      if (isDimensionStacked(data, dims[0]
      /*, dims[1]*/
      )) {
        dims[0] = stackResultDim;
      }

      if (isDimensionStacked(data, dims[1]
      /*, dims[0]*/
      )) {
        dims[1] = stackResultDim;
      }

      function progress(params, data) {
        var segCount = params.end - params.start;
        var points = isLargeRender && new Float32Array(segCount * dimLen);

        for (var i = params.start, offset = 0, tmpIn = [], tmpOut = []; i < params.end; i++) {
          var point;

          if (dimLen === 1) {
            var x = data.get(dims[0], i);
            point = !isNaN(x) && coordSys.dataToPoint(x, null, tmpOut);
          } else {
            var x = tmpIn[0] = data.get(dims[0], i);
            var y = tmpIn[1] = data.get(dims[1], i); // Also {Array.<number>}, not undefined to avoid if...else... statement

            point = !isNaN(x) && !isNaN(y) && coordSys.dataToPoint(tmpIn, null, tmpOut);
          }

          data.setItemLayout(i, point && point.slice() || [NaN, NaN]);
        }

        isLargeRender && data.setLayout('symbolPoints', points);
      }

      return dimLen && {
        progress: progress
      };
    }
  };
}

module.exports = _default;