import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  deleteProgram,
  fetchProgramById,
} from '../../../../util/apis/activities/programs/programsApis';
import styles from '../../../UI/General/CSS/Details.module.css';
import TwoButtonConfirmationModal from '../../../UI/Modals/TwoButtonModals/TwoButtonConfirmationModal';

const ProgramDetails = (props) => {
  const { id } = useParams();
  const navigateTo = useNavigate();
  const [program, setProgram] = useState( );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (!id) console.error(`Error: program id not found in the url.`);
    fetchProgramById(id).then((response) => {
      if (!response || !response.isSuccess) return;
      setProgram(response.body);
    });
  }, [id]);

  const openTwoButtonConfirmationModal = (e) => {
    e.preventDefault();
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const confirmDeleteProgram = () => {
    closeDeleteModal();

    deleteProgram(id).then((response) => {
      if (!response || !response.isSuccess) return;
      navigateTo('/activities/programs');
    });
  };

  return (
    <div className={styles['card']}>
      {!program ? (
        <img
          src="/loading.gif"
          alt="Loading..."
          className={styles['loading-img']}
        />
      ) : (
        <div className={styles['main-section']}>
          {/* NAME */}
          <h1 className={styles['name']}>{program.name}</h1>
          <div className={styles['general-info']}>
            {/* DESCRIPTION */}
            <div className={styles['info-block']}>
              <p className={styles['label']}>Description: </p>
              <p className={styles['value']}>{program.description}</p>
            </div>
            {/* TYPE */}
            <div className={styles['info-block']}>
              <p className={styles['label']}>Type: </p>
              <p className={styles['value']}>{program.type}</p>
            </div>
            {/* DURATION */}
            <div className={styles['info-block']}>
              <p className={styles['label']}>Durantion: </p>
              <p className={styles['value']}>{program.duration} weeks</p>
            </div>
            {/* SEQUENCE */}
            <div className={styles['info-block']}>
              <p className={styles['label']}>Sequence: </p>
              <p className={styles['value']}>{program.sequence}</p>
            </div>
          </div>
          <table className={styles['info-table']}>
            <thead>
              <tr>
                <th>Day</th>
                <th>Workout</th>
              </tr>
            </thead>
            <tbody>
              {program.workouts.map((workout, index) => {
                return (
                  <tr key={`workout_${index}`}>
                    <td>
                      {program.sequence === 'Weekly'
                        ? workout.dayOfTheWeek
                        : workout.dayNumber}
                    </td>
                    <td>
                      <Link to={`/activities/workout/${workout.workout?._id}`}>
                        {workout.workout?.name}
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <div className={styles['bottom-btns-div']}>
        <Link
          to={`/activities/update-program/${id}`}
          className={styles['bottom-btns']}
        >
          Update
        </Link>
        <button
          type="button"
          id="delete-program-btn"
          className={styles['bottom-btns']}
          onClick={openTwoButtonConfirmationModal}
        >
          Delete
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      <TwoButtonConfirmationModal
        isModalOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        confirmDelete={confirmDeleteProgram}
        info={program}
        type="program"
      />
    </div>
  );
};

export default ProgramDetails;
