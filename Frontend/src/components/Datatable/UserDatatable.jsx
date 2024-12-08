import React, { useEffect, useState } from 'react';
import UserDataView from '../Dataview/UserDataView';
import { MdFilterAltOff } from "react-icons/md";
import Filter from '../Dropdown/Filter';
import "./Datatable.css";
import { Link } from 'react-router-dom';
import PollDropdown from '../PollDropdown/PollDropdown.Jsx'
const UserDatatable = ({ data }) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [partyFilter, setPartyFilter] = useState('n')
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

        if (partyFilter!='n') {
            filtered = filtered.filter(entry => {
                const query = partyFilter.toLowerCase();
                return (
                    (entry.party && entry.party.toString().toLowerCase().includes(partyFilter))                    
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
    }, [searchQuery, sortConfig,voteQuery,addressQuery,partyFilter, data]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSortConfig(null);
        setVoteQuery('');
        setAddressQuery('');
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
                    <PollDropdown partyFilter={partyFilter} setPartyFilter={setPartyFilter} />
                    <button onClick={clearFilters} className='toolTip' data-tooltip-content="Click To Clear Filter">
                        <MdFilterAltOff className='iconMedium' />
                    </button>
                </div>
            </div>
            <div className='dataTableOverflow'>
                <div className='columnTitle'>
                    <span className='titlelable'>Member No</span>
                    <span className='titlelable'>Name </span>
                    <span className='titlelable '>Address <Filter id="address" callBack={setAddressQuery}/></span>
                    <span className='titlelable '>MobileNo. </span>
                    <span className='titlelable lastLine'>Vote <Filter id="vote" callBack={setVoteQuery}/></span>
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