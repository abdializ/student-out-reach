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
  const [emailsSent, setEmailsSent] = useState(0);

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
    
    let summaryContent = `Subject: Student Outreach Summary for ${formattedDate}\n\n`;
    
    // Include Appointments section if selected
    if (includeAppointments) {
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
      
      summaryContent += `Student Appointments:
Students Answered: ${studentsAnswered}
Voicemails Left: ${voicemails}
Students with Changed/Canceled Appointments: ${canceledStudents.length}${canceledStudentsList}\n\n`;
    }
    
    // Include Call Campaign section if selected
    if (includeCallCampaign) {
      summaryContent += `Call Campaign Results:
Students Attempted: ${studentsAttempted}
Answered: ${answered}
Voicemails Left: ${voicemailsLeft}
No Answer/No Voicemail: ${noAnswer}
Emails Sent: ${emailsSent}
Success Rate: ${successRate}%\n\n`;
    }
    
    // Calculate total based on selected sections
    let totalContacts = 0;
    if (includeAppointments) {
      totalContacts += studentsAnswered + voicemails;
    }
    if (includeCallCampaign) {
      totalContacts += studentsAttempted + emailsSent;
    }
    
    summaryContent += `Total Outreach Contacts: ${totalContacts}

Documented everything in the shared spreadsheet.`;
    
    return summaryContent;
  };

  // Summary generation - All data processed client-side only
  const [summary, setSummary] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [includeAppointments, setIncludeAppointments] = useState(true);
  const [includeCallCampaign, setIncludeCallCampaign] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

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
    <div className={`rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${
      darkMode 
        ? 'bg-black border border-gray-800 shadow-2xl' 
        : 'bg-white border border-gray-100'
    }`}>
      <h3 className={`text-xs sm:text-sm font-semibold mb-3 sm:mb-4 uppercase tracking-wide text-center sm:text-left ${
        darkMode ? 'text-gray-300' : 'text-gray-500'
      }`}>{label}</h3>
      <div className="flex items-center justify-between">
        <button
          onClick={onDecrement}
          className={`w-12 h-12 sm:w-10 sm:h-10 rounded-2xl transition-all duration-200 flex items-center justify-center font-bold text-lg shadow-sm hover:shadow-md touch-manipulation ${
            darkMode 
              ? 'bg-gradient-to-br from-red-900 to-red-800 text-red-400 hover:from-red-800 hover:to-red-700 hover:text-red-300'
              : 'bg-gradient-to-br from-red-50 to-red-100 text-red-500 hover:from-red-100 hover:to-red-200 hover:text-red-600'
          }`}
        >
          −
        </button>
        <span className={`text-2xl sm:text-3xl font-bold mx-4 sm:mx-6 ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}>{value}</span>
        <button
          onClick={onIncrement}
          className={`w-12 h-12 sm:w-10 sm:h-10 rounded-2xl transition-all duration-200 flex items-center justify-center font-bold text-lg shadow-sm hover:shadow-md touch-manipulation ${
            darkMode 
              ? 'bg-gradient-to-br from-blue-900 to-blue-800 text-blue-400 hover:from-blue-800 hover:to-blue-700 hover:text-blue-300'
              : 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-500 hover:from-blue-100 hover:to-blue-200 hover:text-blue-600'
          }`}
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

      <div className={`min-h-screen transition-colors duration-300 py-6 md:py-12 ${
        darkMode 
          ? 'bg-black' 
          : 'bg-gradient-to-br from-gray-50 to-gray-100'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12 relative">
            {/* Dark Mode Toggle */}
            <div className="absolute top-0 right-0 sm:right-2 z-50">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 sm:p-3 rounded-xl transition-all duration-200 touch-manipulation cursor-pointer relative z-50 ${
                  darkMode 
                    ? 'bg-gray-800 border-2 border-yellow-500/50 text-yellow-400 hover:bg-gray-700 hover:border-yellow-400 shadow-lg shadow-yellow-500/20' 
                    : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md border border-gray-200'
                }`}
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                type="button"
              >
                {darkMode ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>

            <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 pr-12 sm:pr-16 ${
              darkMode 
                ? 'bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow-lg' 
                : 'bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'
            }`}>Student Outreach Tracker</h1>
            <p className={`text-sm sm:text-base lg:text-lg px-4 ${
              darkMode ? 'text-gray-300 drop-shadow-md' : 'text-gray-600'
            }`}>Monitor and track your student engagement activities</p>
          </div>

                    {/* Section 1: Appointments */}
          <div className={`rounded-2xl md:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 mb-6 md:mb-10 transition-colors duration-300 ${
            darkMode 
              ? 'bg-black border border-gray-800 shadow-2xl sm:shadow-blue-900/20' 
              : 'bg-white border border-gray-100'
          }`}>
            <div className="flex items-center mb-6 md:mb-8">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-3 md:mr-4">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className={`text-2xl sm:text-3xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>Appointments</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
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

             <div className={`border-t pt-6 md:pt-8 ${
               darkMode ? 'border-gray-600' : 'border-gray-200'
             }`}>
               <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 md:mb-6 gap-3 sm:gap-0">
                 <h3 className={`text-lg sm:text-xl font-bold ${
                   darkMode ? 'text-white' : 'text-gray-800'
                 }`}>Students who Canceled/Changed Appointments</h3>
                 <button
                   onClick={addStudent}
                   className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl text-sm sm:text-base"
                 >
                   Add Student
                 </button>
               </div>
              
                             {canceledStudents.length === 0 ? (
                 <p className={`text-center py-6 md:py-8 text-base md:text-lg ${
                   darkMode ? 'text-gray-400' : 'text-gray-500'
                 }`}>No students added yet</p>
               ) : (
                 <div className="space-y-3 md:space-y-4">
                   {canceledStudents.map((student) => (
                     <div key={student.id} className={`rounded-2xl p-4 md:p-6 transition-colors duration-300 ${
                       darkMode 
                         ? 'bg-black border border-gray-800' 
                         : 'bg-gray-50 border border-gray-200'
                     }`}>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                           <div className="sm:col-span-2 lg:col-span-1">
                             <label className={`block text-xs sm:text-sm font-semibold mb-1 md:mb-2 ${
                               darkMode ? 'text-gray-300' : 'text-gray-700'
                             }`}>Name</label>
                             <input
                               type="text"
                               value={student.name}
                               onChange={(e) => updateStudent(student.id, 'name', e.target.value)}
                               className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-xl md:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm md:text-base ${
                                 darkMode 
                                   ? 'bg-black border-gray-700 text-white placeholder-gray-400' 
                                   : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                               }`}
                               placeholder="Student name"
                             />
                           </div>
                           <div>
                             <label className={`block text-xs sm:text-sm font-semibold mb-1 md:mb-2 ${
                               darkMode ? 'text-gray-300' : 'text-gray-700'
                             }`}>Student ID</label>
                             <input
                               type="text"
                               value={student.studentId}
                               onChange={(e) => updateStudent(student.id, 'studentId', e.target.value)}
                               className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-xl md:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm md:text-base ${
                                 darkMode 
                                   ? 'bg-black border-gray-700 text-white placeholder-gray-400' 
                                   : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                               }`}
                               placeholder="Student ID"
                             />
                           </div>
                           <div>
                             <label className={`block text-xs sm:text-sm font-semibold mb-1 md:mb-2 ${
                               darkMode ? 'text-gray-300' : 'text-gray-700'
                             }`}>Advisor Assigned</label>
                             <input
                               type="text"
                               value={student.advisor}
                               onChange={(e) => updateStudent(student.id, 'advisor', e.target.value)}
                               className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-xl md:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm md:text-base ${
                                 darkMode 
                                   ? 'bg-black border-gray-700 text-white placeholder-gray-400' 
                                   : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                               }`}
                               placeholder="Advisor name"
                             />
                           </div>
                           <div className="flex items-end sm:col-span-2 lg:col-span-1">
                             <button
                               onClick={() => removeStudent(student.id)}
                               className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-xl md:rounded-2xl transition-all duration-200 font-semibold text-sm md:text-base ${
                                 darkMode 
                                   ? 'bg-gradient-to-r from-red-900 to-red-800 text-red-400 hover:from-red-800 hover:to-red-700'
                                   : 'bg-gradient-to-r from-red-100 to-red-200 text-red-600 hover:from-red-200 hover:to-red-300'
                               }`}
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
          <div className={`rounded-2xl md:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 mb-6 md:mb-10 transition-colors duration-300 ${
            darkMode 
              ? 'bg-black border border-gray-800 shadow-2xl sm:shadow-green-900/20' 
              : 'bg-white border border-gray-100'
          }`}>
            <div className="flex items-center mb-6 md:mb-8">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mr-3 md:mr-4">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h2 className={`text-2xl sm:text-3xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>Call Campaign</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
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
              <CounterButton
                label="Emails Sent"
                value={emailsSent}
                onIncrement={() => setEmailsSent(prev => prev + 1)}
                onDecrement={() => setEmailsSent(prev => Math.max(0, prev - 1))}
              />
            </div>
          </div>

          {/* Section 3: Summary Generator */}
          <div className={`rounded-2xl md:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 border transition-colors duration-300 ${
            darkMode 
              ? 'bg-black border-gray-800 shadow-2xl sm:shadow-purple-900/20' 
              : 'bg-white border-gray-100'
          }`}>
            <div className="flex items-center mb-6 md:mb-8">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mr-3 md:mr-4">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className={`text-2xl sm:text-3xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>Summary Generator</h2>
            </div>
            
            {/* Report Options */}
            <div className="mb-6 md:mb-8">
              <h3 className={`text-lg font-semibold mb-4 text-center ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>Choose sections to include in report:</h3>
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mb-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeAppointments}
                    onChange={(e) => setIncludeAppointments(e.target.checked)}
                    className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mr-3"
                  />
                  <span className={`font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Appointments Section</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeCallCampaign}
                    onChange={(e) => setIncludeCallCampaign(e.target.checked)}
                    className="w-5 h-5 text-green-600 border-2 border-gray-300 rounded focus:ring-green-500 focus:ring-2 mr-3"
                  />
                  <span className={`font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Call Campaign Section</span>
                </label>
              </div>
            </div>

            <div className="text-center mb-6 md:mb-8">
              <button
                onClick={handleGenerateSummary}
                disabled={!includeAppointments && !includeCallCampaign}
                className={`px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-2xl transition-all duration-200 font-semibold text-base md:text-lg shadow-lg hover:shadow-xl w-full sm:w-auto ${
                  !includeAppointments && !includeCallCampaign
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800'
                }`}
              >
                Generate Summary
              </button>
              {!includeAppointments && !includeCallCampaign && (
                <p className={`text-sm mt-2 ${
                  darkMode ? 'text-red-400' : 'text-red-500'
                }`}>Please select at least one section to include in the report</p>
              )}
            </div>
            
            {summary && (
              <div className={`rounded-2xl p-4 md:p-8 border transition-colors duration-300 ${
                darkMode 
                  ? 'bg-black border-gray-800' 
                  : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200'
              }`}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 md:mb-4 gap-3 sm:gap-0">
                  <h3 className={`text-lg sm:text-xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  }`}>Email Summary</h3>
                  <button
                    onClick={handleCopySummary}
                    className={`px-3 sm:px-4 py-2 rounded-xl transition-all duration-200 font-semibold text-sm sm:text-base ${
                      copySuccess 
                        ? (darkMode 
                          ? 'bg-green-900 text-green-400 border border-green-700' 
                          : 'bg-green-100 text-green-700 border border-green-200'
                        )
                        : (darkMode 
                          ? 'bg-black text-gray-200 border border-gray-700 hover:bg-gray-900' 
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                        )
                    }`}
                  >
                    {copySuccess ? (
                      <span className="flex items-center justify-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Copied!
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span className="hidden sm:inline">Copy Summary</span>
                        <span className="sm:hidden">Copy</span>
                      </span>
                    )}
                  </button>
                </div>
                <div className={`rounded-xl p-3 sm:p-4 md:p-6 border transition-colors duration-300 ${
                  darkMode 
                    ? 'bg-black border-gray-700' 
                    : 'bg-white border-gray-200'
                }`}>
                  <pre className={`whitespace-pre-wrap text-xs sm:text-sm leading-relaxed font-mono overflow-x-auto ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {summary}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Privacy Notice */}
          <div className="mt-8 md:mt-12 text-center">
            <div className={`rounded-2xl shadow-lg p-4 sm:p-6 border transition-colors duration-300 ${
              darkMode 
                ? 'bg-black border-gray-800 shadow-2xl sm:shadow-green-900/20' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center justify-center mb-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <h3 className={`text-base sm:text-lg font-bold ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}>Privacy Protected</h3>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed px-2 sm:px-0 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
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