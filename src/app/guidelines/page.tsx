'use client';

import { Shield, Heart, Users, AlertCircle, CheckCircle, Info } from 'lucide-react';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';

export default function GuidelinesPage() {
  return (
    <>
      <GlobalHeader />
      
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Shield className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Usage Guidelines
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ShowerMap connects people with essential hygiene facilities. Please follow these 
              guidelines to ensure safe, respectful access for everyone in our community.
            </p>
          </div>
        </section>

        {/* General Guidelines */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
              <div className="flex items-center">
                <Info className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  General Guidelines
                </h2>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Respect Facility Rules
                    </h3>
                    <p className="text-gray-600 mb-3">
                      Each facility has its own policies regarding access, hours, and usage. 
                      Always follow posted rules and staff instructions.
                    </p>
                    <ul className="text-gray-600 space-y-1 ml-4 list-disc">
                      <li>Check operating hours before visiting</li>
                      <li>Understand payment requirements (day passes, memberships, donations)</li>
                      <li>Respect time limits if posted</li>
                      <li>Follow dress codes and facility-specific policies</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <Heart className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Be Considerate of Others
                    </h3>
                    <p className="text-gray-600 mb-3">
                      Remember that you're sharing facilities with community members, 
                      other travelers, and people in various circumstances.
                    </p>
                    <ul className="text-gray-600 space-y-1 ml-4 list-disc">
                      <li>Keep shower time reasonable during busy periods</li>
                      <li>Clean up after yourself</li>
                      <li>Respect others' privacy and space</li>
                      <li>Be patient and kind with staff and other users</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <Shield className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Safety and Security
                    </h3>
                    <p className="text-gray-600 mb-3">
                      Your safety and the safety of others is paramount. 
                      Use common sense and trust your instincts.
                    </p>
                    <ul className="text-gray-600 space-y-1 ml-4 list-disc">
                      <li>Secure your belongings while showering</li>
                      <li>Report any safety concerns to facility staff</li>
                      <li>Avoid visiting unfamiliar locations alone at night</li>
                      <li>Keep emergency contacts and identification accessible</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specific Facility Types */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Facility-Specific Guidelines
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">🏊 Public Pools & Rec Centers</h3>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• May require pool entry or facility day pass</li>
                  <li>• Often have specific shower-only hours</li>
                  <li>• Swimwear may be required in pool areas</li>
                  <li>• Towels usually not provided</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">🏋️ YMCAs & Gyms</h3>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• Day passes typically required</li>
                  <li>• Some offer sliding scale pricing</li>
                  <li>• Towels may be included or available for rent</li>
                  <li>• Peak hours may have time limits</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">🚛 Truck Stops</h3>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• Usually available 24/7</li>
                  <li>• Private shower rooms with locks</li>
                  <li>• Towels and basic toiletries often provided</li>
                  <li>• Payment required upfront</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">🏖️ Beach & Park Facilities</h3>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• Often outdoor rinse stations</li>
                  <li>• May be cold water only</li>
                  <li>• Usually free but basic facilities</li>
                  <li>• Seasonal hours in some locations</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">🏠 Community Centers</h3>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• May offer free or low-cost access</li>
                  <li>• Some have programs for those in need</li>
                  <li>• Limited hours, often weekdays only</li>
                  <li>• Respectful approach appreciated</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">🎒 Hostels</h3>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• Usually require accommodation booking</li>
                  <li>• Some offer day-use shower access</li>
                  <li>• Shared facilities with other travelers</li>
                  <li>• Towels may be available for rent</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Community Standards */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-amber-50 border-l-4 border-amber-600 p-6 mb-8">
              <div className="flex items-center">
                <AlertCircle className="h-6 w-6 text-amber-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Community Standards
                </h2>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Maintaining Our Directory
                </h3>
                <p className="text-gray-600 mb-4">
                  Help keep ShowerMap accurate and helpful by contributing verified information:
                </p>
                <ul className="text-gray-600 space-y-2 ml-6 list-disc">
                  <li>Report changes in hours, pricing, or facility conditions</li>
                  <li>Leave honest, helpful reviews based on recent visits</li>
                  <li>Update accessibility information for people with disabilities</li>
                  <li>Share safety concerns or positive experiences</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Respectful Communication
                </h3>
                <p className="text-gray-600 mb-4">
                  Our community includes people from diverse backgrounds and circumstances:
                </p>
                <ul className="text-gray-600 space-y-2 ml-6 list-disc">
                  <li>Use respectful language in reviews and communications</li>
                  <li>Avoid judgment about why someone needs shower access</li>
                  <li>Focus on facility conditions, not other users</li>
                  <li>Report inappropriate behavior through proper channels</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Privacy and Discretion
                </h3>
                <p className="text-gray-600 mb-4">
                  Respect privacy and maintain discretion:
                </p>
                <ul className="text-gray-600 space-y-2 ml-6 list-disc">
                  <li>Don't photograph people in shower facilities</li>
                  <li>Keep conversations about other users private</li>
                  <li>Respect that some people may prefer not to interact</li>
                  <li>Be mindful of personal space and boundaries</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency and Support */}
        <section className="py-16 bg-red-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Emergency Situations & Support
              </h2>
            </div>
            
            <div className="bg-white p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    If You Need Immediate Help
                  </h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Emergency services: 911</li>
                    <li>• Homeless services: 211</li>
                    <li>• Crisis support: 988 (Suicide & Crisis Lifeline)</li>
                    <li>• Local social services: Contact city/county offices</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Reporting Issues
                  </h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Safety concerns at facilities</li>
                    <li>• Incorrect information on ShowerMap</li>
                    <li>• Discrimination or mistreatment</li>
                    <li>• Facility closures or changes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <Users className="h-12 w-12 text-white mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Together We Build a Better Community
            </h2>
            <p className="text-xl text-blue-100 mb-6">
              By following these guidelines, we create a safe, respectful environment 
              where everyone can access the hygiene facilities they need.
            </p>
            <div className="text-blue-100 text-sm">
              <p>Thank you for being part of the ShowerMap community.</p>
            </div>
          </div>
        </section>
      </main>
      
      <GlobalFooter />
    </>
  );
}