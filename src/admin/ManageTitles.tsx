import { useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Film, Plus, Search, Pencil, Trash2, X } from "lucide-react";

import type { Title, ContentType } from "../types";
import { getTitles, saveTitles } from "../data/adminStorage";

const emptyForm = {
  name: "",
  type: "movie" as ContentType,
  year: new Date().getFullYear(),
  country: "",
  rating: 0,
  genre: "",
  description: "",
  poster: "",
  backdrop: "",
};

export default function ManageTitles() {
  const [items, setItems] = useState<Title[]>(() => getTitles());
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });


  const filteredItems = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();

    return items.filter((item) => {
      const matchesSearch = item.name.toLocaleLowerCase().includes(query);
      const matchesType = typeFilter === "All" || item.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [items, search, typeFilter]);

  const updateField = <K extends keyof typeof emptyForm>(
    field: K,
    value: (typeof emptyForm)[K]
  ) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({ ...emptyForm });
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setShowForm(true);
  };

  const openEditForm = (item: Title) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      type: item.type,
      year: item.year,
      country: item.country,
      rating: item.rating,
      genre: item.genre.join(", "),
      description: item.description,
      poster: item.poster,
      backdrop: item.backdrop,
    });
    setShowForm(true);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = form.name.trim();
    if (!name) return;

    const id = editingId ?? `title_${name
      .toLocaleLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_|_$/g, "")}_${Date.now()}`;

    const existingItem = editingId
      ? items.find((item) => item.id === editingId)
      : undefined;

    const newItem: Title = {
      ...(existingItem ?? {}),
      id,
      name,
      type: form.type,
      year: Number(form.year) || 0,
      country: form.country.trim() || "Not listed",
      rating: Number(form.rating) || 0,
      genre: form.genre.split(",").map((item) => item.trim()).filter(Boolean),
      description: form.description.trim(),
      poster: form.poster.trim(),
      backdrop: form.backdrop.trim(),
    };

    const updatedItems = editingId
      ? items.map((item) => (item.id === editingId ? newItem : item))
      : [...items, newItem];

    setItems(updatedItems);
    saveTitles(updatedItems);
    closeForm();
  };

  const deleteItem = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this title?")) return;

    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    saveTitles(updatedItems);
  };

  return (
    <div className="space-y-8 text-white">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm uppercase tracking-widest text-purple-400">Content Management</p>
          <h1 className="mt-2 text-3xl font-black">Manage Titles</h1>
          <p className="mt-2 text-gray-400">Manage movies, television series, and anime.</p>
        </div>

        <button type="button" onClick={openAddForm} className="flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-5 py-3 font-semibold hover:bg-purple-700">
          <Plus size={18} /> Add New Title
        </button>
      </header>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-1 items-center gap-3 rounded-lg border border-white/10 bg-[#12121a] px-4">
          <Search size={18} className="text-gray-400" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search titles..." className="w-full bg-transparent py-3 outline-none" />
        </div>

        <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className="rounded-lg border border-white/10 bg-[#12121a] px-4 py-3 outline-none" aria-label="Filter title type">
          <option value="All">All Types</option>
          <option value="movie">Movies</option>
          <option value="series">Series</option>
          <option value="anime">Anime</option>
        </select>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-400">
        <span>{filteredItems.length.toLocaleString()} titles</span>
        <span>{items.length.toLocaleString()} total records</span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#12121a]">
        <table className="w-full min-w-[750px] text-left">
          <thead className="border-b border-white/10 bg-white/[0.02]">
            <tr className="text-sm text-gray-400">
              <th className="p-4">Title</th>
              <th className="p-4">Type</th>
              <th className="p-4">Year</th>
              <th className="p-4">Country</th>
              <th className="p-4">Rating</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredItems.slice(0, 250).map((item) => (
              <tr key={item.id} className="hover:bg-white/[0.02]">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {item.poster ? (
                      <img src={item.poster} alt={item.name} className="h-14 w-10 rounded object-cover" />
                    ) : (
                      <div className="flex h-14 w-10 items-center justify-center rounded bg-purple-950 text-xs font-bold text-purple-300">OMNI</div>
                    )}
                    <span className="font-semibold">{item.name}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-300">{item.type}</span>
                </td>
                <td className="p-4 text-gray-300">{item.year || "—"}</td>
                <td className="p-4 text-gray-300">{item.country}</td>
                <td className="p-4 text-yellow-400">★ {item.rating || "N/A"}</td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => openEditForm(item)} title="Edit title" aria-label={`Edit ${item.name}`} className="rounded-lg p-2 text-blue-400 hover:bg-blue-500/10"><Pencil size={17} /></button>
                    <button type="button" onClick={() => deleteItem(item.id)} title="Delete title" aria-label={`Delete ${item.name}`} className="rounded-lg p-2 text-red-400 hover:bg-red-500/10"><Trash2 size={17} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredItems.length === 0 && <div className="p-10 text-center text-gray-400">No titles found.</div>}
        {filteredItems.length > 250 && <p className="p-4 text-center text-xs text-gray-500">Showing the first 250 results. Use search to narrow the list.</p>}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4">
          <div className="my-auto w-full max-w-2xl rounded-2xl border border-white/10 bg-[#12121a] p-6">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Film className="text-purple-400" size={24} />
                <h2 className="text-2xl font-bold">{editingId ? "Edit Title" : "Add New Title"}</h2>
              </div>
              <button type="button" onClick={closeForm} className="text-gray-400 hover:text-white" aria-label="Close title form"><X size={22} /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Title Name">
                  <input required value={form.name} onChange={(event) => updateField("name", event.target.value)} className="admin-input" placeholder="Enter title name" />
                </FormField>
                <FormField label="Type">
                  <select value={form.type} onChange={(event) => updateField("type", event.target.value as ContentType)} className="admin-input">
                    <option value="movie">Movie</option>
                    <option value="series">Series</option>
                    <option value="anime">Anime</option>
                  </select>
                </FormField>
                <FormField label="Release Year">
                  <input type="number" required min="1900" max="2100" value={form.year} onChange={(event) => updateField("year", Number(event.target.value))} className="admin-input" />
                </FormField>
                <FormField label="Country">
                  <input value={form.country} onChange={(event) => updateField("country", event.target.value)} className="admin-input" placeholder="Japan, USA..." />
                </FormField>
                <FormField label="Rating">
                  <input type="number" min="0" max="10" step="0.1" value={form.rating} onChange={(event) => updateField("rating", Number(event.target.value))} className="admin-input" placeholder="8.5" />
                </FormField>
                <FormField label="Genres">
                  <input value={form.genre} onChange={(event) => updateField("genre", event.target.value)} className="admin-input" placeholder="Action, Fantasy" />
                </FormField>
              </div>
              <FormField label="Description">
                <textarea rows={3} value={form.description} onChange={(event) => updateField("description", event.target.value)} className="admin-input resize-y" placeholder="Enter title description" />
              </FormField>
              <FormField label="Poster Image URL">
                <input type="url" value={form.poster} onChange={(event) => updateField("poster", event.target.value)} className="admin-input" placeholder="https://..." />
              </FormField>
              <FormField label="Backdrop Image URL">
                <input type="url" value={form.backdrop} onChange={(event) => updateField("backdrop", event.target.value)} className="admin-input" placeholder="https://..." />
              </FormField>
              <div className="flex flex-wrap justify-end gap-3 pt-4">
                <button type="button" onClick={closeForm} className="rounded-lg border border-white/10 px-5 py-3 hover:bg-white/5">Cancel</button>
                <button type="submit" className="rounded-lg bg-purple-600 px-5 py-3 font-semibold hover:bg-purple-700">{editingId ? "Save Changes" : "Add Title"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-300">{label}</label>
      {children}
    </div>
  );
}
