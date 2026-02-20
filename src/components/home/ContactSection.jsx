import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { MapPin, Phone, Mail } from 'lucide-react';

export function ContactSection() {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      details: ['123 Education St., Manila City', 'Philippines 1000']
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['(02) 8123-4567', '0917-123-4567']
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['admissions@fepc.edu.ph', 'info@fepc.edu.ph']
    }
  ];

  return (
    <Card className="mb-16">
      <CardHeader>
        <CardTitle className="text-center">Contact Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {contactInfo.map((contact, index) => {
            const IconComponent = contact.icon;
            return (
              <div key={index} className="flex flex-col items-center">
                <IconComponent className="w-8 h-8 text-primary mb-2" />
                <h3 className="font-medium mb-1">{contact.title}</h3>
                <div className="text-sm text-gray-600">
                  {contact.details.map((detail, idx) => (
                    <p key={idx}>{detail}</p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}