import React from "react";

export const Hyoji = (UseSchools, navigate, urlTournamentName, urlTournamentId, isEditMode, EditSchoolPopup,
    EorDCheckbox,setEorDCheckbox, EditSchool, DeleteSchool, readSchool, setUseSchools,
    editingSchoolName, setEditingSchoolName
    ) => {

    const PageTransition = (url) => {
        navigate(url)
    }

    return (
        <div className="main">
            <div className="Schools">
                {UseSchools.map(school => {
                    if (school.school_name !== null) {
                        if (school.IsCheck) {
                            return (
                                <div className="school">
                                    {!isEditMode &&
                                        <>
                                            <br />
                                            <button
                                                onClick={() => {
                                                    PageTransition("InputMember" +
                                                        "?urlTournamentId=" + urlTournamentId + "&urlTournamentName=" + urlTournamentName +
                                                        "&urlSchoolId=" + school.school_id + "&urlSchoolName=" + school.school_name);
                                                }} className="schoolBtn">
                                                {school.school_name}
                                            </button>
                                            <br />
                                        </>
                                    }
                                    {isEditMode &&
                                        <>
                                            <EditSchoolPopup
                                                school={school}
                                                EorDCheckbox={EorDCheckbox}
                                                setEorDCheckbox={setEorDCheckbox}
                                                EditSchool={EditSchool}
                                                DeleteSchool={DeleteSchool}
                                                readSchool={readSchool}
                                                setUseSchools={setUseSchools}
                                                urlTournamentId={urlTournamentId}
                                                editingSchoolName={editingSchoolName}
                                                setEditingSchoolName={setEditingSchoolName}
                                            />
                                        </>
                                    }

                                </div>
                            )
                        }
                    }
                })
                }
            </div>
        </div>
    )

}

export default Hyoji;