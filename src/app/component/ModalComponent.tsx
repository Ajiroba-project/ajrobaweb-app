// import React from 'react';
// import { Button, Modal } from 'antd'

// interface ModalComponentProps {
//     content?: React.ReactNode;
//     isModalOpen?: boolean;
//     showModal?: () => void;
//     handleOk?: () => void;
//     handleCancel?: () => void;
// }

// const ModalComponent: React.FC<ModalComponentProps> = ({ content, handleOk, handleCancel, isModalOpen }) => {
//     return (
//         <>

//             <Modal footer={null} title="" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
//                 <div>
//                     {content}
//                 </div>
//             </Modal>
//         </>
//     );
// };

// export default ModalComponent;


import React from 'react';
import { Modal } from 'antd';

interface ModalComponentProps {
    content?: React.ReactNode;
    isModalOpen?: boolean;
    handleOk?: () => void;
    handleCancel?: () => void;
     showModal?: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ content, handleOk, handleCancel, isModalOpen }) => {
    return (
        <Modal
            footer={null}
            title=""
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <div>
                {content}
            </div>
        </Modal>
    );
};

export default ModalComponent;
