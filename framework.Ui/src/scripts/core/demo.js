var initDemo = function() {
    var initTime = performance.now();
    // Start

    // For sidebar scrollling
    $('body').scrollspy({
        target: '.bs-docs-sidebar',
        offset: 40
    });

    // Change BS themes
    var themes = {
        "default": "//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css",
        "cerulean": "//bootswatch.com/cerulean/bootstrap.min.css",
        "cosmo": "//bootswatch.com/cosmo/bootstrap.min.css",
        "flatly": "//bootswatch.com/flatly/bootstrap.min.css",
        "journal": "//bootswatch.com/journal/bootstrap.min.css",
        "simplex": "//bootswatch.com/simplex/bootstrap.min.css",
        "slate": "//bootswatch.com/slate/bootstrap.min.css",
        "spacelab": "//bootswatch.com/spacelab/bootstrap.min.css",
        "united": "//bootswatch.com/united/bootstrap.min.css"
    }

    $(function() {
        var themesheet = $('<link href="' + themes['default'] + '" rel="stylesheet" />');
        themesheet.appendTo('head');
        $('.theme-link').click(function() {
            var themeurl = themes[$(this).attr('data-theme')];
            themesheet.attr('href', themeurl);
        });
    });

    // End
    log(config.application.name + " •• demo.js in " + Math.ceil(performance.now() - initTime) + " milliseconds");
}
