import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Academic Plagiarism Checker - Check Your Draft Inside Noor Scholar',
  description: 'Paste your draft and check for repeated sentences and risky structure inside your browser. Internal draft check, not a replacement for Turnitin.',
};

export default function PlagiarismCheckerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
