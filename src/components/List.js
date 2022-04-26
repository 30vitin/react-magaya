import React, {useEffect, useState} from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import axios from "../api/axios";
import {useNavigate} from "react-router-dom";

const GET_TRANSACTION_URL = "/api/get-transacctions";

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

    const navigate = useNavigate()
    const [startdate, setStartdate] = useState(String(dates.from));
    const [enddate, setEnddate] = useState(String(dates.to));
    const [data, setData] = useState([]);

    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');


    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [filterBy, setFilterBy] = useState('')
    const [inputSearch, setInputSearch] = useState('')
    const [inputSearchFirst, setInputSearchFirst] = useState('');
    const [showFilter, setShowFilter] = useState(false)
    const [isCargando, setIsCargando] = useState(true)

    useEffect(() => {
        (async () => {

            const response = await axios.get(GET_TRANSACTION_URL + "?startdate=" + startdate + "&enddate=" + enddate + '&filterBy=' + filterBy + '&inputSearch=' + inputSearch + "&currentPage=" + (currentPage - 1), {
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
            if (response.data[0].rows) {
                setData(response.data[0].rows)
                setTotalPages(response.data[0].totalpage)
            }

            setIsCargando(false)


        })()
    }, [startdate, enddate, navigate, setEnddate, setStartdate, setCurrentPage, currentPage, inputSearch, filterBy])


    var mostrarUsuarios = data.map((datos, i) => {

        return (
            <tr key={datos[0]}>

                <td>

                    <button className={"btn"} onClick={() => {
                        navigate('/quotes-details/' + datos[0], {replace: true})
                    }}>
                        <p className="small"><i
                            className="fas fa-arrow-right  text-success-400"></i> {datos[1]}</p></button>


                </td>
                <td><p className="small">{datos[2]}</p></td>
                <td><p className="small">{datos[3]}</p></td>
                <td><p className="small">{datos[4]}</p></td>
                <td><p className="small">{datos[5]}</p></td>
                <td><p className="small">{datos[6]}</p></td>
                <td><p className="small">{datos[7]}</p></td>
                <td>
                    <p
                        className="small">{datos[8]}</p>

                </td>
                <td>
                    <p
                        className="small">{datos[10]}</p>
                </td>
                <td>
                    <p
                        className="small">{datos[9]}</p>

                </td>
                <td><p
                    className="small">{datos[11]}</p>
                </td>
                <td><p className="small">{datos[12]}</p></td>
                <td><p className="small">{datos[13]}</p></td>
                <td><p className="small">{datos[14]}</p></td>
                <td><p className="small">{datos[15]}</p></td>

            </tr>
        );

    });

    const handleRangeDate = (e) => {
        e.preventDefault()
        setData([])
        setTotalPages(1)
        setCurrentPage(1)
        setStartdate(((from !== "") ? from : startdate))
        setEnddate(((to !== "") ? to : enddate))
        setIsCargando(true)
        if (inputSearchFirst !== "") {

            setInputSearch(inputSearchFirst)
        }
    }

    const hadleNextPage = (e) => {
        e.preventDefault()

        setCurrentPage(currentPage + 1)
        window.scrollTo(0, 0)

    }

    const hadleBeforePage = (e) => {

        setCurrentPage(currentPage - 1)
        window.scrollTo(0, 0)
    }

    const handleOnPage = (e) => {
        console.log(e.target.value)
        setCurrentPage((e.target.value))
        window.scrollTo(0, 0)

    }
    const PageList = () => {

        var i;
        let content = [];
        for (i = 1; i <=totalPages; i++) {
            content.push(<option value={i} key={i}>Pag {(i)}</option>);
        }

        return content;


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

                                        </tr>

                                        </thead>

                                        <tbody>

                                        {
                                            (isCargando) ?
                                                (<tr>
                                                    <td colSpan={15}>Cargando datos ...</td>
                                                </tr>) : (<tr></tr>)
                                        }
                                        {mostrarUsuarios}

                                        </tbody>

                                    </table>


                                </div>

                                <div className='col-md-12 row'>
                                    <div className='col-md-6'>

                                        <small>Pagina {currentPage} de {totalPages}</small>
                                    </div>
                                    <div className='col-md-6 row text-center d-flex justify-content-end'>


                                        <div className='col-md-2'>

                                            <button href="#" className="btn btn-outline-secondary mr-2"
                                                    onClick={hadleBeforePage}
                                                    disabled={currentPage <= 1 || totalPages <= 1}><i
                                                className="fas fa-arrow-left  text-gray-400"></i> Atras
                                            </button>


                                        </div>
                                        <div className='col-md-3'>

                                            <select className='form-control' onChange={handleOnPage}
                                                    value={currentPage}>
                                                {<PageList/>}
                                            </select>


                                        </div>
                                        <div className='col-md-2'>
                                            <button href="#" className="btn btn-outline-secondary"
                                                    onClick={hadleNextPage}
                                                    disabled={currentPage <= 1 && totalPages <= 1 && currentPage < totalPages}>Siguiente <i
                                                className="fas fa-arrow-right  text-gray-400"></i></button>

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
