import { RouterProvider } from "react-router"
import { router } from "./appRoutes.jsx"
import { AuthProvider } from "./features/auth/authContext.jsx"
import { InterviewProvider } from "./features/interview/interviewContext.jsx"
import { ToastProvider } from "./components/ToastProvider.jsx"

function App() {

  return (
    <ToastProvider>
      <AuthProvider>
        <InterviewProvider>
          <RouterProvider router={router} />
        </InterviewProvider>
      </AuthProvider>
    </ToastProvider>
  )
}

export default App
