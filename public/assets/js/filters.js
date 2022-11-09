$(document).ready(function () {
    $("[data-filter-value]").on('click', function () {
        $(this).parents("[data-cat]").find('.filter-active').removeClass('d-none').find('a span.filter-value').html($(this).attr('data-filter-value'));
        setup_filters();
    })
    // remove fitler
    $('[data-remove-filter]').on('click', function () {
        $(this).parents("[data-cat]").find('.filter-active').addClass('d-none');
        setup_filters();
    })
    // remove fitler region
    $('[data-remove-multi-filter]').on('click', function () {
        $(this).parents("[data-cat]").find('.filter-active').addClass('d-none');
        $(this).parents("[data-cat]").find('.filter-activee').addClass('d-none');
        $(this).parents("[data-cat]").find('#states li').show().find('input').prop('checked', false);
        setup_filters();
    })
    // cross button click on filters selected
    $('.filter-active i,.filter-activee i').on('click', function () {
        $(this).parents('.dropdown.d-inline').find(".filter-active").addClass('d-none');
        $(this).parents('.dropdown.d-inline').find(".filter-activee").addClass('d-none');
        setup_filters();
    })

    // function to reset all filters
    $('.hideall a').click(function () {
        $('[data-cat]').each(function () {
            $(this).find('.filter-active').addClass('d-none').find('span').html('');
            $(this).find('.filter-activee').addClass('d-none').find('span').html('');
        })
        setup_filters();
        $(this).parent().addClass('d-none');
    })

    $("#daterangepicker").daterangepicker({
        opens: 'bottom'
    }, function (start, end, label) {
        $('[data-cat="date-range"] .filter-active').removeClass('d-none').find('a span.filter-value').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
        setup_filters();
    });

    $('.region-region').on('click', function (e) {
        e.stopPropagation();
        $('.region-region').removeClass('selected');
        $(this).addClass('selected');
        $('li[data-ragion]').hide().find('input').prop('checked', false);
        $('li[data-ragion="' + $(this).attr('data-filter-value-region') + '"]').show().find('input').prop('checked', true);
    })

    $('#apply-filter').on('click', function (e) {
        // e.stopPropagation();
        // region select

        var region = $('.region-region.selected').attr('data-filter-value-region');
        var states = [];
        $('#states li input').each(function () {
            if ($(this).is(":checked")) {
                states.push($(this).val());
            }
        })
        if (typeof region === 'undefined') {
            region = 'Multiple';
        }
        var selection_value = region + '--' + states.join(', ');
        $(this).parents('.dropdown.d-inline').find('.filter-active').removeClass('d-none').addClass('d-nonee').find('span').html(selection_value);
        $(this).parents('.dropdown.d-inline').find('.filter-activee').removeClass('d-none').find('span').html(region);
        //state select
        setup_filters();
    })
})

function setup_filters() {
    var filters = [];
    var flag = 0;
    $('[data-cat]').each(function () {
        if (!$(this).find('.filter-active').hasClass('d-none')) {
            var catt = $(this).attr('data-cat');
            var vall = $(this).find('.filter-active span').html();
            filters.push([catt, vall]);
            flag = 1;
        }
    })

    // console.log('fitlers', filters);
    if (flag == 1) {
        $('.hideall').removeClass('d-none');
    }
    localStorage.setItem('filters', JSON.stringify(filters));
    add_data_to_chart();
}

function init_filters() {
    var filters = localStorage.getItem('filters');
    var tmp = JSON.parse(filters);
    var regionFlag = 0;
    if (tmp.length > 0) {

        // filters are set
        $.each(tmp, function (index, value) {
            if (value[0] == 'region') {
                regionFlag = 1;
                var selection_value = value[1].split('--');
                var vall = selection_value[1].split(', ');
                $('[data-cat="' + value[0] + '"]').find('.filter-active.d-none').removeClass('d-none').find('span').html(value[1]);
                $('[data-cat="' + value[0] + '"]').find('.filter-activee.d-none').removeClass('d-none').find('span').html(selection_value[0]);
                if (selection_value[0] != 'Multiple') {
                    $('[data-filter-value-region="' + selection_value[0] + '"]').addClass('selected');
                    $('#states li[data-ragion="' + selection_value[0] + '"]').show();
                    $('#states li[data-ragion!="' + selection_value[0] + '"]').hide();
                }
                $('#states li').each(function () {
                    if ($.inArray($(this).find('.region_options').val(), vall) !== -1) {
                        $(this).find('.region_options').prop('checked', true);
                    }
                })

            }
            else {
                $('[data-cat="' + value[0] + '"]').find('.filter-active.d-none').removeClass('d-none').find('span').html(value[1]);
            }
        });
        if (regionFlag == 1) {

        }
        $('.hideall').removeClass('d-none');
    }
    add_data_to_chart();
}

init_filters();

