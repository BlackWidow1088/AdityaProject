import React, {useState, useEffect} from 'react';
import './Body.scss';
import HospitalGrid from '../HospitalGrid/index';
import PatientGrid from '../PatientGrid/index';
import { uid } from 'uid';
import HospitalEditDialog from '../HospitalEditDialog';
import customToast from '../CustomToast/CustomToast';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
const dummy = [
    {
        uid: uid(32),
        name: 'Kokilaben',
        covidCapacity: 3,
        nonCovidCapacity: 5,
        activeCovidPatients: 0,
        activeNonCovidPatients: 0,
        covidTotalCases: 0,
        nonCovidTotalCases: 0,
        addedDate: new Date(),
    },
    {
        uid: uid(32),
        name: 'Cooper',
        covidCapacity: 4,
        nonCovidCapacity: 2,
        activeCovidPatients: 0,
        activeNonCovidPatients: 0,
        covidTotalCases: 0,
        nonCovidTotalCases: 0,
        addedDate: new Date("Tue Dec 15 2020 11:50:01 GMT+0530 (India Standard Time)"),
    }
]
const Body =  (props) => {
    const [backEndData, setBackEndData] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedGridRows, setSelectedGridRows] = useState([]);
    const [hospitalData, setHospitalData] = useState([]);
    const [reportData, setReportData] = useState([]);
    const [showHospitalDialog, setShowHospitalDialog] = useState(false);
    const [editHospital, setEditHospital] = useState(null);
    const [isNewHospitalAdded, setIsNewHospitalAdded] = useState(false);
    const [hospitalEditRowIndex, setHospitalEditRowIndex] = useState(0);
    const onRowsSelect = async (currentRowsSelected, allRowsSelected) => {
        let indices = allRowsSelected.map(item => item.dataIndex);
        setSelectedGridRows(indices);
        // setSelectedRows(mockData.filter((item, index) => indices.includes(index)));
        setSelectedRows(reportData.filter((item, index) => indices.includes(index)));
    }
    const rowOnDoubleClick = (index, row) => {
        console.log()
        console.log('data ', row);
        setHospitalEditRowIndex(index);
        setIsNewHospitalAdded(false);
        setEditHospital({
            originalValue: row,
            covidCapacity: parseInt(row.covidCapacity, 10),
            nonCovidCapacity: parseInt(row.nonCovidCapacity, 10),
            name: row.name
        });
        setShowHospitalDialog(true);
    }
    const getData = (start, size) => {
        let reports = null;
            Axios.get('/api/get').then(res => {
                setBackEndData(res.data);
                let data = res.data.hospitals;
                let reports = [];
                if (data) {
                    reports = data;
                    reports = reports.filter(item => item.uid);
                    for (let i = 0; i < reports.length;i++) {
                        if(reports[i].addedDate) {
                            reports[i].addedDate = new Date(reports[i].addedDate)
                        }
                    }
                    // sortedGeneratedReports = reports.sort((a, b) => b.generatedat - a.generatedat)
                } else {
                    reports = [];
                }
                setReportData(reports);
            }).catch(err => {
                customToast.error(`Failed to get data... ${err.request.responseText}`);
                setReportData([]);
            });
            // reports = await DataService.getTelemetryReports(start ? start : tablePageNo, size ? size : rowsPerPage);

    } 

    const updateHospital= () => {
        setShowHospitalDialog(false);
        if(editHospital) {
            let data = {...backEndData};

            data.hospitals[hospitalEditRowIndex] = {
                ...data.hospitals[hospitalEditRowIndex],
                name: editHospital.name,
                covidCapacity: editHospital.covidCapacity,
                nonCovidCapacity: editHospital.nonCovidCapacity
            }
            Axios.post('/api/post', data).then(res => {
                getData();
                customToast.success("Hospital edited successfully");
            }).catch(err => {

            });
            
        } else {

        }
    }
    const addHospital = () => {

    }
    useEffect(() => {
        getData();
    },[])
    return (<div className='body-container'>
        {
            showHospitalDialog &&
            <HospitalEditDialog 
            editHospital={editHospital}
            isNewHospitalAdded={isNewHospitalAdded}
            show={showHospitalDialog} 
            handleClose={() => setShowHospitalDialog(false)}
            update={() => updateHospital()}
            onChangeInput={(data) => {
                if(isNaN(data.covidCapacity) || isNaN(data.nonCovidCapacity) || data.name === "") {
                    customToast.error("Covid Capacity, nonCovidCapacity should be number, Name should be non-null");
                    setEditHospital({
                        covidCapacity: data.originalValue.covidCapacity,
                        nonCovidCapacity: data.originalValue.nonCovidCapacity,
                        name: data.originalValue.name
                    });
                } else {
                    setEditHospital({
                        ...data,
                        covidCapacity: parseInt(data.covidCapacity, 10),
                        nonCovidCapacity: parseInt(data.nonCovidCapacity, 10),
                        name: data.name
                    });
                }
            }}
            />
        }
        <div className='flex'>
            <div className='title'>
                Hospitals
            </div>
            {/* <div>
                <Button type="primary" onClick={addHospital}>Add Hospital</Button>
            </div> */}
        </div>

               <div style={{padding: '1rem'}}>
                    <HospitalGrid
                        page={0}
                        rowsPerPage={10}
                        // refreshData={refreshData}
                        isLoading={false}
                        isManual={true}
                        data={reportData}
                        onDoubleClick={rowOnDoubleClick}
                        rowsSelected={selectedGridRows}
                        onRowsSelect={onRowsSelect}
                    />
                </div>
        <PatientGrid />
    </div>)
}
export default Body;