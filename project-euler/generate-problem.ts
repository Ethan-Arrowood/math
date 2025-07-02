import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { parse } from 'node-html-parser';
import { basename, join } from 'node:path';

const arg = process.argv[2];

if (!arg) {
	console.error('Error: Problem number argument is required.');
	process.exit(1);
}

const n = parseInt(arg, 10);

if (isNaN(n) || n <= 0) {
	console.error('Error: Problem number must be a positive integer.');
	process.exit(1);
}

const response = await fetch(`https://projecteuler.net/problem=${n}`);
const body = await response.text();

const root = parse(body);

const title = root.querySelector('h2').textContent;
const name = title.toLowerCase().replaceAll(/\s/g, '-');

const projectEulerDirectory = import.meta.dirname;

const problemDirectory = join(projectEulerDirectory, `${n}-${name}`);

if (existsSync(problemDirectory)) {
	console.log(`Problem directory ${basename(problemDirectory)} already exists`);
	process.exit(1);
}

const problemContentNode = root.querySelector('.problem_content');

mkdirSync(problemDirectory);

const notesPath = join(problemDirectory, 'notes.md');

let notesTemplate = readFileSync(
	join(projectEulerDirectory, 'notes-template.md'),
	'utf8',
);

notesTemplate = notesTemplate.replaceAll(/%n%/g, n.toString());
notesTemplate = notesTemplate.replaceAll(/%t%/g, title);

const problemContentLines = [];
for (const node of problemContentNode.querySelectorAll('p')) {
	problemContentLines.push(node.innerText.trim());
}

notesTemplate = notesTemplate.replace(/%p%/, problemContentLines.join('\n\n'));

writeFileSync(notesPath, notesTemplate);

console.log(`Successfully generated problem ${n}, ${title}`);
