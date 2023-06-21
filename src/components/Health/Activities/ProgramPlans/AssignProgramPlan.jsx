import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postProgramPlan } from '../../../../util/apis/activities/programPlans/programPlansApis';
import { fetchAllProgramNames } from '../../../../util/apis/activities/programs/programsApis';
import { fetchAllUsers } from '../../../../util/apis/users/usersApis';
import FormSelectInput from '../../../UI/Selects/FormSelectInput';

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
      //console.log('Response: ', response);

      if (!response || !response.isSuccess) return;
      //adds an empty default option
      response.body.unshift({ _id: '', name: 'Choose a program', disabled: true });
      programOptions.select.options = response.body;
      setPrograms(programOptions);
    });
  }, []);

  useEffect(() => {
    fetchAllUsers().then((response) => {
      //console.log('allUsers: ', response);
      if (!response || !response.isSuccess) return;

      //adds an empty default option
      response.body.unshift({ _id: '', fullName: 'Choose an user', disabled: true });
      userOptions.select.options = response.body;
      setUsers(userOptions);
    });
  }, []);

  const assignProgramPlan = (e) => {
    e.preventDefault();

    postProgramPlan({ program: assignedProgramPlan, assignedTo }).then(
      (response) => {
        //console.log('Response: ', response);
        if (response.isSuccess) {
          //IMPROVE: Navigate to the just added exercise id
          navigateTo(`/activities/programs/`);
        }
      }
    );
  };

  return (
    <form
      id="assign-program"
      onSubmit={assignProgramPlan}
      className="mt-10 mx-5 pb-6 px-10 lg:mx-auto lg:max-w-[75%] xl:max-w-[60%] space-y-6 divide-y divide-gray-200 bg-white rounded-lg shadow"
    >
      <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
        <div>
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Assign Program
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Select a program and a user from the options provided below to
            allocate the appropriate assignment.
          </p>
        </div>
        <div className="space-y-6 sm:space-y-5">
          <FormSelectInput
            label="Program"
            select={programs?.select}
            setValue={setAssignedProgramPlan}
            selectedValue=''
          />
          <FormSelectInput
            label="User"
            select={users?.select}
            setValue={setAssignedTo}
            selectedValue=''
          />
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end gap-x-3">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md bg-cyan-700 py-2 px-5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AssignProgramPlan;
