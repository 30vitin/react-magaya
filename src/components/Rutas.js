import React, {useEffect} from "react";
import Nav from "./Nav";
import {useNavigate, useParams} from "react-router-dom";
import {fetchQuoteDetail} from "../reducers/action/finCurrentGuid";
import {connect} from "react-redux";


const Rutas = ({userData, fetchQuoteDetail}) => {

    const {guid} = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        fetchQuoteDetail(guid)

    }, [guid, fetchQuoteDetail])


    var service_type=(userData["Service"])?userData["Service"]:""
    var transportista_principal = (userData["Carrier"])?userData["Carrier"]["Name"]:""
    var modo_transportacion = (userData["ModeOfTransportation"])?userData["ModeOfTransportation"]["Description"]:""
    var address_origen = (userData["Shipper"] && userData["Shipper"]["Address"])?userData["Shipper"]["Address"]["Street"]:""
    var puerto_carga = (userData["OriginPort"])?userData["OriginPort"]["Name"]:""
    var expedidor = (userData["ShipperName"])?userData["ShipperName"]:""
    var puerto_descarga = (userData["DestinationPort"])? userData["DestinationPort"]["Name"]:""
    var lugar_entrega = (userData["DeliveryPort"])?userData["DeliveryPort"]["Name"]:""
    var consignatario =(userData["ContactName"])? userData["ContactName"]:""
    var address_destino = (userData["Contact"] && userData["Contact"]["Address"])?userData["Contact"]["Address"]["Street"]:""
    return (

        <div id="wrapper">

            <div id="content-wrapper" className="d-flex flex-column">

                <div id="content">
                    <Nav/>
                    <div className="row p-3">
                        <div className="col-md-12">
                            <button className="btn btn-outline-secondary m-3" onClick={() => {navigate(`/quotes-details/${guid}`, { replace: true });}}>
                                <i className="fas fa-arrow-left  text-gray-400"></i>&nbsp;
                                Cotización
                            </button>
                            <button className="btn btn-primary m-3" onClick={() => {navigate('/quotes-details/charges/'+guid, { replace: true });}}>
                                Cargos &nbsp;
                                <i className="fas fa-arrow-right  text-gray-400"></i>

                            </button>
                            <button className="btn btn-primary m-3" onClick={() => {navigate('/quotes-details/customs-fields/'+guid, { replace: true });}}>
                                Personalizado &nbsp;
                                <i className="fas fa-arrow-right  text-gray-400"></i>

                            </button>
                            <div className="col-md-12">
                                <h6>Ruta de la Cotización # {guid}</h6>

                            </div>
                        </div>
                        <div className="col-lg-12 col col-12">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">Información General</h6>
                                </div>
                                <div className="card-body row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="font-weight-bold">Tipo de Servicio</label>
                                            <p>{service_type}</p>
                                        </div>
                                        <div className="form-group">
                                            <label className="font-weight-bold">Transportista principal</label>
                                            <p>{transportista_principal}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="font-weight-bold">Modo de transportación</label>
                                            <p>{modo_transportacion}</p>
                                        </div>
                                        <div className="form-group">
                                            <label className="font-weight-bold">Ruta</label>

                                            <p> </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>


                        <div className="col-lg-6 col col-12">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">Datos de Origen</h6>
                                </div>
                                <div className="card-body row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="font-weight-bold">Puerto de Carga</label>
                                            <p>{puerto_carga}</p>
                                        </div>
                                        <div className="form-group">
                                            <label className="font-weight-bold">Lugar de Recolección</label>
                                            <p></p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="font-weight-bold">Pre-Transporte por</label>
                                            <p></p>
                                        </div>
                                        <div className="form-group">
                                            <label className="font-weight-bold">Expedidor</label>

                                            <p>{expedidor}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="font-weight-bold">Dirección</label>
                                            <p>{address_origen}</p>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col col-12">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">Datos de Destino</h6>
                                </div>
                                <div className="card-body row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="font-weight-bold">Puerto de Descarga</label>
                                            <p>{puerto_descarga}</p>
                                        </div>
                                        <div className="form-group">
                                            <label className="font-weight-bold">Lugar de Entrega</label>
                                            <p>{lugar_entrega}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="font-weight-bold">En-Transporte por</label>
                                            <p></p>
                                        </div>
                                        <div className="form-group">
                                            <label className="font-weight-bold">Consignatario</label>

                                            <p>{consignatario}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="font-weight-bold">Dirección</label>
                                            <p>{address_destino}</p>
                                        </div>

                                    </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(Rutas);

