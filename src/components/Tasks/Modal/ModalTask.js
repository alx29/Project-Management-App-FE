import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import Select from 'react-select';

const statuses = [
  { value: 'to do', label: 'to do' },
  { value: 'doing', label: 'doing' },
  { value: 'done', label: 'done' },
];

const InputCheckbox = ({ isChecked, setChecked, label }) => {
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
  const { status, name, description, endDate, completed, important } = task;
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
  }, [isCompleted]);

  const handleStatusChange = (s) => {
    setCurrentStatus(s);
    if (s.value === 'done') {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };

  const addNewTaskHandler = (event) => {
    event.preventDefault();

    onConfirm({
      name: currentName,
      status: currentStatus,
      description: currentDescription,
      important: isImportant,
      completed: isCompleted,
      endDate: currentDeadline,
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
