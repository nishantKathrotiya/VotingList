import React, { useEffect, useState } from 'react'
import Datatable from '../../components/Datatable/Datatable';
import { getBaseUserList } from '../../services/operation/baseUser';
import { Tooltip } from 'react-tooltip'
import { FiDownload } from "react-icons/fi";
import UserDatatable from '../../components/Datatable/UserDatatable';

import 'react-tooltip/dist/react-tooltip.css'
import './Dashboard.css'

const List = ({id}) => {
    console.log(id)
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
            getBaseUserList(setData, setLoading)
    }, [])

    return (
        <div className='dashboardContainer'>
            <div className='dashboardTableContainer'>
                {
                    loading ? (<div className='loadingCenter'><h1>Loading...</h1></div>) : (
                        <>
                            {
                                data.length == 0 ? (<div className='loadingCenter'><h1>No Data Found</h1></div>) : (
                                    <>
                                        {
                                            id == 'admin' ? (<Datatable data={data} />) : (<UserDatatable data={data} />) 
                                        }

                                    </>
                                )
                            }
                        </>
                    )
                }
            </div>

            <Tooltip anchorSelect=".toolTip" className='toopTipStyle' />
        </div>
    )
}

export default List