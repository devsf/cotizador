


/************************************************************************************
* Nombre:             solVidaRemesa
* Función:            Clase que contiene la logica para solicitud de seguro de vida Remesa
* Retorno:            -
* Creado por:         saleman
* Fecha Creación:     13/07/2016      
*************************************************************************************/


var solVidaRemesa = function () {
    this.url_catalogo = "";
    this.arrIDControles = new Object();

    /*Panel 1*/
    this.arrIDControles.btnPanelDatos = "#btnPanelDatos";
    this.arrIDControles.btnContinuar1 = "#btnContinuar1";
    this.arrIDControles.txtAddress = "#txtAddress";
    this.arrIDControles.txtTelefono = "#txtTelefono";
    this.arrIDControles.btnImprimir = "#btnImprimir";
    this.arrIDControles.txtNroDocumento = "#txtNroDocumento";
    //this.arrIDControles.txtEmail = "#txtEmail";

    this.arrIDControles.txtNombreAsegurado = "#txtNombreAsegurado";
    this.arrIDControles.txtApellido1Aseg = "#txtApellido1Aseg";
    this.arrIDControles.txtApellido2Aseg = "#txtApellido2Aseg";
    this.arrIDControles.ddlTipoDoc = "#ddlTipoDoc";
    this.arrIDControles.ddlGenero = "#ddlGenero";
    this.arrIDControles.txtFechaNac = "#txtFechaNac";
    this.arrIDControles.ddlEstadoFam = "#ddlEstadoFam";
    this.arrIDControles.txtOcupacion = "#txtOcupacion";

    this.arrIDControles.ddlPais = "#ddlPais";
    this.arrIDControles.ddlDepto = "#ddlDepto";
    this.arrIDControles.ddlCiudad = "#ddlCiudad";
    this.arrIDControles.ddlColonia = "#ddlColonia";
    this.arrIDControles.txtNumCasa = "#txtNumCasa";
    this.arrIDControles.txtCodPostal = "#txtCodPostal";

    /*Panel 2*/
    this.arrIDControles.btnPanelCoberturas = "#btnPanelCoberturas";
    this.arrIDControles.ddlPlanes = "#ddlPlanes";
    this.arrIDControles.ddlFormaPago = "#ddlFormaPago";
    this.arrIDControles.btnContinuar2 = "#btnContinuar2";

    this.arrIDControles.panelInformacionPlan = "#panelInformacionPlan";

    this.arrIDControles.btnPanelInfo = "#btnPanelInfo";

    this.arrIDControles.lblSumaAnual = "#lblSumaAnual";
    this.arrIDControles.lblGastosEmerg = "#lblGastosEmerg";
    this.arrIDControles.lblCostoMensual = "#lblCostoMensual";
    this.arrIDControles.lblCostoTrimestral = "#lblCostoTrimestral";
    this.arrIDControles.lblCostoSemestral = "#lblCostoSemestral";
    this.arrIDControles.lblCostoAnual = "#lblCostoAnual";


    /*Panel 3*/
    this.arrIDControles.btnPanelBenef = "#btnPanelBenef";
    this.arrIDControles.btnGuardar = "#btnGuardar";

    this.arrIDControles.txtNombreBenefPpal = "#txtNombreBenefPpal";
    this.arrIDControles.txtApellido1BenefPpal = "#txtApellido1BenefPpal";
    this.arrIDControles.txtApellido2BenefPpal = "#txtApellido2BenefPpal";
    this.arrIDControles.ddlParentescoBenefPpal = "#ddlParentescoBenefPpal";

    this.arrIDControles.txtNombreBenefCont = "#txtNombreBenefCont";
    this.arrIDControles.txtApellido1BenefCont = "#txtApellido1BenefCont";
    this.arrIDControles.txtApellido2BenefCont = "#txtApellido2BenefCont";
    this.arrIDControles.ddlParentescoBenefCont = "#ddlParentescoBenefCont";

    this.arrIDControles.ddlEntidad = "#ddlEntidad";
    this.arrIDControles.ddlTipoPago = "#ddlTipoPago";
    this.arrIDControles.txtNumCuenta = "#txtNumCuenta";
    this.arrIDControles.txtNombrePagador = "#txtNombrePagador";
    this.arrIDControles.txtApellido1Pag = "#txtApellido1Pag";
    this.arrIDControles.txtApellido2Pag = "#txtApellido2Pag";

    this.arrIDControles.btnGuardarSolicitud = "#btnGuardarSolicitud";
    this.arrIDControles.txtObservaciones = "#txtObservaciones";
    this.arrIDControles.chkMismoAsegurado = "#chkMismoAsegurado";

    this.arrIDControles.windowAdvertencia = "#windowAdvertencia";
    this.arrIDControles.windowAdvertencia2 = "#windowAdvertencia2";
    this.arrIDControles.btnImprimirReporte2 = "#btnImprimirReporte2";
    // btnImprimirReporte2
    /* Objeto que contendrá toda la informacion de la cotización*/
    this.objDatosSolVidaRem = new Object();

    //Se inicializa el id con valor cero
    this.objDatosSolVidaRem.id_solicitud = 0;
    this.objDatosSolVidaRem.txt_nombres = '';
    this.objDatosSolVidaRem.txt_apellido1 = '';
    this.objDatosSolVidaRem.txt_apellido2 = '';
    this.objDatosSolVidaRem.direccion = '';
    this.objDatosSolVidaRem.telefono = '';
    this.objDatosSolVidaRem.email = '';
    this.objDatosSolVidaRem.id_tipo_documento = '';
    this.objDatosSolVidaRem.nro_documento = '';
    this.objDatosSolVidaRem.id_genero = '';
    this.objDatosSolVidaRem.ocupacion = '';
    this.objDatosSolVidaRem.id_estado_familiar = '';
    this.objDatosSolVidaRem.id_plan_remesa = '';
    this.objDatosSolVidaRem.id_forma_pago = '';
    this.objDatosSolVidaRem.lstBeneficiarios = new Array();

    this.arrBenfPpal = new Object();
    this.arrBenfPpal.sn_principal = true;
    this.arrBenfPpal.id_beneficiario = 0;

    this.arrBenfCont = new Object();
    this.arrBenfCont.sn_principal = false;
    this.arrBenfCont.id_beneficiario = 0;

    this.setUrlCatalogo = function (_url) {
        this.url_catalogo = _url;
    }

    this.setUrlDatosPlanRemesa = function (_url) {
        this.url_datos_plan_remesa = _url;
    }

    this.setUrlImprimirReporteSolicitud = function (_url) {
        this.url_imprimir_rpt_solicitud = _url;
    }

    this.setUrlGenerarSolicitud = function (_url) {
        this.url_generar_solicitud = _url;
    }

    /*GLOBAL*/
    var id_from_modal_open = "";

    /*Funcion que inicializa todas la funciones de la clase*/
    this.init = function () {
        //Almacena la instancia de la clase cotizadorVivienda
        var obj = this;

        $(obj.arrIDControles.windowAdvertencia).modal('show');

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
            animationProperty: "top",
            width: 200
        });

        /*Carga de los catalogos generales*/
        obj.llenarDdlCatalogos("GEN", 0, "", obj.arrIDControles.ddlGenero);
        obj.llenarDdlCatalogos("FPA", 0, "", obj.arrIDControles.ddlFormaPago);
        obj.llenarDdlCatalogos("TDO", 0, "", obj.arrIDControles.ddlTipoDoc);
        obj.llenarDdlCatalogos("EFA", 0, "", obj.arrIDControles.ddlEstadoFam);
        obj.llenarDdlCatalogos("PAR", 0, "", obj.arrIDControles.ddlParentescoBenefCont);
        obj.llenarDdlCatalogos("PAR", 0, "", obj.arrIDControles.ddlParentescoBenefPpal);
        obj.llenarDdlCatalogos("PLN", 0, "", obj.arrIDControles.ddlPlanes);
        obj.llenarDdlCatalogos("PAI", 0, "", obj.arrIDControles.ddlPais);
        obj.llenarDdlCatalogos("CAJ", 0, "", obj.arrIDControles.ddlEntidad);
        obj.llenarDdlCatalogos("TPA", 0, "", obj.arrIDControles.ddlTipoPago);

        /*al cambiar el pais se listan los departamentos disponibles*/
        $(obj.arrIDControles.ddlPais).on("changed.bs.select ", function (event, clickedIndex, newValue, oldValue) {
            var selected = $(this).find("option:selected").val();
            $(obj.arrIDControles.ddlDepto + ", " +  obj.arrIDControles.ddlColonia + ", " + obj.arrIDControles.ddlCiudad).prop("disabled", true);
            $(obj.arrIDControles.ddlDepto + ", " + obj.arrIDControles.ddlColonia + ", " + obj.arrIDControles.ddlCiudad).selectpicker('deselectAll');
            $(obj.arrIDControles.ddlDepto + ", " + obj.arrIDControles.ddlColonia + ", " + obj.arrIDControles.ddlCiudad).selectpicker('refresh');

            if (selected != 0) {
                obj.llenarDdlCatalogos("DPT", selected, "", obj.arrIDControles.ddlDepto);
            }

        });

        /*al cambiar el departamento se listan las ciudades disponibles*/
        $(obj.arrIDControles.ddlDepto).on("changed.bs.select ", function (event, clickedIndex, newValue, oldValue) {
            var selected = $(this).find("option:selected").val();
            $(obj.arrIDControles.ddlCiudad).prop("disabled", true);
            $(obj.arrIDControles.ddlCiudad).selectpicker('refresh');
            if (selected != 0) {
                obj.llenarDdlCatalogos("CIU", selected, "", obj.arrIDControles.ddlCiudad);
            }

        });

        /*al cambiar la ciudad  se listan las colonias disponibles*/
        $(obj.arrIDControles.ddlCiudad).on("changed.bs.select ", function (event, clickedIndex, newValue, oldValue) {
            var selected = $(this).find("option:selected").val();
            $(obj.arrIDControles.ddlColonia).prop("disabled", true);
            $(obj.arrIDControles.ddlColonia).selectpicker('refresh');
            if (selected != 0 ) {
                obj.llenarDdlCatalogos("COL", selected, "", obj.arrIDControles.ddlColonia);
            }

        });



        // Deshabilita los paneles
        $(".btn-panel").bind("click", false);
        $(".btn-print").bind("click", false);
        $(".btn-print").prop("disabled", "disabled");

        //Valida los controles numericos
        $(".numeric").numeric({ negative: false, decimal: false });
        $(".numeric-currency").numeric(",");

        /*Datepicker*/
        $(".input-datepicker").datepicker({
         
            format: "dd/mm/yyyy",
            language: "es",
            startDate: "-120Y", 
        });

        /*al cambiar la marca lista los planes disponibles*/
        $(obj.arrIDControles.ddlPlanes).on("changed.bs.select ", function (event, clickedIndex, newValue, oldValue) {
            var selected = $(this).find("option:selected").val();
            if (selected != 0) {
                obj.limpiarDatosPlan();

                var objDatos = obj.llenarDatosPlanRemesa(selected);
                objDatos.success(function (data, msg) {
                    var datos = data[0];
                    debugger;
                    if (msg === "success") {
                        if (typeof datos != "undefined") {
                            //debugger;
                            $(obj.arrIDControles.lblSumaAnual).html(accounting.formatMoney(datos.monto_suma_anual));
                            $(obj.arrIDControles.lblGastosEmerg).html(accounting.formatMoney(datos.monto_gastos_emergentes));
                            $(obj.arrIDControles.lblCostoMensual).html(accounting.formatMoney(datos.costo_mensual));
                            $(obj.arrIDControles.lblCostoTrimestral).html(accounting.formatMoney(parseFloat(datos.costo_mensual) * 3));
                            $(obj.arrIDControles.lblCostoSemestral).html(accounting.formatMoney(parseFloat(datos.costo_mensual) * 6));
                            $(obj.arrIDControles.lblCostoAnual).html(accounting.formatMoney(parseFloat(datos.costo_mensual) * 12));
                            $(obj.arrIDControles.btnPanelInfo).unbind("click", false);
                            $(obj.arrIDControles.panelInformacionPlan).collapse("show");
                        }
                    }
                })
            }

        });


        $(obj.arrIDControles.ddlFormaPago).on("changed.bs.select ", function (event, clickedIndex, newValue, oldValue) {
            var selected = $(this).find("option:selected").val();
            var objRow = $("#costo_" + selected);
            if ($("#tbl_plan tr").hasClass("selected-cost"))
                $("#tbl_plan tr").removeClass('selected-cost');
            if (selected != 0) {
                objRow.addClass('selected-cost');
            }

        });


        $(obj.arrIDControles.ddlTipoDoc).on("changed.bs.select ", function (event, clickedIndex, newValue, oldValue) {
            var selected = $(this).find("option:selected").val();
            $(obj.arrIDControles.txtNroDocumento).arcnetunmask();
            $(obj.arrIDControles.txtNroDocumento).removeClass("dui");
            $(obj.arrIDControles.txtNroDocumento).val("");
            if (selected != 0) {
                $(obj.arrIDControles.txtNroDocumento).prop("disabled", "");
                if (selected == 1) {
                    $(obj.arrIDControles.txtNroDocumento).arcnetmask("dui");
                    $(obj.arrIDControles.txtNroDocumento).addClass("dui");
                }
            } else {
                $(obj.arrIDControles.txtNroDocumento).prop("disabled", "disabled");
                $(obj.arrIDControles.txtNroDocumento).val("");
            }

        });

        $(obj.arrIDControles.chkMismoAsegurado).change(function () {
            if (this.checked) {
                $(obj.arrIDControles.txtNombrePagador).val($(obj.arrIDControles.txtNombreAsegurado).val());
                $(obj.arrIDControles.txtApellido1Pag).val($(obj.arrIDControles.txtApellido1Aseg).val());
                $(obj.arrIDControles.txtApellido2Pag).val($(obj.arrIDControles.txtApellido2Aseg).val());
                $(obj.arrIDControles.txtNombrePagador).prop('disabled', true);
                $(obj.arrIDControles.txtApellido1Pag).prop('disabled', true);
                $(obj.arrIDControles.txtApellido2Pag).prop('disabled', true);
            } else {
                $(obj.arrIDControles.txtNombrePagador).val("");
                $(obj.arrIDControles.txtApellido1Pag).val("");
                $(obj.arrIDControles.txtApellido2Pag).val("");
                $(obj.arrIDControles.txtNombrePagador).prop('disabled', false);
                $(obj.arrIDControles.txtApellido1Pag).prop('disabled', false);
                $(obj.arrIDControles.txtApellido2Pag).prop('disabled', false);
            }
        });

        $(".btn-continue").on("click", function (e) {
            var IdCollapseFrom = $(this).data("collapse-from");
            var IdBtn = $(this).prop('id').toString();
            var valido = true;
            var error = "";
            var arrValores = null;

            switch (IdCollapseFrom) {
                case "panelDatos":
                    arrValores = new Array();
                    arrValores.push({ object: $(obj.arrIDControles.txtNombreAsegurado), data: "txt_nombres_aseg", type: 'string', required: true });
                    arrValores.push({ object: $(obj.arrIDControles.txtApellido1Aseg), data: "txt_apellido1_aseg", type: 'string', required: true });
                    arrValores.push({ object: $(obj.arrIDControles.txtApellido2Aseg), data: "txt_apellido2_aseg", type: 'string', required: false });
                    arrValores.push({ object: $(obj.arrIDControles.txtFechaNac), data: "fecha_nac", type: 'date', required: true });
                    arrValores.push({ object: $(obj.arrIDControles.txtAddress), data: "direccion", type: 'string', required: true });
                    // arrValores.push({ object: $(obj.arrIDControles.txtE), data: "email", type: 'string', required: true });
                    arrValores.push({ object: $(obj.arrIDControles.ddlTipoDoc), data: "id_tipo_documento", type: 'numeric', required: true });
                    arrValores.push({ object: $(obj.arrIDControles.ddlGenero), data: "id_genero", type: 'numeric', required: true });
                    arrValores.push({ object: $(obj.arrIDControles.txtTelefono), data: "telefono", type: 'string', required: true });
                    arrValores.push({ object: $(obj.arrIDControles.txtNroDocumento), data: "nro_documento", type: $(obj.arrIDControles.txtNroDocumento).hasClass("dui")  ? 'dui' : 'string', required: true });
                    arrValores.push({ object: $(obj.arrIDControles.txtOcupacion), data: "ocupacion", type: 'string', required: true });
                    arrValores.push({ object: $(obj.arrIDControles.ddlEstadoFam), data: "id_estado_familiar", type: 'numeric', required: true });

                    arrValores.push({ object: $(obj.arrIDControles.ddlPais), data: "id_pais", type: 'numeric', required:true });
                    arrValores.push({ object: $(obj.arrIDControles.ddlDepto), data: "id_departamento", type: 'numeric', required: $(obj.arrIDControles.ddlPais).find("option:selected").val() == "7" ? true : false });
                    arrValores.push({ object: $(obj.arrIDControles.ddlCiudad), data: "id_ciudad", type: 'numeric', required: $(obj.arrIDControles.ddlPais).find("option:selected").val() == "7" ? true : false });
                    arrValores.push({ object: $(obj.arrIDControles.ddlColonia), data: "id_colonia", type: 'numeric', required:  false });
                    arrValores.push({ object: $(obj.arrIDControles.txtCodPostal), data: "codigo_postal", type: 'string', required: true });
                    arrValores.push({ object: $(obj.arrIDControles.txtNumCasa), data: "num_casa", type: 'string', required: false });

                    break;
                case "panelCoberturas":
                    arrValores = new Array();
                    arrValores.push({ object: $(obj.arrIDControles.ddlPlanes), data: "id_plan_remesa", type: 'string', required: true });
                    arrValores.push({ object: $(obj.arrIDControles.ddlFormaPago), type: 'numeric', data: "id_forma_pago", required: true });

                    arrValores.push({ object: $(obj.arrIDControles.txtNombreBenefPpal), data: "txt_nombres", type: 'string', required: true, benef: 'P' });
                    arrValores.push({ object: $(obj.arrIDControles.txtApellido1BenefPpal), data: "txt_apellido1", type: 'string', required: true, benef: 'P' });
                    arrValores.push({ object: $(obj.arrIDControles.txtApellido2BenefPpal), data: "txt_apellido2", type: 'string', required: true, benef: 'P' });
                    arrValores.push({ object: $(obj.arrIDControles.ddlParentescoBenefPpal), data: "id_parentesco", type: 'numeric', required: true, benef: 'P' });


                    arrValores.push({ object: $(obj.arrIDControles.txtNombreBenefCont), data: "txt_nombres", type: 'string', required: true, benef: 'C' });
                    arrValores.push({ object: $(obj.arrIDControles.txtApellido1BenefCont), data: "txt_apellido1", type: 'string', required: true, benef: 'C' });
                    arrValores.push({ object: $(obj.arrIDControles.txtApellido2BenefCont), data: "txt_apellido2", type: 'string', required: true, benef: 'C' });
                    arrValores.push({ object: $(obj.arrIDControles.ddlParentescoBenefCont), data: "id_parentesco", type: 'numeric', required: true, benef: 'C' });


                    arrValores.push({ object: $(obj.arrIDControles.ddlTipoPago), data: "id_tipo_pago", type: 'string', required: true });
                    arrValores.push({ object: $(obj.arrIDControles.ddlEntidad), data: "id_entidad", type: 'string', required: true });
                    // arrValores.push({ object: $(obj.arrIDControles.txtNumCuenta), data: "num_cuenta_tarjeta", type: 'string', required: true });
                    //  if ($(obj.arrIDControles.chkMismoAsegurado).prop(':checked') == false) {
                    arrValores.push({ object: $(obj.arrIDControles.txtNombrePagador), data: "txt_nombres_pag", type: 'string', required: true });
                    arrValores.push({ object: $(obj.arrIDControles.txtApellido1Pag), data: "txt_apellido1_pag", type: 'string', required: true });
                    arrValores.push({ object: $(obj.arrIDControles.txtApellido2Pag), data: "txt_apellido2_pag", type: 'string', required: false });
                    //}
                    break;
                default:
                    break;
            }
            //Recorre
            if (arrValores.length > 0) {
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
                            error += " - " + $("label[for='" + id + "']").text().replace(":", "") + "<br>";
                            valido = false;
                            return false;
                        }
                    }

                    if (this.type == "email" && value.length > 0) {
                        if (!validaEmail(value)) {
                            error += " -  " + $("label[for='" + id + "']").text().replace(":", "") + "<br>";
                            valido = false;
                            return false;
                        }
                    }

                    if (this.type == "dui" && value.length > 0) {
                        var ultimo_digito = value.toString().split("-")[1];
                        if (validaDui(value) != ultimo_digito) {
                            error += " -  " + $("label[for='" + id + "']").text().replace(":", "") + "<br>";
                            valido = false;
                            return false;
                        }
                    }

                    if (this.type == "date" && value.length > 0) {
                        if (!isValidDate(value, 'dd/mm/yyyy')) {
                            error += " -  " + $("label[for='" + id + "']").text().replace(":", "") + "<br>";
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
                    if (typeof this.benef === "undefined" || this.benef ===  '') {
                        eval("obj.objDatosSolVidaRem." + this.data + " = value; ");
                    } else {
                        if (this.benef == 'P')
                        {
                            eval("obj.arrBenfPpal." + this.data + " = value; ");
                        } else if (this.benef == 'C') {
                            eval("obj.arrBenfCont." + this.data + " = value; ");
                        }
                    }
                });
            }

            obj.objDatosSolVidaRem.lstBeneficiarios = new Array(obj.arrBenfPpal,  obj.arrBenfCont);
            //debugger;
            var objCollapseOpen = $("#" + $(this).data("collapse-open"));
            if (valido) {

                if (IdBtn == obj.arrIDControles.btnGuardar.replace("#", "")) {
                    $("#windowAclaracion").modal("show");
                    $("#windowAclaracion").modal('handleUpdate');

                } else {
                    $("#" + objCollapseOpen.attr("aria-labelledby")).find(".btn-panel").unbind("click", false);
                    objCollapseOpen.collapse("show");
                }
            } else {
                mostrarNotificacion("Completar correctamente los siguientes campos<br>", error, "danger");
            }
            return false;
        });

        $(obj.arrIDControles.btnAgregarBenef).on("click", function (e) {
            var datos = {
                id: 14,
                nombre_completo: $(obj.arrIDControles.txtNombreBenef).val(),
                parentesco: $(obj.arrIDControles.ddlParentescoBenef).val(),
                pje_asignacion: $(obj.arrIDControles.ddlAsignacionBenef).val()
            };
            obj.agregarBeneficiario(datos);
            $(obj.arrIDControles.IdWindowBeneficiario).modal('hide');
        });

        $(obj.arrIDControles.btnGuardarSolicitud).on("click", function (e) {
            obj.objDatosSolVidaRem.observaciones = $(obj.arrIDControles.txtObservaciones).val();
            obj.objDatosSolVidaRem.sn_pagador_asegurado = $(obj.arrIDControles.chkMismoAsegurado).prop('checked');
            if (obj.objDatosSolVidaRem.observaciones.length > 0) {
                obj.generarSolicitudRemesa(obj.objDatosSolVidaRem);
            } else {
                mostrarNotificacion('', "Favor completar el campo de Observaciones", "danger");
            }
        }
        );



        $(obj.arrIDControles.btnImprimir).on("click", function () {
            if (obj.objDatosSolVidaRem.id_solicitud != 0) {
                $(obj.arrIDControles.windowAdvertencia2).modal('show'); 
            }
            else {
                mostrarNotificacion("Alerta: ", "Aún no se ha guardado solicitud", "danger");
            }
            return false;
        });

        $(obj.arrIDControles.btnImprimirReporte2).on("click", function () {
            var parametros = {
                id: obj.objDatosSolVidaRem.id_solicitud
            };
            obj.mostrarReporte(obj.url_imprimir_rpt_solicitud, parametros);
            $(obj.arrIDControles.windowAdvertencia2).modal('hide');
            return false;
        });
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

                if ($(id_control).prop("disabled") == true && datos.length > 0) {
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


    this.llenarDatosPlanRemesa = function (id_plan_remesa) {
        return $.ajax({
            type: "POST",
            url: this.url_datos_plan_remesa,
            data: "{ 'id_plan_remesa':" + id_plan_remesa + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });
    };


    this.generarSolicitudRemesa = function (params) {
        var datos = JSON.stringify(params);
        datos = datos.replace(/"/g, '\\"');
        var obj = this;
        return $.ajax({
            type: "POST",
            url: this.url_generar_solicitud,
            data: "{ 'param':'" + datos + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, mgs) {
                if (mgs === "success") {
                    var datos;
                    if (data.Exito) {
                        datosBenefs = eval('(' + data.Datos + ')');
                        if (obj.objDatosSolVidaRem.id_solicitud == 0)
                            mostrarNotificacion('', 'Se generó correctamente la solicitud número:' + data.IdInsertado, 'success');
                        else
                            mostrarNotificacion('', 'Se modificó correctamente la solicitud número:' + data.IdInsertado, 'success');

                        obj.objDatosSolVidaRem.id_solicitud = data.IdInsertado;

                        obj.arrBenfPpal.id_beneficiario = datosBenefs[0].id_beneficiario;
                        obj.arrBenfCont.id_beneficiario = datosBenefs[1].id_beneficiario

                        $(".btn-print").unbind("click", false);
                        $(".btn-print").prop("disabled", "");
                      
                    }
                    else
                        mostrarNotificacion("Error: ", data.Mensaje, "danger");

                    $("#windowAclaracion").modal("hide");
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
        $(this.arrIDControles.ddlNumCuotas).selectpicker('refresh');
    }





    this.mostrarReporte = function (_url, parametros) {
        window.open(_url + '?' + $.param(parametros), 'blank', '', false);
    }

    this.limpiarDatosPlan = function () {
        $(this.arrIDControles.lblSumaAnual).html("");
        $(this.arrIDControles.lblGastosEmerg).html("");
        $(this.arrIDControles.lblCostoMensual).html("");
        $(this.arrIDControles.lblCostoTrimestral).html("");
        $(this.arrIDControles.lblCostoSemestral).html("");
        $(this.arrIDControles.lblCostoAnual).html("");
    }


};



