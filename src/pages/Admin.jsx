import Header from "@/components/Header";

export default function Admin() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="p-6 space-y-6">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <p>This route is protected and only accessible to admin@example.com</p>
        {/* Add more admin analytics, users list, etc. here */}
      </main>
    </div>
  );
}
