import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Progress } from './ui/progress';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import {
  ChevronLeft,
  ChevronRight,
  User,
  GraduationCap,
  FileText,
  Check,
  Info,
  Calendar,
  AlertCircle,
  Clock,
  Users,
  BookOpen,
  Upload,
  FileCheck,
  X,
  UserCheck,
  School
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { apiService, REQUIRED_DOCUMENTS } from '../services/api';

const initialData = {
  firstName: '',
  middleName: '',
  lastName: '',
  birthDate: '',
  gender: '',
  civilStatus: '',
  nationality: 'Filipino',
  religion: '',
  address: '',
  phoneNumber: '',
  email: '',
  educationLevel: '',
  yearLevel: '',
  program: '',
  semester: '',
  previousSchool: '',
  enrolleeType: '',
  guardianName: '',
  guardianRelation: '',
  guardianPhone: '',
  guardianAddress: ''
};

export function EnhancedEnrollmentForm({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialData);
  const [programs, setPrograms] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState({});
  const [documentErrors, setDocumentErrors] = useState({});
  
  // Determine total steps based on enrollee type
  const getTotalSteps = () => {
    if (formData.enrolleeType === 'new' || formData.enrolleeType === 'transfer') {
      return 6; // Personal, Enrollee Type, Academic, Guardian, Documents, Review
    }
    return 5; // Personal, Enrollee Type, Academic, Guardian, Review
  };

  const totalSteps = getTotalSteps();

  useEffect(() => {
    if (formData.educationLevel) {
      loadPrograms(formData.educationLevel);
    }
  }, [formData.educationLevel]);

  const loadPrograms = async (level) => {
    try {
      const response = await apiService.getPrograms(level);
      if (response.success) {
        setPrograms(response.data);
      }
    } catch (error) {
      console.error('Failed to load programs:', error);
      toast.error('Failed to load programs');
    }
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleFileUpload = (documentType, file) => {
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        setDocumentErrors(prev => ({
          ...prev,
          [documentType]: 'Only JPEG, PNG, and PDF files are allowed'
        }));
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setDocumentErrors(prev => ({
          ...prev,
          [documentType]: 'File size must be less than 5MB'
        }));
        return;
      }

      setUploadedDocuments(prev => ({ ...prev, [documentType]: file }));
      setDocumentErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[documentType];
        return newErrors;
      });
      toast.success(`${file.name} uploaded successfully`);
    }
  };

  const removeDocument = (documentType) => {
    setUploadedDocuments(prev => {
      const newDocs = { ...prev };
      delete newDocs[documentType];
      return newDocs;
    });
    toast.success('Document removed');
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        else if (formData.firstName.length > 50) newErrors.firstName = 'First name cannot exceed 50 characters';
        else if (!/^[a-zA-Z\s]+$/.test(formData.firstName)) newErrors.firstName = 'First name can only contain letters';

        if (formData.middleName.trim()) {
          if (formData.middleName.length > 50) newErrors.middleName = 'Middle name cannot exceed 50 characters';
          else if (!/^[a-zA-Z\s]+$/.test(formData.middleName)) newErrors.middleName = 'Middle name can only contain letters';
        }

        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        else if (formData.lastName.length > 50) newErrors.lastName = 'Last name cannot exceed 50 characters';
        else if (!/^[a-zA-Z\s]+(?:\s+(?:Jr|Sr|II|III|IV|V|VI|VII|VIII|IX|X))?$/.test(formData.lastName)) newErrors.lastName = 'Last name can only contain letters and valid suffixes (Jr, Sr, II, III, IV, V, VI, VII, VIII, IX, X)';

        if (!formData.birthDate) newErrors.birthDate = 'Birth date is required';
        else {
          const birthDate = new Date(formData.birthDate);
          const minAge = formData.educationLevel === 'college' ? 16 : 15;
          const today = new Date();
          const age = today.getFullYear() - birthDate.getFullYear();
          if (age < minAge) newErrors.birthDate = `Must be at least ${minAge} years old`;
          if (age > 50) newErrors.birthDate = 'Please verify age - seems too high';
        }

        if (!formData.gender) newErrors.gender = 'Gender is required';

        if (!formData.civilStatus) newErrors.civilStatus = 'Civil status is required';

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.address.trim()) newErrors.address = 'Complete address is required';

        if (formData.phoneNumber && !/^09\d{9}$/.test(formData.phoneNumber)) {
          newErrors.phoneNumber = 'Phone number must be 11 digits starting with 09 (e.g., 09123456789)';
        }
        break;

      case 2:
        if (!formData.enrolleeType) newErrors.enrolleeType = 'Enrollee type is required';
        break;

      case 3:
        if (!formData.educationLevel) newErrors.educationLevel = 'Education level is required';
        if (!formData.yearLevel) newErrors.yearLevel = 'Year level is required';
        if (!formData.program) newErrors.program = 'Program/Strand is required';
        if (!formData.semester) newErrors.semester = 'Semester is required';
        break;

      case 4:
        if (!formData.guardianName.trim()) newErrors.guardianName = 'Guardian name is required';
        else if (formData.guardianName.length < 2) newErrors.guardianName = 'Guardian name must be at least 2 characters';

        if (!formData.guardianRelation) newErrors.guardianRelation = 'Relationship is required';

        if (!formData.guardianPhone.trim()) newErrors.guardianPhone = 'Guardian phone is required';
        else if (!/^09\d{9}$/.test(formData.guardianPhone)) {
          newErrors.guardianPhone = 'Guardian phone number must be 11 digits starting with 09 (e.g., 09123456789)';
        }

        if (!formData.guardianAddress.trim()) newErrors.guardianAddress = 'Guardian address is required';
        break;

      case 5:
        // Document validation for new/transfer students (now optional)
        if (formData.enrolleeType === 'new' || formData.enrolleeType === 'transfer') {
          const requiredDocs = REQUIRED_DOCUMENTS[formData.enrolleeType];
          for (const doc of requiredDocs) {
            // Documents are now optional - no validation required
            // This maintains the document upload functionality but doesn't enforce requirements
          }
        }
        break;
    }

    setErrors(newErrors);
    setDocumentErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    } else {
      toast.error('Please fix the errors before proceeding');
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      toast.error('Please fix the errors before submitting');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await apiService.createEnrollment(formData);
      if (response.success) {
        // Upload documents if any
        if (Object.keys(uploadedDocuments).length > 0 && response.enrollment_id) {
          for (const [docType, file] of Object.entries(uploadedDocuments)) {
            try {
              await apiService.uploadDocument(response.enrollment_id.toString(), docType, file);
            } catch (error) {
              console.warn(`Failed to upload ${docType}:`, error);
            }
          }
        }

        onComplete(formData);
        setFormData(initialData);
        setCurrentStep(1);
        setErrors({});
        setUploadedDocuments({});
        setDocumentErrors({});
        toast.success('Enrollment submitted successfully!');
      } else {
        toast.error(response.message || 'Failed to submit enrollment');
      }
    } catch (error) {
      console.error('Enrollment submission error:', error);
      toast.error('Failed to submit enrollment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepIcon = (step) => {
    if (step < currentStep) return <Check className="w-4 h-4" />;
    if (step === 1) return <User className="w-4 h-4" />;
    if (step === 2) return <UserCheck className="w-4 h-4" />;
    if (step === 3) return <GraduationCap className="w-4 h-4" />;
    if (step === 4) return <Users className="w-4 h-4" />;
    if (step === 5 && (formData.enrolleeType === 'new' || formData.enrolleeType === 'transfer')) return <Upload className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  const getStepTitle = (step) => {
    if (step === 1) return 'Personal Information';
    if (step === 2) return 'Enrollee Type';
    if (step === 3) return 'Academic Information';
    if (step === 4) return 'Guardian Information';
    if (step === 5) {
      if (formData.enrolleeType === 'new' || formData.enrolleeType === 'transfer') {
        return 'Document Submission';
      } else {
        return 'Review & Submit';
      }
    }
    return 'Review & Submit';
  };

  const selectedProgramInfo = programs.find(p => p.code === formData.program);

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Enhanced Progress Bar */}
      <Card className="border-2 border-primary/20">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-primary">Student Enrollment Application</h2>
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Step {currentStep} of {totalSteps}
              </Badge>
            </div>
            <Progress value={(currentStep / totalSteps) * 100} className="h-3" />
            <div className={`grid gap-2 ${totalSteps === 6 ? 'grid-cols-6' : 'grid-cols-5'}`}>
              {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
                <div key={step} className="flex flex-col items-center space-y-2">
                  <div className={`
                    flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300
                    ${currentStep >= step 
                      ? 'bg-primary text-primary-foreground border-primary shadow-lg scale-110' 
                      : 'bg-background border-border hover:border-primary/50'
                    }
                  `}>
                    {getStepIcon(step)}
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-medium block">
                      {step === 1 && 'Personal'}
                      {step === 2 && 'Type'}
                      {step === 3 && 'Academic'}
                      {step === 4 && 'Guardian'}
                      {step === 5 && totalSteps === 6 && 'Documents'}
                      {step === 5 && totalSteps === 5 && 'Review'}
                      {step === 6 && 'Review'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
              <CardTitle className="flex items-center gap-2">
                {currentStep === 1 && <><User className="w-5 h-5" /> Personal Information</>}
                {currentStep === 2 && <><UserCheck className="w-5 h-5" /> Enrollee Type</>}
                {currentStep === 3 && <><GraduationCap className="w-5 h-5" /> Academic Information</>}
                {currentStep === 4 && <><Users className="w-5 h-5" /> Guardian Information</>}
                {currentStep === 5 && totalSteps === 6 && <><Upload className="w-5 h-5" /> Document Submission</>}
                {(currentStep === 5 && totalSteps === 5) || currentStep === 6 && <><FileText className="w-5 h-5" /> Review & Submit</>}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="flex items-center gap-1">
                        First Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => updateField('firstName', e.target.value)}
                        placeholder="Enter first name"
                        className={errors.firstName ? 'border-red-500' : ''}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="middleName">Middle Name</Label>
                      <Input
                        id="middleName"
                        value={formData.middleName}
                        onChange={(e) => updateField('middleName', e.target.value)}
                        placeholder="Enter middle name (optional)"
                        className={errors.middleName ? 'border-red-500' : ''}
                      />
                      {errors.middleName && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.middleName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="flex items-center gap-1">
                        Last Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => updateField('lastName', e.target.value)}
                        placeholder="Enter last name"
                        className={errors.lastName ? 'border-red-500' : ''}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.lastName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="birthDate" className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Birth Date <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="birthDate"
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => updateField('birthDate', e.target.value)}
                        className={errors.birthDate ? 'border-red-500' : ''}
                      />
                      {errors.birthDate && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.birthDate}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender" className="flex items-center gap-1">
                        Gender <span className="text-red-500">*</span>
                      </Label>
                      <Select value={formData.gender} onValueChange={(value) => updateField('gender', value)}>
                        <SelectTrigger className={errors.gender ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.gender && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.gender}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="civilStatus">Civil Status</Label>
                      <Select value={formData.civilStatus} onValueChange={(value) => updateField('civilStatus', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select civil status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">Single</SelectItem>
                          <SelectItem value="married">Married</SelectItem>
                          <SelectItem value="widowed">Widowed</SelectItem>
                          <SelectItem value="separated">Separated</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nationality">Nationality</Label>
                      <Input
                        id="nationality"
                        value={formData.nationality}
                        onChange={(e) => updateField('nationality', e.target.value)}
                        placeholder="Enter nationality"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="religion">Religion</Label>
                      <Input
                        id="religion"
                        value={formData.religion}
                        onChange={(e) => updateField('religion', e.target.value)}
                        placeholder="Enter religion (optional)"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address" className="flex items-center gap-1">
                        Complete Address <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => updateField('address', e.target.value)}
                        placeholder="Enter complete address"
                        rows={3}
                        className={errors.address ? 'border-red-500' : ''}
                      />
                      {errors.address && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.address}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber" className="flex items-center gap-1">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={(e) => updateField('phoneNumber', e.target.value)}
                        placeholder="Enter 11-digit phone number (e.g., 09123456789)"
                        className={errors.phoneNumber ? 'border-red-500' : ''}
                      />
                      {errors.phoneNumber && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.phoneNumber}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="Enter email address"
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Enrollee Type */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <Alert>
                    <UserCheck className="h-4 w-4" />
                    <AlertDescription>
                      Please select your enrollee type. This helps us determine the required documents and processes for your enrollment.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <Label className="flex items-center gap-1">
                      Enrollee Type <span className="text-red-500">*</span>
                    </Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { 
                          value: 'new', 
                          label: 'New Student', 
                          description: 'First time enrolling in this school',
                          icon: <School className="w-5 h-5" />
                        },
                        { 
                          value: 'transfer', 
                          label: 'Transfer Student', 
                          description: 'Transferring from another school',
                          icon: <GraduationCap className="w-5 h-5" />
                        },
                        { 
                          value: 'cross', 
                          label: 'Cross Enrollee', 
                          description: 'Taking subjects from another school',
                          icon: <BookOpen className="w-5 h-5" />
                        },
                        { 
                          value: 'old', 
                          label: 'Returning Student', 
                          description: 'Previously enrolled in this school',
                          icon: <Users className="w-5 h-5" />
                        }
                      ].map((type) => (
                        <div
                          key={type.value}
                          className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                            formData.enrolleeType === type.value 
                              ? 'border-primary bg-primary/5 shadow-md' 
                              : 'border-border hover:border-primary/50 hover:bg-primary/2'
                          }`}
                          onClick={() => updateField('enrolleeType', type.value)}
                        >
                          <div className="flex items-start space-x-3">
                            <Checkbox
                              checked={formData.enrolleeType === type.value}
                              onChange={() => updateField('enrolleeType', type.value)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                {type.icon}
                                <Label className="font-medium cursor-pointer">{type.label}</Label>
                              </div>
                              <p className="text-sm text-muted-foreground">{type.description}</p>
                              {type.value === 'new' || type.value === 'transfer' ? (
                                <Badge variant="outline" className="mt-2 text-xs">
                                  Optional document submission
                                </Badge>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {errors.enrolleeType && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.enrolleeType}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Academic Information */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Choose your education level first, then select your preferred program.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <Label className="flex items-center gap-1">
                      Education Level <span className="text-red-500">*</span>
                    </Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-primary/5 transition-colors">
                        <Checkbox
                          id="shs"
                          checked={formData.educationLevel === 'shs'}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              updateField('educationLevel', 'shs');
                              updateField('program', '');
                            }
                          }}
                        />
                        <div>
                          <Label htmlFor="shs" className="font-medium cursor-pointer">Senior High School (SHS)</Label>
                          <p className="text-sm text-muted-foreground">Grades 11-12, Choose your strand</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-primary/5 transition-colors">
                        <Checkbox
                          id="college"
                          checked={formData.educationLevel === 'college'}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              updateField('educationLevel', 'college');
                              updateField('program', '');
                            }
                          }}
                        />
                        <div>
                          <Label htmlFor="college" className="font-medium cursor-pointer">College</Label>
                          <p className="text-sm text-muted-foreground">4-year degree programs</p>
                        </div>
                      </div>
                    </div>
                    {errors.educationLevel && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.educationLevel}
                      </p>
                    )}
                  </div>

                  {formData.educationLevel && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="program" className="flex items-center gap-1">
                          {formData.educationLevel === 'shs' ? 'Strand' : 'Program'} <span className="text-red-500">*</span>
                        </Label>
                        <Select value={formData.program} onValueChange={(value) => updateField('program', value)}>
                          <SelectTrigger className={errors.program ? 'border-red-500' : ''}>
                            <SelectValue placeholder={`Select ${formData.educationLevel === 'shs' ? 'strand' : 'program'}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {programs.map((program) => (
                              <SelectItem key={program.code} value={program.code}>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{program.code}</span>
                                  <span className="text-sm text-muted-foreground">- {program.name}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.program && (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.program}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="yearLevel" className="flex items-center gap-1">
                          Year Level <span className="text-red-500">*</span>
                        </Label>
                        <Select value={formData.yearLevel} onValueChange={(value) => updateField('yearLevel', value)}>
                          <SelectTrigger className={errors.yearLevel ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Select year level" />
                          </SelectTrigger>
                          <SelectContent>
                            {formData.educationLevel === 'shs' ? (
                              <>
                                <SelectItem value="Grade 11">Grade 11</SelectItem>
                                <SelectItem value="Grade 12">Grade 12</SelectItem>
                              </>
                            ) : formData.educationLevel === 'college' ? (
                              <>
                                <SelectItem value="1st Year">1st Year</SelectItem>
                                <SelectItem value="2nd Year">2nd Year</SelectItem>
                                <SelectItem value="3rd Year">3rd Year</SelectItem>
                                <SelectItem value="4th Year">4th Year</SelectItem>
                              </>
                            ) : null}
                          </SelectContent>
                        </Select>
                        {errors.yearLevel && (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.yearLevel}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="semester" className="flex items-center gap-1">
                          Semester <span className="text-red-500">*</span>
                        </Label>
                        <Select value={formData.semester} onValueChange={(value) => updateField('semester', value)}>
                          <SelectTrigger className={errors.semester ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Select semester" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1st">1st Semester</SelectItem>
                            <SelectItem value="2nd">2nd Semester</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.semester && (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.semester}
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="previousSchool">Previous School</Label>
                    <Input
                      id="previousSchool"
                      value={formData.previousSchool}
                      onChange={(e) => updateField('previousSchool', e.target.value)}
                      placeholder="Enter previous school name"
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Guardian Information */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <Alert>
                    <Users className="h-4 w-4" />
                    <AlertDescription>
                      Please provide emergency contact information. This person will be contacted in case of emergencies.
                    </AlertDescription>
                  </Alert>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="guardianName" className="flex items-center gap-1">
                        Guardian Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="guardianName"
                        value={formData.guardianName}
                        onChange={(e) => updateField('guardianName', e.target.value)}
                        placeholder="Enter guardian full name"
                        className={errors.guardianName ? 'border-red-500' : ''}
                      />
                      {errors.guardianName && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.guardianName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="guardianRelation" className="flex items-center gap-1">
                        Relationship <span className="text-red-500">*</span>
                      </Label>
                      <Select value={formData.guardianRelation} onValueChange={(value) => updateField('guardianRelation', value)}>
                        <SelectTrigger className={errors.guardianRelation ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mother">Mother</SelectItem>
                          <SelectItem value="father">Father</SelectItem>
                          <SelectItem value="guardian">Legal Guardian</SelectItem>
                          <SelectItem value="spouse">Spouse</SelectItem>
                          <SelectItem value="sibling">Sibling</SelectItem>
                          <SelectItem value="other">Other Relative</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.guardianRelation && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.guardianRelation}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="guardianPhone" className="flex items-center gap-1">
                        Guardian Phone <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="guardianPhone"
                        value={formData.guardianPhone}
                        onChange={(e) => updateField('guardianPhone', e.target.value)}
                        placeholder="Enter guardian phone number"
                        className={errors.guardianPhone ? 'border-red-500' : ''}
                      />
                      {errors.guardianPhone && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.guardianPhone}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="guardianAddress" className="flex items-center gap-1">
                        Guardian Address <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="guardianAddress"
                        value={formData.guardianAddress}
                        onChange={(e) => updateField('guardianAddress', e.target.value)}
                        placeholder="Enter guardian complete address"
                        rows={3}
                        className={errors.guardianAddress ? 'border-red-500' : ''}
                      />
                      {errors.guardianAddress && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.guardianAddress}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Document Submission (for new/transfer students only) */}
              {currentStep === 5 && (formData.enrolleeType === 'new' || formData.enrolleeType === 'transfer') && (
                <div className="space-y-6">
                  <Alert>
                    <Upload className="h-4 w-4" />
                    <AlertDescription>
                      Please upload the required documents. All files must be in JPEG, PNG, or PDF format and less than 5MB each.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    {REQUIRED_DOCUMENTS[formData.enrolleeType]?.map((doc) => (
                      <div key={doc.type} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Label className="font-medium">{doc.label}</Label>
                            <Badge variant="outline" className="text-xs">Optional</Badge>
                          </div>
                          {uploadedDocuments[doc.type] && (
                            <div className="flex items-center gap-2">
                              <FileCheck className="w-4 h-4 text-green-600" />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeDocument(doc.type)}
                                className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                        
                        {uploadedDocuments[doc.type] ? (
                          <div className="flex items-center gap-2 p-2 bg-green-50 rounded border border-green-200">
                            <FileCheck className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-700">{uploadedDocuments[doc.type].name}</span>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Input
                              type="file"
                              accept=".jpg,.jpeg,.png,.pdf"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleFileUpload(doc.type, file);
                                }
                              }}
                              className="cursor-pointer"
                            />
                            {documentErrors[doc.type] && (
                              <p className="text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {documentErrors[doc.type]}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Review Step */}
              {((currentStep === 5 && formData.enrolleeType !== 'new' && formData.enrolleeType !== 'transfer') || 
                (currentStep === 6 && (formData.enrolleeType === 'new' || formData.enrolleeType === 'transfer'))) && (
                <div className="space-y-6">
                  <Alert className="border-green-200 bg-green-50">
                    <Check className="h-4 w-4" />
                    <AlertDescription>
                      Please review all information carefully before submitting your enrollment application.
                    </AlertDescription>
                  </Alert>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-primary/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <User className="w-5 h-5" />
                          Personal Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 text-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <span className="font-medium">Name:</span>
                          <span>{formData.firstName} {formData.middleName} {formData.lastName}</span>
                          <span className="font-medium">Birth Date:</span>
                          <span>{formData.birthDate}</span>
                          <span className="font-medium">Gender:</span>
                          <span className="capitalize">{formData.gender}</span>
                          <span className="font-medium">Email:</span>
                          <span>{formData.email || 'Not specified'}</span>
                          <span className="font-medium">Phone:</span>
                          <span>{formData.phoneNumber || 'Not specified'}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-primary/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <UserCheck className="w-5 h-5" />
                          Enrollee & Academic Info
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 text-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <span className="font-medium">Enrollee Type:</span>
                          <span className="capitalize">{formData.enrolleeType}</span>
                          <span className="font-medium">Level:</span>
                          <span className="capitalize">{formData.educationLevel === 'shs' ? 'Senior High School' : 'College'}</span>
                          <span className="font-medium">{formData.educationLevel === 'shs' ? 'Strand:' : 'Program:'}</span>
                          <span>{selectedProgramInfo?.name || formData.program.toUpperCase()}</span>
                          <span className="font-medium">Year Level:</span>
                          <span>{formData.yearLevel}</span>
                          <span className="font-medium">Semester:</span>
                          <span>{formData.semester} Semester</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-primary/20 md:col-span-2">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Users className="w-5 h-5" />
                          Guardian Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 text-sm">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          <span className="font-medium">Guardian Name:</span>
                          <span>{formData.guardianName}</span>
                          <span className="font-medium">Relationship:</span>
                          <span className="capitalize">{formData.guardianRelation}</span>
                          <span className="font-medium">Phone:</span>
                          <span>{formData.guardianPhone}</span>
                        </div>
                      </CardContent>
                    </Card>

                    {(formData.enrolleeType === 'new' || formData.enrolleeType === 'transfer') && Object.keys(uploadedDocuments).length > 0 && (
                      <Card className="border-primary/20 md:col-span-2">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Upload className="w-5 h-5" />
                            Uploaded Documents
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {Object.entries(uploadedDocuments).map(([docType, file]) => (
                              <div key={docType} className="flex items-center gap-2 p-2 bg-green-50 rounded border border-green-200">
                                <FileCheck className="w-4 h-4 text-green-600" />
                                <span className="text-sm text-green-700">{file.name}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                
                {currentStep < totalSteps ? (
                  <Button
                    onClick={nextStep}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Enrollment'}
                    <Check className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Program Details */}
          {selectedProgramInfo && currentStep === 3 && (
            <Card className="border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Program Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium text-primary">{selectedProgramInfo.name}</h4>
                  <Badge variant="outline" className="mt-1">{selectedProgramInfo.duration}</Badge>
                </div>
                <div>
                  <h5 className="font-medium mb-1">Description:</h5>
                  <p className="text-muted-foreground">{selectedProgramInfo.description}</p>
                </div>
                <div>
                  <h5 className="font-medium mb-1">Requirements:</h5>
                  <p className="text-muted-foreground">{selectedProgramInfo.requirements}</p>
                </div>
                <div>
                  <h5 className="font-medium mb-1">Career Prospects:</h5>
                  <p className="text-muted-foreground">{selectedProgramInfo.careerProspects}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Document Requirements */}
          {currentStep === 2 && formData.enrolleeType && (
            <Card className="border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Required Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="text-muted-foreground mb-3">
                  As a <strong className="capitalize">{formData.enrolleeType}</strong> student, you will need:
                </p>
                <ul className="space-y-2">
                  {REQUIRED_DOCUMENTS[formData.enrolleeType]?.map((doc) => (
                    <li key={doc.type} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>{doc.label}</span>
                    </li>
                  ))}
                </ul>
                {(formData.enrolleeType === 'new' || formData.enrolleeType === 'transfer') && (
                  <p className="text-xs text-primary-700 bg-primary-50 p-2 rounded mt-3">
                    💡 You'll be able to upload these documents in a later step.
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Help Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="w-5 h-5" />
                Need Help?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>If you need assistance with your enrollment, contact us:</p>
              <div className="space-y-2">
                <p><strong>Phone:</strong> (02) 8123-4567</p>
                <p><strong>Email:</strong> admissions@fepc.edu.ph</p>
                <p><strong>Office Hours:</strong> Mon-Fri 8AM-5PM</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}