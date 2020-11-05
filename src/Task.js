import React, { useEffect, useState }  from 'react'
import { Button, ListItemText, Modal, Grid, Paper, Input, FormControlLabel, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ColorPicker from 'material-ui-color-picker'

//firebase and its config file
import db from './firebase';
import firebase from 'firebase'

//icons
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';


const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: '30%',
      left: '50%',
      transform: 'translate(-50%, 0)',
      top: '25%',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid black',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    gridPaper: {
        padding: theme.spacing(2),
        textAlign: 'left'
    },
    icons: {
        margin: '15px 0 0 35px',
        cursor: 'pointer'
    },
    updateButton: {
        marginLeft: "15px"
    },
    headerContainer: {
        marginBottom: "15px"
    },
    header_2: {
        display: "inline"
    },
    header_5 : {
        display: "inline",
        fontWeight: "normal",
        marginLeft: "12px",
        color: "gray",
        fontStyle: "italic"
    },
    colorPicker: {
        marginLeft: "15px"
    }
  }));

export default function Task(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const [inputColor, setInputColor] = useState('');

    useEffect(() => {
        try {
            db.collection('tasks').doc(props.task.id).update({
                taskColor: inputColor
            })
        } catch(error) {
            alert(error);
        }
    
      }, [inputColor]);

    const updateTask = (event) => {
        event.preventDefault();
        
        try {
            db.collection('tasks').doc(props.task.id).update({
                task: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                isCompleted: false
            })
        } catch(error) {
            alert(error);
        }
        
        setOpen(false);
    }

    const convertDate = (timestamp) => {
        if(timestamp){
            const date = new Date(timestamp.seconds*1000).toLocaleString();
            return date;
        }
    }

    const deleteTask = () => {
        try {
            db.collection('tasks').doc(props.task.id).delete();
        } catch(error) {
            alert(error);
        }
    }

    const handleCheckboxChange = () => {
        console.log(props.task)
        try {
            db.collection('tasks').doc(props.task.id).update({
                isCompleted: !props.task.isCompleted
            })
        } catch(error) {
            alert(error);
        }
    }

    const handleTaskColor = (color) => {
        if(color){
            setInputColor(color);
        }
            
    }

    return (
        <>
        <Modal open={open} onClose={e => setOpen(false)}>
            <div className={classes.paper}>
                <div className={classes.headerContainer}>
                    <h2 className={classes.header_2}>{props.task.task}</h2>
                    <h5 className={classes.header_5}>by {props.selectedUser}</h5>
                </div>
                <form>
                    <Input placeholder={props.task.task} onChange={event => setInput(event.target.value)} />
                    <Button type="submit"
                        className={classes.updateButton} 
                        variant="contained" 
                        color="primary" 
                        disabled={!input.trim() || !input} 
                        onClick={updateTask}>Update Task</Button>
                </form>
            </div>
        </Modal>
        <Grid item>
          <Paper className={classes.gridPaper} style={{backgroundColor : props.task.taskColor}}>
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <ListItemText primary={props.task.task} secondary={convertDate(props.task.timestamp)} />
                    <FormControlLabel
                    control={
                    <Checkbox
                        checked={props.task.isCompleted}
                        onChange={handleCheckboxChange}
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label={props.task.isCompleted ? "Done!" : "Not Done"}
                />
                Task Color:
                <ColorPicker
                        className={classes.colorPicker}
                        name='color'
                        defaultValue={props.task.taskColor}
                        onChange={handleTaskColor}
                    />
                </Grid>
                <Grid item className={classes.icons}>
                    <EditIcon onClick={e => setOpen(true)} />
                    <DeleteForeverIcon onClick={deleteTask} />
                </Grid>
            </Grid>
          </Paper>
        </Grid>
        </>
    )
}