/* eslint-disable @next/next/no-img-element */
import { Container, IconButton, Typography, Box, Chip } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useGetOneCharacterQuery } from "services/api.service";
import BackDropLoader from "components/BackDropLoader";

const Detail: NextPage = () => {
  const {
    query: { id },
    back,
  } = useRouter();

  const { data, isLoading } = useGetOneCharacterQuery(Number(id), {
    skip: !id,
  });
  return (
    <>
      <BackDropLoader load={isLoading} />
      <Container sx={{ py: 2 }}>
        <IconButton onClick={() => back()}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h2" color="primary" textAlign="center">
          {data?.name}
        </Typography>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: 4,
          }}
        >
          <img
            src={data?.image}
            alt={data?.name}
            style={{ borderRadius: 30, width: "100%" }}
          />
          <Chip
            sx={{ position: "absolute", top: 40, left: 40 }}
            label={data?.status === "Alive" ? "Vivo" : "Muerto o sin definir"}
            color={data?.status === "Alive" ? "success" : "error"}
          />
        </Box>
        <Typography paragraph color="text.secondary">
          <strong>Especie:</strong> {data?.species || "unknow"}
          <br />
          <strong>Genero:</strong> {data?.gender || "unknow"}
          <br />
          <strong>Origen:</strong> {data?.origin?.name || "unknow"}
        </Typography>
        <Typography paragraph fontWeight="bold" color="text.secondary">
          Episodios en el que se vió:
        </Typography>
        {data?.episode?.map((i, index) => (
          <Typography key={index} paragraph color="text.secondary">
            Episodio {i.split("/").pop()}
          </Typography>
        ))}
      </Container>
    </>
  );
};

export default Detail;
