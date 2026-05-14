import { Navigate, Route, Routes } from "react-router-dom";
import { IntroPage } from "./pages/IntroPage";
import { HomePage } from "./pages/HomePage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { StaticPage } from "./pages/StaticPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<IntroPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/privacy" element={<StaticPage src="/PrivacyPolicy/PrivacyPolicy.html" title="Privacy Policy" />} />
      <Route path="/terms" element={<StaticPage src="/TermsOfService/TermsOfService.html" title="Terms of Service" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
