'use client';

import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import Link from 'next/link';

export default function GuidelinesPage() {
  return (
    <>
      <GlobalHeader />

      <main className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Usage Guidelines</h1>
          <p className="text-gray-600 mb-8">
            ShowerMap helps you find public shower facilities across the UK, USA, and Australia.
            These guidelines will help you make the most of the facilities you visit.
          </p>

          <div className="prose prose-gray max-w-none">
            <h2>Before You Visit</h2>
            <ul>
              <li>Check the facility&apos;s opening hours - they may vary by day or season</li>
              <li>Confirm pricing and payment methods (cash, card, membership required)</li>
              <li>Call ahead if you&apos;re unsure about access requirements</li>
              <li>Bring your own towel and toiletries unless the listing says they&apos;re provided</li>
              <li>Check if booking or registration is required</li>
            </ul>

            <h2>At the Facility</h2>
            <ul>
              <li>Follow all posted rules and staff instructions</li>
              <li>Be mindful of time limits, especially during busy periods</li>
              <li>Keep your belongings secure - use lockers where available</li>
              <li>Leave the shower area clean for the next person</li>
              <li>Respect other users&apos; privacy and personal space</li>
            </ul>

            <h2>Facility Types</h2>

            <h3>Leisure Centres and Public Pools</h3>
            <p>
              Most leisure centres have showers in their changing rooms. Some require you to pay
              for pool or gym access, while others offer shower-only access at a reduced rate.
              Ask at reception about your options.
            </p>

            <h3>Gyms and Fitness Centres</h3>
            <p>
              Day passes are usually available if you&apos;re not a member. Some budget gyms offer
              very affordable rates. Towels may be included or available for hire.
            </p>

            <h3>Truck Stops and Service Stations</h3>
            <p>
              Professional driver facilities often have excellent showers available to the public.
              These typically include a private room with towels and basic toiletries. Payment is
              usually required upfront at the counter.
            </p>

            <h3>Beach and Outdoor Showers</h3>
            <p>
              Coastal areas often have free outdoor rinse showers near beaches. These are usually
              cold water only and are intended for rinsing off sand and salt. Some surf clubs and
              beach facilities have more complete shower options.
            </p>

            <h3>Hostels</h3>
            <p>
              Some hostels offer day-use shower access to non-guests for a small fee. This is
              more common in major cities and tourist areas. Call ahead to check availability.
            </p>

            <h3>Community Centres</h3>
            <p>
              Local community centres sometimes have shower facilities, often at low or no cost.
              These may have limited hours and availability.
            </p>

            <h2>Contributing to ShowerMap</h2>
            <p>Help keep our directory accurate and useful:</p>
            <ul>
              <li>Report any changes to hours, pricing, or access requirements</li>
              <li>Let us know if a facility has closed or moved</li>
              <li>Share details about accessibility features for those who need them</li>
              <li>Suggest new facilities we should add</li>
            </ul>
            <p>
              You can submit updates through our <Link href="/contact/" className="text-blue-600 hover:underline">Contact page</Link>.
            </p>

            <h2>Emergency Contacts</h2>
            <p>If you need immediate assistance:</p>

            <h3>United Kingdom</h3>
            <ul>
              <li>Emergency services: 999</li>
              <li>Non-emergency police: 101</li>
              <li>NHS urgent care: 111</li>
              <li>Samaritans: 116 123</li>
              <li>Shelter (housing help): 0808 800 4444</li>
            </ul>

            <h3>United States</h3>
            <ul>
              <li>Emergency services: 911</li>
              <li>Social services helpline: 211</li>
              <li>Suicide and Crisis Lifeline: 988</li>
              <li>National Domestic Violence Hotline: 1-800-799-7233</li>
            </ul>

            <h3>Australia</h3>
            <ul>
              <li>Emergency services: 000</li>
              <li>Police assistance: 131 444</li>
              <li>Lifeline crisis support: 13 11 14</li>
              <li>Homelessness services: 1800 474 753</li>
            </ul>

            <h2>Questions?</h2>
            <p>
              If you have questions about using ShowerMap or want to report an issue,
              please visit our <Link href="/contact/" className="text-blue-600 hover:underline">Contact page</Link>.
            </p>
          </div>
        </div>
      </main>

      <GlobalFooter />
    </>
  );
}
