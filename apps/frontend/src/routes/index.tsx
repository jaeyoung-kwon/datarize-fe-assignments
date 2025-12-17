import DashBoardPage from '@/pages/dashboard/DashBoardPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: DashBoardPage,
});
