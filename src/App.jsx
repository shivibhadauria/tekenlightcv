import React, { useState, useEffect } from 'react';
import Dropdown from './component/dropdown';

const App = () => {
  const [data, setData] = useState({});
  const [boards, setBoards] = useState([]);
  const [grades, setGrades] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [specializations, setSpecializations] = useState([]);

  const [selectedBoard, setSelectedBoard] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');

  useEffect(() => {
    // Fetch the data from the JSON file
    fetch('/unitData.json')
      .then(response => response.json())
      .then(data => {
        setData(data);
        const boardOptions = Object.keys(data).map(board => ({
          id: board,
          name: Object.values(data[board])[0]?.[Object.keys(data[board])[0]]?.[Object.keys(Object.values(data[board])[0])[0]]?.[Object.keys(Object.values(Object.values(data[board])[0])[0])[0]]?.boardDisplayName || board
        }));
        setBoards(boardOptions);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (selectedBoard) {
      const gradeOptions = Object.keys(data[selectedBoard]).map(grade => ({
        id: grade,
        name: Object.values(data[selectedBoard][grade])[0]?.[Object.keys(data[selectedBoard][grade])[0]]?.[Object.keys(Object.values(data[selectedBoard][grade])[0])[0]]?.gradeDisplayName || grade
      }));
      setGrades(gradeOptions);
    } else {
      setGrades([]);
    }
    setSelectedGrade('');
    setSelectedSubject('');
    setSelectedSpecialization('');
  }, [selectedBoard, data]);

  useEffect(() => {
    if (selectedGrade) {
      const subjectOptions = Object.keys(data[selectedBoard][selectedGrade]).map(subject => ({
        id: subject,
        name: Object.values(data[selectedBoard][selectedGrade][subject])[0]?.[Object.keys(data[selectedBoard][selectedGrade][subject])[0]]?.subjectDisplayName || subject
      }));
      setSubjects(subjectOptions);
    } else {
      setSubjects([]);
    }
    setSelectedSubject('');
    setSelectedSpecialization('');
  }, [selectedGrade, selectedBoard, data]);

  useEffect(() => {
    if (selectedSubject) {
      const specializationOptions = Object.keys(data[selectedBoard][selectedGrade][selectedSubject]).map(spec => ({
        id: spec,
        name: Object.values(data[selectedBoard][selectedGrade][selectedSubject][spec])[0]?.specializationDisplayName || spec
      }));
      setSpecializations(specializationOptions);
    } else {
      setSpecializations([]);
    }
    setSelectedSpecialization('');
  }, [selectedSubject, selectedGrade, selectedBoard, data]);

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
          setSelectedSpecialization('');
        }}
      />
      <Dropdown
        placeholder="Grade"
        options={grades}
        value={selectedGrade}
        onChange={e => {
          setSelectedGrade(e.target.value);
          setSelectedSubject('');
          setSelectedSpecialization('');
        }}
        disabled={!selectedBoard}
      />
      <Dropdown
        placeholder="Subject"
        options={subjects}
        value={selectedSubject}
        onChange={e => {
          setSelectedSubject(e.target.value);
          setSelectedSpecialization('');
        }}
        disabled={!selectedGrade}
      />
      <Dropdown
        placeholder="Specialization"
        options={specializations}
        value={selectedSpecialization}
        onChange={e => setSelectedSpecialization(e.target.value)}
        disabled={!selectedSubject || specializations.some(spec => spec.id === 'NULL')}
      />
    </div>
  );
};

export default App;
