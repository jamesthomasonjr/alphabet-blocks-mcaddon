import { argv, parallel, series, task } from 'just-scripts';
import {
  CopyTaskParameters,
  cleanTask,
  cleanCollateralTask,
  copyTask,
  coreLint,
  mcaddonTask,
  setupEnvironment,
  ZipTaskParameters,
  STANDARD_CLEAN_PATHS,
  DEFAULT_CLEAN_DIRECTORIES,
  getOrThrowFromProcess,
  watchTask,
} from '@minecraft/core-build-tasks';
import { buildBlocks } from './tasks/build-blocks';
import path from 'path';

// Setup env variables
setupEnvironment(path.resolve(__dirname, '.env'));
const projectName = getOrThrowFromProcess('PROJECT_NAME');

const copyTaskOptions: CopyTaskParameters = {
  copyToBehaviorPacks: [`./behavior_packs/${projectName}`],
  copyToResourcePacks: [`./resource_packs/${projectName}`],
  copyToScripts: [],
};

const mcaddonTaskOptions: ZipTaskParameters = {
  ...copyTaskOptions,
  outputFile: `./dist/packages/${projectName}.mcaddon`,
};

// Lint
task('lint:tasks', coreLint(['tasks/**/*.ts'], argv().fix));
task('lint', series('lint:tasks'));

// Build
task('build:blocks', buildBlocks);
task('build', series('build:blocks'));

// Clean
task('clean:local', cleanTask(DEFAULT_CLEAN_DIRECTORIES));
task('clean:collateral', cleanCollateralTask(STANDARD_CLEAN_PATHS));
task('clean', parallel('clean:local', 'clean:collateral'));

// Dev
task('dev:copy', copyTask(copyTaskOptions));
task('dev', series('clean:collateral', 'dev:copy'));

// Watch
task(
  'watch',
  watchTask(
    ['tasks/**/*.ts'],
    series('clean:local', 'build', 'dev')
  )
);

// Package
task('package:addOnFile', mcaddonTask(mcaddonTaskOptions));
task('package', series('clean:local', 'build', 'package:addOnFile'));
