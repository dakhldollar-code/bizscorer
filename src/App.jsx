import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary.jsx";
import BizScorerTool from "./BizScorerTool.jsx";
import FreeTools from "./pages/FreeTools.jsx";
import Rankings from "./pages/Rankings.jsx";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BizScorerTool />} />
        <Route path="/free-tools" element={<FreeTools />} />
        <Route path="/rankings" element={<Rankings />} />
        <Route path="/rankings/:vertical/:city" element={<Rankings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
