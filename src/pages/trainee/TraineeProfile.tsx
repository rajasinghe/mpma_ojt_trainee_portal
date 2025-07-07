import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Camera, Save, Eye, EyeOff, User, Lock, Bell, Globe, CreditCard, Building, Hash } from 'lucide-react';
import { ValidatedInput, ValidatedTextarea, ValidatedSelect } from '../../components/ui/FormField';
import { useFormValidation } from '../../hooks/useFormValidation';
import { useToastHelpers } from '../../hooks/useToast';
import { ConfirmationModal } from '../../components/ui/ConfirmationModal';
import { 
  profileUpdateSchema, 
  bankDetailsSchema, 
  passwordChangeSchema,
  type ProfileUpdateFormData,
  type BankDetailsFormData,
  type PasswordChangeFormData
} from '../../lib/validations';

export default function TraineeProfile() {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { success, warning } = useToastHelpers();

  const [profileData, setProfileData] = useState<ProfileUpdateFormData>({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+94 77 123 4567',
    bio: 'Software development trainee passionate about learning new technologies.'
  });

  const [bankDetails, setBankDetails] = useState<BankDetailsFormData>({
    accountNo: '',
    branch: '',
    branchCode: '',
    accountHolderName: user?.name || '',
    bankName: 'Bank of Ceylon (BOC)'
  });

  const [passwordData, setPasswordData] = useState<PasswordChangeFormData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true
  });

  // Form validation hooks
  const profileValidation = useFormValidation({
    schema: profileUpdateSchema,
    onSubmit: async (data: ProfileUpdateFormData) => {
      const confirmed = await ConfirmationModal.show({
        title: 'Update Profile',
        message: 'Are you sure you want to update your profile information?',
        confirmText: 'Update Profile',
        cancelText: 'Cancel'
      });

      if (confirmed) {
        updateUser({ name: data.name, email: data.email });
        success('Profile updated successfully!');
      }
    }
  });

  const bankValidation = useFormValidation({
    schema: bankDetailsSchema,
    onSubmit: async (data: BankDetailsFormData) => {
      const confirmed = await ConfirmationModal.show({
        title: 'Save Bank Details',
        message: 'Are you sure you want to save these bank details? This information will be used for payment processing.',
        confirmText: 'Save Details',
        cancelText: 'Cancel'
      });

      if (confirmed) {
        success('Bank details saved successfully! Your payment information has been updated.');
      }
    }
  });

  const passwordValidation = useFormValidation({
    schema: passwordChangeSchema,
    onSubmit: async (data: PasswordChangeFormData) => {
      const confirmed = await ConfirmationModal.showWarning({
        title: 'Change Password',
        message: 'Are you sure you want to change your password? You will need to use the new password for future logins.',
        confirmText: 'Change Password',
        cancelText: 'Cancel'
      });

      if (confirmed) {
        success('Password changed successfully!');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      }
    }
  });

  const handleNotificationSave = async () => {
    const confirmed = await ConfirmationModal.show({
      title: 'Save Notification Preferences',
      message: 'Are you sure you want to save these notification preferences?',
      confirmText: 'Save Preferences',
      cancelText: 'Cancel'
    });

    if (confirmed) {
      success('Notification preferences saved successfully!');
    }
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    
    if (key === 'emailNotifications' && !value) {
      warning('Email notifications disabled. You may miss important updates.');
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'banking', name: 'Bank Details', icon: CreditCard },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'preferences', name: 'Preferences', icon: Globe }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-2xl text-white font-bold">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <button className="absolute bottom-0 right-0 bg-gray-600 text-white p-1 rounded-full hover:bg-gray-700">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {user?.name}
            </h1>
            <p className="text-gray-600">Trainee</p>
            <p className="text-sm text-gray-500">
              Member since {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <form onSubmit={(e) => { e.preventDefault(); profileValidation.handleSubmit(profileData); }} className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">
                Profile Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ValidatedInput
                  label="Full Name"
                  type="text"
                  required
                  value={profileData.name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  error={profileValidation.getFieldError('name')}
                />
                <ValidatedInput
                  label="Email Address"
                  type="email"
                  required
                  value={profileData.email}
                  onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  error={profileValidation.getFieldError('email')}
                />
                <ValidatedInput
                  label="Phone Number"
                  type="tel"
                  required
                  value={profileData.phone}
                  onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  error={profileValidation.getFieldError('phone')}
                  placeholder="+94 77 123 4567"
                />
              </div>
              <ValidatedTextarea
                label="Bio"
                rows={3}
                value={profileData.bio}
                onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                error={profileValidation.getFieldError('bio')}
                placeholder="Tell us about yourself..."
              />
              <button
                type="submit"
                disabled={profileValidation.isSubmitting}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <Save className="h-4 w-4 mr-2" />
                {profileValidation.isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          )}

          {/* Bank Details Tab */}
          {activeTab === 'banking' && (
            <form onSubmit={(e) => { e.preventDefault(); bankValidation.handleSubmit(bankDetails); }} className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-green-100 rounded-lg">
                  <CreditCard className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Bank Account Details
                  </h3>
                  <p className="text-sm text-gray-600">
                    Add your bank details to receive daily training payments
                  </p>
                </div>
              </div>

              {/* Important Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Building className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Important Information</h4>
                    <p className="text-sm text-blue-800 mt-1">
                      Your bank details are used for daily payment transfers (Rs. 500/day). 
                      Please ensure all information is accurate to avoid payment delays.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ValidatedInput
                  label="Account Holder Name"
                  type="text"
                  required
                  value={bankDetails.accountHolderName}
                  onChange={(e) => setBankDetails(prev => ({ ...prev, accountHolderName: e.target.value }))}
                  error={bankValidation.getFieldError('accountHolderName')}
                  placeholder="Enter account holder name"
                />
                <ValidatedSelect
                  label="Bank Name"
                  required
                  value={bankDetails.bankName}
                  disabled
                  options={[{ value: 'Bank of Ceylon', label: 'Bank of Ceylon (BOC)' }]}
                />
                <ValidatedInput
                  label="Account Number"
                  type="text"
                  required
                  icon={Hash}
                  value={bankDetails.accountNo}
                  onChange={(e) => setBankDetails(prev => ({ ...prev, accountNo: e.target.value.replace(/\D/g, '') }))}
                  error={bankValidation.getFieldError('accountNo')}
                  placeholder="Enter account number"
                  maxLength={20}
                />
                  <ValidatedInput
                    label="Branch Code"
                    type="text"
                    required
                    icon={Hash}
                    value={bankDetails.branchCode}
                    onChange={(e) => setBankDetails(prev => ({ ...prev, branchCode: e.target.value.toUpperCase() }))}
                    error={bankValidation.getFieldError('branchCode')}
                    placeholder="Enter branch code"
                    maxLength={10}
                  />
              </div>

              {/* Security Notice */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Lock className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-900">Security & Privacy</h4>
                    <p className="text-sm text-yellow-800 mt-1">
                      Your bank details are encrypted and stored securely. We only use this information 
                      for payment processing and will never share it with third parties.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <div className="text-sm text-gray-600">
                  <p>* Required fields</p>
                </div>
                <button
                  type="submit"
                  disabled={bankValidation.isSubmitting}
                  className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {bankValidation.isSubmitting ? 'Saving...' : 'Save Bank Details'}
                </button>
              </div>
            </form>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <form onSubmit={(e) => { e.preventDefault(); passwordValidation.handleSubmit(passwordData); }} className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">
                Change Password
              </h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Current Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      required
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className={`block w-full px-4 py-3 pr-10 rounded-lg shadow-sm border transition-all duration-300 hover:border-gray-400 focus:shadow-lg focus:outline-none ${
                        passwordValidation.getFieldError('currentPassword')
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                      } bg-white text-gray-900`}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {passwordValidation.getFieldError('currentPassword') && (
                    <p className="text-sm text-red-600 font-medium">{passwordValidation.getFieldError('currentPassword')}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    New Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      required
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                      className={`block w-full px-4 py-3 pr-10 rounded-lg shadow-sm border transition-all duration-300 hover:border-gray-400 focus:shadow-lg focus:outline-none ${
                        passwordValidation.getFieldError('newPassword')
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                      } bg-white text-gray-900`}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {passwordValidation.getFieldError('newPassword') && (
                    <p className="text-sm text-red-600 font-medium">{passwordValidation.getFieldError('newPassword')}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm New Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className={`block w-full px-4 py-3 pr-10 rounded-lg shadow-sm border transition-all duration-300 hover:border-gray-400 focus:shadow-lg focus:outline-none ${
                        passwordValidation.getFieldError('confirmPassword')
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                      } bg-white text-gray-900`}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {passwordValidation.getFieldError('confirmPassword') && (
                    <p className="text-sm text-red-600 font-medium">{passwordValidation.getFieldError('confirmPassword')}</p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                disabled={passwordValidation.isSubmitting}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <Save className="h-4 w-4 mr-2" />
                {passwordValidation.isSubmitting ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">
                Notification Preferences
              </h3>
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {key === 'emailNotifications' && 'Receive notifications via email'}
                        {key === 'pushNotifications' && 'Receive push notifications in browser'}
                        {key === 'weeklyReports' && 'Receive weekly progress reports'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange(key, !value)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        value ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={handleNotificationSave}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Preferences
              </button>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">
                Application Preferences
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      Language
                    </h4>
                    <p className="text-sm text-gray-500">
                      Select your preferred language
                    </p>
                  </div>
                  <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900">
                    <option value="en">English</option>
                    <option value="si">Sinhala</option>
                    <option value="ta">Tamil</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}