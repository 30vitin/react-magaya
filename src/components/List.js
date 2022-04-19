import React, {useEffect, useState} from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import axios from "../api/axios";
import {useNavigate} from "react-router-dom";

const GET_TRANSACTION_URL = "/api/get-transacctions";

const GET_TRANSACTION_URL_NEXT = "/api/get-transacctions-next";

const formatDate = () => {
    var today = new Date();

    var day = today.getDate();
    var month = (today.getMonth() + 1)
    var day_two = "01";
    if (today.getDate() <= 9) {
        day = "0" + today.getDate()
    }
    if ((today.getMonth() + 1) <= 9) {
        month = "0" + (today.getMonth() + 1)
    }
    var to = today.getFullYear() + '-' + month + '-' + day


    var from = today.getFullYear() + '-' + month + '-' + day_two


    return {from: from, to: to}
}


const List = () => {


    var dates = formatDate();

    const [coockie, setCoockie] = useState("");
    const navigate = useNavigate()
    const [startdate, setStartdate] = useState(String(dates.from));
    const [enddate, setEnddate] = useState(String(dates.to));
    const [data, setData] = useState([]);

    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [nextCoockie, setNextCoockie] = useState('')
    const [isLastPage, setIsLastPage] = useState(false)
    const [cookieList, setCoockieList] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [filterBy, setFilterBy] = useState('')
    const [inputSearch, setInputSearch] = useState('')
    const [inputSearchFirst,setInputSearchFirst] = useState('');
    const [showFilter, setShowFilter] = useState(false)
    useEffect(() => {
        (async () => {

            const response = await axios.get(GET_TRANSACTION_URL + "?startdate=" + startdate + "&enddate=" + enddate + '&filterBy=' + filterBy + '&inputSearch=' + inputSearch, {
                    mode: 'no-cors',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                        'Access-Control-Allow-Headers': "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
                    }
                }
            ).catch((error) => {
                if (error.response?.status === 401) {
                    navigate("/", {replace: true});
                }

            })

            if (response.data[0].coockie != null) {

                if (nextCoockie === "") {
                    setCoockie(response.data[0].coockie)
                }

                if (!cookieList.includes(coockie) && coockie !== '') {
                    cookieList.push(coockie)
                    setCurrentPage(cookieList.length)

                }

                const response_wdata = await axios.post(GET_TRANSACTION_URL_NEXT, JSON.stringify({coockie: coockie}), {
                        mode: 'no-cors',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Credentials': true,
                            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                            'Access-Control-Allow-Headers': "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
                        }
                    }
                ).catch((error) => {
                    if (error.response?.status === 401) {
                        navigate("/", {replace: true});
                    }

                })

                if (response_wdata.data.more_results) {

                    setNextCoockie(response_wdata.data.cookie)


                } else {
                    if (response_wdata.data.more_results === 0) {

                        setIsLastPage(true)
                    }
                }


                if (response_wdata.data.data) {
                    //aplicando filtros


                    var resspp = response_wdata.data.data

                    if (filterBy !== '' && inputSearch !== '' && !isLastPage) {
                        console.log('filterBy',filterBy, inputSearch)
                        let resultFilter = []
                        if (filterBy !== 'OriginPort') {

                            resultFilter = resspp.filter(item => item[filterBy] === inputSearch);

                        }

                        if (filterBy === 'OriginPort') {

                            resultFilter = resspp.filter(item => (item[filterBy] && item[filterBy]["Name"] && (item[filterBy]["Name"] + ' ' + item[filterBy]["Country"]["@Code"]) === inputSearch));
                        }

                        if (resultFilter.length === 0 && !isLastPage) {

                            setCoockie("")
                            if (nextCoockie !== "") {
                                window.scrollTo(0, 0)
                                setCoockie(nextCoockie)
                            }
                        }


                        setData(resultFilter)
                    } else {
                        setData(response_wdata.data.data)
                    }


                }


            } else {

                setData([])
            }


        })()
    }, [setCoockie, startdate, enddate, navigate, setEnddate, setStartdate, coockie, nextCoockie, cookieList, setCurrentPage, inputSearch, filterBy, isLastPage])


    var mostrarUsuarios = data.map((datos, i) => {


        var CreatedOn = new Date(datos['CreatedOn']);

        var CreatedOn_years = CreatedOn.getFullYear();
        var CreatedOn_month = ((CreatedOn.getMonth() + 1) <= 9 ? "0" + (CreatedOn.getMonth() + 1) : (CreatedOn.getMonth() + 1))
        var CreatedOn_day = (CreatedOn.getDate() <= 9 ? "0" + CreatedOn.getDate() : CreatedOn.getDate());

        var Shipper = (datos['Shipper'] && datos['Shipper']['Name']) ? datos['Shipper']['Name'] : ''

        var array_etd = (datos['CustomFields'] && datos['CustomFields']['CustomField']) ? datos['CustomFields']['CustomField'] : []

        var etd = ''
        var tda = ''

        if (array_etd.length > 0) {

            Object.keys(array_etd).forEach(key => {
                if (array_etd[key]['CustomFieldDefinition'] && array_etd[key]['CustomFieldDefinition']['DisplayName'] && array_etd[key]['CustomFieldDefinition']['DisplayName'] === 'ETD') {

                    etd = array_etd[key]['Value']
                }
                if (array_etd[key]['CustomFieldDefinition'] && array_etd[key]['CustomFieldDefinition']['DisplayName'] && array_etd[key]['CustomFieldDefinition']['DisplayName'] === 'ETA') {
                    tda = array_etd[key]['Value']
                }

            });

        }


        return (
            <tr key={datos["@GUID"]}>

                <td><p className="small">{datos['Number']}</p></td>
                <td><p className="small">{datos['Status']}</p></td>
                <td><p className="small">{CreatedOn_month + '-' + CreatedOn_day + '-' + CreatedOn_years}</p></td>
                <td><p className="small">{datos['ContactName']}</p></td>
                <td><p className="small">{datos['ConsigneeName']}</p></td>
                <td><p className="small">{Shipper}</p></td>
                <td><p className="small">{datos['SalespersonName']}</p></td>
                <td>
                    <p
                        className="small">{((datos['OriginPort'] !== undefined) ? (datos['OriginPort']["Name"] + ' ' + datos["OriginPort"]["Country"]["@Code"]) : "")}</p>

                </td>
                <td>
                    <p
                        className="small">{((datos['DestinationPort'] !== undefined) ? (datos['DestinationPort']["Name"] + ' ' + datos["DestinationPort"]["Country"]["@Code"]) : "")}</p>
                </td>
                <td>
                    <p
                        className="small">{((datos['OriginPort'] !== undefined) ? (datos['OriginPort']["Country"]["#text"]) : "")}</p>

                </td>
                <td><p
                    className="small">{((datos['DestinationPort'] !== undefined) ? (datos['DestinationPort']["Country"]["#text"]) : "")}</p>
                </td>
                <td><p className="small">{etd}</p></td>
                <td><p className="small">{tda}</p></td>
                <td><p className="small">{(datos['Incoterm'] !== undefined) ? (datos['Incoterm']["Code"]) : ""}</p></td>
                <td><p className="small">{datos['HasAttachments']}</p></td>


                <td>

                    <button className="btn btn-outline-secondary" onClick={() => {
                        navigate('/quotes-details/' + datos['@GUID'], {replace: true});
                    }}>
                        <i
                            className="fas fa-arrow-right  text-gray-400"></i></button>

                </td>
            </tr>
        );

    });

    const handleRangeDate = (e) => {
        e.preventDefault()

        setNextCoockie("")
        setStartdate(((from !== "") ? from : startdate))
        setEnddate(((to !== "") ? to : enddate))
        if(inputSearchFirst!==""){

            setInputSearch(inputSearchFirst)
        }
    }

    const hadleNextPage = (e) => {
        e.preventDefault()
        console.log(currentPage, cookieList.length)

        console.log(cookieList)

        var cookieForNext = nextCoockie
        if (currentPage < cookieList.length) {

            cookieForNext = cookieList[(currentPage - 1) + 1]
            setCurrentPage((currentPage) + 1)

        }
        setCoockie("")
        if (nextCoockie !== "") {
            window.scrollTo(0, 0)
            setCoockie(cookieForNext)
        }

    }
    const hadleBtnInicio = (e) => {


        setCoockie("")
        if (nextCoockie !== "") {
            window.scrollTo(0, 0)
            setCoockieList([])
            setCoockie(cookieList[0])
            setCurrentPage(1)

        }

    }
    const hadleBeforePage = (e) => {


        setCoockie("")
        if (nextCoockie !== "") {
            window.scrollTo(0, 0)
            setCoockie(cookieList[currentPage - 2])
            setCurrentPage(currentPage - 1)

        }
    }

    const handleOnPage = (e) => {


        setCoockie("")
        if (nextCoockie !== "") {
            window.scrollTo(0, 0)
            setCoockie(cookieList[e.target.value])
            setCurrentPage(e.target.value)


        }

    }
    return (

        <div id="wrapper">

            <div id="content-wrapper" className="d-flex flex-column">

                <div id="content">

                    <Nav/>
                    <div className="container-fluid">

                        <h1 className="h3 mb-2 text-gray-800">Listado de Cotizaciones</h1>
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">Cotizaciones</h6>
                            </div>
                            <div className="card-body">

                                <form className="user" onSubmit={handleRangeDate}>
                                    <div className="row p-3">
                                        <div className="col-md-10 row">
                                            <div className="col-md-4">
                                                <label htmlFor="from">From</label>
                                                <input name="from" type="date" id="from" className="form-control"
                                                       value={(from === "") ? startdate : from}
                                                       onChange={(e) => setFrom(e.target.value)}/>

                                            </div>
                                            <div className="col-md-4">
                                                <label htmlFor="to">To</label>
                                                <input name="to" type="date" id="to" className="form-control"
                                                       value={(to === "") ? enddate : to}

                                                       onChange={(e) => setTo(e.target.value)}/>

                                            </div>
                                            <div className="col-md-2">
                                                <label htmlFor="">&nbsp;&nbsp;</label>
                                                <button className="btn btn-primary btn-user btn-block">Consultar
                                                </button>

                                            </div>
                                            <div className="col-md-2">
                                                <label htmlFor="">&nbsp;&nbsp;</label>
                                                <button className="btn btn-info btn-user btn-block"
                                                        onClick={(e) => {
                                                            setShowFilter((showFilter) ? false : true);
                                                            setInputSearch('');
                                                            setInputSearchFirst('');
                                                            setFilterBy('');
                                                        }}>Habilitar
                                                    filtros
                                                </button>

                                            </div>

                                        </div>


                                        {
                                            (showFilter) ? <div className="col-md-7 row mt-3">
                                                <div className='col-md-5'>
                                                    <label htmlFor='filterby'>Filtrar por</label>
                                                    <select name="filterby" id="filterby" className='form-control'
                                                            value={filterBy}
                                                            onChange={(e) => setFilterBy(e.target.value)}>
                                                        <option value="" key="0">Seleccione</option>
                                                        <option value="Number" key='1'>Number</option>
                                                        <option value="ConsigneeName" key='2'>ConsigneeName</option>
                                                        <option value="OriginPort" key='3'>OriginPort</option>

                                                    </select>
                                                </div>
                                                <div className='col-md-5'>
                                                    <label htmlFor='filterby'>Ingrese Valor</label>
                                                    <input type="text" className='form-control'
                                                           placeholder={"Consultar " + filterBy}
                                                           value={inputSearchFirst}
                                                           onChange={(e) => setInputSearchFirst(e.target.value)}/>
                                                </div>
                                            </div> : ''


                                        }


                                    </div>

                                </form>


                                <div className="table-responsive hover">

                                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                        <thead>
                                        <tr>


                                            <th className="small"><strong>Number</strong></th>
                                            <th className="small"><strong>Status</strong></th>
                                            <th className="small"><strong>CreatedOn</strong></th>
                                            <th className="small"><strong>ContactName</strong></th>
                                            <th className="small"><strong>ConsigneeName</strong></th>
                                            <th className="small"><strong>SHIPPER </strong></th>
                                            <th className="small"><strong>SalespersonName</strong></th>
                                            <th className="small"><strong>OriginPort</strong></th>
                                            <th className="small"><strong>DestinationPort</strong></th>
                                            <th className="small"><strong>OriginCountry</strong></th>
                                            <th className="small"><strong>DestinationCountry</strong></th>
                                            <th className="small"><strong>ETD</strong></th>
                                            <th className="small"><strong>ETA</strong></th>
                                            <th className="small"><strong>Incoterm</strong></th>
                                            <th className="small"><strong>HasAttachments</strong></th>

                                            <th></th>
                                        </tr>
                                        </thead>

                                        <tbody>

                                        {mostrarUsuarios}

                                        </tbody>

                                    </table>


                                </div>

                                <div className='col-md-12 row'>
                                    <div className='col-md-6'>

                                    </div>
                                    <div className='col-md-6 row text-center d-flex justify-content-end'>

                                        <div className='col-md-2'>

                                            {(cookieList.length > 2 && currentPage > 1 && !showFilter) ?
                                                <button href="#" className="btn btn-outline-secondary mr-2"
                                                        onClick={hadleBtnInicio}><i
                                                    className="fas fa-home  text-gray-400"></i> Inicio</button> : ''}


                                        </div>
                                        <div className='col-md-2'>

                                            {(cookieList.length >= 2 && currentPage > 1 && !showFilter) ?
                                                <button href="#" className="btn btn-outline-secondary mr-2"
                                                        onClick={hadleBeforePage}><i
                                                    className="fas fa-arrow-left  text-gray-400"></i> Atras
                                                </button> : ''}


                                        </div>
                                        <div className='col-md-3'>
                                            {(cookieList.length > 1 && !showFilter) ?
                                                <select className='form-control' onChange={handleOnPage}
                                                        value={currentPage - 1}>
                                                    {cookieList.map((index, val) => (
                                                        <option value={val}
                                                                key={val}>Pag {(val + 1)}</option>))}</select> : ''}


                                        </div>
                                        <div className='col-md-2'>
                                            {(!showFilter) ? <button href="#" className="btn btn-outline-secondary"
                                                                     onClick={hadleNextPage}
                                                                     disabled={isLastPage}>Siguiente <i
                                                className="fas fa-arrow-right  text-gray-400"></i></button> : ''}

                                        </div>


                                    </div>

                                </div>


                            </div>
                        </div>

                    </div>

                </div>

                <Footer/>


            </div>
        </div>

    )


}


export default List;
