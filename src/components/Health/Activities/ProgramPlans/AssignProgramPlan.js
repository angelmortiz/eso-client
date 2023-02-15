import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postProgramPlan } from '../../../../util/apis/activities/programPlans/programPlansApis';
import { fetchAllProgramNames } from '../../../../util/apis/activities/programs/programsApis';
import { fetchAllUsers } from '../../../../util/apis/users/usersApis';
import styles from '../../../UI/General/CSS/Form.module.css';
import SelectInput from '../../../UI/Selects/SelectInput';

const programOptions = {
  select: {
    id: 'program-selection',
    name: 'program',
    value: '_id',
    label: 'name',
    options: [],
  },
};

const userOptions = {
  select: {
    id: 'user-selection',
    name: 'user',
    value: '_id',
    label: 'fullName',
    options: [],
  },
};

const AssignProgramPlan = (props) => {
  const navigateTo = useNavigate();
  const [assignedTo, setAssignedTo] = useState();
  const [assignedProgramPlan, setAssignedProgramPlan] = useState();
  const [programs, setPrograms] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    fetchAllProgramNames().then((response) => {
      console.log('programs: ', response);
      if (!response || !response.isSuccess) return;
      //adds an empty default option
      response.body.unshift({ _id: '', name: '-- Choose a program --' });
      programOptions.select.options = response.body;
      setPrograms(programOptions);
    });
  }, []);

  useEffect(() => {
    fetchAllUsers().then((response) => {
      console.log('allUsers: ', response);
      if (!response || !response.isSuccess) return;
      
      //adds an empty default option
      response.body.unshift({ _id: '', fullName: '-- Choose an user --' });
      userOptions.select.options = response.body;
      setUsers(userOptions);
    });
  }, []);

  const assignProgramPlan = (e) => {
    e.preventDefault();

    postProgramPlan({ program: assignedProgramPlan, assignedTo }).then(
      (response) => {
        console.log('Response: ', response);
          if (response.isSuccess) {
            //IMPROVE: Navigate to the just added exercise id
            navigateTo(`/activities/programs/`);
          }
      }
    );
  };

  return (
    <section className={styles['main-section']}>
      <form
        id="assign-program"
        onSubmit={assignProgramPlan}
        className={styles['main-form']}
      >
        <h1 className={styles['form-title']}>Assign Plan</h1>

        {/* PROGRAM */}
        <label htmlFor="program" className={styles['text-label']}>
          Program:
        </label>
        {programs ? (
          <SelectInput
            select={programs?.select}
            setValue={setAssignedProgramPlan}
          />
        ) : (
          <img
            src="/loading.gif"
            alt="Loading..."
            className={styles['loading-img']}
          />
        )}

        {/* USER */}
        <label htmlFor="user" className={styles['text-label']}>
          User:
        </label>
        {users ? (
          <SelectInput select={users?.select} setValue={setAssignedTo} />
        ) : (
          <img
            src="/loading.gif"
            alt="Loading..."
            className={styles['loading-img']}
          />
        )}

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          id="assign-program-btn"
          className={styles['submit-btn']}
        >
          Assign Program
        </button>
      </form>
    </section>
  );
};

export default AssignProgramPlan;
