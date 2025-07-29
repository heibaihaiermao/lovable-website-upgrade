import React from 'react';

const AddEventModal = ({ isOpen, onClose, onSave, defaultDate }) => {
  const [title, setTitle] = React.useState('');
  const [date, setDate] = React.useState('');
  const [tags, setTags] = React.useState('');

  React.useEffect(() => {
    if (defaultDate) {
      const yyyy = defaultDate.getFullYear();
      const mm = String(defaultDate.getMonth() + 1).padStart(2, '0');
      const dd = String(defaultDate.getDate()).padStart(2, '0');
      setDate(`${yyyy}-${mm}-${dd}`);
    }
  }, [defaultDate]);

  const handleSave = () => {
    if (!title || !date) return;
    const event = {
      title,
      date,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    };
    onSave(event);
    setTitle('');
    setTags('');
    setDate('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Add New Event</h2>

        <input
          type="text"
          placeholder="Event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 mb-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-2 mb-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
        />

        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-violet-500 text-white hover:bg-violet-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEventModal;