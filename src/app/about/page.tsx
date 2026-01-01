import { Container, Card } from "@/components/ui";

export const metadata = {
  title: "About - Board Roles",
  description: "Learn about Board Roles and our mission to support effective board governance.",
};

export default function AboutPage() {
  return (
    <section className="py-16">
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold mb-6">About Board Roles</h1>
          <Card className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              Board Roles is dedicated to providing high-quality resources and guidance
              for board members at all stages of their governance journey. We believe
              effective boards are essential for organizational success.
            </p>
          </Card>
          <Card className="mb-8">
            <h2 className="text-xl font-semibold mb-4">What We Offer</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li>In-depth articles on board roles and responsibilities</li>
              <li>Best practices for effective governance</li>
              <li>Guidance for new and experienced board members</li>
              <li>Resources on committee functions and leadership</li>
            </ul>
          </Card>
          <Card>
            <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground">
              Have questions or suggestions? We would love to hear from you.
              Reach out to contribute articles or request specific topics.
            </p>
          </Card>
        </div>
      </Container>
    </section>
  );
}
