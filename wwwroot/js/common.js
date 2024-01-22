function validate_email(email) {
    //var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var emailReg = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!emailReg.test(email)) { return false; }
    else { return true; }
}

function validate_password(password) {
    debugger;
    //var regexp = /^[A-Za-z0-9\d=!\-@._*]*$/;
    var regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%&])(.{8,20}$)/;
    if (!(regexp.test(password))) {
        return false;
    }
    else {
        return true;
    }
}

function validate_mobile(mobile) {
    if (mobile.match(/[^\d]/)) { return false; }
    else if (mobile.length != 10) { return false; }
    else { return true; }
}

function ValidatePAN(pan) {
    var regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
    if (regex.test(pan)) { return true; } else { return false; }
}

function ValidateGST(gst) {
    var regex = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;
    if (regex.test(gst)) {
        return true;
    } else {
        return false;
    }
}
function ValidateCIN(cin) {
    var regex = /([L/U]){1}\d{5}([A-Z]){2}\d{4}([A-Z]){3}\d{6}/;
    if (regex.test(cin)) {
        return true;
    } else {
        return false;
    }
}
function convertToJavaScriptDate(value) {
    var pattern = /Date\(([^)]+)\)/;
    var results = pattern.exec(value);
    var dt = new Date(parseFloat(results[1]));
    var dat = ""; var mnth = "";
    if (dt.getDate() < 10) { dat = "0" + dt.getDate(); } else { dat = dt.getDate(); }
    if ((dt.getMonth() + 1) < 10) { mnth = "0" + (dt.getMonth() + 1); } else { mnth = (dt.getMonth() + 1); }
    return dat + "-" + mnth + "-" + dt.getFullYear();
}

$("body").on("keypress",".number",function (event) {
    if (event.keyCode < 48 || event.keyCode > 57) { event.preventDefault(); }
});

$("body").on("paste", ".number", function (event) {
    if (event.originalEvent.clipboardData.getData('Text').match(/[^\d]/)) {
        event.preventDefault();
    }
});

$("body").on("keypress", ".alphabet", function (event){
    if (!((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || event.keyCode == 32)) {
        event.preventDefault();
    }
});

$("body").on("keypress", ".alpha_numeric", function (event){
    var key = event.which;
    if (!(key == 32 || (key >= 65 && key <= 90) || (key >= 97 && key <= 122) || (key >= 46 && key <= 57) || key == 44 || key == 45)) {
        event.preventDefault();
    }
});

$("body").on("paste", ".alpha_numeric", function (e){
    e.preventDefault();
});

$("body").on("keypress", ".only_alpha_numeric", function (event){
    var key = event.which;
    if (!((key >= 65 && key <= 90) || (key >= 97 && key <= 122) || (key >= 46 && key <= 57))) {
        event.preventDefault();
    }
});

$("body").on("keypress", ".decimal", function (event){
    var $this = $(this);
    if ((event.which != 46 || $this.val().indexOf('.') != -1) &&
        ((event.which < 48 || event.which > 57) &&
            (event.which != 0 && event.which != 8))) {
        event.preventDefault();
    }

    var text = $(this).val();
    if ((event.which == 46) && (text.indexOf('.') == -1)) {
        setTimeout(function () {
            if ($this.val().substring($this.val().indexOf('.')).length > 3) {
                $this.val($this.val().substring(0, $this.val().indexOf('.') + 3));
            }
        }, 1);
    }

    if ((text.indexOf('.') != -1) &&
        (text.substring(text.indexOf('.')).length > 4) &&
        (event.which != 0 && event.which != 8) &&
        ($(this)[0].selectionStart >= text.length - 2)) {
        event.preventDefault();
    }
});

$("body").on("paste", ".decimal", function (e) {
    var text = e.originalEvent.clipboardData.getData('Text');
    if ($.isNumeric(text)) {
        if ((text.substring(text.indexOf('.')).length > 3) && (text.indexOf('.') > -1)) {
            e.preventDefault();
            $(this).val(text.substring(0, text.indexOf('.') + 3));
        }
    }
    else {
        e.preventDefault();
    }
});

$(".Contactnumber").keypress(function (e) {
    if ((e.keyCode < 48 || e.keyCode > 57) && e.keyCode != 32 && e.keyCode != 40 && e.keyCode != 41 && e.keyCode != 43 && e.keyCode != 45) {
        e.preventDefault();
    }
});

$(".Contactnumber").on("paste", function (event) {
    if (event.originalEvent.clipboardData.getData('Text').match(/[^\d]/)) {
        event.preventDefault();
    }
});

$("body").on("change", ".emailid", function (e) {
    if ($(this).val() != "")  {
        var eml = $(this).val();
        if (validate_email(eml)) {
            $(this).next("label").remove();
        }
        else {
            $(this).next("label").remove();
            $(this).after('<label class="error mt-2 text-danger">Please enter valid email</label>');
            $(this).focus();
        }
    }
});

$("body").on("keypress", ".emailid", function (e){
    if ((e.which === 32 || e.which === 43 || e.which === 45 || e.which === 46 || e.which === 95) && !this.value.length) { e.preventDefault(); }
    else { var eml = $(this).val(); $(this).val(eml.toLowerCase()); }
});

$("body").on("keypress", ".phone_no", function (e) {
    if ((e.which < 48 || e.which > 57) && e.which != 40 && e.which != 41 && e.which != 43 && e.which != 45) { e.preventDefault(); }
});

$("body").on("keyup change", ".removeValidation", function () {
    if ($(this).val() != "") {
        $(this).next("label").remove();
    }
});

$("body").on("paste", ".avoid_paste", function (e){
    e.preventDefault();
});

$("body").on("keyup paste", ".restrict_space", function (event) {
    $(this).val($(this).val().replace(/ /g, ""));
});

$("body").on("keypress paste", ".restrict_first_space", function (e) {
    if (e.which === 32 && !this.value.length) { e.preventDefault(); }
});

function Paginator(Current, First, Last, Total, Next, Prev) {
    $("#paginator").html("");
    var html = `<li class="page-item"><a href="javascript:void(0)" class="page-link btnPage" data-index="${Prev}"><i class="mdi mdi-chevron-left"></i></a></li>`;
    var lastwise = parseInt(Last - Current);
    if (Total <= 5) {
        for (var i = 1; i <= Total; i++) {
            if (i == Current) {
                html += `<li class="page-item active"><a href="javascript:void(0)" class="page-link btnPage" data-index="${i}">${i}</a></li>`;
            }
            else {
                html += `<li class="page-item"><a class="page-link btnPage" href="javascript:void(0)" data-index="${i}">${i}</a></li>`;
            }
        }
    }
    else if (Total > 5 && Current <= 3) {
        if (Total < 6) {
            for (var i = 1; i <= 5; i++) {
                if (i == Current) {
                    html += `<li class="page-item active"><a href="javascript:void(0)" class="page-link btnPage" data-index="${i}">${i}</a></li>`;
                }
                else {
                    html += `<li class="page-item"><a href="javascript:void(0)" class="page-link btnPage" data-index="${i}">${i}</a></li>`;
                }
            }
        }
        else {
            for (var i = 1; i <= 4; i++) {
                if (i == Current) {
                    html += `<li class="page-item active" ><a href="javascript:void(0)" class="page-link btnPage" data-index="${i}">${i}</a></li>`;
                }
                else {
                    html += `<li class="page-item"><a href="javascript:void(0)" class="page-link btnPage" data-index="${i}">${i}</a></li>`;
                }
            }
            html += `<li class="page-item p-dots">…</li>`;
            html += `<li class="page-item"><a href="javascript:void(0)" class="page-link btnPage" data-index="${Last}">${Last}</a></li>`;
        }
    }
    else if (Total > 5 && Current > 3 && lastwise <= 3) {
        html += `<li class="page-item"><a href="javascript:void(0)" class="page-link btnPage" data-index="${First}">${First}</a></li>`;
        html += `<li class="page-item p-dots">…</li>`;
        if (lastwise == 0) {
            html += `<li class="page-item"><a href="javascript:void(0)" class="page-link btnPage" data-index="${parseInt(Current - 3)}">${parseInt(Current - 3)}</a></li>`;
            html += `<li class="page-item"><a href="javascript:void(0)" class="page-link btnPage" data-index="${parseInt(Current - 2)}">${parseInt(Current - 2)}</a></li>`;
            html += `<li class="page-item"><a href="javascript:void(0)" class="page-link btnPage" data-index="${parseInt(Current - 1)}">${parseInt(Current - 1)}</a></li>`;
            html += `<li class="page-item active"><a href="javascript:void(0)" class="page-link btnPage" data-index="${Current}">${Current}</a></li>`;
        }
        if (lastwise == 1) {

            html += `<li class="page-item"><a href="javascript:void(0)" class="page-link btnPage" data-index="${parseInt(Current - 2)}">${parseInt(Current - 2)}</a></li>`;
            html += `<li class="page-item"><a href="javascript:void(0)" class="page-link btnPage" data-index="${parseInt(Current - 1)}">${parseInt(Current - 1)}</a></li>`;
            html += `<li class="page-item active"><a href="javascript:void(0)" class="page-link btnPage" data-index="${Current}">${Current}</a></li>`;
            html += `<li class="page-item"><a href="javascript:void(0)" class="page-link btnPage" data-index="${parseInt(Current + 1)}">${parseInt(Current + 1)}</a></li>`;
        }
        if (lastwise == 2) {
            html += `<li class="page-item"><a href="javascript:void(0)" class="page-link btnPage" data-index="${parseInt(Current - 1)}">${parseInt(Current - 1)}</a></li>`;
            html += `<li class="page-item active"><a href="javascript:void(0)" class="page-link btnPage" data-index="${Current}">${Current}</a></li>`;
            html += `<li class="page-item"><a href="javascript:void(0)" class="page-link btnPage" data-index="${parseInt(Current + 1)}">${parseInt(Current + 1)}</a></li>`;
            html += `<li class="page-item"><a href="javascript:void(0)" class="page-link btnPage" data-index="${parseInt(Current + 2)}">${parseInt(Current + 2)}</a></li>`;
        }
        if (lastwise == 3) {
            html += `<li class="page-item"><a href="javascript:void(0)" class="page-link btnPage" data-index="${parseInt(Current - 1)}">${parseInt(Current - 1)}</a></li>`;
            html += `<li class="page-item active"><a href="javascript:void(0)" class="page-link btnPage" data-index="${Current}">${Current}</a></li>`;
            html += `<li class="page-item"><a href="javascript:void(0)" class="page-link btnPage" data-index="${parseInt(Current + 1)}">${parseInt(Current + 1)}</a></li>`;
            html += `<li class="page-item p-dots">…</li>`;
            html += `<li class="page-item"><a href="javascript:void(0)" class="page-link btnPage" data-index="${Last}">${Last}</a></li>`;
        }
    }
    else if (Total > 5 && Current > 3 && lastwise > 3) {
        html += `<li class="page-item"><a href="javascript:void(0)" class="page-link btnPage" data-index="${First}">${First}</a></li>`;
        html += `<li class="page-item p-dots">…</li>`;
        html += `<li class="page-item"><a href="javascript:void(0)" class="page-link btnPage" data-index="${parseInt(Current - 1)}">${parseInt(Current - 1)}</a></li>`;
        html += `<li class="page-item active"><a href="javascript:void(0)" class="page-link btnPage" data-index="${Current}">${Current}</a></li>`;
        html += `<li class="page-item"><a href="javascript:void(0)" class="page-link btnPage" data-index="${parseInt(Current + 1)}">${parseInt(Current + 1)}</a></li>`;
        html += `<li class="page-item p-dots">…</li>`;
        html += `<li class="page-item"><a href="javascript:void(0)" class="page-link btnPage" data-index="${Last}">${Last}</a></li>`;
    }
    html += `<li class="page-item"><a href="javascript:void(0)" class="page-link btnPage" data-index="${Next}"><i class="mdi mdi-chevron-right"></i></a></li>`;
    $("#paginator").html(html);
}



function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);
        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, {
        type: contentType
    });
    return blob;
}