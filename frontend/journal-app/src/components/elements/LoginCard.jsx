import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../clients/supabaseClient";

import classes from "./LoginCard.module.css";

const LoginCard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pageError, setPageError] = useState(null);
    const navigate = useNavigate();

    const emailInputRef = useRef();

    const handleCancelClick = () => {
        setIsModalOpen(false);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { user, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            navigate("/admin");
            setIsModalOpen(false);
        } catch (error) {
            setPageError(error.message);
        }
    };

    const handleKeyPress = (event) => {
        if (event.ctrlKey && event.shiftKey && event.key === "L") {
            setIsModalOpen((prevIsModalOpen) => {
                const newModalState = !prevIsModalOpen;
                return newModalState;
            });
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    useEffect(() => {
        if (isModalOpen && emailInputRef.current) {
            emailInputRef.current.focus();
        }
    }, [isModalOpen]);

    return (
        <>
            {/* Conditional logic to control overlay. Right side wont eval if left side false */}
            {isModalOpen && (
                <div className={classes.modalOverlay}>
                    <form className={classes.loginCard} onSubmit={handleLogin}>
                        <div className={classes.loginCard}>
                            <div className={classes.logo}>
                                <b>H</b>
                            </div>
                            <div className={classes.loginHeader}>
                                <b>Welcome Back</b>
                                <p>Please enter your details.</p>
                            </div>
                            {pageError && <p>{pageError}</p>}
                            <div className={classes.formCluster}>
                                <input
                                    type="text"
                                    className={classes.formInput}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    ref={emailInputRef}
                                    placeholder=""
                                    required
                                />
                                <p className={classes.formLabel}>Email</p>
                            </div>
                            <div className={classes.formCluster}>
                                <input
                                    type="password"
                                    className={classes.formInput}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder=""
                                    required
                                />
                                <p className={classes.formLabel}>Password</p>
                            </div>
                            <button type="submit" className={classes.submitButton}>
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default LoginCard;
