import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { FormEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from '../components/Header';

function Hello() {
  const [addModel, setAddModel] = useState('hidden');
  const editRecord = () => {
    alert('Edit record');
  };
  const deleteRecord = () => {
    alert('Delete record');
  };
  const Backdrop = () => {
    return <div className="backdrop fixed w-full h-full z-50"></div>;
  };
  const handleAddRecordSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      name: { value: string };
      username: { value: string };
      password: { value: string };
      url: { value: string };
    };
    const id = uuidv4();
  }
  const AddModelComponent = () => {
    return (
      <div className={`add-model-state ${addModel}`}>
        <Backdrop />
        <div className="add-model bg-white border-2 z-[51] fixed">
          <form className="p-3" onSubmit={handleAddRecordSubmit}>
            <div className="mb-3">
              <h4 className="font-bold border-solid border-b-2 pb-2">
                Add Record
              </h4>
            </div>
            <div className="mb-3">
              <label className="block text-sm">Name</label>
              <input className="border border-slate-400 px-3 py-1 w-70 rounded text-sm w-full" name='name' />
            </div>
            <div className="mb-3">
              <label className="block text-sm">Username</label>
              <input className="border border-slate-400 px-3 py-1 w-70 rounded text-sm w-full" name='username' />
            </div>
            <div className="mb-3">
              <label className="block text-sm">Password</label>
              <input className="border border-slate-400 px-3 py-1 w-70 rounded text-sm w-full" name='password' />
            </div>
            <div className="mb-4">
              <label className="block text-sm">URL</label>
              <input className="border border-slate-400 px-3 py-1 w-70 rounded text-sm w-full" name='url' />
            </div>
            <div className="text-right">
              <button
                className="px-5 py-1.5 rounded text-sm mr-2"
                type="button"
                onClick={() => setAddModel('hidden')}
              >
                Cancel
              </button>
              <button
                className="bg-gray-500 text-white px-5 py-1.5 rounded text-sm"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  return (
    <div>
      <AddModelComponent />
      <div className="p-3 pagelet">
        <Header />
        <div className="border-2 mb-5 bg-white p-3 grid grid-cols-5 gap-3 rounded">
          <div className="search-box">
            <input
              type="search"
              className="border-2 px-3 w-70 rounded text-sm"
              placeholder="Search..."
            />
          </div>
          <div className="ml-2">
            <button
              className="bg-gray-500 text-white px-3 py-1.5 rounded text-sm"
              title="Create new record"
              onClick={() => setAddModel('')}
            >
              New Record
            </button>
          </div>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Username
                </th>
                <th scope="col" className="px-6 py-3">
                  Password
                </th>
                <th scope="col" className="px-6 py-3">
                  URL
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:border-gray-700">
                <th className="px-6 py-4">Apple MacBook Pro 17</th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">$2999</td>
                <td className="px-6 py-4">
                  <button title="Edit this record" onClick={editRecord}>
                    Edit
                  </button>{' '}
                  |{' '}
                  <button title="Delete this record" onClick={deleteRecord}>
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
