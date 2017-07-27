// Validation
// https://jqueryvalidation.org/documentation/
var initValidation = function() {
    var initTime = performance.now();

    $('.validateForm').validate({
        errorElement: 'span',
        errorClass: 'error',
        focusInvalid: true,
        errorPlacement: function(error,element) {
            return true;
        }
    });

    var input = $("input[required='required']");
    var textarea = $("textarea[required='required']");
    var select = $("select[required='required']");

    if ($("input[type='checkbox'], input[type='radio']").length) {
        $("input[type='checkbox'], input[type='radio']").each(function () {
            var el = $(this),
                type = el.attr("type"),
                parent = "";

            if (el.attr("data-toggle") === "true") {
                el.wrap("<div class='controller toggle'></div>");
                parent = el.parents(".controller");
                parent.next("label").prepend(toggle).appendTo(parent);

            } else {
                //Bradley implemented Dave and Teresas fix for MVC checkboxes
                el.wrap("<div class='controller " + type + "'></div>");
                parent = el.parents(".controller");

                var id = el.attr('id');
                var hasLabel = false;
                if (id) {
                    var label = jQuery('label[for="' + id + '"]');
                    if (label.length) {
                        hasLabel = true;
                        label.appendTo(parent);
                    }
                }

                if (!hasLabel) {
                    var label = parent.next('label');
                    if (!label.length)
                        label = parent.next().next('label');
                    if (label.length)
                        label.appendTo(parent);
                }
            }
        });
    }

    $(document).on("click", "input[type='checkbox'][readonly], input[type='radio'][readonly]", function (event) {
        event.preventDefault();
    });
    // add asterix to form fields that are required
    input.siblings('label').addClass('required');
    input.siblings('label').append( $("<span>", {"class": "required__indicator"}).text("*") );

    textarea.siblings('label').addClass('required');
    textarea.siblings('label').append( $("<span>", {"class": "required__indicator"}).text("*") );

    select.siblings('label').addClass('required');
    select.siblings('label').append( $("<span>", {"class": "required__indicator"}).text("*") );

    // add error class to custom select field
    $("button[type='submit']").on('click', function() {
        $("select[required='required']").siblings().addClass('error');
    })

    $("select[required='required']").on('change', function() {
        $("select[required='required']").siblings().removeClass('error');
    })

    log(config.application.name + " •• validation in " + Math.ceil( performance.now() - initTime) + " milliseconds" );
}
