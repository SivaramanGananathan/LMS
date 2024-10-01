import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import axios from 'axios';
import './App.css';

const CodeEditor = () => {
const [code, setCode] = useState('');
const [output, setOutput] = useState('');
const [language, setLanguage] = useState('javascript');

const handleEditorChange = (newValue) => {
setCode(newValue);
};

const executeCode = async () => {
try {
const response = await axios.post('https://api.jdoodle.com/v1/execute', {
script: code,
language: language,
versionIndex: '0',
clientId: '308e2e30140977aa69ce46bd690e2e5a',
clientSecret: '8ceb9247bb775620da3bbb64e6e17096a29e0c4df7070b9f1fd6aada6d376318'
});
setOutput(response.data.output);
} catch (error) {
setOutput(error.message);
}
};

return (
<div className="container">
<div className="question">
<h2>Question:</h2>
<p>Write a function to reverse a string.</p>
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
height="400"
language={language}
theme="vs-dark"
value={code}
onChange={handleEditorChange}
/>
<button onClick={executeCode}>Run Code</button>
<div>Output: {output}</div>
</div>
</div>
);
};

export default CodeEditor;