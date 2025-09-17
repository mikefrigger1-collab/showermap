'use client';

import { Shield, Eye, Lock, Database, UserCheck, Globe, Info, AlertCircle, Mail } from 'lucide-react';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';

export default function PrivacyPage() {
  return (
    <>
      <GlobalHeader />
      
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Shield className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">
              Your privacy matters to us. This policy explains how ShowerMap collects, 
              uses, and protects your personal information.
            </p>
            <p className="text-sm text-gray-500">
              Last updated: September 17, 2025
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Quick Overview */}
          <section className="mb-12">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6">
              <div className="flex items-center mb-4">
                <Info className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Quick Overview</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">What We Collect:</h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Contact info when you reach out to us</li>
                    <li>• Reviews and facility updates you submit</li>
                    <li>• Basic website usage data</li>
                    <li>• Location data only when you choose to share it</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">What We Don't Do:</h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>• We don't sell your personal information</li>
                    <li>• We don't track you across other websites</li>
                    <li>• We don't require accounts to use ShowerMap</li>
                    <li>• We don't share data except as described below</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Information We Collect */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Database className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Information We Collect</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Information You Provide to Us
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900">Contact Forms</h4>
                    <p className="text-gray-600 text-sm">Name, email, and message content when you contact us or report facilities.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Facility Information</h4>
                    <p className="text-gray-600 text-sm">Details about shower locations you submit, including addresses and facility conditions.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Reviews and Ratings</h4>
                    <p className="text-gray-600 text-sm">Comments and ratings you choose to share about facilities (displayed publicly without personal info).</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Information We Collect Automatically
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900">Website Usage Data</h4>
                    <p className="text-gray-600 text-sm">Pages you visit, time spent on site, and how you interact with our features.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Device Information</h4>
                    <p className="text-gray-600 text-sm">Browser type, operating system, screen size (to improve mobile experience).</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Location Data</h4>
                    <p className="text-gray-600 text-sm">Only when you explicitly allow location access for finding nearby facilities.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Cookies and Tracking
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  We use minimal cookies to improve your experience:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Essential cookies:</span>
                    <span className="text-gray-600">Keep the site working properly</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Analytics cookies:</span>
                    <span className="text-gray-600">Help us understand site usage</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Preference cookies:</span>
                    <span className="text-gray-600">Remember your settings</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <UserCheck className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">How We Use Your Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Provide Our Service
                </h3>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Display shower facility information</li>
                  <li>• Show your reviews to help other users</li>
                  <li>• Process facility updates and corrections</li>
                  <li>• Respond to your questions and support requests</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Improve ShowerMap
                </h3>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Understand which features are most helpful</li>
                  <li>• Fix bugs and technical issues</li>
                  <li>• Develop new features based on user needs</li>
                  <li>• Keep our facility information accurate</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Safety and Security
                </h3>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Verify facility information for accuracy</li>
                  <li>• Prevent spam and abuse</li>
                  <li>• Protect against security threats</li>
                  <li>• Maintain community standards</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Legal Requirements
                </h3>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Comply with applicable laws</li>
                  <li>• Respond to legal requests</li>
                  <li>• Protect our rights and users' safety</li>
                  <li>• Investigate potential violations</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Information Sharing */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Globe className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">When We Share Information</h2>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
              <p className="text-green-800 font-semibold mb-2">
                We do not sell your personal information to anyone.
              </p>
              <p className="text-green-700 text-sm">
                We only share information in the limited situations described below.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Public Reviews and Ratings
                </h3>
                <p className="text-gray-600 text-sm">
                  Reviews and ratings you submit are displayed publicly to help other users. 
                  We never display your email or contact information with reviews.
                </p>
              </div>
              
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Service Providers
                </h3>
                <p className="text-gray-600 text-sm">
                  We work with trusted companies that help us operate ShowerMap (website hosting, 
                  email services, analytics). These providers can only use your information to help us 
                  provide our service.
                </p>
              </div>
              
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Legal Requirements
                </h3>
                <p className="text-gray-600 text-sm">
                  We may share information when required by law, court order, or to protect 
                  the safety of our users and the public.
                </p>
              </div>
              
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Business Transfers
                </h3>
                <p className="text-gray-600 text-sm">
                  If ShowerMap is acquired or merged, your information may be transferred as part 
                  of that transaction. You would be notified of any such change.
                </p>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Lock className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">How We Protect Your Information</h2>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                We take reasonable steps to protect your personal information from loss, theft, 
                misuse, and unauthorized access.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Technical Security:</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• SSL encryption for all data transmission</li>
                    <li>• Secure cloud hosting infrastructure</li>
                    <li>• Regular security updates and monitoring</li>
                    <li>• Access controls and authentication</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Operational Security:</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Limited staff access to personal data</li>
                    <li>• Privacy training for team members</li>
                    <li>• Regular security assessments</li>
                    <li>• Incident response procedures</li>
                  </ul>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mt-4">
                However, no internet service can guarantee 100% security. We encourage you to 
                protect your own privacy by being cautious about what personal information you share online.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Eye className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Your Privacy Rights</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Access and Control Your Data
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Request Your Data:</h4>
                    <p className="text-gray-600">Get a copy of the personal information we have about you</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Correct Your Data:</h4>
                    <p className="text-gray-600">Update or fix any incorrect information</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Delete Your Data:</h4>
                    <p className="text-gray-600">Request deletion of your personal information</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Object to Processing:</h4>
                    <p className="text-gray-600">Ask us to stop using your information for certain purposes</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Cookie and Tracking Controls
                </h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>• <strong>Browser Settings:</strong> Block or delete cookies through your browser</p>
                  <p>• <strong>Analytics Opt-out:</strong> Use Google Analytics opt-out tools</p>
                  <p>• <strong>Location Services:</strong> Disable location sharing in your browser</p>
                  <p>• <strong>Do Not Track:</strong> We respect Do Not Track signals when possible</p>
                </div>
              </div>
            </div>
          </section>

          {/* Data Retention */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How Long We Keep Your Information</h2>
            
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <p className="text-gray-600 mb-4 text-sm">
                We keep your information only as long as needed for the purposes described in this policy 
                or as required by law.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900">Contact Information:</h4>
                    <p className="text-gray-600">Until you request deletion or 5 years of no contact</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Website Usage Data:</h4>
                    <p className="text-gray-600">2 years for analytics, then anonymized or deleted</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900">Public Reviews:</h4>
                    <p className="text-gray-600">Kept indefinitely for community benefit, but anonymized</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Legal Records:</h4>
                    <p className="text-gray-600">As required by law (typically 7 years)</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Special Situations */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Special Considerations</h2>
            
            <div className="space-y-4">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                <div className="flex items-start">
                  <AlertCircle className="h-6 w-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Children's Privacy
                    </h3>
                    <p className="text-gray-700 text-sm">
                      ShowerMap is not intended for children under 13. We do not knowingly collect 
                      information from children. If you believe we have collected information from a child, 
                      please contact us immediately.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  International Users
                </h3>
                <p className="text-gray-700 text-sm">
                  ShowerMap is based in the United States. If you're using our service from another country, 
                  your information may be transferred to and stored in the US. By using ShowerMap, 
                  you consent to this transfer.
                </p>
              </div>
              
              <div className="bg-green-50 border-l-4 border-green-400 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  California Privacy Rights
                </h3>
                <p className="text-gray-700 text-sm">
                  California residents have additional rights under the CCPA, including the right to know what 
                  personal information we collect and the right to request deletion. Contact us to exercise these rights.
                </p>
              </div>
            </div>
          </section>

          {/* Policy Updates */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Changes to This Policy</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 mb-4">
                We may update this privacy policy from time to time. When we do:
              </p>
              
              <ul className="text-gray-600 space-y-1 text-sm ml-4 list-disc">
                <li>We'll update the "Last updated" date at the top of this page</li>
                <li>We'll notify you of significant changes on our website</li>
                <li>For major changes, we may send additional notifications</li>
                <li>Continued use of ShowerMap means you accept the updated policy</li>
              </ul>
            </div>
          </section>

          {/* Contact Us */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Questions About Privacy</h2>
            
            <div className="bg-blue-600 text-white p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Mail className="h-6 w-6 text-white mr-3" />
                <h3 className="text-xl font-semibold">Get in Touch</h3>
              </div>
              
              <p className="text-blue-100 mb-4">
                If you have questions about this privacy policy or how we handle your information, 
                we're here to help.
              </p>
              
              <div className="space-y-2 text-blue-100 text-sm">
                <p><strong className="text-white">Email:</strong> privacy@showermap.com</p>
                <p><strong className="text-white">Subject Line:</strong> Privacy Policy Question</p>
                <p><strong className="text-white">Response Time:</strong> 5-7 business days</p>
              </div>
              
              <div className="mt-4 pt-4 border-t border-blue-500">
                <p className="text-blue-100 text-sm">
                  You can also use our <a href="/contact/" className="text-white hover:underline font-medium">contact form </a> 
                   and select "Privacy/Data Protection" as your inquiry type.
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>
      
      <GlobalFooter />
    </>
  );
}