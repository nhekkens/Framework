// Making a new JS component
// 1 - Replace timeline with new name ( 8 occurences in this file )
// 2 - All code goes into init()
// 3 - Save file as new name .js
var timeline = {
    name: 'timeline',
    componentInitSelector: '.timeline',
    registerComponent: function() {
        if ($(timeline.componentInitSelector).length) {
            // framework.registerComponent(videoPlayer);
            // framework.registerComponent(sliderSlick);
            framework.registerComponent(timeline);
        }
    },
    inittimeline: function() {
        // Put your args and inits here with their options.


        var timelineOptions = {
            url: '/Assets/data/timeline.json',
            sectionDiv: '#timeSection'
        }


        // $('.timeline').timeline(timelineOptions);

        // End
        log(config.application.name + " •• timeline in " + Math.round(performance.now() - framework.initComponents.componentInitTime) + " milliseconds");
    },

    init: function() {
        // All code for this component goes in here
        // $.fn.extend({
        //     timeline: function(options) {

        //         buildTimeline = function(data) {

        //             var JSONobjects = data.Results;

        //             makeSlider = function(data, indexTime) {

        //                 log(data);

        //                 var timeline--section = $(options.sectionDiv).html();
        //                 var timeTemplate = _.template($(data.template).html());
        //                 var compiledTimeTemplate = timeTemplate(data);


        //                 $('.timeline').append(timeline--section);

        //                 $('.timeline .timeline--section').eq(indexTime).append(compiledTimeTemplate);

        //                 $.each(data.slider, function(index, slide) {
        //                     log(slide.name);


        //                     var slideItem = '<div class="slide"><img src="' + slide.img + '" alt="' + slide.alt + '"></div>';

        //                     $('.timeline .timeline--section').eq(indexTime).find('.timeSlider').append(slideItem);
        //                 })

        //                 $('.timeline .timeline--section').eq(indexTime).find('.timeSlider').slick();

        //             }

        //             makeVideo = function(data, indexVideo) {
        //                 log(data);

        //                 var timeline--section = $(options.sectionDiv).html();
        //                 var timeTemplate = _.template($(data.template).html());
        //                 var compiledTimeTemplate = timeTemplate(data);


        //                 $('.timeline').append(timeline--section);

        //                 $('.timeline .timeline--section').eq(indexVideo).append(compiledTimeTemplate);

        //             }

        //             makeDoc = function(data, indexDoc) {
        //                 log(data);

        //                 var timeline--section = $(options.sectionDiv).html();
        //                 var timeTemplate = _.template($(data.template).html());
        //                 var compiledTimeTemplate = timeTemplate(data);


        //                 $('.timeline').append(timeline--section);

        //                 $('.timeline .timeline--section').eq(indexDoc).append(compiledTimeTemplate);

        //             }

        //             generateSections = function() {
        //                 log('There are ' + data.Results.length + ' times to generate');


        //                 $.each(JSONobjects, function(index, time) {

        //                     if (time.type === "slider") {
        //                         makeSlider(time, index);
        //                     } else if (time.type === "video") {
        //                         makeVideo(time);
        //                     } else if (time.type === "doc") {
        //                         makeDoc(time);
        //                     }

        //                 })
        //             }

        //             // show timeline--entry
        //             $('.timeline').on('click', '.timeline--dot', function() {
        //                 $(this).next().siblings('.timeline--entry').toggleClass('is-active');
        //             });

        //             // closing timeline item from withing the item
        //             $('.timeline').on('click', '.timeline--entryClose', function() {
        //                 log('clicked');
        //                 $(this).parent().removeClass('is-active');
        //             });

        //             generateSections();

        //         }

        //         log('Search •• Retrieving Data from: ' + options.url);
        //         $.ajax({ url: options.url, data: 'I like turtles', success: buildTimeline, dataType: 'json' });
        //     }
        // });

        var dot = $('.timeline--dot');

        $('.timeline').on('click', '.timeline--dot', function() {
            // close all timline items first to avoid overlapping
            dot.removeClass('timeline--dot-active');
            $('.timeline--entry').removeClass('timeline--entry-active');

            // open relevant timeline item
            $(this).addClass('timeline--dot-active');
            $(this).next().siblings('.timeline--entry').addClass('timeline--entry-active');

            $("body, html").animate({
                scrollTop: $(this).parent().offset().top
            });
        });

        // actions to perform on close of entry
        $('.timeline').on('click', '.timeline--entryClose', function() {
            $(this).parent().removeClass('timeline--entry-active');
            dot.removeClass('timeline--dot-active');
        });

        // show more results on scroll
        var showResults = function(target) {
            target = $('.timeline--section');

            $.each(target, function(index, result) {
                setTimeout(function() {
                    // skips the first 3 and waypoints the rest
                    if (index > 2) {
                        $(result).waypoint(function() {
                            $(result).addClass('timeline--section-visible');
                        }, {
                            offset: '75%'
                        });
                    }
                }, 0);
            });
        }
        showResults();


        // End
        timeline.inittimeline();
    }
}

// Register self to the framework
timeline.registerComponent();