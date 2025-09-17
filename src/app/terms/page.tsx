'use client';

import { Scale, AlertTriangle, Shield, Users, Globe, FileText } from 'lucide-react';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';

export default function TermsPage() {
  return (
    <>
      <GlobalHeader />
      
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Scale className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">
              Please read these terms of service carefully before using ShowerMap. 
              By accessing our website, you agree to be bound by these terms.
            </p>
            <p className="text-sm text-gray-500">
              Last updated: September 17, 2025
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Acceptance of Terms */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <FileText className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Acceptance of Terms</h2>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6">
              <p className="text-gray-700 mb-4">
                By accessing and using ShowerMap (&quot;the Service&quot;), you accept and agree to be bound by 
                the terms and provision of this agreement. If you do not agree to these terms, 
                you should not use this website.
              </p>
              <p className="text-gray-600 text-sm">
                These terms apply to all visitors, users, and contributors to ShowerMap, including 
                those who browse information, submit facility data, or leave reviews.
              </p>
            </div>
          </section>

          {/* Description of Service */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Globe className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Description of Service</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What ShowerMap Provides
                </h3>
                <ul className="text-gray-600 space-y-2 ml-4 list-disc">
                  <li>Directory of public shower facilities and hygiene locations worldwide</li>
                  <li>Information about facility hours, pricing, amenities, and access requirements</li>
                  <li>User reviews and ratings of shower facilities</li>
                  <li>Interactive maps and search functionality</li>
                  <li>Community-driven updates and corrections to facility information</li>
                </ul>
              </div>
              
              <div className="bg-amber-50 border-l-4 border-amber-400 p-6">
                <div className="flex items-start">
                  <AlertTriangle className="h-6 w-6 text-amber-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Important Disclaimer
                    </h3>
                    <p className="text-gray-700 text-sm">
                      ShowerMap provides information for reference purposes only. We do not guarantee 
                      the accuracy, availability, or condition of any facility. Always verify 
                      current information directly with facilities before visiting.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* User Responsibilities */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Users className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">User Responsibilities</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Appropriate Use
                </h3>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Use the service for its intended purpose</li>
                  <li>• Respect facility rules and staff</li>
                  <li>• Follow community guidelines</li>
                  <li>• Be considerate of other users</li>
                </ul>
              </div>
              
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Prohibited Activities
                </h3>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Submitting false or misleading information</li>
                  <li>• Harassment or discrimination</li>
                  <li>• Illegal activities or content</li>
                  <li>• Spam or commercial solicitation</li>
                </ul>
              </div>
              
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Content Standards
                </h3>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Provide accurate facility information</li>
                  <li>• Write honest, helpful reviews</li>
                  <li>• Use respectful language</li>
                  <li>• Protect others' privacy</li>
                </ul>
              </div>
              
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Safety and Security
                </h3>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Use facilities at your own risk</li>
                  <li>• Report safety concerns promptly</li>
                  <li>• Verify facility information before visiting</li>
                  <li>• Follow local laws and regulations</li>
                </ul>
              </div>
            </div>
          </section>

          {/* User-Generated Content */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">User-Generated Content</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Content License
                </h3>
                <p className="text-gray-600 mb-3">
                  By submitting reviews, facility information, or other content to ShowerMap, 
                  you grant us a non-exclusive, worldwide, royalty-free license to use, display, 
                  and distribute your content in connection with the service.
                </p>
                <p className="text-gray-500 text-sm">
                  You retain ownership of your content, but allow us to share it with other users 
                  to help build our community directory.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Content Standards
                </h3>
                <p className="text-gray-600 mb-3">
                  All user-generated content must comply with our community standards:
                </p>
                <ul className="text-gray-600 space-y-1 text-sm ml-4 list-disc">
                  <li>Be accurate and factual to the best of your knowledge</li>
                  <li>Be relevant to shower facilities and hygiene access</li>
                  <li>Use respectful language appropriate for all audiences</li>
                  <li>Protect the privacy of individuals and businesses</li>
                  <li>Not contain illegal, harmful, or offensive material</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Content Moderation
                </h3>
                <p className="text-gray-600 text-sm">
                  We reserve the right to review, edit, or remove any user-generated content 
                  that violates these terms or our community standards. We may also suspend 
                  or terminate accounts that repeatedly violate our policies.
                </p>
              </div>
            </div>
          </section>

          {/* Disclaimers and Limitations */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Shield className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Disclaimers and Limitations</h2>
            </div>
            
            <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-6">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-red-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Use at Your Own Risk
                  </h3>
                  <p className="text-gray-700 text-sm">
                    ShowerMap provides information &quot;as is&quot; without any warranties. We are not 
                    responsible for the condition, safety, or availability of any facilities 
                    listed on our platform.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Information Accuracy
                </h3>
                <p className="text-gray-600 text-sm">
                  Facility information may change without notice. Hours, pricing, accessibility, 
                  and other details should be verified directly with facilities before visiting. 
                  We are not liable for outdated or incorrect information.
                </p>
              </div>
              
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Third-Party Facilities
                </h3>
                <p className="text-gray-600 text-sm">
                  ShowerMap does not own, operate, or control the facilities listed in our directory. 
                  We are not responsible for the actions, policies, or conditions of these third-party locations.
                </p>
              </div>
              
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Limitation of Liability
                </h3>
                <p className="text-gray-600 text-sm">
                  ShowerMap's liability is limited to the maximum extent permitted by law. 
                  We are not liable for any direct, indirect, or consequential damages arising 
                  from your use of our service or visits to listed facilities.
                </p>
              </div>
            </div>
          </section>

          {/* Privacy and Data */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Privacy and Data</h2>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Our collection and use of personal information 
                is governed by our Privacy Policy, which is incorporated into these terms by reference.
              </p>
              
              <div className="text-sm text-gray-600">
                <p className="mb-2">By using ShowerMap, you agree to:</p>
                <ul className="space-y-1 ml-4 list-disc">
                  <li>Our collection and use of information as described in our Privacy Policy</li>
                  <li>Receiving communications related to your use of the service</li>
                  <li>The display of your reviews and ratings (without personal contact information)</li>
                </ul>
              </div>
              
              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-sm text-blue-800">
                  Read our full <a href="/privacy/" className="font-medium hover:underline">Privacy Policy</a> 
                  for detailed information about how we handle your data.
                </p>
              </div>
            </div>
          </section>

          {/* Termination */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Termination</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  By You
                </h3>
                <p className="text-gray-600 text-sm">
                  You may stop using ShowerMap at any time. If you have submitted content, 
                  you may request its removal by contacting us, though some information may 
                  remain for legal or operational purposes.
                </p>
              </div>
              
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  By ShowerMap
                </h3>
                <p className="text-gray-600 text-sm">
                  We may terminate or suspend access to our service for violations of these terms, 
                  illegal activities, or abuse of our platform. We will provide notice when possible, 
                  except in cases of serious violations.
                </p>
              </div>
            </div>
          </section>

          {/* Changes to Terms */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Changes to These Terms</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                We may update these terms of service from time to time to reflect changes in our 
                service, legal requirements, or business practices.
              </p>
              
              <div className="text-sm text-gray-600">
                <p className="mb-2">When we make changes:</p>
                <ul className="space-y-1 ml-4 list-disc">
                  <li>We will update the &quot;Last updated&quot; date at the top of this page</li>
                  <li>Significant changes will be announced on our website</li>
                  <li>Continued use of the service constitutes acceptance of updated terms</li>
                  <li>If you disagree with changes, you should discontinue use of the service</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Governing Law */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Governing Law</h2>
            
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <p className="text-gray-600 text-sm">
                These terms of service and your use of ShowerMap are governed by the laws of the 
                United States and the state in which ShowerMap operates, without regard to conflict 
                of law provisions. Any disputes will be resolved in the appropriate courts of that jurisdiction.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Questions About These Terms</h2>
            
            <div className="bg-blue-600 text-white p-6 rounded-lg">
              <p className="mb-4">
                If you have questions about these terms of service, please contact us:
              </p>
              
              <div className="space-y-2 text-blue-100">
                <p>Email: legal@showermap.com</p>
                <p>Subject Line: Terms of Service Question</p>
                <p>Response Time: 5-7 business days</p>
              </div>
              
              <div className="mt-4 pt-4 border-t border-blue-500">
                <p className="text-sm text-blue-100">
                  You can also use our <a href="/contact/" className="text-white hover:underline">contact form</a> 
                  and select &quot;Legal/Terms of Service&quot; as your inquiry type.
                </p>
              </div>
            </div>
          </section>

          {/* Effective Date */}
          <section className="text-center py-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              These terms of service are effective as of September 17, 2025.
              <br />
              Thank you for being part of the ShowerMap community.
            </p>
          </section>

        </div>
      </main>
      
      <GlobalFooter />
    </>
  );
}