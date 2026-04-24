import React, { useEffect, useState } from "react";
import "./App.css";
import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function App() {
  // === INITIAL DATA ===
  const initialData = [
    [
      { text: "Bahasa Indonesia", color: "#eaff00" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#12dce8" }
    ],
    [
      { text: "Kecakapan Pribadi", color: "#eaff00" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "-", color: "#12dce8" }
    ],
    [
      { text: "PKTI", color: "#eaff00" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#12dce8" }
    ],
    [
      { text: "E-business", color: "#eaff00" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#12dce8" }
    ],
    [
      { text: "Statkom", color: "#eaff00" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#12dce8" }
    ],
    [
      { text: "MPSI", color: "#eaff00" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#12dce8" }
    ],
    [
      { text: "Pemrograman Mobile", color: "#eaff00" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#12dce8" }
    ],
    [
      { text: "Pemrograman Web", color: "#eaff00" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#ffffff" },
      { text: "", color: "#12dce8" }
    ]
  ];

  // === STATE ===
  const [data, setData] = useState(initialData);
  const [selectedCell, setSelectedCell] = useState(null);

  // === LOAD DATA DARI FIRESTORE ===
  useEffect(() => {
    const loadData = async () => {
      const docRef = doc(db, "tugas", "global");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data().data);
      }
    };

    loadData();
  }, []);

  // === SIMPAN DATA KE FIRESTORE ===
  useEffect(() => {
    const saveData = async () => {
      await setDoc(doc(db, "tugas", "global"), {
        data: data
      });
    };

    if (data.length > 0) saveData();
  }, [data]);

  // === UPDATE CELL ===
  const updateCell = (field, value) => {
    if (!selectedCell) return;

    const updated = [...data];
    const { row, col } = selectedCell;

    updated[row][col] = {
      ...updated[row][col],
      [field]: value
    };

    setData(updated);
  };

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

  const selected =
    selectedCell !== null
      ? data[selectedCell.row][selectedCell.col]
      : null;

  // === RENDER ===
  return (
    <div className="container">
      <h1>TUGAS MATA KULIAH SEM 4</h1>

      {selected && (
        <div className="editor-panel">
          <strong>Edit Cell</strong>

          <input
            type="text"
            value={selected.text}
            onChange={(e) => updateCell("text", e.target.value)}
            placeholder="Isi teks..."
          />

          <input
            type="color"
            value={selected.color}
            onChange={(e) => updateCell("color", e.target.value)}
          />

          <button onClick={() => setSelectedCell(null)}>Tutup</button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  onClick={() =>
                    setSelectedCell({ row: rowIndex, col: colIndex })
                  }
                  style={{ backgroundColor: cell.color }}
                  className={
                    selectedCell?.row === rowIndex &&
                    selectedCell?.col === colIndex
                      ? "selected"
                      : ""
                  }
                >
                  {cell.text}
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