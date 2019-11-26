$(function() {
    var chartDiv = $("#chart");
    chartDiv.height(chartDiv.width() * 0.3);

    // 基于准备好的dom，初始化echarts实例
    var chart = echarts.init(document.getElementById('chart'));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '呼叫数据'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['接通率','分机未接率']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            name: 'ip',
            boundaryGap: false,
            data: []
        },
        yAxis: {
            type: 'value',
            name: "%"
        },
        series: [
            {
                name:'接通率',
                type:'line',
                data:[]
            },
            {
                name:'分机未接率',
                type:'line',
                data:[]
            }
        ]
    };

    $.ajax({
        url: "/cti_monitor/data/chart",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                option.xAxis.data = r.obj.ipArr;
                option.series[0].data = r.obj.successRateArr;
                option.series[1].data = r.obj.extNotAnswerRateArr;
                // 使用刚指定的配置项和数据显示图表。
                chart.setOption(option);
            }
        }
    });

});