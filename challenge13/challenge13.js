const fs = require("fs");
const process = require("process");
const { argv } = require("process");
const data = fs.readFileSync("todo.json", "utf8");
let file = JSON.parse(fs.readFileSync("todo.json", "utf8"));
const readline = require("node:readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// const argument = process.argv[2];

const argv2 = process.argv[2];
const index = process.argv[3];
const filter = process.argv[2];

const args = process.argv;
let sentences = args.splice(3, argv.length);
let words = sentences.join(" ");
let tags = sentences.slice(1, sentences.length);
let n = sentences[0];
switch (argv2) {
  case undefined:
    console.log(`>>> JS TODO <<<
    $ node challenge13.js <command>
    $ node challenge13.js list
    $ node challenge13.js task <task_id>
    $ node challenge13.js add <task-content>
    $ node challenge13.js delete <task_id>
    $ node challenge13.js complete <task_id>
    $ node challenge13.js uncomplete <task_id>
    $ node challenge13.js list:outstanding asc|desc
    $ node challenge13.js list:completed asc|desc
    $ node challenge13.js tag <task_id> <tag_name_1> <tag_name2>...<tag_name_N>
    $ node challenge13.js filter:<tag_name>`);
    rl.close();
    break;
  case "list":
    for (let i = 0; i < file.length; i++) {
      if (file[i].complete == true) {
        console.log(`${i + 1}. [X] ${file[i].todo}`);
      } else {
        console.log(`${i + 1}. [ ] ${file[i].todo}`);
      }
    }
    rl.close();
    break;
  case "delete":
    console.log(`"${file[index - 1].todo}" telah dihapus dari daftar`);
    file.splice(index - 1, 1);
    const jsonData = JSON.stringify(file);
    fs.writeFileSync("todo.json", jsonData, "utf8", function (err) {
      if (err) {
        return console.log(err);
      }
    });
    rl.close();
    break;
  case "add":
    file.push({
      todo: words,
      complete: false,
      tag: "",
    });
    const jsonContent = JSON.stringify(file);
    fs.writeFile("todo.json", jsonContent, "utf8", function (err) {
      if (err) {
        return console.log(err);
      }
    });
    console.log(`"${sentences.join(" ")}" telah ditambahkan`);
    rl.close();
    break;
  case "complete":
    console.log(`"${file[index - 1].todo}" telah selesai`);
    file[index - 1].complete = true;
    const jsonDdata = JSON.stringify(file);
    fs.writeFileSync("todo.json", jsonDdata, "utf8", function (err) {
      if (err) {
        return console.log(err);
      }
    });
    rl.close();
    break;
  case "uncomplete":
    console.log(`"${file[index - 1].todo}" telah dibatalkan`);
    file[index - 1].complete = false;
    const jsonDdataa = JSON.stringify(file);
    fs.writeFileSync("todo.json", jsonDdataa, "utf8", function (err) {
      if (err) {
        return console.log(err);
      }
    });
    rl.close();
    break;
  case "list:outstanding":
    if (index === "desc") {
      for (let i = file.length - 1; i >= 0; i--) {
        if (file[i].complete === false) {
          console.log(`${i + 1}. [ ] ${file[i].todo}`);
        }
      }
      rl.close();
      break;
    }

  case "list:outstanding":
    if (index === "asc") {
      for (let i = 0; i < file.length; i++) {
        if (file[i].complete === false) {
          console.log(`${i + 1}. [ ] ${file[i].todo}`);
        }
      }
      rl.close();
      break;
    }
  case "list:completed":
    if (index === "desc") {
      for (let i = file.length - 1; i >= 0; i--) {
        if (file[i].complete === true) {
          console.log(`${i + 1}. [X] ${file[i].todo}`);
        }
      }
      rl.close();
      break;
    }

  case "list:completed":
    if (index === "asc") {
      for (let i = 0; i < file.length; i++) {
        if (file[i].complete === true) {
          console.log(`${i + 1}. [X] ${file[i].todo}`);
        }
      }
      rl.close();
      break;
    }
  case "task":
    for (let i = 0; i < file.length; i++) {
      if ([i + 1] == index) {
        console.log(
          `${i + 1}. ${file[i].complete ? "[X]" : "[ ]"} ${file[i].todo}`
        );
      }
    }
    rl.close();
    break;
  case "tag":
    console.log(
      `Tag '${tags}' telah di tambahkan ke daftar "${file[index - 1].todo}"`
    );
    file[index - 1].tag = tags;
    const jsonnDdata = JSON.stringify(file);
    fs.writeFileSync("todo.json", jsonnDdata, "utf8", function (err) {
      if (err) {
        return console.log(err);
      }
    });
    rl.close();
    break;
  case "help":
    console.log(`>>> JS TODO <<<
  $ node challenge13.js <command>
  $ node challenge13.js list
  $ node challenge13.js task <task_id>
  $ node challenge13.js add <task-content>
  $ node challenge13.js delete <task_id>
  $ node challenge13.js complete <task_id>
  $ node challenge13.js uncomplete <task_id>
  $ node challenge13.js list:outstanding asc|desc
  $ node challenge13.js list:completed asc|desc
  $ node challenge13.js tag <task_id> <tag_name_1> <tag_name2>...<tag_name_N>
  $ node challenge13.js filter:<tag_name>`);
    rl.close();
    break;
  case filter:
    const kata = filter.split(":")[1];
    for (let i = 0; i < file.length; i++) {
      if (file[i].tag.toString().includes(kata) == true) {
        console.log(
          `${i + 1}. ${file[i].complete ? "[X]" : "[ ]"} ${file[i].todo}`
        );
      }
    }
    rl.close();
    break;
}
rl.on("close", () => {
  process.exit(0);
});
