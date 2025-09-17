'use client';

import { Mail, MessageSquare, MapPin, Users, AlertCircle, Heart } from 'lucide-react';
import { useState } from 'react';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });

  const handleSubmit = () => {
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <GlobalHeader />
      
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <MessageSquare className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have a question, want to report a facility, or need help? We're here to assist you. 
              Reach out to the ShowerMap community team.
            </p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Send Us a Message
                </h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What can we help you with?
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a category...</option>
                      <option value="new-location">Report New Shower Location</option>
                      <option value="update-location">Update Existing Location</option>
                      <option value="remove-location">Remove/Report Closed Location</option>
                      <option value="technical-issue">Technical Issue</option>
                      <option value="safety-concern">Safety Concern</option>
                      <option value="general-feedback">General Feedback</option>
                      <option value="partnership">Partnership Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Brief description of your message"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Please provide as much detail as possible. For location updates, include address, hours, pricing, and any changes."
                    />
                  </div>
                  
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Info & Quick Actions */}
            <div className="space-y-8">
              
              {/* Quick Contact Options */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-white rounded border border-blue-200">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Report New Location</p>
                      <p className="text-xs text-gray-600">Found a shower facility not on our map?</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-white rounded border border-blue-200">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Safety Concern</p>
                      <p className="text-xs text-gray-600">Report safety issues at facilities</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-white rounded border border-blue-200">
                    <Users className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Get Involved</p>
                      <p className="text-xs text-gray-600">Join our community of contributors</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Response Times
                </h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Safety concerns:</span>
                    <span className="font-medium">24-48 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Location updates:</span>
                    <span className="font-medium">3-5 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>General inquiries:</span>
                    <span className="font-medium">5-7 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Technical issues:</span>
                    <span className="font-medium">1-3 days</span>
                  </div>
                </div>
              </div>

              {/* Community Guidelines */}
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="flex items-center space-x-2 mb-4">
                  <Heart className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Community First
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  ShowerMap is built by and for our community. Every message helps us 
                  improve and expand access to hygiene facilities.
                </p>
                <p className="text-xs text-gray-500">
                  Please review our <a href="/guidelines/" className="text-blue-600 hover:underline">usage guidelines</a> 
                  before submitting facility information.
                </p>
              </div>

              {/* Emergency Resources */}
              <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-600">
                <div className="flex items-center space-x-2 mb-3">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Need Immediate Help?
                  </h3>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Emergency services:</strong> 911</p>
                  <p><strong>Crisis support:</strong> 988</p>
                  <p><strong>Homeless services:</strong> 211</p>
                  <p className="text-xs text-gray-500 mt-3">
                    For urgent facility needs, contact local social services or 211 for immediate assistance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How do I report a new shower location?
                </h3>
                <p className="text-gray-600">
                  Use the contact form above and select "Report New Shower Location." Please include 
                  the facility name, full address, hours of operation, cost information, and any 
                  special access requirements.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What if I find incorrect information about a facility?
                </h3>
                <p className="text-gray-600">
                  Please report outdated information using our contact form. Select "Update Existing Location" 
                  and provide the correct details. Your updates help keep ShowerMap accurate for everyone.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How can I get involved with ShowerMap?
                </h3>
                <p className="text-gray-600">
                  We welcome community contributors! Contact us about verifying locations in your area, 
                  helping with translations, or partnering with local organizations to expand access to hygiene facilities.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <GlobalFooter />
    </>
  );
}