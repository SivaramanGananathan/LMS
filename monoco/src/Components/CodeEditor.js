import * as monaco from 'monaco-editor';
import React, { useEffect, useRef, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';

// Mock test runner function
const runTests = (code) => {
// This is a mock function. Replace with your actual test logic.
const results = [];
if (code.includes('fail')) {
results.push({ line: 1, message: 'Test failed on line 1' });
} else {
results.push({ line: 1, message: 'All tests passed' });
}
return results;
};

const CodeEditor = () => {
const [code, setCode] = useState('// Write your code here');
const [markers, setMarkers] = useState([]);
const editorRef = useRef(null);

const handleEditorChange = (newValue) => {
setCode(newValue);
};

const handleRunTests = () => {
const testResults = runTests(code);
const newMarkers = testResults.map(result => ({
startLineNumber: result.line,
endLineNumber: result.line,
startColumn: 1,
endColumn: 1,
message: result.message,
severity: monaco.MarkerSeverity.Error
}));
setMarkers(newMarkers);
if (editorRef.current) {
monaco.editor.setModelMarkers(editorRef.current.getModel(), 'owner', newMarkers);
}
};

useEffect(() => {
if (editorRef.current) {
monaco.editor.setModelMarkers(editorRef.current.getModel(), 'owner', markers);
}
}, [markers]);

return (
<div>
<MonacoEditor
width="800"
height="600"
language="javascript"
theme="vs-dark"
value={code}
onChange={handleEditorChange}
editorDidMount={(editor) => { editorRef.current = editor; }}
/>
<button onClick={handleRunTests}>Run Tests</button>
</div>
);
};

export default CodeEditor;