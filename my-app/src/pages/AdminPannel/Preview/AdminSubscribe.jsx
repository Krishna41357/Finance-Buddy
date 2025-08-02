import React from "react";

const AdminSubscribe = ({ content = {}, setContent }) => {
  const handleChange = (key, value) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  return (
    <section className="py-20 px-6 md:px-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-green-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-green-300/15 rounded-full blur-2xl animate-pulse delay-500" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
        {/* Left Side */}
        <div className="flex-1 flex flex-col items-center lg:items-start">
          {/* Image Card */}
          <div className="relative mb-8">
            <div
              className="w-80 h-80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                boxShadow: '0 25px 45px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 via-transparent to-emerald-500/10 pointer-events-none" />
              <img src="/subscribe.png" alt="Subscribe" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-400/20 to-emerald-500/20 blur-xl animate-pulse opacity-50" />
          </div>

          {/* Editable Title */}
          <div className="text-center lg:text-left">
            <h3 className="text-3xl font-bold text-white mb-4">
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleChange("subscribeTitleWhite", e.target.innerText)}
              >
                {content.subscribeTitleWhite || "Subscribe to the "}
              </span>
              <br />
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleChange("subscribeTitleGreen", e.target.innerText)}
                className="text-green-400 drop-shadow-[0_0_20px_#22c55e] block lg:inline"
                style={{ textShadow: '0 0 30px #22c55e, 0 0 40px #22c55e' }}
              >
                {content.subscribeTitleGreen || "FinVeda Newsletter!"}
              </span>
            </h3>

            {/* Subtitle */}
            <p
              className="text-gray-300 mb-6 text-lg"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleChange("subscribeSubtitle", e.target.innerText)}
            >
              {content.subscribeSubtitle || "Join thousands of smart investors & start growing your wealth today!"}
            </p>

            {/* Stars */}
            <div className="flex items-center justify-center lg:justify-start space-x-2 text-5xl">
              <span className="text-yellow-400 drop-shadow-[0_0_10px_#fbbf24] animate-pulse">★</span>
              <span className="text-yellow-400 drop-shadow-[0_0_10px_#fbbf24] animate-pulse delay-100">★</span>
              <span className="text-yellow-400 drop-shadow-[0_0_10px_#fbbf24] animate-pulse delay-200">★</span>
              <span className="text-yellow-400 drop-shadow-[0_0_10px_#fbbf24] animate-pulse delay-300">★</span>
              <span className="text-gray-400 drop-shadow-[0_0_5px_#9ca3af] animate-pulse delay-400">★</span>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="flex-1 w-full max-w-lg">
          <div
            className="relative backdrop-blur-xl border border-white/10 shadow-2xl p-10 rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
              boxShadow: '0 25px 45px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-400/10 via-transparent to-emerald-500/10 pointer-events-none" />

            <div className="relative z-10">
              <div className="relative mb-6">
                <input
                  type="email"
                  placeholder="Enter your Email"
                  className="w-full p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-green-400/50 transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
                  }}
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/10 to-emerald-400/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full blur-xl bg-green-400 opacity-30 animate-pulse" />
                <button
                  className="relative w-full backdrop-blur-md bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-4 px-8 rounded-full shadow-2xl border border-green-400/30 transition-all duration-300 hover:scale-105 hover:shadow-green-500/50"
                >
                  Subscribe Now
                </button>
              </div>

              {/* Description */}
              <p
                className="text-gray-300 text-sm leading-relaxed text-center"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleChange("subscribeDescription", e.target.innerText)}
              >
                {content.subscribeDescription ||
                  "Stay ahead in your financial journey with exclusive insights, expert tips, and real-time market updates — delivered straight to your inbox!"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminSubscribe;
