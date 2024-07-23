import React, { useState } from 'react';

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
  };

  const dropdownStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

 

  const selectStyle = {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '150px',
  };

  return (
    
      <div style={dropdownContainerStyle}>
        <div style={dropdownStyle}>
          
          <select
            style={selectStyle}
            value={selectedBoard}
            onChange={e => {
              setSelectedBoard(e.target.value);
              setSelectedGrade('');
              setSelectedSubject('');
            }}
          >
            <option value="">Board</option>
            {boards.map(board => (
              <option key={board.id} value={board.id}>{board.name}</option>
            ))}
          </select>
        </div>
        <div style={dropdownStyle}>
          
          <select
            style={selectStyle}
            value={selectedGrade}
            onChange={e => {
              setSelectedGrade(e.target.value);
              setSelectedSubject('');
            }}
            disabled={!selectedBoard}
          >
            <option value="">Grade</option>
            {selectedBoard && gradesData[selectedBoard].map(grade => (
              <option key={grade.id} value={grade.id}>{grade.name}</option>
            ))}
          </select>
        </div>
        <div style={dropdownStyle}>
          
          <select
            style={selectStyle}
            value={selectedSubject}
            onChange={e => setSelectedSubject(e.target.value)}
            disabled={!selectedGrade}
          >
            <option value="">Subject</option>
            {selectedGrade && subjectsData[selectedGrade].map(subject => (
              <option key={subject.id} value={subject.id}>{subject.name}</option>
            ))}
          </select>
        </div>
      </div>
    
  );
};

export default App;
