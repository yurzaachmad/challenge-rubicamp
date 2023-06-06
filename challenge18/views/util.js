import readline from "readline";
import sqlite3 from "sqlite3";

export let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
export let db = new sqlite3.Database("../university.db");

export function printPembatas() {
  console.log("===============================================");
}

export function Awal() {
  printPembatas();
  console.log("Welcome to Universitas Pendidikan Indonesia");
  console.log("Jl. Dr. Setiabudi no. 255");
  printPembatas();
}
