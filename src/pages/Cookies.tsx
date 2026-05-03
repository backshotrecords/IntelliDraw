import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Cookies() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-mesh-light selection:bg-slate-200 selection:text-slate-900 text-slate-900 flex flex-col">
      <div className="fixed top-6 left-0 w-full z-50 flex justify-center px-4 animate-fade-in-up">
        <nav className="flex items-center justify-between w-full max-w-4xl px-6 py-3 bg-white/70 backdrop-blur-lg border border-slate-200/60 rounded-full shadow-sm relative">
          <Link to="/" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <img src="/favicon.svg" alt="IntelliDraw" className="w-6 h-6" />
            <span className="font-bold tracking-tight text-lg">IntelliDraw</span>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </nav>
      </div>

      <main className="flex-1 max-w-3xl w-full mx-auto px-6 pt-40 pb-24">

        <h1 className="article-title text-4xl md:text-5xl font-bold text-[#111827] mb-10 leading-tight">
          IntelliDraw Cookie Policy
        </h1>

        <div className="animate-fade-in-up">
          <div className="article-body text-slate-700">
            <p className="mb-6">IntelliDraw currently does <strong>not use cookies</strong> or similar tracking technologies to collect, store, or process user data.</p>

            <p className="mb-6">We do not track user behavior through cookies, we do not store personal information in cookies, and we do not sell or share user data collected through cookies.</p>

            <p className="mb-6">At this time, IntelliDraw operates without the use of cookies in any form.</p>

            <hr className="my-10 border-slate-200" />

            <h3 className="text-xl font-bold text-slate-900 mt-10 mb-4">Future Use of Cookies</h3>

            <p className="mb-6">IntelliDraw may introduce the use of cookies or similar technologies in the future to improve functionality, enhance user experience, or support system performance.</p>

            <p className="mb-6">If cookies are introduced, this section of the website will be updated to reflect:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>The types of cookies being used</li>
              <li>The purpose of those cookies</li>
              <li>How user data is handled</li>
              <li>Any relevant user controls or options</li>
            </ul>

            <p className="mb-6">By continuing to use IntelliDraw after such an update, users acknowledge that they have been informed of the introduction of cookies through this policy update.</p>

            <hr className="my-10 border-slate-200" />

            <h3 className="text-xl font-bold text-slate-900 mt-10 mb-4">Data Use Statement</h3>

            <p className="mb-6">We do not sell user data.</p>

            <p className="mb-6">We do not collect user data through cookies.</p>

            <p className="mb-6">Any data that may be collected through other parts of the IntelliDraw system is handled separately and is not governed by cookie-based tracking.</p>

            <hr className="my-10 border-slate-200" />

            <p className="mb-6 italic text-slate-500">This policy is subject to change as IntelliDraw evolves. Users are encouraged to review this section periodically for updates.</p>
          </div>

          <div className="mt-12 text-left">
            <Link to="/" className="inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white font-medium px-8 py-4 rounded-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
              Go to the App
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
