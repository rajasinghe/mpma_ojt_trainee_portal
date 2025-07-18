import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  ChevronLeft,
  ChevronRight,
  Upload,
  FileText,
  Check,
  User,
  Phone,
  Sparkles,
  Star,
  Camera,
  X,
  FileImage,
  Building2,
  Receipt,
} from "lucide-react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { Card, CardContent } from "../../components/ui/Card";
import { useToastHelpers } from "../../hooks/useToast";
import { OnboardingSchema, OnboardingFormData } from "../../lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, Controller } from "react-hook-form";

export default function Onboarding() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    getValues,
    setValue,
    watch,
    trigger,
  } = useForm<OnboardingFormData>({
    defaultValues: {
      personalDetails: {
        name: "",
        fullname: "",
        nicNo: "",
        address: "",
        trainingInstitute: "",
        course: "",
        profilePhoto: null,
      },
      contactInfo: {
        mobileNo: "",
        residenceNo: "",
        email: "",
        emergencyContactName: "",
        emergencyContactTelephone: "",
      },
      documents: {
        nicFront: null,
        nicBack: null,
        policeReport: null,
        birthCertificate: null,
        instituteLetter: null,
      },
      bankPayment: {
        paymentAmount: "",
        accountNo: "",
        paymentDate: "",
        bankReceipt: null,
      },
    },
    resolver: zodResolver(OnboardingSchema),
    mode: "onChange",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const { updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const { success, error } = useToastHelpers();
  const [dragActiveSection, setDragActiveSection] = useState<string | null>(
    null
  );

  const steps = [
    {
      id: 1,
      name: "Personal Details",
      description: "Your basic information and photo",
      icon: User,
      color: "from-blue-500 to-purple-600",
    },
    {
      id: 2,
      name: "Contact Information",
      description: "How can we reach you?",
      icon: Phone,
      color: "from-purple-500 to-pink-600",
    },
    {
      id: 3,
      name: "Documents",
      description: "Upload required documents",
      icon: FileImage,
      color: "from-pink-500 to-orange-600",
    },
    {
      id: 4,
      name: "Bank Payment",
      description: "Upload bank receipt and payment details",
      icon: Receipt,
      color: "from-orange-500 to-red-600",
    },
  ];

  const profilePhoto = watch("personalDetails.profilePhoto");
  const nicFront = watch("documents.nicFront");
  const nicBack = watch("documents.nicBack");
  const policeReport = watch("documents.policeReport");
  const birthCertificate = watch("documents.birthCertificate");
  const instituteLetter = watch("documents.instituteLetter");
  const bankReceipt = watch("bankPayment.bankReceipt");

  /*
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
*/
  const handleDocumentUpload = (file: File, documentType: string) => {
    if (
      file &&
      (file.type.startsWith("image/") || file.type === "application/pdf")
    ) {
      setValue(`documents.${documentType}` as any, file);
      success(
        `${documentType
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase())} uploaded successfully`
      );
    } else {
      error("Please select a valid image or PDF file");
    }
  };

  const handlePhotoUpload = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setValue("personalDetails.profilePhoto", file);
      success("Profile photo uploaded successfully");
    } else {
      error("Please select a valid image file");
    }
  };

  const removeDocument = (documentType: string) => {
    setValue(`documents.${documentType}` as any, null);
    success(
      `${documentType
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())} removed`
    );
  };

  const removePhoto = () => {
    setValue("personalDetails.profilePhoto", null);
    success("Profile photo removed");
  };

  const handleDragOver = (e: React.DragEvent, section: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveSection(section);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveSection(null);
  };

  const handleDrop = (e: React.DragEvent, documentType: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveSection(null);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleDocumentUpload(file, documentType);
    }
  };

  const removeReceipt = () => {
    setValue("bankPayment.bankReceipt", null);
    success("Bank receipt removed");
  };

  const handleReceiptUpload = (file: File) => {
    if (
      file &&
      (file.type.startsWith("image/") || file.type === "application/pdf")
    ) {
      setValue("bankPayment.bankReceipt", file);
      success("Bank receipt uploaded successfully");
    } else {
      error("Please select a valid image or PDF file");
    }
  };

  // validation function

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      // Log out the user and go back to login page
      logout();
      navigate("/login");
    }
  };

  const nextStep = async () => {
    let isValid = false;

    try {
      if (currentStep === 1) {
        isValid = await trigger("personalDetails");
        if (isValid && profilePhoto === null) {
          error("Profile photo is required");
          return;
        }
      } else if (currentStep === 2) {
        isValid = await trigger("contactInfo");
      } else if (currentStep === 3) {
        isValid = await trigger("documents");
        const docs = getValues("documents");
        const requiredDocs = [
          "nicFront",
          "nicBack",
          "policeReport",
          "birthCertificate",
          "instituteLetter",
        ];
        const missingDocs = requiredDocs.filter(
          (doc) => !docs[doc as keyof typeof docs]
        );

        if (missingDocs.length > 0) {
          error(
            `Please upload all required documents: ${missingDocs
              .map((doc) =>
                doc
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())
              )
              .join(", ")}`
          );
          return;
        }
        if (isValid) {
          const formData = getValues(); // ✅ grab all current form data

          // ✅ Send trainee data before proceeding
          await onSubmitTraineeData(formData);

          setCurrentStep(4); // ✅ move to payment step only if success
          return;
        }
      }
      if (isValid) {
        if (currentStep < 4) {
          setCurrentStep(currentStep + 1);
        }
      } else {
        error("Please fix errors before proceeding");
      }
    } catch (err) {
      error("Validation failed. Please check your inputs.");
    }
  };

  const onSubmitTraineeData: SubmitHandler<OnboardingFormData> = async (
    data
  ) => {
    try {
      const traineeData = {
        personalDetails: data.personalDetails,
        contactInfo: data.contactInfo,
        documents: data.documents,
      };

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Trainee data submitted:", traineeData);

      success("Trainee data submitted successfully!");
      setCurrentStep(4); // go to next step
    } catch (err) {
      error("Failed to submit trainee data.");
    }
  };

  const onSubmitBankPayment: SubmitHandler<OnboardingFormData> = async (
    data
  ) => {
    try {
      if (!data.bankPayment.bankReceipt) {
        error("Please upload your bank receipt");
        return;
      }
      const bankPaymentData = data.bankPayment;

      // Simulate bank payment processing
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Bank payment data submitted:", bankPaymentData);

      updateUser({ hasCompletedOnboarding: true });
      success(
        "Bank payment details submitted successfully! Onboarding complete."
      );
      navigate("/trainee");
    } catch (err) {
      error("Failed to submit bank payment details.");
    }
  };

  return (
    <div
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
      style={{
        background: "linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)",
      }}
    >
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
            Let's get you set up for an amazing On-the-Job Training experience.
            This will only take a few minutes.
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
                <div
                  key={step.id}
                  className="flex flex-col items-center flex-1"
                >
                  <div className="relative">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
                        isActive
                          ? `bg-gradient-to-r ${step.color} border-transparent text-white shadow-lg`
                          : "border-gray-300 bg-white text-gray-400"
                      } ${isCurrent ? "scale-110 shadow-xl" : ""}`}
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
                    <div
                      className={`text-sm font-semibold ${
                        isActive ? "text-gray-900" : "text-gray-500"
                      }`}
                    >
                      {step.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {step.description}
                    </div>
                  </div>
                  {/*index < steps.length - 1 && (
                    <div
                      className={`hidden sm:block absolute top-8 left-1/2 w-full h-1 transform -translate-y-1/2 ${
                        currentStep > step.id
                          ? "bg-gradient-to-r from-blue-600 to-purple-600"
                          : "bg-gray-300"
                      }`}
                      style={{
                        left: "calc(50% + 2rem)",
                        width: "calc(100% - 4rem)",
                      }}
                    />
                  )*/}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <Card className="max-w-2xl mx-auto bg-white shadow-xl border border-gray-200">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmitBankPayment)}>
              {/* Step 1: Personal Details */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Personal Details
                    </h3>
                    <p className="text-gray-600">
                      Tell us about yourself and upload your photo
                    </p>
                  </div>

                  {/* Profile Photo Upload */}
                  <div className="text-center mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Photo *
                    </label>
                    <div className="flex justify-center">
                      <div className="relative">
                        {profilePhoto instanceof File ? (
                          <div className="relative">
                            <img
                              src={URL.createObjectURL(profilePhoto)}
                              alt="Profile"
                              className="w-24 h-24 rounded-lg object-cover border-4 border-blue-500"
                            />
                            <button
                              onClick={removePhoto}
                              type="button"
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <label className="cursor-pointer">
                            <div className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-blue-500 transition-colors">
                              <Camera className="h-8 w-8 text-gray-400" />
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                e.target.files?.[0] &&
                                handlePhotoUpload(e.target.files[0])
                              }
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Controller
                      name="personalDetails.name"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Input
                          label="Name *"
                          {...field}
                          error={fieldState.error?.message}
                          placeholder="Enter your name"
                          required
                        />
                      )}
                    />
                    <Controller
                      name="personalDetails.fullname"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Input
                          label="Full Name *"
                          {...field}
                          error={fieldState.error?.message}
                          placeholder="Enter your full name"
                          required
                        />
                      )}
                    />
                    <Controller
                      name="personalDetails.nicNo"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Input
                          label="NIC No *"
                          {...field}
                          error={fieldState.error?.message}
                          placeholder="Enter your NIC number"
                          required
                        />
                      )}
                    />
                    <Controller
                      name="personalDetails.trainingInstitute"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Input
                          label="Training Institute *"
                          {...field}
                          error={fieldState.error?.message}
                          placeholder="Enter training institute"
                          required
                        />
                      )}
                    />
                    <Controller
                      name="personalDetails.course"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Input
                          label="Course *"
                          {...field}
                          error={fieldState.error?.message}
                          placeholder="Enter course name"
                          required
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address *
                    </label>
                    <textarea
                      {...register("personalDetails.address")}
                      rows={3}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                      placeholder="Enter your full address"
                      required
                    />
                    {errors.personalDetails?.address && (
                      <div className="text-sm text-red-600 font-medium">
                        {errors.personalDetails?.address.message}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Contact Info */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Contact Information
                    </h3>
                    <p className="text-gray-600">
                      How can we reach you and your emergency contact?
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        Contact Numbers
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Controller
                          name="contactInfo.mobileNo"
                          control={control}
                          render={({ field, fieldState }) => (
                            <Input
                              label="Mobile No *"
                              {...field}
                              error={fieldState.error?.message}
                              placeholder="+94 77 123 4567"
                              type="tel"
                              required
                            />
                          )}
                        />
                        <Controller
                          name="contactInfo.residenceNo"
                          control={control}
                          render={({ field, fieldState }) => (
                            <Input
                              label="Residence No *"
                              {...field}
                              error={fieldState.error?.message}
                              placeholder="+94 11 234 5678"
                              type="tel"
                              required
                            />
                          )}
                        />
                      </div>
                      <div className="mt-4">
                        <Controller
                          name="contactInfo.email"
                          control={control}
                          render={({ field, fieldState }) => (
                            <Input
                              label="Email *"
                              {...field}
                              error={fieldState.error?.message}
                              placeholder="your.email@example.com"
                              type="email"
                              required
                            />
                          )}
                        />
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Phone className="h-5 w-5 mr-2 text-blue-600" />
                        Emergency Contact
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Controller
                          name="contactInfo.emergencyContactName"
                          control={control}
                          render={({ field, fieldState }) => (
                            <Input
                              label="Name *"
                              {...field}
                              error={fieldState.error?.message}
                              placeholder="Emergency contact name"
                              required
                            />
                          )}
                        />
                        <Controller
                          name="contactInfo.emergencyContactTelephone"
                          control={control}
                          render={({ field, fieldState }) => (
                            <Input
                              label="Telephone *"
                              {...field}
                              error={fieldState.error?.message}
                              placeholder="+94 77 987 6543"
                              type="tel"
                              required
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Documents */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Required Documents
                    </h3>
                    <p className="text-gray-600">
                      Please upload the following documents
                    </p>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg mb-4">
                    <h4 className="font-medium text-blue-900 mb-2">
                      Required Documents:
                    </h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• NIC Scan Front and Back</li>
                      <li>• Police Report</li>
                      <li>• Birth Certificate</li>
                      <li>• Institute Letter</li>
                    </ul>
                  </div>

                  {/* Compact Document Uploads with Drag & Drop */}
                  <div className="space-y-3">
                    {/* NIC Front and Back - Side by Side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* NIC Front - Compact with Drag & Drop */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          NIC Scan Front *
                        </label>
                        {nicFront instanceof File ? (
                          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 flex items-center justify-between">
                            <div className="flex items-center">
                              {nicFront.type === "application/pdf" ? (
                                <FileText className="h-5 w-5 text-red-500 mr-2" />
                              ) : (
                                <FileImage className="h-5 w-5 text-blue-500 mr-2" />
                              )}
                              <div>
                                <p className="text-xs font-medium text-gray-900 truncate max-w-[120px]">
                                  {nicFront.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {(nicFront.size / 1024 / 1024).toFixed(1)} MB
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => removeDocument("nicFront")}
                              type="button"
                              className="text-red-600 hover:text-red-500"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <div
                            className={`border-2 border-dashed rounded-lg p-3 text-center transition-colors ${
                              dragActiveSection === "nicFront"
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-300 hover:border-blue-400"
                            }`}
                            onDragOver={(e) => handleDragOver(e, "nicFront")}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, "nicFront")}
                          >
                            <Upload className="mx-auto h-5 w-5 text-gray-400 mb-1" />
                            <label
                              htmlFor="nic-front-upload"
                              className="cursor-pointer"
                            >
                              <span className="text-blue-600 hover:text-blue-500 text-xs font-medium">
                                Click or drag NIC Front
                              </span>
                              <input
                                id="nic-front-upload"
                                type="file"
                                className="sr-only"
                                accept=".pdf,.png,.jpg,.jpeg"
                                onChange={(e) =>
                                  e.target.files?.[0] &&
                                  handleDocumentUpload(
                                    e.target.files[0],
                                    "nicFront"
                                  )
                                }
                              />
                            </label>
                            <span className="text-xs text-gray-500 mt-1">
                              {" "}
                              PDF, PNG, JPG
                            </span>
                          </div>
                        )}
                      </div>

                      {/* NIC Back - Compact with Drag & Drop */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          NIC Scan Back *
                        </label>
                        {nicBack instanceof File ? (
                          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 flex items-center justify-between">
                            <div className="flex items-center">
                              {nicBack.type === "application/pdf" ? (
                                <FileText className="h-5 w-5 text-red-500 mr-2" />
                              ) : (
                                <FileImage className="h-5 w-5 text-blue-500 mr-2" />
                              )}
                              <div>
                                <p className="text-xs font-medium text-gray-900 truncate max-w-[120px]">
                                  {nicBack.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {(nicBack.size / 1024 / 1024).toFixed(1)} MB
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => removeDocument("nicBack")}
                              type="button"
                              className="text-red-600 hover:text-red-500"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <div
                            className={`border-2 border-dashed rounded-lg p-3 text-center transition-colors ${
                              dragActiveSection === "nicBack"
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-300 hover:border-blue-400"
                            }`}
                            onDragOver={(e) => handleDragOver(e, "nicBack")}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, "nicBack")}
                          >
                            <Upload className="mx-auto h-5 w-5 text-gray-400 mb-1" />
                            <label
                              htmlFor="nic-back-upload"
                              className="cursor-pointer"
                            >
                              <span className="text-blue-600 hover:text-blue-500 text-xs font-medium">
                                Click or drag NIC Back
                              </span>
                              <input
                                id="nic-back-upload"
                                type="file"
                                className="sr-only"
                                accept=".pdf,.png,.jpg,.jpeg"
                                onChange={(e) =>
                                  e.target.files?.[0] &&
                                  handleDocumentUpload(
                                    e.target.files[0],
                                    "nicBack"
                                  )
                                }
                              />
                            </label>
                            <span className="text-xs text-gray-500 mt-1">
                              {" "}
                              PDF, PNG, JPG
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Other Documents - Compact Single Column with Drag & Drop */}
                    {[
                      {
                        key: "policeReport",
                        label: "Police Report",
                        file: policeReport,
                      },
                      {
                        key: "birthCertificate",
                        label: "Birth Certificate",
                        file: birthCertificate,
                      },
                      {
                        key: "instituteLetter",
                        label: "Institute Letter",
                        file: instituteLetter,
                      },
                    ].map(({ key, label, file }) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {label} *
                        </label>
                        {file instanceof File ? (
                          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 flex items-center justify-between">
                            <div className="flex items-center">
                              {file.type === "application/pdf" ? (
                                <FileText className="h-5 w-5 text-red-500 mr-2" />
                              ) : (
                                <FileImage className="h-5 w-5 text-blue-500 mr-2" />
                              )}
                              <div>
                                <p className="text-xs font-medium text-gray-900 truncate max-w-[200px]">
                                  {file.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {(file.size / 1024 / 1024).toFixed(1)} MB
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => removeDocument(key)}
                              type="button"
                              className="text-red-600 hover:text-red-500"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <div
                            className={`border-2 border-dashed rounded-lg p-3 text-center transition-colors ${
                              dragActiveSection === key
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-300 hover:border-blue-400"
                            }`}
                            onDragOver={(e) => handleDragOver(e, key)}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, key)}
                          >
                            <div className="flex items-center justify-center">
                              <Upload className="h-5 w-5 text-gray-400 mr-2" />
                              <label
                                htmlFor={`${key}-upload`}
                                className="cursor-pointer"
                              >
                                <span className="text-blue-600 hover:text-blue-500 text-xs font-medium">
                                  Click or drag {label}
                                </span>
                                <input
                                  id={`${key}-upload`}
                                  type="file"
                                  className="sr-only"
                                  accept=".pdf,.png,.jpg,.jpeg"
                                  onChange={(e) =>
                                    e.target.files?.[0] &&
                                    handleDocumentUpload(e.target.files[0], key)
                                  }
                                />
                              </label>
                              <span className="text-xs text-gray-500 ml-2">
                                PDF, PNG, JPG
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Bank Payment */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Bank Payment Details
                    </h3>
                    <p className="text-gray-600">
                      Upload your bank receipt and provide payment details for
                      the BOC account transfer
                    </p>
                  </div>

                  {/* Bank Account Details */}
                  <div className="bg-blue-50 p-6 rounded-lg mb-6">
                    <div className="flex items-center mb-4">
                      <Building2 className="h-6 w-6 text-blue-600 mr-2" />
                      <h4 className="text-lg font-semibold text-gray-900">
                        Bank of Ceylon (BOC) Account Details
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">
                          Account Name:
                        </span>
                        <p className="text-gray-900">OJT Training Institute</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">
                          Account Number:
                        </span>
                        <p className="text-gray-900 font-mono">1234567890</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">
                          Branch:
                        </span>
                        <p className="text-gray-900">Colombo Main Branch</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">
                          Bank Code:
                        </span>
                        <p className="text-gray-900 font-mono">7010</p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Details Form */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Controller
                        name="bankPayment.paymentAmount"
                        control={control}
                        render={({ field, fieldState }) => (
                          <Input
                            label="Payment Amount (Rs.) *"
                            {...field}
                            error={fieldState.error?.message}
                            placeholder="1000.00"
                            type="number"
                            step="0.01"
                            min="0"
                            required
                          />
                        )}
                      />
                      <Controller
                        name="bankPayment.accountNo"
                        control={control}
                        render={({ field, fieldState }) => (
                          <Input
                            label="Account Number *"
                            {...field}
                            error={fieldState.error?.message}
                            placeholder="1234567890"
                            required
                          />
                        )}
                      />
                      <Controller
                        name="bankPayment.paymentDate"
                        control={control}
                        render={({ field, fieldState }) => (
                          <Input
                            label="Payment Date *"
                            {...field}
                            error={fieldState.error?.message}
                            type="date"
                            required
                          />
                        )}
                      />
                    </div>

                    {/* Bank Receipt Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Bank Receipt *
                      </label>

                      {bankReceipt instanceof File ? (
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              {bankReceipt.type === "application/pdf" ? (
                                <FileText className="h-8 w-8 text-red-500 mr-3" />
                              ) : (
                                <FileImage className="h-8 w-8 text-blue-500 mr-3" />
                              )}
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {bankReceipt.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {(bankReceipt.size / 1024 / 1024).toFixed(2)}{" "}
                                  MB
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={removeReceipt}
                              type="button"
                              className="text-red-600 hover:text-red-500 text-sm"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>

                          {bankReceipt.type.startsWith("image/") && (
                            <div className="mt-3">
                              <img
                                src={URL.createObjectURL(bankReceipt)}
                                alt="Bank Receipt Preview"
                                className="max-w-full h-32 object-contain rounded-lg border"
                              />
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Receipt className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="mt-4">
                            <label
                              htmlFor="receipt-upload"
                              className="cursor-pointer"
                            >
                              <span className="text-blue-600 hover:text-blue-500 font-medium">
                                Click to upload bank receipt
                              </span>
                              <span className="text-gray-600">
                                {" "}
                                or drag and drop
                              </span>
                            </label>
                            <input
                              id="receipt-upload"
                              name="receipt-upload"
                              type="file"
                              className="sr-only"
                              accept=".pdf,.png,.jpg,.jpeg"
                              onChange={(e) =>
                                e.target.files?.[0] &&
                                handleReceiptUpload(e.target.files[0])
                              }
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            PDF, PNG, JPG up to 10MB
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Star className="h-5 w-5 text-yellow-500 mt-0.5" />
                      <div className="text-sm text-yellow-800">
                        <p className="font-medium mb-1">
                          Important Instructions:
                        </p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>
                            Make the payment to the BOC account details provided
                            above
                          </li>
                          <li>
                            Upload a clear photo or scan of your bank receipt
                          </li>
                          <li>
                            Ensure the payment amount and date match your bank
                            transaction
                          </li>
                          <li>
                            Your application will be processed after payment
                            verification
                          </li>
                        </ul>
                      </div>
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
                  type="button"
                >
                  {currentStep === 1 ? "Back to Login" : "Previous"}
                </Button>

                {currentStep < 3 ? (
                  <Button
                    onClick={nextStep}
                    icon={ChevronRight}
                    iconPosition="right"
                    type="button"
                  >
                    Next Step
                  </Button>
                ) : currentStep === 3 ? (
                  <Button
                    onClick={nextStep} // Step 3: partial form submit
                    loading={isSubmitting}
                    variant="primary"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    type="button"
                  >
                    Submit Details
                  </Button>
                ) : (
                  <Button
                    //onClick={handleSubmit(onSubmitBankPayment)} // Step 4: only payment
                    loading={isSubmitting}
                    variant="primary"
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    type="submit"
                  >
                    {isSubmitting ? "Processing Payment..." : "Complete Setup"}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
