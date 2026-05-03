import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Terms() {
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
          Terms of Service
        </h1>

        <div className="animate-fade-in-up">
          <div className="article-body text-slate-700">
            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">IntelliDraw Ownership &amp; Usage Notice</h2>

            <p className="mb-6">IntelliDraw is an original software application, concept, workflow system, interface design, and product framework created and owned by <strong>Erinski Easy</strong>.</p>

            <p className="mb-6">All rights, ideas, designs, diagrams, workflows, source code, branding, product logic, documentation, and related materials connected to IntelliDraw remain the intellectual property of <strong>Erinski Easy</strong>, unless otherwise agreed in writing.</p>

            <p className="mb-6">Users, collaborators, testers, or reviewers may be granted limited access to IntelliDraw for demonstration, testing, feedback, or internal use only. This access does <strong>not</strong> transfer ownership, licensing rights, resale rights, reproduction rights, or the right to copy, modify, distribute, reverse-engineer, commercialize, or recreate IntelliDraw or any substantially similar system.</p>

            <p className="mb-6">Any feedback, suggestions, bug reports, feature ideas, or improvement recommendations provided in relation to IntelliDraw may be reviewed and incorporated by <strong>Erinski Easy</strong> without creating ownership claims by the person providing the feedback.</p>

            <p className="mb-6">Unauthorized copying, redistribution, public release, commercial use, or derivative development based on IntelliDraw is strictly prohibited without prior written permission from <strong>Erinski Easy</strong>.</p>

            <p className="mb-6">By accessing, reviewing, testing, or using IntelliDraw, you acknowledge that IntelliDraw and its related intellectual property belong to <strong>Erinski Easy</strong>, and you agree to respect these ownership and usage restrictions.</p>

            <hr className="my-10 border-slate-200" />

            <p className="mb-6 italic text-slate-500">This notice is intended as a basic ownership and usage statement and does not replace formal legal advice or a full software license agreement.</p>
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
