sqlite3 university.db
create table dosen(nip varchar(3) primary key not null, name varchar(100) not null, alamat text);
create table mahasiswa(nim varchar(3) primary key not null, nama varchar(100) not null, alamat text not null, idJurusan varchar(3) not null, foreign key(idJurusan) references jurusan(idJurusan));
create table jurusan(idJurusan varchar(3) primary key not null, namaJurusan varchar(100) not null);
create table mataKuliah(idMataKuliah varchar(3) primary key not null, namaMataKuliah varchar(100) not null, sks INTEGER(20));
   
