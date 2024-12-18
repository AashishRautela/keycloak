'use client';

import { useState, useEffect } from 'react';
import { createRealm, getRealmDetails, getAllRealms } from '../../comman/keycloak/apiFunctions';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function Products() {
  const [realmName, setRealmName] = useState('');
  const [inputRealm, setInputRealm] = useState('');
  const [organizationDetails, setOrganizationDetails] = useState({
    organizationName: '',
    numberOfEmployees: '',
    organizationType: '',
    industry: '',
    registrationDate: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    city: '',
    country: '',
    website: '',
    createdBy: '',
    description: '',
  });

  const [realms, setRealms] = useState([]);
  console.log('realms', realms);

  useEffect(() => {
    const fetchRealms = async () => {
      try {
        const res = await getAllRealms();
        setRealms(res);
      } catch (error) {
        console.error('Error fetching realms:', error);
      }
    };

    fetchRealms();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrganizationDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!realmName) {
      alert('Realm name is required.');
      return;
    }

    await createRealm(realmName, organizationDetails);
  };

  const handleLogOut = () => {
    
  };

  const RealmCard = ({ data }) => {
    return (
      <div className="border rounded-lg p-4 shadow-md max-w-md mx-auto my-4 w-1/4">
        <h2 className="text-2xl font-bold mb-4">{data?.realm || '--'}</h2>
        <div className="space-y-2">
          <p><strong>Organization Name:</strong> {data?.attributes?.organizationName || '--'}</p>
          <p><strong>Industry:</strong> {data?.attributes?.industry || '--'}</p>
          <p><strong>Organization Type:</strong> {data?.attributes?.organizationType || '--'}</p>
          <p><strong>Number of Employees:</strong> {data?.attributes?.numberOfEmployees || '--'}</p>
          <p><strong>Contact Email:</strong> {data?.attributes?.contactEmail || '--'}</p>
          <p><strong>Contact Phone:</strong> {data?.attributes?.contactPhone || '--'}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto mt-10 p-5">

      <div className="flex justify-between items-center mb-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-600">Create Realm</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a New Realm</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Realm Name</label>
                <input
                  type="text"
                  value={realmName}
                  onChange={(e) => setRealmName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter realm name"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold mb-2">Organization Name</label>
                <input
                  type="text"
                  name="organizationName"
                  value={organizationDetails.organizationName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter organization name"
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold mb-2">Number of Employees</label>
                <input
                  type="number"
                  name="numberOfEmployees"
                  value={organizationDetails.numberOfEmployees}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter number of employees"
                />
              </div>

              <DialogFooter>
                <Button type="submit">Create Realm</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <button
          onClick={handleLogOut}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <input
          placeholder="Enter Realm Name"
          value={inputRealm}
          onChange={(e) => setInputRealm(e.target.value)}
          className="p-2 border border-gray-300 rounded w-1/3"
        />
        <Button onClick={() => getRealmDetails(inputRealm,setRealms)}>Get Realm</Button>
      </div>

      <div className="flex flex-wrap gap-4">
        {realms.map((realm, index) => (
          <RealmCard key={realm?.id || index} data={realm} />
        ))}
      </div>
    </div>
  );
}
