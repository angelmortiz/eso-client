import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  deleteEquipment,
  fetchEquipmentById,
} from '../../../../util/apis/activities/equipments/equipmentsApis';
import styles from '../../../UI/General/CSS/Details.module.css';
import TwoButtonConfirmationModal from '../../../UI/Modals/TwoButtonModals/TwoButtonConfirmationModal';

const EquipmentDetails = (props) => {
  const { id } = useParams();
  const navigateTo = useNavigate();
  const [equipment, setEquipment] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (!id) console.error(`Error: equipment id not found in the url.`);
    fetchEquipmentById(id).then((response) => {
      if (!response || !response.isSuccess) return;
      setEquipment(response.body);
    });
  }, [id]);

  const openTwoButtonConfirmationModal = (e) => {
    e.preventDefault();
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const confirmDeleteEquipment = () => {
    closeDeleteModal();

    deleteEquipment(id).then((response) => {
      if (!response || !response.isSuccess) return;
      navigateTo('/activities/equipments');
    });
  };

  return (
    <section className={styles['card']}>
      {!equipment ? (
        <img
          src="/loading.gif"
          alt="Loading..."
          className={styles['loading-img']}
        />
      ) : (
        <div className={styles['main-section']}>
          {/* NAME */}
          <h1 className={styles['name']}>{equipment.name}</h1>
          {/* ALTERNATIVE NAME */}
          <h2 className={styles['alternative-name']}>
            {equipment.alternativeName}
          </h2>
          {/* IMAGE */}
          <img
            src={equipment.linkToImage}
            alt={equipment.name}
            className={styles['img']}
          />
          <div className={styles['general-info']}>
            {/* DESCRIPTION */}
            <div className={styles['info-block']}>
              <p className={styles['label']}>Descriptin: </p>
              <p className={styles['value']}>{equipment.description}</p>
            </div>
          </div>
          <hr />
          <div className={styles['bottom-btns-div']}>
            <Link
              to={`/activities/update-equipment/${id}`}
              className={styles['bottom-btns']}
            >
              Update
            </Link>
            <button
              type="button"
              id="delete-equipment-btn"
              className={styles['bottom-btns']}
              onClick={openTwoButtonConfirmationModal}
            >
              Delete
            </button>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      <TwoButtonConfirmationModal
        isModalOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        confirmDelete={confirmDeleteEquipment}
        info={equipment}
        type="equipment"
      />
    </section>
  );
};

export default EquipmentDetails;
