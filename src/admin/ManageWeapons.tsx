import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Plus, Search, Pencil, Trash2, X, Sword } from "lucide-react";

import type { Weapon } from "../types/CharacterTypes";
import { getWeapons, saveWeapons } from "../data/adminStorage";

const emptyForm = {
  name: "",
  image: "",
  description: "",
  category: "Weapon",
  wielderIds: "",
  origin: "",
  strengths: "",
  weaknesses: "",
  specialAbilities: "",
};

type WeaponForm = typeof emptyForm;

function parseList(value: string): string[] {
  return [...new Set(value.split(/[\n,]/).map((item) => item.trim()).filter(Boolean))];
}

export default function ManageWeapons() {
  const [items, setItems] = useState<Weapon[]>(() => getWeapons());
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<WeaponForm>({ ...emptyForm });


  const filteredItems = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    if (!query) return items;

    return items.filter((item) => [
      item.name,
      item.category,
      item.description,
      item.origin,
      ...item.wielderIds,
      ...item.strengths,
      ...item.weaknesses,
      ...item.specialAbilities,
    ].join(" ").toLocaleLowerCase().includes(query));
  }, [items, search]);

  const updateField = (field: keyof WeaponForm, value: string) => {
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

  const openEditForm = (item: Weapon) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      image: item.image,
      description: item.description,
      category: item.category,
      wielderIds: item.wielderIds.join(", "),
      origin: item.origin,
      strengths: item.strengths.join("\n"),
      weaknesses: item.weaknesses.join("\n"),
      specialAbilities: item.specialAbilities.join("\n"),
    });
    setShowForm(true);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = form.name.trim();
    if (!name) return;

    const id = editingId ?? `weapon_${name.toLocaleLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "")}_${Date.now()}`;
    const newItem: Weapon = {
      id,
      name,
      image: form.image.trim(),
      description: form.description.trim(),
      category: form.category.trim() || "Other",
      wielderIds: parseList(form.wielderIds),
      origin: form.origin.trim() || "Unknown",
      strengths: parseList(form.strengths),
      weaknesses: parseList(form.weaknesses),
      specialAbilities: parseList(form.specialAbilities),
    };

    const updatedItems = editingId
      ? items.map((item) => item.id === editingId ? newItem : item)
      : [...items, newItem];
    setItems(updatedItems);
    saveWeapons(updatedItems);
    closeForm();
  };

  const deleteItem = (id: string) => {
    if (!window.confirm("Delete this weapon?")) return;
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    saveWeapons(updatedItems);
  };

  return (
    <div className="space-y-8 text-white">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm uppercase tracking-widest text-orange-400">Armory Database</p>
          <h1 className="mt-2 text-3xl font-black">Manage Weapons</h1>
          <p className="mt-2 text-gray-400">Manage canonical weapons, wielders, origins, and properties.</p>
        </div>
        <button type="button" onClick={openAddForm} className="flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-5 py-3 font-semibold hover:bg-purple-700"><Plus size={18} /> Add Weapon</button>
      </header>

      <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#12121a] px-4">
        <Search size={18} className="text-gray-400" />
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search weapons, categories, or character IDs..." className="w-full bg-transparent py-3 outline-none" />
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredItems.map((item) => (
          <article key={item.id} className="rounded-xl border border-white/10 bg-[#12121a] p-6 transition hover:border-orange-500/30">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400"><Sword size={25} /></div>
              <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs text-orange-300">{item.category}</span>
            </div>
            <h2 className="mt-5 text-2xl font-bold">{item.name}</h2>
            <p className="mt-4 leading-7 text-gray-400">{item.description}</p>
            <p className="mt-4 text-xs text-gray-500">Wielders: {item.wielderIds.join(", ") || "Not linked"}</p>
            <p className="mt-2 text-xs text-gray-500">Origin: {item.origin || "Unknown"}</p>
            <div className="mt-5 flex justify-end gap-2 border-t border-white/10 pt-4">
              <button type="button" onClick={() => openEditForm(item)} className="rounded-lg p-2 text-blue-400 hover:bg-blue-500/10" title="Edit weapon" aria-label={`Edit ${item.name}`}><Pencil size={17} /></button>
              <button type="button" onClick={() => deleteItem(item.id)} className="rounded-lg p-2 text-red-400 hover:bg-red-500/10" title="Delete weapon" aria-label={`Delete ${item.name}`}><Trash2 size={17} /></button>
            </div>
          </article>
        ))}
      </div>

      {filteredItems.length === 0 && <div className="rounded-xl border border-white/10 bg-[#12121a] p-10 text-center text-gray-400">No weapons found.</div>}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4">
          <div className="my-auto w-full max-w-2xl rounded-2xl border border-white/10 bg-[#12121a] p-6">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3"><Sword className="text-orange-400" size={24} /><h2 className="text-2xl font-bold">{editingId ? "Edit Weapon" : "Add Weapon"}</h2></div>
              <button type="button" onClick={closeForm} className="text-gray-400 hover:text-white" aria-label="Close weapon form"><X size={22} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Field label="Weapon Name"><input required value={form.name} onChange={(event) => updateField("name", event.target.value)} className="admin-input" /></Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Category"><input value={form.category} onChange={(event) => updateField("category", event.target.value)} className="admin-input" /></Field>
                <Field label="Image URL / Local Path"><input value={form.image} onChange={(event) => updateField("image", event.target.value)} className="admin-input" placeholder="/images/weapons/..." /></Field>
              </div>
              <Field label="Wielder Character IDs (comma-separated)"><input value={form.wielderIds} onChange={(event) => updateField("wielderIds", event.target.value)} className="admin-input" placeholder="char_example_123" /></Field>
              <Field label="Origin"><textarea rows={2} value={form.origin} onChange={(event) => updateField("origin", event.target.value)} className="admin-input resize-y" /></Field>
              <Field label="Description"><textarea required rows={3} value={form.description} onChange={(event) => updateField("description", event.target.value)} className="admin-input resize-y" /></Field>
              <Field label="Strengths (one per line)"><textarea rows={2} value={form.strengths} onChange={(event) => updateField("strengths", event.target.value)} className="admin-input resize-y" /></Field>
              <Field label="Weaknesses (one per line)"><textarea rows={2} value={form.weaknesses} onChange={(event) => updateField("weaknesses", event.target.value)} className="admin-input resize-y" /></Field>
              <Field label="Special Abilities (one per line)"><textarea rows={2} value={form.specialAbilities} onChange={(event) => updateField("specialAbilities", event.target.value)} className="admin-input resize-y" /></Field>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={closeForm} className="rounded-lg border border-white/10 px-5 py-3 hover:bg-white/5">Cancel</button>
                <button type="submit" className="rounded-lg bg-purple-600 px-5 py-3 font-semibold hover:bg-purple-700">{editingId ? "Save Changes" : "Add Weapon"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="mb-2 block text-sm font-medium text-gray-300">{label}</label>{children}</div>;
}
