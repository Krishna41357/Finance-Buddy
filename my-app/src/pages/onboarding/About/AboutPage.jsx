import { BookOpen, Zap, Target, Users, BarChart3, PiggyBank, Shield } from 'lucide-react';
import LandingPageNavbar from '../../../components/Header/LandingPageNavbar';

const AboutPage = () => (
  <>
  <LandingPageNavbar/>
  <div className="mt-10 min-h-screen bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Financial Literacy
          <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            for the Future
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Empowering the next generation with AI-driven financial education, 
          ethical data practices, and innovative learning experiences.
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 mb-6">
            We believe financial literacy is a fundamental life skill that should be accessible, 
            engaging, and relevant to young minds. Through cutting-edge AI technology and 
            thoughtful design, we're making financial education interactive and personalized.
          </p>
          <p className="text-lg text-gray-600">
            Our platform combines the wisdom of traditional financial principles with modern 
            technology to create learning experiences that stick, habits that last, and 
            confidence that grows.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 p-6 rounded-xl border border-green-100">
            <BookOpen className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Educational Focus</h3>
            <p className="text-sm text-gray-600">Evidence-based learning methods</p>
          </div>
          <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
            <Zap className="w-12 h-12 text-emerald-600 mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">AI-Powered</h3>
            <p className="text-sm text-gray-600">Personalized learning paths</p>
          </div>
          <div className="bg-lime-50 p-6 rounded-xl border border-lime-100">
            <Target className="w-12 h-12 text-lime-600 mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Goal-Oriented</h3>
            <p className="text-sm text-gray-600">Track your progress</p>
          </div>
          <div className="bg-teal-50 p-6 rounded-xl border border-teal-100">
            <Users className="w-12 h-12 text-teal-600 mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Community</h3>
            <p className="text-sm text-gray-600">Learn together, grow together</p>
          </div>
        </div>
      </div>

      {/* AI Approach Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 mb-16 border border-green-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          How We Use AI for Good
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">
              <BarChart3 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-3">Smart Insights</h3>
            <p className="text-gray-600">
              AI analyzes your learning patterns to provide personalized recommendations 
              and insights that accelerate your financial growth.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-emerald-200">
              <PiggyBank className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-3">Predictive Modeling</h3>
            <p className="text-gray-600">
              Our simulations use machine learning to show realistic outcomes 
              based on your financial decisions and market conditions.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-lime-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-lime-200">
              <BookOpen className="w-8 h-8 text-lime-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-3">Content Curation</h3>
            <p className="text-gray-600">
              AI helps us find and summarize the most relevant financial content, 
              keeping you informed without information overload.
            </p>
          </div>
        </div>
      </div>

      {/* Privacy & Ethics Section */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 rounded-2xl text-white shadow-lg">
          <Shield className="w-16 h-16 mb-6" />
          <h2 className="text-3xl font-bold mb-4">Your Privacy Matters</h2>
          <p className="text-lg opacity-90 mb-6">
            We believe in transparent, ethical data handling. Your financial information 
            is encrypted, never sold, and used only to improve your learning experience.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
              End-to-end encryption for all data
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
              No selling of personal information
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
              Full control over your data
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
              Transparent AI decision-making
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ethical AI Commitment</h2>
          <p className="text-lg text-gray-600 mb-6">
            Our AI systems are designed with fairness, accountability, and transparency 
            at their core. We actively work to eliminate bias and ensure our technology 
            serves all users equitably.
          </p>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 border border-green-200">
                <span className="text-green-600 font-bold text-sm">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Bias Prevention</h4>
                <p className="text-gray-600">Regular audits ensure fair treatment across all demographics</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-emerald-100 w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 border border-emerald-200">
                <span className="text-emerald-600 font-bold text-sm">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Explainable AI</h4>
                <p className="text-gray-600">You can always understand why AI made specific recommendations</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-lime-100 w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 border border-lime-200">
                <span className="text-lime-600 font-bold text-sm">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Human Oversight</h4>
                <p className="text-gray-600">Financial experts review and validate all AI-generated content</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </>
);

export default AboutPage;