import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
          Get in Touch
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Have a question, a comment, or just want to say hello? We'd love to hear from you.
        </p>
      </div>

      <div className="mt-16 grid md:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Email Us</h3>
              <p className="text-muted-foreground">
                For general inquiries, support, or feedback.
              </p>
              <a href="mailto:hello@luxebloom.com" className="text-primary hover:underline mt-1 block">
                hello@luxebloom.com
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
              <Phone className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Call Us</h3>
              <p className="text-muted-foreground">
                Our customer care team is available Mon-Fri, 9am-5pm EST.
              </p>
              <a href="tel:+1234567890" className="text-primary hover:underline mt-1 block">
                +1 (234) 567-890
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Visit Us</h3>
              <p className="text-muted-foreground">
                123 Bloom Street, Beauty City, 10101
              </p>
            </div>
          </div>
        </div>

        <form className="space-y-6 p-8 border rounded-lg shadow-sm bg-card">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" type="text" placeholder="Jane Doe" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="jane.doe@example.com" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Your message..." className="mt-2 min-h-[120px]" />
          </div>
          <Button type="submit" className="w-full" size="lg">Send Message</Button>
        </form>
      </div>
    </div>
  );
}
