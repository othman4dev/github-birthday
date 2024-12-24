#!/usr/bin/env node

// Othman4dev © 2024, All rights reserved.

// GitHub-Birthday - A tool to generate a commit on a specified day, your birthday.

// Import required modules
import chalk from "chalk";
import { execSync } from "child_process";
import readline from "readline";
import dayjs from "dayjs";

// Setup user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let authorName = "";
let authorEmail = "";

// Show about information
function showAbout() {
  const art = `
 ██████  ██ ████████ ██   ██ ██    ██ ██████        ██████  ██ ██████  ████████ ██   ██ ██████   █████  ██    ██ 
██       ██    ██    ██   ██ ██    ██ ██   ██       ██   ██ ██ ██   ██    ██    ██   ██ ██   ██ ██   ██  ██  ██  
██   ███ ██    ██    ███████ ██    ██ ██████  █████ ██████  ██ ██████     ██    ███████ ██   ██ ███████   ████   
██    ██ ██    ██    ██   ██ ██    ██ ██   ██       ██   ██ ██ ██   ██    ██    ██   ██ ██   ██ ██   ██    ██    
 ██████  ██    ██    ██   ██  ██████  ██████        ██████  ██ ██   ██    ██    ██   ██ ██████  ██   ██    ██    
                                                                                                                 
`;
  console.log(chalk.magenta(art));
  console.log(
    chalk.italic.magenta(
      "GitHub-Birthday - A tool to generate a commit on a specified day, your birthday.\n"
    )
  );
  console.log(chalk.italic.magenta(`Version: 1.2.0\n`));
  console.log(chalk.bold.bgMagenta("Author: Othman4dev © \n"));
}

// Ask user for input
function askQuestion(query) {
  return new Promise((resolve) => {
    const coloredQuery = chalk.magenta(query);
    rl.question(coloredQuery, resolve);
  });
}

// Make a commit with a specific date and message
function makeCommit(commitDate, commitMessage) {
  execSync("git add .", { stdio: "pipe" });

  const statusOutput = execSync("git status --porcelain", {
    encoding: "utf-8",
  });
  if (statusOutput.trim() === "") {
    console.log(chalk.yellow("No changes to commit."));
    return false;
  }

  if (process.platform === "win32") {
    execSync(
      `set GIT_AUTHOR_NAME="${authorName}" && set GIT_AUTHOR_EMAIL="${authorEmail}" && set GIT_COMMITTER_NAME="${authorName}" && set GIT_COMMITTER_EMAIL="${authorEmail}" && git commit -m "${commitMessage}" --date="${commitDate}"`,
      { stdio: "pipe" }
    );
  } else {
    execSync(
      `GIT_AUTHOR_NAME="${authorName}" GIT_AUTHOR_EMAIL="${authorEmail}" GIT_COMMITTER_NAME="${authorName}" GIT_COMMITTER_EMAIL="${authorEmail}" git commit -m "${commitMessage}" --date="${commitDate}"`,
      { stdio: "pipe" }
    );
  }

  return true;
}

// Validate date input
function validateDate(date) {
  const today = dayjs();
  const inputDate = dayjs(date);
  if (inputDate.isAfter(today)) {
    throw new Error("\nDate cannot be in the future 🚫.\n");
  }
  return inputDate.format("YYYY-MM-DD");
}

// Validate username
function validateUsername(username) {
  if (!username) {
    throw new Error("Username cannot be empty 🚫.");
  } else if (username.includes(" ")) {
    throw new Error("Username cannot contain spaces 🚫.");
  } else if (username.length > 39) {
    throw new Error("Username is too long.");
  }
}

// Validate email
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    throw new Error("Email cannot be empty 🚫.");
  } else if (!emailRegex.test(email)) {
    throw new Error("Invalid email format 🚫.");
  } else if (email.length > 254) {
    throw new Error("Email is too long 🚫.");
  }
}

// Main function
async function main() {
  showAbout();

  try {
    console.log(
      chalk.magenta(`
        ░█    ░█▀▀▀█ ░█▀▀█ ▀█▀ ░█▄ ░█ 
        ░█    ░█  ░█ ░█ ▄▄ ░█  ░█░█░█ 
        ░█▄▄█ ░█▄▄▄█ ░█▄▄█ ▄█▄ ░█  ▀█

    If your login credentials are not correct, you will not be able to push commits to your repository.`)
    );

    authorName = await askQuestion("\n▻ Enter your username on GitHub: ");
    validateUsername(authorName);

    authorEmail = await askQuestion(
      "\n▻ Enter the email address associated with your account: "
    );
    validateEmail(authorEmail);

    const startDateInput = await askQuestion("\n▻ Enter your birthday: ");
    const startDate = validateDate(startDateInput);

    const commitText = await askQuestion("\n▻ Enter the commit message: ");

    const autoPushChoice =
      (await askQuestion(
        "\n▻ Do you want to automatically push the generated commit to your repository? (yes/no): "
      )) || "yes";

    process.stdout.write("\x1Bc");

    console.log(
      chalk.blueBright(
        `\n▻ Generating commit on ${startDate} with commit message: ${commitText} ♾️ \n`
      )
    );

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });

    makeCommit(startDate, commitText);

    process.stdout.write("\x1Bc");

    if (
      autoPushChoice.toLowerCase() === "yes" ||
      autoPushChoice.toLowerCase() === "y"
    ) {
      execSync(`git push origin main`);
      console.log(
        chalk.green("\n▻ Commits successfully pushed to your repository ☑")
      );
    } else {
      console.log(
        chalk.yellowBright(
          "▻ Commits were generated ☑, but not pushed !. You can push manually later by running: \n--\n\tgit push\n--"
        )
      );
    }
  } catch (error) {
    console.error(chalk.red(error.message));
  } finally {
    console.log(chalk.magenta("\n▻ Thank you for using GitHub-Birthday! 🚀"));
    console.log(chalk.magenta("\n▻ Follow me on GitHub:"));
    console.log(
      chalk.magenta(`
        
        █▀▀█ ▀▀█▀▀ █░░█ █▀▄▀█ █▀▀█ █▀▀▄ ░█▀█░ █▀▀▄ █▀▀ ▀█░█▀ 
        █░░█ ░░█░░ █▀▀█ █░▀░█ █▄▄█ █░░█ █▄▄█▄ █░░█ █▀▀ ░█▄█░ 
        ▀▀▀▀ ░░▀░░ ▀░░▀ ▀░░░▀ ▀░░▀ ▀░░▀ ░░░█░ ▀▀▀░ ▀▀▀ ░░▀░░\n\n`)
    );

    rl.close();
  }
}

main();
