"use client";
import { useState, useEffect, useRef } from "react";
import { Lock, Save, LogOut, Image as ImageIcon, Building, Plus, Trash2, CheckCircle2, AlertCircle, Loader2, Upload } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Apartment {
  id: string;
  area: string;
  status: string;
  floor: string;
  rooms: string;
  additional_area: string;
  building: string;
  price: string;
}

interface GalleryPhoto {
  id: number;
  src: string;
  title: string;
  className: string;
}

const MAX_FILE_SIZE = 3 * 1024 * 1024;

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<"apartments" | "gallery">("apartments");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");

  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [gallery, setGallery] = useState<GalleryPhoto[]>([]);
  const [uploading, setUploading] = useState<number | null>(null);
  const [uploadingNew, setUploadingNew] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const newFileInputRef = useRef<HTMLInputElement>(null);
  const [activePhotoId, setActivePhotoId] = useState<number | null>(null);

  const getAuthToken = () => sessionStorage.getItem("admin_token") || "";

  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    if (token) {
      setIsLoggedIn(true);
      loadData();
    }
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [aptsRes, galRes] = await Promise.all([
        fetch("/api/apartments"),
        fetch("/api/gallery")
      ]);
      if (aptsRes.ok) setApartments(await aptsRes.json());
      if (galRes.ok) setGallery(await galRes.json());
    } catch (err) {
      console.error("Failed to load data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      if (res.ok) {
        setIsLoggedIn(true);
        setLoginError(false);
        sessionStorage.setItem("admin_token", password);
        loadData();
      } else {
        setLoginError(true);
      }
    } catch {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("admin_token");
  };

  const uploadImageToSupabase = async (file: File): Promise<string | null> => {
    if (file.size > MAX_FILE_SIZE) {
      alert("Plik jest za duzy! Maksymalny rozmiar to 3 MB.");
      return null;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    if (!allowedTypes.includes(file.type)) {
      alert("Nieobslugiwany format pliku. Dozwolone: JPG, PNG, WebP, AVIF.");
      return null;
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const fileName = `gallery_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;

    const { error } = await supabase.storage
      .from("gallery")
      .upload(fileName, file, { cacheControl: "3600", upsert: false });

    if (error) {
      console.error("Upload error:", error);
      alert("Blad podczas wgrywania pliku: " + error.message);
      return null;
    }

    const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(fileName);
    return urlData.publicUrl;
  };

  const handleFileUploadForPhoto = async (photoId: number, file: File) => {
    setUploading(photoId);
    const url = await uploadImageToSupabase(file);
    if (url) {
      setGallery(prev => prev.map(p => p.id === photoId ? { ...p, src: url } : p));
    }
    setUploading(null);
  };

  const handleNewPhotoUpload = async (file: File) => {
    if (gallery.length >= 30) {
      alert("Osiagnieto limit 30 zdjec w galerii.");
      return;
    }
    setUploadingNew(true);
    const url = await uploadImageToSupabase(file);
    if (url) {
      const newId = gallery.length > 0 ? Math.max(...gallery.map(p => p.id)) + 1 : 1;
      setGallery(prev => [...prev, { id: newId, src: url, title: "Nowe zdjecie", className: "md:col-span-1 md:row-span-1" }]);
    }
    setUploadingNew(false);
  };

  const handleSaveApartments = async () => {
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/apartments/bulk", {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getAuthToken()}` },
        body: JSON.stringify({ apartments })
      });
      setSaveStatus(res.ok ? "success" : "error");
    } catch {
      setSaveStatus("error");
    }
    setTimeout(() => setSaveStatus("idle"), 3000);
  };

  const handleSaveGallery = async () => {
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/gallery", {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getAuthToken()}` },
        body: JSON.stringify({ photos: gallery })
      });
      setSaveStatus(res.ok ? "success" : "error");
    } catch {
      setSaveStatus("error");
    }
    setTimeout(() => setSaveStatus("idle"), 3000);
  };

  const updateApartment = (id: string, field: string, value: string) => {
    setApartments(prev => prev.map(apt => apt.id === id ? { ...apt, [field]: value } : apt));
  };

  const updateGalleryPhoto = (id: number, field: string, value: string) => {
    setGallery(prev => prev.map(photo => photo.id === id ? { ...photo, [field]: value } : photo));
  };

  const removePhoto = async (id: number) => {
    if (!confirm("Czy na pewno chcesz usunac to zdjecie?")) return;
    try {
      const res = await fetch(`/api/gallery?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
      if (res.ok) {
        setGallery(prev => prev.filter(p => p.id !== id));
      } else {
        alert("Nie udalo sie usunac zdjecia.");
      }
    } catch (err) {
      console.error("Blad usuwania:", err);
      alert("Blad polaczenia z serwerem.");
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#FAF8F5", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <div style={{ width: "100%", maxWidth: "420px", backgroundColor: "#fff", borderRadius: "24px", padding: "32px", boxShadow: "0 20px 60px rgba(0,0,0,0.1)", border: "1px solid #e2e8f0" }}>
          <div style={{ width: "64px", height: "64px", backgroundColor: "#303249", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <Lock style={{ width: "32px", height: "32px", color: "#BB9B64" }} />
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: 500, textAlign: "center", color: "#111", marginBottom: "8px" }}>Panel Administracyjny</h1>
          <p style={{ textAlign: "center", color: "#64748b", marginBottom: "32px", fontSize: "14px" }}>Wprowadz haslo aby zarzadzac oferta i galeria Riva Zegrze.</p>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#475569", marginBottom: "8px" }}>Haslo dostepu</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: loginError ? "2px solid #ef4444" : "1px solid #e2e8f0", outline: "none", fontSize: "14px", backgroundColor: loginError ? "#fef2f2" : "#fff", boxSizing: "border-box" }}
                placeholder="Wpisz haslo"
              />
              {loginError && <p style={{ color: "#ef4444", fontSize: "13px", marginTop: "8px", display: "flex", alignItems: "center", gap: "4px" }}><AlertCircle style={{ width: "16px", height: "16px" }} /> Nieprawidlowe haslo</p>}
            </div>
            <button type="submit" style={{ width: "100%", backgroundColor: "#303249", color: "#fff", fontWeight: 500, padding: "12px", borderRadius: "12px", border: "none", cursor: "pointer", fontSize: "14px" }}>Zaloguj sie</button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Loader2 style={{ width: "40px", height: "40px", color: "#BB9B64", animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", paddingBottom: "80px", paddingTop: "100px" }}>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif" style={{ display: "none" }}
        onChange={(e) => { const file = e.target.files?.[0]; if (file && activePhotoId !== null) handleFileUploadForPhoto(activePhotoId, file); e.target.value = ""; }} />
      <input ref={newFileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif" style={{ display: "none" }}
        onChange={(e) => { const file = e.target.files?.[0]; if (file) handleNewPhotoUpload(file); e.target.value = ""; }} />

      <div style={{ backgroundColor: "#303249", color: "#fff", paddingBottom: "96px", paddingTop: "32px", paddingLeft: "24px", paddingRight: "24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "48px", height: "48px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}><Lock style={{ width: "24px", height: "24px", color: "#BB9B64" }} /></div>
            <div>
              <h1 style={{ fontSize: "22px", fontWeight: 500 }}>Zarzadzanie Oferta</h1>
              <p style={{ color: "#94a3b8", fontSize: "13px" }}>Riva Zegrze CMS</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {saveStatus === "success" && <span style={{ color: "#4ade80", display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 500 }}><CheckCircle2 style={{ width: "16px", height: "16px" }} /> Zapisano</span>}
            {saveStatus === "error" && <span style={{ color: "#f87171", display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 500 }}><AlertCircle style={{ width: "16px", height: "16px" }} /> Blad</span>}
            <button onClick={handleLogout} style={{ padding: "8px 16px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "8px", fontSize: "13px", fontWeight: 500, color: "#fff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}><LogOut style={{ width: "16px", height: "16px" }} /> Wyloguj</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1280px", margin: "-64px auto 0", padding: "0 24px" }}>
        <div style={{ backgroundColor: "#fff", borderRadius: "32px", boxShadow: "0 20px 60px rgba(0,0,0,0.08)", border: "1px solid #e2e8f0", overflow: "hidden" }}>
          <div style={{ display: "flex", borderBottom: "1px solid #e2e8f0", overflowX: "auto" }}>
            <button onClick={() => setActiveTab("apartments")} style={{ flex: "1", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "20px 32px", fontSize: "13px", fontWeight: 500, whiteSpace: "nowrap", border: "none", cursor: "pointer", backgroundColor: activeTab === "apartments" ? "#f8fafc" : "#fff", color: activeTab === "apartments" ? "#BB9B64" : "#64748b", borderBottom: activeTab === "apartments" ? "2px solid #BB9B64" : "2px solid transparent" }}><Building style={{ width: "16px", height: "16px" }} /> Apartamenty</button>
            <button onClick={() => setActiveTab("gallery")} style={{ flex: "1", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "20px 32px", fontSize: "13px", fontWeight: 500, whiteSpace: "nowrap", border: "none", cursor: "pointer", backgroundColor: activeTab === "gallery" ? "#f8fafc" : "#fff", color: activeTab === "gallery" ? "#BB9B64" : "#64748b", borderBottom: activeTab === "gallery" ? "2px solid #BB9B64" : "2px solid transparent" }}><ImageIcon style={{ width: "16px", height: "16px" }} /> Galeria</button>
          </div>

          <div style={{ padding: "40px" }}>
            {activeTab === "apartments" && (
              <div>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", gap: "16px" }}>
                  <div>
                    <h2 style={{ fontSize: "22px", fontWeight: 500, color: "#111" }}>Cennik i dostepnosc</h2>
                    <p style={{ color: "#64748b", marginTop: "4px", fontSize: "14px" }}>Zmieniaj ceny i statusy apartamentow.</p>
                  </div>
                  <button onClick={handleSaveApartments} disabled={saveStatus === "saving"} style={{ backgroundColor: "#BB9B64", color: "#fff", padding: "12px 24px", borderRadius: "12px", fontWeight: 500, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 8px 24px rgba(187,155,100,0.3)", fontSize: "14px", opacity: saveStatus === "saving" ? 0.7 : 1 }}>
                    {saveStatus === "saving" ? <Loader2 style={{ width: "20px", height: "20px", animation: "spin 1s linear infinite" }} /> : <Save style={{ width: "20px", height: "20px" }} />} Zapisz zmiany
                  </button>
                </div>
                <div style={{ overflowX: "auto", border: "1px solid #e2e8f0", borderRadius: "16px" }}>
                  <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", fontSize: "12px", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        <th style={{ padding: "16px 16px 16px 24px" }}>Lokal</th><th style={{ padding: "16px" }}>Budynek</th><th style={{ padding: "16px" }}>Metraz</th><th style={{ padding: "16px" }}>Pokoje</th><th style={{ padding: "16px", width: "192px" }}>Status</th><th style={{ padding: "16px", width: "224px" }}>Cena (PLN)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apartments.map((apt) => (
                        <tr key={apt.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                          <td style={{ padding: "16px 16px 16px 24px", fontWeight: 500, color: "#111", fontSize: "14px" }}>{apt.id}</td>
                          <td style={{ padding: "16px", color: "#475569", fontSize: "14px" }}>{apt.building}</td>
                          <td style={{ padding: "16px", color: "#475569", fontSize: "14px" }}>{apt.area}</td>
                          <td style={{ padding: "16px", color: "#475569", fontSize: "14px" }}>{apt.rooms}</td>
                          <td style={{ padding: "16px" }}>
                            <select value={apt.status} onChange={(e) => updateApartment(apt.id, "status", e.target.value)}
                              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid", fontSize: "13px", fontWeight: 500, outline: "none",
                                backgroundColor: apt.status === "Dostepny" ? "#f0fdf4" : apt.status === "Rezerwacja" ? "#fffbeb" : "#fef2f2",
                                borderColor: apt.status === "Dostepny" ? "#bbf7d0" : apt.status === "Rezerwacja" ? "#fde68a" : "#fecaca",
                                color: apt.status === "Dostepny" ? "#15803d" : apt.status === "Rezerwacja" ? "#b45309" : "#dc2626" }}>
                              <option value="Dostepny">Dostepny</option>
                              <option value="Rezerwacja">Rezerwacja</option>
                              <option value="Sprzedane">Sprzedane</option>
                            </select>
                          </td>
                          <td style={{ padding: "16px" }}>
                            <input type="text" value={apt.price} onChange={(e) => updateApartment(apt.id, "price", e.target.value)}
                              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#fff", fontSize: "13px", outline: "none", fontWeight: apt.price !== "-" && apt.price !== "Zapytaj o cene" ? 700 : 500, color: apt.price !== "-" && apt.price !== "Zapytaj o cene" ? "#111" : "#94a3b8", boxSizing: "border-box" }}
                              placeholder="Wpisz cene np. 850 000" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "gallery" && (
              <div>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", gap: "16px" }}>
                  <div>
                    <h2 style={{ fontSize: "22px", fontWeight: 500, color: "#111" }}>Zarzadzanie obrazami</h2>
                    <p style={{ color: "#64748b", marginTop: "4px", fontSize: "14px" }}>Wgrywaj zdjecia z komputera (maks. 3 MB, JPG/PNG/WebP). Maks 30 zdjec.</p>
                  </div>
                  <button onClick={handleSaveGallery} disabled={saveStatus === "saving"} style={{ backgroundColor: "#BB9B64", color: "#fff", padding: "12px 24px", borderRadius: "12px", fontWeight: 500, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 8px 24px rgba(187,155,100,0.3)", fontSize: "14px", opacity: saveStatus === "saving" ? 0.7 : 1 }}>
                    {saveStatus === "saving" ? <Loader2 style={{ width: "20px", height: "20px", animation: "spin 1s linear infinite" }} /> : <Save style={{ width: "20px", height: "20px" }} />} Zapisz galerie
                  </button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
                  {gallery.map((photo, index) => (
                    <div key={photo.id} style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                      <div style={{ aspectRatio: "4/3", backgroundColor: "#e2e8f0", position: "relative", overflow: "hidden" }}>
                        {uploading === photo.id ? (
                          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f1f5f9" }}>
                            <div style={{ textAlign: "center" }}><Loader2 style={{ width: "32px", height: "32px", color: "#BB9B64", animation: "spin 1s linear infinite", margin: "0 auto 8px" }} /><p style={{ fontSize: "13px", color: "#64748b" }}>Wgrywanie...</p></div>
                          </div>
                        ) : (
                          <img src={photo.src} alt="Podglad" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.currentTarget.src = "https://placehold.co/600x400/png?text=Brak+obrazu"; }} />
                        )}
                        <button
                          onClick={() => removePhoto(photo.id)}
                          style={{ position: "absolute", top: "12px", right: "12px", backgroundColor: "#ef4444", color: "#fff", padding: "8px", borderRadius: "50%", border: "none", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.3)", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}
                          title="Usun zdjecie"
                        >
                          <Trash2 style={{ width: "16px", height: "16px" }} />
                        </button>
                        <button
                          onClick={() => { setActivePhotoId(photo.id); fileInputRef.current?.click(); }}
                          style={{ position: "absolute", bottom: "12px", right: "12px", backgroundColor: "rgba(48,50,73,0.85)", color: "#fff", padding: "8px", borderRadius: "50%", border: "none", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.3)", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}
                          title="Zmien zdjecie"
                        >
                          <Upload style={{ width: "16px", height: "16px" }} />
                        </button>
                        <div style={{ position: "absolute", top: "12px", left: "12px", backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", color: "#fff", padding: "4px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 700 }}>#{index + 1}</div>
                      </div>
                      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
                        <div>
                          <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#64748b", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Tytul obrazka</label>
                          <input type="text" value={photo.title} onChange={(e) => updateGalleryPhoto(photo.id, "title", e.target.value)} style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px", outline: "none", fontWeight: 500, color: "#111", boxSizing: "border-box" }} placeholder="np. Przestronny salon" />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#64748b", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Wielkosc w siatce</label>
                          <select value={photo.className} onChange={(e) => updateGalleryPhoto(photo.id, "className", e.target.value)} style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px", outline: "none", backgroundColor: "#fff", color: "#475569", boxSizing: "border-box" }}>
                            <option value="md:col-span-1 md:row-span-1">Maly kwadrat (1x1)</option>
                            <option value="md:col-span-2 md:row-span-1">Szeroki (2x1)</option>
                            <option value="md:col-span-1 md:row-span-2">Wysoki pionowy (1x2)</option>
                            <option value="md:col-span-2 md:row-span-2">Duzy wyroZniony (2x2)</option>
                          </select>
                        </div>
                        <div style={{ fontSize: "11px", color: "#94a3b8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: "monospace" }} title={photo.src}>{photo.src.length > 50 ? "..." + photo.src.slice(-47) : photo.src}</div>
                      </div>
                    </div>
                  ))}
                  {gallery.length < 30 && (
                    <button onClick={() => newFileInputRef.current?.click()} disabled={uploadingNew}
                      style={{ aspectRatio: "4/3", backgroundColor: "#fff", border: "2px dashed #cbd5e1", borderRadius: "16px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#94a3b8", gap: "12px", cursor: "pointer", opacity: uploadingNew ? 0.6 : 1, minHeight: "200px" }}>
                      {uploadingNew ? (<><Loader2 style={{ width: "32px", height: "32px", animation: "spin 1s linear infinite" }} /><span style={{ fontWeight: 500 }}>Wgrywanie...</span></>) : (
                        <><div style={{ width: "48px", height: "48px", backgroundColor: "#f8fafc", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}><Upload style={{ width: "24px", height: "24px" }} /></div>
                        <span style={{ fontWeight: 500, fontSize: "14px" }}>Wgraj zdjecie z komputera</span><span style={{ fontSize: "12px", color: "#cbd5e1" }}>JPG, PNG, WebP - maks. 3 MB</span></>
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}