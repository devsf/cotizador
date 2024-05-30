//********************************************/

function bloquearPantalla() {
    waitingDialog.show();
    //$("#modal-wait").dialog("open");
}

function desbloquearPantalla() {
    waitingDialog.hide();
    //$("#modal-wait").dialog("close");
}

function fnAjaxGlobalHandler() {
    $.ajaxSetup({ cache: false });
    // Ajax events fire in following order
    $(document).ajaxStart(function () {
        bloquearPantalla();
    }).ajaxSend(function (e, xhr, opts) {
        bloquearPantalla();
    }).ajaxError(function (e, xhr,opts, thrownError) {
        if (xhr != null && (thrownError != 0 || thrownError !='')) {

           alert(xhr.status + "  " + thrownError);

            mostrarNotificacion("Error", "Ocurrió un error en la aplicación." + thrownError, "danger");
        }
     
       
    }).ajaxSuccess(function (e, xhr, opts) {
      
    }).ajaxComplete(function (e, xhr, opts) {
        desbloquearPantalla();
    }).ajaxStop(function () {
        desbloquearPantalla();
    });
}

function mostrarNotificacion(title, message, type) {
    $.notify({
        title: "<strong>" + title + "</strong>",
        message: message
    },
    {
        type: type,
        animate: {
            enter: 'animated fadeInDown',
            exit: 'animated fadeOutUp'
        },
        placement: {
            from: "bottom",
            align: "right"
        },
    }
   );
}


function mostrarTooltip(msg) {

    $("#tooltip").tooltipify({ content: "<div>" + msg + "</div>" });

}


function validaEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
function validaTelephoneNumber(telephone) {
    var regex = /^([267]{1}[0-9]{3}-[0-9]{4})$/;
    return regex.test(telephone);
}

function validaDui(dui) {
    var total = 0;
    var arregloDui = new Array();
    for (var a = 0; a <= dui.length  ; a++) {
        arregloDui.push(dui[a]);
        if (a == 8) {
            break;
        }      
    }
    var index = 0;
    for (var i = 9; i >= 2; i--) {

        total = total + (parseInt(i) * parseInt(arregloDui[index]));
        index += 1;

        if (index == 8) {
            break;
        }
    }
    var ultimo_digito = 0;
    var residuo =  parseInt(total % 10);
    if (residuo > 0)
        ultimo_digito = 10 - parseInt(total % 10);
    return ultimo_digito;
}


function parseDMY(value) {
    var date = value.split("/");
    var d = parseInt(date[0], 10),
        m = parseInt(date[1], 10),
        y = parseInt(date[2], 10);
    return new Date(y, m - 1, d);
}

function isValidDate (value, userFormat) {
    var    userFormat = userFormat || 'mm/dd/yyyy', // default format

    delimiter = /[^mdy]/.exec(userFormat)[0],
    theFormat = userFormat.split(delimiter),
    theDate = value.split(delimiter),

    isDate = function (date, format) {
        var m, d, y
        for (var i = 0, len = format.length; i < len; i++) {
            if (/m/.test(format[i])) m = date[i]
            if (/d/.test(format[i])) d = date[i]
            if (/y/.test(format[i])) y = date[i]
        }
        return (
          m > 0 && m < 13 &&
          y && y.length === 4 &&
          d > 0 && d <= (new Date(y, m, 0)).getDate()
        )
    }

    return isDate(theDate, theFormat)

}

function calcularEdad(fechaNac) {
    var fechaActual = new Date();
    var fechaNac = parseDMY(fechaNac);
    var edad = fechaActual.getFullYear() - fechaNac.getFullYear();
    return edad;

}
function ValidEmail(Is_Valid) {
    $('.fieldEmail').focusout(function (e) {
        Is_Valid[0] = true;
        $.getJSON(window.appUrl + '/Generales/IsValidEmailAsync/', { email: $(this).val() },
            function (json) {
                console.log(json);

                if (json.Data == false) {
                    Is_Valid[0] = false;
                    mostrarNotificacion("Error: ", "Debe ingresar un email válido", "danger");
                }
            }
        );
    });
}
   /*$('.fieldEmail').focusout(function (e) {
            $.ajax({
                url: '/Generales/IsValidEmailAsync/',
                data: { email : $(this).val()},
                dataType: 'jsonp',
                success: function (json) {
                    console.log(json);
                   // json = JSON.stringify(json);
                    if (json.smtp_check == false) {
                        Is_Valid[0] = false;
                        mostrarNotificacion("Error: ", "Debe ingresar un email válido", "danger");
                    }
                    // Access and use your preferred validation result objects
                    console.log(json.format_valid);
                    console.log(json.smtp_check);
                    console.log(json.score);

                }
            });
        });*/
  


    /*
    $('.fieldEmail').mailgun_validator({
        api_key: 'pubkey-edd7c8d6fcb3d7f5497c914750862761',
        in_progress: bloquearPantalla, // called when request is made to validator
        success: function (data) {
            alert("email " + data['is_valid']);
            Is_Valid = data['is_valid'];
        },         // called when validator has returned
        error: function (error) { desbloquearPantalla(); alert(error);}           // called when an error reaching the validator has occured
    });*/


