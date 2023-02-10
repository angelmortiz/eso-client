import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  deleteExercise,
  fetchExerciseById,
} from '../../../../util/apis/activities/exercises/exercisesApis';
import YouTubeEmbed from '../../../UI/VideosEmbed/YouTubeEmbed';
import styles from '../../../UI/General/CSS/Details.module.css';
import DeleteConfirmationModal from '../../../UI/Popups/Delete/DeleteConfirmationModal';

const ExerciseDetails = (props) => {
  const { id } = useParams();
  const navigateTo = useNavigate();
  const [exercise, setExercise] = useState(null);
  const [videoId, setVideoExercise] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (!id) console.error(`Error: exercise id not found in the url.`);
    fetchExerciseById(id).then((response) => {
      if (!response || !response.isSuccess) return;

      const vidId = response.body.linkToVideo?.substr(16); //extracts the video id from YT link
      setExercise(response.body);
      setVideoExercise(vidId);
    });
  }, [id]);

  const toggleShowVideo = (e) => {
    e.preventDefault();
    setShowVideo(!showVideo);
  };

  const openDeleteConfirmationModal = (e) => {
    e.preventDefault();
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const confirmDeleteExercise = () => {
    closeDeleteModal();

    deleteExercise(id).then((response) => {
      if (!response || !response.isSuccess) return;
      navigateTo('/activities/exercises');
    });
  };

  return (
    <section className={styles['card']}>
      {!exercise ? (
        <img
          src="/loading.gif"
          alt="Loading..."
          className={styles['loading-img']}
        />
      ) : (
        <div className={styles['main-section']}>
          {/* NAME */}
          <h1 className={styles['name']}>{exercise.name}</h1>
          {/* ALTERNATIVE NAME */}
          <h2 className={styles['alternative-name']}>
            {exercise.alternativeName}
          </h2>
          {/* IMAGE */}
          <img
            src={exercise.linkToImage}
            alt={exercise.name}
            className={styles['img']}
          />
          <div className={styles['general-info']}>
            {/* DIFFICULTY */}
            <div className={styles['info-block']}>
              <p className={styles['label']}>Difficulty: </p>
              <p className={styles['value']}>{exercise.difficulty}</p>
            </div>
            {/* COMPOUND MOVEMENT */}
            <div className={styles['info-block']}>
              <p className={styles['label']}>Compound movement: </p>
              <p className={styles['value']}>
                {exercise.compoundMovement ? 'Yes' : 'No'}
              </p>
            </div>
            {/* MAIN MUSCLE */}
            <div className={styles['info-block']}>
              <p className={styles['label']}>Main muscle: </p>
              <p className={styles['value']}>
                {exercise.mainMuscle.name}
              </p>
            </div>
            {/* SECONDARY MUSCLES */}
            <div className={styles['info-block']}>
              <p className={styles['label']}>Secondary muscles: </p>
              {/* TODO: Implement logic for multiple options */}
              <p className={styles['value']}>
                {exercise.secondaryMuscles[0]?.name ||
                  'No secondary muscles'}
              </p>
            </div>
            {/* TYPES */}
            <div className={styles['info-block']}>
              <p className={styles['label']}>Type: </p>
              {/* TODO: Implement logic for multiple options */}
              <p className={styles['value']}>{exercise.types[0]}</p>
            </div>
            {/* EQUIPMENTS */}
            <div className={styles['info-block']}>
              <p className={styles['label']}>Equipments: </p>
              {/* TODO: Implement logic for multiple options */}
              <p className={styles['value']}>
                {exercise.equipments[0]?.name || 'No equipment'}
              </p>
            </div>
          </div>
          <button
            type="button"
            id="show-video-btn"
            className={styles['show-btn']}
            onClick={toggleShowVideo}
          >
            {showVideo ? 'Hide video' : 'Show video'}
          </button>
          {/* VIDEO */}
          {showVideo && (
            <YouTubeEmbed embedId={videoId} className={styles['video']} />
          )}
          <hr />
          <div className={styles['bottom-btns-div']}>
            <Link
              to={`/activities/update-exercise/${id}`}
              className={styles['bottom-btns']}
            >
              Update
            </Link>
            <button
              type="button"
              id="delete-exercise-btn"
              className={styles['bottom-btns']}
              onClick={openDeleteConfirmationModal}
            >
              Delete
            </button>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isModalOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        confirmDelete={confirmDeleteExercise}
        info={exercise}
        type="exercise"
      />
    </section>
  );
};

export default ExerciseDetails;
