'use strict';
const { query } = require('../config/database');
require('../config/env');

const LEETCODE_QUESTIONS = [
  // Time/Space Complexity
  { slug: 'time-space-complexity', difficulty: 'easy', title: 'Big O Notation — Study Guide', problem_number: null, link: 'https://leetcode.com/discuss/study-guide/1152328/Big-O-Notation-for-Coding-Interviews' },

  // Arrays (1D)
  { slug: 'arrays-1d', difficulty: 'easy', title: 'Two Sum', problem_number: 1, link: 'https://leetcode.com/problems/two-sum/' },
  { slug: 'arrays-1d', difficulty: 'easy', title: 'Best Time to Buy and Sell Stock', problem_number: 121, link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/' },
  { slug: 'arrays-1d', difficulty: 'medium', title: 'Product of Array Except Self', problem_number: 238, link: 'https://leetcode.com/problems/product-of-array-except-self/' },
  { slug: 'arrays-1d', difficulty: 'medium', title: 'Maximum Subarray', problem_number: 53, link: 'https://leetcode.com/problems/maximum-subarray/' },
  { slug: 'arrays-1d', difficulty: 'hard', title: 'First Missing Positive', problem_number: 41, link: 'https://leetcode.com/problems/first-missing-positive/' },

  // Arrays (general)
  { slug: 'arrays', difficulty: 'easy', title: 'Two Sum', problem_number: 1, link: 'https://leetcode.com/problems/two-sum/' },
  { slug: 'arrays', difficulty: 'medium', title: 'Product of Array Except Self', problem_number: 238, link: 'https://leetcode.com/problems/product-of-array-except-self/' },
  { slug: 'arrays', difficulty: 'hard', title: 'First Missing Positive', problem_number: 41, link: 'https://leetcode.com/problems/first-missing-positive/' },

  // Strings
  { slug: 'strings', difficulty: 'easy', title: 'Valid Palindrome', problem_number: 125, link: 'https://leetcode.com/problems/valid-palindrome/' },
  { slug: 'strings', difficulty: 'easy', title: 'Valid Anagram', problem_number: 242, link: 'https://leetcode.com/problems/valid-anagram/' },
  { slug: 'strings', difficulty: 'medium', title: 'Longest Substring Without Repeating Characters', problem_number: 3, link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' },
  { slug: 'strings', difficulty: 'medium', title: 'Group Anagrams', problem_number: 49, link: 'https://leetcode.com/problems/group-anagrams/' },
  { slug: 'strings', difficulty: 'hard', title: 'Minimum Window Substring', problem_number: 76, link: 'https://leetcode.com/problems/minimum-window-substring/' },

  // Two Pointers
  { slug: 'two-pointers', difficulty: 'easy', title: 'Valid Palindrome', problem_number: 125, link: 'https://leetcode.com/problems/valid-palindrome/' },
  { slug: 'two-pointers', difficulty: 'medium', title: '3Sum', problem_number: 15, link: 'https://leetcode.com/problems/3sum/' },
  { slug: 'two-pointers', difficulty: 'medium', title: 'Container With Most Water', problem_number: 11, link: 'https://leetcode.com/problems/container-with-most-water/' },
  { slug: 'two-pointers', difficulty: 'hard', title: 'Trapping Rain Water', problem_number: 42, link: 'https://leetcode.com/problems/trapping-rain-water/' },

  // Sliding Window
  { slug: 'sliding-window', difficulty: 'easy', title: 'Best Time to Buy and Sell Stock', problem_number: 121, link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/' },
  { slug: 'sliding-window', difficulty: 'medium', title: 'Longest Substring Without Repeating Characters', problem_number: 3, link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' },
  { slug: 'sliding-window', difficulty: 'medium', title: 'Permutation in String', problem_number: 567, link: 'https://leetcode.com/problems/permutation-in-string/' },
  { slug: 'sliding-window', difficulty: 'hard', title: 'Minimum Window Substring', problem_number: 76, link: 'https://leetcode.com/problems/minimum-window-substring/' },

  // Hash Maps
  { slug: 'hash-maps', difficulty: 'easy', title: 'Two Sum', problem_number: 1, link: 'https://leetcode.com/problems/two-sum/' },
  { slug: 'hash-maps', difficulty: 'easy', title: 'Contains Duplicate', problem_number: 217, link: 'https://leetcode.com/problems/contains-duplicate/' },
  { slug: 'hash-maps', difficulty: 'medium', title: 'Group Anagrams', problem_number: 49, link: 'https://leetcode.com/problems/group-anagrams/' },
  { slug: 'hash-maps', difficulty: 'medium', title: 'Top K Frequent Elements', problem_number: 347, link: 'https://leetcode.com/problems/top-k-frequent-elements/' },

  // Sets / HashSets
  { slug: 'sets-hashsets', difficulty: 'easy', title: 'Contains Duplicate', problem_number: 217, link: 'https://leetcode.com/problems/contains-duplicate/' },
  { slug: 'sets-hashsets', difficulty: 'medium', title: 'Longest Consecutive Sequence', problem_number: 128, link: 'https://leetcode.com/problems/longest-consecutive-sequence/' },

  // Stacks
  { slug: 'stacks', difficulty: 'easy', title: 'Valid Parentheses', problem_number: 20, link: 'https://leetcode.com/problems/valid-parentheses/' },
  { slug: 'stacks', difficulty: 'medium', title: 'Min Stack', problem_number: 155, link: 'https://leetcode.com/problems/min-stack/' },
  { slug: 'stacks', difficulty: 'medium', title: 'Evaluate Reverse Polish Notation', problem_number: 150, link: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/' },
  { slug: 'stacks', difficulty: 'hard', title: 'Largest Rectangle in Histogram', problem_number: 84, link: 'https://leetcode.com/problems/largest-rectangle-in-histogram/' },

  // Queues
  { slug: 'queues', difficulty: 'medium', title: 'Number of Recent Calls', problem_number: 933, link: 'https://leetcode.com/problems/number-of-recent-calls/' },
  { slug: 'queues', difficulty: 'medium', title: 'Implement Queue using Stacks', problem_number: 232, link: 'https://leetcode.com/problems/implement-queue-using-stacks/' },
  { slug: 'queues', difficulty: 'hard', title: 'Sliding Window Maximum', problem_number: 239, link: 'https://leetcode.com/problems/sliding-window-maximum/' },

  // Linked Lists
  { slug: 'linked-lists', difficulty: 'easy', title: 'Reverse Linked List', problem_number: 206, link: 'https://leetcode.com/problems/reverse-linked-list/' },
  { slug: 'linked-lists', difficulty: 'easy', title: 'Merge Two Sorted Lists', problem_number: 21, link: 'https://leetcode.com/problems/merge-two-sorted-lists/' },
  { slug: 'linked-lists', difficulty: 'medium', title: 'Linked List Cycle II', problem_number: 142, link: 'https://leetcode.com/problems/linked-list-cycle-ii/' },
  { slug: 'linked-lists', difficulty: 'medium', title: 'Remove Nth Node From End of List', problem_number: 19, link: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/' },
  { slug: 'linked-lists', difficulty: 'hard', title: 'Merge k Sorted Lists', problem_number: 23, link: 'https://leetcode.com/problems/merge-k-sorted-lists/' },

  // Recursion
  { slug: 'recursion', difficulty: 'easy', title: 'Fibonacci Number', problem_number: 509, link: 'https://leetcode.com/problems/fibonacci-number/' },
  { slug: 'recursion', difficulty: 'medium', title: 'Pow(x, n)', problem_number: 50, link: 'https://leetcode.com/problems/powx-n/' },
  { slug: 'recursion', difficulty: 'medium', title: 'Letter Combinations of a Phone Number', problem_number: 17, link: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/' },

  // Recursion Basics
  { slug: 'recursion-basics', difficulty: 'easy', title: 'Fibonacci Number', problem_number: 509, link: 'https://leetcode.com/problems/fibonacci-number/' },
  { slug: 'recursion-basics', difficulty: 'easy', title: 'Power of Two', problem_number: 231, link: 'https://leetcode.com/problems/power-of-two/' },

  // Binary Search
  { slug: 'binary-search', difficulty: 'easy', title: 'Binary Search', problem_number: 704, link: 'https://leetcode.com/problems/binary-search/' },
  { slug: 'binary-search', difficulty: 'medium', title: 'Search in Rotated Sorted Array', problem_number: 33, link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/' },
  { slug: 'binary-search', difficulty: 'medium', title: 'Find Minimum in Rotated Sorted Array', problem_number: 153, link: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/' },
  { slug: 'binary-search', difficulty: 'hard', title: 'Median of Two Sorted Arrays', problem_number: 4, link: 'https://leetcode.com/problems/median-of-two-sorted-arrays/' },

  // Sorting Basic
  { slug: 'sorting-basic', difficulty: 'easy', title: 'Sort an Array', problem_number: 912, link: 'https://leetcode.com/problems/sort-an-array/' },
  { slug: 'sorting-basic', difficulty: 'medium', title: 'Sort Colors', problem_number: 75, link: 'https://leetcode.com/problems/sort-colors/' },

  // Sorting Algorithms / Advanced
  { slug: 'sorting-algorithms', difficulty: 'easy', title: 'Sort an Array', problem_number: 912, link: 'https://leetcode.com/problems/sort-an-array/' },
  { slug: 'sorting-algorithms', difficulty: 'medium', title: 'Sort Colors', problem_number: 75, link: 'https://leetcode.com/problems/sort-colors/' },
  { slug: 'sorting-algorithms', difficulty: 'medium', title: 'Kth Largest Element in an Array', problem_number: 215, link: 'https://leetcode.com/problems/kth-largest-element-in-an-array/' },
  { slug: 'sorting-advanced', difficulty: 'medium', title: 'Merge Intervals', problem_number: 56, link: 'https://leetcode.com/problems/merge-intervals/' },
  { slug: 'sorting-advanced', difficulty: 'medium', title: 'Kth Largest Element in an Array', problem_number: 215, link: 'https://leetcode.com/problems/kth-largest-element-in-an-array/' },

  // Trees
  { slug: 'trees', difficulty: 'easy', title: 'Maximum Depth of Binary Tree', problem_number: 104, link: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/' },
  { slug: 'trees', difficulty: 'easy', title: 'Invert Binary Tree', problem_number: 226, link: 'https://leetcode.com/problems/invert-binary-tree/' },
  { slug: 'trees', difficulty: 'medium', title: 'Binary Tree Level Order Traversal', problem_number: 102, link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/' },
  { slug: 'trees', difficulty: 'medium', title: 'Lowest Common Ancestor of a Binary Tree', problem_number: 236, link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/' },
  { slug: 'trees', difficulty: 'hard', title: 'Binary Tree Maximum Path Sum', problem_number: 124, link: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/' },

  // Binary Trees Basics
  { slug: 'binary-trees-basics', difficulty: 'easy', title: 'Maximum Depth of Binary Tree', problem_number: 104, link: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/' },
  { slug: 'binary-trees-basics', difficulty: 'easy', title: 'Symmetric Tree', problem_number: 101, link: 'https://leetcode.com/problems/symmetric-tree/' },
  { slug: 'binary-trees-basics', difficulty: 'medium', title: 'Binary Tree Level Order Traversal', problem_number: 102, link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/' },

  // Tree Traversal
  { slug: 'tree-traversal', difficulty: 'easy', title: 'Binary Tree Inorder Traversal', problem_number: 94, link: 'https://leetcode.com/problems/binary-tree-inorder-traversal/' },
  { slug: 'tree-traversal', difficulty: 'easy', title: 'Binary Tree Preorder Traversal', problem_number: 144, link: 'https://leetcode.com/problems/binary-tree-preorder-traversal/' },
  { slug: 'tree-traversal', difficulty: 'medium', title: 'Binary Tree Zigzag Level Order Traversal', problem_number: 103, link: 'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/' },

  // Binary Search Trees
  { slug: 'binary-search-trees', difficulty: 'easy', title: 'Search in a Binary Search Tree', problem_number: 700, link: 'https://leetcode.com/problems/search-in-a-binary-search-tree/' },
  { slug: 'binary-search-trees', difficulty: 'medium', title: 'Validate Binary Search Tree', problem_number: 98, link: 'https://leetcode.com/problems/validate-binary-search-tree/' },
  { slug: 'binary-search-trees', difficulty: 'medium', title: 'Kth Smallest Element in a BST', problem_number: 230, link: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/' },

  // Heaps / Priority Queues
  { slug: 'heaps-priority-queues', difficulty: 'easy', title: 'Last Stone Weight', problem_number: 1046, link: 'https://leetcode.com/problems/last-stone-weight/' },
  { slug: 'heaps-priority-queues', difficulty: 'medium', title: 'Kth Largest Element in a Stream', problem_number: 703, link: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/' },
  { slug: 'heaps-priority-queues', difficulty: 'medium', title: 'K Closest Points to Origin', problem_number: 973, link: 'https://leetcode.com/problems/k-closest-points-to-origin/' },
  { slug: 'heaps-priority-queues', difficulty: 'hard', title: 'Find Median from Data Stream', problem_number: 295, link: 'https://leetcode.com/problems/find-median-from-data-stream/' },

  // Graphs (general)
  { slug: 'graphs', difficulty: 'medium', title: 'Number of Islands', problem_number: 200, link: 'https://leetcode.com/problems/number-of-islands/' },
  { slug: 'graphs', difficulty: 'medium', title: 'Clone Graph', problem_number: 133, link: 'https://leetcode.com/problems/clone-graph/' },
  { slug: 'graphs', difficulty: 'hard', title: 'Word Ladder', problem_number: 127, link: 'https://leetcode.com/problems/word-ladder/' },

  // Graph Basics
  { slug: 'graph-basics', difficulty: 'medium', title: 'Find the Town Judge', problem_number: 997, link: 'https://leetcode.com/problems/find-the-town-judge/' },
  { slug: 'graph-basics', difficulty: 'medium', title: 'Number of Provinces', problem_number: 547, link: 'https://leetcode.com/problems/number-of-provinces/' },

  // BFS
  { slug: 'graph-traversal-bfs', difficulty: 'medium', title: 'Binary Tree Level Order Traversal', problem_number: 102, link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/' },
  { slug: 'graph-traversal-bfs', difficulty: 'medium', title: 'Rotting Oranges', problem_number: 994, link: 'https://leetcode.com/problems/rotting-oranges/' },
  { slug: 'graph-traversal-bfs', difficulty: 'medium', title: '01 Matrix', problem_number: 542, link: 'https://leetcode.com/problems/01-matrix/' },
  { slug: 'graph-traversal-bfs', difficulty: 'hard', title: 'Word Ladder', problem_number: 127, link: 'https://leetcode.com/problems/word-ladder/' },

  // DFS
  { slug: 'graph-traversal-dfs', difficulty: 'medium', title: 'Number of Islands', problem_number: 200, link: 'https://leetcode.com/problems/number-of-islands/' },
  { slug: 'graph-traversal-dfs', difficulty: 'medium', title: 'Pacific Atlantic Water Flow', problem_number: 417, link: 'https://leetcode.com/problems/pacific-atlantic-water-flow/' },
  { slug: 'graph-traversal-dfs', difficulty: 'hard', title: 'Word Search II', problem_number: 212, link: 'https://leetcode.com/problems/word-search-ii/' },

  // Dynamic Programming
  { slug: 'dynamic-programming', difficulty: 'easy', title: 'Climbing Stairs', problem_number: 70, link: 'https://leetcode.com/problems/climbing-stairs/' },
  { slug: 'dynamic-programming', difficulty: 'medium', title: 'House Robber', problem_number: 198, link: 'https://leetcode.com/problems/house-robber/' },
  { slug: 'dynamic-programming', difficulty: 'medium', title: 'Coin Change', problem_number: 322, link: 'https://leetcode.com/problems/coin-change/' },
  { slug: 'dynamic-programming', difficulty: 'hard', title: 'Edit Distance', problem_number: 72, link: 'https://leetcode.com/problems/edit-distance/' },

  // DP 1D
  { slug: 'dp-1d', difficulty: 'easy', title: 'Climbing Stairs', problem_number: 70, link: 'https://leetcode.com/problems/climbing-stairs/' },
  { slug: 'dp-1d', difficulty: 'medium', title: 'House Robber', problem_number: 198, link: 'https://leetcode.com/problems/house-robber/' },
  { slug: 'dp-1d', difficulty: 'medium', title: 'Coin Change', problem_number: 322, link: 'https://leetcode.com/problems/coin-change/' },
  { slug: 'dp-1d', difficulty: 'medium', title: 'Longest Increasing Subsequence', problem_number: 300, link: 'https://leetcode.com/problems/longest-increasing-subsequence/' },

  // DP 2D / Grid
  { slug: 'dp-2d', difficulty: 'medium', title: 'Unique Paths', problem_number: 62, link: 'https://leetcode.com/problems/unique-paths/' },
  { slug: 'dp-2d', difficulty: 'medium', title: 'Minimum Path Sum', problem_number: 64, link: 'https://leetcode.com/problems/minimum-path-sum/' },
  { slug: 'dp-2d', difficulty: 'hard', title: 'Edit Distance', problem_number: 72, link: 'https://leetcode.com/problems/edit-distance/' },
  { slug: 'dp-grid', difficulty: 'medium', title: 'Unique Paths', problem_number: 62, link: 'https://leetcode.com/problems/unique-paths/' },
  { slug: 'dp-grid', difficulty: 'hard', title: 'Dungeon Game', problem_number: 174, link: 'https://leetcode.com/problems/dungeon-game/' },

  // DP String
  { slug: 'dp-string', difficulty: 'medium', title: 'Longest Common Subsequence', problem_number: 1143, link: 'https://leetcode.com/problems/longest-common-subsequence/' },
  { slug: 'dp-string', difficulty: 'hard', title: 'Edit Distance', problem_number: 72, link: 'https://leetcode.com/problems/edit-distance/' },

  // DP Advanced
  { slug: 'dp-advanced', difficulty: 'hard', title: 'Burst Balloons', problem_number: 312, link: 'https://leetcode.com/problems/burst-balloons/' },
  { slug: 'dp-advanced', difficulty: 'hard', title: 'Regular Expression Matching', problem_number: 10, link: 'https://leetcode.com/problems/regular-expression-matching/' },

  // Greedy
  { slug: 'greedy-algorithms', difficulty: 'medium', title: 'Jump Game', problem_number: 55, link: 'https://leetcode.com/problems/jump-game/' },
  { slug: 'greedy-algorithms', difficulty: 'medium', title: 'Gas Station', problem_number: 134, link: 'https://leetcode.com/problems/gas-station/' },
  { slug: 'greedy-algorithms', difficulty: 'hard', title: 'Candy', problem_number: 135, link: 'https://leetcode.com/problems/candy/' },

  // Backtracking
  { slug: 'backtracking', difficulty: 'medium', title: 'Subsets', problem_number: 78, link: 'https://leetcode.com/problems/subsets/' },
  { slug: 'backtracking', difficulty: 'medium', title: 'Permutations', problem_number: 46, link: 'https://leetcode.com/problems/permutations/' },
  { slug: 'backtracking', difficulty: 'medium', title: 'Combination Sum', problem_number: 39, link: 'https://leetcode.com/problems/combination-sum/' },
  { slug: 'backtracking', difficulty: 'hard', title: 'N-Queens', problem_number: 51, link: 'https://leetcode.com/problems/n-queens/' },

  // Trie
  { slug: 'trie', difficulty: 'medium', title: 'Implement Trie (Prefix Tree)', problem_number: 208, link: 'https://leetcode.com/problems/implement-trie-prefix-tree/' },
  { slug: 'trie', difficulty: 'medium', title: 'Design Add and Search Words Data Structure', problem_number: 211, link: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/' },
  { slug: 'trie', difficulty: 'hard', title: 'Word Search II', problem_number: 212, link: 'https://leetcode.com/problems/word-search-ii/' },

  // Segment Trees
  { slug: 'segment-trees', difficulty: 'medium', title: 'Range Sum Query - Mutable', problem_number: 307, link: 'https://leetcode.com/problems/range-sum-query-mutable/' },
  { slug: 'segment-trees', difficulty: 'hard', title: 'Count of Smaller Numbers After Self', problem_number: 315, link: 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/' },

  // Disjoint Set Union (Union-Find)
  { slug: 'disjoint-set-union', difficulty: 'medium', title: 'Number of Provinces', problem_number: 547, link: 'https://leetcode.com/problems/number-of-provinces/' },
  { slug: 'disjoint-set-union', difficulty: 'medium', title: 'Redundant Connection', problem_number: 684, link: 'https://leetcode.com/problems/redundant-connection/' },
  { slug: 'disjoint-set-union', difficulty: 'hard', title: 'Accounts Merge', problem_number: 721, link: 'https://leetcode.com/problems/accounts-merge/' },

  // Bit Manipulation
  { slug: 'bit-manipulation', difficulty: 'easy', title: 'Single Number', problem_number: 136, link: 'https://leetcode.com/problems/single-number/' },
  { slug: 'bit-manipulation', difficulty: 'easy', title: 'Number of 1 Bits', problem_number: 191, link: 'https://leetcode.com/problems/number-of-1-bits/' },
  { slug: 'bit-manipulation', difficulty: 'medium', title: 'Counting Bits', problem_number: 338, link: 'https://leetcode.com/problems/counting-bits/' },

  // Prefix Sum
  { slug: 'prefix-sum', difficulty: 'easy', title: 'Running Sum of 1d Array', problem_number: 1480, link: 'https://leetcode.com/problems/running-sum-of-1d-array/' },
  { slug: 'prefix-sum', difficulty: 'medium', title: 'Subarray Sum Equals K', problem_number: 560, link: 'https://leetcode.com/problems/subarray-sum-equals-k/' },
  { slug: 'prefix-sum', difficulty: 'medium', title: 'Range Sum Query 2D - Immutable', problem_number: 304, link: 'https://leetcode.com/problems/range-sum-query-2d-immutable/' },

  // 2D Arrays / Matrix
  { slug: '2d-arrays', difficulty: 'medium', title: 'Rotate Image', problem_number: 48, link: 'https://leetcode.com/problems/rotate-image/' },
  { slug: '2d-arrays', difficulty: 'medium', title: 'Spiral Matrix', problem_number: 54, link: 'https://leetcode.com/problems/spiral-matrix/' },
  { slug: '2d-arrays', difficulty: 'medium', title: 'Set Matrix Zeroes', problem_number: 73, link: 'https://leetcode.com/problems/set-matrix-zeroes/' },

  // Topological Sort
  { slug: 'topological-sort', difficulty: 'medium', title: 'Course Schedule', problem_number: 207, link: 'https://leetcode.com/problems/course-schedule/' },
  { slug: 'topological-sort', difficulty: 'medium', title: 'Course Schedule II', problem_number: 210, link: 'https://leetcode.com/problems/course-schedule-ii/' },
  { slug: 'topological-sort', difficulty: 'hard', title: 'Alien Dictionary', problem_number: 269, link: 'https://leetcode.com/problems/alien-dictionary/' },

  // Shortest Path (Dijkstra)
  { slug: 'dijkstra-algorithm', difficulty: 'medium', title: 'Network Delay Time', problem_number: 743, link: 'https://leetcode.com/problems/network-delay-time/' },
  { slug: 'dijkstra-algorithm', difficulty: 'hard', title: 'Find the City With the Smallest Number of Neighbors', problem_number: 1334, link: 'https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/' },

  // Bellman-Ford
  { slug: 'bellman-ford', difficulty: 'medium', title: 'Network Delay Time', problem_number: 743, link: 'https://leetcode.com/problems/network-delay-time/' },
  { slug: 'bellman-ford', difficulty: 'medium', title: 'Cheapest Flights Within K Stops', problem_number: 787, link: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/' },

  // MST
  { slug: 'mst', difficulty: 'medium', title: 'Min Cost to Connect All Points', problem_number: 1584, link: 'https://leetcode.com/problems/min-cost-to-connect-all-points/' },
  { slug: 'mst', difficulty: 'hard', title: 'Optimize Water Distribution in a Village', problem_number: 1168, link: 'https://leetcode.com/problems/optimize-water-distribution-in-a-village/' },

  // KMP
  { slug: 'kmp-algorithm', difficulty: 'hard', title: 'Find the Index of the First Occurrence in a String', problem_number: 28, link: 'https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/' },
  { slug: 'kmp-algorithm', difficulty: 'hard', title: 'Shortest Palindrome', problem_number: 214, link: 'https://leetcode.com/problems/shortest-palindrome/' },

  // Modular Arithmetic
  { slug: 'modular-arithmetic', difficulty: 'medium', title: 'Super Pow', problem_number: 372, link: 'https://leetcode.com/problems/super-pow/' },
  { slug: 'modular-arithmetic', difficulty: 'medium', title: 'Counting Bits', problem_number: 338, link: 'https://leetcode.com/problems/counting-bits/' },
];

async function run() {
  console.log('Seeding LeetCode questions...');

  // Clear existing questions
  await query('DELETE FROM leetcode_questions');

  let inserted = 0;
  for (const q of LEETCODE_QUESTIONS) {
    const topicRes = await query('SELECT id FROM topics WHERE slug = $1', [q.slug]);
    if (!topicRes.rows[0]) {
      console.warn(`  Topic not found: ${q.slug}`);
      continue;
    }
    const topicId = topicRes.rows[0].id;

    // Skip if problem_number is null (use title as unique check instead)
    if (q.problem_number == null) {
      await query(
        `INSERT INTO leetcode_questions (topic_id, difficulty, title, link)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT DO NOTHING`,
        [topicId, q.difficulty, q.title, q.link]
      );
    } else {
      await query(
        `INSERT INTO leetcode_questions (topic_id, difficulty, title, link, problem_number)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (topic_id, problem_number) DO UPDATE SET
           title = EXCLUDED.title,
           link = EXCLUDED.link,
           difficulty = EXCLUDED.difficulty`,
        [topicId, q.difficulty, q.title, q.link, q.problem_number]
      );
    }
    inserted++;
  }

  console.log(`Inserted/updated ${inserted} LeetCode questions`);
  process.exit(0);
}

run().catch((err) => { console.error(err); process.exit(1); });
