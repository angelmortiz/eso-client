import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { deleteExercise, fetchExerciseById } from "../../../../util/apis/exercises/exercisesApis"
import YouTubeEmbed from "../../../UI/VideosEmbed/YouTubeEmbed";
import classes from '../../General/CSS/Details.module.css';
import DeleteConfirmationModal from "../../General/Popups/Delete/DeleteConfirmationModal";


const ExerciseDetails = props => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [exercise, setExercise] = useState(null);
    const [videoId, setVideoExercise] = useState(null);
    const [showVideo, setShowVideo] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        if (!id) console.log(`Error: exercise id not found in the url.`);
        fetchExerciseById(id).then(response => { 
            const vidId = response.body.linkToVideo?.substr(16); //extracts the video id from YT link
            setExercise(response.body);
            setVideoExercise(vidId);
        });
    }, [id]);

    const toggleShowVideo = (event) => {
        event.preventDefault();
        setShowVideo(!showVideo);
    };

    const openDeleteConfirmationModal = (event) => {
        event.preventDefault();
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const confirmDeleteExercise = () => {
        closeDeleteModal();

        //TODO: Check if exercise was deleted successfully
        deleteExercise(id).then(response => { 
            console.log("Response: ", response);
            navigate("/activities/exercises");
        });
    };

    return <section className={classes['card']}>
        { !exercise
        ? <img src="/loading.gif" alt="Loading..." className={classes['loading-img']}/>
        : <div className={classes['main-section']}>
            {/* NAME */}
            <h1 className={classes['name']}>{exercise.name}</h1>
            {/* ALTERNATIVE NAME */}
            <h2 className={classes['alternative-name']}>{exercise.alternativeName}</h2>
            {/* IMAGE */}
            <img src={exercise.linkToImage} alt={exercise.name} className={classes['img']}/>
            <div className={classes['general-info']}>
                {/* DIFFICULTY */}
                <div className={classes['info-block']}>
                    <p className={classes['label']}>Difficulty: </p>
                    <p className={classes['value']}>{exercise.difficulty}</p>
                </div>
                {/* COMPOUND MOVEMENT */}
                <div className={classes['info-block']}>
                    <p className={classes['label']}>Compound movement: </p>
                    <p className={classes['value']}>{exercise.compoundMovement ? 'Yes' : 'No'}</p>
                </div>
                {/* MAIN MUSCLE */}
                <div className={classes['info-block']}>
                    <p className={classes['label']}>Main muscle: </p>
                    <p className={classes['value']}>{exercise.mainMuscle.muscleName}</p>
                </div>
                {/* SECONDARY MUSCLES */}
                <div className={classes['info-block']}>
                    <p className={classes['label']}>Secondary muscles: </p>
                    {/* TODO: Implement logic for multiple options */}
                    <p className={classes['value']}>{exercise.secondaryMuscles[0]?.muscleName || "No secondary muscles"}</p>
                </div>
                {/* TYPES */}
                <div className={classes['info-block']}>
                    <p className={classes['label']}>Type: </p>
                    {/* TODO: Implement logic for multiple options */}
                    <p className={classes['value']}>{exercise.types[0]}</p>
                </div>
                {/* EQUIPMENTS */}
                <div className={classes['info-block']}>
                    <p className={classes['label']}>Equipments: </p>
                    {/* TODO: Implement logic for multiple options */}
                    <p className={classes['value']}>{exercise.equipments[0]?.equipmentName || "No equipment"}</p>
                </div>
            </div>
            <button type="button" id="show-video-btn" className={classes['show-btn']} onClick={toggleShowVideo}>{showVideo ? "Hide video" : "Show video"}</button>
            {/* VIDEO */}
            {showVideo && <YouTubeEmbed embedId={videoId} className={classes['video']}/>  }
            <hr />
            <div className={classes['bottom-btns-div']}>
                <Link to={`/activities/update-exercise/${id}`} className={classes['link']}>Update</Link>
                <button type="button" id="delete-exercise-btn" className={classes['delete-btn']} onClick={openDeleteConfirmationModal}>Delete</button>
            </div>
         </div>
        }
        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal isModalOpen={isDeleteModalOpen} closeModal={closeDeleteModal} confirmDelete={confirmDeleteExercise} info={exercise}/>
    </section>
    
};

export default ExerciseDetails;