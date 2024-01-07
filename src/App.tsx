// App.tsx

import React, { useState, useEffect } from 'react';

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const payoutDays = [8, 28, 90, 369, 888];

const themeColors: any = {
  gruvbox: {
    bg: "bg-gruvbox-bg",
    text: "text-gruvbox-fg",
    border: "border-gruvbox-gray",
    todayBg: "bg-gruvbox-blue",
    todayText: "text-gruvbbox-white",
    hoverBg: "hover:bg-gruvbox-blue2",
    hoverText: "hover:text-white",
    headerText: "text-gruvbox-fg0",
    buttonBg: "bg-gruvbox-orange",
    buttonText: "text-gruvbox-bg0",
  },
  gruvboxDark: {
    bg: "bg-gruvboxDark-bg0",
    text: "text-gruvboxDark-fg0",
    border: "border-gruvboxDark-gray2",
    todayBg: "bg-gruvboxDark-blue",
    todayText: "bg-gruvboxDark-purple",
    hoverBg: "hover:bg-gruvboxDark-blue",
    hoverText: "hover:text-white",
    headerText: "text-gruvboxDark-fg",
    buttonBg: "bg-gruvboxDark-orange2",
    buttonText: "text-gruvboxDark-bg",
  }
};

const App: React.FC = () => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [blankDays, setBlankDays] = useState<number[]>([]);
  const [monthDays, setMonthDays] = useState<number[]>([]);
  const [theme, setTheme] = useState('gruvbox');
  const colors = themeColors[theme];

  useEffect(() => {
    getDaysForMonth(year, month);
  }, [year, month]);

  
  const calculateDayIncrement = (currentYear: number, currentMonth: number, currentDay: number): number | null => {
    const startDate = new Date(2023, 9, 28); // Month is 0-indexed, so 9 is October
    const currentDate = new Date(currentYear, currentMonth, currentDay);
    const timeDiff = currentDate.getTime() - startDate.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    return dayDiff >= 0 ? dayDiff + 1 : null; // Only increment from October 27, 2023 onwards, and start from 1
  };

  const getDaysForMonth = (year: number, month: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dayOfWeek = new Date(year, month, 1).getDay();
    const blankdaysArray = Array.from({ length: dayOfWeek }, (_, i) => i);
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    setBlankDays(blankdaysArray);
    setMonthDays(daysArray);
  };

  const isToday = (date: number) => {
    const today = new Date();
    const d = new Date(year, month, date);
    return today.toDateString() === d.toDateString();
  };

  const goToNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const goToPreviousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const goToToday = () => {
    const today = new Date();
    setMonth(today.getMonth());
    setYear(today.getFullYear());
  };

  const goToTitanXLaunch = () => {
    setMonth(9); // October (zero-indexed)
    setYear(2023);
  };

  const toggleTheme = () => {
    setTheme(theme === 'gruvbox' ? 'gruvboxDark' : 'gruvbox');
  };

  // Divide the incremental day by the payout day, if there is no remainder, it's a payout day and should return each of the payouts that is today
  const currentDaysPayouts = (incrementalDay: number): number[] => {
    if (incrementalDay < payoutDays[0]) { // Ensure we only start payouts after the first payout day
      return [];
    }
    return payoutDays.filter((payoutDay) => incrementalDay === payoutDay || (incrementalDay > payoutDay && incrementalDay % payoutDay === 0));
  };

  const isTitanXLaunchDay = (currentYear: number, currentMonth: number, currentDay: number) => {
    return currentYear === 2023 && currentMonth === 9 && currentDay === 27; // October 27, 2023
  };

  const today = new Date();
  const todayIncrement = calculateDayIncrement(today.getFullYear(), today.getMonth(), today.getDate()) || 0;
  const todayPayouts = currentDaysPayouts(todayIncrement);


  return (
    <div className={`antialiased sans-serif min-h-screen ${colors.bg} ${colors.text} flex`}>
      {/* Panel for current calendar day, TitanX day, and payouts */}
      <div className={`p-4 w-1/6 ${colors.bg} ${colors.text} flex flex-col space-y-2`}>
        <div className={`rounded-lg shadow p-4 ${colors.border}`}>
          <h2 className={`text-lg ${colors.headerText}`}>Today's Information</h2>
          <p className={`text-md ${colors.text}`}>Calendar Day: {MONTH_NAMES[today.getMonth()]} {today.getDate()}, {today.getFullYear()}</p>
          <p className={`text-md ${colors.text}`}>TitanX Day: {todayIncrement}</p>
          {todayPayouts.length > 0 && (
            <div>
              <h3 className={`text-md ${colors.headerText}`}>Payouts:</h3>
              {todayPayouts.map((payout, index) => (
                <p className={`text-md ${colors.text}`} key={index}>Day {payout}</p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Calendar */}
      <div className="container mx-auto w-5/6">
        {/* Calendar Header */}
        <div className={`shadow overflow-hidden`}>
          <div className="flex items-center justify-between py-2 px-6">
            <div>
              <span className={`text-lg font-bold ${colors.headerText}`}>{MONTH_NAMES[month]}</span>
              <span className={`ml-1 text-lg ${colors.text} font-normal`}>{year}</span>
            </div>
            <div className="" style={{ paddingTop: '2px' }}>
              <button type="button" onClick={goToPreviousMonth} className={`px-2 py-1 ${colors.buttonBg} ${colors.buttonText}`}>
                Back
              </button>
              <button type="button" onClick={goToToday} className={`px-2 py-1 ${colors.buttonBg} ${colors.buttonText}`}>
                Today
              </button>
              <button type="button" onClick={goToTitanXLaunch} className={`px-2 py-1 ${colors.buttonBg} ${colors.buttonText}`}>
                TitanX Launch
              </button>
              <button type="button" onClick={goToNextMonth} className={`px-2 py-1 ${colors.buttonBg} ${colors.buttonText}`}>
                Next
              </button>
            </div>
            <button type="button" onClick={toggleTheme} className={`px-2 py-1 ${colors.buttonBg} ${colors.buttonText}`}>
              Toggle Theme
            </button>
          </div>

          {/* Days Header */}
          <div className="flex flex-wrap">
            {DAYS.map((day, index) => (
              <div key={index} style={{ width: '14.26%' }} className={`px-2 py-2 ${colors.border}`}>
                <div className={`text-sm uppercase tracking-wide font-bold text-center ${colors.headerText}`}>{day}</div>
              </div>
            ))}
          </div>


          {/* Days Grid */}
          <div className="flex flex-wrap">
            {blankDays.map((_, i) => (
              <div key={i} style={{ width: '14.28%', height: '120px' }} className={`text-center border-r border-b ${colors.border}`}></div>
            ))}
            {monthDays.map((day, i) => {
              const dayIncrement = calculateDayIncrement(year, month, day);
              const payoutLabels = currentDaysPayouts(dayIncrement || 0).map((payoutDay) => `Day ${payoutDay} Payout`);
              const isTodayFlag = isToday(day);
              const isLaunchDay = isTitanXLaunchDay(year, month, day);
              return (
                <div key={i} style={{ width: '14.28%', height: '120px' }} className={`border-r border-b relative ${colors.border} ${isTodayFlag || isLaunchDay ? colors.todayTileBg : ''} `}>
                  <div className={`flex h-full flex-col justify-between p-1 leading-none ${(isTodayFlag || isLaunchDay ? colors.todayBg : colors.text)} `}>
                    {/* Calendar day in the top left */}
                    <span className={`text-sm font-bold absolute top-1 left-1 ${isTodayFlag || isLaunchDay? colors.todayBg : colors.text}`}>
                      {day}
                    </span>
                    {/* Incremental day in the top right */}
                    <span className={`text-xs absolute top-1 right-1`}>
                      {dayIncrement}
                    </span>
                    {isTodayFlag && (
                        <span className="text-xs absolute bottom-1 right-1 today px-1 rounded">
                          Today
                        </span>
                    )}
                    {/* Payout day labels */}
                    <div className={`flex flex-col items-start absolute bottom-1 left-1 ${isTodayFlag || isLaunchDay ? 'text' : colors.text}`}>
                      {payoutLabels.map((payoutDay, index) => (
                        <span key={index} className="text-xs w-full">
                          {`${payoutDay}`}
                        </span>
                      ))}
                      
                    </div>
                    {isLaunchDay && (
                        <span className="text-xs absolute bottom-1 right-1 today px-1 rounded">
                          TitanX Launch
                        </span>
                      )}

                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Event modal would go here */}
      </div>
    </div>
  );
};

export default App;