import React, { useCallback, useMemo, useEffect, useState, forwardRef } from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Fade, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

interface CustomDialogProps {
  title: string;
  isDraggable?: boolean;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  isFullScreenButtonVisible?: boolean;
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  onFullScreenChange?: (isFullScreen: boolean) => void;
  fullScreen?: boolean;
}

const PaperComponent: React.FC = (props) => (
  <Draggable
    handle="#draggable-dialog-title"
    cancel={'[class*="MuiDialogContent-root"]'}
  >
    <Paper {...props} />
  </Draggable>
);

// const Transition = forwardRef(function Transition(
//   props: TransitionProps & { children: React.ReactElement<any, any> },
//   ref: React.Ref<unknown>
// ) {
//   return <Slide direction="left" ref={ref} {...props} />;
// });

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any>; },
  ref: React.Ref<unknown>
) {
  return <Fade {...props} ref={ref} timeout={500} />;
});

const CustomDialog: React.FC<CustomDialogProps> = ({
  title,
  isDraggable = false,
  maxWidth = "md",
  isFullScreenButtonVisible = true,
  children,
  open,
  onClose,
  onFullScreenChange,
  fullScreen = false,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(fullScreen);

  useEffect(() => {
    setIsFullScreen(fullScreen);
  }, [fullScreen]);

  // Handle fullscreen toggle
  const handleFullscreen = useCallback(() => {
    setIsFullScreen((prev) => {
      const newFullScreenState = !prev;
      if (onFullScreenChange) {
        onFullScreenChange(newFullScreenState);
      }
      return newFullScreenState;
    });
  }, [onFullScreenChange]);

  // Reset full-screen mode when closing the dialog
  // If need other wise don't need 
  const handleClose = () => {
    setIsFullScreen(false); // Reset full-screen state
    if (onFullScreenChange) {
      onFullScreenChange(false); // Notify parent that full-screen is false
    }
    onClose(); // Call the provided onClose function
  };

  const dialogTitleStyle = useMemo(
    () => ({
      cursor: isDraggable && !isFullScreen ? "move" : "default",
      padding: "0",
    }),
    [isDraggable, isFullScreen]
  );

  return (
    <Dialog
      fullScreen={isFullScreen}
      fullWidth
      maxWidth={isFullScreen ? undefined : maxWidth}
      open={open}
      onClose={handleClose} // Use the new close handler
      PaperComponent={isDraggable && !isFullScreen ? PaperComponent : undefined}
      TransitionComponent={Transition}
      disableEscapeKeyDown
      aria-labelledby="draggable-dialog-title"
      sx={{
        "& .MuiDialog-paper": {
          marginTop: isFullScreen ? "0" : "-40%",
        },
      }}
    >
      <Box p={1}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <DialogTitle
            style={dialogTitleStyle}
            id="draggable-dialog-title"
            sx={{ width: "80%" }}
          >
            {title}
          </DialogTitle>
          <Box sx={{ width: "20%", textAlign: "right" }}>
            {isFullScreenButtonVisible && (
              <IconButton aria-label="fullscreen" onClick={handleFullscreen}>
                <FullscreenIcon />
              </IconButton>
            )}
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        <DialogContent sx={{ p: 0 }}>{children}</DialogContent>
      </Box>
    </Dialog>
  );
};

export default React.memo(CustomDialog);