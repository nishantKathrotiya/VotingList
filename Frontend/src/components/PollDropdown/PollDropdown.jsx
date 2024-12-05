import React from "react";
import  s from './PollDropdown.module.css';

const PollDropdown = ({ currentPoll }) => {
    // Generate an array of numbers from currentPoll down to 1
    const options = Array.from({ length: currentPoll }, (_, i) => currentPoll - i);

    return (
        <div className={s.dropConatainer}>
            <label htmlFor="pollSelect">Select Poll: </label>
            <select id="pollSelect" name="pollSelect" className={s.optionsConatiner}>
                {options.map((option) => (
                    <option key={option} value={option} >
                        Poll {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default PollDropdown;
