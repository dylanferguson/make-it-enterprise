import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.js";

type RunSummary = {
  totalRounds: number;
  successfulRounds: number;
  failedRounds: number;
  averageDuration: string;
  lastRunTimestamp: string;
};

export function MetricsDashboard() {
  const [metrics, setMetrics] = useState<RunSummary[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("enterprise-metrics");
    if (stored) {
      try {
        setMetrics(JSON.parse(stored));
      } catch {
        // ignore corrupt data
      }
    }
  }, []);

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-bold tracking-tight">
        FizzBuzz Enterprise — Evaluation Metrics
      </h1>
      {metrics.length === 0 ? (
        <p className="text-muted-foreground">No evaluation data available yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {metrics.map((m, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Round {m.totalRounds}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Successes</span>
                  <span>{m.successfulRounds}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Failures</span>
                  <span>{m.failedRounds}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg duration</span>
                  <span>{m.averageDuration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last run</span>
                  <span>{m.lastRunTimestamp}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
