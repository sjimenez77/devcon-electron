import { useState, useEffect } from 'react';
import { IpcRendererEvent } from 'electron';
import NextLink from '../../modules/shared/components/nextjs-link/NextLink';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDashboardProjectsStyles } from './dashboard-projects.styles';
import { ProjectDetails } from '../../modules/projects/redux/data.model';

export default function DashboardProjects(props: {
  projects: ProjectDetails[];
}): JSX.Element {
  const classes = useDashboardProjectsStyles({});

  const initialState = {
    mouseX: null,
    mouseY: null,
    project: {
      name: '',
      domain: '',
      date: '',
      path: '',
    },
  };
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<{
    mouseX: null | number;
    mouseY: null | number;
    project: ProjectDetails;
  }>(initialState);

  useEffect(() => {
    global.ipcRenderer.on(
      'open:projectInIde',
      (
        _: IpcRendererEvent,
        data: {
          stdout: string;
          stderr: string;
        }
      ) => {
        console.log('I am -> ', data);
        setOpen(false);
      }
    );
    return () => {
      global.ipcRenderer.removeAllListeners('open:projectInIde');
    };
  }, []);

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement>,
    project: ProjectDetails
  ) => {
    event.preventDefault();
    setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
      project: project,
    });
  };

  const handleClose = () => {
    setState(initialState);
  };

  const openProjectInIde = () => {
    setState(initialState);
    setOpen(true);
    global.ipcRenderer.send('open:projectInIde', state.project);
  };

  return (
    <div className={classes.root}>
      <Grid item xs={12} className={classes.header}>
        <h2>{`${props.projects.length} Projects`}</h2>
        <div className="search">
          <TextField id="outlined-basic" label="Search" variant="outlined" />
        </div>
      </Grid>
      <Grid item xs={6} md={4} lg={3}>
        <NextLink href="/start" className={classes.link}>
          <Card className={classes.ProjectGrid}>
            <CardMedia
              className={classes.newProject}
              image="/assets/add_new_project.png"
              title="Add new Project"
            />
            <CardContent className={classes.alignCenter}>
              <Typography component="h6" variant="h6">
                Add New Project
              </Typography>
            </CardContent>
          </Card>
        </NextLink>
      </Grid>
      {props.projects && props.projects.length
        ? props.projects.map((project: ProjectDetails, index: number) => {
            return (
              <Grid
                item
                xs={6}
                md={4}
                lg={3}
                key={index}
                className={classes.ProjectGrid}
              >
                <Card>
                  <div
                    onContextMenu={(event) => handleClick(event, project)}
                    style={{ cursor: 'pointer' }}
                  >
                    <CardMedia
                      className={classes.newProject}
                      image={`/assets/${project.domain}.png`}
                      title={project.domain}
                    />
                    <CardContent>
                      <Typography component="h6" variant="h6">
                        <div style={{ color: '#FFFFFF' }}>{project.name}</div>
                        <div
                          style={{ color: '#4CBDEC' }}
                        >{`Last Updated ${project.date}`}</div>
                      </Typography>
                      <Menu
                        keepMounted
                        open={state.mouseY !== null}
                        onClose={handleClose}
                        anchorReference="anchorPosition"
                        anchorPosition={
                          state.mouseY !== null && state.mouseX !== null
                            ? { top: state.mouseY, left: state.mouseX }
                            : undefined
                        }
                      >
                        <MenuItem onClick={openProjectInIde}>
                          Show in terminal
                        </MenuItem>
                      </Menu>
                    </CardContent>
                  </div>
                </Card>
              </Grid>
            );
          })
        : null}
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
