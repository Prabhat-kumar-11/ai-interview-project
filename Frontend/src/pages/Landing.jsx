import React from 'react'
import { Link } from 'react-router'
import { useAuth } from '../features/auth/hooks/useAuth.js'
import './landing.scss'

const Landing = () => {
    const { user } = useAuth()

    return (
        <div className='landing-page'>
            <header className='landing-nav'>
                <Link className='brand' to='/'>
                    <span className='brand__mark'>IA</span>
                    <span>Interview AI</span>
                </Link>
                <nav className='landing-nav__actions'>
                    {user ? (
                        <Link className='nav-link' to='/dashboard'>Dashboard</Link>
                    ) : (
                        <>
                            <Link className='nav-link' to='/login'>Login</Link>
                            <Link className='nav-button' to='/register'>Register</Link>
                        </>
                    )}
                </nav>
            </header>

            <main>
                <section className='landing-hero'>
                    <div className='landing-hero__content'>
                        <span className='eyebrow'>AI interview preparation workspace</span>
                        <h1>Prepare for the right interview, with the right plan.</h1>
                        <p>
                            Interview AI studies your resume, self-description, and target job description to create a focused preparation plan with likely questions, skill gaps, and a tailored resume PDF.
                        </p>
                        <div className='hero-actions'>
                            <Link className='primary-cta' to={user ? '/dashboard' : '/register'}>{user ? 'Open Dashboard' : 'Start Preparing'}</Link>
                            {!user && <Link className='secondary-cta' to='/login'>Login</Link>}
                        </div>
                    </div>

                    <div className='product-preview' aria-label='Interview AI product preview'>
                        <div className='preview-topbar'>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div className='preview-grid'>
                            <div className='preview-panel'>
                                <p className='preview-label'>Match Score</p>
                                <div className='preview-score'>86%</div>
                                <p className='preview-muted'>Strong fit for Frontend Engineer</p>
                            </div>
                            <div className='preview-panel wide'>
                                <p className='preview-label'>Technical Questions</p>
                                <div className='preview-line long'></div>
                                <div className='preview-line'></div>
                                <div className='preview-line short'></div>
                            </div>
                            <div className='preview-panel wide'>
                                <p className='preview-label'>Preparation Plan</p>
                                <div className='preview-steps'>
                                    <span>Day 1</span>
                                    <span>React</span>
                                    <span>System Design</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='value-section'>
                    <div className='section-heading'>
                        <span className='eyebrow'>Why use it</span>
                        <h2>Turn scattered preparation into a clear strategy.</h2>
                    </div>
                    <div className='value-grid'>
                        <article>
                            <h3>Job-specific practice</h3>
                            <p>Generate technical and behavioral questions based on the role you are actually applying for.</p>
                        </article>
                        <article>
                            <h3>Skill gap clarity</h3>
                            <p>See which skills need attention and how important each gap is for the target job.</p>
                        </article>
                        <article>
                            <h3>Day-wise roadmap</h3>
                            <p>Follow a structured preparation plan instead of guessing what to study next.</p>
                        </article>
                        <article>
                            <h3>Resume tailoring</h3>
                            <p>Create an ATS-friendly resume PDF aligned with the job description and your profile.</p>
                        </article>
                    </div>
                </section>

                <section className='workflow-section'>
                    <div className='section-heading'>
                        <span className='eyebrow'>How it helps</span>
                        <h2>Built for the full interview prep flow.</h2>
                    </div>
                    <div className='workflow'>
                        <div>
                            <span>1</span>
                            <h3>Add your target role</h3>
                            <p>Paste the job description so the AI understands the company expectations.</p>
                        </div>
                        <div>
                            <span>2</span>
                            <h3>Share your profile</h3>
                            <p>Upload a resume PDF or write a quick self-description about your background.</p>
                        </div>
                        <div>
                            <span>3</span>
                            <h3>Get your plan</h3>
                            <p>Review match score, likely questions, gaps, and a practical preparation roadmap.</p>
                        </div>
                    </div>
                </section>

                <section className='landing-cta'>
                    <div>
                        <h2>Ready to prepare with more direction?</h2>
                        <p>Create your first interview strategy in a few minutes.</p>
                    </div>
                    <Link className='primary-cta' to={user ? '/dashboard' : '/register'}>{user ? 'Go to Dashboard' : 'Create Account'}</Link>
                </section>
            </main>
        </div>
    )
}

export default Landing
