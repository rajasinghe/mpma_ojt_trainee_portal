import { useState } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  Users,
} from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: "training" | "payment" | "holiday" | "meeting";
  time?: string;
  description?: string;
}

export default function TraineeCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Mock events
  const events: CalendarEvent[] = [
    {
      id: "1",
      title: "React Training Session",
      date: "2024-01-15",
      type: "training",
      time: "09:00 AM",
      description: "Advanced React concepts and hooks",
    },
    {
      id: "2",
      title: "Payment Due",
      date: "2024-01-31",
      type: "payment",
      description: "Monthly training fee payment",
    },
    {
      id: "3",
      title: "Team Meeting",
      date: "2024-01-20",
      type: "meeting",
      time: "02:00 PM",
      description: "Weekly team sync and progress review",
    },
    {
      id: "4",
      title: "Public Holiday",
      date: "2024-01-26",
      type: "holiday",
      description: "Independence Day - No training",
    },
  ];

  const getMonthDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0];
    return events.filter((event) => event.date === dateString);
  };

  const getEventTypeColor = (type: string) => {
    const colors = {
      training:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      payment: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
      holiday:
        "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      meeting:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
    };
    return (
      colors[type as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    );
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "training":
        return <Users className="h-4 w-4" />;
      case "payment":
        return <DollarSign className="h-4 w-4" />;
      case "meeting":
        return <Clock className="h-4 w-4" />;
      case "holiday":
        return <Calendar className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const monthDays = getMonthDays(currentDate);
  const monthName = currentDate.toLocaleDateString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Training Calendar
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateMonth("prev")}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white min-w-[200px] text-center">
              {monthName}
            </h2>
            <button
              onClick={() => navigateMonth("next")}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
          {/* Day headers */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="bg-gray-50 dark:bg-gray-800 p-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400"
            >
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {monthDays.map((day, index) => (
            <div
              key={index}
              className={`bg-white dark:bg-gray-800 p-2 min-h-[100px] ${
                day
                  ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                  : ""
              }`}
              onClick={() => day && setSelectedDate(day)}
            >
              {day && (
                <>
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    {day.getDate()}
                  </div>
                  <div className="space-y-1">
                    {getEventsForDate(day)
                      .slice(0, 2)
                      .map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs px-2 py-1 rounded-md truncate ${getEventTypeColor(
                            event.type
                          )}`}
                        >
                          {event.title}
                        </div>
                      ))}
                    {getEventsForDate(day).length > 2 && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 px-2">
                        +{getEventsForDate(day).length - 2} more
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Legend 
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Event Types
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Training
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Payment
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-purple-500 rounded"></div>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Meeting
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Holiday
            </span>
          </div>
        </div>
      </div>
      */}

      {/* Upcoming Events */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Upcoming Events
        </h3>
        <div className="space-y-4">
          {events
            .filter((event) => new Date(event.date) >= new Date())
            .sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            )
            .slice(0, 5)
            .map((event) => (
              <div
                key={event.id}
                className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div
                  className={`p-2 rounded-lg ${getEventTypeColor(event.type)}`}
                >
                  {getEventIcon(event.type)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {event.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(event.date).toLocaleDateString()}
                    {event.time && ` at ${event.time}`}
                  </p>
                  {event.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {event.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Selected Date Modal */}
      {selectedDate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {selectedDate.toLocaleDateString("default", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h3>
            <div className="space-y-3 mb-6">
              {getEventsForDate(selectedDate).length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">
                  No events scheduled for this date.
                </p>
              ) : (
                getEventsForDate(selectedDate).map((event) => (
                  <div key={event.id} className="flex items-start space-x-3">
                    <div
                      className={`p-2 rounded-lg ${getEventTypeColor(
                        event.type
                      )}`}
                    >
                      {getEventIcon(event.type)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {event.title}
                      </h4>
                      {event.time && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {event.time}
                        </p>
                      )}
                      {event.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
            <button
              onClick={() => setSelectedDate(null)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
