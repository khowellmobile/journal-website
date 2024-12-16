import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../clients/supabaseClient";

import classes from "./LoginCard.module.css";

const LoginCard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pageError, setPageError] = useState(null);
    const navigate  = useNavigate();

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

    return (
        <>
            <button onClick={() => setIsModalOpen(true)} className={classes.openModalButton}>
                Login
            </button>

            {/* Conditional logic to control overlay. Right side wont eval if left side false */}
            {isModalOpen && (
                <div className={classes.modalOverlay}>
                    <form className={classes.loginCard} onSubmit={handleLogin}>
                        {pageError && <p>{pageError}</p>}
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="button" onClick={handleCancelClick}>
                            Cancel
                        </button>
                        <button type="submit">Login</button>
                    </form>
                </div>
            )}
        </>
    );
};

export default LoginCard;
