
const zodiakData = [
  { nama: "Aries", dari: [3, 21], sampai: [4, 19], cocok: ["Leo", "Sagittarius"] },
  { nama: "Taurus", dari: [4, 20], sampai: [5, 20], cocok: ["Virgo", "Capricorn"] },
  { nama: "Gemini", dari: [5, 21], sampai: [6, 20], cocok: ["Libra", "Aquarius"] },
  { nama: "Cancer", dari: [6, 21], sampai: [7, 22], cocok: ["Scorpio", "Pisces"] },
  { nama: "Leo", dari: [7, 23], sampai: [8, 22], cocok: ["Aries", "Sagittarius"] },
  { nama: "Virgo", dari: [8, 23], sampai: [9, 22], cocok: ["Taurus", "Capricorn"] },
  { nama: "Libra", dari: [9, 23], sampai: [10, 22], cocok: ["Gemini", "Aquarius"] },
  { nama: "Scorpio", dari: [10, 23], sampai: [11, 21], cocok: ["Cancer", "Pisces"] },
  { nama: "Sagittarius", dari: [11, 22], sampai: [12, 21], cocok: ["Leo", "Aries"] },
  { nama: "Capricorn", dari: [12, 22], sampai: [1, 19], cocok: ["Taurus", "Virgo"] },
  { nama: "Aquarius", dari: [1, 20], sampai: [2, 18], cocok: ["Gemini", "Libra"] },
  { nama: "Pisces", dari: [2, 19], sampai: [3, 20], cocok: ["Cancer", "Scorpio"] }
];

const tempatPertemuan = [
  "di perpustakaan", "di kampus", "di konser musik", "di café kecil", "di toko buku", "di pantai saat senja",
  "saat traveling", "di reuni", "di pernikahan teman", "di gunung", "di taman kota", "di Instagram", "saat hujan"
];

const daftarNamaJodoh = [
  "Alya", "Raka", "Nadia", "Rian", "Tiara", "Bayu", "Nino", "Salsa", "Dian", "Farhan",
  "Zahra", "Dimas", "Raisa", "Gilang", "Keyla", "Fikri", "Amel", "Rafi", "Putri", "Reza",
  "Maya", "Iqbal", "Anya", "Arka", "Bella", "Davin", "Cinta", "Yudha", "Fara", "Kinan"
];

function playClick() {
  document.getElementById('clickSound').play();
}

function toggleMusic() {
  const music = document.getElementById('bgMusic');
  music.paused ? music.play() : music.pause();
}

function cariZodiak(bulan, tanggal) {
  for (let z of zodiakData) {
    let [startM, startD] = z.dari;
    let [endM, endD] = z.sampai;
    if (
      (bulan === startM && tanggal >= startD) ||
      (bulan === endM && tanggal <= endD) ||
      (startM > endM && (bulan === startM || bulan === endM))
    ) return z;
  }
  return null;
}

function acak(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function cariJodoh() {
  const nama = document.getElementById('name').value.trim();
  const tgl = new Date(document.getElementById('birthDate').value);
  const hasil = document.getElementById('hasil');

  if (!nama || isNaN(tgl)) {
    hasil.innerHTML = "<p>Isi nama dan tanggal lahir dengan benar!</p>";
    hasil.style.display = 'block';
    return;
  }

  const bulan = tgl.getMonth() + 1;
  const tanggal = tgl.getDate();
  const zodiak = cariZodiak(bulan, tanggal);
  const namaJodoh = nama + " & " + acak(daftarNamaJodoh);
  const tempat = acak(tempatPertemuan);

  const output = `
    <div class="result-card">
      <h2>Zodiak Kamu: ${zodiak.nama}</h2>
      <p>Cocok dengan: ${zodiak.cocok.join(' & ')}</p>
      <p>Nama jodoh kamu: <b>${namaJodoh}</b></p>
      <p>Kamu akan bertemu ${tempat}</p>
    </div>
  `;
  hasil.innerHTML = output;
  hasil.style.display = 'block';

  // simpan riwayat
  let riwayat = JSON.parse(localStorage.getItem("riwayatJodoh") || "[]");
  riwayat.push(`${namaJodoh} (${zodiak.nama}) - ${tempat}`);
  localStorage.setItem("riwayatJodoh", JSON.stringify(riwayat));
  tampilkanRiwayat();
}

function tampilkanRiwayat() {
  const list = document.getElementById("riwayat");
  let riwayat = JSON.parse(localStorage.getItem("riwayatJodoh") || "[]");
  list.innerHTML = "";
  riwayat.slice(-5).reverse().forEach(r => {
    const li = document.createElement("li");
    li.textContent = r;
    list.appendChild(li);
  });
}

window.onload = tampilkanRiwayat;
