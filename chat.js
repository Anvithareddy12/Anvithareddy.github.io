// chat.js — AI Twin knowledge base + chat UI (data verified from resume)

var KB = [
  { k: ['who are you', 'introduce', 'about you', 'yourself'],
    a: "Hi! I'm Anvitha's AI twin — ask me about her AMD work, RAG pipelines, NVIDIA GTC, her stack, or if she's open to roles!" },
  { k: ['amd', 'zenbot', 'text-to-sql', 'sql', 'digital twin', 'enterprise agent', 'jira', 'jama', 'atm'],
    a: "At AMD (Aug 2025–Present), Anvitha designed and shipped ZenBot, an enterprise AI agent answering plain-language questions across 4 previously disconnected systems (JIRA, JAMA, test automation, and report repositories) — cutting a recurring 2–4 hour manual analysis to under 2 minutes. It runs a two-model LLM cascade (an intent classifier routing to a SQL-generation model) with AST-level validation via sqlglot and a schema-grounded auto-repair loop, so non-technical stakeholders self-serve complex queries with zero SQL. Accepted as a Software Poster at AMD AATC 2026." },
  { k: ['rag', 'retrieval', 'vector', 'pinecone', 'weaviate', 'faiss', 'embedding', 'whql'],
    a: "ZenBot integrates semantic retrieval (RAG) over the enterprise report corpus into a unified query layer, with report-type disambiguation across five categories, exposed through 12+ MCP tool endpoints. Anvitha owns the structured-data core (JIRA/JAMA/ATM + the Snowflake Text-to-SQL layer) and integrated retrieval into that unified system." },
  { k: ['circuit breaker', 'uptime', 'reliability', 'caching', 'latency', 'production', 'infra'],
    a: "She hardened the on-premises deployment against cascading failures by implementing circuit breakers, TTL-based response caching, and graceful degradation fallbacks at every layer, backed by a CI/CD pipeline (ruff, mypy, unit + integration tests) enforcing a 70% coverage gate." },
  { k: ['cornerstone', 'multilingual', 'whisper', 'm2m', 'elevenlabs', 'translation', 'language', 'metahuman'],
    a: "At CornerstoneX as an AI Engineer (Nov 2024–Aug 2025, Remote), Anvitha built the real-time multilingual speech engine behind a client-funded agentic-AI metahuman: users speak in their own language and receive spoken, avatar-delivered answers across 50+ languages. She architected an English-pivot translation layer composing 50+ Helsinki-NLP OPUS-MT models with an M2M100 fallback, GPU-accelerated on CUDA for live conversation." },
  { k: ['asl', 'sign language', 'gesture', 'dhs', 'homeland'],
    a: "Anvitha trained a CNN-based ASL gesture-recognition model for real-time sign-language translation, delivered for a U.S. Department of Homeland Security client in public-transit accessibility settings." },
  { k: ['voice', 'navigation', 'mobility', 'multi-intent'],
    a: "She engineered an LLM-driven voice assistant that maps natural-language commands to structured browser and desktop actions (Selenium, Playwright), enabling hands-free multi-step navigation for users with mobility challenges." },
  { k: ['nvidia', 'gtc', 'inception', 'award', 'recognition'],
    a: "Anvitha contributed to the CornerstoneX platform that was presented at NVIDIA GTC 2025 and selected for the NVIDIA Inception Program. Her AMD ZenBot work was also accepted as a Software Poster at the AMD Asia Technical Conference (AATC) 2026." },
  { k: ['skills', 'stack', 'python', 'langchain', 'llm', 'framework', 'tools', 'mcp'],
    a: "Core stack: Python, SQL. LLM: LangChain, LlamaIndex, OpenAI API, Anthropic Claude API, MCP (Model Context Protocol). Vector: Pinecone, Weaviate, FAISS. Frameworks: Whisper, M2M100, Helsinki-NLP, ElevenLabs, Ollama, sqlglot, FastAPI, Selenium, Playwright. Tools: n8n, CUDA, Snowflake, Docker, Linux, Git, On-premises GPU. Practices: CI/CD, ruff, mypy, circuit breakers, TTL caching." },
  { k: ['hire', 'job', 'role', 'looking', 'open', 'available', 'recruit', 'position'],
    a: "Yes — Anvitha is actively looking for AI/ML Engineering roles! Specialises in LLM pipelines, RAG architectures, and Text-to-SQL. Open to full-time, hybrid, or remote. Email: anvithareddy2124@gmail.com" },
  { k: ['contact', 'email', 'linkedin', 'reach', 'connect', 'phone'],
    a: "📧 anvithareddy2124@gmail.com | LinkedIn: linkedin.com/in/anvithareddy123 | Hyderabad, TG, India | +91 9177262425" },
  { k: ['education', 'degree', 'university', 'college', 'study', 'christ', 'gpa'],
    a: "B.Tech in Computer Science (Data Science) from Christ University, Bengaluru, KA — Aug 2021 to May 2025, GPA 3.5/4.0." },
  { k: ['location', 'where', 'based', 'hyderabad', 'india'],
    a: "Anvitha is based in Hyderabad, TG, India. She's open to remote or relocating for the right AI/ML Engineering role." },
  { k: ['project', 'portfolio', 'built', 'created', 'developed'],
    a: "(1) AMD ZenBot — enterprise AI agent, Text-to-SQL across JIRA/JAMA/ATM/Reports, two-model LLM cascade + RAG, AATC 2026 poster. (2) CornerstoneX Multilingual Speech Engine — 50+ languages, English-pivot OPUS-MT + M2M100, NVIDIA GTC 2025. (3) CNN-based ASL Recognition — real-time sign-language translation for a U.S. DHS client. (4) Voice Navigation — LLM-driven browser/desktop automation for accessibility. All shipped to real users." },
  { k: ['differentiator', 'unique', 'stand out', 'why hire', 'best', 'special'],
    a: "Anvitha ships production AI — not demos. At AMD she took an analytics agent from concept to a working system that cut a 2–4 hour manual analysis to under 2 minutes, with near-zero hallucination, 70%+ test coverage, and CI/CD. She works across the full GenAI stack — Text-to-SQL, RAG, real-time speech, on-prem GPU inference — and thinks about reliability, cost, and latency from day one." }
];

function getResp(msg) {
  var low = msg.toLowerCase();
  for (var i = 0; i < KB.length; i++) {
    for (var j = 0; j < KB[i].k.length; j++) {
      if (low.indexOf(KB[i].k[j]) !== -1) return KB[i].a;
    }
  }
  return "That's something Anvitha can answer better directly! Reach her at anvithareddy2124@gmail.com or connect on LinkedIn: linkedin.com/in/anvithareddy123 — she typically responds within 24 hours.";
}

function addMsg(text, role) {
  var p = document.getElementById('chat-messages');
  if (!p) return;
  var d = document.createElement('div');
  d.className = 'cmsg ' + role;
  d.textContent = text;
  p.appendChild(d);
  p.scrollTop = p.scrollHeight;
}

function showTyping() {
  var p = document.getElementById('chat-messages');
  if (!p) return null;
  var d = document.createElement('div');
  d.className = 'cmsg bot typing-dots';
  d.innerHTML = '<span></span><span></span><span></span>';
  p.appendChild(d);
  p.scrollTop = p.scrollHeight;
  return d;
}

function sendChat() {
  var inp = document.getElementById('chat-input');
  if (!inp) return;
  var msg = inp.value.trim();
  if (!msg) return;
  inp.value = '';
  addMsg(msg, 'user');
  var ind = showTyping();
  setTimeout(function () { if (ind) ind.remove(); addMsg(getResp(msg), 'bot'); }, 650 + Math.random() * 400);
}

function sendSugg(btn) {
  var txt = btn.textContent;
  var suggs = document.getElementById('chat-suggestions');
  if (suggs) suggs.style.display = 'none';
  addMsg(txt, 'user');
  var ind = showTyping();
  setTimeout(function () { if (ind) ind.remove(); addMsg(getResp(txt), 'bot'); }, 650 + Math.random() * 400);
}

function openChat() {
  var p = document.getElementById('chat-panel');
  var t = document.getElementById('chat-toggle');
  if (p) p.style.display = 'flex';
  if (t) t.textContent = '✕ Close';
}

function closeChat() {
  var p = document.getElementById('chat-panel');
  var t = document.getElementById('chat-toggle');
  if (p) p.style.display = 'none';
  if (t) t.textContent = '✦ Ask AI';
}

function toggleChat() {
  var p = document.getElementById('chat-panel');
  if (p && p.style.display === 'flex') { closeChat(); } else { openChat(); }
}

document.addEventListener('DOMContentLoaded', function () {
  var inp = document.getElementById('chat-input');
  if (inp) inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') sendChat(); });
});
