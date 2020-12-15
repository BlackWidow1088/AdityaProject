import React, {useEffect, useState} from 'react';
import './HospitalEditDialog.scss';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputTextField from '../../components/InputTextField/InputTextField';
const HospitalEditDialog = (props) => {
    return (
        <Modal
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="HospitalDialog"
        >
        <Modal.Body>
            <div className='app-form-controls-container'>
                <div className='title'>
                    {props.editHospital.name}
                </div>
                <div className='margin'>
                <InputTextField 
            label="Name" 
            defaultValue={props.editHospital.name} 
            onChange={(ev) => props.onChangeInput({...props.editHospital, name: ev.target.value})} />
                </div>
                <div className='margin'>
                <InputTextField 
            label="Covid Capacity" 
            defaultValue={props.editHospital.covidCapacity} 
            onChange={(ev) => props.onChangeInput({...props.editHospital, covidCapacity: ev.target.value})} />
                </div>
            <div className='margin'>
            <InputTextField 
            label="Non Covid Capacity" 
            defaultValue={props.editHospital.nonCovidCapacity} 
            onChange={(ev) => props.onChangeInput({...props.editHospital, nonCovidCapacity: ev.target.value})} />
            </div>
            
            </div>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.update}>Update</Button>
        </Modal.Footer>
        </Modal>
        )
}

export default HospitalEditDialog;

