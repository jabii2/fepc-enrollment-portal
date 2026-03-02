import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { CheckCircle, Ticket, Clock, Home, GraduationCap, FileText } from 'lucide-react';

export function SuccessCard({ enrollment, onGoBackHome, onStartNewEnrollment }) {
  return (
    <Card className="max-w-2xl mx-auto mb-8 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 shadow-xl animate-fade-in">
      <CardContent className="p-8">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-2">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <Ticket className="w-6 h-6 text-green-500 absolute -bottom-1 -right-1 bg-white rounded-full p-1" />
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-green-800 mb-3">
          🎉 Enrollment Submitted Successfully!
        </h3>
        
        <div className="bg-white/80 rounded-lg p-6 mb-6 border border-green-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div>
              <p className="text-green-700 mb-2">
                <strong>Student:</strong> {enrollment.firstName} {enrollment.lastName}
              </p>
              <p className="text-green-700 mb-2">
                <strong>Education Level:</strong> {enrollment.educationLevel?.toUpperCase()}
              </p>
              <p className="text-green-700 mb-2">
                <strong>Enrollee Type:</strong> <span className="capitalize">{enrollment.enrolleeType}</span>
              </p>
            </div>
            <div>
              <p className="text-green-700 mb-2">
                <strong>Reference ID:</strong> <br />
                <code className="bg-green-100 px-3 py-1 rounded text-sm font-mono">#{enrollment.id}</code>
              </p>
              <p className="text-green-700 mb-2">
                <strong>Date Submitted:</strong> <br />
                {enrollment.enrollmentDate}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-green-200">
            <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-300 flex items-center gap-1 px-3 py-1">
              <Clock className="w-3 h-3" />
              Status: Pending Review
            </Badge>
          </div>
        </div>
        
        <div className="bg-secondary-50 border border-secondary-100 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-secondary-700 mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Next Steps:
          </h4>
          <ul className="text-sm text-secondary-600 space-y-1">
            <li>• You will receive a confirmation email within 24-48 hours</li>
            <li>• Please keep your reference ID for future inquiries</li>
            {(enrollment.enrolleeType === 'new' || enrollment.enrolleeType === 'transfer') && (
              <li>• You may need to submit additional documents as required</li>
            )}
            <li>• Contact our admissions office for any questions</li>
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={onGoBackHome}
            variant="outline"
            className="flex items-center gap-2 bg-white hover:bg-gray-50"
          >
            <Home className="w-4 h-4" />
            Go Back to Homepage
          </Button>
          <Button
            onClick={onStartNewEnrollment}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          >
            <GraduationCap className="w-4 h-4" />
            Submit Another Enrollment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}