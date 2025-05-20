import type { RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { LandingLayout } from '../components/layouts/LandingLayout';
import { DashboardLayout } from '../components/layouts/DashboardLayout';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { LoadingSpinner } from '../components/ui/loading-spinner';

// Landing page components
const LandingPage = lazy(() => import('../app/landing/LandingPage'));

// Auth
const Login = lazy(() => import('../app/auth/Login'));
const Register = lazy(() => import('../app/auth/Register'));
const ForgotPassword = lazy(() => import('../app/auth/ForgotPassword'));

// Dashboard components
const Dashboard = lazy(() => import('../app/dashboard/Dashboard'));
const CodingStats = lazy(() => import('../app/dashboard/CodingStats'));
const Projects = lazy(() => import('../app/dashboard/Projects'));
const TimeTracker = lazy(() => import('../app/dashboard/TimeTracker'));

// Leaderboard components
const Leaderboard = lazy(() => import('../app/leaderboard/Leaderboard'));
const GlobalRanking = lazy(() => import('../app/leaderboard/GlobalRanking'));
const FriendsRanking = lazy(() => import('../app/leaderboard/FriendsRanking'));

// Settings components
const Settings = lazy(() => import('../app/settings/Settings'));
const Profile = lazy(() => import('../app/settings/Profile'));
const Preferences = lazy(() => import('../app/settings/Preferences'));
const Notifications = lazy(() => import('../app/settings/Notifications'));

// Cat companion components
const CatCompanion = lazy(() => import('../app/cat-companion/CatCompanion'));

// Error pages
const NotFound = lazy(() => import('../app/error/NotFound'));
const ServerError = lazy(() => import('../app/error/ServerError'));

// Wrap lazy-loaded components with Suspense and ErrorBoundary
const withSuspense = (Component: React.ComponentType) => (
  <ErrorBoundary fallback={<ServerError />}>
    <Suspense fallback={<LoadingSpinner />}>
      <Component />
    </Suspense>
  </ErrorBoundary>
);

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <LandingLayout />,
    children: [
      {
        index: true,
        element: withSuspense(LandingPage),
      },
      {
        path: 'login',
        element: withSuspense(Login),
      },
      {
        path: 'register',
        element: withSuspense(Register),
      },
      {
        path: 'forgot-password',
        element: withSuspense(ForgotPassword),
      },
    ],
  },
  {
    path: '/app',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: withSuspense(Dashboard),
      },
      {
        path: 'stats',
        element: withSuspense(CodingStats),
      },
      {
        path: 'tracker',
        element: withSuspense(TimeTracker),
      },
      {
        path: 'projects',
        element: withSuspense(Projects),
      },
      {
        path: 'leaderboard',
        element: withSuspense(Leaderboard),
        children: [
          {
            index: true,
            element: withSuspense(GlobalRanking),
          },
          {
            path: 'friends',
            element: withSuspense(FriendsRanking),
          },
        ],
      },
      {
        path: 'settings',
        element: withSuspense(Settings),
        children: [
          {
            index: true,
            element: withSuspense(Profile),
          },
          {
            path: 'preferences',
            element: withSuspense(Preferences),
          },
          {
            path: 'notifications',
            element: withSuspense(Notifications),
          },
        ],
      },
      {
        path: 'cat',
        element: withSuspense(CatCompanion),
      },
    ],
  },
  {
    path: '*',
    element: withSuspense(NotFound),
  },
];
