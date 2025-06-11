// app/not-found.tsx
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-5xl font-bold mb-4 text-primary">404</h1>
      <p className="text-lg text-muted-foreground mb-6">Sorry, the page you're looking for doesn't exist.</p>
      <a href="/" className="text-blue-600 underline">Return to Home</a>
    </div>
  );
}
