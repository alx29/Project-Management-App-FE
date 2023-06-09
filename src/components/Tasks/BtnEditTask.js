import React, { useState } from "react";
// import ModalCreateTask from "../../Utilities/ModalTask";
import { ReactComponent as OptionsSvg } from "../../assets/options.svg";

const BtnEditTask = ({ task }) => {
  const [modalEditTaskOpen, setModalEditTaskOpen] = useState(false);
  // const dispatch = useAppDispatch();

  const closeModalEditTask = () => {
    setModalEditTaskOpen(false);
  };

  const openModalEditTask = () => {
    setModalEditTaskOpen(true);
  };

  const editTaskHandler = (task) => {
    // dispatch(tasksActions.editTask(task));
  };

  return (
    <>
      <button
        title="edit task"
        className="transition w-7 sm:w-8 h-6 sm:h-8 grid place-items-center dark:hover:text-slate-200 hover:text-slate-700"
        onClick={openModalEditTask}
      >
        <OptionsSvg className="w-4 sm:w-5 h-4 sm:h-5" />
      </button>
      {/* {modalEditTaskOpen && (
        // <ModalCreateTask
        //   onClose={closeModalEditTask}
        //   task={task}
        //   nameForm="Edit task"
        //   onConfirm={editTaskHandler}
        // />
      )} */}
    </>
  );
};

export default BtnEditTask;