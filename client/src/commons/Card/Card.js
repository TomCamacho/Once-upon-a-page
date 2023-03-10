import { Box } from "@mui/material";
import { Rating, Button } from "@mui/material";
import { useNavigate } from "react-router";

const Card = ({ data }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    console.log("agregar al cart");
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "200px",
          height: "400px",
          margin: "10px",
          borderRadius: "2px",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Box
          onClick={() => navigate(`${data.id}`)}
          sx={{
            width: "100%",
            height: "80%",
            overflow: "hidden",
            borderRadius: "8px",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <img
            src={`${data.images[0]}`}
            alt={data.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "20%",
            padding: "16px",
            backgroundColor: "#fff",
            borderBottomLeftRadius: "8px",
            borderBottomRightRadius: "8px",
            marginTop: "8px",
          }}
        >
          <h4
            onClick={() => navigate(`${data.id}`)}
            sx={{
              margin: 0,
              marginBottom: "8px",
              cursor: "pointer",
            }}
          >
            {data.title ? data.title : data.original_name}{" "}
          </h4>
          <Rating value={data.rating} readOnly precision={0.1} />
          <h5 sx={{ margin: 0, marginBottom: "8px" }}>{`USD ${(
            data.price / 100
          ).toFixed(2)}`}</h5>
        </Box>
        <Button
          onClick={handleClick}
          variant="contained"
          sx={{
            backgroundColor: "#D2C4FB",
            color: "#658E9C",
            textTransform: "none",
            width: "100%",
            "&:hover": {
              backgroundColor: "#658E9C",
              color: "#fff",
            },
          }}
        >
          Add to Cart
        </Button>
      </Box>
    </div>
  );
};

export default Card;
