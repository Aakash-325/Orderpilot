import { useApiHealth } from "../hooks/useHealth";
    
export function DashboardPage() {
  const healthQuery = useApiHealth();
  console.log('healthQuery', healthQuery);

  return (
    <main className="min-h-screen bg-slate-50 p-8 text-slate-900">
      <div className="mx-auto max-w-5xl space-y-6">
        <header>
          <p className="text-sm font-medium text-blue-700">ORDERPILOT</p>
          <h1 className="mt-2 text-3xl font-semibold">Dashboard</h1>
          <p className="mt-2 text-slate-600">
            Your order operations workspace.
          </p>
        </header>

        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="font-semibold">Backend connection</h2>

          {healthQuery.isPending && <p>Checking API...</p>}

          {healthQuery.isError && (
            <p className="text-red-600">
              API unavailable. Check your Express server.
            </p>
          )}

          {healthQuery.data && (
            <p className="text-emerald-700">
              {healthQuery.data.application}: {healthQuery.data.status}
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
