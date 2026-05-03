import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import GlassAudioPlayer from '../components/GlassAudioPlayer';
import Footer from '../components/Footer';

export default function Research() {
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
          IntelliDraw vs Raw Prompting: An Experimental Evaluation of Cost, Control, and Intent Alignment
        </h1>

        {/* Audio Player - Listen to the article */}
        <div className="mb-10">
          <GlassAudioPlayer src="/experimentintellidraw.mp3" />
        </div>

        <div className="animate-fade-in-up">
          <div className="article-body text-slate-700">

            {/* Abstract */}
            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Abstract</h2>
            <p className="mb-6">This study evaluates the effectiveness of IntelliDraw, a human-in-the-loop flowcharting system, in improving AI-assisted software development workflows. By comparing a traditional raw prompt approach against an IntelliDraw-structured prompt pipeline, we measured token expenditure, interaction efficiency, and alignment with developer intent. Results indicate a significant reduction in token usage (approximately 66%), fewer clarification cycles, and improved perceived alignment with developer objectives when using IntelliDraw.</p>

            {/* Introduction */}
            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Introduction</h2>
            <p className="mb-6">As large language models become more integrated into software development workflows, a key challenge emerges: maintaining alignment between human intent and AI execution. Traditional prompt-based interactions often result in iterative clarification cycles, increased token consumption, and drift from the developer's original objective.</p>
            <p className="mb-6">IntelliDraw introduces a structured intermediary layer, transforming natural language prompts into flowchart-based representations (via Mermaid syntax) before submission to the AI system. This approach aims to externalize and refine human intent prior to execution.</p>
            <p className="mb-6">This experiment investigates whether this additional structuring step improves efficiency and output alignment.</p>

            {/* Methodology */}
            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Methodology</h2>

            <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-3">Experimental Design</h3>
            <p className="mb-4">Two parallel workflows were tested:</p>
            <ol className="list-decimal list-inside mb-6 space-y-2">
              <li><strong>Raw Prompt Workflow</strong><br />A developer submits a natural language prompt directly to the AI system.</li>
              <li><strong>IntelliDraw Workflow</strong><br />The same prompt is first processed through IntelliDraw, generating a structured flowchart (Mermaid code). The developer reviews and optionally refines this representation before submitting it to the AI system.</li>
            </ol>

            <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-3">Controls</h3>
            <ul className="list-disc list-inside mb-6 space-y-1">
              <li>Identical objective for both workflows</li>
              <li>Identical base prompt (initial developer input)</li>
              <li>Separate machines to avoid timing or system bias</li>
              <li>Simultaneous submission of prompts</li>
              <li>Same AI model used for both workflows</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-3">Instrumentation</h3>
            <p className="mb-6">A token measurement gateway ("Stop Spend Platform") was implemented to track:</p>
            <ul className="list-disc list-inside mb-6 space-y-1">
              <li>Input tokens</li>
              <li>Output tokens</li>
              <li>Cache reads/writes</li>
              <li>Total cost per run</li>
            </ul>
            <p className="mb-6">Additionally, developer feedback was recorded to assess perceived output quality and alignment.</p>

            <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-3">Process Flow</h3>
            <ol className="list-decimal list-inside mb-6 space-y-2">
              <li>Developer defines objective and initial prompt</li>
              <li>Prompt is duplicated:
                <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                  <li>Sent directly (Raw Prompt)</li>
                  <li>Processed through IntelliDraw</li>
                </ul>
              </li>
              <li>IntelliDraw generates Mermaid flowchart representation</li>
              <li>Developer reviews and makes a minor adjustment</li>
              <li>IntelliDraw output is submitted to AI system</li>
              <li>Both workflows proceed independently</li>
              <li>Token usage, interaction cycles, and outputs are recorded</li>
            </ol>

            {/* Results */}
            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Results</h2>

            <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-3">Cost Comparison</h3>
            <ul className="list-disc list-inside mb-6 space-y-1">
              <li><strong>Raw Prompt Total Cost:</strong> $6.44</li>
              <li><strong>IntelliDraw Total Cost:</strong> $2.40</li>
            </ul>
            <p className="mb-6">This represents a <strong>66% reduction in token expenditure</strong> when using IntelliDraw.</p>

            {/* Actual Results Screenshots from Stop Spend Platform */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 -mx-2 sm:-mx-8 md:-mx-16 mb-8">
              <div>
                <img
                  src="/results-raw-prompt-actual.jpg"
                  alt="Raw Prompt Results - Stop Spend Platform showing $6.4444 total cost with 6 prompts"
                  className="w-full h-auto rounded-2xl shadow-sm border border-slate-100 object-cover"
                />
                <p className="text-center text-sm text-slate-500 mt-2">Raw Prompt — $6.44 total cost</p>
              </div>
              <div>
                <img
                  src="/results-intellidraw-actual.jpg"
                  alt="IntelliDraw Results - Stop Spend Platform showing $2.4039 total cost with 2 prompts"
                  className="w-full h-auto rounded-2xl shadow-sm border border-slate-100 object-cover"
                />
                <p className="text-center text-sm text-slate-500 mt-2">IntelliDraw — $2.40 total cost</p>
              </div>
            </div>

            {/* Generated Analysis Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 -mx-2 sm:-mx-8 md:-mx-16 mb-12">
              <div>
                <img
                  src="/results-raw-prompt.png"
                  alt="Raw Prompt Analysis Chart"
                  className="w-full h-auto rounded-2xl shadow-sm border border-slate-100 object-cover"
                />
                <p className="text-center text-sm text-slate-500 mt-2">Raw Prompt — Token Usage Analysis</p>
              </div>
              <div>
                <img
                  src="/results-intellidraw.png"
                  alt="IntelliDraw Analysis Chart"
                  className="w-full h-auto rounded-2xl shadow-sm border border-slate-100 object-cover"
                />
                <p className="text-center text-sm text-slate-500 mt-2">IntelliDraw — Token Usage Analysis</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-3">Interaction Efficiency</h3>
            <ul className="list-disc list-inside mb-6 space-y-1">
              <li><strong>Raw Prompt:</strong> 6 follow-up approval cycles</li>
              <li><strong>IntelliDraw:</strong> 1 follow-up approval cycle</li>
            </ul>
            <p className="mb-6">IntelliDraw significantly reduced the number of clarification interactions required.</p>

            <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-3">Output Alignment (Developer Satisfaction)</h3>
            <p className="mb-4">The developer reported that:</p>
            <ul className="list-disc list-inside mb-6 space-y-1">
              <li>IntelliDraw-generated workflow produced outputs more closely aligned with intended objectives</li>
              <li>Follow-up questions from the AI were more relevant and context-aware</li>
            </ul>
            <p className="mb-6">This suggests a reduction in "intent drift" during execution.</p>

            {/* Discussion */}
            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Discussion</h2>
            <p className="mb-6">The results suggest that IntelliDraw improves both efficiency and effectiveness in AI-assisted development workflows. By converting abstract intent into structured logic before execution, IntelliDraw reduces ambiguity and guides the AI toward more deterministic outputs.</p>

            <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-3">Key Observations</h3>
            <ul className="list-disc list-inside mb-6 space-y-1">
              <li><strong>Pre-structuring reduces entropy:</strong> The flowchart representation acts as a constraint system that narrows interpretation space</li>
              <li><strong>Fewer clarification cycles:</strong> Clearer intent reduces the need for iterative refinement</li>
              <li><strong>Improved alignment:</strong> Outputs better reflect the developer's mental model</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-3">Interpretation</h3>
            <p className="mb-6">IntelliDraw functions as a cognitive amplification layer. Instead of relying on iterative conversational refinement, it enables developers to "compile" their intent into a structured representation before execution.</p>
            <p className="mb-4">This mirrors established software engineering principles:</p>
            <ul className="list-disc list-inside mb-6 space-y-1">
              <li>Separation of planning and execution</li>
              <li>Explicit modeling before implementation</li>
              <li>Reduction of ambiguity through formalization</li>
            </ul>

            {/* Implications */}
            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Implications</h2>

            <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-3">For Developers</h3>
            <ul className="list-disc list-inside mb-6 space-y-1">
              <li>Reduced cost and faster iteration cycles</li>
              <li>Greater control over AI behavior</li>
              <li>Improved reliability of outputs</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-3">For AI Systems</h3>
            <ul className="list-disc list-inside mb-6 space-y-1">
              <li>Highlights the importance of structured input representations</li>
              <li>Suggests a hybrid paradigm: human-guided structure + AI execution</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-3">For Future Tooling</h3>
            <ul className="list-disc list-inside mb-6 space-y-1">
              <li>Opportunity for integrated flowchart-to-code pipelines</li>
              <li>Potential for standardizing intermediate representations (e.g., Mermaid as pseudo-DSL)</li>
            </ul>

            {/* Limitations */}
            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Limitations</h2>
            <ul className="list-disc list-inside mb-6 space-y-1">
              <li>Single developer involved in evaluation</li>
              <li>Subjective measurement of output quality (developer satisfaction)</li>
              <li>Limited scope of task complexity</li>
            </ul>
            <p className="mb-6">Future studies should include larger sample sizes, diverse task types, and quantitative output validation metrics.</p>

            {/* Conclusion */}
            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Conclusion</h2>
            <p className="mb-6">This experiment demonstrates that IntelliDraw significantly improves efficiency and alignment in AI-assisted development workflows. By introducing a structured intermediary step, it reduces token consumption, minimizes interaction overhead, and enhances adherence to developer intent.</p>
            <p className="mb-6">IntelliDraw represents a shift from prompt engineering toward intent engineering, where the focus moves from crafting better prompts to designing clearer representations of thought.</p>

            {/* Divider and Keywords */}
            <hr className="my-10 border-slate-200" />
            <p className="text-sm text-slate-500 italic">
              <strong>Keywords:</strong> Human-in-the-loop, Prompt Engineering, Flowchart Programming, AI Alignment, Developer Productivity, Token Optimization
            </p>

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
