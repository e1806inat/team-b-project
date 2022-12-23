import React from "react";
import '../InputSchool.css';

export const Hyoji = (UseSchools, setUseSchools2, navigate) => {

    const PageTransition = (url) => {
        navigate(url)
    }

    return (
        <div className="main">
            <div className="Schools">
                {UseSchools.map(school => {
                    if (school.IsCheck) {
                        return (
                            <div className="school">
                                {console.log(school.school_name)}
                                <br />
                                <button
                                    onClick={() => PageTransition(school.school_name + "/InputMember")} 
                                    className="schoolBtn">
                                    {school.school_name}
                                </button>
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