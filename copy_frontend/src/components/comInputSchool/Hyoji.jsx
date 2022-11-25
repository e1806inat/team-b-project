import React, { useState } from "react";

export const Hyoji = (UseSchools, setUseSchools2) => {

    const handleClick = () => {



    }

    return (
        <div className="main">
            <div className="Schools">
                {UseSchools.map(school => {
                    if (school.IsCheck) {
                        return (
                            <div className="school">
                                <br />
                                <button onClick={handleClick} >{school.school}</button>
                                <br />
                            </div>
                        )
                    }

                })
                }
            </div>
        </div>
    )

}

export default Hyoji;