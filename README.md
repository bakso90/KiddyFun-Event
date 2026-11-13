# KiddyFun — Kids Event & Entertainment Website

Website front-end untuk pengguna yang ingin mencari dan mendaftar event atau hiburan anak. Tampilan menggunakan tema sage green, cream, foto besar, rounded cards, dan layout responsif yang terinspirasi dari referensi desain.

## Cara Menjalankan

1. Buka folder `KiddyFun-Kayla` di VS Code.
2. Klik kanan `index.html` → **Open with Live Server**.
3. Bisa juga letakkan folder di `C:\xampp\htdocs\` lalu buka `http://localhost:8080/KiddyFun-Kayla/` (sesuaikan port Apache jika berbeda).

## Fitur Sisi User

- Home / landing page
- Pencarian dan filter kategori event
- Kartu event dengan tanggal, lokasi, harga, usia, dan kuota dummy
- Form pendaftaran anak
- My Tickets untuk melihat tiket yang didaftarkan
- Data pendaftaran tersimpan di `localStorage` browser

## Funnel dan Rumus

Tahapan funnel:

1. Pengunjung website
2. Melihat detail event
3. Memulai pendaftaran
4. Pendaftaran berhasil
5. Hadir di event (angka hadir merupakan data simulasi)

Conversion rate per tahap:

`(jumlah tahap sekarang / jumlah tahap sebelumnya) x 100%`

Drop-off rate:

`100% - conversion rate`

Overall conversion / yield:

`(jumlah hadir / jumlah pengunjung website) x 100%`

Angka awal adalah data dummy: 1.250 pengunjung, 820 melihat detail event, 460 memulai pendaftaran, 320 berhasil mendaftar, dan 198 hadir. Ketika pengguna membuka detail dan menyelesaikan pendaftaran, angka funnel diperbarui otomatis. Data disimpan lokal di browser melalui `localStorage`.

## Catatan

- Website ini adalah prototype front-end. Belum memakai database/server, pembayaran, email konfirmasi, atau autentikasi akun sungguhan.
- Form pendaftaran hanya simulasi. Jangan masukkan data pribadi asli.
- Foto menggunakan URL gambar Unsplash sehingga perlu koneksi internet. Ganti URL gambar pada array `events` di `js/main.js` jika ingin memakai foto sendiri.
- Semua event, harga, kuota, dan angka funnel merupakan data dummy untuk kebutuhan tugas.
