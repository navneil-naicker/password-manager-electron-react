import React, { FormEvent, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Header from '../components/Header';
import {
  FaCirclePlus,
  FaCopy,
  FaGear,
  FaPencil,
  FaPlus,
  FaTrash,
} from 'react-icons/fa6';
import './App.css';

const { ipcRenderer } = window as any;

function Hello() {
  const [modelState, setModelState] = useState('hidden');
  const [itemsList, setItemsList] = useState([]);
  const [FilteredItems, setFilteredItems] = useState([]);
  React.useEffect(() => {
    (window as any).Products.products().then((result: any) => {
      setItemsList(result);
      setFilteredItems(result);
    });
  }, []);
  const editRecord = () => {
    alert('Edit record');
  };
  const deleteRecord = (index: any) => {
    var find: any = itemsList.find((v, i) => i === index);
    if (
      window.confirm(
        `You are about to delete record for ${find.name}. Are you sure?`,
      )
    ) {
      var x = itemsList.filter((v, i) => i !== index);
      setItemsList(x);
      setFilteredItems(x);
      ipcRenderer.send('add-new-record', x);
    }
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
    var form = {
      id: id,
      name: target.name.value,
      username: target.username.value,
      password: target.password.value,
      url: target.url.value,
    };
    var items: any = itemsList;
    items.push(form);
    items.sort((a: any, b: any) => a.name.localeCompare(b.name));
    ipcRenderer.send('add-new-record', items);
    setModelState('hidden');
  };
  const search = (searchValue: any) => {
    let items: any = [...itemsList];
    var s = searchValue.target.value;
    items = items
      ?.filter(
        (row: any) =>
          row?.name?.match(new RegExp(s, 'i')) ||
          row?.username?.match(new RegExp(s, 'i')) ||
          row?.password?.match(new RegExp(s, 'i')) ||
          row?.url?.match(new RegExp(s, 'i')),
      )
      ?.map((items: any) => {
        return items;
      });
    setFilteredItems(items);
  };
  const copyUsernameToClipboard = (index: any) => {
    var find: any = itemsList.find((v, i) => i === index);
    if (find.username.length > 0) {
      navigator.clipboard.writeText(find.username);
    }
  };
  const copyPasswordToClipboard = (index: any) => {
    var find: any = itemsList.find((v, i) => i === index);
    if (find.password.length > 0) {
      navigator.clipboard.writeText(find.password);
    }
  };
  const copyUrlToClipboard = (index: any) => {
    var find: any = itemsList.find((v, i) => i === index);
    if (find.url.length > 0) {
      navigator.clipboard.writeText(find.url);
    }
  };
  const addNewRecord = () => {
    setModelState('show');
  };
  return (
    <div>
      <div id="addEditRecordModel" className={modelState}>
        <form className="modal-content" onSubmit={handleAddRecordSubmit}>
          <div className="mb-3">
            <h4 className="font-bold border-solid border-b-2 pb-2">
              Add Record
            </h4>
          </div>
          <div className="mb-3">
            <label className="block text-sm">Name</label>
            <input
              className="border border-slate-400 px-3 py-1 w-70 rounded text-sm w-full"
              name="name"
              required
              maxLength={255}
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm">Username</label>
            <input
              className="border border-slate-400 px-3 py-1 w-70 rounded text-sm w-full"
              name="username"
              required
              maxLength={255}
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm">Password</label>
            <input
              className="border border-slate-400 px-3 py-1 w-70 rounded text-sm w-full"
              name="password"
              required
              maxLength={255}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm">URL</label>
            <input
              className="border border-slate-400 px-3 py-1 w-70 rounded text-sm w-full"
              name="url"
              required
              maxLength={255}
            />
          </div>
          <div className="text-right">
            <button
              className="px-5 py-1.5 rounded text-sm mr-2"
              type="button"
              onClick={() => setModelState('hidden')}
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
      <div className="p-3 pagelet">
        <Header />
        <div className="border-2 mb-5 bg-white p-3 grid grid-cols-2 gap-3 rounded">
          <div className="search-box">
            <input
              type="search"
              className="border-2 px-3 w-70 rounded text-sm"
              placeholder="Search..."
              maxLength={28}
              onChange={search}
            />
          </div>
          <div className="text-right">
            <button
              className="mr-2 bg-gray-500 text-white px-3 py-1.5 rounded text-sm"
              title="Create new record"
              onClick={() => addNewRecord()}
            >
              <span className="inline-block mr-2 align-middle">
                <FaCirclePlus />
              </span>
              <span className="inline-block">New Record</span>
            </button>
            <button
              className="bg-sky-600 text-white px-3 py-1.5 rounded text-sm"
              title="Settings"
              onClick={() => setModelState('show')}
            >
              <span className="inline-block mr-2 align-middle">
                <FaGear />
              </span>
              <span className="inline-block">Settings</span>
            </button>
          </div>
        </div>
        <div className="relative overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">Password</th>
                <th scope="col">URL</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {FilteredItems.length === 0 && (
                <tr>
                  <td colSpan={5}>Nope! Nothing here.</td>
                </tr>
              )}
              {FilteredItems.map((product: any, index) => (
                <tr key={index}>
                  <td className="appname_text">{product.name}</td>
                  <td>
                    <span className="l_text">{product.username}</span>{' '}
                    <button
                      className="copy-button"
                      title="Copy username to clipboard"
                      onClick={() => copyUsernameToClipboard(index)}
                    >
                      <span>
                        <FaCopy />
                      </span>
                    </button>
                  </td>
                  <td>
                    <span className="l_text">
                      {'password123456789'.replace(/./g, '*')}
                    </span>{' '}
                    <button
                      className="copy-button"
                      title="Copy password to clipboard"
                      onClick={() => copyPasswordToClipboard(index)}
                    >
                      <span>
                        <FaCopy />
                      </span>
                    </button>
                  </td>
                  <td>
                    <span className="l_text">{product.url}</span>{' '}
                    <button
                      className="copy-button"
                      title="Copy URL to clipboard"
                      onClick={() => copyUrlToClipboard(index)}
                    >
                      <span>
                        <FaCopy />
                      </span>
                    </button>
                  </td>
                  <td>
                    <button
                      className="mr-3 hover:text-sky-500 align-baseline"
                      title="Edit this record"
                      onClick={editRecord}
                    >
                      <FaPencil />
                    </button>
                    <span className="align-text-bottom">|</span>
                    <button
                      className="ml-3 hover:text-sky-500 align-baseline"
                      title="Delete this record"
                      onClick={() => deleteRecord(index)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
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
