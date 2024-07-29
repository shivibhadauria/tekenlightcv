import React, { useState, useEffect } from 'react';
import Dropdown from './component/dropdown';

const traverse = (node, result = {}) => {
  if (node && typeof node === 'object') {
    if (node.boardDisplayName) {
      result.boardDisplayName = node.boardDisplayName;
    }
    if (node.gradeDisplayName) {
      result.gradeDisplayName = node.gradeDisplayName;
    }
    if (node.subjectDisplayName) {
      result.subjectDisplayName = node.subjectDisplayName;
    }
    if (node.specializationDisplayName) {
      result.specializationDisplayName = node.specializationDisplayName;
    }
    if (node.unitDisplayName) {
      result.unitDisplayName = node.unitDisplayName;
    }

    Object.keys(node).forEach(key => {
      if (typeof node[key] === 'object') {
        traverse(node[key], result);
      }
    });
  }
  return result;
};

const App = () => {
  const [data, setData] = useState({});
  const [boards, setBoards] = useState([]);
  const [grades, setGrades] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [units, setUnits] = useState([]);

  const [selectedBoard, setSelectedBoard] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');

  useEffect(() => {
    fetch('/unitData.json')
      .then(response => response.json())
      .then(data => {
        setData(data);
        const boardOptions = Object.keys(data).map(board => {
          const displayName = traverse(data[board]).boardDisplayName || board;
          return { id: board, name: displayName };
        });
        setBoards(boardOptions);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (selectedBoard && data[selectedBoard]) {
      const gradeOptions = Object.keys(data[selectedBoard]).map(grade => {
        const displayName = traverse(data[selectedBoard][grade]).gradeDisplayName || grade;
        return { id: grade, name: displayName };
      });
      setGrades(gradeOptions);
    } else {
      setGrades([]);
    }
    setSelectedGrade('');
    setSelectedSubject('');
    setSelectedSpecialization('');
    setUnits([]);
  }, [selectedBoard, data]);

  useEffect(() => {
    if (selectedGrade && data[selectedBoard] && data[selectedBoard][selectedGrade]) {
      const subjectOptions = Object.keys(data[selectedBoard][selectedGrade]).map(subject => {
        const displayName = traverse(data[selectedBoard][selectedGrade][subject]).subjectDisplayName || subject;
        return { id: subject, name: displayName };
      });
      setSubjects(subjectOptions);
    } else {
      setSubjects([]);
    }
    setSelectedSubject('');
    setSelectedSpecialization('');
    setUnits([]);
  }, [selectedGrade, selectedBoard, data]);

  useEffect(() => {
    if (selectedSubject && data[selectedBoard] && data[selectedBoard][selectedGrade] && data[selectedBoard][selectedGrade][selectedSubject]) {
      const specializationOptions = Object.keys(data[selectedBoard][selectedGrade][selectedSubject]).map(spec => {
        const displayName = traverse(data[selectedBoard][selectedGrade][selectedSubject][spec]).specializationDisplayName || spec;
        return { id: spec, name: displayName };
      });
      setSpecializations(specializationOptions);
    } else {
      setSpecializations([]);
    }
    setSelectedSpecialization('');
    setUnits([]);
  }, [selectedSubject, selectedGrade, selectedBoard, data]);

  useEffect(() => {
    
    if (selectedSubject && data[selectedBoard] && data[selectedBoard][selectedGrade] && data[selectedBoard][selectedGrade][selectedSubject]) {
      const subjectData = data[selectedBoard][selectedGrade][selectedSubject];
      
      
      if (selectedSpecialization && subjectData[selectedSpecialization]) {
        const unitsData = subjectData[selectedSpecialization];
        const unitOptions = Object.keys(unitsData).map(unit => ({
          id: unit,
          name: unitsData[unit].unitDisplayName || unit
        }));
        setUnits(unitOptions);
      } else {
        
        const unitsData = Object.keys(subjectData).length === 1 && subjectData['NULL']
          ? subjectData['NULL']
          : subjectData;
  
        const unitOptions = Object.keys(unitsData).map(unit => ({
          id: unit,
          name: unitsData[unit].unitDisplayName || unit
        }));
        setUnits(unitOptions);
      }
    } else {
      
      setUnits([]);
    }
  }, [selectedSpecialization, selectedSubject, selectedGrade, selectedBoard, data]);
  

  const isSpecializationNull = () => {
    return selectedSubject && data[selectedBoard][selectedGrade][selectedSubject].hasOwnProperty('NULL');
  };

  const dropdownContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    padding: '20px',
  };

  return (
    <div>
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
            setUnits([]);
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
            setUnits([]);
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
            setUnits([]);
          }}
          disabled={!selectedGrade}
        />
        <Dropdown
          placeholder="Specialization"
          options={specializations}
          value={selectedSpecialization}
          onChange={e => setSelectedSpecialization(e.target.value)}
          disabled={!selectedSubject || specializations.length === 0 || isSpecializationNull()}
        />
      </div>
      <div>
        <h2>Units</h2>
        <ul>
          {units.map(unit => (
            <li key={unit.id}>{unit.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
