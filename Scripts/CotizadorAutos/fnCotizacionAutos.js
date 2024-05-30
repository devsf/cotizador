

/************************************************************************************
* Nombre:             cotizadorAutos
* Función:            Clase que contiene la logica para el cotizador de autos
* Retorno:            -
* Creado por:         saleman
* Fecha Creación:     02/05/2016      
*************************************************************************************/


var cotizadorAutos = function () {
    this.cod_marca = 0;
    this.url_catalogo = "";
    this.IsValidEmail = [true] ;
    this.arrIDControles = new Object();
    this.arrIDControles.ddlModelo = "#ddlModelo";
    this.arrIDControles.ddlMarca = "#ddlMarca";
    this.arrIDControles.ddlOrigen = "#ddlOrigen";
    this.arrIDControles.ddlEmpleadoDe = "#ddlEmpleadoDe";
    this.arrIDControles.ddlCobertura2 = "#ddlCobertura2";
    this.arrIDControles.ddlCobertura3 = "#ddlCobertura3";
    this.arrIDControles.ddlCobertura4 = "#ddlCobertura4";
    this.arrIDControles.btnContinuar1 = "#btnContinuar1";
    this.arrIDControles.btnContinuar2 = "#btnContinuar2";
    this.arrIDControles.btnContinuar3 = "#btnContinuar3";
    this.arrIDControles.btnImprimir = "#btnImprimir";
    this.arrIDControles.txtNombreAsegurado = "#txtNombreAsegurado";
    this.arrIDControles.txtApellido1Aseg = "#txtApellido1Aseg";
    this.arrIDControles.txtApellido2Aseg = "#txtApellido2Aseg";
    this.arrIDControles.txtAddress = "#txtAddress";
    this.arrIDControles.txtAgente = "#txtAgente";
    this.arrIDControles.ddlAnio = "#ddlAnio";
    this.arrIDControles.txtGPS = "#txtGPS";
    this.arrIDControles.txtMontoAsistenciaVial = "#txtMontoAsistenciaVial"
    this.arrIDControles.txtMontoAsistenciaExequial = "#txtMontoAsistenciaExequial"
    this.arrIDControles.txtClase = "#txtClase";
    this.arrIDControles.txtPlaca = "#txtPlaca";
    this.arrIDControles.txtTelefono = "#txtTelefono";
    this.arrIDControles.txtAsegurable = "#txtAsegurable";
    this.arrIDControles.txtNumChasis = "#txtNumChasis";
    this.arrIDControles.txtUso = "#txtUso";
    this.arrIDControles.txtNumMotor = "#txtNumMotor";
    this.arrIDControles.txtTipoVeh = "#txtTipoVeh";
    this.arrIDControles.txtDanioVeh = "#txtDanioVeh";
    this.arrIDControles.txtDeducibleEven = "#txtDeducibleEvento";
    this.arrIDControles.txtRespUPerson = "#txtRespUPerson";
    this.arrIDControles.txtGMUPerson = "#txtGMUPerson";
    this.arrIDControles.txtSubTotalPA = "#txtSubTotalPA";
    this.arrIDControles.txtDesBuenExp = "#txtDesBuenExp";
    this.arrIDControles.txtPrimaNeta = "#txtPrimaNeta";
    this.arrIDControles.txtCobertAdic = "#txtCobertAdic";
    this.arrIDControles.txtImpuestoIVA = "#txtImpuestoIVA";
    this.arrIDControles.txtPrimaTotalA = "#txtPrimaTotalA";
    this.arrIDControles.txtContado = "#txtContado";
    this.arrIDControles.txtPagoFracc = "#txtPagoFracc";
    this.arrIDControles.ddlNumCuotas = "#ddlNumCuotas";
    this.arrIDControles.txtNumPrimasIni = "#txtNumPrimasIni";
    this.arrIDControles.txtTotalPrimaIni = "#txtTotalPrimaIni";
    this.arrIDControles.txtNumPrimasFin = "#txtNumPrimasFin";
    this.arrIDControles.txtMontoGPS = "#txtMontoGPS";
    this.arrIDControles.txtTotalPrimaFin = "#txtTotalPrimaFin";
    this.arrIDControles.btnPanelBienes = "#btnPanelBienes";
    this.arrIDControles.btnPanelDatos = "#btnPanelDatos";
    this.arrIDControles.btnPanelCoberturas = "#btnPanelCoberturas";
    this.arrIDControles.btnPanelPagos = "#btnPanelPagos";
    this.arrIDControles.txtDui = "#txtDui";
    this.arrIDControles.txtEmail = "#txtEmail";
    this.arrIDControles.btnImprimirCartaOferta = "#btnImprimirCartaOferta";
    this.arrIDControles.IdModalCartaOferta = "#windowCartaOferta";
    this.arrIDControles.IdModalCoberturas = "#windowCoberturasAdicionales";
    this.arrIDControles.btnGenerarRptCartaOfer = "#btnGenerarRptCartaOferta";
    this.arrIDControles.ddlTitulo = "#ddlTitulo";
    this.arrIDControles.btnAbrirCoberturas = "#btnAbrirCoberturas";
    this.arrIDControles.btnImprimirCoberturas = "#btnImprimirCoberturas";
    this.arrIDControles.btnDescargarPDF = "#btnDescargarPDF";

    /* Objeto que contendrá toda la informacion de la cotización*/
    this.objDatosCotizacion = new Object();
    //Se inicializa el id con valor cero
    this.objDatosCotizacion.id_cotizacion = 0;
    this.objDatosCotizacion.id_tipo_emp = 3; //Otros
    this.objDatosCotizacion.id_producto = 1; //Producto basico
    this.objDatosCotizacion.maxCuotas = 12;
    this.objDatosCotizacion.datos_asegurado = new Object();
    this.objDatosCotizacion.id_producto_ant = 1;
    this.url_imprimir_rpt_oferta_ind = window.appUrl +  '/ManejoReportes/ImprimirOfertaIndividual';
    this.url_imprimir_rpt_carta_oferta = window.appUrl + '/ManejoReportes/ImprimirCartaOferta';
    this.url_imprimir_coberturas = window.appUrl + '/ManejoReportes/ImprimirOfertaIndividualCoberturas';

 
    this.setLabelFormaPago = function (_fraccionado, _contado) {
        this.arrLabelFormaPago = new Object({
            pagoFraccionado: _fraccionado,
            pagoContado: _contado
        });
    }
    this.setParametrosGlobales = function (num, value) {
        switch (num) {
            case 1: { //Contiene la antiguedad permitida para cotizar un auto
                this.paramAntiguedadPermitida = (value == null) ? 0 : value;
                this.llenarAniosPermitidos(this.paramAntiguedadPermitida);
                break;
            }
            case 2: //Contiene la couta minima mensual autos
                this.paramCuotaMin = (value == null) ? 0 : value;
                break;
            case 3: //Contiene la proporcion individual de la cobertura de gm a terceros 
                this.paramProporcionIGM_RC = (value == null) ? 0 : value;
                break;
            case 4: //Contiene la proporcion individual de la cobertura de gm del asegurado y ocupantes
                this.paramProporcionIGM_Aseg = (value == null) ? 0 : value;
                break;
            case 9: //Contiene la antiguedad permitida para cotizar un auto (all cobert)
                this.paramAntiguedadPermitidaAllCobert = (value == null) ? 0 : value;
                break;
            case 11: //Contiene el año min - coberturas daños propios
                this.paramAntMinDP = (value == null) ? 0 : value;
                break;
            case 12: //Contiene el año max - coberturas daños propios
                this.paramAntMaxDP = (value == null) ? 0 : value;
                break;
            case 13: //Contiene mensaje posible - coberturas daños propios
                this.messagePossibleDP = (value == null) ? 0 : value;
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
        obj.llenarDdlCatalogos("MAR", 0, "", obj.arrIDControles.ddlMarca);
        obj.llenarDdlCatalogos("ORI", 0, "", obj.arrIDControles.ddlOrigen);
        /*obj.llenarDdlCatalogos("EMP", 0, "", obj.arrIDControles.ddlEmpleadoDe);*/
        /*obj.llenarDdlCatalogos("RIE", 2, "1", obj.arrIDControles.ddlCobertura2);
        obj.llenarDdlCatalogos("RIE", 3, "1", obj.arrIDControles.ddlCobertura3);
        obj.llenarDdlCatalogos("RIE", 4, "1", obj.arrIDControles.ddlCobertura4);*/
        obj.llenarDdlCatalogos("RIE", 2, obj.objDatosCotizacion.id_producto, obj.arrIDControles.ddlCobertura2);
        obj.llenarDdlCatalogos("RIE", 3, obj.objDatosCotizacion.id_producto, obj.arrIDControles.ddlCobertura3);
        obj.llenarDdlCatalogos("RIE", 4, obj.objDatosCotizacion.id_producto, obj.arrIDControles.ddlCobertura4);

        /*al cambiar la marca lista los modelos disponibles*/
        $(obj.arrIDControles.ddlMarca).on("changed.bs.select ", function (event, clickedIndex, newValue, oldValue) {
            var selected = $(this).find("option:selected").val();
            $(obj.arrIDControles.ddlModelo).prop("disabled", true);
            obj.limpiarDatosModelo();
            $(obj.arrIDControles.ddlModelo).selectpicker('refresh');
            if (selected != 0) {
                obj.llenarDdlCatalogos("MOD", selected, "", obj.arrIDControles.ddlModelo);
                if (newValue) {
                    $("#contenedorCoberturas").html("");
                }
            }

        });


        /*Al cambiar el modelo se cargan los datos */
        $(obj.arrIDControles.ddlModelo).on("changed.bs.select ", function (event, clickedIndex, newValue, oldValue) {
            var valor = $(this).find("option:selected").val();
            if (valor != 0) {
                var objDatosModelo = obj.llenarDatosModelo($(this).find("option:selected").val());
                objDatosModelo.success(function (data, msg) {
                    var datos = data[0];
                    if (msg === "success") {
                        if (typeof datos != "undefined") {

                            $(obj.arrIDControles.txtClase).val(datos.clase);
                            $(obj.arrIDControles.txtTipoVeh).val(datos.tipo_veh);
                            $(obj.arrIDControles.txtAsegurable).val(datos.txt_asegurable);
                            $(obj.arrIDControles.txtGPS).val(datos.txt_aplica_gps);
                            obj.objDatosCotizacion.deducible_minimo = datos.deducible_minimo;
                            obj.objDatosCotizacion.pje_deducible = datos.pje_deducible;
                            obj.objDatosCotizacion.id_clase = datos.id_clase;
                            obj.objDatosCotizacion.id_tipo_veh = datos.id_tipo_veh;
                        }
                    }
                });
                if (newValue) {
                    $("#contenedorCoberturas").html("");
                }
            }
        });


        /* $(obj.arrIDControles.ddlEmpleadoDe).on("changed.bs.select ", function (event, clickedIndex, newValue, oldValue) {
             if (newValue) {
                 obj.objDatosCotizacion.id_tipo_emp = $(obj.arrIDControles.ddlEmpleadoDe).find("option:selected").val();
                 $("#contenedorCoberturas").html("");
             }
         });*/


        $(obj.arrIDControles.ddlCobertura3).on("changed.bs.select ", function (event, clickedIndex, newValue, oldValue) {
            var valorSelecc = $(this).find("option:selected").text();
            var valorCalculado = 0;
            if (valorSelecc != 0 && valorSelecc != "") {
                valorCalculado = parseFloat(valorSelecc) / parseFloat(obj.paramProporcionIGM_RC);
            }
            $(obj.arrIDControles.txtRespUPerson).val(accounting.formatMoney(valorCalculado));
        });


        $(obj.arrIDControles.ddlCobertura4).on("changed.bs.select ", function (event, clickedIndex, newValue, oldValue) {
            var valorSelecc = $(this).find("option:selected").text();
            var valorCalculado = 0;
            if (valorSelecc != 0 || valorSelecc != "") {
                valorCalculado = parseFloat(valorSelecc) / parseFloat(obj.paramProporcionIGM_Aseg);
            }
            $(obj.arrIDControles.txtGMUPerson).val(accounting.formatMoney(valorCalculado));
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
                            if (data.Datos.num_cuotas_iniciales == valorSelecc) {
                                $(".value-cuota-fin").hide();
                                $(obj.arrIDControles.txtPagoFracc).val(obj.arrLabelFormaPago.pagoContado);
                            }
                            else {
                                $(".value-cuota-fin").show();
                                $(obj.arrIDControles.txtPagoFracc).val(obj.arrLabelFormaPago.pagoFraccionado);
                            }
                            $(obj.arrIDControles.txtNumPrimasFin).html(valorSelecc - data.Datos.num_cuotas_iniciales);
                        }
                    }
                })
            }
            // $(obj.arrIDControles.txtGMUPerson).val(accounting.formatMoney(valorCalculado));
        });


        $(obj.arrIDControles.txtDanioVeh).on("blur ", function (event) {
            var valorDanios = $(this).val();
            var valorCalculo = 0;
            if (valorDanios != 0 && valorDanios != "") {
                valorCalculo = parseFloat(obj.objDatosCotizacion.pje_deducible) * parseFloat(valorDanios);

                if (valorCalculo < parseFloat(obj.objDatosCotizacion.deducible_minimo))
                    valorCalculo = parseFloat(obj.objDatosCotizacion.deducible_minimo);
            }

            $(obj.arrIDControles.txtDeducibleEven).val(accounting.formatMoney(valorCalculo));
        });


        $(".btn-continue").on("click", function (e) {
            var IdCollapseFrom = $(this).data("collapse-from");
            var IdBtn = $(this).prop('id').toString();
            var objCollapseOpen = $("#" + $(this).data("collapse-open"));
            var objError = new Object();
            
            if (obj.getFieldsToEvaluate(IdCollapseFrom, objError)) {
                /*No permite pasar si el modelo no es asegurable*/
                if (IdCollapseFrom == "panelBienes") {
                    obj.showMessagePossibleDP(obj);

                    obj.objDatosCotizacion.id_producto_ant = obj.objDatosCotizacion.id_producto;
                    if ($(obj.arrIDControles.txtAsegurable).val() == "NO") {
                        mostrarNotificacion("Error: ", "Lo sentimos, el modelo seleccionado no asegurable", "danger");
                        return false;
                    }
                 
                    if (!obj.validarAnioVehiculoAsegCompleto(obj.objDatosCotizacion.anio_vehiculo)) {
                        obj.objDatosCotizacion.id_producto = 2; //Solo RC
                        $('div.prod1').hide();
                        obj.objDatosCotizacion.maxCuotas = 1;
                    } else {
                        obj.objDatosCotizacion.id_producto = 1;
                        $('div.prod1').show();
                        obj.objDatosCotizacion.maxCuotas = 12;
                    }
                    if (obj.objDatosCotizacion.id_producto_ant != obj.objDatosCotizacion.id_producto){
                        obj.llenarDdlCatalogos("RIE", 2, obj.objDatosCotizacion.id_producto, obj.arrIDControles.ddlCobertura2);
                        obj.llenarDdlCatalogos("RIE", 3, obj.objDatosCotizacion.id_producto, obj.arrIDControles.ddlCobertura3);
                        obj.llenarDdlCatalogos("RIE", 4, obj.objDatosCotizacion.id_producto, obj.arrIDControles.ddlCobertura4);
                    }
                }

                if (IdBtn == obj.arrIDControles.btnContinuar3.replace("#", "")) {
                    //obj.limpiarDatosPago();
                    obj.objDatosCotizacion.str_coberturas = obj.obtenerCoberturasChequeadas();
                    obj.generarPrimaCotizacion(obj.objDatosCotizacion, objCollapseOpen, true);
                } else {
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

            if (obj.id_producto == 1) {
                    IsCompleted = $(".var_calculo_prim:input").filter(function () {
                        var value = 0;
                        var id = $(this).prop('id').toString();
                        if (id.indexOf("ddl") != -1)
                            value = $.trim($(this).find("option:selected").val());
                        else
                            value = $.trim($(this).val());
                        return value == 0 || value.length == 0
                    }).length == 0;
            } else {
                IsCompleted = $(obj.arrIDControles.ddlCobertura2 + ","  + obj.arrIDControles.ddlCobertura3 ).filter(function () {
                    var value = 0;
                    var id = $(this).prop('id').toString();
                    if (id.indexOf("ddl") != -1 )
                        value = $.trim($(this).find("option:selected").val());
                    else
                        value = $.trim($(this).val());
                    return value == 0 || value.length == 0
                }).length == 0;

            }

            if (IsCompleted) {
                var objError = new Object();
                obj.getFieldsToEvaluate("panelCoberturas", objError);
                //obj.limpiarDatosPago();
                obj.objDatosCotizacion.str_coberturas = obj.obtenerCoberturasChequeadas();
                obj.generarPrimaCotizacion(obj.objDatosCotizacion, "", false);
            }

        })


        $(obj.arrIDControles.btnDescargarPDF).on('click', function (e) {
            window.open('../pdf/Instructivo_Inspeccion.pdf', '_blank', '', true);
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


        $(obj.arrIDControles.btnImprimirCoberturas).on("click", function () {
            var valorNumCoutas = $(obj.arrIDControles.ddlNumCuotas).find("option:selected").val();
            if (obj.objDatosCotizacion.id_cotizacion != 0 && (valorNumCoutas != "" && valorNumCoutas != "0")) {
                var parametros = {
                    id: obj.objDatosCotizacion.id_cotizacion
                };
                obj.mostrarReporte(obj.url_imprimir_coberturas, parametros);
            }
            else {
                mostrarNotificacion("Alerta: ", "Favor completar la seccion de pagos", "danger");
            }
            return false;
        });


        $(obj.arrIDControles.btnAbrirCoberturas).on("click", function () {
            var datos = obj.objDatosCotizacion;
            var objCoberturas = obj.getCoberturasPermitidas(datos.id_clase, datos.id_tipo_veh, datos.id_tipo_emp);
            var html = "";
            if ($("#contenedorCoberturas").html().trim() == "") {
                objCoberturas.success(function (data, msj) {

                    if (msj == "success") {
                        $.each(data, function (i, o) {
                            html += " <div class='row' >";
                            html += " <div class='col-md-1 col-sm-1  col-xs-1 '></div>";
                            html += " <div class='col-md-1 col-sm-1  col-xs-1 checkbox'> <input value='" + this.id_cobertura_adic + "' type='checkbox' name = 'chkCoberturasAdic' /> </div>"
                            html += " <div class='col-md-9 col-sm-9  col-xs-9'><label>" + this.txt_descripcion + "</label> </div> "
                            html += " <div class='col-md-1 col-sm-1  col-xs-1 '></div>";
                            html += " </div>";
                        });
                        $("#contenedorCoberturas").append(html);

                    }

                });
            }
            $(obj.arrIDControles.IdModalCoberturas).modal('show');
            $(obj.arrIDControles.IdModalCoberturas).modal('handleUpdate');
            return false;
        })
    };


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
            url: window.appUrl + '/ManejoReportes/getValoresParam' ,
            data: "{ 'recurso':'" + ruta + "', 'id_parametro':'" + parametro + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });
    };


    this.llenarDatosModelo = function (id_modelo) {
        return $.ajax({
            type: "POST",
            url: window.appUrl + '/CotizadorAutos/GetInfoModelo',
            data: "{ 'id_modelo':" + id_modelo + "}",
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
            url: window.appUrl + '/CotizadorAutos/GenerarPrimaCotizacion',
            data: "{ 'param':'" + datos + "', send_email: "+ send_email + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, mgs) {
                if (mgs === "success") {
                    var datos;
                    if (data.Exito && data.Datos.length > 0) {
                        datos = eval('(' + data.Datos + ')')[0];
                        obj.objDatosCotizacion.monto_prima_neta = datos.monto_prima_neta;
                        obj.objDatosCotizacion.monto_cobertura_adic = datos.monto_cobertura_adic;
                        obj.objDatosCotizacion.monto_iva = datos.monto_iva;
                        obj.objDatosCotizacion.monto_prima_total_anual = datos.monto_prima_total_anual;
                        obj.objDatosCotizacion.id_cotizacion = data.IdInsertado;
                        obj.objDatosCotizacion.id_cotizacion = data.IdInsertado;
                        $(obj.arrIDControles.txtTotalPrimaIni).html(datos.prima_mensual_ini);
                        $(obj.arrIDControles.txtPrimaNeta).html(accounting.formatMoney(obj.objDatosCotizacion.monto_prima_neta));
                        $(obj.arrIDControles.txtCobertAdic).html(accounting.formatMoney(obj.objDatosCotizacion.monto_cobertura_adic));
                        $(obj.arrIDControles.txtImpuestoIVA).html(accounting.formatMoney(obj.objDatosCotizacion.monto_iva));
                        $(obj.arrIDControles.txtPrimaTotalA).html(accounting.formatMoney(obj.objDatosCotizacion.monto_prima_total_anual));
                        $(obj.arrIDControles.txtMontoGPS).html(accounting.formatMoney(datos.monto_dispositivo_gps));
                        $(obj.arrIDControles.txtMontoAsistenciaVial).html(accounting.formatMoney(datos.monto_asistencia_vial));
                        $(obj.arrIDControles.txtMontoAsistenciaExequial).html(accounting.formatMoney(datos.monto_asistencia_exequial));
                        if (!send_email)
                            obj.llenarCuotasPermitidas(obj.objDatosCotizacion.monto_prima_total_anual, obj.paramCuotaMin, obj.objDatosCotizacion.maxCuotas);

                        if (objCollapseOpen.length > 0){
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
            url: window.appUrl + '/CotizadorAutos/CalcularPrimaMensual',
            data: "{ 'id_cotizacion':" + id_cotizacion + ", 'num_cuotas': " + num_cuotas + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });
    };


    this.getCoberturasPermitidas = function (id_clase, id_tipo_veh, id_tipo_emp) {
        return $.ajax({
            type: "POST",
            url: window.appUrl + '/CotizadorAutos/GetCoberturasPermitidas',
            data: "{ 'id_clase':" + id_clase + ", 'id_tipo_veh':" + id_tipo_veh + ", 'id_tipo_emp':" + id_tipo_emp + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });
    };


    this.getParametrosGlobales = function (id_parametro) {
        var obj = this;
        return $.ajax({
            type: "POST",
            url: window.appUrl + '/Generales/GetParametrosGenerales',
            data: "{ 'id_parametro': " + id_parametro + ", cod_ramo: 5}",
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
        for (var i = date.getFullYear() + 1 ; i >= anioMin  ; i--) {
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


    this.llenarCuotasPermitidas = function (monto_prima_total_anual, min_prima_mensual,coutasMax ) {
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
        if (coutasMax == 1)
            $(this.arrIDControles.ddlNumCuotas).prop('disabled', true);
        else
            $(this.arrIDControles.ddlNumCuotas).prop('disabled', false);


        $(this.arrIDControles.ddlNumCuotas).val('1');
        $(this.arrIDControles.ddlNumCuotas).trigger("changed.bs.select");
        $(this.arrIDControles.ddlNumCuotas).selectpicker('refresh');
    }


    this.obtenerCoberturasChequeadas = function () {
        var str_coberturas = "";
        $("input[name='chkCoberturasAdic']").each(function () {
            if (this.checked) {
                str_coberturas += $(this).val() + ",";
            }
        });
        str_coberturas = str_coberturas.substr(0, str_coberturas.length - 1);
        return str_coberturas;
    }


    this.limpiarDatosModelo = function () {
        $("#contenedorCoberturas").html();
        $(this.arrIDControles.txtClase).val("");
        $(this.arrIDControles.txtTipoVeh).val("");
        $(this.arrIDControles.txtAsegurable).val("");
        $(this.arrIDControles.txtGPS).val("");
    }


    this.limpiarDatosPago = function () {
        //$(this.arrIDControles.ddlNumCuotas).val("");
        $(this.arrIDControles.txtPagoFracc).val("");
        $(this.arrIDControles.txtTotalPrimaIni).html("");
        $(this.arrIDControles.txtTotalPrimaFin).html("");
        $(this.arrIDControles.txtNumPrimasIni).html("");
        $(this.arrIDControles.txtNumPrimasFin).html("");
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
                arrValores.push({ object: $(obj.arrIDControles.ddlAnio), type: 'numeric', data: "anio_vehiculo", required: true });
                arrValores.push({ object: $(obj.arrIDControles.ddlOrigen), type: 'numeric', data: "id_tipo_origen", required: true });
                /*  arrValores.push({ object: $(obj.arrIDControles.ddlEmpleadoDe), type: 'numeric', data: "id_tipo_emp", required: true });*/
                arrValores.push({ object: $(obj.arrIDControles.txtPlaca), type: 'string', data: "num_placa", required: false });
                arrValores.push({ object: $(obj.arrIDControles.txtUso), type: 'string', data: "uso_veh", required: true });
                arrValores.push({ object: $(obj.arrIDControles.txtNumChasis), type: 'string', data: "nro_chasis", required: false });
                arrValores.push({ object: $(obj.arrIDControles.txtNumMotor), type: 'string', data: "nro_motor", required: false });
                //sn_placas_extranjeras
                break;
            case "panelCoberturas":
                arrValores = new Array();
                if (obj.objDatosCotizacion.id_producto == 1) {
                    arrValores.push({ object: $(obj.arrIDControles.txtDanioVeh), type: 'numeric', data: "monto_danio_prop_veh", required: true });
                    arrValores.push({ object: $(obj.arrIDControles.ddlCobertura4), type: 'numeric', data: "monto_danio_prop_gm_v", get: "text", required: true });
                }

                arrValores.push({ object: $(obj.arrIDControles.ddlCobertura2), type: 'numeric', data: "monto_danio_terc_bien", get: "text", required: true });
                arrValores.push({ object: $(obj.arrIDControles.ddlCobertura3), type: 'numeric', data: "monto_danio_terc_gm_v", get: "text", required: true });
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

};



