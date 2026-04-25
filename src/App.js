// src/App.js
import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import "./App.css";

export default function App() {
  // === Initial Data Flattened ===
  const initialData = [
    {
      matkul: "Bahasa Indonesia",
      week10_text: "",
      week10_color: "#ffffff",
      week11_text: "Review video asal",
      week11_color: "#ccff99",
      week12_text: "foto pribadi",
      week12_color: "#ccff99",
      week13_text: "kertas diskusi",
      week13_color: "#ccff99",
      week14_text: "",
      week14_color: "#ffffff",
      week15_text: "",
      week15_color: "#ffffff",
      week16_text: "",
      week16_color: "#ffffff",
      eas_text: "video ejaan tulisan",
      eas_color: "#12dce8"
    },
    {
      matkul: "Kecakapan Pribadi",
      week10_text: "",
      week10_color: "#ffffff",
      week11_text: "",
      week11_color: "#ffffff",
      week12_text: "dream book",
      week12_color: "#ccff99",
      week13_text: "",
      week13_color: "#ffffff",
      week14_text: "",
      week14_color: "#ffffff",
      week15_text: "",
      week15_color: "#ffffff",
      week16_text: "",
      week16_color: "#ffffff",
      eas_text: "-",
      eas_color: "#12dce8"
    }
    // Tambahkan matkul lain jika perlu
  ];

  const [data, setData] = useState(initialData);
  const [selectedCell, setSelectedCell] = useState(null);

  // Load data dari Firestore
  useEffect(() => {
    const loadData = async () => {
      const docRef = doc(db, "tugas", "global");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data().data);
      } else {
        await setDoc(docRef, { data: initialData });
        setData(initialData);
      }
    };
    loadData();
  }, []);

 useEffect(() => {
  if (data.length === 0) return;

  // Set a timer to save after 2 seconds of inactivity
  const delayDebounceFn = setTimeout(async () => {
    try {
      await setDoc(doc(db, "tugas", "global"), { data });
      console.log("Data saved successfully!");
    } catch (error) {
      console.error("Error saving document: ", error);
    }
  }, 2000); 

  // Cleanup: if data changes again before 2s, cancel the previous timer
  return () => clearTimeout(delayDebounceFn);
}, [data]);

  const headers = [
    "Mata Kuliah",
    "Week 10",
    "Week 11",
    "Week 12",
    "Week 13",
    "Week 14",
    "Week 15",
    "Week 16",
    "EAS"
  ];

  const weekFields = [
    "week10",
    "week11",
    "week12",
    "week13",
    "week14",
    "week15",
    "week16",
    "eas"
  ];

  return (
    <div className="container">
      <h1>TUGAS MATA KULIAH SEM 4</h1>

      {selectedCell && (
        <div className="editor-panel">
          <strong>Edit Cell</strong>
          <input
            type="text"
            value={
              selectedCell.col === "matkul"
                ? data[selectedCell.row].matkul
                : data[selectedCell.row][selectedCell.col + "_text"]
            }
            onChange={(e) => {
              const updated = [...data];
              if (selectedCell.col === "matkul") {
                updated[selectedCell.row].matkul = e.target.value;
              } else {
                updated[selectedCell.row][selectedCell.col + "_text"] =
                  e.target.value;
              }
              setData(updated);
            }}
          />

          {selectedCell.col !== "matkul" && (
            <input
              type="color"
              value={data[selectedCell.row][selectedCell.col + "_color"]}
              onChange={(e) => {
                const updated = [...data];
                updated[selectedCell.row][selectedCell.col + "_color"] =
                  e.target.value;
                setData(updated);
              }}
            />
          )}

          <button onClick={() => setSelectedCell(null)}>Tutup</button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {/* Mata Kuliah */}
              <td
                style={{ backgroundColor: "#eaff00" }}
                onClick={() =>
                  setSelectedCell({ row: rowIndex, col: "matkul" })
                }
              >
                {row.matkul}
              </td>

              {/* Weeks */}
              {weekFields.map((wk) => (
                <td
                  key={wk}
                  style={{ backgroundColor: row[wk + "_color"] }}
                  onClick={() =>
                    setSelectedCell({ row: rowIndex, col: wk })
                  }
                >
                  {row[wk + "_text"]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="hint">Klik 1x cell untuk edit teks dan warna.</p>
    </div>
  );
}