import { useEffect, useState } from "react";
import { getUnit } from "../api/requests";
import { CircularProgress, Tooltip } from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

const UnitPreviewModal = ({ unitId }) => {
  const [unit, setUnit] = useState();
  const [loading, setLoading] = useState(false);
  const [showAllTenants, setShowAllTenants] = useState(false);

  useEffect(() => {
    const fetchUnit = async () => {
      try {
        setLoading(true);
        const { success, data } = await getUnit(unitId);
        success && setUnit(data);
      } catch (err) {
        setLoading(false);
      }
      setLoading(false);
    };

    fetchUnit();
  }, []);

  if (loading) {
    return <CircularProgress size={30} />;
  }
  return (
    <>
      <h1>{unit?.name}</h1>
      <h1>
        Piso: {unit?.sector.floor.numberInBuilding} - Sector:{" "}
        {unit?.sector.name}
      </h1>
      {unit?.garages.length > 0 && (
        <h2>
          Cocheras: {unit.garages.map((g) => g.numberInBuilding).join(", ")}.
        </h2>
      )}
      <Tooltip title={unit?.keys ? "Tiene llaves" : "No tiene llaves"}>
        <KeyIcon sx={{ color: unit?.keys ? "#FF9900" : "grey" }} />
      </Tooltip>
      <Tooltip
        title={unit?.garages.length > 0 ? "Tiene cochera" : "No tiene cochera"}
      >
        <DirectionsCarIcon
          sx={{ color: unit?.garages.length > 0 ? "#FF9900" : "grey" }}
        />
      </Tooltip>
      {unit?.owners.length > 0 && (
        <>
          <h1>Propietarios: </h1>
          {unit.owners.map((o) => (
            <Box key={o.id}>
              <Typography variant="p">
                {`${o.firstName} ${o.lastName}`}
              </Typography>
              <Typography variant="p">{`${o.phone}`}</Typography>
              <Typography variant="p">{`${o.email}`}</Typography>
              <Typography variant="p">{`${o.address}`}</Typography>
            </Box>
          ))}
        </>
      )}
      {unit?.tenants.length > 0 && (
        <>
          <h1>Inquilinos: </h1>
          <Button onClick={() => setShowAllTenants(!showAllTenants)}>
            {showAllTenants ? "Ver actuales" : "Ver todos"}
          </Button>
          {(showAllTenants
            ? unit.tenants
            : unit.tenants.filter((t) => t.active)
          ).map((o) => (
            <Box key={o.id}>
              <Typography variant="p">
                {`${o.firstName} ${o.lastName}`}
              </Typography>
              <Typography variant="p">{`${o.phone}`}</Typography>
              <Typography variant="p">{`${o.email}`}</Typography>
              <Typography variant="p">{`${o.address}`}</Typography>
              <Typography variant="p">{`Fechas: ${o.startDate} - ${
                o.endDate ?? ""
              }`}</Typography>
            </Box>
          ))}
        </>
      )}
    </>
  );
};

export default UnitPreviewModal;
