import React, {useEffect, useState} from "react";
import axios from "../api/axios";


const GET_TRANSACTION_URL = "/api/get-transacctions?startdate=2022-01-25&enddate=2022-01-27";
const POST_TRANSACTION_NEXT_URL = "get-transacctions-next"

const TableList = (props) => {


    return (

        <div className="table-responsive">

            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                <thead>
                <tr>

                    <th>GUID</th>
                    <th>Number</th>
                    <th>ContactName</th>
                    <th>SalespersonName</th>
                    <th>ConsigneeName</th>
                    <th>HasAttachments</th>
                    <th>Status</th>
                    <th>CreatedOn</th>
                    <th>Incoterm</th>
                    <th>OriginPort</th>
                    <th>DestinationPort</th>
                    <th>OriginCountry</th>
                    <th>DestinationCountry</th>
                    <th></th>
                </tr>
                </thead>

                <tbody>
                <tr>

                </tr>

                </tbody>
            </table>
        </div>
    )
}

export default TableList;
