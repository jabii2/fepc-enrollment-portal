import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Award, GraduationCap } from 'lucide-react';

const FALLBACK_SHS_PROGRAMS = [
  { code: 'ABM', name: 'Accountancy, Business and Management', description: 'Covers business operations, accounting, finance, and marketing strategies.' },
  { code: 'IA', name: 'Industrial Arts', description: 'Technical skills in carpentry, welding, electrical work, and mechanics.' },
  { code: 'HE', name: 'Home Economics', description: 'Culinary arts, fashion design, and hospitality management.' },
  { code: 'HUMSS', name: 'Humanities and Social Sciences', description: 'Social sciences, literature, and human behavior studies.' },
  { code: 'ICT', name: 'Information and Communications Technology', description: 'Programming, web development, and digital technologies.' }
];

const FALLBACK_COLLEGE_PROGRAMS = [
  { code: 'BSCS', name: 'Bachelor of Science in Computer Science', description: 'Advanced software development, algorithms, and AI technologies.' },
  { code: 'BTVTED', name: 'Bachelor of Technical-Vocational Teacher Education', description: 'Prepares technical-vocational education teachers.' },
  { code: 'BSTM', name: 'Bachelor of Science in Tourism Management', description: 'Tourism operations and destination management.' },
  { code: 'BSHM', name: 'Bachelor of Science in Hospitality Management', description: 'Hotel operations and restaurant management.' },
  { code: 'BSBA', name: 'Bachelor of Science in Business Administration', description: 'Management, marketing, and entrepreneurship.' }
];

function ProgramCard({ programs, fallbackPrograms, title, icon, gradientColors }) {
  const displayPrograms = programs.length > 0 ? programs : fallbackPrograms;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className={`${gradientColors} text-white`}>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
          <Badge variant="secondary" className="ml-auto bg-white/20 text-white">
            5 Programs
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-gray-600 mb-4">
          {title.includes('SHS') 
            ? 'Prepare for college with our comprehensive Senior High School programs designed to develop your skills and interests.'
            : 'Advance your career with our industry-relevant bachelor\'s degree programs taught by experienced professionals.'
          }
        </p>
        <div className="space-y-3">
          {displayPrograms.map((program) => (
            <div key={program.code} className="group p-4 bg-gray-50 rounded-lg hover:bg-primary/5 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-primary">{program.code}</span>
                <Badge variant="outline" className="text-xs">
                  {programs.length > 0 ? program.duration : (title.includes('SHS') ? '2 Years' : '4 Years')}
                </Badge>
              </div>
              <h4 className="font-medium mb-1">{program.name}</h4>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{program.description}</p>
              {programs.length > 0 && program.careerProspects && (
                <div className="text-xs mt-2">
                  <span className="text-green-600 font-medium">Career paths: </span>
                  <span className="text-gray-500">{program.careerProspects.split(',').slice(0, 3).join(', ')}...</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function ProgramsSection({ shsPrograms, collegePrograms }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
      <ProgramCard
        programs={shsPrograms}
        fallbackPrograms={FALLBACK_SHS_PROGRAMS}
        title="Senior High School (SHS)"
        icon={<Award className="w-5 h-5" />}
        gradientColors="bg-gradient-to-r from-blue-500 to-blue-600"
      />
      
      <ProgramCard
        programs={collegePrograms}
        fallbackPrograms={FALLBACK_COLLEGE_PROGRAMS}
        title="College Programs"
        icon={<GraduationCap className="w-5 h-5" />}
        gradientColors="bg-gradient-to-r from-purple-500 to-purple-600"
      />
    </div>
  );
}