sqlite3 university.db
create table dosen(nip varchar(3) primary key not null, name varchar(100) not null, alamat text);
create table mahasiswa(nim varchar(3) primary key not null, nama varchar(100) not null, alamat text not null, idJurusan varchar(3) not null, foreign key(idJurusan) references jurusan(idJurusan));
create table jurusan(idJurusan varchar(3) primary key not null, namaJurusan varchar(100) not null);
create table mataKuliah(idMataKuliah varchar(3) primary key not null, namaMataKuliah varchar(100) not null, sks INTEGER(20));
create table kontrak(idKontrak varchar(4) primary key not null, nip varchar(3) not null, idMataKuliah varchar(3) not null, nim varchar(3) not null, foreign key(nip) references dosen(nip), foreign key(nim) references mahasiswa(nim), foreign key(idMataKuliah) references mataKuliah(idMataKuliah));
