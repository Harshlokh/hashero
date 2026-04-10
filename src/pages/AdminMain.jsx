import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const AdminMain = () => {
  const [dogs, setDogs] = useState([]);

  const [reports, setReports] = useState([]);

  const navigate = useNavigate();



  const fetchDogs = async () => {
    const { data, error } = await supabase
      .from("dogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setDogs(data);
  };

const [page, setPage] = useState(0);
const limit = 4;

const fetchReports = async () => {
  const from = page * limit;
  const to = from + limit - 1;

  const { data } = await supabase
    .from("dog_reports")
    .select("*")
    .order("created_at", { ascending: false })
    .range(from, to);

  setReports(data);
};

  const deleteDog = async (id) => {
    const confirmDelete = confirm("Delete this dog?");
    if (!confirmDelete) return;

    await supabase.from("dogs").delete().eq("id", id);
    fetchDogs(); // refresh
  };


   // dogs (no pagination → keep once)
useEffect(() => {
  fetchDogs();
}, []);

// reports (pagination → depends on page)
useEffect(() => {
  fetchReports();
}, [page]);

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-start gap-5 sm:items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
  
  <button
  onClick={() => navigate("/admin/heros")}
  className="bg-purple-600 max-w-[200px] text-sm text-white px-4 py-2 rounded"
>
  Manage Heros
</button>

    <Link to="/"> <button className="bg-black text-white rounded-md text-sm px-4 py-2">
        Go home
     </button></Link>
   
        <button
          onClick={() => navigate("/adminadddog")}
          className=" max-w-[100px] bg-black text-white rounded-md text-sm px-4 py-2"
        >
          + Add 
        </button>
      </div>

      {/* TABLE */}
     <div>
  {/* DESKTOP TABLE */}
  <div className="hidden md:block  overflow-auto">
    <table className="w-full border rounded-xl overflow-hidden">
      <thead className="bg-gray-100 text-left">
        <tr>
          <th className="p-3">Name</th>
          <th className="p-3">Location</th>
          <th className="p-3">Status</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>

      <tbody>
        {dogs.map((dog) => (
          <tr key={dog.id} className="border-t hover:bg-gray-50 transition">
            <td
              onClick={() => navigate(`/admin/editdog/${dog.id}`)}
              className="p-3 cursor-pointer font-medium"
            >
              {dog.name}
            </td>

            <td className="p-3 text-gray-600">{dog.location}</td>

            <td className="p-3">
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                {dog.status}
              </span>
            </td>

            <td className="p-3 flex gap-2">
              <button
                onClick={() => navigate(`/admin/editdog/${dog.id}`)}
                className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => deleteDog(dog.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* MOBILE CARDS */}
  <div className="md:hidden space-y-4">
    {dogs.map((dog) => (
      <div
        key={dog.id}
        className="bg-white rounded-2xl shadow-sm p-4 border"
      >
        {/* TOP */}
        <div className="flex justify-between items-start">
          <div>
            <h2
              onClick={() => navigate(`/admin/editdog/${dog.id}`)}
              className="font-semibold text-lg cursor-pointer"
            >
              {dog.name}
            </h2>

            <p className="text-sm text-gray-500">
              {dog.location}
            </p>
          </div>

          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
            {dog.status}
          </span>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => navigate(`/admin/editdog/${dog.id}`)}
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-sm"
          >
            Edit
          </button>

          <button
            onClick={() => deleteDog(dog.id)}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

     {/* Reports from Users */}
    
    <div>
        <div className="mt-10">
  <h2 className="text-xl font-semibold mb-4">
    Dog Reports (User Requests)
  </h2>

<div className="mt-10">
  {/* HEADER */}
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-semibold">
      Dog Reports
    </h2>

    <span className="text-sm text-gray-500">
      {reports.length} requests
    </span>
  </div>

  {/* SCROLL CONTAINER */}
  <div className="max-h-[500px] max-w-[400px] overflow-y-auto pr-2 space-y-4">
    {reports.map((report) => (
      <div
        key={report.id}
        className="bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition"
      >
        {/* TOP */}
        <div className="flex justify-between items-start gap-3">
          <div>
            <h3 className="font-semibold text-lg">
              {report.name}
            </h3>

            <p className="text-xs text-gray-500">
              {report.phone}
            </p>

            <p className="text-sm text-gray-600">
              📍 {report.location}
            </p>
          </div>

          <span
            className={`
              text-xs px-2 py-1 rounded-full
              ${
                report.status === "approved"
                  ? "bg-green-100 text-green-600"
                  : report.status === "rejected"
                  ? "bg-gray-200 text-gray-600"
                  : "bg-yellow-100 text-yellow-700"
              }
            `}
          >
            {report.status}
          </span>
        </div>

        {/* DESCRIPTION */}
        <p className="text-sm mt-3 text-gray-700 line-clamp-3">
          {report.description}
        </p>

        {/* IMAGE */}
        {report.image && (
          <img
            src={report.image}
            className="mt-3 w-full max-h-40 object-contain rounded-lg"
          />
        )}

        {/* ACTIONS */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={async () => {
              await supabase.from("dogs").insert([
                {
                  name: "Rescue Dog",
                  location: report.location,
                  description: report.description,
                  image: report.image,
                  status: "Rescue",
                },
              ]);

              await supabase
                .from("dog_reports")
                .update({ status: "approved" })
                .eq("id", report.id);

              fetchReports();
              fetchDogs();
            }}
            className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm"
          >
            Approve
          </button>

          <button
            onClick={async () => {
              await supabase
                .from("dog_reports")
                .update({ status: "rejected" })
                .eq("id", report.id);

              fetchReports();
            }}
            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg text-sm"
          >
            Reject
          </button>

          <button
            onClick={async () => {
              await supabase
                .from("dog_reports")
                .delete()
                .eq("id", report.id);

              fetchReports();
            }}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
<div className="flex justify-center gap-4 mt-4">
  <button
    onClick={() => setPage((p) => Math.max(p - 1, 0))}
    className="px-3 py-1 bg-gray-200 rounded"
  >
    Prev
  </button>

  <button
    onClick={() => setPage((p) => p + 1)}
    className="px-3 py-1 bg-gray-200 rounded"
  >
    Next
  </button>
</div>
</div>
    </div>

    </div>
  );
};

export default AdminMain;