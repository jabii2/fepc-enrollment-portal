import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Progress } from './ui/progress';
import { Textarea } from './ui/textarea';
import { ChevronLeft, ChevronRight, User, GraduationCap, BookOpen, FileText, Check, Loader2, Upload, X } from 'lucide-react';

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
  program: '',
  major: '',
  semester: '',
  yearLevel: '1',
  previousSchool: '',
  enrolleeType: 'new',
  guardianName: '',
  guardianRelation: '',
  guardianPhone: '',
  guardianAddress: '',
  selectedSubjects: [],
  documents: []
};

const shsPrograms = [
  { value: 'abm', label: 'ABM - Accountancy, Business and Management' },
  { value: 'ia', label: 'IA - Industrial Arts' },
  { value: 'he', label: 'HE - Home Economics' },
  { value: 'humss', label: 'HUMSS - Humanities and Social Sciences' },
  { value: 'ict', label: 'ICT - Information and Communications Technology' }
];

const collegePrograms = [
  { value: 'bscs', label: 'BSCS - Bachelor of Science in Computer Science' },
  { value: 'btvted', label: 'BTVTED - Bachelor of Technical-Vocational Teacher Education' },
  { value: 'bstm', label: 'BSTM - Bachelor of Science in Tourism Management' },
  { value: 'bshm', label: 'BSHM - Bachelor of Science in Hospitality Management' },
  { value: 'bsba', label: 'BSBA - Bachelor of Science in Business Administration' }
];

const btvtedMajors = [
  { value: 'Computer Hardware Servicing', label: 'Computer Hardware Servicing' },
  { value: 'Computer Programming', label: 'Computer Programming' },
  { value: 'Automotive Technology', label: 'Automotive Technology' },
  { value: 'Food Service Management', label: 'Food Service Management' }
];

const documentRequirements = [
  { id: 'form137', label: 'Form 137 (Transcript of Records)', required: false },
  { id: 'goodmoral', label: 'Good Moral Certificate', required: false },
  { id: 'birthcert', label: 'Birth Certificate', required: false },
  { id: 'idphoto', label: '2x2 ID Photo', required: false },
  { id: 'enrollmentform', label: 'Enrollment Form', required: false }
];

export function EnrollmentForm({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialData);
  const [subjects, setSubjects] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [academicCompleted, setAcademicCompleted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const fileInputRef = useRef(null);
  const totalSteps = 6;

  // Validation function for each step
  const validateStep = (step) => {
    const newErrors = {};
    const currentYear = new Date().getFullYear();
    
    switch (step) {
      case 4: // Personal & Guardian Information
        // Personal Information Validation
        if (!formData.lastName?.trim()) {
          newErrors.lastName = 'Last Name is required';
        } else if (/\d/.test(formData.lastName)) {
          newErrors.lastName = 'Last Name cannot contain numbers';
        }
        
        if (!formData.firstName?.trim()) {
          newErrors.firstName = 'First Name is required';
        } else if (/\d/.test(formData.firstName)) {
          newErrors.firstName = 'First Name cannot contain numbers';
        }
        
        if (formData.middleName && /\d/.test(formData.middleName)) {
          newErrors.middleName = 'Middle Name cannot contain numbers';
        }
        
        if (!formData.birthDate) {
          newErrors.birthDate = 'Birth Date is required';
        } else {
          const birthYear = new Date(formData.birthDate).getFullYear();
          const age = currentYear - birthYear;
          if (age < 15) {
            newErrors.birthDate = 'Student must be at least 15 years old';
          }
        }
        
        if (!formData.gender) {
          newErrors.gender = 'Gender is required';
        }
        
        // Mobile Number Validation
        if (!formData.phoneNumber?.trim()) {
          newErrors.phoneNumber = 'Mobile Number is required';
        } else {
          const phone = formData.phoneNumber.replace(/\D/g, '');
          if (phone.length !== 11) {
            newErrors.phoneNumber = 'Mobile Number must be exactly 11 digits';
          } else if (!phone.startsWith('09')) {
            newErrors.phoneNumber = 'Mobile Number must start with 09';
          }
        }
        
        // Email Validation
        if (!formData.email?.trim()) {
          newErrors.email = 'Email Address is required';
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
          }
        }
        
        // Address Validation
        if (!formData.address?.trim()) {
          newErrors.address = 'Complete Address is required';
        }
        
        // Guardian Information Validation
        if (!formData.guardianName?.trim()) {
          newErrors.guardianName = 'Guardian Name is required';
        } else if (/\d/.test(formData.guardianName)) {
          newErrors.guardianName = 'Guardian Name cannot contain numbers';
        }
        
        if (!formData.guardianRelation) {
          newErrors.guardianRelation = 'Relationship is required';
        }
        
        if (!formData.guardianPhone?.trim()) {
          newErrors.guardianPhone = 'Guardian Mobile Number is required';
        } else {
          const guardianPhone = formData.guardianPhone.replace(/\D/g, '');
          if (guardianPhone.length !== 11) {
            newErrors.guardianPhone = 'Guardian Mobile Number must be exactly 11 digits';
          } else if (!guardianPhone.startsWith('09')) {
            newErrors.guardianPhone = 'Guardian Mobile Number must start with 09';
          }
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Fetch subjects only when moving to Step 3 AND academic is completed
  useEffect(() => {
    if (currentStep === 3 && academicCompleted && formData.program && formData.semester && formData.educationLevel === 'college') {
      // Additional check for BTVTED: major must be selected
      if (formData.program === 'btvted' && !formData.major) {
        setSubjects([]);
      } else {
        fetchSubjects();
      }
    } else if (currentStep !== 3) {
      setSubjects([]);
    }
  }, [currentStep, academicCompleted, formData.program, formData.semester, formData.educationLevel, formData.major]);

  const fetchSubjects = async () => {
    setLoadingSubjects(true);
    try {
      // Build URL with program and major (if BTVTED)
      let url = `http://localhost/api/fetch_subjects.php?program=${formData.program}&semester=${formData.semester}&year_level=${Number(formData.yearLevel) || 1}`;
      if (formData.program === 'btvted' && formData.major) {
        url += `&major=${formData.major}`;
      }
      
      console.log('📚 Fetching subjects with URL:', url);
      
      const response = await fetch(url);
      const result = await response.json();
      
      console.log('📚 API Response:', result);
      
      if (result.success) {
        console.log(`✅ Loaded ${result.data.length} subjects`);
        setSubjects(result.data);
      } else {
        console.error('❌ API Error:', result.message);
        setSubjects([]);
      }
    } catch (error) {
      console.error('❌ Fetch Error:', error);
      setSubjects([]);
    } finally {
      setLoadingSubjects(false);
    }
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleSubject = (subjectId) => {
    setFormData(prev => {
      const currentSubjects = prev.selectedSubjects || [];
      if (currentSubjects.includes(subjectId)) {
        return {
          ...prev,
          selectedSubjects: currentSubjects.filter(id => id !== subjectId)
        };
      } else {
        return {
          ...prev,
          selectedSubjects: [...currentSubjects, subjectId]
        };
      }
    });
  };

  const selectAllSubjects = () => {
    if (formData.selectedSubjects?.length === subjects.length) {
      setFormData(prev => ({ ...prev, selectedSubjects: [] }));
    } else {
      setFormData(prev => ({ 
        ...prev, 
        selectedSubjects: subjects.map(s => s.id) 
      }));
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newDocs = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file: file,
      name: file.name,
      size: file.size,
      type: file.type
    }));
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...newDocs]
    }));
  };

  const removeDocument = (docId) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter(d => d.id !== docId)
    }));
  };

  // Upload file to server using FormData
  const uploadFile = async (file, documentType) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('document_type', documentType);

    try {
      const response = await fetch('http://localhost/api/upload_documents.php', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      } else {
        console.error('Upload failed:', result.message);
        return null;
      }
    } catch (error) {
      console.error('Upload error:', error);
      return null;
    }
  };

  // Handle file selection and upload
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const docId = e.target.dataset.docId;
    const doc_label = e.target.dataset.docLabel || '';

    // Show uploading state
    const newDoc = {
      id: docId,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading'
    };

    setFormData(prev => ({
      ...prev,
      documents: [
        ...prev.documents.filter(d => d.id !== docId),
        newDoc
      ]
    }));

    const fd = new FormData();
    fd.append('file', file);
    fd.append('document_type', docId);

    try {
      const resp = await fetch('http://localhost/api/upload_documents.php', {
        method: 'POST',
        body: fd
      });

      const result = await resp.json();

      if (result && result.success) {
        const data = result.data || {};
        setFormData(prev => ({
          ...prev,
          documents: prev.documents.map(d => (
            d.id === docId
              ? {
                  ...d,
                  name: data.original_filename || file.name,
                  file_path: data.file_path || data.url || data.path || '',
                  file_name: data.filename || data.file_name || '',
                  status: 'uploaded'
                }
              : d
          ))
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          documents: prev.documents.filter(d => d.id !== docId)
        }));
      }
    } catch (err) {
      setFormData(prev => ({
        ...prev,
        documents: prev.documents.filter(d => d.id !== docId)
      }));
      console.error('Upload error:', err);
    }
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) return;
    
    if (currentStep === 2) {
      // Mark academic as completed when moving to Step 3
      if (formData.program && formData.semester && (formData.program !== 'btvted' || formData.major)) {
        setAcademicCompleted(true);
      }
    }
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // Convert camelCase formData to snake_case for database
    const snakeCaseData = {
      first_name: formData.firstName,
      middle_name: formData.middleName,
      last_name: formData.lastName,
      birth_date: formData.birthDate,
      gender: formData.gender,
      civil_status: formData.civilStatus,
      nationality: formData.nationality,
      religion: formData.religion,
      address: formData.address,
      phone_number: formData.phoneNumber,
      email: formData.email,
      education_level: formData.educationLevel,
      program: formData.program,
      major: formData.program === 'btvted' ? formData.major : null,
      semester: formData.semester,
      year_level: formData.yearLevel,
      previous_school: formData.previousSchool,
      enrollee_type: formData.enrolleeType,
      guardian_name: formData.guardianName,
      guardian_relation: formData.guardianRelation,
      guardian_phone: formData.guardianPhone,
      guardian_address: formData.guardianAddress,
      selected_subjects: formData.selectedSubjects,
      status: 'pending'
    };
    // Include uploaded documents with file_path for enrollment_documents table
    snakeCaseData.enrollment_documents = (formData.documents || [])
      .filter(d => d.file_path)
      .map(d => ({
        document_type: d.id,
        file_path: d.file_path,
        file_name: d.file_name || d.filename || d.name || ''
      }));

    try {
      const response = await fetch('http://localhost/api/enrollments.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(snakeCaseData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        setIsSubmitted(true);
        setFormData(initialData);
        setCurrentStep(1);
        setAcademicCompleted(false);
      } else {
        setSubmissionError(result.message);
      }
    } catch (error) {
      setSubmissionError('Network error. Please try again.');
    }
  };

  const getStepIcon = (step) => {
    if (step < currentStep) return <Check className="w-4 h-4" />;
    if (step === 1) return <User className="w-4 h-4" />;
    if (step === 2) return <GraduationCap className="w-4 h-4" />;
    if (step === 3) return <BookOpen className="w-4 h-4" />;
    if (step === 4) return <User className="w-4 h-4" />;
    if (step === 5) return <Upload className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.enrolleeType;
      case 2:
        // For BTVTED, major is also required
        if (formData.program === 'btvted') {
          return formData.educationLevel && formData.program && formData.major && formData.semester;
        }
        return formData.educationLevel && formData.program && formData.semester;
      case 3:
        // For college, at least one subject must be selected
        if (formData.educationLevel === 'college' && subjects.length > 0) {
          return formData.selectedSubjects && formData.selectedSubjects.length > 0;
        }
        return true;
      case 4:
        return formData.firstName && formData.lastName && formData.birthDate && formData.gender &&
               formData.guardianName && formData.guardianRelation && formData.guardianPhone;
      case 5:
        // Check if required documents are uploaded
        const uploadedIds = formData.documents.map(d => d.name.toLowerCase());
        const requiredDocs = documentRequirements.filter(r => r.required);
        return requiredDocs.every(doc => uploadedIds.some(name => name.includes(doc.id)));
      case 6:
        return true;
      default:
        return false;
    }
  };

  const totalUnits = subjects
    .filter(s => formData.selectedSubjects?.includes(s.id))
    .reduce((sum, s) => sum + Number(s.units), 0);

  // Show success screen if submitted
  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <div className="space-y-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Enrollment Submitted Successfully!</h1>
            <p className="text-gray-600">Thank you for your enrollment. Your application has been received and is being processed.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">You will receive a confirmation email with your enrollment details shortly.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Progress Bar */}
      <div className="space-y-4">
        <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
        <div className="flex justify-between items-center">
          {[1, 2, 3, 4, 5, 6].map((step) => (
            <div key={step} className="flex flex-col items-center space-y-2">
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors
                ${currentStep >= step
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background border-border'
                }
              `}>
                {getStepIcon(step)}
              </div>
              <span className="text-sm hidden sm:block">
                {step === 1 && 'Enrollee Type'}
                {step === 2 && 'Academic'}
                {step === 3 && 'Subjects'}
                {step === 4 && 'Personal'}
                {step === 5 && 'Documents'}
                {step === 6 && 'Review'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {submissionError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">{submissionError}</p>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>
            {currentStep === 1 && 'Enrollee Type'}
            {currentStep === 2 && 'Academic Information'}
            {currentStep === 3 && 'Subject Selection'}
            {currentStep === 4 && 'Personal & Guardian Information'}
            {currentStep === 5 && 'Document Uploads'}
            {currentStep === 6 && 'Review & Submit'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Enrollee Type */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Select Enrollee Type *</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div 
                    className={`
                      p-4 border rounded-lg cursor-pointer transition-colors
                      ${formData.enrolleeType === 'new' 
                        ? 'bg-primary/10 border-primary' 
                        : 'hover:bg-muted/50 border-border'
                      }
                    `}
                    onClick={() => updateField('enrolleeType', 'new')}
                  >
                    <Checkbox
                      checked={formData.enrolleeType === 'new'}
                      onCheckedChange={() => updateField('enrolleeType', 'new')}
                      className="mr-2"
                    />
                    <span className="font-medium">New Student</span>
                    <p className="text-sm text-muted-foreground mt-1">First time enrolling</p>
                  </div>
                  <div 
                    className={`
                      p-4 border rounded-lg cursor-pointer transition-colors
                      ${formData.enrolleeType === 'old' 
                        ? 'bg-primary/10 border-primary' 
                        : 'hover:bg-muted/50 border-border'
                      }
                    `}
                    onClick={() => updateField('enrolleeType', 'old')}
                  >
                    <Checkbox
                      checked={formData.enrolleeType === 'old'}
                      onCheckedChange={() => updateField('enrolleeType', 'old')}
                      className="mr-2"
                    />
                    <span className="font-medium">Old Student</span>
                    <p className="text-sm text-muted-foreground mt-1">Continuing student</p>
                  </div>
                  <div 
                    className={`
                      p-4 border rounded-lg cursor-pointer transition-colors
                      ${formData.enrolleeType === 'transfer' 
                        ? 'bg-primary/10 border-primary' 
                        : 'hover:bg-muted/50 border-border'
                      }
                    `}
                    onClick={() => updateField('enrolleeType', 'transfer')}
                  >
                    <Checkbox
                      checked={formData.enrolleeType === 'transfer'}
                      onCheckedChange={() => updateField('enrolleeType', 'transfer')}
                      className="mr-2"
                    />
                    <span className="font-medium">Transfer Student</span>
                    <p className="text-sm text-muted-foreground mt-1">Coming from another school</p>
                  </div>
                  <div 
                    className={`
                      p-4 border rounded-lg cursor-pointer transition-colors
                      ${formData.enrolleeType === 'cross' 
                        ? 'bg-primary/10 border-primary' 
                        : 'hover:bg-muted/50 border-border'
                      }
                    `}
                    onClick={() => updateField('enrolleeType', 'cross')}
                  >
                    <Checkbox
                      checked={formData.enrolleeType === 'cross'}
                      onCheckedChange={() => updateField('enrolleeType', 'cross')}
                      className="mr-2"
                    />
                    <span className="font-medium">Cross Enrollee</span>
                    <p className="text-sm text-muted-foreground mt-1">Enrolled in another school</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Academic Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Education Level *</Label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="shs"
                      checked={formData.educationLevel === 'shs'}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateField('educationLevel', 'shs');
                          updateField('program', '');
                          updateField('selectedSubjects', []);
                        }
                      }}
                    />
                    <Label htmlFor="shs" className="cursor-pointer">Senior High School (SHS)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="college"
                      checked={formData.educationLevel === 'college'}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateField('educationLevel', 'college');
                          updateField('program', '');
                          updateField('selectedSubjects', []);
                        }
                      }}
                    />
                    <Label htmlFor="college" className="cursor-pointer">College</Label>
                  </div>
                </div>
              </div>

              {formData.educationLevel && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="program">
                      {formData.educationLevel === 'shs' ? 'Strand' : 'Program'} *
                    </Label>
                    <Select value={formData.program} onValueChange={(value) => {
                      updateField('program', value);
                      updateField('selectedSubjects', []);
                      // Clear major when program changes
                      if (value !== 'btvted') {
                        updateField('major', '');
                      }
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder={`Select ${formData.educationLevel === 'shs' ? 'strand' : 'program'}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {(formData.educationLevel === 'shs' ? shsPrograms : collegePrograms).map((program) => (
                          <SelectItem key={program.value} value={program.value}>
                            {program.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Conditional Major Dropdown for BTVTED */}
                  {formData.program === 'btvted' && (
                    <div className="space-y-2">
                      <Label htmlFor="major">
                        Major *
                      </Label>
                      <Select value={formData.major} onValueChange={(value) => {
                        updateField('major', value);
                        updateField('selectedSubjects', []);
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select major" />
                        </SelectTrigger>
                        <SelectContent>
                          {btvtedMajors.map((major) => (
                            <SelectItem key={major.value} value={major.value}>
                              {major.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="yearLevel">Year Level *</Label>
                    <Select value={formData.yearLevel} onValueChange={(value) => updateField('yearLevel', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year level" />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.educationLevel === 'shs' ? (
                          <>
                            <SelectItem value="11">Grade 11</SelectItem>
                            <SelectItem value="12">Grade 12</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="1">1st Year</SelectItem>
                            <SelectItem value="2">2nd Year</SelectItem>
                            <SelectItem value="3">3rd Year</SelectItem>
                            <SelectItem value="4">4th Year</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="semester">Semester *</Label>
                    <Select value={formData.semester} onValueChange={(value) => {
                      updateField('semester', value);
                      updateField('selectedSubjects', []);
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1st">1st Semester</SelectItem>
                        <SelectItem value="2nd">2nd Semester</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="previousSchool">Previous School</Label>
                <Input
                  id="previousSchool"
                  value={formData.previousSchool}
                  onChange={(e) => updateField('previousSchool', e.target.value)}
                  placeholder="Enter previous school"
                />
              </div>
            </div>
          )}

          {/* Step 3: Subject Selection */}
          {currentStep === 3 && (
            <div className="space-y-6">
              {!academicCompleted || !formData.program || !formData.semester ? (
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Please complete Academic Information first.</p>
                  <p className="text-sm">Go back to Step 2 and fill in all required fields.</p>
                </div>
              ) : formData.educationLevel === 'college' ? (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Available Subjects</h3>
                      <p className="text-sm text-muted-foreground">
                        Select subjects for {formData.semester} Semester, Year {formData.yearLevel}
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={selectAllSubjects}
                      disabled={subjects.length === 0}
                    >
                      {formData.selectedSubjects?.length === subjects.length ? 'Deselect All' : 'Select All'}
                    </Button>
                  </div>

                  {loadingSubjects ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                      <span className="ml-2">Loading subjects...</span>
                    </div>
                  ) : subjects.length > 0 ? (
                    <div className="space-y-3">
                      {subjects.map((subject) => (
                        <div 
                          key={subject.id}
                          className={`
                            flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors
                            ${formData.selectedSubjects?.includes(subject.id) 
                              ? 'bg-primary/10 border-primary' 
                              : 'hover:bg-muted/50'
                            }
                          `}
                          onClick={() => toggleSubject(subject.id)}
                        >
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              checked={formData.selectedSubjects?.includes(subject.id)}
                              onCheckedChange={() => toggleSubject(subject.id)}
                            />
                            <div>
                              <p className="font-medium">{subject.subject_code}</p>
                              <p className="text-sm text-muted-foreground">{subject.subject_title}</p>
                            </div>
                          </div>
                          <div className="text-sm font-medium">
                            {subject.units} unit{subject.units !== 1 ? 's' : ''}
                          </div>
                        </div>
                      ))}

                      {/* Total Units Summary */}
                      <div className="mt-4 p-4 bg-muted rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Total Units:</span>
                          <span className="text-lg font-bold">{totalUnits} units</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {formData.selectedSubjects?.length || 0} subject(s) selected
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No subjects available for this program and semester.</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Subject selection is not available for Senior High School yet.</p>
                  <p className="text-sm">Please proceed to the next step.</p>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Personal & Guardian Information */}
          {currentStep === 4 && (
            <div className="space-y-8">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium border-b pb-2">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => updateField('firstName', e.target.value)}
                      placeholder="Enter first name"
                      className={errors.firstName ? 'border-red-500' : ''}
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="middleName">Middle Name</Label>
                    <Input
                      id="middleName"
                      value={formData.middleName}
                      onChange={(e) => updateField('middleName', e.target.value)}
                      placeholder="Enter middle name"
                      className={errors.middleName ? 'border-red-500' : ''}
                    />
                    {errors.middleName && <p className="text-red-500 text-xs mt-1">{errors.middleName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => updateField('lastName', e.target.value)}
                      placeholder="Enter last name"
                      className={errors.lastName ? 'border-red-500' : ''}
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Birth Date *</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => updateField('birthDate', e.target.value)}
                      className={errors.birthDate ? 'border-red-500' : ''}
                    />
                    {errors.birthDate && <p className="text-red-500 text-xs mt-1">{errors.birthDate}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select value={formData.gender} onValueChange={(value) => updateField('gender', value)}>
                      <SelectTrigger className={errors.gender ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
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
                      placeholder="Enter religion"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Complete Address</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => updateField('address', e.target.value)}
                      placeholder="Enter complete address"
                      rows={2}
                      className={errors.address ? 'border-red-500' : ''}
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) => updateField('phoneNumber', e.target.value)}
                      placeholder="Enter phone number"
                      className={errors.phoneNumber ? 'border-red-500' : ''}
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
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
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
              </div>

              {/* Guardian Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium border-b pb-2">Guardian Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="guardianName">Guardian Name *</Label>
                    <Input
                      id="guardianName"
                      value={formData.guardianName}
                      onChange={(e) => updateField('guardianName', e.target.value)}
                      placeholder="Enter guardian name"
                      className={errors.guardianName ? 'border-red-500' : ''}
                    />
                    {errors.guardianName && <p className="text-red-500 text-xs mt-1">{errors.guardianName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guardianRelation">Relationship *</Label>
                    <Select value={formData.guardianRelation} onValueChange={(value) => updateField('guardianRelation', value)}>
                      <SelectTrigger className={errors.guardianRelation ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mother">Mother</SelectItem>
                        <SelectItem value="father">Father</SelectItem>
                        <SelectItem value="guardian">Guardian</SelectItem>
                        <SelectItem value="spouse">Spouse</SelectItem>
                        <SelectItem value="sibling">Sibling</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.guardianRelation && <p className="text-red-500 text-xs mt-1">{errors.guardianRelation}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guardianPhone">Guardian Phone *</Label>
                    <Input
                      id="guardianPhone"
                      value={formData.guardianPhone}
                      onChange={(e) => updateField('guardianPhone', e.target.value)}
                      placeholder="Enter guardian phone number"
                      className={errors.guardianPhone ? 'border-red-500' : ''}
                    />
                    {errors.guardianPhone && <p className="text-red-500 text-xs mt-1">{errors.guardianPhone}</p>}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="guardianAddress">Guardian Address</Label>
                    <Textarea
                      id="guardianAddress"
                      value={formData.guardianAddress}
                      onChange={(e) => updateField('guardianAddress', e.target.value)}
                      placeholder="Enter guardian address"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Document Uploads */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Document Uploads</h3>
                <p className="text-sm text-muted-foreground">Please upload the following documents (PDF, JPG, PNG). All documents are optional - you can upload them now or later.</p>
                
                <div className="space-y-3">
                  {documentRequirements.map((doc) => {
                    const uploadedDoc = formData.documents.find(d => d.id === doc.id);
                    const isUploaded = !!uploadedDoc;

                    return (
                      <div 
                        key={doc.id}
                        className={`
                          flex flex-col p-4 border rounded-lg transition-colors
                          ${isUploaded ? 'bg-green-50 border-green-500' : 'bg-muted/30 hover:bg-muted/50'}
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              checked={isUploaded}
                              className={isUploaded ? 'text-green-600' : ''}
                              disabled
                            />
                            <div>
                              <p className="font-medium">{doc.label}</p>
                              <span className="text-xs text-blue-600">Optional / To Follow</span>
                            </div>
                          </div>
                          {isUploaded && (
                            <span className="text-sm text-green-600 font-medium">✓ Uploaded</span>
                          )}
                        </div>

                        {isUploaded && uploadedDoc && (
                          <div className="mt-2 ml-8 text-sm text-muted-foreground flex items-center justify-between bg-white/50 p-2 rounded">
                            <span className="truncate">{uploadedDoc.name}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeDocument(uploadedDoc.id)}
                              className="ml-2 h-6 w-6 p-0"
                              type="button"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        )}

                        <div className="mt-3 ml-8">
                          <Button
                            type="button"
                            variant={isUploaded ? "outline" : "default"}
                            size="sm"
                            className="cursor-pointer"
                            onClick={() => {
                              if (!fileInputRef.current) return;
                              fileInputRef.current.value = null;
                              fileInputRef.current.dataset.docId = doc.id;
                              fileInputRef.current.dataset.docLabel = doc.label;
                              fileInputRef.current.click();
                            }}
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            {isUploaded ? 'Change File' : 'Select File'}
                          </Button>
                        </div>
                      </div>
                    );
                  })}

                  {/* single hidden file input triggered programmatically */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                  />
                </div>
              </div>

              {formData.documents.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Uploaded Files Summary:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {formData.documents.map((doc) => (
                      <div 
                        key={doc.id}
                        className="flex items-center justify-between p-3 border rounded-lg bg-muted/30"
                      >
                        <div className="flex items-center space-x-2 overflow-hidden">
                          <FileText className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm truncate">{doc.name}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDocument(doc.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 6: Review */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Enrollee Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Enrollee Type:</strong> {
                      formData.enrolleeType === 'new' ? 'New Student' :
                      formData.enrolleeType === 'old' ? 'Old Student' :
                      formData.enrolleeType === 'transfer' ? 'Transfer' : 'Cross Enrollee'
                    }</p>
                  </div>
                  <h3 className="text-lg font-medium">Academic Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Education Level:</strong> {formData.educationLevel === 'shs' ? 'Senior High School' : 'College'}</p>
                    <p><strong>{formData.educationLevel === 'shs' ? 'Strand' : 'Program'}:</strong> {
                      (formData.educationLevel === 'shs' ? shsPrograms : collegePrograms)
                        .find(p => p.value === formData.program)?.label
                    }</p>
                    <p><strong>Year Level:</strong> {formData.educationLevel === 'shs' ? `Grade ${formData.yearLevel}` : `${formData.yearLevel}${getOrdinalSuffix(formData.yearLevel)} Year`}</p>
                    <p><strong>Semester:</strong> {formData.semester} Semester</p>
                    <p><strong>Previous School:</strong> {formData.previousSchool || 'N/A'}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Personal Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Name:</strong> {formData.firstName} {formData.middleName} {formData.lastName}</p>
                    <p><strong>Birth Date:</strong> {formData.birthDate}</p>
                    <p><strong>Gender:</strong> {formData.gender}</p>
                    <p><strong>Civil Status:</strong> {formData.civilStatus || 'N/A'}</p>
                    <p><strong>Nationality:</strong> {formData.nationality}</p>
                    <p><strong>Religion:</strong> {formData.religion || 'N/A'}</p>
                    <p><strong>Address:</strong> {formData.address || 'N/A'}</p>
                    <p><strong>Phone:</strong> {formData.phoneNumber || 'N/A'}</p>
                    <p><strong>Email:</strong> {formData.email || 'N/A'}</p>
                  </div>
                  <h3 className="text-lg font-medium">Guardian Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Guardian Name:</strong> {formData.guardianName}</p>
                    <p><strong>Relationship:</strong> {formData.guardianRelation}</p>
                    <p><strong>Phone:</strong> {formData.guardianPhone}</p>
                    <p><strong>Address:</strong> {formData.guardianAddress || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Selected Subjects Summary */}
              {formData.educationLevel === 'college' && subjects.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Selected Subjects</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-muted">
                        <tr>
                          <th className="px-4 py-2 text-left">Subject Code</th>
                          <th className="px-4 py-2 text-left">Subject Title</th>
                          <th className="px-4 py-2 text-right">Units</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subjects
                          .filter(s => formData.selectedSubjects?.includes(s.id))
                          .map((subject, index) => (
                            <tr key={subject.id} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                              <td className="px-4 py-2 font-medium">{subject.subject_code}</td>
                              <td className="px-4 py-2">{subject.subject_title}</td>
                              <td className="px-4 py-2 text-right">{subject.units}</td>
                            </tr>
                          ))}
                        <tr className="bg-primary/10 font-medium">
                          <td className="px-4 py-2" colSpan={2}>Total Units</td>
                          <td className="px-4 py-2 text-right">{totalUnits}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Documents Summary */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Uploaded Documents</h3>
                {formData.documents.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {formData.documents.map((doc) => (
                      <div 
                        key={doc.id}
                        className="p-2 border rounded-lg text-sm bg-muted/30"
                      >
                        {doc.name}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No documents uploaded.</p>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
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
                disabled={!isStepValid()}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="flex items-center gap-2"
              >
                Submit Enrollment
                <Check className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper function for ordinal suffixes
function getOrdinalSuffix(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}
