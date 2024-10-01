
import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import axios from 'axios';
import './App.css';

const CodeEditor = () => {
const [code, setCode] = useState('');
const [output, setOutput] = useState('');
const [testResults, setTestResults] = useState([]);
const [language, setLanguage] = useState('javascript');

const handleEditorChange = (newValue) => {
setCode(newValue);
};

const questions = [
{
description: 'Write a function to reverse a string.',
testCases: [
{ input: 'Hello, World!', expected: '!dlroW ,olleH' },
{ input: 'React', expected: 'tcaeR' },
{ input: 'JavaScript', expected: 'tpircSavaJ' }
]
},
{
description: 'Write a function to check if a string is a palindrome.',
testCases: [
{ input: 'madam', expected: 'true' },
{ input: 'hello', expected: 'false' },
{ input: 'racecar', expected: 'true' }
]
}
];

const executeCode = async () => {
const allResults = [];
for (const question of questions) {
const results = [];
for (const testCase of question.testCases) {
try {
const response = await axios.post('https://api.jdoodle.com/v1/execute', {
script: `${code}\nconsole.log(${question.description.includes('reverse') ? 'reverse_string' : 'is_palindrome'}('${testCase.input}'));`,
language: language,
versionIndex: '0',
clientId: '308e2e30140977aa69ce46bd690e2e5a',
clientSecret: 'c61f3c03554153a7e69a3707918665d103db2b3b90c2e1e4e8da7202d38a4291'
});
const actualOutput = response.data.output.trim();
const passed = actualOutput === testCase.expected;
results.push({ input: testCase.input, expected: testCase.expected, actual: actualOutput, passed });
} catch (error) {
console.error('Error executing code:', error);
results.push({ input: testCase.input, expected: testCase.expected, actual: 'Error', passed: false });
}
}
allResults.push({ question: question.description, results });
}
setTestResults(allResults);
};

return (
<div className="container">
<div className="question">
<h2>Questions:</h2>
{questions.map((question, index) => (
<div key={index}>
<p>{question.description}</p>
</div>
))}
</div>
<div className="editor">
<select onChange={(e) => setLanguage(e.target.value)} value={language}>
<option value="javascript">JavaScript</option>
<option value="python">Python</option>
<option value="java">Java</option>
<option value="cpp">C++</option>
<option value="c">C</option>
<option value="ruby">Ruby</option>
</select>
<MonacoEditor
width="100%"
height="600"
language={language}
theme="vs-dark"
value={code}
onChange={handleEditorChange}
/>
<button onClick={executeCode}>Run Code</button>
<div>
<h3>Test Results:</h3>
{testResults.map((result, index) => (
<div key={index}>
<h4>{result.question}</h4>
{result.results.map((testResult, idx) => (
<div key={idx} style={{ color: testResult.passed ? 'green' : 'red' }}>
<p>Input: {testResult.input}</p>
<p>Expected: {testResult.expected}</p>
<p>Actual: {testResult.actual}</p>
<p>{testResult.passed ? 'Passed' : 'Failed'}</p>
</div>
))}
</div>
))}
</div>
</div>
</div>
);
};

export default CodeEditor;