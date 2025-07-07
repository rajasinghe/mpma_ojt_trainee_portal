import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ChevronLeft, ChevronRight, Upload, FileText, Check, User, Phone, CreditCard, Sparkles, Star, Award, Camera, X, FileImage } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';
import { useToastHelpers } from '../../hooks/useToast';

interface FormData {
  // Step 1: Personal Details
  profilePhoto: File | null;
  name: string;
  fullname: string;
  nicNo: string;
  address: string;
  trainingInstitute: string;
  course: string;
  
  // Step 2: Contact Info
  mobileNo: string;
  residenceNo: string;
  email: string;
  emergencyContactName: string;
  emergencyContactTelephone: string;
  
  // Step 3: Documents
  documents: File[];
  
  // Step 4: Initial Payment
  paymentMethod: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}

const initialFormData: FormData = {
  profilePhoto: null,
  name: '',
  fullname: '',
  nicNo: '',
  address: '',
  trainingInstitute: '',
  course: '',
  mobileNo: '',
  residenceNo: '',
  email: '',
  emergencyContactName: '',
  emergencyContactTelephone: '',
  documents: [],
  paymentMethod: 'card',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  cardName: ''
};

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const { updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const { success, error, warning } = useToastHelpers();

  const steps = [
    { 
      id: 1, 
      name: 'Personal Details', 
      description: 'Your basic information and photo',
      icon: User,
      color: 'from-blue-500 to-purple-600'
    },
    { 
      id: 2, 
      name: 'Contact Information', 
      description: 'How can we reach you?',
      icon: Phone,
      color: 'from-purple-500 to-pink-600'
    },
    { 
      id: 3, 
      name: 'Documents', 
      description: 'Upload required documents',
      icon: FileImage,
      color: 'from-pink-500 to-orange-600'
    },
    { 
      id: 4, 
      name: 'Initial Payment', 
      description: 'Secure your spot with Rs. 1,000',
      icon: CreditCard,
      color: 'from-orange-500 to-red-600'
    }
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files).filter(file => 
        file.type === 'application/pdf' || 
        file.type.startsWith('image/')
      );
      
      if (newFiles.length !== files.length) {
        warning('Some files were skipped. Only PDF and image files are allowed.');
      }
      
      setFormData(prev => ({ 
        ...prev, 
        documents: [...prev.documents, ...newFiles] 
      }));
      
      if (newFiles.length > 0) {
        success(`${newFiles.length} file(s) uploaded successfully`);
      }
    }
  };

  const handlePhotoUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setFormData(prev => ({ ...prev, profilePhoto: file }));
      success('Profile photo uploaded successfully');
    } else {
      error('Please select a valid image file');
    }
  };

  const removeDocument = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
    success('Document removed');
  };

  const removePhoto = () => {
    setFormData(prev => ({ ...prev, profilePhoto: null }));
    success('Profile photo removed');
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFileUpload(e.dataTransfer.files);
  };

  // Pure validation function without side effects
  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.profilePhoto && formData.name && formData.fullname && 
                 formData.nicNo && formData.address && formData.trainingInstitute && formData.course);
      case 2:
        return !!(formData.mobileNo && formData.residenceNo && formData.email && 
                 formData.emergencyContactName && formData.emergencyContactTelephone);
      case 3:
        return formData.documents.length >= 3;
      case 4:
        return !!(formData.cardNumber && formData.expiryDate && formData.cvv && formData.cardName);
      default:
        return false;
    }
  };

  // Validation function with error messages for user actions
  const validateStepWithFeedback = (step: number): boolean => {
    const isValid = isStepValid(step);
    
    if (!isValid) {
      switch (step) {
        case 1:
          error('Please complete all required fields in Personal Details');
          break;
        case 2:
          error('Please complete all required fields in Contact Information');
          break;
        case 3:
          error('Please upload at least 3 required documents');
          break;
        case 4:
          error('Please complete all payment information');
          break;
      }
    }
    
    return isValid;
  };

  const nextStep = () => {
    if (validateStepWithFeedback(currentStep) && currentStep < 4) {
      setCurrentStep(currentStep + 1);
      // COMMENTED OUT FOR DEBUGGING: success(`Step ${currentStep} completed successfully!`);
      console.log(`Step ${currentStep} completed successfully!`); // Debug log instead
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      // Log out the user and go back to login page
      logout();
      navigate('/login');
    }
  };

  const handleSubmit = async () => {
    if (!validateStepWithFeedback(4)) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Update user onboarding status
      updateUser({ hasCompletedOnboarding: true });
      
      success('Onboarding completed successfully! Welcome to OJT Portal!');
      
      // Navigate to trainee dashboard
      navigate('/trainee');
    } catch (err) {
      error('Payment processing failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 shadow-lg">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Welcome to Your Journey!
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Let's get you set up for an amazing On-the-Job Training experience. This will only take a few minutes.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep >= step.id;
              const isCurrent = currentStep === step.id;
              
              return (
                <div key={step.id} className="flex flex-col items-center flex-1">
                  <div className="relative">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
                        isActive
                          ? `bg-gradient-to-r ${step.color} border-transparent text-white shadow-lg`
                          : 'border-gray-300 bg-white text-gray-400'
                      } ${isCurrent ? 'scale-110 shadow-xl' : ''}`}
                    >
                      {currentStep > step.id ? (
                        <Check className="w-8 h-8" />
                      ) : (
                        <Icon className="w-8 h-8" />
                      )}
                    </div>
                    {isCurrent && (
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20 animate-pulse" />
                    )}
                  </div>
                  <div className="mt-4 text-center">
                    <div className={`text-sm font-semibold ${
                      isActive ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {step.description}
                    </div>
                  </div>
                  {/*index < steps.length - 1 && (
                    <div className={`hidden sm:block absolute top-8 left-1/2 w-full h-1 transform -translate-y-1/2 ${
                      currentStep > step.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                        : 'bg-gray-300'
                    }`} style={{ left: '50%', width: 'calc(100% - 4rem)' }} />
                  )*/}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <Card className="max-w-2xl mx-auto bg-white shadow-xl border border-gray-200">
          <CardContent className="p-8">
            {/* Step 1: Personal Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Personal Details</h3>
                  <p className="text-gray-600">Tell us about yourself and upload your photo</p>
                </div>

                {/* Profile Photo Upload */}
                <div className="text-center mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Photo *
                  </label>
                  <div className="flex justify-center">
                    <div className="relative">
                      {formData.profilePhoto ? (
                        <div className="relative">
                          <img
                            src={URL.createObjectURL(formData.profilePhoto)}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
                          />
                          <button
                            onClick={removePhoto}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer">
                          <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-blue-500 transition-colors">
                            <Camera className="h-8 w-8 text-gray-400" />
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => e.target.files?.[0] && handlePhotoUpload(e.target.files[0])}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Name *"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                  <Input
                    label="Full Name *"
                    value={formData.fullname}
                    onChange={(e) => handleInputChange('fullname', e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                  <Input
                    label="NIC No *"
                    value={formData.nicNo}
                    onChange={(e) => handleInputChange('nicNo', e.target.value)}
                    placeholder="Enter your NIC number"
                    required
                  />
                  <Input
                    label="Training Institute *"
                    value={formData.trainingInstitute}
                    onChange={(e) => handleInputChange('trainingInstitute', e.target.value)}
                    placeholder="Enter training institute"
                    required
                  />
                  <Input
                    label="Course *"
                    value={formData.course}
                    onChange={(e) => handleInputChange('course', e.target.value)}
                    placeholder="Enter course name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={3}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    placeholder="Enter your full address"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 2: Contact Info */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Contact Information</h3>
                  <p className="text-gray-600">How can we reach you and your emergency contact?</p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Numbers</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Mobile No *"
                        type="tel"
                        value={formData.mobileNo}
                        onChange={(e) => handleInputChange('mobileNo', e.target.value)}
                        placeholder="+94 77 123 4567"
                        required
                      />
                      <Input
                        label="Residence No *"
                        type="tel"
                        value={formData.residenceNo}
                        onChange={(e) => handleInputChange('residenceNo', e.target.value)}
                        placeholder="+94 11 234 5678"
                        required
                      />
                    </div>
                    <div className="mt-4">
                      <Input
                        label="Email *"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Phone className="h-5 w-5 mr-2 text-blue-600" />
                      Emergency Contact
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Name *"
                        value={formData.emergencyContactName}
                        onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                        placeholder="Emergency contact name"
                        required
                      />
                      <Input
                        label="Telephone *"
                        type="tel"
                        value={formData.emergencyContactTelephone}
                        onChange={(e) => handleInputChange('emergencyContactTelephone', e.target.value)}
                        placeholder="+94 77 987 6543"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Documents */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Required Documents</h3>
                  <p className="text-gray-600">Please upload the following documents</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h4 className="font-medium text-blue-900 mb-2">Required Documents:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• NIC Scan (Front and Back)</li>
                    <li>• Police Report</li>
                    <li>• Birth Certificate</li>
                  </ul>
                </div>

                {/* Document Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Upload Documents *
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragActive
                        ? 'border-blue-400 bg-blue-50'
                        : 'border-gray-300'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-500 font-medium">
                          Click to upload
                        </span>
                        <span className="text-gray-600"> or drag and drop</span>
                      </label>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        multiple
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={(e) => handleFileUpload(e.target.files)}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      PDF, PNG, JPG up to 10MB each
                    </p>
                  </div>

                  {formData.documents.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <h4 className="text-sm font-medium text-gray-900">Uploaded Documents ({formData.documents.length})</h4>
                      {formData.documents.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {file.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeDocument(index)}
                            className="text-red-600 hover:text-red-500 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Initial Payment */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Initial Payment</h3>
                  <p className="text-gray-600">Secure your training spot with a one-time payment of Rs. 1,000</p>
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-center space-x-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span className="text-sm font-medium text-blue-900">
                        After this, you'll receive daily payments during your training!
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">Payment Amount</h4>
                      <p className="text-sm text-gray-600">One-time registration fee</p>
                    </div>
                    <div className="text-3xl font-bold text-green-600">
                      Rs. 1,000
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Input
                    label="Cardholder Name *"
                    value={formData.cardName}
                    onChange={(e) => handleInputChange('cardName', e.target.value)}
                    placeholder="Name as it appears on card"
                    required
                  />
                  <Input
                    label="Card Number *"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry Date *"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                      placeholder="MM/YY"
                      required
                    />
                    <Input
                      label="CVV *"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Award className="h-4 w-4" />
                    <span>Your payment is secured with 256-bit SSL encryption</span>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={prevStep}
                icon={ChevronLeft}
                iconPosition="left"
              >
                {currentStep === 1 ? 'Back to Login' : 'Previous'}
              </Button>

              {currentStep < 4 ? (
                <Button
                  onClick={nextStep}
                  disabled={!isStepValid(currentStep)}
                  icon={ChevronRight}
                  iconPosition="right"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!isStepValid(currentStep)}
                  loading={isSubmitting}
                  variant="primary"
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  {isSubmitting ? 'Processing Payment...' : 'Complete Setup'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}