// components/dashboard/DashboardContent.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';

export default function DashboardContent() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to your Dashboard
          </h1>
          <p className="text-gray-600">
            Hello {user?.name || user?.email}! You're successfully authenticated.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Info Card */}
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              User Information
            </h3>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium text-blue-700">Name:</span>{' '}
                <span className="text-blue-600">{user?.name || 'N/A'}</span>
              </p>
              {user?.yog && (
                <p className="text-sm">
                    <span className="font-medium text-blue-700">Graduation Year:</span>{' '}
                    <span className="text-blue-600">{user.yog}</span>
                </p>
                )}
              <p className="text-sm">
                <span className="font-medium text-blue-700">Email:</span>{' '}
                <span className="text-blue-600">{user?.email}</span>
              </p>
              <p className="text-sm">
                <span className="font-medium text-blue-700">ID:</span>{' '}
                <span className="text-blue-600">{user?.id}</span>
              </p>
              {user?.role && (
                <p className="text-sm">
                  <span className="font-medium text-blue-700">Role:</span>{' '}
                  <span className="text-blue-600 capitalize">{user.role}</span>
                </p>
              )}
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-900 mb-3">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full text-left px-3 py-2 text-sm text-green-700 hover:bg-green-100 rounded-md transition duration-200">
                Update Profile
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-green-700 hover:bg-green-100 rounded-md transition duration-200">
                Change Password
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-green-700 hover:bg-green-100 rounded-md transition duration-200">
                Account Settings
              </button>
            </div>
          </div>

          {/* Statistics Card */}
          <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-900 mb-3">
              Statistics
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-purple-700">Sessions</span>
                <span className="text-sm font-medium text-purple-600">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-purple-700">Last Login</span>
                <span className="text-sm font-medium text-purple-600">Today</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-purple-700">Status</span>
                <span className="text-sm font-medium text-green-600">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Successfully signed in</span>
                <span className="text-gray-400">just now</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Account created</span>
                <span className="text-gray-400">recently</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}