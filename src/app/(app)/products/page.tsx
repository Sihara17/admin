import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function ProductsPage() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>This is a placeholder page for managing products.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Product management functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </main>
  );
}
