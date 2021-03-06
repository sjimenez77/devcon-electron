const EXECUTION_CONTANTS = {
  PROJECT_CREATION_INFO: {
    projectCreation: 'Project Creation',
    inProgress: 'In Progress...',
    success: 'Successfully Created',
    error:
      'Error Occurred while creating a project. Sorry for the inconvenience.',
  },
  INSTALLATION_MESSAGES: {
    setUp: 'Setup Installation',
    success: 'Installation Completed',
    error: 'Something went wrong. Sorry for inconvenience',
    install_packages:
      'Do you want to install Packages? (Click "Proceed" to continue)',
  },
  success: 'success',
  error: 'error',
  java: 'java',
  installation: 'installation',
  projectCreation: 'projectCreation',
  process_details: 'process-details',
  retry: 'Retry',
  back: 'Back',
  finish: 'Finish',
  cancel: 'CANCEL',
  proceed: 'PROCEED',
  start: 'start',
};

export default EXECUTION_CONTANTS;

export function projectCreationProgress(
  loading: boolean,
  success: boolean
): string {
  if (loading) {
    return EXECUTION_CONTANTS.PROJECT_CREATION_INFO.inProgress;
  }

  if (success) {
    return EXECUTION_CONTANTS.PROJECT_CREATION_INFO.success;
  }

  return EXECUTION_CONTANTS.PROJECT_CREATION_INFO.error;
}
