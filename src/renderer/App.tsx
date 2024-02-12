import React, { FormEvent, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Header from '../components/Header';
import './App.css';

const { ipcRenderer } = window as any;

function Hello() {
  const [addModel, setAddModel] = useState('hidden');
  const [products, setProducts] = useState([]);
  React.useEffect(() => {
    (window as any).Products.products().then((result: any) => {
      setProducts(result);
    });
  }, []);
  const editRecord = () => {
    alert('Edit record');
  };
  const deleteRecord = (index: any) => {
    var y: any = products.find((v, i) => i === index);
    if (
      window.confirm(
        `You are about to delete record for ${y.name}. Are you sure?`,
      )
    ) {
      var x = products.filter((v, i) => i !== index);
      setProducts(x);
      ipcRenderer.send('add-new-record', x);
    }
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
    var form = {
      id: id,
      name: target.name.value,
      username: target.username.value,
      password: target.password.value,
      url: target.url.value,
    };
    var curr_products: any = products;
    curr_products.push(form);
    ipcRenderer.send('add-new-record', curr_products);
    setAddModel('hidden');
  };
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
              <input
                className="border border-slate-400 px-3 py-1 w-70 rounded text-sm w-full"
                name="name"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm">Username</label>
              <input
                className="border border-slate-400 px-3 py-1 w-70 rounded text-sm w-full"
                name="username"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm">Password</label>
              <input
                className="border border-slate-400 px-3 py-1 w-70 rounded text-sm w-full"
                name="password"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm">URL</label>
              <input
                className="border border-slate-400 px-3 py-1 w-70 rounded text-sm w-full"
                name="url"
              />
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
  const serch = (searchValue: any) => {
    const curr_products = products;
    let DisplayData: any = curr_products;
    var s = searchValue.target.value;
    DisplayData = products
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
    setProducts(DisplayData);
  };
  const copyUsernameToClipboard = (index: any) => {
    var find: any = products.find((v, i) => i === index);
    if(find.username.length > 0){
      navigator.clipboard.writeText(find.username);
    }
  };
  const copyPasswordToClipboard = (index: any) => {
    var find: any = products.find((v, i) => i === index);
    if(find.password.length > 0){
      navigator.clipboard.writeText(find.password);
    }
  };
  const copyUrlToClipboard = (index: any) => {
    var find: any = products.find((v, i) => i === index);
    if(find.url.length > 0){
      navigator.clipboard.writeText(find.url);
    }
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
              onChange={serch}
            />
          </div>
          <div className="ml-2">
            <button
              className="bg-gray-500 text-white px-3 py-1.5 rounded text-sm"
              title="Create new record"
              onClick={() => setAddModel('show')}
            >
              New Record
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
              {products.map((product: any, index) => (
                <tr key={index}>
                  <td className='appname_text'>{product.name}</td>
                  <td>
                    <span className='l_text'>{product.username}</span>{' '}
                    <button
                      className="copy-button"
                      title="Copy username to clipboard"
                      onClick={() => copyUsernameToClipboard(index)}
                    >
                      Copy
                    </button>
                  </td>
                  <td>
                    <span className='l_text'>{product.password}</span>{' '}
                    <button
                      className="copy-button"
                      title="Copy password to clipboard"
                      onClick={() => copyPasswordToClipboard(index)}
                    >
                      Copy
                    </button>
                  </td>
                  <td>
                    <span className='l_text'>{product.url}</span>{' '}
                    <button
                      className="copy-button"
                      title="Copy URL to clipboard"
                      onClick={() => copyUrlToClipboard(index)}
                    >
                      Copy
                    </button>
                  </td>
                  <td>
                    <button
                      className="mr-3"
                      title="Edit this record"
                      onClick={editRecord}
                    >
                      Edit
                    </button>
                    {'|'}
                    <button
                      className="ml-3"
                      title="Delete this record"
                      onClick={() => deleteRecord(index)}
                    >
                      Delete
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
