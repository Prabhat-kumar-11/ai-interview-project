import { useState } from "react";
import { InterviewContext } from "./interviewContextValue.js";

export const InterviewProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [actionLoading, setActionLoading] = useState(false)
    const [actionMessage, setActionMessage] = useState("")
    const [report, setReport] = useState(null)
    const [reports, setReports] = useState([])

    return (
        <InterviewContext.Provider value={{ loading, setLoading, actionLoading, setActionLoading, actionMessage, setActionMessage, report, setReport, reports, setReports }}>
            {children}
        </InterviewContext.Provider>
    )
}
