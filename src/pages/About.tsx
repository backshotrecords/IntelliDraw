import React, { useEffect } from 'react';
import { PenTool, ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import heroImage from '../assets/hero.png';

export default function About() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-mesh-light selection:bg-slate-200 selection:text-slate-900 text-slate-900 flex flex-col">
      <div className="fixed top-6 left-0 w-full z-50 flex justify-center px-4 animate-fade-in-up">
        <nav className="flex items-center justify-between w-full max-w-4xl px-6 py-3 bg-white/70 backdrop-blur-lg border border-slate-200/60 rounded-full shadow-sm relative">
          <Link to="/" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <PenTool className="w-6 h-6 text-slate-900" />
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
          IntelliDraw: Restoring Balance Between Human Intent and AI Ability
        </h1>

        <div className="animate-fade-in-up">


          <div className="article-body text-slate-700">
            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">The Problem: AI Is Outpacing Our Ability to Explain</h2>
            <p className="mb-6">There’s something a little uncomfortable about how fast AI is getting better. Not in a sci‑fi, take-over-the-world way, but in a quiet, practical way. The kind where you wake up one day and realize the tools can do more than you can clearly explain. And that’s the real problem. Not that AI is too powerful, but that human intent isn’t keeping up.</p>
            <p className="mb-6">If we’re being honest, most of us struggle to fully explain what we want. We feel it, we kind of see it in our heads, but when it comes time to translate that into words… things get fuzzy. Instructions get loose. Meaning gets lost. And then we blame the tool when the output doesn’t match the vision.</p>
            <p className="mb-6">That gap, between what we mean and what we say, is where things break.</p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">A Different Belief: Keep Humans in the Loop</h2>
            <p className="mb-6">At Horizon Labs, there’s a simple belief: fully autonomous systems aren’t the answer. Not because AI isn’t capable, but because alignment matters more than capability. The goal isn’t to remove humans from the loop. It’s to strengthen their position inside it.</p>
            <p className="mb-6">Because balance is what keeps systems stable. And if AI ability is increasing, then human ability has to increase too.</p>

            {/* Hero Image */}
            <div className="-mx-2 sm:-mx-8 md:-mx-16 mb-12">
              <img
                src={heroImage}
                alt="AI and Human Intent"
                className="w-full h-auto rounded-3xl shadow-sm border border-slate-100 object-cover"
              />
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Introducing IntelliDraw</h2>
            <p className="mb-6">That’s where IntelliDraw comes in.</p>
            <p className="mb-6">IntelliDraw is built on a simple idea: before we ask AI to act, we should get better at expressing what we actually mean. Not just in words, but in structure.</p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">The New Pattern: Thought → Flowchart → Pseudocode → Agents</h2>
            <p className="mb-6">Instead of jumping straight from a thought to an instruction, IntelliDraw introduces a new step. You take your idea and turn it into a flowchart. Then that flowchart becomes dense pseudocode. And that pseudocode becomes the instruction set for agents to execute.</p>
            <p className="mb-6">It sounds technical, but it’s actually more natural than what we’re used to.</p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Why Visual Thinking Works Better</h2>
            <p className="mb-6">Think about it. Your brain doesn’t really think in paragraphs. It thinks in chunks, relationships, cause and effect. Visual patterns. That’s why diagrams often make things “click” faster than explanations.</p>
            <p className="mb-6">There’s a reason for that. Human working memory is limited. We can only hold a few moving parts in our head at once. But visual processing? That’s different. It’s denser. You can look at a diagram and understand relationships instantly that would take pages to explain.</p>
            <p className="mb-6">Flowcharts tap into that strength.</p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">What Changes When Flowcharts Meet AI</h2>
            <p className="mb-6">Now, flowcharts aren’t new. People have been using them for decades. The difference is what happens when you pair them with AI.</p>
            <p className="mb-6">Instead of being static diagrams, they become living instructions.</p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Multimodal Input: Think How You Naturally Think</h2>
            <p className="mb-6">With IntelliDraw, you can start with whatever form your thoughts naturally take, text, voice, even images, and shape them into a flowchart. That means more of your actual thinking makes it into the design. Less gets lost in translation.</p>
            <p className="mb-6">And that’s where something interesting happens.</p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">The Canvas: Seeing Your Intent Clearly</h2>
            <p className="mb-6">When your idea is laid out visually, you can see it. You can inspect it. You can spot where something doesn’t feel right. Maybe a step is missing. Maybe something loops incorrectly. Maybe the logic breaks under pressure.</p>
            <p className="mb-6">Those mistakes are much harder to catch when everything is buried inside paragraphs.</p>
            <p className="mb-6">The canvas changes that.</p>
            <p className="mb-6">It gives you a space where your intent is visible, and that visibility is powerful. You can hold more of the system in your mind at once. You can refine the plan before anything gets executed.</p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Why Pseudocode Matters</h2>
            <p className="mb-6">And once that flowchart is solid, it gets translated into dense pseudocode.</p>
            <p className="mb-6">This part matters more than it sounds.</p>
            <p className="mb-6">AI systems don’t actually think in the loose, conversational way we do. They perform better when instructions are structured, compressed, and unambiguous. Dense pseudocode hits that sweet spot. It says more, with less. It reduces ambiguity. It uses fewer tokens. It gives the system a clearer map of what to do.</p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Cleaner Handoff to Agents</h2>
            <p className="mb-6">So by the time the agent receives the instruction, it’s not guessing anymore.</p>
            <p className="mb-6">There’s less drift. Fewer hallucinations. More reliable execution.</p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">The Real Shift: Improve Thinking, Not Just Prompts</h2>
            <p className="mb-6">And that’s the real shift.</p>
            <p className="mb-6">Instead of trying to get better outputs by tweaking prompts over and over, you improve the input at its source... Instead of debugging code, you're debugging your thinking.</p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Extending Human Intelligence</h2>
            <p className="mb-6">IntelliDraw doesn’t replace human intelligence. It extends it. It gives you a way to externalize your thoughts, organize them, and hand them off with precision.</p>
            <p className="mb-6">In a way, it’s less about controlling AI, and more about becoming clearer yourself.</p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">The Bigger Picture</h2>
            <p className="mb-6">Because the future isn’t human versus AI.</p>
            <p className="mb-6">It’s human with AI.</p>
            <p className="mb-6">And the systems that win won’t be the ones that remove people from the loop. They’ll be the ones that make people sharper, more expressive, and more aligned with the tools they’re using. That's the world we imagine.</p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Final Thought</h2>
            <p className="mb-6">IntelliDraw is just one step in that direction.</p>
            <p className="mb-6">But it points to something bigger.</p>
            <p className="mb-6">A world where your ability to think clearly directly translates into your ability to build, create, and execute.</p>
            <p className="mb-6">A world where the gap between intention and outcome gets smaller.</p>
            <p className="mb-6">A world where balance is restored, not by slowing AI down, but by bringing humans up to meet it.</p>
          </div>

          <div className="mt-12 text-left">
            <Link to="/" className="inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white font-medium px-8 py-4 rounded-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
              Go to the App
            </Link>
          </div>
        </div>
      </main>

      {/* Basic Footer for subpages */}
      <footer className="bg-white border-t border-slate-200 py-8 text-center text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-6">
          © 2026 IntelliDraw. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
