import AuthGuard from "@/components/AuthGuard";
import Chatbot from "@/components/Chatbot";

export default function HomePage() {
  return (
    <AuthGuard>
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
            IT Support Chatbot
          </h1>
          <p className="text-lg text-muted mb-6 max-w-2xl mx-auto">
            Having issues with your device or software? Get instant solutions or
            create a support ticket automatically with our AI-powered assistant.
          </p>
        </div>

        {/* Chatbot Section */}
        <div className="flex justify-center">
          <div className="w-full md:w-3/4 lg:w-2/3">
            <div className="card shadow-lg">
              <Chatbot />
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
