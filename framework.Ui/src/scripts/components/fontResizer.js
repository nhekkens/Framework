// Font resizer



// Making a new JS component
// 1 - Replace fontResizer with new name ( 8 occurences in this file )
// 2 - All code goes into init()
// 3 - Save file as new name .js
var fontResizer = {
    name: 'fontResizer',
    componentInitSelector: '.fontResizer',
    registerComponent: function() {
        if ($(fontResizer.componentInitSelector).length) {
            framework.registerComponent(fontResizer);
        }
    },
    initfontResizer: function() {
        // Put your target search here with their options.

        // End
        log(config.application.name + " •• fontResizer in " + Math.round( performance.now() - framework.initComponents.componentInitTime) + " milliseconds" );
    },
    init: function() {
        // All code for this component goes in here
        var exclusionClass = 'doNotResize';
        var affectedElements = $("p, div, h1, h2, h3, h4, h5, h6, a");

        affectedElements.each(function( index, element ) {
            $(element).data("orig-size", $(element).css("font-size"));
        });

        $(".btn-increase").on('click', function() {
            changeFontSize(1);
        })

        $(".btn-decrease").on('click', function() {
            changeFontSize(-1);
        })

        $(".btn-orig").on('click', function() {
            affectedElements.each(function( index, element ) {
                $(element).css("font-size", $(element).data("orig-size"));
            });
        })

        function changeFontSize(direction) {
            affectedElements.each( function( index, element ) {
                if ( !$(element).hasClass(exclusionClass) ) {
                	$(element).css("font-size", parseInt($(element).css("font-size")) + direction);
                }
            });
        }

        fontResizer.initfontResizer();
    }
}

// Register self to the framework
fontResizer.registerComponent();
