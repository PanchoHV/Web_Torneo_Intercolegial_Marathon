#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const graphPath = path.join('graphify-out', 'graph.json');

function fail(message) {
  console.error(`GRAPH VALIDATION FAIL: ${message}`);
  process.exit(1);
}

if (!fs.existsSync(graphPath)) {
  fail('graphify-out/graph.json is missing');
}

let graph;
try {
  graph = JSON.parse(fs.readFileSync(graphPath, 'utf8'));
} catch {
  fail('graphify-out/graph.json is not valid JSON');
}

const nodes = Array.isArray(graph.nodes) ? graph.nodes : [];
const edges = Array.isArray(graph.edges)
  ? graph.edges
  : Array.isArray(graph.links)
    ? graph.links
    : [];

if (nodes.length === 0) {
  fail('graph has no nodes');
}

if (edges.length === 0) {
  fail('graph has no edges');
}

const getSourceFile = (node) =>
  String(node?.source_file || node?.path || node?.file_path || node?.source || '');

const hasEntryPoint = (target) => nodes.some((node) => getSourceFile(node) === target);
const mainFound = hasEntryPoint('src/main.tsx');
const appFound = hasEntryPoint('src/App.tsx');

if (!mainFound) {
  fail('src/main.tsx is not represented in the graph');
}

if (!appFound) {
  fail('src/App.tsx is not represented in the graph');
}

const excluded = nodes.filter((node) => {
  const sourceFile = getSourceFile(node);
  return (
    sourceFile.includes('node_modules/') ||
    sourceFile.includes('/dist/') ||
    sourceFile.includes('/build/') ||
    sourceFile.includes('graphify-out/')
  );
});

if (excluded.length > 0) {
  fail(`excluded paths detected in graph nodes: ${excluded.length}`);
}

console.log('GRAPH VALIDATION PASS');
console.log(`nodes: ${nodes.length}`);
console.log(`edges: ${edges.length}`);
console.log('entrypoints: PASS');
console.log('excluded paths: PASS');
