# FEPC Enrollment Portal System Flowchart

## System Architecture & Data Flow

```mermaid
flowchart TD
    subgraph "User Layer"
        A[Student Browser]
        B[Admin Browser]
    end

    subgraph "Frontend Layer (React + Vite)"
        C[App.jsx<br/>Main Router]
        D[EnhancedEnrollmentForm.jsx<br/>Multi-step Form]
        E[AdminDashboard.jsx<br/>Management Interface]
        F[Chat.client.jsx<br/>AI Assistant]
        G[apiService.js<br/>API Client]
    end

    subgraph "Network Layer"
        H[HTTP/HTTPS<br/>Requests]
        I[File Upload<br/>FormData]
        J[CORS Headers<br/>localhost:3001]
    end

    subgraph "Backend Layer (PHP)"
        K[enrollments.php<br/>CRUD API]
        L[auth.php<br/>Authentication]
        M[documents.php<br/>File Upload]
        N[programs.php<br/>Program Data]
        O[images.php<br/>Image Assets]
    end

    subgraph "Database Layer (MySQL)"
        P[(enrollments<br/>table)]
        Q[(programs<br/>table)]
        R[(enrollment_documents<br/>table)]
        S[(images<br/>table)]
    end

    subgraph "File Storage"
        T[/uploads/<br/>documents/]
        U[/uploads/<br/>images/]
    end

    subgraph "Offline Fallback"
        V[(localStorage<br/>enrollments)]
        W[(localStorage<br/>documents)]
    end

    A --> C
    B --> C
    C --> D
    C --> E
    C --> F
    D --> G
    E --> G
    F --> G
    G --> H
    G --> I
    H --> K
    H --> L
    H --> M
    H --> N
    H --> O
    I --> M
    I --> O
    K --> P
    L --> P
    M --> R
    M --> T
    N --> Q
    O --> S
    O --> U

    G -.->|API Unavailable| V
    G -.->|API Unavailable| W

    classDef frontend fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef backend fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef database fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    classDef network fill:#fff3e0,stroke:#e65100,stroke-width:2px
    classDef storage fill:#fce4ec,stroke:#880e4f,stroke-width:2px
    classDef offline fill:#f5f5f5,stroke:#424242,stroke-width:2px

    class C,D,E,F,G frontend
    class K,L,M,N,O backend
    class P,Q,R,S database
    class H,I,J network
    class T,U storage
    class V,W offline
```

## Enrollment Process Flow

```mermaid
flowchart TD
    Start([Student Accesses Portal]) --> Type{Select Enrollee Type}
    Type -->|New Student| Personal[Personal Information]
    Type -->|Transfer Student| Personal
    Type -->|Cross Enrollee| Personal
    Type -->|Returning Student| Personal

    Personal --> Academic[Academic Information<br/>Program Selection]
    Academic --> Guardian[Guardian Information<br/>Emergency Contact]
    Guardian --> Docs{Requires Documents?}

    Docs -->|Yes<br/>New/Transfer| Upload[Upload Documents<br/>ID, Certificates, Forms]
    Docs -->|No<br/>Cross/Old| Review[Review Information]

    Upload --> Review[Review Information]
    Review --> Submit[Submit Enrollment]
    Submit --> API[API Validation<br/>Server Processing]
    API --> Pending[Status: Pending<br/>Awaiting Approval]

    Pending --> AdminLogin[Admin Login<br/>Authentication]
    AdminLogin --> Dashboard[Admin Dashboard<br/>View Enrollments]
    Dashboard --> ReviewDetails[Review Student Details<br/>Check Documents]
    ReviewDetails --> Decision{Admin Decision}

    Decision -->|Approve| Approved[Update Status: Approved<br/>Enrollment Complete]
    Decision -->|Reject| Rejected[Update Status: Rejected<br/>Notify Student]
    Decision -->|Pending| Pending

    Approved --> End([Process Complete])
    Rejected --> End

    classDef process fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef decision fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef action fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
    classDef startend fill:#f5f5f5,stroke:#424242,stroke-width:3px

    class Start,End startend
    class Type,Docs,Decision decision
    class Personal,Academic,Guardian,Upload,Review,Submit,API,Pending,AdminLogin,Dashboard,ReviewDetails process
    class Approved,Rejected action
```

## Process Description

### Student Enrollment Flow
1. **Portal Access**: Student visits the enrollment website (localhost:3001)
2. **Enrollee Type**: Select from New, Transfer, Cross-enrollee, or Returning student
3. **Personal Info**: Name, birth date, gender, contact information, address
4. **Academic Info**: Education level (SHS/College), program/strand, year level, semester
5. **Guardian Info**: Emergency contact name, relationship, phone, address
6. **Document Upload**: Required for new/transfer students (ID photo, certificates, forms)
7. **Review & Submit**: Final verification of all entered information
8. **API Processing**: Server-side validation and database storage
9. **Status Pending**: Initial enrollment status set to "pending"

### Admin Approval Flow
1. **Authentication**: Admin login with username/password (admin/admin123)
2. **Dashboard Access**: View all enrollments with search/filter capabilities
3. **Document Review**: Examine uploaded documents and student information
4. **Decision Making**: Approve, reject, or keep pending based on requirements
5. **Status Update**: Update enrollment status in database via API
6. **Notification**: System reflects status changes to students

## Technical Data Flow

### Frontend → Backend
- **Form Data**: JSON payload with student information
- **File Uploads**: FormData with document files (JPEG/PNG/PDF < 5MB)
- **Authentication**: POST request with credentials
- **Status Updates**: PUT requests with enrollment ID and new status

### Backend → Database
- **Enrollment Creation**: INSERT into enrollments table
- **Document Storage**: File save + INSERT into enrollment_documents table
- **Status Updates**: UPDATE enrollments SET status = ?
- **Data Retrieval**: SELECT with JOINs for complete enrollment records

### Offline Fallback
- **localStorage**: Browser storage for API unavailability
- **Data Persistence**: Enrollments and documents saved locally
- **Sync Capability**: Automatic sync when connection restored

## Key System Components

### Frontend Components
- **App.jsx**: Main application router and state management
- **EnhancedEnrollmentForm.jsx**: Multi-step enrollment wizard
- **AdminDashboard.jsx**: Administrative management interface
- **apiService.js**: Centralized API client with fallback logic

### Backend APIs
- **enrollments.php**: CRUD operations for enrollment records
- **auth.php**: User authentication and session management
- **documents.php**: File upload and document management
- **programs.php**: Academic program data retrieval
- **images.php**: Logo and image asset management

### Database Tables
- **enrollments**: Student enrollment data and status
- **programs**: Available academic programs and requirements
- **enrollment_documents**: Uploaded document tracking
- **images**: Image assets and metadata

## Error Handling & Validation

### Client-Side Validation
- **Real-time Feedback**: Form validation with error messages
- **File Validation**: Type, size, and format checking
- **Required Fields**: Mandatory field enforcement
- **Data Format**: Email, phone, date validation

### Server-Side Validation
- **Data Sanitization**: Input cleaning and validation
- **Duplicate Prevention**: Email uniqueness checking
- **File Security**: Upload restrictions and virus scanning
- **Business Rules**: Academic requirement validation

### Error Recovery
- **API Fallback**: localStorage for offline operation
- **Graceful Degradation**: Continued functionality without full features
- **User Feedback**: Clear error messages and recovery instructions

---
*This comprehensive flowchart shows both the system architecture and enrollment workflow for the FEPC Enrollment Portal, providing a complete technical and process overview.*
