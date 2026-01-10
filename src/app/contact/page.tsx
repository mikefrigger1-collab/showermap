'use client';

import { MessageSquare } from 'lucide-react';
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
        <section className="bg-gradient-to-br from-primary-50 via-secondary-50 to-warm-100 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <MessageSquare className="h-16 w-16 text-primary-500 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-warm-900 mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-warm-600 max-w-3xl mx-auto">
              Have a question, want to report a facility, or need help? We're here to assist you.
              Reach out to the ShowerMap community team.
            </p>
          </div>
        </section>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white border border-warm-200 rounded-2xl p-8 shadow-card">
            <h2 className="text-2xl font-bold text-warm-900 mb-6">
              Send Us a Message
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-warm-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-warm-200 rounded-xl
                             focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500
                             transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-warm-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-warm-200 rounded-xl
                             focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500
                             transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-warm-700 mb-2">
                  What can we help you with?
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-warm-200 rounded-xl
                           focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500
                           transition-all duration-200 bg-white"
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
                <label className="block text-sm font-medium text-warm-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-warm-200 rounded-xl
                           focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500
                           transition-all duration-200"
                  placeholder="Brief description of your message"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-warm-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-warm-200 rounded-xl
                           focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500
                           transition-all duration-200 resize-none"
                  placeholder="Please provide as much detail as possible. For location updates, include address, hours, pricing, and any changes."
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full btn-primary py-4 text-lg"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="py-16 bg-warm-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-warm-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              <div className="bg-white p-6 rounded-2xl shadow-card hover-lift">
                <h3 className="text-lg font-semibold text-warm-900 mb-2">
                  How do I report a new shower location?
                </h3>
                <p className="text-warm-600">
                  Use the contact form above and select "Report New Shower Location." Please include
                  the facility name, full address, hours of operation, cost information, and any
                  special access requirements.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-card hover-lift">
                <h3 className="text-lg font-semibold text-warm-900 mb-2">
                  What if I find incorrect information about a facility?
                </h3>
                <p className="text-warm-600">
                  Please report outdated information using our contact form. Select "Update Existing Location"
                  and provide the correct details. Your updates help keep ShowerMap accurate for everyone.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-card hover-lift">
                <h3 className="text-lg font-semibold text-warm-900 mb-2">
                  How can I get involved with ShowerMap?
                </h3>
                <p className="text-warm-600">
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
