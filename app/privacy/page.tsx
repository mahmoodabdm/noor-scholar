import type { Metadata } from 'next';
import { Shield, Lock, Eye, CheckCircle, FileText, Mail, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy (GDPR & CCPA Compliant)',
  description:
    'Comprehensive Privacy Policy for Noor Scholar. Details data protection, GDPR rights, California CCPA/CPRA disclosures, cookie policies, and researcher rights.',
  keywords: [
    'privacy policy',
    'GDPR compliance',
    'CCPA compliant',
    'Noor Scholar privacy',
    'data protection officer',
  ],
  openGraph: {
    title: 'Privacy Policy | Noor Scholar',
    description: 'Learn how Noor Scholar protects your research privacy, queries, and personal data under GDPR and CCPA.',
  },
};

export default function PrivacyPage() {
  const CONTACT_EMAIL = 'abdmazn55@gmail.com';
  const LAST_UPDATED = 'October 22, 2026';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Header */}
      <div className="border-b border-slate-200 pb-8 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-4">
          <Shield className="w-3.5 h-3.5" />
          <span>Legal & Compliance Standard</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Privacy Policy (GDPR & CCPA Compliant)
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          Effective Date & Last Updated: <strong>{LAST_UPDATED}</strong> | Official Privacy Contact: <strong>{CONTACT_EMAIL}</strong>
        </p>
      </div>

      {/* Quick Summary Card */}
      <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl mb-10 space-y-2">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Lock className="w-4 h-4 text-blue-600" />
          <span>Our Researcher Privacy Guarantee in Brief</span>
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          At Noor Scholar, we believe intellectual inquiry is a fundamental human right. We do not sell your personal data, we do not profile your political or scientific opinions, and we do not monitor your literature reading lists for third-party ad bidding. For any data inquiries, write to our Data Protection Officer at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 font-semibold underline">
            {CONTACT_EMAIL}
          </a>.
        </p>
      </div>

      {/* 1000+ Words Structured Content */}
      <div className="prose prose-slate max-w-none space-y-10 text-slate-700 leading-relaxed text-sm sm:text-base">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">1. Introduction & Controller Identification</h2>
          <p>
            This Privacy Policy explains how Noor Scholar (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) collects, processes, protects, and discloses personal information obtained through our website located at <a href="https://noorscholar.com" className="text-blue-600 underline">https://noorscholar.com</a> and any affiliated research tools (including the Citation Generator, Summarizer, Paraphraser, and Translator).
          </p>
          <p>
            For the purposes of the General Data Protection Regulation (EU) 2016/679 (&ldquo;GDPR&rdquo;), the UK GDPR, and the California Consumer Privacy Act of 2018 as amended by the California Privacy Rights Act (&ldquo;CCPA/CPRA&rdquo;), the primary data controller for all personal information collected under this policy is:
          </p>
          <div className="p-4 bg-slate-100 rounded-xl font-mono text-xs text-slate-800 space-y-1">
            <div>Organization: Noor Scholar International Academic Operations</div>
            <div>Data Protection Office: {CONTACT_EMAIL}</div>
            <div>Inquiries: Privacy, Subject Access Requests, Erasure, and Rectification</div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">2. Categories of Information We Collect</h2>
          <p>
            We adhere strictly to the principle of data minimization (GDPR Art. 5(1)(c)). We only collect data that is strictly necessary to deliver high-quality literature discovery:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Academic Query Data:</strong> When you input keywords, titles, DOIs, or author names into our search bar, these terms are transmitted securely to retrieve relevant open-access works from OpenAlex. We do not link search terms to your legal identity unless you are signed in.
            </li>
            <li>
              <strong>Direct Communication Records:</strong> If you contact us via our official contact form or email (<strong>{CONTACT_EMAIL}</strong>), we retain your name, email address, message body, and timestamps to answer your inquiry and provide technical assistance.
            </li>
            <li>
              <strong>Device and Usage Telemetry:</strong> Anonymized technical logs including your IP address (anonymized via standard truncation where required by EU law), browser type, language preferences, operating system, and page load latency.
            </li>
            <li>
              <strong>Citation & Tool Inputs:</strong> Text snippets pasted into our free citation generator, paper summarizer, paraphraser, or translator. These inputs are processed in-memory and are never stored or used to train third-party artificial intelligence foundation models.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">3. Legal Bases for Processing Under GDPR</h2>
          <p>Under Article 6 of the GDPR, we process your personal data under the following legitimate legal bases:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Legitimate Interests (Art. 6(1)(f)):</strong> To maintain website security, prevent distributed denial-of-service (DDoS) attacks, ensure server performance, and diagnose technical faults in literature retrieval.
            </li>
            <li>
              <strong>Performance of Contract (Art. 6(1)(b)):</strong> To execute tool queries (e.g., citation generation, research paper synthesis) requested by you in real time.
            </li>
            <li>
              <strong>Consent (Art. 6(1)(a)):</strong> For optional cookie preferences, analytical telemetry, or when subscribing to our academic newsletters.
            </li>
            <li>
              <strong>Legal Compliance (Art. 6(1)(c)):</strong> To comply with mandatory statutory, tax, or law enforcement requirements when served with valid subpoenas.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">4. California Privacy Rights (CCPA / CPRA Notice)</h2>
          <p>
            This section applies solely to California residents under the California Consumer Privacy Act of 2018 (CCPA) and California Privacy Rights Act (CPRA).
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Right to Know & Access:</strong> You have the right to request disclosure of the categories and specific pieces of personal information collected about you over the past 12 months.
            </li>
            <li>
              <strong>Right to Delete:</strong> You have the right to request the deletion of personal information collected, subject to statutory exceptions.
            </li>
            <li>
              <strong>Right to Correct:</strong> You have the right to correct inaccurate personal data maintained in our records.
            </li>
            <li>
              <strong>Non-Discrimination:</strong> Noor Scholar will never discriminate against you, deny access, or charge higher fees because you exercised any of your CCPA/CPRA rights.
            </li>
            <li>
              <strong>Notice of Non-Sale of Data (&ldquo;Do Not Sell or Share My Info&rdquo;):</strong> In the preceding 12 months, Noor Scholar has <strong>never sold</strong> and <strong>never shared</strong> consumer personal data for cross-context behavioral advertising.
            </li>
          </ul>
          <p>
            California residents may exercise any of these rights by emailing our designated privacy inbox at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 underline font-semibold">
              {CONTACT_EMAIL}
            </a>{' '}
            with the subject line &ldquo;California Privacy Request&rdquo;.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">5. European Union (GDPR) & UK Data Subject Rights</h2>
          <p>If you are an individual located in the European Economic Area (EEA) or the United Kingdom, you possess the following rights:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Right to confirmation and access to personal data (Art. 15 GDPR)</li>
            <li>Right to rectification of inaccurate records (Art. 16 GDPR)</li>
            <li>Right to erasure (&ldquo;Right to Be Forgotten&rdquo;) (Art. 17 GDPR)</li>
            <li>Right to restriction of processing (Art. 18 GDPR)</li>
            <li>Right to data portability in structured JSON/CSV formats (Art. 20 GDPR)</li>
            <li>Right to object to processing based on legitimate interests (Art. 21 GDPR)</li>
            <li>Right to lodge a formal complaint with your local Data Protection Supervisory Authority (e.g., CNIL, BfDI, ICO).</li>
          </ul>
          <p>
            To exercise your GDPR rights, submit a written notice to our Data Protection Officer at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 underline font-semibold">
              {CONTACT_EMAIL}
            </a>. We respond to all verified requests within 30 days without charge.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">6. Cookies and Google AdSense Advertising Disclosures</h2>
          <p>
            Noor Scholar uses cookies, web beacons, and similar tracking technologies to facilitate site navigation and serve non-intrusive contextual advertisements through Google AdSense and affiliate partners.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Essential Session Cookies:</strong> Required to maintain UI preferences (such as language, citation format, dark/light mode).
            </li>
            <li>
              <strong>Google AdSense & Third-Party Vendors:</strong> Google, as a third-party vendor, uses cookies to serve ads on Noor Scholar. Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visits to our site and/or other sites on the Internet.
            </li>
            <li>
              <strong>Opting Out:</strong> You may opt out of personalized advertising by visiting Google&apos;s Ads Settings (<a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">www.google.com/settings/ads</a>) or via the Network Advertising Initiative (<a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">www.aboutads.info/choices</a>).
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">7. Data Retention & International Data Transfers</h2>
          <p>
            We retain server diagnostic logs for a maximum period of 90 days, after which they are permanently expunged or aggregated into statistical summaries. Email communications are kept for up to 24 months to maintain customer support continuity.
          </p>
          <p>
            Because Noor Scholar operates globally, data may be processed on servers located in the United States and the European Union. Whenever personal data is transferred across borders, we implement Standard Contractual Clauses (SCCs) approved by the European Commission to ensure adequate protection.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">8. Children&apos;s Online Privacy Protection Act (COPPA)</h2>
          <p>
            Our services are intended for university scholars, educators, and adult researchers. We do not knowingly collect personal information from children under the age of 13 (or under 16 in certain EU jurisdictions). If you believe a child has provided us with personal information, please notify us at <strong>{CONTACT_EMAIL}</strong> and we will delete the data immediately.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">9. Contacting Our Data Protection Officer</h2>
          <p>
            For all questions regarding this Privacy Policy, your statutory privacy rights, or data security practices, contact us at:
          </p>
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
            <div className="font-bold text-slate-900 mb-1">Noor Scholar Privacy Office</div>
            <div className="text-slate-600 text-sm">Attention: Data Protection & Legal Compliance</div>
            <div className="text-blue-600 font-bold text-sm mt-2">
              Email:{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                {CONTACT_EMAIL}
              </a>
            </div>
            <div className="text-xs text-slate-500 mt-2">
              We pledge to acknowledge all inquiries within 24 business hours.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
