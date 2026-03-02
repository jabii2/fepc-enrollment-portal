import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Users,
  GraduationCap,
  BarChart3,
  Search,
  Filter,
  Download,
  Eye,
  LogOut,
  School,
  RefreshCw,
  FileText,
  ExternalLink,
  Calendar
} from 'lucide-react';
import { apiService } from '../services/api';

export function AdminDashboard({ enrollments, onLogout, onUpdateStatus, onRefresh }) {
  const [enrollees, setEnrollees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterProgram, setFilterProgram] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterGender, setFilterGender] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [enrollmentDocuments, setEnrollmentDocuments] = useState([]);
  const [loadingDocuments, setLoadingDocuments] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [notification, setNotification] = useState('');

  // Fetch enrollees from API (using enrollments.php which connects to enrollments table)
  const fetchEnrollees = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost/api/enrollments.php');
      const result = await response.json();
      if (result.success) {
        setEnrollees(result.data);
      } else {
        console.error('Failed to fetch enrollees:', result.message);
        setEnrollees([]);
      }
    } catch (error) {
      console.error('Error fetching enrollees:', error);
      setEnrollees([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on initial load
  useEffect(() => {
    fetchEnrollees();
  }, []);

  // Handle refresh button click
  const handleRefresh = () => {
    fetchEnrollees();
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const updateEnrollmentStatus = async (enrollmentId, status) => {
    try {
      const resp = await fetch('http://localhost/api/update_enrollment_status.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enrollment_id: enrollmentId, status })
      });
      const result = await resp.json();
      if (result.success) {
        showNotification('Status updated successfully');
        setDialogOpen(false);
        setSelectedEnrollment(null);
        setEnrollmentDocuments([]);
        fetchEnrollees();
      } else {
        showNotification(result.message || 'Failed to update status');
      }
    } catch (err) {
      console.error('Failed to update status', err);
      showNotification('Network error while updating status');
    }
  };

  // Use enrollees state for filtering (NOT enrollments prop) - with Optional Chaining and database column names
  const filteredEnrollments = Array.isArray(enrollees) ? enrollees.filter(enrollment => {
    const matchesSearch = 
      enrollment?.first_name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      enrollment?.last_name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      enrollment?.email?.toLowerCase()?.includes(searchTerm.toLowerCase());
    
    const matchesLevel = filterLevel === 'all' || enrollment?.education_level === filterLevel;
    const matchesProgram = filterProgram === 'all' || enrollment?.program === filterProgram;
    const matchesStatus = filterStatus === 'all' || enrollment?.status === filterStatus;
    const matchesGender = filterGender === 'all' || enrollment?.gender === filterGender;
    
    let matchesDate = true;
    if (startDate || endDate) {
      const enrollmentDate = new Date(enrollment?.created_at).toISOString().split('T')[0];
      if (startDate && enrollmentDate < startDate) matchesDate = false;
      if (endDate && enrollmentDate > endDate) matchesDate = false;
    }

    return matchesSearch && matchesLevel && matchesProgram && matchesStatus && matchesGender && matchesDate;
  }) : [];

  // Validate enrollees is an array before using .map()
  const validEnrollees = Array.isArray(enrollees) ? enrollees : [];

  // Get unique programs
  const uniquePrograms = Array.isArray(enrollees) 
    ? [...new Set(enrollees.map(e => e?.program).filter(Boolean))]
    : [];

  // Get programs filtered by selected education level
  const programsByLevel = Array.isArray(enrollees)
    ? filterLevel === 'all'
      ? uniquePrograms
      : [...new Set(enrollees
          .filter(e => e?.education_level === filterLevel)
          .map(e => e?.program)
          .filter(Boolean))]
    : [];

  // Use enrollees state for stats (NOT enrollments prop) - with Optional Chaining and database column names
  const stats = {
    total: Array.isArray(enrollees) ? enrollees.length : 0,
    pending: Array.isArray(enrollees) ? enrollees.filter(e => e?.status === 'pending').length : 0,
    approved: Array.isArray(enrollees) ? enrollees.filter(e => e?.status === 'approved').length : 0,
    rejected: Array.isArray(enrollees) ? enrollees.filter(e => e?.status === 'rejected').length : 0,
    shs: Array.isArray(enrollees) ? enrollees.filter(e => e?.education_level === 'shs').length : 0,
    college: Array.isArray(enrollees) ? enrollees.filter(e => e?.education_level === 'college').length : 0,
    shsMale: Array.isArray(enrollees) ? enrollees.filter(e => e?.education_level === 'shs' && e?.gender === 'male').length : 0,
    shsFemale: Array.isArray(enrollees) ? enrollees.filter(e => e?.education_level === 'shs' && e?.gender === 'female').length : 0,
    collegeMale: Array.isArray(enrollees) ? enrollees.filter(e => e?.education_level === 'college' && e?.gender === 'male').length : 0,
    collegeFemale: Array.isArray(enrollees) ? enrollees.filter(e => e?.education_level === 'college' && e?.gender === 'female').length : 0
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    }
  };

  const formatYearLevel = (yearLevel, educationLevel) => {
    if (educationLevel === 'shs') {
      if (yearLevel === 'Grade 11') return 'G11';
      if (yearLevel === 'Grade 12') return 'G12';
      return yearLevel;
    } else if (educationLevel === 'college') {
      if (yearLevel === '1st Year') return '1st';
      if (yearLevel === '2nd Year') return '2nd';
      if (yearLevel === '3rd Year') return '3rd';
      if (yearLevel === '4th Year') return '4th';
      return yearLevel;
    }
    return yearLevel;
  };

  const loadEnrollmentDocuments = async (enrollmentId) => {
    setLoadingDocuments(true);
    try {
      const response = await apiService.getDocuments(enrollmentId);
      if (response.success) {
        setEnrollmentDocuments(response.data);
      } else {
        setEnrollmentDocuments([]);
      }
    } catch (error) {
      console.error('Failed to load documents:', error);
      setEnrollmentDocuments([]);
    } finally {
      setLoadingDocuments(false);
    }
  };

  const exportToCSV = () => {
    const headers = ['Full Name', 'Level', 'Program/Strand', 'Status', 'Gender', 'Email', 'Contact Number', 'Date Enrolled'];
    const csvContent = [
      headers.join(','),
      ...filteredEnrollments.map(enrollment => {
        const fullName = `${(enrollment?.first_name || '')} ${(enrollment?.middle_name || '')} ${(enrollment?.last_name || '')}`.trim();
        const level = enrollment?.education_level ? enrollment.education_level.toUpperCase() : 'N/A';
        const program = enrollment?.program ? enrollment.program.toUpperCase() : 'N/A';
        const status = enrollment?.status ? enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1) : 'N/A';
        const gender = enrollment?.gender ? enrollment.gender.charAt(0).toUpperCase() + enrollment.gender.slice(1) : 'N/A';
        const email = enrollment?.email || 'N/A';
        const phone = enrollment?.phone_number || 'N/A';
        const dateEnrolled = enrollment?.created_at || 'N/A';
        
        return [fullName, level, program, status, gender, email, phone, dateEnrolled]
          .map(val => typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : `"${val}"`)
          .join(',');
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Enrollees_Report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <School className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-xl font-semibold">FEPC Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Enrollment Management System</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {loading && (
                <span className="text-sm text-gray-500 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Loading...
                </span>
              )}
              <Button
                onClick={onLogout}
                variant="outline"
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-gray-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Enrollments</p>
                  <p className="text-3xl font-bold">{stats.total}</p>
                </div>
                <Users className="w-8 h-8 text-primary-700" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-gray-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-3xl font-bold text-secondary-500">{stats.pending}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-secondary-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Approved</p>
                  <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-primary-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Rejected</p>
                  <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats - SHS and College Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white border-gray-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">SHS Students</p>
                  <p className="text-3xl font-bold text-secondary-600">{stats.shs}</p>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span className="text-primary-700">
                      <span className="font-medium">Male:</span> {stats.shsMale}
                    </span>
                    <span className="text-pink-600">
                      <span className="font-medium">Female:</span> {stats.shsFemale}
                    </span>
                  </div>
                </div>
                <GraduationCap className="w-8 h-8 text-primary-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">College Students</p>
                  <p className="text-3xl font-bold text-secondary-600">{stats.college}</p>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span className="text-primary-700">
                      <span className="font-medium">Male:</span> {stats.collegeMale}
                    </span>
                    <span className="text-pink-600">
                      <span className="font-medium">Female:</span> {stats.collegeFemale}
                    </span>
                  </div>
                </div>
                <GraduationCap className="w-8 h-8 text-secondary-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notification */}
        {notification && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-sm">{notification}</p>
          </div>
        )}

        {/* Filters and Actions */}
        <Card className="mb-6 bg-white border-gray-100">
          <CardContent className="p-3">
            <div className="flex flex-row items-center gap-2 flex-nowrap overflow-x-auto pb-2">
              {/* Search Bar */}
              <div className="relative flex-shrink-0">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-9 text-sm w-48"
                  style={{ paddingLeft: '35px' }}
                />
              </div>

              {/* Education Level Dropdown */}
              <div className="flex-shrink-0 w-32">
                <Select value={filterLevel} onValueChange={setFilterLevel}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="shs">SHS</SelectItem>
                    <SelectItem value="college">College</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Program Dropdown (NEW) */}
              <div className="flex-shrink-0 w-40">
                <Select value={filterProgram} onValueChange={setFilterProgram}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="Program" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Programs</SelectItem>
                    {programsByLevel.map(program => (
                      <SelectItem key={program} value={program}>
                        {program?.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Status Dropdown */}
              <div className="flex-shrink-0 w-32">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Gender Dropdown */}
              <div className="flex-shrink-0 w-40">
                <Select value={filterGender} onValueChange={setFilterGender}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="All Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Gender</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date Range Filter Icon */}
              <Dialog open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 px-2 flex-shrink-0"
                    title={startDate || endDate ? `${startDate ? startDate : 'Start'} - ${endDate ? endDate : 'End'}` : 'Filter by date range'}
                  >
                    <Calendar className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-96">
                  <DialogHeader>
                    <DialogTitle>Filter by Date Range</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="start-date" className="mb-2 block">Start Date</Label>
                      <Input
                        id="start-date"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <Label htmlFor="end-date" className="mb-2 block">End Date</Label>
                      <Input
                        id="end-date"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button
                        onClick={() => {
                          setStartDate('');
                          setEndDate('');
                        }}
                        variant="outline"
                        className="flex-1"
                      >
                        Clear Dates
                      </Button>
                      <Button
                        onClick={() => setDatePickerOpen(false)}
                        className="flex-1"
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Action Buttons - Grouped at the end */}
              <div className="flex gap-1 ml-auto flex-shrink-0">
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterLevel('all');
                    setFilterProgram('all');
                    setFilterStatus('all');
                    setFilterGender('all');
                    setStartDate('');
                    setEndDate('');
                  }}
                  variant="outline"
                  size="sm"
                  className="h-9 px-2 text-xs"
                  title="Clear all filters"
                >
                  Clear
                </Button>

                <Button
                  onClick={handleRefresh}
                  variant="outline"
                  size="sm"
                  className="h-9 px-2"
                  title="Refresh data"
                >
                  <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                </Button>

                <Button
                  onClick={exportToCSV}
                  size="sm"
                  className="h-9 px-2"
                  title="Export filtered data as CSV"
                >
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enrollments Table */}
        <Card>
          <CardHeader>
            <CardTitle>Enrollment Records ({filteredEnrollments.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="w-8 h-8 animate-spin text-gray-400" />
                <span className="ml-2 text-gray-500">Loading enrollments...</span>
              </div>
            ) : filteredEnrollments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No enrollments found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Program</TableHead>
                      <TableHead>Year Level</TableHead>
                      <TableHead>Semester</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEnrollments.map((enrollment) => (
                      <TableRow key={enrollment.id}>
                        <TableCell>
                          {enrollment?.first_name} {enrollment?.middle_name} {enrollment?.last_name}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {enrollment?.education_level?.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {enrollment?.enrollee_type?.charAt(0)?.toUpperCase() + enrollment?.enrollee_type?.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{enrollment?.program?.toUpperCase()}</TableCell>
                        <TableCell>{formatYearLevel(enrollment?.year_level, enrollment?.education_level)}</TableCell>
                        <TableCell>{enrollment?.semester}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{enrollment?.email}</div>
                            <div className="text-gray-500">{enrollment?.phone_number}</div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(enrollment?.status)}</TableCell>
                        <TableCell>{enrollment?.created_at}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                                <Dialog open={dialogOpen} onOpenChange={(val) => {
                                  setDialogOpen(val);
                                  if (!val) {
                                    setSelectedEnrollment(null);
                                    setEnrollmentDocuments([]);
                                  }
                                }}>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setSelectedEnrollment(enrollment);
                                    // If enrollment already includes documents from the API, use them
                                    if (Array.isArray(enrollment.documents) && enrollment.documents.length > 0) {
                                      setEnrollmentDocuments(enrollment.documents);
                                    } else {
                                      loadEnrollmentDocuments(enrollment.id);
                                    }
                                    setDialogOpen(true);
                                  }}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Enrollment Details</DialogTitle>
                                </DialogHeader>
                                {selectedEnrollment && (
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label>Full Name</Label>
                                        <p>{selectedEnrollment?.first_name} {selectedEnrollment?.middle_name} {selectedEnrollment?.last_name}</p>
                                      </div>
                                      <div>
                                        <Label>Education Level</Label>
                                        <p>{selectedEnrollment?.education_level?.toUpperCase()}</p>
                                      </div>
                                      <div>
                                        <Label>Program/Strand</Label>
                                        <p>{selectedEnrollment?.program?.toUpperCase()}</p>
                                      </div>
                                      <div>
                                        <Label>Year Level</Label>
                                        <p>{selectedEnrollment?.year_level}</p>
                                      </div>
                                      <div>
                                        <Label>Semester</Label>
                                        <p>{selectedEnrollment?.semester}</p>
                                      </div>
                                      <div>
                                        <Label>Email</Label>
                                        <p>{selectedEnrollment?.email}</p>
                                      </div>
                                      <div>
                                        <Label>Phone</Label>
                                        <p>{selectedEnrollment?.phone_number}</p>
                                      </div>
                                    </div>

                                    {/* Documents Section */}
                                    <div className="mt-6">
                                      <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                        <FileText className="w-5 h-5" />
                                        Uploaded Documents
                                      </h4>
                                      {loadingDocuments ? (
                                        <p className="text-sm text-gray-500">Loading documents...</p>
                                      ) : enrollmentDocuments.length > 0 ? (
                                        <div className="space-y-2">
                                          {enrollmentDocuments.map((doc) => (
                                            <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                              <div className="flex items-center gap-3">
                                                <FileText className="w-4 h-4 text-primary-700" />
                                                <div>
                                                  <p className="font-medium text-sm">{doc.originalFilename || doc.filename}</p>
                                                  <p className="text-xs text-gray-500">
                                                    {doc.documentType ? doc.documentType.replace('_', ' ').toUpperCase() : 'Document'}
                                                  </p>
                                                </div>
                                              </div>
                                              <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => window.open(doc.url, '_blank')}
                                                className="flex items-center gap-1"
                                              >
                                                <ExternalLink className="w-3 h-3" />
                                                View
                                              </Button>
                                            </div>
                                          ))}
                                        </div>
                                      ) : (
                                        <p className="text-sm text-gray-500">No documents uploaded yet.</p>
                                      )}
                                    </div>

                                    <div className="flex gap-2 pt-4">
                                      <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                          <Button
                                            className="bg-primary-600 hover:bg-primary-700 text-white"
                                            disabled={selectedEnrollment.status === 'approved'}
                                          >
                                            Approve
                                          </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                          <AlertDialogHeader>
                                            <AlertDialogTitle>Confirm Approval</AlertDialogTitle>
                                            <AlertDialogDescription>
                                              Are you sure you want to approve the enrollment for {selectedEnrollment?.first_name} {selectedEnrollment?.last_name}?
                                            </AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => updateEnrollmentStatus(selectedEnrollment.id, 'Approved')}>
                                              Approve
                                            </AlertDialogAction>
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>

                                      <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                          <Button
                                            variant="destructive"
                                            disabled={selectedEnrollment.status === 'rejected'}
                                          >
                                            Reject
                                          </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                          <AlertDialogHeader>
                                            <AlertDialogTitle>Confirm Rejection</AlertDialogTitle>
                                            <AlertDialogDescription>
                                              Are you sure you want to reject the enrollment for {selectedEnrollment?.first_name} {selectedEnrollment?.last_name}?
                                            </AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => updateEnrollmentStatus(selectedEnrollment.id, 'Rejected')}>
                                              Reject
                                            </AlertDialogAction>
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>

                                      <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                          <Button
                                            variant="outline"
                                            disabled={selectedEnrollment.status === 'pending'}
                                          >
                                            Set Pending
                                          </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                          <AlertDialogHeader>
                                            <AlertDialogTitle>Confirm Set Pending</AlertDialogTitle>
                                            <AlertDialogDescription>
                                              Are you sure you want to set the enrollment status to pending for {selectedEnrollment?.first_name} {selectedEnrollment?.last_name}?
                                            </AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => updateEnrollmentStatus(selectedEnrollment.id, 'Pending')}>
                                              Set Pending
                                            </AlertDialogAction>
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
