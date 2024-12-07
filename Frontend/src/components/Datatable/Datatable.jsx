import React, { useEffect, useState } from 'react';
import Dataview from '../Dataview/Dataview';
import { MdFilterAltOff } from "react-icons/md";
import Filter from '../Dropdown/Filter';
import "./Datatable.css";
import { Link } from 'react-router-dom';

const Datatable = ({ data }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [voteQuery, setVoteQuery] = useState('');
    const [addressQuery, setAddressQuery] = useState('');
    const [sortConfig, setSortConfig] = useState(null);
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

        if (addressQuery) {
            filtered = filtered.filter(entry => {
                const query = addressQuery.toLowerCase();
                return (
                    (entry.address && entry.address.toString().toLowerCase().includes(query))                    
                );
            });
        }

        if (voteQuery) {
            filtered = filtered.filter(entry => {
                const query = voteQuery.toLowerCase();
                return (
                    (entry.currentPollVote && entry.currentPollVote.toString().toLowerCase().includes(query))                    
                );
            });
        }

        if (sortConfig !== null) {
            filtered.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }

        setFilteredData(filtered);
    }, [searchQuery, sortConfig,voteQuery,addressQuery, data]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSortConfig(null);
        setVoteQuery('');
        setAddressQuery('');
    };

    // const requestSort = (key) => {
    //     let direction = 'ascending';
    //     if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
    //         direction = 'descending';
    //     }
    //     setSortConfig({ key, direction });
    // };

    // const filterData = [
    //     {
    //         id: "memberNo",
    //         title: "Ascending",
    //         callback: () => requestSort('memberNo')
    //     },
    //     {
    //         id: "memberNo",
    //         title: "Descending",
    //         callback: () => requestSort('memberNo')
    //     },
    //     {
    //         id: "name",
    //         title: "Ascending",
    //         callback: () => requestSort('name')
    //     },
    //     {
    //         id: "name",
    //         title: "Descending",
    //         callback: () => requestSort('name')
    //     },
    // ];

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
                    <span className='titlelable '>Address  <Filter id="address" callBack={setAddressQuery} /> </span>
                    <span className='titlelable lastLine'>Action</span>
                </div>
                {
                    filteredData.length === 0 ? (
                        <div className='loadingCenter'><h1>No Data Found</h1></div>
                    ) : (
                        <>
                            {filteredData.map((entry, i) => (
                                    <Dataview key={i} entry={entry}  />
                            ))}
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default Datatable;
