import { Edit, FileText, Mail, Phone, MapPin, Calendar, User, AlertCircle } from 'lucide-react';
import { useToastHelpers } from '../../hooks/useToast';
import { ConfirmationModal } from '../../components/ui/ConfirmationModal';

export default function TraineeDetails() {
  const { success } = useToastHelpers();

  // Mock data - in real app this would come from API
  const traineeDetails = {
    firstName: 'John',
    lastName: 'Doe',
    nic: '199512345678',
    dateOfBirth: '1995-05-15',
    gender: 'Male',
    address: '123 Main Street, Colombo 05, Sri Lanka',
    phone: '+94 77 123 4567',
    email: 'john.doe@email.com',
    emergencyContact: {
      name: 'Jane Doe',
      phone: '+94 77 987 6543',
      relation: 'Sister'
    },
    joinDate: '2024-01-15',
    trainingProgram: 'Software Development',
    batchNumber: 'SD-2024-01',
    status: 'Active'
  };

  const handleEditRequest = async () => {
    const confirmed = await ConfirmationModal.show({
      title: 'Request Profile Edit',
      message: 'Are you sure you want to request an edit to your profile? An admin will review and approve any changes.',
      confirmText: 'Submit Request',
      cancelText: 'Cancel'
    });

    if (confirmed) {
      // In real app, this would send a request to admin
      success('Edit request submitted successfully! Admin will review and approve changes.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {traineeDetails.firstName} {traineeDetails.lastName}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {traineeDetails.trainingProgram} - Batch {traineeDetails.batchNumber}
          </p>
        </div>
        <button
          onClick={handleEditRequest}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Edit className="h-4 w-4 mr-2" />
          Request Edit
        </button>
      </div>

      {/* Status Card */}
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <div className="flex items-center">
          <div className="h-3 w-3 bg-green-500 rounded-full mr-3"></div>
          <span className="text-green-800 dark:text-green-200 font-medium">
            Training Status: {traineeDetails.status}
          </span>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <User className="h-5 w-5 mr-2" />
            Personal Information
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                Full Name
              </label>
              <p className="mt-1 text-gray-900 dark:text-white">
                {traineeDetails.firstName} {traineeDetails.lastName}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                NIC Number
              </label>
              <p className="mt-1 text-gray-900 dark:text-white">
                {traineeDetails.nic}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                Date of Birth
              </label>
              <p className="mt-1 text-gray-900 dark:text-white flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                {new Date(traineeDetails.dateOfBirth).toLocaleDateString()}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                Gender
              </label>
              <p className="mt-1 text-gray-900 dark:text-white">
                {traineeDetails.gender}
              </p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                Address
              </label>
              <p className="mt-1 text-gray-900 dark:text-white flex items-start">
                <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-1 flex-shrink-0" />
                {traineeDetails.address}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <Phone className="h-5 w-5 mr-2" />
            Contact Information
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                Phone Number
              </label>
              <p className="mt-1 text-gray-900 dark:text-white flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                {traineeDetails.phone}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                Email Address
              </label>
              <p className="mt-1 text-gray-900 dark:text-white flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                {traineeDetails.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            Emergency Contact
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                Contact Name
              </label>
              <p className="mt-1 text-gray-900 dark:text-white">
                {traineeDetails.emergencyContact.name}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                Phone Number
              </label>
              <p className="mt-1 text-gray-900 dark:text-white flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                {traineeDetails.emergencyContact.phone}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                Relationship
              </label>
              <p className="mt-1 text-gray-900 dark:text-white">
                {traineeDetails.emergencyContact.relation}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Training Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Training Information
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                Training Program
              </label>
              <p className="mt-1 text-gray-900 dark:text-white">
                {traineeDetails.trainingProgram}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                Batch Number
              </label>
              <p className="mt-1 text-gray-900 dark:text-white">
                {traineeDetails.batchNumber}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                Join Date
              </label>
              <p className="mt-1 text-gray-900 dark:text-white flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                {new Date(traineeDetails.joinDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                Current Status
              </label>
              <p className="mt-1 text-green-600 dark:text-green-400 font-medium">
                {traineeDetails.status}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}