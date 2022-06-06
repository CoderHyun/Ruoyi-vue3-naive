"use strict";
exports.__esModule = true;
var echarts = require("echarts/core");
var charts_1 = require("echarts/charts");
var components_1 = require("echarts/components");
var renderers_1 = require("echarts/renderers");
echarts.use([
    components_1.LegendComponent,
    components_1.TitleComponent,
    components_1.TooltipComponent,
    components_1.GridComponent,
    components_1.PolarComponent,
    components_1.AriaComponent,
    components_1.ParallelComponent,
    charts_1.BarChart,
    charts_1.LineChart,
    charts_1.PieChart,
    charts_1.MapChart,
    charts_1.RadarChart,
    renderers_1.SVGRenderer,
    charts_1.PictorialBarChart,
    components_1.RadarComponent,
    components_1.ToolboxComponent,
    components_1.DataZoomComponent,
    components_1.VisualMapComponent,
    components_1.TimelineComponent,
    components_1.CalendarComponent,
]);
exports["default"] = echarts;
