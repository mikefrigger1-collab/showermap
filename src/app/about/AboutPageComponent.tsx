'use client';

import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <GlobalHeader />

      <main className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">About ShowerMap</h1>
          <p className="text-gray-600 mb-8">
            Helping people find public showers across the UK, USA, and Australia.
          </p>

          <div className="prose prose-gray max-w-none">
            <h2>What We Do</h2>
            <p>
              ShowerMap is a free directory of public shower facilities. We help you find places
              to shower when you&apos;re travelling, working on the road, camping, or just need
              access to clean facilities away from home.
            </p>
            <p>
              Our database includes leisure centres, gyms, truck stops, beach showers, hostels,
              community centres, and other locations where you can access shower facilities.
              We list both free and paid options, with details about costs, opening hours,
              and what to expect.
            </p>

            <h2>Who Uses ShowerMap</h2>
            <ul>
              <li><strong>Travellers and backpackers</strong> looking for shower facilities between destinations</li>
              <li><strong>Van lifers and campervan travellers</strong> who need regular access to showers</li>
              <li><strong>Truck drivers and delivery workers</strong> on long routes</li>
              <li><strong>Cyclists and runners</strong> who want to freshen up after a workout</li>
              <li><strong>Surfers and beach-goers</strong> looking for rinse-off facilities</li>
              <li><strong>Anyone</strong> who needs a shower while away from home</li>
            </ul>

            <h2>Our Coverage</h2>
            <p>
              We currently cover three countries:
            </p>
            <ul>
              <li><strong>United Kingdom</strong> - All regions from Scotland to Cornwall</li>
              <li><strong>United States</strong> - All 50 states</li>
              <li><strong>Australia</strong> - All states and territories</li>
            </ul>
            <p>
              We&apos;re always adding new locations. If you know of a facility that should be
              listed, please <Link href="/contact/" className="text-blue-600 hover:underline">let us know</Link>.
            </p>

            <h2>How to Use ShowerMap</h2>
            <ol>
              <li>Use the <Link href="/map/" className="text-blue-600 hover:underline">map</Link> to find facilities near your location</li>
              <li>Browse by country or region to plan ahead</li>
              <li>Check the facility details for opening hours, costs, and access requirements</li>
              <li>Call ahead if you&apos;re unsure - contact details are provided where available</li>
            </ol>

            <h2>Updates</h2>
            <p>
              Here&apos;s what we&apos;ve been working on:
            </p>

            <h3>January 2026</h3>
            <ul>
              <li>Updated all UK lidos to show free outdoor shower access</li>
              <li>Removed spas and massage parlours from UK listings (not relevant to our users)</li>
              <li>Simplified our Terms, Privacy, and Guidelines pages</li>
              <li>Added emergency contact numbers for UK, USA, and Australia</li>
            </ul>

            <h3>December 2025</h3>
            <ul>
              <li>Added 400+ new locations across Australia, focusing on coastal areas</li>
              <li>Improved search functionality - you can now filter by free showers only</li>
              <li>Added verified badges for facilities confirmed by multiple users</li>
              <li>Fixed mobile map issues on iOS devices</li>
            </ul>

            <h3>November 2025</h3>
            <ul>
              <li>Launched Australia coverage with 2,000+ initial locations</li>
              <li>Added surf club showers along the Australian coast</li>
              <li>Partnered with Australian caravan parks to list their public facilities</li>
              <li>Improved loading times for the interactive map</li>
            </ul>

            <h3>October 2025</h3>
            <ul>
              <li>Added 800+ new UK locations including leisure centres and council facilities</li>
              <li>Integrated Google Maps reviews to help verify shower availability</li>
              <li>Added accessibility information for wheelchair users</li>
              <li>New feature: &quot;Open now&quot; filter shows facilities currently available</li>
            </ul>

            <h3>September 2025</h3>
            <ul>
              <li>Major UK expansion - added all regions with detailed local data</li>
              <li>Added truck stop facilities across major UK motorways</li>
              <li>Improved cost information - now showing day pass prices where available</li>
              <li>Added YHA and hostel day-use shower options</li>
            </ul>

            <h3>August 2025</h3>
            <ul>
              <li>ShowerMap launched with USA coverage</li>
              <li>Initial database of 5,000+ verified shower locations</li>
              <li>Interactive map with filtering by facility type</li>
              <li>Mobile-friendly design for use on the go</li>
            </ul>

            <h2>Get in Touch</h2>
            <p>
              Have a question, suggestion, or want to report a facility? Visit
              our <Link href="/contact/" className="text-blue-600 hover:underline">Contact page</Link>.
            </p>
            <p>
              We read every message and do our best to respond within a few days.
            </p>
          </div>
        </div>
      </main>

      <GlobalFooter />
    </>
  );
}
