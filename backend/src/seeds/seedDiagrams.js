'use strict';
const { query } = require('../config/database');
require('../config/env');

const DISPLAY_NUMBERS = {
  'time-complexity':        '1',
  'space-complexity':       '2',
  'arrays':                 '3',
  'strings':                '4',
  'two-pointers':           '5',
  'sliding-window':         '6',
  'hashing':                '7',
  'stacks':                 '8',
  'queues':                 '9',
  'linked-lists':           '10',
  'doubly-linked-lists':    '10.1',
  'recursion':              '11',
  'binary-search':          '12',
  'sorting-algorithms':     '13',
  'merge-sort':             '13.1',
  'quick-sort':             '13.2',
  'trees':                  '14',
  'binary-search-trees':    '14.1',
  'avl-trees':              '14.2',
  'heaps':                  '15',
  'graphs':                 '16',
  'bfs':                    '17',
  'dfs':                    '18',
  'dynamic-programming':    '19',
  'dp-1d':                  '19.1',
  'dp-2d':                  '19.2',
  'greedy-algorithms':      '20',
  'backtracking':           '21',
  'tries':                  '22',
  'segment-trees':          '23',
  'union-find':             '24',
  'bit-manipulation':       '25',
  'math-and-number-theory': '26',
  'prefix-sums':            '27',
  'monotonic-stack':        '28',
  'intervals':              '29',
  'matrix':                 '30',
  'topological-sort':       '31',
  'shortest-path':          '32',
  'minimum-spanning-tree':  '33',
  'advanced-dp':            '34',
  'string-matching':        '35',
  'divide-and-conquer':     '36',
  'randomized-algorithms':  '37',
};

const DIAGRAMS = {
  'time-complexity': {
    description: 'Big-O complexity curves showing how algorithm runtime scales with input size n.',
    svg: `<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" font-family="system-ui,sans-serif">
  <rect width="400" height="260" fill="#f8fafc" rx="8"/>
  <!-- axes -->
  <line x1="50" y1="220" x2="380" y2="220" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="50" y1="220" x2="50" y2="20" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="210" y="250" text-anchor="middle" font-size="12" fill="#64748b">Input size (n)</text>
  <text x="16" y="120" text-anchor="middle" font-size="12" fill="#64748b" transform="rotate(-90,16,120)">Operations</text>
  <!-- O(1) -->
  <line x1="50" y1="200" x2="370" y2="200" stroke="#16a34a" stroke-width="2"/>
  <text x="375" y="204" font-size="10" fill="#16a34a">O(1)</text>
  <!-- O(log n) -->
  <path d="M50,200 Q150,170 370,140" fill="none" stroke="#2563eb" stroke-width="2"/>
  <text x="375" y="144" font-size="10" fill="#2563eb">O(log n)</text>
  <!-- O(n) -->
  <line x1="50" y1="200" x2="370" y2="80" stroke="#f59e0b" stroke-width="2"/>
  <text x="375" y="84" font-size="10" fill="#f59e0b">O(n)</text>
  <!-- O(n log n) -->
  <path d="M50,200 Q200,100 370,50" fill="none" stroke="#f97316" stroke-width="2"/>
  <text x="351" y="44" font-size="10" fill="#f97316">O(n log n)</text>
  <!-- O(n^2) -->
  <path d="M50,200 Q160,180 200,120 Q250,60 280,30" fill="none" stroke="#dc2626" stroke-width="2"/>
  <text x="284" y="28" font-size="10" fill="#dc2626">O(n²)</text>
</svg>`,
  },

  'arrays': {
    description: 'An array stores elements at contiguous memory addresses. Index-based O(1) access.',
    svg: `<svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg" font-family="system-ui,sans-serif">
  <rect width="400" height="160" fill="#f8fafc" rx="8"/>
  <text x="200" y="28" text-anchor="middle" font-size="14" font-weight="600" fill="#1e293b">Array Memory Layout</text>
  <!-- cells -->
  ${[0,1,2,3,4,5].map((i) => {
    const vals = [7,12,3,45,8,21];
    const x = 35 + i * 56;
    return `<rect x="${x}" y="55" width="50" height="50" rx="4" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="${x+25}" y="85" text-anchor="middle" font-size="16" font-weight="700" fill="#1e40af">${vals[i]}</text>
  <text x="${x+25}" y="120" text-anchor="middle" font-size="11" fill="#64748b">[${i}]</text>`;
  }).join('\n  ')}
  <!-- address labels -->
  <text x="200" y="148" text-anchor="middle" font-size="10" fill="#94a3b8">Index 0–5 · O(1) access · O(n) search</text>
</svg>`,
  },

  'two-pointers': {
    description: 'Two pointers move toward each other to find pairs or check conditions in O(n).',
    svg: `<svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg" font-family="system-ui,sans-serif">
  <rect width="400" height="180" fill="#f8fafc" rx="8"/>
  <text x="200" y="28" text-anchor="middle" font-size="14" font-weight="600" fill="#1e293b">Two Pointers Pattern</text>
  ${[1,3,6,9,12,17,21].map((v,i) => {
    const x = 30 + i * 50;
    const highlight = i === 1 || i === 5;
    return `<rect x="${x}" y="50" width="44" height="44" rx="4" fill="${highlight ? '#bbf7d0' : '#e2e8f0'}" stroke="${highlight ? '#16a34a' : '#94a3b8'}" stroke-width="${highlight ? 2 : 1}"/>
  <text x="${x+22}" y="77" text-anchor="middle" font-size="15" font-weight="600" fill="#1e293b">${v}</text>`;
  }).join('\n  ')}
  <!-- left pointer -->
  <text x="74" y="112" text-anchor="middle" font-size="20" fill="#16a34a">↑</text>
  <text x="74" y="130" text-anchor="middle" font-size="11" font-weight="700" fill="#16a34a">L</text>
  <!-- right pointer -->
  <text x="274" y="112" text-anchor="middle" font-size="20" fill="#dc2626">↑</text>
  <text x="274" y="130" text-anchor="middle" font-size="11" font-weight="700" fill="#dc2626">R</text>
  <text x="200" y="165" text-anchor="middle" font-size="11" fill="#64748b">Move L right if sum too small · move R left if too large</text>
</svg>`,
  },

  'sliding-window': {
    description: 'A window slides across the array, expanding/shrinking to maintain a constraint.',
    svg: `<svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg" font-family="system-ui,sans-serif">
  <rect width="400" height="180" fill="#f8fafc" rx="8"/>
  <text x="200" y="28" text-anchor="middle" font-size="14" font-weight="600" fill="#1e293b">Sliding Window</text>
  ${[2,4,1,7,5,3,6,8].map((v,i) => {
    const x = 18 + i * 46;
    const inWindow = i >= 2 && i <= 5;
    return `<rect x="${x}" y="50" width="40" height="40" rx="3" fill="${inWindow ? '#dbeafe' : '#f1f5f9'}" stroke="${inWindow ? '#2563eb' : '#cbd5e1'}" stroke-width="${inWindow ? 2 : 1}"/>
  <text x="${x+20}" y="75" text-anchor="middle" font-size="14" font-weight="600" fill="${inWindow ? '#1d4ed8' : '#64748b'}">${v}</text>`;
  }).join('\n  ')}
  <!-- bracket -->
  <rect x="63" y="45" width="188" height="52" rx="4" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-dasharray="5 3"/>
  <text x="157" y="115" text-anchor="middle" font-size="11" font-weight="700" fill="#2563eb">current window (size 4)</text>
  <text x="200" y="148" text-anchor="middle" font-size="10" fill="#64748b">sum = 1+7+5+3 = 16 · slide right →</text>
  <text x="200" y="165" text-anchor="middle" font-size="10" fill="#64748b">Avoids recomputing overlap: O(n) instead of O(n²)</text>
</svg>`,
  },

  'stacks': {
    description: 'A stack is LIFO — push adds to top, pop removes from top. Used for undo, call stack, bracket matching.',
    svg: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" font-family="system-ui,sans-serif">
  <rect width="400" height="220" fill="#f8fafc" rx="8"/>
  <text x="200" y="26" text-anchor="middle" font-size="14" font-weight="600" fill="#1e293b">Stack (LIFO)</text>
  <!-- stack frame -->
  <rect x="140" y="35" width="120" height="165" rx="6" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5"/>
  ${['C (top)','B','A (bottom)'].map((label,i) => {
    const y = 50 + i * 48;
    const isTop = i === 0;
    return `<rect x="150" y="${y}" width="100" height="38" rx="4" fill="${isTop ? '#bbf7d0' : '#dbeafe'}" stroke="${isTop ? '#16a34a' : '#3b82f6'}" stroke-width="${isTop ? 2 : 1}"/>
  <text x="200" y="${y+23}" text-anchor="middle" font-size="13" font-weight="${isTop ? 700 : 500}" fill="${isTop ? '#15803d' : '#1e40af'}">${label}</text>`;
  }).join('\n  ')}
  <!-- arrow push -->
  <text x="295" y="68" font-size="12" fill="#16a34a" font-weight="600">push(D)</text>
  <line x1="288" y1="72" x2="258" y2="72" stroke="#16a34a" stroke-width="1.5" marker-end="url(#arr)"/>
  <defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#16a34a"/></marker></defs>
  <!-- arrow pop -->
  <text x="295" y="100" font-size="12" fill="#dc2626" font-weight="600">pop() → C</text>
  <line x1="258" y1="90" x2="288" y2="90" stroke="#dc2626" stroke-width="1.5" marker-end="url(#arr2)"/>
  <defs><marker id="arr2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#dc2626"/></marker></defs>
  <text x="200" y="210" text-anchor="middle" font-size="10" fill="#64748b">push O(1) · pop O(1) · peek O(1)</text>
</svg>`,
  },

  'queues': {
    description: 'A queue is FIFO — enqueue adds to rear, dequeue removes from front. Used in BFS, task scheduling.',
    svg: `<svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg" font-family="system-ui,sans-serif">
  <rect width="400" height="180" fill="#f8fafc" rx="8"/>
  <text x="200" y="26" text-anchor="middle" font-size="14" font-weight="600" fill="#1e293b">Queue (FIFO)</text>
  <!-- enqueue arrow -->
  <text x="22" y="90" font-size="11" fill="#16a34a" font-weight="600">enqueue</text>
  <line x1="25" y1="96" x2="58" y2="96" stroke="#16a34a" stroke-width="1.5" marker-end="url(#ga)"/>
  <defs><marker id="ga" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#16a34a"/></marker></defs>
  <!-- cells -->
  ${['A\n(front)','B','C','D\n(rear)'].map((v,i) => {
    const vals = ['A (front)','B','C','D (rear)'];
    const x = 62 + i * 72;
    const isEdge = i === 0 || i === 3;
    return `<rect x="${x}" y="70" width="66" height="44" rx="4" fill="${isEdge ? '#bbf7d0' : '#dbeafe'}" stroke="${isEdge ? '#16a34a' : '#3b82f6'}" stroke-width="${isEdge ? 2 : 1}"/>
  <text x="${x+33}" y="97" text-anchor="middle" font-size="12" font-weight="${isEdge ? 700 : 500}" fill="${isEdge ? '#15803d' : '#1e40af'}">${vals[i]}</text>`;
  }).join('\n  ')}
  <!-- dequeue arrow -->
  <text x="350" y="80" font-size="11" fill="#dc2626" font-weight="600">dequeue</text>
  <text x="354" y="93" font-size="11" fill="#dc2626" font-weight="600">→ A</text>
  <text x="200" y="148" text-anchor="middle" font-size="10" fill="#64748b">enqueue O(1) · dequeue O(1) · First In, First Out</text>
</svg>`,
  },

  'linked-lists': {
    description: 'A singly linked list — each node holds data and a pointer to the next node.',
    svg: `<svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg" font-family="system-ui,sans-serif">
  <rect width="400" height="160" fill="#f8fafc" rx="8"/>
  <text x="200" y="26" text-anchor="middle" font-size="14" font-weight="600" fill="#1e293b">Singly Linked List</text>
  ${[1,2,3,4].map((v,i) => {
    const x = 20 + i * 92;
    return `<!-- node ${v} -->
  <rect x="${x}" y="55" width="50" height="40" rx="4" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="${x+25}" y="79" text-anchor="middle" font-size="16" font-weight="700" fill="#1e40af">${v}</text>
  <rect x="${x+50}" y="55" width="28" height="40" rx="0 4 4 0" fill="#e0e7ff" stroke="#6366f1" stroke-width="1.5"/>
  <text x="${x+64}" y="79" text-anchor="middle" font-size="11" fill="#4338ca">•→</text>
  ${i < 3 ? `<line x1="${x+78}" y1="75" x2="${x+92}" y2="75" stroke="#6366f1" stroke-width="1.5" marker-end="url(#la)"/>` : `<text x="${x+72}" y="79" font-size="12" fill="#94a3b8">∅</text>`}`;
  }).join('\n  ')}
  <defs><marker id="la" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#6366f1"/></marker></defs>
  <text x="20" y="120" font-size="11" fill="#16a34a" font-weight="600">HEAD</text>
  <text x="200" y="148" text-anchor="middle" font-size="10" fill="#64748b">Insert/Delete at head O(1) · Search O(n) · No random access</text>
</svg>`,
  },

  'binary-search': {
    description: 'Binary search halves the search space each step — O(log n) on a sorted array.',
    svg: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" font-family="system-ui,sans-serif">
  <rect width="400" height="200" fill="#f8fafc" rx="8"/>
  <text x="200" y="26" text-anchor="middle" font-size="14" font-weight="600" fill="#1e293b">Binary Search — find 45</text>
  <!-- step 1 -->
  <text x="10" y="52" font-size="10" fill="#64748b">Step 1:</text>
  ${[3,8,15,23,45,67,82,91].map((v,i) => {
    const x = 50 + i * 42;
    const isMid = i === 3;
    const inRange = true;
    return `<rect x="${x}" y="38" width="36" height="26" rx="3" fill="${isMid ? '#fef3c7' : '#e2e8f0'}" stroke="${isMid ? '#f59e0b' : '#94a3b8'}" stroke-width="${isMid ? 2 : 1}"/>
  <text x="${x+18}" y="55" text-anchor="middle" font-size="11" fill="${isMid ? '#92400e' : '#475569'}">${v}</text>`;
  }).join('\n  ')}
  <text x="218" y="78" text-anchor="middle" font-size="10" fill="#f59e0b" font-weight="600">mid=23 &lt; 45 → search right</text>
  <!-- step 2 -->
  <text x="10" y="106" font-size="10" fill="#64748b">Step 2:</text>
  ${[45,67,82,91].map((v,i) => {
    const x = 218 + i * 42;
    const isMid = i === 1;
    return `<rect x="${x}" y="92" width="36" height="26" rx="3" fill="${isMid ? '#fef3c7' : '#e2e8f0'}" stroke="${isMid ? '#f59e0b' : '#94a3b8'}" stroke-width="${isMid ? 2 : 1}"/>
  <text x="${x+18}" y="109" text-anchor="middle" font-size="11" fill="${isMid ? '#92400e' : '#475569'}">${v}</text>`;
  }).join('\n  ')}
  <text x="316" y="132" text-anchor="middle" font-size="10" fill="#f59e0b" font-weight="600">mid=67 &gt; 45 → search left</text>
  <!-- step 3 found -->
  <text x="10" y="158" font-size="10" fill="#64748b">Step 3:</text>
  <rect x="218" y="144" width="36" height="26" rx="3" fill="#bbf7d0" stroke="#16a34a" stroke-width="2"/>
  <text x="236" y="161" text-anchor="middle" font-size="11" font-weight="700" fill="#15803d">45 ✓</text>
  <text x="200" y="190" text-anchor="middle" font-size="10" fill="#64748b">3 steps for 8 elements · log₂(8) = 3 · O(log n)</text>
</svg>`,
  },

  'trees': {
    description: 'A binary tree: each node has at most two children (left, right). Height determines performance.',
    svg: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" font-family="system-ui,sans-serif">
  <rect width="400" height="220" fill="#f8fafc" rx="8"/>
  <text x="200" y="26" text-anchor="middle" font-size="14" font-weight="600" fill="#1e293b">Binary Tree</text>
  <!-- edges -->
  <line x1="200" y1="62" x2="120" y2="110" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="200" y1="62" x2="280" y2="110" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="120" y1="130" x2="76" y2="170" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="120" y1="130" x2="164" y2="170" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="280" y1="130" x2="244" y2="170" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="280" y1="130" x2="324" y2="170" stroke="#94a3b8" stroke-width="1.5"/>
  <!-- nodes -->
  <circle cx="200" cy="52" r="20" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/><text x="200" y="57" text-anchor="middle" font-size="13" font-weight="700" fill="#1e40af">10</text>
  <circle cx="120" cy="120" r="20" fill="#e0e7ff" stroke="#6366f1" stroke-width="1.5"/><text x="120" y="125" text-anchor="middle" font-size="13" fill="#4338ca">5</text>
  <circle cx="280" cy="120" r="20" fill="#e0e7ff" stroke="#6366f1" stroke-width="1.5"/><text x="280" y="125" text-anchor="middle" font-size="13" fill="#4338ca">15</text>
  <circle cx="76" cy="180" r="18" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/><text x="76" y="185" text-anchor="middle" font-size="12" fill="#15803d">3</text>
  <circle cx="164" cy="180" r="18" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/><text x="164" y="185" text-anchor="middle" font-size="12" fill="#15803d">7</text>
  <circle cx="244" cy="180" r="18" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/><text x="244" y="185" text-anchor="middle" font-size="12" fill="#15803d">12</text>
  <circle cx="324" cy="180" r="18" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/><text x="324" y="185" text-anchor="middle" font-size="12" fill="#15803d">20</text>
  <!-- labels -->
  <text x="170" y="48" font-size="10" fill="#64748b">root</text>
  <text x="200" y="212" text-anchor="middle" font-size="10" fill="#64748b">Height 2 · BST property · search O(h)</text>
</svg>`,
  },

  'heaps': {
    description: 'A max-heap: every parent ≥ children. Stored as an array. Root is always the maximum.',
    svg: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" font-family="system-ui,sans-serif">
  <rect width="400" height="220" fill="#f8fafc" rx="8"/>
  <text x="200" y="26" text-anchor="middle" font-size="14" font-weight="600" fill="#1e293b">Max-Heap</text>
  <!-- edges -->
  <line x1="200" y1="62" x2="130" y2="110" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="200" y1="62" x2="270" y2="110" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="130" y1="130" x2="90" y2="170" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="130" y1="130" x2="170" y2="170" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="270" y1="130" x2="230" y2="170" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="270" y1="130" x2="310" y2="170" stroke="#94a3b8" stroke-width="1.5"/>
  <!-- nodes -->
  <circle cx="200" cy="52" r="22" fill="#fef3c7" stroke="#f59e0b" stroke-width="2.5"/><text x="200" y="58" text-anchor="middle" font-size="14" font-weight="700" fill="#92400e">100</text>
  <circle cx="130" cy="120" r="20" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5"/><text x="130" y="126" text-anchor="middle" font-size="13" fill="#1e40af">80</text>
  <circle cx="270" cy="120" r="20" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5"/><text x="270" y="126" text-anchor="middle" font-size="13" fill="#1e40af">60</text>
  <circle cx="90" cy="180" r="18" fill="#e0e7ff" stroke="#6366f1" stroke-width="1.5"/><text x="90" y="186" text-anchor="middle" font-size="12" fill="#4338ca">50</text>
  <circle cx="170" cy="180" r="18" fill="#e0e7ff" stroke="#6366f1" stroke-width="1.5"/><text x="170" y="186" text-anchor="middle" font-size="12" fill="#4338ca">30</text>
  <circle cx="230" cy="180" r="18" fill="#e0e7ff" stroke="#6366f1" stroke-width="1.5"/><text x="230" y="186" text-anchor="middle" font-size="12" fill="#4338ca">40</text>
  <circle cx="310" cy="180" r="18" fill="#e0e7ff" stroke="#6366f1" stroke-width="1.5"/><text x="310" y="186" text-anchor="middle" font-size="12" fill="#4338ca">20</text>
  <!-- array repr -->
  <text x="10" y="210" font-size="10" fill="#64748b">Array: [100, 80, 60, 50, 30, 40, 20]</text>
  <text x="310" y="210" font-size="10" fill="#64748b">Insert/Delete O(log n)</text>
</svg>`,
  },

  'hashing': {
    description: 'A hash table maps keys to array indices via a hash function. O(1) average lookup.',
    svg: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" font-family="system-ui,sans-serif">
  <rect width="400" height="200" fill="#f8fafc" rx="8"/>
  <text x="200" y="26" text-anchor="middle" font-size="14" font-weight="600" fill="#1e293b">Hash Table</text>
  <!-- hash function box -->
  <rect x="130" y="42" width="140" height="34" rx="6" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="200" y="64" text-anchor="middle" font-size="12" font-weight="600" fill="#1e40af">hash(key) % n</text>
  <!-- keys -->
  <text x="30" y="60" font-size="12" fill="#64748b">"apple"</text>
  <line x1="82" y1="56" x2="130" y2="56" stroke="#94a3b8" stroke-width="1" marker-end="url(#ha)"/>
  <text x="30" y="88" font-size="12" fill="#64748b">"cat"</text>
  <line x1="66" y1="84" x2="130" y2="70" stroke="#94a3b8" stroke-width="1" marker-end="url(#ha)"/>
  <defs><marker id="ha" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#94a3b8"/></marker></defs>
  <!-- buckets -->
  ${[0,1,2,3,4].map((i) => {
    const y = 100 + i * 20;
    const content = i === 0 ? '"apple" → 5' : i === 1 ? '"cat" → 12' : i === 2 ? '(empty)' : i === 3 ? '"dog" → 8' : '(empty)';
    const filled = i !== 2 && i !== 4;
    return `<rect x="240" y="${y-14}" width="140" height="18" rx="2" fill="${filled ? '#dcfce7' : '#f1f5f9'}" stroke="#94a3b8" stroke-width="1"/>
  <text x="244" y="${y-1}" font-size="10" fill="${filled ? '#15803d' : '#94a3b8'}">[${i}] ${content}</text>`;
  }).join('\n  ')}
  <line x1="270" y1="59" x2="240" y2="107" stroke="#16a34a" stroke-width="1" marker-end="url(#ha)"/>
  <text x="200" y="192" text-anchor="middle" font-size="10" fill="#64748b">Avg O(1) get/set · Collision via chaining or open addressing</text>
</svg>`,
  },

  'dynamic-programming': {
    description: 'DP breaks a problem into overlapping subproblems, storing results to avoid recomputation.',
    svg: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" font-family="system-ui,sans-serif">
  <rect width="400" height="200" fill="#f8fafc" rx="8"/>
  <text x="200" y="24" text-anchor="middle" font-size="14" font-weight="600" fill="#1e293b">DP Table — Fibonacci</text>
  <!-- header row -->
  <text x="20" y="50" font-size="11" fill="#64748b">n</text>
  ${[0,1,2,3,4,5,6,7].map((v,i) => `<text x="${58 + i*40}" y="50" font-size="11" font-weight="600" fill="#475569">${v}</text>`).join('')}
  <!-- dp row -->
  <text x="8" y="90" font-size="11" fill="#64748b">dp[n]</text>
  ${[0,1,1,2,3,5,8,13].map((v,i) => {
    const x = 46 + i * 40;
    const isLast = i === 7;
    return `<rect x="${x}" y="64" width="34" height="32" rx="4" fill="${isLast ? '#bbf7d0' : '#dbeafe'}" stroke="${isLast ? '#16a34a' : '#3b82f6'}" stroke-width="${isLast ? 2 : 1}"/>
  <text x="${x+17}" y="84" text-anchor="middle" font-size="13" font-weight="${isLast ? 700 : 500}" fill="${isLast ? '#15803d' : '#1e40af'}">${v}</text>`;
  }).join('\n  ')}
  <!-- recurrence -->
  <rect x="80" y="115" width="240" height="28" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="200" y="133" text-anchor="middle" font-size="12" fill="#92400e" font-weight="600">dp[i] = dp[i-1] + dp[i-2]</text>
  <text x="200" y="162" text-anchor="middle" font-size="11" fill="#64748b">Base cases: dp[0]=0, dp[1]=1</text>
  <text x="200" y="180" text-anchor="middle" font-size="10" fill="#94a3b8">Memoisation turns O(2ⁿ) recursion → O(n) time, O(n) space</text>
</svg>`,
  },

  'graphs': {
    description: 'A graph of vertices (nodes) connected by edges — can be directed or undirected.',
    svg: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" font-family="system-ui,sans-serif">
  <rect width="400" height="220" fill="#f8fafc" rx="8"/>
  <text x="200" y="26" text-anchor="middle" font-size="14" font-weight="600" fill="#1e293b">Undirected Graph</text>
  <!-- edges -->
  <line x1="200" y1="80" x2="100" y2="140" stroke="#94a3b8" stroke-width="2"/>
  <line x1="200" y1="80" x2="300" y2="140" stroke="#94a3b8" stroke-width="2"/>
  <line x1="100" y1="140" x2="180" y2="190" stroke="#94a3b8" stroke-width="2"/>
  <line x1="300" y1="140" x2="220" y2="190" stroke="#94a3b8" stroke-width="2"/>
  <line x1="180" y1="190" x2="220" y2="190" stroke="#94a3b8" stroke-width="2"/>
  <line x1="100" y1="140" x2="300" y2="140" stroke="#94a3b8" stroke-width="2" stroke-dasharray="5 3"/>
  <!-- vertices -->
  <circle cx="200" cy="70" r="22" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/><text x="200" y="75" text-anchor="middle" font-size="13" font-weight="700" fill="#1e40af">A</text>
  <circle cx="100" cy="140" r="22" fill="#e0e7ff" stroke="#6366f1" stroke-width="1.5"/><text x="100" y="145" text-anchor="middle" font-size="13" fill="#4338ca">B</text>
  <circle cx="300" cy="140" r="22" fill="#e0e7ff" stroke="#6366f1" stroke-width="1.5"/><text x="300" y="145" text-anchor="middle" font-size="13" fill="#4338ca">C</text>
  <circle cx="180" cy="190" r="22" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/><text x="180" y="195" text-anchor="middle" font-size="13" fill="#15803d">D</text>
  <circle cx="220" cy="190" r="22" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/><text x="220" y="195" text-anchor="middle" font-size="13" fill="#15803d">E</text>
  <text x="200" y="215" text-anchor="middle" font-size="10" fill="#64748b">V=5 vertices · E=6 edges · Adj list or matrix representation</text>
</svg>`,
  },

  'tries': {
    description: 'A trie stores strings character-by-character. Prefix search in O(m) where m = word length.',
    svg: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" font-family="system-ui,sans-serif">
  <rect width="400" height="220" fill="#f8fafc" rx="8"/>
  <text x="200" y="26" text-anchor="middle" font-size="14" font-weight="600" fill="#1e293b">Trie — Words: "cat", "car", "dog"</text>
  <!-- root -->
  <circle cx="200" cy="55" r="18" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2"/>
  <text x="200" y="60" text-anchor="middle" font-size="11" fill="#64748b">root</text>
  <!-- c branch -->
  <line x1="200" y1="73" x2="110" y2="105" stroke="#94a3b8" stroke-width="1.5"/>
  <circle cx="110" cy="118" r="18" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="110" y="123" text-anchor="middle" font-size="13" font-weight="700" fill="#1e40af">c</text>
  <!-- d branch -->
  <line x1="200" y1="73" x2="310" y2="105" stroke="#94a3b8" stroke-width="1.5"/>
  <circle cx="310" cy="118" r="18" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="310" y="123" text-anchor="middle" font-size="13" font-weight="700" fill="#1e40af">d</text>
  <!-- a under c -->
  <line x1="110" y1="136" x2="110" y2="158" stroke="#94a3b8" stroke-width="1.5"/>
  <circle cx="110" cy="170" r="18" fill="#e0e7ff" stroke="#6366f1" stroke-width="1.5"/>
  <text x="110" y="175" text-anchor="middle" font-size="13" fill="#4338ca">a</text>
  <!-- t and r under a -->
  <line x1="110" y1="188" x2="70" y2="198" stroke="#94a3b8" stroke-width="1.5"/>
  <circle cx="60" cy="205" r="15" fill="#bbf7d0" stroke="#16a34a" stroke-width="1.5"/>
  <text x="60" y="210" text-anchor="middle" font-size="13" fill="#15803d">t*</text>
  <line x1="110" y1="188" x2="148" y2="198" stroke="#94a3b8" stroke-width="1.5"/>
  <circle cx="158" cy="205" r="15" fill="#bbf7d0" stroke="#16a34a" stroke-width="1.5"/>
  <text x="158" y="210" text-anchor="middle" font-size="13" fill="#15803d">r*</text>
  <!-- o under d -->
  <line x1="310" y1="136" x2="310" y2="158" stroke="#94a3b8" stroke-width="1.5"/>
  <circle cx="310" cy="170" r="18" fill="#e0e7ff" stroke="#6366f1" stroke-width="1.5"/>
  <text x="310" y="175" text-anchor="middle" font-size="13" fill="#4338ca">o</text>
  <line x1="310" y1="188" x2="310" y2="198" stroke="#94a3b8" stroke-width="1.5"/>
  <circle cx="310" cy="205" r="12" fill="#bbf7d0" stroke="#16a34a" stroke-width="1.5"/>
  <text x="310" y="210" text-anchor="middle" font-size="11" fill="#15803d">g*</text>
  <text x="370" y="210" font-size="9" fill="#64748b">* = end</text>
</svg>`,
  },
};

async function run() {
  console.log('Seeding display numbers and SVG diagrams...');

  for (const [slug, number] of Object.entries(DISPLAY_NUMBERS)) {
    const diagramData = DIAGRAMS[slug];
    await query(
      `UPDATE topics SET
        display_number = $1,
        diagram_svg = $2,
        diagram_description = $3
       WHERE slug = $4`,
      [
        number,
        diagramData?.svg ?? null,
        diagramData?.description ?? null,
        slug,
      ]
    );
  }

  console.log(`Updated display numbers for ${Object.keys(DISPLAY_NUMBERS).length} topics`);
  console.log(`Added SVG diagrams for ${Object.keys(DIAGRAMS).length} topics`);
  process.exit(0);
}

run().catch((err) => { console.error(err); process.exit(1); });
