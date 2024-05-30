/// <reference path="fnCotizacionVivienda.js" />


/************************************************************************************
* Nombre:             CotizadorVivienda
* Función:            Clase que contiene la logica para el cotizador de vivienda
* Retorno:            -
* Creado por:         saleman
* Fecha Creación:     30/06/2016      
*************************************************************************************/


var cotizadorVivienda = function () {
    this.url_catalogo = "";
    this.arrIDControles = new Object();
    this.IsValidEmail = [true];
    /*Panel 1*/
    this.arrIDControles.btnPanelDatos = "#btnPanelDatos";
    this.arrIDControles.btnContinuar1 = "#btnContinuar1";
    this.arrIDControles.txtNombreAsegurado = "#txtNombreAsegurado";
    this.arrIDControles.txtApellido1Aseg = "#txtApellido1Aseg";
    this.arrIDControles.txtApellido2Aseg = "#txtApellido2Aseg";
    this.arrIDControles.txtAddress = "#txtAddress";
    this.arrIDControles.txtAgente = "#txtAgente";
    this.arrIDControles.txtTelefono = "#txtTelefono";
    this.arrIDControles.btnImprimir = "#btnImprimir";
    this.arrIDControles.txtDui = "#txtDui";
    this.arrIDControles.txtEmail = "#txtEmail";

    /*Panel 2*/

    this.arrIDControles.btnPanelBienes = "#btnPanelBienes";
    this.arrIDControles.txtUbicacionRiesgo = "#txtUbicacionRiesgo";
    this.arrIDControles.txtMontoConstruccion = "#txtMontoConstruccion";
    this.arrIDControles.txtMontoContenido = "#txtMontoContenido";
    this.arrIDControles.btnCalcular = "#btnCalcular";
    this.arrIDControles.txtPrimaNeta = "#txtPrimaNeta";

    this.arrIDControles.txtSumaAsegurada = "#txtSumaAsegurada";
    this.arrIDControles.txtImpuestoBomberos = "#txtImpuestoBomberos";
    this.arrIDControles.txtImpuestoIVA = "#txtImpuestoIVA";
    this.arrIDControles.txtPrimaTotalA = "#txtPrimaTotalA";
    this.arrIDControles.txtContado = "#txtContado";
    this.arrIDControles.txtPagoFracc = "#txtPagoFracc";
    this.arrIDControles.ddlNumCuotas = "#ddlNumCuotas";
    this.arrIDControles.txtNumPrimasIni = "#txtNumPrimasIni";
    this.arrIDControles.txtTotalPrimaIni = "#txtTotalPrimaIni";
    this.arrIDControles.txtNumPrimasFin = "#txtNumPrimasFin";
    this.arrIDControles.txtTotalPrimaFin = "#txtTotalPrimaFin";
    this.arrIDControles.btnImprimirCartaOferta = "#btnImprimirCartaOferta";
    this.arrIDControles.btnGenerarRptCartaOfer = "#btnGenerarRptCartaOferta";
    this.arrIDControles.IdModalCartaOferta = "#windowCartaOferta";
    this.arrIDControles.ddlTitulo = "#ddlTitulo";
    this.arrIDControles.ddlUsoVivienda = "#ddlUsoVivienda";


    /* Objeto que contendrá toda la informacion de la cotización*/
    this.objDatosCotizacion = new Object();
    this.objDatosCotizacion.datos_asegurado = new Object();
    //Se inicializa el id con valor cero
    this.objDatosCotizacion.id_cotizacion = 0;

    this.setUrlCatalogo = function (_url) {
        this.url_catalogo = _url;
    }
    this.setUrlCalculoPrimaMensual = function (_url) {
        this.url_calculo_prima_mensual = _url;
    }
    this.setUrlGenerarPrimaCotizacion = function (_url) {
        this.url_generar_prima_cotizacion = _url;
    }
    this.setUrlImprimirCartaOferta = function (_url) {
        this.url_imprimir_rpt_carta_oferta = _url;
    }

    this.setUrlImprimirCotizacionOferta = function (_url) {
        this.url_imprimir_rpt_oferta_vivienda = _url;
    }

    this.setLabelFormaPago = function (_fraccionado, _contado) {
        this.arrLabelFormaPago = new Object({
            pagoFraccionado: _fraccionado,
            pagoContado: _contado
        });
    }



    /*Funcion que inicializa todas la funciones de la clase*/
    this.init = function () {
        //Almacena la instancia de la clase cotizadorVivienda
        var obj = this;
        ValidEmail(obj.IsValidEmail);

        //bloquea los paneles
        $(".btn-panel-bloqueo").on('click', function (e) {
            // debugger;
            var IdBtn = $(this).prop('id').toString();
            if (IdBtn == obj.arrIDControles.btnPanelDatos) {
                $(obj.arrIDControles.btnPanelBienes).bind("click", false);
            }

        });

        /*Inicializa el tooltip de descripcion de campos*/
        $(".tooltip-question").tooltipify({
            position: "bottom",
            showEvent: "click",
            hideEvent: "focusout",
            cssClass: "tooltip-purple",
            displayAware: true,
            animationProperty : "top",
            width: 200
        });

        /*Carga de los catalogos generales*/
        obj.llenarDdlCatalogos("UVV", 0, "", obj.arrIDControles.ddlUsoVivienda);

        // Deshabilita los paneles
        $(".btn-panel").bind("click", false);
        $(".btn-print").bind("click", false);
        $(".btn-print").prop("disabled", "disabled");

        //Valida los controles numericos
        $(".numeric").numeric({ negative: false, decimal: false });


        $(".numeric-currency").numeric(",");



        $(this.arrIDControles.ddlNumCuotas).on("changed.bs.select ", function (event, clickedIndex, newValue, oldValue) {
            var valorSelecc = $(this).find("option:selected").val();
            if (valorSelecc != 0 && valorSelecc != "") {
                obj.objDatosCotizacion.num_cuotas = valorSelecc;
                var objCalculoPrima = obj.calcularPrimaMensual(obj.objDatosCotizacion.id_cotizacion, valorSelecc);
                objCalculoPrima.success(function (data, msg) {
                    if (msg === "success") {
                        if (data.Exito) {
                            obj.actualizarCamposCuotas(data.Datos, valorSelecc);
                        }

                    }
                })
            }
            // $(obj.arrIDControles.txtGMUPerson).val(accounting.formatMoney(valorCalculado));
        });


        this.actualizarCamposCuotas = function (data, valorSelecc) {
            $(obj.arrIDControles.txtTotalPrimaIni).html(accounting.formatMoney(data.prima_mensual_ini));
            $(obj.arrIDControles.txtNumPrimasIni).html(data.num_cuotas_iniciales);
            $(obj.arrIDControles.txtTotalPrimaFin).html(accounting.formatMoney(data.prima_mensual_fin));
            /*si la cuota inicial es igual a la couta definida se oculta el div de cuota final*/
            if (data.num_cuotas_iniciales == valorSelecc) {
                $(".value-cuota-fin").hide();
                $(obj.arrIDControles.txtPagoFracc).val(obj.arrLabelFormaPago.pagoContado);
            }
            else {
                $(".value-cuota-fin").show();
                $(obj.arrIDControles.txtPagoFracc).val(obj.arrLabelFormaPago.pagoFraccionado);
            }
            $(obj.arrIDControles.txtNumPrimasFin).html(valorSelecc - data.num_cuotas_iniciales);
        }

        this.getFieldsToEvaluate = function (IdCollapseFrom, objError) {
            objError.error = "";
            var arrValores = null;
            var valido = true;
            var obj = this;
            switch (IdCollapseFrom) {
                case "panelDatos":
                    arrValores = new Array();
                    arrValores.push({ object: $(obj.arrIDControles.txtNombreAsegurado), data: "datos_asegurado.txt_nombres", type: 'string', required: true });
                    arrValores.push({ object: $(obj.arrIDControles.txtApellido1Aseg), data: "datos_asegurado.txt_apellido1", type: 'string', required: true });
                    arrValores.push({ object: $(obj.arrIDControles.txtApellido2Aseg), data: "datos_asegurado.txt_apellido2", type: 'string', required: false });
                    arrValores.push({ object: $(obj.arrIDControles.txtAgente), data: "agente", type: 'string', required: false });
                    arrValores.push({ object: $(obj.arrIDControles.txtTelefono), data: "datos_asegurado.telefono", type: 'numeric', required: true });
                    arrValores.push({ object: $(obj.arrIDControles.txtDui), data: "datos_asegurado.nro_documento", type: 'dui', required: true });
                    arrValores.push({ object: $(obj.arrIDControles.txtEmail), data: "datos_asegurado.email", type: 'email', required: true });
                    break;
                case "panelBienes":
                    arrValores = new Array();
                    arrValores.push({ object: $(obj.arrIDControles.txtUbicacionRiesgo), data: "direccion", type: 'string', required: true });
                    arrValores.push({ object: $(obj.arrIDControles.txtUbicacionRiesgo), type: 'string', data: "ubicacion_riesgo", required: true });
                    arrValores.push({ object: $(obj.arrIDControles.txtMontoConstruccion), type: 'numeric', data: "monto_construccion", required: true });
                    arrValores.push({ object: $(obj.arrIDControles.txtMontoContenido), type: 'numeric', data: "monto_contenido", required: false });
                    arrValores.push({ object: $(obj.arrIDControles.ddlUsoVivienda), type: 'numeric', data: "id_uso_vivienda", required: true });
                    //arrValores.push({ object: $(obj.arrIDControles.ddlNumCuotas), type: 'numeric', data: "num_cuotas", required: true });


                    break;

                default:
                    break;
            }

            //Recorre
            $.each(arrValores, function (i, o) {
                var value = "";
                var id = this.object.prop('id').toString();
                if (id.indexOf("ddl") != -1)
                    value = this.object.find("option:selected").val();
                else
                    value = this.object.val();

                if (this.type == "numeric") {
                    value = value.replace("-", "");
                    value = (value.length == 0) ? 0 : value;
                }

                if (this.required) {
                    if (value.length == 0 || value == "" || value == 0) {
                        objError.error += " - " + $("label[for='" + id + "']").text().replace(":", "") + "<br>";
                        valido = false;
                        return false;
                    }
                }

                if (this.type == "email" && value.length > 0) {
                    if (!validaEmail(value) || obj.IsValidEmail[0] == false) {
                        objError.error += " -  " + $("label[for='" + id + "']").text().replace(":", "") + "<br>";
                        valido = false;
                        return false;
                    }
                }

                if (this.type == "telephone" && value.length > 0) {
                    if (!validaTelephoneNumber(value)) {
                        objError.error += " -  " + $("label[for='" + id + "']").text().replace(":", "") + "<br>";
                        valido = false;
                        return false;
                    }
                    value = value.replace("-", "");
                    value = (value.length == 0) ? 0 : value;
                }
                if (this.type == "dui" && value.length > 0) {
                    var ultimo_digito = value.toString().split("-")[1];
                    if (validaDui(value) != ultimo_digito) {
                        objError.error += " -  " + $("label[for='" + id + "']").text().replace(":", "") + "<br>";
                        valido = false;
                        return false;
                    }
                }
                if (this.get == "text") {
                    if (id.indexOf("ddl") != -1)
                        value = this.object.find("option:selected").text();
                    else
                        value = this.object.text();
                }
                eval("obj.objDatosCotizacion." + this.data + " = value; ");
            });
            return valido;
        }

        $(".btn-continue").on("click", function (e) {
            var IdCollapseFrom = $(this).data("collapse-from");
            var IdBtn = $(this).prop('id').toString();
            var objCollapseOpen = $("#" + $(this).data("collapse-open"));
            var objError = new Object();

            if (obj.getFieldsToEvaluate(IdCollapseFrom, objError)) {

                if (IdBtn == obj.arrIDControles.btnCalcular.replace("#", "")) {
                    obj.limpiarDatosPago();
                    obj.generarPrimaCotizacion(obj.objDatosCotizacion, true, false, objCollapseOpen);
                } else {
                    $("#" + objCollapseOpen.attr("aria-labelledby")).find(".btn-panel").unbind("click", false);
                    objCollapseOpen.collapse("show");
                }
            } else {
                mostrarNotificacion("Completar correctamente los siguientes campos<br>", objError.error, "danger");
            }
            return false;
        });




        $(obj.arrIDControles.btnImprimirCartaOferta).on("click", function (e) {
            var valorNumCoutas = $(obj.arrIDControles.ddlNumCuotas).find("option:selected").val();
            if (obj.objDatosCotizacion.id_cotizacion != 0 && (valorNumCoutas != "" && valorNumCoutas != "0")) {
                if ($(obj.arrIDControles.ddlTitulo + " option").size() == 1) {
                    obj.llenarDdlCatalogos("TIT", 0, "", obj.arrIDControles.ddlTitulo);
                }
                $(obj.arrIDControles.IdModalCartaOferta).modal('show');
            } else {
                mostrarNotificacion("Alerta: ", "Favor completar la seccion de pagos", "danger");
            }
            return false;
        });


        $(obj.arrIDControles.btnGenerarRptCartaOfer).on("click", function () {
            var valorTitulo = $(obj.arrIDControles.ddlTitulo).find("option:selected").val();
            if (obj.objDatosCotizacion.id_cotizacion != 0 && (valorTitulo != "" && valorTitulo != "0")) {
                $(obj.arrIDControles.IdModalCartaOferta).modal('hide');
                var parametros = {
                    id: obj.objDatosCotizacion.id_cotizacion,
                    id_titulo: valorTitulo
                };
                obj.mostrarReporte(obj.url_imprimir_rpt_carta_oferta, parametros);
            }
            else {
                mostrarNotificacion("Alerta: ", "Favor seleccione un titulo", "danger");
            }
            return false;
        });


        $(obj.arrIDControles.btnImprimir).on("click", function () {
            var valorNumCoutas = $(obj.arrIDControles.ddlNumCuotas).find("option:selected").val();
            if (obj.objDatosCotizacion.id_cotizacion != 0 && (valorNumCoutas != "" && valorNumCoutas != "0")) {
                var parametros = {
                    id: obj.objDatosCotizacion.id_cotizacion
                };
                obj.mostrarReporte(obj.url_imprimir_rpt_oferta_vivienda, parametros);
            }
            else {
                mostrarNotificacion("Alerta: ", "Favor completar la seccion de pagos", "danger");
            }
            return false;
        });

        $('.var_calculo_prim').on("blur changed.bs.select", function () {
            $(obj.arrIDControles.ddlNumCuotas).prop('disabled', true);
            var IsCompleted = false;


            IsCompleted = $(".c:input").filter(function () {
                var value = 0;
                var id = $(this).prop('id').toString();
                if (id.indexOf("ddl") != -1)
                    value = $.trim($(this).find("option:selected").val());
                else
                    value = $.trim($(this).val());
                return value == 0 || value.length == 0
            }).length == 0;

            if (IsCompleted) {
                var objError = new Object();
                if (obj.getFieldsToEvaluate("panelBienes", objError))
                    obj.generarPrimaCotizacion(obj.objDatosCotizacion, false, true, "");
                else 
                    mostrarNotificacion("Completar correctamente los siguientes campos<br>", objError.error, "danger");
            }



        });
    }

;

    this.llenarDdlCatalogos = function (opcion, param_int, param_str, id_control) {
        $.ajax({
            type: "POST",
            url: this.url_catalogo,
            data: "{ 'opcion':'" + opcion + "', 'param_int':" + param_int + ", 'param_str':'" + param_str + "' }",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                /*Borra todos los item menos el primer*/
                $(id_control + " option[value!='0']").remove();
                var datos = msg;
                $(datos).each(function () {
                    var option = $(document.createElement('option'));
                    option.text(this.Descripcion);
                    option.val(this.Codigo);
                    $(id_control).append(option);
                });

                if ($(id_control).prop("disabled") == true) {
                    $(id_control).prop("disabled", false);
                }
                $(id_control).selectpicker('refresh');
            }
        });
    };


    this.obtenerValoresParamRpt = function (ruta, parametro) {
        return $.ajax({
            type: "POST",
            url: this.url_get_titulo_reporte,
            data: "{ 'recurso':'" + ruta + "', 'id_parametro':'" + parametro + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });
    };



    this.generarPrimaCotizacion = function (params, send_email, listar_cuotas, objCollapseOpen) {
        var obj = this;
        var datos = JSON.stringify(params);
        datos = datos.replace(/"/g, '\\"');
        return $.ajax({
            type: "POST",
            url: this.url_generar_prima_cotizacion,
            data: "{ 'param':'" + datos + "', 'send_email':" + send_email + " }",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, mgs) {
                if (mgs === "success") {
                    var datos;
                    if (data.Exito) {
                        datos = eval('(' + data.Datos + ')')[0];
                        obj.objDatosCotizacion.monto_construccion = datos.monto_construccion;
                        obj.objDatosCotizacion.monto_contenido = datos.monto_contenido;
                        obj.objDatosCotizacion.monto_suma_asegurada = datos.monto_suma_asegurada;
                        obj.objDatosCotizacion.monto_incendio_construccion = datos.monto_incendio_construccion;
                        obj.objDatosCotizacion.monto_tasa_terremoto = datos.monto_tasa_terremoto;
                        obj.objDatosCotizacion.monto_incendio_contenido = datos.monto_incendio_contenido;
                        obj.objDatosCotizacion.monto_tasa_contenido = datos.monto_tasa_contenido;
                        obj.objDatosCotizacion.monto_impuesto_bomberos = datos.monto_impuesto_bomberos;
                        obj.objDatosCotizacion.monto_riesgo_contenido = datos.monto_riesgo_contenido;
                        obj.objDatosCotizacion.monto_riesgo_construccion = datos.monto_riesgo_construccion;

                        obj.objDatosCotizacion.contado = datos.contado;
                        obj.objDatosCotizacion.num_cuotas = datos.num_cuotas;
                        obj.objDatosCotizacion.prima_mensual_ini = datos.prima_mensual_ini;
                        obj.objDatosCotizacion.prima_mensual_fin = datos.prima_mensual_fin;

                        obj.objDatosCotizacion.monto_iva = datos.monto_iva;
                        obj.objDatosCotizacion.monto_prima_total_anual = datos.monto_prima_total_anual + datos.monto_pago_bomberos;
                        obj.objDatosCotizacion.id_cotizacion = data.IdInsertado;

                        if (listar_cuotas)
                            obj.llenarCuotasPermitidas(obj.objDatosCotizacion.monto_prima_total_anual, datos.prima_couta_minima);

                       
                        obj.actualizarCamposCuotas(datos, datos.num_cuotas);
                        $(obj.arrIDControles.txtPrimaNeta).html(accounting.formatMoney(datos.monto_prima_neta));
                        $(obj.arrIDControles.txtImpuestoBomberos).html(accounting.formatMoney(obj.objDatosCotizacion.monto_impuesto_bomberos));
                        $(obj.arrIDControles.txtSumaAsegurada).html(accounting.formatMoney(obj.objDatosCotizacion.monto_suma_asegurada));
                        $(obj.arrIDControles.txtImpuestoIVA).html(accounting.formatMoney(obj.objDatosCotizacion.monto_iva));
                        $(obj.arrIDControles.txtPrimaTotalA).html(accounting.formatMoney(obj.objDatosCotizacion.monto_prima_total_anual));
                        $(".btn-print").unbind("click", false);
                        $(".btn-print").prop("disabled", "");
                       // $(obj.arrIDControles.ddlNumCuotas).trigger("changed.bs.select ");
                    
                        if (objCollapseOpen.length > 0) {
                            $("#" + objCollapseOpen.attr("aria-labelledby")).find(".btn-panel").unbind("click", false);
                            objCollapseOpen.collapse("show");
                        }

                    }
                    else
                        mostrarNotificacion("Error: ", data.Mensaje, "danger");
                }
            }

        });
    };


    this.calcularPrimaMensual = function (id_cotizacion, num_cuotas) {
        return $.ajax({
            type: "POST",
            url: this.url_calculo_prima_mensual,
            data: "{ 'id_cotizacion':" + id_cotizacion + ", 'num_cuotas': " + num_cuotas + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });
    };





    this.llenarCuotasPermitidas = function (monto_prima_total_anual, min_prima_mensual) {
        var coutasMax = 12;
        $(this.arrIDControles.ddlNumCuotas + " option[value!='0']").remove();
        for (var i = 1; i <= coutasMax ; i++) {
            if ((parseFloat(monto_prima_total_anual) / parseFloat(min_prima_mensual)) > i) {
                var option = $(document.createElement('option'));
                option.text(i);
                option.val(i);
                $(this.arrIDControles.ddlNumCuotas).append(option);
            } else {
                break;
            }
        }
                $(this.arrIDControles.ddlNumCuotas).prop('disabled', false);
        $(this.arrIDControles.ddlNumCuotas).val('1');
        $(this.arrIDControles.ddlNumCuotas).trigger("changed.bs.select");

        $(this.arrIDControles.ddlNumCuotas).selectpicker('refresh');
    }


    this.llenarDdlCatalogos = function (opcion, param_int, param_str, id_control) {
        $.ajax({
            type: "POST",
            url: this.url_catalogo,
            data: "{ 'opcion':'" + opcion + "', 'param_int':" + param_int + ", 'param_str':'" + param_str + "' }",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                /*Borra todos los item menos el primer*/
                $(id_control + " option[value!='0']").remove();
                var datos = msg;
                $(datos).each(function () {
                    var option = $(document.createElement('option'));
                    option.text(this.Descripcion);
                    option.val(this.Codigo);
                    $(id_control).append(option);
                });

                if ($(id_control).prop("disabled") == true) {
                    $(id_control).prop("disabled", false);
                }
                $(id_control).selectpicker('refresh');
            }
        });
    };


    this.limpiarDatosPago = function () {
       // $(this.arrIDControles.ddlNumCuotas).val("");
        $(this.arrIDControles.txtPagoFracc).val("");
        $(this.arrIDControles.txtTotalPrimaIni).html("");
        $(this.arrIDControles.txtTotalPrimaFin).html("");
        $(this.arrIDControles.txtNumPrimasIni).html("");
        $(this.arrIDControles.txtNumPrimasFin).html("");
    }

    this.mostrarReporte = function (_url, parametros) {
        window.open(_url + '?' + $.param(parametros), 'blank', '', false);
    }

};



