import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Trash2, Plus } from 'lucide-react';

export default function GenericCrud({ endpoint, fields, title }) {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    api.get(`/${endpoint}`).then(res => setItems(res.data));
  }, [endpoint]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await api.post(`/${endpoint}`, formData);
    setItems([...items, res.data]);
    setFormData({});
  };

  const handleDelete = async (id) => {
    await api.delete(`/${endpoint}/${id}`);
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">{title}</h1>
      
      <form onSubmit={handleAdd} className="bg-white dark:bg-slate-800 p-6 rounded-2xl mb-8 grid md:grid-cols-2 gap-4">
        {fields.map(field => (
          <input 
            key={field.name}
            type="text"
            name={field.name}
            placeholder={field.label}
            value={formData[field.name] || ''}
            onChange={handleChange}
            className="input-field"
            required
          />
        ))}
        <button type="submit" className="btn-primary flex items-center justify-center w-full md:w-auto">
          <Plus size={18} className="mr-2" /> Add
        </button>
      </form>

      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">{item[fields[0].name]}</h3>
              <p className="text-sm text-gray-500">{fields.slice(1).map(f => item[f.name]).join(' | ')}</p>
            </div>
            <button onClick={() => handleDelete(item.id)} className="text-gray-500 hover:text-red-500">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}