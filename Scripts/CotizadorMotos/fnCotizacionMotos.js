

/************************************************************************************
* Nombre:             cotizadorAutos
* Función:            Clase que contiene la logica para el cotizador de autos
* Retorno:            -
* Creado por:         saleman
* Fecha Creación:     02/05/2016      
*************************************************************************************/


var cotizadorMotos = function () {
    this.cod_marca = 0;
    this.url_catalogo = "";
    this.IsValidEmail = [true];
    this.arrIDControles = new Object();
    this.arrIDControles.ddlModelo = "#ddlModelo";
    this.arrIDControles.ddlMarca = "#ddlMarca";
    this.arrIDControles.ddlOrigen = "#ddlOrigen";
    this.arrIDControles.txtCobertura1 = "#txtCobertura1";
    this.arrIDControles.txtCobertura2 = "#txtCobertura2";
    this.arrIDControles.txtCobertura3 = "#txtCobertura3";
    this.arrIDControles.txtCobertura4 = "#txtCobertura4";
    this.arrIDControles.txtCobertura5 = "#txtCobertura5";
    this.arrIDControles.txtCobertura6 = "#txtCobertura6";
    this.arrIDControles.btnContinuar1 = "#btnContinuar";
    this.arrIDControles.btnContinuar2 = "#btnContinuar2";
    this.arrIDControles.btnContinuar3 = "#btnContinuar3";
    this.arrIDControles.btnImprimir = "#btnImprimir";
    this.arrIDControles.txtNombreAsegurado = "#txtNombreAsegurado";
    this.arrIDControles.txtApellido1Aseg = "#txtApellido1Aseg";
    this.arrIDControles.txtApellido2Aseg = "#txtApellido2Aseg";
    this.arrIDControles.txtAddress = "#txtAddress";
    this.arrIDControles.txtAgente = "#txtAgente";
    this.arrIDControles.ddlAnio = "#ddlAnio";
    this.arrIDControles.txtTelefono = "#txtTelefono";

    this.arrIDControles.ddlUsoVehiculo = "#ddlUsoVehiculo";

    this.arrIDControles.txtDeducibleEvento = "#txtDeducibleEvento";
    this.arrIDControles.txtSubTotalPA = "#txtSubTotalPA";
    this.arrIDControles.txtPrimaNeta = "#txtPrimaNeta";
    this.arrIDControles.txtImpuestoIVA = "#txtImpuestoIVA";
    this.arrIDControles.txtPrimaTotalA = "#txtPrimaTotalA";
    this.arrIDControles.txtContado = "#txtContado";
    this.arrIDControles.txtPagoFracc = "#txtPagoFracc";
    this.arrIDControles.ddlNumCuotas = "#ddlNumCuotas";
    this.arrIDControles.txtNumPrimasIni = "#txtNumPrimasIni";
    this.arrIDControles.txtTotalPrimaIni = "#txtTotalPrimaIni";
    this.arrIDControles.txtNumPrimasFin = "#txtNumPrimasFin";
    this.arrIDControles.txtTotalPrimaFin = "#txtTotalPrimaFin";
    this.arrIDControles.btnPanelBienes = "#btnPanelBienes";
    this.arrIDControles.btnPanelDatos = "#btnPanelDatos";
    this.arrIDControles.btnPanelCoberturas = "#btnPanelCoberturas";
    this.arrIDControles.btnPanelPagos = "#btnPanelPagos";
    this.arrIDControles.txtDui = "#txtDui";
    this.arrIDControles.txtEmail = "#txtEmail";
    this.arrIDControles.btnImprimirCartaOferta = "#btnImprimirCartaOferta";
    this.arrIDControles.btnDescargarPDF = "#btnDescargarPDF";

    /* Objeto que contendrá toda la informacion de la cotización*/
    this.objDatosCotizacion = new Object();
    //Se inicializa el id con valor cero
    this.objDatosCotizacion.id_cotizacion = 0;
    this.maxCuotas = 6;
    this.minSumaAsegurada = 0;
    this.maxSumaAsegurada = 0;
    this.objDatosCotizacion.datos_asegurado = new Object();
    this.objDatosCotizacion.id_producto_ant = 1;
    this.url_imprimir_rpt_oferta_ind = window.appUrl + '/ManejoReportes/ImprimirOfertaMotos';


    this.setLabelFormaPago = function (_fraccionado, _contado) {
        this.arrLabelFormaPago = new Object({
            pagoFraccionado: _fraccionado,
            pagoContado: _contado
        });
    }
    this.setParametrosGlobales = function (num, value) {
        switch (num) {
            case 14: { //Contiene la antiguedad permitida para cotizar un auto
                this.paramAntiguedadPermitida = (value == null) ? 0 : value;
                this.llenarAniosPermitidos(this.paramAntiguedadPermitida);
                break;
            }
            case 15: //Contiene la couta minima mensual 
                this.paramCuotaMin = (value == null) ? 0 : value;
                break;
            case 16://Contiene la proporcion individual de la cobertura de gm a terceros 
                this.maxCuotas = (value == null) ? 0 : value;
                break;
            case 17://
                this.minSumaAsegurada = (value == null) ? 0 : value;
                break;
            case 18:
                this.maxSumaAsegurada = (value == null) ? 0 : value;
                break;
         
            default:

        }

    }

    /*Funcion que inicializa todas la funciones de la clase*/
    this.init = function () {
        //Almacena la instancia de la clase cotizadorAutos
        var obj = this;

        ValidEmail(obj.IsValidEmail);

        //bloquea los paneles
        $(".btn-panel-bloqueo").on('click', function (e) {
            // debugger;
            var IdBtn = $(this).prop('id').toString();
            if (IdBtn == "btnPanelBienes") {
                $(".btn-panel:not(#" + IdBtn + ")").bind("click", false);
            } else if (IdBtn == "btnPanelCoberturas") {
                $("#btnPanelPagos").bind("click", false);
            }

        });

        // Deshabilita los paneles
        $(".btn-panel").bind("click", false);

        //Valida los controles numericos
        $(".numeric").numeric({ negative: false, decimal: false });


        $(".numeric-currency").numeric(",");

        /*Obtiene los parametros globales necesarios*/
        obj.getParametrosGlobales(0);

        /*Carga de los catalogos generales*/
        obj.llenarDdlCatalogos("MMO", 0, "", obj.arrIDControles.ddlMarca);
        obj.llenarDdlCatalogos("ORM", 0, "", obj.arrIDControles.ddlOrigen);
        obj.llenarDdlCatalogos("USO", 0, "", obj.arrIDControles.ddlUsoVehiculo);
    
        /*al cambiar la marca lista los modelos disponibles*/
        $(obj.arrIDControles.ddlMarca).on("changed.bs.select ", function (event, clickedIndex, newValue, oldValue) {
            var selected = $(this).find("option:selected").val();
            $(obj.arrIDControles.ddlModelo).prop("disabled", true);
 
            $(obj.arrIDControles.ddlModelo).selectpicker('refresh');
            if (selected != 0) {
                obj.llenarDdlCatalogos("MOD", selected, "", obj.arrIDControles.ddlModelo);
                if (newValue) {
                    $("#contenedorCoberturas").html("");
                }
            }

        });


        $(this.arrIDControles.ddlNumCuotas).on("changed.bs.select ", function (event, clickedIndex, newValue, oldValue) {
            var valorSelecc = $(this).find("option:selected").val();
            obj.limpiarDatosPago();
            if (valorSelecc != 0 && valorSelecc != "") {
                var objCalculoPrima = obj.calcularPrimaMensual(obj.objDatosCotizacion.id_cotizacion, valorSelecc);
                objCalculoPrima.success(function (data, msg) {
                    if (msg === "success") {
                        if (data.Exito) {
                            $(obj.arrIDControles.txtTotalPrimaIni).html(accounting.formatMoney(data.Datos.prima_mensual_ini));
                            $(obj.arrIDControles.txtNumPrimasIni).html(data.Datos.num_cuotas_iniciales);
                            $(obj.arrIDControles.txtTotalPrimaFin).html(accounting.formatMoney(data.Datos.prima_mensual_fin));
                            /*si la cuota inicial es igual a la couta definida se oculta el div de cuota final*/
                            if (1== valorSelecc) {
                             
                                $(obj.arrIDControles.txtPagoFracc).val(obj.arrLabelFormaPago.pagoContado);
                                $("#txtPrefijoCuota").html("cuota");
                                $("#txtSufijoCuota").html("");
                                $(".value-cuota-fin").hide();
                            }
                            else {
                               
                                $(obj.arrIDControles.txtPagoFracc).val(obj.arrLabelFormaPago.pagoFraccionado);
                                if (data.Datos.num_cuotas_iniciales == valorSelecc) {
                                    $("#txtPrefijoCuota").html("cuotas de");
                                    $("#txtSufijoCuota").html("mensuales y sucesivas");
                                    $(".value-cuota-fin").hide();
                                }
                                else {
                                    $("#txtPrefijoCuota").html("cuota");
                                    $("#txtSufijoCuota").html("");
                                    $(".value-cuota-fin").show();
                                }
                            }
                         
                            $(obj.arrIDControles.txtNumPrimasFin).html(valorSelecc - data.Datos.num_cuotas_iniciales);
                        }
                    }
                })
            }
            // $(obj.arrIDControles.txtGMUPerson).val(accounting.formatMoney(valorCalculado));
        });


 
        $("#btnModificar").on("click", function (e) {
            $("#panelCoberturas").collapse("show");
        });

        $(".btn-continue").on("click", function (e) {
            var IdCollapseFrom = $(this).data("collapse-from");
            var IdBtn = $(this).prop('id').toString();
            var objCollapseOpen = $("#" + $(this).data("collapse-open"));
            var objError = new Object();

            if (obj.getFieldsToEvaluate(IdCollapseFrom, objError)) {
      

                if (IdBtn == obj.arrIDControles.btnContinuar3.replace("#", "")) {


                    obj.generarPrimaCotizacion(obj.objDatosCotizacion, objCollapseOpen, true);
                }
                else if (IdBtn == obj.arrIDControles.btnContinuar2.replace("#", ""))
                {
                    $(obj.arrIDControles.txtCobertura1).val("");
                    $(obj.arrIDControles.txtCobertura2).val("");
                    $(obj.arrIDControles.txtCobertura3).val("");
                    $(obj.arrIDControles.txtCobertura4).val("");
                    $(obj.arrIDControles.txtCobertura5).val("");
                    $(obj.arrIDControles.txtCobertura6).val("");
                    $(obj.arrIDControles.txtDeducibleEvento).val("");
                    obj.limpiarDatosPago();
                    $("#" + objCollapseOpen.attr("aria-labelledby")).find(".btn-panel").unbind("click", false);
                    objCollapseOpen.collapse("show");
                }
                else{
                    $("#" + objCollapseOpen.attr("aria-labelledby")).find(".btn-panel").unbind("click", false);
                    objCollapseOpen.collapse("show");
                }
            } else {
                mostrarNotificacion("Completar correctamente los siguientes campos<br>", objError.error, "danger");
            }
            return false;
        });

        $('.var_calculo_prim').on("blur changed.bs.select", function () {
            $(obj.arrIDControles.ddlNumCuotas).prop('disabled', true);
            var IsCompleted = false;

            IsCompleted = $(".var_calculo_prim:input").filter(function () {
                var value = 0;
                var id = $(this).prop('id').toString();
                if (id.indexOf("ddl") != -1)
                    value = $.trim($(this).find("option:selected").val());
                else
                    value = $.trim($(this).val());
                return value == 0 || value.length == 0
            }).length == 0;

            if (IsCompleted) {

                var vDanioPropios = parseFloat($(obj.arrIDControles.txtCobertura1).val().replace("$", "").replace(",", ""));
                if (vDanioPropios <= obj.maxSumaAsegurada && vDanioPropios >= obj.minSumaAsegurada) {
                    var objError = new Object();
                    obj.getFieldsToEvaluate("panelCoberturas", objError);
                    obj.generarPrimaCotizacion(obj.objDatosCotizacion, "", false);

                  
                } else {
                    $(obj.arrIDControles.txtCobertura1).val(accounting.formatMoney(obj.minSumaAsegurada));
                    $(obj.arrIDControles.txtCobertura2).val("");
                    $(obj.arrIDControles.txtCobertura3).val("");
                    $(obj.arrIDControles.txtCobertura4).val("");
                    $(obj.arrIDControles.txtCobertura5).val("");
                    $(obj.arrIDControles.txtCobertura6).val("");
                    $(obj.arrIDControles.txtDeducibleEvento).val("");
                    mostrarNotificacion("Favor completar con valores permitidos", "La suma mínima a ingresar es de " + accounting.formatMoney(obj.minSumaAsegurada) + " y la suma máxima es de " + accounting.formatMoney(obj.maxSumaAsegurada), "info");

                }
            }

        })

        $(obj.arrIDControles.btnDescargarPDF).on('click', function (e) {
            window.open('../pdf/Instructivo_Autoinspeccion_Motocicletas.pdf', '_blank', '', true);
            return false;
        });

        $(obj.arrIDControles.btnImprimir).on("click", function (e) {
            var valorNumCoutas = $(obj.arrIDControles.ddlNumCuotas).find("option:selected").val();
            if (obj.objDatosCotizacion.id_cotizacion != 0 && (valorNumCoutas != "" && valorNumCoutas != "0")) {
                var parametros = {
                    id: obj.objDatosCotizacion.id_cotizacion
                };
                obj.mostrarReporte(obj.url_imprimir_rpt_oferta_ind, parametros);


            } else {
                mostrarNotificacion("Alerta: ", "Favor completar la seccion de pagos", "danger");
            }
            return false;
        });


        $(obj.arrIDControles.btnImprimirCartaOferta).on("click", function (e) {
            var valorNumCoutas = $(obj.arrIDControles.ddlNumCuotas).find("option:selected").val();
            if (obj.objDatosCotizacion.id_cotizacion != 0 && (valorNumCoutas != "" && valorNumCoutas != "0")) {
                
            } else {
                mostrarNotificacion("Alerta: ", "Favor completar la seccion de pagos", "danger");
            }
            return false;
        });
    }

    this.llenarDdlCatalogos = function (opcion, param_int, param_str, id_control) {
        $.ajax({
            type: "POST",
            url: window.appUrl + '/Generales/GetCatalogo',
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
            url: window.appUrl + '/ManejoReportes/getValoresParam',
            data: "{ 'recurso':'" + ruta + "', 'id_parametro':'" + parametro + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });
    };





    this.generarPrimaCotizacion = function (params, objCollapseOpen, send_email) {
        var obj = this;
        var datos = JSON.stringify(params);
        datos = datos.replace(/"/g, '\\"');
        return $.ajax({
            type: "POST",
            url: window.appUrl + '/CotizadorMotos/GenerarPrimaCotizacion',
            data: "{ 'param':'" + datos + "', send_email: " + send_email + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, mgs) {
                if (mgs === "success") {
                    var datos;
                    if (data.Exito && data.Datos.length > 0) {
                        datos = eval('(' + data.Datos + ')')[0];
                        obj.objDatosCotizacion.monto_prima_neta = datos.monto_prima_neta;
                        obj.objDatosCotizacion.monto_iva = datos.monto_iva;
                        obj.objDatosCotizacion.monto_prima_total_anual = datos.monto_prima_total_anual;
                        obj.objDatosCotizacion.id_cotizacion = data.IdInsertado;
                        obj.objDatosCotizacion.id_cotizacion = data.IdInsertado;
                        $(obj.arrIDControles.txtTotalPrimaIni).html(obj.objDatosCotizacion.prima_mensual_ini);
                        $(obj.arrIDControles.txtPrimaNeta).html(accounting.formatMoney(obj.objDatosCotizacion.monto_prima_neta));
                        $(obj.arrIDControles.txtImpuestoIVA).html(accounting.formatMoney(obj.objDatosCotizacion.monto_iva));
                        $(obj.arrIDControles.txtPrimaTotalA).html(accounting.formatMoney(obj.objDatosCotizacion.monto_prima_total_anual));
                        $(obj.arrIDControles.txtDeducibleEvento).val(accounting.formatMoney(datos.monto_deducible_evento));
                        $(obj.arrIDControles.txtCobertura2).val(accounting.formatMoney(datos.SumaRC));
                        $(obj.arrIDControles.txtCobertura3).val(accounting.formatMoney(datos.monto_danio_prop));
                        $(obj.arrIDControles.txtCobertura4).val(accounting.formatMoney(datos.SumaMuerteAccidental));
                        $(obj.arrIDControles.txtCobertura5).val(datos.CubiertoAsistenciaExequial);
                        $(obj.arrIDControles.txtCobertura6).val(datos.CubiertoAsistenciaVial);
                        if (!send_email)
                            obj.llenarCuotasPermitidas(obj.objDatosCotizacion.monto_prima_total_anual, obj.paramCuotaMin, obj.maxCuotas);

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
            url: window.appUrl + '/CotizadorMotos/CalcularPrimaMensual',
            data: "{ 'id_cotizacion':" + id_cotizacion + ", 'num_cuotas': " + num_cuotas + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });
    };




    this.getParametrosGlobales = function (id_parametro) {
        var obj = this;
        return $.ajax({
            type: "POST",
            url: window.appUrl + '/Generales/GetParametrosGenerales',
            data: "{ 'id_parametro': " + id_parametro + ", cod_ramo:18}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, mj) {
                if (mj == "success") {
                    var value;
                    $.each(data, function (i, o) {
                        value = "";
                        if (typeof this.sn_parametro != "undefined" && this.sn_parametro != null)
                            value = this.sn_parametro;
                        else if (typeof this.fec_parametro != "undefined" && this.fec_parametro != null)
                            value = this.fec_parametro;
                        else if (typeof this.nro_param != "undefined" && this.nro_param != null)
                            value = this.nro_param;
                        else if (typeof this.txt_param != "undefined" && this.txt_param != null)
                            value = this.txt_param;
                        else if (typeof this.pje_param != "undefined" && this.pje_param != null)
                            value = this.pje_param;
                        else if (typeof this.imp_param != "undefined" && this.imp_param != null)
                            value = this.imp_param;
                        else
                            value = null;

                        obj.setParametrosGlobales(this.id_parametro, value);
                    });
                }
            }
        });
    };


    this.llenarAniosPermitidos = function (numAniosPermitidos) {
        var date = new Date();
        $(this.arrIDControles.ddlAnio + " option[value!='0']").remove();
        var anioMin = date.getFullYear() - numAniosPermitidos;
        for (var i = date.getFullYear() + 1; i >= anioMin; i--) {
            var option = $(document.createElement('option'));
            option.text(i);
            option.val(i);
            $(this.arrIDControles.ddlAnio).append(option);
        }
        $(this.arrIDControles.ddlAnio).selectpicker('refresh');
    }

    this.validarAnioVehiculoAsegCompleto = function (anioDigitado) {
        var date = new Date();
        var valido = true;
        var anioLimite = date.getFullYear() - this.paramAntiguedadPermitidaAllCobert;

        if (anioDigitado < anioLimite) {
            valido = false;
        }
        return valido;
    }


    this.llenarCuotasPermitidas = function (monto_prima_total_anual, min_prima_mensual, coutasMax) {
        $(this.arrIDControles.ddlNumCuotas + " option[value!='0']").remove();
        for (var i = 1; i <= coutasMax; i++) {
            if ((parseFloat(monto_prima_total_anual) / parseFloat(min_prima_mensual)) > i) {
                var option = $(document.createElement('option'));
                option.text(i);
                option.val(i);
                $(this.arrIDControles.ddlNumCuotas).append(option);
            } else {
                break;
            }

        }
        if (coutasMax == 1)
            $(this.arrIDControles.ddlNumCuotas).prop('disabled', true);
        else
            $(this.arrIDControles.ddlNumCuotas).prop('disabled', false);


        $(this.arrIDControles.ddlNumCuotas).val('1');
        $(this.arrIDControles.ddlNumCuotas).trigger("changed.bs.select");
        $(this.arrIDControles.ddlNumCuotas).selectpicker('refresh');
    }


    this.limpiarDatosPago = function () {
        //$(this.arrIDControles.ddlNumCuotas).val("");
        $(this.arrIDControles.txtPagoFracc).val("");
        $(this.arrIDControles.txtTotalPrimaIni).html("");
        $(this.arrIDControles.txtTotalPrimaFin).html("");
        $(this.arrIDControles.txtNumPrimasIni).html("");
        $(this.arrIDControles.txtNumPrimasFin).html("");
        $("#txtPrefijoCuota").html("");
        $("#txtSufijoCuota").html("");
    }

    this.mostrarReporte = function (_url, parametros) {
        var nventana = window.open(_url + '?' + $.param(parametros), '_blank', '', true);
        nventana.focus();
        return false;
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
                arrValores.push({ object: $(obj.arrIDControles.txtAddress), data: "datos_asegurado.direccion", type: 'string', required: false });
                arrValores.push({ object: $(obj.arrIDControles.txtAgente), data: "agente", type: 'string', required: false });
                arrValores.push({ object: $(obj.arrIDControles.txtTelefono), data: "datos_asegurado.telefono", type: 'telephone', required: true });
                arrValores.push({ object: $(obj.arrIDControles.txtDui), data: "datos_asegurado.nro_documento", type: 'dui', required: true });
                arrValores.push({ object: $(obj.arrIDControles.txtEmail), data: "datos_asegurado.email", type: 'email', required: true });
                break;
            case "panelBienes":
                arrValores = new Array();
                arrValores.push({ object: $(obj.arrIDControles.ddlMarca), type: 'numeric', data: "id_marca", required: true });
                arrValores.push({ object: $(obj.arrIDControles.ddlModelo), type: 'numeric', data: "id_modelo", required: true });
                arrValores.push({ object: $(obj.arrIDControles.ddlAnio), type: 'numeric', data: "anio_fabricacion", required: true });
                arrValores.push({ object: $(obj.arrIDControles.ddlOrigen), type: 'numeric', data: "id_tipo_origen", required: true });
                arrValores.push({ object: $(obj.arrIDControles.ddlUsoVehiculo), type: 'numeric', data: "id_uso_veh", required: true });
                //sn_placas_extranjeras
                break;
            case "panelCoberturas":
                arrValores = new Array();
                arrValores.push({ object: $(obj.arrIDControles.txtCobertura1), type: 'currency', data: "monto_danio_prop", required: true });
                arrValores.push({ object: $(obj.arrIDControles.ddlNumCuotas), type: 'numeric', data: "num_cuotas", get: "text", required: true });
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
            if (this.type == "currency") {
                value = value.replace("$", "");
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

    this.showMessagePossibleDP = function (obj) {
        $("#divMessagePossibleDP").hide();

        var today = new Date();

        var antiguedadMinDP = today.getFullYear() - obj.paramAntMaxDP;
        var antiguedadMaxDP = today.getFullYear() - obj.paramAntMinDP;

        if (obj.objDatosCotizacion.anio_vehiculo >= antiguedadMinDP && obj.objDatosCotizacion.anio_vehiculo <= antiguedadMaxDP) {
            $("#divMessagePossibleDP").html(obj.messagePossibleDP);
            $("#divMessagePossibleDP").show();
        }
    }

    
}

$("input[data-type='currency']").on({
    keyup: function () {
        formatCurrency($(this));
    },
    blur: function () {
        formatCurrency($(this), "blur");
    }
});


function formatNumber(n) {
    // format number 1000000 to 1,234,567
    return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}


function formatCurrency(input, blur) {
    // appends $ to value, validates decimal side
    // and puts cursor back in right position.

    // get input value
    var input_val = input.val();

    // don't validate empty input
    if (input_val === "") { return; }

    // original length
    var original_len = input_val.length;

    // initial caret position 
    var caret_pos = input.prop("selectionStart");

    // check for decimal
    if (input_val.indexOf(".") >= 0) {

        // get position of first decimal
        // this prevents multiple decimals from
        // being entered
        var decimal_pos = input_val.indexOf(".");

        // split number by decimal point
        var left_side = input_val.substring(0, decimal_pos);
        var right_side = input_val.substring(decimal_pos);

        // add commas to left side of number
        left_side = formatNumber(left_side);

        // validate right side
        right_side = formatNumber(right_side);

        // On blur make sure 2 numbers after decimal
        if (blur === "blur") {
            right_side += "00";
        }

        // Limit decimal to only 2 digits
        right_side = right_side.substring(0, 2);

        // join number by .
        input_val = "$" + left_side + "." + right_side;

    } else {
        // no decimal entered
        // add commas to number
        // remove all non-digits
        input_val = formatNumber(input_val);
        input_val = "$" + input_val;

        // final formatting
        if (blur === "blur") {
            input_val += ".00";
        }
    }

    // send updated string to input
    input.val(input_val);

    // put caret back in the right position
    var updated_len = input_val.length;
    caret_pos = updated_len - original_len + caret_pos;
    input[0].setSelectionRange(caret_pos, caret_pos);
}


