var Runtime = {
    tableId: "#grid-table",
    table: null,
    domain: "runtime"
};

/**
 * jqGrid初始化参数
 */
Runtime.initOptions = function () {
    var options = {
        url : "/cti_monitor/runtime/grid",
        autowidth:true,
        rownumbers:true,
        rowNum: -1,
        colNames: ['ip', 'tomcat', 'freeswitch', '静态服', '内存',  '硬盘', 'cpu'],
        colModel: [
            {name: 'ip', index: 'ip', width: 100, sortable: false},
            {name: 'tomcat', index: 'tomcatEnabled', width: 90, formatter: function (cellValue, options, rowObject) {
                var tomcatEnabled = rowObject["tomcatEnabled"];
                return tomcatEnabled ? "<span><i class='fa fa-circle text-navy'></i>active</span>" : "<span><i class='fa fa-circle text-danger'></i>dead</span>";
            }},
            {name: 'freeswitch', index: 'freeswitchEnabled', width: 100, sortable: false, formatter: function (cellValue, options, rowObject) {
                var freeswitchEnabled = rowObject["freeswitchEnabled"];
                return freeswitchEnabled ? "<span><i class='fa fa-circle text-navy'></i>active</span>" : "<span><i class='fa fa-circle text-danger'></i>dead</span>";
            }},
            {name: '静态服', index: 'staticServerEnabled', width: 100, sortable: false, formatter: function (cellValue, options, rowObject) {
                    var staticServerEnabled = rowObject["staticServerEnabled"];
                    return staticServerEnabled ? "<span><i class='fa fa-circle text-navy'></i>active</span>" : "<span><i class='fa fa-circle text-danger'></i>dead</span>";
                }},
            {name: '内存', index: 'memoryUsageRate', width: 100, sortable: false, formatter: function (cellValue, options, rowObject) {
                var memoryFree = rowObject["memoryFree"];
                var memoryTotal = rowObject["memoryTotal"];
                var memoryUsageRate = rowObject["memoryUsageRate"];
                var memoryUsed = ((memoryTotal - memoryFree) / 1024 / 1024).toFixed(1) + "G";
                memoryTotal = (memoryTotal / 1024 /1024).toFixed(1) + "G";
                memoryUsageRate = (memoryUsageRate * 100).toFixed(1) + "%";
                return memoryUsed + "/" + memoryTotal + "(" + memoryUsageRate + ")";
            }},
            {name: '硬盘', index: '硬盘', width: 100, sortable: false,  formatter: function (cellValue, options, rowObject) {
                var diskFree = rowObject["diskFree"];
                var diskTotal = rowObject["diskTotal"];
                var diskUsageRate = rowObject["diskUsageRate"];
                var diskUsed = ((diskTotal - diskFree) / 1024 / 1024).toFixed(1) + "G";
                diskTotal = (diskTotal / 1024 /1024).toFixed(1) + "G";
                diskUsageRate = (diskUsageRate * 100).toFixed(1) + "%";
                return diskUsed + "/" + diskTotal + "(" + diskUsageRate + ")";
            }},
            {name: 'cpu', index: 'cpu', width: 100, sortable: false}
        ]
    };
    return options;
};



$(function() {
    var jqGrid = new JqGrid("#grid-table", null, Runtime.initOptions());
    Runtime.table = jqGrid.init();
});