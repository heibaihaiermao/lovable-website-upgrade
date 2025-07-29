import React from 'react';
import { Header } from '../components/Header.jsx';
import { NavigationTabs } from '../components/NavigationTabs.jsx';
import AddEventModal from '../components/AddEventModal.jsx';
import { getCurrentWorkspace, getWorkspaceData, setWorkspaceData } from '../utils/workspaceManager';

const generateCalendarDays = (year, month) => {
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();

  const calendar = [];

  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    calendar.push({
      day: daysInPrevMonth - i,
      currentMonth: false,
      month: prevMonth,
      year: prevYear,
    });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    calendar.push({
      day: i,
      currentMonth: true,
      month: month,
      year: year,
    });
  }

  while (calendar.length % 7 !== 0) {
    const nextDay = calendar.length - (firstDayOfMonth + daysInMonth) + 1;
    calendar.push({
      day: nextDay,
      currentMonth: false,
      month: (month + 1) % 12,
      year: month === 11 ? year + 1 : year,
    });
  }

  return calendar;
};

const Calendar = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [viewYear, setViewYear] = React.useState(currentYear);
  const [viewMonth, setViewMonth] = React.useState(currentMonth);

  const calendarDays = generateCalendarDays(viewYear, viewMonth);

  const formattedToday = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const [events, setEvents] = React.useState([]);

  // Load workspace-specific events
  React.useEffect(() => {
    const currentWorkspace = getCurrentWorkspace();
    if (currentWorkspace) {
      const workspaceEvents = getWorkspaceData(currentWorkspace.id, 'events') || [];
      setEvents(workspaceEvents);
    }
  }, []);

  // Save events when they change
  const updateEvents = (newEvents) => {
    setEvents(newEvents);
    const currentWorkspace = getCurrentWorkspace();
    if (currentWorkspace) {
      setWorkspaceData(currentWorkspace.id, 'events', newEvents);
    }
  };
  const [showEventModal, setShowEventModal] = React.useState(false);
  const [newEventTitle, setNewEventTitle] = React.useState('');
  const [selectedTags, setSelectedTags] = React.useState([]);

  const tagColorMap = {
    meeting: 'bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-white',
    content: 'bg-green-200 text-green-800 dark:bg-green-700 dark:text-white',
    design: 'bg-yellow-200 text-yellow-800 dark:bg-yellow-600 dark:text-white',
    dev: 'bg-purple-200 text-purple-800 dark:bg-purple-700 dark:text-white',
    social: 'bg-pink-200 text-pink-800 dark:bg-pink-700 dark:text-white',
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-[#121524] text-gray-800 dark:text-white transition-colors duration-300 relative">
      {/* Background layer */}
      <div className="absolute w-full h-full top-[150px] bg-gray-100 dark:bg-[#121524] z-0" />

      {/* Header and navigation */}
      <div className="relative z-20">
        <Header />
      </div>

      <div className="relative z-10">
        <NavigationTabs />
      </div>

      {/* Main content */}
      <div className="relative z-10 mt-10 px-6 flex flex-col md:flex-row gap-6 w-full">
        {/* Sidebar */}
        <div className="flex-grow md:flex-grow flex flex-col gap-4">
          {/* Month selector */}
          <div>
            <div className="flex items-center justify-center gap-20">
              <button
                onClick={() => {
                  if (viewMonth === 0) {
                    setViewMonth(11);
                    setViewYear(viewYear - 1);
                  } else {
                    setViewMonth(viewMonth - 1);
                  }
                }}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-xl transition-colors"
                aria-label="Previous Month"
              >
                {'<'}
              </button>

              <span className="text-2xl font-bold">
                {new Date(viewYear, viewMonth).toLocaleString('default', {
                  month: 'long',
                  year: 'numeric',
                })}
              </span>

              <button
                onClick={() => {
                  if (viewMonth === 11) {
                    setViewMonth(0);
                    setViewYear(viewYear + 1);
                  } else {
                    setViewMonth(viewMonth + 1);
                  }
                }}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-xl transition-colors"
                aria-label="Next Month"
              >
                {'>'}
              </button>
            </div>
            <div className="text-center text-gray-600 dark:text-gray-400 mt-1 text-sm md:text-base">
              Today: {formattedToday}
            </div>
          </div>

          {/* Sidebar box */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md flex-1 relative pb-16 flex flex-col min-h-[600px] transition-colors duration-300">
            {selectedDate ? (
              <div className="text-lg font-bold mb-4 text-gray-700 dark:text-gray-300 text-center">
                {selectedDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            ) : (
              <div className="text-sm text-gray-400 mb-4 text-center">
                No date selected
              </div>
            )}
            <h3 className="text-lg font-bold mb-2">Scheduled Posts</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="space-y-2">
                  {selectedDate ? (
                    events
                      .filter((event) => event.date === selectedDate.toISOString().split('T')[0])
                      .map((event, idx) => (
                        <div
                          key={idx}
                          className="border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 p-3"
                        >
                          <div className="text-sm font-medium text-gray-800 dark:text-white mb-1">
                            {event.title}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {event.tags?.map((tag, tagIdx) => (
                              <span
                                key={tagIdx}
                                className={`px-2 py-0.5 rounded text-xs ${
                                  tagColorMap[tag.toLowerCase()] ||
                                  'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-white'
                                }`}
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="text-sm text-gray-400">No date selected</div>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowEventModal(true)}
              className="absolute bottom-6 right-6 bg-violet-500 hover:bg-violet-600 text-white py-2 px-4 rounded text-sm transition-all"
            >
              Add Event
            </button>
          </div>
        </div>

        {/* Calendar grid container */}
        <div className="flex-grow bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden min-h-[600px] max-w-[1060px] w-full transition-colors duration-300">
          {/* Days of week header */}
          <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-600 dark:text-gray-400 border-b border-gray-300 dark:border-gray-700">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div
                key={day}
                className="py-2 border border-gray-300 dark:border-gray-700 last:border-r-0"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7">
            {calendarDays.map(({ day, currentMonth, month, year }, i) => {
              const isToday =
                today.getDate() === day &&
                today.getMonth() === month &&
                today.getFullYear() === year;

              const isSelected =
                selectedDate &&
                selectedDate.getDate() === day &&
                selectedDate.getMonth() === month &&
                selectedDate.getFullYear() === year;

              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const eventsForThisDay = events.filter((event) => event.date === dateStr);

              return (
                <div
                  key={i}
                  onClick={() => {
                    setSelectedDate(new Date(year, month, day));
                  }}
                  className={`cursor-pointer p-2 border border-gray-300 dark:border-gray-700 relative flex flex-col justify-start items-start
                    ${
                      isSelected
                        ? 'bg-blue-100 border-blue-400'
                        : isToday
                        ? 'bg-green-100 border-green-400'
                        : currentMonth
                        ? 'bg-white dark:bg-gray-800'
                        : 'bg-gray-100 dark:bg-gray-900'
                    }
                  `}
                  style={{ aspectRatio: '1 / 1', minHeight: '140px' }}
                >
                  <div
                    className={`font-bold ${
                      !currentMonth
                        ? 'text-gray-400 dark:text-gray-600'
                        : 'text-gray-900 dark:text-gray-200'
                    }`}
                  >
                    {day}
                  </div>
                  {eventsForThisDay.map((event, idx) => (
                    <span
                      key={idx}
                      className="mt-1 px-2 py-1 text-xs rounded bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300"
                    >
                      {event.title}
                    </span>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <AddEventModal
        isOpen={showEventModal}
        onClose={() => setShowEventModal(false)}
        onSave={(event) => {
          updateEvents([...events, event]);
          setShowEventModal(false);
        }}
        defaultDate={selectedDate}
      />
    </div>
  );
  
};

export default Calendar;
