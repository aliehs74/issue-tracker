import { Navigate, Route, Routes } from 'react-router-dom';
import { IssueListPage } from './pages/IssueListPage';
import { IssueCreatePage } from './pages/IssueCreatePage';
import { IssueDetailPage } from './pages/IssueDetailPage';
import { IssueEditPage } from './pages/IssueEditPage';
import { NotFoundPage } from './pages/NotFoundPage';

const RoutesManagements = () => {
    return (
        <Routes>
            <Route path="/" element={< Navigate to="/issues" replace />} />
            < Route path="/issues" element={< IssueListPage />} />
            < Route path="/issues/new" element={< IssueCreatePage />} />
            < Route path="/issues/:id" element={< IssueDetailPage />} />
            < Route path="/issues/:id/edit" element={< IssueEditPage />} />
            < Route path="*" element={< NotFoundPage />} />
        </Routes>
    )
}

export default RoutesManagements