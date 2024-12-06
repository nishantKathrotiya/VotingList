import React, { useEffect, useState } from 'react';
import UserDataView from '../Dataview/UserDataView';
import { MdFilterAltOff } from "react-icons/md";
import Filter from '../Dropdown/Filter';
import "./Datatable.css";
import { Link } from 'react-router-dom';

const UserDatatable = ({ data }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        let filtered = data;

        if (searchQuery) {
            filtered = filtered.filter(entry => {
                const query = searchQuery.toLowerCase();
                return (
                    (entry.memberNo && entry.memberNo.toString().includes(query)) ||
                    (entry.name && entry.name.toString().toLowerCase().includes(query)) ||
                    (entry.address && entry.address.toString().toLowerCase().includes(query))                    
                );
            });
        }

        setFilteredData(filtered);
    }, [searchQuery, data]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSortConfig(null);
    };


    return (
        <div className='dataTableContainer'>
            <div className='titleRow'>
                <div className='headertext'>All The Entries</div>
                <div className='searchDiv'>
                    <input
                        type='text'
                        placeholder='Search Member No, Name or Address'
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button onClick={clearFilters} className='toolTip' data-tooltip-content="Click To Clear Filter">
                        <MdFilterAltOff className='iconMedium' />
                    </button>
                </div>
            </div>
            <div className='dataTableOverflow'>
                <div className='columnTitle'>
                    <span className='titlelable'>Member No</span>
                    <span className='titlelable'>Name </span>
                    <span className='titlelable '>Address</span>
                    <span className='titlelable lastLine'>Vote</span>
                </div>
                {
                    filteredData.length === 0 ? (
                        <div className='loadingCenter'><h1>No Data Found</h1></div>
                    ) : (
                        <>
                            {filteredData.map((entry, i) => (
                                    <UserDataView key={i} entry={entry}  />
                            ))}
                        </>
                    )
                }
            </div>
        </div>
    );
};



export default UserDatatable