import React, { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import './HospitalGrid.scss';
import TimeAgo from 'react-timeago';
const eventCellTemplate = (prop) => {
    return (<div className="">{prop.value}</div>);
}
const HospitalGrid = (props) => {
        const getTimeAgoCellTemplate = (value, row) => {
           
            return (
                <TimeAgo date={value} />
                // <span className={`report-cell`}>{value}</span>
            )
        }	 
        const getReportCellTemplate = (value, row) => {
            return (
                <span id={`reportCell_${value}`} className={`report-cell`}>{value}</span>
            )
        }
        let columns = [
            {
                name: 'name', label: 'NAME', options: {
                    customBodyRender: (value, tableMeta) => {
                        return getReportCellTemplate(value, tableMeta.rowData);
                    }
                }
            },
            {
                name: 'covidCapacity', label: 'COVID CAPACITY', options: {
                    setCellProps: (row, i) => {
                        return { className: row > 0 ? 'center-value-3 greater-value' : 'center-value-3' };
                    },
                }
            },
            {
                name: 'nonCovidCapacity', label: 'NON-COVID CAPACITY', options: {
                    setCellProps: (row, i) => {
                        return { className: `center-value-2` };
                    },
                }
            },
            {
                name: 'covidTotalCases', label: 'COVID TOTAL CASES', options: {
                    setCellProps: (row, i) => {
                        return { className: `center-value-2` };
                    },
                }
            },
            {
                name: 'nonCovidTotalCases', label: 'NON-COVID TOTAL CASES', options: {
                    setCellProps: (row, i) => {
                        return { className: `center-value-2` };
                    },
                }
            },
            {
                name: 'activeCovidPatients', label: 'ACTIVE COVID PATIENTS', options: {
                    setCellProps: (row, i) => {
                        return { className: row > 0 ? 'center-value-3 greater-value' : 'center-value-3' };
                    },
                }
            },
            {
                name: 'activeNonCovidPatients', label: 'ACTIVE NON-COVID PATIENTS', options: {
                    setCellProps: (row, i) => {
                        return { className: `center-value-2` };
                    },
                }
            },
            {
                name: 'addedDate', label: 'ADDED DATE', options: {
                    sortDirection: 'desc',
                    customBodyRender: (value, tableMeta) => {
                        return getTimeAgoCellTemplate(value, tableMeta.rowData);
                    },
                    setCellProps: (row, i) => {
                        return { className: row > 0 ? 'center-value-2 greater-value' : 'center-value-2' };
                    },
                }
            },
            { name: 'uid', label: '', options: { display: false } },
        ];
        // if (props.isManual) {
        //     columns.splice(4,1);
        // }
        const getMuiTheme = () => createMuiTheme({
            palette: { type: 'dark' },
            overrides: {
                MuiPaper: {
                    root: {
                        width: '100%',
                        //height:'400px'
                    },
                }, MuiTableCell: {
                    root: {
                        height: '25px',
                        paddingTop: '5px',
                        paddingBottom: '5px'
    
                    }, 
                    // MUIDataTable: {
                    //     responsiveScroll: {
                    //         maxHeight: 'none'
                    //     },
                    //     maxHeight: '2000px'
                    // },
                    head : {
                        color: 'rgb(153, 153, 153)',
                        fontSize: '14px',
                        fontWeight: 600,
                        textTransform: 'uppercase'
                    }
                },
                MUIDataTableToolbarSelect: {
                    root: {
                        display: 'none'
                    }
                },
                MuiTableSortLabel: {
                    root: {
                        marginTop: '6px'
                    }
                },
                MuiSvgIcon: {
                    root: {
                        fill: '#32d74b'
                    }
                },
                MUIDataTable: {
                    responsiveScroll: {
                    maxHeight: '1000px !important'
                    }
                },
    
            }
        });
        const options = {
            download: false,
            print: false,
            filter: false,
            viewColumns: false,
            search: false,
            fixedHeader: true,
            responsive: 'scroll',
            pagination: false, // todo: enable pagination
            rowsPerPage: props.rowsPerPage,
            // serverSide: true,
            // count: props.rowsPerPage,
            page: props.page,
            selectableRows: 'multiple',
            rowsSelected: props.rowsSelected,
            onChangePage: (currentPage) => changePage(currentPage), 
            onRowsSelect: (a,b,c) => props.onRowsSelect(a,b,c),
            onRowClick: (a,b) => props.onDoubleClick(b.dataIndex, props.data[b.dataIndex]),
            textLabels: {
                body: {
                    noMatch: props.isLoading ?
                        'Loading...' :
                        'Sorry, there is no matching data to display',
                },
            },
        };
        const changePage = (currentPage) => {
            props.refreshData(currentPage);
        }
        return (
            <div className="HospitalGridContainer">
                <MuiThemeProvider theme={getMuiTheme()}>
                    <MUIDataTable
                        data={props.data}
                        columns={columns}
                        options={options}
                    />
                </MuiThemeProvider>
            </div>
    
        );
    }

export default HospitalGrid;