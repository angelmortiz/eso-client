import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  deleteMuscle,
  fetchMuscleById,
} from '../../../../util/apis/activities/muscles/musclesApis';
import styles from '../../../UI/General/CSS/Details.module.css';
import TwoButtonConfirmationModal from '../../../UI/Modals/TwoButtonModals/TwoButtonConfirmationModal';

const MuscleDetails = (props) => {
  const { id } = useParams();
  const navigateTo = useNavigate();
  const [muscle, setMuscle] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (!id) console.error(`Error: muscle id not found in the url.`);
    fetchMuscleById(id).then((response) => {
      if (!response || !response.isSuccess) return;
      setMuscle(response.body);
    });
  }, [id]);

  const openTwoButtonConfirmationModal = (e) => {
    e.preventDefault();
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const confirmDeleteMuscle = () => {
    closeDeleteModal();

    deleteMuscle(id).then((response) => {
      if (!response || !response.isSuccess) return;
      navigateTo('/activities/muscles');
    });
  };

  return (
    <section className={styles['card']}>
      {!muscle ? (
        <img
          src="/loading.gif"
          alt="Loading..."
          className={styles['loading-img']}
        />
      ) : (
        <div className={styles['main-section']}>
          {/* NAME */}
          <h1 className={styles['name']}>{muscle.name}</h1>
          {/* ALTERNATIVE NAME */}
          <h2 className={styles['alternative-name']}>
            {muscle.alternativeName}
          </h2>
          {/* IMAGE */}
          <img
            src={muscle.linkToImage}
            alt={muscle.name}
            className={styles['img']}
          />
          <div className={styles['general-info']}>
            {/* TYPE */}
            <div className={styles['info-block']}>
              <p className={styles['label']}>Type: </p>
              <p className={styles['value']}>{muscle.type}</p>
            </div>
          </div>
          <hr />
          <div className={styles['bottom-btns-div']}>
            <Link
              to={`/activities/update-muscle/${id}`}
              className={styles['bottom-btns']}
            >
              Update
            </Link>
            <button
              type="button"
              id="delete-muscle-btn"
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
        confirmDelete={confirmDeleteMuscle}
        info={muscle}
        type="muscle"
      />
    </section>
  );
};

export default MuscleDetails;
