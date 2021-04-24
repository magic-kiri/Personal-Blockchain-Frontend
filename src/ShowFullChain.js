import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ShowFullChain() {
    const classes = useStyles();
    const [openShowBlockchain, setOpenShowBlockchain] = React.useState(false);

    const handleClose = () => {
        setOpenShowBlockchain(false);
    };

    return (
        <div>
            <Dialog fullScreen open={openShowBlockchain} onClose={handleClose} TransitionComponent={Transition}>
                <p>
                    The Full Blockchain
                </p>
            </Dialog>
        </div>
    );
}