import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../context/account.context";
import { useParams } from "react-router-dom";
import { getBuildingByExternalId } from "../api/requests";
import { Box, Button, IconButton, Typography } from "@mui/material";
import CustomModal from "../components/Modal";
import {
  AddGarageForm,
  AddSectorForm,
  AddUnitForm,
  EditBuildingForm,
  EditUnitForm,
} from "../forms";
import CustomCard from "../components/Card";
import EditIcon from "@mui/icons-material/Edit";
import UnitPreviewModal from "../components/UnitPreviewModal";

const Building = () => {
  const { session } = useContext(AccountContext);
  const [building, setBuilding] = useState();
  const [loading, setLoading] = useState(false);
  const { buildingExternalId } = useParams();
  const [update, setUpdate] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);

  const [modal, setModal] = useState(false);
  const [modalBody, setModalBody] = useState(<></>);

  const openModal = (modalBody) => {
    setModalBody(modalBody);
    setModal(true);
  };
  const closeModal = () => {
    setModalBody(<></>);
    setModal(false);
  };
  const handleUpdate = () => setUpdate(!update);

  useEffect(() => {
    const fetchBuilding = async () => {
      try {
        setLoading(true);
        const { success, data } = await getBuildingByExternalId(
          buildingExternalId
        );
        success && setBuilding(data);
      } catch (err) {
        setLoading(false);
      }
      setLoading(false);
    };

    session.isLogged && fetchBuilding();
  }, [session, update]);

  if (!buildingExternalId) {
    return <h1>Error</h1>;
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const openModalWith = (type, unitId) => {
    switch (type) {
      case "building":
        openModal(
          <EditBuildingForm
            handleClose={closeModal}
            update={handleUpdate}
            building={building}
          />
        );
        break;
      case "garage":
        openModal(
          <AddGarageForm
            handleClose={closeModal}
            update={handleUpdate}
            building={building}
          />
        );
        break;
      case "sector":
        openModal(
          <AddSectorForm
            handleClose={closeModal}
            update={handleUpdate}
            building={building}
          />
        );
        break;
      case "unit":
        openModal(
          <AddUnitForm
            handleClose={closeModal}
            update={handleUpdate}
            building={building}
          />
        );
        break;
      case "editUnit":
        openModal(
          <EditUnitForm
            handleClose={closeModal}
            update={handleUpdate}
            unitId={unitId}
          />
        );
        break;
      case "viewUnit":
        openModal(<UnitPreviewModal unitId={unitId} />);
        break;
      default:
        break;
    }
  };

  return (
    <Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        mb="50px"
      >
        <Button variant="outlined" onClick={() => openModalWith("sector")}>
          Añadir sector
        </Button>
        <Button variant="outlined" onClick={() => openModalWith("unit")}>
          Añadir Unidad
        </Button>
        <Button variant="outlined" onClick={() => openModalWith("garage")}>
          Añadir Cochera
        </Button>
        <Button variant="outlined" onClick={() => openModalWith("building")}>
          Editar Edificio
        </Button>
      </Box>
      <Typography variant="h3">{building?.name}</Typography>
      <Typography variant="h5">{building?.address}</Typography>
      {building?.floors.map((f) => (
        <Box key={f.id}>
          <h1>Piso: {f.numberInBuilding}</h1>
          {f.sectors.map((s) => (
            <Box key={s.id}>
              <h2>Sector: {s.name}</h2>
              {
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 2,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {s.units.map((u) => (
                    <CustomCard
                      key={u.id}
                      content={
                        <Box
                          display="flex"
                          flexDirection="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Typography variant="h5" component="div">
                            {u.name}
                          </Typography>
                          <IconButton
                            onClick={() => openModalWith("editUnit", u.id)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Box>
                      }
                      actions={
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => openModalWith("viewUnit", u.id)}
                        >
                          Ver
                        </Button>
                      }
                    />
                  ))}
                </Box>
              }
            </Box>
          ))}
        </Box>
      ))}
      <h1>Cocheras:</h1>
      {building?.garages.map((g) => (
        <CustomCard
          key={g.id}
          content={
            <Typography variant="h5" component="div">
              Numero: {g.numberInBuilding}
            </Typography>
          }
          actions={<></>}
        />
      ))}
      {modal && (
        <CustomModal
          open={modal}
          handleClose={closeModal}
          children={modalBody}
        />
      )}
    </Box>
  );
};

export default Building;
