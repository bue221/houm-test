import * as React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CircleIcon from "@mui/icons-material/Circle";
import { ExpandMore } from "components/ExpandMore";
import { useRouter } from "next/router";

export default function HeroCard({
  name,
  origin,
  image,
  status,
  species,
  location,
  episode,
  id,
}: any) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => setExpanded(!expanded);
  const router = useRouter();

  return (
    <Card sx={{ width: 345, minHeight: 400 }}>
      <CardHeader
        avatar={<Avatar aria-label="recipe">{name[0]}</Avatar>}
        action={
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => router.push(`/detail/${id}`)}
          >
            Detalle
          </Button>
        }
        title={name}
        subheader={origin?.name}
        color="text.secondary"
      />
      <CardMedia component="img" height="194" image={image} alt="Paella dish" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Especie: {species}
          <br />
          Localización: {location?.name}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <CircleIcon color={status === "Alive" ? "success" : "error"} />
        </IconButton>
        <Typography variant="caption" color="text.secondary">
          {status === "Alive" ? "Vivo" : "Muerto o sin definir"}
        </Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph fontWeight="bold">
            Episodios en el que se vió:
          </Typography>
          {episode.map((i: string, index: number) => (
            <Typography key={index} paragraph>
              Episodio {i.split("/").pop()}
            </Typography>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}
