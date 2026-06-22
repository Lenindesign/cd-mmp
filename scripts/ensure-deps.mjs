import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, '..');
const packageJsonPath = join(repoRoot, 'package.json');
const packageLockPath = join(repoRoot, 'package-lock.json');
const viteBinPath = join(repoRoot, 'node_modules', '.bin', 'vite');
const stateDir = join(repoRoot, 'node_modules', '.cache', 'cd-mmp');
const statePath = join(stateDir, 'install-state.json');

const hashFile = (path) => createHash('sha256').update(readFileSync(path)).digest('hex');

const readState = () => {
  if (!existsSync(statePath)) {
    return null;
  }

  try {
    return JSON.parse(readFileSync(statePath, 'utf8'));
  } catch {
    return null;
  }
};

const writeState = (state) => {
  mkdirSync(stateDir, { recursive: true });
  writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`);
};

const desiredState = {
  node: process.version,
  packageJsonHash: hashFile(packageJsonPath),
  packageLockHash: existsSync(packageLockPath) ? hashFile(packageLockPath) : null,
};

const currentState = readState();
const needsInstall =
  !existsSync(viteBinPath) ||
  currentState?.node !== desiredState.node ||
  currentState?.packageJsonHash !== desiredState.packageJsonHash ||
  currentState?.packageLockHash !== desiredState.packageLockHash;

if (!needsInstall) {
  process.exit(0);
}

console.log('[ensure-deps] Installing dependencies with npm ci...');

const result = spawnSync('npm', ['ci'], {
  cwd: repoRoot,
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

writeState(desiredState);
