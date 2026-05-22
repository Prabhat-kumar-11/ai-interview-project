import React, { useState, useRef } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth.js'
import { useToast } from '../../../components/toastContext.js'

const Home = () => {

    const { loading, actionLoading, actionMessage, generateReport,reports } = useInterview()
    const { user, handleLogout } = useAuth()
    const [ jobDescription, setJobDescription ] = useState("")
    const [ selfDescription, setSelfDescription ] = useState("")
    const [ resumeFile, setResumeFile ] = useState(null)
    const [ errors, setErrors ] = useState({})
    const resumeInputRef = useRef()
    const { showToast } = useToast()

    const navigate = useNavigate()

    const validateForm = () => {
        const nextErrors = {}
        const cleanJobDescription = jobDescription.trim()
        const cleanSelfDescription = selfDescription.trim()

        if (!cleanJobDescription) {
            nextErrors.jobDescription = "Job description is required"
        } else if (cleanJobDescription.length < 40) {
            nextErrors.jobDescription = "Add a little more detail from the job post"
        }

        if (!resumeFile && !cleanSelfDescription) {
            nextErrors.profile = "Upload a resume PDF or add a self description"
        }

        setErrors(nextErrors)
        return Object.keys(nextErrors).length === 0
    }

    const handleResumeChange = (event) => {
        const file = event.target.files?.[ 0 ] || null

        if (!file) {
            setResumeFile(null)
            return
        }

        if (file.type !== "application/pdf") {
            event.target.value = ""
            setResumeFile(null)
            showToast({ type: "error", message: "Please upload a PDF resume" })
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            event.target.value = ""
            setResumeFile(null)
            showToast({ type: "error", message: "Resume PDF must be 5MB or smaller" })
            return
        }

        setResumeFile(file)
        setErrors((currentErrors) => ({ ...currentErrors, profile: "" }))
    }

    const handleGenerateReport = async () => {
        if (!validateForm()) return

        const data = await generateReport({ jobDescription: jobDescription.trim(), selfDescription: selfDescription.trim(), resumeFile })

        if (data?._id) {
            navigate(`/interview/${data._id}`)
        }
    }

    const onLogout = async () => {
        await handleLogout()
        navigate("/login")
    }

    if (loading) {
        return (
            <main className='loading-screen'>
                <h1>Loading your interview plan...</h1>
            </main>
        )
    }

    return (
        <div className='home-page'>

            {/* Page Header */}
            <header className='page-header'>
                <div className='page-header__top'>
                    <div className='user-chip'>
                        <span className='user-chip__avatar'>{user?.username?.charAt(0).toUpperCase() || "U"}</span>
                        <span>{user?.username || "User"}</span>
                    </div>
                    <button className='logout-btn' onClick={onLogout} type='button'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                        Logout
                    </button>
                </div>
                <h1>Create Your Custom <span className='highlight'>Interview Plan</span></h1>
                <p>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
            </header>

            {/* Main Card */}
            <div className='interview-card'>
                <div className='interview-card__body'>

                    {/* Left Panel - Job Description */}
                    <div className='panel panel--left'>
                        <div className='panel__header'>
                            <span className='panel__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                            </span>
                            <h2>Target Job Description</h2>
                            <span className='badge badge--required'>Required</span>
                        </div>
                        <textarea
                            value={jobDescription}
                            onChange={(e) => { setJobDescription(e.target.value) }}
                            className='panel__textarea'
                            placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                            maxLength={5000}
                        />
                        <div className='char-counter'>{jobDescription.length} / 5000 chars</div>
                        {errors.jobDescription && <p className='form-error'>{errors.jobDescription}</p>}
                    </div>

                    {/* Vertical Divider */}
                    <div className='panel-divider' />

                    {/* Right Panel - Profile */}
                    <div className='panel panel--right'>
                        <div className='panel__header'>
                            <span className='panel__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </span>
                            <h2>Your Profile</h2>
                        </div>

                        {/* Upload Resume */}
                        <div className='upload-section'>
                            <label className='section-label'>
                                Upload Resume
                                <span className='badge badge--best'>Best Results</span>
                            </label>
                            <label className='dropzone' htmlFor='resume'>
                                <span className='dropzone__icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                                </span>
                                <p className='dropzone__title'>{resumeFile ? resumeFile.name : "Click to upload"}</p>
                                <p className='dropzone__subtitle'>PDF only, max 5MB</p>
                                <input onChange={handleResumeChange} ref={resumeInputRef} hidden type='file' id='resume' name='resume' accept='application/pdf,.pdf' />
                            </label>
                            {errors.profile && <p className='form-error'>{errors.profile}</p>}
                        </div>

                        {/* OR Divider */}
                        <div className='or-divider'><span>OR</span></div>

                        {/* Quick Self-Description */}
                        <div className='self-description'>
                            <label className='section-label' htmlFor='selfDescription'>Quick Self-Description</label>
                            <textarea
                                value={selfDescription}
                                onChange={(e) => { setSelfDescription(e.target.value) }}
                                id='selfDescription'
                                name='selfDescription'
                                className='panel__textarea panel__textarea--short'
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                            />
                        </div>

                        {/* Info Box */}
                        <div className='info-box'>
                            <span className='info-box__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" stroke="#1a1f27" strokeWidth="2" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="#1a1f27" strokeWidth="2" /></svg>
                            </span>
                            <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
                        </div>
                    </div>
                </div>

                {/* Card Footer */}
                <div className='interview-card__footer'>
                    <span className='footer-info'>AI-Powered Strategy Generation &bull; Approx 30s</span>
                    <button
                        onClick={handleGenerateReport}
                        disabled={actionLoading}
                        className='generate-btn'>
                        {actionLoading ? (
                            <span className="button-spinner" aria-hidden="true"></span>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                        )}
                        {actionLoading ? "Generating..." : "Generate My Interview Strategy"}
                    </button>
                </div>
            </div>

            {actionLoading && (
                <div className='generation-status' role='status' aria-live='polite'>
                    <div className='generation-status__spinner'></div>
                    <div>
                        <h2>{actionMessage || "Generating your interview strategy..."}</h2>
                        <p>This usually takes around 30 seconds. Keep this tab open.</p>
                    </div>
                </div>
            )}

            {/* Recent Reports List */}
            <section className='recent-reports'>
                <div className='recent-reports__header'>
                    <div>
                        <h2>Recent Interview Plans</h2>
                        <p>Pick up where you left off or generate a fresh strategy.</p>
                    </div>
                    <span className='reports-count'>{reports.length}</span>
                </div>

                {reports.length > 0 ? (
                    <ul className='reports-list'>
                        {reports.map(report => (
                            <li key={report._id} className='report-item' onClick={() => navigate(`/interview/${report._id}`)}>
                                <div>
                                    <h3>{report.title || 'Untitled Position'}</h3>
                                    <p className='report-meta'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                </div>
                                <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>{report.matchScore}% match</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className='empty-state'>
                        <span className='empty-state__icon'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
                        </span>
                        <div>
                            <h3>No plans yet</h3>
                            <p>Your generated interview plans will appear here.</p>
                        </div>
                    </div>
                )}
            </section>

            {/* Page Footer */}
            <footer className='page-footer'>
                <a href='#'>Privacy Policy</a>
                <a href='#'>Terms of Service</a>
                <a href='#'>Help Center</a>
            </footer>
        </div>
    )
}

export default Home
