import React, {useEffect} from "react";
import Nav from "./Nav";
import {useNavigate, useParams} from "react-router-dom";
import {fetchQuoteDetail} from "../reducers/action/finCurrentGuid";
import {connect} from "react-redux";

const Personalizado =({userData, fetchQuoteDetail})=>{

    const {guid} = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        fetchQuoteDetail(guid)

    }, [guid, fetchQuoteDetail])

    var data =[]

    if(userData["CustomFields"] &&  userData["CustomFields"]["CustomField"]){

        data =  userData["CustomFields"]["CustomField"];
    }

    let allow_fiields=["etd00","eta00","_booking","status_mathis","ready_date","cliente_nuevo_","pick_up","overweight","oversize","imo_cargo","seguro_de_carga","acarreo_","ayudante","personal_de_descarga",
                        "liq_aduanal","pago_impuesto","aupsa","cuarentena","otros_aduana","montacarga","courier","perfil_cliente","notas_internas","carga_para_proyecto_de_obras","pend_cargos_origen",
                        "detalle_pend_origen","operador1","programacion_de_cargue","booking_enviado_al_cliente","instrucciones_de_exportacion_enviadas_al_agente","factura_comercial_enviada_a_cdc",
                        "pre_alerta_enviado_al_consignatario","status","revisada_por_pricing","revisada_por_oper","qt_enviada_al_cliente","cliente_aprobo","ruteo_con_agente_realizado","documentos_recibidos",
                        "revisado_por","consecutivo_pricing","tarifa_ofrecida","cod_destino","acarreo_a_cfz","cambio_de_destino__puerto_final","cod_puerto_original","cod_puerto_final","buquevessel","vessel_name",
                        "fecha_de_entrega_cont_en_puerto","fecha_de_solicitud_de_booking","revisado_tracking"];

    let allow_fields_name=["ETD","ETA","# BOOKING","STATUS","READY DATE","CLIENTE (STATUS)","PICK UP","OVERWEIGHT","OVERSIZE","IMO CARGO","SEGURO DE CARGA","ACARREO","AYUDANTE","PERSONAL DESCARGUE/CARGUE",
                        "LIQ. ADUANAL","PAGO IMPUESTO","AUPSA","CUARENTENA","OTROS ADUANA","MONTACARGA","COURIER","PERFIL CLIENTE","NOTAS_INTERNAS","CARGA PARA PROYECTO DE OBRAS","PEND. CARGOS ORIGEN",
                        "DETALLE PEND ORIGEN","OPERADOR","Programacion de Cargue","BOOKING ENVIADO AL CLIENTE","INSTRUCCIONES DE EXPORTACION ENVIADAS AL AGENTE","FACTURA COMERCIAL ENVIADA A CDC",
                        "PRE ALERTA ENVIADO AL CONSIGNATARIO","STATUS","REVISADA POR PRICING","REVISADA POR OPER","QT ENVIADA AL CLIENTE","CLIENTE APROBO","RUTEO CON AGENTE REALIZADO","Documentos recibidos",
                        "Revisado por","CONSECUTIVO PRICING","TARIFA OFRECIDA","COD DESTINO","ACARREO A CFZ","CAMBIO DE DESTINO / PUERTO FINAL","COD PUERTO ORIGINAL","COD PUERTO FINAL","BUQUE/VESSEL","NUMERO DE VIAJE",
                        "Fecha de Entrega Cont en Puerto","Fecha de Solicitud de Booking","REVISADO TRACKING"];


    const mostrarCamposPersonalizados = data.map((datos, i) => {

        if(datos["CustomFieldDefinition"]["Category"]==="GENERAL"){

            if(allow_fiields.includes(datos["CustomFieldDefinition"]["InternalName"])){

                let index=allow_fiields.indexOf(datos["CustomFieldDefinition"]["InternalName"]);

                return (
                    <div className="col-md-3" key={i}>
                        <div className="form-group">
                            <label className="font-weight-bold">{allow_fields_name[index]}</label>
                            <p>{datos['Value']}</p>
                        </div>

                    </div>
                )
            }else{
                return null;
            }

        }else{
            return null
        }
    })


    return (

        <div id="wrapper">

            <div id="content-wrapper" className="d-flex flex-column">

                <div id="content">
                    <Nav/>
                    <div className="row p-3">

                        <div className="col-md-12">
                            <button className="btn btn-outline-secondary m-3" onClick={() => {navigate(`/quotes-details/${guid}`, { replace: true });}}>
                                <i className="fas fa-arrow-left  text-gray-400"></i>&nbsp;
                                Cotización #
                            </button>
                            <button className="btn btn-primary m-3" onClick={() => {navigate('/quotes-details/routes/'+guid, { replace: true });}}>
                                Ruta &nbsp;
                                <i className="fas fa-arrow-right  text-gray-400"></i>

                            </button>

                            <button className="btn btn-primary m-3" onClick={() => {navigate('/quotes-details/charges/'+guid, { replace: true });}}>
                                Cargos &nbsp;
                                <i className="fas fa-arrow-right  text-gray-400"></i>

                            </button>
                            <div className="col-md-12">
                                <h6>Campos Personalizados de la Cotización # {guid}</h6>

                            </div>
                        </div>


                        <div className="col-lg-12 col col-12">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">Campos Personalizados  (GENERAL)</h6>
                                </div>
                                <div className="card-body row">

                                    {mostrarCamposPersonalizados}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}

const mapStateToProps = state => {
    return {
        userData: state.data.payload
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchQuoteDetail: (guid) => dispatch(fetchQuoteDetail(guid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Personalizado);
