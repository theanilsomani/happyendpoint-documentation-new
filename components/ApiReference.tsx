import { Code, ExternalLink } from 'lucide-react';
import type { ApiOperation } from '@/lib/openapi';

export function ApiReference({ operation }: { operation: ApiOperation }) {
  const curl = [
    `curl --request ${operation.method} \\`,
    `  --url '${operation.serverUrl}${operation.path}' \\`,
    `  --header 'X-RapidAPI-Key: <YOUR_RAPIDAPI_KEY>' \\`,
    `  --header 'X-RapidAPI-Host: <RAPIDAPI_HOST>'`,
  ].join('\n');

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
      <article className="prose-docs min-w-0">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className={`method method-${operation.method.toLowerCase()}`}>{operation.method}</span>
          <code className="rounded-md border border-[var(--he-line)] bg-[var(--he-panel)] px-2 py-1 text-sm">
            {operation.path}
          </code>
        </div>

        <h1>{operation.summary}</h1>
        <p className="mt-5 text-lg">{operation.description}</p>

        {operation.parameters.length ? (
          <section id="parameters">
            <h2>Parameters</h2>
            <div className="overflow-x-auto rounded-md border border-[var(--he-line)]">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-[var(--he-panel)]">
                  <tr>
                    <th className="p-3 font-semibold">Name</th>
                    <th className="p-3 font-semibold">In</th>
                    <th className="p-3 font-semibold">Required</th>
                    <th className="p-3 font-semibold">Schema</th>
                    <th className="p-3 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {operation.parameters.map((param) => (
                    <tr className="border-t border-[var(--he-line)]" key={`${param.in}-${param.name}`}>
                      <td className="p-3 font-mono text-xs">{param.name}</td>
                      <td className="p-3">{param.in}</td>
                      <td className="p-3">{param.required ? 'Yes' : 'No'}</td>
                      <td className="p-3">{param.schema || 'any'}</td>
                      <td className="p-3 text-[var(--he-muted)]">{param.description || 'No description.'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        {operation.requestBody ? (
          <section id="request-body">
            <h2>Request Body</h2>
            <p>
              This endpoint accepts {operation.requestBody.contentTypes.join(', ') || 'a request body'}.
              {operation.requestBody.required ? ' The body is required.' : ' The body is optional.'}
            </p>
          </section>
        ) : null}

        <section id="responses">
          <h2>Responses</h2>
          <div className="space-y-3">
            {operation.responses.length ? (
              operation.responses.map((response) => (
                <div className="rounded-md border border-[var(--he-line)] bg-[var(--he-panel)] p-4" key={response.code}>
                  <div className="font-mono text-sm font-semibold">{response.code}</div>
                  <p className="m-0 mt-1 text-sm">{response.description}</p>
                </div>
              ))
            ) : (
              <p>Response details are defined in the OpenAPI source for this endpoint.</p>
            )}
          </div>
        </section>
      </article>

      <aside className="space-y-5 xl:sticky xl:top-6 xl:self-start">
        <div className="rounded-md border border-[var(--he-line)] bg-[var(--he-panel)] p-4">
          <div className="flex items-center gap-2 font-semibold">
            <Code aria-hidden="true" className="h-4 w-4" />
            Request
          </div>
          <pre className="mono-box mt-3 text-xs">{curl}</pre>
        </div>

        <div className="rounded-md border border-[var(--he-line)] bg-[var(--he-panel)] p-4">
          <div className="font-semibold">Try it on RapidAPI</div>
          <p className="mt-2 text-sm text-[var(--he-muted)]">
            Use the RapidAPI console for authenticated test requests, quotas, and subscription details.
          </p>
          <a
            className="focus-ring mt-4 inline-flex items-center gap-2 rounded-md bg-[var(--he-accent)] px-4 py-2 text-sm font-semibold text-[var(--he-bg)]"
            href="https://rapidapi.com/"
            rel="noreferrer"
            target="_blank"
          >
            Open RapidAPI <ExternalLink aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </aside>
    </div>
  );
}
