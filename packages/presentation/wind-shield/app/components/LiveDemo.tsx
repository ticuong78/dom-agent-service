import { useState } from "react";

type DiffType = "CLASS_MUTATION" | "NODE_REPLACEMENT" | "NODE_REMOVED";

interface DiffItem {
  type: DiffType;
  target?: string;
  from?: string;
  to?: string;
  old?: string;
  new?: string;
  content?: string;
}

interface DiffResult {
  summary: { removed: number; modified: number };
  diffs: DiffItem[];
}

export function LiveDemo() {
  const [beforeHtml, setBeforeHtml] = useState(
`<div class="card">
    <img src="/avatar.jpg" alt="avatar" />
    <h1 class="title">User Profile</h1>
    <button class="btn" id="submit">Save</button>
</div>`
  );

  const [afterHtml, setAfterHtml] = useState(
`<div class="card active">
    <h2 class="title lg">tracui Profile</h2>
    <button class="btn primary" disabled>Save</button>
</div>`
  );

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DiffResult | null>(null);

  const handleRunDiff = () => {
    setIsLoading(true);
    setResult(null);

    setTimeout(() => {
      setIsLoading(false);
      setResult({
        summary: { removed: 1, modified: 3 },
        diffs: [
          {
            type: "CLASS_MUTATION",
            from: '"card"',
            to: '"card active"'
          },
          {
            type: "NODE_REPLACEMENT",
            target: "@ h1 -> h2",
            old: '<h1 class="title">User Profile</h1>',
            new: '<h2 class="title lg">tracui Profile</h2>'
          },
          {
            type: "NODE_REMOVED",
            content: '<img src="/avatar.jpg" alt="avatar" />'
          }
        ]
      });
    }, 800);
  };

  return (
    <section id="demo" className="mt-10 w-full bg-[#111827] text-white py-24 relative border-y border-slate-800">
      <div className="absolute inset-0 z-0 bg-dots-dark opacity-80"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Tiêu đề ĐÃ ĐƯỢC ĐỒNG BỘ CHUẨN MỚI */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm font-bold font-mono tracking-widest mb-6 uppercase shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span> 01 · Live Sandbox
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight font-sans">Zero setup required.</h2>
          <p className="text-[#8b9bb4] max-w-2xl mx-auto text-lg font-light font-sans">
            Paste two HTML snapshots below. See the algorithmic diff instantly in your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-slate-700 bg-[#1e293b] overflow-hidden flex flex-col shadow-2xl">
            <div className="px-5 py-3 border-b border-slate-700/50 flex justify-between items-center bg-[#1e293b]">
              <span className="text-[13px] font-bold font-mono text-white">before.html</span>
              <span className="bg-[#334155] text-white text-[10px] font-bold px-2 py-1 rounded">Editable</span>
            </div>
            <textarea
              aria-label="Old HTML Snapshot"
              value={beforeHtml}
              onChange={(e) => setBeforeHtml(e.target.value)}
              className="w-full h-64 bg-[#1e293b] text-white p-6 font-mono text-[14px] resize-none focus:outline-none code-scrollbar leading-relaxed selection:bg-teal-600/50"
              spellCheck="false"
            />
          </div>

          <div className="rounded-xl border border-slate-700 bg-[#1e293b] overflow-hidden flex flex-col shadow-2xl">
            <div className="px-5 py-3 border-b border-slate-700/50 flex justify-between items-center bg-[#1e293b]">
              <span className="text-[13px] font-bold font-mono text-white">after.html</span>
              <span className="bg-[#334155] text-white text-[10px] font-bold px-2 py-1 rounded">Editable</span>
            </div>
            <textarea
              aria-label="New HTML Snapshot"
              value={afterHtml}
              onChange={(e) => setAfterHtml(e.target.value)}
              className="w-full h-64 bg-[#1e293b] text-white p-6 font-mono text-[14px] resize-none focus:outline-none code-scrollbar leading-relaxed selection:bg-teal-600/50"
              spellCheck="false"
            />
          </div>
        </div>

        <div className="flex justify-center mt-10 mb-10">
          <button
            onClick={handleRunDiff}
            disabled={isLoading}
            className="group px-6 py-3 bg-teal-500 text-white font-semibold text-sm rounded-xl transition-all duration-200 flex items-center gap-2 shadow-btn-teal btn-hover-lift hover:bg-teal-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className={`w-4 h-4 transition-transform duration-500 ${isLoading ? 'animate-spin' : 'group-hover:rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            <span>{isLoading ? 'Analyzing...' : 'Run Analysis'}</span>
          </button>
        </div>

        {result && (
          <div className="rounded-xl border border-slate-700 bg-[#1e293b] overflow-hidden shadow-2xl">
            <div className="px-5 py-4 border-b border-slate-700/50 flex items-center gap-3 bg-[#1e293b]">
              <span className="text-[14px] font-black font-mono text-[#00ffff]">output.json</span>
              <span className="bg-[#831843] text-[#fbcfe8] text-[10px] font-black px-2.5 py-1 rounded tracking-wide">{result.summary.removed} REMOVED</span>
              <span className="bg-[#854d0e] text-[#fef08a] text-[10px] font-black px-2.5 py-1 rounded tracking-wide">{result.summary.modified} MODIFIED</span>
            </div>

            <div className="p-6 flex flex-col gap-4">
              {result.diffs.map((diff, index) => {
                if (diff.type === "CLASS_MUTATION") {
                  return (
                    <div key={index} className="bg-[#422006]/50 border border-[#b45309] p-5 rounded-lg">
                      <div className="mb-3">
                        <span className="bg-[#ca8a04] text-black text-[10px] font-black px-2 py-1 rounded tracking-widest uppercase">CLASS MUTATION</span>
                      </div>
                      <div className="font-mono text-[13px] text-white">
                        <div className="mb-1"><span className="text-[#94a3b8] w-12 inline-block">From:</span> {diff.from}</div>
                        <div><span className="text-[#94a3b8] w-12 inline-block">To:</span> <span className="bg-[#ca8a04] text-black px-1 rounded">{diff.to?.replace(/"/g, '')}</span></div>
                      </div>
                    </div>
                  );
                }
                
                if (diff.type === "NODE_REPLACEMENT") {
                  return (
                    <div key={index} className="bg-[#422006]/50 border border-[#b45309] p-5 rounded-lg">
                      <div className="mb-3 flex items-center gap-2">
                        <span className="bg-[#ca8a04] text-black text-[10px] font-black px-2 py-1 rounded tracking-widest uppercase">NODE REPLACEMENT</span>
                        <span className="text-white text-[12px] font-mono">{diff.target}</span>
                      </div>
                      <div className="font-mono text-[13px] text-white">
                        <div className="mb-1"><span className="text-[#94a3b8] w-10 inline-block">Old:</span> {diff.old}</div>
                        <div>
                          <span className="text-[#94a3b8] w-10 inline-block">New:</span> 
                          &lt;h2 class="title lg"&gt;<span className="bg-[#ca8a04] text-black px-1 rounded">tracui</span> Profile&lt;/h2&gt;
                        </div>
                      </div>
                    </div>
                  );
                }

                if (diff.type === "NODE_REMOVED") {
                  return (
                    <div key={index} className="bg-[#4c0519]/50 border border-[#9f1239] p-5 rounded-lg">
                      <div className="mb-3">
                        <span className="bg-[#be123c] text-[#fbcfe8] text-[10px] font-black px-2 py-1 rounded tracking-widest uppercase">NODE REMOVED</span>
                      </div>
                      <div className="font-mono text-[13px] text-[#fecdd3] line-through opacity-80">
                        {diff.content}
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}