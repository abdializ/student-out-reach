/*
 * STUDENT OUTREACH TRACKER - CLIENT-ONLY APPLICATION
 * 
 * PRIVACY & SECURITY NOTICE:
 * - This application is completely client-side and does not store any data
 * - All data remains in local React state only (memory)
 * - No data is transmitted to any servers, APIs, or external services
 * - No persistent storage is used (no localStorage, sessionStorage, cookies, etc.)
 * - All data is lost when the page is refreshed or closed
 * - No analytics, tracking, or data collection of any kind
 * - Fully compliant with privacy regulations (GDPR, CCPA, etc.)
 */

import React, { useState } from 'react';
import Head from 'next/head';

interface Student {
  id: string;
  name: string;
  studentId: string;
  advisor: string;
}

export default function Home() {
  /*
   * ALL DATA STORAGE - CLIENT-ONLY REACT STATE
   * No persistent storage, no external transmission
   * Data exists only in memory during the session
   */
  
  // Section 1: Appointments - Stored in React state only
  const [studentsAnswered, setStudentsAnswered] = useState(0);
  const [voicemails, setVoicemails] = useState(0);
  const [canceledStudents, setCanceledStudents] = useState<Student[]>([]);

  // Section 2: Call Campaign - Stored in React state only
  const [studentsAttempted, setStudentsAttempted] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [voicemailsLeft, setVoicemailsLeft] = useState(0);
  const [noAnswer, setNoAnswer] = useState(0);

  // Student management functions - All operations in local state only
  const addStudent = () => {
    const newStudent: Student = {
      id: Date.now().toString(), // Simple client-side ID generation
      name: '',
      studentId: '',
      advisor: ''
    };
    setCanceledStudents([...canceledStudents, newStudent]);
  };

  const updateStudent = (id: string, field: keyof Student, value: string) => {
    // Update student data in local React state only
    setCanceledStudents(prev => 
      prev.map(student => 
        student.id === id ? { ...student, [field]: value } : student
      )
    );
  };

  const removeStudent = (id: string) => {
    // Remove student from local React state only
    setCanceledStudents(prev => prev.filter(student => student.id !== id));
  };

  // Generate email summary using only local state data - no external processing
  const generateSummary = () => {
    const today = new Date(); // Browser date API only, no external time services
    const formattedDate = today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    const totalCallCampaign = studentsAttempted;
    const successRate = totalCallCampaign > 0 ? ((answered / totalCallCampaign) * 100).toFixed(1) : '0';
    
    let canceledStudentsList = '';
    if (canceledStudents.length > 0) {
      canceledStudentsList = '\n\nCanceled/Changed Appointments:\n' + 
        canceledStudents.map((student, index) => {
          const name = student.name || 'Name not provided';
          const id = student.studentId || 'ID not provided';
          const advisor = student.advisor || 'Advisor not assigned';
          return `${index + 1}. ${name} (ID: ${id}) - Advisor: ${advisor}`;
        }).join('\n');
    }
    
    return `Subject: Student Outreach Summary for ${formattedDate}

Student Appointments:
Students Answered: ${studentsAnswered}
Voicemails Left: ${voicemails}
Students with Changed/Canceled Appointments: ${canceledStudents.length}${canceledStudentsList}

Call Campaign Results:
Students Attempted: ${studentsAttempted}
Answered: ${answered}
Voicemails Left: ${voicemailsLeft}
No Answer/No Voicemail: ${noAnswer}
Success Rate: ${successRate}%

Total Outreach Contacts: ${studentsAnswered + voicemails + studentsAttempted}

Documented everything in the shared spreadsheet.`;
  };

  // Summary generation - All data processed client-side only
  const [summary, setSummary] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  // Generate summary using only local state data - no external calls
  const handleGenerateSummary = () => {
    setSummary(generateSummary());
  };

  // Copy to clipboard - browser API only, no data transmission
  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const CounterButton = ({ 
    label, 
    value, 
    onIncrement, 
    onDecrement 
  }: {
    label: string;
    value: number;
    onIncrement: () => void;
    onDecrement: () => void;
  }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
      <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">{label}</h3>
      <div className="flex items-center justify-between">
        <button
          onClick={onDecrement}
          className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 text-red-500 hover:from-red-100 hover:to-red-200 hover:text-red-600 transition-all duration-200 flex items-center justify-center font-bold text-lg shadow-sm hover:shadow-md"
        >
          −
        </button>
        <span className="text-3xl font-bold text-gray-800 mx-6">{value}</span>
        <button
          onClick={onIncrement}
          className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-500 hover:from-blue-100 hover:to-blue-200 hover:text-blue-600 transition-all duration-200 flex items-center justify-center font-bold text-lg shadow-sm hover:shadow-md"
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>Student Outreach Tracker</title>
        <meta name="description" content="Track student outreach activities" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">Student Outreach Tracker</h1>
            <p className="text-gray-600 text-lg">Monitor and track your student engagement activities</p>
          </div>

          {/* Section 1: Appointments */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-10 border border-gray-100">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Appointments</h2>
            </div>
            
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
               <CounterButton
                 label="Students Answered"
                 value={studentsAnswered}
                 onIncrement={() => setStudentsAnswered(prev => prev + 1)}
                 onDecrement={() => setStudentsAnswered(prev => Math.max(0, prev - 1))}
               />
               <CounterButton
                 label="Voicemails Left"
                 value={voicemails}
                 onIncrement={() => setVoicemails(prev => prev + 1)}
                 onDecrement={() => setVoicemails(prev => Math.max(0, prev - 1))}
               />
             </div>

             <div className="border-t border-gray-200 pt-8">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xl font-bold text-gray-800">Students who Canceled/Changed Appointments</h3>
                 <button
                   onClick={addStudent}
                   className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                 >
                   Add Student
                 </button>
               </div>
              
                             {canceledStudents.length === 0 ? (
                 <p className="text-gray-500 text-center py-8 text-lg">No students added yet</p>
               ) : (
                 <div className="space-y-4">
                   {canceledStudents.map((student) => (
                     <div key={student.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                         <div>
                           <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                           <input
                             type="text"
                             value={student.name}
                             onChange={(e) => updateStudent(student.id, 'name', e.target.value)}
                             className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                             placeholder="Student name"
                           />
                         </div>
                         <div>
                           <label className="block text-sm font-semibold text-gray-700 mb-2">Student ID</label>
                           <input
                             type="text"
                             value={student.studentId}
                             onChange={(e) => updateStudent(student.id, 'studentId', e.target.value)}
                             className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                             placeholder="Student ID"
                           />
                         </div>
                         <div>
                           <label className="block text-sm font-semibold text-gray-700 mb-2">Advisor Assigned</label>
                           <input
                             type="text"
                             value={student.advisor}
                             onChange={(e) => updateStudent(student.id, 'advisor', e.target.value)}
                             className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                             placeholder="Advisor name"
                           />
                         </div>
                         <div className="flex items-end">
                           <button
                             onClick={() => removeStudent(student.id)}
                             className="w-full bg-gradient-to-r from-red-100 to-red-200 text-red-600 px-4 py-3 rounded-2xl hover:from-red-200 hover:to-red-300 transition-all duration-200 font-semibold"
                           >
                             Remove
                           </button>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               )}
            </div>
          </div>

          {/* Section 2: Call Campaign */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-10 border border-gray-100">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Call Campaign</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <CounterButton
                label="Students Attempted"
                value={studentsAttempted}
                onIncrement={() => setStudentsAttempted(prev => prev + 1)}
                onDecrement={() => setStudentsAttempted(prev => Math.max(0, prev - 1))}
              />
              <CounterButton
                label="Answered"
                value={answered}
                onIncrement={() => setAnswered(prev => prev + 1)}
                onDecrement={() => setAnswered(prev => Math.max(0, prev - 1))}
              />
              <CounterButton
                label="Voicemails Left"
                value={voicemailsLeft}
                onIncrement={() => setVoicemailsLeft(prev => prev + 1)}
                onDecrement={() => setVoicemailsLeft(prev => Math.max(0, prev - 1))}
              />
              <CounterButton
                label="No Answer / No Voicemail"
                value={noAnswer}
                onIncrement={() => setNoAnswer(prev => prev + 1)}
                onDecrement={() => setNoAnswer(prev => Math.max(0, prev - 1))}
              />
            </div>
          </div>

          {/* Section 3: Summary Generator */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Summary Generator</h2>
            </div>
            
            <div className="text-center mb-8">
              <button
                onClick={handleGenerateSummary}
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-10 py-4 rounded-2xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                Generate Summary
              </button>
            </div>
            
            {summary && (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Email Summary</h3>
                  <button
                    onClick={handleCopySummary}
                    className={`px-4 py-2 rounded-xl transition-all duration-200 font-semibold ${
                      copySuccess 
                        ? 'bg-green-100 text-green-700 border border-green-200' 
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {copySuccess ? (
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Copied!
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy Summary
                      </span>
                    )}
                  </button>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <pre className="whitespace-pre-wrap text-gray-700 text-sm leading-relaxed font-mono">
                    {summary}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Privacy Notice */}
          <div className="mt-12 text-center">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <h3 className="text-lg font-bold text-gray-800">Privacy Protected</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                This application runs entirely in your browser. <strong>No data is stored or transmitted</strong> to any servers. 
                All information remains in your device's memory only and is automatically deleted when you close or refresh the page. 
                Your student data stays completely private and secure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 