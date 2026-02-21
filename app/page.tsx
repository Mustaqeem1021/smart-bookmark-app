"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("General");
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_, session) => setUser(session?.user ?? null)
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) fetchBookmarks();
  }, [user]);

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    setBookmarks(data || []);
  };

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const addBookmark = async () => {
    if (!title || !url) return;

    await supabase.from("bookmarks").insert([
      { title, url, category, user_id: user.id },
    ]);

    setTitle("");
    setUrl("");
    setCategory("General");
    fetchBookmarks();
  };

  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
    fetchBookmarks();
  };

  const filteredBookmarks = bookmarks
    .filter((bm) =>
      bm.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((bm) =>
      filterCategory === "All" ? true : bm.category === filterCategory
    );

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-10 transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] text-gray-100"
          : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800"
      }`}
    >
      {!user ? (
        <div
          className={`p-10 rounded-2xl shadow-xl text-center w-96 transition ${
            darkMode
              ? "bg-white/5 backdrop-blur-lg border border-white/10"
              : "bg-white"
          }`}
        >
          <h1 className="text-3xl font-bold mb-3">
            Smart Bookmark Manager
          </h1>
          <p className="mb-6 opacity-70">
            Save and manage your favorite links easily 🚀
          </p>
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-700 transition"
          >
            Sign in with Google
          </button>
        </div>
      ) : (
        <div className="w-full max-w-3xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-semibold">
              Welcome {user.email}
            </h2>

            <div className="flex gap-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  darkMode
                    ? "bg-yellow-400 text-black hover:bg-yellow-300"
                    : "bg-gray-800 text-white hover:bg-black"
                }`}
              >
                {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Add Section */}
          <div
            className={`p-6 rounded-2xl shadow-xl mb-8 transition ${
              darkMode
                ? "bg-white/5 backdrop-blur-lg border border-white/10"
                : "bg-white"
            }`}
          >
            <h3 className="text-lg font-semibold mb-4">
              Add Bookmark
            </h3>

            <div className="flex gap-3 mb-4 flex-wrap">
              <input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? "bg-white/10 border-white/20 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-black"
                }`}
              />

              <input
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className={`border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? "bg-white/10 border-white/20 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-black"
                }`}
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`border p-2 rounded-lg ${
                  darkMode
                    ? "bg-white/10 border-white/20 text-white"
                    : "bg-white border-gray-300 text-black"
                }`}
              >
                <option>General</option>
                <option>Work</option>
                <option>Study</option>
                <option>Personal</option>
                <option>Learning</option>
                <option>Important</option>
              </select>

              <button
                onClick={addBookmark}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Add
              </button>
            </div>

            <div className="flex gap-3 flex-wrap">
              <input
                placeholder="Search bookmarks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`flex-1 border p-2 rounded-lg ${
                  darkMode
                    ? "bg-white/10 border-white/20 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-black"
                }`}
              />

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className={`border p-2 rounded-lg ${
                  darkMode
                    ? "bg-white/10 border-white/20 text-white"
                    : "bg-white border-gray-300 text-black"
                }`}
              >
                <option value="All">All Categories</option>
                <option>General</option>
                <option>Work</option>
                <option>Study</option>
                <option>Personal</option>
                <option>Learning</option>
                <option>Important</option>
              </select>
            </div>
          </div>

          {/* Bookmark List */}
          <div className="space-y-5">
            {filteredBookmarks.map((bm) => (
              <div
                key={bm.id}
                className={`p-5 rounded-2xl shadow-xl flex justify-between items-center transition ${
                  darkMode
                    ? "bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10"
                    : "bg-white hover:shadow-lg"
                }`}
              >
                <div>
                  <p className="font-semibold text-lg">
                    {bm.title}
                  </p>

                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      darkMode
                        ? "bg-blue-600/20 text-blue-400"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {bm.category}
                  </span>

                  <div className="mt-2">
                    <a
                      href={bm.url}
                      target="_blank"
                      className="text-blue-500 text-sm hover:underline"
                    >
                      {bm.url}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => deleteBookmark(bm.id)}
                  className="text-red-500 hover:text-red-400 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}