import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { Mail, Clock, MapPin, Headphones, MessageSquare, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us - 24/7 Researcher Support',
  description:
    'Get in touch with Noor Scholar academic support team. Email abdmazn55@gmail.com for institutional API access, literature indexing, or technical help.',
  keywords: ['contact Noor Scholar', 'academic search support', 'email abdmazn55@gmail.com', 'library support'],
  openGraph: {
    title: 'Contact Us | Noor Scholar',
    description: 'Reach our 24h academic support team at abdmazn55@gmail.com.',
  },
};

export default function ContactPage() {
  const CONTACT_EMAIL = 'abdmazn55@gmail.com';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-4">
          <Headphones className="w-4 h-4" />
          <span>24/7 Researcher Support Desk</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          Contact Our Team
        </h1>
        <p className="mt-3 text-base text-slate-600">
          Have questions about research indexing, institutional plans, or citation tools? We are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <span>Direct Support Channels</span>
            </h2>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Official Inquiries & Support</div>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-base font-bold text-blue-600 hover:text-blue-700 underline block mt-0.5 break-all"
                >
                  {CONTACT_EMAIL}
                </a>
                <p className="text-xs text-slate-500 mt-1">Directly monitored by academic coordinators</p>
              </div>
            </div>

            {/* 24h Support */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Availability</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">Support 24h / 7 Days a Week</div>
                <p className="text-xs text-slate-500 mt-1">Average response time: under 4 hours</p>
              </div>
            </div>

            {/* Worldwide */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Headquarters & Cloud Ops</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">Distributed Academic Infrastructure</div>
                <p className="text-xs text-slate-500 mt-1">United States & Global Open Science Nodes</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900 leading-relaxed flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong>For Journal Editors & Authors:</strong> If you want to update author affiliations or add your university repository to OpenAlex ingestion via Noor Scholar, please include your journal ISSN and DOI prefix.
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
    </div>
  );
}
