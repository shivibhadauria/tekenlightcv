// src/App.jsx

import React, { useState } from 'react';
import Dropdown from './component/dropdown';

const App = () => {
  const boards = [
    { id: 'icse', name: 'ICSE' },
    { id: 'cbse', name: 'CBSE' },
  ];

  const gradesData = {
    icse: [
      { id: '1', name: 'Grade 1' },
      { id: '2', name: 'Grade 2' },
      { id: '3', name: 'Grade 3' },
      { id: '4', name: 'Grade 4' },
      { id: '5', name: 'Grade 5' },
    ],
    cbse: [
      { id: '11', name: 'Grade 11' },
      { id: '12', name: 'Grade 12' },
    ],
  };

  const subjectsData = {
    1: [
      { id: 'hindi', name: 'Hindi' },
      { id: 'english', name: 'English' },
    ],
    2: [
      { id: 'hindi', name: 'Hindi' },
      { id: 'english', name: 'English' },
    ],
    3: [
      { id: 'hindi', name: 'Hindi' },
      { id: 'english', name: 'English' },
    ],
    4: [
      { id: 'hindi', name: 'Hindi' },
      { id: 'english', name: 'English' },
    ],
    5: [
      { id: 'hindi', name: 'Hindi' },
      { id: 'english', name: 'English' },
    ],
    11: [
      { id: 'pcm', name: 'PCM' },
      { id: 'pcb', name: 'PCB' },
    ],
    12: [
      { id: 'pcm', name: 'PCM' },
      { id: 'pcb', name: 'PCB' },
    ],
  };

  const [selectedBoard, setSelectedBoard] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  const dropdownContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    padding: '20px',
  };

  return (
    <div style={dropdownContainerStyle}>
      <Dropdown
        placeholder="Board"
        options={boards}
        value={selectedBoard}
        onChange={e => {
          setSelectedBoard(e.target.value);
          setSelectedGrade('');
          setSelectedSubject('');
        }}
      />
      <Dropdown
        placeholder="Grade"
        options={selectedBoard ? gradesData[selectedBoard] : []}
        value={selectedGrade}
        onChange={e => {
          setSelectedGrade(e.target.value);
          setSelectedSubject('');
        }}
        disabled={!selectedBoard}
      />
      <Dropdown
        placeholder="Subject"
        options={selectedGrade ? subjectsData[selectedGrade] : []}
        value={selectedSubject}
        onChange={e => setSelectedSubject(e.target.value)}
        disabled={!selectedGrade}
      />
    </div>
  );
};

export default App;
