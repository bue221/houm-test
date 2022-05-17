/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Box,
  CircularProgress,
  TextField,
} from "@mui/material";
import type { NextPage } from "next";
import { useGetAllCharactersQuery } from "services/api.service";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useForm } from "react-hook-form";
import HeroCard from "components/HeroCard";
import { ICharacter } from "types";

interface IForm {
  gender: string;
  name: string;
  status: string;
}

const Home: NextPage = () => {
  const [page, setPage] = useState(1);
  const [mainData, setMainData] = useState<Array<ICharacter>>([]);
  const { register, watch, setValue } = useForm<IForm>({
    defaultValues: {
      status: "",
      gender: "",
      name: "",
    },
  });

  const { currentData: data, isError } = useGetAllCharactersQuery(
    {
      page,
      status: watch("status"),
      gender: watch("gender"),
      name: watch("name"),
    },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    const dataI = data?.results ? data?.results : [];
    setMainData([...mainData, ...dataI]);
  }, [page, data]);

  useEffect(() => {
    if (
      watch("status") !== "" ||
      watch("gender") !== "" ||
      watch("name") !== ""
    ) {
      setMainData([]);
      setPage(1);
    }
  }, [watch("status"), watch("gender"), watch("name")]);

  return (
    <>
      <Typography variant="h3" color="primary" textAlign="center" my={2}>
        Houm Test with rick and morty
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          px: 4,
          gap: 2,
        }}
      >
        <TextField {...register("name")} label="Nombre" fullWidth />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Estado</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Estado"
            {...register("status")}
            value={watch("status")}
          >
            <MenuItem value="alive">Vivo</MenuItem>
            <MenuItem value="dead">Muerto</MenuItem>
            <MenuItem value="unknown">Sin definir</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Genero</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="genero"
            {...register("gender")}
            value={watch("gender")}
          >
            <MenuItem value="male">Masculino</MenuItem>
            <MenuItem value="female">Femenino</MenuItem>
            <MenuItem value="genderless">Sin genero</MenuItem>
            <MenuItem value="unknow">indefinido</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={() => {
            setValue("gender", "");
            setValue("status", "");
            setValue("name", "");
            setMainData([]);
          }}
        >
          Limpiar filtros
        </Button>
      </Box>
      {isError ? (
        <Typography mt={10} color="error" textAlign="center">
          No hay datos disponibles para tu busqueda
        </Typography>
      ) : (
        <InfiniteScroll
          style={{ overflow: "hidden" }}
          dataLength={page * 10}
          next={() => setPage(page + 1)}
          hasMore={data?.info?.next !== null}
          loader={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 3,
              }}
            >
              <CircularProgress color="primary" />
            </Box>
          }
          endMessage={
            <Typography paragraph textAlign="center">
              🥳🥳 ¡Yay llegaste al final de los resultados! 🥳🥳
            </Typography>
          }
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              height: "100%",
              overflow: "hidden",
              py: 2,
            }}
          >
            {mainData?.map((i, index: number) => (
              <HeroCard key={index} {...i} />
            ))}
          </Box>
        </InfiniteScroll>
      )}
    </>
  );
};

export default Home;
