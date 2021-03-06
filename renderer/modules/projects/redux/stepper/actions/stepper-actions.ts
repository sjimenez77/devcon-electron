import { StepAction } from './step-action';
import { ProjectDataAction } from './project-data-action';
import { InstallModulesAction } from './install-modules-action';
import { CreateProjectAction } from './create-project-action';

export type StepperActions =
  | StepAction
  | ProjectDataAction
  | InstallModulesAction
  | CreateProjectAction;
