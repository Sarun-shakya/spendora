import { Routes, Route } from "react-router-dom";

import PublicLayout from "./components/layout/PublicLayout.jsx";
import LandingPage from "./pages/public/LandingPage.jsx";
import FeaturesPage from "./pages/public/FeaturesPage.jsx";
import AboutPage from "./pages/public/AboutPage.jsx";
import ContactPage from "./pages/public/ContactPage.jsx";

import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";

import DashboardLayout from "./components/layout/DashboardLayout.jsx";
import DashboardPage from "./pages/app/DashboardPage.jsx";
import BooksPage from "./pages/app/BooksPage.jsx";
import BookDetailPage from "./pages/app/BookDetailPage.jsx";
import CategoriesPage from "./pages/app/CategoriesPage.jsx";
import TransactionsPage from "./pages/app/TransactionsPage.jsx";
import MonthlyReportPage from "./pages/app/MonthlyReportPage.jsx";
import ProfilePage from "./pages/app/ProfilePage.jsx";

import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import PublicOnlyRoute from "./routes/PublicOnlyRoute.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export default function App() {
  return (
    <Routes>
      {/* Marketing site */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      {/* Auth (blocked for already-logged-in users) */}
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* App (requires auth) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="books" element={<BooksPage />} />
          <Route path="books/:id" element={<BookDetailPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="monthly-report" element={<MonthlyReportPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
