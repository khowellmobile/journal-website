import NewTask from "../elements/taskElements/NewTask";
import classes from "./Header.module.css";

import { useState } from "react";

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            {isModalOpen && <NewTask handleCloseModal={handleCloseModal}/>}

            <button onClick={handleOpenModal}>New Task</button>
        </>
    );
};

export default Header;
