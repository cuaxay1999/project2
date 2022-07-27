import React from "react";
import { loadingIcon } from "../assets/img";

const Loader = () => {
    return (
        <div className="fp-container">
            <img src={ loadingIcon } className="fp-loader" alt="loading" />
        </div>
    );
};

export default Loader;
