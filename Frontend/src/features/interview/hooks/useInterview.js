import { getAllInterviewReports, generateInterviewReport, getInterviewReportById, generateResumePdf } from "../services/interviewApi"
import { useCallback, useContext, useEffect } from "react"
import { InterviewContext } from "../interviewContextValue"
import { useParams } from "react-router"
import { useToast } from "../../../components/toastContext"


export const useInterview = () => {

    const context = useContext(InterviewContext)
    const { interviewId } = useParams()
    const { showToast } = useToast()

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, actionLoading, setActionLoading, actionMessage, setActionMessage, report, setReport, reports, setReports } = context

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setActionMessage("Analyzing your resume and job description...")
        setActionLoading(true)
        let response = null
        try {
            response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
            setReport(response.interviewReport)
            showToast({ type: "success", message: "Interview strategy generated" })
        } catch (error) {
            console.log(error)
            showToast({ type: "error", message: error.response?.data?.message || "Could not generate interview report" })
        } finally {
            setActionLoading(false)
            setActionMessage("")
        }

        return response?.interviewReport || null
    }

    const getReportById = useCallback(async (interviewId) => {
        setLoading(true)
        let response = null
        try {
            response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
        } catch (error) {
            console.log(error)
            showToast({ type: "error", message: error.response?.data?.message || "Could not load interview report" })
        } finally {
            setLoading(false)
        }
        return response?.interviewReport || null
    }, [ setLoading, setReport, showToast ])

    const getReports = useCallback(async () => {
        setLoading(true)
        let response = null
        try {
            response = await getAllInterviewReports()
            setReports(response.interviewReports)
        } catch (error) {
            console.log(error)
            showToast({ type: "error", message: error.response?.data?.message || "Could not load interview reports" })
        } finally {
            setLoading(false)
        }

        return response?.interviewReports || []
    }, [ setLoading, setReports, showToast ])

    const getResumePdf = async (interviewReportId) => {
        setActionMessage("Creating your tailored resume PDF...")
        setActionLoading(true)
        let response = null
        try {
            response = await generateResumePdf({ interviewReportId })
            const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
            link.remove()
            window.URL.revokeObjectURL(url)
            showToast({ type: "success", message: "Resume PDF downloaded" })
        }
        catch (error) {
            console.log(error)
            showToast({ type: "error", message: error.response?.data?.message || "Could not generate resume PDF" })
        } finally {
            setActionLoading(false)
            setActionMessage("")
        }
    }

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        } else {
            getReports()
        }
    }, [ interviewId, getReportById, getReports ])

    return { loading, actionLoading, actionMessage, report, reports, generateReport, getReportById, getReports, getResumePdf }

}
