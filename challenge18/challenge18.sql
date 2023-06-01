/* membuat databse university.db */

sqlite3 university.db
CREATE TABLE dosen(nip VARCHAR(3) PRIMARY KEY NOT NULL, namaDosen VARCHAR(100) NOT NULL, alamat text);
CREATE TABLE mahasiswa(nim VARCHAR(3) PRIMARY KEY NOT NULL, nama VARCHAR(100) NOT NULL, tanggalLahir VARCHAR(8) NOT NULL, alamat text NOT NULL, idJurusan VARCHAR(3) NOT NULL, foreign key(idJurusan) references jurusan(idJurusan));
CREATE TABLE jurusan(idJurusan VARCHAR(3) PRIMARY KEY NOT NULL, namaJurusan VARCHAR(100) NOT NULL);
CREATE TABLE mataKuliah(idMataKuliah VARCHAR(3) PRIMARY KEY NOT NULL, namaMataKuliah VARCHAR(100) NOT NULL, sks INTEGER(20));
CREATE TABLE kontrak(idKontrak VARCHAR(4) PRIMARY KEY NOT NULL, nilai VARCHAR(2) NOT NULL, nip VARCHAR(3) NOT NULL, idMataKuliah VARCHAR(3) NOT NULL, nim VARCHAR(3) NOT NULL, foreign key(nip) references dosen(nip), foreign key(nim) references mahasiswa(nim), foreign key(idMataKuliah) references mataKuliah(idMataKuliah));
CREATE TABLE logIN(userName VARCHAR(10) PRIMARY KEY NOT NULL, passWord VARCHAR(10) NOT NULL);

INSERT into dosen (nip, namaDosen, alamat) values ('A01', 'bagus', 'purbalingga'), ('A02', 'abdan', 'semarang'), ('A03', 'ihsan', 'kendari'); 
INSERT into mahasiswa (nim, nama, tanggalLahir, alamat, idJurusan) values ('N01', 'andre', '18-01-2003', 'kalimantan', 'J01'), ('N02', 'iqbal', '23-04-2004', 'bogor', 'J02'), ('N03', 'aidil', '20-11-2003', 'lamongan', 'J03');
INSERT into jurusan (idJurusan, namaJurusan) values ('J01', 'informatika'), ('J02', 'pendidikan'), ('J03', 'teknik'), ('J04', 'sastra');
INSERT into mataKuliah (idMataKuliah, namaMataKuliah, sks) values ('M01', 'sistem operasi', '4'), ('M02', 'rancangan bahasa data', '5'), ('M03', 'analisa proses bisnis', '5'), ('M04', 'algoritma dan struktur data', '4'), ('M05', 'data mining', '3');
INSERT into kontrak(idKontrak, nilai, nip, idMataKuliah, nim) values ('K001', 'A', 'A01', 'M02', 'N01'), ('K002', 'D', 'A02', 'M05', 'N02'), ('K003', 'A', 'A03', 'M03', 'N03'), ('K004', 'B', 'A01', 'M05', 'N03'), ('K005', 'A', 'A02', 'M01', 'N02'), ('K006', 'D', 'A03', 'M02', 'N01'), ('K007', 'E', 'A01', 'M02', 'N01'), ('K008', 'E', 'A01', 'M02', 'N01');
INSERT into logIN(userName, passWord) values ('yurza', 'guardian');