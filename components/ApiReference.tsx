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
      <article className="min-w-0">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className={`method method-${operation.method.toLowerCase()}`}>{operation.method}</span>
          <code className="rounded-md border border-fd-border bg-fd-card px-2 py-1 text-sm text-fd-muted-foreground">
            {operation.path}
          </code>
        </div>

        <h1 className="he-title">{operation.summary}</h1>
        <p className="he-lede">{operation.description}</p>

        {operation.parameters.length ? (
          <section id="parameters">
            <h2 className="he-section-title">Parameters</h2>
            <div className="overflow-x-auto rounded-md border border-fd-border">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-fd-card">
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
                    <tr className="border-t border-fd-border" key={`${param.in}-${param.name}`}>
                      <td className="p-3 font-mono text-xs">{param.name}</td>
                      <td className="p-3">{param.in}</td>
                      <td className="p-3">{param.required ? 'Yes' : 'No'}</td>
                      <td className="p-3">{param.schema || 'any'}</td>
                      <td className="p-3 text-fd-muted-foreground">{param.description || 'No description.'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        {operation.requestBody ? (
          <section id="request-body">
            <h2 className="he-section-title">Request Body</h2>
            <p className="text-fd-muted-foreground">
              This endpoint accepts {operation.requestBody.contentTypes.join(', ') || 'a request body'}.
              {operation.requestBody.required ? ' The body is required.' : ' The body is optional.'}
            </p>
          </section>
        ) : null}

        <section id="responses">
          <h2 className="he-section-title">Responses</h2>
          <div className="space-y-3">
            {operation.responses.length ? (
              operation.responses.map((response) => (
                <div className="he-card min-h-0" key={response.code}>
                  <div className="font-mono text-sm font-semibold">{response.code}</div>
                  <p className="m-0 mt-1 text-sm">{response.description}</p>
                </div>
              ))
            ) : (
              <p className="text-fd-muted-foreground">Response details are defined in the OpenAPI source for this endpoint.</p>
            )}
          </div>
        </section>
      </article>

      <aside className="space-y-5 xl:sticky xl:top-6 xl:self-start">
        <div className="he-card min-h-0">
          <div className="flex items-center gap-2 font-semibold">
            <Code aria-hidden="true" className="h-4 w-4" />
            Request
          </div>
          <pre className="mono-box mt-3 text-xs">{curl}</pre>
        </div>

        <div className="he-card min-h-0">
          <div className="font-semibold">Try it on RapidAPI</div>
          <p className="mt-2 text-sm text-fd-muted-foreground">
            Use the RapidAPI console for authenticated test requests, quotas, and subscription details.
          </p>
          <a
            className="he-button-primary mt-4"
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
