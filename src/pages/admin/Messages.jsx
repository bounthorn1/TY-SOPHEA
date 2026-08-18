import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Trash2, MailOpen, Mail } from 'lucide-react';

export default function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => { api.get('/messages').then(res => setMessages(res.data)); }, []);

  const handleDelete = async (id) => {
    await api.delete(`/messages/${id}`);
    setMessages(messages.filter(m => m.id !== id));
  };

  const toggleRead = async (msg) => {
    const updated = await api.patch(`/messages/${msg.id}`, { read: !msg.read });
    setMessages(messages.map(m => m.id === msg.id ? updated.data : m));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Messages</h1>
      <div className="space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm flex justify-between items-center ${!msg.read ? 'border-l-4 border-primary-500' : ''}`}>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                {msg.read ? <Mail size={18} className="text-gray-400" /> : <MailOpen size={18} className="text-primary-500" />}
                <h3 className="font-semibold text-gray-800 dark:text-white">{msg.subject}</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{msg.name} ({msg.email})</p>
              <p className="mt-2 text-gray-700 dark:text-gray-300">{msg.message}</p>
            </div>
            <div className="flex flex-col space-y-2">
              <button onClick={() => toggleRead(msg)} className="text-gray-500 hover:text-primary-500"><MailOpen size={18} /></button>
              <button onClick={() => handleDelete(msg.id)} className="text-gray-500 hover:text-red-500"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
        {messages.length === 0 && <p className="text-gray-500">No messages yet.</p>}
      </div>
    </div>
  );
}