import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dark bg-bg text-fg min-h-screen flex flex-col selection:bg-primary/30 selection:text-primary-foreground">
      <Navbar />
      <main className="grow">
        {children}
      </main>
      <Footer />
      
      {/* Scroll to top component or other landing-specific floating elements */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <button className="btn-primary shadow-2xl px-6 py-3 flex items-center gap-2">
          Start Free
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
