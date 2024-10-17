let hutang = JSON.parse(localStorage.getItem("hutang")) || [];

// Fungsi untuk menyimpan data hutang ke localStorage
function simpanHutangKeLocalStorage() {
  localStorage.setItem("hutang", JSON.stringify(hutang));
}

// Fungsi untuk menampilkan hutang ke tabel berdasarkan kategori
function tampilkanHutang() {
  const tabelHutangBesarBody = document.querySelector(
    "#tabelHutangBesar tbody"
  );
  const tabelHutangSedangBody = document.querySelector(
    "#tabelHutangSedang tbody"
  );
  const tabelHutangKecilBody = document.querySelector(
    "#tabelHutangKecil tbody"
  );

  // Kosongkan isi tabel sebelum ditambahkan data baru
  tabelHutangBesarBody.innerHTML = "";
  tabelHutangSedangBody.innerHTML = "";
  tabelHutangKecilBody.innerHTML = "";

  hutang.forEach((item, index) => {
    const baris = document.createElement("tr");
    baris.innerHTML = `
            <td>${item.nama}</td>
            <td>${item.jumlah}</td>
            <td>${item.tanggal}</td>
            <td>${item.dibayar ? "Sudah Dibayar" : "Belum Dibayar"}</td>
            <td>
                <button class="${item.dibayar ? "unmark-paid" : "mark-paid"}" 
                        onclick="${
                          item.dibayar
                            ? `tandaiBelumDibayar(${index})`
                            : `tandaiSudahDibayar(${index})`
                        }">
                    ${item.dibayar ? "Belum Dibayar" : "Sudah Dibayar"}
                </button>
                <button class="delete" onclick="hapusHutang(${index})">Hapus</button>
            </td>
        `;

    // Tambahkan baris ke tabel berdasarkan kategori hutang
    if (item.kategori === "besar") {
      tabelHutangBesarBody.appendChild(baris);
    } else if (item.kategori === "sedang") {
      tabelHutangSedangBody.appendChild(baris);
    } else if (item.kategori === "kecil") {
      tabelHutangKecilBody.appendChild(baris);
    }
  });
}

// Fungsi untuk menandai hutang sudah dibayar
function tandaiSudahDibayar(index) {
  hutang[index].dibayar = true;
  simpanHutangKeLocalStorage();
  tampilkanHutang();
}

// Fungsi untuk menandai hutang belum dibayar
function tandaiBelumDibayar(index) {
  hutang[index].dibayar = false;
  simpanHutangKeLocalStorage();
  tampilkanHutang();
}

// Fungsi untuk menghapus hutang
function hapusHutang(index) {
  hutang.splice(index, 1);
  simpanHutangKeLocalStorage();
  tampilkanHutang();
}

// Event listener untuk menambah hutang baru
document
  .querySelector("#formHutang")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const namaPenghutang = document.querySelector("#namaPenghutang").value;
    const jumlahHutang = document.querySelector("#jumlahHutang").value;
    const tanggalHutang = document.querySelector("#tanggalHutang").value;
    const catatanHutang = document.querySelector("#catatanHutang").value;
    const kategoriHutang = document.querySelector("#kategoriHutang").value;

    const hutangBaru = {
      nama: namaPenghutang,
      jumlah: jumlahHutang,
      tanggal: tanggalHutang,
      catatan: catatanHutang,
      kategori: kategoriHutang,
      dibayar: false,
    };

    hutang.push(hutangBaru);
    simpanHutangKeLocalStorage();
    tampilkanHutang();

    // Reset form setelah data ditambahkan
    document.querySelector("#formHutang").reset();
  });

// Tampilkan hutang yang sudah ada saat halaman dimuat
tampilkanHutang();
