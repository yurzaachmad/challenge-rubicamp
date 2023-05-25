sqlite3 university.db
create table dosen(nip varchar(3) primary key not null, name varchar(100) not null, alamat text);
create table mahasiswa(nim varchar(3) primary key not null, nama varchar(100) not null, alamat text not null, idJurusan varchar(3) not null, foreign key(idJurusan) references jurusan(idJurusan));
create table jurusan(idJurusan varchar(3) primary key not null, namaJurusan varchar(100) not null);
create table mataKuliah(idMataKuliah varchar(3) primary key not null, namaMataKuliah varchar(100) not null, sks INTEGER(20));
create table kontrak(idKontrak varchar(4) primary key not null, nip varchar(3) not null, idMataKuliah varchar(3) not null, nim varchar(3) not null, foreign key(nip) references dosen(nip), foreign key(nim) references mahasiswa(nim), foreign key(idMataKuliah) references mataKuliah(idMataKuliah));

insert into dosen (nip, name, alamat) values ('A01', 'bagus', 'purbalingga'), ('A02', 'abdan', 'semarang'), ('A03', 'ihsan', 'kendari'); 
insert into mahasiswa (nim, nama, alamat, idJurusan) values ('N01', 'andre', 'kalimantan', 'pendidikan'), ('N02', 'iqbal', 'bogor', 'sastra'), ('N03', 'aidil', 'lamongan', 'informatika');
insert into jurusan (idJurusan, namaJurusan) values ('J01', 'informatika'), ('J02', 'pendidikan'), ('J03', 'teknik'), ('J04', 'sastra');
insert into mataKuliah (idMataKuliah, namaMataKuliah, sks) values ('M01', 'sistem operasi', '3'), ('M02', 'rancangan bahasa data', '4'), ('M03', 'analisa proses bisnis', '2'), ('M04', 'algoritma dan struktur data', '4');
insert into kontrak(idKontrak, nip, idMataKuliah, nim) values ('K001', 'A01', 'M01', 'N01'), ('K002', 'A02', 'M02', 'N02'), ('K003', 'A03', 'M04', 'N03');
insert into kontrak(idKontrak, nip, idMataKuliah, nim) values ('K004', 'A01', 'M03', 'N03'), ('K005', 'A02', 'M01', 'N02');