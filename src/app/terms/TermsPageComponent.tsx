'use client';

import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <>
      <GlobalHeader />

      <main className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: January 9, 2026</p>

          <div className="prose prose-gray max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using ShowerMap, you accept and agree to be bound by these terms of service.
              If you do not agree to these terms, you should not use this website.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              ShowerMap provides a directory of public shower facilities and hygiene locations. We offer
              information about facility hours, pricing, amenities, and access requirements. Our service
              includes user reviews and ratings, interactive maps, and community-driven updates.
            </p>
            <p>
              <strong>Disclaimer:</strong> ShowerMap provides information for reference purposes only. We do not
              guarantee the accuracy, availability, or condition of any facility. Always verify current
              information directly with facilities before visiting.
            </p>

            <h2>3. User Responsibilities</h2>
            <p>When using ShowerMap, you agree to:</p>
            <ul>
              <li>Use the service for its intended purpose</li>
              <li>Provide accurate information when submitting facility data or reviews</li>
              <li>Use respectful language in all interactions</li>
              <li>Respect facility rules and staff when visiting locations</li>
              <li>Not submit false, misleading, or harmful content</li>
              <li>Not engage in harassment, spam, or illegal activities</li>
            </ul>

            <h2>4. User-Generated Content</h2>
            <p>
              By submitting reviews, facility information, or other content to ShowerMap, you grant us a
              non-exclusive, worldwide, royalty-free license to use, display, and distribute your content
              in connection with the service. You retain ownership of your content.
            </p>
            <p>
              We reserve the right to review, edit, or remove any user-generated content that violates
              these terms or our community standards. We may suspend or terminate accounts that repeatedly
              violate our policies.
            </p>

            <h2>5. Disclaimers and Limitations</h2>
            <p>
              ShowerMap provides information &quot;as is&quot; without any warranties. We are not responsible for
              the condition, safety, or availability of any facilities listed on our platform.
            </p>
            <p>
              ShowerMap does not own, operate, or control the facilities listed in our directory. We are
              not responsible for the actions, policies, or conditions of these third-party locations.
            </p>
            <p>
              Our liability is limited to the maximum extent permitted by law. We are not liable for any
              direct, indirect, or consequential damages arising from your use of our service or visits
              to listed facilities.
            </p>

            <h2>6. Privacy</h2>
            <p>
              Your privacy is important to us. Our collection and use of personal information is governed
              by our <Link href="/privacy/" className="text-blue-600 hover:underline">Privacy Policy</Link>,
              which is incorporated into these terms by reference.
            </p>

            <h2>7. Termination</h2>
            <p>
              You may stop using ShowerMap at any time. We may terminate or suspend access to our service
              for violations of these terms, illegal activities, or abuse of our platform.
            </p>

            <h2>8. Changes to These Terms</h2>
            <p>
              We may update these terms from time to time. We will update the &quot;Last updated&quot; date at
              the top of this page when changes are made. Continued use of the service constitutes
              acceptance of updated terms.
            </p>

            <h2>9. Governing Law</h2>
            <p>
              These terms and your use of ShowerMap are governed by the laws of the United States,
              without regard to conflict of law provisions.
            </p>

            <h2>10. Contact</h2>
            <p>
              If you have questions about these terms of service, please visit
              our <Link href="/contact/" className="text-blue-600 hover:underline">Contact page</Link>.
            </p>
          </div>
        </div>
      </main>

      <GlobalFooter />
    </>
  );
}
