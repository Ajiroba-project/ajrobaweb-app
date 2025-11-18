import React from 'react';
import { Modal } from 'antd';

interface ModalComponentProps {
    content?: React.ReactNode;
    isModalOpen?: boolean;
    handleOk?: () => void;
    handleCancel?: () => void;
     showModal?: () => void;
     width?: number;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ width, content, handleOk, handleCancel, isModalOpen }) => {
    return (
        <Modal
            footer={null}
            title=""
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={width}
            centered
           
        >
            <div>
                {content}
            </div>
        </Modal>
    );
};

export default ModalComponent;
