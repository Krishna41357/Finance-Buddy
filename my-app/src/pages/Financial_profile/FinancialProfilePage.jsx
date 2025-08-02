import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { User, Target, Edit3, Check, X, Loader, AlertCircle } from 'lucide-react';

const FinancialProfilePage = ({ username }) => {
  const { user, isLoading: authLoading } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);
  const [hasProfileData, setHasProfileData] = useState(false);

  const userId = user?._id || user?.userId;
  const email = user?.Email || 'No email';

  const ageGroups = ['18-25', '26-35', '36-45', '46-55', '56-65', '65+'];
  const riskTolerances = ['Low', 'Medium', 'High'];
  const financialGoalsList = [
    'Emergency Fund', 'Retirement Planning', 'Home Buying',
    'Education', 'Debt Payoff', 'Wealth Building'
  ];
  const BASE_API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

  // Fetch profile from API
  const fetchProfile = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${BASE_API}/api/v1/user/portfolio/${userId}`);
      const fetchedProfile = response.data?.profile;
      
      if (fetchedProfile && Object.keys(fetchedProfile).length > 0) {
        // Profile exists with data - show in view mode first
        setProfile(fetchedProfile);
        setFormData(fetchedProfile);
        setProfileCompletion(response.data.profileCompletion || 0);
        setHasProfileData(true);
        setEditMode(false);
      } else {
        // No profile data exists - start in edit mode
        setProfile(null);
        setFormData({
          ageGroup: '',
          monthlyExpenses: '',
          riskTolerance: '',
          financialGoals: []
        });
        setProfileCompletion(0);
        setHasProfileData(false);
        setEditMode(true);
      }
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      setError('Failed to load profile data. Please try again.');
      // If API fails, start in edit mode to allow creating profile
      setEditMode(true);
      setHasProfileData(false);
      setFormData({
        ageGroup: '',
        monthlyExpenses: '',
        riskTolerance: '',
        financialGoals: []
      });
    } finally {
      setLoading(false);
    }
  };

  // Initial profile fetch when component mounts
  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoalToggle = (goal) => {
    const currentGoals = formData.financialGoals || [];
    const updatedGoals = currentGoals.includes(goal)
      ? currentGoals.filter(g => g !== goal)
      : [...currentGoals, goal];
    setFormData({ ...formData, financialGoals: updatedGoals });
  };

  const handleSave = async () => {
    if (!userId) return;

    try {
      setSubmitting(true);
      setError(null);
      
      const response = await axios.patch(
        `${BASE_API}/api/v1/user/portfolio/${userId}`,
        formData
      );

      const updatedData = response.data;
      setProfile(updatedData.profile);
      setProfileCompletion(updatedData.profileCompletion || 0);
      setHasProfileData(true);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to save profile. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (hasProfileData) {
      // Reset to original profile data
      setFormData(profile);
      setEditMode(false);
    } else {
      // Reset to empty form but stay in edit mode since no profile exists
      setFormData({
        ageGroup: '',
        monthlyExpenses: '',
        riskTolerance: '',
        financialGoals: []
      });
    }
    setError(null);
  };

  const handleEdit = () => {
    setEditMode(true);
    setError(null);
  };

  const handleRetry = () => {
    fetchProfile();
  };

  // Loading state
  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950">
        <div className="bg-white/10 p-6 rounded-xl border border-emerald-400 text-white shadow-xl">
          <Loader className="animate-spin mx-auto" size={32} />
          <p className="text-center mt-2">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 p-4 md:p-8 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-emerald-300">Your Financial Profile</h1>
          <p className="text-emerald-200 mt-2">
            {hasProfileData ? 'Manage your financial preferences' : 'Create your financial profile to get started'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-500/20 border border-red-500 text-red-100 p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
            <button
              onClick={handleRetry}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
            >
              Retry
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-emerald-500 shadow-emerald-500/30 hover:shadow-emerald-400/50 transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <h2 className="flex items-center gap-2 text-2xl font-semibold text-emerald-200">
                  <User /> Basic Information
                </h2>
                {!editMode && hasProfileData && (
                  <button
                    onClick={handleEdit}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md shadow flex items-center gap-2"
                  >
                    <Edit3 size={18} /> Edit Profile
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Age Group */}
                <div>
                  <label className="text-emerald-300 block mb-1">Age Group</label>
                  {editMode ? (
                    <select
                      name="ageGroup"
                      value={formData.ageGroup || ''}
                      onChange={handleInputChange}
                      className="w-full bg-emerald-950 text-white p-2 rounded border border-emerald-500 focus:border-emerald-400 focus:outline-none"
                    >
                      <option value="">Select Age Group</option>
                      {ageGroups.map(age => (
                        <option key={age} value={age}>{age} years</option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-white/90 bg-emerald-950/50 p-2 rounded">
                      {profile?.ageGroup ? `${profile.ageGroup} years` : 'Not specified'}
                    </p>
                  )}
                </div>

                {/* Monthly Expenses */}
                <div>
                  <label className="text-emerald-300 block mb-1">Monthly Expenses (₹)</label>
                  {editMode ? (
                    <input
                      type="number"
                      name="monthlyExpenses"
                      value={formData.monthlyExpenses || ''}
                      onChange={handleInputChange}
                      placeholder="Enter monthly expenses"
                      className="w-full bg-emerald-950 text-white p-2 rounded border border-emerald-500 focus:border-emerald-400 focus:outline-none"
                    />
                  ) : (
                    <p className="text-white/90 bg-emerald-950/50 p-2 rounded">
                      {profile?.monthlyExpenses ? `₹${profile.monthlyExpenses.toLocaleString()}` : 'Not specified'}
                    </p>
                  )}
                </div>

                {/* Risk Tolerance */}
                <div className="md:col-span-2">
                  <label className="text-emerald-300 block mb-1">Risk Tolerance</label>
                  {editMode ? (
                    <select
                      name="riskTolerance"
                      value={formData.riskTolerance || ''}
                      onChange={handleInputChange}
                      className="w-full bg-emerald-950 text-white p-2 rounded border border-emerald-500 focus:border-emerald-400 focus:outline-none"
                    >
                      <option value="">Select Risk Tolerance</option>
                      {riskTolerances.map(risk => (
                        <option key={risk} value={risk}>{risk}</option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-white/90 bg-emerald-950/50 p-2 rounded">
                      {profile?.riskTolerance || 'Not specified'}
                    </p>
                  )}
                </div>
              </div>

              {editMode && (
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handleSave}
                    disabled={submitting}
                    className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-6 py-2 rounded flex items-center gap-2"
                  >
                    {submitting ? <Loader size={16} className="animate-spin" /> : <Check size={16} />}
                    {submitting ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={submitting}
                    className="bg-gray-500 hover:bg-gray-600 disabled:opacity-50 text-white px-6 py-2 rounded flex items-center gap-2"
                  >
                    <X size={16} /> Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Financial Goals */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-emerald-500 shadow-emerald-500/30 hover:shadow-emerald-400/50 transition-all duration-300">
              <h2 className="text-2xl font-semibold text-emerald-200 flex items-center gap-2 mb-4">
                <Target /> Financial Goals
              </h2>
              
              {editMode ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {financialGoalsList.map(goal => (
                    <label
                      key={goal}
                      className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-all duration-200 ${
                        (formData.financialGoals || []).includes(goal)
                          ? 'bg-emerald-700/30 shadow-md shadow-emerald-500/40'
                          : 'hover:bg-white/10 bg-emerald-950/30'
                      }`}
                    >
                      <span className="text-white/90">{goal}</span>
                      <input
                        type="checkbox"
                        checked={(formData.financialGoals || []).includes(goal)}
                        onChange={() => handleGoalToggle(goal)}
                        className="w-5 h-5 accent-emerald-500 rounded"
                      />
                    </label>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {financialGoalsList.map(goal => (
                    <div
                      key={goal}
                      className={`flex items-center justify-between px-3 py-2 rounded-md transition-all duration-200 ${
                        (profile?.financialGoals || []).includes(goal)
                          ? 'bg-emerald-700/30 shadow-md shadow-emerald-500/40'
                          : 'bg-emerald-950/30 opacity-50'
                      }`}
                    >
                      <span className="text-white/90">{goal}</span>
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        (profile?.financialGoals || []).includes(goal)
                          ? 'border-emerald-400 bg-emerald-500'
                          : 'border-gray-400'
                      }`}>
                        {(profile?.financialGoals || []).includes(goal) && (
                          <Check size={12} className="text-white" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-emerald-500 shadow-emerald-500/30 h-fit sticky top-8">
            <h3 className="text-2xl font-semibold text-emerald-200 mb-6">Profile Summary</h3>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-emerald-500 w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg">
                {username?.[0]?.toUpperCase() || 'U'}
              </div>
              <div>
                <p className="font-semibold">{username || 'User'}</p>
                <p className="text-white/70 text-sm">{email}</p>
              </div>
            </div>

            {/* Profile Completion Bar */}
            <div className="mb-6">
              <p className="text-sm text-white/80 mb-2">Profile Completion</p>
              <div className="w-full bg-emerald-900 rounded-full h-3 relative overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 h-3 rounded-full shadow-[0_0_10px_#10b981] transition-all duration-300"
                  style={{ width: `${profileCompletion}%` }}
                />
              </div>
              <p className="text-right mt-1 text-white/80 text-sm">{profileCompletion}%</p>
            </div>

            {/* Profile Details */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-white/80 font-medium">Age Group:</span>
                <span className="text-white/90">{profile?.ageGroup || 'Not set'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80 font-medium">Risk Tolerance:</span>
                <span className="text-white/90">{profile?.riskTolerance || 'Not set'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80 font-medium">Monthly Expenses:</span>
                <span className="text-white/90">
                  {profile?.monthlyExpenses ? `₹${profile.monthlyExpenses.toLocaleString()}` : 'Not set'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80 font-medium">Goals Set:</span>
                <span className="text-white/90">{profile?.financialGoals?.length || 0}</span>
              </div>
            </div>

            {/* Quick Actions */}
            {!hasProfileData && !editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
              >
                <Edit3 size={16} />
                Create Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialProfilePage;