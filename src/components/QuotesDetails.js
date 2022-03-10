import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {connect} from "react-redux";
import {fetchQuoteDetail} from '../reducers/action/finCurrentGuid'
import Nav from "./Nav";


function QuotesDetails({userData, fetchQuoteDetail}) {
    const {guid} = useParams();
    const navigate = useNavigate()
    useEffect(() => {
        fetchQuoteDetail(guid)

    }, [guid, fetchQuoteDetail])

     //console.log(userData)
    var CreatedOn_quote = "";
    var ExpirationDate_quote = ""
    var total_peso = ""
    var total_volumen =""

    if (userData['CreatedOn']) {
        var CreatedOn = new Date(userData['CreatedOn']);

        var CreatedOn_years = CreatedOn.getFullYear();
        var CreatedOn_month = ((CreatedOn.getMonth() + 1) <= 9 ? "0" + (CreatedOn.getMonth() + 1) : (CreatedOn.getMonth() + 1))
        var CreatedOn_day = (CreatedOn.getDate() <= 9 ? "0" + CreatedOn.getDate() : CreatedOn.getDate());
        CreatedOn_quote = CreatedOn_years + "-" + CreatedOn_month + "-" + CreatedOn_day
    }
    if (userData['ExpirationDate']) {
        var ExpirationDate = new Date(userData['ExpirationDate']);

        var ExpirationDate_years = ExpirationDate.getFullYear();
        var ExpirationDate_month = ((ExpirationDate.getMonth() + 1) <= 9 ? "0" + (ExpirationDate.getMonth() + 1) : (ExpirationDate.getMonth() + 1))
        var ExpirationDate_day = (ExpirationDate.getDate() <= 9 ? "0" + ExpirationDate.getDate() : ExpirationDate.getDate());
        ExpirationDate_quote = ExpirationDate_years + "-" + ExpirationDate_month + "-" + ExpirationDate_day
    }

    let items = []

    if (userData["Items"] && userData["Items"]["Item"]) {

        if(userData["Items"]["Item"].length>0){
            items = userData["Items"]["Item"]
        }else{

            items.push(userData["Items"]["Item"])
        }
    }
    if (userData["TotalWeight"]) {
        total_peso = Number(userData["TotalWeight"]["#text"]).toFixed(2) + " " + userData["TotalWeight"]["@Unit"]
    }
    if (userData["TotalVolume"]) {
        total_volumen = Number(userData["TotalVolume"]["#text"]).toFixed(2) + " " + userData["TotalVolume"]["@Unit"]
    }

    var vendedor = ''
    if (userData["IssuedBy"] && userData["IssuedBy"]["CustomFields"] && userData["IssuedBy"]["CustomFields"]["CustomField"]) {
        var array_issue = (userData["IssuedBy"]['CustomFields'] && userData["IssuedBy"]['CustomFields']['CustomField']) ? userData["IssuedBy"]['CustomFields']['CustomField'] : []

        Object.keys(array_issue).forEach(key => {

           if (array_issue['CustomFieldDefinition']['DisplayName'] && array_issue['CustomFieldDefinition']['DisplayName'] === 'VENDEDOR'){

               vendedor = array_issue['Value']

            }
        })
    }
    var mostrarItems = items.map((item, i) => {
        let embalaje = ""
        let longitud = ""
        let altura = ""
        let ancho = ""
        let peso = ""
        let volumen = ""
        // console.log(userData)

        if (item["Package"]) {
            embalaje = item["Package"]["Name"];
        }
        if (item["Length"]) {
            longitud = Number(item["Length"]["#text"]).toFixed(2)
        }
        if (item["Height"]) {
            altura = Number(item["Height"]["#text"]).toFixed(2)
        }
        if (item["Width"]) {
            ancho = Number(item["Width"]["#text"]).toFixed(2)
        }
        if (item["Weight"]) {
            peso = Number(item["Weight"]["#text"]).toFixed(2)
        }
        if (item["Volume"]) {
            volumen = Number(item["Volume"]["#text"]).toFixed(2)
        }
        return (
            <tr key={i}>
                <td><p className="small">{item['@GUID']}</p></td>

                <td><p className="small">{item['Status']}</p></td>
                <td><p className="small">{embalaje}</p></td>
                <td><p className="small">{item["Pieces"]}</p></td>
                <td><p className="small">{longitud}</p></td>
                <td><p className="small">{altura}</p></td>
                <td><p className="small">{ancho}</p></td>
                <td><p className="small">{peso}</p></td>
                <td><p className="small">{volumen}</p></td>
                <td><p className="small">{item["IsSummarized"]}</p></td>
            </tr>
        );
    })


    return (
        <div id="wrapper">

            <div id="content-wrapper" className="d-flex flex-column">

                <div id="content">
                    <Nav/>
                    <div className="row p-3">

                        <div className="col-md-12">
                            <button className="btn btn-outline-secondary m-3" onClick={() => {navigate('/list', { replace: true });}}>
                                <i className="fas fa-arrow-left  text-gray-400"></i>&nbsp;
                                Listar
                            </button>
                            <button className="btn btn-primary m-3" onClick={() => {navigate('/quotes-details/routes/'+guid, { replace: true });}}>
                                Ruta &nbsp;
                                <i className="fas fa-arrow-right  text-gray-400"></i>

                            </button>

                            <button className="btn btn-primary m-3" onClick={() => {navigate('/quotes-details/charges/'+guid, { replace: true });}}>
                                Cargos &nbsp;
                                <i className="fas fa-arrow-right  text-gray-400"></i>

                            </button>
                            <button className="btn btn-primary m-3" onClick={() => {navigate('/quotes-details/customs-fields/'+guid, { replace: true });}}>
                                Personalizado &nbsp;
                                <i className="fas fa-arrow-right  text-gray-400"></i>

                            </button>
                        </div>
                        <div className="col-md-12">
                            <h6>Cotización # {userData["@GUID"]}</h6>

                        </div>
                        <div className="col-lg-12">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">Información de la Cotización</h6>
                                </div>
                                <div className="card-body row">
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label className="font-weight-bold">No. Cotización</label>
                                            <p>{userData['@GUID']}</p>
                                        </div>
                                        <div className="form-group">
                                            <label className="font-weight-bold">Fecha</label>
                                            <p>{CreatedOn_quote}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label className="font-weight-bold">Status</label>
                                            <p>{userData['Status']}</p>
                                        </div>
                                        <div className="form-group">
                                            <label className="font-weight-bold">Expira en</label>

                                            <p> {ExpirationDate_quote}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label className="font-weight-bold">Empleado</label>

                                            <p> {userData["CreatedByName"]}</p>
                                        </div>
                                        <div className="form-group">
                                            <label className="font-weight-bold">Vendedor</label>
                                            <p>{vendedor}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3">

                                        <div className="form-group">
                                            <label className="font-weight-bold">Division</label>

                                            <p> {(userData["Division"]) ? userData["Division"]["Name"] : ""}</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">Información General</h6>
                                </div>
                                <div className="card-body row">
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label className="font-weight-bold">Cliente</label>
                                            <p>{userData['SalespersonName']}</p>
                                        </div>
                                        <div className="form-group">
                                            <label className="font-weight-bold">Teléfono</label>
                                            <p> {(userData["Salesperson"]) ? userData["Salesperson"]["Phone"] : ""}</p>
                                        </div>
                                        <div className="form-group">
                                            <label className="font-weight-bold">Email</label>
                                            <p>{(userData["Salesperson"]) ? userData["Salesperson"]["Email"] : ""}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4 row">

                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label className="font-weight-bold">Dirección</label>
                                                <p>{(userData["Salesperson"] && userData["Salesperson"]["Address"]) ? userData["Salesperson"]["Address"]["Street"] : ""}</p>
                                            </div>
                                        </div>


                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="font-weight-bold">Ciudad</label>
                                                <p>{(userData["Salesperson"] && userData["Salesperson"]["Address"]) ? userData["Salesperson"]["Address"]["City"] : ""}</p>

                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="font-weight-bold">Pais</label>
                                                <p>{(userData["Salesperson"] && userData["Salesperson"]["Address"]) ? userData["Salesperson"]["Address"]["State"] : ""}</p>

                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-md-4 row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="font-weight-bold">Modo de Transportación</label>
                                                <p>{(userData["ModeOfTransportation"]) ? userData["ModeOfTransportation"]["Description"] : ""}</p>

                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="font-weight-bold">Dirección</label>
                                                <p>{userData["Direction"]}</p>

                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="font-weight-bold">Incoterm</label>
                                                <p>{(userData["Incoterm"]) ? userData["Incoterm"]["Code"] + "" + userData["Incoterm"]["Description"] : ""}</p>

                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="font-weight-bold">Frecuencia</label>

                                                <p> {userData["Frequency"]}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="font-weight-bold">Descripción de Carga</label>
                                                <p> {userData["DescriptionOfGoods"]}</p>

                                            </div>
                                        </div>


                                    </div>

                                </div>
                            </div>

                        </div>
                        <div className="col-lg-12">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">Información General de los
                                        Productos</h6>
                                </div>
                                <div className="card-body">

                                    <div className="table-responsive hover">

                                        <table className="table table-bordered" id="dataTable" width="100%"
                                               cellSpacing="0">
                                            <thead>
                                            <tr>
                                                <th className="small"><strong>GUID</strong></th>

                                                <th className="small"><strong>Estado</strong></th>
                                                <th className="small"><strong>Embalaje</strong></th>
                                                {/*}th className="small"><strong>Descripción</strong></th>*/}
                                                <th className="small"><strong>Piezas</strong></th>
                                                <th className="small"><strong>Longitud</strong></th>
                                                <th className="small"><strong>Altura</strong></th>
                                                <th className="small"><strong>Ancho</strong></th>
                                                <th className="small"><strong>Peso(lb)</strong></th>
                                                <th className="small"><strong>Volumen</strong></th>
                                                <th className="small"><strong>Sincronizado</strong></th>

                                            </tr>
                                            </thead>

                                            <tbody>
                                            {mostrarItems}

                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <td colSpan="3"> <strong>Totales</strong></td>

                                                <td>{userData["TotalPieces"]}</td>

                                                <td colSpan="3"></td>
                                                <td>{total_peso}</td>
                                                <td colSpan="2">{total_volumen}</td>
                                            </tr>
                                            </tfoot>

                                        </table>


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
export default connect(mapStateToProps, mapDispatchToProps)(QuotesDetails);


