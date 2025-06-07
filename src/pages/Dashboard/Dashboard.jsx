import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { useState } from 'react';

const Dashboard = () => {
  const { userData, updateUserData, resetOnboarding } = useAppContext();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");
  const showFeedback = (msg = "Team updated!") => {
    setFeedback(msg);
    setTimeout(() => setFeedback(""), 2000);
  };

  useEffect(() => {
    // Redirect to onboarding if not completed
    if (!userData.isOnboarded) {
      navigate('/onboarding');
    }
  }, [userData.isOnboarded, navigate]);

  // Sample data for the chart
  const weeklyData = [
    { name: 'Mon', active: 12, completed: 8 },
    { name: 'Tue', active: 15, completed: 10 },
    { name: 'Wed', active: 8, completed: 12 },
    { name: 'Thu', active: 10, completed: 5 },
    { name: 'Fri', active: 14, completed: 9 },
    { name: 'Sat', active: 5, completed: 3 },
    { name: 'Sun', active: 2, completed: 1 },
  ];

  const handleResetOnboarding = () => {
    if (window.confirm('Are you sure you want to reset your onboarding? This will clear your current settings.')) {
      resetOnboarding();
      navigate('/onboarding');
    }
  };

  if (!userData.isOnboarded) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Welcome, {userData.personalInfo.name}!
            </span>
            <button
              onClick={handleResetOnboarding}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Reset Onboarding
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {/* Team Members Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Team Members</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">24</div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <span>+12%</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Active Projects Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Projects</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">8</div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <span>+2</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Notifications</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">3</div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <span className="text-yellow-600">New</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Weekly Activity</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="active" fill="#3B82F6" name="Active Projects" />
                <Bar dataKey="completed" fill="#10B981" name="Completed Tasks" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Info Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Your Profile</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-2">Personal Information</h3>
              <dl className="space-y-2">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Full name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userData.personalInfo.name}
                  </dd>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Email address</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userData.personalInfo.email}
                  </dd>
                </div>
              </dl>
            </div>
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-2">Business Information</h3>
              <dl className="space-y-2">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Company</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userData.businessInfo.companyName}
                  </dd>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Industry</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userData.businessInfo.industry}
                  </dd>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Company Size</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userData.businessInfo.size}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-md font-medium text-gray-900 mb-2">Preferences</h3>
            <dl className="space-y-2">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Theme</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                  {userData.preferences.theme}
                </dd>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Dashboard Layout</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                  {userData.preferences.layout}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        {/* Team Management Section */}
        <div className="bg-white shadow rounded-lg p-6 mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Team Management</h2>
          <p className="text-xs text-gray-500 mb-4">Manage your company users below.</p>

          {/* Export CSV Button */}
          <button
            className="mb-4 px-4 py-2 bg-green-100 text-green-600 rounded hover:bg-green-200"
            onClick={() => {
              const users = userData.businessInfo.users || [];
              const csvRows = [
                ["Name", "Email"],
                ...users.map(u => [u.name, u.email])
              ];
              const csvContent = csvRows.map(row => row.map(cell => `"${cell || ''}"`).join(",")).join("\n");
              const blob = new Blob([csvContent], { type: 'text/csv' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'team_members.csv';
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            Export CSV
          </button>

          {/* Team Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {(userData.businessInfo.users || []).map((user, idx) => {
                  // Validation logic
                  const errors = {};
                  if (!user.name || user.name.trim() === '') errors.name = 'Name is required.';
                  if (!user.email || user.email.trim() === '') errors.email = 'Email is required.';
                  else if (!/^\S+@\S+\.\S+$/.test(user.email)) errors.email = 'Invalid email.';
                  const duplicateEmail = (userData.businessInfo.users || []).some((u, i) => i !== idx && u.email === user.email && user.email);
                  if (duplicateEmail) errors.email = 'Duplicate email.';
                  return (
                    <tr key={idx}>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          className={`w-full px-2 py-1 rounded border ${errors.name ? 'border-red-400' : 'border-gray-300'}`}
                          value={user.name || ''}
                          placeholder="Name"
                          onChange={e => {
                            const newUsers = [...userData.businessInfo.users];
                            newUsers[idx] = { ...newUsers[idx], name: e.target.value };
                            userData.updateUserData({ businessInfo: { ...userData.businessInfo, users: newUsers } });
                            setShowFeedbackFor('edit');
                          }}
                        />
                        {errors.name && <div className="text-xs text-red-500 mt-1">{errors.name}</div>}
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="email"
                          className={`w-full px-2 py-1 rounded border ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
                          value={user.email || ''}
                          placeholder="Email"
                          onChange={e => {
                            const newUsers = [...userData.businessInfo.users];
                            newUsers[idx] = { ...newUsers[idx], email: e.target.value };
                            userData.updateUserData({ businessInfo: { ...userData.businessInfo, users: newUsers } });
                            setShowFeedbackFor('edit');
                          }}
                        />
                        {errors.email && <div className="text-xs text-red-500 mt-1">{errors.email}</div>}
                      </td>
                      <td className="px-4 py-2">
                        <select
                          className="w-full px-2 py-1 rounded border border-gray-300"
                          value={user.role || ''}
                          onChange={e => {
                            const newUsers = [...userData.businessInfo.users];
                            newUsers[idx] = { ...newUsers[idx], role: e.target.value };
                            userData.updateUserData({ businessInfo: { ...userData.businessInfo, users: newUsers } });
                            setShowFeedbackFor('edit');
                          }}
                        >
                          <option value="">Select Role</option>
                          <option value="Admin">Admin</option>
                          <option value="Manager">Manager</option>
                          <option value="Member">Member</option>
                        </select>
                      </td>
                      <td className="px-4 py-2 text-right">
                        {(userData.businessInfo.users.length > 1) && (
                          <button
                            className="px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                            onClick={() => {
                              if (window.confirm('Are you sure you want to remove this user?')) {
                                const newUsers = [...userData.businessInfo.users];
                                newUsers.splice(idx, 1);
                                userData.updateUserData({ businessInfo: { ...userData.businessInfo, users: newUsers } });
                                showFeedback();
                              }
                            }}
                            aria-label="Remove user"
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>


          {/* Feedback Message */}
          {feedback && (
            <div className="mt-2 text-green-600 text-sm transition-opacity duration-500">
              {feedback}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
