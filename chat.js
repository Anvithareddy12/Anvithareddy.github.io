// chat.js — AI Twin knowledge base + chat UI (data verified from resume)

var KB = [
  { k: ['who are you', 'introduce', 'about you', 'yourself'],
    a: "Hi! I'm Anvitha's AI twin — ask me about her AMD work, RAG pipelines, NVIDIA GTC, her stack, or if she's open to roles!" },
  { k: ['amd', 'zenbot', 'text-to-sql', 'sql', 'digital twin', 'jira', 'jama', 'atm'],
    a: "At AMD (Aug 2025–Present), Anvitha built ZenBot PM Digital Twin — a two-model LLM cascade (OpenAI + Anthropic Claude) delivering Text-to-SQL access across 4 enterprise data sources: JIRA, JAMA, ATM, and Test Reports. AST-level SQL validation via sqlglot with auto-repair using INFORMATION_SCHEMA context. Result: non-technical stakeholders can self-serve complex queries with zero SQL knowledge." },
  { k: ['rag', 'retrieval', 'vector', 'pinecone', 'weaviate', 'faiss', 'embedding', 'whql'],
    a: "Anvitha built a production RAG pipeline over an enterprise corpus (WHQL, IV, IQE, reliability and declaration reports) using Pinecone, Weaviate, and FAISS for vector storage with semantic retrieval and disambiguation blocks — eliminating document-type conflation across 5+ report categories." },
  { k: ['circuit breaker', 'uptime', 'reliability', 'caching', 'latency', 'production', 'infra'],
    a: "She engineered zero cascading failures during peak query load at AMD by implementing circuit breakers, TTL-based response caching, and graceful degradation fallbacks at every layer on on-premises infrastructure." },
  { k: ['cornerstone', 'multilingual', 'whisper', 'm2m', 'elevenlabs', 'translation', 'language', 'metahuman'],
    a: "At CornerstoneX as Machine Learning Developer (Nov 2024–Aug 2025), Anvitha spearheaded a multilingual conversational AI platform supporting 50+ languages using Whisper, HuggingFace Helsinki/M2M100, and ElevenLabs with CUDA-optimised inference. Result: 300% engagement boost, 40% support ticket reduction, 90%+ translation accuracy, sub-2s latency. Also integrated Metahuman avatars driving a 40% surge in enterprise demo requests." },
  { k: ['asl', 'sign language', 'gesture', 'dhs', 'homeland'],
    a: "Anvitha engineered a CNN-based ASL Gesture Recognition System achieving 95%+ accuracy across 1,000+ gestures at 15 FPS — earning pilot approval from the U.S. Department of Homeland Security for accessibility compliance." },
  { k: ['voice', 'navigation', 'mobility', 'multi-intent'],
    a: "She built a voice-controlled navigation assistant with 85%+ precision on multi-intent commands, improving task efficiency by 40% for users with mobility challenges." },
  { k: ['nvidia', 'gtc', 'inception', 'award', 'recognition'],
    a: "Anvitha contributed to the CornerstoneX AI project that was presented at NVIDIA GTC 2025 and earned CornerstoneX selection for the NVIDIA Inception Program. The CNN-based ASL Recognition module she built earned pilot approval from the U.S. Department of Homeland Security (DHS)." },
  { k: ['skills', 'stack', 'python', 'langchain', 'llm', 'framework', 'tools', 'mcp'],
    a: "Core stack: Python, SQL, Java. LLM: LangChain, LlamaIndex, OpenAI API, Anthropic Claude API, MCP (Model Context Protocol). Vector: Pinecone, Weaviate, FAISS. Frameworks: Whisper, M2M100, Helsinki-NLP, ElevenLabs, Ollama, sqlglot, FastAPI. Tools: n8n, CUDA, Snowflake, Docker, Linux, Git, On-premises GPU. Practices: CI/CD, ruff, mypy, circuit breakers, TTL caching." },
  { k: ['hire', 'job', 'role', 'looking', 'open', 'available', 'recruit', 'position'],
    a: "Yes — Anvitha is actively looking for AI/ML Engineering roles! Specialises in LLM pipelines, RAG architectures, and Text-to-SQL. Open to full-time, hybrid, or remote. Email: anvithareddy2124@gmail.com" },
  { k: ['contact', 'email', 'linkedin', 'reach', 'connect', 'phone'],
    a: "📧 anvithareddy2124@gmail.com | LinkedIn: linkedin.com/in/anvithareddy123 | Hyderabad, TG, India | +91 9177262425" },
  { k: ['education', 'degree', 'university', 'college', 'study', 'christ', 'gpa'],
    a: "B.Tech in Computer Science (Data Science) from Christ University, Bengaluru, KA — Aug 2021 to May 2025, GPA 3.5/4.0." },
  { k: ['location', 'where', 'based', 'hyderabad', 'india'],
    a: "Anvitha is based in Hyderabad, TG, India. She's open to remote or relocating for the right AI/ML Engineering role." },
  { k: ['project', 'portfolio', 'built', 'created', 'developed'],
    a: "(1) AMD ZenBot — enterprise Text-to-SQL across JIRA/JAMA/ATM/Test Reports, LLM cascade + RAG. (2) CornerstoneX Multilingual — 50+ languages, NVIDIA GTC 2025. (3) CNN-based ASL Recognition — 95%+ accuracy, DHS approved. (4) Voice Navigation — 85%+ multi-intent precision. All shipped to real users." },
  { k: ['differentiator', 'unique', 'stand out', 'why hire', 'best', 'special'],
    a: "Anvitha ships production AI — not demos. She has DHS-approved government deployments, NVIDIA GTC 2025 (contributed to CornerstoneX project presented there), 70%+ test coverage on enterprise systems, and deep expertise across the full GenAI stack from vector retrieval to on-premises GPU inference. Engineer who thinks about reliability, cost, and latency from day one." },
  { k: ['certification', 'tata', 'forage'],
    a: "She completed a Tata Group Data Visualization job simulation (Forage Virtual Experience, 2023) focused on data storytelling and executive-level dashboard design." }
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
