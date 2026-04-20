const { spawn } = require('child_process');

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const children = [];

function startProcess(command, args, name) {
  const child = spawn(command, args, {
    stdio: 'inherit',
    shell: false,
    env: process.env,
  });

  child.on('exit', (code) => {
    if (code !== null && code !== 0) {
      process.exitCode = code;
    }
    shutdown(child);
  });

  child.on('error', (error) => {
    console.error(`${name} failed to start`, error);
    shutdown(child);
  });

  children.push(child);
}

function shutdown(origin) {
  for (const child of children) {
    if (child !== origin && !child.killed) {
      child.kill();
    }
  }
}

process.on('SIGINT', () => shutdown());
process.on('SIGTERM', () => shutdown());

startProcess('node', ['server/index.js'], 'backend');
startProcess(npmCommand, ['start'], 'frontend');
