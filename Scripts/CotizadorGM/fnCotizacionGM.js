
/************************************************************************************
* Nombre:             cotizadorGM
* Función:            Clase que contiene la logica para el cotizador de gastos medicos
* Retorno:            -
* Creado por:         saleman
* Fecha Creación:     28/07/2016      
*************************************************************************************/


var cotizadorGM = function () {
    this.cod_marca = 0;
    this.url_catalogo = "";
    this.min_edad_aseg = 18;
    this.max_edad_aseg = 65;
    this.min_edad_depen = 0;
    this.max_edad_depen = 65;
    this.min_edad_h_depen = 0;
    this.max_edad_h_depen = 25;
    this.arr_id_parentesco_no_hijos = new Array(1, 2, 34, 35);
    this.arrIDControles = new Object();

    /*panel 1*/
    this.arrIDControles.btnPanelDatos = "#btnPanelDatos";
    this.arrIDControles.panelDatos = "#panelDatos";
    this.arrIDControles.txtNombreAsegurado = "#txtNombreAsegurado";
    this.arrIDControles.txtApellido1Aseg = "#txtApellido1Aseg";
    this.arrIDControles.txtApellido2Aseg = "#txtApellido2Aseg";
    this.arrIDControles.ddlGenero = "#ddlGenero";
    this.arrIDControles.txtFechaNac = "#txtFechaNac";
    this.arrIDControles.ddlEstadoFam = "#ddlEstadoFam";
    this.arrIDControles.txtTelefono = "#txtTelefono";
    this.arrIDControles.txtTelefonoCelular = "#txtTelefonoCelular";
    this.arrIDControles.ddlPais = "#ddlPais";
    this.arrIDControles.ddlDepto = "#ddlDepto";
    this.arrIDControles.ddlCiudad = "#ddlCiudad";
    this.arrIDControles.ddlColonia = "#ddlColonia";
    this.arrIDControles.txtAddress = "#txtAddress";
    this.arrIDControles.txtEmail = "#txtEmail";
    this.arrIDControles.ddlAgente = "#ddlAgente";
    this.arrIDControles.lblEdad = "#lblEdad";
    this.arrIDControles.txtNumCasa = "#txtNumCasa";


    this.arrIDControles.btnContinuar1 = "#btnContinuar1";

    /*panel 2
    this.arrIDControles.btnPanelDatosAgente = "#btnPanelDatosAgente";
    this.arrIDControles.panelDatosAgente = "#panelDatosAgente";
    this.arrIDControles.ddlIntermediario = "#ddlIntermediario";
    this.arrIDControles.txtNombreAgente = "#txtNombreAgente";
    this.arrIDControles.txtApellido1Agente = "#txtApellido1Agente";
    this.arrIDControles.txtApellido2Agente = "#txtApellido2Agente";
    this.arrIDControles.ddlGeneroAgente = "#ddlGeneroAgente";
    this.arrIDControles.txtTelefonoAgente = "#txtTelefonoAgente";
    this.arrIDControles.txtTelefonoCelAgente = "#txtTelefonoCelAgente";
    this.arrIDControles.txtEmailAgente = "#txtEmailAgente";
    this.arrIDControles.btnContinuar2 = "#btnContinuar2";*/

    /*Panel 3*/
    this.arrIDControles.btnPanelCoberturas = "#btnPanelCoberturas";
    this.arrIDControles.panelCoberturas = "#panelCoberturas";
    this.arrIDControles.ddlAlcanceTerritorial = "#ddlAlcanceTerritorial";
    this.arrIDControles.ddlMaxVitalGM = "#ddlMaxVitalGM";
    this.arrIDControles.ddlFormaPago = "#ddlFormaPago";
    this.arrIDControles.lblCoaseguroGM = "#lblCoaseguroGM";
    this.arrIDControles.lblDeducibleGM = "#lblDeducibleGM";
    this.arrIDControles.lblCoaseguroDental = "#lblCoaseguroDental";
    this.arrIDControles.lblDeducibleDental = "#lblDeducibleDental";
    this.arrIDControles.rbtPlanDental = "rbtPlanDental";
    this.arrIDControles.pnlInfoPlanDental = "#pnlInfoPlanDental";


    this.arrIDControles.maxVitalDental = ".maxVitalDental";
    this.arrIDControles.ddlMaxVitalDental = "#ddlMaxVitalDental";
    this.arrIDControles.rbtAdicionarDepen = "rbtAdicionarDepen";
    this.arrIDControles.pnlDependientes = "#pnlDependientes";
    this.arrIDControles.panelDependientes = "#panelDependientes";
    this.arrIDControles.tblDependientes = "#tblDependientes";
    this.arrIDControles.btnGuardar = "#btnGuardar";

    /*panel 4*/
    this.arrIDControles.panelHeadingPago = "#panelHeadingPago";
    this.arrIDControles.btnPanelPagos = "#btnPanelPagos";
    this.arrIDControles.panelPago = "#panelPago";
    this.arrIDControles.tblDependientes = "#tblDependientes";
    this.arrIDControles.lblCouta = "#lblCouta";
    this.arrIDControles.txtPrimaCouta = "#txtPrimaCouta";
    this.arrIDControles.txtTotalPrimaFin = "#txtTotalPrimaFin";
    this.arrIDControles.txtTotalDescuento = "#txtTotalDescuento";
    this.arrIDControles.txtPrimaNetaTotal = "#txtPrimaNetaTotal";
    this.arrIDControles.txtRPN = "#txtRPN";
    this.arrIDControles.btnImprimir = "#btnImprimir";
    this.arrIDControles.btnNuevo = "#btnNuevo";



    this.arrParentesco = null;

    /* Objeto que contendrá toda la informacion de la cotización*/
    this.objDatosCotizacion = new Object();
    //Se inicializa el id con valor cero
    this.objDatosCotizacion.id_cotizacion = 0;
    this.objDatosCotizacion.datos_asegurado = new Object();
    this.arrDependientesDesactivados = new Array();

    /*Id pais a vender*/
    this.objDatosCotizacion.datos_asegurado.id_pais = 2;
    this.setUrlCatalogo = function (_url) {
        this.url_catalogo = _url;
    }
    this.setUrlGenerarCotizacion = function (_url) {
        this.url_generar_prima_cotizacion = _url;
    }
    this.setUrlDatosDeduCoaseguro = function (_url) {
        this.url_datos_dedu_coaseguro = _url;
    }
    this.setUrlImprimirReporteOfertaInd = function (_url) {
        this.url_imprimir_rpt_oferta_ind = _url;
    }
    /*Funcion que inicializa todas la funciones de la clase*/
    this.init = function () {
        //Almacena la instancia de la clase cotizadorGM
        var obj = this;

        /*
        var script = "";
        $('.container *').each(function () {
            if (this.id.trim() !='')
                script = script + this.id + ',';
        });
        alert(script);*/

        //Disable the Remove Button
        var rowCount = $('#tblDependientes >tbody:last >tr').length;
        if (rowCount == 1) {
            document.getElementsByClassName('btn-remove')[0].disabled = true;
        }

        $(obj.arrIDControles.maxVitalDental).hide();
        $(obj.arrIDControles.pnlDependientes).hide();
        $(obj.arrIDControles.pnlInfoPlanDental).hide();

        obj.llenarDdlCatalogos("PAG", 0, "", "#ParentescoDepend1");



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

        $(".input-datepicker-dependientes").datepicker({

            format: "dd/mm/yyyy",
            startDate: "-" + obj.max_edad_aseg + "Y",
            language: 'es'
        }).on('changeDate', function (date) {
            if (date != "") {
                var resultado = obj.validarFecha(date.date.toLocaleDateString('es-SV'), obj.min_edad_depen, obj.max_edad_depen);
                if (resultado.length > 0) {
                    mostrarNotificacion("ERROR", resultado, "danger");
                    $(this).val("");
                    date = "";
                }
            }

        });

        $(".input-datepicker").datepicker({
            //changeMonth: true,
            //changeYear: true,
            format: "dd/mm/yyyy",
            //yearRange: "-" + obj.max_edad_aseg + ":+0",
            startDate: "-" + obj.max_edad_aseg + "Y",
            endDate: "-" + obj.min_edad_aseg + "Y",
            language: 'es'
        }).on('changeDate', function (date) {
            if (date != "") {
                console.log(date);
                var resultado = obj.validarFecha(date.date.toLocaleDateString('es-SV'), obj.min_edad_aseg, obj.max_edad_aseg);
                if (resultado.length > 0) {
                    mostrarNotificacion("ERROR", resultado, "danger");
                    $(obj.arrIDControles.txtFechaNac).val("");
                    obj.clearEdadAsegurado();
                } else {
                    obj.setEdadAsegurado(date.date.toLocaleDateString('es-SV'));
                }
            }
        });




        // Deshabilita los paneles
        $(".btn-panel").bind("click", false);

        //Valida los controles numericos
        $(".numeric").numeric({ negative: false, decimal: false });


        $(".numeric-currency").numeric(",");


        /*Carga de los catalogos generales*/
        obj.llenarDdlCatalogos("GEN", 0, "", obj.arrIDControles.ddlGenero);
        obj.llenarDdlCatalogos("FPA", 0, "", obj.arrIDControles.ddlFormaPago);
        obj.llenarDdlCatalogos("EFA", 0, "", obj.arrIDControles.ddlEstadoFam);
        obj.llenarDdlCatalogos("DPT", obj.objDatosCotizacion.datos_asegurado.id_pais, "", obj.arrIDControles.ddlDepto);

        obj.llenarDdlCatalogos("ALC", 0, "", obj.arrIDControles.ddlAlcanceTerritorial);
        obj.llenarDdlCatalogos("AGE", 0, "", obj.arrIDControles.ddlAgente);





        /*al cambiar el alcance se listan los planes gm y dental disponibles*/
        $(obj.arrIDControles.ddlAlcanceTerritorial).on("changed.bs.select ", function (event, clickedIndex, newValue, oldValue) {
            var selected = $(this).find("option:selected").val();
            $(obj.arrIDControles.ddlMaxVitalGM).prop("disabled", true);
            $(obj.arrIDControles.ddlMaxVitalDental).prop("disabled", true);
            $(obj.arrIDControles.ddlMaxVitalGM).selectpicker('refresh');
            $(obj.arrIDControles.ddlMaxVitalDental).selectpicker('refresh');
            if (selected != 0) {
                obj.llenarDdlCatalogos("PGM", selected, "", obj.arrIDControles.ddlMaxVitalGM);
                // obj.llenarDdlCatalogos("PGD", selected, "", obj.arrIDControles.ddlMaxVitalDental);

            }
            $(obj.arrIDControles.lblCoaseguroGM).html("");
            $(obj.arrIDControles.lblDeducibleGM).html("");

        });

        $(obj.arrIDControles.ddlDepto).on("changed.bs.select ", function (event, clickedIndex, newValue, oldValue) {
            var selected = $(this).find("option:selected").val();
            if (selected != 0)
                obj.llenarDdlCatalogos("CIU", selected, "", obj.arrIDControles.ddlCiudad);
        });

        $(obj.arrIDControles.ddlCiudad).on("changed.bs.select ", function (event, clickedIndex, newValue, oldValue) {
            var selected = $(this).find("option:selected").val();
            if (selected != 0)
                obj.llenarDdlCatalogos("COL", selected, "", obj.arrIDControles.ddlColonia);
        });

        $("input[name=" + obj.arrIDControles.rbtPlanDental + "]:radio").change(function () {
            if ($("#rbtPlanDentalS").prop("checked")) {
                $(obj.arrIDControles.maxVitalDental).show();

                $(obj.arrIDControles.ddlMaxVitalDental).prop("disabled", false);
            }
            else {
                $(obj.arrIDControles.maxVitalDental).hide();
                $(obj.arrIDControles.ddlMaxVitalDental).val("0");
                $(obj.arrIDControles.pnlInfoPlanDental).slideUp();
                $(obj.arrIDControles.ddlMaxVitalDental).prop("disabled", true);
            }
            $(obj.arrIDControles.ddlMaxVitalDental).selectpicker('refresh');
            //obj.actualizarInfoCoaseguroDedu(true);
        });

        $(obj.arrIDControles.ddlMaxVitalGM).on("changed.bs.select ", function (event, clickedIndex, newValue, oldValue) {
            var selected = $(this).find("option:selected").val();
            if (clickedIndex != 0) {
                obj.actualizarInfoCoaseguroDedu(false);
                obj.llenarDdlCatalogos("PGD", selected, "", obj.arrIDControles.ddlMaxVitalDental);

            }
        });

        $(obj.arrIDControles.ddlMaxVitalDental).on("changed.bs.select ", function (event, clickedIndex, newValue, oldValue) {
            if (clickedIndex != 0) {
                obj.actualizarInfoCoaseguroDedu(true);
                $(obj.arrIDControles.pnlInfoPlanDental).slideDown();
            } else {
                $(obj.arrIDControles.pnlInfoPlanDental).slideUp();
            }
        });

        $("input[name=" + obj.arrIDControles.rbtAdicionarDepen + "]:radio").change(function () {

            if ($("#rbtAdicionarDepenS").prop("checked"))
                $(obj.arrIDControles.pnlDependientes).show();
            else
                $(obj.arrIDControles.pnlDependientes).hide();

            obj.actualizarInfoCoaseguroDedu(false);
        });

        $(obj.arrIDControles.txtFechaNac).on("blur", function (event) {
            var fechaSeleccionada = $(this).val();
            if (fechaSeleccionada != "") {
                var resultado = obj.validarFecha(fechaSeleccionada, obj.min_edad_aseg, obj.max_edad_aseg);
                if (resultado.length > 0) {
                    mostrarNotificacion("ERROR", resultado, "danger");
                    $(obj.arrIDControles.txtFechaNac).val("");
                    obj.clearEdadAsegurado();
                } else {
                    obj.setEdadAsegurado(fechaSeleccionada);
                }

            }

        });

        $(".lstParentesco").on("blur", function (event) {
            var fechaSeleccionada = $(this).val();
            if (fechaSeleccionada != "") {
                var resultado = obj.validarFecha(fechaSeleccionada, obj.min_edad_depen, obj.min_edad_depen);
                if (resultado.length > 0) {
                    mostrarNotificacion("ERROR", resultado, "danger");
                    $(this).val("");
                }
            }
        });

        $(".btn-continue").on("click", function (e) {
            var IdCollapseFrom = $(this).data("collapse-from");
            var IdBtn = $(this).prop('id').toString();
            var valido = true;
            var error = "";
            var arrValores = null;
            // var arrDatosAsegurado = new Objet();
            switch (IdCollapseFrom) {
                case "panelDatos":
                    arrValores = new Array();
                    arrValores.push({ object: $(obj.arrIDControles.txtNombreAsegurado), data: "datos_asegurado.txt_nombres", type: 'string', required: true });
                    arrValores.push({ object: $(obj.arrIDControles.txtApellido1Aseg), data: "datos_asegurado.txt_apellido1", type: 'string', required: true });
                    arrValores.push({ object: $(obj.arrIDControles.txtApellido2Aseg), data: "datos_asegurado.txt_apellido2", type: 'string', required: false });
                    arrValores.push({ object: $(obj.arrIDControles.ddlGenero), data: "datos_asegurado.id_genero", type: 'numeric', required: true });
                    arrValores.push({ object: $(obj.arrIDControles.ddlAgente), data: "id_agente", type: 'numeric', required: false });
                    arrValores.push({ object: $(obj.arrIDControles.txtFechaNac), data: "datos_asegurado.fecha_nac", type: 'string', required: true });
                    arrValores.push({ object: $(obj.arrIDControles.ddlEstadoFam), data: "datos_asegurado.id_estado_familiar", type: 'numeric', required: true });
                    arrValores.push({ object: $(obj.arrIDControles.txtTelefono), data: "datos_asegurado.telefono", type: 'string', required: false });
                    arrValores.push({ object: $(obj.arrIDControles.txtTelefonoCelular), data: "datos_asegurado.telefono_movil", type: 'string', required: false });
                    arrValores.push({ object: $(obj.arrIDControles.txtEmail), data: "datos_asegurado.email", type: 'email', required: true });
                    arrValores.push({ object: $(obj.arrIDControles.ddlDepto), data: "datos_asegurado.id_departamento", type: 'numeric', required: true });
                    arrValores.push({ object: $(obj.arrIDControles.ddlCiudad), data: "datos_asegurado.id_ciudad", type: 'numeric', required: true });
                    arrValores.push({ object: $(obj.arrIDControles.ddlColonia), data: "datos_asegurado.id_colonia", type: 'numeric', required: false });
                    arrValores.push({ object: $(obj.arrIDControles.txtAddress), data: "datos_asegurado.direccion", type: 'string', required: false });
                    arrValores.push({ object: $(obj.arrIDControles.txtNumCasa), data: "datos_asegurado.num_casa", type: 'string', required: false });


                    break;
                case "panelCoberturas":
                    arrValores = new Array();
                    arrValores.push({ object: $(obj.arrIDControles.ddlAlcanceTerritorial), type: 'numeric', data: "id_alcance_terr", required: true });
                    arrValores.push({ object: $(obj.arrIDControles.ddlMaxVitalGM), type: 'numeric', data: "id_plan_gm", required: true });
                    arrValores.push({ object: $(obj.arrIDControles.ddlFormaPago), type: 'numeric', data: "id_forma_pago", required: true });
                    arrValores.push({ object: $(obj.arrIDControles.ddlMaxVitalDental), type: 'numeric', data: "id_plan_dental", required: false });

                    break;
                default:
                    break;
            }



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
                if (this.get == "text") {
                    if (id.indexOf("ddl") != -1)
                        value = this.object.find("option:selected").text();
                    else
                        value = this.object.text();
                }
                //if (this.data.indexOf('datos_asegurado') === -1) {
                eval("obj.objDatosCotizacion." + this.data + " = value; ");
                //}
            });

            /*Validaciones adicionales*/
            if (!obj.getDependientes() && $("#rbtAdicionarDepenS").prop("checked")) {
                valido = false;
                error += " -  Favor completar los datos de los dependientes con valores válidos.<br>";
            }

            if ($("#rbtPlanDentalS").prop("checked") && $(obj.arrIDControles.ddlMaxVitalDental).find("option:selected").val() == 0) {
                valido = false;
                error += " -  Favor seleccionar el máximo vitalicio del plan dental.<br>";
            }

            obj.objDatosCotizacion.sn_grupo_familiar = $("#rbtAdicionarDepenS").prop("checked");
            if (!obj.objDatosCotizacion.sn_grupo_familiar)
                obj.objDatosCotizacion.lstDependientes = new Array();
            else {
                obj.objDatosCotizacion.lstDependientes.push.apply(obj.objDatosCotizacion.lstDependientes, obj.arrDependientesDesactivados);
            }

            var resultadoDepenEdad = obj.validarDependientesEdad(obj.objDatosCotizacion.lstDependientes);
            if (resultadoDepenEdad != "") {
                valido = false;
                error += resultadoDepenEdad;
            }

            var objCollapseOpen = $("#" + $(this).data("collapse-open"));
            if (valido) {
                if (IdBtn == obj.arrIDControles.btnGuardar.replace("#", "")) {
                    obj.generarCotizacionGM(obj.objDatosCotizacion, objCollapseOpen);
                } else {
                    $("#" + objCollapseOpen.attr("aria-labelledby")).find(".btn-panel").unbind("click", false);
                    objCollapseOpen.collapse("show");
                }
            } else {
                mostrarNotificacion("Completar correctamente los siguientes campos<br>", error, "danger");
            }
            return false;
        });


        $(obj.arrIDControles.btnImprimir).on("click", function (e) {
            if (obj.objDatosCotizacion.id_cotizacion != 0) {
                var parametros = {
                    id: obj.objDatosCotizacion.id_cotizacion
                };
                obj.mostrarReporte(obj.url_imprimir_rpt_oferta_ind, parametros);


            } else {
                mostrarNotificacion("Alerta: ", "No existe cotización creada", "danger");
            }
            return false;
        });

        $(document).on('click', '.btn-add', function (e) {
            e.preventDefault();
            var controlForm = $('#tblDependientes');
            var currentEntry = $('#tblDependientes>tbody>tr:last');
            var newEntry = $(currentEntry.clone()).appendTo(controlForm);
            newEntry.find('input').val('');
            newEntry.find('.lstParentesco').replaceWith("<select name=\"ParentescoDepend[]\" class=\"selectpicker lstParentesco\" data-live-search=\"true\" id=\"1\">" +
                "<option value=\"0\">Seleccione una opción...</option></select>");
            $(obj.arrParentesco).each(function () {
                var option = $(document.createElement('option'));
                option.text(this.Descripcion);
                option.val(this.Codigo);
                newEntry.find('.lstParentesco').append(option);
            });
            newEntry.find('.lstParentesco').selectpicker('refresh');

            newEntry.find('.input-datepicker-dependientes').replaceWith("<input class='form-control input-datepicker-dependientes' name='FecNacDepend[]' type='text' placeholder='Fecha Nac.'  />");
            newEntry.find('.input-datepicker-dependientes').datepicker({
                format: "dd/mm/yyyy", startDate: "-65Y", language: "es"
            }).on("changeDate", function (date) {
                if (date != "") {
                    var resultado = obj.validarFecha(date.date.toLocaleDateString('es-SV'), obj.min_edad_depen, obj.max_edad_depen);
                    if (resultado.length > 0) {
                        mostrarNotificacion("ERROR", resultado, "danger");
                        $(this).val("");
                        date = "";
                    }
                }

            });

            var rowCount = $('#tblDependientes >tbody:last >tr').length;
            if (rowCount > 1) {
                var removeButtons = document.getElementsByClassName('btn-remove');
                for (var i = 0; i < removeButtons.length; i++) {
                    removeButtons.item(i).disabled = false;
                }
            }
        }).on('click', '.btn-remove', function (e) {
            var rowToRemove = $(this).parents('tr:first');
            var id = rowToRemove.find("input[name*='Id[]']").val() || 0;

            if (id != 0) {
                var parentescoDepend = rowToRemove.find(".lstParentesco").find("option:selected").val();
                var nombreDepend = rowToRemove.find("input[name*='NombresDependiente[]']").val();
                var apellido1Depend = rowToRemove.find("input[name*='Apellido1Dependiente[]']").val();
                var apellido2Depend = rowToRemove.find("input[name*='Apellido2Dependiente[]']").val();
                var fechaNacDepend = rowToRemove.find("input[name*='FecNacDepend[]']").val();
                obj.arrDependientesDesactivados.push({
                    id_dependiente: id,
                    id_parentesco: parentescoDepend,
                    txt_nombres: nombreDepend,
                    txt_apellido1: apellido1Depend,
                    txt_apellido2: apellido2Depend,
                    fecha_nac: fechaNacDepend,
                    sn_activo: false
                });

            }

            $(this).parents('tr:first').remove();
            //Disable the Remove Button
            var rowCount = $('#tblDependientes >tbody:last >tr').length;
            if (rowCount == 1) {
                document.getElementsByClassName('btn-remove')[0].disabled = true;
            }
            e.preventDefault();
            return false;
        });



    };

    this.setEdadAsegurado = function (fechaSeleccionada) {
        $(this.arrIDControles.lblEdad).html(calcularEdad(fechaSeleccionada) + ' años');
    };

    this.clearEdadAsegurado = function () {
        $(this.arrIDControles.lblEdad).html("");
    };
    this.llenarDdlCatalogos = function (opcion, param_int, param_str, id_control) {
        var obj = this;
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
                if (opcion == "PAG")
                    obj.arrParentesco = datos;
                $(datos).each(function () {
                    var option = $(document.createElement('option'));
                    option.text(this.Descripcion);
                    option.val(this.Codigo);

                    /* if (this.Descripcion.trim() === 'SAN SALVADOR')
                         option.context.selected = true;*/
                    $(id_control).append(option);
                });

                if ($(id_control).prop("disabled") == true) {
                    $(id_control).prop("disabled", false);
                }
                $(id_control).selectpicker('refresh');
            }
        });
    };


    this.generarCotizacionGM = function (params, objCollapseOpen) {
        var obj = this;
        var datos = JSON.stringify(params);
        datos = datos.replace(/"/g, '\\"');
        return $.ajax({
            type: "POST",
            url: this.url_generar_prima_cotizacion,
            data: "{ 'param':'" + datos + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, mgs) {
                if (mgs === "success") {
                    var datos;
                    if (data.Exito) {

                        if (obj.objDatosCotizacion.id_cotizacion == 0)
                            mostrarNotificacion('', 'Se generó correctamente la solicitud número:' + data.IdInsertado, 'success');
                        else
                            mostrarNotificacion('', 'Se modificó correctamente la solicitud número:' + data.IdInsertado, 'success');

                        obj.objDatosCotizacion.id_cotizacion = data.IdInsertado;

                        /*Inserta resultado final de primas por dependiente y asegurado*/
                        $('#tblDependientesResultado > tbody').html("");
                        $.each(data.Datos.Table, function (i, o) {
                            obj.adicionarResultDependiente(this.nombre_completo, this.parentesco, this.monto_anual_gm, this.monto_anual_dental);
                        });

                        /*Llena los datos de los dependientes almacenados*/
                        if (obj.objDatosCotizacion.sn_grupo_familiar)
                            obj.llenarTablaDependientes(data.Datos.Table);

                        /*Llena los montos totales */
                        $(obj.arrIDControles.txtTotalPrimaFin).html(data.Datos.Table1[0].monto_prima_total_anual_sin_rpn);
                        $(obj.arrIDControles.txtRPN).html(data.Datos.Table1[0].recargo_rpn);
                         $(obj.arrIDControles.txtPrimaNetaTotal).html(data.Datos.Table1[0].monto_prima_total_anual);
                        $(obj.arrIDControles.txtTotalDescuento).html(data.Datos.Table1[0].monto_total_descuentos);

                        $(obj.arrIDControles.lblCouta).html("Prima " + $(obj.arrIDControles.ddlFormaPago).find("option:selected").text().toLowerCase() + ":");
                        $(obj.arrIDControles.txtPrimaCouta).html(data.Datos.Table1[0].prima_cuota);

                        $("#" + objCollapseOpen.attr("aria-labelledby")).find(".btn-panel").unbind("click", false);
                        objCollapseOpen.collapse("show");
                    }
                    else
                        mostrarNotificacion("Error: ", data.Mensaje, "danger");
                }

            }
        });
    }


    this.actualizarInfoCoaseguroDedu = function (evalua_dental) {
        var id_alcance_territorial = $(this.arrIDControles.ddlAlcanceTerritorial).find("option:selected").val();
        var sn_dental = $("#rbtPlanDentalS").prop("checked");
        var sn_grupo_familiar = $("#rbtAdicionarDepenS").prop("checked");
        var newArreglo = new Array();

        if (evalua_dental) {
            sn_dental = true;
            id_alcance_territorial = 3;
            sn_grupo_familiar = 0;
            newArreglo.lblCoaseguro = this.arrIDControles.lblCoaseguroDental;
            newArreglo.lblDeducible = this.arrIDControles.lblDeducibleDental;
        } else {
            sn_dental = false;
            newArreglo.lblCoaseguro = this.arrIDControles.lblCoaseguroGM;
            newArreglo.lblDeducible = this.arrIDControles.lblDeducibleGM;
        }

        if (id_alcance_territorial != 0) {
            this.getDatosDeduCoaseguro(id_alcance_territorial, sn_dental, sn_grupo_familiar, newArreglo);
        }
    };

    this.getDatosDeduCoaseguro = function (id_alcance_territorial, sn_dental, sn_grupo_familiar, arrControlesInfo) {
        var obj = this;
        $(arrControlesInfo.lblCoaseguro).html("");
        $(arrControlesInfo.lblDeducible).html("");
        return $.ajax({
            type: "POST",
            url: this.url_datos_dedu_coaseguro,
            data: "{ 'id_alcance_territorial': " + id_alcance_territorial + ", 'sn_dental': " + sn_dental + ", 'sn_grupo_familiar': " + sn_grupo_familiar + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, mj) {
                if (mj == "success") {
                    var value;
                    var datosCoaseguro = "";
                    var datosDeducible = "";
                    $.each(data, function (i, o) {
                        if (this.Tipo == 'D')
                            datosDeducible = datosDeducible + "<li>" + this.Descripcion + "</li>";
                        else
                            datosCoaseguro = datosCoaseguro + "<li>" + this.Descripcion + "</li>";
                    });

                    $(arrControlesInfo.lblCoaseguro).append(datosCoaseguro);
                    $(arrControlesInfo.lblDeducible).append(datosDeducible);

                }
            }
        });
    };


    this.limpiarDatosPago = function () {
        $(this.arrIDControles.ddlNumCuotas).val("");
        $(this.arrIDControles.txtPagoFracc).val("");
        $(this.arrIDControles.txtTotalPrimaIni).html("");
        $(this.arrIDControles.txtTotalPrimaFin).html("");
        $(this.arrIDControles.txtNumPrimasIni).html("");
        $(this.arrIDControles.txtNumPrimasFin).html("");
    }

    this.mostrarReporte = function (_url, parametros) {
        window.open(_url + '?' + $.param(parametros), 'blank', '', false);
    }

    this.getDependientes = function () {
        var arrDependientes = new Array();
        var row = null;
        var valido = true;
        $('#tblDependientes > tbody > tr').each(function () {
            row = $(this);
            var parentescoDepend = row.find(".lstParentesco").find("option:selected").val();
            var id = row.find("input[name*='Id[]']").val() || 0;
            var nombreDepend = row.find("input[name*='NombresDependiente[]']").val();
            var apellido1Depend = row.find("input[name*='Apellido1Dependiente[]']").val();
            var apellido2Depend = row.find("input[name*='Apellido2Dependiente[]']").val();
            var fechaNacDepend = row.find("input[name*='FecNacDepend[]']").val();
            if (parentescoDepend != 0 && nombreDepend.length > 0 && apellido1Depend.length > 0 && isValidDate(fechaNacDepend, 'dd/mm/yyyy')) {
                arrDependientes.push(
                 {
                     id_dependiente: id,
                     id_parentesco: parentescoDepend,
                     txt_nombres: nombreDepend,
                     txt_apellido1: apellido1Depend,
                     txt_apellido2: apellido2Depend,
                     fecha_nac: fechaNacDepend,
                     sn_activo: true
                 });
            } else {
                valido = false
                return false;
            }
        });
        this.objDatosCotizacion.lstDependientes = arrDependientes;
        return valido;
    }

    this.adicionarResultDependiente = function (nombre_completo, parentesco, prima_anual_gm, prima_anual_dental) {
        var controlForm = $('#tblDependientesResultado');
        var row = '<tr><td style="width:30%">' + nombre_completo + '</td>' +
                    '<td style="width:25%">' + parentesco + '</td> ' +
                    '<td style="width:15%">' + accounting.formatMoney(prima_anual_gm) + '</td>' +
                    '<td style="width:15%">' + accounting.formatMoney(prima_anual_dental) + '</td>' +
                    '<td style="width:15%">' + accounting.formatMoney(prima_anual_gm + prima_anual_dental) + '</td></tr> ';
        var newEntry = $(row).appendTo(controlForm);

    }

    this.validarFecha = function (date, rangoMin, rangoMax) {
        var validDate = isValidDate(date, 'dd/mm/yyyy');
        //debugger;
        var today = new Date();
        var fecha = parseDMY(date);
        var result = "";
        if (validDate) {
            var totalYear = today.getFullYear() - fecha.getFullYear();
            if (totalYear < rangoMin || totalYear > rangoMax)
                result = "La edad debe estar entre los " + rangoMin + " y " + rangoMax + " años.";
        } else {
            result = "Fecha inválida.";
        }
        return result;
    }
    this.validarDependientesEdad = function (arrDependientes) {
        var resultadoValidacion = "";
        var obj = this;
        if (arrDependientes.length > 0) {
            $.each(arrDependientes, function (index, value) {
                var edad_dependiente = calcularEdad(this.fecha_nac);
                var rangoMin = 0;
                var rangoMax = 9999;
                if (this.sn_activo) {
                    if ($.inArray(parseInt(this.id_parentesco), obj.arr_id_parentesco_no_hijos) != -1) {
                        rangoMin = obj.min_edad_aseg;
                        rangoMax = obj.max_edad_depen;
                    } else {
                        rangoMin = obj.min_edad_h_depen;
                        rangoMax = obj.max_edad_h_depen;
                    }

                    if (edad_dependiente < rangoMin || edad_dependiente > rangoMax) {
                        resultadoValidacion += " ► La edad del dependiente " + this.txt_nombres + " " + this.txt_apellido1;
                        resultadoValidacion += " debe estar entre los " + rangoMin + " y " + rangoMax + " años, para ser incluido a la póliza. <br>";
                    }
                }

            });
        }
        return resultadoValidacion;
    }
    this.llenarTablaDependientes = function (arrDatos) {
        var iDependiente = 1;
        $('#tblDependientes > tbody > tr').each(function () {
            row = $(this);
            var control_id = row.find("input[name*='Id[]']");
            var control_parentescoDepend = row.find(".lstParentesco");
            var control_nombreDepend = row.find("input[name*='NombresDependiente[]']");
            var control_apellido1Depend = row.find("input[name*='Apellido1Dependiente[]']");
            var control_apellido2Depend = row.find("input[name*='Apellido2Dependiente[]']");
            var control_fechaNacDepend = row.find("input[name*='FecNacDepend[]']");

            if (arrDatos[iDependiente].sn_asegurado == false) {
                control_id.val(arrDatos[iDependiente].id_persona_gm);
                control_parentescoDepend.val(arrDatos[iDependiente].id_parentesco);
                control_nombreDepend.val(arrDatos[iDependiente].txt_nombres);
                control_apellido1Depend.val(arrDatos[iDependiente].txt_apellido1);
                control_apellido2Depend.val(arrDatos[iDependiente].txt_apellido2);
                control_fechaNacDepend.val(arrDatos[iDependiente].fecha_nac);
                control_parentescoDepend.selectpicker('refresh');
            }
            iDependiente += 1;
        });
    }
};



