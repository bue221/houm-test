import { Backdrop, CircularProgress } from "@mui/material";

interface IProps {
  load: boolean;
}

const BackDropLoader: React.FC<IProps> = ({ load }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={load}
    >
      <CircularProgress color="secondary" />
    </Backdrop>
  );
};

export default BackDropLoader;
