require('../config/env');
const { pool } = require('../config/database');
const logger = require('../config/logger');

const topics = [
  {
    name: 'Arrays',
    slug: 'arrays',
    tier: 'Basic',
    simple_definition:
      'Arrays are ordered collections of elements stored in contiguous memory. Each element can be accessed instantly if you know its position (index).',
    real_world_uses: {
      examples: [
        {
          company: 'Instagram',
          use_case: 'Reel feed storage and ordering',
          explanation:
            'When you scroll through reels, Instagram stores them in an array. Each scroll (array index) fetches the next reel in O(1) constant time.',
        },
        {
          company: 'Spotify',
          use_case: 'Playlist storage',
          explanation:
            'Your playlist is an array of song IDs. When you hit shuffle, Spotify randomizes the array. Next song = array[currentIndex + 1].',
        },
        {
          company: 'Netflix',
          use_case: 'Video player buffering',
          explanation:
            'Netflix downloads video chunks into an array buffer. This lets you watch smoothly while the next chunks download.',
        },
      ],
    },
    prerequisites: ['Variables & Data Types'],
    order_in_sequence: 2,
    difficulty_rating: 1.5,
    estimated_hours: 4,
    youtube_search_query: 'Array data structure basics',
  },
  {
    name: 'Linked Lists',
    slug: 'linked-lists',
    tier: 'Basic',
    simple_definition:
      'A linked list is a chain of boxes where each box points to the next one. Unlike arrays, items are connected by pointers, not stored sequentially in memory.',
    real_world_uses: {
      examples: [
        {
          company: 'Browser',
          use_case: 'Back/Forward button history',
          explanation:
            'Your browser history is a doubly-linked list. Each page links to the previous (back) and next (forward) page.',
        },
        {
          company: 'VS Code / Photoshop',
          use_case: 'Undo/Redo action history',
          explanation:
            'Each action points to the previous one (undo) and next one (redo) via a doubly-linked list.',
        },
      ],
    },
    prerequisites: ['Arrays'],
    order_in_sequence: 4,
    difficulty_rating: 2.5,
    estimated_hours: 5,
    youtube_search_query: 'Linked list data structure tutorial',
  },
  {
    name: 'Stacks',
    slug: 'stacks',
    tier: 'Basic',
    simple_definition:
      'A stack is like a stack of plates. You add to the top (push) and remove from the top (pop). Last In, First Out (LIFO).',
    real_world_uses: {
      examples: [
        {
          company: 'Web Browsers',
          use_case: 'Navigation back button',
          explanation:
            'Every page visited is pushed onto a stack. Hitting back pops the current page off to reveal the previous one.',
        },
        {
          company: 'Code Editors',
          use_case: 'Function call stack & debugging',
          explanation:
            'When a function is called it is pushed onto the call stack, when it returns it is popped off. This is why debuggers show a stack trace.',
        },
        {
          company: 'Compilers',
          use_case: 'Balanced parentheses checking',
          explanation:
            'A compiler uses a stack to verify brackets match. Opening brackets are pushed; closing ones pop and check for a match.',
        },
      ],
    },
    prerequisites: ['Arrays', 'Linked Lists'],
    order_in_sequence: 5,
    difficulty_rating: 1.8,
    estimated_hours: 3,
    youtube_search_query: 'Stack data structure LIFO',
  },
  {
    name: 'Queues',
    slug: 'queues',
    tier: 'Basic',
    simple_definition:
      'A queue is like a line at a movie theater. First person in line is first to be served. First In, First Out (FIFO).',
    real_world_uses: {
      examples: [
        {
          company: 'Uber/Lyft',
          use_case: 'Ride request handling',
          explanation:
            'Ride requests are queued in order. When a driver becomes available they are matched with the oldest request in the queue.',
        },
        {
          company: 'Printer Queue',
          use_case: 'Print job ordering',
          explanation:
            'When multiple people print, jobs queue up. First job sent is first to print, preventing overlap.',
        },
      ],
    },
    prerequisites: ['Arrays', 'Linked Lists'],
    order_in_sequence: 6,
    difficulty_rating: 1.8,
    estimated_hours: 3,
    youtube_search_query: 'Queue data structure FIFO',
  },
  {
    name: 'Recursion',
    slug: 'recursion',
    tier: 'Basic',
    simple_definition:
      'Recursion is when a function calls itself. It breaks big problems into smaller identical problems until hitting a base case it can solve directly.',
    real_world_uses: {
      examples: [
        {
          company: 'Operating Systems',
          use_case: 'Finding files in nested folders',
          explanation:
            'The find command uses recursion: search a folder, then recursively search each subfolder inside it.',
        },
        {
          company: 'JSON parsers',
          use_case: 'Parsing nested data structures',
          explanation:
            'When an app reads deeply nested JSON, a parser recursively extracts values from each level.',
        },
      ],
    },
    prerequisites: ['Variables & Data Types', 'Functions'],
    order_in_sequence: 3,
    difficulty_rating: 2.2,
    estimated_hours: 4,
    youtube_search_query: 'Recursion explained with examples',
  },
  {
    name: 'Hash Maps / Sets',
    slug: 'hash-maps',
    tier: 'Basic',
    simple_definition:
      'A hash map stores key-value pairs and allows O(1) average lookup, insert, and delete. Like a phone contact list where you jump directly to any name.',
    real_world_uses: {
      examples: [
        {
          company: 'Any app with login',
          use_case: 'Fast user lookup',
          explanation:
            'When you log in with email, the app uses a hash map to instantly find your user ID instead of scanning millions of rows.',
        },
        {
          company: 'Redis (Cache)',
          use_case: 'Fast data retrieval',
          explanation:
            'Redis stores data in hash maps. Getting a user profile is O(1) instead of hitting a database.',
        },
        {
          company: 'bit.ly',
          use_case: 'URL shortening',
          explanation:
            'bit.ly maps a short code to a long URL in a hash map. Clicking the short link instantly retrieves the real URL.',
        },
      ],
    },
    prerequisites: ['Arrays'],
    order_in_sequence: 7,
    difficulty_rating: 2.0,
    estimated_hours: 4,
    youtube_search_query: 'Hash map hash table data structure',
  },
  {
    name: 'Sorting Algorithms',
    slug: 'sorting-algorithms',
    tier: 'Basic',
    simple_definition:
      'Sorting arranges items in order. Merge sort is reliable O(n log n). Quicksort is usually fastest. Bubble sort is simple but slow — good to understand first.',
    real_world_uses: {
      examples: [
        {
          company: 'Amazon',
          use_case: 'Sort products by price / rating',
          explanation:
            'When you sort search results by "Price: Low to High", the backend runs a sorting algorithm on the results.',
        },
        {
          company: 'Databases',
          use_case: 'Query ORDER BY optimization',
          explanation:
            'Database indexes keep data sorted. Sorted data enables binary search, which is far faster than a full table scan.',
        },
      ],
    },
    prerequisites: ['Arrays'],
    order_in_sequence: 8,
    difficulty_rating: 2.5,
    estimated_hours: 6,
    youtube_search_query: 'Sorting algorithms quicksort mergesort explained',
  },
  {
    name: 'Binary Search',
    slug: 'binary-search',
    tier: 'Basic',
    simple_definition:
      'Binary search finds an item in a sorted list by repeatedly halving the search space. Far faster than checking every item one by one.',
    real_world_uses: {
      examples: [
        {
          company: 'Git',
          use_case: 'Finding which commit broke code (git bisect)',
          explanation:
            'git bisect uses binary search across commits to pinpoint the exact commit that introduced a bug.',
        },
        {
          company: 'Search engines',
          use_case: 'Fast lookup in billions of items',
          explanation:
            "A sorted search index lets binary search find your query results in ~log(n) steps instead of scanning everything.",
        },
      ],
    },
    prerequisites: ['Arrays', 'Sorting Algorithms'],
    order_in_sequence: 9,
    difficulty_rating: 1.5,
    estimated_hours: 3,
    youtube_search_query: 'Binary search algorithm tutorial',
  },
  {
    name: 'Trees (Binary & BST)',
    slug: 'trees',
    tier: 'Basic',
    simple_definition:
      'A tree is a hierarchical structure where each node can have children. Binary search trees keep data ordered so searching is O(log n) on average.',
    real_world_uses: {
      examples: [
        {
          company: 'Databases (MySQL, PostgreSQL)',
          use_case: 'B-tree indexing',
          explanation:
            'Database indexes use B-trees to find your data in milliseconds instead of scanning every row.',
        },
        {
          company: 'File systems',
          use_case: 'Directory structure',
          explanation:
            'Your folder structure is a tree. Root → subfolders → files. Tree traversal finds any file in nested depth.',
        },
        {
          company: 'Compilers',
          use_case: 'Abstract Syntax Tree (AST)',
          explanation:
            'When you write code, the compiler converts it to an AST — a tree representing the code structure, used for error checking and optimization.',
        },
      ],
    },
    prerequisites: ['Arrays', 'Linked Lists', 'Recursion'],
    order_in_sequence: 10,
    difficulty_rating: 3.2,
    estimated_hours: 7,
    youtube_search_query: 'Binary search tree BST tutorial',
  },
  {
    name: 'Graphs (BFS/DFS)',
    slug: 'graphs',
    tier: 'Basic',
    simple_definition:
      'A graph is a network of nodes connected by edges. Roads between cities, friend connections, and web pages are all graphs.',
    real_world_uses: {
      examples: [
        {
          company: 'Google Maps',
          use_case: 'Shortest route finding',
          explanation:
            'Cities and roads form a graph. BFS/Dijkstra finds the shortest route from your location to your destination.',
        },
        {
          company: 'Facebook / LinkedIn',
          use_case: 'Friend/connection suggestions',
          explanation:
            'Your profile is a node, friendships are edges. Graph traversal finds "friends of friends" to suggest connections.',
        },
        {
          company: 'Netflix',
          use_case: 'Content recommendation',
          explanation:
            'Movies and genres form a graph. If you watched Inception (sci-fi node), the system traverses to similar movies.',
        },
      ],
    },
    prerequisites: ['Arrays', 'Trees', 'Queues', 'Stacks'],
    order_in_sequence: 11,
    difficulty_rating: 3.5,
    estimated_hours: 8,
    youtube_search_query: 'Graph BFS DFS algorithms tutorial',
  },
  {
    name: 'Dynamic Programming',
    slug: 'dynamic-programming',
    tier: 'Advanced',
    simple_definition:
      'Dynamic programming solves complex problems by breaking them into overlapping subproblems and caching results to avoid recomputation. Smart recursion with memory.',
    real_world_uses: {
      examples: [
        {
          company: 'Compilers',
          use_case: 'Code optimization',
          explanation:
            'Compilers use DP to optimize code by finding the best instruction order without redundant calculations.',
        },
        {
          company: 'Waymo / Tesla',
          use_case: 'Autonomous vehicle path planning',
          explanation:
            'Self-driving cars use DP to find efficient paths while avoiding obstacles — solving subproblems once and reusing results.',
        },
        {
          company: 'Financial trading systems',
          use_case: 'Portfolio optimization',
          explanation:
            'Trading algorithms use DP to find the best buy/sell strategy by memoizing results across different market scenarios.',
        },
      ],
    },
    prerequisites: ['Recursion', 'Arrays', 'Hash Maps / Sets'],
    order_in_sequence: 20,
    difficulty_rating: 4.2,
    estimated_hours: 10,
    youtube_search_query: 'Dynamic programming explained with examples',
  },
];

const promptTemplates = [
  {
    difficulty: 'easy',
    focus_area: 'Basics & traversal',
    template_text:
      'I am learning {{topic}}. Give me 3 easy LeetCode-style questions that test fundamental understanding of {{topic}}. For each question:\n1. State the problem clearly\n2. Give an example input and expected output\n3. Mention what concept it tests\n\nDo NOT give hints or solutions yet.',
  },
  {
    difficulty: 'medium',
    focus_area: 'Pattern recognition',
    template_text:
      'I am practicing {{topic}} and I understand the basics. Give me 3 medium-difficulty LeetCode-style questions that involve common patterns and techniques used with {{topic}}. For each question:\n1. State the problem clearly\n2. Give an example input and expected output\n3. Mention the key insight or pattern needed\n\nDo NOT give hints or solutions yet.',
  },
  {
    difficulty: 'hard',
    focus_area: 'Optimization & edge cases',
    template_text:
      'I am confident in {{topic}} and want a real challenge. Give me 2 hard LeetCode-style questions involving {{topic}} that require optimization, careful edge-case handling, or combining multiple concepts. For each question:\n1. State the problem clearly\n2. Give an example input and expected output\n3. Mention what makes it hard\n\nDo NOT give hints or solutions yet.',
  },
];

async function seed() {
  const client = await pool.connect();
  try {
    logger.info('Seeding topics...');

    for (const topic of topics) {
      const existing = await client.query('SELECT id FROM topics WHERE slug = $1', [topic.slug]);
      if (existing.rows.length > 0) {
        logger.info(`Skipping (exists): ${topic.name}`);
        continue;
      }

      const { rows } = await client.query(
        `INSERT INTO topics
          (name, slug, tier, simple_definition, real_world_uses, prerequisites,
           order_in_sequence, difficulty_rating, estimated_hours, youtube_search_query)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
         RETURNING id`,
        [
          topic.name,
          topic.slug,
          topic.tier,
          topic.simple_definition,
          JSON.stringify(topic.real_world_uses),
          JSON.stringify(topic.prerequisites),
          topic.order_in_sequence,
          topic.difficulty_rating,
          topic.estimated_hours,
          topic.youtube_search_query,
        ]
      );

      const topicId = rows[0].id;

      for (const pt of promptTemplates) {
        await client.query(
          `INSERT INTO prompt_templates (topic_id, difficulty, template_text, focus_area)
           VALUES ($1,$2,$3,$4)`,
          [topicId, pt.difficulty, pt.template_text.replace(/\{\{topic\}\}/g, topic.name), pt.focus_area]
        );
      }

      logger.info(`Seeded: ${topic.name}`);
    }

    logger.info('Seeding complete!');
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch((err) => {
  logger.error({ err }, 'Seed failed');
  process.exit(1);
});
