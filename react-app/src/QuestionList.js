import React from 'react';
import { FixedSizeList as List } from 'react-window';

const QuestionList = ({ questions }) => (
<List
height={600}
itemCount={questions.length}
itemSize={35}
width={800}
>
{({ index, style }) => (
<div style={style}>
{questions[index]}
</div>
)}
</List>
);

export default QuestionList;