import React from 'react';
import Form from './Form';

const ModalForm = ({ addNewProperty }) => {
    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="createNewProperty" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="createNewProperty">Create New Property</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <Form addNewProperty={addNewProperty} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalForm;
