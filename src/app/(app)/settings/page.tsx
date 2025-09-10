import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>This is a placeholder page for application settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>User and application settings will be configurable here.</p>
        </CardContent>
      </Card>
    </main>
  );
}
