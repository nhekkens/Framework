// Making a new JS component
// 1 - Replace search with new name ( 5 occurences in this file )
// 2 - All code goes into init()
// 3 - Save file as new name .js
var search = {
    name: 'search',
    componentInitSelector: '.search',
    registerComponent: function() {
        if ($(search.componentInitSelector).length) {
            framework.registerComponent(search);
        }
    },
    initSearch: function() {
        // Put your target search here with their options.
        $('.search').search(searchOptions);

        // End
        log(config.application.name + " •• search in " + Math.round(performance.now() - framework.initComponents.componentInitTime) + " milliseconds");
    },
    init: function() {
        // All code for this component goes in here
        $.fn.extend({
            search: function(options) {
                buildSearch = function(data) {
                    log('Search •• buildSearch #:' + data.Results.length);

                    // assign vars
                    var JSONoriginal = data;
                    var JSONobjects = data.Results;
                    var sortOn;

                    var filterList = {
                        filters: {},
                        string: '',
                        sort: options.defaultSort
                    }

                    // Build searchInput
                    var inputInit = function() {
                        log('Search •• inputInit');

                        if (options.searchInput.active) {
                            // log('Search •• input');
                            var searchInput = '<div class="input-group"><input type="text" class="form-control string-search" placeholder="' + options.searchInput.placeholder + '"><span class="input-group-addon"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></span></div>';
                            $(options.searchInput.targetContainer).append(searchInput);

                            $('.string-search').on('keyup', function() {
                                var filterArray = $(this).val().toLowerCase();
                                // log('Search •• Input - Change Event: ' + filterArray);
                                filterManager('string', filterArray);
                            })
                        }

                        if (options.filtersActive) {
                            // log('Search •• filters');

                            $.each(options.filters, function(index, filter) {
                                // log(index, filter);

                                if (filter.type == 'select') {
                                    // If a filter.type is select do this
                                    var parameter = filter.parameter;
                                    tempArray = [];

                                    for (var i = 0; i < JSONobjects.length; i++) { // Loop objects in JSONobjects
                                        var object = JSONobjects[i];
                                        var property = object[parameter];

                                        if (property instanceof Array) { // Check if its an array
                                            for (var k = 0; k < property.length; k++) { // loop array
                                                if ($.inArray(property[k], tempArray) < 0) {
                                                    tempArray.push(property[k]);
                                                }
                                            }
                                        } else { // not an array, dont need to loop
                                            if ($.inArray(property, tempArray) < 0) {
                                                tempArray.push(property);
                                            }
                                        }
                                    }

                                    var select = $('<select class="selectpicker" multiple data-filter="' + parameter + '" title="' + filter.title + '"></select>');
                                    $(filter.targetContainer).append(select);

                                    for (var j = 0; j < tempArray.length; j++) {
                                        var option = '<option value="' + tempArray[j] + '">' + tempArray[j] + '</option>';
                                        select.append(option);
                                    }

                                    select.on('change', function() {
                                        var filterType = $(this).data('filter');
                                        var filterArray = $(this).selectpicker('val');

                                        if (_.isArray(filterArray)) {
                                            $.each(filterArray, function(index, item) {
                                                if (!isNaN(item)) {
                                                    filterArray[index] = parseInt(item);
                                                }
                                            })
                                        }

                                        // log('Search •• filters - Change Event: ' + filterType + ' && ' + filterArray);
                                        filterManager(filterType, filterArray);
                                    })
                                }

                                if (filter.type == 'sort') {
                                    // If a filter.type is sort do this
                                    var selectS = $('<select class="selectpicker" data-filter="sort" title="' + filter.title + '"></select>');
                                    $(filter.targetContainer).append(selectS);

                                    sortOn = filter.sortOn;

                                    $.each(filter.parameter, function(index, parameter) {
                                        var option = '<option value="' + parameter.type + '">' + parameter.title + '</option>';
                                        selectS.append(option);
                                    })

                                    selectS.on('change', function() {
                                        var filterType = $(this).data('filter');
                                        var filterArray = $(this).selectpicker('val');
                                        // log('Search •• filters - Change Event: ' + filterType + ' && ' + filterArray);
                                        filterManager(filterType, filterArray);
                                    })
                                }

                                $('.selectpicker').selectpicker('refresh');
                            });
                        }
                    }

                    var showResults = function(target) {
                        // log('Search •• showResults');
                        target = $('.search-loading');

                        $.each(target, function(index, result) {
                            setTimeout(function() {
                                $(result).removeClass('search-loading');
                                $(result).waypoint(function() {
                                    $(result).removeClass('loading');
                                }, {
                                    offset: options.itemShowOffset
                                });
                            }, options.itemShowSpeed * index);
                        });
                    }

                    var templateResult = function(object) {
                        if( object === undefined ) {
                            $('.ctaLoadMore__search').fadeOut();
                            return;
                        } else {
                            if (typeof(options.resultsTemplate) === 'object') {
                                var template = _.template($(options.resultsTemplate[object.template]).html());
                            } else {
                                var template = _.template($(options.resultsTemplate).html());
                            }

                            var target = $(options.resultsContainer);
                            var compiledResult = template(object);
                            target.append(compiledResult);
                        }
                    }

                    var outputResults = function(filteredOjects) {
                        log('Search •• Total: ', filteredOjects.length);

                        var outputCount = 0;
                        var outputIteration = 2;
                        var outputIteration2 = 1;
                        var target = $(options.resultsContainer);

                        if ( options.totalCount ) {
                            $('.search__filters .total span').html(filteredOjects.length);
                        }

                        if ( filteredOjects.length <= 0 ) {
                            var noResults = $('<div class="col-xs-12">' + JSONoriginal.noResult + '</div>');
                            target.append(noResults);
                        }

                        target.addClass(options.effectClass);

                        if ( options.pagination ) {
                            for (var i = outputCount; i < options.resultCount; i++) {
                                templateResult(filteredOjects[i]);
                                outputCount = i;
                            }

                            if ( filteredOjects.length <= options.resultCount ) {
                            } else {
                                var loadMore = $('<button class="ctaLoadMore ctaLoadMore__search"><span class="ctaLoadMore__text">' + options.loadMoreText + '</span></button>');

                                target.append(loadMore);

                                loadMore.on('click', function() {
                                    for (var i = outputCount; i < ( options.resultCount * outputIteration ) - outputIteration2; i++) {
                                        templateResult(filteredOjects[i]);
                                        outputCount = i;
                                    }

                                    outputIteration++;
                                    outputIteration2++;
                                    showResults(target);
                                });
                            }
                        } else {
                            $.each(filteredOjects, function(index, result) {
                                templateResult(result);
                            })
                        }

                        showResults(target);
                    }

                    var filterManager = function(filterType, filterArray) {
                        // log('Search •• filterManager');

                        if (filterType === 'sort') {
                            filterList.sort = filterArray;
                        } else if (filterType === 'string') {
                            filterList.string = filterArray;
                        } else {
                            filterList.filters[filterType] = filterArray;
                        }

                        if (options.queryString) {
                            var queryString = JSON.stringify(filterList);
                            queryString = encodeURI(queryString);
                            document.location.hash = queryString;
                            // log('Search •• queryString', queryString);
                        }

                        filterResults(filterList);
                    }

                    var filterResults = function(filterList) {
                        // log('Search •• filterResults');

                        var filteredOjects = JSONobjects;

                        for (var key in filterList.filters) {
                            if (filterList.filters[key] !== null) {
                                filteredOjects = _.filter(filteredOjects, function(item) {
                                    var prop = item[key];

                                    // log(filterList.filters[key]);
                                    if (!_.isArray(prop)) prop = [prop];
                                    return _.intersection(filterList.filters[key], prop).length > 0;
                                });
                            }
                        }

                        if (filterList.string) {
                            filteredOjects = _.filter(filteredOjects, function(item) {
                                var lowercaseItem = item[options.searchInput.parameter].toLowerCase();
                                return lowercaseItem.indexOf(filterList.string) >= 0;
                            });
                        }

                        $(options.resultsContainer).html('');

                        filteredOjects = _.sortBy(filteredOjects, sortOn);

                        if (filterList.sort === 'Z-A') {
                            filteredOjects.reverse();
                        }

                        if (filterList.sort === 'New') {
                            filteredOjects = _.sortBy(
                                filteredOjects,
                                function(num) {
                                    return num.dateUnix;
                                }
                            );
                            filteredOjects = filteredOjects.reverse();
                        }

                        if (filterList.sort === 'Old') {
                            filteredOjects = _.sortBy(
                                filteredOjects,
                                function(num) {
                                    return num.dateUnix;
                                }
                            );
                        }

                        outputResults(filteredOjects);
                    }

                    var inputSelector = function(filterList) {
                        var filterToSelectArray = [];
                        $.each(filterList, function(key, value) {
                            if (typeof(value) === 'object') {
                                $.each(value, function(key, valuesValue) {
                                    $.each(valuesValue, function(key, filterString) {
                                        filterToSelectArray.push(filterString);
                                    })
                                })
                            } else {
                                if (key === 'string') {
                                    if (value.length > 0) {
                                        $('.string-search').val(value);
                                    }
                                } else {
                                    filterToSelectArray.push(value);
                                }
                            }
                        })
                        $('.selectpicker').selectpicker('val', filterToSelectArray);
                    }

                    inputInit();

                    if (window.location.hash) {
                        var queryStringFresh = document.location.hash;
                        queryStringFresh = queryStringFresh.substring(1);
                        queryStringFresh = decodeURIComponent(queryStringFresh);
                        filterList = JSON.parse(queryStringFresh);
                        inputSelector(filterList);
                        filterResults(filterList);
                    } else {
                        // outputResults(JSONobjects);
                        filterResults(filterList);
                    }
                }

                $.ajax({ url: options.url, success: buildSearch, dataType: 'json' });
            }
        });

        search.initSearch();
    }
}

// Register self to the framework
search.registerComponent();
