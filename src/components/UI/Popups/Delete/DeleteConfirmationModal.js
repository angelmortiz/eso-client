import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styles from '../CSS/PopupStyles.module.css';

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
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
};

//binds modal to root app element
Modal.setAppElement('#root');

const DeleteConfirmationModal = (props) => {
  const parent = props.info;
  const parentType = props.type;
  const closeModalOnParent = props.closeModal;
  const [isOpen, setIsOpen] = useState(props.isModalOpen);

  useEffect(() => {
    setIsOpen(props.isModalOpen);
  }, [props.isModalOpen]);

  const closeModal = () => {
    setIsOpen(false);
    closeModalOnParent();
  };

  const confirmDelete = () => {
    props.confirmDelete();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={
        getWindowDimensions().width >= 450
          ? modalStylesDesktop
          : modalStylesPhone
      }
    >
      <div className={styles['modal-content']}>
        <h3 className={styles['title']}>
          {`⚠️ Are you sure you want to delete this ${parentType}?`}
        </h3>
        <p className={styles['message']}>
          {`You are about to delete the ${parentType}: `}
          <strong>
            '{parent?.name}'
          </strong>
          , with id: <strong>'{parent?._id}'</strong>
        </p>
        <div className={styles['buttons']}>
          <button onClick={closeModal} className={styles['button']}>
            Cancel
          </button>
          <button onClick={confirmDelete} className={styles['button']}>
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
