const API_BASE_URL = 'http://localhost:8080';

/**
 * @typedef {Object} EnrollmentData
 * @property {string} firstName
 * @property {string} middleName
 * @property {string} lastName
 * @property {string} birthDate
 * @property {string} gender
 * @property {string} civilStatus
 * @property {string} nationality
 * @property {string} religion
 * @property {string} address
 * @property {string} phoneNumber
 * @property {string} email
 * @property {'shs'|'college'|''} educationLevel
 * @property {string} yearLevel
 * @property {string} program
 * @property {string} semester
 * @property {string} previousSchool
 * @property {'new'|'cross'|'transfer'|'old'|''} enrolleeType
 * @property {string} guardianName
 * @property {string} guardianRelation
 * @property {string} guardianPhone
 * @property {string} guardianAddress
 */

/**
 * @typedef {EnrollmentData & {
 *   id: string,
 *   enrollmentDate: string,
 *   status: 'pending' | 'approved' | 'rejected',
 *   programName?: string,
 *   documentsSubmitted?: boolean,
 *   documentList?: string[]
 * }} EnrollmentRecord
 */

/**
 * @typedef {Object} Program
 * @property {number} id
 * @property {string} code
 * @property {string} name
 * @property {string} description
 * @property {'shs'|'college'} educationLevel
 * @property {string} duration
 * @property {string} requirements
 * @property {string} careerProspects
 */

/**
 * @typedef {Object} ImageData
 * @property {number} id
 * @property {string} filename
 * @property {string} originalFilename
 * @property {string} url
 * @property {number} fileSize
 * @property {string} mimeType
 * @property {'logo'|'banner'|'program'|'general'} imageType
 * @property {string} uploadedAt
 */

/**
 * @typedef {Object} DocumentUpload
 * @property {number} id
 * @property {string} enrollmentId
 * @property {string} documentType
 * @property {string} filename
 * @property {string} originalFilename
 * @property {string} url
 * @property {string} uploadedAt
 */

export const REQUIRED_DOCUMENTS = {
  new: [
    { type: 'good_moral', label: 'Certificate of Good Moral Character', required: true },
    { type: 'form_137', label: 'Form 137 (Report Card)', required: true },
    { type: 'birth_certificate', label: 'Birth Certificate (PSA)', required: true },
    { type: 'id_photo', label: '2x2 ID Photo', required: true }
  ],
  transfer: [
    { type: 'good_moral', label: 'Certificate of Good Moral Character', required: true },
    { type: 'form_137', label: 'Form 137 (Report Card)', required: true },
    { type: 'transfer_credential', label: 'Transfer Credential', required: true },
    { type: 'birth_certificate', label: 'Birth Certificate (PSA)', required: true },
    { type: 'id_photo', label: '2x2 ID Photo', required: true }
  ],
  cross: [
    { type: 'enrollment_certificate', label: 'Certificate of Enrollment', required: true },
    { type: 'grade_slip', label: 'Current Grade Slip', required: true },
    { type: 'id_photo', label: '2x2 ID Photo', required: true }
  ],
  old: [
    { type: 'id_photo', label: '2x2 ID Photo', required: true }
  ]
};

class APIService {
  async fetchAPI(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, { ...defaultOptions, ...options });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Enrollment methods
  async createEnrollment(data) {
    try {
      return await this.fetchAPI('/api/enrollments.php', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch (error) {
      // Fallback to localStorage if API fails
      console.warn('API unavailable, using localStorage:', error);
      const enrollments = this.getStoredEnrollments();
      const newEnrollment = {
        ...data,
        id: Date.now().toString(),
        enrollmentDate: new Date().toLocaleDateString(),
        status: 'pending',
        documentsSubmitted: false,
        documentList: []
      };
      enrollments.push(newEnrollment);
      localStorage.setItem('fepc-enrollments', JSON.stringify(enrollments));
      return { success: true, message: 'Enrollment saved locally', enrollment_id: parseInt(newEnrollment.id) };
    }
  }

  async getEnrollments() {
    try {
      return await this.fetchAPI('/api/enrollments.php');
    } catch (error) {
      console.warn('API unavailable, using localStorage:', error);
      const enrollments = this.getStoredEnrollments();
      return { success: true, data: enrollments, total: enrollments.length };
    }
  }

  async updateEnrollmentStatus(id, status) {
    try {
      return await this.fetchAPI('/api/enrollments.php', {
        method: 'PUT',
        body: JSON.stringify({ id, status }),
      });
    } catch (error) {
      console.warn('API unavailable, using localStorage:', error);
      const enrollments = this.getStoredEnrollments();
      const updatedEnrollments = enrollments.map(enrollment =>
        enrollment.id === id ? { ...enrollment, status } : enrollment
      );
      localStorage.setItem('fepc-enrollments', JSON.stringify(updatedEnrollments));
      return { success: true, message: `Enrollment ${status} locally` };
    }
  }

  // Document upload methods
  async uploadDocument(enrollmentId, documentType, file) {
    try {
      const formData = new FormData();
      formData.append('document', file);
      formData.append('enrollment_id', enrollmentId);
      formData.append('document_type', documentType);

      const response = await fetch(`${API_BASE_URL}/api/documents.php`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Upload failed' }));
        throw new Error(error.message);
      }

      return await response.json();
    } catch (error) {
      console.error('Document upload failed:', error);
      // Store in localStorage as fallback
      const stored = localStorage.getItem(`documents-${enrollmentId}`) || '[]';
      const documents = JSON.parse(stored);
      documents.push({
        id: Date.now(),
        enrollmentId,
        documentType,
        filename: file.name,
        uploadedAt: new Date().toISOString()
      });
      localStorage.setItem(`documents-${enrollmentId}`, JSON.stringify(documents));
      return { success: true, message: 'Document saved locally (offline mode)' };
    }
  }

  async getDocuments(enrollmentId) {
    try {
      return await this.fetchAPI(`/api/documents.php?enrollment_id=${enrollmentId}`);
    } catch (error) {
      console.warn('API unavailable, using localStorage:', error);
      const stored = localStorage.getItem(`documents-${enrollmentId}`) || '[]';
      return { success: true, data: JSON.parse(stored) };
    }
  }

  // Program methods
  async getPrograms(level) {
    try {
      const endpoint = level ? `/api/programs.php?level=${level}` : '/api/programs.php';
      return await this.fetchAPI(endpoint);
    } catch (error) {
      console.warn('API unavailable, using fallback data:', error);
      return { success: true, data: this.getFallbackPrograms(level) };
    }
  }

  // Authentication methods
  async login(username, password) {
    try {
      return await this.fetchAPI('/api/auth.php', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
    } catch (error) {
      console.warn('API unavailable, using fallback auth:', error);
      if (username === 'admin' && password === 'admin123') {
        return {
          success: true,
          message: 'Login successful (offline mode)',
          user: { id: 1, username: 'admin', fullName: 'System Administrator' }
        };
      }
      return { success: false, message: 'Invalid credentials' };
    }
  }

  // Image methods
  async getImages(type) {
    try {
      const endpoint = type ? `/api/images.php?type=${type}` : '/api/images.php';
      return await this.fetchAPI(endpoint);
    } catch (error) {
      console.warn('API unavailable for images:', error);
      return { success: false, data: [] };
    }
  }

  async uploadImage(file, imageType = 'general') {
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('image_type', imageType);

      const response = await fetch(`${API_BASE_URL}/api/images.php`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Upload failed' }));
        throw new Error(error.message);
      }

      return await response.json();
    } catch (error) {
      console.error('Image upload failed:', error);
      return { success: false, message: error instanceof Error ? error.message : 'Upload failed' };
    }
  }

  async deleteImage(id) {
    try {
      return await this.fetchAPI('/api/images.php', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      });
    } catch (error) {
      console.error('Image deletion failed:', error);
      return { success: false, message: 'Failed to delete image' };
    }
  }

  // Utility methods
  getStoredEnrollments() {
    const stored = localStorage.getItem('fepc-enrollments');
    return stored ? JSON.parse(stored) : [];
  }

  getFallbackPrograms(level) {
    const allPrograms = [
      // SHS Programs
      {
        id: 1,
        code: 'ABM',
        name: 'Accountancy, Business and Management',
        description: 'This strand is designed for students who plan to take up business-related courses in college. It covers fundamental concepts in business operations, accounting principles, financial literacy, and marketing strategies.',
        educationLevel: 'shs',
        duration: '2 Years',
        requirements: 'Grade 10 completion with satisfactory grades, Basic Math proficiency, Interest in business and finance',
        careerProspects: 'Business Manager, Accountant, Financial Analyst, Marketing Specialist, Entrepreneur, Banking Officer, Sales Manager'
      },
      {
        id: 2,
        code: 'IA',
        name: 'Industrial Arts',
        description: 'This strand focuses on developing technical skills in various industrial trades and crafts. Students learn practical skills in carpentry, welding, electrical work, plumbing, automotive mechanics, and other technical fields.',
        educationLevel: 'shs',
        duration: '2 Years',
        requirements: 'Grade 10 completion, Physical fitness for hands-on work, Interest in technical and mechanical work',
        careerProspects: 'Skilled Tradesperson, Technical Supervisor, Manufacturing Technician, Maintenance Specialist, Construction Worker, Automotive Mechanic'
      },
      {
        id: 3,
        code: 'HE',
        name: 'Home Economics',
        description: 'This strand prepares students for careers in hospitality, culinary arts, fashion design, and home management. It emphasizes practical life skills, food preparation, nutrition, textile arts, and entrepreneurship.',
        educationLevel: 'shs',
        duration: '2 Years',
        requirements: 'Grade 10 completion, Creativity and artistic sense, Interest in culinary arts and fashion',
        careerProspects: 'Chef, Fashion Designer, Hotel Manager, Caterer, Nutritionist, Interior Designer, Restaurant Owner, Event Planner'
      },
      {
        id: 4,
        code: 'HUMSS',
        name: 'Humanities and Social Sciences',
        description: 'This strand is perfect for students interested in social sciences, literature, philosophy, and human behavior. It develops critical thinking, communication skills, and cultural awareness.',
        educationLevel: 'shs',
        duration: '2 Years',
        requirements: 'Grade 10 completion with good grades in English and Social Studies, Strong reading and writing skills',
        careerProspects: 'Teacher, Journalist, Social Worker, Psychologist, Lawyer, Government Employee, Writer, Communications Specialist'
      },
      {
        id: 5,
        code: 'ICT',
        name: 'Information and Communications Technology',
        description: 'This strand introduces students to the world of technology, covering computer programming, web development, digital graphics, and network administration.',
        educationLevel: 'shs',
        duration: '2 Years',
        requirements: 'Grade 10 completion with good grades in Math and Science, Basic computer literacy, Logical thinking',
        careerProspects: 'Software Developer, Web Designer, IT Support Specialist, Network Administrator, Database Administrator, Digital Marketing Specialist'
      },
      // College Programs
      {
        id: 6,
        code: 'BSCS',
        name: 'Bachelor of Science in Computer Science',
        description: 'A comprehensive program covering advanced software development, algorithms, data structures, artificial intelligence, and emerging technologies.',
        educationLevel: 'college',
        duration: '4 Years',
        requirements: 'SHS Diploma or equivalent, Strong foundation in Mathematics and Logic, Programming aptitude test',
        careerProspects: 'Software Engineer, Systems Analyst, Database Administrator, AI Specialist, Cybersecurity Expert, Mobile App Developer, IT Consultant'
      },
      {
        id: 7,
        code: 'BTVTED',
        name: 'Bachelor of Technical-Vocational Teacher Education',
        description: 'This program prepares graduates to become competent technical-vocational education teachers in various specializations.',
        educationLevel: 'college',
        duration: '4 Years',
        requirements: 'SHS Diploma with good academic standing, Teaching aptitude and communication skills, Technical background preferred',
        careerProspects: 'Technical Education Teacher, Training Specialist, Curriculum Developer, Vocational Counselor, Corporate Trainer'
      },
      {
        id: 8,
        code: 'BSTM',
        name: 'Bachelor of Science in Tourism Management',
        description: 'Comprehensive training in tourism operations, destination management, hospitality services, and sustainable tourism development.',
        educationLevel: 'college',
        duration: '4 Years',
        requirements: 'SHS Diploma, Good communication and interpersonal skills, Service orientation, Physical fitness for travel',
        careerProspects: 'Tourism Officer, Travel Agent, Hotel Manager, Tour Guide, Event Coordinator, Resort Manager, Airline Staff'
      },
      {
        id: 9,
        code: 'BSHM',
        name: 'Bachelor of Science in Hospitality Management',
        description: 'Focuses on hotel operations, restaurant management, food service excellence, and customer service in the hospitality industry.',
        educationLevel: 'college',
        duration: '4 Years',
        requirements: 'SHS Diploma, Service-oriented personality, Good grooming and presentation, Communication skills',
        careerProspects: 'Hotel Manager, Restaurant Manager, Food Service Director, Catering Manager, Resort Operations Manager, Guest Relations Manager'
      },
      {
        id: 10,
        code: 'BSBA',
        name: 'Bachelor of Science in Business Administration',
        description: 'Comprehensive business education covering management principles, marketing strategies, financial management, human resources, and entrepreneurship.',
        educationLevel: 'college',
        duration: '4 Years',
        requirements: 'SHS Diploma with good academic record, Leadership potential, Analytical and critical thinking skills',
        careerProspects: 'Business Manager, Marketing Manager, Financial Analyst, Human Resources Specialist, Operations Manager, Business Consultant, Entrepreneur'
      }
    ];

    return level ? allPrograms.filter(p => p.educationLevel === level) : allPrograms;
  }
}

export const apiService = new APIService();
