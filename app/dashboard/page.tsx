"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface LeadInfo {
  id: number;
  nome: string;
  telefono: string;
  email: string | null;
  created_at: string;
}

interface LeadPreventivo {
  id: number;
  nome: string;
  telefono: string;
  email: string | null;
  potenza: string;
  batteria: boolean;
  colonna_ricarica: boolean;
  prezzo: number;
  indirizzo: string | null;
  created_at: string;
}

type Tab = "info" | "preventivo" | "cestino";

export default function DashboardPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);

  const [activeTab, setActiveTab] = useState<Tab>("info");
  const [leadsInfo, setLeadsInfo] = useState<LeadInfo[]>([]);
  const [leadsPreventivo, setLeadsPreventivo] = useState<LeadPreventivo[]>([]);
  const [trashInfo, setTrashInfo] = useState<LeadInfo[]>([]);
  const [trashPreventivo, setTrashPreventivo] = useState<LeadPreventivo[]>([]);
  const [loading, setLoading] = useState(false);

  // Filtri
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const headers = useCallback(() => ({ Authorization: `Bearer ${password}` }), [password]);

  const fetchLeads = useCallback(async (pwd: string) => {
    setLoading(true);
    try {
      const h = { Authorization: `Bearer ${pwd}` };
      const [infoRes, prevRes, trashInfoRes, trashPrevRes] = await Promise.all([
        fetch("/api/lead-info", { headers: h }),
        fetch("/api/lead-preventivo", { headers: h }),
        fetch("/api/lead-info?deleted=true", { headers: h }),
        fetch("/api/lead-preventivo?deleted=true", { headers: h }),
      ]);

      if (infoRes.status === 401) {
        setAuthError(true);
        setAuthenticated(false);
        setLoading(false);
        return;
      }

      const [info, prev, ti, tp] = await Promise.all([
        infoRes.json(), prevRes.json(), trashInfoRes.json(), trashPrevRes.json(),
      ]);
      setLeadsInfo(Array.isArray(info) ? info : []);
      setLeadsPreventivo(Array.isArray(prev) ? prev : []);
      setTrashInfo(Array.isArray(ti) ? ti : []);
      setTrashPreventivo(Array.isArray(tp) ? tp : []);
      setAuthenticated(true);
    } catch {
      setAuthError(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(false);
    fetchLeads(password);
  };

  useEffect(() => {
    const saved = sessionStorage.getItem("dashboard_token");
    if (saved) {
      setPassword(saved);
      fetchLeads(saved);
    }
  }, [fetchLeads]);

  useEffect(() => {
    if (authenticated) {
      sessionStorage.setItem("dashboard_token", password);
    }
  }, [authenticated, password]);

  // Azioni
  const trashLead = async (type: "info" | "preventivo", id: number) => {
    const endpoint = type === "info" ? "/api/lead-info" : "/api/lead-preventivo";
    await fetch(endpoint, {
      method: "PATCH",
      headers: { ...headers(), "Content-Type": "application/json" },
      body: JSON.stringify({ id, deleted: true }),
    });
    fetchLeads(password);
  };

  const restoreLead = async (type: "info" | "preventivo", id: number) => {
    const endpoint = type === "info" ? "/api/lead-info" : "/api/lead-preventivo";
    await fetch(endpoint, {
      method: "PATCH",
      headers: { ...headers(), "Content-Type": "application/json" },
      body: JSON.stringify({ id, deleted: false }),
    });
    fetchLeads(password);
  };

  const deleteLead = async (type: "info" | "preventivo", id: number) => {
    const endpoint = type === "info" ? "/api/lead-info" : "/api/lead-preventivo";
    await fetch(endpoint, {
      method: "DELETE",
      headers: { ...headers(), "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchLeads(password);
  };

  // Filtri
  const matchesSearch = (lead: LeadInfo | LeadPreventivo) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      lead.nome.toLowerCase().includes(q) ||
      lead.telefono.includes(q) ||
      (lead.email && lead.email.toLowerCase().includes(q))
    );
  };

  const toRomeDate = (utcString: string) => {
    return new Date(new Date(utcString).toLocaleString("en-US", { timeZone: "Europe/Rome" }));
  };

  const matchesDate = (createdAt: string) => {
    if (!dateFrom && !dateTo) return true;
    const rome = toRomeDate(createdAt);

    if (dateFrom) {
      const [y, m, d] = dateFrom.split("-").map(Number);
      const fromStart = new Date(y, m - 1, d, 0, 0, 0);
      if (rome < fromStart) return false;
    }
    if (dateTo) {
      const [y, m, d] = dateTo.split("-").map(Number);
      const toEnd = new Date(y, m - 1, d, 23, 59, 59);
      if (rome > toEnd) return false;
    }
    if (dateFrom && !dateTo) {
      const [y, m, d] = dateFrom.split("-").map(Number);
      const dayEnd = new Date(y, m - 1, d, 23, 59, 59);
      if (rome > dayEnd) return false;
    }
    return true;
  };

  const filteredInfo = leadsInfo.filter(l => matchesSearch(l) && matchesDate(l.created_at));
  const filteredPreventivo = leadsPreventivo.filter(l => matchesSearch(l) && matchesDate(l.created_at));
  const filteredTrashInfo = trashInfo.filter(l => matchesSearch(l) && matchesDate(l.created_at));
  const filteredTrashPreventivo = trashPreventivo.filter(l => matchesSearch(l) && matchesDate(l.created_at));

  const hasFilters = search || dateFrom || dateTo;
  const clearFilters = () => { setSearch(""); setDateFrom(""); setDateTo(""); };

  const formatDate = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const trashCount = trashInfo.length + trashPreventivo.length;

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 w-full max-w-sm">
          <h1 className="text-xl font-bold text-gray-900 mb-1">Dashboard Lead</h1>
          <p className="text-sm text-gray-500 mb-6">Inserisci la password per accedere.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setAuthError(false); }}
              placeholder="Password"
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-black focus:outline-none text-sm"
            />
            {authError && (
              <p className="text-red-500 text-sm text-center">Password errata.</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-2.5 rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors cursor-pointer disabled:opacity-50"
            >
              {loading ? "Accesso..." : "Accedi"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin w-10 h-10 border-4 border-black border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Nexevo"
              width={100}
              height={30}
              className="h-7 w-auto [filter:brightness(0)_saturate(100%)_invert(30%)_sepia(50%)_saturate(500%)_hue-rotate(70deg)_brightness(80%)]"
            />
            <span className="text-gray-300">|</span>
            <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{leadsInfo.length + leadsPreventivo.length} lead totali</span>
            <button
              onClick={() => fetchLeads(password)}
              className="px-3 py-1.5 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Aggiorna
            </button>
            <button
              onClick={() => {
                sessionStorage.removeItem("dashboard_token");
                setAuthenticated(false);
                setPassword("");
                setLeadsInfo([]);
                setLeadsPreventivo([]);
              }}
              className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors cursor-pointer"
            >
              Esci
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <p className="text-sm text-gray-500 mb-1">Lead Informazioni</p>
            <p className="text-3xl font-bold text-gray-900">{leadsInfo.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <p className="text-sm text-gray-500 mb-1">Lead Preventivo</p>
            <p className="text-3xl font-bold text-gray-900">{leadsPreventivo.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <p className="text-sm text-gray-500 mb-1">Totale Lead</p>
            <p className="text-3xl font-bold text-gray-900">{leadsInfo.length + leadsPreventivo.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <p className="text-sm text-gray-500 mb-1">Valore Preventivi</p>
            <p className="text-3xl font-bold text-gray-900">
              {leadsPreventivo.reduce((sum, l) => sum + l.prezzo, 0).toLocaleString("it-IT")}
            </p>
          </div>
        </div>

        {/* Filtri */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-medium text-gray-500 mb-1">Cerca</label>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Nome, telefono, email..."
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-black focus:outline-none text-sm"
              />
            </div>
            <div className="min-w-[150px]">
              <label className="block text-xs font-medium text-gray-500 mb-1">Da</label>
              <input
                type="date"
                value={dateFrom}
                onChange={e => setDateFrom(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-black focus:outline-none text-sm"
              />
            </div>
            <div className="min-w-[150px]">
              <label className="block text-xs font-medium text-gray-500 mb-1">A</label>
              <input
                type="date"
                value={dateTo}
                onChange={e => setDateTo(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-black focus:outline-none text-sm"
              />
            </div>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="px-3 py-2 text-sm text-gray-500 hover:text-black transition-colors cursor-pointer"
              >
                Resetta filtri
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("info")}
            className={`px-5 py-3 font-medium text-sm border-b-2 transition-colors cursor-pointer ${
              activeTab === "info"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Richieste Info ({filteredInfo.length})
          </button>
          <button
            onClick={() => setActiveTab("preventivo")}
            className={`px-5 py-3 font-medium text-sm border-b-2 transition-colors cursor-pointer ${
              activeTab === "preventivo"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Richieste Preventivo ({filteredPreventivo.length})
          </button>
          <button
            onClick={() => setActiveTab("cestino")}
            className={`px-5 py-3 font-medium text-sm border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === "cestino"
                ? "border-red-500 text-red-500"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Cestino ({trashCount})
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">

          {/* TAB INFO */}
          {activeTab === "info" && (
            filteredInfo.length === 0 ? (
              <div className="p-12 text-center text-gray-400">Nessuna lead trovata</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-5 py-3 font-semibold text-gray-600">#</th>
                      <th className="text-left px-5 py-3 font-semibold text-gray-600">Nome</th>
                      <th className="text-left px-5 py-3 font-semibold text-gray-600">Telefono</th>
                      <th className="text-left px-5 py-3 font-semibold text-gray-600">Email</th>
                      <th className="text-left px-5 py-3 font-semibold text-gray-600">Data</th>
                      <th className="px-5 py-3 w-12"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInfo.map((lead, i) => (
                      <tr key={lead.id} className={`border-b border-gray-100 hover:bg-gray-50 ${i % 2 === 0 ? "" : "bg-gray-50/50"}`}>
                        <td className="px-5 py-3 text-gray-400">{lead.id}</td>
                        <td className="px-5 py-3 font-medium text-gray-900">{lead.nome}</td>
                        <td className="px-5 py-3 text-gray-700">
                          <a href={`tel:${lead.telefono}`} className="hover:underline">{lead.telefono}</a>
                        </td>
                        <td className="px-5 py-3 text-gray-700">
                          {lead.email ? (
                            <a href={`mailto:${lead.email}`} className="hover:underline">{lead.email}</a>
                          ) : (
                            <span className="text-gray-400">&mdash;</span>
                          )}
                        </td>
                        <td className="px-5 py-3 text-gray-500">{formatDate(lead.created_at)}</td>
                        <td className="px-5 py-3">
                          <button
                            onClick={() => trashLead("info", lead.id)}
                            className="p-1.5 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 transition-colors cursor-pointer"
                            title="Sposta nel cestino"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}

          {/* TAB PREVENTIVO */}
          {activeTab === "preventivo" && (
            filteredPreventivo.length === 0 ? (
              <div className="p-12 text-center text-gray-400">Nessuna lead trovata</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-5 py-3 font-semibold text-gray-600">#</th>
                      <th className="text-left px-5 py-3 font-semibold text-gray-600">Nome</th>
                      <th className="text-left px-5 py-3 font-semibold text-gray-600">Telefono</th>
                      <th className="text-left px-5 py-3 font-semibold text-gray-600">Email</th>
                      <th className="text-left px-5 py-3 font-semibold text-gray-600">Potenza</th>
                      <th className="text-left px-5 py-3 font-semibold text-gray-600">Batteria</th>
                      <th className="text-left px-5 py-3 font-semibold text-gray-600">Colonna</th>
                      <th className="text-left px-5 py-3 font-semibold text-gray-600">Prezzo</th>
                      <th className="text-left px-5 py-3 font-semibold text-gray-600">Data</th>
                      <th className="px-5 py-3 w-12"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPreventivo.map((lead, i) => (
                      <tr key={lead.id} className={`border-b border-gray-100 hover:bg-gray-50 ${i % 2 === 0 ? "" : "bg-gray-50/50"}`}>
                        <td className="px-5 py-3 text-gray-400">{lead.id}</td>
                        <td className="px-5 py-3 font-medium text-gray-900">{lead.nome}</td>
                        <td className="px-5 py-3 text-gray-700">
                          <a href={`tel:${lead.telefono}`} className="hover:underline">{lead.telefono}</a>
                        </td>
                        <td className="px-5 py-3 text-gray-700">
                          {lead.email ? (
                            <a href={`mailto:${lead.email}`} className="hover:underline">{lead.email}</a>
                          ) : (
                            <span className="text-gray-400">&mdash;</span>
                          )}
                        </td>
                        <td className="px-5 py-3">
                          <span className="inline-block bg-black text-white text-xs font-medium px-2 py-0.5 rounded">
                            {lead.potenza}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          {lead.batteria ? (
                            <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded">Si</span>
                          ) : (
                            <span className="inline-block bg-gray-100 text-gray-500 text-xs font-medium px-2 py-0.5 rounded">No</span>
                          )}
                        </td>
                        <td className="px-5 py-3">
                          {lead.colonna_ricarica ? (
                            <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded">Si</span>
                          ) : (
                            <span className="inline-block bg-gray-100 text-gray-500 text-xs font-medium px-2 py-0.5 rounded">No</span>
                          )}
                        </td>
                        <td className="px-5 py-3 font-semibold text-gray-900">{lead.prezzo.toLocaleString("it-IT")}</td>
                        <td className="px-5 py-3 text-gray-500">{formatDate(lead.created_at)}</td>
                        <td className="px-5 py-3">
                          <button
                            onClick={() => trashLead("preventivo", lead.id)}
                            className="p-1.5 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 transition-colors cursor-pointer"
                            title="Sposta nel cestino"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}

          {/* TAB CESTINO */}
          {activeTab === "cestino" && (
            (filteredTrashInfo.length === 0 && filteredTrashPreventivo.length === 0) ? (
              <div className="p-12 text-center text-gray-400">Il cestino è vuoto</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-5 py-3 font-semibold text-gray-600">Tipo</th>
                      <th className="text-left px-5 py-3 font-semibold text-gray-600">Nome</th>
                      <th className="text-left px-5 py-3 font-semibold text-gray-600">Telefono</th>
                      <th className="text-left px-5 py-3 font-semibold text-gray-600">Email</th>
                      <th className="text-left px-5 py-3 font-semibold text-gray-600">Dettagli</th>
                      <th className="text-left px-5 py-3 font-semibold text-gray-600">Data</th>
                      <th className="px-5 py-3 w-24"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTrashInfo.map((lead, i) => (
                      <tr key={`info-${lead.id}`} className={`border-b border-gray-100 hover:bg-gray-50 ${i % 2 === 0 ? "" : "bg-gray-50/50"}`}>
                        <td className="px-5 py-3">
                          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded">Info</span>
                        </td>
                        <td className="px-5 py-3 font-medium text-gray-900">{lead.nome}</td>
                        <td className="px-5 py-3 text-gray-700">{lead.telefono}</td>
                        <td className="px-5 py-3 text-gray-700">{lead.email || <span className="text-gray-400">&mdash;</span>}</td>
                        <td className="px-5 py-3 text-gray-400">&mdash;</td>
                        <td className="px-5 py-3 text-gray-500">{formatDate(lead.created_at)}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => restoreLead("info", lead.id)}
                              className="text-gray-400 hover:text-green-600 transition-colors cursor-pointer"
                              title="Ripristina"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                              </svg>
                            </button>
                            <button
                              onClick={() => { if (confirm("Eliminare definitivamente questa lead?")) deleteLead("info", lead.id); }}
                              className="text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                              title="Elimina definitivamente"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredTrashPreventivo.map((lead, i) => (
                      <tr key={`prev-${lead.id}`} className={`border-b border-gray-100 hover:bg-gray-50 ${(filteredTrashInfo.length + i) % 2 === 0 ? "" : "bg-gray-50/50"}`}>
                        <td className="px-5 py-3">
                          <span className="inline-block bg-amber-100 text-amber-700 text-xs font-medium px-2 py-0.5 rounded">Preventivo</span>
                        </td>
                        <td className="px-5 py-3 font-medium text-gray-900">{lead.nome}</td>
                        <td className="px-5 py-3 text-gray-700">{lead.telefono}</td>
                        <td className="px-5 py-3 text-gray-700">{lead.email || <span className="text-gray-400">&mdash;</span>}</td>
                        <td className="px-5 py-3 text-gray-600 text-xs">
                          {lead.potenza}{lead.batteria ? " + Batteria" : ""}{lead.colonna_ricarica ? " + Colonna" : ""} &mdash; {lead.prezzo.toLocaleString("it-IT")}
                        </td>
                        <td className="px-5 py-3 text-gray-500">{formatDate(lead.created_at)}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => restoreLead("preventivo", lead.id)}
                              className="text-gray-400 hover:text-green-600 transition-colors cursor-pointer"
                              title="Ripristina"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                              </svg>
                            </button>
                            <button
                              onClick={() => { if (confirm("Eliminare definitivamente questa lead?")) deleteLead("preventivo", lead.id); }}
                              className="text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                              title="Elimina definitivamente"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}

        </div>
      </main>
    </div>
  );
}
