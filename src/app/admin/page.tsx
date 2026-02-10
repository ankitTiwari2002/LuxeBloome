import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Dashboard</h1>
      </div>
      <div className="space-y-4">
        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle>Welcome to your LuxeBloom Dashboard!</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Here you can manage your products and use AI tools to optimize your store.
            </CardDescription>
          </CardHeader>
        </Card>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Product Descriptions</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-4">
                Use our AI to generate compelling descriptions for your products.
              </p>
              <Button asChild>
                <Link href="/admin/products">
                  Generate Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Sidekick</CardTitle>
              <Sparkles className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-4">
                Get AI-powered suggestions to improve your store's layout, copy, and SEO.
              </p>
               <Button asChild>
                <Link href="/admin/ai-sidekick">
                  Optimize Store <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
