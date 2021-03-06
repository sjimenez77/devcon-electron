import * as React from 'react';
import { StepperActions } from './actions/stepper-actions';
import { updateProjectDataState } from './utils/utils';
import { ProjectData } from './project-data.model';

export interface StepperState {
  activeStep: number;
  creatingProject: boolean;
  install: {
    loading: boolean;
    success: boolean;
  };
  create: {
    loading: boolean;
    success: boolean;
  };
  projectData: ProjectData;
  accessibility: boolean;
}

const getInitialState = () => ({
  activeStep: 0,
  creatingProject: false,
  install: {
    loading: false,
    success: false,
  },
  create: {
    loading: false,
    success: false,
  },
  projectData: {
    name: '',
    type: '',
    path: '',
    specificArgs: {},
  },
  accessibility: false,
});

const reducer = (
  state: StepperState = getInitialState(),
  action: StepperActions
) => {
  switch (action.type) {
    case 'SET_CREATING_PROJECT': {
      return { ...state, creatingProject: true };
    }
    case 'SET_PROJECT_DATA': {
      return updateProjectDataState(state, action.payload.projectData);
    }

    case 'SET_INSTALL_MODULES': {
      return {
        ...state,
        install: {
          ...state.install,
          ...action.payload.install,
        },
      };
    }

    case 'SET_CREATE_PROJECT': {
      return {
        ...state,
        create: {
          ...state.create,
          ...action.payload.create,
        },
      };
    }

    case 'NEXT_STEP': {
      return { ...state, activeStep: state.activeStep + 1 };
    }

    case 'PREVIOUS_STEP': {
      return { ...state, activeStep: state.activeStep - 1 };
    }

    case 'RESET_STEP': {
      return { ...state, activeStep: 0 };
    }

    case 'RESET_STEPPER': {
      const projectData = { ...state.projectData };
      projectData.path = state.projectData.path;
      return { ...getInitialState(), projectData: projectData };
    }

    case 'ACCESSIBILITY': {
      return { ...state, accessibility: true };
    }

    case 'RESET_ACCESSIBILITY': {
      return { ...state, accessibility: false };
    }

    default:
      throw new Error('Unknown action');
  }
};

export interface IStepperContext {
  state: StepperState;
  dispatch: (action: StepperActions) => void;
}

export const StepperContext = React.createContext<IStepperContext>({
  state: getInitialState(),
  dispatch: () => null,
});
export const StepperConsumer = StepperContext.Consumer;

interface StepperProviderProps {
  children: JSX.Element;
  initialState?: StepperState;
}

export function StepperProvider(props: StepperProviderProps): JSX.Element {
  const [state, dispatch] = React.useReducer(reducer, getInitialState());
  const value = { state, dispatch };
  return (
    <StepperContext.Provider value={value}>
      {props.children}
    </StepperContext.Provider>
  );
}
