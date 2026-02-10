import ProductDescriptionGenerator from '@/components/admin/product-description-generator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminProductsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">AI Product Tools</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Product Description Generator</CardTitle>
          <CardDescription>
            Fill in the details about your product, and our AI will write a compelling description for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductDescriptionGenerator />
        </CardContent>
      </Card>
    </div>
  );
}
