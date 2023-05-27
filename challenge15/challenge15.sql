/* membuat databse university.db */

sqlite3 university.db
CREATE TABLE dosen(nip VARCHAR(3) PRIMARY KEY NOT NULL, namaDosen VARCHAR(100) NOT NULL, alamat text);
CREATE TABLE mahasiswa(nim VARCHAR(3) PRIMARY KEY NOT NULL, nama VARCHAR(100) NOT NULL, umur VARCHAR(2) NOT NULL, alamat text NOT NULL, idJurusan VARCHAR(3) NOT NULL, foreign key(idJurusan) references jurusan(idJurusan));
CREATE TABLE jurusan(idJurusan VARCHAR(3) PRIMARY KEY NOT NULL, namaJurusan VARCHAR(100) NOT NULL);
CREATE TABLE mataKuliah(idMataKuliah VARCHAR(3) PRIMARY KEY NOT NULL, namaMataKuliah VARCHAR(100) NOT NULL, sks INTEGER(20));
CREATE TABLE kontrak(idKontrak VARCHAR(4) PRIMARY KEY NOT NULL, nilai VARCHAR(2) NOT NULL, nip VARCHAR(3) NOT NULL, idMataKuliah VARCHAR(3) NOT NULL, nim VARCHAR(3) NOT NULL, foreign key(nip) references dosen(nip), foreign key(nim) references mahasiswa(nim), foreign key(idMataKuliah) references mataKuliah(idMataKuliah));

INSERT into dosen (nip, namaDosen, alamat) values ('A01', 'bagus', 'purbalingga'), ('A02', 'abdan', 'semarang'), ('A03', 'ihsan', 'kendari'); 
INSERT into mahasiswa (nim, nama, umur, alamat, idJurusan) values ('N01', 'andre', '18', 'kalimantan', 'J01'), ('N02', 'iqbal', '23', 'bogor', 'J02'), ('N03', 'aidil', '20', 'lamongan', 'J03');
INSERT into jurusan (idJurusan, namaJurusan) values ('J01', 'informatika'), ('J02', 'pendidikan'), ('J03', 'teknik'), ('J04', 'sastra');
INSERT into mataKuliah (idMataKuliah, namaMataKuliah, sks) values ('M01', 'sistem operasi', '9'), ('M02', 'rancangan bahasa data', '12'), ('M03', 'analisa proses bisnis', '13'), ('M04', 'algoritma dan struktur data', '9'), ('M05', 'data mining', '8');
INSERT into kontrak(idKontrak, nilai, nip, idMataKuliah, nim) values ('K001', 'A', 'A01', 'M02', 'N01'), ('K002', 'D', 'A02', 'M05', 'N02'), ('K003', 'A', 'A03', 'M03', 'N03');
INSERT into kontrak(idKontrak, nilai, nip, idMataKuliah, nim) values ('K004', 'B', 'A01', 'M05', 'N03'), ('K005', 'A', 'A02', 'M01', 'N02'), ('K006', 'D', 'A03', 'M02', 'N01');

/* query sql */

/* 1. tampilkan mahasiswa dan nama jurusan */
SELECT * FROM mahasiswa JOIN jurusan using(idJurusan);

/* 2. tampilkan mahasiswa dibawah umur 20 tahun */
SELECT * FROM mahasiswa where umur < 20;

/* 3. tampilkan mahasiswa yang nilai 'B' ke atas */
SELECT nama, nilai 
FROM mahasiswa 
JOIN kontrak on mahasiswa.nim = kontrak.nim 
where nilai in ('A', 'B');

/* 4. tampilkan mahasiswa yang memiliki sks di atas 10 */
SELECT idkontrak, nama, sks 
FROM kontrak 
INNER JOIN mataKuliah on mataKuliah.idMataKuliah = kontrak.idMataKuliah 
INNER JOIN mahasiswa on mahasiswa.nim = kontrak.nim where sks > 10;

/* 5. tampilkan mahasiswa yang mengontrak mata kuliah data mining */
SELECT idkontrak, nama, namaMataKuliah 
FROM kontrak INNER JOIN mataKuliah on mataKuliah.idMataKuliah = kontrak.idMataKuliah 
INNER JOIN mahasiswa on mahasiswa.nim = kontrak.nim where namaMataKuliah = 'data mining';

/* 6. tampilkan jumlah mahasiswa untuk setiap dosen */
SELECT dosen.namaDosen AS nama_dosen, COUNT(kontrak.nim) AS jumlah_mahasiswa
FROM kontrak
JOIN dosen ON kontrak.nip = dosen.nip
GROUP BY dosen.namaDosen;

/* 7. urutkan mahasiswa berdasarkan umurnya */
SELECT nama, umur
FROM mahasiswa
ORDER BY umur;

/* 8. tampilkan kontrak mata kuliah 'D' dan 'E' serta tampilkan data nama jurusan dan nama dosen */
SELECT mahasiswa.nama AS nama_mahasiswa, dosen.namaDosen AS nama_dosen, kontrak.nilai, jurusan.namajurusan AS nama_jurusan
FROM kontrak 
JOIN mahasiswa ON kontrak.nim = mahasiswa.nim
JOIN dosen ON kontrak.nip = dosen.nip
JOIN jurusan ON mahasiswa.idJurusan = jurusan.idJurusan
WHERE kontrak.nilai IN ('C', 'D');