$.validator.addMethod("lettersonly", function (value, element) {
    return this.optional(element) || /^[a-z ]+$/i.test(value);
}, "Only letters allowed");


$.validator.addMethod("gst", function (value, element, regexp) {
    var re = new RegExp(regexp);
    return this.optional(element) || re.test(value);
}, "Please enter valid GST number.");


$.validator.addMethod("duplicateEmail", function (value, element)
{
    var valid = true;
    $.ajax({url: js_base + 'ajax/check_duplicate',
        data: {field: 'email', value: value},
        async: false,
        method: 'post',
        beforeSend: function () {
            $(element).after('<div style="margin-top: -40px; float: right;" id="loader_' + $(element).attr('name') + '"><img style="height:25px;" src="' + js_base + '/assets/img/loader.gif"></div>');
        },
        complete: function () {
            setTimeout(function () {
                $('#loader_' + $(element).attr('name')).remove();
            }, 500);
        },
        success: function (msg) {
            valid = msg === "true" ? true : false
        }
    });
    return valid;
}, 'Email ID already registered');

$.validator.addMethod('filesize', function (value, element, param) {
    return this.optional(element) || (element.files[0].size <= param)
}, 'File size must be less than 500KB');


$.validator.addMethod("nameRequired", $.validator.methods.required, "Enter Insturctor Name");
$.validator.addMethod("emailRequired", $.validator.methods.required, "Enter Insturctor Email");
$.validator.addMethod("phoneRequired", $.validator.methods.required, "Enter Insturctor Phone");
$.validator.addMethod("profileRequired", $.validator.methods.required, "Enter Insturctor Profile");
$.validator.addMethod("photoRequired", $.validator.methods.required, "Upload Insturctor Photograph");


$.validator.addClassRules({
    instructor_name: {
        nameRequired: true
    },
    instructor_email: {
        emailRequired: true
    },
    instructor_phone: {
        phoneRequired: true,
        digits: true,
        minlength: 10,
        maxlength: 10
    },
    instructor_profile: {
        profileRequired: true
    },
    instructor_photo: {
        photoRequired: true,
        filesize: 524288,
        accept: "image/jpg,image/jpeg,image/png"
    }
});


$("#contact_form").validate({
    onkeyup: false,
    rules: {
        name: {
            required: true
        },
        email: {
            required: true,
            email: true
        },
        phone: {
            required: true,
            digits: true,
            minlength: 10,
            maxlength: 10
        },
        subject: {
            required: true
        },
        message: {
            required: true
        }
    },
    messages: {
        name: "Enter your name.",
        email: "Enter email id.",
        phone: "Enter your phone number.",
        subject: "Enter your subject.",
        message: "Enter your message."
    },
    errorPlacement: function (error, element)
    {
        error.insertAfter(element);
    },
    submitHandler: function (form)
    {
        form.submit();
    }
});

$("#contact_subscribe").validate({
    onkeyup: false,
    rules: {
        email: {
            required: true,
            email: true
        },
    },
    messages: {
        email: "Enter valid email id.",
    },
    errorPlacement: function (error, element)
    {
        error.insertAfter(element);
    },
    submitHandler: function (form)
    {
        var url = $(form).attr('action');
        $.ajax({
            type: "POST",
            url: url,
            data: $(form).serialize(), // serializes the form's elements.
            success: function (data)
            {
                $('#contact_subscribe').html(data);
            }
        });
        return false;
    }
});

$("#request_quote").validate({
    onkeyup: false,
    rules: {
        req_name: {
            required: true
        },
        req_hotel_name: {
            required: true
        },
        req_city: {
            required: true
        },
        req_state: {
            required: true
        },
        req_phone: {
            required: true
        },
        req_email: {
            required: true,
            email: true
        },
        req_hotel_brand: {
            required: true
        },
        req_build: {
            required: true
        },
        req_rooms_type: {
            required: true
        },
        req_interest: {
            required: true
        }
    },
    messages: {
        req_name: "Enter your name.",
        req_hotel_name: "Enter your hotel name.",
        req_city: "Enter city.",
        req_state: "Enter state.",
        req_email: "Enter email id.",
        req_phone: "Enter your phone number.",
        req_hotel_brand: "Enter this field",
        req_build: "Enter this field",
        req_rooms_type: "Enter your hotel brand name.",
        req_interest: "Enter items you're interested in."
    },
    errorPlacement: function (error, element)
    {
        error.insertAfter(element);
    },
    submitHandler: function (form)
    {
        form.submit();
    }
});


$("#event-register-form").validate({
    onkeyup: false,
    rules: {
        title: {
            required: true
        },
        fname: {
            required: true
        },
        lname: {
            required: true
        },
        gender: {
            required: true
        },
        dob: {
            required: true
        },
        mobile: {
            required: true,
            digits: true,
            minlength: 10,
            maxlength: 10
        },
        email1: {
            required: true,
            email: true
        },
        nationality: {
            required: true
        },
        address: {
            required: true
        },
        qualification: {
            required: true
        },
        company: {
            required: true
        },
        position: {
            required: true
        },
        company_address: {
            required: true
        },
        city: {
            required: true
        },
        state: {
            required: true
        },
        country: {
            required: true
        },
        zipcode: {
            required: true
        },
        gst_no: {
            required: function (element)
            {
                var has_gst = $("input:radio.gst-label:checked").val();
                if (has_gst == '1')
                {
                    return true;
                }
                return false;
            },
            gst: "^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$"
        },
        registered_gst_name: {
            required: function (element)
            {
                var has_gst = $("input:radio.gst-label:checked").val();
                if (has_gst == '1')
                {
                    return true;
                }
                return false;
            }
        },
        passport_no: {
            required: function (element)
            {
                var nationality = $('#nationality').val();
                if (nationality == 'Foreign')
                {
                    return true;
                }
                return false;
            }
        },
        passport: {
            required: function (element)
            {
                var nationality = $('#nationality').val();
                if (nationality == 'Foreign')
                {
                    return true;
                }
                return false;
            }
        },
        country_birth: {
            required: function (element)
            {
                var nationality = $('#nationality').val();
                if (nationality == 'Foreign')
                {
                    return true;
                }
                return false;
            }
        },
        city_birth: {
            required: function (element)
            {
                var nationality = $('#nationality').val();
                if (nationality == 'Foreign')
                {
                    return true;
                }
                return false;
            }
        },
        photo: {
            required: function (element)
            {
                var advance_form = $('#advance_form').val();
                if (advance_form == '1')
                {
                    return true;
                }
                return false;
            }
        },
        degree_certi: {
            required: function (element)
            {
                var advance_form = $('#advance_form').val();
                if (advance_form == '1')
                {
                    return true;
                }
                return false;
            }
        },
        resume: {
            required: function (element)
            {
                var advance_form = $('#advance_form').val();
                if (advance_form == '1')
                {
                    return true;
                }
                return false;
            }
        }
    },
    messages: {
        fname: "Enter first name.",
        lname: "Enter last name.",
        gender: "Select gender.",
        dob: "Select date of birth.",
        mobile: "Enter 10 digit mobile number.",
        email1: "Enter valid email address.",
        nationality: "Select nationality.",
        address: "Enter address.",
        qualification: "Enter qualification.",
        company: "Enter company/institute name.",
        position: "Enter position.",
        company_address: "Enter company/institute address.",
        city: "Enter city.",
        state: "Enter state.",
        country: "Select country.",
        zipcode: "Enter zipcode.",
        gst_no: {required: "Enter your GST number.", gst: "Enter valid GST number"},
        registered_gst_name: "Enter registered GST name",
        passport_no: "Enter your passport number.",
        passport: "Upload passport in PDF file.",
        country_birth: "Enter your country of birth.",
        city_birth: "Enter your city of birth.",
        photo: "Upload your photograph in image format.",
        degree_certi: "Upload your last degree certificate in PDF format.",
        resume: "Upload your resume in PDF format.",
    },
    errorPlacement: function (error, element)
    {
        if (element.attr("type") == "radio")
        {
            error.insertAfter($(element).parents('div.custom-control').next('div.custom-control'));
        } else if (element.attr("type") == "file")
        {
            error.insertAfter($(element).closest('span'));
            error.insertAfter($(element).closest('div.fileUpload').closest('div.mt-0'));
        } else {
            error.insertAfter(element);
        }

    },
    submitHandler: function (form)
    {
        form.submit();
    }
});

$('#nationality').on('change', function (e) {
    var val = $(this).val();
    $('#nationality_div').css('display', 'none');
    if (val == 'Foreign')
    {
        $('#nationality_div').css('display', '');
    }
});

$('.gst-label').on('change', function (e) {
    var val = $(this).val();
    $('#gst_div').css('display', 'none');
    if (val == '1')
    {
        $('#gst_div').css('display', '');
    }
});

