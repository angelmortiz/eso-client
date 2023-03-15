import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  deleteWorkout,
  fetchWorkoutById,
} from '../../../../util/apis/activities/workouts/workoutsApis';
import styles from '../../../UI/General/CSS/Details.module.css';
import SimpleCancelConfirmationModal from '../../../UI/Modals/TwoButtonModals/SimpleCancelConfirmationModal';

const WorkoutDetails = (props) => {
  const { id } = useParams();
  const navigateTo = useNavigate();
  const [workout, setWorkout] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (!id) console.error(`Error: workout id not found in the url.`);
    fetchWorkoutById(id).then((response) => {
      if (!response || !response.isSuccess) return;
      setWorkout(response.body);
    });
  }, [id]);

  const openSimpleCancelConfirmationModal = (e) => {
    e.preventDefault();
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const confirmDeleteWorkout = () => {
    closeDeleteModal();

    //TODO: Check if workout was deleted successfully
    deleteWorkout(id).then((response) => {
      if (!response || !response.isSuccess) return;
      navigateTo('/activities/workouts');
    });
  };

  return (
    <div className={styles['card']}>
      {!workout ? (
        <img
          src="/loading.gif"
          alt="Loading..."
          className={styles['loading-img']}
        />
      ) : (
        <div className={styles['main-section']}>
          {/* NAME */}
          <h1 className={styles['name']}>{workout.name}</h1>
          <div className={styles['general-info']}>
            {/* DESCRIPTION */}
            <div className={styles['info-block']}>
              <p className={styles['label']}>Description: </p>
              <p className={styles['value']}>{workout.description}</p>
            </div>
            {/* VARIANT */}
            <div className={styles['info-block']}>
              <p className={styles['label']}>Variant: </p>
              <p className={styles['value']}>{workout.variant}</p>
            </div>
            {/* TYPE */}
            <div className={styles['info-block']}>
              <p className={styles['label']}>Type: </p>
              <p className={styles['value']}>{workout.type}</p>
            </div>
            {/* TARGET */}
            <div className={styles['info-block']}>
              <p className={styles['label']}>Target: </p>
              <p className={styles['value']}>{workout.target}</p>
            </div>
          </div>
          <table className={styles['info-table']}>
            <thead>
              <tr>
                <th>#</th>
                <th>Exercise</th>
                <th>Sets</th>
                <th>Reps</th>
                <th>Tempo</th>
                <th>RIR</th>
                <th>Rest</th>
              </tr>
            </thead>
            <tbody>
              {workout.exercises.map((ex, index) => {
                return (
                  <tr key={`row-${index + 1}`}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/activities/exercise/${ex.exercise._id}`}>
                        {ex.exercise.name}
                      </Link>
                    </td>
                    <td>{ex.sets.join('-')}</td>
                    <td>{ex.reps.join('-')}</td>
                    <td>{ex.tempo.join('-')}</td>
                    <td>{ex.rir.join('-')}</td>
                    <td>{ex.rest.join('-')}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <div className={styles['bottom-btns-div']}>
        <Link
          to={`/activities/update-workout/${id}`}
          className={styles['bottom-btns']}
        >
          Update
        </Link>
        <button
          type="button"
          id="delete-exercise-btn"
          className={styles['bottom-btns']}
          onClick={openSimpleCancelConfirmationModal}
        >
          Delete
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      <SimpleCancelConfirmationModal
        isModalOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        confirmDelete={confirmDeleteWorkout}
        status="Warning"
        title="Confirm delete"
        message={`Are you sure you want to delete the workout "${workout?.name}"?`}
        mainButtonLabel="Delete"
      />
    </div>
  );
};

export default WorkoutDetails;
