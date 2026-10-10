import { useState } from "react";
import "./App.css";

export default function App() {
  const [cooking, setCooking] = useState(false);
  const [done, setDone] = useState(false);
  const [shake, setShake] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState({ t: "Tekan tuas untuk mulai memasak.", c: "" });

  const toggle = () => {
    if (done) { setDone(false); setCooking(false); setMsg({ t: "Colokan dicabut. Silakan masak lagi.", c: "" }); return; }
    setCooking(!cooking);
    setMsg({ t: cooking ? "Tuas diangkat, nasi batal dimasak." : "Sedang memasak… isi data dulu.", c: "" });
  };

  const submit = (e) => {
    e.preventDefault();
    if (!user.trim() || pass.length < 6) {
      setShake(true); setTimeout(() => setShake(false), 450);
      setMsg({ t: !user.trim() ? "Nama pengguna belum diisi." : "Kata sandi minimal 6 karakter.", c: "err" });
      return;
    }
    setDone(true);
    setMsg({ t: `Nasi matang! Selamat datang, ${user.trim()}.`, c: "ok" });
  };

  return (
    <div className="mc">
      <div className={`cooker ${cooking ? "on" : ""} ${shake ? "shake" : ""}`}>
        <div className="steam" aria-hidden="true"><i /><i /><i /></div>
        <div className="lid" aria-hidden="true" />
        <form className="body" onSubmit={submit} noValidate>
          <div className="panel">
            <h1>Masuk Dapur</h1>
            <div className="lamps" aria-hidden="true">
              <div className={`lamp cook ${cooking && !done ? "lit" : ""}`}><b />COOK</div>
              <div className={`lamp warm ${done ? "lit" : ""}`}><b />WARM</div>
            </div>
          </div>

          <label htmlFor="u">Nama pengguna</label>
          <input id="u" value={user} onChange={(e) => setUser(e.target.value)} disabled={!cooking || done} autoComplete="username" />
          <label htmlFor="p">Kata sandi</label>
          <input id="p" type="password" value={pass} onChange={(e) => setPass(e.target.value)} disabled={!cooking || done} autoComplete="current-password" />

          <div className="lever">
            <button type="button" className="slot" onClick={toggle} aria-pressed={cooking} aria-label="Tuas masak">
              <div className="knob">{cooking ? "COOK" : "OFF"}</div>
              <span>{cooking ? "OFF" : "COOK"}</span>
            </button>
          </div>

          <button className="go" disabled={!cooking || done}>Masuk</button>
          <p className={`msg ${msg.c}`} role="status">{msg.t}</p>
        </form>
      </div>
    </div>
  );
}