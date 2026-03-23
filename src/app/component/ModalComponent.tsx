import React from 'react';
import { Modal } from 'antd';

interface ModalComponentProps {
    content?: React.ReactNode;
    isModalOpen?: boolean;
    handleOk?: () => void;
    handleCancel?: () => void;
     showModal?: () => void;
     width?: number | string;
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
            styles={{
              body: { padding: 0 },
            }}
            className='modal-mobile-friendly'
        >
            <div>
                {content}
            </div>
        </Modal>
    );
};

export default ModalComponent;
