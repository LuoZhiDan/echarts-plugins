define(function (require) {

    // var echarts = require('echarts/lib/echarts');
    var echarts = _echarts4;
    // var graphic = require('echarts/lib/util/graphic');
    var zrUtil = require('zrender/lib/core/util');
    var graphic = echarts.graphic;
    // var zrUtil = echarts.util;
    var graph = require('./Pie3dLayout');
    var colorTool = require('zrender/lib/tool/color');

    /**
     * 颜色高亮
     * @param {String|Object} color 
     * @param {Number| -1~1} level 
     */
    function leftColor(color, level) {
        if (typeof color == 'string') {
            return colorTool.lift(color, level)
        } else {
            // 设置的是渐变色,不改变
            return color;
        }
    }

    /**
     * 颜色变暗
     * @param {String|Object} color 
     * @param {Number| -1~1} level  
     */
    function lerpColor(color, level) {
        if (typeof color == 'string') {
            return colorTool.lerp(level, [color, '#000'])
        } else {
            // 设置的是渐变色, 不改变
            return color;
        }
    }

    /**
     * 计算渐变色
     * @param {String} color 
     */
    function gradColor(color, isHorizontal) {
        // 只支持字符串颜色值计算
        if (typeof color != 'string') {
            return color;
        }

        return new graphic.LinearGradient(
            0, 0, isHorizontal ? 1 : 0, isHorizontal ? 0 : 1,
            [
                { offset: 0, color: color },
                { offset: 0.43, color: colorTool.lerp(0.6, [color, '#000']) },
                { offset: 0.57, color: colorTool.lerp(0.6, [color, '#000']) },
                { offset: 1, color: color }
            ]
        );
    }

    /**
     * 获取轻微的颜色渐变
     * @param {String} color 
     * @param {Number| 0~1} level 
     * @param {Boolean} isHorizontal 
     */
    function gradSlapColor(color, level, isHorizontal) {
        // 只支持字符串颜色值计算
        if (typeof color != 'string') {
            return color;
        }

        return new graphic.LinearGradient(
            // 0, 0, isHorizontal ? 0 : 1, isHorizontal ? 1 : 0,
            0, 0, 0, 1,
            [
                { offset: 0, color: colorTool.lerp(level, [color, '#000']) },
                { offset: 1, color: color }
            ]
        );
    }

    /**
     * 按扇形角度渐变
     */
    function gradSectorColor(color, level, points) {
        // 只支持字符串颜色值计算
        if (typeof color != 'string') {
            return color;
        }

        return new graphic.LinearGradient(
            points[0], points[1], points[2], points[3],
            [
                { offset: 0, color: colorTool.lerp(level, [color, '#000']) },
                { offset: 1, color: color }
            ]
        );
    }

    /**
     * 根据角度计算渐变色的起点和终点
     * @param {*} radians 
     */
    function angleToPoints(radians) {
        var offset = Math.PI / 2;
        return [
            (0.5 * Math.cos(radians + offset)) + 0.5,
            (0.5 * Math.sin(radians + offset)) + 0.5,
            (0.5 * Math.cos(radians + Math.PI + offset)) + 0.5,
            (0.5 * Math.sin(radians + Math.PI + offset)) + 0.5,
        ]
    }

    /**
     * @param {module:echarts/model/Series} seriesModel
     * @param {boolean} hasAnimation
     * @inner
     */
    function updateDataSelected(uid, seriesModel, hasAnimation, api) {
        var data = seriesModel.getData();
        var dataIndex = this.dataIndex;
        var name = data.getName(dataIndex);
        var selectedOffset = seriesModel.get('selectedOffset');
        // var selectedOffset = 20;

        api.dispatchAction({
            type: 'pieToggleSelect',
            from: uid,
            name: name,
            seriesId: seriesModel.id
        });

        data.each(function (idx) {
            toggleItemSelected(
                data.getItemGraphicEl(idx),
                data.getItemLayout(idx),
                seriesModel.isSelected(data.getName(idx)),
                selectedOffset,
                hasAnimation
            );
        });
    }

    /**
     * @param {module:zrender/graphic/Sector} el
     * @param {Object} layout
     * @param {boolean} isSelected
     * @param {number} selectedOffset
     * @param {boolean} hasAnimation
     * @inner
     */
    function toggleItemSelected(el, layout, isSelected, selectedOffset, hasAnimation) {
        var midAngle = (layout.startAngle + layout.endAngle) / 2;

        var dx = Math.cos(midAngle);
        var dy = Math.sin(midAngle);

        var offset = isSelected ? selectedOffset : 0;
        var position = [dx * offset, dy * offset];

        hasAnimation
            // animateTo will stop revious animation like update transition
            ? el.animate()
                .when(200, {
                    position: position
                })
                .start('bounceOut')
            : el.attr('position', position);
    }

    // var piePieceIndex = 0;

    /**
     * Piece of pie including Sector, Label, LabelLine
     * @constructor
     * @extends {module:zrender/graphic/Group}
     */
    function PiePiece(data, idx) {

        graphic.Group.call(this);

        // var sector = new graphic.Sector({
        //     z2: 2
        // });
        var sector3DBottom = new graph.Sector3DBottom({
            name: "sector3DBottom",
            // z2: 21,
            // ignore: false,
            // invisible: false
            z: idx,
            z2: 2 + idx,            
            zlevel: 1
        });
        var sector3DTop = new graph.Sector3DTop({
            name: "sector3DTop",
            // z2: 22,
            // ignore: false,
            // invisible: false
            z: idx,
            z2: 2 + idx,            
            zlevel: 1
        });
        // var sector3DSideInner = new graph.Sector3DSideInner({
        //     z2: 3,
        //     ignore: false,
        //     invisible: false
        // });
        var sector3DSideInnerLeft = new graph.Sector3DSideInnerLeft({
            name: "sector3DSideInnerLeft",
            // z2: 31,
            // ignore: false,
            // invisible: false
            z: idx,
            z2: 2 + idx,            
            zlevel: 1
        });
        var sector3DSideInnerRight = new graph.Sector3DSideInnerRight({
            name: "sector3DSideInnerRight",
            // z2: 32,
            // ignore: false,
            // invisible: false
            z: idx,
            z2: 2 + idx,            
            zlevel: 1
        });
        var sector3DSideOutter = new graph.Sector3DSideOutter({
            name: "sector3DSideOutter",
            // z2: 4,
            // ignore: false,
            // invisible: false
            z: idx,
            z2: 2 + idx,            
            zlevel: 1
        });
        var polyline = new graphic.Polyline({
            name: "sector3DLine",
        });
        // var polyline = new graph.Sector3DLabelLine();
        var text = new graphic.Text({
            name: "sector3DText",
        });
        // this.add(sector);
        this.add(sector3DBottom);
        // this.add(sector3DSideInner);
        this.add(sector3DSideInnerLeft);
        this.add(sector3DSideInnerRight);
        this.add(sector3DSideOutter);
        this.add(sector3DTop);        
        this.add(polyline);
        this.add(text);

        this.updateData(data, idx, true);

        // Hover to change label and labelLine
        function onEmphasis() {
            polyline.ignore = polyline.hoverIgnore;
            text.ignore = text.hoverIgnore;
        }
        function onNormal() {
            polyline.ignore = polyline.normalIgnore;
            text.ignore = text.normalIgnore;
        }
        this.on('emphasis', onEmphasis)
            .on('normal', onNormal)
            .on('mouseover', onEmphasis)
            .on('mouseout', onNormal);
    }

    var piePieceProto = PiePiece.prototype;

    function getLabelStyle(data, idx, state, labelModel, labelPosition) {
        var textStyleModel = labelModel.getModel('textStyle');
        var isLabelInside = labelPosition === 'inside' || labelPosition === 'inner';
        return {
            fill: textStyleModel.getTextColor()
                || (isLabelInside ? '#fff' : data.getItemVisual(idx, 'color')),
            opacity: data.getItemVisual(idx, 'opacity'),
            textFont: textStyleModel.getFont(),
            text: zrUtil.retrieve(
                data.hostModel.getFormattedLabel(idx, state), data.getName(idx)
            )
        };
    }

    function deepClone(obj){
        let objClone = Array.isArray(obj)?[]:{};
        if(obj && typeof obj==="object"){
            for(key in obj){
                if(obj.hasOwnProperty(key)){
                    //判断ojb子元素是否为对象，如果是，递归复制
                    if(obj[key]&&typeof obj[key] ==="object"){
                        objClone[key] = deepClone(obj[key]);
                    }else{
                        //如果不是，简单复制
                        objClone[key] = obj[key];
                    }
                }
            }
        }
        return objClone;
    }

    piePieceProto.updateData = function (data, idx, firstCreate) {

        // var sector = this.childOfName(0);
        // var sector3DBottomTop = this.childAt(0);
        // var sector3DBottom = this.childAt(0);
        var sector3DBottom = this.childOfName("sector3DBottom");
        var sector3DTop = this.childOfName("sector3DTop");
        // var sector3DSideInner = this.childAt(1);
        var sector3DSideInnerLeft = this.childOfName("sector3DSideInnerLeft");
        var sector3DSideInnerRight = this.childOfName("sector3DSideInnerRight");
        var sector3DSideOutter = this.childOfName("sector3DSideOutter");

        var seriesModel = data.hostModel;
        var itemModel = data.getItemModel(idx);
        var layout = data.getItemLayout(idx);
        var sectorShape = zrUtil.extend({}, layout);
        sectorShape.label = null;

        if (firstCreate) {
            // sector.setShape(sectorShape);
            sector3DBottom.setShape(sectorShape);
            sector3DTop.setShape(sectorShape);
            // sector3DSideInner.setShape(sectorShape);
            sector3DSideInnerLeft.setShape(sectorShape);
            sector3DSideInnerRight.setShape(sectorShape);
            sector3DSideOutter.setShape(sectorShape);

            var animationType = seriesModel.getShallow('animationType');
            if (animationType === 'scale') {
                sector.shape.r = layout.r0;
                graphic.initProps(sector3DBottom, {
                    shape: {
                        r: layout.r
                    }
                }, seriesModel, idx);
            }
            // Expansion
            else {
                // sector.shape.endAngle = layout.startAngle;
                // sector3DBottomTop.shape.endAngle = layout.startAngle;
                sector3DBottom.shape.endAngle = layout.startAngle;
                sector3DTop.shape.endAngle = layout.startAngle;
                // sector3DSideInner.shape.endAngle = layout.startAngle;

                sector3DSideInnerLeft.shape.endAngle = layout.startAngle;
                sector3DSideInnerRight.shape.endAngle = layout.startAngle;
                sector3DSideOutter.shape.endAngle = layout.startAngle;
                // graphic.updateProps(sector3DBottomTop, {
                //     shape: {
                //         endAngle: layout.endAngle
                //     }
                // }, seriesModel, idx);
                graphic.updateProps(sector3DBottom, {
                    shape: {
                        endAngle: layout.endAngle
                    }
                }, seriesModel, idx);
                graphic.updateProps(sector3DTop, {
                    shape: {
                        endAngle: layout.endAngle
                    }
                }, seriesModel, idx);
                // graphic.updateProps(sector3DSideInner, {
                //     shape: {
                //         endAngle: layout.endAngle
                //     }
                // }, seriesModel, idx);

                graphic.updateProps(sector3DSideInnerLeft, {
                    shape: {
                        endAngle: layout.endAngle
                    }
                }, seriesModel, idx);
                graphic.updateProps(sector3DSideInnerRight, {
                    shape: {
                        endAngle: layout.endAngle
                    }
                }, seriesModel, idx);
                graphic.updateProps(sector3DSideOutter, {
                    shape: {
                        endAngle: layout.endAngle
                    }
                }, seriesModel, idx);
            }

        }
        else {
            // graphic.updateProps(sector, {
            //     shape: sectorShape
            // }, seriesModel, idx);
            graphic.updateProps(sector3DBottom, {
                shape: sectorShape
            }, seriesModel, idx);
            graphic.updateProps(sector3DTop, {
                shape: sectorShape
            }, seriesModel, idx);
            // graphic.updateProps(sector3DSideInner, {
            //     shape: sectorShape
            // }, seriesModel, idx);
            graphic.updateProps(sector3DSideInnerLeft, {
                shape: sectorShape
            }, seriesModel, idx);
            graphic.updateProps(sector3DSideInnerRight, {
                shape: sectorShape
            }, seriesModel, idx);
            graphic.updateProps(sector3DSideOutter, {
                shape: sectorShape
            }, seriesModel, idx);
        }

        // Update common style
        var itemStyleModel = itemModel.getModel('itemStyle');
        var visualColor = data.getItemVisual(idx, 'color');
        var borderColor = sectorShape.borderColor;

        var emphasisStyle = itemStyleModel.getModel('emphasis').getItemStyle();
        emphasisStyle.color = leftColor(visualColor, -1);

        var gradPoints = angleToPoints(sectorShape.startAngle);
        var gradientColorTop = gradSectorColor(visualColor, 0.3, gradPoints);
        var gradientColorSide;
        if (typeof visualColor != 'string') {
            gradientColorSide = deepClone(visualColor);   
            var startColor = gradientColorSide.colorStops[0].color;
            if(startColor){
                gradientColorSide.colorStops[0].color = colorTool.lerp(0.4, [startColor, '#000']);
            }
        } else {
            gradientColorSide = gradSectorColor(visualColor, 0.6, gradPoints); 
        } 
        
        sector3DBottom.useStyle(
            zrUtil.defaults(
                {
                    lineJoin: 'bevel',
                    fill: visualColor,
                    // stroke:"white"
                    stroke: visualColor,
                    z2: 2 + idx
                },
                itemStyleModel.getModel('normal').getItemStyle()
            )
        );
        sector3DTop.useStyle(
            zrUtil.defaults(
                {
                    lineJoin: 'bevel',
                    // fill: visualColor,
                    // fill: gradSlapColor(visualColor, 0.3, false),
                    fill: gradientColorTop,
                    // fill: gradColor(visualColor, true),
                    // fill: gradRadialColor(0.5, 0.5, 1, visualColor, 0.5),
                    // fill: gradRadialColor(sectorShape.cx, sectorShape.cy, sectorShape.r, visualColor, 0.5),
                    // stroke: gradSlapColor(visualColor, 0.3, false),
                    stroke: borderColor ? borderColor : gradientColorTop,
                    // stroke: gradColor(visualColor, true),
                    // stroke: gradRadialColor(0.5, 0.5, 1, visualColor, 0.5),
                    // stroke: gradRadialColor(sectorShape.cx, sectorShape.cy, sectorShape.r, visualColor, 0.5),
                    // stroke: visualColor,
                    z2: 2 + idx
                },
                itemStyleModel.getModel('normal').getItemStyle()
            )
        );
        // sector3DBottom.hoverStyle = itemStyleModel.getModel('emphasis').getItemStyle();
        sector3DBottom.hoverStyle = emphasisStyle;
        // sector3DTop.hoverStyle = itemStyleModel.getModel('emphasis').getItemStyle();
        sector3DTop.hoverStyle = emphasisStyle;
        // sector3DSideInner.useStyle(
        //     zrUtil.defaults(
        //         {
        //             lineJoin: 'bevel',
        //             fill: visualColor,
        //             stroke:"white"
        //         },
        //         itemStyleModel.getModel('normal').getItemStyle()
        //     )
        // );
        sector3DSideInnerLeft.useStyle(
            zrUtil.defaults(
                {
                    lineJoin: 'bevel',
                    // fill: visualColor,
                    fill: gradientColorSide,
                    // fill: gradSlapColor(visualColor, 0.6, false),
                    // stroke:"white",
                    // stroke: visualColor,
                    stroke: borderColor ? borderColor : gradientColorSide,
                    // stroke: gradSlapColor(visualColor, 0.6, false),
                    z2: 2 + idx
                },
                itemStyleModel.getModel('normal').getItemStyle()
            )
        );
        sector3DSideInnerRight.useStyle(
            zrUtil.defaults(
                {
                    lineJoin: 'bevel',
                    // fill: visualColor,
                    fill: gradientColorSide,
                    // fill: gradSlapColor(visualColor, 0.6, false),
                    // stroke:"white"
                    // stroke: visualColor,
                    stroke: borderColor ? borderColor : gradientColorSide,
                    // stroke: gradSlapColor(visualColor, 0.6, false),
                    z2: 2 + idx
                },
                itemStyleModel.getModel('normal').getItemStyle()
            )
        );
        // sector3DSideInner.hoverStyle = itemStyleModel.getModel('emphasis').getItemStyle();
        sector3DSideInnerLeft.hoverStyle = itemStyleModel.getModel('emphasis').getItemStyle();
        sector3DSideInnerRight.hoverStyle = itemStyleModel.getModel('emphasis').getItemStyle();
        sector3DSideOutter.useStyle(
            zrUtil.defaults(
                {
                    lineJoin: 'bevel',
                    // fill: visualColor,
                    // fill: gradSlapColor(visualColor, 0.6, false),
                    fill: gradientColorSide,
                    // stroke:"white"
                    // stroke: visualColor,
                    // stroke: gradSlapColor(visualColor, 0.6, false),
                    stroke: borderColor ? borderColor : gradientColorSide,
                    z2: 2 + idx
                },
                itemStyleModel.getModel('normal').getItemStyle()
            )
        );
        sector3DSideOutter.hoverStyle = itemStyleModel.getModel('emphasis').getItemStyle();

        var cursorStyle = itemModel.getShallow('cursor');
        cursorStyle && sector3DBottom.attr('cursor', cursorStyle);

        // Toggle selected
        toggleItemSelected(
            this,
            data.getItemLayout(idx),
            itemModel.get('selected'),
            seriesModel.get('selectedOffset'),
            seriesModel.get('animation')
        );

        function onEmphasis() {
            // Sector may has animation of updating data. Force to move to the last frame
            // Or it may stopped on the wrong shape
            sector3DTop.stopAnimation(true);
            sector3DTop.animateTo({
                shape: {
                    r: layout.r + 10
                }
            }, 300, 'elasticOut');
        }
        function onNormal() {
            sector3DTop.stopAnimation(true);
            sector3DTop.animateTo({
                shape: {
                    r: layout.r
                }
            }, 300, 'elasticOut');
        }
        sector3DTop.off('mouseover').off('mouseout').off('emphasis').off('normal');
        if (itemModel.get('hoverAnimation') && seriesModel.isAnimationEnabled()) {
            sector3DTop
                .on('mouseover', onEmphasis)
                .on('mouseout', onNormal)
                .on('emphasis', onEmphasis)
                .on('normal', onNormal);
        }

        this._updateLabel(data, idx);

        graphic.setHoverStyle(this);
    };

    piePieceProto._updateLabel = function (data, idx) {

        // var labelLine = this.childAt(1);
        // var labelLine = this.childAt(5);
        var labelLine = this.childOfName("sector3DLine");
        // var labelText = this.childAt(6);
        var labelText = this.childOfName("sector3DText");
    
        var seriesModel = data.hostModel;
        var itemModel = data.getItemModel(idx);
        var layout = data.getItemLayout(idx);
        var labelLayout = layout.label;
        var visualColor = data.getItemVisual(idx, 'color');
    
        graphic.updateProps(labelLine, {
            shape: {
                smooth: 'spline',
                points: labelLayout.linePoints || [
                    [labelLayout.x, labelLayout.y], [labelLayout.x, labelLayout.y], [labelLayout.x, labelLayout.y]
                ]
            }
        }, seriesModel, idx);
    
        graphic.updateProps(labelText, {
            style: {
                x: labelLayout.x,
                y: labelLayout.y
            }
        }, seriesModel, idx);
        labelText.attr({
            rotation: labelLayout.rotation,
            origin: [labelLayout.x, labelLayout.y],
            z2: 10
        });
    
        var labelModel = itemModel.getModel('label.normal');
        var labelHoverModel = itemModel.getModel('label.emphasis');
        var labelLineModel = itemModel.getModel('labelLine.normal');
        var labelLineHoverModel = itemModel.getModel('labelLine.emphasis');
        var visualColor = data.getItemVisual(idx, 'color');
    
        graphic.setLabelStyle(
            labelText.style, labelText.hoverStyle = {}, labelModel, labelHoverModel,
            {
                labelFetcher: data.hostModel,
                labelDataIndex: idx,
                defaultText: data.getName(idx),
                autoColor: visualColor,
                useInsideStyle: !!labelLayout.inside
            },
            {
                textAlign: labelLayout.textAlign,
                textVerticalAlign: labelLayout.verticalAlign,
                opacity: data.getItemVisual(idx, 'opacity')
            }
        );
    
        labelText.ignore = labelText.normalIgnore = !labelModel.get('show');
        labelText.hoverIgnore = !labelHoverModel.get('show');
    
        labelLine.ignore = labelLine.normalIgnore = !labelLineModel.get('show');
        labelLine.hoverIgnore = !labelLineHoverModel.get('show');
    
        // Default use item visual color
        labelLine.setStyle({
            stroke: visualColor,
            opacity: data.getItemVisual(idx, 'opacity')
        });
        labelLine.setStyle(labelLineModel.getModel('lineStyle').getLineStyle());
    
        labelLine.hoverStyle = labelLineHoverModel.getModel('lineStyle').getLineStyle();
    
        var smooth = labelLineModel.get('smooth');
        if (smooth && smooth === true) {
            smooth = 0.4;
        }
        labelLine.setShape({
            smooth: smooth
        });
    };

    zrUtil.inherits(PiePiece, graphic.Group);


    // Pie view
    var Pie = echarts.extendChartView({

        type: 'pie3d',

        init: function () {
            var sectorGroup = new graphic.Group();
            this._sectorGroup = sectorGroup;
        },

        render: function (seriesModel, ecModel, api, payload) {
            if (payload && (payload.from === this.uid)) {
                return;
            }

            var data = seriesModel.getData();
            var oldData = this._data;
            var group = this.group;

            var hasAnimation = ecModel.get('animation');
            var isFirstRender = !oldData;
            var animationType = seriesModel.get('animationType');

            var onSectorClick = zrUtil.curry(
                updateDataSelected, this.uid, seriesModel, hasAnimation, api
            );

            var selectedMode = seriesModel.get('selectedMode');

            data.diff(oldData)
                .add(function (idx) {
                    var piePiece = new PiePiece(data, idx);
                    // console.log(piePiece)
                    // Default expansion animation
                    if (isFirstRender && animationType !== 'scale') {
                        piePiece.eachChild(function (child) {
                            child.stopAnimation(true);
                        });
                    }

                    selectedMode && piePiece.on('click', onSectorClick);

                    data.setItemGraphicEl(idx, piePiece);

                    group.add(piePiece);
                })
                .update(function (newIdx, oldIdx) {
                    var piePiece = oldData.getItemGraphicEl(oldIdx);

                    piePiece.updateData(data, newIdx);

                    piePiece.off('click');
                    selectedMode && piePiece.on('click', onSectorClick);
                    group.add(piePiece);
                    data.setItemGraphicEl(newIdx, piePiece);
                })
                .remove(function (idx) {
                    var piePiece = oldData.getItemGraphicEl(idx);
                    group.remove(piePiece);
                })
                .execute();

            // 开场动画
            // if (
            //     hasAnimation && isFirstRender && data.count() > 0
            //     // Default expansion animation
            //     && animationType !== 'scale'
            // ) {
            //     var shape = data.getItemLayout(0);
            //     var r = Math.max(api.getWidth(), api.getHeight()) / 2;
            //     // shape.startAngle -= .18;
            //     var removeClipPath = zrUtil.bind(group.removeClipPath, group);
            //     group.setClipPath(this._createClipPath(
            //         shape.cx, shape.cy, r, shape.startAngle, shape.clockwise, removeClipPath, seriesModel
            //     ));
            //     // group.setClipPath(this._createClipPath(
            //     //     shape.cx, shape.cy, r, shape.startAngle, shape.clockwise, shape.a, shape.b, shape.a0, shape.b0, shape.h, removeClipPath, seriesModel
            //     // ));
            // }
            if (
                hasAnimation && isFirstRender && data.count() > 0
                // Default expansion animation
                && animationType !== 'scale'
            ) {
                var shape = data.getItemLayout(0);
                var r = Math.max(api.getWidth(), api.getHeight()) / 2;
                // shape.startAngle += .17;
                var removeClipPath = zrUtil.bind(group.removeClipPath, group);
                group.setClipPath(this._createClipPath(
                    shape.cx, shape.cy, r, shape.startAngle, shape.clockwise, removeClipPath, seriesModel
                ));
            }

            this._data = data;
        },

        dispose: function () {},

        // _createClipPath: function (
        //     cx, cy, r, startAngle, clockwise, a, b, a0, b0, h, cb, seriesModel
        // ) {
        //     var clipPath = new graphic.Sector({
        //     // var clipPath = new graph.Sector3DBottom({
        //         shape: {
        //             // z: 0,
        //             cx: cx,
        //             cy: cy,
        //             r0: 0,
        //             r: r,
        //             startAngle: startAngle,
        //             endAngle: startAngle,
        //             clockwise: clockwise
        //             // a: 0,
        //             // b: 0,
        //             // a0: 0,
        //             // b0: 0,
        //             // h: 15
        //         }
        //     });

        //     graphic.initProps(clipPath, {
        //         shape: {
        //             endAngle: startAngle + (clockwise ? 1 : -1) * Math.PI * 2
        //         }
        //     }, seriesModel, cb);

        //     return clipPath;
        // },
        _createClipPath: function (
            cx, cy, r, startAngle, clockwise, cb, seriesModel
        ) {
            var clipPath = new graphic.Sector({
                shape: {
                    cx: cx,
                    cy: cy,
                    r0: 0,
                    r: r,
                    startAngle: startAngle,
                    endAngle: startAngle,
                    clockwise: clockwise
                }
            });
    
            graphic.initProps(clipPath, {
                shape: {
                    endAngle: startAngle + (clockwise ? 1 : -1) * Math.PI * 2
                }
            }, seriesModel, cb);
    
            return clipPath;
        },

        /**
         * @implement
         */
        containPoint: function (point, seriesModel) {
            var data = seriesModel.getData();
            var itemLayout = data.getItemLayout(0);
            if (itemLayout) {
                var dx = point[0] - itemLayout.cx;
                var dy = point[1] - itemLayout.cy;
                var radius = Math.sqrt(dx * dx + dy * dy);
                return radius <= itemLayout.r && radius >= itemLayout.r0;
            }
        }

    });

    return Pie;
});