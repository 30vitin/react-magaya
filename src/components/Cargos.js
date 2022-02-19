import React, {useEffect} from "react";
import Nav from "./Nav";
import {useNavigate, useParams} from "react-router-dom";
import {fetchQuoteDetail} from "../reducers/action/finCurrentGuid";
import {connect} from "react-redux";


const Cargos = ({userData, fetchQuoteDetail}) => {

    const {guid} = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        fetchQuoteDetail(guid)

    }, [guid, fetchQuoteDetail])

    var data = [];

    if (userData["Charges"] && userData["Charges"]["Charge"]) {
        if(userData["Charges"]["Charge"].length>0){

            data=userData["Charges"]["Charge"]

        }else{
            data.push(userData["Charges"]["Charge"])


        }
    }


    const mostrarCargos = data.map((datos, i) => {

        var descripcion = (datos["ChargeDefinition"]) ? datos["ChargeDefinition"]["Description"] : ""
        var precio = (datos["Price"]) ? Number(datos["Price"]["#text"]).toFixed(2) : ""
        var valor = (datos["PriceInCurrency"]) ? Number(datos["PriceInCurrency"]["#text"]).toFixed(2) : ""
        var total_amount = (datos["AmountInCurrency"]) ? Number(datos["AmountInCurrency"]["#text"]).toFixed(2) : ""
        var home_currency = (datos["HomeCurrency"]) ? datos["HomeCurrency"]["Name"] : ""
        //var gastos = (datos["ChargeDefinition"] && userData["ChargeDefinition"][""])
        var gastos = "0.00"
        var ingresos = (datos["ChargeDefinition"] && datos["ChargeDefinition"]["Amount"]) ? Number(datos["ChargeDefinition"]["Amount"]["#text"]).toFixed(2) : ""

        var aplicar_a = (datos["Entity"]) ? datos["Entity"]["Name"] : ""
        var codigo = (datos["ChargeDefinition"]) ? datos["ChargeDefinition"]["Code"] : ""
        return (
            <tr key={i}>
                <td><p className="small">{datos['Status']}</p></td>
                <td><p className="small">{descripcion}</p></td>
                <td><p className="small">{datos["IsPrepaid"]}</p></td>
                <td><p className="small">{datos['Quantity']}</p></td>
                <td><p className="small">{precio}</p></td>
                <td><p className="small">{valor}</p></td>

                <td><p className="small">{Number(datos['ExchangeRate']).toFixed(2)}</p></td>
                <td><p className="small">{total_amount}</p></td>
                <td><p className="small">{home_currency}</p></td>
                <td><p className="small">{gastos}</p></td>
                <td><p className="small">{ingresos}</p></td>

                <td><p className="small">{aplicar_a}</p></td>
                <td><p className="small">{codigo}</p></td>

            </tr>
        )

    });


    return (
        <div id="wrapper">

            <div id="content-wrapper" className="d-flex flex-column">

                <div id="content">
                    <Nav/>
                    <div className="row p-3">
                        <div className="col-md-12">
                            <button className="btn btn-outline-secondary m-3" onClick={() => {
                                navigate(`/quotes-details/${guid}`, {replace: true});
                            }}>
                                <i className="fas fa-arrow-left  text-gray-400"></i>&nbsp;
                                Cotización
                            </button>
                            <button className="btn btn-primary m-3" onClick={() => {
                                navigate('/quotes-details/routes/' + guid, {replace: true});
                            }}>
                                Ruta &nbsp;
                                <i className="fas fa-arrow-right  text-gray-400"></i>

                            </button>

                            <button className="btn btn-primary m-3" onClick={() => {
                                navigate('/quotes-details/customs-fields/' + guid, {replace: true});
                            }}>
                                Personalizado &nbsp;
                                <i className="fas fa-arrow-right  text-gray-400"></i>

                            </button>
                            <div className="col-md-12">
                                <h6>Cargos de la Cotización # {guid}</h6>

                            </div>

                            <div className="col-lg-12 col col-12">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">Cargos</h6>
                                    </div>
                                    <div className="card-body row">

                                        <div className="table-responsive hover">

                                            <table className="table table-bordered" id="dataTable" width="100%"
                                                   cellSpacing="0">
                                                <thead>
                                                <tr>

                                                    <th className="small"><strong>Estado</strong></th>
                                                    <th className="small"><strong>Descripción</strong></th>
                                                    <th className="small"><strong>Preparado</strong></th>
                                                    <th className="small"><strong>Cantidad</strong></th>
                                                    <th className="small"><strong>Precio</strong></th>
                                                    <th className="small"><strong>Valor</strong></th>

                                                    <th className="small"><strong>Tarifa</strong></th>
                                                    <th className="small"><strong>Cantidad+Imp</strong></th>
                                                    <th className="small"><strong>Moneda</strong></th>
                                                    <th className="small"><strong>Gastos</strong></th>
                                                    <th className="small"><strong>Ingresos</strong></th>
                                                    <th className="small"><strong>Aplicar a</strong></th>
                                                    <th className="small"><strong>Codigo</strong></th>

                                                </tr>
                                                </thead>

                                                <tbody>

                                                {mostrarCargos}

                                                </tbody>

                                            </table>


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

export default connect(mapStateToProps, mapDispatchToProps)(Cargos);
