import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import Jobs from "./pages/Jobs/Jobs";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import JobDetails from "./pages/JobDetails/JobDetails";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AddJob from "./pages/AddJob/AddJob";
import ManageJobs from "./pages/ManageJobs/ManageJobs";
import ArchivedJobs from "./pages/ArchivedJobs/ArchivedJobs";
import ProtectedRoute from "./components/ProtectedRoute";
import EditJob from "./pages/EditJob/EditJob";
import { Toaster } from "sonner";
import ContactMessages from "./pages/ContactMessages/ContactMessages";
import NotFound from "./pages/NotFound/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import Terms from "./pages/Terms/Terms";
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-job"
          element={
            <ProtectedRoute>
              <AddJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/manage-jobs"
          element={
            <ProtectedRoute>
              <ManageJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/archived"
          element={
            <ProtectedRoute>
              <ArchivedJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/edit-job/:id"
          element={
            <ProtectedRoute>
              <EditJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/messages"
          element={
            <ProtectedRoute>
              <ContactMessages />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<Terms />} />
      </Routes>

      <Footer />

      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;
