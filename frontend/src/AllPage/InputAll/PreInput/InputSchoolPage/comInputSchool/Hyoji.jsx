import React from "react";

export const Hyoji = (UseSchools, navigate, urlTournamentName, urlTournamentId) => {

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
                                <br />
                                <button
                                    onClick={() => {
                                        PageTransition(school.school_name + "/InputMember" +
                                        "?urlTournamentId="+urlTournamentId+"&urlTournamentName="+urlTournamentName+
                                        "&urlSchoolId="+school.school_id+"&urlSchoolName="+school.school_name); 
                                    }} className="schoolBtn">
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