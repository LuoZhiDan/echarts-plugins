var echarts = _echarts4;
var helper = {};
var graphic = echarts.graphic;
var colorUtil = echarts.color;

function setLabel(normalStyle, hoverStyle, itemModel, color, seriesModel, dataIndex, labelPositionOutside) {
    var labelModel = itemModel.getModel('label.normal');
    var hoverLabelModel = itemModel.getModel('label.emphasis');
    graphic.setLabelStyle(normalStyle, hoverStyle, labelModel, hoverLabelModel, {
        labelFetcher: seriesModel,
        labelDataIndex: dataIndex,
        defaultText: seriesModel.getRawValue(dataIndex),
        isRectText: true,
        autoColor: color
    });
    fixPosition(normalStyle);
    fixPosition(hoverStyle);
}

function fixPosition(style, labelPositionOutside) {
    if (style.textPosition === 'outside') {
        style.textPosition = labelPositionOutside;
    }
}

helper.setLabel = setLabel;

function liftColor(color) {
    return typeof color === 'string' ? colorUtil.lift(color, -.2) : color;
}


helper.setHoverStyle = function (el, hoverStyle, topColor) {
    // 监听group事件
    graphic.setHoverStyle(el, {});
    el.eachChild(function (child) {
        var color =  child.fillNone ? 'none' : liftColor(topColor);
        var temp = echarts.util.clone(hoverStyle);
        temp.text = '';
        graphic.setHoverStyle(child, echarts.util.defaults(temp,
            {
                fill: child.name == 'top' ? liftColor(color) : color// 顶部需要更亮
            })
        );

        child.off('mouseover').off('mouseout').off('emphasis').off('normal');
    });
}

module.exports = helper;