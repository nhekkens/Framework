// Making a new JS component
// 1 - Replace tables with new name ( 5 occurences in this file )
// 2 - All code goes into init()
// 3 - Save file as new name .js
var tables = {
    name: 'tables',
    componentInitSelector: 'table',
    registerComponent: function() {
        if ($(tables.componentInitSelector).length) {
            framework.registerComponent(tables);
        }
    },
    init: function() {
        // All code for this component goes in here

        $("table").addClass("table-original").each(function(index) {
            var el = $(this),
                caption = el.children("caption"),
                table = this,
                data = [],
                headers = [];

            for (var i = 0, rlen = table.rows.length; i < rlen; i++) {
                var rowData = {};
                for (var j = 0, clen = table.rows[i].cells.length; j < clen; j++) {
                    var cellData = table.rows[i].cells[j].innerHTML;
                    if (i > 0)
                        rowData[headers[j]] = cellData;
                    else
                        headers[j] = cellData;
                }
                if (i > 0) data.push(rowData);
            }

            for (var l = data.length - 1; l >= 0; l--) {
                var rowGroup = data[l];
                var tbody = $("<tbody/>");

                for (var key in rowGroup) {
                    var row = '<tr>\
								   <th scope="row">' + key + '</th>\
								   <td>' + rowGroup[key] + '</td>\
							   </tr>';

                    tbody.append(row);
                }

                var mobileTable = $("<table/>").addClass("table-mirror");
                if (caption.length)
                    $('<caption/>').text("Row of " + caption.text()).prependTo(mobileTable);

                mobileTable.append(tbody).insertAfter(el);
            }
        });

        // End
        log(config.application.name + " •• tables in " + Math.round( performance.now() - framework.initComponents.componentInitTime) + " milliseconds" );
    }
}

// Register self to the framework
tables.registerComponent();
