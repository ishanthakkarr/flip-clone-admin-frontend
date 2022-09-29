import React from 'react';
import Input from '../../../components/UI/Input';
import Modal from '../../../components/UI/Modal';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
const DeleteCategoryModal = (props) => {
    const {
        show,
        handleClose,
        modalTitle,
        expandedArray,
        checkedArray,
        buttons
    } = props;
    return (
        <Modal
            modalTitle={modalTitle}
            show={show}
            handleClose={handleClose}
            buttons={buttons}
        >
            <h5>Expanded</h5>
            {expandedArray.map((item, index) => <span key={index}>{item.name}</span>)}
            <h5>Checked</h5>
            {checkedArray.map((item, index) => <span key={index}>{item.name}</span>)}
        </Modal >
    )
}

export default DeleteCategoryModal;
