import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import classes from '../CSS/PopupStyles.module.css';

//modal styles
const modalStylesDesktop = {
    content: {
        backgroundColor: 'rgb(242, 242, 242)',
        top: '40vh',
        bottom: '40vh',
        right: '30vw',
        left: '30vw',
        border: '1.5px solid #007E86',
        borderRadius: '8px',
    },
};

const modalStylesPhone = {
    content: {
        backgroundColor: 'rgb(242, 242, 242)',
        top: '30vh',
        bottom: '30vh',
        right: '5vw',
        left: '5vw',
        border: '1.5px solid #007E86',
        borderRadius: '8px',
    },
};

const getWindowDimensions = () => {
    const {innerWidth: width, innerHeight: height} = window;
    return {width, height};
};

//binds modal to root app element
Modal.setAppElement('#root');

const OkConfirmationModal = props => {
    const closeModalOnParent = props.closeModal;
    const [isOpen, setIsOpen] = useState(props.isModalOpen);

    useEffect(() => {
        setIsOpen(props.isModalOpen);
    }, [props.isModalOpen]);

    const closeModal = () => {
        setIsOpen(false);
        closeModalOnParent();
    };

    return <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={getWindowDimensions().width >= 450 ? modalStylesDesktop : modalStylesPhone}>
            <div className={classes['modal-content']}>
                <h3 className={classes['title']}>{props.message}</h3>
                <div className={classes['buttons']}>
                    <button onClick={closeModal} className={classes['button']}>Ok</button>
                </div>
            </div>
        </Modal>
};

export default OkConfirmationModal;