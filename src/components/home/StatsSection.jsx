import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Users, BookOpen, Award, Clock } from 'lucide-react';

export function StatsSection({ enrollments }) {
  const stats = [
    {
      title: 'Total Enrollments',
      value: enrollments.length,
      icon: Users,
      color: 'text-primary-600'
    },
    {
      title: 'Available Programs',
      value: 10,
      icon: BookOpen,
      color: 'text-green-500'
    },
    {
      title: 'Approved Students',
      value: enrollments.filter(e => e.status === 'approved').length,
      icon: Award,
      color: 'text-secondary-500'
    },
    {
      title: 'Pending Review',
      value: enrollments.filter(e => e.status === 'pending').length,
      icon: Clock,
      color: 'text-orange-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index} className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <IconComponent className={`w-12 h-12 ${stat.color} mx-auto mb-4`} />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-600">{stat.title}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}