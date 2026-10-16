import React from "react";
import { useEffect, useState } from "react";
import { ArrowLeftRight, Search, Plus, MapPin, Phone, X, Pencil, Trash2, Check, LogOut, PackageSearch, ShieldCheck, ArrowRight } from "lucide-react";

const API = "http://localhost:5000/api";
const emptyForm = {
  title: "", description: "", type: "Lost", location: "", contact: "",
  date: new Date().toLocaleDateString("en-CA"), status: "Open"
};

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Something went wrong.");
  return data;
}

function App() {
  const [page, setPage] = useState("welcome");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({ lost: 0, found: 0, returned: 0 });
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function refresh() {
    try {
      const [list, totals] = await Promise.all([
        request(`${API}/items?search=${encodeURIComponent(search)}&type=${typeFilter}&status=${statusFilter}`),
        request(`${API}/stats`)
      ]);
      setItems(list);
      setStats(totals);
      setMessage("");
    } catch (error) {
      setMessage(error.message + " Is the backend and MongoDB running?");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { if (page === "noticeboard" && loggedIn) refresh(); }, [page, loggedIn, search, typeFilter, statusFilter]);

  function handleLogin(event) {
    event.preventDefault();
    // Classroom demo only: this is not secure real authentication.
    if (loginForm.email.trim() && loginForm.password.length >= 4) {
      setLoggedIn(true);
      setPage("noticeboard");
      setLoginError("");
    } else {
      setLoginError("Enter an email and a password of at least 4 characters.");
    }
  }

  function logout() {
    setLoggedIn(false);
    setPage("welcome");
    setLoginForm({ email: "", password: "" });
    setMessage("");
  }

  function openNew() {
    setEditing(null);
    setForm({ ...emptyForm, date: new Date().toLocaleDateString("en-CA") });
    setModalOpen(true);
  }

  function openEdit(item) {
    setEditing(item._id);
    setForm({
      title: item.title, description: item.description, type: item.type,
      location: item.location, contact: item.contact, date: item.date,
      status: item.status
    });
    setModalOpen(true);
  }

  async function saveItem(event) {
    event.preventDefault();
    try {
      if (editing) {
        await request(`${API}/items/${editing}`, { method: "PUT", body: JSON.stringify(form) });
      } else {
        await request(`${API}/items`, { method: "POST", body: JSON.stringify(form) });
      }
      setModalOpen(false);
      await refresh();
    } catch (error) { setMessage(error.message); }
  }

  async function changeStatus(item) {
    const status = item.status === "Open" ? "Returned" : "Open";
    try {
      await request(`${API}/items/${item._id}/status`, {
        method: "PATCH", body: JSON.stringify({ status })
      });
      await refresh();
    } catch (error) { setMessage(error.message); }
  }

  async function deleteItem(item) {
    if (!window.confirm(`Delete "${item.title}"? This cannot be undone.`)) return;
    try {
      await request(`${API}/items/${item._id}`, { method: "DELETE" });
      await refresh();
    } catch (error) { setMessage(error.message); }
  }

  const goLogin = () => { setLoginError(""); setPage("login"); };
  const goHome = () => setPage("welcome");

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand brand-button" onClick={goHome}><span className="brand-icon"><ArrowLeftRight size={19}/></span> Campus Lost & Found</button>
        <nav className="top-nav">
          {page !== "welcome" && <button onClick={goHome}>Home</button>}
          {loggedIn ? <button className="nav-login" onClick={logout}><LogOut size={14}/> Log out</button> : <button className="nav-login" onClick={goLogin}>Login</button>}
        </nav>
      </header>

      {page === "welcome" && <main className="landing">
        <section className="landing-hero">
          <div className="landing-copy">
            <p className="eyebrow">A KINDER CAMPUS STARTS HERE</p>
            <h1>Lost something?<br/><em>Let's bring it home.</em></h1>
            <p className="hero-copy">A simple campus noticeboard to report lost belongings, discover found items, and help things find their way back to their owners.</p>
            <div className="landing-actions"><button className="primary large" onClick={goLogin}>Open noticeboard <ArrowRight size={16}/></button><button className="secondary" onClick={goLogin}>Student login</button></div>
            <div className="trust-line"><ShieldCheck size={16}/> Made for students, by students</div>
          </div>
          <div className="hero-art">
            <div className="art-circle"><PackageSearch size={86} strokeWidth={1.2}/></div>
            <div className="floating-note note-one"><span className="note-emoji">🔑</span><div><b>Keys found!</b><small>Near the library</small></div><span className="mini-pill">FOUND</span></div>
            <div className="floating-note note-two"><span className="note-emoji">📘</span><div><b>Notebook missing</b><small>Block A · Room 204</small></div><span className="mini-pill lost-pill">LOST</span></div>
            <div className="decor-dot dot-a"></div><div className="decor-dot dot-b"></div>
          </div>
        </section>
        <section className="how-section">
          <div className="section-intro"><p className="eyebrow">THREE SIMPLE STEPS</p><h2>Small actions. Big relief.</h2><p>Getting your belongings back can be this easy.</p></div>
          <div className="how-grid">
            <article><span className="step-number">01</span><div className="how-icon">＋</div><h3>Report an item</h3><p>Tell the campus community what you lost or found.</p></article>
            <article><span className="step-number">02</span><div className="how-icon">⌕</div><h3>Search & match</h3><p>Use search and filters to find a matching notice.</p></article>
            <article><span className="step-number">03</span><div className="how-icon">✓</div><h3>Return it home</h3><p>Connect through the listed campus collection point.</p></article>
          </div>
        </section>
        <section className="landing-cta"><div><p className="eyebrow">READY TO GET STARTED?</p><h2>Let's help lost things find their people.</h2></div><button className="primary" onClick={goLogin}>Get started <ArrowRight size={15}/></button></section>
        <footer>Made for a more helpful campus <span>✦</span> <small>Campus Lost & Found · Mini Project</small></footer>
      </main>}

      {page === "login" && <main className="login-page">
        <section className="login-card">
          <div className="login-illustration"><div className="login-icon"><ArrowLeftRight size={30}/></div><span className="login-spark spark-one">✦</span><span className="login-spark spark-two">✦</span><div className="login-caption">LOST TODAY. FOUND TOMORROW.</div></div>
          <div className="login-content">
            <button className="back-link" onClick={goHome}>← Back to home</button>
            <p className="eyebrow">WELCOME BACK</p><h1>Student login</h1><p className="login-sub">Sign in to browse and manage campus notices.</p>
            <form onSubmit={handleLogin} className="login-form">
              <label>Email address<input type="email" required placeholder="you@college.edu" value={loginForm.email} onChange={e=>setLoginForm({...loginForm,email:e.target.value})}/></label>
              <label>Password<input type="password" required minLength="4" placeholder="Enter any 4+ characters" value={loginForm.password} onChange={e=>setLoginForm({...loginForm,password:e.target.value})}/></label>
              {loginError && <p className="login-error">{loginError}</p>}
              <button className="primary login-submit" type="submit">Login to noticeboard <ArrowRight size={16}/></button>
            </form>
            <p className="demo-hint"><ShieldCheck size={14}/> Demo login: any valid email and password with 4+ characters.</p>
            <p className="login-disclaimer">Classroom prototype only. This demo login does not provide secure authentication.</p>
          </div>
        </section>
        <footer>Made for a more helpful campus <span>✦</span> <small>Campus Lost & Found · Mini Project</small></footer>
      </main>}

      {page === "noticeboard" && loggedIn && <main className="noticeboard-page">
        <section className="hero">
          <div><p className="eyebrow">THE CAMPUS NOTICEBOARD</p><h1>Lost it? Let's <em>find it.</em></h1><p className="hero-copy">One place for misplaced things and helpful people.<br/>Report an item, find a match, and bring it home.</p></div>
          <button className="primary report-button" onClick={openNew}><Plus size={17}/> Report an item</button>
        </section>
        {message && <div className="alert"><span>{message}</span><button onClick={() => setMessage("")}><X size={16}/></button></div>}
        <section className="stats">
          <div className="stat-card"><div><span className="dot gold"></span><strong>Lost items</strong><small>Still looking for their owners</small></div><b>{stats.lost}</b></div>
          <div className="stat-card"><div><span className="dot green"></span><strong>Found items</strong><small>Waiting to be collected</small></div><b>{stats.found}</b></div>
          <div className="stat-card"><div><span className="dot blue"></span><strong>Returned</strong><small>Back where they belong</small></div><b>{stats.returned}</b></div>
        </section>
        <section className="board-heading"><div><h2>The noticeboard</h2><p>Browse reports from around campus</p></div><span className="result-count">{items.length} {items.length === 1 ? "report" : "reports"}</span></section>
        <section className="filters">
          <label className="searchbox"><Search size={17}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search items, descriptions or locations..."/></label>
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} aria-label="Filter by type"><option>All</option><option>Lost</option><option>Found</option></select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} aria-label="Filter by status"><option>All</option><option>Open</option><option>Returned</option></select>
          <button className="reset" onClick={() => { setSearch(""); setTypeFilter("All"); setStatusFilter("All"); }}>Reset</button>
        </section>
        {loading ? <div className="empty">Loading notices...</div> : items.length === 0 ? <div className="empty"><span>✦</span><h3>No notices found</h3><p>Try another search or report an item.</p><button className="primary" onClick={openNew}><Plus size={16}/> Report an item</button></div> :
          <section className="item-grid">{items.map(item => <article className={`item-card ${item.status === "Returned" ? "is-returned" : ""}`} key={item._id}>
            <div className="card-top"><span className={`tag ${item.type.toLowerCase()}`}>{item.type}</span><span className="date">{new Date(item.date + "T00:00:00").toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span></div>
            <h3>{item.title}</h3><p className="description">{item.description}</p>
            <div className="detail"><MapPin size={14}/><span><small>Location</small>{item.location}</span></div>
            <div className="detail"><Phone size={14}/><span><small>Contact / collection point</small>{item.contact}</span></div>
            <div className="card-footer"><span className={`status ${item.status.toLowerCase()}`}><span></span>{item.status}</span><div className="actions">
              <button title={item.status === "Open" ? "Mark returned" : "Reopen"} onClick={() => changeStatus(item)}><Check size={14}/>{item.status === "Open" ? "Mark returned" : "Reopen"}</button>
              <button title="Edit" onClick={() => openEdit(item)}><Pencil size={14}/> Edit</button>
              <button className="delete" title="Delete" onClick={() => deleteItem(item)}><Trash2 size={14}/> Delete</button>
            </div></div>
          </article>)}</section>}
        <footer>Made for a more helpful campus <span>✦</span> <small>Campus Lost & Found · Mini Project</small></footer>
      </main>}

      {modalOpen && <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setModalOpen(false); }}>
        <section className="modal"><div className="modal-header"><div><p className="eyebrow">HELP AN ITEM FIND ITS WAY HOME</p><h2>{editing ? "Edit notice" : "Report an item"}</h2><p>All fields are required. Use a campus collection point for contact details.</p></div><button className="close" onClick={() => setModalOpen(false)}><X size={19}/></button></div>
          <form onSubmit={saveItem}><div className="form-row"><label>Report type<select value={form.type} onChange={e => setForm({...form, type:e.target.value})}><option>Lost</option><option>Found</option></select></label><label>Date lost or found<input type="date" required value={form.date} onChange={e => setForm({...form, date:e.target.value})}/></label></div>
            <label>Item name<input required maxLength="80" value={form.title} onChange={e => setForm({...form, title:e.target.value})} placeholder="e.g. Blue water bottle"/></label>
            <label>Description<textarea required maxLength="500" rows="3" value={form.description} onChange={e => setForm({...form, description:e.target.value})} placeholder="Colour, brand, identifying details..."/></label>
            <div className="form-row"><label>Location<input required maxLength="100" value={form.location} onChange={e => setForm({...form, location:e.target.value})} placeholder="e.g. Library, second floor"/></label><label>Contact or collection point<input required maxLength="120" value={form.contact} onChange={e => setForm({...form, contact:e.target.value})} placeholder="e.g. IT department office"/></label></div>
            {editing && <label>Status<select value={form.status} onChange={e => setForm({...form, status:e.target.value})}><option>Open</option><option>Returned</option></select></label>}
            <div className="modal-actions"><button type="button" className="secondary" onClick={() => setModalOpen(false)}>Cancel</button><button className="primary" type="submit">{editing ? "Save changes" : "Save report"}</button></div>
          </form>
        </section>
      </div>}
    </div>
  );
}

export default App;
