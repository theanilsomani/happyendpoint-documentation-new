import Link from 'next/link';
import { DocsChrome } from '@/components/DocsChrome';

export default function NotFound() {
  return (
    <DocsChrome>
      <div className="prose-docs px-5 py-16 sm:px-8 lg:px-12">
        <h1>Page not found</h1>
        <p className="mt-5 text-lg">
          This documentation page does not exist. The API catalogue has the current references and guides.
        </p>
        <Link
          className="focus-ring mt-6 inline-flex rounded-md bg-[var(--he-text)] px-4 py-2 text-sm font-semibold text-[var(--he-bg)]"
          href="/"
        >
          Back to API catalogue
        </Link>
      </div>
    </DocsChrome>
  );
}
