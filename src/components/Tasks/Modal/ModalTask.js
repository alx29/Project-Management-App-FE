import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import Select from 'react-select';
import axios from 'axios';

const statuses = [
  { value: 'to do', label: 'to do' },
  { value: 'doing', label: 'doing' },
  { value: 'done', label: 'done' },
];

export const InputCheckbox = ({ isChecked, setChecked, label }) => {
  return (
    <label className='mb-0 flex items-center cursor-pointer'>
      <div className='mr-2 bg-slate-300/[.5] dark:bg-slate-800 w-5 h-5 rounded-full grid place-items-center border border-slate-300 dark:border-slate-700'>
        {isChecked && (
          <span className='bg-rose-500 w-2 h-2 block rounded-full'></span>
        )}
      </div>
      <span className='order-1 flex-1'>{label}</span>
      <input
        type='checkbox'
        className='sr-only'
        checked={isChecked}
        onChange={() => setChecked((prev) => !prev)}
      />
    </label>
  );
};

const ModalCreateTask = ({ onClose, task, nameForm, onConfirm }) => {
  const [options, setOptions] = useState([]);
  const {
    status,
    name,
    description,
    endDate,
    completed,
    important,
    assignedTo,
  } = task;
  const [currentStatus, setCurrentStatus] = useState({
    value: status,
    label: status,
  });
  const [currentDescription, setCurrentDescription] = useState(description);
  const [currentDeadline, setCurrentDeadline] = useState(() => {
    const index = endDate.indexOf('T');
    return endDate.slice(0, index);
  });
  const [isImportant, setIsImportant] = useState(important);
  const [isCompleted, setIsCompleted] = useState(completed);
  const [currentName, setCurrentName] = useState(name);
  const [currentAssignedTo, setCurrentAssignedTo] = useState({
    value: assignedTo,
    label: assignedTo,
  });

  const todayDate = new Date();

  useEffect(() => {
    if (isCompleted) {
      setCurrentStatus({
        value: 'done',
        label: 'done',
      });
    } else {
      setCurrentStatus({
        value: 'to do',
        label: 'to do',
      });
    }
    fetchData();
  }, [isCompleted]);

  const fetchData = async () => {
    try {
      const jwt = localStorage.getItem('access_token');
      const response = await axios.get('http://localhost:3000/all_users', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      const formatedData = response.data.map((pm) => {
        return {
          value: pm.username,
          label: pm.username,
        };
      });
      setOptions(formatedData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = (s) => {
    setCurrentStatus(s);
    if (s.value === 'done') {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };

  const handleAssignedToChange = (newAssignedTo) => {
    setCurrentAssignedTo(newAssignedTo);
  };

  const addNewTaskHandler = (event) => {
    event.preventDefault();

    onConfirm({
      name: currentName,
      status: currentStatus.value,
      description: currentDescription,
      important: isImportant,
      completed: isCompleted,
      endDate: currentDeadline,
      assignedTo: currentAssignedTo.value,
    });
  };

  return (
    <Modal onClose={onClose} title={nameForm}>
      <form
        className='flex flex-col stylesInputsField'
        onSubmit={addNewTaskHandler}
      >
        <label>
          Name
          <input
            type='text'
            placeholder='e.g, study for the test'
            required
            value={currentName}
            onChange={({ target }) => setCurrentName(target.value)}
            className='w-full rounded-lg p-1 my-2'
          />
        </label>
        <label>
          Deadline Date
          <input
            type='date'
            className='w-full rounded-lg p-1 my-2'
            value={currentDeadline}
            required
            onChange={({ target }) => {
              setCurrentDeadline(target.value);
            }}
            min={todayDate}
            // max={maxDate}
          />
        </label>
        <label>
          Description
          <textarea
            placeholder='e.g, study for the test'
            className='w-full rounded-lg p-1 my-2'
            value={currentDescription}
            onChange={({ target }) => setCurrentDescription(target.value)}
          ></textarea>
        </label>
        <label>
          Assigned to
          <Select
            className='block w-full rounded-lg p-1 my-1'
            options={options}
            value={currentAssignedTo}
            onChange={handleAssignedToChange}
          ></Select>
        </label>
        <label>
          Select status
          <Select
            className='block w-full rounded-lg p-1 my-1'
            options={statuses}
            value={currentStatus}
            onChange={handleStatusChange}
          ></Select>
        </label>
        <InputCheckbox
          isChecked={isImportant}
          setChecked={setIsImportant}
          label='Mark as important'
        />
        <InputCheckbox
          isChecked={isCompleted}
          setChecked={setIsCompleted}
          label='Mark as completed'
        />
        <button type='submit' className='btn mt-5 hover:bg-#806FCC'>
          {nameForm}
        </button>
      </form>
    </Modal>
  );
};

export default ModalCreateTask;
