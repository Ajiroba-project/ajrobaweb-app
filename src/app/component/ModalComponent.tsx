import React from 'react';
import { Button, Modal } from 'antd';

interface ModalComponentProps {
    content: React.ReactNode;
    isModalOpen: boolean;
    showModal: () => void;
    handleOk: () => void;
    handleCancel: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ content, showModal, handleOk, handleCancel, isModalOpen }) => {
    return (
        <>
            {/* <Button type="primary" onClick={showModal}>
                Open Modal
            </Button> */}
            <Modal footer={null} title="" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    {content}
                </div>
            </Modal>
        </>
    );
};

export default ModalComponent;
