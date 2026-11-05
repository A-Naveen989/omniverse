import { useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Plus, Search, Pencil, Trash2, X, Users } from "lucide-react";

import type { Character as CharacterProfile } from "../types/CharacterTypes";
import { getCharacters, saveCharacters } from "../data/adminStorage";

const emptyForm = {
  name: "",
  image: "",
  description: "",
  biography: "",
  species: "Unknown",
  occupation: "",
  affiliations: "",
  aliases: "",
  titleIds: "",
  origin: "Unknown",
};

type CharacterForm = typeof emptyForm;

function parseList(value: string): string[] {
  return [...new Set(
    value
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter(Boolean)
  )];
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();
}

export default function ManageCharacters() {
  const [items, setItems] = useState<CharacterProfile[]>(() => getCharacters());
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CharacterForm>(emptyForm);


  const filteredItems = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    if (!query) return items;

    return items.filter((item) => {
      const searchableText = [
        item.name,
        ...item.aliases,
        item.description,
        item.biography,
        item.species,
        ...item.occupation,
        ...item.affiliations,
        ...item.titleIds,
        ...item.abilities,
        item.origin,
      ]
        .join(" ")
        .toLocaleLowerCase();

      return searchableText.includes(query);
    });
  }, [items, search]);

  const updateField = (field: keyof CharacterForm, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setShowForm(true);
  };

  const openEditForm = (item: CharacterProfile) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      image: item.image,
      description: item.description,
      biography: item.biography,
      species: item.species,
      occupation: item.occupation.join(", "),
      affiliations: item.affiliations.join(", "),
      aliases: item.aliases.join(", "),
      titleIds: item.titleIds.join(", "),
      origin: item.origin,
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({ ...emptyForm });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = form.name.trim();
    if (!trimmedName) return;

    const id = editingId ?? `char_${trimmedName
      .toLocaleLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_|_$/g, "")}_${Date.now()}`;

    const existing = items.find((item) => item.id === id);

    const newItem: CharacterProfile = {
      id,
      name: trimmedName,
      image: form.image.trim(),
      aliases: parseList(form.aliases),
      description: form.description.trim(),
      biography: form.biography.trim(),
      species: form.species.trim() || "Unknown",
      occupation: parseList(form.occupation),
      affiliations: parseList(form.affiliations),
      titleIds: parseList(form.titleIds),
      powerIds: existing?.powerIds ?? [],
      weaponIds: existing?.weaponIds ?? [],
      toolIds: existing?.toolIds ?? [],
      abilities: existing?.abilities ?? [],
      relationships: existing?.relationships ?? [],
      origin: form.origin.trim() || "Unknown",
    };

    const updatedItems = editingId
      ? items.map((item) => (item.id === editingId ? newItem : item))
      : [...items, newItem];

    setItems(updatedItems);
    saveCharacters(updatedItems);
    closeForm();
  };

  const deleteItem = (id: string) => {
    if (!window.confirm("Delete this character profile?")) return;

    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    saveCharacters(updatedItems);
  };

  return (
    <div className="space-y-8 text-white">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm uppercase tracking-widest text-purple-400">
            Character Database
          </p>
          <h1 className="mt-2 text-3xl font-black">Manage Characters</h1>
          <p className="mt-2 max-w-2xl text-gray-400">
            Edit canonical character profiles. Movie-specific roles and equipment
            relationships remain in the character appearance database.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddForm}
          className="flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-5 py-3 font-semibold hover:bg-purple-700"
        >
          <Plus size={18} /> Add Character
        </button>
      </header>

      <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#12121a] px-4">
        <Search size={18} className="text-gray-400" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search characters, aliases, movies, or affiliations..."
          aria-label="Search character profiles"
          className="w-full bg-transparent py-3 outline-none"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-gray-400">
        <span>{filteredItems.length.toLocaleString()} characters</span>
        <span>Canonical profile records</span>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filteredItems.slice(0, 120).map((item) => (
          <article
            key={item.id}
            className="rounded-xl border border-white/10 bg-[#12121a] p-5"
          >
            <div className="flex gap-4">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-20 rounded-lg bg-black/20 object-cover"
                />
              ) : (
                <div className="flex h-24 w-20 items-center justify-center rounded-lg bg-gradient-to-br from-purple-950 to-zinc-900 text-xl font-black text-purple-300">
                  {getInitials(item.name)}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <h2 className="line-clamp-2 text-lg font-bold">{item.name}</h2>
                <p className="mt-1 text-sm text-purple-400">
                  {item.species || "Species unknown"}
                </p>
                <p className="mt-2 line-clamp-2 text-xs text-gray-400">
                  {item.origin || "Origin unknown"}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {item.titleIds.length} linked movie IDs
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-black/20 p-3">
              <p className="text-xs uppercase tracking-wider text-gray-500">Affiliations</p>
              <p className="mt-1 line-clamp-2 text-sm text-gray-300">
                {item.affiliations.join(", ") || "Not listed"}
              </p>
            </div>

            <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-400">
              {item.description || item.biography || "No biography added."}
            </p>

            <div className="mt-5 flex justify-end gap-2 border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={() => openEditForm(item)}
                className="rounded-lg p-2 text-blue-400 hover:bg-blue-500/10"
                title="Edit character"
                aria-label={`Edit ${item.name}`}
              >
                <Pencil size={17} />
              </button>
              <button
                type="button"
                onClick={() => deleteItem(item.id)}
                className="rounded-lg p-2 text-red-400 hover:bg-red-500/10"
                title="Delete character"
                aria-label={`Delete ${item.name}`}
              >
                <Trash2 size={17} />
              </button>
            </div>
          </article>
        ))}
      </div>

      {filteredItems.length > 120 && (
        <p className="text-center text-sm text-gray-500">
          Showing the first 120 matches. Use search to narrow the list.
        </p>
      )}

      {filteredItems.length === 0 && (
        <div className="rounded-xl border border-white/10 bg-[#12121a] p-10 text-center text-gray-400">
          No characters found.
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4">
          <div className="my-auto w-full max-w-2xl rounded-2xl border border-white/10 bg-[#12121a] p-6">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="text-purple-400" size={24} />
                <h2 className="text-2xl font-bold">
                  {editingId ? "Edit Character" : "Add Character"}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeForm}
                className="text-gray-400 hover:text-white"
                aria-label="Close character form"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Character Name">
                  <input required value={form.name} onChange={(event) => updateField("name", event.target.value)} className="admin-input" placeholder="Character name" />
                </Field>
                <Field label="Species">
                  <input value={form.species} onChange={(event) => updateField("species", event.target.value)} className="admin-input" placeholder="Human, Kryptonian, Unknown..." />
                </Field>
              </div>

              <Field label="Image URL or local asset path">
                <input value={form.image} onChange={(event) => updateField("image", event.target.value)} className="admin-input" placeholder="/images/characters/name.jpg or https://..." />
              </Field>

              <Field label="Aliases (comma-separated)">
                <input value={form.aliases} onChange={(event) => updateField("aliases", event.target.value)} className="admin-input" placeholder="Alias one, Alias two" />
              </Field>

              <Field label="Short Description">
                <textarea rows={2} value={form.description} onChange={(event) => updateField("description", event.target.value)} className="admin-input resize-y" placeholder="Short overview" />
              </Field>

              <Field label="Biography">
                <textarea rows={4} value={form.biography} onChange={(event) => updateField("biography", event.target.value)} className="admin-input resize-y" placeholder="Character biography" />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Occupation (comma-separated)">
                  <textarea rows={2} value={form.occupation} onChange={(event) => updateField("occupation", event.target.value)} className="admin-input resize-y" placeholder="Detective, scientist..." />
                </Field>
                <Field label="Affiliations (comma-separated)">
                  <textarea rows={2} value={form.affiliations} onChange={(event) => updateField("affiliations", event.target.value)} className="admin-input resize-y" placeholder="Team, organization..." />
                </Field>
              </div>

              <Field label="Movie IMDb IDs (comma-separated)">
                <input value={form.titleIds} onChange={(event) => updateField("titleIds", event.target.value)} className="admin-input" placeholder="tt1234567, tt7654321" />
              </Field>

              <Field label="Origin / Universe">
                <input value={form.origin} onChange={(event) => updateField("origin", event.target.value)} className="admin-input" placeholder="Film universe or origin" />
              </Field>

              <p className="text-xs leading-5 text-gray-500">
                Movie-specific role, powers, weapons, tools, and their appearance
                links are stored separately. This form edits the canonical
                character profile and preserves existing element IDs.
              </p>

              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={closeForm} className="rounded-lg border border-white/10 px-5 py-3 hover:bg-white/5">
                  Cancel
                </button>
                <button type="submit" className="rounded-lg bg-purple-600 px-5 py-3 font-semibold hover:bg-purple-700">
                  {editingId ? "Save Changes" : "Add Character"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-300">
        {label}
      </label>
      {children}
    </div>
  );
}
